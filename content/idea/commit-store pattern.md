---
title: commit-store pattern
date: 2025-11-27
tags:
  - 设计模式
aliases:
---

[[Non-Volatile Memory]]编程中的一种范式：

> “The idea behind the commit-store pattern is that data structure operations perform any number of writes to private memory locations and then commit the entire update with a single store.” (Lee 等, 2025, p. 2)

对数据结构的操作在逻辑上于commit store的瞬间完成。因此，可以实现一种“All-or-nothing”的类Transaction的原子性：

- 在commit store之前崩溃，相当于操作还未进行
- 在之后崩溃，相当于操作已经完成

使用commit-store不需要特殊的恢复机制，即null-recovery procedure

commit-store在数据结构的实现中应用广泛，但并不是惟一能保证[[Crash Consistency]]的方法，此外还可以通过日志实现。

## Related

- [[Linearizability]]：类似于linearizability point，但应用场景并不相同。commit-store关注的是操作在持久化方面的效果，而非在并发执行中可见的效果。一个遵照commit-store但是不可线性化的例子是不使用任何原子块的计数器实现(incr: v = c.val; c.val = v + 1)。
- [[The Path to Durable Linearizability|Durable Linearizability]]：但是两者可以结合