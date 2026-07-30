# Claude Code Harness 30 天学习计划

> 身份约定：Harness 架构导师 × 学员结对，只啃 Agent Runtime 核心，UI/CLI 文案一律跳过。
> 节奏：每天 1 个小节 · 小段代码 · 2~3 题检验 · 10~30 行 Demo · 口述话术入库。

## 阶段总览

| 阶段 | 天数 | 主题 | 核心源码锚点 |
|------|------|------|----------------|
| A 心智与入口 | D1–D3 | Harness 分层、query 外壳、State 快照 | `query.ts` 入口 |
| B 主循环 | D4–D8 | while(true)、callModel、tool 回灌、Terminal | `queryLoop` |
| C 工具治理 | D9–D12 | Tool 协议、编排、流式执行、结果预算 | `Tool.ts` / `toolOrchestration` |
| D 权限护栏 | D13–D16 | canUseTool、hooks、危险路径 | permissions / hooks |
| E 上下文 | D17–D20 | compact、memory、消息归一化 | compact / attachments |
| F 容错与恢复 | D21–D24 | abort、max_tokens、prompt_too_long、budget | query continue 分支 |
| G 嵌套 Agent | D25–D27 | runAgent、同构 loop、隔离上下文 | `AgentTool/runAgent` |
| H 综合 | D28–D30 | 端到端口述、对照自研 Harness、模拟面试 | notes 汇总 |

## 每日固定流程（不可跳步）

1. 导师拆解 **一小段** 代码（功能 / Harness 层级 / 业务价值 / 面试考点）
2. **2~3 道简答题** → 学员作答 → 纠偏补全
3. **10~30 行** TypeScript Demo 复刻核心逻辑（统一用 TS，不用 Python）
4. 共同沉淀 **口述话术** → `notes/interview/dayXX-*.md`

## 当前进度

- **已完成：D1 · 小节 1** — `query` 外壳 vs `queryLoop` 内核
- **下一步：D1 · 小节 2** — 不可变 params vs 可变 State（未开始）

## 文件约定

- `notes/00-30day-plan.md` — 本计划（进度在此更新）
- `notes/interview/` — 面试口述话术
- `notes/demos/` — 每日极简 Demo
