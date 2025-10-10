---
title: Interleaving and Lock-Step Semantics for Analysis and Verification of GPU Kernels
date: 2025-10-10
tags:
- 论文
---

PLT'13

整体而言，这是一篇follow-up工作，核心是通过变换给GPU Kernel程序定义了一套lock-step的操作语义，从而能将其视为线性程序进行验证。


# Interleaving and Lock-Step Semantics for Analysis and Verification of GPU Kernels

## GPU Kernel

### Facts about kernel programs

- All threads execute the same kernel function in parallel (SIMD model)
- Communication is possible via **shared variables**.
- Threads could synchronize, using primitives such as **barrier**, which requires all threads to reach the same syntactic barrier before any thread proceeds past the barrier.

### Example 

This program computes the scan/prefix-sum of an input array.

```c
__kernel void scan(__global int *sum) {
    int offset = 1, temp;
    while (offset < TS) {
        if (tid >= offset) {
            temp = sum[tid - offset];
        }
        barrier();
        if (tid >= offset) {
            sum[tid] = sum[tid] + temp;
        }
        barrier();
        offset *= 2;
    }
}
```

Here `__global` is to signify shared variables. `TS` is the number of threads, a constant at runtime.

### Specifications

Two kinds of bugs exist specifically for GPU kernels:
- **data race**: two threads access the same shared address.
- **barrier divergence**:  given a barrier inside a loop, the OpenCL standard requires that **either all threads or zero threads reach the barrier** during a given loop iteration, otherwise barrier divergence occurs and behaviour is undefined.

```c
__kernel void scan(__global int *sum) {
    int offset = 1, temp;
    while (offset <= tid) {
        temp = sum[tid - offset];
        barrier(); 
        sum[tid] = sum[tid] + temp;
        barrier(); 
        offset *= 2;
    }
}
```

Now this variant program is buggy!

## Interleaving Semantics

The small-step operational semantics is defined in the same way it is defined for common concurrent program: Each step only one of the thread execute a step. 

To define the operational semantics of barriers, the states for each thread are expanded. Two private variables are introduced for each thread:

1. $v_{\text{barrier}}$, set to the current barrier id (each syntactic barrier has a unique id)
2. $v_{L}$, a counter for each loop $L$, which increments each time the loop header is reached.

Together, the variables signify the barrier encountered. The state store for each thread is extended to ($\beta_t, \sigma_t$) where $\beta_t$ records the barrier variables for the threads.

Barriers can only be passed when all threads have the same $\beta$:

$$
\frac{\forall t: T_{\sigma}\models t = \langle (\beta_t, \sigma_t), \mathbf{barrier}\ e_t: b_t \rangle \land (\sigma, \sigma_t)(e_t) \quad \forall t_1, t_2: \beta_{t_1} = \beta_{t_2}}{P \vdash \langle \sigma, T_{\sigma} \rangle \to \langle \sigma, \langle (\beta_1, \sigma_1), b_1 \rangle, \dots, \langle (\beta_{TS}, \sigma_{TS}), b_{TS} \rangle \rangle}
$$

## Predication Transformation

The goal of predication transformation is to transform an arbitrary reducible CFG into a topological order so that it can be executed linearly and intrepreted using lock-step semantics.

### Total Order 

Firstly, we want an total order over all basic blocks such that:

- For all blocks B and C, if there is a **path from B to C in the CFG**, then B≤C unless a **back edge** occurs on the path.
- For all **loops L**, if B≤D and B,D∈L, then C∈L for all B≤C≤D.

This order can always be found by repeated topological sort from innermost loops.

### Predication

We want to execute the program simply following the total order, therefore we need to add guards to each blocks (*predication*). 

A private variable $v_{\text{active}}$ is introduced for each thread, which points to the id of the next block that should be executed (not necessarily the block after the current block in the order).

|    Original form    |                     Predicated form                     |
|:-------------------:|:-------------------------------------------------------:|
|      $v := e;$      |         $v := (v_{\text{active}} = B) ? e : v;$         |
| $\text{havoc } v;$  |           $\text{havoc } v_{\text{havoc }};$            |
|                     | $v := (v_{\text{active}} = B) ? v_{\text{havoc }} : v;$ |
| $\text{assert } e;$ | $\text{assert } (v_{\text{active}} = B) \Rightarrow e;$ |
|   $\text{skip};$    |                     $\text{skip};$                      |
|  $\text{barrier};$  |       $\text{barrier } (v_{\text{active}} = B);$        |

