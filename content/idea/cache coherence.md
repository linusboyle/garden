---
date: 2024-06-15
tags:
  - idea
see also:
  - "[[coherence memory model]]"
aliases:
  - 缓存一致性
---

多处理器系统中，缓存的内容可能变得过时（不一致）。缓存一致性确保每个处理器的缓存内容是相同的，这通常是通过把写传播到其他处理器的缓存来完成。具体的实现方式则是由缓存一致性协议决定。

## 关于Coherence

Coherence一词的含义更广：

> Unless care is taken, a coherence problem can arise if multiple actors (e.g., multiple cores) have access to multiple copies of a datum (e.g., in multiple caches) and at least one access is a write.

比如日历的同步，网页的同步等都可以算作考虑一致性的场景。

## Cache Coherence Interface

对缓存一致性而言，关注的是读和写操作。

根据与[[memory consistency model]]之间的关系，可以分为两大类：

- Consistency-agnostic coherence：此类缓存一致性是同步实现的，此时，缓存仿佛在内存层级中不存在，对程序和程序员完全透明，内存系统可以被当作是原子的。在此类情况下，[[memory consistency model]]通过处理器的微架构实现。
- Consistency-directed coherence：缓存一致性是异步实现的，因此可能会出现过时的数据被读取的情况。此时，缓存一致性协议和处理器一同实现内存模型。这种协议主要出现在异构系统中。（[[Sequential Consistency|SC]]和[[Total Store Order|TSO]]都可以实现）

## 和内存模型之间的关系

> This definition highlights an important distinction between coherence and consistency in the literature: coherence is specified on a per-memory location basis, whereas consistency is specified with respect to all memory locations.

如果把缓存一致性通过定义内存一致性模型的方式进行定义，就得到了[[coherence memory model|COH]]

同时，因为绝大多数的硬件都保证缓存一致性，所以一般内存一致性模型都满足COH的约束（对同一个位置的操作是SC的）。或者说，缓存一致性是实现内存模型的一部分。

对于[[Total Store Order|TSO]]而言，每个线程的store buffer([[TSO operational semantics]] )在cache之前（P.S. 这样的buffer的确是存在的），且不需考虑缓存一致性。See [[caching - Memory models-Cache coherence protocols How TSO goes together with MESIF - Stack Overflow]]。其中提到的一个设计理由是，线程本地的变量不需要和其他线程同步。另外，TSO中的total store order，指的并不是操作实际到达内存的顺序，而是visibility order（到达coherent cache）。

同理，对于直接连接内存控制器的[[Non-Volatile Memory|NVM]]设备而言，visibility order也是到达cache的顺序，在[[Persistency semantics of the Intel-x86 architecture|Px86]]中的persistent buffer可以认为就是cache（cache的写回本身也是不确定，而且同一位置满足fifo的）。
