# Claude Code Harness 学习计划（已调整为模块制）

> 身份约定：Harness 架构导师 × 学员结对，只啃 Agent Runtime 核心。
> **节奏调整（2026-08-24）**：原 30 天「每天 1 小节」过细，改为 **模块制**——每次学习啃 **1 个完整模块**（含 2~4 个知识点 + 1 个综合 Demo + 1 段口述）。体力够可一天 1~2 个模块；累了就停。

## 新节奏 vs 旧节奏

| | 旧（30 天） | 新（模块制） |
|--|------------|-------------|
| 粒度 | 每天 1 小节（~15 分钟知识点） | 每次 1 模块（~45–90 分钟） |
| 预计总长 | 30 次 | **约 11 个模块**（你已学完 5 个） |
| 检验 | 每小节 2~3 题 | 每模块 1 次综合问答 + 1 个 Demo |
| 口述 | 每小节 1 段 | 每模块 1 段（可合并旧 dayXX 话术） |

## 模块总览

| 模块 | 主题 | 状态 | 核心锚点 |
|------|------|------|----------|
| **M1** | 心智与入口：门面 / params·state / deps·config | ✅ 已完成 | `query.ts` 入口 |
| **M2** | Loop 控制流：Continue / Terminal / 圈顶拆 state | ✅ 已完成 | `while(true)` |
| **M3** | 上下文寄信：messagesForQuery + compact 流水线 | ✅ 已完成 | compact + `messagesForQuery` |
| **M4** | 主闭环：callModel → tool_use → runTools → 写回 | ✅ 已完成 | `queryLoop` 主干 |
| **M5** | 权限与 Tool 协议：canUseTool / 规则 / deny 回灌 / Tool | ✅ 已完成 | `permissions` + `Tool.ts` |
| **M6** | 容错与停机：abort / max_turns / 常见 Terminal | ✅ 已完成 | `aborted_*` / `max_turns` |
| **M7** | 工具进阶：流式执行 + 结果预算 | ⬜ | `StreamingToolExecutor` |
| **M8** | 上下文进阶：memory / attachments / reactive compact 概览 | ⬜ | `attachments` / compact |
| **M9** | Hooks 护栏：PreToolUse / stop hooks | ⬜ | `hooks.ts` |
| **M10** | 嵌套 Agent：runAgent 同构 loop | ⬜ | `AgentTool/runAgent` |
| **M11** | 综合：端到端口述 + 模拟面试 | ⬜ | notes 汇总 |

> 原 30 天计划中的 D8–D30 内容并入 M6–M11，**不丢知识点，只合并节奏**。

## 每次学习固定流程（模块级）

1. **串讲**本模块 2~4 个知识点（仍只啃 Harness 核心，UI 跳过）
2. **综合问答** 3~5 题（覆盖整模块）
3. **1 个综合 TS Demo**（可合并原多个 day demo 的思路）
4. **1 段口述话术** → `notes/interview/moduleXX-*.md`
5. 你说 **commit** 我提交；**push** 你来

## 当前进度（模块制）

### 已完成 M1–M5（对应原 D1–D7 全部小节）

- M1：门面 `query`、params/state、deps、QueryConfig
- M2：Continue/Terminal、`while` 圈顶解构
- M3：日记本 vs 信、compact 先小砍后摘要
- M4：callModel 寄信、needsFollowUp、runTools、三截写回
- M5：canUseTool 闸门、规则流水线、deny 仍交 tool_result、Tool 协议

### 已完成 M6

- Esc：流式 → `aborted_streaming`；跑工具 → `aborted_tools`；中断也要补 tool_result
- `max_turns`：Continue 前检查，超了直接 return，不 `state=next`
- Terminal.reason 区分 completed / abort / 超限 / 模型错，门面不假报完成

### 下一步

- **M7：工具进阶**（流式执行 + 结果预算）——未开始

## 文件约定

- `notes/00-30day-plan.md` — 本计划（文件名保留，内容已改为模块制）
- `notes/interview/` — 口述话术（旧 dayXX 仍有效；新模块用 `moduleXX`）
- `notes/demos/` — Demo（旧 dayXX 仍有效；新模块用 `moduleXX`）

## 旧 day 编号对照（方便复习）

| 旧编号 | 归入模块 |
|--------|----------|
| D1–D2 | M1 + M2 |
| D3 | M3 |
| D4–D5 | M4 |
| D6–D7 | M5 |
