/**
 * Day4 · 小节2 Demo
 * 对应 CC：流式里筛 tool_use → needsFollowUp；没有则 Terminal
 *
 * 不靠 stop_reason（不可靠），靠实际有没有 tool_use 块
 */

type Block = { type: 'text'; text: string } | { type: 'tool_use'; name: string }

function decide(content: Block[]) {
  const toolUseBlocks = content.filter((b) => b.type === 'tool_use')
  const needsFollowUp = toolUseBlocks.length > 0

  if (!needsFollowUp) {
    return { path: 'Terminal', reason: 'completed' as const, tools: [] as string[] }
  }
  return {
    path: 'Continue预备', // 下一步才真正 runTools
    reason: 'needs_tools' as const,
    tools: toolUseBlocks.map((b) => (b as { name: string }).name),
  }
}

console.log('只有文字', decide([{ type: 'text', text: '改好了' }]))
console.log(
  '点了工具',
  decide([
    { type: 'text', text: '我先读文件' },
    { type: 'tool_use', name: 'Read' },
  ]),
)

// 反例：API 说 stop_reason=end_turn，但内容里其实有 tool_use
// CC 不信 stop_reason，只数块 → 仍会 needsFollowUp
console.log(
  'stop_reason 骗人时',
  decide([{ type: 'tool_use', name: 'Bash' }]), // 仍走工具路径
)
