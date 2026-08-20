# Day5 口述：runTools 与 toolResults

needsFollowUp 为真后，queryLoop 调用 runTools（或流式执行器收尾）真正执行工具。编排按只读可并发、写/执行串行分区，避免并行改同一文件。执行结果不能丢：要推进 toolResults，并在下一圈和 assistant 消息一起写回 state / 寄给模型。原因有二：API 要求每个 tool_use 必须有配对的 tool_result；模型也要看见工具产出才能继续决策。
