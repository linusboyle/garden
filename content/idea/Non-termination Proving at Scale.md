---
title: Non-termination Proving at Scale
date: 2025-08-30
tags: 
- 非终止性分析
- 论文
conference: OOPSLA22
---

By Azalea Raad, Julien Vanegue, and Peter O’Hearn

一种基于 Incorrectness Logic 的类霍尔逻辑推理系统，可靠且完备。可用于进行[[非终止性分析]]，具有可组合性，支持扩展到分离逻辑对堆内存进行建模和推理。基于 Pulse 的实现，[Pulse∞](https://zenodo.org/records/12637589)，为首个能对实际百万行代码库进行非终止性分析的工作。

原始审稿意见：[[Reviews on Non-Termination Proving at Scale]] [[Additional Comment on OOPSLA Paper173]]

## BUA

本文的推理系统 UNTer 基于 BUA三元组 $\vdash_B [p]~C~[ \epsilon : q]$，这是一种描述前向可达性（p中所有状态可达 q）的、对前置条件进行下近似（p 为 q 在 C 下的原象的子集）的形式。BUA = Backwards Under-approximate

其基本特点如下：

|              | Floyd-Hoare Triple                  | FUA                                 | BUA                              |
| ------------ | ----------------------------------- | ----------------------------------- | -------------------------------- |
| 语义         | q是p在C下的最强后置条件的超集       | q是p在C下的最强后置条件的子集       | p是q在C^-1下的最强后置条件的子集 |
| 近似         | 上近似                              | 下近似                              | 下近似                           |
| 可达性       | p状态总是可达q                      | q状态总是从p可达                    | p状态总是可达q                   |
| 用途         | 证明功能正确性                      | 证明缺陷                            | 证明非终止性                     |
| 推理系统     | 霍尔逻辑                            | Incorrectness Logic                 | UNTer                            |
| Cons规则方向 | $p'\rightarrow p, q \rightarrow q'$ | $p\rightarrow p', q' \rightarrow q$ | 同霍尔逻辑                       |

BUA 和 Incorrectness Logic 底层的 FUA 的绝大多数推导规则都相同，区别只在于 CONSEQUENCE 规则的放缩方向。FUA 的推导规则见 [[Incorrectness Logic]]

BUA 的另一个特点是后置条件不一定存在，因此不存在类似最强后置条件的谓词变换。如果要使用 BUA 进行前向分析，本文建议使用 abduction（即给定前置条件，找到并合取一个新的公式使后置条件存在）

## UNTer

用于证明非终止性时，推导的目标形如 $\vdash [p]~C~[\infty]$。个人理解这只是一种形式上的记号，用以从 BUA 的逻辑系统过渡到非终止性证明，其意义是：「从任意 p 中状态出发，总存在一条发散的执行」。对状态全称并不影响通用性，反而契合 BUA 的前向可达性。

UNTer 的推导规则见下面的图，其中循环对应的规则相当于找到 [[recurrence set]]。特别的，FUA 不能被用来证明非终止性，反例详见论文（简单来说，FUA 只能向前构建无穷执行，但程序总是要有一个起点的，BUA 相反）。

另，既然是证明非终止性，这里的 BUA 都是 total 的（需终止）

## Open Question

霍尔逻辑的完备性只是就推理系统的能力而言，但实际上推导树的构建需要人为或者机器搜索。

Pulse 的搜索策略是什么？考虑到其可以应用于大规模的代码库，其内部必然没有使用太多的回溯，那么其又是如何优化推导规则的选取策略的？如果说是类似抽象解释的不动点算法，其又是怎么实现谓词变换的？

## Annotations  
(8/30/2025, 9:50:27 PM)

“A compositional analysis is one where the analysis result of a composite program is computed from those of its constituent parts” (Raad et al., 2024, p. 2) 🔤组合分析是指通过其组成部分的分析结果来计算复合程序的分析结果。🔤

“our scientific goals: to establish a compositional proof method together with an algorithm which allow for automatic compositional program analysis, and initial experiments to probe its feasibility.” (Raad et al., 2024, p. 2) 🔤我们的科学目标：建立一种组合证明方法及相应的算法，以实现自动化的组合程序分析，并通过初步实验探究其可行性。🔤

“Proving non-termination is an under-approximation problem as the aim is to establish the existence of non-terminating executions. Therefore, for compositional reasoning it is natural to consider a formalism akin to incorrectness logic (IL)” (Raad et al., 2024, p. 2) 🔤证明非终止性是一个下逼近问题，因为其目标是确定存在非终止的执行。因此，对于组合推理，自然要考虑类似于不正确性逻辑（IL）的形式化方法。🔤

“The backwards under-approximate (BUA) triple ⊢B p C ok : q denotes that p is a subset of the states from which q can be reached executing C.” (Raad et al., 2024, p. 2) 🔤反向下近似（BUA）三元组 ⊢B p C ok : q 表示 p 是从执行 C 可以到达 q 的状态的子集。🔤

“Specifically, we develop under-approximate non-termination logic (UNTer), where we write ⊢ p C [∞] to denote that every state in p leads to a divergent (infinite) execution via C. Note that this does not state that every execution diverges; rather, that each pre-state leads to some divergent execution.” (Raad et al., 2024, p. 2) 🔤具体而言，我们开发了欠近似的非终止逻辑（UNTer），其中我们使用 ⊢ p C [∞] 来表示 p 中的每个状态都会通过 C 导致发散（无限）执行。需要注意的是，这并不意味着每次执行都会发散；而是指每个前置状态都会导致某种发散执行。🔤

(Raad et al., 2024, p. 3) 有点像是将RS的概念表现在推理系统之中

“The proof method is also related to the idea of ‘recurrence sets’ by Gupta et al. [2008]” (Raad et al., 2024, p. 3) 🔤该证明方法也与Gupta等人[2008]提出的“递归集”概念相关。🔤

“we additionally need a way to stop the analysis before a fixpoint is reached. It turns out that we can employ similar techniques to IL and bounded model checking, by simply stopping after some fixed number of iterations even when we do not have a fixpoint.” (Raad et al., 2024, p. 3) 🔤此外，我们还需要一种方法在达到不动点之前停止分析。事实证明，我们可以采用与IL和有界模型检验类似的技术，只需在固定次数的迭代后停止，即使我们尚未达到不动点。🔤

“it reported zero false positives thanks to its under-approximate nature” (Raad et al., 2024, p. 3) 🔤由于其欠近似的性质，它报告了零误报。🔤

“the main value of analysis tools lies in the discovery of bugs, not in the proof of program correctness. A bug presented to a developer is often a more convincing utility of a tool than a correctness proof, which is often carried out under certain assumptions that may not hold.” (Raad et al., 2024, p. 4) 🔤分析工具的主要价值在于发现错误，而非证明程序的正确性。向开发者展示的错误通常比正确性证明更具说服力，因为正确性证明往往基于某些可能不成立的假设。🔤

“IL and its later extensions are instances of under-approximate reasoning and are associated with no-false-positives theorems, ensuring that all bugs identified by them are true positives.” (Raad et al., 2024, p. 5) 🔤IL及其后续扩展是欠近似推理的实例，并与无假阳性定理相关联，确保它们识别的所有错误都是真阳性。🔤

“This is in contrast to over-approximate reasoning techniques such as Hoare logic, where one considers a superset (over-approximated) set So ⊇ S of C behaviours, making them ideal for verification (as they guarantee no false negatives)” (Raad et al., 2024, p. 5) 🔤这与Hoare逻辑等过度近似推理技术形成对比，在Hoare逻辑中，人们考虑的是C行为的一个超集（过度近似）So ⊇ S，这使得它们非常适合验证（因为它们保证了没有假阴性）。🔤

“An IL triple, also referred to as a forward, under-approximate (FUA) triple, is of the form ⊢F [p] C [ε :q], where F hints at its forward direction, denoting that q is a subset of program behaviours when C is run (forward) from the states in p” (Raad et al., 2024, p. 5) 🔤一个IL三元组，也称为前向、下近似（FUA）三元组，其形式为 ⊢F [p] C [ε :q]，其中F暗示其前向方向，表示当C从p中的状态运行（前向）时，q是程序行为的一个子集。🔤

“Showing that a program C does not terminate is compatible with under-approximate reasoning: when the traces of C are given by the set S, showing that the traces in a smaller (under-approximate), possibly singleton, set Su ⊆ S do not terminate is sufficient for showing that C does not terminate” (Raad et al., 2024, p. 5) 🔤证明程序C不会终止与欠近似推理是兼容的：当C的迹由集合S给出时，证明在更小（欠近似）的集合Su ⊆ S（可能是单例集合）中的迹不会终止，就足以证明C不会终止。🔤

“In other words, having a backward chain of C executions from p ∧ B to p ∧ B does not yield an infinite execution. Instead, we need a forward chain of C executions from p ∧ B to p ∧ B, as we can then repeat this execution forward ad infinitum” (Raad et al., 2024, p. 6) 🔤换句话说，从 p ∧ B 到 p ∧ B 的 C 执行的反向链不会产生无限执行。相反，我们需要从 p ∧ B 到 p ∧ B 的 C 执行的前向链，因为这样我们可以无限次地重复这一前向执行。🔤

“we thus use BUA triples to describe normal, terminating executions. For instance, in order to show that C1; C2 does not terminate starting from p, we can show either C1 does not terminate starting from p (i.e. p C1 [∞]), or C1 terminates normally transforming the states to q, and C2 does not terminate starting from q (i.e. ⊢B p C1 ok : q and q C2 [∞]).” (Raad et al., 2024, p. 7) 🔤因此，我们使用BUA三元组来描述正常终止的执行。例如，为了证明从p开始的C1; C2不会终止，我们可以证明要么C1从p开始不会终止（即p C1 [∞]），要么C1正常终止并将状态转换为q，且C2从q开始不会终止（即⊢B p C1 ok : q 且 q C2 [∞]）。🔤

“the BUA rules for reasoning about branches and loops are identical to their FUA counterparts” (Raad et al., 2024, p. 7) 🔤BUA规则中关于分支和循环的推理与其FUA对应部分完全相同。🔤

“almost all FUA and BUA proof rules coincide, and the only difference between FUA and BUA rules lie in their associated rules of consequence” (Raad et al., 2024, p. 7) 🔤几乎所有FUA和BUA的证明规则都一致，FUA和BUA规则之间的唯一区别在于它们各自的结果规则。🔤

“it is straightforward to reconcile this difference between FUA and BUA and to develop a unified, under-approximate reasoning framework.” (Raad et al., 2024, p. 7) 🔤调和FUA与BUA之间的差异并开发一个统一的、近似下界的推理框架是直接且可行的。🔤

“Note that while it is useful to have both FUA and BUA triples, theoretically speaking, only the BUA triples are needed for proving non-termination.” (Raad et al., 2024, p. 8) 🔤需要注意的是，虽然同时拥有FUA和BUA三元组是有用的，但从理论上讲，仅需BUA三元组即可证明非终止性。🔤

“to establish divergence it suffices to show some divergent trace is possible from some initial state in p” (Raad et al., 2024, p. 8) 🔤要确立分歧，只需证明从p中的某个初始状态出发存在某种可能的分歧轨迹即可。🔤

“We therefore opt for the stronger under-approximate interpretation of divergent triples: p C [∞] denotes that every state in p leads to some divergent trace.” (Raad et al., 2024, p. 9) 🔤因此，我们选择对发散三元组进行更强的下近似解释：p C [∞] 表示 p 中的每个状态都会导致某些发散轨迹。🔤

(Raad et al., 2024, p. 10) 这里是y

“Note that while in correctness frameworks we can over-approximate a loop behaviour via an invariant, i.e. an assertion that holds after any number of iterations (including zero), in FUA/BUA frameworks we can under-approximate a loop behaviour via a subvariant as an indexed assertion p, where p (n) describes the state after n iterations.” (Raad et al., 2024, p. 11) 🔤请注意，在正确性框架中，我们可以通过不变量（即在任何次数的迭代后（包括零次）都成立的断言）来过度近似循环行为，而在FUA/BUA框架中，我们可以通过子变量作为索引断言p来欠近似循环行为，其中p(n)描述了n次迭代后的状态。🔤

“the Hoare assignment rule is not sound for FUA. That is, ⊢F p [e/x] x := e ok : p is not sound” (Raad et al., 2024, p. 11) 🔤霍尔赋值规则对于FUA是不健全的。即，⊢F p [e/x] x := e ok : p 是不健全的。🔤

“he Hoare assignment rule is sound for BUA, i.e. ⊢B p [e/x] x := e ok : p is a sound BUA triple. However, this difference between BUA and FUA does not have a practical ramification as the Floyds assignment rule (in Assign) is sufficient to enable automated reasoning” (Raad et al., 2024, p. 11) 🔤霍尔赋值规则对BUA是可靠的，即 ⊢B p [e/x] x := e ok : p 是一个可靠的BUA三元组。然而，BUA与FUA之间的这种差异并没有实际影响，因为弗洛伊德赋值规则（在Assign中）足以支持自动化推理。🔤

![[image-2025-08-30T14-54-17-397Z-1.webp]]  
(Raad et al., 2024, p. 12)

“This is because big-step semantics by definition describe terminating executions, while our aim is to formalise the semantics of divergent triples” (Raad et al., 2024, p. 15) 🔤这是因为大步语义根据定义描述的是终止的执行，而我们的目标是形式化发散三元组的语义。🔤

“We next show that the BUA and FUA proof systems presented in Fig. 1 are both sound and complete,” (Raad et al., 2024, p. 17) 🔤我们接下来证明图1中展示的BUA和FUA证明系统既是可靠的，也是完备的。🔤

## Related

- [[形式化方法|Formal Methods]]
- [[非终止性分析|Nontermination Analysis]]