"use strict";
var Watcher = (function () {
    function Watcher(keywords, interval) {
        this.keywords = keywords;
        this.interval = interval;
    }
    /**
     * 开始检测
     */
    Watcher.prototype.start = function () {
        clearInterval(this._timerHandle);
        this._timerHandle = setInterval(this.test(), this.interval);
    };
    /**
     * 停止检测
     */
    Watcher.prototype.stop = function () {
        clearInterval(this._timerHandle);
    };
    /**
     * 发出通知
     * @param {string} title 通知标题
     * @param {string} content 通知内容
     * @param {Function} clickCallBack 点击通知时调用的回调方法，有一个参数：Notification的实例
     */
    Watcher.prototype.notify = function (title, content, clickCallBack) {
        if ("Notification" in window) {
            var Notification = window["Notification"];
            if (Notification.Permission === 'granted') {
                var n = new Notification(title, { body: content });
                n.onclick = function (n) { clickCallBack(n); };
            }
            else {
                alert('通知功能已禁用！');
            }
        }
        else {
            alert('你的浏览器不支持通知！请更换浏览器。');
        }
    };
    return Watcher;
}());
exports.Watcher = Watcher;
