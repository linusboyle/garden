---
date: 2024-06-15
tags:
  - idea
see also:
  - "[[coherence memory model]]"
aliases:
  - 缓存一致性
  - 缓存一致性协议
---

在多处理器系统中，缓存的内容可能变得过时（Stale）。缓存一致性确保每个处理器的缓存内容是相同的，这通常是通过让写操作传播到其他处理器来完成（比如使缓存行失效）。具体的实现方式则是由缓存一致性协议决定。

## 定义

对缓存一致性而言，关注的是读和写操作。从硬件的实现角度常见的一种定义是：

1. **Single-Writer, Multiple-Reader (SWMR)** Invariant. For any memory location A, at any given time, there exists only a single core that may write to A (and can also read it) or some number of cores that may only read A.  
2. Data-Value Invariant. The value of the memory location at the start of an epoch is the same as the value of the memory location at the end of the its last read-write epoch.

## 分类 

缓存一致性是实现内存模型的一部分。可以把缓存一致性视作内存模型，并得到[[coherence memory model|COH]]模型。因为绝大多数的硬件都保证缓存一致性，所以一般内存模型都满足COH约束（对同一个位置的操作是SC的，COH=per location SC）。根据与[[memory consistency model|内存一致性模型]]之间的关系，可以分为两大类：

- Consistency-agnostic coherence：写事件是同步传播的，在对所有核可见前不会返回ack。此时，缓存仿佛在[[20260821025035 Memory Hierarchy|内存层级]]中不存在，对程序和程序员完全透明，内存系统可以被当作是原子的。在此类情况下，处理器的微架构实现内存模型的细节。
- Consistency-directed coherence：写事件是异步传播的，因此可能会出现读取非实时最新数据的情况，但是缓存一致性协议和处理器微架构一同，依旧可以实现内存模型。这种协议比较新兴，主要出现在GPU中，不过[[Sequential Consistency|SC]]和[[Total Store Order|TSO]]都可以以此种方式实现。

## Related

- [[Non-Volatile Memory]] 缓存一致性协议对软件一般是透明的，多数情况下其具体实现对内存模型确实没什么影响（只要缓存本身是一致的即可），但是如果考虑崩溃以及非易失性内存，缓存的存在将导致weak persistent behaviour，如参见[[Persistency semantics of the Intel-x86 architecture|Px86]]，另见[[持久内存与缓存的关系]]
- [[20260821024532 缓存一致性与内存模型的关系]]
- [What is the difference between sequential consistency and coherence? | Simple Thoughts and Complex Stuff.](https://pveentjer.github.io/memory-models/2022/09/01/relation-coherence-sc.html)
- [[20260423033518 Two Hard Things in Computer Science|Two Hard Things in Computer Science]]