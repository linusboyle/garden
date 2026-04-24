---
title: 'A Primer on Memory Consistency and Cache Coherence'
year: 2020
date: 2026-04-23
citekey: "@nagarajanPrimerMemoryConsistency2020"
itemType: book
authors: Vijay Nagarajan, Daniel J. Sorin, Mark D. Hill, David A. Wood
publisher: Springer International Publishing
location: Cham
doi: 10.1007/978-3-031-01764-3
isbn: 978-3-031-00636-4 978-3-031-01764-3
tags: 
- Zotero
- imported
aliases:
  - "nagarajanPrimerMemoryConsistency2020"
  - 'A Primer on Memory Consistency and Cache Coherence'
---

## [A Primer on Memory Consistency and Cache Coherence](zotero://select/library/items/IYTDS73B)

ToRead

> [!Cite]
> Vijay Nagarajan, Daniel J. Sorin, Mark D. Hill, and David A. Wood. 2020. _A Primer on Memory Consistency and Cache Coherence_. Springer International Publishing, Cham. [https://doi.org/10.1007/978-3-031-01764-3](https://doi.org/10.1007/978-3-031-01764-3)




### Attachments

- [全文](zotero://select/library/items/JUKMTUD5)



### Collections

  - [A 计算机科学/5 形式化方法/Concurrency](zotero://select/library/collections/EANVVSUQ)

  - [A 计算机科学/1 系统结构/CXL/DSM投稿](zotero://select/library/collections/3XJTK7U5)




### Annotations


 > As part of this consistency model  

 



 > support, the hardware provides cache coherence (or coherence).  

 



 > It is worth stressing that unlike consistency which is an architectural specification that defines shared memory correctness, coherence is a means to supporting a consistency model  

 



 > Essentially, all of the variants make one processor’s write visible to the other processors by propagating the write to all caches  

 



 > But protocols differ in when and how the syncing happens. There are two major classes of coherence protocols.  

 



 > In the second approach, the coherence protocol propagates writes to the caches asynchronously, while still honoring the consistency model.  

 



 > GPUs originally chose not to support hardware cache coherence, since GPUs are designed for embarrassingly parallel graphics workloads that do not synchronize or share data all that much. However, the absence of hardware cache coherence leads to programmability and/or performance challenges when GPUs are used for general-purpose workloads with fine-grained synchronization and data sharing  

 



 > We classify these protocols into two categories based on the nature of their coherence interfaces—specifically, based on whether there is a clean separation of coherence from the consistency model or whether they are indivisible.  

 



 > writes are propagated synchronously, the first category presents an interface that is identical to that of an atomic memory system  

 



 > The cache coherence protocol abstracts away the caches completely and presents an illusion of atomic memory  

 



 > In the second, more-recent category, writes are propagated asynchronously—a write can thus return before it has been made visible to all processors, thus allowing for stale values (in real time) to be observed.  

 



 > coherence protocols in this class must ensure that the order in which writes are  

 



 > eventually made visible adheres to the ordering rules mandated by the consistency model.  

 



 > We define coherence through the single-writer–multiple-reader (SWMR) invariant.  

 



 > note that it is possible to to enforce a variety of consistency models, including strong models such as SC and TSO, using this approach  

 



 > This invariant states that the value of a memory location at the start of an epoch is the same as the value of the memory location at the end of its last read-write epoch.  

 



 > must appear to execute all threads’ loads and stores to a single memory location in a total order that respects the program order of each thread  


Per-location SC=COH 
 



 > This definition highlights an important distinction between coherence and consistency in the literature: coherence is specified on a per-memory location basis, whereas consistency is specified with respect to all memory locations.  

 



 > Power is assumed to be incomparable with respect to Alpha, ARM, RMO, and XC until someone proves that one is more relaxed than the other or that the two are equivalent.  

 





### Related Items

