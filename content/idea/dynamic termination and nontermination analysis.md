---
title: dynamic termination and nontermination analysis
date: 2021-01-20
tags: 
aliases:
---

The tool [[dynamite]] use dynamic analysis for (non)termination analysis in a data-driven learning fashion.

优势：

*   支持复杂控制流、非线性程序等

缺点：

*   执行慢
*   随机性强；若缺少数据，则容易过拟合。

snapshot
--------

需要从程序中抽样trace，难点在于如何抽样可能终止的执行。

解决方法：设置循环上界，截断程序。具体做法是用counter变量记录循环次数，到达上界后即abort。每次进入循环，都将当前状态（变量的值）记录，称为snapshot。

![[dynamite-instrumentation.png]]

以上的程序变换对每个循环L都会进行。从这个变换后的程序的某个输入开始执行，在执行中记录snapshot，就得到一个样本。在后面的算法中，一次只处理一个循环，这些样本会被map到每个循环L，即只关心和L有关的部分。

map后的执行被划分为三类：

1.  base：没有进入循环L
2.  term：进入循环L，最后终止
3.  mayloop：进入循环L，在到达上界之前尚未终止。

termination
-----------

终止性分析的部分采用的是找Ramsey based [ranking function](ranking%20function.md)的方法。得到一组RF之后，可以通过变换，用可达性分析的方法验证其正确性([transition invariant checking](transition%20invariant%20checking.md))。关键在找RF。

![[dynamite-termination.png]]

算法是在迭代中不断地累积RF。如果当前的RF还不足以证明终止性，则用反例重新生成一组新的样本。

**如果无法证明L是终止的，会返回过程中累积的mayloop样本。**

### InferRF

从样本中生成RF，即InferRF。首先，对每个样本，按照时间顺序找出所有的snapshot对（即s -> s', s在s'之前），随机打乱后，抽取前K个，作为tcTrans。

之后会生成RF的template（线性的），每次抽取一个snapshot对t1, t2，要求满足template从t1到t2是递减的，且在t1是有界的即可，用SMT解之，得到参数的值。（相当于找到了局部的RF，但不一定满足全局下降）得到一个RF的实例之后，就将所有满足这个RF的snapshot对删掉。

nontermination
--------------

非终止性分析的部分找的是[closed recurrence set](closed%20recurrence%20set.md)。采用的是不断精化的方法。维护一组候选CRS的栈，最开始push循环头以及从输入样本中infer的CRS

> 用CRS而不是RS是为了避免找反例时解$\exists\forall$约束

![[dynamite-nontermination.png]]

每次迭代，先验证候选的CRS是否正确。若否，则精化一组新的候选CRS，作法是

### RefineRS

将当前错误的CRS分为合取支，其之所以错误，一定是至少有一个合取支不满足CRS的定义3。用SMT找出这样的合取支Ri，从而找出对应的输入。

用这些输入重新采样，从term的样本中推断终止条件，将其取反并和原来的CRS组合成新的CRS候选；再从mayloop的样本中推断非终止条件，也将其加到CRS中。

### DynInfer

从样本中推断相应条件，用的是dynamic invariant inference工具。

非终止性证明有深度限制，**如果证明非终止性失败，累积的终止样本也一同返回。**

总算法
---

终止性和非终止分析之间可以相互协同。终止性失败，会返回可能不终止的样本；非终止性失败，会返回终止的样本。

一开始会先随机选择输入，然后对循环进行后序遍历，即最深的循环先被分析。一个heuristic：如果样本中mayloop的比例远大于其他，即先尝试非终止性；否则先进行终止性证明。