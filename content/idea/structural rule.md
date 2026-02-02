---
title: structural rule
date: 2026-02-01
tags: 
aliases:
---

> A structural rule is a logical rule that applies indiscriminately to all propositions without regard to their form.
> 
> ...
> 
> regardless of whether we think of validity in terms of proofs or in terms of models, the structural rules are facts about validity that hold irrespective of the logical form of the components of the arguments. They arise from the general definition of validity and its structural features, rather than the rules governing particular connectives, quantifiers or other items of vocabulary.

通常是指在[[Sequent Calculus]]中，与逻辑连接词无关，而仅操作相继式的推导规则

常见的structural rule:

1. Weakening

$$\displaystyle {\frac {\Gamma \vdash \Sigma }{\Gamma ,A\vdash \Sigma }}$$

$$
\displaystyle {\frac {\Gamma \vdash \Sigma }{\Gamma \vdash \Sigma ,A}}
$$

2. Contraction

$$
\displaystyle {\frac {\Gamma ,A,A\vdash \Sigma }{\Gamma ,A\vdash \Sigma }}
$$

$$
\displaystyle {\frac {\Gamma \vdash A,A,\Sigma }{\Gamma \vdash A,\Sigma }}
$$

3. Commutativity

$$
\displaystyle {\frac {\Gamma _{1},A,\Gamma _{2},B,\Gamma _{3}\vdash \Sigma }{\Gamma _{1},B,\Gamma _{2},A,\Gamma _{3}\vdash \Sigma }}
$$

$$
\displaystyle {\frac {\Gamma \vdash \Sigma _{1},A,\Sigma _{2},B,\Sigma _{3}}{\Gamma \vdash \Sigma _{1},B,\Sigma _{2},A,\Sigma _{3}}}
$$