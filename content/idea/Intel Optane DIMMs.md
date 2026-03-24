---
title: Intel Optane DIMMs
date: 2023-03-27
tags: 
aliases:
  - 傲腾
---

# Intel Optane DIMMs

2019 年 4 月，Intel 发布了第一款企业级的持久化内存 —— Intel Optane DC Persistent Memory

两种工作模式：

- Memory Mode 允许应用程序在一个大型易失性内存池上操作而不进行修改
- App Direct Mode 提供一个低延迟、字节可寻址的持久内存池。使用CPU指令进行操作，需要能够感知持久化内存的文件系统（比如 EXT4-DAX、XFS-DAX、NOVA）或其他组件（比如 PMDK）来管理、操作持久化内存设备

在 App Direct Mode 工作模式下，尽管 Optane [[DIMM]] 设备本身是非易失的，但是由于有 CPU Cache 的存在，当设备掉电时，“还没写入” Optane DIMMs 的数据还是会丢失。为了保证 CPU Cache 上的数据持久化，可以调用 CLFLUSHOPT 或 CLWB 指令，将 CPU Cache Line Flush 到 Optane DIMMs 中。由于CLFLUSHOPT 和 CLWB 指令都是异步执行的，所以一般需要跟随一个 SFENCE 指令，以保证 Flush 执行完成。

CPU 还提供了 NTSTORE（Non-temporal stores）指令可以做到数据写入的时候 bypass CPU Cache，这样就不需要额外的 Flush 操作了。

注：读写发生在用户态，区别于传统IO需要进行系统调用

## Related

- [[X86 persistency instructions]]
- [[Non-Volatile Memory|NVM]]