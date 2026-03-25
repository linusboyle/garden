---
title: Non-Volatile Memory
created time: "[[2023-03-05]]"
tags:
  - idea
see also:
  - "[[PM实现方案 20221007]]"
aliases:
  - Persistent Memory
  - NVM
  - PMEM
---

# Non-Volatile Memory (NVM)

Specifically referred to Persistent Memory devices like [[Intel Optane DIMMs]], not traditional storages.

## What is Persistent Memory

> Persistent Memory (PMEM), also referred to as Non-Volatile Memory (NVM), or Storage Class Memory (SCM), provides a new entry in the memory-storage hierarchy shown in Figure 2 that fills the performance/capacity gap.

![[Pasted image 20230109144446.png]]

持久内存可以像DRAM一样随机访问，同时拥有和传统硬件媲美的空间。一般可以通过和传统存储设备同样的IO接口进行访问，也可以把持久内存当成DRAM来使用，如此在传统架构上编写的程序可以正常在持久内存上运行；要发挥全部特性，则需要考虑PM的持久性，即需要用户确保持久内存上数据的一致性。由于系统产生各种意外中断的可能性，这就要求限制数据写回持久内存的顺序。

## What does PM mean for application developers?

The introduction of a persistent memory tier **offers application developers a choice of where to put data and data structures**. Traditionally data was read and written to volatile memory and flushed to non-volatile persistent storage. When the application is started, data has to be read from storage into volatile memory before it can be accessed. Depending on the size of the working dataset, this can take seconds, minutes, or hours. With clever application design, developers and application architects can now take advantage of this new technology to improve performance and reduce application startup times.

Persistent Memory introduces **some new programming concerns, which did not apply to traditional, volatile memory**. These include:

Data Persistence:

-  **Stores are not guaranteed to be persistent until flushed**. Although this is also true for the decades-old memory-mapped file APIs (like mmap() and msync() on Linux), many programmers have not dealt with the need to flush to persistence for memory. Following the standard API (like msync() to flush changes to persistence) will work as expected. But more optimal flushing, where the application flushes stores from the CPU caches directly, instead of calling into the kernel, is also possible.
- CPUs have out-of-order CPU execution and cache access/flushing. This means if two values are stored by the application, **the order in which they become persistent may not be the order that the application wrote them**.

Data Consistency:

-  8-byte stores are powerfail atomic on the x86 architecture -- if a powerfail happens during an aligned, 8-byte store to PMEM, either the old 8-bytes or the new 8-bytes (not a combination of the two) will be found in that location after reboot.
-  Anything larger than 8-bytes on x86 is not powerfail atomic, so it is up to software to implement whatever transactions/logging/recovery is required for consistency. Note that this is specific to x86 -- other hardware platforms may have different atomicity sizes (PMDK is designed so applications using it don't have to worry about these details).

Memory Leaks:

-   Memory leaks to persistent storage are persistent. Rebooting the server doesn't change the on-device contents. In the current volatile model, if an application leaks memory, restarting the application or system frees that memory.

Byte Level Access:

-  Application developers can read and write at the byte level according to the application requirements. The read/writes no longer need to be aligned or equal to storage block boundaries, eg: 512byte, 4KiB, or 8KiB. The storage doesn't need to read an entire block to modify a few bytes, to then write that entire block back to persistent storage. Applications are free to read/write as much or as little as required. This improves performance and reduces memory footprint overheads.

Error Handling:

 - Applications may need to detect and handle hardware errors directly. Since applications have direct access to the persistent memory media, any errors will be returned back to the application as memory errors.

## Characteristics

- Persistent
- Byte-addressable
- Low latency
- High capacity

## Challenge

Programmers must ensure the [[Crash Consistency]] of their programs (a.k.a crash safety). This is because NVM hardwares usually have weak persistency semantics (due to presence of cache). Certain operations (e.g. flush and fence) can be used to constrain the *persist order*, but require a lot of knowledge and is expensive.

Note providing [[Strict Persistency]] solves the problem ('Cause any post-crash state is a valid volatile state), like Intel eADR, but this is hard in reality.

Semantics models of NVM weak persistency behavious include 
- Px86, with formalized semantics of Intel-x86 persistency (two variants): [[Persistency semantics of the Intel-x86 architecture]]
- DPTSO, a varaint of Px86 with synchronous flushes: [[Taming x86-TSO persistency]]

## Visibility and Persistency

> Visibility and persistence are often not the same thing, and changes made to persistent memory are often visible to other running threads in the system before they are persistent.

Data Visibility由架构的Memory Model决定。类似的，Persistency的顺序由Persistency Model决定。

Persistency Model for Intel-X86:

- A. Raad, J. Wickerson, G. Neiger, and V. Vafeiadis, ‘Persistency semantics of the Intel-x86 architecture’, Proc. ACM Program. Lang., vol. 4, no. POPL, p. 11:1-11:31, Jan. 2020, doi: 10.1145/3371079. [[Persistency semantics of the Intel-x86 architecture]]
- A. Khyzha and O. Lahav, ‘Taming x86-TSO persistency’, Proc. ACM Program. Lang., vol. 5, no. POPL, pp. 1–29, Jan. 2021, doi: 10.1145/3434328. [[Taming x86-TSO persistency]]

Persistency Model for ARMv8:

- A. Raad, J. Wickerson, and V. Vafeiadis, ‘Weak persistency semantics from the ground up: formalising the persistency semantics of ARMv8 and transactional models’, Proc. ACM Program. Lang., vol. 3, no. OOPSLA, p. 135:1-135:27, Oct. 2019, doi: 10.1145/3360561.

## Relevant Works

### 2023

- Memento: A Framework for Detectable Recoverability in Persistent Memory (PLDI)
- Mumak: Efficient and Black-Box Bug Detection for Persistent Memory (EuroSys)
- Spirea: A Mechanized Concurrent Separation Logic for Weak Persistent Memory (OOPSLA, distinguised)

### 2024

- [[Discovering Likely Program Invariants for Persistent Memory]] (ASE)