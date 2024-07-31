# Hash

The compress function $y = f(x)$

The function should satisfy these conditions:
- it's impossible by using current knowledge to restore any part of $x$ from $f(x)$,
- It's impossible to find two $x_0$ and $x_1$ using current knowledge, such that $f(x_0) = f(x_1)$.  

## SHA2 (32bits)

- $x$ is three 256bit values.
- $y$ is a 256 value.

### Streaming

Convert a bit stream into a list of 512bit values: $a_0, a_1, ..., a_n$.

The last value $a_n$ should contain `data`, then `10...` bits, then a 64bit length of the original data. All other $a_i$ contains only data. 

$y_0$ is an initial 256bit of SHA2, For example, for SHA2 it's `0x_6a09e667_bb67ae85_3c6ef372_a54ff53a_510e527f_9b05688c_1f83d9ab_5be0cd19`.

$y_{i+1} = f([y_i, a_i])$

### Merkle Tree

Convert a bit stream into a list of 256bit values: $a_0, a_1, ..., a_{2^k}$.

The last value $a_m$ should contain `data`, then `0...` bits. 
- $a_i$ where $i &lt; m$ contains only data,
- $a_i$ where $i>m$ contains zeros.

$h(s) = f([x_0, s])$ 

$y_{1,i}=f([h(s), a_{2i}, a_{2i+1}])$, where $s$ is a length of data in the sequence $a_{2i}, a_{2i+1}$.

$y_{j,i}=f([h(u512::MAX), y_{j-1,2i}, y_{j-1,2i+1}])$

To prevent a [length extension attack](https://en.wikipedia.org/wiki/Length_extension_attack), we can apply a hash function once more to the root hash.
