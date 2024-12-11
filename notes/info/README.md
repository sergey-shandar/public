# Building Digital Universes

## Information

- measurements as a number of states in a system vs bits
- imagine that mass is proportional to information in the case of constant mass in the Universe
  - additions as a `log(states)`.
  - resolution is not linear
  - divisible. A system with a prime number of states is not divisible.
 
Note: Relations between systems can define a lot of information

Product Of Types and Sum Of Types.

### Arithmetic encoding:

Multiplication. 3 systems with 3 states give 27 states. They can fit into 5 bits.

### Probability encoding:

3 states into 1 or 2 bits:

state|encoding
-----|--------
0    | 0      
1    | 10
2    | 11

`(1 + 4)/3 = 5/3 = 1 + 2/3` bits

## Probability

It's a measure of our ignorance (0% and 100% - absolute knowledge, 50% - absolute ignorance), so it's subjective, not objective. For example, poker.

To build a Universe with randomness, we can either build a pseudo-random function or calculate and keep all possible cases. Note that it's possible that we have two Universes that are the same but have different histories (paths). In this case, knowing the path based only on information from the Universe state is impossible.

## Normal Distribution

- Throwing a coin. Move if `head`, stay if `tail`.
- Repeat.
- Normal distribution

We can use it to generate a normal distribution. However, it is not efficient because many paths lead to the same outcome.

Normal distribution on a plane. Form a circle?

## Two Envelopes Paradox

https://en.wikipedia.org/wiki/Two_envelopes_problem

## No grids in N-dimensional space when N>1

Sequences (1-dimensional space) are allowed. Two and more dimensional discrete spaces can't have grids without preferred directions. However, there could be a solution without a grid. For example, https://en.wikipedia.org/wiki/Causal_sets. 

## Finite Bit Sequences

A set of all finite bit sequences is mapped to a set of natural numbers.

Mapping: add `1` and then an infinite sequence of `0`s. Then calculate a number by `sequence.map((i, v) => v << i).sum()`. For example

|    |         |bin|hex|    
|----|---------|---|---|
|''  |'10...'  |1  |1  |
|'0' |'010...' |10 |2  |
|'1' |'110...' |11 |3  |
|'00'|'0010...'|100|4  |
|'10'|'1010...'|101|5  |
|'01'|'0110...'|110|6  |
|'11'|'1110...'|111|7  |

## 137 Infinite Sequence

CDT.

Using the algorithm, we can build an infinite bit sequence that contains all possible finite bit sequences.
