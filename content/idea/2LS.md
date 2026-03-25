---
title: 2LS
date: 2021-06-20
tags:
  - tool
---

# 2LS

2LS ("tools") is a verification tool for C programs. It is built upon the CPROVER framework ([cprover.org](http://www.cprover.org)), which supports C89, C99, most of C11 and most compiler extensions provided by gcc and Visual Studio. It allows verifying array bounds (buffer overflows), pointer safety, exceptions, user-specified assertions, and termination properties. The analysis is performed by template-based predicate synthesis and abstraction refinements techniques.