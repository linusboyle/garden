---
title: Abstraction for Crash-Resilient Objects
date: 2024-08-04
tags:
  - reference
see also:
  - "[[索引]]"
  - "[[2024-08-04]]"
  - "[[Non-Volatile Memory|NVM]]"
authors:
zotero url:
---

## Synopsis

We study abstraction for crash-resilient concurrent objects using non-volatile memory:

- Client can reason about abstract specification of libraries
- Library developers can verify implementation against specification regardless of client.

The above abstraction should be formalized in a library abstraction theorem. Also known as contextual refinement: the specification reproduces the implementation’s client-observable behaviors under any (valid) context.

It is based on PSC model proposed in [[Taming x86-TSO persistency]], and should be compositional (claim to be the first approach for formal compositional reasoning on [[Non-Volatile Memory|NVM]])

**crash-resilient data structure/concurrent objects**: also called persistent objects.

## Three Challenges

### Specification 

#### Existing Approach (based on sequential specification)

For a [[concurrent object]], a popular approach is to give specification in terms of sequential objects, under the assumption of [[Linearizability]]. (Now a client only needs to reason about its sequential specification)

To adapt [[Linearizability]] definition to persistent objects, there are more than one approach:

- strict linearizability
- persistent atomicity
- durable linearizability  -> [[The Path to Durable Linearizability]]
- buffered durable linearizability

(TODO see potential papers on them)

They differ on how to relate a crash-resilient library to its sequential specification. Some specification like buffered durable linearizability  is not compositional (combination of two such libraries might not be correct)

#### Alternative (code as specification)

Take the specification of a library L to be another library L# (with simpler implementation). 

![[Pasted image 20240804170440.png]]

This approach is :

- layered, one or more intermediate implementation can exist between L and L#
- simpler since specification  and implementation are unified. 

##### Example of mine

For [[concurrent object]], if the original implementation is 

```
def increment():
	FAA(x, 1)
```

With `atomic block` introduced in the language, the abstraction could be: 

```
def increment():
	atomic_begin
	x = x + 1;
	atomic_end
```

For client, it just reasons about the latter with atomic blocks (the same language). If it is specification based on sequential specification, client needs to reason about history. 

In this paper, the authors propose `persistence block` in the specification/implementation language. It is similar to persistent transaction in PMDK, but does not ensure isolation when executed concurrently.

### Abstraction Theorem 

Interaction between client  and library is defined by the notion of history (basically method invocation and return). 

Library correctness condition requires histories produced by L are also produced by L#, under the **most general client**.

Abstraction Theorem states if library correctness condition holds, then L refines L# for **any** client.

#### challenge

> A challenge stems from the fact that certain explicit persist instructions (sfence and other instructions whose implementation in the hardware contains an implicit store fence, such as RMWs in x86), which can be executed by the library, impose conditions on the persistence of writes performed by the client that ran earlier on the same processor. 

Two ways to address the problem:

1. Use localized version of fences. Each component can only mention fences for location it owns.
2. Add fences to histories. In this case, correctness condition also requires L performs a fence whenever L# does.

### Calling Policies

> When the client uses the library in a way that violates the calling policy, the library developer ensures nothing, and the blame is assigned to the client.

The paper proves that in order to establish policy adherence of P[L], we only need to establish adherence of P[L#] (though it sounds circular.)

> It is akin to DRF (data-race freedom) guarantees in weak memory concurrency, where often programs are guaranteed to have strong semantics (usually, sequential consistency) provided that certain race-freedom conditions hold in all runs under the strong semantics.