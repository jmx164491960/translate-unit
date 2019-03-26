const axios = require('axios');
const fs = require('fs');
const { getFileByPath, writeFile } = require('./utils');
const path = require('path');
const CONFIG = require('./config');


/**
 * 根据单词生成对应的驼峰字符串
 * @param { String } word 
 */
const getKeyByWord = function(word) {
    const reg = /[^ ]+/g; // 去空格
    // 去标点符号
    const symbolReg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
    word = word.replace(symbolReg, '');
    const arr = word.match(reg);
    let result = '';
    arr.forEach((item, index) => {
        if (index === 0) {
            result += item.toLowerCase();
        } else {
            result += item.toLowerCase().replace(/^[a-z]/g, (L) => L.toUpperCase());
        }
    });
    return result;
};

let count = 0;
const mockRequest = function(obj) {
    count ++;
    console.log('count:', count);
    return new Promise((resolve, reject) => {
        resolve({
            zh: obj.word,
            en: '英文',
            key: 'key'
        });
    });
}

/**
 * 翻译请求函数
 */
let translateCache = {};
let promiseCount = 0;
let promisePool = [];
let requestCount = 0;
const translateRequest = function(obj) {
    // debug
    // return new Promise((resolve, reject) => {
    //     resolve({
    //         zh: '中文',
    //         en: '英文',
    //         key: 'key'
    //     });
    // });

    let url = 'http://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&ie=UTF-8&sl=auto&tl=en&q=' + encodeURI(obj.word);
    
    const requestHandler = () => {
        // 检查缓存
        if (translateCache[obj.word]) {
            console.log('cache-match');
            return Promise.resolve(translateCache[obj.word]);
        } else {
            return new Promise((resolve) => {
                setTimeout(() => {
                    requestCount ++;
                    console.log('请求次数...', requestCount);
                    resolve();
                }, CONFIG.time);
            }).then(() => {
                const request = axios({
                    method: 'GET',
                    url: url
                }).then((res) => {
                    const translateRes = {
                        zh: obj.word,
                        en: res.data.sentences[0].trans,
                        key: getKeyByWord(res.data.sentences[0].trans)
                    };
                    translateCache[obj.word] = translateRes;
                    return translateRes;
                }).catch((err) => {
                    console.log('err:', err);
                });
                return request;
            });
        }
    }

    if (promisePool.length > 0) {
        const request = Promise.all([...promisePool]).then(() => {
            return requestHandler();
        });
        promisePool.push(request);
        return request;
    } else {
        const request = requestHandler();
        promisePool.push(request)
        return request;
    }
};

/**
 * 解析文本内容。返回一下分割后来数组，和目标代码的数组索引。
 * @param { String } pendingText 
 * @param { reg } reg 
 */
function textParser(pendingText, reg){
    let collection = [];
    let searchTxt="";
    let targetTxt = "";
    let stringLength=0, lastIndex=0, curIndex=0;
    // var reg =/\{\{(.+?)\}\}/g;
    let searchTxtIndex = [];

    if(!reg.test(pendingText)){
        collection = [pendingText];
    }else{
        reg.lastIndex=0;
        while( tempR = reg.exec(pendingText))
        {
            curIndex = reg.lastIndex;
            searchTxt=tempR[0];
            stringLength=searchTxt.length;
            collection.push(pendingText.slice(lastIndex,curIndex-stringLength));
            collection.push(searchTxt);
            searchTxtIndex.push(collection.length - 1); // 存放查到的
            lastIndex=curIndex;
        }
        collection.push(pendingText.slice(lastIndex, pendingText.length));
    }
    return {
        codeArr: collection,
        indexArr: searchTxtIndex
    };
}

/**
 * 数组去重
 * @param { Array } arr 
 */
function removeRepeat(arr) {
    let valueArr = [];
    let jsonArr = [];
    arr.forEach((item) => {
        const json = JSON.stringify(item);
        // 没有重复的
        if (jsonArr.indexOf(json) < 0) {
        jsonArr.push(json);
        valueArr.push(item);
        }
    });

    return valueArr;
}

/**
 * 解析代码，把.vue文件里的代码分出html、js部分
 * @param {*} code 
 */
function codeParser(code) {
    const reg = /(<template>[\d\D]*<\/template>)|(<script>[\d\D]*<\/script>)/g;
    const { codeArr } = textParser(code, reg);
    return {
        htmlIndex: codeArr.findIndex((item) => /<template>[\d\D]*<\/template>/.test(item)),
        scriptIndex: codeArr.findIndex((item) => /<script>[\d\D]*<\/script>/.test(item)),
        codeArr
    };
}

