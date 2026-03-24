---
title: bound analysis of nested loop
date: 2022-01-17
tags: 
aliases:
---

# bound analysis of nested loop
试看：

![[bound nested.png]]

内层循环bound是n，整体的bound也是n

> We now consider the case of a loop nested inside another loop. If our goal is to only prove termination of the outer loop, we can perform the process in a modular fashion: prove that the number of iterations of the outer loop is bounded, and prove that the number of iterations of the inner loop, in between any two iterations of the outer loop, is bounded. However, such a modular scheme would not work well for bound computation since it may often yield conservative bounds.

这里指明的是静态程序的控制流嵌套，和上界之间的依赖关系不存在必然的对应关系。