It's like the Dijkstra's GCL language.

For most blocks, the $v_{\text{active}}$ is updated to its next block in the total order.

For the last block in a loop, it uses havoc $v_{\text{active}}$ to non-deterministically decide to execute next block or follow back-edge.

## Lock-Step Semantics

Using lock-step semantics, we could regard the GPU kernel as a sequential program.

Firstly, the program is extended by having a copy of each private variable for each threads. So now the program state consists of the shared variables and TS copies of private variables.

Then each statement is interpreted as a **vector operation** over all these variables.

For example $x = e$ -> $x_1, x_2, \ldots x_t = e_1, e_2, \ldots, e_t$. If x is a shared variable, then non-deterministically choose a thread to update the variable.

## Properties

The authors prove  that the Lock-Step semantics is sound and complete (equivalent to) the original interleaving semantics.

# Annotations  

“We provide a novel lock-step execution semantics for GPU kernels represented by arbitrary reducible control flow graphs and compare this semantics with a traditional interleaving semantics.” (Collingbourne et al., 2013, p. 1)

“The result induces a method that allows GPU kernels with arbitrary reducible control flow graphs to be verified via transformation to a sequential program that employs predicated execution.” (Collingbourne et al., 2013, p. 1)

“If an application exhibits significant parallelism it may be possible to extract the computational core of the application as a kernel and offload this kernel to run across the parallel hardware of a GPU” (Collingbourne et al., 2013, p. 1)

“mis-synchronisation at barriers (known as barrier divergence)” (Collingbourne et al., 2013, p. 1)

“GPUVerify achieves scalability by reducing verification of a parallel kernel to a sequential program verification task. This is achieved by transforming kernels into a form where all threads execute in lock-step in a manner that still facilitates detection of data races and barrier divergence arising due to arbitrary thread interleavings.” (Collingbourne et al., 2013, p. 2)

“Semantics and program transformations for lock-step execution have been formally studied for structured GPU kernels where control flow is described by if and while constructs” (Collingbourne et al., 2013, p. 2)

“Lock-step semantics for GPU kernels where control flow is described by an arbitrary reducible control flow graph (CFG),3 has not been studied. Unlike structured programs, arbitrary CFGs do not necessarily exhibit a hierarchical structure, thus the existing predication-based approach cannot be directly extended” (Collingbourne et al., 2013, p. 2)

“We present a traditional interleaving semantics and a novel lock-step semantics for GPU kernels described by CFGs. We show that if a GPU kernel is guaranteed to terminate then the kernel is correct with respect to the interleaving semantics if and only if it is correct with respect to the lock-step semantics, where correct means that all execution traces are free from data races, barrier divergence, and assertion failures” (Collingbourne et al., 2013, p. 2)

“All threads execute this kernel function in parallel” (Collingbourne et al., 2013, p. 3)

“Communication is possible via shared memory; the sum array is marked as residing in global shared memory via the global qualifier. Threads synchronise using a barrier-statement, a collective operation that requires all threads to reach the same syntactic barrier before any thread proceeds past the barrier.” (Collingbourne et al., 2013, p. 4)

“Two common defects from which GPU kernels suffer are data races and barrier divergence.” (Collingbourne et al., 2013, p. 4)

(Collingbourne et al., 2013, p. 4) 换言之在1a的版本中，有可能出现循环体等效skip的情况，但为了barrier的要求，需要「空转」

“given a barrier inside a loop, the OpenCL standard requires that either all threads or zero threads reach the barrier during a given loop iteration, otherwise barrier divergence occurs and behaviour is undefined” (Collingbourne et al., 2013, p. 4)

“To achieve lock-step execution, GPUVerify transforms kernels into predicated” (Collingbourne et al., 2013, p. 4)

(Collingbourne et al., 2013, p. 4) t range over thread

“form” (Collingbourne et al., 2013, p. 4)

