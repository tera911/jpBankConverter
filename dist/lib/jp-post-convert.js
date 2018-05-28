"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jp_post_branch_1 = require("./jp-post-branch");
var JpPostConvert = /** @class */ (function () {
    function JpPostConvert(symbol1, symbol2, jNumber) {
        this._symbol1 = symbol1;
        this._symbol2 = symbol2.length === 0 ? '0' : symbol2;
        this._jNumber = jNumber;
        if (!this.validate()) {
            throw new Error('口座情報が不正です。');
        }
    }
    JpPostConvert.prototype.toJpBranch = function () {
        var branchCode = '0';
        if (this.isNormalType()) {
            branchCode = this._symbol1.substr(1, 2) + '8';
        }
        else {
            branchCode = this._symbol1.substr(1, 2) + '9';
        }
        return new jp_post_branch_1.JpPostBranch(branchCode);
    };
    JpPostConvert.prototype.toBankNumber = function () {
        if (this.isNormalType()) {
            return ('00000000' + this._jNumber)
                .substr(('00000000' + this._jNumber).length - 8)
                .substr(0, 7);
        }
        else {
            return ('0000000' + this._jNumber).substr(('0000000' + this._jNumber).length - 7);
        }
    };
    JpPostConvert.prototype.isNormalType = function () {
        return !(this._symbol2.substr(0, 1) === '1');
    };
    JpPostConvert.prototype.validate = function () {
        var isNormal = this.isNormalType();
        var c = this._symbol1.substr(1, 2);
        var s1 = this._symbol1;
        var s2 = this._symbol2;
        var s3 = this._jNumber;
        /** どれか一つでもNGならエラー */
        return !(!s1.match(/^\d{5}$/) ||
            !s2.match(/^\d?$/) ||
            (isNormal && !s3.match(/^\d{1,8}$/)) ||
            (!isNormal && !s3.match(/^\d{1,6}$/)) ||
            !s1.match(/^[01]/) ||
            !s1.match(/0$/) ||
            (isNormal && !s3.match(/1$/)) ||
            !this.checkDigit());
    };
    JpPostConvert.prototype.checkDigit = function () {
        var s1 = this._symbol1;
        var s3 = this._jNumber;
        var digit = parseInt(s1.substr(3, 1), 0);
        var numbers = ('00000000' + this._jNumber).substr(('00000000' + this._jNumber).length - 8);
        var list = [
            numbers.substr(numbers.length - 1, 1),
            numbers.substr(numbers.length - 2, 1),
            numbers.substr(numbers.length - 3, 1),
            numbers.substr(numbers.length - 4, 1),
            numbers.substr(numbers.length - 5, 1),
            numbers.substr(numbers.length - 6, 1),
            numbers.substr(numbers.length - 7, 1),
            numbers.substr(numbers.length - 8, 1),
            s1.substr(4, 1),
            '0',
            s1.substr(2, 1),
            s1.substr(1, 1),
            s1.substr(0, 1)
        ];
        var total = list
            .map(function (e, i) {
            var num = parseInt(e, 0);
            var c = 0;
            if (i % 3 === 0) {
                c = num;
            }
            else if (i % 3 === 1) {
                if (num > 4) {
                    c = num * 2 - 9;
                }
                else {
                    c = num * 2;
                }
            }
            else if (i % 3 === 2) {
                c = num * 3;
            }
            return c;
        })
            .reduce(function (a, b) {
            return a + b;
        }, 0);
        return total % 10 === digit;
    };
    return JpPostConvert;
}());
exports.default = JpPostConvert;
//# sourceMappingURL=jp-post-convert.js.map