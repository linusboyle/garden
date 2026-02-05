---
date: 2024-03-16
tags:
  - idea
see also:
  - "[[memory consistency model|WMM]]"
aliases:
  - SC
---

The standard simplistic concurrency model, where threads access a *sequential consistent* shared memory in an interleaved fashion.

It was proposed by the 1979 paper 'How to Make a Multiprocessor Computer That Correctly Executes Multiprocess Programs' by [[Leslie Lamport]].

> the result of any execution is the same as if the operations of all the processors were executed in some sequential order, respecting the order specified by the program 

But no multicore processor actually implements SC.

formal semantics:
- [[SC declarative model]] 
- [[SC operational semantics]] 
