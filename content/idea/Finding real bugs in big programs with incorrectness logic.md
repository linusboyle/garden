---
title: Finding real bugs in big programs with incorrectness logic
date: 2025-09-11
tags:
- 论文
- 错误逻辑
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

## Reporting Errors

Given a set of summaries  $[p]f()[\epsilon: q]$, in what circumstances do we report an error?

Obviously, only when it's an error triple, i.e. $[p]f()[er: q]$. However, not all summaries are realized. It depends on the calling context.

- a **manifest error** denotes a valid summary $[p] f() [er : q]$ that (1) can be applied within any calling context (i.e., regardless of the state at the call site); and (2) when applied, it always yields an erroneous execution terminating in a state satisfying an extension of q.
- Otherwise, it is a **latent error**.

We only report **manifest error**, except for memory leaks, which are considered problematic even if not triggered.

## Example

For the following function, we start from the beginning of the method with $y \mapsto Y * v \mapsto V$. `local z`  introduces a local variable.

![](Finding%20real%20bugs%20in%20big%20programs%20with%20incorrectness%20logic-20250915144709630.webp)

The next statement has a predefined specification:

$$
[z \mapsto Z * y \mapsto Y * Y \mapsto W] z := [y] [\text{ok}: z \mapsto W * y \mapsto Y * Y \mapsto W]
$$

So we have to solve the bi-abduction 

$$z \mapsto Z * y \mapsto Y * Y \mapsto W * f \vDash y \mapsto Y * v \mapsto V * z \mapsto Z \land Z = nil * m$$

One solution is $m = Y \mapsto W$ and $f = v \mapsto V \land Z = nil$. Here m is sent back to the precondition.

After some iteration we get the summary 

$$
[y \mapsto Y * v \mapsto V * Y \mapsto W \land W = \text{nil}] \text{set}(y,v) [\text{err}: y \mapsto Y * v \mapsto V * Y \mapsto W \land W = \text{nil}]
$$

This is a latent error, so we don't report it.

Now consider a function calling set()

![](Finding%20real%20bugs%20in%20big%20programs%20with%20incorrectness%20logic-20250915150754956.webp)

This time the context is irrelevant, therefore it's a manifest error. This error is reported to the user.

## Implementation

When implementing the analysis in Pulse, in addtional to bounded model checking, it also bound number of disjunctions in the formula. Otherwise, the analysis might not terminate (since the space is not finite).

