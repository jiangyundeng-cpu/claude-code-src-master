/**
 * Day2 · 小节3 Demo
 * 对应 CC：while(true) 圈顶解构 state
 *
 * 核心：每圈开工先拆包（读），圈尾整包替换（写）
 * - const：本圈只读
 * - let toolUseContext：本圈内部允许再赋值
 */

type State = {
  messages: string[]
  turnCount: number
  toolUseContext: { trace: string[] }
}

function runLoop() {
  let state: State = {
    messages: [],
    turnCount: 1,
    toolUseContext: { trace: [] },
  }

  while (true) {
    // ★ 圈顶：拆包 = 读本圈输入
    let { toolUseContext } = state // let：本圈内还可能改
    const { messages, turnCount } = state // const：本圈当只读

    // 模拟：本圈内部给 toolUseContext 追加追踪（所以必须是 let）
    toolUseContext = { trace: [...toolUseContext.trace, `turn${turnCount}`] }

    const reply = `ok-${turnCount}`
    const nextMessages = [...messages, reply]
    console.log('本圈读到', { turnCount, messages, trace: toolUseContext.trace })

    if (turnCount >= 2) {
      return { reason: 'completed' as const, messages: nextMessages }
    }

    // ★ 圈尾：整包写回 = Continue
    state = {
      messages: nextMessages,
      turnCount: turnCount + 1,
      toolUseContext,
    }
  }
}

console.log('=== 结果 ===', runLoop())
