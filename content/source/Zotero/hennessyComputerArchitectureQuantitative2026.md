---
title: 'Computer Architecture: A Quantitative Approach'
year: 2026
date: 2026-08-21
citekey: "@hennessyComputerArchitectureQuantitative2026"
itemType: book
authors: John L. Hennessy, David A. Patterson, Christos Kozyrakis
publisher: Morgan Kaufmann Publischers an imprint of Elsevier
location: San Francisco
isbn: 978-0-443-15406-5
tags: 
- Zotero
- imported
aliases:
  - "hennessyComputerArchitectureQuantitative2026"
  - 'Computer Architecture: A Quantitative Approach'
---

## [Computer Architecture: A Quantitative Approach](zotero://select/library/items/H6HACKJ4)



> [!Cite]
> John L. Hennessy, David A. Patterson, and Christos Kozyrakis. 2026. _Computer Architecture: A Quantitative Approach_ (7th ed.). Morgan Kaufmann Publischers an imprint of Elsevier, San Francisco.




### Attachments

- [PDF](zotero://select/library/items/7658M6VQ)



### Collections

  - [A 计算机科学/1 系统结构](zotero://select/library/collections/VKTA5EBV)




### Annotations


 > The late 1970s saw the emergence of the microprocessor.  

 



 > two significant changes in the computer marketplace made it easier than ever to succeed commercially with a new architecture. First, the virtual elimination of assembly language programming reduced the need for object-code compatibility. Second, the creation of standardized, vendor-independent operating systems, such as UNIX and its clone, Linux, lowered the cost and risk of bringing out a new architecture.  

 



 > Intel rose to the challenge, primarily by translating 80x86 instructions into RISC-like instructions internally, allowing it to adopt many of the innovations first pioneered in the RISC designs.  

 



 > In 1974, Robert Dennard observed that power density was constant for a given area of silicon even as you increased the number of transistors because of smaller dimensions of each transistor.  

 



 > This change forced the microprocessor industry to use multiple efficient processors or cores instead of a single inefficient processor.  

 



 > Whereas the compiler and hardware conspire to exploit ILP implicitly without the programmer’s attention, DLP, TLP, and RLP are explicitly parallel, requiring the restructuring of the application so that it can exploit explicit parallelism. In some instances this is easy; in many it is a major new burden for programmers.  

 



 > The only path left to improve energy-performance-cost significantly is specialization. Future microprocessors will include several domain-specific cores that perform only one class of computations well, but they do so remarkably better than general-purpose cores.  

 



 > ome are investigating alternatives that have not yet had significant commercial impact, e.g., analog, biological, quantum, neuromorphic, or asynchronous computing.  

 



 > Although the range of computing power in the embedded computing market is very large, price is a key factor in the design of computers for this space. Performance requirements do exist, of course, but the primary goal often meets the performance need at a minimum price rather than achieving more performance at a higher price.  

 



 > Energy and size requirements lead to the use of Flash memory for storage (Chapter 2) instead of magnetic disks.  

 



 > We use the ability to run third-party software as the dividing line between nonembedded and embedded computers.  

 



 > the cost target for servers is total cost of ownership (TCO) rather than purchase price. TCO is the purchase price plus the cost of operation over the lifetime of the computer, which includes the cost of electricity, cooling, maintenance, and space.  

 



 > the purchase price of the server processor can be a quarter of the total TCO.  

 



 > Clusters are collections of typically inexpensive servers connected by local area networks to act as a single larger computer. Each node runs its own operating system, and nodes communicate using a networking protocol.  

 



 > Single instruction stream, single data stream (SISD)dThis category is the uniprocessor. The programmer thinks of it as the standard sequential computer, but it can exploit ILP.  

 



 > Single instruction stream, multiple data streams (SIMD)dThe same instruction  is executed by multiple processors using different data streams.  

 



 > In the early SIMD computers each processor had its own data memory (hence the MD of SIMD), but there is a single instruction memory and control processor, which fetches and dispatches instructions. (Recent SIMD computers fetch multiple data items at a time from a single shared memory.)  

 



 > Multiple instruction streams, single data stream (MISD)dNo successful commercial multiprocessor of this type has been built to date, but it rounds out this simple classification  

 



 > Multiple instruction streams, multiple data streams (MIMD)dEach processor  fetches its own instructions and operates on its own data,  

 



 > The architect’s or designer’s job is much more than instruction set design, and the technical hurdles in the other aspects of the project are likely more challenging than those encountered in instruction set design.  

 



 > There are two basic choices for encoding: fixed length and variable length.  

 



 > All ARMv8 and RISC-V instructions are 32 bits long, which simplifies instruction decoding.  

 



 > The x86 encoding is variable length, 1 to 18 bytes. Variable-length instructions can take less space than fixed-length instructions, so a program compiled for the x86 is usually smaller than the same program compiled for RISC-V.  

 





### Related Items

