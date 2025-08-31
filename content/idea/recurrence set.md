---
title: recurrence set
date: 2025-08-31
tags:
- 非终止性分析
aliases:
  - recurrent set
---

# recurrence set

也被称作open recurrence set（和后续被提出的 [[closed recurrence set|closed recurrence set]] 相对而言），在 Gupta‘08 的经典论文中提出

## definition

一个recurrence set G(s)是一组状态的集合，满足：

1.  $\exists s, G(s) \land I(s)$
2.  $\forall s \exists s', G(s) \implies \rho(s, s') \land G(s')$

其中，$\rho$是状态间的变迁关系, I是初始状态集。

对关系 $\rho$，如果存在这样的recurrence set，则证明 $\rho$ 不是良序的。程序是非终止的（存在非终止执行），当且仅当存在recurrence set。**注意**，和不变式一样，recurrence set 即使存在，不一定能被表达。

## Gupta'08，模板化

一个寻找recurrence set的方法是将其编码为constraints。比如，[[prove nontermination 08|prove nontermination 08]]用template来表示线性程序的候选的recurrence set(表示为不等式)，通过约束求解得到参数的值。如果无法求解，则迭代地调整template，引入更多参数。但是，由于条件2中有$\forall \exists-$约束，难以求解，也无法用[[Farkas' Lemma]]消去，限定了程序的变迁是确定的，这样才可以用s'的表达式带入，消掉$\rho(s,s')$