(Collingbourne et al., 2013, p. 4) GCL

“A statement of the form e ⇒ stmt is a predicated statement which is a no-op if e is false, and has the same effect as stmt if e is true.” (Collingbourne et al., 2013, p. 4)

“The loop condition is replaced by a guard which evaluates to false if and only if the predicate variable p is false for every thread. Thus all threads continue to execute the loop until each thread is ready to leave the loop; when the loop condition becomes false for a given thread the thread simply performs no-ops during subsequent loop iterations.” (Collingbourne et al., 2013, p. 4)

“A kernel is defined over a set of variables Var = Vs ]Vp with Vs the shared variables and Vp the private variables.” (Collingbourne et al., 2013, p. 5)

“We assume that all kernels have reducible CFGs” (Collingbourne et al., 2013, p. 5)

(Collingbourne et al., 2013, p. 5) 大概TS在运行时可以视为一个常量

“We now define a small-step operational semantics” (Collingbourne et al., 2013, p. 6)

“We define a reduction of a kernel P as sequence of applications of the operational rules where each thread starts reduction from Start and where the initial shared store is some σ and the initial private store of thread t is some σt. A reduction is maximal if it is either infinite or if termination with status termination, error, or infeasible has occurred.” (Collingbourne et al., 2013, p. 8)

(Collingbourne et al., 2013, p. 8) 换言之这paper不关注怎么检测data race了  
  
nope，一般来说好像data race可以在假设SC的情况下检测？

“Our interleaving semantics effectively has a sequentially consistent memory model,” (Collingbourne et al., 2013, p. 8)

“The notion of thread-enabledness is not relevant to our interleaving semantics: we can view a thread as always being enabled. Thus we regard the barrier syntax of our kernel programming language as short for barrier true” (Collingbourne et al., 2013, p. 8)

“The rules of Fig. 4d capture these conditions using a number of special barrier variables” (Collingbourne et al., 2013, p. 8)

(Collingbourne et al., 2013, p. 9) 读-读也算吗？

“t updates v during ρ; t′ accesses v during ρ; no application of BARRIERS occurs between the accesses (i.e., no barrier separates them).” (Collingbourne et al., 2013, p. 9)

“we present a transformation which turns the program executed by a single thread into a form where control flow is flattened: all branches, except for loop back edges, are eliminated.” (Collingbourne et al., 2013, p. 9)

“we use the transformation to express lock-step execution of all threads in a kernel as a sequential vector program.” (Collingbourne et al., 2013, p. 9)

(Collingbourne et al., 2013, p. 10) 需要找到一种全序，使得所有线程每一步执行的语句都相同（线性执行）。CFG中的分支由guard条件约束。

“A total order satisfying the above conditions always can always be computed” (Collingbourne et al., 2013, p. 10)

“Repeat until no loops remain and perform a topological sort of resulting CFG” (Collingbourne et al., 2013, p. 10)

“In what follows we assume that a total order satisfying the above conditions has been chosen, and we refer to this order as the sort order” (Collingbourne et al., 2013, p. 10)

“To predicate statements, we introduce a fresh private variable vactive for each thread, to which we assign BlockId s; the assigned BlockId indicates” (Collingbourne et al., 2013, p. 10)

(Collingbourne et al., 2013, p. 10) 本质上就是，因为这里做了线性化，如果下一个执行的块不满足guard条件（以acfive变量表示，其设置见下面的block部分），则所有语句都是skip

“the block that needs to be executed.” (Collingbourne et al., 2013, p. 10)

“The assume that ‘guards’ the block to be reduced next is moved into the block currently being reduced. Moving guards does not affect behaviour, but only shortens traces that end in infeasible” (Collingbourne et al., 2013, p. 11)

“Predication of Kernels. Predicating a complete kernel P now consists of three steps: (1) Compute a sort order on blocks as detailed above; (2) Predicate every block with respect to the sort order, according to the rules of Table 2; (3) Insert the assignment vactive := Start at the beginning of π(Start )” (Collingbourne et al., 2013, p. 11)

“We achieve this by encoding the kernel as a sequential program, each statement of which is a vector statement that performs the work of all threads simultaneously.” (Collingbourne et al., 2013, p. 12)

