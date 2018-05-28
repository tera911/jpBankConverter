# 使い方
 ```
let jpb = (new JpPostConvert("記号 5桁", "記号1桁 or 空文字列", "番号"));
jpb.toBankNumber(); => 口座情報
let b = jpb.toJpBranch();
b.code; //支店コード
b.name; //支店名
b.kana; //かな
 ```


 フォルダの中身は全然触ってません。いい感じにどうぞ