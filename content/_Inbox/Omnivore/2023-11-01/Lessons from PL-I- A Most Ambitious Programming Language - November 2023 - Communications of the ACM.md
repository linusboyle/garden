---
id: 22aac7a4-6fa8-11ee-85f5-7b1506250e51
date: 2023-11-01 12:00:00
title: "Lessons from PL/I: A Most Ambitious Programming Language | November 2023 | Communications of the ACM"
author: Doug Meil
---

#Omnivore

[Read on Omnivore](https://omnivore.app/me/lessons-from-pl-i-a-most-ambitious-programming-language-november-18b4f9e1572)
[Read Original](http://cacm.acm.org/magazines/2023/11/277418-lessons-from-pl-i-a-most-ambitious-programming-language)

## Highlights

> IBM designed PL/I with the goal of bringing together the power of three programming languages: FORTRAN (1954), ALGOL (1958), and COBOL (1959). [⤴️](https://omnivore.app/me/lessons-from-pl-i-a-most-ambitious-programming-language-november-18b4f9e1572#0e00fa4b-bede-490e-9ebf-3fb4047fbaac)  ^0e00fa4b


---

By Doug Meil  
Communications of the ACM, November 2023, Vol. 66 No. 11, Pages 6-7  
10.1145/3623564  
[Comments](#comments) 

![City of Cleveland Software Architect Doug Meil](https://proxy-prod.omnivore-image-cache.app/0x0,s2z_w5tiyUDSdccZkCOR9kiorBbpX6hwIn3HZC2LjvP8/http://cacm.acm.org/system/assets/0004/6470/101823_Doug-Meil.large.jpg?1697490034&1697490033 "City of Cleveland Software Architect Doug Meil") 

**<https://bit.ly/44OqI2R> July 5, 2023**

One might argue language creation might be accelerating today, but it's not a new problem. In my BLOG@CACM post "Why are there so many programming languages?", I described how variants of programming languages go back to the dawn of computer programming. In that post I also cited one of my favorite stories: PL/I. PL/I stands for **Programming Language 1**, and its aim was to be the _Highlander_ of programming languages: There would be no need for version 2, 3, or 4 if everything went to plan. While it is clear that goal was never reached, what might not be evident is that what PL/I was trying to achieve was a reasonable idea, or at least not entirely crazy. What also was not evident at the time was how difficult that reasonable idea turned out to be. We can all learn from this story. 

IBM designed PL/I with the goal of bringing together the power of three programming languages: FORTRAN (1954), ALGOL (1958), and COBOL (1959).

* FORTRAN—The scientific programming language.
* COBOL—The business programming language.
* ALGOL—Primarily a research language, but with innovative paradigms and features.

On paper, this makes sense. Computer programming can be difficult; why should there be multiple programming languages? Computer programming of the era required a lot of punched cards, so having One Good Programming Language would have _on-paper_ (or cardboard) benefits to simplify the process of development as well. Work on the PL/I specification started in 1964, and work on the first compiler began in 1966.

In the minds of PL/I's designers, the plan looked something like this:

![ins01.gif](https://proxy-prod.omnivore-image-cache.app/0x0,sQXJ8XIJdpLI56mHxM14p08rP-vV2BEovm7mtXzPwIQo/https://dl.acm.org/cms/attachment/html/10.1145/3623564/assets/html/ins01.gif)

PL/I was not just a development effort, it was also in effect a **system conversion.** There was an explicit goal for developers to _start_ using PL/I, but also implicit goals for developers not just to _stop_ using FORTRAN, COBOL, and ALGOL directly, but also to convert their existing solutions and codebases to PL/I. Compounding the problem was that FORTRAN, COBOL, and ALGOL were evolving in real time.

As I described in my BLOG@CACM post "The Art of Speedy Systems Conversions," a system conversion is one of the most difficult things to do in software engineering. The existing system typically has a massive head start, and the replacing system needs to start up development, accelerate, reach feature parity, and then both systems need to be stable long enough to make the switch.

![ins02.gif](https://proxy-prod.omnivore-image-cache.app/0x0,sBRWRiDk_RM9aC4udldi-5I2DkLty-IiUGcQdEPcC0Ok/https://dl.acm.org/cms/attachment/html/10.1145/3623564/assets/html/ins02.gif)

Refer to the 1994 action movie _Speed_ as to why this set of activities can be a challenge. PL/I was trying to do this with not just one mobile target, but _three._

[Back to Top](#PageTop)

### The FORTRAN Challenge

All programming languages evolve over time, and this was certainly true of FORTRAN. Some development milestones from early FORTAN were:

* FORTRAN language specification created by IBM (1954).
* FORTRAN 1 (1957)—First FORTRAN compiler available.
* FORTRAN 2 (1958)—This version had incremental language feature additions, including allowing user-written subroutines.
* FORTRAN 3 (1958)—This version was never released as a product.
* FORTRAN 4—Development started in 1961, initial release in 1962—with subsequent development through 1968.
* FORTRAN 66 (1966)—The first industry standard version of FORTRAN.
* FORTRAN 77 (1977)—More language feature additions, particularly trying to address shortcomings of FORTRAN 66.

Note that FORTRAN 66—a significant milestone in FORTRAN's history—happened multiple years _after_ PL/I development had started.

[Back to Top](#PageTop)

### The ALGOL Challenge

ALGOL was a highly influential programming language; although primarily used in research and academic settings, it still had an evolutionary arc:

* ALGOL 58 (1958)—First version. Included code blocks, an innovation in programming language design.
* ALGOL 60—Not commercially successful, but widely used in research and hugely influential in language design. One of the first languages to implement function definitions that could also be called recursively, among other features.
* ALGOL 68—A language specification intended as an improvement on ALGOL 60 that seemed to make everyone involved in the effort unhappy.

[Back to Top](#PageTop)

### The COBOL Challenge

**COBOL Origins**

When people think of COBOL now, they typically think of staid mainframe banking, finance, and insurance solutions, but COBOL's origins have a dash of drama. Designed in 1959 by CODASYL, an industry committee, COBOL was part of a U.S. Defense Department effort to create a common data-processing language that could run across the various computers it was operating. That simple-sounding requirement was anything but at the time and is another example of the desire for One Good Programming Language, as well as compilers that could run on all computers. Second, there were already two prominent "business" programming languages in existence before COBOL: FLOW-MATIC and COMTRAN:

* FLOW-MATIC—Created by Grace Hopper while at Remington Rand 1955–1958\. FLOW-MATIC was English-based.
* COMTRAN—COMTRAN, created by IBM in 1957, was intended to be _"FORTRAN, for business."_

There are varying opinions on how much each language influenced COBOL, though COBOL did wind up becoming quite verbose. Despite rumors, Grace Hopper was _not_ on the committee that designed the language.

**Early COBOL**

Some development milestones from early COBOL were:

* COBOL 60 (1960)—The first version of COBOL.
* COBOL 61—Minor improvements to the language.
* COBOL 61 Extended—This version appeared in 1963, including the sort and report writer facilities.
* COBOL 65—This version brought further clarifications to the specification and introduced facilities for mass storage files and tables.
* COBOL 68—This version became an ISO standard in 1972.
* COBOL 74—More changes to the language, including sub-programs.

IBM announced it would cease development of COMTRAN in 1962, in preference of COBOL.

[Back to Top](#PageTop)

### The Historical Verdict

When compared to other programming languages that have been created in the past 60+ years, PL/I was a success. PL/I reportedly was used in the development of the Multics operating system and the S/360 version of the Sabre airline reservation system, among others. PL/I, taught at the college level, has been around for decades. Most programming languages would be envious to do half as well.

Yet PL/I did not achieve its strategic goal of consolidating scientific and business computing with the best new programming paradigms research could provide, and it wasn't for a lack of trying. That goal became impossible as both FORTRAN and COBOL kept accelerating. COBOL became the most widely used programming language in the world by 1970, and replacing an existing COBOL system with PL/I was going to be a hard sell to customers. The same could be said of existing FORTRAN systems. COBOL and FORTRAN also kept accelerating their language definition during the 1960s, making PL/I's feature parity with them not just a challenge, but also ambiguous as it took both COBOL and FORTRAN years to stabilize their respective standards.

The programming language landscape continued to evolve as well. By the end of the 1960s, Simula had branched from ALGOL and introduced object-oriented programming concepts, generating a new programming paradigm and a host of new languages implementing those concepts, and C emerged as the dominant systems programming language the following decade. There were even more high-level programming languages than ever.

[Back to Top](#PageTop)

### Lessons For the Rest of Us

A system conversion is one of the hardest things to do in software engineering, and programming languages are one of the hardest sub-cases as its users are other developers. Exclaiming _"we should rebuild it!"_ is a siren call that is tough to resist, though, as developers love the sight of a clean sheet of paper combined with a big new idea. It's not wrong to think big, just don't forget to plan for the conversion of the incumbent system: for every blank sheet of paper used to design the new thing, pull out at least one more for the migration. Keep that ratio in mind when considering timelines and the project budget as well, depending on just how deeply the prior system is entrenched.

[Back to Top](#PageTop)

[Back to Top](#PageTop)

### Author

**Doug Meil** is a software architect in healthcare data management and analytics. He also founded the Cleveland Big Data Meetup in 2010\. More of his BLOG@CACM posts can be found at <https://www.linkedin.com/pulse/publications-doug-meil>.

---

Copyright held by owner(s)/author(s).  
Request permission to (re)publish from the owner/author

The Digital Library is published by the Association for Computing Machinery. Copyright © 2023 ACM, Inc.

---

No entries found

[](http://cacm.acm.org/magazines/2023/11/277418-lessons-from-pl-i-a-most-ambitious-programming-language) 

![](https://proxy-prod.omnivore-image-cache.app/0x0,sqA8CWm7gZY9NQTJ7kNV9zTv9-jJ7r8OA7LmB4uKcALw/https://cacm.acm.org/images/arrow_top.png)