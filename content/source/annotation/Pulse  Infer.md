---
date: 2020-01-01
tag:
- annotation
- src/webpage
---

# Pulse  Infer


Created: [[2025-10-30]] 

> Pulse is an interprocedural memory safety analysis. Pulse can detect, for instance, Null dereferences



[See in context](https://hyp.is/c_fa5rVnEfCGaNcwRGNhYA/fbinfer.com/docs/checker-pulse/) at [Pulse | Infer](https://fbinfer.com/docs/checker-pulse/)



Created: [[2025-10-30]] 

> When an error can occur only on some values of the parameters of the current function, Pulse does not report an issue. Such issues are called latent. But, if Pulse then sees a call site at which all the conditions for the error are satisfied then the error becomes manifest and is reported.



[See in context](https://hyp.is/e8SMfrVnEfCbuitZJ5NBEQ/fbinfer.com/docs/checker-pulse/) at [Pulse | Infer](https://fbinfer.com/docs/checker-pulse/)



Created: [[2025-10-30]] 

> In order to avoid false positives, Pulse makes optimistic assumptions about calls to unknown functions. Unknown functions (or unknown methods) are functions for which Infer didn't find any code. For example, it could be because the function belongs to a third-party library and we know only its signature, or because a function is made through a function pointer that Pulse wasn't able to resolve to a concrete function



[See in context](https://hyp.is/0IbN0LVnEfCVVPMYqVijmw/fbinfer.com/docs/checker-pulse/) at [Pulse | Infer](https://fbinfer.com/docs/checker-pulse/)



Created: [[2025-10-30]] 

> In general, this helps avoid false positives but note that this may cause false negatives as well as false positives:



[See in context](https://hyp.is/0dUz8rVnEfCHsmehD9IyKw/fbinfer.com/docs/checker-pulse/) at [Pulse | Infer](https://fbinfer.com/docs/checker-pulse/)



Created: [[2025-10-30]] 

> You can check if a given function called any unknown functions by inspecting its Pulse summary



[See in context](https://hyp.is/5zGwzLVnEfCFy5vPoR4AyA/fbinfer.com/docs/checker-pulse/) at [Pulse | Infer](https://fbinfer.com/docs/checker-pulse/)



