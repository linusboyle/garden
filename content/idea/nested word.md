---
title: nested word
date: 2020-01-20
tags: 
aliases:
---

# nested word

formal definition
-----------------

a nested word nw over alphabet $\Sigma$ is a pair (w, v), where w is a word of length k for some $k \in N$, and v is a nested relation of width k, i.e. a binary relation over {1, 2, .. , k} such that:

1.  if v(i, j) then i < j
2.  if v(i, j) and v(i, j') then j = j'
3.  if v(i, j) and v(i', j) then i = i'
4.  if v(i, j) and v(i', j') and i < i', then either j < i', or j' < j

A position i in w is referred to as:

*   call position, if v(i, j) for some j
*   return position, if v(j, i) for some i
*   internal position, in other cases

application
-----------

nested word结合了线性的结构，以及纵向的层次结构，因此适合用来建模（进程调用、递归）程序的运行。

此外，也可用于结构化文本的处理，比如XML

operations
----------

*   concatenation: 两个nested word的relation互不影响，可以拼接
*   Kleene Star
*   reverse：将序列和关系都倒置
*   insertion: 将一个nested word插入到另一个nested word的特定位置中。relation需要相应地更改标号