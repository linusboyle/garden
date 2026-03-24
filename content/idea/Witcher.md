---
title: Witcher
date: 2023-03-05
tags: 
aliases:
---

# Witcher

SOSP'21

Witcher is a testing tool for [[Non-Volatile Memory]] programs. It does not need user annotation.

1. To detect correctness bugs, Witcher automatically infers **likely correctness conditions** by analyzing *data and control dependencies* between NVM accesses (via a mixed static/dynamic analysis) ![[Pasted image 20230305183050.png]] ![[Pasted image 20230305183235.png]]
	**Note** : these rules are not accurate, they are just heuristics.
2. Then Witcher validates if any violation of them is a true crash consistency bug by checking output equivalence between executions with and without a crash (more precisely, it checks durable linearizability by validating if the output with violation is equivalent to either of the outputs without it).

*Implementation* : like [[Jaaru]] using an [[LLVM]] pass to instrument memory operations, fences, flushes etc. Simulate the effect of these operations and before each flush operation, check if any pre-generated likely correctness conditions are violated. If so, check if the current PM state (NVM image) is equivalent to either of the two states obtained from durable linearizability. 

## Related

- [[Crash Consistency]]