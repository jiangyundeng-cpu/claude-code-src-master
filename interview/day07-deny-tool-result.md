# Day7 口述：deny 也要回灌 tool_result

权限 deny 时不会调用真正的 Tool.call，但 Harness 仍要生成配对的 tool_result，content 写拒绝原因，并设 is_error: true，告诉模型/API 这是失败而非成功结果。这样 API 消息合法，模型也知道为何没做成，loop 往往还能 Continue 换策略，而不是沉默或直接 Terminal。拒绝也要交卷，成功交结果，失败交错误。
