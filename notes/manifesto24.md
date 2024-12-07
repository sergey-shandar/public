# Manifesto

This manifesto is about digital freedom, digital rights, and decentralization. However, it is not about blockchain. At least in my mind, a manifesto is associated with something intrusive and aggressive, that has no room for discussion. This one is more about problems in our digital life and possible solutions.

Digital freedom, in this manifesto, means the right to own data and digital identities and share and communicate with others without third parties. It also means the freedom to ignore information from others. Freedom to be left alone, such as living offline, in subnetworks, or rare synchronization with the internet. Freedom to create decentralized communities without unelected centralized power. Freedom of choice to use different algorithms for searching and filtering information. Freedom for digital privacy, such as encrypted data storage and communication.

Also, businesses and communities should have the freedom to refuse services to anyone.

It may seem that the last freedom contradicts previous personal digital rights. And that's true for centralized services. If you are using a centralized service, I can lose your digital identity, data, and contacts if the centralized service rejects you. However, I will try to show that we can have both. You may lose some comfort and services, but the service will not be able to take your digital identity, data, and connections if it uses the principles described above. 

Because of centralization and incompatabilities beetween decentralized networks (e.g. blockchains) we have huge fragmentation of our data. Currently, we have to have multiple accounts on different services and decentralized networks and my list of contacts is such a mess. Everytime you open an account on a new network you have to rebuild all your contacts again and again.  

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
  - specialized CAS: Decentray version control systems, Git, Mercurial.
- Blockchain. I will not analyze all of them because the biggest flow to using blockchain as a content-addressable space is consensus. It may sound controversial, but I don't need or care about consensus and anonymous signatures on my digital content. There are applications for blockchain, such as decentralized trusted time stamps and some DeFi. But, in general, please, don't build social networks on the blockchain; don't! Any blockchain satisfies CAI requirements and can be stored in CAS, but blockchains are not the foundation of CAI. By the way, in theory, networks with decentralized trust ratings can build DeFi much more efficiently than blockchain consensus algorithms allow.  
 
In general, all of these products follow some principles of CAI, but if they follow all, then they can be easily synchronized with each other using multiple transport layers. The main idea of a content-addressable internet is that you can use multiple applications and services on the same data.

See also https://emilyliu.me/blog/open-network, https://docs.bsky.app/docs/advanced-guides/resolving-identities

## Next Step

I will continue to work on solutions to the problems. If you are interested in sponsoring, investing, or helping to solve the problems in other ways, let me know.
