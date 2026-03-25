---
title: DeepPoly Relaxation
date: 2023-06-29
tags: 
aliases:
---

# DeepPoly Relaxation

Like Zonotope, DeepPoly is exact for affine and is its ReLU transformer produces a smaller area than the Zonotope ReLU transformer.

**Shape:**![[Pasted image 20230706105034.png]]

**ReLU transformer:**

![[Pasted image 20230706105615.png]]

When computing bounds, backsubstitution is utilized for tighter bound:

![[Pasted image 20230706105725.png]]
