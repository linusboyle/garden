---
title: "The History of FORTRAN"
date: "2026-08-16"
source: "https://www.obliquity.com/computer/fortran/history.html"
author:
  - "[[David Harper]]"
  - "[[L.M. Stockman]]"
description: "A short history of FORTRAN."
tags:
  - "clipped"
aliases:
---
FORTRAN was the world's first high-level programming language. It was developed at IBM by a small team led by John Backus. The earliest version of FORTRAN was released in 1957 as a programming tool for the IBM 704. Fifty years later, FORTRAN remains the programming language of choice for large-scale numerical calculations in science and engineering.

## Before FORTRAN

Programs for the earliest computers consisted of sequences of numerical codes. Each code represented a basic operation such as 'fetch a number from memory location X and put it in register A' or 'add the number in register A to the number in register B'. This style of programming was time-consuming and error-prone. Mistakes were difficult to find.

By the time John Backus joined IBM as a scientific programmer in 1950, it had become possible to write programs using mnemomics such as *ADD* in place of the numerical codes. A special program (which we would call an assembler today) converted the mnemonics into the corresponding numerical codes. This made programming a little easier, but even a simple program required dozens of operations, and it was still difficult to track down mistakes.

Backus reasoned that it should be possible to create a programming language which allowed a series of calculations to be expressed in something resembling mathematical notation. A translation program (a compiler, in today's terminology) would then convert it into the numerical codes which the computer understood. Backus proposed this idea to his manager in 1953. He was given a budget and encouraged to hire a small team to test the feasibility of the notion.

Three years later, the team published a manual which described the IBM Mathematical Formula Translating System, or FORTRAN for short. Soon after, IBM made the first FORTRAN compiler available to users of the IBM 704.

Backus and his team had created the world'd first high-level programming language. Scientists and engineers would no longer have to write their programs as numerical codes or long-winded mnemonics.

Significantly, Backus's team had implemented the first **optimizing** compiler, which not only translated FORTRAN programs into the IBM 704's numerical codes, but produced codes which ran very nearly as fast as anything that could be crafted by hand.

This was very important in ensuring the success of FORTRAN. Early computers were very slow by today's standards, and they represented an expensive commodity to their owners. Inefficient programs wasted time and money. Backus and his team understood this, and they knew that they had to confound their critics who said that a program compiled from a high-level language could never be as efficient as one that was hand-crafted directly using numerical codes or mnemonics.

## The Early Years

In 1958, IBM released a revised version of the language, named FORTRAN II. It provided support for procedural programming by introducing statements which allowed programmers to create subroutines and functions, thereby encouraging the re-use of code.

FORTRAN's growing popularity led many computer manufacturers to implement versions of it for their own machines. Each manufacturer added its own customisations, making it impossible to guarantee that a program written for one type of machine would compile and run on a different type. IBM responded by removing all machine-dependent features from its version of the language. The result, released in 1961, was called FORTRAN IV.

## FORTRAN 66

By the early 1960s, there was growing pressure to create a standardised version of FORTRAN which was not tied to any single type of computer. In 1962, the **American Standards Association** (the precursor of ANSI, the **American National Standards Institute**) convened a committee to pursue this goal. The result, published in 1966, was a document which defined the language which became known as FORTRAN 66.

FORTRAN 66 marked a significant milestone in computer science. It was the first programming language to be defined by a formal standard.

## FORTRAN 77

Within only a few years, the shortcomings of FORTRAN 66 began to become apparent, especially by comparison with other programming languages such as C, Pascal and Algol. Computer manufacturers again added customisations to the language to try to address some of these faults.

This forced the ANSI FORTRAN standards committee, known as X3J3, to start work on a new version of the language in 1969. The resulting standard would take eight years to reach maturity, but the language it defined, known as FORTRAN 77, represented a major enhancement. Among the features which it added were a true block `IF` statement, a `CHARACTER` data type, direct-access I/O and the `PARAMETER` statement to define constants.

FORTRAN 77 became the became the most widely-used version of the language, and it is likely that much of the legacy FORTRAN code around the world is written in this dialect of the language.

## FORTRAN 90

FORTRAN 77 faced competition from languages such as C, which allowed programmers to allocate memory dynamically and to define heterogeneous data structures. FORTRAN 77 could do neither of these things. The next version of FORTRAN to emerge from the ANSI X3J3 committee was designed to address these deficiencies. It was tentatively named FORTRAN 8X but by the late 1980s, the committee did not appear to be close to releasing the new standard, and there was a popular joke among computer scientists that 'X' would need to be a hexadecimal digit.

The new version of FORTRAN was finally published as a standard by the **International Standards Organisation** in 1991, and it became known informally as FORTRAN 90.
