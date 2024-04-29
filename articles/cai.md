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

Trusted time stamps. Requires trusted centralized services or consensus of many users, like in blockchain.

## Layer 2

Relative names.
