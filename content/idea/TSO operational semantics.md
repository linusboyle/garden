---
title: TSO operational semantics
date: 2023-01-20
tags: 
aliases:
---

In TSO, there is a write buffer for each core. 

Read on the same core can access the buffer, but other cores cannot.

![](Pasted%20image%2020220123211240.png)

In this case, the memory state is a function from location to value, M, plus a buffer for each thread:

![](Pasted%20image%2020220123211330.png)

**TSO transitions:**

![](Pasted%20image%2020220123211351.png)

Note that the buffer is propagated to main memory in the order it is fired.