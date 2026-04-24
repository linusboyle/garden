---
title: VPS 常见工具
date: 2026-04-21
tags: 
aliases:
---

## 无访问权限

- bgp.tools
- looking glass: nexttrace/traceroute
- disvps看延迟波动、线路等，以及各路评测

## 有访问权限

- IP质量检测脚本  `bash <(curl -Ls https://Check.Place) -I`
- 线路质量检测脚本 `bash <(curl -Ls Net.Check.Place)`
- 流媒体解锁检测 `bash <(curl -L -s check.unlock.media)`
- 硬件检测 `bash <(curl -Ls Hardware.Check.Place)`