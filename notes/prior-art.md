# CAS systems

- [IPFS](https://en.wikipedia.org/wiki/InterPlanetary_File_System)
- [Perkeep](https://en.wikipedia.org/wiki/Perkeep)
- [Venti](https://en.wikipedia.org/wiki/Venti)
- [Git](https://en.wikipedia.org/wiki/Git#Implementations)
- [git-annex](https://en.wikipedia.org/wiki/Git-annex)
- [XAM](https://en.wikipedia.org/wiki/XAM)
- [Arvados](https://arvados.org/)
- [casync](https://en.wikipedia.org/wiki/Casync)

## What's the main differences?

- protocol agnostic. If we know the hashing algorithm (e.g. SHA256), then we don't care how did we get the data.
- content-dependent hash tree as a hash function. The function allows to find redundancies. We will be glad if other systems (e.g. IPFS) will use the content-dependent hash tree function.
- we would like to build application and services based on protocol abstraction layer with decentralized identities. The applications and services shouldn't depend on any specific protocol.
- data-block set computations. We can have deterministic programming languages which can operate on content-addressable data. It opens a lot possibilities.

The main principle: we would like to collaborate instead of compete in the ecosystem. If IPFS implements the hash functions, we will be glad to use IPFS as one of the protocol. 
At least in the current momemnt, the ecosystem is its infancy, and there is a lot of space to growth.
