# Day3 口述：messages vs messagesForQuery

queryLoop 里 messages 是日记本，给 UI 和会话记忆看完整轨迹；messagesForQuery 是这封要寄给模型的信，圈顶用浅拷贝 `[...]` 从日记本拆出工作副本。后面 snip / microcompact / autocompact 只改这封信，避免原地改日记本。如果写成 messagesForQuery = messages，那是同一数组引用，压缩时 splice 会把 UI 还在读的历史撕掉：屏幕跳变、无法回看、渲染和 loop 抢同一份数据。浅拷贝的数组是新的，日记本还在；圈尾若需要，再把「压缩后的信 + 本圈新消息」整包写回下一圈 state。
