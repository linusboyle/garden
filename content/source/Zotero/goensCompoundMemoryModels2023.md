---
title: 'Compound Memory Models'
year: 2023
date: 2026-10-23
citekey: "@goensCompoundMemoryModels2023"
itemType: journalArticle
authors: Andrés Goens, Soham Chakraborty, Susmit Sarkar, Sukarn Agarwal, Nicolai Oswald, Vijay Nagarajan
journal: Proceedings of the ACM on Programming Languages
volume: 7
issue: PLDI
pages: 1145-1168
doi: 10.1145/3591267
tags: 
- Zotero
- imported
aliases:
  - "goensCompoundMemoryModels2023"
  - 'Compound Memory Models'
---

## [Compound Memory Models](zotero://select/library/items/MFFAXH7K)

Read

> [!Cite]
> Andrés Goens, Soham Chakraborty, Susmit Sarkar, Sukarn Agarwal, Nicolai Oswald, and Vijay Nagarajan. 2023. Compound Memory Models. _Proc. ACM Program. Lang._ 7, PLDI (June 2023), 1145–1168. [https://doi.org/10.1145/3591267](https://doi.org/10.1145/3591267)


> [!Abstract]
> Today's mobile, desktop, and server processors are heterogeneous, consisting not only of CPUs but also GPUs and other accelerators. Such heterogeneous processors are starting to expose a shared memory interface across these devices.Given that each of these individual devices typically supports a distinct instruction set architecture and a distinct memory consistency model, it is not clear what the memory consistency model of the heterogeneous machine should be. In this paper, we answer this question by formalizing "compound" memory models: we present a compositional operational model describing the resulting model when devices with distinct consistency models are fused together. We instantiate our model with the compound x86TSO/PTX model -- a CPU enforcing x86TSO and a GPU enforcing the PTX model. A key result is that the x86TSO/PTX compound model retains compiler mappings from the language-based (scoped) C memory model. This means that threads mapped to the x86TSO device can continue to use the already proven C-to-x86TSO compiler mapping, and the same for PTX.



### Attachments

- [Full Text PDF](zotero://select/library/items/LU2752FJ)



### Collections

  - [E 按会议分类/PLDI2023](zotero://select/library/collections/5F5GN2QD)

  - [A 计算机科学/5 形式化方法/Concurrency/内存模型 & 语义](zotero://select/library/collections/TLVNYWEK)

  - [A 计算机科学/1 系统结构/CXL/DSM投稿](zotero://select/library/collections/3XJTK7U5)

  - [A 计算机科学/5 形式化方法/PhD Thesis](zotero://select/library/collections/34ZIUTNK)




### Annotations


 > In this paper, we answer this question by formalizing “compound memory models”: we present a compositional operational model describing the resulting model when devices with distinct consistency models are fused together.  

 



 > This is the age of heterogeneity  

 



 > harming either performance with too strong a model or, worse, correctness if the joint model is too weak  

 



 > A memory consistency model of the compound machine is necessary to be able to program it using shared-memory paradigms  

 



 > informally speaking, threads from each device continue to adhere to the memory ordering rules of that device’s original memory model.  

 



 > This compositionality property – with the fact that threads mapped to each device retain the memory ordering rules of their original model – is important for programmability  

 



 > programmers can program each device assuming the memory ordering rules of the device, irrespective of the other devices in the system  

 



 > This would also mean that programs compiled for each device would continue to work correctly even when the device is fused with other devices.  

 



 > In single-copy atomic (SCA) memory models, a load returns a value written by a single store and not a mishmash of values from two or more stores  

 



 > Almost all memory models are SCA and in this work we restrict our attention to SCA memory models  

 



 > In multi-copy-atomic memory models (MCA) [McKenney 2017; Nagarajan et al. 2020]5, store values propagate atomically: as soon as the value becomes visible to another processor, no future load (in logical time) can access an earlier value.  

 



 > We do not handle RMWs in our general operational model and leave this for future work  

 



 > imilarly, we currently do not model mixed-size concurrency  

 



 > GPUs and heterogeneous memory models expose the hierarchical nature of the architecture through a thread hierarchy known as scopes  

 



 > The cooperative thread array (CTA)  

 



 > scope, for example, refers to the set of threads that share the same GPU streaming multiprocessor (SM);  

 



 > These threads share the same L1 cache. The GPU scope refers to the set of threads that belong to a GPU and hence share a cache level, L2 for example. The system scope refers to the set of threads that span the whole heterogeneous system.  

 



 > In this paper, we propose for the first time a generalized operational model with which we can specify and combine scoped, MCA and non-MCA memory models. We also design an axiomatic model as a proof tool to prove correctness of compiler mappings from language-level models.  

 



 > As part of supporting a memory consistency model, processors typically implement a coherence protocol that, informally speaking, makes writes and reads visible to all of the processors.  

 



 > GPU protocols directly enforce relaxed consistency models without SWMR by eschewing writer-initiated invalidations, and instead rely on writebacks and self-invalidations.  

 



 > Clearly, it is desirable for that code to work correctly in the fused machine as well. Otherwise, legacy code written for M1 will have to be rewritten or recompiled every time M1 is fused with another machine.  

 



 > We want every memory operation from a device with memory model M to continue to behave as specified by M, even when that device is fused with other devices of different memory models  

 



 > It is clear how we can tell whether the compound memory model is weak enough: the behavior of a program that runs entirely on one of the individual machines is precisely the same as if running on that machine in isolation.  

 



 > We want to come up with a general semantics for compound memory models that retains these mappings: a compiler that generates code for the compound machine should be able to simply use the pre-existing mappings.  

 



 > propagates reads and writes to the other threads in an order that satisfies the memory model constraints  

 



 > Our key insight is that these can all be modeled operationally in a compositional manner using a principle we call LOST: Local Orderings by Stalling on Threads  

 



 > all of the memory-model-specific actions are in the form of thread-local operations and stalls. This allows us to instantiate different memory models by simply configuring their respective thread subsystems, leading to a memory model that is naturally compositional.  

 



 > it is necessary that the order relations in each memory model are preserved in threads across all machines in the system.  

 



 > To enforce this, the threads need to know whether their operations (or other operations they have seen) have been globally executed, i.e. seen by all threads in the system. Importantly, while this information is not local to the thread, it is architecture-independent.  

 



 


意思是不用等到写操作传播到所有线程？ 
 



 > When a non-MCA read is satisfied, we still remember the write (from which the read returns) as a “predecessor” of the reading thread, so that when an MCA fence is encountered, that fence stalls until each of the predecessors accumulated thus far has been globally propagated.  

 



 > associating a scope with every order constraint: operations only stall until certain preceding operations are visible at a given scope.  

 



 > y treating every non-scoped order constraint coming from a non-scoped memory model as system scoped (i.e., global scope).  

 



 > Scopes refer to a thread hierarchy where each scope refers to a set of threads.  

 



 > all of this can be modeled without violating LOST as long as threads “know” for each operation the set of threads that operation has propagated to.  

 



 > the general state and transitions behind LOST-POP, which are the memory-model-agnostic components  

 



 > The key insight of POP is modeling the propagation of each memory request individually to the different threads in the system. When a request propagates to a thread, it defines a partial order with memory requests in that thread. This partial order constraints the future propagation of requests to other threads.  

 



 > LOST-POP has no explicit model of memory (just like POP). When a write propagates to all threads, it has effectively been “written to memory”.  

 



 > Intuitively, the idea is that a read gets its value from a subset of the memory subsystem, which corresponds to the threads it has propagated to. The behavior of the model is, in essence, defined by thread-local constraints on propagation, implementing the LOST principle.  

 



 > We have a set of order constraints, a binary relation on requests labeled with a scope. We write r → r ′ to say that there is an order constraint from (r, r ′).  

 



 > Order constraints are updated according to so-called order rules, which say for a given r, r ′ whether to add the constraint r → r ′.  

 



 > If other requests have already been accepted to that thread, we order them before the incoming request  

 



 


accept指的是issue，这里考虑的也是po 
 



 > A request r can propagate to any thread t it has not propagated to (in arbitrary order), on one condition: no previous (according to the order constraints) request r ′ can be stalling it. If request r ′ originates from a different thread and there is an order constraint r ′ → r , then r ′ has to propagated to t before r .  

 



 > the incoming request gets ordered to be before the others  

 



 > Concretely, for every request r ′ in thread t that is not already ordered with r , we add an order constraint r, r ′ iff r ′ is a memory request to the same address and they are not both reads.  

 



 > Such edges correspond roughly to the axiomatic notions of co (or ws), rf and fr edges. Note that these edges can go either way, depending on which request (non-deterministically) propagates first.  

 



 > Read requests are satisfied by writes to the same address. In order to respond to a read request r with write w, they both have to have propagated to the exact same set of threads.  

 



 > To model this, we consider all requests w ′ between r and w, i.e., such that w → w ′ and w ′ → r . We require w ′ to be to a different address than r if it is a memory request  

 



 > After being responded to, we mark a read request as removed and ignore its order constraints.  

 



 > They arise from the combination of propagating to threads individually and the fact that we remove reads.  

 



 > ences are thread-local in our model: they do not propagate; they enforce orderings only by stalling.  

 



 > pred refers to predecessor writes from other threads which is used for modeling cumulative fences  

 



 > An edge r −s→ r ′ only enforces the ordering of r before r ′ within the scope s.  

 



 > Note that the new edges between requests of different threads are not scoped, since these do not represent architecture-specific constraints but rather observations. In this context, not scoped means their scope is the entire system.  

 



 > a compound LOST-POP model is simply a LOST-POP model where different threads have different architectures.  

 



 > Release and acquire are incomparable, but both are stronger than relaxed and weaker than acquire-release (RA), the rest are totally-ordered.  

 





### Related Items

