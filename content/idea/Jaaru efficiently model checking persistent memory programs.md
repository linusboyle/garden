---
title: Jaaru efficiently model checking persistent memory programs
date: 2022-10-10
tags: 
aliases:
---

# Jaaru efficiently model checking persistent memory programs

[[Jaaru]]

# 注释

(2022/10/10 下午2:27:08)

“There is a line of recent work on testing/dynamically checking a PM program to find consistency-related bugs.” ([Gorjiara 等。, 2021, p. 415](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=1&annotation=CQEK5TM3))

“PMTest only executes the pre-failure portion of the program and thus does not test failure recovery, which may also contain bugs.” ([Gorjiara 等。, 2021, p. 415](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=1&annotation=SL98A2KL)) bug in failure recovery is a concern too...

“It does not require any user annotation; as a model checker, Jaaru exhaustively explores all possible states” ([Gorjiara 等。, 2021, p. 416](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=2&annotation=IXEH5PQD))

“Leveraging these constraints in partial order reduction [15, 56] enables Jaaru to explore exactly one post-failure state for each equivalence class of post-failure executions, defined by which pre-failure stores are read by post-failure loads” ([Gorjiara 等。, 2021, p. 416](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=2&annotation=W4QZZVLC)) the idea seems similar to DPTSO

“azily enumerating the stores read by the actual loads in the post-failure execution, as opposed to eagerly enumerating all of them” ([Gorjiara 等。, 2021, p. 416](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=2&annotation=E6V4VQFJ))

“it reports all bugs w.r.t. an input and any bug it reports must be a real bug” ([Gorjiara 等。, 2021, p. 416](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=2&annotation=9TUS3ZS7))

“Jaaru still needs to execute a program many times (e.g., between 24 and 891 in our experiments) to fully explore the state space” ([Gorjiara 等。, 2021, p. 416](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=2&annotation=7XHZW2LB))

“As such, the best use case for Jaaru is to exhaustively check widely-used libraries such as PMDK, finding as many potential bugs as possible before their release,” ([Gorjiara 等。, 2021, p. 417](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=3&annotation=3FMJ5SJQ))

([Gorjiara 等。, 2021, p. 417](zotero://select/library/items/724VPURN)) it seems Jaaru requires a deterministic input, and search the state space from this input. it should operates at ISA level (?)

([Gorjiara 等。, 2021, p. 418](zotero://select/library/items/724VPURN)) a problem though: in reality, even if we know the point of crash, it's still possible that the flush is not performed yet. thus observing x=0 y=0.

“the persistent storage may have the values 2, 4, and 6 for the variable x.” ([Gorjiara 等。, 2021, p. 418](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=4&annotation=QYQKMI95))

“Commit stores are a rather common programming practice; in fact, all programs in our evaluation have such commit store” ([Gorjiara 等。, 2021, p. 418](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=4&annotation=6LU8WRPJ))

“aaru implements a software simulation of those instructions with full support for the persistency semantics from the Px86sim model” ([Gorjiara 等。, 2021, p. 420](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=6&annotation=B6YP59WX))

“Otherwise, Line 6 invokes the ReadPreFailure function to compute potential stores from the executions before the most recent failure.” ([Gorjiara 等。, 2021, p. 421](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=7&annotation=MF8BFLK2))

“The natural points to inject failures are those immediately before operations that flush cache lines. The reason is that writes to the cache increase the set of possible post-failure executions while flushes decrease the set of possible post-failure executions.” ([Gorjiara 等。, 2021, p. 422](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=8&annotation=MSE2449N))

“Jaaru can also support injecting failures into a post-failure execution (with a command line option). This option controls the maximum depth of the exec stack.” ([Gorjiara 等。, 2021, p. 422](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=8&annotation=5Z6J84D8)) 所以Jaaru实际上也不是穷举所有状态，对crash的次数有限制

“Many PM programs are multi-threaded, creating the opportunity for concurrency bugs. Jaaru does not exhaustively explore all concurrent schedules and thus does not provide any guarantees that it will find concurrency bugs. However, since Jaaru controls the concurrent schedule and fully simulates the TSO memory model, as future work, it can be used to fuzz for concurrency bugs.” ([Gorjiara 等。, 2021, p. 423](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=9&annotation=HTZR94C3)) 这里的意思大概是说Jaaru并没有特别关注并发+PM的场景？

“The inputs are examples that come with these benchmark suites.” ([Gorjiara 等。, 2021, p. 423](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=9&annotation=H6KQMEFE))

“Bugs that Jaaru can identify must have some visible manifestation Ð either a crash, e.g., segmentation fault, or an assertion failure in the program” ([Gorjiara 等。, 2021, p. 423](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=9&annotation=SE3SUPVZ))

“the symptoms of the bug, e.g., an assertion failure or illegal memory access.” ([Gorjiara 等。, 2021, p. 423](zotero://select/library/items/724VPURN)) ([pdf](zotero://open-pdf/library/items/SIKQER3Y?page=9&annotation=UEYS3TZH))