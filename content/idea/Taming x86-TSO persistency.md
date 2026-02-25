---
title: Taming x86-TSO persistency
date: 2022-07-13
tags: 
aliases:
  - DPTSO persistency model
---

# Taming x86-TSO persistency

An alternative model of x86 persistency, where

- flushes are synchronous.
- persistence buffer is per location FIFO.
- sfence takes effect when it's propagated, not when issued or in the store buffer.

> Roughly speaking, our equivalence argument builds on the intuition that crashing before an asynchronous flush instruction completes is observationally indistinguishable from crashing before a synchronous flush instruction propagates from the store buffer.


## $DPTSO_{syn}^{mo}$

The declarative model allows execution graphs for which there's a [[modification order]] *mo* such that satisfy:

1. $hb(mo) = (ppo \cup rf_e \cup mo \cup fr(mo) \cup dtpo(mo))^{+}$ is acyclic
2. $fr(mo) ; po$ is acyclic (this restriction is for per thread coherence, i.e. ensuring write-read reorder does not happen within a thread)

the addition of dpto order to TSO model is sufficient for persistency. However, do **note that it is defined on partial graph**.

### dpto

the dpto (derived propagation tso order) orders any flush event to a location *x* before any write **w** to *x* that is propagated after the last persisted write event M(x)

![[Pasted image 20220807142439.png]]

## Related

- [[Persistency semantics of the Intel-x86 architecture|Px86]]
- [[Non-Volatile Memory|NVM]]