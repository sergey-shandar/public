# Fast log2 Algorithm for bigint in JavaScript

I usually use the `bigint` type in JavaScript and FunctionalScript as a vector of bits, and I often need to know how many bits are in a specific `bigint` instance. Every JavaScript engine that has a `bigint` knows exactly what the size of a `bigint` instance is, but this functionality is not available in JavaScript API. Sadly, there is not even a proposal for such a function in ECMAScript. So, I have to write my own implementations. There is already a [thread on StackOverflow](https://stackoverflow.com/questions/54758130/how-to-obtain-the-amount-of-bits-of-a-bigint) that discusses multiple implementations. The main conclusion from the thread is there are two main families of possible implementations:

1. Convert `bigint` to `string` and use the `length` of the string to calculate the number of bits in the original `bigint`.
2. Shift right the `bigint` until it's become `0`.

**Note:** a number of bits in a positive `bigint` equals `log2` of the value plus `1`. So, we will implement the `log2` first.

## 1. Converting to String

The simplest implementation is 

```ts
const strBinLog2 = (v: bigint): bigint => BigInt(v.toString(2).length) - 1n
```

One of the problems with the function is that it has to allocate and fill a new string with a `length` equal to the number of bits in the original `bigint`. For example, if our `bigint` has one million bits (125 KB), the function may allocate as much as 2 MB, because every character in JavaScript string is two bytes (UTF-16). To reduce the allocation size and speed up the process, we can change the base to hex. The `length` of the new string will give as 

