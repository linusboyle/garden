---
title: Encoding NN as MILP
date: 2023-06-29
tags: 
aliases:
---

# Encoding NN as MILP

- Affine layer: direct. $y = W\; x + b$
- ReLU layer: ![[Pasted image 20230706104347.png]]
- Pre-condition: Normally box constraints like $x_i - \epsilon \le x_i \le x_i + \epsilon$
- Post-condition: ![[Pasted image 20230706104516.png]]
