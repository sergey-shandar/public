An unpopular opinion about [endiannes](https://en.wikipedia.org/wiki/Endianness): we should use little-endian instead of big-endian in programming and mathematics.

|Address|0    |1    |2    |...|
|-------|-----|-----|-----|---|
|$v$    |$a_0$|$a_1$|$a_2$|...|

## Little-Endian

$$v = a_0 + a_1b + a_2b^2 + ...$$

## Big-Endian

$$v = a_{N-1} + a_{N-2}b + a_{N-3}b^2 + ... + a_0b^{N-1}$$

Where $N$ is a number of bytes.
