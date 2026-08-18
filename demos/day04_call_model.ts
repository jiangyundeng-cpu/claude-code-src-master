/**
 * Day4 · 小节1 Demo
 * 对应 CC：for await (const message of deps.callModel({ messages: messagesForQuery, tools, ... }))
 *
 * 寄出的是压缩后的信，不是日记本
 * tools 只是菜单；for await 边生成边吐
 */

type Deps = {
  callModel: (req: { messages: string[]; tools: string[] }) => AsyncGenerator<string>
}

async function* fakeModel(req: { messages: string[]; tools: string[] }) {
  yield `菜单:${req.tools.join(',')}`
  yield `读到信:${req.messages.at(-1)}`
  yield '正文:正在改…'
}

async function runLoop(deps: Deps) {
  const messages = ['日记:完整历史很长'] // 日记本，不寄
  let messagesForQuery = [...messages]
  messagesForQuery = ['[摘要]', '用户:修bug'] // compact 之后的信

  const events: string[] = []
  for await (const chunk of deps.callModel({
    messages: messagesForQuery,
    tools: ['Bash', 'Edit'], // 只告知，不执行
  })) {
    events.push(chunk)
    console.log('吐出', chunk)
  }
  return events
}

runLoop({ callModel: fakeModel }).then((e) => console.log('=== 全部 ===', e))
