---
title: 'A Programming Model for Disaggregated Memory over  CXL'
year: 2026
date: 2026-04-01
citekey: "@assaProgrammingModelDisaggregated2026"
itemType: conferencePaper
authors: Gal Assa, Moritz Lumme, Lucas Bürgi, Michal Friedman, Ori Lahav
proceedings: Proceedings of the 31st ACM International Conference on Architectural Support for Programming Languages and Operating Systems, Volume 2
publisher: Association for Computing Machinery
location: USA
pages: 41–58
doi: 10.1145/3779212.3790121
isbn: 979-8-4007-2359-9
tags: 
- Zotero
- imported
aliases:
  - "assaProgrammingModelDisaggregated2026"
  - 'A Programming Model for Disaggregated Memory over  CXL'
---

## [A Programming Model for Disaggregated Memory over  CXL](zotero://select/library/items/63XHQEJZ)

Read, cxl, disaggregated memory, programming models

> [!Cite]
> Gal Assa, Moritz Lumme, Lucas Bürgi, Michal Friedman, and Ori Lahav. 2026. A Programming Model for Disaggregated Memory over  CXL. In _Proceedings of the 31st ACM International Conference on Architectural Support for Programming Languages and Operating Systems, Volume 2_ (_ASPLOS ’26_), 2026. Association for Computing Machinery, USA, 41–58. [https://doi.org/10.1145/3779212.3790121](https://doi.org/10.1145/3779212.3790121)


> [!Abstract]
> CXL (Compute Express Link) is an emerging open industry-standard interconnect between processing and memory devices that is expected to revolutionize the way systems are designed. It enables cache-coherent, shared memory pools in a disaggregated fashion at unprecedented scales, allowing algorithms to interact with various storage devices using simple loads and stores. While CXL unleashes unique opportunities, it also introduces challenges of data management and crash consistency. For example, CXL currently lacks an adequate programming model, making it impossible to reason about the correctness and behavior of systems on top. In this work, we present CXL0, the first programming model for concurrent programs over CXL. We propose a high-level abstraction for memory accesses and formally define operational semantics. We demonstrate that CXL0 captures a wide range of current and future CXL setups and perform initial measurements on real hardware. To illustrate the usefulness of CXL0, we present a general transformation that enhances any linearizable concurrent algorithm with durability in a distributed partial-crash setting. We believe that this work will serve as a stepping stone for systems design and programming on top of CXL.



### Attachments

- [Assa 等 - 2026 - A Programming Model for Disaggregated Memory over  CXL](zotero://select/library/items/YRSD9SU2)
- [Preprint PDF](zotero://select/library/items/QZLP53MY)



### Collections

  - [A 计算机科学/1 系统结构/CXL](zotero://select/library/collections/N8TGEYC4)

  - [E 按会议分类/ASPLOS2026](zotero://select/library/collections/UMZQBFLD)

  - [A 计算机科学/1 系统结构/CXL/DSM投稿](zotero://select/library/collections/3XJTK7U5)




### Annotations


 > Per the CXL specification, interactions with remote caches  and remote RMWs are unavailable, so the RStore, LFlush,  Propagate-C-C, and remote RMW primitives are excluded.  


注意和预印本不同，Load-from-C仍然是存在的 
 





### Related Items

