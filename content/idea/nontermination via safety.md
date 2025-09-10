---
title: nontermination via safety
date: 2021-01-20
tags:
  - 论文
---

TACAS'14 *Proving Nontermination via Safety*

> 注：2025年了才发现作者里有Peter O'Hearn

# nontermination via safety

基于下近似、可达性分析，隐式构建[[closed recurrence set|closed recurrence set]]的nontermination analysis

> 文章提出了将程序的非终止证明规约为可达性（Safety）验证的方法。其具体方法为在程序循环结束后的位置添加assert(false)断言，然后使用可达性验证工具来进行程序验证。倘若assert(false)不可达，则程序非终止。倘若assert(false)可达，则存在循环终止的路径（错误路径），依据验证工具返回的错误路径进行精化（Refine）。使用最弱前置条件计算，求得终止路径在循环前的最弱前置条件P。再在循环头添加assume(not P)，以block掉该终止路径。如此循环，直至循环头位置不可达（无非终止路径），或者程序验证通过（剩余未被blocked的路径都是非终止的）。

理论基础是[[命令式程序的建模|程序]]的下近似以及[[closed recurrence set|closed recurrent set]]的概念。

为了证明程序P有非终止的执行（[[终止性分析]]是[[liveness property]]），选取P的下近似P'，然后证明P'的所有执行都是非终止的。后者是[[safety property]]，比原来的性质要简单，因为其反例是一条终止的路径，可以用于精化程序的下近似。这一方法是可靠的，但不完备。

在这篇paper里，下近似的方法是限制初始状态集（通过上面说的assume not P），以及限制不确定赋值，此外对控制流之类没有修改。

实际上，这篇paper证明P'永不终止，是通过可达性验证的方法间接进行的，即证明的实际上是程序的终止location是不可达的。如果对某个下近似P'证明了不可达，那P'不一定就是永不终止的（可能执行路径在中途断掉），因此还必须补上循环头可达，以及循环体不中断的检查。前者同样可以用可达性验证，后者没有完备的方法，paper中是通过生成不变式来检查。