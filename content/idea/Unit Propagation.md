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
---

A unit clause consists of a single literal. Its assignment is fixed.

Unit Propagation finds unit clauses, assigns values to the variables, and propagates them to other clauses. This process is done repeatedly until saturation: 
- if a clause is subsumed by a unit clause, it is already satisfied and removed from the formula.
- if a clause contains the opposite of a unit clause, it is removed from the clause.