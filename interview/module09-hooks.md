# M9 口述：Hooks 护栏

Hooks 由 Harness 在 loop 里真正执行 settings 脚本，不是模型去跑，所以比写在 system prompt 里可靠。PreToolUse 发生在有 tool_use、Tool.call 之前，可以拒绝执行但仍要交 tool_result。Stop hook 发生在没有 tool_use、本来要收工时：可以放行 completed，可以硬停 stop_hook_prevented，也可以把失败原因塞回 messages 让模型 Continue 再改。API 报错时故意不跑 Stop hook，避免报错与 hook 互相把对方拉起来死循环。