function translater(type, code) {
    const chineseReg = /'[^'\r\n]*[\u4e00-\u9fa5]+[^'\r\n]*'/g; // 获取中文
    const noteReg = /(\/\/.*)|(\/\*[\s\S]*?\*\/)|(<!--[\s\S]*?-->)/g;
    const { codeArr, indexArr } = textParser(code, noteReg);
    let translateStorage = [];
    let promiseList = [];
    switch(type) {
        case 'html':
            promiseList = codeArr.map((item, index) => {
                // 非注释代码
                if (indexArr.length === 0 || indexArr.indexOf(index) < 0) {
                    let res = textParser(item, chineseReg);
                    let promiseSubList = [];
                    res.indexArr.forEach((i) => {
                        const word = res.codeArr[i].slice(1, res.codeArr[i].length - 1); // 去掉收尾的'号
                        promiseSubList.push(translateRequest({word}).then((translate) => {
                            res.codeArr[i] = `lang('${translate.key}')`;
                            translateStorage.push(translate);
                        }));
                    })
                    return Promise.all(promiseSubList).then(() => {
                        return res.codeArr.join('');
                    })
                } else {
                    return Promise.resolve(item);
                }
            });

            return Promise.all(promiseList).then((arr) => {
                return {
                    code: arr.join(''),
                    translateStorage
                };
            });
        case 'script':
            promiseList = codeArr.map((item, index) => {
                // 非注释代码
                if (indexArr.length === 0 || indexArr.indexOf(index) < 0) {
                    let res = textParser(item, chineseReg);

                    let promiseSubList = [];
                    res.indexArr.forEach((i) => {
                        const word = res.codeArr[i].slice(1, res.codeArr[i].length - 1); // 去掉收尾的'号
                        promiseSubList.push(translateRequest({word}).then((translate) => {
                            res.codeArr[i] = `this.lang('${translate.key}')`;
                            translateStorage.push(translate);
                        }));
                    })
                    return Promise.all(promiseSubList).then(() => {
                        return res.codeArr.join('');
                    })
                } else {
                    return Promise.resolve(item);
                }
            });

            return Promise.all(promiseList).then((arr) => {
                return {
                    code: arr.join(''),
                    translateStorage
                };
            });
    }
}

function main() {
    // 检索.vue，和.js的文件
    const filePathArr = getFileByPath(CONFIG.entry).filter((path) => {
        return /\.[vue]|[js]$/.test(path);
    });
    
    let fileTaskList = []; // 存放每个文件代码处理的promise
    let translateStorage = []; // 保存的是翻译的对象数组，最终生成一个json
    filePathArr.forEach((path) => {
        const originCode = fs.readFileSync(path, 'utf8');
        let {
            codeArr,
            htmlIndex,
            scriptIndex
        } = codeParser(originCode);
        let codeTaskList = []; // 存放文件里每份代码处理的promise
        // 如果是vue文件
        if (/.vue/g.test(path)) {
            if (htmlIndex != undefined) {
                codeTaskList.push(
                    translater('html', codeArr[htmlIndex]).then((obj) => {
                        codeArr[htmlIndex] = obj.code;
                        translateStorage = [...translateStorage, ...obj.translateStorage];
                    })
                );
            }
            if (scriptIndex != undefined) {
                codeTaskList.push(
                    translater('script', codeArr[scriptIndex]).then((obj) => {
                        codeArr[scriptIndex] = obj.code;
                        translateStorage = [...translateStorage, ...obj.translateStorage];
                    })
                );
            }
            fileTaskList.push(Promise.all(codeTaskList).then(() => {
                const code = codeArr.join('');
                return writeFile(path, code)
            }));
        // 是否有启用翻译的注释标识
        } else if (CONFIG.isEnableReg.test(originCode)){
            fileTaskList.push(
                translater('script', originCode).then((obj) => {
                    const code = obj.code;
                    translateStorage = [...translateStorage, ...obj.translateStorage];
                    return writeFile(path, code);
                })
            );
        }
    });

    Promise.all(fileTaskList).then(() => {
        const output = removeRepeat(translateStorage);
        // const timestamp = String(new Date().getTime());
        writeFile(
            path.join(__dirname, `./translateStorage.json`),
            JSON.stringify(output, null, output.length)
        ).then(() => {
            console.log('done!');
        });
    });
}
main();