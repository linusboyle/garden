---
title: Partial Failure Resilient Memory Management System for (CXL-based) Distributed Shared Memory
date: 2026-01-06
tags:
  - 论文
aliases:
  - CXL-SHM
---

SOSP'23

提出Partial Failure Resilient DSM （RDSM）的模型（比如CXL），及一种基于引用计数的内存分配与管理机制。CXL-SHM下的CXL内存通过类似智能指针的引用进行操作，引用间可以进行传递，但是只能被一个节点拥有（只是引用是Single-Writer-Multiple-Reader的，防止多个节点更新同一个引用，对象仍然是共享的）。

引用计数的原理很简单，但在RDSM下内存管理的关键点是保证引用数的更新不会出错。文章的基本思路是，将增加/减少引用数的步骤ModifyRefCnt设计为惟一不幂等的操作，只执行一次，之后的ModifyRef则是幂等的。保证ModifyRefCnt在崩溃前后以及恢复例程中都只执行一次的方法是一种基于Harzard Era的算法。

![](Partial%20Failure%20Resilient%20Memory%20Management%20System%20for%20(CXL-based)%20Distributed%20Shared%20Memory-20260128144735665.png)

> “The most important assumption of our algorithm is that all the steps following ModifyRefCnt are idempotent. This assumption is needed to ensure that it is OK for the asynchronous recovery service to redo the following steps even if the failed client has actually already executed them before the failure” (Zhang 等, 2023, p. 665)

恢复例程执行ModifyRef Redo的条件：

>“the recovery service should first check the header of the last object (lo) that is modified by the failed client. The address of lo is recorded in client i’s redo log entry. If lo.lcid == i and lo.lera == Era[i][i], a redo is needed (Condition 1). Otherwise, the recovery service also needs to compare the failed client’s era, with the maximum era of client i that has been seen by any other clients. If Era[i][i] <= max(Era[j][i], j!=i), a redo is also needed (Condition 2).” (Zhang 等, 2023, p. 665)

算法基于[[CAS]]，是非阻塞的，有点类似[[Michael Scott Queue]]，满足[[Non-blocking Algorithm|lock-free]]

## Related

- [[CXL]] CXL3.0 提供分布式共享内存访问
- [[Non-Volatile Memory|PMEM]]
- [[failure model]]