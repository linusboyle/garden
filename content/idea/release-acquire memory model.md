---
date: 2024-04-05
tags:
  - idea
see also:
  - "[[memory consistency model|WMM]]"
  - "[[Sequential Consistency]]"
aliases:
  - RA memory model
  - RA
---

Release/Acquire模型弱于[[Sequential Consistency]]，但是强于[[coherence memory model|COH]]。在COH的基础上，让[[program order]]和rf结合：

![[Pasted image 20240405214446.png]]

在RA中，rf关系中的一对读写事件可以认为是「同步」的（synchronizing）。大致上来讲，同一地址的写事件之前的事件，以及读事件之后的事件，也因为rf边的存在而存在序关系。

等效定义：

![[Pasted image 20240405215441.png]]

## 实现

在Power， ARM等架构上，在store前和read后分别加上fence就可以实现RA的语义

在[[Total Store Order|TSO]]中，不需要额外使用fence即可满足RA。