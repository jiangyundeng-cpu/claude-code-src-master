/**
 * Day1 · 小节2 Demo
 * 对应 CC：queryLoop 入口的 immutable params vs mutable state
 *
 * 核心：进 loop 先分清「合同」和「进度条」
 * - params（const）：整场不变
 * - state（let）：每圈整包更新
 */

type Params = {
  systemPrompt: string // 系统提示词：整场契约，不改
  maxTurns: number // 最大轮次上限：整场契约，不改
}

type State = {
  messages: string[] // 对话轨迹：每圈累加
  turnCount: number // 当前第几轮
  // 上一圈为何 continue；第一圈没有「上一圈」→ undefined
  transition: string | undefined
}

function runLoop(params: Params) {
  // ★ 不可变：用 const 拆出，loop 内禁止再赋值
  const { systemPrompt, maxTurns } = params

  // ★ 可变：跨轮次携带的进度
  let state: State = {
    messages: [],
    turnCount: 1,
    transition: undefined, // 第一圈：没有上一圈原因
  }

  while (true) {
    // 模拟：本圈模型/工具产生一条新消息
    const reply = `turn${state.turnCount}: ok`
    const nextMessages = [...state.messages, reply]

    console.log({
      systemPrompt, // 每圈都能读到同一份契约
      maxTurns,
      turnCount: state.turnCount,
      transition: state.transition,
      messages: nextMessages,
    })

    // 到达上限 → 结束（用的是 params 里的 maxTurns，不是 state）
    if (state.turnCount >= maxTurns) {
      return { reason: 'max_turns', messages: nextMessages }
    }

    // ★ 整包替换 state（CC 也是 state = { ... }，不是改 9 个散变量）
    state = {
      messages: nextMessages,
      turnCount: state.turnCount + 1,
      transition: 'next_turn', // 记录：因为还要继续下一轮
    }
  }
}

console.log('=== 结果 ===', runLoop({ systemPrompt: 'you are helpful', maxTurns: 3 }))
