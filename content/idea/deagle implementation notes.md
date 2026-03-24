---
title: deagle implementation notes
date: 2023-01-17
tags: 
aliases:
---

1. front-end info passed to solver (bmc_util.prepare_property_decider)
	- oc_edge_table -> e1, e2 (two events of one oc edge), guard, and kind.
	- oc_write_guard -> name, guard (of every shared write)
	- oc_write_location -> name, location
	- Added in memory_model_sct.program_order