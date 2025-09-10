---
title: Proving Non-termination Using Max-SMT
date: 2021-01-20
tags:
  - 论文
---

Proving Non-termination Using Max-SMT， CAV'14

# Proving Non-termination Using Max-SMT

从[[强连通分量|强连通分量]]的层面寻找不变式的方法，基于[[Max-SMT]]。非终止性证明是有特定性质的不变式标注的、从初始状态可达的SCC。

general idea
------------

1.  在程序中找强连通子图(SCSG，见[[强连通分量]])
2.  对其中的每一个节点，找到一个quasi-invariant；每一条不确定赋值语句，找到一个对赋值的限制，使其满足edge-closing的性质。
3.  用可达性分析的方法，证明SCSG至少有一个节点是从初始状态是可达的。

如此便证明了程序中存在不终止的路径。

和[[recurrence set|recurrent set]]相比，edge-closing quasi-invariant包含更多的信息。从搜索的方法角度来看，和[[prove nontermination 08]]只能处理[[lasso]]相比，SCSG能处理更加复杂的控制流和非周期性的不终止。而且SCSG的数量是有限的，lasso是无限的，相对来说更容易收敛。

下面解释一下edge-closing quasi-invariant

### quasi-invariant

quasi-invariant $Q_l$是CFG中一个位置l的不变式，满足对任意转移$\tau = (l, l', st) \in E^C，\forall v, v', u: Q_l(v) \land R_{st}(v, v') \land U_{\tau}(v, u) \implies Q_{l'}(v')$。其中U是对不确定赋值的限制，如$U(v, u) = u \ge x + 1$限制x的新值（u指代的是不确定赋值`x=nondet`中赋的值）比原始值大。

### edge-closing

quasi-invariant 是 edge-closing的，如果任意满足它的状态，都不可能转移到SCSG之外的位置（即，escape edge的前提是不满足的）。即，对任意$(l, l', st) \in P^C$，都有$\forall v, Q_l(v) \implies \neg R_{st}(v)$，其中$P^C$是SCSG C中的escape边的集合，$R_st(v)$是前提部分。

### main result

如果能找到从SCSG中的节点到quasi-invariant的映射Q和转移到不确定赋值限制的映射U，使得其满足edge-closing的性质，以及：

1.  存在SCSG中的节点l和状态s，$(l,s)$是从初始状态和位置可达的，且$s \in Q_l$
2.  对任意位置l和满足$Q_l$的状态v，以及l处任意的转移$\tau=(l, l', st)$，只要$R_{st}(v)$（转移的前提是满足的），总是可能找到非确定赋值u满足$U_{\tau}(v, u)$的限制

那么程序是不终止的。

finding proofs
--------------

首先找出所有SCC，然后在其中遍历SCSG。

文章给出的方法是用[[Max-SMT]]迭代地计算Q和U。首先给它们都赋值为true，然后每次迭代将quasi-invariant, edge-closing（这条约束是soft的）和之前的两个条件都编码为约束，用template来参数化新增的不变式和限制。Solver会求出能满足最多的edge-closing条件的解。

将这一次迭代的解加到已有的不变式和限制中，这些edge就都保证是closed的。重复这些操作，直到所有escape边都是从closed的。

![[maxsmt-nonterm-algo.png]]