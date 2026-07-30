# Day1 口述：while(true) 与 Continue / Terminal

Claude Code 的 agent loop 是 `while(true)` 状态机，循环本身不会停，停机靠主动 `return`。每圈只有两条路：Continue——有工具或要重试时，把 messages 等写进新的 state 并带上 transition，回到圈顶再跑；Terminal——收工或必须停时，`return { reason }`，把结束原因交给上层。reason 很关键，SDK/UI/监控要靠它区分 completed、max_turns、aborted，才能正确重试、计费和告警，而不是只知道「停了」。
