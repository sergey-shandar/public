# Workshop 1

## CAS. 

### CAS Interface

```ts
interface Cas {
  method: string // For example, "sha256"
  getData(hash: bigint): Uint8Array|undefined
}
```

Additional functions

```ts
interface Cas2 extends Cas {
  list(): bigint[]
  add(data: Uint8Array): bigint
}
```

### CAS Implementation

A directory with a prefix `cas.` and a hash method name. For example, for `SHA256` we will have a directory `cas.sha256`.

Each data block is a file. The file name is a hash in hex. For example

```
cas.sha256/
  17c94a0b6bb9ff1872e2f71ae2369be0e58000146d2e00f9f65ec38ffad347f9
  3e0f9d4c6b2e01d8a4a5fd9bc55dcf187a264a6d6e7e9fd28440de8a16236b3c
  962dc357e37c9bbd5e8088885e85f3f7c6e1b4eaf3e8c298b1ed7c259e297fba
  9a1d81a0d03aa1669982dbf739e4f3d5d8d9e50b3b1f01ac1d34b0e6b20c2cfd
  bb243f0150eae237d57b03bb301e1a7f662147389c51228c3dbe8b92d88f2634
  fbdac13e8fc909dd479d622128d7889e38943d7125b9e6a77a732f1feefcbe3c
```

## DISOT

- blog post format. JSON
- signatures
- trusted timestamps

## Render

Read from a CAS all records and create a static HTML page.
