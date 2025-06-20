---
title: Floyd-Hoare Automata
date: 2021-06-20
tags:
---
# Floyd-Hoare Automata
有限状态自动机$A = (Q, \delta, q_0, F)$如果满足：存在一个映射I，使得$q \in Q$被映射为断言$\phi_q$，且有：

1.  $(q, st, q') \in \delta \implies \{\phi_q\} st \{\phi\
_{q'}\}$
2.  $q = q_0 \implies \phi_{pre} \models \phi_q$
3.  $q \in F \implies \phi_q \models \phi_{post}$

则A是Floyd-Hoare Automata. 映射I称为annotation

Floyd-Hoare Automata 只接受正确的trace