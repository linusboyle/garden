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
2. 系统不再只有单个failure domain，各节点可以各自崩溃。

## CXL0

本文根据[[CXL]]规范讨论了在一般情况下的一种编程模型CXL0。其模型中考虑Type-2型设备，即互连的设备均有处理器和内存，且可以对内存的共享进行配置，共享内存保持[[cache coherence]]。cache line可以缓存远端内存。

CXL0抽象掉了每个节点内部的一致性模型，而只讨论提交到CXL连接网络的transaction的语义。

CXL0的原语包括：

- Load。由于缓存一致性协议，无论是本地还是远端内存，读总是会观察到最近的写，且每个节点的缓存中的值都是一致的，故只需要一种读操作。分为从缓存读和从内存读两条变迁规则。Load同时也将值写入本地缓存。
- LStore，RStore和MStore，分别对应写入本地缓存，写入远端缓存，直接写入内存。
- LFlush。将对应地址的缓存传播到远端缓存；如果地址属于本地的内存，则写入内存。
- RFlush。将对应地址的缓存传播到远端内存。
- RMW。3种指令，分别对应3种Store

Crash变迁规则刻画了单个节点的崩溃。如果节点的内存是[[Non-Volatile Memory|NVM]]，则保留数据，否则重置。无论如何，缓存行总是被清空。

## CXL系统

本文也讨论了目前CXL实现或者预想中的应用

![[A Programming Model for Disaggregated Memory over CXL-20260206143017950.webp]]

1. Host-Device Pairing（已实现）：a host and an accelerator that share memory in  a cache-coherent manner using CXL.cache and CXL.mem.
2. Partitioned disaggregated memory pool（已实现）：在这种情况下，共享内存池逻辑上等价于节点之外的一个failure domain，故在系统中的行为和[[Non-Volatile Memory|NVM]]相同。
3. Shared disaggregated memory pool：尚未实现，不过理论上能提供缓存一致的共享内存访问。由于不存在主机之间直接操作cache，CXL0中的LStore和RStore以及LFLush和RFLush的区分在这里也就不存在（MStore依旧可以绕过缓存）

## Related

- [[Disaggregated Memory]]