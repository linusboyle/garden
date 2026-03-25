---
title: Termination analysis without the tears
date: 2021-12-15
tags: 
aliases:
---

S. Zhu and Z. Kincaid, ‘Termination analysis without the tears’, in Proceedings of the 42nd ACM SIGPLAN International Conference on Programming Language Design and Implementation, New York, NY, USA, Jun. 2021, pp. 1296–1311. doi: 10.1145/3453483.3454110.

---

## Basic Ideas

Following the framework of Algebraic Program Analysis, the program is represented as a (omega-) regular expression, denoting all control flow [[program trace of statements|trace]] of it. Then the expression is interpreted in an algebraic structure.

- For regular subexpression, the denotation is a [[transition formula]] and operators are interpreted in the usual way (Klenne Star computes a reflexive transitive closure).
- For omega regular subexpression, the denotation is *mortal precondition*, a condition which ensures termination.
	- **choice** is conjunction (mortal on all paths)
	- **concatenation** is [[weakest liberal precondition|weakest precondition]] (a state is mortal only if can reach only mortal states)
	- **w-iteration** computes mortal precondition for a transition formula.
	
The method is sound

## Mortal Precondition Operator

The most important and interesting part is how to define these operators.

### Using Ranking function

There is a complete method for synthesizing linear lexicographic ranking function (LLRF) for transition formulas. Thus a mortal precondition operator can be defined as:

- mp(F) = true if there is a LLRF for F
- mp(F) = $\neg Pre(F)$, otherwise

where pre(F) is the *guard* part of the formula F (containing only unprimed variables).

### Using Overapproximation 

When computing the reflexive transitive closure of a formula (e.g. for interpreting Klenne Star), overapproximation might be needed. Suppose the formula $exp(F, k)$ overapproximates the formula $F^k$, then a mortal precondition operator can be obtained as follows:

$$
mp(F) = \exists F.\forall Var', Var''.k\ge 0 \land (exp(F,k) \implies \neg G)
$$

### Phase Analysis

Computing mortal precondition for a single transition formula is hard. Phase analysis combinator can improves the precison of a given mortal precondition operator by observing and extracting the **phases** in a transition formula.

#### Phase

> For a transition formula F, we say a transition formula *p* is F-invariant, iff $(F \land p) \circ (F \land \neg p) = \bot$.

**Intuitively**, if some transition of F satisfies p, then any subsequent transition F also satisfies p. 

Fix a set of predicate P[^2], we denote the set of F-invariant in P as I(F, P)[^1]. These F-invariant can be used to partition the transition of F into cells. Each of these cells satisfies several F-invariant, and violates others in I(F, P). That is, every cell has the form

$$
F \land (\bigwedge_{p \in X} p) \land (\bigwedge_{p \in I(F,P) \setminus X} \neg p)
$$

where $X \subseteq I(F,P)$

> Since all predicates in I(F,P) are F-invariant, if a computation enters a cell, then all subsequent transition satisfies X as well. So the next cell could only addtionally satisfy predicates in $I(F,P)\setminus X$. Thus, an infinite computation eventually remains in a cell.

#### Phase Transition Graph

A graph with cells and a root `s` as vertices.
- Each cell has a self-loop, labeled by the cell's transition formula
- if $F_i \circ F_j$ is satisfiable, then there's an edge from $F_i$ to $F_j$, labeled by `1` (or $\varepsilon$)
- There's edge from `s` to every unreachable cell, labeled by `1` (or $\varepsilon$)

![[Pasted image 20211215174646.png]]

**How to construct phase transition graph from transition formula**

The following algorithm first computes F-invariants, and partition F to several cells by checking satisfiability and selecting models. Then the graph is constructed by checking each pair of cells.

![[Pasted image 20211215175015.png]]

#### Phase Analysis Combinator

Having the [[#Phase Transition Graph]], we compute the mortal precondition of root `s` by the normal algebraic program analysis method (regarding the graph as regular expression and interprecting it using a *given* mortal precondition operator)

we write $mp_{Phase(P, mp)}$ for the new operator, using predicate set P and operator `mp`


[^1]: Checking if a predicate is a F-invariant can be done by [[SMT|SMT]] solver.
[^2]: For example, (in)equality predicate $x \triangleright x'$

### Other combinators

Suppose that mp1 and mp2 are mortal precondition operators. Then we can combine mp1 and mp2 into a single mortal precondition operator.

$$
(mp_1 \bigotimes mp_2)(F) = mp_1(F) \lor mp_2(F)
$$

and

$$
(mp_1 \ltimes mp_2)(F) = mp_1(F \land \neg mp_2(F))
$$

**Note**: In the latter case, $mp_2(F)$ is always included in the result. It just ask $mp_1$ to compute mortal states for those not handled by $mp_2$