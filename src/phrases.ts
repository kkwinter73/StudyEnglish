// 記事本文から練習用データ（フレーズ・会話例）を抽出する。
// 抽出元は記事の書式そのもの:「**English** — 日本語」の行と ```text の会話例＋直後の（和訳）。
// この書式が練習機能の SoT なので、変えるときは .claude/rules/content.md と合わせて更新する。

export interface Phrase {
  en: string;
  ja: string;
}

const stripCode = (body: string) => body.replace(/```[\s\S]*?```/g, "");

// 「**English** — 日本語」をどこにあっても拾う（箇条書き・表のセル内の両対応）。
// en は英字始まりに限定し、日本語の太字見出し等を除外する。
export function extractPhrases(body: string): Phrase[] {
  const text = stripCode(body);
  const out: Phrase[] = [];
  const seen = new Set<string>();
  const push = (enRaw: string, jaRaw: string) => {
    const en = enRaw.trim();
    const ja = jaRaw.replace(/\*\*/g, "").trim();
    if (!en || !ja || seen.has(en)) return;
    if (!/^[A-Za-z"'(]/.test(en)) return; // 英語表現のみ
    if (!/[ぁ-んァ-ン一-龯]/.test(ja)) return; // 訳側に日本語がないものは除外
    if (en.length > 120 || ja.length > 120) return;
    seen.add(en);
    out.push({ en, ja });
  };
  // パターン1: **En** — Ja（行中どこでも。表セル内も拾う）
  for (const m of text.matchAll(/\*\*([^*\n]+)\*\*\s*—\s*([^\n|]+)/g)) push(m[1], m[2]);
  // パターン2: 表の | **En** | Ja | 形式（訳が隣のセルにあるもの）
  for (const m of text.matchAll(/^\|\s*\*\*([^*\n|]+)\*\*\s*\|\s*([^|\n]+)\|/gm)) push(m[1], m[2]);
  return out;
}

export interface DialogueLine {
  speaker: string;
  text: string;
}

export interface Dialogue {
  lines: DialogueLine[];
  /** 直後の（…）行の和訳。無ければ空文字 */
  ja: string;
}

// ```text ブロック（A:/B: 形式）と直後の（和訳）行を抽出する
export function extractDialogues(body: string): Dialogue[] {
  const out: Dialogue[] = [];
  const re = /```text\n([\s\S]*?)```(?:\s*\n\s*（([\s\S]*?)）)?/g;
  for (const m of body.matchAll(re)) {
    const lines: DialogueLine[] = m[1]
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => {
        const lm = l.match(/^([A-Z]):\s*(.+)$/);
        return lm ? { speaker: lm[1], text: lm[2] } : { speaker: "", text: l };
      });
    if (lines.length === 0) continue;
    out.push({ lines, ja: (m[2] ?? "").replace(/\s+/g, " ").trim() });
  }
  return out;
}
