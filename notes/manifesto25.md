# Manifesto

We live in the digital world where we keep our data on centralized services, with vendor lock-ins, and with constant policy changes, where your data (including your contacts) can disappear at any time because of these changes. There are a lot of initiatives and promises to change the situation, such as [Fediverse](https://en.wikipedia.org/wiki/Fediverse), [Nostr](https://en.wikipedia.org/wiki/Nostr), [Bluesky](https://en.wikipedia.org/wiki/Bluesky), and various blockchain-based social networks. But how can we be sure that one of the new technologies is really different and gives users digital rights and freedom?

In this article, I formulated what kind of digital rights we can expect from new services and what technical properties the services should have to support these rights. This article is not limited to social networks but is about our complete presence in the digital world, interaction with others, trust, and handling and retaining data.

## 1. Permanent Links

Users should be able to reference data using universal links that uniquely and permanently identify it. Once we have such a link, it should always reference the original data. 

**Solution:** The system should support [cryptographic hash functions](https://en.wikipedia.org/wiki/Cryptographic_hash_function) as a reference to data. 

There are plenty of cryptographic hash functions. A system that supports multiple well-known hash algorithms deserves additional points.

## 2. Data Synchronization

Users should be able to keep and synchronize their data on personal devices. 

**Solution:** Synchronization to a personal [content-addressable storage](https://en.wikipedia.org/wiki/Content-addressable_storage).

Additional points for:

- If the storage can be synchronized with other services, then there is no need to manually synchronize our data by copying and pasting the same data across different services. This should significantly reduce the fragmentation of our digital presence.
- If the storage is a generic Content Addressable Storage. This means it can contain data from different systems. For example, [Git](https://en.wikipedia.org/wiki/Git) is not generic content-addressable storage. [BlockSet](https://github.com/datablockset/blockset) is a generic CAS.
- conflict-less protocol-agnostic CAS synchronization. For example, while Git supports multiple protocols, Git synchronization is not conflict-less. This is important when we are trying to synchronize massive storage offline or with limited network access.

## 3. Decentralized Identity

Users should be able to create and use only a few identities that don't depend on centralized services. 

**Solution:** [Decentralized Identifier](https://en.wikipedia.org/wiki/Decentralized_identifier).

Additional Points for:

- The same DID can be used for different services.
- Support for multiple DID algorithms.
- Service recognizes associated decentralized and centralized identities.

## 4. Content Authorship

Users should be able to confirm the authorship of their content. 

**Solution:** [Digital Signatures](https://en.wikipedia.org/wiki/Digital_signature) and [Trusted timestamping](https://en.wikipedia.org/wiki/Trusted_timestamping). A user's content with a signature and a trusted timestamp can be used as proof of authorship.

Additional points for:

- Support for multiple digital signature algorithms.
- Support for additional meta information for content such as licensing.
- Support for multiple trusted time-stamp authorities.
- Support for decentralized trusted time-stamps, such as blockchain with a consensus algorithm.

Signed and timestamp data is immutable and called a **source of truth**. Any data generated from the source of truth is called derived data and can mutated and used for search optimization.

## 5. Right to Name and Define

Users should have the right to name things without a centralized or decentralized authority. 

**Solution:** Relative names. Everyone can have their own dictionary. Everyone is the center of the Universe.

Additional points are deserved if a user can use dictionaries of others to form complex names, similar to a file path, such as `Alice/Bob/Charlie/CharlieProject`.

## 6. Right to Ignore

Users should have the right to ignore information from untrusted sources and not interact with them. 

**Solution:** trusted connections. For example, a user may opt-in to receive information from their 2nd or 3rd circle of connections.

Additional Points for

- Support for relative/subjective weight ratings for different topics. We are all different, so a user may trust a doctor for medical recommendations but not so much in stock market topics.

By solving the problem, we can effectively fight spam, misinformation, and deepfakes. It will also allow us to build and participate in multiple digital communities with trusted connections and interactions.

## 7. Deterministic Data Transformation

Users can authorize code and applications to deterministically transform data from the source of truth. This means that every time we run the same code on the same data, we must receive the same result. 

**Solution:** Content-addressable programming Languages, such as [Unison](https://www.unison-lang.org/) and [FunctionalScript](https://github.com/functionalscript/functionalscript). Pure functional programming languages can also be used, but content-addressable programming languages are much better suited for the role.

This operation can produce conditionally signed data by transforming old signed, timestamped data into new formats for future-proofing.

---------------------

Digital freedom, in this manifesto, means the right to own data and digital identities and share and communicate with others without third parties. It also means the freedom to ignore information from others. Freedom to be left alone, such as living offline, in subnetwork, or rare synchronization with the internet. Freedom to create decentralized communities without unelected centralized power. Freedom of choice to use different algorithms for searching and filtering information. Freedom for digital privacy, such as encrypted data storage and communication.

Also, businesses and communities should have the freedom to refuse services to anyone.

It may seem that the last freedom contradicts previous personal digital rights. And that's true for centralized services. If you are using a centralized service, I can lose your digital identity, data, and contacts if the centralized service rejects you. However, I will try to show that we can have both. You may lose some comfort and services, but the service will not be able to take your digital identity, data, and connections if it uses the principles described above.

Because of centralization and incompatibilities between decentralized networks (e.g. blockchains) we have huge fragmentation of our data. Currently, we have to have multiple accounts on different services and decentralized networks and my list of contacts is such a mess. Every time you open an account on a new network you have to rebuild all your contacts again and again.

Users have rights to start their own chain/graph of records, transactions, other data blocks and merge it with others at any time they like.

So, what are the problems with the digital space? For me, the most significant problems are data/identity ownership and trust.

## AI

without such decentralized systems, people will not have ownership of knowledge-based and AI.

###

Q. if we use multiple services for the same data how we can avoid duplications and how we can refernce data without specifiaing domain?
A. it's possible to have a link on digital content using it's a cryptographic hash as an address.

Q. How can we have an identity without central registration?
A. DID

Q. I don't feel comfortable to work with such non human readable names, I would like to have address content and people using human readable names.
A. relative names and paths.

## Compatibility Problem

Solution: generic CAS systems. If our CAS systems can be synchronized using different protocols and cryptographic hashes, then we can keep all sorts of information in different CAS systems on different machines and using different protocols to synchronize them without duplications.

## Future Proof

- hash and digital signatures

- formats

One of the problem that some formats could be abandoned and it's always hard to support multiple formats in one system. If a system supports only one format and I have a document that One of the solution could be a conditional signing.

## Risk for users

What if we abandon the project, will you lose all your data, posts, connections? As soon as you keep it in one or more storages, your data can be accessed and reused with any other product or service. This is the main reason why we keep user's data on user's storages. This storages can be copied and synchronized as a set of files.

## Competitors

Any real competitor is building products according to the CAI principles or better. This means people can use it with existing CAI products on the same data without risking losing everything. I would be glad to have more people working in this area and would love to use their products and services. Even better, I would be happy to help them. For me, they are not competitors; they are partners.

And if their products are better, I have found a solution for my personal problems in the digital space. In this case, I can switch my focus to other subjects. They can be related to CAI, such as building decentralized, community, and personal AI on top of CAI, or unrelated. There should be enough work for me and my team. I would also be glad to switch my focus to learning more about society structure, game theory, the global economy, quantum physics, and information physics. Please, make better CAI products so I can retire. Anyway, it's a win-win situation. Or, as a big fan of the [Arrival](https://en.wikipedia.org/wiki/Arrival_(film)), I would call it a non-zero-sum game.

### Analysis of Existing Products

- Social Networks:
  - [Nostr](https://nostr.com/) is very close, and we may use some of their formats, so our products will be able to post and get data from Nostr into CAS.
  - [BlueSky](https://bsky.social/), as far as I understood, their protocol works on content-addressable data and IPFS. I'm not sure if they support properly decentralized identities and public-private keys.
- Decentralized Source Control Systems such as [Git], [Mercurial] are very cool. However, they have two major problems:
  1. They are not generic CAS systems, so we still rely on such centralized services as GitHub, GitLab, and BitBucket for tracking issues, PRs, project management, etc.
  2. Digital identities are not the main feature; commits and branches can live without digital signatures. That is one of the leading causes of failures during synchronization. If all data were digitally signed (including branches), no name and synchronization conflicts would exist. Note: You may still need to merge branches and resolve merge conflicts, but there will not be branch name collisions.
- Decentralized Secure Communication/Messengers:
  - [Matrix](https://matrix.org/),
  - [Signal](https://signal.org/).
- CAS:
  - generic CAS: IPFS
  - specialized CAS: Decentralized revision control systems, such as Git, Mercurial.
- Blockchain. I will not analyze all of them because the biggest flow to using blockchain as a content-addressable space is consensus. It may sound controversial, but I don't need or care about consensus and anonymous signatures on my digital content. There are applications for blockchain, such as decentralized trusted time stamps and some DeFi. But, in general, please, don't build social networks on the blockchain; don't! Any blockchain satisfies CAI requirements and can be stored in CAS, but blockchains are not the foundation of CAI. By the way, in theory, networks with decentralized trust ratings can build DeFi much more efficiently than blockchain consensus algorithms allow.

In general, all of these products follow some principles of CAI, but if they follow all, then they can be easily synchronized with each other using multiple transport layers. The main idea of a content-addressable internet is that you can use multiple applications and services on the same data.

See also https://emilyliu.me/blog/open-network, https://docs.bsky.app/docs/advanced-guides/resolving-identities, https://github.com/did-method-plc/did-method-plc?tab=readme-ov-file#how-it-works

## Next Step

I will continue to work on solutions to the problems. If you are interested in sponsoring, investing, or helping to solve the problems in other ways, let me know.

---

Structure:

- Problems
- Rights and Freedoms
- Solutions to unlock the rights
- nolock.social solution
