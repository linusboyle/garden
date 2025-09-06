---
date: 2020-01-01
---

# Where the top of the stack is on x86 - Eli Bendersky's website


Created: [[2025-08-27]] 

> Herein lies the source of the confusion. Intel's x86 architecture places its stack "head down". It starts at some address and grows down to a lower address.



[See in context](https://hyp.is/DS10dIMrEfCrGpfNG0NcOQ/eli.thegreenplace.net/2011/02/04/where-the-top-of-the-stack-is-on-x86/) at [Where the top of the stack is on x86 - Eli Bendersky's website](https://eli.thegreenplace.net/2011/02/04/where-the-top-of-the-stack-is-on-x86/)



Created: [[2025-08-27]] 

> The x86 architecture reserves a special register for working with the stack - ESP (Extended Stack Pointer). The ESP, by definition, always points to the top of the stack:



[See in context](https://hyp.is/GppOtoMrEfCLIUfk-H5f2w/eli.thegreenplace.net/2011/02/04/where-the-top-of-the-stack-is-on-x86/) at [Where the top of the stack is on x86 - Eli Bendersky's website](https://eli.thegreenplace.net/2011/02/04/where-the-top-of-the-stack-is-on-x86/)



Created: [[2025-08-27]] 

> To push new data onto the stack we use the push instruction [3]. What push does is first decrement esp by 4, and then store its operand in the location esp points to.



[See in context](https://hyp.is/MLBTOoMrEfCaOVv9yUmikQ/eli.thegreenplace.net/2011/02/04/where-the-top-of-the-stack-is-on-x86/) at [Where the top of the stack is on x86 - Eli Bendersky's website](https://eli.thegreenplace.net/2011/02/04/where-the-top-of-the-stack-is-on-x86/)



Created: [[2025-08-27]] 

> Similarly, the pop instruction takes a value off the top of stack and places it in its operand, increasing the stack pointer afterwards.



[See in context](https://hyp.is/O--KhoMrEfC3qnus0ewg1g/eli.thegreenplace.net/2011/02/04/where-the-top-of-the-stack-is-on-x86/) at [Where the top of the stack is on x86 - Eli Bendersky's website](https://eli.thegreenplace.net/2011/02/04/where-the-top-of-the-stack-is-on-x86/)



Created: [[2025-08-27]] 

> Since esp keeps moving as the function executes, ebp (base pointer, also known as frame pointer in other architectures) is used as a convenient anchor relatively to which all function arguments and locals can be found. Arguments are above ebp in the stack (hence the positive offset when accessing them), while locals are below ebp in the stack.



[See in context](https://hyp.is/-3_-soMrEfCFTDezhMNDzg/eli.thegreenplace.net/2011/02/04/where-the-top-of-the-stack-is-on-x86/) at [Where the top of the stack is on x86 - Eli Bendersky's website](https://eli.thegreenplace.net/2011/02/04/where-the-top-of-the-stack-is-on-x86/)



