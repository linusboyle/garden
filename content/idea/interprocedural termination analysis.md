---
title: interprocedural termination analysis
date: 2021-03-12
tags: 
aliases:
---

# interprocedural termination analysis

基本原理
----

本篇文章提出了一种终止性证明方法，通过求解函数实例的终止条件，组合得到程序的终止性。这种方法可以模块化地在实例间复用终止条件，因为**在相同的**调用环境下，实例的终止条件是一致的。

理论上，一个函数在何种输入下终止，是有确定的界限的，但这种条件一般意义下很难求解，所以，通常只能求出其下近似——也就是更强的、**充分的**终止条件，就如在[[termination condition 08|conditional termination 08]]中所做的那样。在[[Proving Termination Through Conditional Termination|conditional termination]]中，虽然求的是_循环的_终止条件，但也一样是下近似。

在这篇文章里，考虑的粒度更大，即以函数实例为单位——不仅仅是单纯的函数本身，因为不同的调用环境下，实例的实际终止条件各不相同；虽然可以统一用函数的终止条件来囊括，但限制具体的调用环境，更容易求出终止条件。

### 框架

本篇文章中，每个实例都关联了四个谓词：

1.  Inv，不变式，即函数体中循环的上近似
2.  Sum，函数执行的效果的上近似，刻画了函数可能的行为
3.  Ctx，函数调用者的上下文信息，可以刻画当前实例允许的输入输出组合
4.  PreCond：实例终止的充分条件

对一个实例f，如果它调用的所有函数h的Sum都已求出，就可以综合出自身的Sum和Inv。而要求h的Sum，需要先从f的Ctx和h调用处的上下文中综合出h的Ctx。最后，要求f的终止条件，需要先求出所有h的终止条件，再结合f的Inv、Ctx和h的Sum综合出f的PreCond。

所以，这些谓词之间是有依赖关系的。大体如下：

![image](interprocedural%20termination%20analysis%201.png)

上标o和u分别表示上近似和下近似。同一个谓词分别求上下近似，是因为最终要求的是PreCond的下近似，但先求出不变式、Sum等的上近似可以提供更多的信息，也利于termination argument的生成。所以，算法整体上可以分成两次对call graph的递归操作：

1.  forward analysis：求出Inv、Sum、Ctx的上近似
2.  backward analysis：求出Ctx的下近似，尝试综合lexicographic ranking function，最后找出Precond

![1_image](interprocedural%20termination%20analysis%202.png)

整体算法

**说明**：

1.  求谓词是二阶问题，这篇文章是用template来表示这些未知的谓词，从而将问题转化为一阶的（求系数）。用一定形式的template来表示谓词，就相当于是选择一个abstract domain。
2.  第11行、第15行都是求下近似。一般来说下近似的抽象方法少，所以这里的方法是通过求$\neg \phi$的上近似，然后取反，得到$\phi$的下近似。这也是常见的一种技巧。
3.  第5行和第12行是在检查当前考虑的函数实例，其上下文是否和之前某个实例相同。如果是的话，那么直接重用上次计算出的Sum和Inv即可，无论上下近似都可。对后向分析来说，还可以重用相同的PreCond。因为有可能重用，Sum和Inv应该和具体的Ctx关联起来。这里的Join操作完成了这一步（实际上是将Sum变为$Ctx \implies Sum$）。