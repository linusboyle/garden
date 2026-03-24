---
title: CBMC Intermediate representation GOTO program
date: 2024-04-07
source: "[[CBMC 内部树状数据结构表示]]"
tags:
  - extracted
  - cbmc
see also:
---

### Intermediate representation: GOTO program

The intermediate representation obtained after conversion from symbol tables is of type `goto_functionst`, containing a map from a function name to a `goto_programt` instance.

A `goto_programt` contains several instructions (of type `instructiont`), which in turn has  **guard, code, and target**. Compound statements are transformed into simple instruction at the conversion steps and the instructions are assignments, goto's .etc.

> As a reminder, instructions are composed of three subcomponents:
> 
> - An instruction type,
> - A statement (denoting the actual code the instruction contains),
> - An instruction guard (an expression that needs to be evaluated to `true` before the instruction is to be executed - if one is attached to the instruction).
