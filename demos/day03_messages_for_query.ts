/**
 * Day3 · 小节1 Demo
 * 对应 CC：let messagesForQuery = [...getMessagesAfterCompactBoundary(messages)]
 *
 * messages          = 日记本（会话历史，给 UI / loop 记忆）
 * messagesForQuery  = 这封要寄出的信（给模型的工作副本，可压缩）
 */

function compact(letter: string[]) {
  letter.splice(0, letter.length, '[摘要] 前面很长，已压缩')
  return letter
}

function run(alias: boolean) {
  const messages = ['用户: 修 bug', '助手: 看了日志', '用户: 继续'] // 日记本
  // alias=true  → 同一本；false → 浅拷贝出一封信
  const messagesForQuery = alias ? messages : [...messages]

  compact(messagesForQuery) // 压缩的是「信」

  console.log(alias ? '=== 直接共用（反例）===' : '=== 浅拷贝（CC）===')
  console.log('日记本 messages:', messages)
  console.log('寄出的信      :', messagesForQuery)
}

run(true)
run(false)
