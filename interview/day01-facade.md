# Day1 口述：query 门面 vs queryLoop

Claude Code 把 Agent Runtime 拆成两层：对外的 `query` 是薄门面，对内的 `queryLoop` 才是真正的执行循环。调用方只碰 `query`。`query` 用 `yield*` 把内层事件原样透传出去；只有 `queryLoop` 正常 return 时，才在门面上打生命周期 `completed`。用户中途 abort 或抛错时，这段收尾代码走不到，所以不会出现「其实取消了却报成功」的假完成——监控和队列可以靠「started 但无 completed」识别失败。设计要点是：观测与契约放门面，状态机放循环，失败路径不误报成功。
