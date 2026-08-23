/**
 * Day7 · 小节1 Demo
 * 对应 CC：permission deny 时不 Tool.call，但仍造 is_error 的 tool_result
 *
 * 拒绝也要交卷 → 模型下一圈还能 Continue
 */

type ToolUse = { id: string; name: string; input: string }
type ToolResult = {
  tool_use_id: string
  content: string
  is_error: boolean
}

async function runToolUse(
  toolUse: ToolUse,
  gate: (t: ToolUse) => Promise<'allow' | 'deny'>,
): Promise<{ ran: boolean; tool_result: ToolResult }> {
  const decision = await gate(toolUse)

  if (decision === 'deny') {
    // ★ 不执行真工具，但仍回 tool_result
    return {
      ran: false,
      tool_result: {
        tool_use_id: toolUse.id,
        content: `Permission denied: ${toolUse.name}(${toolUse.input})`,
        is_error: true,
      },
    }
  }

  return {
    ran: true,
    tool_result: {
      tool_use_id: toolUse.id,
      content: `${toolUse.name} => ok`,
      is_error: false,
    },
  }
}

async function oneTurn(toolUses: ToolUse[]) {
  const toolResults: ToolResult[] = []
  for (const tu of toolUses) {
    const r = await runToolUse(tu, async (t) =>
      t.input.includes('rm') ? 'deny' : 'allow',
    )
    toolResults.push(r.tool_result)
  }
  // 有 tool_result 就能 Continue（简化：不检查 needsFollowUp）
  return { path: 'Continue', toolResults }
}

oneTurn([{ id: 'u1', name: 'Bash', input: 'rm -rf /' }]).then(console.log)
