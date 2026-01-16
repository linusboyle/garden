---
date: 2020-01-01
tag:
- annotation
- src/webpage
---

# Abstract Interpretation


Created: [[2025-09-19]] 

> The formal verification of a program (and more generally a
computer system) consists in proving that its semantics
(describing "what the program executions actually do") satisfies its
specification (describing "what the program executions are
supposed to do").



[See in context](https://hyp.is/oOiA_pUzEfC95F8xcmMJzw/www.di.ens.fr/~cousot/AI/) at [Abstract Interpretation](https://www.di.ens.fr/~cousot/AI/)



Created: [[2025-09-19]] 

> Abstract interpretation
[22,26] formalizes the idea
that this formal proof can be done at some level of abstraction where
irrelevant details about the semantics and the specification are
ignored.  This amounts to proving that an abstract semantics
satisfies an abstract specification.  An example of abstract
semantics is Hoare logic while examples of abstract specifications are
invariance, partial, or total correctness.  This abstracts away from
concrete properties such as execution times.



[See in context](https://hyp.is/DOu3MJU0EfCO2T85411NAg/www.di.ens.fr/~cousot/AI/) at [Abstract Interpretation](https://www.di.ens.fr/~cousot/AI/)



Created: [[2025-09-19]] 

> Abstractions should preferably be sound (no conclusion derived
from the abstract semantics is wrong relative to the program concrete
semantics and specification).  Otherwise stated, a proof that the
abstract semantics satisfies the abstract specification should imply
that the concrete semantics also satisfies the concrete specification.
Hoare logic is a sound verification method, debugging is not (since
some executions are left out), bounded model checking is not either
(since parts of some executions are left out).  Unsound abstractions
lead to false negatives (the program may be claimed to be
correct/non erroneous with respect to the specification whereas it is
indeed incorrect).

此处假设抽象均是上近似

[See in context](https://hyp.is/aJPpVJU0EfCKN0dHZLSfsA/www.di.ens.fr/~cousot/AI/) at [Abstract Interpretation](https://www.di.ens.fr/~cousot/AI/)



Created: [[2025-09-19]] 

> However program proofs are undecidable, and
so automatic tools for reasoning about programs are all incomplete
(for non trivial program properties such as safety, liveness, or
security) and must therefore fail on some programs



[See in context](https://hyp.is/K4N-ApU1EfCCjVPtNxYohQ/www.di.ens.fr/~cousot/AI/) at [Abstract Interpretation](https://www.di.ens.fr/~cousot/AI/)



Created: [[2025-09-19]] 

> providing a basic coherent and conceptual theory for
understanding in a unified framework the thousands of ideas, concepts,
reasonings, methods, and tools on formal program analysis and
verification [22,26];



 guiding the correct formal design of automatic tools for program
analysis (computing an abstract semantics) and program
verification (proving that an abstract semantics satisfies an
abstract specification) [17].



[See in context](https://hyp.is/1MRBBJU1EfCuqmNC4iz2Mg/www.di.ens.fr/~cousot/AI/) at [Abstract Interpretation](https://www.di.ens.fr/~cousot/AI/)



