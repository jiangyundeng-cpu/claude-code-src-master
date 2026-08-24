# M8 口述：memory、attachment、reactive compact

相关记忆在 queryLoop 的 while 外预取一次，因为用户这轮 prompt 不变，每圈都查会重复提问；预取不阻塞模型和工具，就绪后以 attachment 注入 toolResults，未就绪本圈跳过。attachment 是 Harness 夹进对话的配菜，tool_result 才是工具交卷。autocompact 在寄出前预防性变短；API 仍返回 prompt too long 时才 reactive compact，然后 Continue 再寄。hasAttemptedReactiveCompact 防止压完还超窗就无限再压。
