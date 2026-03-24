---
title: Fast Gradient Sign Method (FGSM)
date: 2023-07-06
tags: 
aliases:
---

# Fast Gradient Sign Method (FGSM)

### Fast Gradient Sign Method (FGSM)

FGSM is a kind of white-box [[Adversarial Attack]]  designed to be fast, not optimal (may not compute minimal perturbation). It assume the local linearity of the underlying function.

#### Targeted

Compute the perturbation as:

$
\eta = \epsilon \times sign(\nabla_x loss_t(x))
$

where 
- $\epsilon$ is a small constant
- $loss_t(x)$ is the loss function w.r.t. target label `t`

Then the [[adversarial example]] is $x' = x - \eta$

> I. J. Goodfellow, J. Shlens and C. Szegedy, _Explaining and harnessing adversarial examples_, 2014.

#### Untargeted

Compute the perturbation as:

$
\eta = \epsilon \times sign(\nabla_x loss_s(x))
$

with $x' =  x + \eta$, where `s` is the correct label.

## Variants of FGSM

### Iterative FGSM (I-FGSM)

> A. Kurakin, I. Goodfellow and S. Bengio, _Adversarial examples in the physical world_, 2016.
> 
> $\begin{equation*} x_{i}^{\prime}=x_{i-1}^{\prime}-\text{clip}_{\epsilon}(\alpha. \text{sign}(\nabla 1\text{oss}_{F, t}(x_{i-1}^{\prime}))) \end{equation*}$

(untargeted?)

![[Pasted image 20230720095513.png]]

Iterative gradient sign was found to produce superior results to fast gradient sign

### Others

- [[decision-based adversarial attack#Momentum Iterative Fast Gradient Sign Method (MI-FGSM)]]
- [[decision-based adversarial attack#Nesterov Iterative Fast Gradient Sign Method (NI-FGSM)]]
- [[decision-based adversarial attack#Variance tuning Method (VMI-FGSM)]]

