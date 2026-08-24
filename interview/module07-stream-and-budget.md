# M7 口述：流式执行与结果预算

流式工具执行和等模型说完再 runTools，用的还是同一批 Tool、同一套 canUseTool 和 isConcurrencySafe。变的只是开工时机：tool_use 一流到就跑，用户少等。仍要看并发安全，写操作并行会抢同一文件。applyToolResultBudget 砍的是寄给模型的信 messagesForQuery，把过大的 tool_result 落盘或换成预览，避免下一圈上下文膨胀。Read 通常不落盘，因为把 Read 输出写成文件再让模型 Read，会形成循环。
