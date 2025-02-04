---
date: 2024-04-11
tags:
  - idea
see also:
  - https://cse442-17f.github.io/Conflict-Driven-Clause-Learning/
  - "[[202404112103 DPLL algorithm for SAT solver|DPLL]]"
  - "[[Unit Propagation]]"
aliases:
  - Conflict Driven Clause Learning
---

> Conflict-driven clause learning works as follows.
> 
> 1. Select a variable and assign True or False. This is called decision state. Remember the assignment.
> 2. Apply Boolean constraint propagation (unit propagation).
> 3. Build the [implication graph](https://en.wikipedia.org/wiki/Implication_graph "Implication graph").
> 4. If there is any conflict
>     1. Find the cut in the implication graph that led to the conflict
>     2. Derive a new clause which is the negation of the assignments that led to the conflict
>     3. **Non-chronologically** backtrack ("back jump") to the appropriate decision level, where the first-assigned variable involved in the conflict was assigned
> 5. Otherwise continue from step 1 until all variable values are assigned.

More specifically, about the back-jumping:
> When CDCL learns a clause, it backtracks to the clause’s _asserting level_. You can just think of this meaning that it backtracks to the latest guess that affects a literal in the learned clause.
