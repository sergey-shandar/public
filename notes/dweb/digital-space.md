# Digital Space. How it should be Done

We live in the digital epoch, but we keep our data on centralized services, with vendor lock-ins and constant policy changes, where your data (including your contacts) can disappear at any time because of these services. There are a lot of initiatives and promises to change this, such as [Fediverse](https://en.wikipedia.org/wiki/Fediverse), [Nostr](https://en.wikipedia.org/wiki/Nostr), [Bluesky](https://en.wikipedia.org/wiki/Bluesky), and various other blockchain-based social networks. But how can we be sure that one of the new technologies is truly different while giving users digital rights and freedom?

In this article, I formulated what kind of digital rights we can expect from new services and what technical properties the services should have to support these rights. This article is not limited to social networks but is about our complete presence in the digital world, interaction with others, trust, and how we handle our data. 

## 1. Permanent Links

Users should be able to reference data using universal links. These links reference the data. 

**Solution:** The system should support [cryptographic hash functions](https://en.wikipedia.org/wiki/Cryptographic_hash_function) as a reference to data. 

There are plenty of cryptographic hash functions. A system that supports multiple well-known hash algorithms deserves additional points.

## 2. Data Synchronization

Users should be able to keep and synchronize their data on personal devices. 

**Solution:** Synchronization to a personal [content-addressable storage](https://en.wikipedia.org/wiki/Content-addressable_storage).

Additional points for:

- If the storage can be synchronized with other services, then there is no need to manually synchronize our data by copying and pasting the same data across different services. This should significantly reduce the fragmentation of our digital presence.
If the storage is a generic Content Addressable Storage (CAS), it can contain data from different systems. For example, [Git](https://en.wikipedia.org/wiki/Git) is not a generic content-addressable storage. [BlockSet](https://github.com/datablockset/blockset) is a generic CAS.
- Conflictless protocol-agnostic CAS synchronization. For example, while Git supports multiple protocols, Git synchronization is not conflict-less. Conflictless CAS synchronization is important to maintain when synchronizing massive storage offline or with limited network access.

## 3. Decentralized Identity

Users should be able to create and use identities that don't depend on centralized services.

**Solution:** [Decentralized Identifier](https://en.wikipedia.org/wiki/Decentralized_identifier).

Additional points for:

- If the same DID can be used for different services.
- If a service supports multiple DID algorithms.
- If a service Service recognizes associated decentralized and centralized identities.

## 4. Content Authorship

Users should be able to confirm the authorship of their content. 

**Solution:** [Digital Signatures](https://en.wikipedia.org/wiki/Digital_signature) and [Trusted timestamping](https://en.wikipedia.org/wiki/Trusted_timestamping). A user's content with a signature and a trusted timestamp can be used as proof of authorship.

Additional points for:

- Supporting multiple digital signature algorithms.
- Supporting additional meta information for content such as licensing.
- Supporting multiple trusted time-stamp authorities.
- Supporting decentralized trusted time-stamps, such as blockchain with a consensus algorithm.

Signed and timestamped data is immutable and called a source of truth. Any data generated from the source of truth is called derived data and can be mutated and used for search optimization and other purposes.

## 5. Right to Name and Define

Users should have the right to name things without a centralized or decentralized authority. 

**Solution:** Relative names. Everyone can have their own dictionary. Everyone is the center of their own Universe.

Additional points are deserved if a user can use dictionaries of others to form complex names, similar to a file path, such as `Alice/Bob/Charlie/CharlieProject`.

## 6. Right to Ignore

Users should have the right to ignore information from untrusted sources and not interact with them. 

**Solution:** trusted connections. For example, users may opt-in to receive information only from their 2nd or 3rd circle of connections.

Additional Points for

- Supporting relative/subjective weight ratings for different topics. We are all different, so a user may trust a doctor for medical recommendations but not so much in stock market topics.

By solving the problem, we can effectively fight spam, misinformation, and deepfakes. It will also allow us to build and participate in multiple digital communities with trusted connections and interactions.

## 7. Deterministic Data Transformation

Users can authorize code and applications to deterministically transform data from the source of truth. This means that we must receive the same result every time we run the same code on the same data. 

**Solution:** Content-addressable programming Languages, such as [Unison](https://www.unison-lang.org/) and [FunctionalScript](https://github.com/functionalscript/functionalscript). Purely functional programming languages can also be used, but content-addressable programming languages are preferred.

This operation can produce conditionally signed data by transforming old signed timestamped data into new formats for future-proofing.

Notes:
- examples of what if we don't have it
- it's not about DWeb or even Web3 as we know it; It's about generic digital spaces that can split and merge.
