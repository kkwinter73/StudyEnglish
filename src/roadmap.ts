// 学習マップ（/map）のデータ定義（SoT）。記事をドメインに束ね、ドメイン間の依存を宣言する。
// 記事タイトルは持たない（collection から slug で引く）。新記事を足したら slugs に1行足すだけ。
// tier は読む順の大きな段（土台→伝える→場面別→磨く）。deps は前提となるドメイン id。

export type Lang = "ja" | "en";

export const TIERS: ReadonlyArray<{ n: number; ja: string; en: string }> = [
  { n: 1, ja: "土台 — 会話のキャッチボール", en: "Foundations — keeping the conversation going" },
  { n: 2, ja: "伝える — 気持ちと意図を出す", en: "Express — getting your intent across" },
  { n: 3, ja: "場面別 — その場でそのまま使う", en: "Scenes — ready-to-use phrases by situation" },
  { n: 4, ja: "磨く — ネイティブらしさを足す", en: "Polish — sounding more natural" },
];

export interface Domain {
  id: string;
  tier: number;
  icon: string;
  ja: { label: string; blurb: string };
  en: { label: string; blurb: string };
  deps: string[]; // 前提ドメインの id
  slugs: string[]; // 読む順に並べた記事 slug
}

export const DOMAINS: ReadonlyArray<Domain> = [
  {
    id: "flow",
    tier: 1,
    icon: "💬",
    ja: { label: "会話のキャッチボール", blurb: "あいさつ・あいづち・聞き返し。会話を止めない基本装備。" },
    en: { label: "Conversation Flow", blurb: "Greetings, backchannels, asking again — the gear that keeps talk alive." },
    deps: [],
    slugs: [
      "greetings-beyond-hello",
      "aizuchi-backchannel",
      "reaction-phrases",
      "asking-to-repeat",
    ],
  },
  {
    id: "feelings",
    tier: 2,
    icon: "🙏",
    ja: { label: "頼む・感謝する・謝る", blurb: "人間関係を丸くする3点セット。丁寧さの度合いがカギ。" },
    en: { label: "Requests, Thanks & Apologies", blurb: "The trio that keeps relationships smooth — politeness levels are the key." },
    deps: ["flow"],
    slugs: ["polite-requests", "thanks-and-replies", "apologies-in-english"],
  },
  {
    id: "opinions",
    tier: 2,
    icon: "🗣️",
    ja: { label: "意見を言う・誘う", blurb: "断定しすぎずに自分を出す。誘いへの返事も自然に。" },
    en: { label: "Opinions & Invitations", blurb: "Speaking your mind without sounding blunt — and replying to invites naturally." },
    deps: ["flow"],
    slugs: ["giving-opinions-softly", "agreeing-and-disagreeing", "invitations-and-plans"],
  },
  {
    id: "out",
    tier: 3,
    icon: "🍽️",
    ja: { label: "外に出る（店・旅行）", blurb: "カフェ・買い物・空港。決まり文句を知っていれば怖くない。" },
    en: { label: "Out & About (Shops, Travel)", blurb: "Cafés, shopping, airports — set phrases take the fear away." },
    deps: ["flow", "feelings"],
    slugs: ["cafe-and-restaurant", "shopping-phrases", "travel-essentials"],
  },
  {
    id: "social",
    tier: 3,
    icon: "🏢",
    ja: { label: "職場と雑談", blurb: "会議の定番表現と、沈黙を埋めるスモールトーク。" },
    en: { label: "Work & Small Talk", blurb: "Meeting staples, plus small talk to fill the silence." },
    deps: ["flow", "opinions"],
    slugs: ["workplace-english", "small-talk-topics", "talking-about-your-weekend", "sharing-news"],
  },
  {
    id: "native",
    tier: 4,
    icon: "✨",
    ja: { label: "ネイティブらしさ", blurb: "句動詞・イディオム・音の縮約。教科書との差はここに出る。" },
    en: { label: "Sounding Native", blurb: "Phrasal verbs, idioms, contractions — where textbook English ends." },
    deps: ["flow"],
    slugs: ["daily-phrasal-verbs", "everyday-idioms", "casual-contractions"],
  },
  {
    id: "nuance",
    tier: 4,
    icon: "🎚️",
    ja: { label: "ニュアンス調整", blurb: "フィラーと和らげ表現、どこでも効く万能フレーズ。" },
    en: { label: "Tuning the Nuance", blurb: "Fillers, softeners, and all-purpose phrases that work anywhere." },
    deps: ["opinions"],
    slugs: ["fillers-and-softeners", "versatile-phrases"],
  },
];
