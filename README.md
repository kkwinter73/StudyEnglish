# StudyEnglish 📚 — 英語を学ぶ記録

ネイティブが日常会話でよく使う英語表現を書きためる勉強ログ。技術ブログ寄りで、ちょっと遊び心も。
[Astro](https://astro.build) 製の静的サイトで、記事は Markdown で管理する。

```
~/study/english $ man everyday-english
```

## 開発

```bash
npm install        # 初回のみ
npm run dev        # http://localhost:4321/StudyEnglish/ でプレビュー（ホットリロード）
npm run build      # 本番ビルド → dist/
npm run preview    # ビルド結果をローカル確認
npm run check      # 型 + content schema の検証
```

必要環境: Node.js 18+。
base パス（`/StudyEnglish`）を設定しているため、ローカルでも URL は `/StudyEnglish/` 始まりになる。

## 記事を書く

1. `src/content/posts/<slug>.md` を作る（1記事=1ファイル）。
2. frontmatter を付ける（必須: `title` / `date` / `summary`、任意: `tags` / `level` / `draft`）。

```markdown
---
title: "「How are you?」だけじゃない — ネイティブの挨拶と別れ際"
date: 2026-06-20
summary: "教科書の挨拶から一歩出て、ネイティブが毎日使う挨拶と別れ際の定番を覚える。"
tags: ["あいさつ", "基礎"]
level: beginner   # beginner | intermediate | advanced
---

本文（Markdown）...
```

Notion のメモから起こす場合は、Claude Code で **`/new-log`** を使うと整形して追加できる。
書き方の詳細は [.claude/rules/content.md](.claude/rules/content.md)。

## プロジェクト構成

```
src/
  content/posts/   記事(Markdown)。1記事=1ファイル
  content.config.ts frontmatter スキーマ（型の真実源）
  pages/           ルーティング（一覧 / 記事 / タグ / map / drill / practice / about / 404）
  layouts/         Base / Post レイアウト
  components/      Header / Footer / PostCard / DrillApp / ShadowingList / TodayPhrase
  styles/global.css 配色・デザイン（cyan #00ADD8 が基調）
  site.ts          サイト設定（タイトル・ナビ・文言）
  roadmap.ts       学習マップ（/map）のデータ
  phrases.ts       記事本文から練習用データを抽出（drill / practice の源泉）
docs/              知識の置き場所（SoT 表・意思決定ログ・ハーネス解説）
.claude/           開発ハーネス（hooks / rules / skills / settings）
scripts/           decisions 索引の生成
```

## 練習機能（話すための学習）

記事の書式（「**英語** — 日本語」と ```text 会話例）からビルド時に自動抽出される。
記事を足すだけで練習素材も増える（[decision 0004](docs/decisions/0004-practice-features.md)）。

- **/drill/** — 瞬間英作文ドリル。日本語→英語の想起テスト。「覚えた」は localStorage に保存
- **/practice/** — シャドーイング。全会話例をブラウザ読み上げ（Web Speech API）で練習
- **トップの「今日のフレーズ」** — 日替わりで1表現を表示

## デプロイ（GitHub Pages）

`main` に push すると GitHub Actions（`.github/workflows/deploy.yml`）が自動でビルド・公開する。

- 公開URL: **https://kkwinter73.github.io/StudyEnglish/**
- 初回のみ GitHub の **Settings → Pages → Build and deployment → Source** を
  **「GitHub Actions」** にする（CLI から有効化済みなら設定不要）。
- 公開URLが変わる場合（独自ドメイン等）は `astro.config.mjs` の `site` / `base` を更新する。
  独自ドメインをルートで使うなら `base` を `"/"` に戻す。

内部リンクは `base` を意識しなくてよい。コンポーネントは `withBase()`（`src/site.ts`）、
Markdown 本文の `/posts/...` は rehype プラグインが自動で base を前置する。

## 開発環境について

このリポは「AIエージェント・ハーネスエンジニアリング」の原則を個人運用向けに簡略化して
取り入れている（必読の場所へルールをインライン＋hookで裏打ち、知識は1か所に薄く）。
仕組みは [docs/dev-environment/harness.md](docs/dev-environment/harness.md) を参照。
