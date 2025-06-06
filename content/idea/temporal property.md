---
title: temporal property
date: 2021-01-20
tags: 
---

使用temporal logic描述的性质，（如果将时间视为线性的）代表的是一组无限的 [[状态|state]] 序列。这些性质也可以被看成是infinite word 上的语言（[[ω-language|omega language]]），从而拥有自动机表示（如果合适）。

依据其表达的能力，可以将其聚类为若干类。下图是常见的temporal property分类及包含关系：

![[temporal-property-hierarchy.webp]]

图中也注明了它们在LTL中的典型表示形式。这种形式不是这些性质分类的依据，只是其典型的表示法。比如，[[safety property|safety property]]在LTL中总是能表示为invariant的形式，但也有其他的可能。更一般的，所有的LTL公式都能表示为reactivity property，这可以说明LTL的表达能力。

所有的temporal property都可以表示为一个safety property(see [[temporal safety property]])和一个liveness property(see [[temporal liveness property]])  的交。构造性证明见 Handbook of [[模型检测|model checking]] 44页。