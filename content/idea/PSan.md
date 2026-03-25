---
title: PSan
date: 2023-03-06
tags:
  - tool
aliases:
---

[[Checking Robustness to Weak Persistency Models]]

# PSan

Based on [[Jaaru]], it detects [[Robustness (PM)]] violation and suggests fixes like where to insert fences and flushes.

Like Jaaru, it is dynamic and does not explore all execution and interleaving of threads.

Two modes can be used to generate some execution: Random v.s. Model Checking modes.

The basic idea is: given a specific execution, PSan assumes it is run in [[Strict Persistency]]. Then based on the value read in post-crash recovery routine, it adjusts the interval where the crash should happen (still assuming [[Strict Persistency]]). If all the intervals are unsatisfiable, then non-robustness is proved.  

See the example below:

![[Pasted image 20231017140839.png]]

## Experiments

[[PSan]] is efficient when run.

![[Pasted image 20231017140955.png]]

In the original paper, the experiments on benchmarks are run such that 10,000 executions are generated and analyzed.

PSan Artifact: [Checking Robustness to Weak Persistency Models (PSan Artifact)](https://zenodo.org/records/6395059)

On Github: [uci-plrg/psan-vagrant](https://github.com/uci-plrg/psan-vagrant)

Results: [PSan Bug Report - Google 表格](https://docs.google.com/spreadsheets/d/1-mdVpUVSlNed-QQhgMBEyxjSJC4wXgxgTOgvggVr-K4/edit#gid=0)

