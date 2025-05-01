The main principle of the truly decentralized network is proofs instead of protocols.

A proof has two parts: a statement to prove and the algorithm (a purely mathematical function) that accepts data and returns `true`, if the data confirms the statement, or `false` otherwise. `f(statement, data) -> boolean`.

In such systems, the function doesn't depend on other factors, such as where, when, and how we receive the data. The function is pure (fully deterministic). It means that it always returns the same result for the same statement and data.

## Structure

I think a lot about how to structure the foundation for the new decentralized web correctly. So my latest structure:

1. **CAS** is a Content-Addressable Storage. The storage is unaware of the content structure and relations between data blocks. Proof:
   - the statement: this address points to the data,
   - an algorithm: any good cryptographic hash function that accepts data and returns its hash, if the hash matches, returns `true`.
3. **DISOT** is a Decentralized, Immutable Source Of Truth. It's based on top of CAS and achieves the same goal as [single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth), but without centralized or decentralized authorities or registers. It includes digital signatures and revision formats for mutable data. Two main, essential proofs:
   - the data is signed by a person who has a private key of the known public key,
   - the data is signed by a specific date and time using [trusted timestamping](https://en.wikipedia.org/wiki/Trusted_timestamping),
5. **Networks Of Trust**. It's based on DISOT. This is where the fun and opportunities are. It's about weighted subjective trust, reducing information noise, and playing a positive-sum game with others.

I have a clear understanding of how to implement 1 and 2 that is future-proof. There is still a lot of work to be done on 3. 

## How can we build a digital infrastructure based on the proof principle?

That is the main challenge. While many proofs, such as cryptographically strong hash functions, have already been intensely investigated, other areas, such as [ZK proofs](https://en.wikipedia.org/wiki/Zero-knowledge_proof), are pretty new.
