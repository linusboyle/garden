---
title: Finding real bugs in big programs with incorrectness logic
date: 2025-09-11
tags:
- 论文
---

OOPSLA'22, *Finding real bugs in big programs with incorrectness logic*

This paper proposes a static analysis method using [[Incorrectness Separation Logic]], underpinned by bi-abduction technique.

## Goal 

Compute a set of function summary $[p]f()[\epsilon: q]$ for each method $f$, without any specification from the users.

## Analysis

The static analysis in Pulse is a worklist-style forward [[Data-flow Analysis]]. Each control flow point is associated with a set of triples $(\epsilon, m, q)$, which means 'if $m$ is added to the precondition of the function, then $\epsilon:q$ holds at this point'.

The transfer function is represented by the Eval(p, C, T) function:

![](Finding%20real%20bugs%20in%20big%20programs%20with%20incorrectness%20logic-20250911201020897.webp)

**inst** represents all other types of statements and function calls. $T$ contains all computed summaries for functions, and predefined IL triple $[a] inst [\epsilon : b]$ for each instruction **inst**. 

### Bi-Abduction

Given a spec of next instruction $[a] inst [\epsilon : b]$, and the current precondition $p$, the goal of **bi-abduction** is to synthesize $m$ and $f$ such that 

$$
a * f \vDash p * m
$$

$f$ is added to the post-condition, and $m$ propagated back to the precondition of the summary.

The method for bi-abduction is detailed in POPL'09 *Compositional Shape Analysis by Means of Bi-Abduction*