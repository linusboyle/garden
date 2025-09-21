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

## Definition - Realizable Case

A concept class $\mathcal{C}$ is said to be **PAC-learnable** if there exists an algorithm $\mathcal{A}$ and a polynomial function $\text{poly}(\cdot, \cdot, \cdot, \cdot)$ such that for any $\epsilon > 0$ and $\delta > 0$, for all distributions $\mathcal{D}$ on $\mathcal{X}$ and for any target concept $c \in \mathcal{C}$, the following holds for any sample size $m \geq \text{poly}(1/\epsilon, 1/\delta, n, \text{size}(c))$:

$$\mathbb{P}_{\mathcal{S} \sim \mathcal{D}^m} [R(\mathcal{h}_\mathcal{S}) \leq \epsilon] \geq 1 - \delta.$$

If $\mathcal{A}$ further runs in $\text{poly}(1/\epsilon, 1/\delta, n, \text{size}(c))$, then $\mathcal{C}$ is said to be **efficiently PAC-learnable**. When such an algorithm $\mathcal{A}$ exists, it is called a **PAC-learning algorithm** for $\mathcal{C}$.

### 特点

1. [[PAC Learning]]中学习算法被动地接受样本（一种passive learning），样本从某个任意但未知的分布中获得。PAC可学习性要求算法应该在所有分布下满足要求。
2. 泛化误差$R(\mathcal{h}_\mathcal{S})$被定义为假设与概念间结论不一致的概率，这个概率相对于同样的分布。[[PAC Learning]]的训练和测试都是在同一个分布下
3. $\epsilon$是泛化误差的界，$\delta$则衡量信心。由于分布是任意的，总是存在极端情况，因此PAC只要求有一定的概率近似正确，这一概率随着样本量的增加而增加。
4. n代表表示一个样本需要$O(n)$的cost，比如欧几里得空间的维度
5. 通常的机器学习算法的概念类包含在假设类中

## Definition - Agnostic Case/Agnostic PAC Learning

Let $\mathcal{H}$ be a hypothesis set. $\mathcal{A}$ is an **agnostic PAC-learning algorithm** if there exists a polynomial function $\text{poly}(\cdot, \cdot, \cdot)$ such that for any $\epsilon > 0$ and $\delta > 0$, for all distributions $\mathcal{D}$ over $\mathcal{X} \times \mathcal{Y}$, the following holds for any sample size $m \geq \text{poly}(1/\epsilon, 1/\delta, n, \text{size}(c))$:

$$\mathbb{P}_{\mathcal{S} \sim \mathcal{D}^m} [R(h_{\mathcal{S}}) - \min_{h \in \mathcal{H}} R(h) \leq \epsilon] \geq 1 - \delta.$$

If $\mathcal{A}$ further runs in $\text{poly}(1/\epsilon, 1/\delta, n)$, then it is said to be an **efficient agnostic PAC-learning algorithm**.

### 对比 & 联系

1. agnostic learning 蕴涵 realizable learning，反之亦然[^1]。
2. agnostic learning的目标是学习到的假设尽量接近误差最小的假设
3. agnostic learning通常不是deterministic的，而是stochastic的，故用$\mathcal{X} \times \mathcal{Y}$上的联合分布来表示。如果每个样本的标签是确定的，因为标签函数对应的假设的误差是0，只要它在假设类里，那么可以转变为realizable的情况。

[^1]: [Realizable vs agnostic PAC learning | Victor Lecomte](https://victorlecomte.com/notes/realizable-vs-agnostic-pac-learning.html)
