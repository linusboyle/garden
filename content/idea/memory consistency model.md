---
title: memory consistency model
created time: "[[2024-02-25]]"
tags:
  - idea
see also:
aliases:
  - WMM
  - weak memory model
  - 内存一致性模型
  - 内存模型
  - memory model
---

A memory consistency model, or, more simply, a memory model, is a specification of the allowed behavior of multithreaded programs executing with shared memory.

> “a memory consistency model MC gives rules that partition executions into those obeying MC (MC executions) and those disobeying MC (non-MC executions). This partitioning of executions, in turn, partitions implementations. An MC implementation is a system that permits only MC executions, while a non-MC implementation sometimes permits non-MC executions.” [[nagarajanPrimerMemoryConsistency2020|A Primer on Memory Consistency and Cache Coherence]]

--- 

Memory model deals with ordering constraints, but is not just reordering. See [[20260821024532 缓存一致性与内存模型的关系]]

Every hardware architecture has its own memory model. [[memory barrier]]  can be used to enforce ordering constraints.

[[Sequential Consistency]]  is the simpliest memory model, but no major architecture implement it.

### Operational Semantics

The operational semantics can be given in small steps semantics. Typically, the system is composed of a *thread subsystem* and a *storage subsystem* (effectively [[变迁系统|LTS]]).

The thread subsystem interpret the sequential program in each thread. It might take internal steps, which does not use memory (such as operation on registers), or take a step that requires memory access $P,S \rightarrow^{i:l} P', S'$. (The access or fences are represented as labels `l`)

The memory model defines how the storage subsystem works. It describes the effect of memory access and fences. It might take internal steps as well.

The whole system either takes internal step of either subsystem, or take steps with matching labels.

- [[SC operational semantics]] 
- [[TSO operational semantics]] 

---

![[Classification of memory consistency model]]