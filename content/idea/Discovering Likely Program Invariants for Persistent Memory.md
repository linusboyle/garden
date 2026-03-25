---
title: Discovering Likely Program Invariants for Persistent Memory
date: 2024-12-02
NoteIcon: paper
tags:
  - reference
  - paper
see also:
  - "[[索引]]"
  - "[[2024-12-02]]"
  - "[[Non-Volatile Memory|NVM]]"
  - "[[persistent invariant]]"
author:
  - Zunchen Huang, Srivatsan Ravi, and Chao Wang
published at: ASE2024
zotero url:
---

首先，这篇paper里的(likely) program invariant 并不是 通常所说的[[persistent invariant]]，而是PM property。这些属性是程序正确性的必要条件——如果被违反，则程序一定有错误。文章关注的是从PM程序中自动生成这些必要属性，它们主要用于测试和找bug。

---

对这些属性的分类：
- must-persist-before, MPB (s, s')
- durability, DURA (s)
- must-persist-atomically, MPA(s, s', ...)

MPB和DURA被作者对应到durability bug和[[Crash Consistency]] bug -> [[Reviews on Constraint Based Program Repair for Persistent Memory Bugs]]。从我个人的角度，这种分类有问题。

---

## **算法主体**

首先修改LLVM，通过静态分析找出控制和数据依赖关系。把这些信息插桩到程序里（类似日志），使其在运行时能够记录一条有依赖关系标注的trace。

然后是动态方法，从一系列trace中分析可能的性质。trace被分成崩溃前和崩溃后

- 第一步是找崩溃后的读事件，如果两个读事件(a, b)有控制依赖，那么对应的写(b', a')有MPB关系
- 如果这两个读事件都应的写有多个，则对每个写事件对，都找出一组MPB关系

 **DURA**:

![[Pasted image 20241202135247.png]]
> “While generating the execution trace 𝑇 , we add an imaginary LOAD event 𝑒𝑣𝑓 𝑖𝑟𝑠𝑡 at the start of the trace, and assume that all subsequent LOAD events are control dependent on it. We also add an imaginary STORE event 𝑒𝑣last at the end of the trace such that 𝑒𝑣.𝑠𝑡 = 𝑠𝑡last , representing the program end. With these additions, DURAs are inferred as special cases of MPBs.” ([Huang 等, 2024, p. 1800](zotero://select/library/items/ANKJR6BU)) ([pdf](zotero://open-pdf/library/items/44WTAB23?page=6&annotation=L2ZXFDPZ))

**MPA**

把MPB视作有向图，然后找这个图上的SCC，每个SCC就是一个MPA性质

![[Pasted image 20241202143153.png]]

## 找bug

> “a window [𝑓𝑟𝑜𝑚, 𝑡𝑜]. The window starts from 𝑒𝑣.𝑡𝑖𝑚𝑒, which is the time when the STORE instruction is executed, and ends after the corresponding CLFLUSHOPT and SFENCE instructions are executed” ([Huang 等, 2024, p. 1801](zotero://select/library/items/ANKJR6BU)) ([pdf](zotero://open-pdf/library/items/44WTAB23?page=7&annotation=4WARBMYE))