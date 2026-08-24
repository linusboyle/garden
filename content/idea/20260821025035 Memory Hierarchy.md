---
title: Memory Hierarchy
date: 2026-08-21
tags:
  - idea
  - zettelkasten
aliases:
- Memory Hierarchy
- 内存层级
---

> 理想情况下,我们希望拥有无限大的存储容量,这样就可以立刻访问任何一个特定的机器字......但我们 ...... 必须认识到构建一个存储器层次结构的可能性,其中每一层次的容量都比前一层次大,但访问速度却比前一层次慢。 A. W. Burks、H. H. Goldstine 及 J. von Neumann,  Preliminary Discussion of the Logical Design of an Electronic Computing Instrument ( 1946 )

利用局部性原理设计的存储器结构。

> “In most cases (but not all) the data contained in a lower level are a superset of the next higher level. This property, called the inclusion property, is usually maintained by the main memory in the case of caches and by secondary storage (disk or Flash) in the case of virtual memory.”

![[Pasted image 20230109144446.png]]

“Virtually all computers since 1975 have used DRAMs for main memory and SRAMs for cache, with one to three levels integrated onto the processor chip with the CPU. Today, all PMDs and laptops and most desktops use Flash rather than disk drives. Many servers use Flash in combination with disk drives.”

## Related

- 