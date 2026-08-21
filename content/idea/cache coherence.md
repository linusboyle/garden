---
date: 2024-06-15
tags:
  - idea
see also:
  - "[[coherence memory model]]"
aliases:
  - 缓存一致性
  - SWMR
---

在多处理器系统中，缓存的内容可能变得过时（Stale）。缓存一致性确保每个处理器的缓存内容是相同的，这通常是通过让写操作传播到其他处理器来完成（比如使缓存行失效）。具体的实现方式则是由缓存一致性协议决定。

## 定义

对缓存一致性而言，关注的是读和写操作。从硬件的实现角度常见的一种定义是：

1. **Single-Writer, Multiple-Read (SWMR)** Invariant. For any memory location A, at any given time, there exists only a single core that may write to A (and can also read it) or some number of cores that may only read A.  
> Another way to view this definition is to consider, for each memory location, that the memory location’s lifetime is divided up into epochs. In each epoch, either a single core has read-write access or some number of cores (possibly zero) have read-only access. [[nagarajanPrimerMemoryConsistency2020|A Primer on Memory Consistency and Cache Coherence]]
2. Data-Value Invariant. The value of the memory location at the start of an epoch is the same as the value of the memory location at the end of the its last read-write epoch.

另外，从编程接口的角度，可以把缓存一致性通过定义内存一致性模型的方式进行定义，并得到[[coherence memory model|COH]]模型。因为绝大多数的硬件都保证缓存一致性，所以一般内存一致性模型都满足COH的约束（对同一个位置的操作是SC的）。或者说，缓存一致性是实现内存模型的一部分。

## Related

- [[Non-Volatile Memory]] 透明缓存多数情况下对内存模型确实没什么影响，但是如果考虑崩溃以及非易失性内存，缓存的存在将导致weak persistenct behaviour，如见[[Persistency semantics of the Intel-x86 architecture|Px86]]
- [[20260821024532 缓存一致性与内存模型的关系]]