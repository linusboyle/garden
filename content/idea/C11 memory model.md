---
date: 2024-04-05
tags:
  - idea
see also:
  - "[[memory consistency model|WMM]]"
aliases:
  - C++ memory model
  - C11
---

## 简化模型

在[[release-acquire memory model|RA]]的基础上，为变量的访问添加访问模式（access mode）：

![[Pasted image 20240405221106.png]]

C/C++11中，只计算同步的读写对coherence的贡献：

![[Pasted image 20240405221235.png]]

## 实际模型

四种访问模式：
- non-atomic ： 默认
- relaxed
- release/acquire 
- sc