/**
 * M8 综合 Demo：memory 预取 / attachment / reactive compact
 *
 * memory：while 外开一次，不挡 loop，好了再塞
 * attachment：Harness 夹进下一圈的信
 * reactive：寄出 413 后再压一次；hasAttempted 防死循环
 */

type Letter = string[]

function startMemoryPrefetch() {
  let ready = false
  setTimeout(() => {
    ready = true
  }, 0)
  return {
    tryConsume(): string | null {
      return ready ? '[memory] 上次修过 auth' : null
    },
  }
}

function autocompact(letter: Letter): Letter {
  if (letter.join('').length < 40) return letter
  return ['[摘要] 前面已压缩', letter.at(-1)!]
}

function callModel(letter: Letter): 'ok' | 'too_long' {
  return letter.join('').length > 50 ? 'too_long' : 'ok'
}

function runTurn() {
  const prefetch = startMemoryPrefetch() // while 外：整场只开一次
  let letter: Letter = ['用户:继续修 bug', 'x'.repeat(60)]
  let hasAttemptedReactiveCompact = false

  for (let turn = 1; turn <= 3; turn++) {
    letter = autocompact(letter) // 寄出前

    const api = callModel(letter)
    if (api === 'too_long') {
      if (hasAttemptedReactiveCompact) {
        return { reason: 'prompt_too_long', letter }
      }
      letter = ['[reactive摘要]', '用户:继续修 bug']
      hasAttemptedReactiveCompact = true
      console.log('turn', turn, 'reactive compact 后重试')
      continue // 同一条 loop 再寄，不是新用户提问
    }

    const mem = prefetch.tryConsume()
    const attachment = mem ?? '[attachment] 本圈记忆未就绪，跳过'
    letter = [...letter, 'assistant:ok', attachment]
    return { reason: 'completed', letter }
  }
  return { reason: 'completed', letter }
}

console.log(runTurn())
