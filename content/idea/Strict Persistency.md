---
title: Strict Persistency
date: 2023-03-07
tags: 
aliases:
---

# Strict Persistency

In strict persistency model, the order stores are persisted is the same as the order they became visible to all cpus. Therefore, whenever a crash happens, the non-volatile state is consistent w.r.t. the [[memory consistency model]]. 

Strict persistency alone does not guarantee [[Crash Consistency]], as it only prevents reordering.

## Implementation

A naive way of implementing strict persistency on weak persistency model is to insert a **flush** operation ~~after every store~~ after every memory access. However, this will introduce redundant flushes.

Only inserting flushes after stores are not sufficient when there are multiple threads. See the example below from [[PSan]] paper.

> 
>  ![[Pasted image 20230308165426.png]]

## Related

- [[Crash Consistency]]
- [[Non-Volatile Memory|NVM]]
- [[Robustness (PM)|Robustness]]