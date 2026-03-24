---
date: 2023-03-23
tags:
  - idea
  - cbmc
see also:
  - "[[PMVerify Implementation Ideas]]"
---

## Data Representation

The type `irept` is the base type of any data, containing an underlying tree-like data structure. It has an ID field, an enumeration defined in `irep_ids.def`, correponding to each type of node it may contain.

Then, each subtype of this type correpsonds to an ID, and these subtypes add new methods to manipulate them, but not new fields.

Three main subtypes:

- typet
- codet
- exprt

## Related

-  [[CBMC Intermediate representation GOTO program]]
