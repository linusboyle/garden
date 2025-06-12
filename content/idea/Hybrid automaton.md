---
title: Hybrid automaton
date: 2021-11-22
tags:
---

# Hybrid automaton

## Definition

比较general的定义：

![[inline.webp]]

![[Hybrid automaton-20250612233139802.webp]]

离散状态+连续状态

离散变迁发生时，连续状态有一跳变（jump）。离散状态对连续行为有影响（不变式、微分方程），同时连续状态也对离散行为有影响（guard）。

## 性质

The general reachability question for Hybrid Automata is undecidable. This is unsurprising, since introducing metric fluents with arbitrary behaviours into the language results in sufficient expressive power to model Turing Machine computations.

However, under various constraints, Reachability is decidable for several kinds of hybrid system, including _Initialised Rectangular Automata_ [Henzinger, Kopke, Puri, VaraiyaHenzinger et al.1998](https://www.cs.cmu.edu/afs/cs/project/jair/pub/volume27/fox06a-html/node27.html#henzingerdecides) 

## 其它

[[timed automaton|timed automaton]] is a sub-class of hybrid automaton,where all of the variables grow with uniform rate (i.e., all continuous variables have derivative 1)