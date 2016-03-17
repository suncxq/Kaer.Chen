/**
 * Created by chenxiaoqiang on 16/3/17.
 */

var push = (function () {
    var $ = {};
    $.clickStack = {};
    $.receiveStack = {};

    $.registerClick = function (key, callback) {
        if ($.clickStack[key]) {
            $.clickStack[key].callbacks.push(callback);
        } else {
            $.clickStack[key] = {};
            $.clickStack[key].callbacks = [callback];
        }
    };

    $.registerReceive = function (key, callback) {
        if ($.receiveStack[key]) {
            $.receiveStack[key].callbacks.push(callback);
        } else {
            $.receiveStack[key] = {};
            $.receiveStack[key].callbacks = [callback];
            $.receiveStack[key].lastCallTime = new Date().setFullYear(1970);
        }
    };

    $.fireClick = function (key) {
        if (!$.clickStack[key]) {
            return;
        }
        $.clickStack[key].callbacks.forEach(function (callback) {
            if (typeof callback == "function") {
                callback();
            }
        });
    };


    $.fireReceive = function (key) {
        if (!$.receiveStack[key]) {
            return;
        }

        //透传堆积  3秒内只执行一次. 执行的是最先到达的
        if (new Date().getTime() - $.receiveStack[key].lastCallTime < 3000) {
            return;
        }
        $.receiveStack[key].lastCallTime = new Date().getTime();
        $.receiveStack[key].callbacks.forEach(function (callback) {
            if (typeof callback == "function") {
                callback();
            }
        });
    };

    $.registerClick("A", function () {
        console.log("A执行了")
    });

    $.registerClick("A", function () {
        console.log("A1执行了")
    });

    $.registerClick("B", function () {
        console.log("B执行了")
    });



    $.registerReceive("A", function () {
        console.log("Receive A执行了")
    });

    $.registerReceive("B", function () {
        console.log("Receive B执行了")
    });




    return $;
})();
