
export abstract class Watcher {
    private _timerHandle: number;

    constructor(public keywords: string[], public interval: number) { }
    
    /**
     * 开始检测
     */
    start(): void {
        clearInterval(this._timerHandle);
        this._timerHandle = setInterval(this.test(), this.interval);
    }
    
    /**
     * 停止检测
     */
    stop(): void {
        clearInterval(this._timerHandle);
    }

    /**
     * 执行检测
     */
    abstract test(): void;

    /**
     * 发出通知
     * @param {string} title 通知标题
     * @param {string} content 通知内容
     * @param {Function} clickCallBack 点击通知时调用的回调方法，有一个参数：Notification的实例
     */
    notify(title: string, content: string, clickCallBack: Function): void {
        if ("Notification" in window) {
            let Notification = window["Notification"];
            if (Notification.Permission === 'granted') {
                let n = new Notification(title, {body: content});
                n.onclick = function(n) { clickCallBack(n); };
            } else {
                alert('通知功能已禁用！');
            }
        } else {
            alert('你的浏览器不支持通知！请更换浏览器。');
        }
    }
}