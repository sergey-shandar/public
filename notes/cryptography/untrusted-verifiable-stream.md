# Compact Verifable Streaming in Untrusted Environment

One of the good properties of cryptographically strong hash is that a known hash value can be used to verify that the content we download from the Internet matches the original file's content. But here's the problem: we need to download the whole file to ensure its content is correct. It's not a big deal if the file is only a few kilobytes, but it can be not good if the file is enormous, e.g., several gigabytes. 

Interface

```ts
type Hash = bigint
type Data = UInt8Array

type StorageApi = {
  getChunk: (hash: Hash, i: offset) => undefined | Data
}
```

We start with `i = 0` and continue incrementing it on a size of data until we receive `undefined.`

## Embed A Hash Of Chunk

```ts
type StorageApi = {
  getChunk: (hash: Hash, i: offset) => undefined | [Hash, Data]
}
```

It will work in most cases. However, we can only verify that the data is correct when we download all chunks. For example, the server is not trusted and may give a lot of random data with its hashes unstoppable, wasting our time and disk space.

## Merkle Tree

I will not go deep into Merkle Tree; there are many articles about it, including mine. Merkle Tree could be a solution to our problem. We can start downloading nodes from the root and verifying their content against hashes we already know.

```ts
type StorageApi = {
  getChunk: (hash: Hash) => undefined | Hash[] | Data
}
```

In the case when a tree is not perfectly balanced, we may receive a combination of leaves `Data` and nodes `Hash`:

```ts
type StorageApi = {
  getChunk: (hash: Hash) => undefined | (Data|Hash)[]
}
```

## Chain

But what if our hash is not constructed as a tree? Actually, almost all known cryptographic hash algorithms create trees. For example, the SHA2 algorithm creates a chain, which is also a tree but a very unbalanced one where all right nodes are leaves. So, these trees are still suitable for downloading with a quick verification. In this case, we download files backward. Most of the time, the result of `getChunk` will look like this `[Hash, Data].` 

The server should prepare a list of intermediate hashes for this solution for each chunk. After that our last `StrorageApi` can work for any knon hash type.

This solution is not new, for example: 

- https://bsky.app/profile/retr0.id/post/3ld4kgbjxw22r (Dec 2024),
- https://discuss.ipfs.tech/t/supporting-large-ipld-blocks/15093 (Aug 2022).

But it can help us to solve another problem.

## Alien Hash

If we keep separate storages for each type of hash algorithm, we may have a lot of duplication. This means that our system prefers to use only one hash type internally. How can it serve different hash types?

## Hash Alias Table

```
A -> I
```

The easiest way would be to return this internal hash, so client can use it to request data using native tree.

```ts
type HashType = string
type StorageApi = {
  nativeHashType: () => HashType
  // returns a native hash or `undefined` if the given hash is unknown.
  getNativeHash: ({ type: HashType, hash: Hash }) => undefined | Hash  
  getChunk: (hash: Hash) => undefined | (Data|Hash)[]
}
```

While this information can be regenerated for all root blocks, it can be very expensive to regenerate the table for each request. So the server may keep the table for a while.

## In Untrusted Enviroment

If our server works in untrusted enviroment, then a client may not trust the new hash returned from a server. The server should prepeare temporary mapping data.

|         | Specific for a particular AHash | Permanent      |
|---------|---------------------------------|----------------|
| IHash00 |                                 | (Hash\|Data)[] |
| IHash01 | (AHash01, Offset)               | (Hash\|Data)[] |

```ts
type HashType = string
type HashUrl = { type: HashType, hash: Hash }
type StorageApi = {
  nativeHashType: () => HashType
  // returns a native hash or `undefined` if the given hash is unknown.
  getNativeHash: (hashUrl: HashUrl) => undefined | Hash  
  getChunk: (hash: Hash) => undefined | (Data|Hash)[]
  //
  getAlienChunk: (hashUrl: HashUrl, nativeHash: Hash) => { offset?: { alienHash: Hash, offset: bigint }, data: (Hash|Data)[] }
}
```
