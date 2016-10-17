"use strict";
/**
 * 花
 */
var Flower = (function () {
    function Flower(name, period, x, y, id, note, offSet, isLarge) {
        this.name = name;
        this.period = period;
        this.x = x;
        this.y = y;
        this.id = id;
        this.note = note;
        this.offSet = offSet;
        this.isLarge = isLarge;
        this.wateredDate = new Date(2016, 7, 30);
        this.wet = 0;
        this.dry = 100;
        this.wateredDaysToNow = 0;
        this.today = new Date();
        this.today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    }
    /**
     * 取得上次浇水日期
     */
    Flower.prototype.getWateredDate = function () {
        var val = localStorage.getItem(this.id);
        if (val != undefined) {
            this.wateredDate = new Date(val);
            this.wateredDate = new Date(this.wateredDate.getFullYear(), this.wateredDate.getMonth(), this.wateredDate.getDate());
        }
        this.wateredDaysToNow = Math.round((this.today - this.wateredDate) / 1000 / 60 / 60 / 24);
        //设置干湿程度
        var days = (this.today - this.wateredDate) / 1000 / 60 / 60 / 24;
        if (days > (this.period + this.offSet)) {
            this.wet = 0;
            this.dry = 100;
        }
        else {
            this.dry = (days / (this.period + this.offSet)) * 100;
            this.wet = 100 - this.dry;
        }
    };
    /**
     * 标记今天已浇水
     */
    Flower.prototype.setWateredDate = function () {
        localStorage.setItem(this.id, this.today.toString());
    };
    return Flower;
}());
exports.Flower = Flower;
