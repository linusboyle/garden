---
date: 2024-04-11
tags:
  - idea
  - SAT
  - DPLL
see also:
  - "[[202404112103 DPLL algorithm for SAT solver|DPLL]]"
aliases:
  - Boolean Constraint Propagation
  - BCP
  - 单元传播
---

A unit clause 单元子句 consists of a single unassigned literal. Its assignment is fixed.

Unit Propagation finds unit clauses, assigns values to the variables, and propagates them to other clauses. 

This process is done repeatedly until saturation: 

- if a clause is subsumed by a unit clause, it is already satisfied and removed from the formula. （如果一个子句中包含相同的文字，则此子句被满足，可直接删除）
- if a clause contains the opposite of a unit clause, it is removed from the clause. （如果一个子句包含此文字的否定形式，则将其从子句中删除）

上述单元传播过程可能产生新的单元子句，因此这个过程可能持续进行。

Unit Propagation 是提升 [[202404112103 DPLL algorithm for SAT solver|DPLL]] 算法效率的关键之一。