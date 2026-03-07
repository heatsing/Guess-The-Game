# GuessTheGame（仿 guessthe.game）

## 运行

```bash
npm run dev
```

打开 `http://localhost:3000`。

## 题库与图片

- 题库在 `data/games.json`
- 图片放在 `public/images/`
- 每个游戏建议提供 6 张线索图（从难到易 / 从糊到清），并在 `images` 数组里按顺序填写路径，例如：

```json
{
  "id": "hk",
  "title": "Hollow Knight",
  "acceptableAnswers": ["空洞骑士", "hollowknight"],
  "images": [
    "/images/hk/1.jpg",
    "/images/hk/2.jpg",
    "/images/hk/3.jpg",
    "/images/hk/4.jpg",
    "/images/hk/5.jpg",
    "/images/hk/6.jpg"
  ]
}
```

## 目录结构（与你给的结构一致）

- `app/page.tsx`: 首页
- `app/game/page.tsx`: 今日游戏页
- `components/GameBoard`: 主交互（状态、存档、校验答案）
- `components/GuessInput`: 输入与提交
- `components/ImageReveal`: 图片揭示与缩略进度
- `data/games.json`: 题库
- `api/getGame`: 取“每日题目”的逻辑

