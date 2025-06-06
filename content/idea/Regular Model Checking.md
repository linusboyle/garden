---
title: Regular Model Checking
date: 2024-03-05
tags:
  - idea
see also:
  - "[[模型检测]]"
aliases:
  - RMC
---

# Regular Model Checking RMC

一种用于建模和验证参数化系统，动态状态系统，无限状态系统等的[[模型检测]]方法。

状态用一个word来表示，一组状态的集合用正规语言来表示。状态的变迁用有限状态转换机来表示（transducer, 或者更general的，能保持正规性的任何操作）。

Safety：假设初始状态集用自动机I表示，变迁关系由转换机T刻画，有一组状态集由自动机B表示是不希望进入的。检测是否有$T^{*}(I) \cap B = \emptyset$

由于状态无限，此问题不可判定（在某些限制条件下有解决的方法）。

迭代地计算$T^*(I)$不能保证终止。通常需要近似计算。