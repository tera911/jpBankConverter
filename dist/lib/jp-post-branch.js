"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JpPostBranch = /** @class */ (function () {
    function JpPostBranch(branchCode) {
        if (branchCode.length !== 3) {
            throw Error('支店番号が不正です');
        }
        this._branchKana = branchCode
            .split('')
            .map(function (e) {
            return JpPostBranch._kansujiYomi[parseInt(e, 0)];
        })
            .join('');
        this._branchName = branchCode
            .split('')
            .map(function (e) {
            return JpPostBranch._kansuji[parseInt(e, 0)];
        })
            .join('');
        this._branchCode = branchCode;
    }
    Object.defineProperty(JpPostBranch.prototype, "code", {
        get: function () {
            return this._branchCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpPostBranch.prototype, "name", {
        get: function () {
            return this._branchName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JpPostBranch.prototype, "kana", {
        get: function () {
            return this._branchKana;
        },
        enumerable: true,
        configurable: true
    });
    JpPostBranch._kansuji = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    JpPostBranch._kansujiYomi = [
        'ゼロ',
        'イチ',
        'ニ',
        'サン',
        'ヨン',
        'ゴ',
        'ロク',
        'ナナ',
        'ハチ',
        'キユウ'
    ];
    return JpPostBranch;
}());
exports.JpPostBranch = JpPostBranch;
//# sourceMappingURL=jp-post-branch.js.map