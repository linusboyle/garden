---
title: Read-Modify-Write
date: 2025-12-10
tags: 
aliases:
- RMW
---

- compare-and-swap ([[CAS]])
- fetch-and-add (FAA)

注意，RMW语义上隐含了fence，会使得[[Total Store Order|TSO]]下的store buffer清空