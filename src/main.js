const axios = require('axios');
const fs = require('fs');
const { getFileByPath, writeFile } = require('./utils');
const path = require('path');

// 得到一个驼峰的key值
const getKeyByWord = function(word) {
    const reg = /[^ ]+/g;
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

// 翻译请求
const translateRequest = function(obj) {
    let url = 'http://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&ie=UTF-8&sl=auto&tl=en&q=' + encodeURI(obj.word);
	return axios({
        method: 'GET',
        url: url
	}).then((res) => {
        return {
            zh: obj.word,
            en: res.data.sentences[0].trans,
            key: getKeyByWord(res.data.sentences[0].trans)
        };
	}).catch((err) => {
        console.log('err:', err);
    });
};

const mockRequest = function(obj) {
    return new Promise((resolve, reject) => {
        resolve({
            zh: '中文',
            en: '英文',
            key: 'key'
        });
    });
}

function parseText(pendingText, reg){
    let collection=[];
    let searchTxt="";
    let targetTxt = "";
    let stringLength=0, lastIndex=0, curIndex=0;
    // var reg =/\{\{(.+?)\}\}/g;
    let searchTxtIndex = [];

    if(!reg.test(pendingText)){
        throw new Error("未匹配");
    }else{
        reg.lastIndex=0;
        while( tempR = reg.exec(pendingText))
        {
            // console.log('tempR:', tempR);
            curIndex = reg.lastIndex;
            searchTxt=tempR[0];
            stringLength=searchTxt.length;
            collection.push(pendingText.slice(lastIndex,curIndex-stringLength));
            collection.push(searchTxt);
            searchTxtIndex.push(collection.length - 1); // 存放查到的
            lastIndex=curIndex;
        }
    }

    collection.push(pendingText.slice(lastIndex, pendingText.length - 1));
    return {
        collection,
        searchTxtIndex
    };
}

function search(path) {
    let originData = fs.readFileSync(path, 'utf8');
    const scriptReg = /<script>[\d\D]*<\/script>/g;
    let data = '';
    let hasHTML = /\.vue/g.test(path);
    let temp = '';
    // 如果是.vue文件
    if (hasHTML) {
        let res = parseText(originData, scriptReg);
        // console.log('res:', res);
        data = res.collection[res.searchTxtIndex[0]];
    } else {
        data = originData;
    }
    console.log('data:', data);

    // console.log('temp:', temp);
    const reg2 = /'[^']*[\u4e00-\u9fa5]+[^']*'/g; // 获取中文
    const reg3 = /(\/\/.*)|(\/\*[\s\S]*?\*\/)|(<!--[\s\S]*?-->)/g;
    // 过滤注释代码
    const code =  data.replace(reg3, '');
    console.log('code：', code)
    // 获取中文
    let {collection, searchTxtIndex} = parseText(code, reg2);

    let promiseList = [];
    let translateStorage = []; 
    searchTxtIndex.forEach((index) => {
        // let word = collection[index];
        let word = collection[index].slice(1, collection[index].length); // 去掉收尾的'号
        let promise = mockRequest({word}); // debug
        promise.then((res) => {
            collection[index] = `lang('${res.key}')`;
            translateStorage.push(res);
        });
        promiseList.push(promise);
    });
    return Promise.all(promiseList).then(() => {
        if (hasHTML) {
            // collection = [...temp[0], ...collection];
            let res = parseText(originData, scriptReg);
            res.collection[res.searchTxtIndex[0]] = collection.join('');
            collection = res.collection;
        }
        return {
            translateStorage,
            collection 
        };
    })
}

function main() {
    const pathArr = getFileByPath('src/APP').filter((path) => {
        return !/\.json$/.test(path);
    });
    
    let promiseList = [];
    let json = [];
    pathArr.forEach((path) => {
        let promise = search(path).then((res) => {
            const code = res.collection.join('');
            json = [...json, ...res.translateStorage];
            return writeFile(path, code);
        });
        promiseList.push(promise);
    });

    Promise.all(promiseList).then(() => {
        writeFile(path.join(__dirname, './translateStorage.json'), JSON.stringify(json, null, json.length)).then(() => {
            console.log('大功告成');
        });
    });
}
main();