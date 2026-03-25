---
title: Adversarial Attack
date: 2023-06-29
tags: 
aliases:
---

# Adversarial Attack

An adversarial attack refers to a technique used to exploit vulnerabilities in machine learning models, particularly deep neural networks, by introducing carefully crafted input data called [[adversarial example]]s. These examples are designed to deceive the model and cause it to make incorrect predictions or classifications. The goal is to manipulate the model's behavior in such a way that it produces a desired outcome for the attacker, while appearing indistinguishable to a human observer.

- Adversarial attacks typically involve designing attack methods specific to the target model. There is no general method that universally works for all models due to the diversity of model architectures, training processes, and defense mechanisms employed. However, there are some attack methods that can be broadly applicable across models, especially for models with similar architectures or characteristics. For example, gradient-based attacks such as the [[Fast Gradient Sign Method (FGSM)]] or the [[Projected Gradient Descent (PGD)|Projected Gradient Descent (PGD)]]
- Attackers often need to have some knowledge about the target model, such as its architecture, parameters, or access to its gradients, to craft effective adversarial examples.

Attack can also happen at training stage, e.g. [[data poisoning]] 

## Taxonomy

![[Taxonomy of Adversarial Attack Threat Model]]

### Taxonomy of Perturbation

**Scope:**

- _Individual_ attacks generate different perturbations for each clean input.
    
- _Universal_ attacks only create a universal perturbation for the whole data set. This perturbation can be applied to all clean input data.

**Limitation**
- optimization vs constraint

**measurement**
1. p-[[norm]] distance: $||x||_p = (\Sigma_{i=1}^N ||x_i||^p)^{\frac{1}{p}}$
2. Psychometric perceptual adversarial similarity score (PASS)

## White-Box Methods of [[Adversarial Attack]]

### Fast Gradient Sign Method (FGSM)

Check [[Fast Gradient Sign Method (FGSM)]]

### PGD Attack

Check [[Projected Gradient Descent (PGD)]]

### Optimization-based Methods

find $\eta$ such that $||\eta||$ is minimized, and $f(x + \eta) = t$ and $x + \eta \in [0, 1]^n$.

#### L-BFGS

This problem can be very difficult to solve, however, so Szegedy _et al_. instead solve the following problem:

$$
\begin{align*}& \text{minimize}\ c\cdot\Vert x-x^{\prime}\Vert_{2}^{2}+\text{loss}_{F, l}(x^{\prime}) \\ & \text{such that}\ x^{\prime}\in[0,1]^{n} \end{align*}
$$

The original attack algorithm uses L-BFGS to solve the optimization problem.

> C. Szegedy, W. Zaremba, I. Sutskever, J. Bruna, D. Erhan, I. Goodfellow, et al., "Intriguing properties of neural networks", _ICLR_, 2013.

Line search is performed to find the constant c>0 that yields an adversarial example of minimum distance: in other words, we repeatedly solve this optimization problem for multiple values of c, adaptively updating c using bisection search or any other method for one-dimensional optimization.

#### Carlini-Wagner Attack (CW)

> Nicholas Carlini, David Wagner. Towards Evaluating the Robustness of Neural Networks. In: Proceedings of the IEEE Symposium on Security and Privacy (S&P 2017), San
Jose, CA, USA, May 22-26, 2017: 39-57

Here $f(x + \eta) = t$ is a hard constraint, and can be relaxed by selecting an objective function $obj$ such that if $obj(x + \eta) \le 0$ then $f(x + \eta) = t$.

*Examples of objective function:*
- $obj(x') = loss_t(x') - 1 = -log_2(p(t)) - 1$
- $obj(x') = max(0, 0.5 - p(x')_t$ where $p(x')_t$ is the probability of class t on input $x'$

The problem can now be formulated as:

find $\eta$ such that $||\eta||_{\infty} + c\times obj(x + \eta)$ is minimized, and $x + \eta \in [0, 1]^n$.

Note that the [[norm]] $||\eta||_{\infty}$ is problematic for optimization. We can replace it with a proxy function like $\Sigma_i max(0, (|\eta| - \tau))$, where $\tau$ is a bound that is decreased at every iteration.

The box constraints $x + \eta \in [0, 1]^n$ can be dealt with using [[Projected Gradient Descent (PGD)]].

### Diffing Networks

The goal is to find a differencing input give two neural networks trained to learn the same function. 

Simply:
while $f_1(x) \ne f_2(x)$: $x = x + \epsilon \times \frac {\partial (f_1(x) - f_2(x))}{\partial x}$

## Black-Box Methods of [[Adversarial Attack]]

- [[decision-based adversarial attack]]
- score-based adversarial attack