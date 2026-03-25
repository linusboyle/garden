---
title: decision tree learning for piecewise affine ranking functions
date: 2021-01-20
tags: 
aliases:
---

# decision tree learning for piecewise affine ranking function

背景
--

基于CEGIS的[终止性分析](终止性分析.md)的基本原理是通过examples综合[[ranking function|ranking function]]。

此前，[[sygus termination|sygus termination]]和[[rankingFromSample TACAS2016|rankingFromSample TACAS2016]]用到了反例进行终止性的求解，但两者用到的都是trace examples，即沿着某条路径的执行违反了预设的ranking function 。这是因为它们都是通过利用safety checker来检查当前的ranking是否正确，由此返回的例子是一条路径。

本文的目标是综合出piecewise ranking function，而决策树是这类ranking function一个天然的表示方式。

在本文中，validator返回的反例不是路径，而是变迁(x,x')，这样的变迁表示当状态从x变为x'时，违反了当前的候选ranking（换言之，候选的ranking还不是程序的ranking function）。

这样，还需求解从示例synthesize候选ranking的问题。

问题
--

给定一组变迁组成的示例集合：(x1,x1'),(x2,x2')…

找到一个(piecewise) ranking function f，使得$\forall i, f(x_i)\ge 0 \land f(x_i) > f(x_i')$

学习方法
----

通过把空间不断划分，为每个决策树的叶节点的示例找到一个affine ranking。需要特殊处理那些「跨越子空间边界」的情况。             

具体见论文。