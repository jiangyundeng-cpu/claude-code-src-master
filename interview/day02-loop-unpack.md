# Day2 口述：圈顶拆 state

queryLoop 每一圈开始先从 state 解构出本圈输入：messages、turnCount 等用 const，表示这一圈里当只读；只有 toolUseContext 用 let，因为圈内还可能被再赋值。真正写下圈进度仍在圈尾 state = next。这和 LangGraph 很像：CC 的「一圈」就相当于一个节点——进来先读 state，干完再交出新 state。圈顶解构是读，圈尾整包替换是写，避免九个变量在圈内到处改。
