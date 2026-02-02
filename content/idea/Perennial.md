---
title: Perennial
date: 2026-02-02
tags: 
- paper
aliases:
---

SOSP'19 Verifying concurrent, crash-safe systems with Perennial

基于Iris风格的并发分离逻辑，对并发系统的崩溃一致性进行验证的证明系统。

- Specification: Perennial的规约是系统的抽象/逻辑[[变迁系统]]，正确性表示为系统的具体实现与规约间的抽象精化关系（在本文中，使用forward simulation进行证明）。见下图

![](Perennial-20260202175823190.webp)

值得注意的是，在抽象层，崩溃也被建模为一个变迁；对应于实际系统的崩溃+恢复。
- 


## Related

- [[Crash Consistency|Crash Safety]]