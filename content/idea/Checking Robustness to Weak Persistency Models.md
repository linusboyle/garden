---
title: Checking Robustness to Weak Persistency Models
date: 2025-01-20
tags: 
aliases:
---

[[Robustness (PM)|Robustness]]

# 注释  
(2023/3/8 下午4:50:52)

“Researchers have taken two primary approaches to improve PM reliability. First, there is a body of work on developing high-level abstractions” ([Gorjiara 等, 2022, p. 490](zotero://select/library/items/ISTBB2AA)) ([pdf](zotero://open-pdf/library/items/D866IGHV?page=1&annotation=E6447ZNE))

“Our key observation is that the typical correct usage of flush instructions in PM programs ensures that program executions under weak persistency semantics are equivalent to those under strict persistency semantics. Building on this observation, we define a new notion of correctness, robustness” ([Gorjiara 等, 2022, p. 491](zotero://select/library/items/ISTBB2AA)) ([pdf](zotero://open-pdf/library/items/D866IGHV?page=2&annotation=2H9IBC4E))

“Robustness is a sufficient criterion to assure correct usage of flush and drain operationsÐadding more flush and drain operations to a robust program will not alter the set of possible post-crash executions.” ([Gorjiara 等, 2022, p. 491](zotero://select/library/items/ISTBB2AA)) ([pdf](zotero://open-pdf/library/items/D866IGHV?page=2&annotation=LLZU7I28))

([Gorjiara 等, 2022, p. 491](zotero://select/library/items/ISTBB2AA)) We need to be careful on this as well: only consider stores that are actually read by a post-crash read.  
This should be doable with the guard condition on read events.

([Gorjiara 等, 2022, p. 491](zotero://select/library/items/ISTBB2AA)) Here the authors assume in strict persistency stores are persisted immediately. This is not a problem since the persistency order is the same as the volatile order. We could always change the point a crash happens to ensure this.

“In the context of weak memory models, a program is robust [7, 61, 76, 82] against a weak memory model if all of the program’s executions under the weak memory model are permitted under the sequential consistency model.” ([Gorjiara 等, 2022, p. 492](zotero://select/library/items/ISTBB2AA)) ([pdf](zotero://open-pdf/library/items/D866IGHV?page=3&annotation=9TANYRR4))

“Israelavitz et al. [50] introduce the notion of durable linearazibility to data-race-free programs to become crash consistent.” ([Gorjiara 等, 2022, p. 492](zotero://select/library/items/ISTBB2AA)) ([pdf](zotero://open-pdf/library/items/D866IGHV?page=3&annotation=7D3PP58Y)) Worth having a look later

“PSan can detect all persistency bugs due to ordering issues in that execution. Our definition of an ordering bug is a bug that result from stores being persisted in an order that is different from their happens-before order.” ([Gorjiara 等, 2022, p. 493](zotero://select/library/items/ISTBB2AA)) ([pdf](zotero://open-pdf/library/items/D866IGHV?page=4&annotation=QH5ZH8MI))

“Given a crash event and a post-crash execution, PSan computes a set of strictly persistent executions whose pre-crash executions are consistent with the post-crash execution. If this set becomes empty, i.e., such a strictly persistent execution does not exist, PSan finds a robustness violation” ([Gorjiara 等, 2022, p. 493](zotero://select/library/items/ISTBB2AA)) ([pdf](zotero://open-pdf/library/items/D866IGHV?page=4&annotation=CYDQ5QBR))

“by reasoning about the interval in which an equivalent strictly persistent pre-crash execution must have crashed using constraints” ([Gorjiara 等, 2022, p. 493](zotero://select/library/items/ISTBB2AA)) ([pdf](zotero://open-pdf/library/items/D866IGHV?page=4&annotation=7J5U5GC3))

“Under strict persistency, the recovery procedure observes the memory in an equivalent state as a separate processor would under the memory consistency model.” ([Gorjiara 等, 2022, p. 494](zotero://select/library/items/ISTBB2AA)) ([pdf](zotero://open-pdf/library/items/D866IGHV?page=5&annotation=MFCISVUP))

“Definition 2 requires that each portion of the execution in Exec up to some crash event (i.e., 𝐻𝑖 = 𝑒1𝐶1...𝐶𝑖−1𝑒𝑖 ) is equivalent to the multi-threaded prefix 𝐹𝑖 in that the last subexecution of 𝐹𝑖 has the same behavior as that of 𝐻𝑖 .” ([Gorjiara 等, 2022, p. 494](zotero://select/library/items/ISTBB2AA)) ([pdf](zotero://open-pdf/library/items/D866IGHV?page=5&annotation=VP4TGUBJ))

“The key observation is that a crash of a lock-free data structure under the strict persistency model is equivalent to a crash-free execution in which one set of threads runs the pre-crash execution and stop at their respective crash locations and then after those threads stop, the second set of threads runs the post-crash execution.” ([Gorjiara 等, 2022, p. 495](zotero://select/library/items/ISTBB2AA)) ([pdf](zotero://open-pdf/library/items/D866IGHV?page=6&annotation=9P5A2G4X))

“Lock-freedom guarantees progress for such execution, and thus robustness plus lock-freedom suffices to ensure crash consistency.” ([Gorjiara 等, 2022, p. 495](zotero://select/library/items/ISTBB2AA)) ([pdf](zotero://open-pdf/library/items/D866IGHV?page=6&annotation=HTKWF2ED))

“For persistency strategies other than lock-free programs, robustness can still be a useful tool for finding any potential flush/fence bugs even though robustness is not sufficient to guarantee crash consistency for such programs.” ([Gorjiara 等, 2022, p. 495](zotero://select/library/items/ISTBB2AA)) ([pdf](zotero://open-pdf/library/items/D866IGHV?page=6&annotation=IMNKTB3D))

“To solve this issue, each thread requires its own potential crash interval constraints, since each thread can make different progress when a program crashes.” ([Gorjiara 等, 2022, p. 497](zotero://select/library/items/ISTBB2AA)) ([pdf](zotero://open-pdf/library/items/D866IGHV?page=8&annotation=MNFGP6IA))

![[Pasted image 20230308165426.png]]

([pdf](zotero://open-pdf/library/items/D866IGHV?page=9&annotation=GMR9LYBU))  
([Gorjiara 等, 2022, p. 498](zotero://select/library/items/ISTBB2AA))