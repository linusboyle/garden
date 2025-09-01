---
title: Craig Interpolant
date: 2025-09-01
tags:
aliases:
  - Craig插值
---

# Craig Interpolant

## Definition

For two formulas A and B such that A implies B, a **Craig Interpolant** is a formula I such that

1.  A implies I
2.  I implies B
3.  the non-logical symbols of I occur in A and B.

this definition is independent of the logic system. A logic system has _interpolation property_, if it satisfies that, if $A \implies B$ is valid, then a Craig interpolant exists.

Craig proved that FOL has interpolation property. There is a constructive proof of the interpolation property of PL in [Wikipedia](https://en.wikipedia.org/wiki/Craig_interpolation). Proof for FOL can be found [online](https://www.princeton.edu/~hhalvors/teaching/phi312_s2013/craig.pdf)

Lyndon later proves a stronger version.

## reverse interpolant

If $A \land B$ is contradictory, a **reverse interpolant** is a formula I such that

1.  A implies I
2.  $I \land B$ is contradictory
3.  the non-logical symbols of I occur in A and B.

> note: the reverse interpolant of A and B is the interpolant of A and $\neg B$, since $A \implies B$ is valid iff $A \land \neg B$ is contradictory

in verification, _interpolant_ usually means reverse interpolant