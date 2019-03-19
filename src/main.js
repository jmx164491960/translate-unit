const axios = require('axios');
const fs = require('fs');
const { getFileByPath } = require('./utils');

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
            cn: obj.word,
            en: res.data.sentences[0].trans,
            key: getKeyByWord(res.data.sentences[0].trans)
        };
	}).catch((err) => {
        console.log('err:', err);
    });
};

function parseText(pendingText, reg){
    var collection=[];
    var searchTxt="";
    var targetTxt = "";
    var stringLength=0,lastIndex=0,curIndex=0;
    // var reg =/\{\{(.+?)\}\}/g;
    
    if(!reg.test(pendingText)){
        throw new Error("未匹配");
    }else{
        reg.lastIndex=0;
        while( tempR = reg.exec(pendingText))
        {
            curIndex = reg.lastIndex;
            searchTxt=tempR[0];
            stringLength=searchTxt.length;
            collection.push(pendingText.slice(lastIndex,curIndex-stringLength));
            collection.push(searchTxt);
            lastIndex=curIndex;
        }
    }
    return collection;
}

function search(path) {
    let data = fs.readFileSync(path, 'utf8');
    // const reg1 = /<script>[\d\D]*<\/script>/g;
    const reg2 = /[\u4e00-\u9fa5]+/g;
    const reg3 = /(\/\/.*)|(\/\*[\s\S]*?\*\/)|(<!--[\s\S]*?-->)/g;
    // console.log('data:', data);
    // 过滤注释代码
    const code =  data.replace(reg3, '');
    // console.log('code:', code);
    // 获取中文
    return code.match(reg2);
}

function main() {
    const pathArr = getFileByPath('src/APP').filter((path) => {
        return !/\.json$/.test(path);
    });
    
    pathArr.forEach((path) => {
        let words = search(path);
        console.log('words:', words);
        return;
        let prodPath = path.replace(/\.[^\.]+/, '.json');
        console.log('words:', words);
        let list = words.map((word) => {
            return translateRequest({word});
        });
        Promise.all(list).then((arr) => {
            fs.writeFile(prodPath, JSON.stringify(arr, null, arr.length), (err) => {
                if (!err) console.log(prodPath + '写入成功!');
            })
        });
    });
}
main();