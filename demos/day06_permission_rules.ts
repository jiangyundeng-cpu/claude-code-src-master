/**
 * Day6 · 小节2 Demo
 * 对应 CC：checkRuleBasedPermissions 先 deny → ask → tool.checkPermissions
 *
 * 裁决顺序：黑名单直接拒 → 必须问人 → 工具细查具体参数
 */

type Decision = { behavior: 'allow' | 'deny' | 'ask'; from: string }

const rules = {
  denyTools: new Set(['Bash']), // settings：整个 Bash 永久 deny
  askTools: new Set<string>(), // 例：某工具每次都要问
}

function checkRules(tool: string): Decision | null {
  if (rules.denyTools.has(tool)) {
    return { behavior: 'deny', from: '规则:整工具黑名单' }
  }
  if (rules.askTools.has(tool)) {
    return { behavior: 'ask', from: '规则:每次都要问' }
  }
  return null // 规则没定死，继续往下
}

function checkBashCommand(command: string): Decision | null {
  if (command.includes('rm -rf')) {
    return { behavior: 'deny', from: 'Bash细查:危险命令' }
  }
  if (command.startsWith('curl ')) {
    return { behavior: 'ask', from: 'Bash细查:外网请求要问人' }
  }
  return { behavior: 'allow', from: 'Bash细查:普通命令' }
}

function decide(tool: string, input: string): Decision {
  const byRule = checkRules(tool)
  if (byRule) return byRule

  if (tool === 'Bash') {
    return checkBashCommand(input) // 整工具没 deny 时，还要看具体 command
  }
  return { behavior: 'allow', from: '默认放行' }
}

console.log('Bash 永久 deny', decide('Bash', 'ls')) // 规则层就拦了
console.log('Read 放行', decide('Read', 'a.ts'))
// 假设 Bash 没在黑名单：细查 command
rules.denyTools.delete('Bash')
console.log('Bash+rm', decide('Bash', 'rm -rf /'))
console.log('Bash+curl', decide('Bash', 'curl https://x.com'))
