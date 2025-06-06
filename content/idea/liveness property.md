---
title: liveness property
date: 2021-01-01
tags: 
aliases:
  - liveness
---

> ### Liveness
> 
> A liveness property is, informally, that “good things always happen”. Like “the database will eventually commit the data” or “if the worker continually retries, it will eventually succeed” or “if someone requests a book, they eventually get a chance to borrow it.”
> 
> These are much less common than [[safety property]] but often core business requirements. A system satisfies all safety properties if it just sits there and does nothing, since it never does anything bad. But it never does anything good, either. **Liveness properties are only violatible by infinite traces**: you have to show you _never_ eventually do the thing to have a problem.
> 
> Some common genres of liveness properties:
> 
> *   _thing_ eventually is true. We eventually show an alert, even if it disappears later.
> *   _thing_ eventually is true and _stays_ true. The database nodes can disagree on what was written, but eventually they will all converge on the same thing and it stays that way.
> *   _thing_ always _comes back_ to true. The vehicle can temporarily go over the speed limit, but it can’t stay above the speed limit _forever_, and must eventually come back down.
> *   _condition_ leads to _thing_ being true in the future. If I send a message, you eventually receive it.
> *   **Fairness**
> 
> [Safety and Liveness Properties • Buttondown](https://buttondown.email/hillelwayne/archive/604c08d2-b49b-4572-9762-b2be14f72c06)

证明程序的终止性就是一种liveness属性（it will eventually terminate, see [[终止性分析]])

liveness property可以用它代表的模型形式化地定义, see [[temporal liveness property]]。

一般而言，liveness property比[[safety property]]更难验证。