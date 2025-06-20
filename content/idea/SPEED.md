---
title: SPEED
date: 2025-06-20
tags: 
---

# SPEED
> Performance measurement of software is a critical component of software development. Performance is traditionally measured using profiling, which is often too little (only certain inputs are profiled) or too late (to make requisite changes to address the root cause before shipping). The SPEED project attempts to address these limitations by static estimation of symbolic computational complexity of programs. It builds over recent advances in static program analysis, which has traditionally been used for checking correctness as opposed to measuring performance.
> 
> Computing symbolic complexity bounds is a challenging problem since such bounds for even simple sequential programs are usually disjunctive, non-linear, and involve numerical properties of heaps. Sometimes even proving termination is hard (Remember halting problem is undecidable!), and computing bounds ought to be a harder problem. The SPEED tool implements several algorithmic techniques for statically estimating the worst-case symbolic computational complexity of procedures in terms of their scalar inputs and user-defined quantitative functions of input data-structures (such as length of a list, or height of a tree). It attempts to generate complexity bounds that are usually precise not only in terms of the computational complexity, but also in terms of the constant factors.
> 
> Such automatically generated bounds are very useful for early detection of egregious performance problems in large modular codebases that are constantly being changed by multiple developers who make heavy use of code written by others without a good understanding of their implementation complexity.