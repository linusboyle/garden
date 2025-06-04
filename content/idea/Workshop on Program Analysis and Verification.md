---
title: Workshop on Program Analysis and Verification
date: 2025-05-24
tags: []
---

Date: [[2025-05-24]] and [[2025-05-25]] at 中关新园

Organized by Programming Language Labs, PKU

Attendee around 30+

---

Keynote 1 *[[From Logic to Staged Logic for Higher-Order Programs and Beyond]]* by **Wei-Ngan Chin (NUS)**

Session 1

- Proof-integrated Programming (C* language in PKU)
	- Encapsulation: Proof-Specification-Implementation (PSI) module
	- Proofs in C (LCF architecture：user write proofs in C by calling functions in the C interface of HOL)
- QCP (C verification tool with separation logic: symbolic execution -> vc generation -> [[SMT]] s, if failed, Manual Proof in Rocq)

Session 2
- Stellis, DSL for Separation Logic Entailments ($P \vdash Q$)
- Relational and Unary Reasoning for sequential program verification.
- Automatic Resource [[Bound Analysis]] for Rust

---

Keynote 2 *Math Variables v.s. Program Variables, Program Semantics* by **Yuan Chongyi (PKU)**

Session 3

- MyTalk
- Probabilistic program verification & Dirichlet Problem
- Evaluating the Effectiveness of Slice-Assisted program verification

Session 4
- Large language models for fuzzing Linux Kernel syscalls.
- [[大语言模型|LLM]] for invariant generation
- Natural language Specification with LLM

Session 5
- Optimization-based invariant generation (optimization-based-based constraint solving, as compared to template-based)
	- Invariant also exists in continuous-time dynamical (ODE) system (trajectory does not lead to unsafe locations)
	- For inductive invariant in real field, it is decidable but hard .
	- Putinar's Positivstellensatz ; homogenization
- LLM-Assisted static code checker