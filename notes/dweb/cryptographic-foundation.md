# Cryptographic Foundation

(5 mins)

- Noise. Noise is expensive. The task of an engineer is simplification, increasing the signal-to-noise ratio.
- Abstraction layers. We use it all the time, we don't need to know how a specific car works to drive it. But some basic knowledge can help.
- What's wrong with current decentralized systems? We speak about protocols as the transport layer. An abstraction layer that we would like to have is "Doesn't matter how we receive the message, if we can prove statements about the message"

Properties of desired systems:
- independent from anything else. A person can start to create and publish data at any time, anywhere
- merging
- future-proofs

## Simple Proofs 

(15 mins)

1. Prove that the data is what we are looking for.
   A hash function. For example, `sha256`, `sha512`, `sha3-256`, etc.
   And links, similar to HTTPS. For example, `sha256:35fe45...`. But this link is forever.

3. Prove that the message is from a party.
- Example with a guard.
  ```
  Bob is in prison.
  A guard gave him a message from Alice.
  How can Bob be sure that the message is from Alice? He can't trust a guard (transport layer).
  Private-public key cryptography. 
  ```

  Algorithms: elliptic curves, `secp256k1` is used in Bitcoin. Others, including post-quantum cryptography (PQC) and NIST approved.

3. Trusted time stamps.

4. Compatibilities

- Incompatibilities between different decentralized systems, for example, BlueSky and Nostr. How can we solve it if we can't change history (signed time stamp)? Options:
  1. An application understands multiple formats from different systems.
  2. A kind of smart contract language for deterministic computations that allows for transforming signed data on a user's machine. If a user agrees with the script, then they can see data from other networks:
     ```
     - script (as a data transformation function) `f`
     - signed data `x`
     - result: `f(x)`
     ```

## What can we build on top of it? 

(10 mins)

DISOT: Decentralized Immutable Source Of Truth

1. Versioning. The way to add mutability to immutable decentralized storage. 

2. Relative names (choose the names you like for yourself, your friends, and others). Everyone is at the center `root` of their own Universe. There is no more cybersquatting, don't care about name conflicts, no more paying for domain names, and no need to pay blockchain fees for "decentralized" domains. How it works, example:
   - Alice `0164`
     ```js
     { Alice: ':0164`, Bod: ':56f4' }
     ```
   - Bob `56f4` 
     ```js
     { Alice: ':0164', MyLove: ':0164', Bob: ':56f4', Charlie: ':7945', Doc2025: ':9351' }
     ```
   - Charlie `7945`
     ```js
     { Charles: ':7945', Bob: ':56f4' }
     ```
   Examples:
   ```
   0164/Bob -> 56f4
   0164/Bob/Charlie -> 7945
   0164/Bob/MyLove -> 0164
   ```
   
3. Trusted Networks.

4. Collective security.

5. Decentralized AI

## What are we working on?

- **Blockset** allows us to reduce storage, traffic, and computations. And find differences in big data very fast. This could be a foundation for decentralized AI, when our personal AI agents can share differences between trusted connections.
- **FunctionalScript** is a purely functional, content-addressable subset of JavaScript. It's a kind of generic smart contract language with familiar JavaScript syntax and semantics. JavaScript in Web3 and DWeb, which could help smooth the transition from Web2 to Decentralized Web (DWeb). 

---

- Proofs vs protocols. Protocol agnostic.
- Limited authorities:
  - Time Stamping Authority. They could be replaced by blockchain or other collective consensus algorithms.
  - Others, if needed, such as bridges to Web2, DNS, etc.
  But, it's a user choice!
