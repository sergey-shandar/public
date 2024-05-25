What's information and how can we measure it?

We can measure information in a number of distinguishable states of a system.

From this definition we can assume that this number is a positive integer. 

A system that is fixed has only one state.

Programmers usually measure information in bits.

1 bit, by definition, has two states, 0 or 1.

How much information in two bits, or three bits?

Again, programmers may say 4 and 8 states.
- 00, 01, 10, 11;
- 000, 001, 010, 011, 100, 101, 110, 111.


S = 2^N, where S is a number of states and N is a number of bits 

But is it right?

I think two bits have 3 states, and three bits have 4 states.


Here's the states for two bits:
1. all bits are zeros,
2. one bit is zero, another bit is one,
3. two bits are ones.

S = N + 1.

My assumption was that these bits are indistinguishable while others may think that these bits are distinguishable. For example, the have names or position, like bit #0, bit #1.

The difference is quite significant if we try more bits. For example, for 10 bits we will have 
1024 versus 11, and for 1024 bits we will have 2^1024 vs 1025. It's exponential vs linear grows.

That means, that this grows of a number of states is related to order/relations between these bits instead of the values of these bits.

--- Operation on systems

If we have two undistinguishable systems with the same number of states S, then the total number of states are ...

For two distinguishable systems with state S0 and S1, the number of states are S0 * S1.

--- Physics

--- Conservation of information law
