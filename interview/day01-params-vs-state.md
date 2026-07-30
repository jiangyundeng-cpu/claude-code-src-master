# Day1 口述：immutable params vs mutable state

Agent loop 入口要把数据分成两堆。一堆是整场不变的契约，比如 systemPrompt、maxTurns、canUseTool，用 const 从 params 拆出来，循环中途不许改，保证同一场任务的规则稳定。另一堆是跨轮次演进的进度，比如 messages、turnCount、transition，放进 let state，每圈结束用整包替换更新。transition 记录上一圈为何 continue，第一圈没有上一圈所以是 undefined，方便测试和排障时断言走了哪条恢复路径。如果误把 maxTurns 放进 state 并在某一圈改大，等于执行中偷改停机条件，可能绕过预算和安全上限，导致空转烧钱或任务收不住。
