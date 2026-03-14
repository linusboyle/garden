---
title: GOD is REAL (unless declared INTEGER)
date: 2026-03-14
tags:
  - idea
  - zettelkasten
see also:
  - "[[索引]]"
  - "[[2026-03-14]]"
  - 笑话
alias:
  - GOD is REAL (unless declared INTEGER)
---

在早期的 FORTRAN 标准中，如果没有显式声明一个变量，编译器会根据变量名的**首字母**来自动分配类型：

- **整数型（Integer）：** 凡是以字母 **I, J, K, L, M, N** 开头的变量名，默认被视为整数。
    
- **实数型（Real/Floating-point）：** 凡是以其他字母开头的变量名，默认被视为实数（浮点数）。

笑话由此产生



## Related

- [Gotchas — Fortran Programming Language](https://fortran-lang.org/zh_CN/learn/quickstart/gotchas/)  但实际上在今天这也是默认行为，得显式禁止编译器进行隐式类型推导。