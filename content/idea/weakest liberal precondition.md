---
title: weakest liberal precondition
date: 2021-03-08
tags: 
---

# weakest liberal precondition

$wlp([[S]],\phi)$ stands for **weakest liberal precondition** of $\phi$ under program S.

Here, the term “weakest” means “least restrictive” or “most general”, and ”liberal” refers to the fact that this precondition need not guarantee termination of S.


## Computing WP

WP rules for assignment, branch .etc are standard (ref. [[软件分析与验证]]课件)

For assert, assume and havoc:

![[Pasted image 20241218173945.webp]]


**注意**：wlp 并不是求谓词在语句关系语义下的原象，这在关系语义不是函数的情况下体现（如 havoc）。