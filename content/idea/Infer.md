---
title: Infer
date: 2025-10-30
tags:
  - tool
aliases:
---

Facebook开源的静态分析工具，从源代码构建时可能的问题见[[编译 Infer]]。二进制文件可以从[Github发布页](https://github.com/facebook/infer/releases)下载。

## 工作流

### Capture

Infer首先需要捕获编译/构建系统的信息，并完成到中间表示的翻译，将其输出到临时的工作文件夹。

```
infer capture -- <command>
```

构建指令可以是针对单个文件，比如`javac`和`gcc`，也可以是项目构建工具，比如`gradle`和`make`。使用`-o`指定输出临时文件夹的路径。

```
infer capture -- gcc hello.c
```

```
infer capture -- make
```

### Analysis

```
infer analyze
```

**分析器**

- Pulse：通用内存检查（空指针解引用，双重释放等），代替biabduction，底层是错误分离逻辑。Pulse是Infer的默认分析器
- InferBO：检查数组越界/缓存区溢出
- Cost：渐进复杂度分析/上界分析/资源分析
 > Cost analysis statically estimates an upper bound on the worst-case execution cost of a program (WCET).
- RacerD：检测数据竞争
- Liveness：传统的数据流分析（死代码、未使用变量检测等）
- Topl：简单的时序性质检测
```
property Taint
  prefix "Main"
  start -> start: *
  start -> tracking: source(Ret) => x := Ret
  tracking -> error: sink(Arg, VoidRet) when x == Arg
```

Infer支持增量式分析，只需要先捕获一次整个项目的信息，然后在后续运行时使用`--reactive`选项。

### Report

除了标准输出，可以生成报告

```
infer explore
```

## 语言/构建系统支持

- javac
- clang/gcc （实际总是调用clang）

构建系统

- ant
- buck
- cmake

```
cd build
cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=1 ..
cd ..
infer run --compilation-database build/compile_commands.json
```
- make
- maven

以及

- compilation database

see `infer capture --help`

## 文档

- [infer (infer.infer)](https://fbinfer.com/odoc/1.2.0/infer/infer.html)


## 一些源码的结构

- base/Location：源文件中的位置 source file location
- IR: SIL IR的定义
	- Procdesc涵盖了方法的所有信息

### Pulse Checker

整体是符号执行/抽象解释，维护抽象状态和路径条件等等，不同点是通过bi-abduction，如果前置条件可以通过推导补全出来，则继续执行下去。

- 入口：Pulse.ml -> analyze()
- 初始抽象（前置条件）状态: initial
- Pulse的转移函数: PulseTransferFunctions，通过Functor调用Abs抽象解释组件
	- exec_xxxx系列函数实现符号执行
	- L618: exec_node_instrs
- AnalysisState: 符号执行过程本身的状态（和抽象域的State不同），比如剩余disjuncts数

### 抽象解释

a < b 意味着a蕴涵b（a更强），故抽象域中的bottom是永假，top是永真

抽象域分为NonDisjunctive和Disjunctive两种

符号执行过程类似worklist，只更新delta部分（见L491）

Disjunctive模式下达到上限后，被丢弃的disjunct并入NonDisjunctive状态

## Related

- [[Separation logic and bi-abduction  Infer]]
- [[Incorrectness Logic]] 错误逻辑构成Infer的底层逻辑系统（至少是Pulse的底层）
- [[Incorrectness Separation Logic]]