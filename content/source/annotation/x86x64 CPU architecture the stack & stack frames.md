---
date: 2020-01-01
tag:
- annotation
- src/webpage
---

# x86x64 CPU architecture the stack & stack frames


Created: [[2025-08-27]] 

> After the “call” instruction, the RIP is redirected to the address of the function sum().



[See in context](https://hyp.is/HMrT3IMqEfC-6LMMO4cuqQ/yuriygeorgiev.com/2024/02/19/x86-64-cpu-architecture-the-stack/) at [x86/x64 CPU architecture: the stack & stack frames](https://yuriygeorgiev.com/2024/02/19/x86-64-cpu-architecture-the-stack/)



Created: [[2025-08-27]] 

> In sum() the very first instructions that will actually prepare the stack frame are:push    rbpmov     rbp, rspWhat this does is to “save” the current position of the Base Pointer (the bottom of the “current” stack frame) and replace it with the Stack Pointer (the tip/top of the stack). So the new Base Pointer is the current top of the stack.This operation of saving the old base pointer and moving it to the tip of the stack is the so-called Function Prologue.



[See in context](https://hyp.is/LdnB9oMqEfCwQUu4xgBnyQ/yuriygeorgiev.com/2024/02/19/x86-64-cpu-architecture-the-stack/) at [x86/x64 CPU architecture: the stack & stack frames](https://yuriygeorgiev.com/2024/02/19/x86-64-cpu-architecture-the-stack/)



Created: [[2025-08-27]] 

> The stack frame is the gap between the RBP and RSP.



[See in context](https://hyp.is/NdwYhoMqEfCYFF-00gHFQg/yuriygeorgiev.com/2024/02/19/x86-64-cpu-architecture-the-stack/) at [x86/x64 CPU architecture: the stack & stack frames](https://yuriygeorgiev.com/2024/02/19/x86-64-cpu-architecture-the-stack/)



Created: [[2025-08-27]] 

> After doing its job, the function sum() prepares to return to its caller (the main() function).This is called the Function Epilogue.



[See in context](https://hyp.is/d3kcCIMqEfC2H2PoBCEedw/yuriygeorgiev.com/2024/02/19/x86-64-cpu-architecture-the-stack/) at [x86/x64 CPU architecture: the stack & stack frames](https://yuriygeorgiev.com/2024/02/19/x86-64-cpu-architecture-the-stack/)



Created: [[2025-08-27]] 

> EAX is the default register that holds data that a function will return.



[See in context](https://hyp.is/fjOluIMqEfC1g0Mg9831jA/yuriygeorgiev.com/2024/02/19/x86-64-cpu-architecture-the-stack/) at [x86/x64 CPU architecture: the stack & stack frames](https://yuriygeorgiev.com/2024/02/19/x86-64-cpu-architecture-the-stack/)



