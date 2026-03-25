---
title: nested word automata
date: 2020-01-20
tags: 
aliases:
---

# nested word automata
A nested word automaton (NWA) A over an alphabet $\Sigma$ is $(Q, Q_i, \delta, Q_f)$ where $\delta$ is a triple consists of

*   $\delta_c \subseteq Q \times \Sigma \times Q$, the transition relation of call position
*   $\delta_i \subseteq Q \times \Sigma \times Q$, the transition relation of internal position
*   $\delta_r \subseteq Q \times \times Q \times \Sigma \times Q$, the transition relation of return position

a run of a [[nested word|nested word]] nw ($a_1 \cdots a_k$, v) is a sequence $q_0 \cdots a_k$ such that $q_0 \in Q_i$ and for 0 < i <= k

*   if i is a call position, $(q_{i-1}, a_i, q_i) \in \delta_c$
*   if i is a internal position, $(q_{i-1}, a_i, q_i) \in \delta_i$
*   if i is a return position, $(q_{i-1}, q_j, a_i, q_i) \in \delta_r$, where v(j, i) holds

the run is accepted if $q_k \in Q_f$. the language of A, L(A), is the set of accepted nested word.

A language L of nested word is **regular** if there is a NWA A such that L = L(A)

## Related

- [[ω-automata]]