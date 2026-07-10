// サイト全体の設定。文言やナビを変えたいときはここだけ触ればよい（設定値で吸収する原則）。
export const SITE = {
  title: "StudyEnglish",
  tagline: "英語を学ぶ記録",
  description:
    "ネイティブが日常会話でよく使う英語表現を少しずつ書きためる勉強ログ。技術ブログ風の見た目で、ちょっと遊び心も。",
  author: "kkwinter73",
  // 画面右上などに出すターミナル風プロンプト（遊び心）
  prompt: "~/study/english",
  lang: "ja",
  nav: [
    { label: "Logs", href: "/" },
    { label: "Tags", href: "/tags/" },
    { label: "About", href: "/about/" },
  ],
} as const;

// トップの logs 一覧で1ページに表示する件数。ここを変えるだけでページ送りの粒度が変わる。
export const PAGE_SIZE = 8;

export const LEVELS = {
  beginner: { label: "beginner", emoji: "🌱" },
  intermediate: { label: "intermediate", emoji: "⚙️" },
  advanced: { label: "advanced", emoji: "🚀" },
} as const;

// 日本語混在を考慮したざっくり読了時間（文字数ベース・依存ゼロ）
export function readingTime(body: string | undefined): number {
  if (!body) return 1;
  const text = body.replace(/```[\s\S]*?```/g, "").replace(/\s+/g, "");
  const minutes = Math.ceil(text.length / 500); // 約500字/分
  return Math.max(1, minutes);
}

// 内部リンクに base パス（GitHub Pages の /StudyEnglish 等）を前置する。
// 例: withBase("/posts/foo/") → "/StudyEnglish/posts/foo/"
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, ""); // "/StudyEnglish"
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
