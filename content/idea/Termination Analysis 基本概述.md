---
title: Termination Analysis 基本概述
date: 2021-01-20
tags: 
- outdated
aliases:
---

the fundamental technique is to find ranking function

- explicit ranking function is an expression `f` such that $f(x) > f(x') \land f(x) > 0$
- implicit ranking function is an expression `f` such that the number of iteration is bounded by `f`.  (a.k.a. loop bound)

The research is focused on two aspects:

1. synthesizing ranking function for simple loop
2. proving termination of complex control flow, by using result of 1.

For 1., two techniques are used:
1. domain-specific technique (e.g. linear algebra) for complete method of synthesis of affine ranking function, and linear lexicographic ranking function. In this way, explicit ranking is used.
2. learning-based technique like CEGIS for synthesis of piecewise ranking function .etc. In this way, both explicit and implicit ranking are used.

In learning-based technique, if the implicit ranking is used, checking the validity of candidate ranking/bound is done by safety check, which is a very heavy technique. If explicit ranking is used, validity is checked by SMT constraints solving.