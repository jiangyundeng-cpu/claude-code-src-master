# Day7 口述：Tool 插件协议

Claude Code 里每个工具是统一 Tool 契约：name 和 inputSchema 给模型菜单，checkPermissions 做工具级细查，isConcurrencySafe 决定 runTools 能否并行，call 才是真正执行并返回结果。顺序是先 checkPermissions、通过后才 call。buildTool 默认 fail-closed：isConcurrencySafe 默认 false、假设会写盘，避免未声明安全的工具被并行踩文件。新工具最少要有 name、inputSchema、call，其余可由 buildTool 填默认。
