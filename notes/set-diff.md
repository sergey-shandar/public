# How to calculate a set difference?

Imagine we have two sets of data blocks on two computers connected through the Internet. How can we synchronize these two sets using as little traffic as possible? 

```mermaid
graph LR
  subgraph APC[Alice's PC]
    A((A))
  end
  subgraph BPC[Bob's PC]
   B((B))
  end
  APC<-->BPC
```

Synchronize means that both computers have all data blocks from both original sets.

```mermaid
graph LR
  subgraph APC[Alice's PC]
    A((A∪B))
  end
  subgraph BPC[Bob's PC]
   B((A∪B))
  end
  APC<-->BPC
```

## Step 1. A cryptographic hash function to identify blocks 

To minimize the amount of traffic, we can use cryptographic hashes of the data blocks instead of the data blocks themselves. That's about 256 bits (32 bytes) per data block. Alice and Bob can send each other a list of their hashes and then request missing data blocks.

## Step 2. A cryptographic hash function for the list of hashes

Before sending a complete list, Alice and Bob can send each other hashes of their lists. We don't need to synchronize the sets if the hashes are identical. **Note:** To ensure that we have identical hashes for the same sets, the lists of hashes must be sorted.

## Step 3. A tree of hashes

### A node

If these two sets differ by only one item, in our previous implementation, we still need to send a complete list of hashes $O(n)$. However, if we divide a sorted list of hashes into two sublists, we can only send half of the list. How we split the sorted lists should guarantee that if two lists differ by only one item, they should have one common sublist. To satisfy this condition, our split function should not depend on items already in the sublist but rather rely only on an item. $f(x)$ returns a sublist number, either $0$ or $1$; $x$ is an item hash. The simplest function is to take the highest bit of the hash.

### Recursion

By removing the highest bit from the hash, we can recursively apply the same split function to resulted sublists.

The tree's structure is similar to a prefix tree, also known as [Trie](https://en.wikipedia.org/wiki/Trie), but it skips nodes with empty subnodes.

### Example

In this example, our hash function is only 8 bits.

```
22 38 41 56 63 6D 7D 7F 8F 9A 9B A8 BA C6 D0 DA
```

```mermaid
flowchart LR
  root["[00..FF]"] --> 0["0[00..7F]"] --> 001["001[20..3F]"] --> 22((22))
  root --> 1["1[80..FF]"] --> 10["10[80..BF]"] --> 100["100[80..9F]"] --> 8F((8F))
  0 --> 01["01[40..7F]"] --> 010["010[40..5F]"] --> 41((41))
  001 --> 38((38))
  01 --> 011["011[60..7F]"] --> 0110["0110[60..6F]"] --> 63((63))
  010 --> 56((56))
  011 --> 011111["011111[7C..7F]"] --> 7D((7D))
  0110 --> 6D((6D))
  011111 --> 7F((7F))
  1 --> 110["110[C0..DF]"] --> C6((C6))
  10 --> 101["101[A0..BF]"] --> A8((A8))
  100 --> 1001["1001[90..9F]"] --> 9A((9A))
  1001 --> 9B((9B))
  101 --> BA((BA))
  110 --> 1101["1101[D0..DF]"] --> D0((D0))
  1101 --> DA((DA))
```

### The worst case

```
00 80 C0 E0 F0 F8 FC FE FF
```

```
|0 
|00|8
   |80|C
      |C0|E
         |E0|F0
            |F0|F8
               |F8|FC
                  |FC|FE
                     |FE|FF
```

## Traffic

Multiple nodes can be kept and sent together. For example, a server may respond with multiple levels or combine answers to multiple requests. The binary nature of the tree allows the grouping of nodes using different rules on demand.

## Summary

Blockset uses this algorithm to create subtrees for ordered sequences in the CDT0 hash function. If your set is ordered by different rules, you may consider using [Merkle Search Tree](https://inria.hal.science/hal-02303490/document).
