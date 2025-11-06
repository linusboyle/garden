---
title: left-pad
date: 2025-11-03
tags: 
aliases:
---

2016年被删除，导致互联网短暂瘫痪十数分钟的npm包，包本身只有十多行代码：

![](left-pad-20251103171616476.webp)

被用于批评过度依赖模块化编程和整个Javascript生态的问题。


## Related

- 通过数十种方法[[形式化验证]]的leftpad https://github.com/hwayne/lets-prove-leftpad
	- 不过依旧只是相对于规约是正确的，这个项目本身也可以用来说明[[形式化方法]]的基本假设和思路，以及为什么经过验证的项目也有可能出错。详见：
	- [Three ways formally verified code can go wrong in practice • Buttondown](https://buttondown.com/hillelwayne/archive/three-ways-formally-verified-code-can-go-wrong-in/)
	- [Breaking “provably correct” Leftpad - lukeplant.me.uk](https://lukeplant.me.uk/blog/posts/breaking-provably-correct-leftpad/) 对若干实现的测试，并发现涉及Unicode的操作并不保证正确