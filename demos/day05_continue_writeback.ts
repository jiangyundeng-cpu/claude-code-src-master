/**
 * Day5 · 小节2 Demo
 * 对应 CC：state = { messages: [...信, ...助手, ...工具结果], transition: next_turn }
 *
 * Continue = 不 return，整包写回 state，回到 while 顶
 */

type State = {
  messages: string[]
  turnCount: number
  transition?: string
}

function runLoop() {
  let state: State = { messages: ['用户:修bug'], turnCount: 1 }

  while (true) {
    const { messages, turnCount } = state

    // 本圈：寄出的信（简化：直接用 messages）
    const messagesForQuery = [...messages]
    const assistantMessages = [`助手:我去Read一下 (turn${turnCount})`, 'tool_use:Read']
    const toolResults = ['tool_result:文件内容是…']

    // ★ 圈尾 Continue：三截拼进下一圈
    const nextMessages = [
      ...messagesForQuery,
      ...assistantMessages,
      ...toolResults,
    ]

    console.log(`turn${turnCount} 拼好后长度`, nextMessages.length)

    if (turnCount >= 2) {
      // 第二圈假设模型不再点工具 → Terminal
      return { reason: 'completed' as const, messages: nextMessages }
    }

    state = {
      messages: nextMessages,
      turnCount: turnCount + 1,
      transition: 'next_turn', // Day1 的 Continue
    }
    // 不 return → 回到 while 顶
  }
}

console.log('=== 结果 ===', runLoop())
