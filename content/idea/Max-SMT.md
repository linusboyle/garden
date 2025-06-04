---
title: Max-SMT
date: 2020-01-01
tags: 
---

# Max-SMT
Max-SMT is a generalization of SMT. it consists in, given a weighted formula where each clause has a weight (a positive number or infinity), finding the assignment such that the cost, i.e., the sum of the weights of the falsified clauses, is minimized. Clauses with infinite weight are called _hard_, while the rest are called _soft_. Equivalently, the problem can be seen as finding the model of the hard clauses such that the sum of the weights of the falsified soft clauses is minimized.