---
date: 2020-01-01
tag:
- annotation
- src/webpage
---

# Stack frame layout on x86-64 - Eli Bendersky's website


Created: [[2025-08-27]] 

> x86 has just 8 general-purpose registers available (eax, ebx, ecx, edx, ebp, esp, esi, edi). x64 extended them to 64 bits (prefix "r" instead of "e") and added another 8 (r8, r9, r10, r11, r12, r13, r14, r15).



[See in context](https://hyp.is/DGZzCoMsEfCOSSemmGCgXQ/eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64) at [Stack frame layout on x86-64 - Eli Bendersky's website](https://eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64)



Created: [[2025-08-27]] 

> I'm going to simplify the discussion here on purpose and focus on integer/pointer arguments [3]. According to the ABI, the first 6 integer or pointer arguments to a function are passed in registers. The first is placed in rdi, the second in rsi, the third in rdx, and then rcx, r8 and r9. Only the 7th argument and onwards are passed on the stack.



[See in context](https://hyp.is/TNLA2IMsEfC3qyfEhUzcKg/eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64) at [Stack frame layout on x86-64 - Eli Bendersky's website](https://eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64)



Created: [[2025-08-27]] 

> The 128-byte area beyond the location pointed to by %rsp is considered to be reserved and shall not be modified by signal or interrupt handlers. Therefore, functions may use this area for temporary data that is not needed across function calls. In particular, leaf functions may use this area for their entire stack frame, rather than adjusting the stack pointer in the prologue and epilogue. This area is known as the red zone.



[See in context](https://hyp.is/oV6TwIMsEfC018-dxycpRg/eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64) at [Stack frame layout on x86-64 - Eli Bendersky's website](https://eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64)



Created: [[2025-08-27]] 

> Code can assume that the 128 bytes below rsp will not be asynchronously clobbered by signals or interrupt handlers, and thus can use it for scratch data, without explicitly moving the stack pointer. The last sentence is where the optimization lays - decrementing rsp and restoring it are two instructions that can be saved when using the red zone for data.



[See in context](https://hyp.is/uENSdIMsEfC1hhuwefUHRg/eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64) at [Stack frame layout on x86-64 - Eli Bendersky's website](https://eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64)



Created: [[2025-08-27]] 

> the red zone will be clobbered by function calls, so it's usually most useful in leaf functions (functions that call no other functions).



[See in context](https://hyp.is/07DaNoMsEfCUNB8HI5D2ow/eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64) at [Stack frame layout on x86-64 - Eli Bendersky's website](https://eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64)



Created: [[2025-08-27]] 

> In addition, since it's a leaf function, gcc chooses to use the red zone for all its local variables. Thus, rsp needs not be decremented (and later restored) to allocate space for this data.



[See in context](https://hyp.is/A-SjGIMtEfCIZCe5_ATZgg/eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64) at [Stack frame layout on x86-64 - Eli Bendersky's website](https://eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64)



Created: [[2025-08-27]] 

> However, some time ago it was noticed that compiler-generated code doesn't really need it (the compiler can easily keep track of offsets from rsp), and the DWARF debugging format provides means (CFI) to access stack frames without the base pointer.
This is why some compilers started omitting the base pointer for aggressive optimizations, thus shortening the function prologue and epilogue, and providing an additional register for general-purpose use (which, recall, is quite useful on x86 with its limited set of GPRs).



[See in context](https://hyp.is/KDIQtoMtEfCH6SsFKajr-Q/eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64) at [Stack frame layout on x86-64 - Eli Bendersky's website](https://eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64)



Created: [[2025-08-27]] 

> gcc adheres to this recommendation and by default omits the frame pointer on x64, when compiling with optimizations. It gives an option to preserve it by providing the -fno-omit-frame-pointer flag



[See in context](https://hyp.is/YI8lhIMtEfCduMckOfrSdg/eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64) at [Stack frame layout on x86-64 - Eli Bendersky's website](https://eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64)



