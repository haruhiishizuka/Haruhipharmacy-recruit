# MediMatch Instagram LP

MediMatch（医療職専門キャリア支援）のInstagram用ランディングページです。

## プロジェクト概要

急性期病院の事務長を経験した医療現場のプロフェッショナルが、医療従事者専門のキャリア支援を行うMediMatchのサービスを紹介するLPです。

## デザインコンセプト

- **カラーテーマ**
  - プライマリーブルー: #2B7BB9
  - ライトブルー: #F6FAFF
  - ホワイト: #FFFFFF
  - ベージュ: #F7EDE6

- **フォント**
  - メイン: M PLUS Rounded 1c
  - サブ: Noto Sans JP

## ディレクトリ構成

```
medimatch-instagram/
├── index.html           # メインHTMLファイル
├── css/
│   └── style.css       # スタイルシート
├── js/
│   └── script.js       # JavaScript機能
├── images/             # 画像フォルダ
│   ├── consultant_medimatch.jpg
│   ├── consultant_profile.jpg
│   └── counselor_photo.jpg
└── README.md           # このファイル
```

## セクション構成

1. **Hero** - ファーストビュー、メインメッセージ
2. **信頼訴求** - 経歴と実績の紹介
3. **価値提案** - MediMatchの5つの特徴
4. **カウンセラー紹介** - カウンセラーの詳細プロフィール
5. **FAQ** - よくある質問（6項目）
6. **CTA** - LINE/メールでの問い合わせ導線
7. **Footer** - フッター情報

## 主な機能

- **レスポンシブデザイン**: スマートフォン、タブレット、PCに対応
- **FAQアコーディオン**: クリックで開閉するFAQ機能
- **スムーススクロール**: アンカーリンクでなめらかにスクロール
- **スクロールアニメーション**: 要素がフェードインで表示

## セットアップ方法

### 1. 画像の準備

`images/` フォルダに以下の画像を配置してください：
- `consultant_medimatch.jpg` (800x600px以上)
- `consultant_profile.jpg` (400x400px以上)
- `counselor_photo.jpg` (400x500px以上)

詳細は `images/README.md` を参照してください。

### 2. ローカルで確認

ブラウザで `index.html` を開くだけで動作します。

ローカルサーバーを使用する場合：
```bash
# Python 3の場合
python -m http.server 8000

# Node.jsのhttp-serverを使う場合
npx http-server -p 8000
```

ブラウザで `http://localhost:8000` にアクセスしてください。

### 3. LINE/メールリンクの更新

`index.html` の以下の部分を実際のリンクに変更してください：

```html
<!-- LINE -->
<a href="https://line.me/R/ti/p/@medimatch">

<!-- メール -->
<a href="mailto:info@medimatch.jp">
```

## カスタマイズ方法

### カラー変更

`css/style.css` の `:root` セクションで色を変更できます：

```css
:root {
    --primary-blue: #2B7BB9;
    --light-blue: #F6FAFF;
    --white: #FFFFFF;
    --beige: #F7EDE6;
}
```

### フォント変更

`css/style.css` の `:root` セクションでフォントを変更できます：

```css
:root {
    --font-primary: 'M PLUS Rounded 1c', sans-serif;
    --font-secondary: 'Noto Sans JP', sans-serif;
}
```

### テキスト変更

`index.html` を直接編集してください。

## 対応ブラウザ

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- スマートフォンブラウザ

## デプロイ方法

### Netlifyにデプロイ

1. Netlifyアカウントにログイン
2. 「New site from Git」をクリック
3. リポジトリを選択
4. デプロイ設定（デフォルトでOK）
5. 「Deploy site」をクリック

### 静的ホスティングにアップロード

すべてのファイルをFTP/SCPでサーバーにアップロードしてください。

## 今後の拡張案

- [ ] プライバシーポリシーページの追加
- [ ] 運営会社情報ページの追加
- [ ] お問い合わせフォームの実装
- [ ] Google Analytics連携
- [ ] SEO最適化（メタタグ、構造化データ）

## ライセンス

© MediMatch｜医療従事者専門の人材紹介会社

## 連絡先

質問や要望があれば、開発担当者にお問い合わせください。

---

作成日: 2025年10月
バージョン: 1.0.0
