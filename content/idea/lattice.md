---
title: lattice
date: 2021-09-20
tags:
  - 代数结构
aliases:
  - 格
  - 完全格
---

# Lattice

A **lattice** is any partially ordered set (L, $\sqsubseteq$) where every **non-empty finite** subset X ⊆L has a greatest lower bound (*meet*) and a least upper bound (*join*).

> 任意非空有限集合也可以换成任意两个元素 a、b，定义等价（对 X 的大小归纳可证）

A **complete** **lattice** is any partially ordered set (L, $\sqsubseteq$) where every subset X ⊆L has a greatest lower bound and a least upper bound.

> 显然，有限非空格总是完全格。完全格也一定是非空的。

Every complete lattice has a greatest element (*top*, $\top$) and a least element (*bottom* $\bot$).

A lattice that additionally has a top and a bottom is called a **bounded lattice**. Equivalently, a bounded lattice has glb and lub for every finite subset, *including the empty set*. 

## Semilattice

- If for every non-empty finite subset, only lub exists, it is a *join semilattice*
- If for every non-empty finite subset, only glb exists, it is a *meet semilattice*

## Product

The product of n lattices is also lattice. Product of complete lattices is complete.

>  构造乘积的方式是，集合算笛卡儿积，偏序关系为按元素偏序关系的合取。乘积格的 glb 和 lub 为按元素依次应用对应格的算子。


## Fixed-point

- [[Knaster–Tarski theorem]]