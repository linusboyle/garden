---
title: Compound Memory Model
date: 2026-10-23
tags:
  - idea
  - zettelkasten
aliases:
- Compound Memory Model
---

本文探讨在异构系统中，各部件的内存模型不同时，系统整体的内存一致性模型为何、应该如何表示。

例如：CPU和GPU通过类似CHI和[[CXL]]的互连方式链接并共享内存，又或者类似Apple M1的芯片可控制线程运行于Arm还是[[Total Store Order|TSO]]模式。

## 组合后的内存模型应该满足什么条件

首先，不能要求现有的硬件为了和其他部件互操作就进行修改。这意味着组合的模型不能太强。

其次，现有的编译过程应该被复用。比如，同样是从C编译，在为各个架构生成的目标码均不修改的情况下，在整个异构系统中能保持C层面的语义。这意味着组合的模型不能太弱（否则就会出现额外的程序行为）。

一个非常直观且“刚刚好”的作法就是让内存模型规约在各自的部件上得到保留。

## 如何表示组合后的内存模型

本文没有用声明语义去刻画整体的模型，主要是因为存在不满足[[20261021035128 multi-copy atomicity|MCA]]的模型时没有办法用这种方式表示。

取而代之的，本文修改POP模型，并引入LOST原则，给出了LOST-POP建模方式。这是一种操作模型，但是状态并不是具体的内存状态，而是每个线程的操作及其序关系。操作可以显式“传播”到其他线程，但是传播时，在其前面的事件必须都已经传播了。传播后，在其和目标线程的其他操作间会形成新的序关系。LOST原则体现在每个内存模型只控制线程局部的序关系如何添加。

## Related

- [[goensCompoundMemoryModels2023]] 原始标注
- [[Compound Memory Models]] an article from the author published on SIGARCH