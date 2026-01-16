---
date: 2020-01-01
tag:
- annotation
- src/webpage
---

# Revisiting Distributed Memory in the CXL Era


Created: [[2025-12-01]] 

> In the realm of distributed programming, two main paradigms prevail: message passing (MP) and distributed shared memory (DSM). DSM is designed to be more ease-of-use because it provides a unified memory space that abstracts away the complexities of explicit data communication.



[See in context](https://hyp.is/XzGKCM6KEfC_NPNER2NrsA/www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/) at [Revisiting Distributed Memory in the CXL Era](https://www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/)



Created: [[2025-12-01]] 

> n practice, the less intuitive MP model is more commonly used than DSM. This preference is often attributed to the assumption that the high cost of remote communication significantly hampers the efficiency of DSM systems.



[See in context](https://hyp.is/YZdpKs6KEfCTqDuOdTMIxQ/www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/) at [Revisiting Distributed Memory in the CXL Era](https://www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/)



Created: [[2025-12-01]] 

> The transition from Ethernet to Remote Direct Memory Access (RDMA), and now to CXL, marks a significant evolution in interconnectivity technologies.



[See in context](https://hyp.is/doN4ks6KEfCUg9MwmOAIpA/www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/) at [Revisiting Distributed Memory in the CXL Era](https://www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/)



Created: [[2025-12-01]] 

> The subsequent introduction of CXL represents the latest advancement, aiming to provide high-speed and, critically, coherent data transfer between different nodes.



[See in context](https://hyp.is/mPYeos6KEfCLEzuG77mn2Q/www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/) at [Revisiting Distributed Memory in the CXL Era](https://www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/)



Created: [[2025-12-01]] 

> the upcoming CXL 3.0/3.1 version promises memory sharing [3], allowing the same memory region to be mapped across multiple machines. In this setup, the hardware would automatically manage cache coherence for concurrent accesses from different machines, essentially realizing a hardware-based DSM model.



[See in context](https://hyp.is/y_QvVs6KEfC-4nuT5KrF0w/www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/) at [Revisiting Distributed Memory in the CXL Era](https://www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/)



Created: [[2025-12-01]] 

> message passing systems typically assume a tightly coupled architecture, where each node can only access its local memory. In contrast, CXL-enabled DSM systems naturally fits into a disaggregated architecture that separates compute and memory resources into distinct pools [4], allowing for more flexible and efficient resource utilization.



[See in context](https://hyp.is/8LAieM6KEfCPpPvJcfwHAg/www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/) at [Revisiting Distributed Memory in the CXL Era](https://www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/)



Created: [[2025-12-01]] 

> in terms of data communication, message passing generally involves data payloads being copied from one node to another, a pass-by-value approach. DSM, alternatively, necessitates just the exchange of object references, embodying a pass-by-reference method.



[See in context](https://hyp.is/ABhJcM6LEfCdbf90TMFVTQ/www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/) at [Revisiting Distributed Memory in the CXL Era](https://www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/)



Created: [[2025-12-01]] 

> In essence, the challenges we face stem from the separate failure domains of the shared distributed objects and the clients referencing them. This separation allows clients the freedom to join, leave, or even fail during operations, as they create, release, and exchange references to remote memory. While this flexibility is user-friendly, it poses significant challenges in memory management. We’ve termed this the Partial Failure Resilient DSM (RDSM), to set it apart from scenarios where all clients fail simultaneously. We believe that effectively handling partial failures is crucial to expanding the use of DSM.



[See in context](https://hyp.is/lqnWGs6LEfCaAAsYYJf3ew/www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/) at [Revisiting Distributed Memory in the CXL Era](https://www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/)



Created: [[2025-12-01]] 

> These procedures might be straightforward as it has only two simple steps, but their sequence is critical. If a system crash occurs between these two steps, problems arise.



[See in context](https://hyp.is/rYXC-M6MEfCu5p_uciwYmA/www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/) at [Revisiting Distributed Memory in the CXL Era](https://www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/)



Created: [[2025-12-01]] 

> our work, CXL-SHM [5], proposes an approach that employs reference counting to reduce the manual workload involved in reclaiming remote memory that has been allocated. However, a standard reference counting system is not robust against system failures.



[See in context](https://hyp.is/rzeAFM6MEfCRHZ93RsVFJg/www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/) at [Revisiting Distributed Memory in the CXL Era](https://www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/)



Created: [[2025-12-01]] 

> A simple solution is to use a lock to ensure that the modification of the reference count is idempotent, and to log this change for recovery purposes. Unfortunately, this method is effective only in scenarios where all clients fail at the same time. In situations of partial failure, where a client may crash after acquiring a lock, this could lead to further complications. To address this, we have shifted from using lock operations in our original algorithm to a non-blocking update process using a distributed vector clock.



[See in context](https://hyp.is/_dCbDM6MEfChaAOmGIH6Vw/www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/) at [Revisiting Distributed Memory in the CXL Era](https://www.sigops.org/2024/revisiting-distributed-memory-in-the-cxl-era/)



