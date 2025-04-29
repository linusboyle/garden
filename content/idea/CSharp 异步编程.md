---
title: CSharp 异步编程
date: 2025-04-29
tags: []
---

一些重点：

1. 声明函数为async有两个效果：
	1. 允许对Task使用await关键字
	2. 编译器为函数构建自动机，引入overhead。更具体地来说，是根据函数中的await划分片段，使用continuation进行链接，并让当前函数返回另一个Task。
2. 两类不同的应用场景略有差别：
	1. 需CPU算力的操作使用Task.Run在其他线程中进行
	2. 单纯的等待：直接await

底层的Task跟Javascript的Promise差不多，上层的async/await语法糖也类似。