---
title: LLM for Formal Methods
date: 2025-06-09
tags:
  - idea
  - zettelkasten
see also:
  - "[[索引]]"
  - "[[2025-06-09]]"
aliases:
  - LLM for Formal Methods
---

# LLM for Formal Methods

目前应该有很多这方面的尝试，但大多数成果都没有正式发表，仅存在于 arxiv 上。近期比较有影响力的是 CoqPilot 这个工具（ASE'24）。截至此刻（[[2025-06-09]]），[这篇综述](https://arxiv.org/abs/2502.18474)应该是比较全面地总结了最近的进展。

逻辑上LLM 可以从几个方面辅助 FM：

- 生成规约
- 生成证明（[[交互式定理证明]]）

从目前来看，以自然语言出发生成规约应该是较为靠谱的，而大模型在推理方面的能力有待观察。特别的，有一些专用 Lean 作数学证明的模型，比如 [Kimina](https://github.com/MoonshotAI/Kimina-Prover-Preview)。

对于[[模型检测]]来说，还有辅助生成模型的应用方向。比如，微软的 [Cheng Huang](https://www.microsoft.com/en-us/research/people/chengh/) 最近在 Azure 上成功应用了 [[大语言模型|LLM]] ，以自动化程度很高地方式完成了对大规模业务代码的 TLA+建模和模型检测，还找到了一个 data race。见 [[The Coming AI Revolution in Distributed Systems]]，另见 [[20250609112156 大模型在TLA+建模与验证方面的能力]]