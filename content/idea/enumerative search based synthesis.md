---
title: enumerative search based synthesis
date: 2020-12-02
tags: 
aliases:
---

# enumerative search based synthesis
原书第四章

* * *

The key idea in enumerative techniques is to first structure the hypothesis space using some metrics such as program size and complexity, and then enumerate programs in the space with pruning to efficiently search for a program that satisfies the specification.

forward enumerative search
--------------------------

suppose the hypothesis space is defined by CFG. The derivations in the grammar G can be enumerated either in a top-down or a bottom-up fashion.

a forward search starts from the inputs (input states) and transforms the states through a series of intermediate states until obtaining the desired output states.

### top-down tree search

![[image 2020-12-02-10-51-00.png]]

The algorithm enumerates the derivations in the grammar and maintains an ordered list of partial derivations P in a top-down manner starting from the start symbol S.

It use ranking function `ranknonterminal` to rank all non-terminals in the current partial derivations, and `rankproductionrule` to rank all rules that expand a given non-terminals

the algorithm prunes the search space by avoiding adding newly expanded programs p0 if p0 is already subsumed by some program that has previously been considered by the algorithm. (This optimization does not greatly reduce the search space in the top-down enumerative strategy because of a limitation that only full derivations can be evaluated for equivalence)

### bottom-up tree search

![[image 2020-12-02-11-05-43.png]]

The algorithm first starts building a set of leaf expressions in the grammar G in the order of their size `progSize`. It then incrementally (by size) builds the set of candidate expressions using the smaller expressions to find one that satisfies the specification.

The key idea in this algorithm is to maintain a semantically unique set of expressions E, i.e. no two expressions e and e0 in E are functionally equivalent with respect to the specification φ. (It allows the bottom-up algorithm to significantly decrease the space of expressions.)

this algorithm typically uses CEGIS to incrementally build the input/output examples. see \[\[blafpfwb\]\]

bidirectional enumerative search
--------------------------------

(In some cases) the search can be performed more efficiently with a _bidirectional search_, where the forward search from the input states is combined with a backward search from the desired output states.

![[image 2020-12-02-11-21-53.png]]

offline exhaustive enumeration
------------------------------

Another interesting, but resource intensive, enumeration technique is to perform an offline exhaustive enumeration of all programs upto a given size. The programs are then evaluated on a large set of pre-defined inputs to obtain a corresponding mapping function from programs to the input-output pairs. Finally, given a set of input-output examples, the programs are retrieved using the mapping function.