“To encode a kernel P as a single-threaded program φ(P ) which effectively executes all threads in lock-step, we assume for every private variable v from P that there exists a variable vt in φ(P ) for each 1 ≤ t ≤ TS . For each shared variable v from P we assume there exists an identical variable in φ(P ).” (Collingbourne et al., 2013, p. 12)

“With respect to assignments, we distinguish between assignments to private and shared variables” (Collingbourne et al., 2013, p. 13)

“Lock-step execution of a barrier statement with condition vactive = B translates to an assertion checking that if vactive,t = B holds for some thread t then it must hold for all threads.” (Collingbourne et al., 2013, p. 13)

“We shall sketch in Sect. 5 that checking for barrier divergence in this manner is equivalent to checking for barrier divergence in the interleaving semantics of Sect. 3. However, contrary to the interleaving case, there is no need to consider barrier variables in the lock-step case” (Collingbourne et al., 2013, p. 13)

“Our goal is to enforce the rule that no thread should leave the loop until all threads are ready to leave the loop, as discussed informally in Sect. 2” (Collingbourne et al., 2013, p. 14)

“the bottom row of Table 3b employs an assume in Bback requiring that vactive = Bhead for some thread, and an assume in Bexit requiring vactive 6= Bhead for all threads” (Collingbourne et al., 2013, p. 14)

“we now say that the lock-step semantics for P is the interleaving semantics for φ(P ), with respect to a single thread (i.e., with TS = 1). Barrier divergence is captured via the introduction of barrier assertions.” (Collingbourne et al., 2013, p. 14)

“shared variable v” (Collingbourne et al., 2013, p. 15)

“ρ does not end in infeasible; t writes v during ρ and t′ either reads or writes v during ρ; the accesses are not separated by a barrier assertion (i.e., no barrier is reduced between the accesses).” (Collingbourne et al., 2013, p. 15)

“We have implemented the predication technique described here in GPUVerify [7], a verification tool for OpenCL and CUDA kernels built on top of the Boogie verification engine [6] and Z3 SMT solver” (Collingbourne et al., 2013, p. 18)

“Predication for CFGs has allowed us to build a new front-end for GPUVerify which takes LLVM intermediate representation (IR) as input; IR directly corresponds to a CFG. This allows us to compile OpenCL and CUDA kernels using the Clang/LLVM framework and perform analysis on the resulting IR” (Collingbourne et al., 2013, p. 18)

“GPUVerify I in [7], where several of the kernels had to be manually modified before they could be subjected to analysis: 4 kernels exhibited unstructured control flow due to switch statements, and one featured a do-while loop which was beyond the scope of the predication scheme” (Collingbourne et al., 2013, p. 18)

“In each case the difference lay in constraint solving times; the SMT queries generated by our CFG-based tool chain can be somewhat more complex than in the structured case.” (Collingbourne et al., 2013, p. 19)

“a large number of shared memory accesses. In the LLVM IR processed by GPUVerify II these accesses are expressed as many separate, contiguous loads and stores, requiring reasoning about race-freedom between many pairs of operations. The structured approach of GPUVerify I captures these accesses at the abstract syntax tree level, allowing a load/store from/to a contiguous region” (Collingbourne et al., 2013, p. 19)

“battle the state space explosion due to arbitrary interleavings of threads by considering one particular schedule.” (Collingbourne et al., 2013, p. 19)

“enables automated analysis of a wider class of GPU kernels than previous techniques for structured programs, and allows for the analysis of compiled kernel code, after optimisations have been applied” (Collingbourne et al., 2013, p. 19)

“Because our kernel programming language supports non-deterministic choice and havocking of variables it can express an over-approximation of a concrete kernel. In future work we plan to exploit this, investigating the combination of source-level abstraction techniques such as predicate abstraction with our verification method.” (Collingbourne et al., 2013, p. 19)

“ntroduced through under-approximation, e.g., unwinding a loop by a fixed number of iterations in the style of bounded model checking. We plan to investigate whether it is possible to relax these well-formedness conditions under certain circumstances.” (Collingbourne et al., 2013, p. 20)