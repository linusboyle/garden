---
title: Constrained Horn clauses
date: 2025-06-13
tags:
  - idea
  - zettelkasten
see also:
  - "[[索引]]"
  - "[[2025-06-13]]"
alias:
- Constrained Horn clauses
- CHCs
---

# Constrained Horn clauses

带有一阶理论约束的 [[20250613040258 Horn Clause|Horn Clause]]，形如：

$$

\varphi \land P_1(x) \land P_2(x) \ldots \rightarrow P(x)
$$

其中 $P_1, P_2, \ldots P$ 是谓词符号。$P(x)$ 处 (Head) 也可以是约束 $\psi$

## 判定

约束为 [[Presburger arithmetic|linear integer arithmetic]] 的 CHC 可满足性不可判定

## CHC 求解器

- Z3/Spacer
- SeaHorn
- ...