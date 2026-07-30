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

## 远程仓库

- URL：https://github.com/jiangyundeng-cpu/claude-code-src-master
- 本地目录：`notes/`（独立 git，与 CC 源码分离）

日常更新：

```bash
cd notes
git add .
git commit -m "D1-2: xxx"
git push
```

## 说明

本仓库与 Claude Code 源码仓库分离，仅存放学习笔记，方便复习与面试背诵。
