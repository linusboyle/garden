---
title: constraint solving based synthesis
date: 2020-11-30
tags: 
aliases:
---

# constraint solving based synthesis
原书第五章的内容

The key idea in applying constraint solving to program synthesis is _encoding both the specification and the syntactic program restrictions in a single formula_ so that any true model corresponds to a correct program.

Basically, the variables in the formula corresponds to a choice of subexpression in the desired program (like production rule in a CFG, for example).

component based synthesis
-------------------------

A classical example of encoding the language and the spec into SAT/SMT constraints directly is _component-based synthesis_. \[\[blafpfwb\]\] use this method when introducing distinguishing input.

In component-based synthesis, our syntactic bias is a library of allowed _components_. Each component is a domain-specific function that may be used in the desired program. Usually there are no syntactic restrictions on their composition.

Assume every program uses all provided components, each exactly once (multiple uses of a component can be achieved by including multiple copies in the library).

![[image 2020-12-03-16-52-45.png]]

to solve the problem, we need to encode that the program :

1.  is well-formed
2.  uses all components according to their semantics
3.  is consistent with the spec

Suppose the spec is a set of examples. For each input and output of a component, we introduce a variable encoding its line number. Also, for every example pair in the spec, we introduce a variable for every input/output of a component, encoding the dataflow.

![[image 2020-12-03-16-53-54.png]]

solver-aided programming
------------------------

the community built several _frameworks_ for representing synthesis problem in a high-level programming language. _solver-aided programming_ augment high-level programming languages with new constructs that require constraint solving to be materialized. See \[\[torlakLightweightSymbolicVirtual2013\]\] for `Rosette`.