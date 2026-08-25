/**
 * M9 Demo：PreToolUse（动手前）+ Stop hook（准备停时）
 * 都由 Harness 跑脚本，不是模型跑
 */

type ToolUse = { name: string; input: string }

function preToolUse(t: ToolUse): 'allow' | 'deny' {
  // settings 里的脚本：Harness 执行
  if (t.input.includes('rm -rf')) return 'deny'
  return 'allow'
}

function stopHook(testPass: boolean): 'completed' | 'continue' {
  if (!testPass) return 'continue' // 失败原因塞回模型，再转
  return 'completed'
}

function runLoop(opts: { tool?: ToolUse; testPass: boolean }) {
  if (opts.tool) {
    const gate = preToolUse(opts.tool)
    if (gate === 'deny') {
      return {
        ranCall: false,
        tool_result: 'PreToolUse denied',
        reason: 'Continue下一圈', // 仍有 tool_result，模型能看见
      }
    }
    return { ranCall: true, tool_result: 'ok', reason: '再看有没有下一圈工具' }
  }

  // 没工具：准备停 → Stop hook
  const s = stopHook(opts.testPass)
  if (s === 'continue') {
    return { reason: 'Continue', extra: '测试失败贴给模型' }
  }
  return { reason: 'completed' }
}

console.log('PreToolUse 拦 rm', runLoop({ tool: { name: 'Bash', input: 'rm -rf /' }, testPass: true }))
console.log('没工具测试失败', runLoop({ testPass: false }))
console.log('没工具测试通过', runLoop({ testPass: true }))
