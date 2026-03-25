## 背景

> In concurrent event-driven programming, consider device drivers  that provide event-handling services of independent threads, while communicating through  shared memory. These device drivers are permitted by operating system to temporarily take  over the execution of the threads in which the event occurred. A scenario could occur, where a  loop in the code executed by the device driver could diverge when a relevant shared variable is  modified by other threads in the same driver. Such scenarios could potentially cause denial of   service, rendering the entire system unavailable. Hence, we see that non-terminating execution scenarios can greatly compromise the underlying computing environment’s reliability.

THREAD_STUCK_IN_DEVICE_DRIVER (stop code 0x100000ea)

![](Pasted%20image%2020220301192128.png)

## 相关工作

### Testing

Testing Non-termination in Multi-threaded programs, 2016 Priyanka Thyagarajan's master's thesis

> When we proceed to examine testing, we observe: Testing based methods are adept at verifying properties that can be expressed as assertions. Testing is a technique that requires a program to terminate. Traditionally, nontermination is a property that cannot be expressed as assertions.

### Verification
- rely-guarantee/static analysis:
	- Compositional termination proofs for multi-threaded programs
	- Rely-Guarantee Termination and Cost Analyses of Loops with Concurrent Interleavings
	- Proving Thread Termination
-  abstraction
	- Proving Liveness of Parameterized Programs
	- Transition predicate abstraction and fair termination
- Model checking based (old)
	- some new paper:
	- Fair Termination for Parameterized Probabilistic Concurrent Systems
	- Liveness of Randomised Parameterised Systems under Arbitrary Schedulers (这部份主要是关注概率并发程序)
- GPU
	- Termination analysis for GPU kernels (*Proving termination by thread-modular analysis*, 也和rely/guarantee有关)
	> Unlike CPU applications, which may be reactive, GPU kernels are _required_ to terminate: any data computed by a kernel is inaccessible from the CPU as long as the kernel has not terminated. Besides the data being inaccessible, kernels with accidental infinite loops can have a severe impact on the systems on which they run: while working on the experiments from [11](https://www.sciencedirect.com/science/article/pii/S0167642317300849#br0110), we accidentally introduced infinite loops on numerous occasions; this often made our systems unresponsive, and sometimes caused transient hardware failures and spontaneous reboots.

## 研究内容

研究高效的并发程序终止性证明方法，能从实际安全攸关代码如驱动程序中寻找到可能的非终止问题。应用符号化方法应对并发程序的状态空间过大的问题。

## 技术方案

1. rely-guarantee条件的学习/重用
2. ~~termination under [[memory consistency model|WMM]]~~ compilation under WMM which preserves termination