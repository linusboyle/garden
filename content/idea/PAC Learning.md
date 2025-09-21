---
title: PAC Learning
date: 2025-09-17
tags:
  - 计算学习理论
aliases:
  - Probably Approximately Correct
---

# Probably Approximately Correct

1984年，Leslie Valiant在*A Theory of the Learnable*提出的一种理论框架，结合计算复杂度理论中的方法对学习算法的可行性进行分析。

## Definition

A concept class $\mathcal{C}$ is said to be **PAC-learnable** if there exists an algorithm $\mathcal{A}$ and a polynomial function $\text{poly}(\cdot, \cdot, \cdot, \cdot)$ such that for any $\epsilon > 0$ and $\delta > 0$, for all distributions $\mathcal{D}$ on $\mathcal{X}$ and for any target concept $c \in \mathcal{C}$, the following holds for any sample size $m \geq \text{poly}(1/\epsilon, 1/\delta, n, \text{size}(c))$:

$$\mathbb{P}_{\mathcal{S} \sim \mathcal{D}^m} [R(\mathcal{h}_\mathcal{S}) \leq \epsilon] \geq 1 - \delta.$$

If $\mathcal{A}$ further runs in $\text{poly}(1/\epsilon, 1/\delta, n, \text{size}(c))$, then $\mathcal{C}$ is said to be **efficiently PAC-learnable**. When such an algorithm $\mathcal{A}$ exists, it is called a **PAC-learning algorithm** for $\mathcal{C}$.

## 特点

1. [[PAC Learning]]中学习算法被动地接受样本（一种passive learning），样本从某个任意但未知的分布中获得。PAC可学习性要求算法应该在所有分布下满足要求。
2. 泛化误差$R(\mathcal{h}_\mathcal{S})$被定义为假设与概念间结论不一致的概率，这个概率相对于同样的分布。[[PAC Learning]]的训练和测试都是在同一个分布下
3. $\epsilon$是泛化误差的界，$\delta$则衡量信心。由于分布是任意的，总是存在极端情况，因此PAC只要求有一定的概率近似正确，这一概率随着样本量的增加而增加。
4. n代表表示一个样本需要$O(n)$的cost，比如欧几里得空间的维度