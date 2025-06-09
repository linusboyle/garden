---
title: LLM for Formal Methods
date: 2025-06-09
tags:
  - idea
  - zettelkasten
see also:
  - "[[索引]]"
  - "[[2025-06-09]]"
alias:
- LLM for Formal Methods
---

# LLM for Formal Methods

目前应该有很多这方面的尝试，但大多数成果都没有正式发表，仅存在于 arxiv 上。近期比较有影响力的是 CoqPilot 这个工具（ASE'24）。截至此刻，[这篇综述](https://arxiv.org/abs/2502.18474)应该是比较全面地总结了最近的进展。

逻辑上LLM 可以从几个方面辅助 FM：

- 生成规约
- 生成证明（[[交互式定理证明]]）

从目前来看，以自然语言出发生成规约应该是较为靠谱的研究方向

对于[[模型检测]]来说，还有辅助生成模型的应用方向。微软的 [Cheng Huang](https://www.microsoft.com/en-us/research/people/chengh/) 最近在 Azure 上成功应用了 [[大语言模型|LLM]] ，以自动化程度很高地方式完成了对大规模业务代码的 TLA+建模和模型检测，还找到了一个 data race。Hillel Wayne [总结](https://buttondown.com/hillelwayne/archive/ai-is-a-gamechanger-for-tla-users/)了 AI 在这方面的优势：

- 修复语法
- 解读反例路径
- 减轻负担，比如自动生成 unchanged 变量
- 将自然语言的规约形式化（但是要小心表述的准确性）

劣势：

- 修复模型 spec
- 在没有用户指导的情况下生成 spec（无法生成足够好的非平凡性质）
- 代码生成

但总体来说，其最大价值体现在降低上手难度，可能有利于形式化方法的推广。