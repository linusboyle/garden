---
title: Perennial
date: 2026-02-02
tags: 
- paper
aliases:
---

SOSP'19 Verifying concurrent, crash-safe systems with Perennial

基于Iris风格的并发分离逻辑，对并发系统的崩溃一致性进行验证的证明系统。

- Specification: Perennial的规约是系统的抽象/逻辑[[变迁系统]]，正确性表示为系统的具体实现与规约间的抽象精化关系（在本文中，使用forward simulation进行证明）。见下图

![](Perennial-20260202175823190.webp)

值得注意的是，在抽象层，崩溃也被建模为一个变迁；对应于实际系统的崩溃+恢复。

- 本文扩充了以下capabilities:
	- 首先，Perennial从CHL处继承了[[persistent invariant|crash invariant]]的概念，将其定义为一个特殊的Iris Invariant。崩溃后恢复例程保留此不变式，丢失其他所有资源。
	- Versioned Memory：Iris没有丢弃capability的方式，故这里给所有capability加上版本号（其实就是类似era）。每个霍尔三元组都和特定的版本号相关，版本更旧的capability在证明中不起作用。崩溃后版本号+1。我理解这就是为了在崩溃时“丢弃”资源而设计的。
	- Recovery Lease：由于Iris中capability不能在多个invariant中[^1]，故在[[persistent invariant|crash invariant]]中的capability不能用在诸如锁不变式中。解决方案是引入lease。lease只给出修改当前版本号的权限，而master copy可以在崩溃后使用。
	> “We solve this problem using recovery leases. We split every durable capability d[a] → v into a new lease capability lease_n(d[a], v) and a master copy d[a] →n v.” (Chajed 等, 2019, p. 250)  
	- recovery helping: “To formalize this intuition, Perennial introduces the notion of recovery helping, where recovery completes the operation of a thread running prior to the crash.” [^2] 在[[persistent invariant|crash invariant]]中会存储抽象状态正在执行的操作，恢复例程证明其回完成这一操作。


最后，Perennial需要完成的证明目标是：

![[Perennial-20260203144009624.webp]]

AbsR是抽象精化关系


## Related

- [[Crash Consistency|Crash Safety]]

[^1]: 因为不能重复，对应于分离逻辑是[[Substructural Logic]]

[^2]: 来自[[Non-blocking Algorithm]]
