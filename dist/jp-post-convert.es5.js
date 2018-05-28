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
        return new JpPostBranch(branchCode);
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

export default JpPostConvert;
//# sourceMappingURL=jp-post-convert.es5.js.map
