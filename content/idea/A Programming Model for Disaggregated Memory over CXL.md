---
title: A Programming Model for Disaggregated Memory over CXL
date: 2026-02-06
tags: 
- paper
aliases:
---

ASPLOS'26

[[CXL]]的分布式、缓存一致的特性带来了两项主要的变化：

1. 各节点是异构的。异构计算单元访问相同的内存时，并发操作的结果不受单一内存模型的控制。关于[[CXL]]下访存的[[memory consistency model|内存一致性模型]]，此前有文章认为是[[Total Store Order|TSO]]：
> In our email discussions with Intel engineers, they have told us that CXL systems are intended to provide TSO ordering guarantees across machines, although there is no formal specification yet.

## Related

- [[Disaggregated Memory]]