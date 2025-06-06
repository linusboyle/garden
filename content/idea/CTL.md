---
title: CTL
date: 2021-01-20
tags: 
aliases:
  - Computation Tree Logic
---

# CTL
CTL (Computation Tree Logic) is the syntactic fragment of CTL\* in which every path quantifier is immediately followed by a temporal operator:

*   If p ∈ A, then p is a CTL formula.
*   If φ and ψ are CTL formulas, then φ ∨ ψ , φ ∧ ψ , ¬φ, AXφ, EXφ, AFφ, EFφ, AGψ, EGψ, AψUφ, and EψUφ are CTL formulas.

CTL can be viewed as a propositional modal logic based on the compound operators AX, EX, AF, EF, AG, EG, AU, and EU

CTL公式描述的是state的性质，在[[Kripke Structure|Kripke Structure]]中，对应一个满足这个公式的状态集，即$\{s : K \mid s \models \phi\}$。这个集合可以递归地从子公式中计算，算法的复杂度是$O(|K|\times|\phi|)$。逻辑运算符和EX这两种情况是简单的，当运算符是EU和EG时的计算方法是：

### EU

对于 `E[f1 U f2]`，基本思路是先找出所有f2满足的状态，然后沿变迁关系向前搜索满足f1的状态组成路径，并将路径上的所有状态标记上 `E[f1 U f2]`

![[CTL EU.webp]]

### EG

对于 `EG f`，基本思路是，首先只考虑原图中f成立的节点（对于EG，其他节点可以删去而不影响算法），在这个新子图中，找出所有的非平凡[[强连通分量]]。每个SCC中的状态都满足 `EG f`；从它们出发，沿着变迁关系向前搜索满足f的路径，将这个路径上的状态也都标记上 `EG f`

上述算法的可靠性是显然的。完备性在于：从满足`EG f`的状态出发必然有一条只由满足f的状态组成的无限路径，因为Kripke结构是有限的，必然成环，也就必然有状态处于同一个非平凡SCC中。

![[CTL EG.webp]]