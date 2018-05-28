export class JpPostBranch {
  private static _kansuji = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  private static _kansujiYomi = [
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
  ]
  private _branchName: string
  private _branchKana: string
  private _branchCode: string

  constructor(branchCode: string) {
    if (branchCode.length !== 3) {
      throw Error('支店番号が不正です')
    }
    this._branchKana = branchCode
      .split('')
      .map(e => {
        return JpPostBranch._kansujiYomi[parseInt(e, 0)]
      })
      .join('')
    this._branchName = branchCode
      .split('')
      .map(e => {
        return JpPostBranch._kansuji[parseInt(e, 0)]
      })
      .join('')
    this._branchCode = branchCode
  }

  get code() {
    return this._branchCode
  }

  get name() {
    return this._branchName
  }

  get kana() {
    return this._branchKana
  }
}
