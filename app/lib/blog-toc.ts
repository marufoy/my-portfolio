import * as cheerio from "cheerio";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3 | 4;
}

export type InjectTocOptions = {
  /** 自動付与する id の接頭辞（例: blog-heading, column-heading） */
  idPrefix?: string;
};

/**
 * 本文HTML内の h2〜h4 にアンカー用 id を付与し、目次用データを返す。
 * 既に id がある見出しはそのまま利用する。
 */
export function injectHeadingIdsAndBuildToc(
  html: string,
  options?: InjectTocOptions
): {
  html: string;
  toc: TocItem[];
} {
  if (!html?.trim()) {
    return { html: "", toc: [] };
  }

  const idPrefix = options?.idPrefix ?? "content-heading";

  const $ = cheerio.load(html, null, false);
  const toc: TocItem[] = [];
  let autoSlug = 0;

  $("h2, h3, h4").each((_, el) => {
    const tag = el.tagName?.toLowerCase();
    if (tag !== "h2" && tag !== "h3" && tag !== "h4") return;
    const level = Number(tag[1]) as 2 | 3 | 4;
    const $el = $(el);
    const text = $el.text().trim();
    if (!text) return;

    let id = $el.attr("id")?.trim();
    if (!id) {
      id = `${idPrefix}-${autoSlug}`;
      $el.attr("id", id);
      autoSlug += 1;
    }
    toc.push({ id, text, level });
  });

  return {
    html: $.root().html() ?? html,
    toc,
  };
}
