# Day2 口述：deps 依赖注入

Claude Code 的 queryLoop 不把调模型、压缩上下文写死，而是通过 QueryDeps 注入 callModel、microcompact、autocompact、uuid。生产用 productionDeps() 塞真实现；测试传入假 deps，就能在不打真 API 的情况下测 Continue/Terminal 状态机。入口写成 params.deps ?? productionDeps()，是为了线上零负担、测试可覆盖。依赖面先收窄到 4 个，是为了先立住可测试边界，再按需加宽，避免一上来把整个 Runtime 全变成接口地狱。
