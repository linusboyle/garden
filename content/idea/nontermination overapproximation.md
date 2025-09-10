---
title: nontermination overapproximation
date: 2021-01-28
tags: 
---

# nontermination overapproximation

基于上近似，进行[[closed recurrence set|closed recurrence set]]的显式综合的nontermination analysis

在[[Disproving termination with overapproximation|Disproving termination with overapproximation]]中, [[live abstraction|live abstraction]]被用于和[[closed recurrence set]]一起证明程序的非终止性。文章证明，如果在上近似P'中找到closed recurrence set G'，且原程序存在一个初始状态$s_0$，满足$AF(s_0) \in G'$且$AF(s_0)$是抽象域中的初始状态，则原程序P也存在closed recurrence set，即$G = \{s \mid \exists a. G'(a) \land AF(s) = a\}$。G隐含了[[recurrence set|recurrent set]]，从而证明非终止性。