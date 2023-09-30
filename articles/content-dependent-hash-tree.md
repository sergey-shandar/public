# Content-Dependent Hash Tree

In our [early discussion](some-aspects-of-merkle-tree.md), we highlighted the advantages of using a cryptographic hash function based on a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) for data transferring in [CAN](https://en.wikipedia.org/wiki/Content-addressable_network). However, the Merkle tree is not shift-resistant, leading to potential redundancies in our block set or [CAS](https://en.wikipedia.org/wiki/Content-addressable_storage). Here, we delve deeper to tackle this challenge.

The main reason why I publish the algorithm is because I firmly believe that we can't solve the [data vendor lock-in problem](data-vendor-lock-in.md) if we keep our data in proprietary formats. 

## Deciphering a Sequence of Numbers

Imagine intercepting messages from extraterrestrials. We don't know their language, but we assume that they use a sequential language unless they are from the [Arrival](https://en.wikipedia.org/wiki/Arrival_(film)) film. The messages manifest as a sequence of numbers. We know that each number can be a finite number between `0` and `N-1`. How can we structure the stream without linguistic reference points? How do we identify repetitive segments?

Using N=8 as an example, consider these similar sequences:
- `s0 = [7, 0, 5, 1, 2, 4, 6, 1, 7, 0, 4, 7, 3, 4, 6, 2, 5, 8]` and
- `s1 = [7, 0, 5, 1, 2, 5, 4, 6, 1, 7, 0, 4, 7, 3, 4, 6, 2, 5]`.

At a glance, shared groupings `[7, 0, 5, 1, 2]` and `[6, 1, 7, 0, 4, 7, 3, 4, 6, 2, 5]` are evident. But what about handling mammoth data streams in the range of gigabytes or terabytes? Some algorithms require `O(n^2)` operations, where `n` is the length of the sequences. We need something close to `O(n)`. To achieve this, we should split our sequences into groups without knowledge of other sequences.

If we group the numbers by pairs, like Merkle Tree does, we will have
- `s0`: `[[7, 0], [5, 1], [2, 4], [6, 1], [7, 0], [4, 7], [3, 4], [6, 2], [5, 8]]`,
- `s1`: `[[7, 0], [5, 1], [2, 5], [4, 6], [1, 7], [0, 4], [7, 3], [4, 6], [2, 5]]`.

As you can see, initially, we have the same groups `[7, 0]`, `[5, 1]`, but after that our groups are all different. The problem with such an approach is that the group size is fixed and independent of the group's content.

One simple idea to have content-dependant grouping is to group numbers until they stop growing:
- `s0`: `[[7, 0], [5, 1], [2, 4, 6, 1], [7, 0], [4, 7, 3], [4, 6, 2], [5, 8]]`,
- `s1`: `[[7, 0], [5, 1], [2, 5, 4], [6, 1], [7, 0], [4, 7, 3], [4, 6, 2], [5]]`.

One important rule is the autonomy of each group, akin [context-free grammar](https://en.wikipedia.org/wiki/Context-free_grammar). Grouping should only depend on items within the group. Extracting an element from a sequence mandates its inclusion in the current group. There's no going back. Sorry, "No Return Policy". An item may end the current group, and we will create a new one for the following items. Context-free grouping is suitable for validation because we can always validate a group without knowledge of surrounding groups.

This algorithm can create the same groups of numbers in both sequences despite a shift in the middle: `[7, 0]` - 4 times, `[5, 1]` - 2 times, `[4, 7, 3]` - 2 times, `[4, 6, 2]` - 2 times. The next step is to convert each group into a number and repeat the process for the new sequence. Let's create a new sequence of numbers from groups by concatenating the numbers as strings and converting them back to numbers. Level 1:

- `s0`: `[70, 51, 2461, 70, 473, 462, 58]`,
- `s1`: `[70, 51, 254, 61, 70, 473, 462, 5]`.

Repeat the grouping process until only one number is left: the tree's root. Level 2:

- `s0`: `[7051, 246170, 473462, 58]`,
- `s1`: `[7051, 25461, 70473462, 5]`.

Level 3:

- `s0`: `[705124617047346258]`,
- `s1`: `[705125461704734625]`.

To create a good function that will convert a group into a number, we need to research the properties of the groups.

## Group Properties

A group can have a maximum of `N+1` items. For example, the longest groups for `N=8` will be `[0, 1, 2, 3, 4, 5, 6, 7, x]`, where `x` is any number from `0` to `7`.
A group can be partitioned into:
- **Body**, all items in the group except the last one.
- **Tail**, the last item in the group.

Properties of a body:
- a body has at least one item,
- numbers in the body never repeat,
- numbers are arranged in ascending order,
- the total number of unique bodies equals `2^N - 1`. The proof of this is your homework.

Properties of a tail:
- it's always one item,
- the item is less than or equal to the last number of the body.

So the total group count will be `M = N*2^(N-1) + (N-1)*2^(N-2) + ... + 3*2^2 + 2*2 + 1 = (N-1)*2^N+1`. Additional homework!

The number of internal states during group assembling is `S = (N-1)*2^(N+1)`.

|N  |   M|   S|
|---|----|----|
|2  |5   |8   |
|3  |17  |32  |
|4  |49  |96  |
|5  |129 |256 |
|6  |321 |640 |
|7  |769 |1536|
|8  |1793|3584|

The average length of the group is [e](https://en.wikipedia.org/wiki/E_(mathematical_constant)), ~2.71828 or less for small `N`. Another homework.

## Bit Stream

We can start building our tree from any `N`. The smallest possible `N` is `2`, and a leaf is either `0` or `1`. A good thing about a bit stream is that it doesn't rely on any artificial structure like a byte.

### Level 1

|group|id|
|-----|--|
|00   | 0|
|010  | 1|
|011  | 2|
|10   | 3|
|11   | 4|

- `N = 5`
- `S = 8`
- Min size: 2 bits.
- Max size: 3 bits.

### Level 2

- `N = 4*2^5 + 1 = 129`
- `S = 256`
- Min size: 4 bits.
- Max size: 15 bits. For example: `101100110100101`.

### Level 3

- `N = 128*2^129 + 1 = 2^136+1`.
- `S = 2^137`. We need [137](https://en.wikipedia.org/wiki/137_(number)) bits to store an internal state on the level 3.
- Min size: 8 bits.
- Max size: `0x480 + 0xF = 0x48F = 1152` bits. Yet another homework.

### Level 4 and up

For levels four and up we use hashes instead of actual data due to the explosive growth in `N`. As we discussed before, the average length of the group is `e`, but, the maximal length of the groups for a big `N` could be very long. I would like to discuss splitting the groups into smaller parts in one of the following articles. 

In essence, the content-dependent hash tree optimizes the identification of identical groups, catering well to both CAS and CAN applications. However, crafting a CAS on such a tree requires its own in-depth exploration.
