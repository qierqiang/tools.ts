"use strict";
var LocalStorageHelper = (function () {
    function LocalStorageHelper() {
    }
    /**
     * 查找指定的键名，如查找a,则会返回 a, a_1, a_2, ...
     * @param {string} name 键名
     * @param {*} callback 回调方法，有一个参数：key
     */
    LocalStorageHelper.prototype.find = function (name, callback) {
        name = name.toLowerCase();
        if (!callback) {
            return;
        }
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i).toLowerCase();
            //全匹配则回调
            if (key === name) {
                if (!callback(key)) {
                    break;
                }
            }
            else if (key.indexOf("_") >= 0) {
                if (key.substr(0, key.indexOf("_")) === name) {
                    if (!callback(key)) {
                        break;
                    }
                }
            }
        }
    };
    /**
     * 查找某个键名的最大ID值，如：a键名最大值是a_12，则返回12
     * @param {string} key 键名
     * @returns {number} id值
     */
    LocalStorageHelper.prototype.getMaxId = function (name) {
        var id = 0;
        this.find(name, function (key) {
            if (key.indexOf("_") >= 0) {
                var tmp = parseInt(key.substr(key.indexOf("_") + 1));
                if (tmp > id) {
                    id = tmp;
                }
            }
        });
        return id;
    };
    /**
     * 添加一条记录
     * @param {string} name 名称（键名前缀）
     * @param {string} val 记录内容
     * @returns {number} 添加的记录的id
     */
    LocalStorageHelper.prototype.add = function (name, val) {
        var id = this.getMaxId(name) + 1;
        var key = name + "_" + id.toString();
        localStorage.setItem(key, val);
        return id;
    };
    /**
     * 清空指定名称的内容
     * @param {string} name 名称（键名前缀）
     */
    LocalStorageHelper.prototype.clear = function (name) {
        this.find(name, function (key) {
            localStorage.removeItem(key);
        });
    };
    /**
     * 读取指定名称的所有记录
     *
     * @param {string} name 名称（键名前缀）
     * @returns {string[]} 数组
     */
    LocalStorageHelper.prototype.readAll = function (name) {
        var arr = [];
        this.find(name, function (key) {
            arr.push(localStorage.getItem(key));
        });
        return arr;
    };
    return LocalStorageHelper;
}());
exports.lsHelper = new LocalStorageHelper();
