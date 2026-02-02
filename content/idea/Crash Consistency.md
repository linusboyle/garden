---
title: Crash Consistency
date: 2023-03-05
tags:
aliases:
  - 崩溃一致性
  - Crash Safety
---

# Crash Consistency

[[Crash Consistency]] is an important property for systems with durable storage. It says:

After a crash, the application could recover to a consistent state from the persistent storage (e.g. durable disk, or non-volatile memory). 

Also called crash-safety. It is clearly a form of [[safety property]]. 

Crash consistency might be violated due to: 

- *Ordering* : Missing fence or flush leading to undesired persistence order, corrupting the persistent data. This does not happen for  a [[Strict Persistency]] setting, where persistence order follows visibility order. 

![A linked list insertion example](Crash%20Consistency-20260202144436928.webp)

- *Atomicity* : If crash interrupts operations that ought to be atomic, data might be corrupted if not recovered correctly. 


Obviously, crash consistency bug is possible whether the program is sequential or concurrent. Concurrency adds to the difficulty, esp. [[memory consistency model|weak memory model]].

## Detecting Crash Consistency Bugs

Generally, determining crash consistency bugs requires ==application specific knowledge to understand what states are considered *consistent*.==

### Criteria

1. User Annotation. For example, [[PMTest]] and [[PMDebugger]] rely on programmers to explicitly annotate ordering constraints e.g. `x=1` persists before `y=1`. [[XFDetector]] requires ordering constraints are specified as well.
2. Automated Detection
	1. Utilize observable faults for bug detection. [[Jaaru]], [[Witcher]]  and various other tools use this method. They only detect ordering bugs when the program crashes or assertion fails. (The issue is that not all bugs cause such visible symptoms, i.e. some corruption is silent.)
	2. [[Robustness (PM)]] checking. ~~Robustness is a sufficient yet not necessary condition for [[Crash Consistency]].~~ Actually, robustness +  memory consistency is. [[Robustness (PM)|Robustness]] alone only tells behavioural equivalence to [[Strict Persistency]]


### Existing methods 

**Testing**

- [[Witcher]] 

**Dynamic Model Checking**

- [[Jaaru]]
- [[Yasheme]] for [[persistency race]]/atomicity violation detection

**Logics**

- Crash Hoare Logic (for sequential file system)
- Perennial (for concurrent file system, no WMM behaviour)
- Spirea (for [[Non-Volatile Memory|NVM]])

## Related

- [[Non-Volatile Memory]]