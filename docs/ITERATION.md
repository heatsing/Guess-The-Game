# 如何让项目自动迭代、越来越完善

## 1. 自动门禁（已就绪）

- **CI**：每次 push / 发起 PR 到 `main` 时，GitHub Actions 会自动执行：
  - `npm run lint`：代码规范
  - `npm run build`：能正常构建、类型通过
- **本地自检**：改完代码后执行 `npm run check`（= lint + build），与 CI 保持一致，减少红构建。

养成习惯：**合并前 CI 必须绿；本地先跑一遍 `npm run check`**。

## 2. 迭代节奏建议

| 频率 | 做什么 |
|------|--------|
| 每次改代码 | 跑 `npm run check`，修掉 lint/类型/构建错误 |
| 每次 PR | 看 CI 结果，必要时加简短说明或测试 |
| 每周/每迭代 | 从 Issue 里挑 1～2 个「体验/性能/可维护性」改进做掉，合并后关 Issue |
| 发版前 | 再跑一次 `npm run check`，确认 README/环境变量说明是否要更新 |

## 3. 可逐步加上的「自动完善」手段

- **测试**  
  - 先给核心逻辑加单元测试（如 `lib/daily.ts`、答案校验），再考虑关键页面的 E2E（Playwright/Cypress）。  
  - 在 CI 里加 `npm test`，保证新代码不破坏已有行为。
- **类型与数据**  
  - 保持 TypeScript 严格模式；为 `data/*.json` 考虑用 Zod 等做运行时校验，避免脏数据导致白屏。
- **体验与性能**  
  - 用 Lighthouse / 手动检查首屏与交互；必要时加性能预算或 Lighthouse CI，防止明显回退。
- **可访问性**  
  - 新组件顺手加 ARIA、键盘可操作；可引入 `eslint-plugin-jsx-a11y` 和一次性的 axe 扫描。
- **内容与配置**  
  - 新玩法/新模式的文案、规则、FAQ 集中在 `lib/` 或 `data/`，方便统一迭代；图片用明确命名和目录（如 `public/images/<mode>/`）便于后续替换。

## 4. 用 Issue + 小步 PR 驱动迭代

- 在 GitHub 用 **Issue** 列「待优化项」（体验、性能、可维护性、新功能）。
- 每次迭代用 **小 PR** 解决 1～2 个 Issue，描述里写上 `Closes #N`。
- 合并前确保 **CI 通过** 且 **主分支始终可部署**（`npm run build` 成功即可部署）。

这样，每次合并都是一次小步改进，项目会通过「自动门禁 + 有意识的迭代」持续变好。
