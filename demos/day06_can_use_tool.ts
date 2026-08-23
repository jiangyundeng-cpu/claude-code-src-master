/**
 * Day6 · 小节1 Demo
 * 对应 CC：toolExecution 里执行前 await canUseTool → allow/deny/ask
 *
 * 模型点名不够；Harness 硬闸门说了算
 */

type Decision = { behavior: 'allow' | 'deny' | 'ask' }

type CanUseToolFn = (tool: string, input: string) => Promise<Decision>

async function runToolUse(
  tool: string,
  input: string,
  canUseTool: CanUseToolFn,
) {
  // ★ 执行前先过闸——对应 toolExecution 里的 permission 检查
  const decision = await canUseTool(tool, input)

  if (decision.behavior === 'deny') {
    return { ran: false, tool_result: `拒绝: 不允许 ${tool}(${input})` }
  }
  if (decision.behavior === 'ask') {
    // 简化：ask 当成用户点了「不允许」；真 CC 会弹窗等用户
    return { ran: false, tool_result: `待确认后未放行: ${tool}` }
  }
  // allow → 真执行
  return { ran: true, tool_result: `${tool}(${input}) => ok` }
}

const gate: CanUseToolFn = async (tool, input) => {
  if (tool === 'Bash' && input.includes('rm -rf')) return { behavior: 'deny' }
  if (tool === 'Edit' && input.includes('/etc/')) return { behavior: 'ask' }
  return { behavior: 'allow' }
}

async function main() {
  console.log(await runToolUse('Read', 'a.ts', gate))
  console.log(await runToolUse('Bash', 'rm -rf /', gate))
  console.log(await runToolUse('Edit', '/etc/hosts', gate))
}
main()
