/**
 * M10 Demo：嵌套 Agent = 再调一次同一个 query()
 * 引擎同构，messages 隔离，结果当 tool_result 交回主 loop
 */

type Terminal = { reason: 'completed' | 'max_turns' }

function queryLoop(messages: string[], maxTurns: number): {
  terminal: Terminal
  transcript: string[]
} {
  const transcript = [...messages]
  let turn = 1
  while (true) {
    transcript.push(`assistant:干活 turn${turn}`)
    if (turn >= maxTurns) {
      return { terminal: { reason: 'max_turns' }, transcript }
    }
    transcript.push('assistant:做完了')
    return { terminal: { reason: 'completed' }, transcript }
  }
}

function runAgent(task: string) {
  // ★ 同构：还是 queryLoop；隔离：自己的信
  const inner = queryLoop([`用户(子):${task}`], 2)
  return {
    tool_result: `摘要: ${inner.transcript.at(-1)} (${inner.terminal.reason})`,
  }
}

function mainLoop() {
  const mainMessages = ['用户(主):去探一下 auth']
  const child = runAgent('只搜索 auth 怎么实现')
  mainMessages.push('tool_use:Agent', child.tool_result)
  console.log('子对话(主会话看不见全文): 隔离')
  console.log('主会话只看到', child.tool_result)
  return { mainMessages }
}

console.log(mainLoop())
