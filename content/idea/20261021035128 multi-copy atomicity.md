---
title: multi-copy atomicity
date: 2026-10-21
tags:
  - idea
  - zettelkasten
aliases:
  - multi-copy atomicity
  - MCA
  - other-multi-copy-atomicity
---

A [[memory consistency model|memory model]] is multi-copy atomic (MCA) if store values propagate atomically: as soon as the value becomes visible to another processor, no future load can access an earlier value. CPU's can't disagree on the order of stores issued by different CPUs to different addresses.

In a MCA model, a load is globally ordered after the store it reads from (i.e. it cannot read *early* before the store is globally visible). 

From Arm A7.1.1 AXI/ACE Specification:

> A system is defined as being multi-copy atomic if:
> - Writes to the same location are observed in the same order by all agents.
> - **A write to a location that is observable by an agent, is observable by all agents**.
>
> [Multi-copy Atomicity and Barriers](https://support.arm.com/documentation/ka002179/1-0/)  

From a related RISCV issue:

> Common terminology (before ARMv8 came along with its new-ish term) was along the following lines:
> 
> - Single-copy atomic: a store becomes visible to all processors at the same time (e.g. SC).  
> - Multi-copy atomic: **a store becomes visible to the issuing processor before becoming visible simultaneously to all other processors** (e.g. in , TSO, and Alpha).  
> - Non-atomic (or non-multi-copy-atomic): a store becomes visible to different processors at different times (e.g. POWER).
>
> [Multi-copy atomic vs other-multi-copy atomic · Issue #1205 · riscv/riscv-isa-manual](https://github.com/riscv/riscv-isa-manual/issues/1205)

MCA per this kind of definition is also referred to as *other-multi-copy-atomicity*  

Per [Linux Kernel Doc](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/Documentation/memory-barriers.txt#n1370):

```
Multicopy atomicity is a deeply intuitive notion about ordering that is
not always provided by real computer systems, namely that a given store
becomes visible at the same time to all CPUs, or, alternatively, that all
CPUs agree on the order in which all stores become visible.  However,
support of full multicopy atomicity would rule out valuable hardware
optimizations, so a weaker form called ``other multicopy atomicity''
instead guarantees only that a given store becomes visible at the same
time to all -other- CPUs.  The remainder of this document discusses this
weaker form, but for brevity will call it simply ``multicopy atomicity''.
```

Also see [Will two atomic writes to different locations in different threads always be seen in the same order by other threads? - Stack Overflow](https://stackoverflow.com/questions/27807118/will-two-atomic-writes-to-different-locations-in-different-threads-always-be-see?noredirect=1&lq=1)  
  
> A core can still observe its own stores early, via store-forwarding.  
> It's normal to shorten "other multicopy atomic" to just "multicopy atomic", but formally, without the "other", "multicopy atomic" would forbid store-forwarding so _all_ cores including the storing core observe the total order of all stores. This would be a performance disaster so the only kind of multicopy-atomic you see in real life is other-multicopy-atomic.

Note that MCA is a property of [[memory consistency model|memory model]], so simply providing [[cache coherence]] does not entail MCA (e.g. Power). So, [[coherence memory model|COH]] (per-location SC) itself is not sufficient for MCA (it does not specify the global order).

## Test

The IRIW (Independent Readers, Independent Writers) litmus test:

```
int a=0
int b=0

thread1:
   a=1

thread2
   b=1

thread3:
   r1=a
   [LoadLoad]
   r2=b

thread4:
   r3=b
   [LoadLoad]
   r4=a
```

A MCA model forbids the behavior r1=1, r2=0, r3=1, r4=0.

## Models that are MCA

- [[Sequential Consistency|SC]]
- [[Total Store Order|TSO]]
- ARMv8
- RISCV

注意，MCA要求存在写事件的惟一全局顺序，但不要求这个顺序必定和[[program order]]一致（TSO有这样的要求，但是ARMv8并没有）

## Models that are not

- PTX
- IBM Power
- ARMv7
- Alpha
- C11

## Related

- [[cache coherence]]
- [[Classification of memory consistency model]]