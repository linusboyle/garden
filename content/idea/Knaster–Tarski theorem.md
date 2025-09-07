---
title: Knaster–Tarski theorem
date: 2025-09-07
tags: 
---

For a given complete [[lattice]] $(L, \sqsubseteq)$, function $f : L \rightarrow L$ is monotonic if $x \sqsubseteq y \implies f (x) \sqsubseteq f (y)$.  Knaster–Tarski theorem states that the set of fixed point of $f$ in $L$ forms a complete [[lattice]].

**Corollary**: lfp and gfp exists for f.

## 证明

首先证明 lfp 和 gfp 存在。

令 $D =\{x \in L | x \sqsubseteq f(x)\}, u = \bigsqcup D$. 对任意 $x \in D$, $x \sqsubseteq u$，故 $x \sqsubseteq f(x) \sqsubseteq f(u)$，即 $f(u)$是D的上界，故$u \sqsubseteq f(u)$，由此得u在D中。

又$f(u) \sqsubseteq f(f(u))$故$f(u) \in D$，有$f(u) \sqsubseteq u$，即u是f的不动点。由于所有f的不动点都在D中，其上确界必为u，故u是最大不动点。同理可证最小不动点存在。

下面证明所有不动点的集合P是完全格。

取任意P的子集Y，y为Y的上确界，$([y, \top] = \{x \in L \mid y \sqsubseteq x \sqsubseteq \top\},\sqsubseteq)$的任意子集的上下确界都在集合内，为完全格。

对任意Y中元素x，有$x = f(x) \sqsubseteq f(y)$，故$f(y)$是Y的上界，有$y \sqsubseteq f(y)$。任取$z \in [y, \top]$，有$y \sqsubseteq f(y) \sqsubseteq f(z)$，故可以将f限制在$[y, \top]$上。此时应用上述lfp的存在性证明，可得$[y, \top]$中的最小不动点v，有$v \in P$，且由于v是最小不动点，对于P中任意Y的上界m，m在$[y, \top]$中，故$v \sqsubseteq m$，v为Y在P中的上确界。

同理可证任意子集Y在P中有下确界，故P构成完全格。

## Related

-  [Lambda calculus引论(二): 不动点](https://zhuanlan.zhihu.com/p/25674637) 参考，但是需注意Tarski定理的部分证明有误