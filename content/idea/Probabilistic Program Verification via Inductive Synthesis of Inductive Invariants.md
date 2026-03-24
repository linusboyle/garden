---
title: Probabilistic Program Verification via Inductive Synthesis of Inductive Invariants
date: 2024-05-22
tags:
  - reference
see also:
  - "[[cegis2pro]]"
author: 
zotero url:
---


## 目标

给定一个概率程序，一个描述程序终止时应满足的规约的谓词f，一个上界g，判定程序终止时，满足谓词f的概率是否总是小于等于上界g。

这篇paper里，f又叫做postexpectation，g又叫preexpectation，因为在形式化时也考虑了f和g是任意表达式（随机变量）的情况，即也可以解决f在执行程序后的期望是否满足上界这一问题。在本文中只考虑两者是piecewise linear的。

## 方法

关键在于处理循环。每次循环的效果都可以用一个expectation transformer $\Phi$来描述，即将一个从状态到正实数的映射，转换为另一个此类型的映射。整个循环的效果就是这个transformer的最小不动点。

本文基于归纳不变式进行证明。一个归纳不变式I是上述的一个映射，且满足：经过一次变换后，$\Phi(I) \le I$，即在每个状态下的期望值都是不升的。从这一归纳性性质能推出$lfp(\Phi)(I) \le I$

如果还能证明$I \le g$，则证明了上界的正确性。

不变式的生成方式是CEGIS, see [[程序综合的一般原则#CEGIS]]
