---
title: Kripke Structure
date: 2021-01-20
tags:
  - 模型检测
  - 模态逻辑
aliases:
  - Kripke 结构
---

# Kripke Structure
Kripke structures are finite directed graphs whose vertices are labeled with sets of atomic propositions.

formal definition
-----------------

Formally, a Kripke structure over a set A of atomic propositions is a triple K = (S, R, L) where S is a finite set of states (the “state space”), R ⊆ S × S is a set of transitions (the “transition relation”), and the labeling function $L : S \rightarrow 2^A$ associates each state with a set of atomic propositions.

> 在[[模型检测]]中，通常会要求R是total的。

Kripke Structure中的执行是状态的序列，也可以视为是语言为$2^A$的infinite words.

Kripke Structure可以翻译为等价的 [[ω-automata|omega automata]]，见 [[Kripke Structure to Büchi automata]]