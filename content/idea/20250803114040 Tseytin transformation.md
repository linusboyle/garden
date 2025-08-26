---
title: Tseytin transformation
date: 2025-08-03
tags:
  - idea
  - zettelkasten
see also:
  - "[[索引]]"
  - "[[2025-08-03]]"
aliases:
  - Tseytin transformation
  - Tseitin transformation
---

一种将公式转换为等可满足 CNF 形式的变换。与直接暴力应用 De Morgan 律和分配律相比（规模为指数），Tseitin transformation 得到的公式规模为线性，但是需要引入额外辅助变量。

基本思想为：

1. 为原公式 P 中的所有子公式 $\varphi$（除 atom 外）引入辅助变量 $x_{\varphi}$，包括 P 本身
2. 得到如下等可满足公式：

$$
x_{P} \land (x_{\varphi} \leftrightarrow \varphi[\psi\backslash x_{\psi}]) \land \ldots
$$

（每个子公式 $\varphi$ 对应一个蕴涵式）

3. 其中每个蕴涵式都可以转换为 CNF 形式，且最多额外引入一个额外的合取项（归纳法易证）

**Example**

![](20250803114040%20Tseytin%20transformation-20250803114648191.webp)

---

## Related

- [[20250613040258 Horn Clause|Horn Clause]] 可以用于将某些非 Horn 子句形式的公式转换为 Horn 形式，需引入辅助谓词
 ![](20250803114040%20Tseytin%20transformation-20250803121628063.webp)