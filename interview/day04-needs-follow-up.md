# Day4 口述：needsFollowUp 与 tool_use

流式收完 assistant 消息后，CC 不拿 API 的 stop_reason 当唯一停机信号，因为该字段不一定设对。真正依据是内容里有没有 type===tool_use 的块：有就 needsFollowUp=true，进入工具执行再 Continue；没有就走 Terminal，最终 reason 多为 completed。这样以实际出现的工具调用块为 ground truth，避免 stop_reason 撒谎导致该跑工具却提前收工、或该停却空转。
