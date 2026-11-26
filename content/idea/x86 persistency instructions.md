---
title: x86 persistency instructions
date: 2022-09-08
tags:
aliases:
---

The instruction `clwb`, `clflush`, `clflushopt` writes cache line back **asynchronously**

- `clwb` and `clflushopt` is semantically equivalent, but `clflushopt` invalidates the cache line. Therefore `clwb` provides better performance.
- However, `clwb` does not guarantee it perserves the cache line. It's just a 'maybe'.
- `clflush` is stronger in terms of ordering. See [[Persistency semantics of the Intel-x86 architecture|Px86]] for details.

## Related

- [[Non-Volatile Memory|NVM]]