---
date: 2024-11-22
tags:
  - idea
see also:
  - "[[索引]]"
  - "[[2024-11-22]]"
aliases:
  - Dual In-line Memory Module
  - 双列直插式存储器模块
  - 内存槽
---

DIMM通常是数颗至数十颗DRAM芯片焊接安装于一块已制作好电路的印刷电路板的形式，用于个人电脑、工作站、服务器。相比SIMM两边针脚相连在一起，DIMM两边针脚是独立的。SIMM的数据总线为32-bit宽度，DIMM则是64-bit宽度。 

目前，绝大部分个人电脑及工作站及服务器都是使用 [[DDR]] DIMM

## 通道

主板上的 DIMM 槽组成通道，取决于内存控制器和布线方式。DPC 这一单位描述 DIMM per Channel，1DPC 即每通道一槽位。一般不同通道的内存条最好保持速度、容量等一致。

>  Modules rated at different speeds can be run in dual-channel mode, although the motherboard will then run all memory modules at the speed of the slowest module. Some motherboards, however, have compatibility issues with certain brands or models of memory when attempting to use them in dual-channel mode. For this reason, it is generally advised to use identical pairs of memory modules, which is why most memory manufacturers now sell "kits" of matched-pair DIMMs. Several motherboard manufacturers only support configurations where a "matched pair" of modules are used.

目前的CPU 基本支持双通道，服务器和工作站级别的 CPU 支持更多的通道。大于 1DPC 时，具体插在哪些槽位跟[[20250829094226 2DPC 主板内存布线|主板布线]]有关系，需参考主板的说明。