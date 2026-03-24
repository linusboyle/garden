---
date: 2025-01-06
tags:
  - idea
see also:
  - "[[索引]]"
  - "[[2025-01-06]]"
---

[[2025-01-06]] Latest Version of [[Boogie]] Verifier

**执行路径**

BoogieDriver导入参数，ExecutionEngine执行验证任务

ProcessProgramFiles 为单个文件的验证入口

InferAndVerify为不变式生成+验证算法入口

VerifyImplementationWithLargeThread处开始调用VCGenerator接口

在不考虑Split的情况下，SplitAndVerifyWorker的DoWork函数开始进行验证

**数据结构**

Procedure和Implementation分开，规约在Procedure里

Implementation中的语句在语法解析时就被转换成基本块Block，每个Block有若干语句，以及TransferCmd（可能是另一个Block，或者Return）

ConditionGeneration是VC生成算法的抽象类 => VerificationConditionGenerator。剪除回边和passify都是在prepareImplementation中完成