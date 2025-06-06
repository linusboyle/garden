---
title: Streett automata
date: 2021-01-20
tags: 
---

# Streett automata
the acceptance condition is a set $\alpha = \{<\alpha_1, \beta_1>, \cdots, <\alpha_k, \beta_k>\}$, where $\alpha_i, \beta_i \subseteq Q$

a run is accepting iff for all $\alpha_i, \beta_i \subseteq Q$, $inf(r) \cap \alpha_i = \emptyset$ and $inf(r) \cap \beta_i \neq \emptyset$