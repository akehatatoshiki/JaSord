# JaSord
2014 
gparse.js
必要なデータのみパースするJSONパーサ
呼び出し方
var objs = gparse(JSON,pattern);
パターンの記法
-------------------------------------------
キー ::= 任意の文字列\\
関数 ::= 関数オブジェクト\\
正規表現 ::= 正規表現オブジェクト\\

パターン配列 ::= {[{プロパティ : パターン }*]}
プロパティ ::= キー
パターン   ::= "\_" | 正規表現 | 関数
-------------------------------------------
*は0回以上の繰り返し


Graph.js
統一的なグラフを構築するモジュール
メソッド一覧
-------------------------------------------
add(objs,identity)|グラフにノードを追加するメソッド
link(src,dst,edge)|エッジを張るメソッド
vertex(identity)  |指定したアイデンティティを持つノードを探すメソッド
copy()            |グラフをコピーするメソッド
del(identity)     |指定したアイデンティティを持つノードを削除するメソッド
clear()           |グラフ内すべてのノードを消去するメソッド
show()            |グラフ内すべてのノードを配列にして返すメソッド
matcher(pattern)  |グラフに対し指定したパターンにマッチするものを探索するメソッド
-------------------------------------------