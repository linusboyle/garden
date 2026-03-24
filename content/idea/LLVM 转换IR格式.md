---
title: LLVM 转换IR格式
date: 2022-11-02
tags: 
aliases:
---

# LLVM 转换IR格式

[第5章 LLVM中间表示 — Getting Started with LLVM Core Libraries 文档](https://getting-started-with-llvm-core-libraries-zh-cn.readthedocs.io/zh_CN/latest/ch05.html)  
  

> 　　为了让Clang生成bitcode，可以用下面的命令：
> 
> $ clang sum.c -emit-llvm -c -o sum.bc
> 
> 　　为了生成汇编表示，可以用下面的命令：
> 
> $ clang sum.c -emit-llvm -S -c -o sum.ll
> 
> 　　还可以汇编LLVM IR汇编文本，生成bitcode：
> 
> $ llvm-as sum.ll -o sum.bc
> 
> 　　为了将bitcode变换为IR汇编，这是反向的，可以使用反汇编器：
> 
> $ llvm-dis sum.bc -o sum.ll
> 
> 　　llvm-extract工具能提取IR函数、全局变量，还能从IR模块中删除全局变量。例如，用下面的命令从sum.bc中提取函数sum：
> 
> $ llvm-extract -func=sum sum.bc -o sum-fn.bc