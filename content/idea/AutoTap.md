---
title: AutoTap
date: 2020-11-08
tags: 
aliases:
---

Introduction
------------

### TAP

End-user programming lets users express their intent for how IoT devices and cloud services interact.

TAP(trigger-action programming) is a popular way of End-user programming. In TAP, users create event-driven **rules**, stating what action should be down when some trigger occurs. There are two general TAP rule structures:

1.  IF _event_ THEN _action_
2.  IF _event_ WHILE _state_ THEN _action_ (this is more expressive)

> event occur in a moment, and state remains true/false in a period of time.

**TAP may contain bugs** . We need a way to let users with no programming experience express their intent correctly.

### AutoTap basic idea

This paper presents AutoTap, a system that allow users to specify TAP rules as well as **properties** i.e. what the system must satisfy.

If no rules are provided, AutoTap use [[程序综合|Program Synthesis]] to synthesize TAP rules that satisfy these properties. If initial rules are provided, AutoTap check these rules and repair if possible.

The goal of the synthesized rules are:

*   property-compliant : guaranteeing properties
*   accommodating : do not disable any behavior that originally satisfy the properties.
*   valid : follow the physical constraints of smart devices

Based on user research, the rules are classified to seven categories.

*   One-State Unconditional : “Smart refrig- erator should always be on.”
*   One-Event Unconditional : “My thermo- stat should never go above 75 degrees.”
*   One-State Duration : “My smart lights should stay on for at least 30 seconds each time.”
*   Multi-State Unconditional : “Never run the washing machine and the dish washer at the same time.”
*   State-State Conditional : “The stove should always be off if no one is home.”
*   Event-State Conditional : “My smart win- dow should never be opened while the AC is on.”
*   Event-Event Conditional : “My smart door lock should always lock after I come in.”

Each of these categories have a direct translation to [[LTL]] formulas, e.g. State-State Conditional $G(\neg home \implies \neg stove)$

AutoTap interface:

![[image 2020-11-13-11-47-44.png]]

synthesis
---------

three steps:

1.  (construction)Turn the given smart-device system, TAP rules (if any), and the desired property φ into a Büchi Automaton A accepting φ-violating executions, like what traditional model checkers do internally.
2.  (patch)modify A so that all φ-satisfying executions are kept (accommodating) and all originally accepted (φ-violating) executions disappear (property-compliant)
3.  (synthesis)Find valid TAP program that make the automaton changes in step 2.

### model construction

First, a transition system is built for a set of devices together with their TAP rules, if any. **the events in this transition system are classified as controllable and uncontrollable (by the user)**. Then this system is translated to LTL.

Then combine this automaton with the automaton representing $\neg \phi$, where $\phi$ is the LTL formulas input by user.

#### timing

there are two constructs `t#e`(e happens in past t seconds) and `t*ap`(ap has been true in at least t seconds.)

The timing attributes are handled by AutoTaps's own design, instead of MTL or timing automata. for each occurrences, a timer is created. the timer is updated by a special `tick` event, which finds the smallest positive value of the timers associated with the current state, and count down every timer by that value. e.g. timer (0, 30, 100) would become (0, 0, 70) after `tick` because counting down by smaller gap will not affect timing-related propositions.

this approach is simpler and light-weight for checking and synthesis

### patch Büchi automaton

given a Büchi Automaton A that accepts all φ-violating executions. If no execution can be accepted by A, users’ desire φ is already guaranteed.

Otherwise, AutoTap must figure out how to change A so that all (and only those) paths that infinitely visit A’s accepting-node set disappear.

#### key observation

*   as long as φ is an [[LTL]] [[safety property]], we can always find an [[Büchi automata]] of $\neg \phi$ whose only accepting node has a single edge pointing to itself.
*   A, which is obtained by combining this automata with the automaton obtained from the system, has no edge connecting an accepting state to a non-accepting state.

thus, any non-violating execution will not go through an accepting state.

#### algorithm

find all the edges that connect a non-accepting state to an accepting state. cut them all.

the complexity is linear in the number of edges.

### TAP synthesis

AutoTap needs to identify additions of, or revisions to, TAP rules that can delete the edges identified in algorithm (bridge edge)

because every bridge edge corresponds to an edge in system model and an edge in the automaton of LTL formulas, and we cannot change the formula, so we need to change the rules to change the system model, so that the atomic propositions associated with these two edges conflicts, and the bridge edge disappears.

the most basic way of doing this is to add a rule. see pic below:

![[image 2020-11-13-14-17-45.png]]

AP2 becomes transient, so no longer match the edge in LTL.

### refinement

*   trigger state: using AP1 as triggering condition is not necessary, we can weaken it. but we must make sure the new triggering condition must conflict with other states where the event e1 could be triggered. This can be encoded as a [[set cover problem]].
*   trigged action: if the bridge has multiple successor (like e2), we can choose any one except non-controllable and violating ones.
*   if a rule already exists, revise it.