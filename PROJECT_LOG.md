# PROJECT_LOG.md — 开发进度日志

## 2026-08-29 · 本会话：从零到 GitHub Pages 上线

### 完成内容
1. **首页 MVP**：复古像素风门户（深底霓虹色、硬边卡片、CRT 扫描线、Press Start 2P），`games.json` 数据驱动卡片网格，响应式 + 键盘焦点 + 减弱动效
2. **游戏卡片接入**：数独（`https://sudoku.doin.win`，可点击）、拧螺丝（`/ningluosi/`，coming soon）
3. **SEO**：关键词化 title/description、canonical、Open Graph、Twitter Card（大图）、JSON-LD（动态注入）、robots.txt、sitemap.xml、og-image.png（1200×630）
4. **品牌图标**：assets/favicon.svg（像素 D + 粉色硬阴影 + 琥珀点）
5. **发布**：GitHub 仓库 `ai717/doin.win`（main）+ Pages 启用 + CNAME 绑定 doin.win

### 修改文件
`index.html` `css/style.css` `js/main.js` `games.json` `robots.txt` `sitemap.xml` `CNAME` `.gitignore` `assets/favicon.svg` `assets/og-image.png` `AGENTS.md` `README.md` `PROJECT_LOG.md`

### 关键实现
- 纯静态零依赖；游戏增删只改 `games.json`（含 JSON-LD 同步）
- sitemap 只收录同域名：子目录游戏追加主站 sitemap，子域名游戏各自维护

### 遇到的问题
- 误提交临时截图 → `git rm --cached` 移除，`.gitignore` 加 `qa-*.png`
- push 403（Windows 缓存 ai919 凭据 vs 仓库属 ai717）→ `gh auth setup-git` 走 gh 认证解决
- **https://doin.win 返回 526（未解决）**：Cloudflare 橙云代理挡住 GitHub 域名验证，证书无法签发

### 待办
- [ ] 解决 526：Cloudflare A 记录改灰云（DNS only）指向 GitHub 4 IP（185.199.108-111.153）→ 等证书签发 → 勾选 Enforce HTTPS
- [ ] 向 Google Search Console 提交 doin.win 与 sudoku.doin.win 的 sitemap
- [ ] 拧螺丝游戏本体开发；上线后追加主站 sitemap
