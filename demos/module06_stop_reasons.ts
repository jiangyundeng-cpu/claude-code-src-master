/**
 * M6 综合 Demo：容错与停机
 * 对应 CC：aborted_streaming / aborted_tools / max_turns / completed
 *
 * 停靠 return { reason }；Esc 看停在哪一段；abort 也要补 tool_result
 */

type Terminal =
  | { reason: 'completed' }
  | { reason: 'aborted_streaming' }
  | { reason: 'aborted_tools' }
  | { reason: 'max_turns'; turnCount: number }

type ToolUse = { id: string; name: string }

function missingToolResults(tools: ToolUse[]) {
  // 对应 yieldMissingToolResultBlocks：每个 tool_use 必须有配对结果
  return tools.map((t) => ({
    tool_use_id: t.id,
    content: 'Interrupted by user',
    is_error: true,
  }))
}

function runLoop(opts: {
  maxTurns: number
  abortAt?: 'streaming' | 'tools'
  willCallTool: boolean
}): Terminal {
  let turnCount = 1
  const aborted = (phase: 'streaming' | 'tools') => opts.abortAt === phase

  while (true) {
    // —— 阶段1：callModel 流式 ——
    if (aborted('streaming')) {
      console.log('Esc 停在流式，补 tool_result（如有）')
      return { reason: 'aborted_streaming' }
    }

    const toolUses: ToolUse[] = opts.willCallTool
      ? [{ id: 'u1', name: 'Read' }]
      : []

    // 没有 tool_use → 正常收工（Day4 needsFollowUp=false）
    if (toolUses.length === 0) {
      return { reason: 'completed' }
    }

    // —— 阶段2：runTools ——
    if (aborted('tools')) {
      const patched = missingToolResults(toolUses)
      console.log('Esc 停在跑工具，补了', patched)
      return { reason: 'aborted_tools' }
    }

    // —— 阶段3：准备 Continue 前检查合同 ——
    const nextTurnCount = turnCount + 1
    if (nextTurnCount > opts.maxTurns) {
      return { reason: 'max_turns', turnCount: nextTurnCount }
    }

    turnCount = nextTurnCount // Continue：不 return，回到 while 顶
  }
}

console.log('1 正常收工', runLoop({ maxTurns: 5, willCallTool: false }))
console.log('2 流式 Esc', runLoop({ maxTurns: 5, willCallTool: true, abortAt: 'streaming' }))
console.log('3 工具 Esc', runLoop({ maxTurns: 5, willCallTool: true, abortAt: 'tools' }))
console.log('4 超轮次', runLoop({ maxTurns: 1, willCallTool: true }))
