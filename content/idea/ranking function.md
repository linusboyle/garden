---
title: ranking function
date: 2021-06-20
tags:
alias:
- 秩函数
---
# ranking function
A standard and classical technique to prove the **termination** of a loop is to find a **ranking function**, or _progress measure_ (This technique was originally proposed by Turing.)

> in essence Turing is proposing that we search for a map from the program we are interested in proving terminating into a program known to terminate such that all steps in the first program have analogous steps in the second program. // 2011 review

Such a function maps a program state (a valuation of the variables) into an element of some well-founded ordered set (or a _well-order_), such that the value descends whenever the loop completes an iteration. Since descent in a well-founded set cannot be infinite, this proves that the loop must terminate.

This definition of "ranking function" is very general; in practice, researchers have often limited themselves to a convenient and tractable form of ranking function, so that an algorithm to find the function-if there is one-might be found.

## how it works

Generally, Turing's solution divides the problem into two parts:

1.  Termination argument search: Find a potential termination argument in the form of a ranking function.
2.  Termination argument checking : Proves the termination argument to be valid for the program under consideration, by proving that result of the function decreases for every possible program transition.

The more formal perspective is as follows:

Suppose `(S, >)` is a well-order, f is a ranking function which maps a state of the program to S.

Such function f defines a well-founded relation `T` by lifting `>` to

$\{(s,t) \mid f(s) > f(t) \}$

T is a _termination argument_, which is potential to contain the program transition. To prove the program terminates, we have to verify that $R \subseteq T$, where R is the transition relation of the program.

## Classes of ranking functions

Many forms of ranking functions are proposed. Some classes have complete synthesis algorithm.

### linear ranking function

The most simple well-order is natural number, thus we can use **linear ranking function**, which ranges over natural number. The function is expressed as a linear combination of state variables.

Linear ranking function has a complete synthesis algorithm for loop represented as linear inequalities, using [[Farkas' Lemma]]. (A Complete Method for the Synthesis of Linear Ranking Functions 2004)

It can also be seen as an extra counter variable, which is inited to a large number, and decrease by 1 on each transition of the program. In this setting, we need to prove the counter will not go negative

### lexicographic ranking function

See [[lexicographic ranking function]]

### Ramsey-based termination arguments

a.k.a [[disjunctive well-founded transition invariant]]

* * *

## how to find candidate ranking function

1.  in case of simple forms of ranking function, we have algorithm to synthesize it. In this case, we can synthesize monolith ranking for the whole program, or use it as a build block for complex termination argument.
2.  refinement based technique
3.  constructs an 'almost guaranteed' termination argument directly (using e.g. abstract interpretation), which is then verified to be decreasing.