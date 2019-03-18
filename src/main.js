const axios = require('axios');
const fs = require('fs');

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

fs.readFile('src/App.vue', 'utf8', (err, data) => {
    const reg1 = /<script>[\d\D]*<\/script>/g;
    const reg2 = /[\u4e00-\u9fa5]+/g;
    if(err) {
        console.log('err:', err);
    } else {
        const code =  data.match(reg1).join('');
        
        const chinese = parseText(code, reg2);

        console.log('chinese:', code, chinese);
    }
});

// fs.readFile('src/input.js', 'utf8', function(err, data){
//     const reg = /[^\s]+/g;
//     let wordArr = data.match(reg);
//     let taskList = wordArr.map((item) => {
//         return translateRequest({
//             word: item
//         });
//     });
//     Promise.all(taskList).then((arr) => {
//         const length = arr.length;
//         fs.writeFile('src/output.js', JSON.stringify(arr, null, length), function(err){
//             if (!err) console.log('写入成功');
//         });
//     });
// });