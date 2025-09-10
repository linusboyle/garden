---
title: FliT A Library for Simple and Efficient Persistent  Algorithms
date: 2025-05-21
tags:
  - 论文
---

为了避免 [[Non-Volatile Memory|NVM]] 上的Data Race，一种做法是在每个读操作之前都对变量进行 flush 操作（否则，可能出现读到的值还没有被持久化）。

> 和 [[persistency race]] 区分，这里的 data race 定义和我在 ASPLOS 25 上见到的一篇工作类似：读到某个不保证已经被持久化的值（HawkSet: Automatic, Application-Agnostic, and Efficient Concurrent PM Bug Detection）。

但是，对变量进行写时也会进行 flush，所以有可能造成冗余的 flush。FliT（Flush if Tagged）是一个 C++库，通过简单地修改变量声明，可以自动使用 counter 跟踪变量被 flush 的情况。

> 这个想法是使用计数器（与内存字分开）来跟踪每个变量正在进行的存储操作。当一个存储操作开始时，它通过递增相应的计数器来标记其操作的内存位置。加载操作在访问给定的内存位置时检查计数器，并且只有在被标记时才对其执行刷新指令。通过这种方式，刷新指令仅在需要时才执行。

它也允许使用其他的优化策略，用来忽略某些不重要的变量（保持易失性，不进行 flush）