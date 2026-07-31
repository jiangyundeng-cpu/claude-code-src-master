/**
 * Day2 · 小节1 Demo
 * 对应 CC：query/deps.ts + query.ts 里的 deps = params.deps ?? productionDeps()
 *
 * 核心：loop 只认「工具箱接口」，不认死某一个实现
 * - 生产：productionDeps() 塞真 callModel
 * - 测试：传入假 callModel，不打真 API
 */

type Deps = {
  callModel: (prompt: string) => string
  uuid: () => string
}

// 生产工具箱（线上会打真 API；这里用字符串模拟）
function productionDeps(): Deps {
  return {
    callModel: (prompt) => `PROD答复:${prompt}`,
    uuid: () => 'real-uuid-xxx',
  }
}

// loop 内核：只通过 deps 干活，不 import 具体 API
function runLoop(prompt: string, deps?: Deps) {
  // ★ 对应 CC：const deps = params.deps ?? productionDeps()
  const d = deps ?? productionDeps()

  const id = d.uuid()
  const reply = d.callModel(prompt)
  return { id, reply }
}

// —— 场景1：线上，不传 deps → 自动用生产实现 ——
console.log('生产:', runLoop('写个排序'))

// —— 场景2：单测，注入假实现 → 不打网、结果可断言 ——
const fakeDeps: Deps = {
  callModel: () => '假模型：ok',
  uuid: () => 'id-1',
}
console.log('测试:', runLoop('写个排序', fakeDeps))
