---
title: ocaml guideline
date: 2026-05-03
tags: 
aliases:
---

## FORBIDDEN FEATURE

- NEVER use Obj.magic: Breaks type safety. There is always a better solution.
- There is no place for the double semicolon (`;;`) in OCaml source code. It is used only interactively in the OCaml toplevel (REPL).
- Do not open modules globally. Default to use fully qualified names. Opening a module locally (e.g. `let open...`) is fine. Introduce aliases if needed.
- Do not use the OCaml object/class system. Use modules instead.

## Red Flags

- Most code does not require references. Introducing them should be well justified. In particular, using references to implement loops and similar local control flow is probably avoidable.
- Using `!=` and `==` for equality is probably wrong and you should use `<>` and `=` instead, unless it is performance-oriented code that needs pointer equality.
- Make scoping explicit in constructs like `if` and `match`. A statement sequence inside an `if` or `else` branch must be grouped by `begin` / `end` or parentheses to be governed by the guard. The danger of not realising what code is governed by an if-expression is exasperated by incorrect indentation and by incremental changes to existing code.
- Two basic strategies for error handling exist: using exceptions, or the `Result.result` type. The latter has the advantage of making error handling explicit in the types of functions whereas exceptions are not tracked by the type system. If not clear, prefer `Result` over exception.
- Beware! A while loop is usually wrong, unless its loop invariant has been explicitly written.

## Best Practices

- Purely functional code is easiest to test. Therefore code should be as functional as possible and imperative code minimised.
- Factor out snippets of repeated code by defining them in separate functions.
- The function's usage must appear in the module's interface that exports it, not in the program that implements it. Choose comments as in the OCaml system's interface modules, which will subsequently automatically extract the documentation of the interface module if necessary.
- Use Assertions. Use assertions as much as possible, as they let you avoid verbose comments while allowing a useful verification upon execution.
- You must subdivide your programs into coherent modules. For each module, you must explicitly write an interface. For each interface, you must document the things defined by the module: functions, types, exceptions, etc.
- Prefer: Option.map, Option.bind, Option.value, Result.map, Result.bind over pattern matching
- You must fix every compiler warning, especially about pattern matching.
- Prefer monads over nested pattern matching.

## Indentation and Line Length

- Indentation must always reflect the logic of a program.
- In existing code, adopt the existing style for indentation: tabs or spaces.
- Line length should not exceed 80 characters. Break up long lines in new code in particular.
- Most OCaml code bases use 2 spaces per indentation level.
- When making changes ensure that indentation is still correct after your change, re-indenting as necessary, but not excessively.

## Naming Conventions

Cases and Names matter in OCaml. The following guidelines MUST be enforced.

| Element              | Convention                        | Example                                            |
| -------------------- | --------------------------------- | -------------------------------------------------- |
| Files                | `PascalCase`                      | `UserProfile.ml`                                   |
| Modules              | `PascalCase`                      | `UserProfile`                                      |
| Module Types         | `ALLCAPS`                         | `module type QUEUE`                                |
| Constructors         | `PascalCase`                      | `type tree = Node of int`                          | 
| Types                | `snake_case`, primary type is `t` | `type user_profile`, `type t`                      |
| Type Variables       | `'snake_case`                     | `'a`                                               |
| Values and Functions | `snake_case`                      | `find_user`, `create_channel`                      |
| Record Fields        | `snake_case`                      | `type person = { first_name : string; age : int }` |

General considerations:

- Local names can be short, type variables very short. In general, the length of a name should be proportional to the size of its scope.
- Prefer short, but self-describing names in public interfaces.
- Use scoping (`let`, `struct`) to keep the number of names in a scope small.
- Avoid encoding the type into a name: `x_int` or `x_opt` is usually not better than `x`.
- Avoid repeating the module name in names for types and values: `QMP.connection` is a better name for a type than `QMP.qmp_connection`.
- In a functional language like OCaml, using `get` as part of a name is often redundant unless it involves obtaining a value from a database or file.
- You may see auto-generated code use the style `.mIX_case` where `.MIX_case` was meant, but record fields cannot start with capital letters. Avoid this style.
- You can use longer names for type variables if it improves clarity, e.g. for phantom types.

### Scoping

Use the module system to group values. It's quite common to define simple values that belong together and to indicate this in their names:

```
let option_debug     = false
let option_verbosity = High
let option_log       = stdout
```

It is better to let the module system do the work:

```
module Option = struct
  let debug     = false
  let verbosity = High
  let log       = stdout
end
```

A value can now be accessed like in `Option.debug`. A module simply used for grouping doesn't require an interface.

## Order of declarations

In a module, typically the following order is maintained unless dependencies force a different order or mixing declarations:

1. Exceptions
2. Types
3. Modules
4. Values

## Comments

Comments generally go before the code they are referencing. The possible exception are declarations in interfaces (`mli` files, signatures) and types where they can go after the declaration.

Syntactically there are two kinds of comments:

1. General comments, enclosed in `(*` and `*)`
2. Special comments (OCamlDoc), enclosed in `(**` and `*)`

Special comments are associated with type and values in a program and treated specially by the compiler. They become available in automatically generated documentation. For the association to work, there must be no empty line between a special comment and the element they are associated with.

Code should always be as clear as possible but that clarity cannot always convey the reason behind a design. Comments have the role to provide it: the why.

### What to Comment

- The purpose of a module or functor
- The purpose of a value or function in a signature (interface)
- The purpose of a type declaration or its components, if not obvious
- The purpose of record components and variants in types, if not obvious
- Unusual Algorithms and their complexity
- Invariants when not expressed as assertions
- Error handling
- Basic examples on how to use the library
- Known limitations
- Short introduction to the technology covered by the library, if not obvious

### What not to Comment

- Purpose of a local let binding - the name should tell it
- Every line in a function

## Interfaces

Module interfaces are the best way to document and control an implementation - employ them widely.

Before writing any implementation, design the `mli` first. Clean interface > clever implementation.

As an exception to this rule, if your module only defines signatures then prefer using a `.ml` file for this, otherwise either the `.mli` would just be a duplicate of the `.ml` file, or you'd have to use `.mli` -only modules which don't have good tooling support.

If possible, make a type private and can only be constructed with the function provided by the module.

In order of preference the interface of a module should expose:

- immutable data structures and operations on them. Note that the implementation can use mutation if this makes the implementation of the algorithm more natural, as long as it doesn't "leak" the mutated variable by returning it or storing it outside local variables
- idempotent API calls. If the nature of the API requires mutation (e.g. a database) make it idempotent. The reason is that network/RPC calls may get interrupted before getting an answer, and the caller may not know whether the call succeeded or not, so it can just retry. If you make the retry a no-op it simplifies the logic on both sides.

## Monads

```ocaml
(* Before - nested matches *)
match fetch_user id with
| Ok user -> (match fetch_perms user with Ok p -> Ok (user, p) | Error e -> Error e)
| Error e -> Error e

(* After *)
let open Result.Syntax in
let* user = fetch_user id in
let+ perms = fetch_perms user in
(user, perms)
```