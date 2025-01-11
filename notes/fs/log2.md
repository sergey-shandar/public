# Improving log2 Algorithm for bigint in JavaScript

I usually use the `bigint` type in JavaScript and FunctionalScript as a vector of bits, and I often need to know how many bits are in a specific `bigint` instance. Every JavaScript engine that has a `bigint` knows exactly what the size of a `bigint` instance is, but this functionality is not available in JavaScript API. Neither `log2`, which should return a number of bits minus `1`. Sadly, there is not even a proposal for such functions in ECMAScript. There is already a [thread on StackOverflow](https://stackoverflow.com/questions/54758130/how-to-obtain-the-amount-of-bits-of-a-bigint) that discusses multiple implementations. My main conclusion from the thread is there are two main families of possible implementations:

1. Convert `bigint` to `string` and then use the `length` of the string to calculate a number of bits in the original `bigint`.
2. Shift right the `bigint` until it's become `0`.

## 1. Converting to String

The simplest implementation is 

```ts
const strBinLog2 = (v: bigint): bigint => BigInt(v.toString(2).length) - 1n
```

This implementation allocates and fills 16 times more memory than the given `bigint` because JavaScript strings are UTF-16. For example, if our `bigint` has one million bits (125 KB), the function may allocate as much as 2 MB. The improved implementation uses base 16 (aka hex) and `Math.clz32` to calculate the remainder:

```ts
const strHexLog2 = (v: bigint): bigint => {
    const len = (BigInt(v.toString(16).length) - 1n) << 2n
    return len + 31n - BigInt(Math.clz32(Number(v >> len)))
}
```

This version allocates 4 times more than the given `bigint`. However, we can make it even better because [bigint.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/toString#parameters) supports radix up to `36`. Let's use `32`:

```ts
const str32Log2 = (v: bigint): bigint => {
    const len = (BigInt(v.toString(32).length) - 1n) * 5n
    return len + 31n - BigInt(Math.clz32(Number(v >> len)))
}
```

This version allocates 3.2 times more.

## 2. Shift Right

This algorithm uses 3 phases:

1. **Fast doubling:** uses exponential steps to narrow down the range of the most significant bit.
2. **Binary Search Phase:** refines the result by halving the step size.
3. **Remainder Phase:** use `Math.log2` to find a logarithm of the remainder.

```ts
const log2 = (v: bigint): bigint => {
    if (v <= 0n) { return -1n }

    // 1.
    let result = -1n
    // note: 1024 may lead to `Inf`
    let i = 1023n
    while (true) {
        const n = v >> i
        if (n === 0n) {
            // overshot
            break
        }
        v = n
        result += i
        i <<= 1n
    }

    // 2.
    // We know that `v` is not 0 so it doesn't make sense to check `n` when `i` is 0.
    // Because of this, We check if `i` is greater than 1023 before we divide it by 2.
    while (i !== 1023n) {
        i >>= 1n
        const n = v >> i
        if (n !== 0n) {
            result += i
            v = n
        }
    }

    // 3.
    // We know that `v` is less than `1n << 1024` so we can calculate a remainder using
    // `Math.log2`.
    const rem = BigInt(Math.log2(Number(v)) | 0)
    // (v >> rem) is either `0` or `1`, and it's used as a correction for
    // Math.log2 rounding.
    return result + rem + (v >> rem)
}
```

## Benchmarks

For small numbers (about `2 ** 1_000`):

|Framework    |str32Log2|   log2|
|-------------|---------|-------|
|Bun          |     1293|**699**|
|Deno 2       |      791|**452**|
|Node 23      |      898|**538**|
|Chrome (AMD) |      781|**593**|
|Chrome (M1)  |      417|**285**|
|Firefox (AMD)|     1056|**503**|
|Firefox (M1) |      541|**348**|
|Safari (M1)  |      741|**466**|

For big numbers (about `2 ** 1_000_000`):

|Engine       |str32Log2|   log2|
|-------------|---------|-------|
|Bun          |  **631**|   1110|
|Deno 2       |      788|**206**|
|Node 23      |      947|**226**|
|Chrome (AMD) |  **532**|    551|
|Chrome (M1)  |      283|**171**|
|Firefox (AMD)|  **529**|   1443|
|Firefox (M1) |  **338**|    847|
|Safari  (M1) |      299|**203**|

The `shift right` algorithm wins most of the time; notable exceptions are Firefox and Bun on very big numbers. The algorithm works very well for cryptographic algorithms, such as hash functions and elliptic curves, where buffers are about several kilo bits.
