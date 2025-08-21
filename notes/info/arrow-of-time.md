# Type of systems

## 1. Linear Global Time with Deterministic 

There are no differences between the past and the future. The amount of information is the same at every step.

As described in the previous article, a system that has `N` possible states can be split into multiple sub-systems `N0`, `N1`, ... `NM`, where `N = N0 * N1 * ... * NM`.  

### 1. Local Mutation

Where each system can mutate to the next state by a specific deterministic rule. For example, each minimal subsystem with `K` can proceed to the next state by using, e.g, this formula `S(I) = (S(I - 1) + 1) % K`. Example

```
2: 0, 1, ..
3: 0, 1, 2, ...
4: period is 2. Either:
   - 00, 11, ...
   - 01, 10, ...
6: period is 6. Either:
   - 00, 11, 20, 01, 10, 21, ...
```

The period is a product of all unique prime states.

Possible periods:

```
_ _   _   _        __    __          __    __          __                __    __       
_ _   _ _ _     __ __    __ __ __    __    __    __ __ __       __       __    __    __ __ __
2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35
```

### 2. Interaction

To save information, all transformations must be reversible.

Symmetry: If one system interacts with another, then they both have the same impact on each other. The simplest interaction is a swap:

```
00 <=> 00
01 <=> 10
10 <=> 01
11 <=> 11
```

This operation is not just reversible, it's symmetrical in time. Applying twice, we receive the same result. 

Two systems that don't have common dividers don't interact. Mostly because such operations break symmetry.

## 2. Tree (Probabilistic, Multiverse)

Try all possible variations. It has an arrow of time.

When we introduce a random number, we can either:

- add a new state
- replace the existing one (delete history)

## 3. DAG

States can merge
