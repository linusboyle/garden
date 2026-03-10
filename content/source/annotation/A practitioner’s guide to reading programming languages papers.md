---
date: 2020-01-01
tag:
- annotation
- src/webpage
---

# A practitioner’s guide to reading programming languages papers


Created: [[2026-02-22]] 

> .  It should be read, “From the typing context  it follows that term t has type T.” The comma operator extends  by adding a new binding on the right (e.g., ‘’).



[See in context](https://hyp.is/HBAf1A-XEfGdSs_t1tsZwQ/blog.acolyer.org/2018/01/26/a-practitioners-guide-to-reading-programming-languages-papers/) at [A practitioner’s guide to reading programming languages papers](https://blog.acolyer.org/2018/01/26/a-practitioners-guide-to-reading-programming-languages-papers/)



Created: [[2026-02-22]] 

> A type system is ‘safe’ (type safety) if well-typed terms always end up in a good place. In practice this means that when we’re following a chain of inference rules we never get stuck in a place where we don’t have a final value, but neither do we have any rules we can match to make further progress



[See in context](https://hyp.is/TnDFMg-XEfG3hAe2nfzo2g/blog.acolyer.org/2018/01/26/a-practitioners-guide-to-reading-programming-languages-papers/) at [A practitioner’s guide to reading programming languages papers](https://blog.acolyer.org/2018/01/26/a-practitioners-guide-to-reading-programming-languages-papers/)



Created: [[2026-02-22]] 

> To show that well-typed terms don’t get stuck, it suffices to prove progress and preservation theorems.

Progress: a well-typed term is not stuck (either it is a value or it can take a step according to the evaluation rules).
Preservation: if a well-typed term takes a step of evaluation, then the resulting term is also well typed.



[See in context](https://hyp.is/btJGFg-XEfGqFU9lTFuhOw/blog.acolyer.org/2018/01/26/a-practitioners-guide-to-reading-programming-languages-papers/) at [A practitioner’s guide to reading programming languages papers](https://blog.acolyer.org/2018/01/26/a-practitioners-guide-to-reading-programming-languages-papers/)



Created: [[2026-02-22]] 

> For example,  .  A term is well-typed (or typable) if there is some T such that .



[See in context](https://hyp.is/hcD7dA-XEfG6SDORkhDw8w/blog.acolyer.org/2018/01/26/a-practitioners-guide-to-reading-programming-languages-papers/) at [A practitioner’s guide to reading programming languages papers](https://blog.acolyer.org/2018/01/26/a-practitioners-guide-to-reading-programming-languages-papers/)



Created: [[2026-02-22]] 

> In a Curry-style language definition, first terms are defined, then a semantics is given showing how they behave, and then a type system is layered on top that ‘rejects some terms whose behaviours we don’t like.’ Semantics comes before typing.
In a Church-style language definition typing comes before semantics, so we never have to ask what the behaviour of an ill-typed term is.



[See in context](https://hyp.is/5VPd_g-XEfG-Vsf5ZREvig/blog.acolyer.org/2018/01/26/a-practitioners-guide-to-reading-programming-languages-papers/) at [A practitioner’s guide to reading programming languages papers](https://blog.acolyer.org/2018/01/26/a-practitioners-guide-to-reading-programming-languages-papers/)



