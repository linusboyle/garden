---
title: Jaaru
date: 2022-10-10
tags:
related:
- [[persistent memory verification]]
---

# Jaaru

An efficient model checker for persistent memory programs.

It has a LLVM frontend (a pass) that instruments every memory access, and simulates the execution of program.

> It has two different modes of operations: (1) Random mode which explore random executions and insert crashes randomly (2) [[模型检测|model checking]] mode which systematically explore executions and insert crashes before every flush operation. Jaaru has an LLVM pass to instrument memory and cache operations in the program.


The instrumentation phase is quite simple:
- Insert calls to run-time library before every memory access.
     - Optimizations may apply to avoid instrumenting some of the accesses.
- Insert calls at function entry/exit.

The rest is handled by the run-time library.

For inline persistency-related instructions like clflush, it is replaced to a call to Jaaru library (pmc_clflush, for example).

For program that uses libpmem API, Jaaru provides a library wrapper which calls the internal APIs.