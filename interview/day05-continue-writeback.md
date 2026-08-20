# Day5 口述：toolResults 写回与 Continue

工具跑完后，queryLoop 在圈尾把 messagesForQuery、assistantMessages、toolResults 三截拼成下一圈 messages，整包 state = next，并记 transition: next_turn，然后不 return，自然回到 while(true) 顶再 callModel。这就是 Day1 说的 Continue。缺了 toolResults 不是「下一圈启动不了」，而是 API 要求每个 tool_use 必须配对 tool_result，否则请求不合法，模型也看不到工具产出，决策会瞎。主闭环至此合龙：寄信 → 有工具则执行 → 结果写回 → 再寄。
