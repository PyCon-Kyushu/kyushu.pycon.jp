# NAME

PyCon Kyushu - 2018年夏開催の Python カンファレンスイベント

# SYNOPSIS

## URL

- <http://kyushu.pycon.jp/> - PyCon Kyushu 2018

## DEPLOY

### GitHub Pages によるサイト公開

```
(github collaborator に登録されている前提で)
(任意のディレクトリにリポジトリ作成)
$ git clone git@github.com:PyCon-Kyushu/kyushu.pycon.jp.git

(サイト公開は gh-pages ブランチで更新)
$ git status
On branch gh-pages
Your branch is up-to-date with 'origin/gh-pages'.
...

(更新作業後、コミット名は任意でわかりやすく)
$ git add .
$ git commit -m 'add index'
$ git push
```

# DESCRIPTION

## DESIGN

### デザインテンプレートについて

```
ダウンロードデータは
/doc/WB08F5R94.zip
元データは
/doc/Tyumen-v1.0.org
になります。
オリジナルテンプレートは書き換えない様にしてください。
デザインの例は
/doc/Tyumen-v1.0.org/index.html
を表示してみてください。
テンプレートは Bootstrap v3.3.1 ベースでできています。
/assets
配下を書き換えてデザインの変更をしてください。
```

# TODO

- ~~ドメイン `http://...pycon.jp` のような形にしたい~~
- html の中に `TODO: ` というメモを残している
- ファビコンを設定
- ~~メインの背景画像は九州らしいものがいいかもしれない~~
- Facebook ページと Twitter の埋め込み
- PyCon JP ブログへのリンク
- キーノートの紹介
- スポンサー募集の概要と詳細へのリンク
- 一般スピーカー募集の概要と詳細へのリンク
- チケット販売の概要と詳細へのリンク
- トーク以外の企画の紹介
- 前夜祭の概要と詳細へのリンク
- 一般スピーカーの紹介と詳細へのリンク
- イベント当日のスケジュール(プログラム)
- スポンサー名の表示とサイトへのリンク

# SEE ALSO

- <https://wrapbootstrap.com/> - テンプレートサイト
- <https://wrapbootstrap.com/theme/tyumen-coming-soon-template-WB08F5R94> - 採用テンプレート
