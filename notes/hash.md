# Hash

The compress function $y = f(x)$

The function should satisfy these conditions:
- it's practically impossible to restore any part of $x$ from $f(x)$,
- It's practically impossible to find two $x_0$ and $x_1$ such that $f(x_0) = f(x_1)$.  

## SHA2 (32bits)

- $x$ is three 256bit values.
- $y$ is a 256 value.

### Streaming

Convert a bit stream into a list of 512bit values: $a_0, a_1, ..., a_n$.

The last value $a_n$ should contain `data`, then `10...` bits, then a 64bit length of the original data. All other $a_i$ contains only data. 

$y_0$ is an initial 256bit of SHA2, For example, for SHA2 it's `0x_6a09e667_bb67ae85_3c6ef372_a54ff53a_510e527f_9b05688c_1f83d9ab_5be0cd19`.

$y_{i+1} = f(y_i||a_i)$

```mermaid
block-beta
  columns 3
  space     space y0
  space:3
  a0        space y1["y1=f(y0∥a0)"]
  space:3
  a1        space y2["y2=f(y1∥a1)"]
  space:3
  ai["..."] space yi["..."]
  space:3
  an        space r["r=f(yn∥an)"]
  y0-->y1
  a0-->y1
  y1-->y2
  a1-->y2
  y2-->yi
  ai-->yi
  yi-->r
  an-->r
```

### Merkle Tree

Convert a bit stream into a list of 256bit values: $a_0, a_1, ..., a_{2^k}$.

The last data value $a_m$ should contain `data`, then `10...` bits.
- $a_i$ where $i &lt; m$ contains only data,
- $a_i$ where $i>m$ contains zeros.

8 initial headers: $h(s, r) = f([x_0, s, r])$, where 
- $x_0$ is an initial value;
- $s$ is either `0` (zero bits), `1` (1..511 bits), `2` (512 bits), or `3` (merge);
- $r$ is either `0` (not a root), or `1` (a root).

Nodes:

$$y_{1,i} = \begin{cases}
  h(0, k = 1) \text{ if } s = 0,\\
  f([h(s, k = 1), a_{2i}, a_{2i+1}]) \text{ otherwise}.
\end{cases}$$

where $s$ is on a length of data $1..512$ in the sequence $a_{2i}, a_{2i+1}$.

$$y_{j,i} = \begin{cases}
  h(0, k = j) \text{ if } y_{j-1,2i} = y_{j-1,2i+1} = h(0, 0),\\
  f([h(3, k = j), y_{j-1,2i}, y_{j-1,2i+1}]) \text{ otherwise}.
\end{cases}$$

Note, if $y_{j-1,2i}$ and $y_{j-1,2i+1}$ are both zero-bit headers, then $y_{j,i}$ is also a zero-bit header.

```mermaid
block-beta
  columns 5
  a0                   a1                        a2                   a3                        a4
  space:5
  y00["y00=f(h20∥a0)"] y01["y01=f(h20∥a1)"]      y02["y02=f(h20∥a2)"] y03["y03=f(h20∥a3)"]      y04["y04=f(h10∥a4)"]
  space:5
  space                y10["y10=f(h30∥y00∥y01)"] space                y11["y11=f(h30∥y02∥y03)"] space
  space:5
  space                space                     space                y20["y20=f(h30∥y10∥y11)"] space
  space:5
  space                space                     space                space                     r["r=f(h31∥y20∥y04)"]        
  a0-->y00
  a1-->y01
  a2-->y02
  a3-->y03
  a4-->y04
  y00-->y10
  y01-->y10
  y02-->y11
  y03-->y11
  y10-->y20
  y11-->y20
  y20-->r
  y04-->r
```
