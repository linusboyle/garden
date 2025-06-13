---
title: Presburger arithmetic
date: 2024-03-05
tags:
  - idea
  - 一阶理论
see also:
alias:
- linear integer arithmetic
---

# Presburger arithmetic

First order theory of natural numbers with addition. Introduced by Mojżesz Presburger in 1929. It is decidable, with complexity at least double exponential

Presburger arithmetic能够定义的集合（使一个Presburger arithmetic语句成立的自由变量取值）正好是 [[semilinear set]]。

Presburger arithmetic与LIA
-------------------------

Presburger arithmetic是关于自然数的理论，但可以用它表示$T_Z$，即整数理论（带加法，integer linear arithmetic）。

对于一个$T_Z$公式，为每个整数变量x引入两个自然数变量$x_1,x_2$，用$x_1-x_2$替换x。

因为Presburger arithmetic里没有减法，可以通过把各负项移到（不）等式另一侧来解决。不等关系可以用量词模拟：$a > b \rightarrow \exists u. \neg(u =0)\land a = b + u$

Related Link:
-------------

*   [Proving that a set is/is not semilinear](https://math.stackexchange.com/questions/649727/proving-that-a-set-is-is-not-semilinear)