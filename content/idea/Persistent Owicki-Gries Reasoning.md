---
title: Persistent Owicki-Gries Reasoning
date: 2024-11-23
NoteIcon: paper
tags:
  - reference
  - paper
see also:
  - "[[索引]]"
  - "[[2024-11-23]]"
  - "[[Non-Volatile Memory|NVM]]"
author: 
published at: OOPSLA2020
zotero url: 
aliases:
  - POG
---

[[2026-01-28]]:

POG假设[[failure model]]是Full System的，因此要求进行恢复时，恢复例程不会和其他过程并发。

>“Lastly, the RG contexts ⟨⊤; ⊤⟩ ensure that C and Crec are run as closed programs (i.e. not in parallel with another program).” (Raad 等, 2020, p. 1523)

Comments from [[2024-09-22]]:

个人觉得这套方法比较繁琐。 不变式I很难找，且需要用到实际中不存在的synchronous变量。
另外，POPL21的一篇论文([[Taming x86-TSO persistency]])证明了将flush视为同步与将其视为异步所能到达的状态集合是一样的，所以这里引入synchronous变量有可能是冗余的。

---

There is a verification gap for [[Non-Volatile Memory|Persistent Memory]], quote:

> there has been little work on verifying such artifacts. To our knowledge, the existing work [Friedman et al. 2018; Nawab et al. 2017; Raad and Vafeiadis 2018; Raad et al. 2020, 2019; Zuriel et al. 2019] offer low-level proofs about the correctness of small persistent algorithms and often make simplifying assumptions. In particular, they all work at the level of traces rather than at the level of program syntax, while [Friedman et al. 2018; Nawab et al. 2017; Zuriel et al. 2019] further assume sequential consistency as their concurrency model.

Verification is important:

> Moreover, such persistent implementations are virtually impossible to test and debug, as one would have to use custom hardware to simulate crashes and check correct recovery from them.

This paper develops *Persistent Owicki-Gries* (POG), the first program logic for reasoning about Intel-x86 [[Non-Volatile Memory|NVM]] programs. 

**Challenges (and contribution) **

- Since the original OG proof system is for [[Sequential Consistency]], POG is built on OGRA for [[release-acquire memory model]]. 
- To dealt with weak persistency behaviour, a new intermediate operational model of Intel-x86 persistency is developed (Ix86-sim). It does not have the persistent buffer.  
- To handle flushopt instructions, the authors only consider the stronger flush instruction, and propose a transformation that rewrites program with flushopt to equivalent program with only flush.  

> “Although program logics are typically built over operational models that manipulate the underlying state, such operational models often operate on states that comprise the memory alone, without intermediate caches such as those of thread-local and persistent buffers in Px86sim” (Raad et al., 2020, p. 1516)

'Cause a lot of these logics are designed for [[Sequential Consistency|SC]]. Some works show how to reason about weak behavior introduced by e.g. store buffer. But no work supports persistency yet.

## Intermediate Model Ix86-sim

> To remedy this, **for each location x we record two versions**: (1) the ‘volatile’ version, written xv, tracking the latest observable value of x ; and (2) the ‘synchronously-persisted’ (‘synchronous’) version, written xs, tracking the latest persisted value of x *provided that flush instructions are executed synchronously*. Memory instructions (e.g. writes) are then carried out on volatile versions, leaving the synchronous versions untouched. Moreover, the volatile versions may non-deterministically propagate to the corresponding synchronous versions, modelling the notion that writes may be committed to memory at non-deterministic times.

Naturally, in this model, executing `flush x` copies xs to xv.

**How to model asynchronous behaviour of flush?**

> To address this, for each location x we record a third, persisted version, written xp, denoting the latest persisted value of x (without assuming flush instructions are executed synchronously).

Intuitively, the effect of asynchronous flush might non-deterministically propagate to xp (from xs). But this is not accurate, because a `flush x` orders any stores to `x` before any store after, so any propagation of store (e.g. from ys to yp) entails that any `flush` instructions  before this store have take effects. SO...

> To remedy this, we require that the non-deterministic copying of synchronous values to persisted ones be carried out for all locations at once, and not a single location

![[Pasted image 20241123170524.png]]

 感觉没什么问题，就是像上面a-d这样显式写出所有状态可能的表达式很困难?

## POG

OG reasoning extends Hoare Logic with rule to reason about concurrent programs $c_1 || c_2$:

![[Pasted image 20241123171441.png]]

The non-interference requirement hinders compositionality, but presenting OG in the **rely-guarantee** style allows compositional reasoning.  Each Hoare triple is interpreted under a RG context (R, G)

> “The rely component, R, comprises a set of assertions assumed to be stable under memory updates carried out by the environment (i.e. other threads). The guarantee component, G, in turn comprises a set of guarded updates that the thread may perform. A guarded update is of the form ⟨x, e, 𝑃⟩, stating that when the program state satisfies the guard 𝑃, then the thread may update x to e.” (Raad et al., 2020, p. 1519)


### Invariant

To maintain compositionality (the triple {P} C {Q} does not guarantee Q is for state on completion) and mitigate the difficulty brought by non-deterministic crash, invariant is introduced as specification,

> “we typically define an invariant, 𝐼 , that holds at all program points, and could simply be defined as the disjunction of all states. Intuitively, 𝐼 corresponds to the persistency behaviour we seek to establish” (Raad et al., 2020, p. 1519

On larger context, a triple could be regarded as {I} C {I}

这篇文章里，验证目标是证明在任意程序位置，某个不变式I都成立，因此在证明的每一步中（每个三元组）都会有这个I。证明大概如下图所示（省略RG context）

![[Pasted image 20241124110204.png]]

> The POG triples are of the form: ⟨R; G⟩ ⊢ {P } C {Q }, stating that: (1) **the persistent parts of Q (describing persistent versions of variables, e.g. xp) are invariant** throughout the execution of C; (2) every terminating run of C from a state in P results in a state in Q; (3) C updates the state in accordance with G while satisfying the prescribed guards; and (4) the above holds when C is run in parallel with any program C′, provided that the C′ updates preserve the assertions in R. That is, while the persistent parts of Q hold at all points during the execution of C, those parts describing register values and volatile/synchronous versions hold only when C terminates successfully.

也就是说，不变式I描述和持久性相关的行为，并被包含在Q里。Q的其他部分是C正常终止时会成立的，但是在崩溃发生时则不一定。

### Stability 

POG requires that all assertions used in the proof are stable under propagation, either xv -> xs or xs -> xp, e.g. P => P[xv/xs]

~~这里好像写法有点问题~~没问题