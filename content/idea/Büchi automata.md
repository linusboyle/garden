---
title: Büchi automata
date: 2020-12-17
tags:
  - automata
---

# Büchi automata

Büchi automata are often used in [[模型检测]] as an automata-theoretic representation of a linear temporal logic ([[LTL|LTL]]) formula (see [[LTL translation to Büchi automata|LTL translation to Büchi automata]]).

## Definition

![[image 2020-12-17-11-35-17.webp]]

[[Generalized Büchi Automata]] is a generalized version of Büchi automata:

## Language

Nondeterministic Büchi automata recognize [[ω-regular language|ω-regular language]], but deterministic Büchi automata is weaker. 

An [[ω-language]] is recognizable by a deterministic Büchi automata if it is the **limit language** of some regular language. See [Büchi automaton - Wikipedia](https://en.wikipedia.org/wiki/Büchi_automaton) for proof.


## Closure Properties

The set of Büchi automata is **closed under union, concatenation, intersection and complement.**

- union is trivial

- intersection: 和FA不同，简单地构造product automaton是不对的。在传统的构造中，终止状态是 $F_1 \times F_2$，隐含了一个条件，即输入串在 $A_1$ 和 $A_2$ 中的run同时终止在接受状态。这在字符串有限时是没有问题的，但是对于一个infinite word，它在两个Buchi自动机中的run可能是在不同位置经过接受状态的，因此不能简单算积。 
![[image 2020-12-17-13-48-04.webp]]
 上面的构造方法相当于是有两份product automaton的copy。

- concatenation: 将FA C和Büchi自动机 A按照一般方法拼接
	*   转移 $$ \Delta ^ { \prime } = \Delta_{ A } \cup \Delta_{C} \cup {\left( q , a , q ^ { \prime } \right) \mid q ^ { \prime } \in I _ { A } \land \exists f \in F _ { C } , \left( q , a , f \right) \in \Delta _ { C } } $$
	*   初始状态：如果C不接受空串，$I' = I_C$，否则 $I' = I_C \cup I_A$

- complement: NBA求补很困难. [这里](https://garden.linusboyle.cn/static/dba-complement) 是DBA的求补算法，复杂度 $O(2|Q|)$. 但是正如DFA的求补算法不能用于NFA一样，上述方法不适用NBA

we can construct a Büchi automata A for a FA C such that $L(A) = L(C)^\omega$.

![[image 2020-12-17-14-01-15.webp]]