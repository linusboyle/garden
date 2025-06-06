---
title: safety property
date: 2022-01-20
tags: 
aliases:
  - safety
---

# safety property
> **Safety**
> 
> A safety property is, informally, that “bad things never happen”. Like “We never go above the rate limit”, or “we never allow an unauthorized user to access this” or “The clock never runs backwards”. Some common genres of safety properties are:
> 
> *   **Invariants** must be true for every single state. The account balance is never below zero. A key is never assigned to two different people.
> *   **Action/Transition Properties** limit how the system can change from state to state. If a message leaves the task queue, it must have been taken by a worker or moved to the dead queue. The regulator only changes the temperature by at most 2 degrees per step. The history log monotonically grows.
> *   Safety properties on subsequences of states (I don’t think there’s a name for this). If the editor shows `x`, then you make a change, and then undo it, then you should have `x` again.
> *   Boundedness requirements, like “we must alert all other machines between starting shutdown and completing it.” Anything where A must happen within a certain timeframe of B, or before C happens.
> *   More general properties can be things like “y should never be more than the highest value x ever was”. Having trouble thinking of a more realistic property that isn’t trivially convertible into an invariant.
> 
> If a safety property is violated, the system can do it in a finite number of steps. There is a point where you can say “This and this and this happened, and now we’ve messed up.” [Safety and Liveness Properties • Buttondown](https://buttondown.email/hillelwayne/archive/604c08d2-b49b-4572-9762-b2be14f72c06)

Also applicable in AI:

> For example, the designer may be able to prove whether the agent can achieve a goal, whether it can avoid getting into situations that may be bad for the agent (**safety**), whether it will get stuck somewhere ([[liveness property]]), or whether it will eventually get around to each of the things it should do (**fairness**). [1.4.1 Design Time, Offline and Online Computation‣ 1.4 Designing Agents ‣ Chapter 1 Artificial Intelligence and Agents ‣ Artificial Intelligence: Foundations of Computational Agents, 2nd Edition](http://artint.info/2e/html/ArtInt2e.Ch1.S4.SS1.html)

for safety properties expressed by temporal logic, see [[temporal safety property]]