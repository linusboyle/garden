---
title: prove nontermination 08
date: 2021-06-20
tags:
  - 论文
---

# prove nontermination 08

无近似，用约束求解方法进行[[recurrence set|recurrence set]]的显式[[程序综合|综合]]

1.  提出了recurrence set的概念，证明程序非终止当且仅当有recurrence set.
2.  用synthesis的方法为 [[lasso|lasso]] 形、确定型的线性程序找recurrence set，实现于工具TNT中。其中用到了 [[Farkas' Lemma]] 进行量词消去：

假设程序stem部分的变迁关系是ρ，loop部分的循环头是Px⩽g，循环体是x'=U x+u。要求解的RS表示为G(x)=Tx⩽t，则recurrence set的条件1表示为$\exists x, \exists x', \rho (x, x') \wedge T x' \leqslant t$，条件2表示为如下的约束:

$$\forall x, \exists x', T x \leqslant t \rightarrow P x \leqslant g \wedge x' = U x + u \wedge T x' \leqslant t \Rightarrow$$

$$
\forall x, T x \leqslant t \rightarrow P x \leqslant g \wedge T (U x + u) \leqslant t \Rightarrow
$$

$$
\exists \Lambda \geqslant 0, \Lambda T = \left( \begin{array}{c} P\ TU \end{array} \right) \wedge \Lambda t \leqslant \left( \begin{array}{c} g\ t - T u \end{array} \right) 
$$

参数T和t是recurrence set的template参数，大小可以迭代地调整。比如，约束不满足的情况下，可以添加更多的参数尝试求解。