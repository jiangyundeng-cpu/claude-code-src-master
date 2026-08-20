/**
 * Day5 · 小节1 Demo
 * 对应 CC：runTools → 攒 toolResults → 留给下一圈寄回模型
 *
 * 只读可并行；写操作串行
 * 结果必须留下，不能扔——模型下一圈要看 tool_result
 */

type ToolUse = { id: string; name: string; input: string }
type ToolResult = { tool_use_id: string; content: string }

function isReadOnly(name: string) {
  return name === 'Read' || name === 'Grep'
}

async function runOne(t: ToolUse): Promise<ToolResult> {
  return { tool_use_id: t.id, content: `${t.name}(${t.input}) => ok` }
}

async function runTools(blocks: ToolUse[]) {
  const toolResults: ToolResult[] = []
  // 简化分区：连续只读一批并发；其余一个一个串行
  let i = 0
  while (i < blocks.length) {
    if (isReadOnly(blocks[i]!.name)) {
      const batch: ToolUse[] = []
      while (i < blocks.length && isReadOnly(blocks[i]!.name)) {
        batch.push(blocks[i]!)
        i++
      }
      const outs = await Promise.all(batch.map(runOne)) // 只读并发
      toolResults.push(...outs)
      console.log('并发批次', batch.map((b) => b.name))
    } else {
      const out = await runOne(blocks[i]!) // 写/执行串行
      toolResults.push(out)
      console.log('串行', blocks[i]!.name)
      i++
    }
  }
  return toolResults
}

runTools([
  { id: '1', name: 'Read', input: 'a.ts' },
  { id: '2', name: 'Read', input: 'b.ts' },
  { id: '3', name: 'Edit', input: 'a.ts' },
  { id: '4', name: 'Bash', input: 'npm test' },
]).then((r) => console.log('=== 留给下一圈的 toolResults ===', r))
