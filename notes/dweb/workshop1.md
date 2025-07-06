# Workshop 1

Technological stack: TypeScript, ECMAScript modules, Node.js 24 with type striping.

## 1. CAS 

Content Addressable Storage.

### 1.1. CAS Interface

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

The `cas` directory contains all blocks. Each data block is a file. The file name is a hexadecimal hash. For example

```
cas/sha256/
  17c94a0b6bb9ff1872e2f71ae2369be0e58000146d2e00f9f65ec38ffad347f9
  3e0f9d4c6b2e01d8a4a5fd9bc55dcf187a264a6d6e7e9fd28440de8a16236b3c
  962dc357e37c9bbd5e8088885e85f3f7c6e1b4eaf3e8c298b1ed7c259e297fba
  9a1d81a0d03aa1669982dbf739e4f3d5d8d9e50b3b1f01ac1d34b0e6b20c2cfd
  bb243f0150eae237d57b03bb301e1a7f662147389c51228c3dbe8b92d88f2634
  fbdac13e8fc909dd479d622128d7889e38943d7125b9e6a77a732f1feefcbe3c
```

Note, we don't add any meta information to the data blocks.

## 2. DISOT

Decentralized Immutable Source Of Truth. Known formats:

- blog post format:
  ```ts
  type BlogPost = {
      blogPost: string
  }
  ```
- signature format
- trusted timestamp

### 2.1. Selecting DID Method

```ts
type PublicPrivateKey = {
    privateKey: string
    publicKey: string
}
interface Did {
    new(): PublicPrivateKey
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

### 2.2. Selecting a time-stamping server.

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
5. 
