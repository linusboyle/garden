---
title: Interval counterexamples for loop invariant learning
date: 2022-08-11
tags: 
aliases:
---

我们组的工作

## Counterexample Generalization

Let $\psi$ be the formula and $\sigma(x)$ assigns $\mu_x$ to variable x, which is a violating model of $\psi$

**Variable Elimination**

The formula $\psi \land \bigwedge_{x} x = \mu_x$ is hence unsat. 

By making $\psi$ hard and $\bigwedge_{x} x = \mu_x$ **soft** constraints, the unsat core signifies a subset of variables $x_c \subseteq x$

**Boundary Constraints**

Let D = d1, d2, ... dm be a fixed set of distance with d0 =0, then the following formula

$$
\psi \land \bigwedge_{x} \bigwedge \{x \ge \mu_x - d_i, x \le \mu_x + d_j \mid 0 \ge i, j \le m\}
$$

is unsat. The unsat core gives an interval to each variable.

The soft constraints here overlap, thus the obtained interval might not be the maximal ones

**Interval Digging**

![[Pasted image 20220811163656.png]]

and update the formula to:

![[Pasted image 20220811163910.png]]

The unsat core {$I_1, I_2, ... I_m$} is joint and $\land_{i=1}^m I_i$ represent (possible several disjoint) interval for a variable,