---
date: 2024-07-12
tags:
  - idea
  - tool
see also:
  - "[[索引]]"
  - "[[2024-07-12]]"
---

关于参数：

- postexpectation 是一个随机变量组成的表达式，其中中括号括起的谓词是示性函数
- preexpectation 也是一样，但是谓词中的变量都是执行前的值
- 验证的目标是，postexpectation 的期望总是小于等于preexpectation 的期望

---


Usage:

Note that in pre-expectation, the default is infinite (for upper bound)

```
Usage: python -m cegispro2.cmd [OPTIONS] PROGRAM

Options:
  --post TEXT                     The post-expectation. The postexpectation
                                  must be in disjoint normal form, i.e., of
                                  the form [guard_1]*expr + ... [guard_n]*expr
                                  such that the guard_i partition the state
                                  space.
  --prop TEXT                     The upper bound on the weakest
                                  preexpectation that is to be verified. Must
                                  be of the form [guard_1]*expr + ...
                                  [guard_n]*expr. The guard_i must be mutually
                                  exclusive. Every state that does not satisfy
                                  any guard is implicitly assigned infinity
                                  (for upper bounds) or 0 (for lower bounds).
  --template TEXT                 The (initial) template as a comma separated
                                  list of probably guards partitioning the
                                  loop guard. If empty, the template will be
                                  read off the syntax of the loop.
  --validate / --novalidate       Whether to validate that the inductive
                                  invariant is (1) in gnf (2) safe (3) non-
                                  negative and (3) inductive and whether (4)
                                  the representation of the characteristic
                                  functional Phi is in disjoint normal form.
  --verifier [distance|optimization]
                                  Whether to use the cooperative verifier via
                                  increasing distance or via OMT. In our TACAS
                                  paper, we only use the distance-verifier.
  --distance INTEGER              The constant the distance constraint is
                                  multiplied with and divided by,
                                  respectively.
  --templaterefiner [variable|fixed|inductivity|hyperplane]
                                  Which template refiner to use. 'variable'
                                  produces non-fixed partition templates (cf.\
                                  column Dynamic in Table 2), 'fixed' produces
                                  fixed-partition templates and can be used
                                  only for finite-state programs (those
                                  programs for which every variable is
                                  assigned a range of values),and inductivity
                                  produces fixed-partition templates guided by
                                  the last partially inductive candidate the
                                  inner CEGIS loop produced.
  --partitionfactor INTEGER       A factor determining the search space for
                                  the variable template refiner.
  --usemotzkin / --nousemotzkin   NOT SUPPORTED. We do not consider this in
                                  our TACAS paper. Whether to use Motzkin's
                                  transposition theorem to ensure
                                  welldefinedness and safety.
  --optimizing-synthesizer / --nooptimizing-synthesizer
                                  Whether to use an optimizing synthesizer. We
                                  do not conisider this in our TACAS paper.
  --debuglog / --nodebuglog       Determining the logging mode.
  --exporttemplate / --noexporttemplate
                                  Wheter to print the final expectation
                                  template as a comma separated probably
                                  string.
  --oneshot / --nooneshot         NOT SUPPORTTED. If true, a one-shot solver
                                  using Motzkin's transposition theorem is
                                  used to find an inductive instance of the
                                  template. Note: We then solve a relaxation
                                  of the problem assuming that the program
                                  variables are real-valued.
  --invarianttype [sub|super|past]
                                  Which type of invariant to generate. We
                                  remark that sub-invariants I <= Phi(I) do
                                  not necessarily yield lower bounds on lfp
                                  Phi. A sufficient criterion is (1) post is
                                  1-bounded *and* 2-the loop terminates UAST.
                                  past tries to synthesize an ert-
                                  superinvariant for proving PAST: ignores
                                  post and prop and sets post =0.
  --cdb / --nocdb                 Whether to ensure conditional difference
                                  boundedness in case we are synthesizing a
                                  sub-invariant.
  --safestatistics TEXT           The directory the statistics shall be stored
                                  in. Leave empty if you don't want the
                                  statistics to be stored.
  --initialstates TEXT            An expectation of the form [phi]. If set,
                                  the part of the inductive invariant
                                  satisfying phi is stored as a string in
                                  statistics.bound.
  --help                          Show this message and exit.
```