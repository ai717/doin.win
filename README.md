# DOIN.WIN

小游戏合集站点。首页以卡片形式导航到各游戏（子目录或子域名）。

## 技术栈
纯静态（HTML5 + 原生 CSS/JS），无构建、零依赖。

## 本地运行
```bash
npx serve .
# 或
python -m http.server 8000
```
> 必须通过本地服务器访问（fetch 不支持 file:// 协议）。

## 添加新游戏
编辑 `games.json`，追加一条：

```json
{
  "title": "游戏名",
  "slug": "game-slug",
  "desc": "一句话介绍",
  "icon": "🎮",
  "cover": "assets/game-cover.png",
  "tags": ["益智"],
  "url": "/game-slug/"
}
```

- `cover` 留空时使用 `icon` 的 emoji 占位
- `url` 支持相对路径（子目录）或完整域名（子域名）
- 未上线的游戏加 `"comingSoon": true`，卡片会显示徽标且不可点击

项目规则与架构详见 [AGENTS.md](./AGENTS.md)。
