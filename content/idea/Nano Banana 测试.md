---
title: Nano Banana 测试
date: 2025-09-14
tags: 
- LLM
---

Nano Banana即Gemini-2.5-flash-image

1. 场景视图重建：比较典型的例子是从正常的视角转换为俯视图，如果这个能够实现的话，以后我的[[DnD]]游戏的地图就可以很容易地生成了。实际效果却很差

输入：

![](Nano%20Banana%20%E6%B5%8B%E8%AF%95-20250914001535135.webp)

Prompt:

> generate a top-down, bird's view map for the scene depicted in this picture, useful as battlemap for a DnD game. Do not add any grids.

输出：

![[Pasted image 20250914001600.webp]]

视角几乎没有变化

2. 人像一致性&补全：我个人的应用场景是[[桌面角色扮演游戏|跑团]]的时候用来补全或者修改晚上找到的头像

输入：

![](Nano%20Banana%20%E6%B5%8B%E8%AF%95-20250914002014725.webp)

Prompt:

> generate a full body portrait for the given character.

输出：

![](Nano%20Banana%20%E6%B5%8B%E8%AF%95-20250914002106252.webp)

效果不错，惟一的问题是人体的比例失调。