---
title: Evaluation Context
date: 2026-02-05
tags: 
aliases:
---

Evaluation contexts provide a mechanism to compactly express the structural congruence rules of reductions (which constrain the choice of reductions that can be performed next, thus defining both the order of evaluation and whether subexpressions are evaluated lazily). 

An evaluation context $E$ , sometimes written $E [ \bullet ]$ , is a $\lambda$ -term or a metaexpression representing a family of $\lambda$ -terms with a special variable $[ \cdot ]$ called the hole. If $E [ \bullet ]$ is an evaluation context, then $E [ e ]$ represents $E$ with the term $e$ substituted for the hole.

Every evaluation context $E [ \bullet ]$ represents a context rule

$$ \frac {e \longrightarrow e ^ {\prime}}{E [ e ] \longrightarrow E [ e ^ {\prime} ]}$$

Context can be nested and is often expressed using a grammar.

---

The set of all valid evaluation contexts for the CBV $\lambda$ -calculus is represented by the grammar

$$ E \quad := \quad [ \cdot ] | E~e | v~E $$