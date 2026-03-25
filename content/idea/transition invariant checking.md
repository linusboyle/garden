---
title: transition invariant checking
date: 2021-01-20
tags: 
aliases:
---

# transition invariant checking
In order to validate $T_1 \cdots T_k$ as a transition invariant of a loop, that is $R^{+} \subseteq T_1 \cup \cdots \cup T_k$, we can transform the program and check for reachability.

* * *

the original program:

    while c :
        body

* * *

transformed program:

     dup = false;
     while c:
        if dup:
            if not (f1 (x1',...,xn') > f1(x1,...,xn) and f1(x1',...,xn') >= 0):
            ......
                if not (fk(x1',...,xn') > fk(x1, ..., xn) and fk(x1',..., xn') >= 0):
                    ERROR:skip
        if not _dup and *:
            x1' = x1;...;xn'=xn
            dup =True
        B
    

where $f_i$ is the corresponding _ranking function_ of $T_i$