---
title: closed recurrence set
date: 2025-08-31
tags:
  - 非终止性分析
aliases:
  - closed recurrent set
---

# closed recurrence set

一个closed recurrence set G(s)是一组状态的集合，满足：

1.  $\exists s, G(s) \land I(s)$
2.  $\forall s \exists s', G(s) \implies \rho(s, s')$
3.  $\forall s \forall s', G(s) \land \rho(s, s') \implies G(s')$

其中，$\rho$是状态间的变迁关系。

直观上说，closed recurrence set保证循环的所有后继状态都仍在其中。如果程序是确定的，那么和open recurrence set是等价的。但是若有不确定的执行，那么closed recurrence set 的存在性是更强的条件。

运用于[[nontermination via safety|nontermination via safety]]：对程序P，其有recurrence set，当且仅当存在一个下近似P'有closed recurrence set.