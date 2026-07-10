import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { byLang, localizeHref, postSlug } from "../i18n";
import { extractPhrases } from "../phrases";

// ビルド時に全日本語記事から「**English** — 日本語」ペアを抽出して JSON で吐く。
// /drill/（瞬間英作文）とトップの「今日のフレーズ」がこれを fetch する。
export const GET: APIRoute = async () => {
  const posts = (await getCollection("posts", byLang("ja"))).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  const items = posts.flatMap((p) =>
    extractPhrases(p.body ?? "").map((ph) => ({
      ...ph,
      title: p.data.title,
      tags: p.data.tags,
      url: localizeHref("ja", `/posts/${postSlug(p)}/`),
    })),
  );

  return new Response(JSON.stringify(items), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
};
