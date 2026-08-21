---
title: Memory Wall
date: 2025-11-26
tags: 
aliases:
- 内存墙
---

内存墙指内存性能严重限制CPU性能发挥的现象。其成因源于处理器与内存技术发展失衡，内存存取速度长期滞后于计算速度。

该术语最初意指内存速度问题，后外延也包括内存容量挑战

> 密歇根大学的研究显示，当有一半工作集无法放入内存时，应用性能会下降8到25倍[^1]

在非HBM的情况下，CPU单核心访存次数与DRAM延迟的趋势如下（[[hennessyComputerArchitectureQuantitative2026]]）：

![[Pasted image 20260821142035.png]]

> Although the gap in access time has increased significantly for many years, the lack of significant performance improvement in single processors has led to a slowdown in the growth of the gap between processors and DRAM

然而对于多核处理器，最高理论访存带宽依旧远远超过DRAM的带宽。

## Related

- [[memory footprint]]

[^1]:  Juncheng Gu, Youngmoon Lee, Yiwen Zhang, Mosharaf Chowdhury, and Kang G. Shin. 2017. Efficient memory disaggregation with INFINISWAP. In Proceedings of the 14th USENIX Conference on Networked Systems Design and Implementation (NSDI), 2017.
