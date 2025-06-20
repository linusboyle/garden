---
title: lasso
date: 2021-01-02
tags: 
---

# lasso

简单的来说，lasso是一条有特定形态的程序执行路径。它有两个部分: stem和loop。stem和loop都是有限的程序片段，且loop在程序的CFG或调用图上形成环。lasso也可以看作只有一条路径的简单程序

如果lasso的路径在语义上是正确的，则称为是feasible。这里可以借用 [[trace]] 中的相关概念。从另一个角度，lasso就是一个特殊的trace。

lasso是比较典型的无穷路径的一种有穷表示（一个简单的 [[ω-automata|omega automata]]），可能在多个场合生成：

*   基于 [[trace abstraction 路径抽象]]的终止性证明中lasso是（也许为伪）反例。如果lasso的终止性被证明，则将用于trace abstraction的精化；如果非终止性被证明，则证伪了终止性

> 在[[终止性分析]]中反例常以lasso的形式给出。

*   非终止性证明中生成，为其寻找recurrence set来证明非终止性
* ……

需注意 lasso 形的程序路径是周期性的，无法表示非周期的路径/模式 (aperiodic trace).