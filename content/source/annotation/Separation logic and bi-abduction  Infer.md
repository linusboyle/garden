---
date: 2020-01-01
---

# Separation logic and bi-abduction  Infer


Created: [[2025-09-04]] 

> Infer
uses an extension of this inference question in an internal theorem prover while
it runs over program statements. Infer's question



is called bi-abduction. The problem here is for the theorem prover to 
discover  a pair of frame and antiframe formulae that make the entailment
statement valid.



[See in context](https://hyp.is/IG1XBImMEfCDET-nZl3Y0w/fbinfer.com/docs/separation-logic-and-bi-abduction/) at [Separation logic and bi-abduction | Infer](https://fbinfer.com/docs/separation-logic-and-bi-abduction/)



Created: [[2025-09-04]] 

> Global analyses of large programs are normally computationally intractable.
However, bi-abduction breaks apart a large analysis of a large program into
small independent analyses of its procedures. This gives Infer the ability to
scale independently of the size of the analyzed code. Moreover, by breaking the
analysis into small independent parts, when the full program is analyzed again
because of a code change the analysis results of the unchanged part of the code
can be reused, and only the code change needs to be re-analyzed. This process
is called incremental analysis



[See in context](https://hyp.is/P99boImMEfC5Zc9antuVgQ/fbinfer.com/docs/separation-logic-and-bi-abduction/) at [Separation logic and bi-abduction | Infer](https://fbinfer.com/docs/separation-logic-and-bi-abduction/)



Created: [[2025-09-04]] 

> to
discover missing state that is needed for the above implication to hold and
allow the analysis to proceed (the antiframe) as well as state that the
procedure leaves unchanged (the frame).



[See in context](https://hyp.is/Uh8-TImNEfCt7Cc57zAPTw/fbinfer.com/docs/separation-logic-and-bi-abduction/) at [Separation logic and bi-abduction | Infer](https://fbinfer.com/docs/separation-logic-and-bi-abduction/)



Created: [[2025-09-04]] 

> The human does not need to write preconditions and postconditions for all the
procedures, which is the key to having a high level of automation. This is the
basis for how Infer works, why it can scale, and how it can analyze code changes
incrementally.



[See in context](https://hyp.is/LLAfGImTEfC5OTODLo-3KA/fbinfer.com/docs/separation-logic-and-bi-abduction/) at [Separation logic and bi-abduction | Infer](https://fbinfer.com/docs/separation-logic-and-bi-abduction/)



Created: [[2025-09-04]] 

> In general, bi-abduction provides a way to infer a pre/post specs from bare
code, as long as we know specs for the primitives at the base level of the code.



[See in context](https://hyp.is/LL1lEImTEfCc-AfrKKdXnw/fbinfer.com/docs/separation-logic-and-bi-abduction/) at [Separation logic and bi-abduction | Infer](https://fbinfer.com/docs/separation-logic-and-bi-abduction/)



Created: [[2025-09-04]] 

> The logical terminology we have been using here comes from AI and
philosophy of science. Abductive inference was introduced by the philosopher
Charles Peirce, and described as the mechanism underpinning hypothesis formation
(or, guessing what might be true about the world), the most creative part of the
scientific process. Abduction and the frame problem have both attracted
significant attention in AI



[See in context](https://hyp.is/bv89XomTEfCVMlM-ZYdavg/fbinfer.com/docs/separation-logic-and-bi-abduction/) at [Separation logic and bi-abduction | Infer](https://fbinfer.com/docs/separation-logic-and-bi-abduction/)



Created: [[2025-09-04]] 

> Infer approaches automated
reasoning about programs by mimicking what a human might do when trying to
understand a program: it abduces what the program needs, and deduces conclusions
of that



[See in context](https://hyp.is/cvnmjomTEfCIYnNfXAwc5w/fbinfer.com/docs/separation-logic-and-bi-abduction/) at [Separation logic and bi-abduction | Infer](https://fbinfer.com/docs/separation-logic-and-bi-abduction/)



