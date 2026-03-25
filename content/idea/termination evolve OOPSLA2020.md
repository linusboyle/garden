---
title: termination evolve OOPSLA2020
date: 2020-12-19
tags: 
aliases:
---

# termination evolve OOPSLA2020 

我们组的工作。增量式终止性分析，基于[[trace abstraction]]和[[Termination CAV14|Termination CAV14]]

目标是在演化程序中重用certified module. 核心算法比较简单，从第二个程序版本开始，首先将上一个版本分解出的module进行变换：

1.  找出module的所有predicate和Hoare三元组
2.  删去用到了不在新版本程序中的自由变量的predicate，以及和它相关的三元组
3.  删去用到不在新版本程序中的语句/基本块的三元组
4.  对新版本程序增加的每一个语句/基本块，遍历predicate对，检查组成的三元组是否valid，若是将其添加到集合里
5.  从目前的predicate和Hoare三元组集合中重建一个certified module

因为predicate只减不增，Hoare三元组可能增加，所以新的module的状态集是原来的子集，但是边可能会增加。

此外，因为在第四步要检查的三元组很多，而且没必要全构造出来。因为这些module最后会用来算difference，所以可以在算difference的时候再根据具体的需求构建这些边。