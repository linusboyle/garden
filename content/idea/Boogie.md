---
title: Boogie
date: 2021-06-08
tags: 
aliases:
  - BoogiePL
---

# Boogie: An Intermediate Verification Language

Boogie 2 时期的微软官方介绍：

> Boogie is an intermediate verification language, intended as a layer on which to build program verifiers for other languages. Several program verifiers have been built in this way, including the VCC and HAVOC verifiers for C and the verifiers for Dafny, Chalice, and Spec#. A previous version of the language was called BoogiePL. The current language (version 2) is currently known as just Boogie, which is also the name of the verification tool that takes Boogie programs as input.
> 
> ![[boogie-boogie.webp]]
> 
> Boogie is also the name of a **tool** (Boogie Verifier). The tool accepts the Boogie language as input, optionally infers some invariants in the given Boogie program, and then generates verification conditions that are passed to an SMT solver. The default [[SMT]] solver is [Z3](https://github.com/Z3Prover/z3/wiki). 
> 
> The Boogie research project is being developed primarily in the [RiSE](https://www.microsoft.com/en-us/research/group/research-in-software-engineering-rise/) group at [Microsoft Research](https://www.microsoft.com/en-us/research) in Redmond. However, people at several other institutions make the open-source Boogie tool what it is.

目前的 Boogie 3 版本加入了对并发的支持（即 [[Civl]]），此外代码库也进行了较大的重构开。