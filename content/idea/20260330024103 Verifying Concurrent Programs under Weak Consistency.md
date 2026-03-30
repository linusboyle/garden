---
title: Verifying Concurrent Programs under Weak Consistency
date: 2026-03-30
tags:
  - idea
  - zettelkasten
aliases:
- Verifying Concurrent Programs under Weak Consistency
---

Ahmed Bouajjani, [[2026-03-30]]

## Decidability result on Reachability

- undecidable : exTSO, Power
- decidable: TSO, PSO, TSO+Persistency, k-alternation bounded exTSO

The proof is done by reduction to well structured systems
- well quasi order (WQO) on state space
- monotonicity of transition relation w.r.t. to WQO

For [[Total Store Order|TSO]]:

- Lossy channel systems
- Dual TSO with load buffers

## Related

- [[memory consistency model|WMM]]