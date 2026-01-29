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

- Full System Failure Model: 单一节点/线程的崩溃导致整个系统全部崩溃；恢复时进行全系统恢复（见[[20260106033746 PMEM内存分配与GC|PMEM内存分配与GC]]）
- Partial Failure Model: 单一节点崩溃，其他节点继续运行；节点的恢复例程和可能和其他过程并发

## Related

- [[Disaggregated Memory]] 分离式内存/分布式共享内存DSM等场景下崩溃是部分作用的。当然，这里需要考虑一个节点下线后如何资源回收的问题，见[[Partial Failure Resilient Memory Management System for (CXL-based) Distributed Shared Memory|CXL-SHM]]。