---
title: Logical Foundations of Example-Driven Specification
date: 2026-05-22
tags: 
aliases:
---

Conjunctive Queries and LTL

Balder ten Cate

## Database Query

Fitting problem: given a set of labeled samples, construct a conjunctive query

sample: the answer tuple

**conjunctive query**: FOL using only existential quantifier and conjunction; Capture the select-project-join queries in SQL

### Most-specific fitting CQ

所有满足约束的CQ（对子集关系）组成凸集。如果满足约束的CQ存在，则一定有极点。（PODS23）

### Query Repair

Given an existing query that does not hold, find the 'closest' that fits the constraints.

different interpretation of 'closeness'

## [[LTL]]

Generate a 'good' set of examples for a given LTL formula.

Full LTL can't be uniquely characterized by finite examples

Fragment: LTL with future and no negation

Every formula in this fragment can be uniquely represented by a finite set of **transfinite** traces, or a finite set of labeled schematic examples.

schematic examples: union-free regular expression over B(AP),  the Boolean combination of some atomic propositions.

The proof is straightforward : for finite traces, LTL language is regular, which is equivalent to a union of the language of a union-free regular expression.