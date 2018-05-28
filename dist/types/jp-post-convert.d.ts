import { JpPostBranch } from './jp-post-branch';
export default class JpPostConvert {
    private _symbol1;
    private _symbol2;
    private _jNumber;
    constructor(symbol1: string, symbol2: string, jNumber: string);
    toJpBranch(): JpPostBranch;
    toBankNumber(): string;
    isNormalType(): boolean;
    private validate();
    private checkDigit();
}
