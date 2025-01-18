# Hash

## Inside

The goal is everything is ID.

- `0x...10...` - `0..254`.
- `1x...` - `255`.

## Outside

The goal is less hash function calls.

1. `data0`: `x...` - data[512]
2. `data1`: `x...10...` - data[0..511]
3. `data0hash`: `x...`: data[256], hash
4. `data1hash`: `x...10...`: data[256], hash
5. `hashData0`:
6. `hashData1`:
7. `hash2`:
8. `rootData0`: `x...` - data[512]
9. `rootData1`: `x...10...` - data[0..511]
10. `rootData0hash`: `x...`: data[256], hash
11. `rootData1hash`: `x...10...`: data[256], hash
12. `rootHashData0`:
13. `rootHashData1`:
14. `rootHash2`:

14 initial hashes. They can be formed and remembered as

`compress(init || x)` where `x` is `0..13`.

For smaller (compared to buffer size) hashes (eg. Sha512x256), we can use more variants.

## SHA2

- `init`:
  - `d...` - data[512]
  - `d...1...size`: - data[0..]

A length extension attack is possible. Eve knows a hash but doesn't know the message. Bob knows the message and a hash. Eve forms a new hash formed from a hash of the original message and additional information.

Workaround: Additional root hash function call.

## Bitcoin

- `init`:
  - `data`, `data`
  - `data`, `hash`
  - `hash`, `hash`

[A second-preimage attack](https://en.wikipedia.org/wiki/Preimage_attack).
