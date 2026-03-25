---
title: sygus termination
date: 2021-01-20
tags: 
aliases:
---

# sygus termination
通过SyGus方法高效寻找候选ranking function的方法，验证问题被规约到[[safety property|safety property]]（counter非负）.

idea
----

使用SyGus（见[[程序综合的一般原则|程序综合的一般原则]]）的方法，为（非）终止性分析问题寻找[[ranking function|ranking function]]和[[recurrence set|recurrence set]]。方法是从程序的语法片段中，构建出一个CFG文法G，从中可以采样语句、表达式等。

*   对ranking function，算法从G中迭代地抽取线性（应该可以扩展）表达式，作为循环运行的下界，通过Horn Solver求解safe inductive invariant。
*   对recurrence set，算法从G中迭代地抽取布尔表达式加入循环头（相当于下近似），通过$\forall\exists-$Solver验证是否满足[[recurrence set|recurrent set]]的要求。

下面假定G已经被SyGus的方法抽取出来，具体如何构建文法参考相关的文章。可以把它当作是一个概率分布，从中可抽取各类语法结构。

### termination

在程序中加入了一个计数器变量i，每次转移递减。目标是找到i的一个下界，使得i永远不会变为负，如此可以证明终止性。注意这是一个[[safety property]]，可以用相关的求解器验证，但问题本身是不可判定的，所以Horn Solver不一定收敛。

> 具体来说，safety check的任务是找inductive invariant Inv使得：
> 
> 1.  Init推出Inv：$Init(v) \implies Inv(v)$
> 2.  满足Inv的状态，在转移后依旧满足Inv：$Inv(v) \land Tr(v, v') \implies Inv(v')$
> 3.  Inv和Err是不一致的：$Inv(v) \land Err(v) = \bot$

![[termination-sygus.png]]

下界是从G中不断抽取的。每次抽取完G都会更新，不会重复抽取同一个表达式两次。所以上面的循环是有限步能完成的。

#### lexicographic

也可以用lexicographic的RF，相应的增加counter即可。和lexicographic order对应，每次程序转移，（假设有两个counter i和j）j都会下降，如果到0就重置为Bound里的某个数，i则只有在j归零的时候递减。

此时需要找i的下界、j的下界和j重置的上界。算法相应调整


![[termination-sygus-lexi.png]]

### non-termination

文章中的方法实质是为下近似找[recurrence set](recurrence%20set.md)。因为没有借用[closed recurrence set](closed%20recurrence%20set.md)规约到safety，需要求解$\forall\exists-$公式。目前有一些solver能比较高效的解决这一求解问题。

下近似的方法还是限制循环头和循环体。文章只用到了限制循环头的办法，即加上一些布尔表达式，使得其更强。这些表达式同样是从G中抽样出来的。

不过，和终止性证明里下界可以累积不同，表达式的积累可能导致条件过强而不可达，所以必须对表达式的组合进行遍历，而不仅仅是表达式本身。在算法中用栈进行dfs：

![[nontermination-sygus.png]]

> 文章提到其算法没有提取[lasso](lasso.md)，而是直接进行精化和抽象。如此看来，对复杂控制流的支持关键在于底层的$\forall\exists-$solver的能力。