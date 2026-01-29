---
title: mimalloc
date: 2026-01-27
tags: 
aliases:
---

Memory Allocator from Microsoft. See https://github.com/microsoft/mimalloc

> “In mimalloc, a thread-exclusive segment is first allocated from the entire memory arena via global synchronization. The region after the header of each segment is further partitioned into pages that are dedicated for allocating objects of specific size classes. For example, a page for 16 bytes size class is partitioned into fixed-size 16 bytes data blocks. The free blocks in a page can be organized as an intrusive linked list” (Zhang 等, 2023, p. 662)
> 
> “With this design, any further fine-grained allocations from a segment are performed locally and hence do not need cross-thread synchronization, i.e., the fast path.” (Zhang 等, 2023, p. 662)
> 
> [[Partial Failure Resilient Memory Management System for (CXL-based) Distributed Shared Memory|CXL-SHM]]