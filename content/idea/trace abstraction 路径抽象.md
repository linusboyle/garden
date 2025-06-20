---
title: trace abstraction 路径抽象
date: 2021-06-20
tags: 
---

# trace abstraction 路径抽象
trace abstraction是一种程序验证的方法。程序正确性的定义见[[基于trace的程序建模|基于trace的程序建模]]。因为程序的自动机解释，可以将验证视作语言的包含关系检查$L(P) \subset {correct \quad traces}$

一般来说，所有正确的[[trace|trace]]组成的集合不是regular的（有限或[[ω-regular language|ω-regular language]]）。但是对每一个正确的程序P，都存在一个有限状态自动机A，其语言是P和所有正确trace的语言的插值，即：

$L(P) \subseteq L(A) \subseteq {correct \quad traces}$

此时，A是P的一种抽象，但不是基于状态的抽象，而是基于trace的抽象。通过证明A的正确性来证明P的正确性的方法就是trace abstraction

> A总是存在的，毕竟可以取A为P（如果P的确是正确的话）。trace abstraction的方法一般要找不同于P的插值

证明A的正确性，一般通过对A进行标注，从而构建[[Floyd-Hoare Automata|Floyd-Hoare Automata]]来完成。一般地，对比P大的自动机A进行标注是更容易的，且自动机A也更小。

直接计算A，然后为其标注是比较困难的，可以采取用多个Floyd-Hoare Automata的并来覆盖P的所有trace的方法。一般来说，有两种方法：

*   基于P的结构，直接构造出一个分解，然后再分别证明这些分解出的自动机
*   增量式地构造一组自动机，以及它们的正确性证明（比如从单个trace出发）。可以并行，但这样需要额外的包含关系检查，即$L(P) \subseteq L(A_1) \cup \cdots \cup L(A_n)$，以及算difference。此时自动机操作的效率至关重要。