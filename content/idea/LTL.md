---
title: LTL
date: 2021-01-20
tags: 
aliases:
  - Linear-time Temporal Logic
  - Linear Temporal Logic
---

# LTL
LTL (Linear-time Temporal Logic) is the syntactic fragment of CTL* that contains no path quantifiers except a leading A:

*   If p is atomic property, then p is an LTL− formula.
*   If φ and ψ are LTL− formulas, then φ ∨ ψ , φ ∧ ψ, ¬φ, Xφ, Fφ, Gψ, and ψUφ are LTL− formulas.
*   If ψ is an LTL− formula, then Aψ is an LTL formula.

总是存在的“A”可以被省略，用LTL-表示公式。

LTL将时间视为线性的序列，标准语义也是基于无限路径。

LTL with past operators
-----------------------

past operators:

*   Y : previously
*   P : past/once
*   H : historically
*   S : since

Note: Since LTL formula deals with linear time, at a specific point in time, the past points are finite. Thus, **past operators can be eliminated** by converting them to future operators, with exponential blowup.

expressive power
----------------

See [[temporal safety property|temporal safety property]] and [[temporal liveness property|temporal liveness property]] for formal definitions of safety and liveness properties expressible by LTL.

LTL is equivalent to first order logic of infinite sequences (with non-logical symbol <, = and `succ`, abbr. `FOL1`)

The following property cannot be expressed by LTL:

> `p` holds only in even positions.

which can, however, be expressed by second order logic of infinite sequences(`S1S`)

LTL formula can be translated to an equivalent automata, see [[LTL translation to Büchi automata|LTL translation to Büchi automata]], but not vice versa.

decision procedures
-------------------

1.  satisfiability problem : 可以通过检查等价自动机的非空性解决，PSPACE完全，复杂度指数于公式的大小
2. [[LTL model checking]]