---
title: Finding real bugs in big programs with incorrectness logic
date: 2025-09-11
tags:
- 论文
---

OOPSLA'22, *Finding real bugs in big programs with incorrectness logic*

This paper proposes a static analysis method using [[Incorrectness Separation Logic]], underpinned by bi-abduction technique.

## Goal 

Compute a set of function summary $[p]f()[\epsilon: q]$ for each method $f$, without any specification from the users.

## Analysis

The static analysis in Pulse is a classical forward analysis. Where each control flow point is associated with a set of triples $(\epsilon, m, q)$, which means 'if $m$ is added to the precondition of the function, then $\epsilon:q$ holds at this point'.