---
title: temporal liveness property
date: 2021-01-20
tags: 
---

# temporal liveness property
The following definition assumes the property is expressed in temporal logic and thus the model are infinite sequence of states:

> A property φ is a _liveness_ property for a set of models if for every prefix of a model w0,..., wi, there exists an infinite model σ that starts with w0 ,..., wi and σ |= φ. As mentioned liveness properties specify good things that should occur. Thus, **regardless of the history of the computation, it is still possible to find an extension that will fulfill the specification.** -- Handbook of [[模型检测|model checking]]