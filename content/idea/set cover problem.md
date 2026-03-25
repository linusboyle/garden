---
title: set cover problem
date: 2020-11-14
tags: 
aliases:
---


formulation
-----------

Given a universe ${\displaystyle {\mathcal {U}}}$ and a family ${\displaystyle {\mathcal {S}}}$ of subsets of ${\displaystyle {\mathcal {U}}}$ , a _cover_ is a subfamily ${\displaystyle {\mathcal {C}}\subseteq {\mathcal {S}}}$ of sets whose union is ${\displaystyle {\mathcal {U}}}$. In the set covering decision problem, the input is a pair ${\displaystyle ({\mathcal {U}},{\mathcal {S}})}$ and an integer ${\displaystyle k}$ ; the question is whether there is a set covering of size ${\displaystyle k}$ or less. In the set covering optimization problem, the input is a pair ${\displaystyle ({\mathcal {U}},{\mathcal {S}})}$, and the task is to find a set covering that uses the fewest sets.

the decision problem is NP-complete, optimization is NP-hard.

greedy algorithm
----------------

There is a greedy algorithm for polynomial time approximation of set covering that chooses sets according to one rule: at each stage, choose the set that contains the largest number of uncovered elements.

It can be shown that this algorithm achieves an approximation ratio of ${\displaystyle H(s)}$, where ${\displaystyle s}$ is the size of the set to be covered. In other words, it finds a covering that may be ${\displaystyle H(n)}$ times as large as the minimum one, where ${\displaystyle H(n)}$ is the nth harmonic number