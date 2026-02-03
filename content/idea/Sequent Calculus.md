---
title: Sequent Calculus
date: 2026-02-01
tags: 
aliases:
- 相继式演算
---

一阶逻辑的LK系统详见[[软件分析与验证]]课件

## 相继式

相继式演算的推导式称为“相继式”。相继式是一种条件重言式，形如

$$
\Gamma \vdash \Sigma 
$$

其中$\Gamma$是前件 antecedent，$\Sigma$为后件 consequent


## 推导规则

推导规则形如：

$$
\frac {\Gamma_1 \vdash \Sigma_1 \quad \Gamma_n \vdash \Sigma_n}{\Gamma_{n+1} \vdash \Sigma_{n+1} }
$$

其中横线上的部分为前提 Premise，下方为结论 Conclusion

前提为空的推导规则即为公理 Axiom

## Related

- [[First-Order Logic]] 经典逻辑的相继式演算系统为LK（甘岑，1934）