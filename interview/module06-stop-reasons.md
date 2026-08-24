# M6 口述：容错与停机

Agent loop 靠 return { reason } 停机，while(true) 自己不停。用户按 Esc 拉下 abort 开关：若停在 callModel 流式阶段，reason 是 aborted_streaming；若已在 runTools，是 aborted_tools。中断时仍要给每个 tool_use 补 tool_result（哪怕是 Interrupted by user），否则 API 消息不合法。max_turns 是合同上限，准备 Continue 前若下一圈超限就直接 return max_turns，不会 state=next 再转。不能把所有停都叫 completed：那是成功收工；取消、超限、模型报错必须分开，门面才不会假报完成，监控才能正确告警。
