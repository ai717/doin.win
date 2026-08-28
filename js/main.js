/**
 * DOIN.WIN 首页：读取 games.json 渲染游戏卡片。
 * 唯一数据源为根目录 games.json，新增/修改游戏无需改动页面代码。
 */

// 卡片强调色轮换（对应 CSS 变量）
const ACCENTS = ["#4de8e0", "#ff5db1", "#ffc94d", "#9d7bff"];

const grid = document.getElementById("game-grid");

document.getElementById("year").textContent = new Date().getFullYear();

function createCard(game, index) {
  const card = document.createElement("a");
  card.className = "game-card" + (game.comingSoon ? " is-soon" : "");
  card.href = game.url || "#";
  card.style.setProperty("--card-accent", ACCENTS[index % ACCENTS.length]);

  if (game.comingSoon) {
    // 即将上线：不可跳转
    card.addEventListener("click", (e) => e.preventDefault());
    card.setAttribute("aria-disabled", "true");
    card.tabIndex = -1;
  }

  // 封面：有图用图，无图用 emoji 占位
  const cover = document.createElement("div");
  cover.className = "card-cover";
  if (game.cover) {
    const img = document.createElement("img");
    img.src = game.cover;
    img.alt = `${game.title} 封面`;
    img.loading = "lazy";
    cover.appendChild(img);
  } else {
    const icon = document.createElement("span");
    icon.className = "card-icon";
    icon.textContent = game.icon || "🎮";
    icon.setAttribute("aria-hidden", "true");
    cover.appendChild(icon);
  }
  if (game.comingSoon) {
    const badge = document.createElement("span");
    badge.className = "badge-soon";
    badge.textContent = "COMING SOON";
    cover.appendChild(badge);
  }
  card.appendChild(cover);

  // 文字区
  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = game.title;
  body.appendChild(title);

  if (game.desc) {
    const desc = document.createElement("p");
    desc.className = "card-desc";
    desc.textContent = game.desc;
    body.appendChild(desc);
  }

  if (Array.isArray(game.tags) && game.tags.length) {
    const tags = document.createElement("div");
    tags.className = "card-tags";
    for (const t of game.tags) {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = t;
      tags.appendChild(tag);
    }
    body.appendChild(tags);
  }

  card.appendChild(body);
  return card;
}

function showError(msg) {
  const p = document.createElement("p");
  p.className = "load-err";
  p.textContent = msg;
  grid.appendChild(p);
}

// SEO：根据游戏清单注入 JSON-LD 结构化数据
function injectJsonLd(games) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DOIN.WIN 小游戏合集",
    url: "https://doin.win/",
    itemListElement: games.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoGame",
        name: g.title,
        description: g.desc,
        url: new URL(g.url, location.href).href,
        gamePlatform: "Web Browser",
      },
    })),
  });
  document.head.appendChild(script);
}

async function init() {
  try {
    const res = await fetch("games.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { games } = await res.json();

    if (!Array.isArray(games) || games.length === 0) {
      showError("游戏列表为空 · GAMES COMING SOON");
      return;
    }

    const frag = document.createDocumentFragment();
    games.forEach((game, i) => frag.appendChild(createCard(game, i)));
    grid.appendChild(frag);
    injectJsonLd(games);
  } catch (err) {
    console.error("[doin.win] 加载 games.json 失败:", err);
    showError("无法加载游戏列表 · 请通过本地服务器访问（如 npx serve）");
  }
}

init();
