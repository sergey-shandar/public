# What the heck is content-addressable internet?

In the previous articles, I highlighted some problems with Web2 and the current location-based Internet. The main idea of the CAI is to use a result of different cryptographic functions of content as an address instead of a location (like an IP address).

One of the main properties of content-addressable Internet is protocol agnosticism. Protocol agnosticism means that it doesn't matter how we receive data; as soon as we can validate and prove some vital hypothesis about the nature of the data offline. For example, we can do these operations offline: check a hash value, validate a digital signature, and decrypt messages using asymmetric cryptography.

## Layer 0

The layer works with immutable data blocks. If we would like to reference a data block from our document, we can use NI RFC. Such addressing allows global addressing without name conflicts and cybersquatting.

CAI doesn't specify which hash function we should use, and good CAI software should support multiple hash functions. The main requirement to the hash function is that should be cryptographically strong. I wouldn't recommend to use SHA1, for example. However some hash functions are better for CAI because they can reduce traffic and storage by detecting duplicate parts. Blockset implements such hash function which is called CDT0, but it can be extended to support other hash functions.

Such immutable documents which reference to other immutable documents form a DAG. If our hash function is cryptographically strong, it is almost impossible to from cycles.

## Layer 1

A cryptographic function that converts a private key to a public key creates a decentralized identity.

Then, we can keep the private key and use it to sign our messages.

### Layer 1.1

Applying a digital signature is not enough to claim IP rights because someone else also can create a digital signature. The solution is to apply trusted timestamp. Creating a trusted time stamp requires trusted centralized services or consensus of many users, like in blockchain. These services can be not free but we can reduce cost of trusted timestamp by signing a DAG of documents. If a document A references a document B, then a document B is also signed. Before we publish any content, we should signed it, take a hash of the signature and timestamp it. After that we can publish our content.

## Layer 2. Everyone is a center of Universe

Using hash values and DId as URLs are not convenient, it similar to using IP addresses instead of DNS names.

Currently, to name things we either use centralized services (like DNS) or consensus based services, like block chains (decentralized domain name services). In both cases, it requires payments, prone to cybersquatting and not scalable solutions.

But, why  can't I have my own catalog of names?

I can create a catalog of names and corresponding public keys. This catalog can include names for different DId including my. Then, I can reference identities and documents using my catalog as a root. 

## State

You may notice that some software already works this way, for example P2P networks, block chains, etc. So what is the fundamental difference between decentralized services and CAI. There is no difference except that CAI put all of these existing and future services together and doesn't dictate requirements such as cryptocurrency fee to include your data to their network (e.g. block chain). You may use multiple different centralized or decentralized service and pay for them, for example to promote your content, but it is not required. And, at any time you can leave these services and keep your data. No vendor lock in when you create, share and store your data.

How is it different to GIT and other version control systems?


Diagram which shows current Web2, decentralized networks with different storages, CAI: combined storage with multiple protocols. 