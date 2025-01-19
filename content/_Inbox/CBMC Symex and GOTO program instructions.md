---
title: CBMC Symex and GOTO program instructions
date: 2024-04-08
source: https://diffblue.github.io/cbmc/md__home_runner_work_cbmc_cbmc_doc_architectural_symex_instructions.html#autotoc_md205
author: 
tags:
  - clipped
  - raw
---

# CBMC: Symex and GOTO program instructions

> ## Excerpt
> In doc/central-data-structures we talked about the relationship between various central data structures of CBMC.

---
In [doc/central-data-structures](https://diffblue.github.io/cbmc/group__module__hidden.html) we talked about the relationship between various central data structures of CBMC.

We identified the [goto_programt](https://diffblue.github.io/cbmc/classgoto__programt.html "A generic container class for the GOTO intermediate representation of one function.") as being the core data structure representing GOTO-IR, which we defined as a list of GOTO program instructions.

As a reminder, instructions are composed of three subcomponents:

-   An instruction type,
-   A statement (denoting the actual code the instruction contains),
-   An instruction guard (an expression that needs to be evaluated to `true` before the instruction is to be executed - if one is attached to the instruction).

In this document, we are going to take a closer look at the first subcomponent, the instruction types, along with the interplay between the instructions and a central CBMC module, the _symbolic execution engine_ (from now on, just _symex_).

## A (very) short introduction to Symex

Symex is, at its core, a GOTO-program interpreter that uses symbolic values instead of actual ones. This produces a formula which describes all possible outputs rather than a single output value. While Symex is interpreting the program, it also builds a list of Static Single Assignment (SSA) steps that form part of the equation that is to be sent to the solver. For more information see [Symbolic Execution](https://diffblue.github.io/cbmc/group__goto-symex.html#symbolic-execution).

You can see the main instruction dispatcher (what corresponds to the main interpreter loop) at [goto_symext::execute_next_instruction](https://diffblue.github.io/cbmc/classgoto__symext.html#afd39af32ddc613bd9e2036a048d422ab "Executes the instruction state.source.pc Case-switches over the type of the instruction being execute...").

Symex's source code is available under [goto-symex](https://diffblue.github.io/cbmc/group__goto-symex.html).

## Instruction Types

Every GOTO-program instruction has a specific type. You can see the instruction type at [goto\_program\_instruction\_typet](https://diffblue.github.io/cbmc/goto__program_8h.html#a9e03d66cd12c59d9d3daad1ec6296beb "The type of an instruction in a GOTO program.") but we will also list some of them here for illustration purposes:

(_NOTE_: The above is for illustration purposes only - the list is not complete, neither is it expected to be kept up-to-date. Please refer to the type [goto\_program\_instruction\_typet](https://diffblue.github.io/cbmc/goto__program_8h.html#a9e03d66cd12c59d9d3daad1ec6296beb "The type of an instruction in a GOTO program.") for a list of what the instructions look like at this point in time.)

You can observe these instruction types in the user-friendly print of the goto-program that various CPROVER programs produce with the flag `--show-goto-functions`. For a live example, consider the following C file:


int [main](https://diffblue.github.io/cbmc/file__converter_8cpp.html#a0ddf1224851353fc92bfbff6f499fa97)(int argc, char \*\*argv)

{

int a\[\] = {0, 1, 2, 3};

[\_\_CPROVER\_assert](https://diffblue.github.io/cbmc/cprover__builtin__headers_8h.html#a564e8a5a7bebea04fdd5ee1277832478)(a\[3\] != 3, "expected failure: last element of array 'a' is equal to 3");

}

If we ask CBMC to print the GOTO-program instructions with `--show-goto-functions`, then part of the output looks like this:

\[...\]

[DECL](https://diffblue.github.io/cbmc/goto__program_8h.html#a9e03d66cd12c59d9d3daad1ec6296bebac511d45de1f5895f447fbfd7a0741cd8) [main](https://diffblue.github.io/cbmc/file__converter_8cpp.html#a0ddf1224851353fc92bfbff6f499fa97)::1::arry : signedbv\[32\]\[4\]

[ASSERT](https://diffblue.github.io/cbmc/goto__program_8h.html#a9e03d66cd12c59d9d3daad1ec6296beba61d9e0e93eb9635173764c5ba45666f1) [main](https://diffblue.github.io/cbmc/file__converter_8cpp.html#a0ddf1224851353fc92bfbff6f499fa97)::1::arry\[cast(3, signedbv\[64\])\] ≠ 3

SET RETURN VALUE side\_effect statement="nondet" is\_nondet\_nullable="1"

In the above excerpt, the capitalised words at the beginning each instruction are the correspondent instruction types (`DECL`, `ASSIGN`, etc).

___

Symex (as mentioned above) is going to pick a designated entry point and then start going through each instruction. This happens at [goto_symext::execute_next_instruction](https://diffblue.github.io/cbmc/classgoto__symext.html#afd39af32ddc613bd9e2036a048d422ab "Executes the instruction state.source.pc Case-switches over the type of the instruction being execute..."). While doing so, it will inspect the instruction's type, and then dispatch to a designated handling function (which usually go by the name `symex_<instruction-type>`) to handle that particular instruction type and its symbolic execution. In pseudocode, it looks like this:

switch(instruction.type())

{

\[...\]

symex\_goto(state);

break;

symex\_assume(state, instruction.condition());

break;

The way the [goto-symex](https://diffblue.github.io/cbmc/group__goto-symex.html) subfolder is structured, the different dispatching functions are usually in their own file, designated by the instruction's name. As an example, you can find the code for the function [goto\_symext::symex\_goto](https://diffblue.github.io/cbmc/classgoto__symext.html#a4018afc6d7d73369dd9c0c202724458e "Symbolically execute a GOTO instruction.") in [symex\_goto.cpp](https://diffblue.github.io/src/goto-symex/symex_goto.cpp)

The output of symex is an [symex\_target\_equationt](https://diffblue.github.io/cbmc/classsymex__target__equationt.html "Inheriting the interface of symex_targett this class represents the SSA form of the input program as ...") which consists of equalities between different expressions in the program. You can visualise it as a data structure that serialises to this: `(a = 5 ∨ a = 3) ∧ (b = 3) ∧ (c = 4) ∧ ...` that describe assignments and conditions for a range of possible executions of a program that cover a range of potential paths within it.

This is a high-level overview of symex and goto-program instructions. For more information (and a more robust introduction), please have a look at [Symbolic Execution](https://diffblue.github.io/cbmc/group__goto-symex.html#symbolic-execution).

Last modified: 2024-04-05 16:32:51 +0200

---

created from webpage on [[2024-04-08]]