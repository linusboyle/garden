---
title: Separation Logic
date: 2025-09-23
tags: 
aliases:
- 分离逻辑
---

对可变共享数据结构的研究导向了在逻辑层面的若干独立发现，在2002年由J.C. Reynolds正式在LICS'02上提出分离逻辑的概念。分离逻辑既指一种谓词逻辑的扩展，也指以此种逻辑进行断言的Hoare Logic扩展及其推理系统。

## Motivation

对于堆上的数据结构，如果仅使用谓词逻辑进行描述会非常复杂，也难以scale。究其原因，通常对这类程序进行分析时，往往需要对数据结构间的共享/别名情况进行限制，譬如：

$$
(\exists \alpha, \beta. \textbf{list} \; \alpha \; i \wedge \textbf{list} \; \beta \; j \wedge \alpha_0^\dagger = \alpha^\dagger \cdot \beta) \\ \wedge (\forall k. \textbf{reach}(i, k) \wedge \textbf{reach}(j, k) \Rightarrow k = \textbf{nil}),
$$

其中的reach是归纳定义的谓词。公式的后一部分表示i和j代表的链表不相交。

除了所关心的结构本身是否共享内存，一个严谨的证明还需要对堆的其他位置的情况进行刻画。比如，如果是不相交的另一个链表，其应该不受操作的影响：

$$
\begin{align*}
&(\exists \alpha, \beta. \textbf{list} \; \alpha \; i \wedge \textbf{list} \; \beta \; j \wedge \alpha_0^\dagger = \alpha^\dagger \cdot \beta) \wedge  \textbf{list} \; \gamma \; x \\
&\wedge (\forall k. \textbf{reach}(i, k) \wedge \textbf{reach}(j, k) \Rightarrow k = \textbf{nil}) \\
&\wedge (\forall k. \textbf{reach}(x, k) \wedge (\textbf{reach}(i, k) \vee \textbf{reach}(j, k)) \Rightarrow k = \textbf{nil}).
\end{align*}
$$

分离逻辑可以解决上述问题，关键点在于这些情况均可用堆的「分离」刻画，且分离逻辑公式可以从堆的局部属性出发。

## Syntax

