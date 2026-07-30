/**
 * Day1 · 小节3 Demo
 * 对应 CC：queryLoop 的 while(true) + Continue / Terminal
 *
 * 核心：
 * - while(true) 自己不会停
 * - Continue = 更新 state，回到圈顶
 * - Terminal  = return { reason }，把停机原因交出去
 */

type State = {
  messages: string[]
  turnCount: number
  transition?: string
}

type Terminal = { reason: 'completed' | 'max_turns' | 'aborted' }

function runLoop(maxTurns: number, abortAt?: number): Terminal {
  let state: State = { messages: [], turnCount: 1 }

  // ★ while(true) 自己不会停；停靠下面的 return
  while (true) {
    const { turnCount } = state

    // 模拟：本圈模型说了一句话；偶发还要调工具
    const needTool = turnCount === 1
    const assistant = needTool ? 'tool:Read' : 'done: all good'
    const toolResult = needTool ? 'tool_result: ok' : null

    const messages = [
      ...state.messages,
      assistant,
      ...(toolResult ? [toolResult] : []),
    ]

    // —— Terminal 出口 1：人为取消 ——
    if (abortAt !== undefined && turnCount >= abortAt) {
      return { reason: 'aborted' }
    }

    // —— Terminal 出口 2：没有 tool 了 → 收工 ——
    if (!needTool) {
      console.log('stop:', { messages, transition: state.transition })
      return { reason: 'completed' }
    }

    // —— Terminal 出口 3：超轮次 ——
    const nextTurnCount = turnCount + 1
    if (nextTurnCount > maxTurns) {
      return { reason: 'max_turns' }
    }

    // —— Continue：整包更新 state，不 return，回到 while 顶 ——
    state = {
      messages,
      turnCount: nextTurnCount,
      transition: 'next_turn',
    }
  }
}

console.log('=== 正常完成 ===', runLoop(5))
console.log('=== 中途取消 ===', runLoop(5, 1))
