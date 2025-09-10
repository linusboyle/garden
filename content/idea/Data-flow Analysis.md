---
title: Data-flow Analysis
date: 2025-09-09
tags:
aliases:
  - 数据流分析
---

数据流分析的目标是计算在程序的控制流节点（CFG/CFA）处的「数据流事实」(data-flow fact)，这些信息在节点间流动（所以叫数据流），每个节点的信息之间的关系满足data-flow equations，其解可能不惟一，但通常我们希望得到「最精确」的解，即最接近truth的结果。

在理论上，数据流分析的基础可以用[[lattice|格]]理论和[[Knaster–Tarski theorem]]不动点定理来分析。其通常组成为：

- 程序的CFG或者CFA
- 每个控制流节点可能的fact取值形成完全格L，其上的序关系衡量数据流信息的精确程度
- 转移函数f，满足在L上单调。由每个语句对应的转移函数，以及合并算子（join/meet，取决于may/must analysis）组成。合并算子作用于从控制流前驱或后继处传递的信息（取决于是前向分析还是后向分析）。
- 初始条件

[[Knaster–Tarski theorem]]保证了f在L上的lfp和gfp存在。对上近似来说，我们需要的是lfp（最精确），对下近似而言，需要gfp（最精确）。 如果完全格L的高度是有限的，那么可以通过Kleene迭代求得对应不动点。

这种解称为**MFP solution (Minimal/Maximal Fixed-point)**，可能不精确。**MOP Solution（Meet Over All Paths）** 通过计算每条路径的信息，最后合并，因此更加精确，但这通常是不可计算的：

![](Data-flow%20Analysis-20250909111441291.webp)

如果f是分配的，即$f(\bigsqcup P) = \bigsqcup f(P)$，那么MFP和MOP等价。直观上说，此时在控制流交汇处提前应用meet/join不影响精度。

实际上MOP也不是最精确的，因为有些路径可能实际上是不可达的。MRP（Meet Over All Realizable Paths）是更精确的一种表述，但这里的Realizable Path仅关注call-return的配对，也不保证可达。

## Gen/Kill-Style

这种基本的数据流分析包括可达定义分析、活性变量分析、Available Expression分析等等。特点是只关心某些事实的存在与否，即L是一个特定集合（比如变量、表达式）的超集。每个控制流节点的信息可以用bitvector表示。Meet/Join算子就是集合的交/并。

所有Gen/Kill类型的数据流分析都是分配的。