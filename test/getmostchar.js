/**
 * Created by chenxiaoqiang on 16/3/16.
 * 获取一个字符串中出现次数最多的字符及个数
 */

function getMostChar(str){
    var charStack = {};
    var charArr = [];
    for(var i =str.length-1;i>=0;i--){
        var charCount = charStack[str[i]];
        charCount = charCount ? ++charCount:1;
        charStack[str[i]] = charCount;
        charArr[charCount] = str[i];
    }

    console.log("出现此处最多的字符"+charArr[charArr.length-1]);
    console.log("出现次数"+charArr.length-1);
    console.log(charArr);
}