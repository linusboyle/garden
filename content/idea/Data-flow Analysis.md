---
title: Data-flow Analysis
date: 2025-09-09
tags:
aliases:
  - 数据流分析
---

数据流分析的目标是计算在程序的控制流节点（CFG/CFA）处可能存在的「数据流事实」(data-flow fact)，这些信息在节点间流动（所以叫数据流），每个节点的信息之间的关系满足data-flow equations，其解可能不惟一，但通常我们希望得到「最精确」的解。

在理论上，数据流分析的基础可以用[[lattice|格]]理论和[[Knaster–Tarski theorem]]不动点定理来分析。其通常组成为：

- 程序的CFG或者CFA
- 每个控制流节点可能的fact形成完全格L，其上的序关系衡量精确程度
- L上的转移函数f，满足在L上单调。由每个语句的转移函数，以及合并算子（meet/join，取决于may/must analysis）
- 初始条件

[[Knaster–Tarski theorem]]保证了f在L上的lfp和gfp存在。对上近似来说，我们需要的是lfp（最精确），对下近似而言，需要gfp（最精确）。

通过Kleene迭代求得对应不动点，这种解称为**MFP solution (Minimal Fixed-point)**，可能不精确。**MOP Solution（Meet Over All Paths）** 通过计算每条路径的信息，最后合并，因此更加精确，但这通常是不可计算的：

![](Data-flow%20Analysis-20250909111441291.webp)

如果f是分配的，即$f(\bigsqcup P) = \bigsqcup f(P)$，那么MFP和MOP等价。直观上说，此时在控制流交汇处提前应用meet/join不影响精度。特别的，所有gen/kill类型的数据流分析都是分配的。

