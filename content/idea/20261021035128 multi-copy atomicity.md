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

A [[memory consistency model|memory model]] is multi-copy atomic (MCA) if store values propagate atomically: as soon as the value becomes visible to another processor, no future load can access an earlier value. CPU's can't disagree on the order of stores issued by different CPUs to different addresses

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

MCA per this kind of definition is also referred to as *other-multi-copy-atomicity*  

## Test

The IRIW litmus test:

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

- [[Total Store Order|TSO]]
- ARMv8
- RISCV

## Models that are not

- PTX
- IBM Power
  
## Related

- 