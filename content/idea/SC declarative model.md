---
date: 2024-04-05
tags:
  - idea
see also:
  - "[[coherence memory model]]"
---

基于[[Leslie Lamport]] 的定义，限定存在一个所有事件上的全序关系：

![[Pasted image 20240405205350.png]]

(sc应该是strict total order)

或者等价地，用[[modification order]]来定义：

![[Pasted image 20240405210011.png]]

（mo是strict total order，rb定义中排除id是因为有[[Read-Modify-Write|RMW]]的存在）

注意上述定义要求rf不自反，故不会出现RMW的读来自自己的写的情况。
