/**
 * M7 综合 Demo：流式执行 + 结果预算
 *
 * 1) 流式：tool_use 一到就开工（工具还是那些，只是更早跑）
 * 2) 并发：只读可并行，写仍串行
 * 3) 预算：砍的是信 messagesForQuery，过大结果换成预览
 * 4) Read 不落盘：避免 Read → 文件 → 再 Read 死循环
 */

type ToolUse = { id: string; name: string; out: string }

async function fakeCall(t: ToolUse, started: string[]) {
  started.push(`开工:${t.name}`)
  return { tool_use_id: t.id, content: t.out }
}

/** 等说完再跑 vs 边吐边跑（简化：开工日志不同） */
async function runBatch(mode: 'wait' | 'stream', tools: ToolUse[]) {
  const started: string[] = []
  const results = []
  if (mode === 'wait') {
    started.push('等模型说完')
    for (const t of tools) results.push(await fakeCall(t, started))
  } else {
    started.push('边吐边跑')
    results.push(...(await Promise.all(tools.map((t) => fakeCall(t, started)))))
  }
  return { started, results }
}

function applyBudget(letter: string[], limit: number) {
  return letter.map((s) =>
    s.startsWith('tool_result:') && s.length > limit
      ? `tool_result:[已落盘 preview] ${s.slice(0, 12)}…`
      : s,
  )
}

async function main() {
  const reads: ToolUse[] = [
    { id: '1', name: 'Read', out: 'a.ts 内容' },
    { id: '2', name: 'Read', out: 'b.ts 内容' },
  ]
  console.log('等齐再跑', await runBatch('wait', reads))
  console.log('流式边跑', await runBatch('stream', reads))

  const 信 = ['用户:查日志', 'tool_result:' + 'ERROR '.repeat(40)]
  console.log('预算前长度', 信[1]!.length)
  console.log('预算后', applyBudget(信, 30))
  console.log('Read 不落盘原因: 落盘后再 Read 会循环')
}
main()
