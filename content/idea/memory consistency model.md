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
---

## memory consistency model

**memory models**: the semantics of shared memory. WMM deals with ordering constraints, but is not just reordering.

Every hardware architecture has its own memory model. [[memory barrier (fence)]]  can be used to enforce ordering constraints.

[[Sequential Consistency]]  is the simpliest memory model.

### Operational semantics

The operational semantics can be given in small steps semantics. The system is composed of a *thread subsystem* and a *storage subsystem* (effectively [[变迁系统|LTS]]).

The thread subsystem interpret the sequential program in each thread. It might take internal steps, which does not use memory (such as operation on registers, so ), or take a step that requires memory access $P,S \rightarrow^{i:l} P', S'$. (The access or fences are represented as labels `l`)

The memory model defines how the storage subsystem works. It describes the effect of memory access and fences. It might take internal steps as well.

The whole system either takes internal step of either subsystem, or take steps with matching labels.

- [[SC operational semantics]] 
- [[TSO operational semantics]] 

![[Classification of memory consistency model]]