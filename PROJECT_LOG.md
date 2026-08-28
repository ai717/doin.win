# PROJECT_LOG.md — 开发进度日志

## 2026-08-29 · 发布到 GitHub
- 仓库：https://github.com/ai717/doin.win（公开，main 分支）
- 新增 `.gitignore`（含临时截图排除规则）

## 2026-08-29 · 站点图标
- 新增 `assets/favicon.svg`：像素风品牌图标（深底 + 白色像素 D + 粉色硬阴影 + 琥珀圆点），替换 emoji 占位 favicon

## 2026-08-29 · SEO 优化
- `index.html`：关键词化 title/description、canonical、Open Graph、Twitter Card、theme-color
- 新增 `robots.txt` + `sitemap.xml`（sitemap 仅含首页；sudoku 属独立子域名，不纳入）
- `js/main.js`：从 games.json 动态注入 JSON-LD（ItemList + VideoGame）
- 新增 `assets/og-image.png`（1200×630 像素风分享图），接入 og:image / twitter:image（大图模式）

## 2026-08-29 · 接入数独游戏卡片
- `games.json` 新增数独条目，链接子域名 `https://sudoku.doin.win`（emoji 占位，无 comingSoon，可点击）
- 验证了子域名绝对链接的卡片流程，无代码改动，仅改 JSON 即生效

## 2026-08-29 · 首页 MVP
- 搭建纯静态首页脚手架：`index.html` / `css/style.css` / `js/main.js`
- 复古像素风主题：深色底 + 霓虹色 + 硬边卡片 + CRT 扫描线 + Press Start 2P 字体
- 卡片网格由 `games.json` 数据驱动，支持封面图/emoji 占位、标签、"即将上线"徽标
- 响应式（手机 1 列 → 桌面多列）、键盘焦点态、减弱动效适配
- 预置示例条目：拧螺丝（/ningluosi/，coming soon）
- 建立项目文档：AGENTS.md / PROJECT_LOG.md / README.md

## 待办
- [ ] 接入第一款真实游戏（拧螺丝）：确定卡片封面规范
- [ ] 部署方案与域名绑定
