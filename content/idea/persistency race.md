---
title: persistency race
date: 2023-03-27
tags: 
---

# persistency race

> A program has a persistency race if there exist a pre-crash execution and post-crash execution such that (1) a load 𝑙 in post-crash execution  reads from a non-atomic store 𝑠 in the pre-crash execution and (2) the store 𝑠 is not persistency ordered before the load of it in post-crash execution.

Here 'persistency ordered before' means the store *s* does not satisfy any of these following conditions:

1. there is another store s' to the same cache line as s, and s happens before s'. Moreover, s' is read by the post-crash execution before read of s (thus ensuring s' has persisted, and so is s).
2. there is a clflush operation to the same cache line as s, and s happens before this clflush operation. Moreover, this clflush happens before another store s' that is read by the post-crash execution (so that this clflush has persisted, and so is s).
3. there is a clwb/clflushopt operation to the same cache line as s, and s happens before this clwb operation. Moreover, this clwb operation happens before a fence, which in turn happens before another store s' that read by the post-crash execution (likewise).

P.S. the above is my understanding and is actually different from what's said in the paper *Yashme: detecting persistency races*. The authors use the above conditions for a **prefix** of the pre-crash execution. This is because [[Yasheme]] executes the program dynamically, and analyze a single pre-crash and post-crash execution at a time. The strategy of [[Yasheme]] is to analyze also the prefixes of the given pre-crash execution. 

## Note

我在参加 ASPLOS25 的时候遇到了*HawkSet: Automatic, Application-Agnostic, and Efficient Concurrent PM Bug Detection*的作者 João Oliveira, 他对这篇论文提出的 race 定义很不以为然。我也觉得这种定义有点强行。

João Oliveira 的定义则和经典的 data race 更接近：一个线程读取了某个写，但是这个写不保证在这之前被持久化（以锁定义的临界区为准）。