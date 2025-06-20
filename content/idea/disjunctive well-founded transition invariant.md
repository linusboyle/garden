---
title: disjunctive well-founded transition invariant
date: 2021-06-20
tags: 
---

# disjunctive  well-founded transition invariant
termination argument can also be a finite union $T_1 \cup \cdots \cup T_k$ of well-founded relation. Usually, the individual relations will be constructed via some map into a well-order, like an ordinary (simple) ranking function.

In this case, we have to prove 

$$
R^{+} \subseteq T_1 \cup \cdots \cup T_k
$$

> intuitively, the termination argument must hold after _any number of iteration_ of the loop, not just a single one.

the transitive closure makes checking the subset inclusion more difficult in practice. It can be solved by encoding to assertion checker. see [[transition invariant checking|transition invariant checking]]. However, it enables modularity.

This method is based on Ramsey's Theorem.