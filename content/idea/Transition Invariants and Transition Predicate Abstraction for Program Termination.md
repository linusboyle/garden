---
title: Transition Invariants and Transition Predicate Abstraction for Program Termination
date: 2021-01-01
tags: 
- legacy
aliases:
---

# Transition Invariants and Transition Predicate Abstraction for Program Termination
TACAS 2011

> Originally, the concepts of transition invariants and transition predicate abstraction were used to formulate a proof rule and an abstraction-based algorithm for the verification of liveness properties of concurrent programs under fairness assumptions. This note applies the two concepts for proving termination of sequential programs. We believe that the specialized setting exhibits the underlying principles in a more direct way.

文章整合了[[disjunctive well-founded transition invariant|disjunctive termination argument (transition invariant)]]和transition predicate abstraction。前者是[[终止性分析]]论据，后者是计算前者的一种方法。

固定一组谓词P，transition predicate abstraction将程序的一个变迁s抽象到P中包含其变迁关系$\rho\_s$的的所有谓词的合取，称为abstract transition。

![](transition%20invariants.png)

此算法被用于从程序计算一组abstract transition

上述算法计算出的abstract transition集合根据定义是包含程序总的变迁关系的传递闭包的，即是[[disjunctive well-founded transition invariant|disjunctive termination argument (transition invariant)]]。

如果这些abstract transition都是well-founded的，则程序终止（但是文章的算法并不能保证这成立，也没有refine，而是一个one-shot算法）。