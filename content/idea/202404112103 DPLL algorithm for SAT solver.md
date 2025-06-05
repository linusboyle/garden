---
date: 2024-04-11
tags:
  - idea
  - SAT
  - DPLL
see also: 
aliases:
  - DPLL
  - Davis-Putnam-Logemann-Loveland Algorithm
---

DPLL 是一种目前通用的用于求解[[SAT|布尔可满足性问题]]的算法，在 SAT solver 中被广泛应用。

原始的DPLL在每一步选择一个变量并赋值（搜索树分支），然后应用[[Unit Propagation]]。当发现冲突时沿着搜索树回退，直到找到一个决策节点，其对应的变量的两种情况还没有被穷尽。

如果发现冲突时无法再回退，公式是不可满足的；如果所有变量都被赋值，则公式是可满足的，且unit clauses组成model。