---
title: Classification of memory consistency model
date: 2026-02-05
tags: 
aliases:
---

## Classification of memory consistency model 

**Load Buffering** (reordering of load and a subsequent store to different locations)

```
a = x // 1 | b = y // 1
y = 1      | x = 1
```

If load buffering is not allowed in a memory model, it is called **porf-acyclic model**, which includes:

- [[Sequential Consistency]] 
- [[Total Store Order]] 
- PSO
- RC11

Models that allow load buffering usually (?) disallow such reordering which leads to **out-of-thin-air** behaviours:

```
a = x // 1          | b = y // 1
if a = 1 then y = 1 | if b = 1 then x = 1
```

To rule out these behaviours, dependency-tracking models keep track of dependencies between instructions and restrict the reorderings. These models include:

- POWER
- ARMv7
- ARMv8
- RISC-V
- IMM (intermediate memory model)
- LKMM (Linux kernel memory model)

Other models, such as Promising and Weakestmo, consider multiple program executions to justify the outcomes of a single execution.

### well-prefixedness

In an execution, apart from [[program order]] and read from order, there are also *address, data, and control* dependency order. A prefix of an event e is an event e' in the same thread that: $(e', e) \in (rf \cup addr \cup data \cup ctrl)^{+}$.

A model is well-prefixed if no consistent execution contains an event that is its own prefix. All porf-acyclic models (note that all dependency orders are subset of [[program order]]) and dependency-tracking models are well-prefixed 

The original C11 model does not. It allows out-of-thin-air behaviour.

## Related

- [[HMC Model checking for hardware memory models|HMC]]