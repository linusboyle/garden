---
title: 基于trace的程序建模
date: 2021-06-20
tags: 
---

# 程序(program, trace based)

definition
----------

基于trace的程序定义如下，另外参考[[命令式程序的建模|命令式程序的建模]]

程序是一种CFG，其节点是程序中的**位置**，包括一个初始位置，和若干的终止位置。此外还有转移关系$\delta$。程序的转移用statement标注。

> 关于statement的一点说明：除了一般的语句之外，也允许一种[[assume语句]]，其本质上是一个逻辑式，用来表示分支、循环等的条件。这种语句的操作语义是显然的，如果从满足这个式子的状态执行，则将其视为skip；否则执行流被阻断。
> 
> 但以上是基于状态的解释。按照trace正确性的定义，$\{\phi\}\psi\{\phi'\}$当且仅当$\phi \land \psi \implies \phi'$

程序P可以视作自动机（视乎条件，可能是FA或[[ω-automata|ω-automata]]或其他类型的自动机），其接受的语言是一组trace的集合（即一组路径，路径上标注的statement序列组成了trace）。如果一个trace被P接受，则称为control flow trace。这样的trace也就是符合P（静态）控制流那些trace。

correctness
-----------

P是正确的，当且仅当其所有的control flow trace是正确的。即$L(P) \subset {correct \quad traces}$。要证明P的正确性，可以用[[trace abstraction 路径抽象|trace abstraction]]方法