---
title: vector addition system with states
date: 2025-01-20
tags: 
aliases:
  - VASS
---

# vector addition system with states VASS
A _VASS_ is a finite [directed graph](https://en.wikipedia.org/wiki/Directed_graph) ${\displaystyle (Q,T)}$ such that ${\displaystyle T\subseteq Q\times \mathbb {Z} ^{d}\times Q}$ for some ${\displaystyle d>0}.$

Let ${\displaystyle (Q,T)}$ be a VASS. Given a _configuration_ ${\displaystyle (p,u)\in Q\times \mathbb {N} ^{d}}$, the configuration ${\displaystyle (q,u+v)}$ can be _reached_, in one transition, if ${\displaystyle (p,v,q)\in T}$ and ${\displaystyle u+v\in \mathbb {N} ^{d}}$.

---

- [[vector addition system]]
- [[变迁系统|transition system]]