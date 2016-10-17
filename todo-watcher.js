/// <reference path="jquery.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var watcher_1 = require('./watcher');
var logger_1 = require('./logger');
var todoWatcher = (function (_super) {
    __extends(todoWatcher, _super);
    function todoWatcher() {
        _super.apply(this, arguments);
    }
    todoWatcher.prototype.test = function () {
        var _this = this;
        try {
            //查询待办
            var data = "{\"BaseOUGuid\": \"-1\",\"UserGuid\": \"8623cf12-b066-4dab-9d33-0a89e331a1d0\"}";
            var url = "http://172.18.18.18/hftpframe_zx/EpointMetroNic/FrameAll_Metronic.aspx/GetWaithandleMessage";
            var response = $.ajax({ type: "post", data: data, contentType: "application/json;utf-8", url: url, async: false }).response.d;
            // let xhr: XMLHttpRequest = new XMLHttpRequest();
            // xhr.open("POST", url, false);
            // xhr.send(data);
            // let response: any = JSON.parse(xhr.responseText).d;
            //读取内容
            var arr_1 = [];
            $(response).find("a").each(function (i) { return arr_1[i] = $(_this).attr("title"); });
            //对比关键字
            var found_1 = false;
            $(arr_1).each(function (i) {
                var txt = arr_1[i];
                _this.keywords.forEach(function (w) {
                    if (txt.indexOf(w) >= 0) {
                        found_1 = true;
                        //发出通知
                        logger_1.logger.log("发现待办，发出提醒。", "success");
                        var title = txt.slice(txt.indexOf("【") + 1, txt.indexOf("】"));
                        var msg = txt.slice(txt.indexOf("】") + 1);
                        _this.notify(title, msg, function () { });
                        return;
                    }
                });
            });
        }
        catch (ex) {
            logger_1.logger.log(ex.message, "error");
        }
    };
    return todoWatcher;
}(watcher_1.Watcher));
exports.todoWatcher = todoWatcher;
