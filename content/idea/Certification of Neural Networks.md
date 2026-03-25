---
title: Certification of Neural Networks
date: 2023-06-29
tags: 
aliases:
---

# Certification of Neural Networks

![[Pasted image 20230706101707.png]]

e.g. to prove [[Robustness (NN)]] of a network.

For neural networks (which are generally loop-free), it is possible to have both sound and complete certification methods (but these may not scale to realistic networks).

## Incomplete Methods

These methods including convex relaxation, are usually scalable.

### Bound propagation

Starting with pre-condition $\phi$, we push $\phi$ through the NN, computing an over-approximation of the effects of each layer.

This method needs two key parts:

- The convex approximation (i.e. shape): Box, Zonotope, Polyhedra 
- The abstract transformer of the shapes.

A trade-off between approximation and speed exists: transformers for Box are fast, but imprecise, while Polyhedra is more precise but in exponential complexity.

#### Box

![[Box Relaxation]]

#### Zonotope 

![[Zonotope Relaxation]]

#### DeepPoly

![[DeepPoly Relaxation]]

## Complete Methods

### Mixed Integer Linear Program (MILP)

Solving MILP is a NP-complete problem. The general definition of a MILP constraint is:

![[Pasted image 20230706104129.png]]


![[Encoding NN as MILP]]