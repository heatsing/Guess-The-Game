# GuessTheGame

每日猜图拼题，布局参考 [SpellsBee](https://spellsbee.com)，玩法参考 [guessthe.game](https://guessthe.game)。

## 特点

- **12 种猜图模式**：Game、Book、Movie、Logo、House、Angle、Phrase、Song、Animal、Plant、Number、Price
- **玩法**：图片按序揭示，每错一次解锁更清晰的下一张，最多 6 次猜测
- **每日题目**：按 UTC 日期轮换，本地存储进度
- **浅色 / 深色切换**：右上角主题切换，偏好保存到 localStorage
- **FAQ 全局展示**：各页面都有 FAQ，单独 `/faq` 页面汇总
- **每页独立游戏规则**：各模式展示对应规则说明

## 运行

```bash
npm install
npm run dev
```

默认 `http://localhost:3006`。

## 数据配置

- 题库：`data/games.json`（游戏）、`data/books.json`（书籍）等
- 图片：`public/images/`，每题 6 张线索图（从糊到清）
- 示例：

```json
{
  "id": "hk",
  "title": "Hollow Knight",
  "acceptableAnswers": ["空洞骑士", "hollowknight"],
  "images": ["/images/hk/1.jpg", "/images/hk/2.jpg", ...]
}
```
