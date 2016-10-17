/// <reference path="jquery.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var watcher_1 = require('./watcher');
var localStorage_helper_1 = require('./localStorage-helper');
var annoWatcher = (function (_super) {
    __extends(annoWatcher, _super);
    function annoWatcher() {
        _super.apply(this, arguments);
    }
    annoWatcher.prototype.test = function () {
        var _this = this;
        //查询公告
        var href;
        var url = "http://www.hfjjzd.gov.cn/zhuzhan/jwgk/";
        var rtn = $.ajax({ type: "GET", url: url, async: false }).responseText;
        //对比关键字
        var arr = $(rtn).find(".liebiangaoqilaile2_kaishil2 ul li a");
        $(arr).each(function (i) {
            var ele = arr[i];
            _this.keywords.forEach(function (word) {
                if ($(ele).attr("title").indexOf(word) >= 0) {
                    href = $(ele).attr("href");
                }
            });
        });
        //判断是否已读
        if (href) {
            if (!this.getIsRead(href)) {
                //发出通知
                this.notify("交警公告", "检测到关键字", function (n) {
                    window.open(url);
                    _this.setIsRead(href);
                    n.close();
                });
            }
        }
    };
    /**
     * 判断公告是否已读
     * @param {string} href 公告相对链接
     * @returns {boolean} 是否已读
     */
    annoWatcher.prototype.getIsRead = function (href) {
        var arr = localStorage_helper_1.lsHelper.readAll("read");
        for (var i = 0; i < arr.length; i++) {
            var u = arr[i];
            if (href == u) {
                return true;
            }
        }
        return false;
    };
    /**
     * 设置公告为已读
     * @param {string} href 公告相对链接
     */
    annoWatcher.prototype.setIsRead = function (href) {
        localStorage_helper_1.lsHelper.add("read", href);
    };
    return annoWatcher;
}(watcher_1.Watcher));
exports.annoWatcher = annoWatcher;
