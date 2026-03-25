---
title: Projected Gradient Descent (PGD)
date: 2023-06-29
tags: 
aliases:
---

_Projected gradient descent_ performs one step of standard gradient descent, and then clips all the coordinates to be within the constraint box.

PGD can be instantiated with any region one can project to, e.g. a Box.

> This approach can work poorly for gradient descent approaches that have a complicated update step (for example, those with momentum)
> 
> CW2017

## PGD Attack

This attack uses Projected Gradient Descent (PGD), and is a variant of FGSM applied iteratively with **projection**. It s a commonly used attack for adversarial training: training the network to be robust. [[Robustness (NN)]]

PGD starts at a random point in the area. At each iteration, a new example is calculated by standard [[Fast Gradient Sign Method (FGSM)]]. Then it is projected back to the constraint area. It stops if a counter-example is found, or after a pre-defined number of steps are reached. -> [[Fast Gradient Sign Method (FGSM)#Iterative FGSM (I-FGSM)]] (Projected Gradient Descent(PGD)实际上可以看作带随机噪声初始化的多步FGSM方法。)

Note It is possible the final produced example is inside the box, and not on the boundary. However, when we project, if outside the box, we will end up on the boundary.