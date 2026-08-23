# Day6 口述：allow/deny/ask 从哪来

canUseTool 的裁决不是模型给的，而是一条流水线：先查 settings 规则，整工具命中 deny 直接拒绝、命中 ask 则弹窗；再让工具自己做细查，比如 Bash 看具体 command 而不只看工具名。deny 是已判死刑，ask 是停下来等你点头。整工具规则管粗粒度，tool.checkPermissions 管参数级危险，两层叠加才够用。
