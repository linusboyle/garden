---
title: ranking function for bound
date: 2021-01-20
tags: 
aliases:
---

# ranking function for bound
[[SPEED Symbolic Complexity Bound Analysis|SPEED: Symbolic Complexity Bound Analysis]]:

> It is possible to obtain bounds from certain kind of ranking functions given the initial state at the start of the loop. However, the ranking function abstraction is sometimes too weak to compute precise bounds.

ranking function从本质上，只保证了loop或者transition的终止性。它可以作为bound，但不保证精确性。在某些情况下，精确的bound可以用表达式表达，但却不是[[ranking function|ranking function]]，比如bound是常数的情况。