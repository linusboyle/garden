---
title: failure model
date: 2025-11-28
tags:
  - idea
aliases:
  - Full System Failure Model
  - Partial Failure Model
---

描述系统崩溃的作用范围

- Full System Failure Model：单一节点/线程的崩溃导致整个系统全部崩溃；恢复时进行全系统恢复（见[[20260106033746 PMEM内存分配与GC|PMEM内存分配与GC]]）。或者说整个系统只有一个failure domain。传统的单主机属于此种模型。
- Partial Failure Model：单一节点崩溃，其他节点继续运行；节点的恢复例程可能和其他过程（或者相互之间）并发。不同节点属于不同的failure domain。
	- [[CXL]]的主机和Type-2设备带内存，故实际情况可能是随着节点崩溃，对应内存也失效，故共享的内存有一部分会受影响。

## Related

- [[Disaggregated Memory]] 分离式内存/分布式共享内存DSM等场景下崩溃是部分作用的。当然，这里需要考虑一个节点下线后如何恢复的问题，见[[Partial Failure Resilient Memory Management System for (CXL-based) Distributed Shared Memory|CXL-SHM]]。