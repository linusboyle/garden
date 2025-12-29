---
title: weak topological order
date: 2025-12-23
tags: 
aliases:
---

A Weak Topological Order is a permutation of the vertices of a graph such that for every edge u→v, either

1. **Forward Edge**: u precedes v
2. **Backward Edge**: v precedes or equals u, and v is the head of a component.

通常拓扑排序只有有向无环图才能实现，而wto可以用于CFG中有循环时计算不动点。

wto也可以用括号表示自然循环/component：

> A hierarchical ordering of a set is a well-parenthesized permutation of its elements without two consecutive "(". I defines a total order <= over its elements. The elements between two matching parentheses are called a Component. The first element of a Component is called the head. Let denote by H(v) the set of head of the nested components containing v. 

例如1(234)5 表示234构成一个component

## Related

- [[Infer]]