# M10 口述：嵌套 Agent 同构 loop

子 Agent 不是另一套循环引擎，runAgent 里再次调用同一个 query()，Continue/Terminal/工具/权限机制都在。隔离的是状态：自己的 messages、agentId、工具面和 systemPrompt，避免和主会话上下文搅在一起。子 query 停机后，把摘要作为普通 tool_result 交回主 loop，主模型下一圈像看 Read/Bash 结果一样看见。引擎同构，状态隔离，结果回灌。
