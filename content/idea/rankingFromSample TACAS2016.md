---
title: rankingFromSample TACAS2016
date: 2020-10-20
tags: 
aliases:
---

# rankingFromSample TACAS2016

这篇文章为每个loop分别寻找[[ranking function|ranking function]]，迭代算法（算法2）如下：

在每次迭代中，通过safety check寻找不满足当前ranking的**终止**执行。如果safety check失败，则得到一个终止的trace反例。用这个反例精化当前的ranking，然后重复上述过程。如果safety check通过，有两种可能：

1.  程序确实是终止的，且当前的ranking是valid的
2.  程序终止的那部份可以用当前的ranking刻画，但是还存在不终止的trace。

![[419290_1_En_4_Figb_HTML.gif]]

因此，在算法2最后，还需要检查得到的ranking对整个loop是否是valid的，这也是通过safety check完成。 

两次safety check有细微但是很重要的区别：

*   当用于找出终止的反例时，断言在循环之外，表明反例必然是终止的；（getTerminatingTrace）

![[419290_1_En_4_Fig6_HTML.gif]]

寻找不满足当前终止性论据rank的**终止的**反例，断言在最后使得反例必须终止

*   当用于验证ranking时，断言在循环体内，此时反例要么代表非终止的trace的前缀，要么代表不满足当前ranking的终止trace（但这已经被算法2排除）。(isRankingFunction)

![[419290_1_En_4_Fig5_HTML.gif]]

验证ranking function的程序变换（每次循环递减，且永远为正）

* * *

> We use a safety verifier to systematically sample terminating program executions and extrapolate from these a candidate ranking function for the program, or to otherwise provide a witness for program non-termination. [原文](https://link.springer.com/chapter/10.1007/978-3-662-49674-9_4#annotations:_HsUdJKdEeueQ9MZovLkgA)

> A loop is a strongly connected component of the CFG with a single entry node h called loop header [原文](https://link.springer.com/chapter/10.1007/978-3-662-49674-9_4#annotations:AIz9TJKzEeu1G-vpiCETzQ)

> initially, isLoopTerminating assumes that all program states within the loop are non-terminating and looks for a counterexample, that is, a terminating trace β [原文](https://link.springer.com/chapter/10.1007/978-3-662-49674-9_4#annotations:6sNxSpK2Eeu7DocJmRgERg)

> isLoopTerminating might also not terminate (cf. Line 4). [原文](https://link.springer.com/chapter/10.1007/978-3-662-49674-9_4#annotations:PBvrqJK3EeuSWg8u1DQUGQ)

> The function getCandidateRankingFunction uses the terminating traces collected by getTerminatingTrace to extrapolate ranking function pieces which are combined into a candidate loop ranking function. We only consider affine pieces [原文](https://link.springer.com/chapter/10.1007/978-3-662-49674-9_4#annotations:vNVHyJK6EeudF8OsceuQ1w)

> We extrapolate an affine ranking function piece from terminating traces mapping the initial states of these traces to the number of loop iterations needed for termination, and then finding an affine ranking function which fits these bits of information [原文](https://link.springer.com/chapter/10.1007/978-3-662-49674-9_4#annotations:qBC_VpK7Eeu8HUMTQAhfhg)

> When the system is unsatisfiable, we discard all collected states and we start over by building a new ranking function piece [原文](https://link.springer.com/chapter/10.1007/978-3-662-49674-9_4#annotations:I4uUvJK8EeuLSau3Z2xM4g)

> strictly decrease a max combination of ranking functions by strictly decreasing all its pieces: [原文](https://link.springer.com/chapter/10.1007/978-3-662-49674-9_4#annotations:Xl_23JK8Eeu1ZVszrFEtZg)

> a max combination of ranking functions is negative when all its pieces are negative: [原文](https://link.springer.com/chapter/10.1007/978-3-662-49674-9_4#annotations:YQB6sJK8EeuZMvvvZPLOBA)

> are negative (and, unlike in the lexicographic combination, are never reset). [原文](https://link.springer.com/chapter/10.1007/978-3-662-49674-9_4#annotations:p35drJK-EeuShidYt5k9uQ)