---
title: newif effects
date: 2022-03-25
tags: 
---

# \newif effects

The command `\newif\iffoo` set `\iffoo` to false, and define two commands:

- `\footrue` set `\iffoo` to true
- `\foofalse` set `\iffoo` to false

Typical usages are:

```latex
\newif\ifdraft\drafttrue

\ifdraft

something...

\else

another...

\fi
```

---

[[LaTeX]]