---
title: Kripke Structure to Büchi automata
date: 2021-01-20
tags: 
---

# Kripke Structure to Büchi automata
Consider a [[Kripke Structure]] K = (AP, W, W0, R, l). We construct an NBA AK such that AK accepts a computation $\pi \in (2^{AP})^\omega$ iff π is a computation of K. The construction of AK essentially moves the labels of K from the states to the transitions. Thus, AK = $(2^{AP}, W, W0, δ, W)$, where for all w ∈ W and σ ∈ $2^{AP}$, we have:

if $\sigma = l(w)$ then

$$ \delta(w, \sigma) = \{w' : R(w, w')\} $$

else $\delta(w, \sigma) = \emptyset$