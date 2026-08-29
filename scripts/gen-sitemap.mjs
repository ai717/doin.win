// 由 games.json（唯一数据源）生成 sitemap.xml。
// 约定：每个游戏的 url 为 "/<slug>/" 时拼接 SITE；为完整域名时原样使用。
// comingSoon 的游戏暂不收录（上线后再自动进 sitemap）。
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://doin.win";

const root = new URL("../", import.meta.url);
const games = JSON.parse(readFileSync(new URL("games.json", root), "utf8")).games;

const urls = [SITE + "/"];
for (const g of games) {
  if (g.comingSoon) continue;
  const u = g.url.startsWith("http") ? g.url : SITE + g.url;
  urls.push(u);
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u}</loc>\n    <changefreq>weekly</changefreq>\n` +
        `    <priority>${u === SITE + "/" ? "1.0" : "0.8"}</priority>\n  </url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;

writeFileSync(new URL("sitemap.xml", root), xml);
console.log(`sitemap.xml generated: ${urls.length} url(s) -> ${urls.join(", ")}`);
