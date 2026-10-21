---
title: "Compound Memory Models"
date: "2026-10-21"
source: "https://www.sigarch.org/compound-memory-models/"
author:
  - "[[Vijay Nagarajan on Oct 20]]"
  - "[[2026]]"
description: "When components with distinct memory models share memory, what rules govern the interface between them? Many of today’s systems already have to answer this question. On NVIDIA’s Grace H…"
tags:
  - "clipped"
aliases:
---
When components with distinct memory models share memory, what rules govern the interface between them? Many of today’s systems already have to answer this question.

==On NVIDIA’s Grace Hopper, for example, an Arm CPU and a GPU share one coherent memory; the CPU follows Arm’s memory model and the GPU follows NVIDIA’s [PTX](https://dl.acm.org/doi/10.1145/3297858.3304043) model. IBM has announced a mainframe processor whose cores run both Arm and IBM Z code, two architectures with different memory models. And in software, user programs share memory directly with the Linux kernel through interfaces such as io\_uring, and the kernel follows its own memory model, [LKMM](https://dl.acm.org/doi/10.1145/3173162.3177156), which differs from C’s.==

The question has a precise answer, which we call the [Compound Memory Model](https://users.cs.utah.edu/~vijay/papers/pldi23.pdf). Leaving it unanswered has caused real failures in systems today.

## A quiz

Consider message passing (Figure 1). A producer writes data = 1 and then flag = 1. A consumer reads flag and then data. If the consumer sees flag (r1 = 1), must it see data (r2 = 1)?

![](https://www.sigarch.org/wp-content/uploads/2026/10/Picture1.png) *Figure 1. Message passing: (a) and (b) on Arm; (c) on x86-TSO; (d) on a heterogeneous machine with Arm /x86 cores.*

On Arm with plain loads and stores, *no*: Arm is a relaxed model and may reorder both pairs (Figure 1a). With a release store and an acquire load, *yes* (Figure 1b). On x86, *yes* even with plain accesses, because x86’s memory model, x86-TSO, keeps stores in order and loads in order (Figure 1c).

Now put Arm cores and x86 cores on one coherent memory (Figure 2). Should the machine’s memory model be x86-TSO (the stronger of the two), Arm (the weaker), or something else? What do you think?

*![](https://www.sigarch.org/wp-content/uploads/2026/10/Picture2.png)* *Figure 2. A heterogeneous machine: Arm cores and x86 cores sharing one coherent memory.*

When I ask this in talks, the room usually splits between the first two answers.

## Our answer

Let’s be more concrete. Run message passing across the two kinds of cores, with the producer on Arm using a release store and the consumer on x86 using plain loads (Figure 1d). Can r2 return 0?

Figure 1d is not contrived. ==It is what compilers naturally produce from a message-passing program written in C, with a release store and an acquire load. The Arm compiler turns the C release into an Arm release; the x86 compiler turns the C acquire into a plain load, because x86-TSO already orders the loads. We want each compiler to work independently, without coordinating with each other==. So the heterogeneous machine must honor what the C program guarantees: r2 = 1. Otherwise the compiled program would produce an outcome the source program forbids. That is the first requirement: ==the machine must be *strong enough* that each component’s existing compiler mappings remain correct.==

One way to honor this requirement is to declare that the whole machine is the stronger of the two models, x86-TSO. But this means that plain message passing between two Arm threads (Figure 1a) would have to guarantee r2 = 1, as x86-TSO does. This is impractical, as it would necessitate that the Arm cores be redesigned simply because they are fused with x86 cores. That gives the second requirement: ==the machine must be *weak enough* that each component keeps its own model.==

The compound memory model satisfies both requirements. Each thread obeys the ordering rules of its own model: Arm threads see Arm, and x86 threads see x86-TSO. The compound model is therefore neither x86-TSO nor Arm, but an amalgamation of the two. And in Figure 1d, the Arm release keeps the producer’s writes in order, and x86-TSO keeps the consumer’s reads in order, ensuring r2 reads 1.

When Dan Sorin, Mark Hill, David Wood and I wrote the [second edition of the Primer](https://link.springer.com/book/10.1007/978-3-031-01764-3) in 2020, we noted that the idea seemed intuitive but had not been formalized. ==[HeteroGen](https://users.cs.utah.edu/~vijay/papers/hpca22.pdf) gave the first formal definition in 2022, for CPU-style models such as x86-TSO and Arm, and [Compound Memory Models](https://users.cs.utah.edu/~vijay/papers/pldi23.pdf) extended it in 2023 to GPU models such as PTX==.

Other approaches choose one model for the whole machine. The [HSA](https://hsafoundation.com/standards/) platform specification requires every participating device to adhere to a scoped, data-race-free model such as [HRF](https://dl.acm.org/doi/10.1145/2541940.2541981), so each vendor must adopt it. [MemGlue](https://cs.stanford.edu/~trippel/pubs/rcleaveland_FMCAD24.pdf) similarly argues for making a C11 variant the machine-wide contract. ==Compound models instead compose the devices’ own models, so vendors don’t have to agree on a single model, and every language’s existing compiler mappings remain correct.==

## Isn’t coherence enough?

==A common belief is that connecting the devices with a coherent interconnect, such as [CXL](https://computeexpresslink.org/), would automatically make the heterogeneous machine behave correctly. It does not.== To see why, note that each device has its internal cache hierarchy and its own coherence protocol. A piece of glue logic, which we call a shim, connects each device’s protocol to the interconnect (Figure 3). The correctness of the machine hinges on this shim logic.

![](https://www.sigarch.org/wp-content/uploads/2026/10/Picture3.png). *Figure 3. Two devices, each with its own memory model and coherence protocol, connected to a coherent interconnect through shims.*

For example, suppose the GPU writes data and then flag, and the GPU-side shim lets the write to data complete without waiting for the invalidations it sent to reach the CPU. The CPU can then read the new flag, and still read the old data from its own cache.

==A simple rule for shims, which we call Synchronous Propagation, prevents this: when a device propagates a write locally, the shim also propagates it globally, and the global propagation is encapsulated within the local one. That is, the local propagation does not complete until the global propagation has.== This is cheaper than it sounds. GPUs already self-invalidate their L1 caches at synchronization points, so a CPU write needs to invalidate only the GPU’s last-level cache, not its many L1s. ==We [proved](https://users.cs.utah.edu/~vijay/papers/pldi26.pdf) that shims obeying this rule enforce the compound model, for any combination of conventional invalidation-based and GPU-style self-invalidating protocols over a global protocol like CXL. The proof is machine-checked in Lean.==

Other recent work targets compound memory models for CXL, deriving design rules for the shims ([C3](https://ieeexplore.ieee.org/document/11408469)) and synthesizing them automatically ([vCXLGen](https://dl.acm.org/doi/10.1145/3779212.3790245)).

## Do today’s machines enforce compound models?

A machine like Figure 2 exists. Apple’s M1 runs x86 programs by putting individual Arm threads into TSO mode, so Arm threads and TSO-mode threads can share one chip. We ran a version of Figure 1d on it. The consumer reads stale data, which the compound model forbids. (Arm-only and TSO-only litmus tests behave correctly.)

Apple confirmed that TSO mode is not meant for synchronizing with Arm threads. If the two modes need to synchronize in the future, a compound model will be necessary.

Grace Hopper, on the other hand, does enforce its compound model, as far as we can measure. Across 1,960 message-passing tests between CPU and GPU, [stale data appeared only where the Arm/PTX compound model allows it](https://users.cs.utah.edu/~vijay/papers/ismm26.pdf).

## Memory models designed in isolation

Today’s memory models are defined in isolation, each for a single processor, language or kernel. They are designed without composition in mind, and that causes problems even when each model, taken alone, appears correct.

Consider Grace Hopper. Its two compiler mappings, C++ to Arm and C++ to PTX, both come with correctness proofs. But they implement C++’s sequentially consistent atomics differently: PTX relies on a total order among fences, while Arm uses no fences at all. So when a chain of synchronization starts on the GPU and ends on the CPU, the CPU end contributes nothing to the order PTX relies on, and neither model says whether C++’s guarantee still holds.

While formalizing the Arm/PTX compound model, we also found that the official C++ to PTX mapping was itself unsound. Its proof was mechanically verified, but the flaw was in a preliminary step outside the mechanized part, and NVIDIA has confirmed it ([Beyond the Fence](https://users.cs.utah.edu/~vijay/papers/asplos27a.pdf)). Interestingly, designing for composition addressed this too. In 2023 we had [modeled PTX](https://users.cs.utah.edu/~vijay/papers/pldi23.pdf) so that it would compose with other models, and ==our model came out slightly stronger than NVIDIA’s. The extra strength needed for composition also fixes the flaw, and in our tests NVIDIA’s GPUs already provide it.==

The same holds in software. User programs and the Linux kernel now share memory directly, and they follow different memory models: user code follows C’s, and the kernel follows its own, LKMM. C orders accesses only where the programmer asks for it, through release-acquire pairs or sequentially consistent atomics. LKMM is subtly stronger: it also enforces orderings that the hardware already preserves. For instance, if code reads a pointer and then dereferences it, LKMM treats the two accesses as ordered, and C does not.

These subtle differences can bite at the shared interface. Linux’s kcov interface passes coverage data to user space: the kernel writes entries, then a count; user code reads the count, then the entries. The kernel had no barrier between its two writes, and user code read the count with a relaxed load, so users could see a new count with old entries. Intuitively this is a bug, but neither C’s model nor the kernel’s can even state what correct behavior is across the boundary. Our [C/LKMM compound model](https://users.cs.utah.edu/~vijay/papers/asplos27b.pdf) provides that specification, and the fixes on both sides are now upstream. Arriving at that model was hard, because neither C nor LKMM was designed with the other in mind.

## The path ahead

Compound models should be defined explicitly: for chips such as Grace Hopper that combine Arm and PTX, and for interfaces such as the one between user code and the kernel. And to make compound models easy to define, composition should be a first-class principle when a memory model is designed.

[Robin Milner](https://users.sussex.ac.uk/~mfb21/interviews/milner/), a Turing Award winner who developed a general theory of concurrency, was once asked whether the world of computation might simply not be compositional. He answered:

> *“Somebody will say to you: ‘of course it’s not compositional, look at the operating system’ and then you can say, OK, wait a minute, we have to make the operating system one of the participants, one of the agents in this population of agents that are interacting. … We must ask ourselves, how are they interacting?”*

Memory models are no longer islands; they interact, specified or not. We can define how they compose now, *top down*. Or we can build the systems first and spend a decade working out, *bottom up*, what they actually do, and then what they should have done.

## About the author

[Vijay Nagarajan](https://users.cs.utah.edu/~vijay/) is a Professor in the Kahlert School of Computing at the University of Utah.

## Acknowledgments

The work described here is joint with many people. It was led by Nicolai Oswald and Vasilis Gavrielatos (HeteroGen), Andrés Goens and Soham Chakraborty (Compound Memory Models), An Qi Zhang (Synchronous Propagation), Soham Bagchi and Sanya Srivastava (Grace Hopper study), Dennis Sprokholt and Reese Levine (Beyond the Fence), and Hastin Kapoor (C/LKMM), working with Sukarn Agarwal, Reece Carr, Marco Elver, Theo Olausson, Susmit Sarkar, Daniel Sorin, Tyler Sorensen and Ryan Stutsman. Any errors in this post are mine.

**Disclaimer:** *These posts are written by individual contributors to share their thoughts on the Computer Architecture Today blog for the benefit of the community. Any views or opinions represented in this blog are personal, belong solely to the blog author and do not represent those of ACM SIGARCH or its parent organization, ACM.*