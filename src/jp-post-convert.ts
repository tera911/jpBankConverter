import { JpPostBranch } from './jp-post-branch'

export default class JpPostConvert {
  private _symbol1: string
  private _symbol2: string
  private _jNumber: string

  constructor(symbol1: string, symbol2: string, jNumber: string) {
    this._symbol1 = symbol1
    this._symbol2 = symbol2.length === 0 ? '0' : symbol2
    this._jNumber = jNumber

    if (!this.validate()) {
      throw new Error('口座情報が不正です。')
    }
  }

  toJpBranch(): JpPostBranch {
    let branchCode = '0'
    if (this.isNormalType()) {
      branchCode = this._symbol1.substr(1, 2) + '8'
    } else {
      branchCode = this._symbol1.substr(1, 2) + '9'
    }
    return new JpPostBranch(branchCode)
  }

  toBankNumber(): string {
    if (this.isNormalType()) {
      return ('00000000' + this._jNumber)
        .substr(('00000000' + this._jNumber).length - 8)
        .substr(0, 7)
    } else {
      return ('0000000' + this._jNumber).substr(
        ('0000000' + this._jNumber).length - 7
      )
    }
  }

  public isNormalType(): boolean {
    return !(this._symbol2.substr(0, 1) === '1')
  }

  private validate(): boolean {
    let isNormal = this.isNormalType()
    let c = this._symbol1.substr(1, 2)

    let s1 = this._symbol1
    let s2 = this._symbol2
    let s3 = this._jNumber

    /** どれか一つでもNGならエラー */
    return !(
      !s1.match(/^\d{5}$/) ||
      !s2.match(/^\d?$/) ||
      (isNormal && !s3.match(/^\d{1,8}$/)) ||
      (!isNormal && !s3.match(/^\d{1,6}$/)) ||
      !s1.match(/^[01]/) ||
      !s1.match(/0$/) ||
      (isNormal && !s3.match(/1$/)) ||
      !this.checkDigit()
    )
  }

  private checkDigit(): boolean {
    let s1 = this._symbol1
    let s3 = this._jNumber
    let digit = parseInt(s1.substr(3, 1), 0)

    let numbers = ('00000000' + this._jNumber).substr(
      ('00000000' + this._jNumber).length - 8
    )

    let list: string[] = [
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
    ]

    let total = list
      .map((e, i) => {
        let num = parseInt(e, 0)
        let c: number = 0
        if (i % 3 === 0) {
          c = num
        } else if (i % 3 === 1) {
          if (num > 4) {
            c = num * 2 - 9
          } else {
            c = num * 2
          }
        } else if (i % 3 === 2) {
          c = num * 3
        }
        return c
      })
      .reduce((a, b) => {
        return a + b
      }, 0)
    return total % 10 === digit
  }
}
