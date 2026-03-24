---
title: programming by example
date: 2020-12-02
tags: 
aliases:
---

# programming by example
原书第七章

PBE definition
--------------

In PBE, the synthesis problem is given by input-output examples (or, more generally, input-output constraints). They specify the behavior of the desired program on a subset of its valid inputs. In the simplest PBE scenario, the specification defines the program’s outputs; in more complex cases, it specifies some properties or constraints on the outputs instead of their precise values.

Input-output examples exhibit several unique properties:

1.  ease of use (for user)
2.  ambiguity : Examples are an **under-specification**: most of the time, there exists more than one program that is consistent with the given set of examples. Thus, we need to find not just _some_ program that is consistent with the spec but the _intended_ one (or semantically equivalent).

Version Space Algebra
---------------------

a data structure called **version space algebra (VSA)** allows to represent potentially exponential program sets in polynomial space and perform various operations on these sets in polynomial time.

Given a DSL $L$, a VSA is a representation of a set $N$ of programs in $L$. The grammar of VSA in BNF is:

$$ N := {P\_1, \cdots, P\_k} | U(N\_1, N\_2, \cdots, N\_k) | F(N\_1, \cdots, N\_k) $$

where $P\_j$ is some program in $L$ and $F$ is a k-ary operator in $L$.

The semantics of VSA as a set of programs is given as follows:

*   $P \in {P\_1, \cdots, P\_k}$ if $\exists j : P = P\_j$
*   $P \in U(N\_1, N\_2, \cdots, N\_k)$ if $\exists j : P \in N\_j$
*   $P \in F(N\_1, \cdots, N\_k)$ if $P = F(P\_1, \cdots, P\_k) \land \forall j : P\_j \in N\_j$

A powerful property of VSA is that ability to quickly perform various set-theoretic operations on them. Like:

1.  intersection of two VSA
2.  VSA clustering. That is, partitioning a VSA into non-intersecting sub-VSAs based on the output of the represented programs on certain input `a`
3.  finds the topmost `k` programs in a VSA N with respect to a ranking function `h`
4.  filtering (eliminate all programs in VSA N that does not satisfy a given spec $\phi$)

Following algorithms will use VSA.

deductive-based techniques
--------------------------

algorithms based on the idea of _deductive search_ usually perform better in PBE problem.

### inverse semantics

in this approach, examples $\phi$ are propagated top-down through the grammar from expressions to their subexpressions. Given a spec, we construct fresh specs on subexpressions (which ensures any program with such subexpressions would satisfy $\phi$) and solve recursively.

Construction of subexpression specs depends on the top-level operator F in the desired program. Essentially, we need to **invert** F.

In practice, using a complete inverse semantics for each operator in the grammar may be overly computationally expensive. To mitigate this, the approach uses three key ideas:

use of **witness function** : It returns a subset of the possible inputs that produce the outputs in $\phi$ by employing some heuristics to pick only likely inputs.

per parameter decomposition of inverse semantics. Instead of constructing all subexpression specs at the same time, we construct them one at a time. Thus, Each parameter $E\_i$ of each operator has a corresponding witness function which produce a spec $\phi_i$.

After recursively learned a set of programs on $E_i$, this set is split into subsets based on the outputs of its programs on the inputs in $\phi_i$. After that, the search considers each branch of the case split independently, under the assumption that the desired subexpression $E\_i$ evaluates to the corresponding output.

The overall algorithm relies on the designer-provided witness functions to backpropagate the examples through DSL operators. It use VSA as underlying representation.

### Type-based perspective

In this approach, PBE is interpreted as a **type inhabitance problem**.

two key ideas:

1.  it views examples, specs, and constraints on the desired program as type refinement, i.e. types decorated with predicates from a decidable logic. For example, the type ${ν : List(α) | length(ν) = n}$ describes all lists of a fixed length n.
2.  procedures for solving the **type inhabitance problem**, i.e. finding a term that has a given type (which can be viewed isomorphically as refinement type checking)

ambiguity resolution
--------------------

The number of representative input-output examples required to learn a desired program is a function of the underlying DSL, called _teaching dimension_ of a DSL.

As DSL becomes more expressive, the number of representative examples needed to discriminate the programs in the DSL also increases.

### ranking

The main idea of ranking is to assign a likelihood score to each program

machine learning based technique can be used to automatically learn a ranking function (over syntactic program features).

### active learning

the active learning approach asks users for minimal number of additional input-output examples.

**Distinguishing inputs** in [[程序综合的一般原则]] is one form of active learning which solicits additional feedback from the user to initiate a new round of learning

Other user interaction models includes:

1.  Displaying the program to the user, who manually checks it
2.  Paraphrasing the program in natural language
3.  Accepting negative examples, which indicate a discrepancy but do not provide the correct output for it

Not only finding an optimal teaching sequence is NP-hard in general, it also has not yet been computed or bounded for most non-trivial languages used in program synthesis. Nevertheless, active learning based approaches tend to converge quickly to the right solution.