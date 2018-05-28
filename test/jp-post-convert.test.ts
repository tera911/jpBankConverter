import { JpPostBranch } from '../src/jp-post-branch'
import JpPostConvert from '../src/jp-post-convert'

describe('jp post branch', () => {
  it('正しく支店情報を出力できているかどうか？', () => {
    expect(new JpPostBranch('259').code).toBe('259')
    expect(new JpPostBranch('259').kana).toBe('ニゴキユウ')
    expect(new JpPostBranch('259').name).toBe('二五九')
    expect(() => {
      const jppost = new JpPostBranch('25')
    }).toThrowError()
  })
})

describe('jp post converter', () => {
  it('ゆうちょ口座正しく変換できるかどうか？', () => {
    expect(() => {
      let a = new JpPostConvert('2323', '', '3232')
    }).toThrowError()
    expect(
      new JpPostConvert('15120', '', '07654321').toJpBranch().code
    ).toEqual('518')
    expect(new JpPostConvert('15120', '', '07654321').toBankNumber()).toEqual(
      '0765432'
    )
    expect(new JpPostConvert('15120', '', '07654321').isNormalType()).toEqual(
      true
    )

    expect(new JpPostConvert('00980', '1', '122903').toJpBranch().code).toEqual(
      '099'
    )
    expect(new JpPostConvert('00980', '1', '122903').toBankNumber()).toEqual(
      '0122903'
    )
    expect(new JpPostConvert('00980', '1', '122903').isNormalType()).toEqual(
      false
    )
  })
})
