# AGENTS.md — doin.win 项目规则与架构

## 项目定位
doin.win 是小游戏合集站点的首页（门户），以卡片形式链接到各游戏（子目录或子域名）。

## 架构规则
- 纯静态站点：HTML5 + 原生 CSS + 原生 ES Module JS，**禁止引入构建链与框架依赖**
- `games.json` 是游戏列表的唯一数据源；新增/修改游戏只改 JSON，不动页面代码
- 每个游戏独立目录（子目录方式）或独立子域名；首页只做导航，不承载游戏代码

## 目录结构
```
├── index.html      # 首页
├── css/style.css   # 全部样式（像素风主题，CSS 变量定义在 :root）
├── js/main.js      # 读 games.json 渲染卡片 + 注入 JSON-LD
├── games.json      # 游戏清单（唯一数据源）
├── assets/         # favicon.svg / og-image.png / 封面图
├── robots.txt / sitemap.xml / CNAME
└── <游戏目录>/      # 各游戏独立目录
```

## games.json 条目字段
`title` `slug` `desc` `icon`（emoji 占位）`cover`（封面图，可空）`tags[]` `url`（相对路径或完整域名）`comingSoon`（可选，即将上线）

## 设计规范
- 风格：复古像素 + 高级感。深色底（`#0b0b1a`）+ 霓虹点缀色（青/品红/琥珀/紫，见 `--neon-*`）
- 像素字体：Press Start 2P（仅用于标题/标签等英文点缀），正文用系统中文字体
- 卡片边框/阴影必须是"硬边"（实色 box-shadow 偏移），禁止柔和投影
- 改动样式时复用已有 CSS 变量，禁止新增近似重复的颜色

## 开发流程
- 一次只完成一个独立功能，完成后等待确认
- 每次开发后更新 PROJECT_LOG.md
- 最小改动，优先 Patch

## SEO 规则
- sitemap 只收录同域名 URL：子目录式游戏上线后追加到主站 `sitemap.xml`；子域名游戏由各自站点维护自己的 sitemap/robots
- 新增游戏卡片时，同步确认目标站点可被收录（标题/描述准确）

## 部署与仓库
- 仓库：github.com/ai717/doin.win（main 分支 = GitHub Pages 源，根目录）
- 域名：doin.win 由 Cloudflare 管理 DNS；CNAME 文件绑定域名
- 认证：gh CLI 账号为 ai717（与 Windows 缓存的 ai919 不同，推送靠 `gh auth setup-git`）
- 已知问题：Cloudflare 橙云代理导致 GitHub 证书无法签发（526），需灰云直连
- 子域名游戏（如 sudoku.doin.win）独立部署，不属本仓库
