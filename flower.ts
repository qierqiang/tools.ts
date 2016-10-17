/**
 * 花
 */
export class Flower {
    wateredDate: any = new Date(2016, 7, 30);
    wet: number = 0;
    dry: number = 100;
    wateredDaysToNow: number = 0;
    private today: any = new Date();

    constructor(public name: string, public period: number, public x:number, public y:number, public id:string, public note:string, public offSet:number, public isLarge:boolean){ 
        this.today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    }

    /**
     * 取得上次浇水日期
     */
    getWateredDate(): void {
        let val = localStorage.getItem(this.id);
        if (val != undefined) {
            this.wateredDate = new Date(val);
            this.wateredDate = new Date(this.wateredDate.getFullYear(), this.wateredDate.getMonth(), this.wateredDate.getDate());
        }
        this.wateredDaysToNow = Math.round((this.today - this.wateredDate) / 1000 / 60 / 60 / 24);
        
        //设置干湿程度
        let days = (this.today - this.wateredDate) / 1000 / 60 / 60 / 24;
        if (days > (this.period + this.offSet)) {
            this.wet = 0;
            this.dry = 100;
        } else {
            this.dry = (days / (this.period + this.offSet)) * 100;
            this.wet = 100 - this.dry;
        }
    }

    /**
     * 标记今天已浇水
     */
    setWateredDate(): void {
        localStorage.setItem(this.id, this.today.toString());
    }
}