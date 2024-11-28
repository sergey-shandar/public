# What the heck is content-addressable Internet?

In [one of my previous articles](https://medium.com/@sergeyshandar/web3-foundation-e48a475139c2), I highlighted some problems with the current location-based Internet. The main idea of the content-addressable Internet (CAI) is to use a result of different cryptographic functions of data as an address instead of a resource location (like an IP address).

One of the main properties of content-addressable Internet is protocol agnosticism. Protocol agnosticism means that it doesn't matter how we receive data; as soon as we can validate and prove offline some vital hypothesis about the nature of the data. For example, we can do these operations offline: check a hash value, validate a digital signature, and decrypt messages using asymmetric cryptography.

In the next sections, I described the architecture of CAI. It contains multiple layers. To implement a particular layer, we should implement all lower layers.

## Layer 0. A DAG of immutable data

This is the foundation of CAI. The layer works with immutable data blocks. If we would like to reference a data block from our document, we can use [NI RFC](https://www.rfc-editor.org/rfc/rfc6920.html). For example, `ni:///sha256;980...`. Such links allow global addressing without name conflicts.

CAI doesn't specify which hash function we should use, and good CAI software should support multiple hash functions. The main requirement of the CAI hash functions is that they should be cryptographically secure. I wouldn't recommend to use SHA1, for example. However, some hash functions are better for CAI because they can reduce traffic and storage by detecting duplicate parts. [Blockset](https://github.com/datablockset/blockset) implements a hash function called CDT0, which allows traffic reduction but can be extended to support other hash functions. You can read more about the content-dependent tree hash (CDT) in the [article](https://medium.com/@sergeyshandar/content-dependent-hash-tree-9e0f60859415).

Any document can reference other existing immutable documents using their hashes. Such links form a [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG). If our hash function is cryptographically secure, then it is almost impossible to form cycles in the graph.

```mermaid
flowchart TD
  Document3 --> Document2 --> Document1
  Document3 --> Document1
```

## Layer 1. Decentralized identity

The previous section describes a cryptographic hash function that converts content to hash value. This works well for immutable data. This section describes a function that creates a [decentralized identifier](https://en.wikipedia.org/wiki/Decentralized_identifier) using [public key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography). Such a decentralized identifier (DID) using private and public keys allows the creation of a digital signature for any document.

However, creating a digital signature is not enough to claim intellectual property (IP) rights because someone else can also create their own digital signature for the same document. The solution is to apply a [trusted timestamp](https://en.wikipedia.org/wiki/Trusted_timestamping). Creating a trusted timestamp requires trusted centralized services or the consensus of many users, like in blockchain. Now, if you created and published a trusted timestamp as soon as the document was created, even if someone else signs it, they will have difficulty creating a trusted time stamp that precedes yours.

```mermaid
flowchart RL
  TrustedTimeStamp --> DigitalSignature --> Document 
```

Note that we should always apply a trusted time stamp to a digital signature before publishing the chain of data blocks.

Applying a trusted time stamp for each document or message could be expensive, but we can reduce the cost of a trusted timestamp by signing only a top-level document referencing other unsigned documents.

```mermaid
flowchart RL
  TrustedTimeStamp --> DigitalSignature --> Document3
  Document3 --> Document2 --> Document1
  Document3 --> Document1
```

Decentralized identifiers can be referenced from documents using [DID URL](https://www.w3.org/TR/did-core/#did-url-syntax).

Public key cryptography also allows secure communication with two or more parties without sending private keys or passwords to each other. 

## Layer 2. Everyone is the center of the universe

Using hash values and public keys as URLs is not convenient; it is similar to using IP addresses. Currently, to have friendly human-readable URL names, we use centralized services (like DNS) or decentralized consensus-based services, like blockchains. In both cases, the solutions require payments, are prone to cybersquatting, and are not scalable for subnetworks.

Imagine if everyone could publish a document that contains aliases for other documents and users. For example, Alice has a public key `method:345...` and Bob has a public key `method:246...`. Alice has published and signed a document that contained aliases for other documents and her contacts.

```json
{
  "aliases": {
    "Alice-article.txt": "ni:///sha256;980...",
    "Alice": "did:method:345...",
    "Bob": "did:method:246...",
    "Microsoft": "https://microsoft.com/"
  }
}
```

Bob has his own document:

```json
{
  "aliases": {
    "Alice": "did:method:345...",
    "Bob": "did:method:246...",
  }
}
```

Then, anyone can use these aliases to reference other documents. For example, we can reference the `ni:///sha256;980...` document like this: `did:method:345.../Alice-article.txt`. Note that this refers to a mutable document because Alice may create and publish a new version of the `aliases` document at any time, and the new `aliases` document can override the previous value for `Alice-article.txt`. In this example, we still use non-human readable `did:method:345...`; however, we can use relative links, which are much friendlier. For example, Bob can reference the document like `/Alice/Alice-article.txt`, and Alice can reference the document like `/Alice-article.txt` and also like `/Alice/Alice-article.txt`.

## Summary

You may notice that some software already works similarly, such as P2P networks, decentralized source control systems, blockchains, etc. CAI puts all these existing and future services together. At the same time, it doesn't dictate protocol or consensus requirements for your data and services, such as cryptocurrency fees, to include your data in a network (e.g., blockchain). You may still use multiple different centralized or decentralized services and pay for them, for example, to promote your content, but it is not required. You can leave these services anytime and keep your data compatible with CAI services. No vendor lock-in when you create, share, and store your data.
