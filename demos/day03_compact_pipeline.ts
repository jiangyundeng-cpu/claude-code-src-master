/**
 * Day3 · 小节2 Demo
 * 对应 CC：圈顶对 messagesForQuery 先小砍、超窗才摘要
 *
 * 轻：裁工具输出 / 清旧结果
 * 重：autocompact 整本换成摘要（不可逆）
 */

function tooLong(letter: string[], limit: number) {
  return letter.join('').length > limit
}

function compactPipeline(letter: string[], limit: number) {
  // 1) 轻：裁掉超长工具输出
  let msg = letter.map((s) =>
    s.startsWith('tool:') && s.length > 20 ? s.slice(0, 12) + '…' : s,
  )

  // 2) 仍超窗才重：整本摘要（不可逆）
  let autocompact = false
  if (tooLong(msg, limit)) {
    autocompact = true
    msg = ['[摘要] 前面已压缩', msg.at(-1)!]
  }
  return { 信: msg, autocompact }
}

const 短会话 = ['用户: 修bug', 'tool: ls ok', '助手: 继续']
const 裁切就够 = ['用户: 修bug', 'tool:' + 'x'.repeat(80), '助手: 继续']
const 裁完仍超 = ['用户: 修bug', 'tool:' + 'x'.repeat(80), '助手: ' + '还要再查'.repeat(20)]

console.log('短（不摘要）', compactPipeline(短会话, 40))
console.log('长但裁切就够', compactPipeline(裁切就够, 40))
console.log('裁完仍超窗', compactPipeline(裁完仍超, 40))
