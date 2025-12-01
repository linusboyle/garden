---
title: Linearizability
date: 2023-04-23
tags: 
aliases:
---

# Linearizability

In a concurrent system, an execution of the system results in a _history_, an ordered sequence of completed operations, which is composed of function invocations and responses. A **sequential** history is one in which all invocations have immediate responses.

A history is **linearizable** if there is a total order `lin` of completed operations such that

1. Every operation has the same result if they were completed one by one in the order `lin`. (All operations appear as atomic to the client)
2. If an operation a completes before another operation b begins, then a precedes b in `lin`. (The order should obey the real-time execution)

A program (or object) is linearizable if all valid history of it can be linearized.

## Proof

### linearization point

A common way to prove linearizability, under [[Sequential Consistency]] , is through identifying the **linearization point** of each function call, namely the concrete event (i.e. memory access) in the function implementation that represents the moment when the function’s effects become observable to other operations.

In this case, linearizability can be proved by an induction over the execution $e_1, e_2, \ldots, e_n$. See below:

![[Pasted image 20230423194048.png]]

