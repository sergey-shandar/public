# Hash

Compress function $y = h(x)$

## SHA2 (32bits)

- $x$ is three 256bit values.
- $y$ is a 256 value.

### Streaming

First step, convert a bit stream into a list of 512bit values: $a_0, a_1, ..., a_n$.

The last value $a_n$ should contain `data`, then `10...` bits, then a 64bit length of the original data. All other $a_i$ contains only data. 

$y_0$ is an initial 256bit of SHA2, For example, for SHA2 it's `0x_6a09e667_bb67ae85_3c6ef372_a54ff53a_510e527f_9b05688c_1f83d9ab_5be0cd19`.

$y_{i+1} = f([y_i, a_i])$
    
