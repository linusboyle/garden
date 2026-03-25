---
title: Termination CAV14
date: 2020-12-15
tags: 
aliases:
- Termination Analysis by Learning Terminating Programs
---

# Termination CAV14

基于[[trace abstraction|trace abstraction]]的termination analysis（[[Ultimate]]）


基本原理
----

将程序视为黑盒，从中获取若干的[[program trace of statements|trace]]。

每个抽样出的trace对应一个lasso结构的程序。如果可以为此简单形式的程序找到termination argument并证明（一部分方法见[[ranking function|ranking function]]），则找出此证明适用的其他trace，并用程序表示之。这种共享同一个termination argument的trace的集合（有相同的终止证明），就是一个module。

用若干module去覆盖原始程序的所有trace，如果可行，则证明了原始程序是终止的。

形式化
---

[[基于trace的程序建模|基于trace的程序建模]]是由有限种的语句组成的。这些语句可以视为是一个字母表，即将statement当成是letter。**w-trace**是在这个字母表上的无穷串（后称trace）。

> 注意：因为trace只和程序的语句有关，所以一个程序的trace可能在**语义上**是走不通的，即程序里不存在和trace对应的路径。见下面的解释

trace虽然本身是无穷的，但可能语义上是终止的，即可能出现两种情况：

1.  有一个有限长的前缀没有可能的执行路径，比如$(x<0;x=1)^w$
2.  虽然所有有限长的前缀都是可能的，但没有初始状态可以无限执行这个trace。比如$(x>0;x--)^w$

> 语义的定义比较传统，状态就是变量的valuation，每个语句都有前置/后置条件间的关系，按照霍尔逻辑来定义语句的执行

一个程序用CFG表示，节点是Location，边则用上述的字母表标识，有一个初始的节点。如果其所有trace都是终止的，称程序是终止的。

Module
------

Module是有一个惟一终止状态，且满足下列条件的程序：

> 这个程序是lasso形的。更形式化地说，就是CFG可以被划分成两部分U和V，初始状态在U里，终止状态在V里，且V不能转移到U（U可以转移到V）

Module也有trace,其中的一部分无限经常地经过终止状态。称这样的trace是**fair**的。

Module是终止的，只需要所有fair的trace是终止的。因此，Module可以看成是有公平性约束的程序。

例：

![[image 2020-12-15-21-12-44.png]]


Module终止性的证明
------------

要证明Module是终止的，一样可以用[[ranking function|ranking function]]，但因为module的公平性性质，实际上用到的ranking function不需要每次循环（或固定步长）都递减。只需要要求在每一次经过终止状态的时候，f都是递减的即可。形式化定义见paper

作者证明了，只要能找到f，则module是终止的。剩下的问题是验证f是ranking function

### 验证ranking function

这里用的是`rank certificate`，一种`Floyd-Hoare`风格的标记。

基本思想是：引入一个oldrnk变量，记录上一次经过终止状态时f的值。然后，找到一个映射I，为每一个CFG节点映射一组谓词。对这一映射的要求大体上就是，转移对应的三元组要满足霍尔逻辑，但有两个特殊之处:

1.  初始状态对应的谓词中，oldrnk初始化为无限大
2.  终止状态对应的谓词必须能推出$f(v) < oldrnk$，即f递减
3.  从终止状态出发的转移，将oldrnk置为f(v)

具体的看paper

例：

![[image 2020-12-15-21-26-42.png]]

有ranking function, 被标注的module称为是_certified module_(一种[[Floyd-Hoare Automata|Floyd-Hoare Automata]])

找到rank certificate的方法，可以是将module视作是普通的命令式程序，利用静态分析来求解，也可以利用生成ranking function时产生的supporting invariant来构造。

module的生成
---------

虽然上面的方法可以验证f，但f本身并不好找。

文中的策略是，先为一个单独的trace对应的module找到termination argument，然后再找它能适用的更广的module，而不是反过来为module找argument。

假设有一个lasso形式的trace，要将它转换成module是trivial的

![[image 2020-12-15-21-31-52.png]]

这种module可以被看作是有一个惟一循环的程序。可以用已有的一些[[程序综合|Program Synthesis]]办法来生成f。得到f后，将其验证，得到一个certified module.

然后，应用下面两条规则来构建新的module（包含更多trace）：

1.  将有相同标记的状态合并

![[image 2020-12-15-21-39-43.png]]

检查程序被module覆盖的方法
----------------

因为实际上module是Buchi自动机的特例（只有一个终止状态），而程序可以视作是所有状态都是终止状态的Buchi自动机。在这两种情况下，Buchi自动机接受的串，也就是语言，都对应一个trace。

所以，要证明程序的所有trace都被分解覆盖，只需证明

$$
L(P) \subseteq L(P_1) \cup \cdots \cup L(P_n)
$$

最终算法
----

1.  检查是否还有trace没被覆盖，如果没有则证明了终止性，否则
2.  将trace转换为简单的module，找_ranking function_，如果找不到，则证明失败（unknown），否则
3.  用f将module标注，并用上述方法将其扩展，得到新的module，将其加入分解中

![[image 2020-12-15-21-48-50.png]]

这里，检查是否还有trace没被覆盖， 是通过算BA的差实现的。这可以转换成将已有的module求补，然后和程序求交，检查其非空性。因为BA求补很困难（见[[Büchi automata|Büchi automata]]），这一步是算法的瓶颈。