# Day4 口述：callModel 寄信

queryLoop 在 compact 之后才调用 deps.callModel。吃进去的是 messagesForQuery 这封压缩后的信，不是日记本 messages；同时带上 systemPrompt、tools 菜单和 abort signal。tools 此时只是告诉模型有哪些工具可点名，并不执行。for await 流式取出事件，用户边生成边看到输出，Esc 也能中途取消。callModel 走 deps，所以测试可以注入假模型，只验证 loop 有没有把正确的信寄出去。
