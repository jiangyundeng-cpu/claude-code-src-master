/**
 * Day1 · query 门面 Demo
 * 对应 CC 源码：src/query.ts 里的 query / queryLoop 分层
 * 核心思想：门面只负责透传 + 成功收尾；循环内核负责真正干活
 */

// ── 后厨：queryLoop ──────────────────────────────────────────
// 对应 CC 里未 export 的 queryLoop，是真正的 agent 循环内核
// Generator<string, string, void> 含义：
//   - yield 出去的是 string（模拟 StreamEvent / Message）
//   - return 的是 string（模拟 Terminal 终态，如 'completed'）
function* queryLoop(cancel: boolean): Generator<string, string, void> {
  // 模拟 loop 执行过程中往外吐的一条中间事件（如 assistant 文本、tool 结果）
  yield 'msg:hello'

  // cancel=true 模拟用户按 Esc / abort：后厨抛错，不会 return
  if (cancel) {
    throw new Error('user hit Esc')
  }

  // 只有没取消时才会走到这里，return 的值就是 Terminal（本轮结束原因）
  return 'completed'
}

// ── 前台：query ──────────────────────────────────────────────
// 对应 CC 里 export 的 query，是对外唯一入口
function query(cancel = false) {
  // 收集 loop 透传出来的所有中间事件，方便观察
  const events: string[] = []

  // 创建内层 generator 实例；CC 里等价于 yield* queryLoop(...)
  const gen = queryLoop(cancel)

  try {
    // 手动驱动 generator：CC 的 yield* 会自动做这件事
    while (true) {
      // 推进一步：要么拿到 yield 的值，要么拿到 return 的终态
      const step = gen.next()

      // step.done === true 表示 generator 正常跑完（执行了 return）
      if (step.done) {
        // ★ 关键：只有正常 return 才报 completed
        // 对应 CC：query.ts 里 yield* 之后的 notifyCommandLifecycle(..., 'completed')
        console.log('lifecycle: completed')
        return { events, terminal: step.value }
      }

      // step.done === false：还有中间事件，收集起来并继续循环
      events.push(step.value)
    }
  } catch {
    // 内层 throw（用户取消）会跳到这里，上面的 completed 永远执行不到
    // 对应 CC：abort 时 query 函数提前退出，不会误报 completed
    console.log('lifecycle: NOT completed (aborted)')
    return { events, terminal: 'aborted' }
  }
}

// ── 跑两个场景对比 ──────────────────────────────────────────
console.log('=== 正常 ===', query(false)) // 期望：lifecycle: completed
console.log('=== 取消 ===', query(true))  // 期望：lifecycle: NOT completed
