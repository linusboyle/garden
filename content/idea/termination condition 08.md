---
title: termination condition 08
date: 2021-03-08
tags: 
aliases:
---

[Proving Conditional Termination](Proving%20Conditional%20Termination.md)

# termination condition 08
2021-03-08 16:58

本篇文章提出的方法旨在寻找程序终止的条件。它是和常规的[[终止性分析|Termination Analysis]]工具一起使用的。当终止性证明工具证明了程序非终止，将返回[[lasso|lasso]]型的反例。这种反例可以被转化为一个初始条件$\theta$和变迁关系$\rho(s,s')$。因为是lasso，变迁关系是单一控制流的。

> 从理论上，可以直接算$wp(\rho,true)$。但是通常，最弱前置条件是难以计算和表示的，对用户而言也不易于理解。从另一个角度，false总是程序终止的一个条件，但它对用户没有用。本篇文章希望找到的是最弱前置条件的下近似（也就是更强），它能够给用户足够的信息。

文章首先提出了从lasso中推断终止条件的简单方法：

![[termination condition 08 1.png]]

1.  在这里，$\rho$首先被加强，使得在之后只考虑从$\theta$可达的状态。
2.  随后，通过量词消去，求出一组**potential ranking function**，也就是有下界但不一定递减的表达式。因为这里的b只和X有关，X'可以被消去（如果是实际的程序，表示成SSA的形式，总是能通过存在量词消去方法将其消去；剩下的表达式有可能是循环头，但也有其他可能，比如返回的lasso中有循环体里的branching）。
3.  对每个PRF，尝试找条件s来加强变迁关系，使得它满足递减的性质，成为严格的[[ranking function|ranking function]]。这一步也是通过量词消去完成
4.  现在，只需要能证明s是循环的不变式。这一步形式上是计算s在$\rho$的传递闭包下的[[weakest liberal precondition]]，实际上用的是abstraction interpretation相关的技术。

上面的方法有一个缺陷：条件s被要求从一开始就成立，即它是位置不变式。但实际上，就循环终止这个目标而言，只需要s最终成立即可，在此之前，可以有有限的前缀不满足s。

文章提出了一种方法来解决。首先观察到，循环终止，意味着到达了一个不满足$\rho$中条件部分（即和X有关，和X‘无关）的状态；如果我们把$\neg r$加到$\rho$上，得到新的循环，那么这个新的循环终止时必然满足r，从而对应着s开始成立，也就是原来的循环终止。所以，如果我们为新的循环递归地寻找终止条件，这些新的终止条件也是原来循环的终止条件。

总的框架如下：

![[termination condition 08 2.png]]

上面这种方法是验证[[temporal liveness property|temporal liveness property]]的标准方法