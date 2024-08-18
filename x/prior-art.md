# CAS systems

- [IPFS](https://en.wikipedia.org/wiki/InterPlanetary_File_System)
  - https://www.youtube.com/watch?v=jNKDeXs5V0Y 
- [Perkeep](https://en.wikipedia.org/wiki/Perkeep)
- [Venti](https://en.wikipedia.org/wiki/Venti)
- [Git](https://en.wikipedia.org/wiki/Git#Implementations)
- [git-annex](https://en.wikipedia.org/wiki/Git-annex)
- [XAM](https://en.wikipedia.org/wiki/XAM)
- [Arvados](https://arvados.org/)
- [casync](https://en.wikipedia.org/wiki/Casync)

## What are the main differences?

- protocol agnostic. If we know the hashing algorithm (e.g., SHA256), then we don't care how we get the data.
- content-dependent hash tree as a hash function. The function allows us to find redundancies in data blocks. We will be glad if other systems (e.g. IPFS) will use the content-dependent hash tree function.
- we would like to build applications and services based on a protocol abstraction layer with decentralized identities. The applications and services shouldn't depend on any specific protocol.
- data-block set computations. We can have deterministic programming languages which can operate on content-addressable data. It opens a lot of possibilities. For example, the result of the same program can be validated by different users. A pair of hash addresses for data and code should generate the same result on any platform.

The main principle is that we would like to collaborate instead of compete in the ecosystem. If IPFS implements the hash functions, we will be glad to use IPFS as one of the protocols. 
At least at the current moment, the ecosystem is in its infancy, and there is a lot of space for growth.
