---
title: stochastic search
date: 2020-12-01
tags: 
aliases:
---

# stochastic search
原书第六章

The _stochastic synthesis_ approaches learn a distribution over the space of programs that is conditioned on the specification. The goal of these techniques is to use the learnt distribution to guide the search of programs that are more likely to lead to programs that conform with the specification.

Metropolis-Hastings algorithm
-----------------------------

The key idea of the search algorithm is to first define a `Score` function that assign a cost to every program `e` in the hypothesis space, which captures the notion of **the extent to which e meets the specification φ**. It is supposed that `Score` is proportional to the program distribution `P` (as the requirement of Metropolis-Hastings)

The algorithm performs probabilistic walk in the direction of increasing scores. since the cost function is non-continuous, the algorithm can also move to expressions in the graph with a lower score, with some low probability.

Consider the size of the programs is fixed to a constant `k`, construct a graph consisting of all programs of size `k` in the hypothesis space. The solver picks the first expression e randomly in the graph. It then randomly selects a node ν in the parse tree of e, and **uniformly** replace it with some v', obtaining the mutated program e'.

The Metropolis-Hastings algorithm chooses to make the mutated expression the new candidate expression using the following acceptance ratio

$$ \alpha(e, e') = min(1, Score(e')/Score(e)). $$

Give a specification φ, the size of the desired expression is typically not known a priori. The stochastic solver starts with the program size k = 1 and searches for programs of size k + 1 after each iteration of the Metropolis-Hastings algorithm.

> the algo. is actually Metropolis algorithm, where the proposal distribution is symmetric (we choose to uniformly pick a candidate).

genetic programming
-------------------

The genetic programming algorithms maintain a population of individual programs and use the mutation and crossover operations to generate program variants. A fitness function corresponds to the notion of how well a program satisfies the specification and is used to suitability of different program variants (like `Score` above).

there are four steps:

1.  a set of terminal and function symbols need to be defined.
2.  a fitness measure needs to be defined
3.  we need to define a number of search parameters such as the size of population, number of expressions in a program, probability of crossover, mutation, reproduction, deletion, etc
4.  we need to determine the termination criterion for ending the evolutionary process and returning the resulting program

The genetic algorithm first creates a random population of pro- grams, where each individual program in the population are generated randomly. The fitness of each program in the population is then measured.

*   The **crossover** operation randomly selects two programs from the population (called parents) based on their fitness scores. It then ran- domly selects a node (in the corresponding parse trees) independently from each of the two programs and swaps them.
*   The **mutation** operation randomly selects a program based on the fitness score and selects a node. It then deletes the sub-tree rooted at the selected node and grows a new sub-tree randomly using the terminal and function symbols

> The success of genetic programming based systems crucially depends on the design of a good fitness function

machine learning
----------------

take CFG as example.

the ML system learns weights for different rules (called _clues_) in the grammar to obtain a corresponding probabilistic context-free grammar (PCFG). The PCFG is then used to guide the enumerative search to find the desired program. The weights of different grammar rules conditioned on the input-output examples are trained using a training corpus of input-output examples and the corresponding programs.

the training is done by manually defining (by domain expert) some features of the input/output examples.

drawbacks:

*   designing useful clues (features) manually is a time consuming and difficult task, and requires a lot of domain expertise
*   the framework can not use contextual information about the partial trees (only PCFG)

### neural program synthesis

using deep learning method to solve this problem, we categorize the techniques to two sorts:

*   The neural architectures that perform **program induction** learn a network that is capable of replicating the behavior of the desired program. It does not generate an interpretable model of the learnt program
*   the neural systems that perform **program synthesis** return an interpretable program that matches the desired specification behavior.