---
title: Zonotope Relaxation
date: 2023-07-06
tags: 
aliases:
---

# Zonotope Relaxation

Zonotope is a convex relaxation whose affine transformer will not lose precision (that is, it will be exact); however, its ReLU transformer will again lose some precision. 

Zonotope has been shown effective in both verification and provable training.

**Shape**: each variable is captured in an affine form, and can be related through shared parameters. Formally:

![[Pasted image 20230706103033.png]]

**Transformers**:

![[Pasted image 20230706103138.png]]

For ReLU transformer, first compute the lower and upper bound $[l_x, u_x]$ for the input. If $[l_x, u_x]$ crosses the boundary $0$, then:

![[Pasted image 20230706103558.png]]

with $\lambda = \frac{u_x}{u_x - l_x}$

And then transform to Zonotope format:

![[Pasted image 20230706103802.png]]

## Related

- [[Certification of Neural Networks]]