Unpopular opinion: we should use little-endian instead of big-endian in programming and mathematics.

## Little-Endian

|Address|0    |1    |2    |...|
|-------|-----|-----|-----|---|
|v      |$a_0$|$a_1$|$a_2$|...|

$$v = a_0 + a_1b + a_2b^2 + ...$$

## Big-Endian

|Address|0        |1        |2        |...|N-1  |
|-------|---------|---------|---------|---|-----|
|v      |$a_{N-1}$|$a_{N-2}$|$a_{N-3}$|...|$a_0$|

$$v = a_{N-1} + a_{N-1}b + a_{N-2}b^2 + ... + a_0b^{N-1}$$

Where $N$ is a number of bytes.
