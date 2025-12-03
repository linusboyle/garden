---
title: Escape Analysis
date: 2025-12-01
tags: 
aliases:
- 逃逸分析
---

一种对象/指针的作用范围和生命周期的程序分析，常被用于带GC的语言（如Java和Go）的编译器[^1]中，实现编译优化：

- 如果对象并未逃逸出静态作用域，将堆对象分配到栈上（减少GC）
- 如果对象只有一个线程可以访问，消除冗余的同步操作
- 标量替换（Scalar Replacement），将对象分离为非连续的局部变量/寄存器

## Related

- [[程序分析|Program Analysis]]
- [[pointer analysis]] 

[^1]: 不过实际上Java是在JVM层面实现的，javac并没有逃逸分析。这主要是因为Java中会有动态类加载，因此静态的分析无法确定函数的重载，故只能保守地认为对象发生了逃逸。详见[逃逸分析为何不能在编译期进行？](https://www.zhihu.com/question/27963717)
