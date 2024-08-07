What is information and how can we measure it?

We can measure information in a number of distinguishable states of a system.

From this definition, we can assume that this number is a positive integer. 

A minimal number of states is one.

Programmers usually measure information in bits.

1 bit, by definition, has two states, 0 or 1.

How much information is in two bits or three bits?

Again, programmers may say 4 and 8 states.
- 00, 01, 10, 11;
- 000, 001, 010, 011, 100, 101, 110, 111.

S = 2^N, where S is the number of states and N is the number of bits 

But is it right?

Someone may say that two bits have 3 states and three bits have 4 states.

Here are the states for two bits:
1. all bits are zeros,
2. one bit is zero, another bit is one,
3. two bits are ones.

S = N + 1.

The assumption is that these bits are indistinguishable, while programmers may think that these bits are distinguishable. For example, they have names like bit # 0 and bit # 1.

The difference is quite significant if we try more bits. For example, for 10 bits, we will have 
1024 versus 11, and for 1024 bits, we will have 2^1024 vs 1025. It's exponential vs linear growth.

That means that the growth of the number of states is attributed more to the order/relations between these bits rather than just their values.

In next sections, by default, we will use only distinguishable systems.

## Operation on systems

The number of states for two distinguishable systems with states S0 and S1 is S0 * S1. If we measure information in bits, then it's N0 + N1, where N0 is log2(S0), and N1 is log2(S1). Note: that we can use another `log` base instead of two to measure information. Some may even use `e`.

An interesting property: If we have systems with a number of states that are not aligned with our base (e.g., 2), then the number of states becomes a non-integer value, but the value is still mapped to the same set of `S` values.

`S` is an integer value, but we use `*` when we merge systems.
`N` could be a noninteger, but we can use `+` when we merge systems.

If 'base' and 'N' are natural numbers, then 'S' is also a natural number.

## Conservation of information

You may use different compression programs like Zip and most likely see their effectiveness. Some text files can be compressed more than 10 times. So what happens if we rename the zip file to text and try to compress it again? No surprise, the new zip file will be bigger than the original.

Here is an old joke: I invited a compression algorithm that can compress files to one byte, and now I'm working on a decompression algorithm.

Of course, the compression algorithm makes sense only if it is accompanied by a decompression algorithm that doesn't lose original information and can restore any compressed file to its original state.

It means if we have a file of size `M` bits then in order to restore it, we have to have `2^M` different compressed files.
