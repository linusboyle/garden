---
title: LTL model checking
date: 2024-03-05
tags:
  - idea
see also:
  - "[[模型检测]]"
---

# LTL model checking
decidability
------------

finite state system is decidable. But, LTL model checking for infinite state system is undecidable.

automata-theoretic approach
---------------------------

对[[Kripke Structure|Kripke Structure]] K和LTL公式$\phi$，如果将其都翻译为NBA，可以通过检查$A_K \subseteq A_{\phi}$解决。但是NBA求补很困难，更佳的方法是检查$A_K \cap A_{\neg \phi} = \emptyset$（LTL公式的否定容易求）

因为$A_K$所有的状态都是接受的，所以在求交时，只需要算product automaton即可。自动机的大小是$O(|K| \times 2^{|\phi|})$，这也是这种模型检测方法的复杂度（非空性判定是线性的），实际中主要是K的大小影响效率。

LTL翻译见[[LTL translation to Büchi automata|LTL translation to Büchi automata]]，Kripke Structure翻译见[[Kripke Structure to Büchi automata|Kripke Structure to Büchi automata]]