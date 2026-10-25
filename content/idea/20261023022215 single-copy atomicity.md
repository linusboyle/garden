---
title: single-copy atomicity
date: 2026-10-23
tags:
  - idea
  - zettelkasten
aliases:
- single-copy atomicity
- SCA
---

“In single-copy atomic (SCA) [[memory consistency model|memory model]], a load returns a value written by a single store and not a mishmash of values from two or more stores” 

Almost all memory models are SCA

Per Armv7 Manual (DDI0406C.b):

> A read or write operation is single-copy atomic if the following conditions are both true:
> 
> - After any number of write operations to a memory location, the value of the memory location is the value written by one of the write operations. It is impossible for part of the value of the memory location to come from one write operation and another part of the value to come from a different write operation
>     
> - When a read operation and a write operation are made to the same memory location, the value obtained by the read operation is one of:
>     
>     - the value of the memory location before the write operation
>     - the value of the memory location after the write operation.
>     
>     It is never the case that the value of the read operation is partly the value of the memory location before the write operation and partly the value of the memory location after the write operation.


## Related

- [[20261021035128 multi-copy atomicity|multi-copy atomicity]] 实际上没什么联系，两者指的原子性并不是一个东西。同时参见MCA中关于SCA另一种定义的部分，但现在多使用此处给出的用法。
- [[Classification of memory consistency model]]