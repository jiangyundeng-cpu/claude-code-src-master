# Claude Code Harness 学习笔记

基于 Claude Code 2.1.88 源码的 **30 天 Harness 架构** 学习笔记，只聚焦 Agent Runtime 核心。

## 目录

| 路径 | 内容 |
|------|------|
| `00-30day-plan.md` | 30 天学习计划与进度 |
| `demos/` | 每节极简 TS Demo，复刻核心逻辑 |
| `interview/` | 面试口述话术 |

## 当前进度

- **D1 小节 1** — `query` 门面 vs `queryLoop` 内核

## Demo 运行

```bash
npx tsx demos/day01_facade.ts
```

## 推送到 GitHub（首次）

1. 在 GitHub 网页新建 **空仓库**（不要勾选 README / .gitignore）
2. 建议仓库名：`claude-code-harness-notes`
3. 在本地 `notes` 目录执行：

```bash
git remote add origin https://github.com/<你的用户名>/claude-code-harness-notes.git
git push -u origin main
```

SSH 方式把 URL 换成 `git@github.com:<你的用户名>/claude-code-harness-notes.git` 即可。

## 说明

本仓库与 Claude Code 源码仓库分离，仅存放学习笔记，方便复习与面试背诵。
