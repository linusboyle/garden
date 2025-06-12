---
title: timed word
date: 2021-10-13
tags:
---

# timed word
> In [[模型检测|model checking]], **timed word** is an extension of the notion of words, in which each letter is associated with a positive time tag. The sequence of time tag must be non-decreasing, which intuitively means that letters are received. 
> 
>
 For example, a system receiving a word over a network may associate to each letter the time at which the letter is received. The non-decreasing condition here means that the letters are received in the correct order.
> 
> A **timed language** is a set of timed words.

Given an alphabet _A_, a timed word is a sequence, finite or infinite ${\displaystyle w=(a_{0},t_{0})(a_{1},t_{1})\dots }$ with ${\displaystyle a_{i}\in A}$，${\displaystyle t_{i}\in \mathbb {R} _{+}}$ with ${\displaystyle t_{i}\leq t_{i+1}}$ for each integer $i$.

If the sequence is infinite but the sequence of ${\displaystyle (t_{0})(t_{1})\dots }$ is bounded, then this word is said to be a **Zeno timed word** in reference to the [Zeno's paradoxes](https://en.wikipedia.org/wiki/Zeno's_paradoxes) where an infinite number of action occurs in a finite time.

**Untimed** $w$ is the word $w$ without its time stamps, i.e. it is ${\displaystyle a_{0}a_{1}\dots }$. Given a timed language L, **Untimed L** is then the set of untimed w for ${\displaystyle w\in L}$.