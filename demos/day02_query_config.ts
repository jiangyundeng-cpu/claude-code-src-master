/**
 * Day2 · 小节2 Demo
 * 对应 CC：buildQueryConfig() 只在 queryLoop 入口拍一次
 *
 * 核心：config 是「进场冻结的环境照片」，不是每圈重拍
 * 对比：若每圈重新读开关，同一场任务中途规则可能变
 */

type QueryConfig = {
  sessionId: string
  streamingTool: boolean // 模拟 gates.streamingToolExecution
}

let remoteGate = false // 模拟远程/环境开关，可能中途被改

function buildQueryConfig(): QueryConfig {
  return { sessionId: 'sess-1', streamingTool: remoteGate }
}

function runLoop(reReadEveryTurn: boolean) {
  // ★ 对应 CC：const config = buildQueryConfig() 只在入口拍一次
  const config = buildQueryConfig()
  const seen: boolean[] = []

  for (let turn = 1; turn <= 3; turn++) {
    // 第 2 圈：远程把开关从关改成开（模拟 statsig/env 变化）
    if (turn === 2) remoteGate = true

    const gate = reReadEveryTurn
      ? buildQueryConfig().streamingTool // 每圈重拍 → 会跟上新开关
      : config.streamingTool             // 用进场快照 → 整场冻结

    seen.push(gate)
    console.log(`turn${turn}`, { gate, 用的是: reReadEveryTurn ? '重拍' : '快照' })
  }
  return seen
}

remoteGate = false
console.log('=== 快照（CC 的做法）===', runLoop(false))
remoteGate = false
console.log('=== 每圈重拍（反例）===', runLoop(true))
