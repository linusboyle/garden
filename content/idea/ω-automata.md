---
title: ω-automata
date: 2021-01-20
tags: 
aliases:
  - omega automata
---

# ω-automata
Omega自动机的定义、运行和格局的定义和FA基本一致，不同之处是，在Omega自动机中，run是无限长的路径，且一个run的接受条件不是看其是否终止在终止状态。具体的各种Omega自动机接受条件不同，这也是它们之间惟一的不同之处。

> an **ω-automaton** (or _stream automaton_) is a variation of finite automata that runs on infinite, rather than finite, strings as input. Since ω-automata do not stop, they have a variety of acceptance conditions rather than simply a set of accepting states. [ω-automaton - Wikipedia](https://en.wikipedia.org/wiki/Ω-automaton)

几种Omega自动机
----------

对于一个run p，令inf(p)代表p中无限经常出现的状态s的集合（即，存在无限多个整数n，使得p(n)=s）

*   [[Büchi automata|Büchi automata]]
*   [[Co-Büchi automata|Co-Büchi automata]]
*   [[Muller automata|Muller automata]]
*   [[Rabin automata|Rabin automata]]
*   [[Streett automata|Streett automata]]
*   [[Parity accepting condition|Parity accepting condition]]

表达能力
----

*   除Co-Büchi自动机外，各种非确定型的ω自动机接受的都是[[ω-regular language|ω-regular language]]
*   确定型Büchi自动机的表达能力严格弱于非确定型Büchi自动机。
*   其他的确定型Omega自动机和非确定型等价