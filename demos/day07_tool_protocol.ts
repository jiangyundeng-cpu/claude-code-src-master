/**
 * Day7 · 小节2 Demo
 * 对应 CC：Tool.ts 插件契约 + buildTool 默认 fail-closed
 *
 * 顺序：checkPermissions → call
 * 默认 isConcurrencySafe=false，要显式声明才并行
 */

type PermissionResult = { behavior: 'allow' | 'deny' }
type ToolResult = { content: string }

type Tool = {
  name: string
  inputSchema: string
  isConcurrencySafe: (input: string) => boolean
  checkPermissions: (input: string) => PermissionResult
  call: (input: string) => Promise<ToolResult>
}

// ★ 对应 buildTool：没写的用安全默认
function buildTool(def: {
  name: string
  inputSchema: string
  call: Tool['call']
  isConcurrencySafe?: Tool['isConcurrencySafe']
  checkPermissions?: Tool['checkPermissions']
}): Tool {
  return {
    isConcurrencySafe: () => false, // 默认不并行
    checkPermissions: () => ({ behavior: 'allow' }),
    ...def,
    isConcurrencySafe: def.isConcurrencySafe ?? (() => false),
    checkPermissions: def.checkPermissions ?? (() => ({ behavior: 'allow' })),
  }
}

async function runTool(tool: Tool, input: string) {
  const perm = tool.checkPermissions(input) // 先
  if (perm.behavior !== 'allow') {
    return { tool_result: `deny: ${tool.name}`, ran: false }
  }
  const result = await tool.call(input) // 后
  return { tool_result: result.content, ran: true }
}

const readTool = buildTool({
  name: 'Read',
  inputSchema: '{ file_path: string }',
  isConcurrencySafe: () => true, // 只读工具显式声明可并行
  call: async (p) => ({ content: `read ${p}` }),
})

const editTool = buildTool({
  name: 'Edit',
  inputSchema: '{ file_path, content }',
  // 不写 isConcurrencySafe → 默认 false，runTools 会串行
  call: async (p) => ({ content: `edit ${p}` }),
})

console.log('Read 并行?', readTool.isConcurrencySafe('a.ts'))
console.log('Edit 并行?', editTool.isConcurrencySafe('a.ts'))
runTool(readTool, 'a.ts').then(console.log)
