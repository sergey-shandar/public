# Workshop 1: Creating a Decentralized Self-Publishing Platform

## Why?

- **Data ownership.** Especially, it's crucial for historical data; your old posts, images, videos, code, etc. Where is it now?
- **Fight with fragmentation.** Most modern decentralized systems still follow the same paradigm inherited from centralized systems: define a protocol and data format and release software that works with these protocols and formats. That produces fragmentation. In rare cases, we see protocol bridges. We need a paradigm shift. How it should be done: We store all data in CAS and use CAS as a Decentralized Immutable Source Of Truth (DISOT). It could be blockchain blocks, IPFS files, Git commits, Nost/BlueSky messages. CAS doesn't care. Different applications should attempt to parse the data blocks; if they encounter blocks that cannot be parsed, they should skip those blocks. Applications may add new blocks to CAS, but obviously, they can't mutate existing blocks (by definition of CAS). See [IPLD](https://ipld.io/).

## What?

So like a decentralized WordPress, but you get to own the data, the software program, and also where it goes. (So you can post it to any other system you want).

- **Software-level transparency.** You can write your own software, especially now that there are a lot of AI agents.
- **Cache.** To make parsing and indexing faster, some applications and services may use different types of databases to cache what has already been parsed. However, they should still reference CAS, since this is the primary source of truth. These DBs should be considered as derived data, and we should be able to restore them from CAS (our DISOT).

In this workshop, we will

1. Create CAS (as DISOT),
2. Define formats for blog posts, licensing, digital signatures, and trusted time stamps.
3. Render CAS content as static HTML.
4. Publish the HTML pages and public blocks from the CAS on a website.

**Technological stack:** TypeScript, ECMAScript modules, Node.js 24 with type striping. However, feel free to use anything else.

You can use AI agents.

## 1. CAS 

Content Addressable Storage.

### 1.1. CAS Interface

Write a library and CLI with the following interfaces...

```ts
type Data = Uint8Array
type Hash = bigint
type Nullable<T> = T | null

interface Cas {
  getData(hash: Hash): Nullable<Data>
}
```

Additional functions

```ts
interface CasInstance extends Cas {
  list(): Hash[]
  add(data: Data): Hash
}
```

### 1.2. Hash Function

```ts
type ComputeHash = (data: Data) => Hash
```

We select [SHA256](https://en.wikipedia.org/wiki/SHA-2). It's still considered cryptographically strong; many software libraries support it. Modern processors have hardware acceleration for the algorithm.

### 1.3. CAS Implementation

The `cas/` directory contains all blocks. Each data block is a file. The file name is a hexadecimal hash. For example

```
cas/
  17c94a0b6bb9ff1872e2f71ae2369be0e58000146d2e00f9f65ec38ffad347f9
  3e0f9d4c6b2e01d8a4a5fd9bc55dcf187a264a6d6e7e9fd28440de8a16236b3c
  962dc357e37c9bbd5e8088885e85f3f7c6e1b4eaf3e8c298b1ed7c259e297fba
  9a1d81a0d03aa1669982dbf739e4f3d5d8d9e50b3b1f01ac1d34b0e6b20c2cfd
  bb243f0150eae237d57b03bb301e1a7f662147389c51228c3dbe8b92d88f2634
  fbdac13e8fc909dd479d622128d7889e38943d7125b9e6a77a732f1feefcbe3c
```

Note that we don't add any metadata, such as file type, to the data blocks! It's more like [IPLD](https://ipld.io/) than [IPFS](https://en.wikipedia.org/wiki/InterPlanetary_File_System).

Write a simple console program that has these commands:

- `add <FILE>` - adding a new block to CAS and prints a hash of the file
- `get <HASH> <FILE>` - getting a block with the `<HASH>` and save it into the `<FILE>`.

## 2. DISOT

Decentralized Immutable Source Of Truth. Known formats:

1. content,
2. signature format,
3. trusted timestamp.

```mermaid
graph RL
    TrustedTimeStamp --> Signature --> Content
```

### 2.1. Content

Blog post format:

```ts
// https://creativecommons.org/share-your-work/cclicenses/
type License =
  "CC-BY 4.0" |
  "CC BY-SA 4.0" |
  "CC BY-NC 4.0" |
  "CC BY-NC-SA 4.0" |
  "CC BY-ND 4.0" |
  "CC BY-NC-ND 4.0" |
  "CC0 1.0"
type BlogPost = {
    license?: License,
    authors?: string[], 
    blogPost: string,
}
```

The assumption is that if there's a known public licence, it's public content.
If there's no licence, we must not publish it.

### 2.2. DID

```ts
interface Did {
    newPrivateKey(): string
    publicKey(privateKey: string): string
    sign(privateKey: string, contentHash: string): string
    verify(publicKey: string, contentHash: string, signature: string): boolean
}
```

Elliptic curves. [Secp256k1](https://neuromancer.sk/std/secg/secp256k1), the same one that is used in Bitcoin, Nostr, and Bluesky. 
- A private key is a scalar value, and it has a size of 256 bits.
- A public key is a point on an elliptic curve and has a size of 257 bits.

Implementation of `new`:

1. A function to generate a private key `privateKey`. For `secp256k1`, it should be 256 random bits. Use [Crypto.getRandomValues()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues). For example
   ```ts
   crypto.getRandomValues(new Uint8Array(32))
   ```
3. Calculate the `publicKey`. For example
   ```ts
   secp256k1.mul(secp256k1.G, privateKey)
   ```

A digital signature format:

```ts
type Signature = {
    publicKey: string
    contentHash: string
    signature: string
}
```

### 2.3. Selecting a time-stamping server.

Should support Secp256k1 or another elliptic curve algorithm.

## 3. Caching and Rendering

Read all blocks from a CAS and create a static HTML page.

## 4. Publish

1. Upload CAS as DISOT.
2. Upload the generated human-readable HTML as cache.

```
cas/
index.html
```

## 5. Additional Advanced Tasks

1. Replace the hex representation of hashes with Crockford's base32.
2. Split file names into subdirectories to reduce the number of files in one directory. For example, `ab/cd/ef01...`. Considering that hashes are distributed evenly, we can have only a few layers. For example, two letters of base32 give us a maximum of 1024 directories. Two levels of directories have about one million possible subdirectories. With two levels of directories, we can store approximately 1 billion files, where each directory contains around 1000 entities (files or directories). Our application should be able to read from any file structure.
3. A program should be able to discover the `cas/` directory in parent directories.
4. Implement CDT hash function instead of SHA256.
5. Replace TTP with [OpenTimestamps](https://en.wikipedia.org/wiki/OpenTimestamps).
