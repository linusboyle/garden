---
title: CXL
date: 2025-11-26
tags: 
aliases:
- Compute Express Link
---

英特尔于2019年提出的一种新型设备互联技术标准。目前，主流半导体芯片厂商（涵盖CPU、GPU、内存、存储和网络设备制造商）和各大云服务提供商都积极拥抱CXL，有望成为下一代数据中心的事实标准。

## 协议

物理层使用PCIe（5.0及之后），包含三类子协议：

- CXL.io：CXL设备必须支持的基础通信协议，用于支持设备发现、配置、初始化、中断和DMA通信、I/O虚拟化等（类似PCIe）
- CXL.cache：一致的主机缓存访问
- CXL.memory：主机内存访问

## 设备类型

- Type 1（CXL.io 和CXL.cache）：没有本地内存的专用加速器（例如NIC），但可以利用 CXL.io 协议和 CXL.cache 与主机处理器的 DDR 内存进行通信。
- Type 2（CXL.io、CXL.cache 和 CXL.mem）：具有高性能GDDR或HBM本地内存的通用加速器（GPU、ASIC或FPGA ）。
- Type 3（CXL.io 和 CXL.mem）：内存扩展和存储级内存。设备为主机 CPU 提供对本地 DRAM 或非易失性存储的低延迟访问。

## Related

- [Homepage - Compute Express Link](https://computeexpresslink.org/) 目前已发布4.0版本规范
- [[Revisiting Distributed Memory in the CXL Era]] 讨论3.0引入的DSM支持