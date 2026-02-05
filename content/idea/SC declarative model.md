---
date: 2024-04-05
tags:
  - idea
see also:
  - "[[coherence memory model]]"
---

基于[[Leslie Lamport]] 的定义，限定存在一个所有事件上的全序关系：

![[Pasted image 20240405205350.png]]

或者等价地，用[[modification order]]来定义：

![[Pasted image 20240405210011.png]]

（实际上mo是strict total order，id就不用加了）
