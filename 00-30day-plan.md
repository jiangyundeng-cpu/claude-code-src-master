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

- **已完成：D1 · 小节 1–3** — 门面 / params·state / Continue·Terminal
- **已完成：D2 · 小节 1** — `deps` 依赖注入
- **已完成：D2 · 小节 2** — `QueryConfig` 快照
- **已完成：D2 · 小节 3** — `while(true)` 圈顶拆 state（开工清单）
- **已完成：D3 · 小节 1** — `messages` vs `messagesForQuery`（发给模型的工作副本）
- **已完成：D3 · 小节 2** — compact 流水线：如何把「信」变短
- **已完成：D4 · 小节 1** — `deps.callModel`：把信寄给模型
- **已完成：D4 · 小节 2** — 模型回了什么：文本 vs tool_use
- **已完成：D5 · 小节 1** — `runTools`：执行工具并把 tool_result 收回来
- **已完成：D5 · 小节 2** — toolResults 写回 state → Continue
- **里程碑：主闭环合龙**（寄信 → 工具 → 写回 → 再寄）
- **已完成：D6 · 小节 1** — `canUseTool`：工具执行前的权限闸门
- **下一步：D6 · 小节 2** — 未开始（Permission 规则 / allow-deny-ask 从哪来）

## 今日安排（恢复日，只啃 1 小节）

1. 30 秒回忆：params / state / deps 各管什么
2. 正式学：`QueryConfig` 快照（进场拍环境照片，整场不变）
3. 对照题 + 短 Demo + 口述话术
4. 累了就停；不赶 D3

## 文件约定

- `notes/00-30day-plan.md` — 本计划（进度在此更新）
- `notes/interview/` — 面试口述话术
- `notes/demos/` — 每日极简 Demo
