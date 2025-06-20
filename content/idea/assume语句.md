# assume语句
如果从操作语义的视角来看，`assume b`如果在一个满足条件b的状态s下执行，则下一状态仍然是s，此时assume语句没有实际的效果；如果是在不满足条件b的状态下执行，执行流将终止。

用霍尔三元组来考察，规则如下：$\{\phi\}\mathrm{assume} \, b\{\psi\}$，成立，当且仅当$\phi \land b \implies \psi$。可以这么理解：`assume b`从$\phi$中过滤出满足b的状态。最强后置条件就是$\phi \land b$。