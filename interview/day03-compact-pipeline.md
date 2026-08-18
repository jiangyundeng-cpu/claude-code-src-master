# Day3 口述：compact 流水线

寄给模型的是 messagesForQuery 这封信，不是日记本。CC 在 callModel 前对信做多层变短：先裁工具结果、snip、microcompact 这类可逆或损伤小的小砍；还超窗口才 autocompact，把前面大部分换成一篇摘要。摘要不可逆、会丢细节，所以不每圈必做，而是 shouldAutoCompact 超阈值才开火。没超则 autocompact 直接 no-op，信带着小砍结果寄出。
