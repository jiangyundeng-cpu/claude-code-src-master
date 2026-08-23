# Day6 口述：canUseTool 权限闸门

模型输出 tool_use 只是提议，真正执行前必须过 canUseTool。裁决有三种：allow 放行执行，deny 拒绝并把结果回灌给模型，ask 进入确认（弹窗/规则/分类器）再变成允许或拒绝。runTools / toolExecution 统一走这扇门，不在编排里各自判权限。安全不能只靠 system prompt：提示词是软约束，模型可能忽略；canUseTool 是硬闸门，Harness 不放行就调不到 Tool.call，从而挡住误删和越权写入。
