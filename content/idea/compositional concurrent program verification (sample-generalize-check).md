---
title: compositional concurrent program verification (sample-generalize-check)
date: 2022-06-06
tags: 
aliases:
---

# compositional concurrent program verification (sample-generalize-check)
采用组合-泛化-检查方法来进行并发程序验证的基本思想，可以用*A New Notion of Compositionality for Concurrent Program Proofs (Invited Talk)* 中的一段话说明：

> The principle behind our methodology is simple. It is difficult to reason about the correctness of a complex concurrent program, however, **it is much simpler to reason about the correctness of a single behaviour (i.e. a single run) of the same program.** 
> 
> Consider, for example, the complexity of reasoning about unbounded concurrency. Any (terminating) run of such a program always includes a bounded (by the length of the run) number of participating threads. Therefore, the complexity of dealing with unboundedly many threads can be circumvented whilst reasoning about the run. **The idea is then to mine these simple proofs of program runs for ingredients to construct a correctness proof for the program.**

与[[../../1. Daily/2021/10 - October/27 - Wednesday/Andreas Podelski|Andreas Podelski]]之前的两项工作很像：

*   [[disjunctive well-founded transition invariant|disjunctive termination argument (transition invariant)]] based termination analysis : Terminator
*   [[trace abstraction|trace abstraction 路径抽象]] ： [[Ultimate|Ultimate]]

它们都是用的组合方法，通过一系列proof来覆盖程序。只不过角度不同。transition invariant是在[[变迁系统|变迁系统]]的层面，要求用一系列relation来覆盖程序的transition relation；路径抽象是在控制流和CFG的层面，要求证明能对所有trace成立。

这个系列的工作是从Hoare三元组出发，三元组在某些预定义的推导规则下组成的deductive system导出一个Proof Space。Proof Space可以被某些自动机模型所接受，比如predicate automata。

* * *

predicate automata的包含操作不可判定。但是如果谓词都是一元的，则可以用一些算法求解。