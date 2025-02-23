---
date: 2024-12-18
tags:
  - idea
see also:
  - "[[索引]]"
  - "[[2024-12-18]]"
---


> a program is annotated with assertions at cutpoints. From these annotations, one derives a set of formulas or verification conditions,which guarantee that whenever program control reaches a cutpoint the associated assertions hold.

A verification condition generator is a common sub-component of an automated program verifier that synthesizes formal verification conditions by analyzing a program's source code using a method based upon Hoare logic. [[Verification Condition|VC]] generators **may require that the source code contains logical annotations provided by the programmer or the compiler such as pre/post-conditions and loop invariants (a form of proof-carrying code)**. VC generators are often coupled with [[SMT]] solvers in the backend of a program verifier. After a verification condition generator has created the verification conditions they are passed to an automated theorem prover, which can then formally prove the correctness of the code. 