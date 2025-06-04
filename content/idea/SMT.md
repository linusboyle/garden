---
title: SMT
date: 2020-01-01
tags: 
- Satisfiability Modulo Theories
---

# SMT

abbr. of `satisfiability modulo theories`

decide the satisfiability of a given quantifier-free first-order formula with respect to a background theory. In this setting, a model is an assignment of values from the theory to variables that satisfies the formula.

> Satisfiability Modulo theories (SMT) is an area of automated deduction that studies methods for checking the satisfiability of first-order formulas with respect to some logical theory _T_ of interest. It differs from general automated deduction in that the background theory _T_ need not be finitely or even first-order axiomatizable, and specialized inference methods are used for each theory. By being theory-specific and restricting their language to certain classes of formulas (such as, typically but not exclusively, quantifier-free formulas), these specialized methods can be implemented in solvers that are more efficient in practice than general-purpose theorem provers. [SMT-LIB The Satisfiability Modulo Theories Library](http://smtlib.cs.uiowa.edu/about.shtml)

common theory:

* linear real/integer arithmetic (decidable): LRA/LIA
* [[theory of reals]] (decidable per Tarski's Theorem)

See [SMT-LIB The Satisfiability Modulo Theories Library](http://smtlib.cs.uiowa.edu/index.shtml)

[[Max-SMT]] is a generalization of SMT.
