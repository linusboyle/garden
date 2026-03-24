---
title: Robustness (PM)
date: 2023-03-06
tags:
aliases:
  - Robustness
see also:
  - "[[2023-03-08]]"
---

# Robustness

Robustness is the property that **any** post-crash states of the program under weak persistency model is also **an** observable post-crash state if the program is executed in [[Strict Persistency]].

Robustness is a **sufficient but not necessary** condition for [[Crash Consistency]] (more specifically, for lock-free programs only[^1]). This is because programs may (1) be tolerant of reading stale values, e.g., counters that only need to be approximately correct, or (2) use other mechanisms like checksums to detect and discard inconsistent data after reading it.

It is proposed by Hamed Gorjiara, Weiyu Luo, Alex Lee, Guoqing Harry Xu, and Brian Demsky in the PLDI'22 paper *Checking Robustness to Weak Persistency Models.* See [[Checking Robustness to Weak Persistency Models]]

## Related

- [[PSan]]
- [[Non-Volatile Memory|NVM]]

[^1]: 关于这一点的说明：一般我们认为非阻塞的算法的状态总是一致的，此时如果能保证鲁棒，则能证明持久内存状态也是一致的。如果不是[[Non-blocking Algorithm|lock-free]]的，那么需要额外保证程序的正常执行也是一致的。
