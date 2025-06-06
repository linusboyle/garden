---
title: Rabin automata
date: 2021-01-20
tags: 
---

# Rabin automata
the acceptance condition is a set $\alpha = \{<\alpha_1, \beta_1>, \cdots, <\alpha_k, \beta_k>\}$, where $\alpha_i, \beta_i \subseteq Q$

a run is accepting iff there is $1 \leq i \leq k$ such that $inf(r) \cap \alpha_i \neq \emptyset$ and $inf(r) \cap \beta_i = \emptyset$