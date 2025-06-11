---
date: 2020-01-01
---

# The Coming AI Revolution in Distributed Systems


Created: [[2025-06-09]] 

> AI can now autonomously generate accurate formal specifications directly from very large production codebases. This capability marks a pivotal moment in software engineering, pointing toward a future where AI-driven correctness verification becomes not just standard practice, but potentially superior to human efforts



[See in context](https://hyp.is/eLuMrkUOEfCvT_NwB3VBrQ/zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html) at [The Coming AI Revolution in Distributed Systems](https://zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html)



Created: [[2025-06-09]] 

> The AI autonomously produced precise TLA+ specifications from Azure Storage’s production source code, uncovering a subtle race condition that had evaded traditional code reviews and extensive testing.



[See in context](https://hyp.is/bMyXrEUPEfCEeZtRp6K-gw/zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html) at [The Coming AI Revolution in Distributed Systems](https://zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html)



Created: [[2025-06-09]] 

> We began by tasking GitHub Copilot (with o3 model) to formulate a comprehensive plan for analyzing a specific feature and generating a corresponding TLA+ specification



[See in context](https://hyp.is/jkLf9EUPEfCvVffy7QiF9A/zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html) at [The Coming AI Revolution in Distributed Systems](https://zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html)



Created: [[2025-06-09]] 

> After reviewing the AI-generated plan, we instructed GitHub Copilot Agent (with Claude 3.7 Sonnet model) to execute each step



[See in context](https://hyp.is/60lLUkUPEfCbgAvfZZL-bw/zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html) at [The Coming AI Revolution in Distributed Systems](https://zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html)



Created: [[2025-06-09]] 

> Notably, we only provided the feature name and the relevant component directory to narrow the search scope. The AI autonomously identified pertinent files and extracted essential information without further guidance.



[See in context](https://hyp.is/88-42EUPEfCCzuPOc3UNwA/zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html) at [The Coming AI Revolution in Distributed Systems](https://zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html)



Created: [[2025-06-09]] 

> along with an initial TLA+ specification containing over 10 invariants. Impressively, the primary safety invariant matched precisely what we anticipated.



[See in context](https://hyp.is/CwcTUkUQEfCxNNv53K22Qg/zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html) at [The Coming AI Revolution in Distributed Systems](https://zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html)



Created: [[2025-06-09]] 

> We observed that the AI refined the specification iteratively, updating one atomic action at a time. This incremental approach likely helped the AI maintain precision and accuracy throughout the refinement process.



[See in context](https://hyp.is/GqJfiEUQEfCESiNp1bmJUw/zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html) at [The Coming AI Revolution in Distributed Systems](https://zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html)



Created: [[2025-06-09]] 

> we proceeded to validate it using the TLA+ model checker. Initially, the tool reported a language error, which the AI swiftly corrected. Subsequent model checking uncovered a violation of the primary safety invariant. After providing the violation trace to the AI, it quickly identified the problematic sequence — a concurrent deletion and reference addition scenario.



[See in context](https://hyp.is/JwNhqkUQEfCsA-fm90pLeQ/zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html) at [The Coming AI Revolution in Distributed Systems](https://zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html)



Created: [[2025-06-09]] 

> we asked the AI to analyze the git commit history for the feature using git MCP. This analysis revealed an additional critical safety mechanism involving pessimistic locking, previously overlooked. The AI promptly updated both the documentation and the TLA+ specification to reflect this important discovery.



[See in context](https://hyp.is/UYIRukUQEfCfLM9Gas-saw/zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html) at [The Coming AI Revolution in Distributed Systems](https://zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html)



Created: [[2025-06-09]] 

> Within hours of iterative refinement, the AI had surfaced a critical race condition



[See in context](https://hyp.is/WFnqvEUQEfCS7qtHudcbrw/zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html) at [The Coming AI Revolution in Distributed Systems](https://zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html)



Created: [[2025-06-09]] 

> After a decade of manually crafting TLA+ specifications, I must acknowledge that this AI-generated specification rivals human work. This achievement represents more than incremental progress — it demonstrates that the fundamental components for fully automating correctness verification are now available.



[See in context](https://hyp.is/Yz_PoEUQEfCV2P-syssyYw/zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html) at [The Coming AI Revolution in Distributed Systems](https://zfhuang99.github.io/github%20copilot/formal%20verification/tla+/2025/05/24/ai-revolution-in-distributed-systems.html)



