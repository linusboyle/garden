---
date: 2025-01-12
tags:
  - idea
see also:
  - "[[索引]]"
  - "[[2025-01-12]]"
---

实现在[[Boogie]]中的并发程序验证工具，核心为Owicki-Gries推理系统，在此基础上引入了：

1. 抽象精化。输入为分层并发程序，底层的实现精化上层的抽象
2. Mover：右移，左移或者both，指代可以与其他action交换的操作
	1. 根据Lipton's Reduction，形如 `Right* a Left*` 的语句可以视为原子块
3. Linear Type 

[官网](https://civl-verifier.github.io/doc)有较为详细的介绍