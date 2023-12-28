<div align="center">
  <h1>Disk Scheduling Algorithms</h1>
  <p>Optimizing disk I/O operations through various scheduling algorithms.</p>
</div>
Overview

This project implements disk scheduling algorithms to optimize the performance of disk I/O operations. Disk scheduling is a critical component of operating systems, responsible for determining the order in which pending I/O requests are serviced to minimize seek time and improve overall disk efficiency.
Implemented Algorithms

    First-Come-First-Serve (FCFS)
        Description: The simplest scheduling algorithm, serving requests in the order they arrive.

    Shortest Seek Time First (SSTF)
        Description: Selects the request with the shortest seek time, minimizing head movement.

    SCAN
        Description: The disk arm moves in one direction servicing requests until the end of the disk is reached, then reverses direction.

    C-SCAN
        Description: Similar to SCAN but restricts movement to one direction, servicing requests until the end, and then jumping to the beginning.

    LOOK
        Description: Similar to SCAN, but the arm only stops if there are no requests in the current direction.

    C-LOOK
        Description: Similar to C-SCAN, but the arm only stops if there are requests in the current direction.
