# Day2 口述：QueryConfig 快照

Claude Code 进 queryLoop 时调用一次 buildQueryConfig()，把 sessionId 和运行时开关拍成不可变照片。config 是普通数据，deps 是可替换函数：一个冻结规则，一个提供 I/O。不在每圈重读配置，是为了同一场任务前后行为一致；中途远程改了 gate，本场仍跟进场快照，避免第 1 圈和第 3 圈规则分裂，也方便排障复现。这和可变 state 分开，以后才能写成纯 step(state, event, config)。
