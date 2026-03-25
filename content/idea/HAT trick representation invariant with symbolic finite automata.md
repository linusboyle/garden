---
date: 2024-11-28
tags:
  - idea
see also:
  - "[[索引]]"
  - "[[2024-11-28]]"
---


HAT: Hoare Automata Type

程序是pure的，但是操作effect context（有hidden states）

在不知道context的情况下，可以用trace来表示context（即所有的历史调用）

目标是验证某个表示不变式：如果此不变式成立，在调用某个实现之后，不变式仍然成立。我们不知道使用的接口的具体实现，但是知道一些它们满足的条件（比如read返回最近的write的值）