---
date: 2024-04-05
tags:
  - idea
see also:
  - "[[memory consistency model|WMM]]"
  - "[[SC declarative model]]"
  - "[[release-acquire memory model]]"
aliases:
  - SC-per-location
  - COH
---

![[Pasted image 20240405213159.png]]

COH除了硬件提供的最基础保障外没有任何约束（See [[cache coherence]]），即对于每个位置而言，其上的内存操作符合 [[Sequential Consistency|SC]]。但是coherence的限制过于弱。

![[Pasted image 20240405211746.png]]

等价地，使用per-location [[program order]] 和 [[modification order]]定义：

![[Pasted image 20240405212734.png]]

或者通过穷尽bad pattern：

![[Pasted image 20240405213227.png]]

## Related

- [[memory consistency model|WMM]]