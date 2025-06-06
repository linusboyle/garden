---
title: LTL translation to Büchi automata
date: 2021-01-20
tags:
---

# LTL translation to Büchi automata
LTL公式 $\phi$ 可以被翻译为一个字母表为 $2^A$ 的 [[Büchi automata|Büchi automata]] $B_{\phi}$。用NBA表示，状态数的下界是指数级，即 $O(2^{|\phi|})$。模型检测手册163页有从LTL到 [[Generalized Büchi Automata|Generalized Büchi Automata]] 的翻译算法，后者可以再翻译为等价的NBA。简单来说，构造的GBA模拟了LTL公式在接受一段前缀后，哪些子公式是成立的。因此，状态集是 $\phi$ 中子公式的最大一致集。