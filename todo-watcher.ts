/// <reference path="jquery.d.ts" />

import { Watcher    } from './watcher';
import { logger     } from './logger';

export class todoWatcher extends Watcher {

    test(): void {
        try {
            //查询待办
            let data: string        = "{\"BaseOUGuid\": \"-1\",\"UserGuid\": \"8623cf12-b066-4dab-9d33-0a89e331a1d0\"}";
            let url: string         = "http://172.18.18.18/hftpframe_zx/EpointMetroNic/FrameAll_Metronic.aspx/GetWaithandleMessage";
            let response: any       = $.ajax({type: "post", data: data, contentType: "application/json;utf-8", url: url, async: false}).response.d;
            // let xhr: XMLHttpRequest = new XMLHttpRequest();
            // xhr.open("POST", url, false);
            // xhr.send(data);
            // let response: any = JSON.parse(xhr.responseText).d;
            //读取内容
            let arr: string[]       = [];
            $(response).find("a").each((i) => arr[i] = $(this).attr("title"));
            //对比关键字
            let found: boolean      = false;
            $(arr).each((i) => {
                let txt: string     = arr[i];
                this.keywords.forEach((w: string) => {
                    if (txt.indexOf(w) >= 0) {
                        found = true; 
                        //发出通知
                        logger.log("发现待办，发出提醒。", "success");
                        var title = txt.slice(txt.indexOf("【") + 1, txt.indexOf("】"));
                        var msg = txt.slice(txt.indexOf("】") + 1);
                        this.notify(title, msg, () => {});
                        return;
                    }
                });
            });
        } catch (ex) {
            logger.log(ex.message, "error");
        }
    }
}