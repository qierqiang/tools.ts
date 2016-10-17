/// <reference path="jquery.d.ts" />

import { Watcher    } from './watcher';
import { logger     } from './logger';
import { lsHelper   } from './localStorage-helper';

export class annoWatcher extends Watcher {

    test(): void {
        //查询公告
        let href: string;
        let url: string = "http://www.hfjjzd.gov.cn/zhuzhan/jwgk/";
        let rtn: string = $.ajax({type: "GET", url: url, async: false}).responseText;
        //对比关键字
        let arr: any    = $(rtn).find(".liebiangaoqilaile2_kaishil2 ul li a");
        $(arr).each((i) => {
            let ele = arr[i];
            this.keywords.forEach((word: string) => {
                if ($(ele).attr("title").indexOf(word) >= 0){
                    href = $(ele).attr("href");
                }
            });
        });
        //判断是否已读
        if (href) {
            if (!this.getIsRead(href)) {
                //发出通知
                this.notify("交警公告", "检测到关键字", (n) => {
                    window.open(url);
                    this.setIsRead(href);
                    n.close();
                })
            }
        }
    }

    /**
     * 判断公告是否已读
     * @param {string} href 公告相对链接
     * @returns {boolean} 是否已读
     */
    getIsRead(href: string): boolean {
        var arr = lsHelper.readAll("read");
        for (var i = 0; i < arr.length; i++) {
            var u = arr[i];
            if (href == u) {
                return true;
            }
        }
        return false;
    }

    /**
     * 设置公告为已读
     * @param {string} href 公告相对链接
     */
    setIsRead(href: string): void {
        lsHelper.add("read", href);
    }
}