---
title: From Logic to Staged Logic for Higher-Order Programs and Beyond
date: 2025-05-24
tags: []
---

D. Foo, Y. Song, and W.-N. Chin, “Staged Specification Logic for Verifying Higher-Order Imperative Programs,” in _Formal Methods_, A. Platzer, K. Y. Rozier, M. Pradella, and M. Rossi, Eds., Cham: Springer Nature Switzerland, 2025, pp. 501–518. doi: [10.1007/978-3-031-71162-6_26](https://doi.org/10.1007/978-3-031-71162-6_26).

## Some interesting topics on specifications

*loops as functions* -> so that instead of loop invariants, pre/post-conditions. what about side effects?

*termination and non-termination specifications* -> I have read the paper before

*case specification* -> function contract with case splits in specification

*immutable specification* -> specify that some inputs are not changed.

## HO Functions

*Imperative programs with HO* functions are difficult to specify with pre/post-conditions (what about exceptions, immutability, etc.)

**pre/post-conditions** works for normal function, but not work well with HOF.


Solution: **Staged Logics**

- Use sequence op's for sequentialization. $\phi ; \psi$ extended to Hoare Logic
- Use intepreted and uninterpreted functions
- Recursion

## Algebraic Effects

Like exceptions, but caught **effects** (exceptions) is accompanied by continuation

## Others

Correctness, Incorrectness and .. Non-termination