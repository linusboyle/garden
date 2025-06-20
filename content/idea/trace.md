---
title: trace
date: 2021-06-20
tags:
---
# trace
definition
----------

assume a fixed set of statements Σ. A trace τ is a sequence of statements, i.e.

$\tau = st_1 \cdots st_n$

for $n \ge 0$ and $st_i \in \Sigma$

如果将$\Sigma$视作字母表，语句st视作letter，则trace就是这个字母表上的word，即$\tau \in \Sigma^{*}$

trace的定义和[[状态|状态]]无关，两者是独立的。当然，对程序而言，其接受的trace集合需要满足语法上一些约束（严格的说是控制流），但和其语义没有关系。只有在进行验证，考虑trace的正确性时时，才考虑trace的语义。

correctness of a trace
----------------------

trace的正确性是语义性质，这需要额外的定义。既然trace是语句的序列，一般用Hoare三元组来定义。

假设有一个预知的三元组的集合，这样的三元组定义了一个单独的语句的正确性。此外，有一对固定的公式$\phi_{pre}$和$\phi_{post}$（取决于具体的验证问题）。一个trace $\tau$是正确的，即$\{\phi_{pre}\} \tau \{\phi_{post}\}$是成立的。

### infeasibility

a trace is infeasible iff {true}$\tau${false}

in other words:

> in whatever valuation of the program variables the execution starts, one of the `assume` statements in the sequence cannot be executed

Thus, infeasibility implies (any) correctness. 这个性质的重要性在于，一般来说，一个[[基于trace的程序建模|程
序]] 如果的确是正确的，那么其正确的、feasible的control flow trace不是regular的。但是，其所有正确的control flow trace（包括infeasible的）是regular的。因此，将infeasible的trace考虑为正确的trace，是验证能够进行的条件。

> 另外，如果程序本身不是正确的，那么即使是其正确的那部份control flow trace也不一定是regular的。
> 
> 关于以上事实可以这么理解：程序被当作自动机的情况下，本身就是有限状态的。所以，如果程序的确是正确的，那么其接受的当然是正规语言，而且其接受的trace里当然也包括了那些infeasible的。

特别的，如果选择$\phi_{pre}$和$\phi_{post}$分别为true和false，则infeasibility和正确性是等价的。比如说，要证明某个error location不可达，则将其设置为程序的终止状态。