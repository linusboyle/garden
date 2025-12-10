---
title: Non-blocking Algorithm
date: 2025-12-10
tags: 
aliases:
- 非阻塞算法
- lock-free
---

An algorithm is called non-blocking if failure or suspension of any thread cannot cause failure or suspension of another thread.

Sometimes it is used to refer to 'lock-free' data structure.

- wait-free: guarantee per-thread progress
- lock-free: guarantee overall progress. An algorithm is lock-free if, when the program threads are run for a sufficiently long time, at least one of the threads makes progress (for some sensible definition of *progress*).
- obstruction-free: guarantee overall progress if threads do not interfere.
> 特别的，以上均为[[liveness property]]

Compared to blocking algorithms using lock primitives, 

1. [[Non-blocking Algorithm]] increases amount of parallel execution than serial ones.
2. For locks, a failed thread might be the one holding the lock. Since non-blocking algorithms does not hold exclusive resource, it works under failure/interrupt.
 > 尤其对于lock-free的数据结构来说，线程崩溃/异常和调度器不公平的效果是一样的，全局总能有进展。

However, non-blocking algorithms are complicated and hard to design, also hard to verify. 


## Related

- [[Read-Modify-Write]] 基本上都依赖于硬件提供的此类原子指令来实现，尤其是[[CAS]]