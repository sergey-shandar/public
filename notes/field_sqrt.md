# A Field Square Root

[Fermat's little theorem](https://en.wikipedia.org/wiki/Fermat%27s_little_theorem):

- $a^p ≡ a \pmod p$,
- $a^{p-1} ≡ 1 \pmod p$,
- $a^{p-2} ≡ a^{-1} \pmod p$.

$∀ a ∈ \{1, 2, …, p-1\}$.

## Equation

$x^2 ≡ c \pmod p$, and $x$ is unknown.

- $x^{p+1}≡c^\frac{p+1}2\pmod p$,
- $x^{p-1}x^2≡c^\frac{p+1}2\pmod p$,
- $x^2≡c^\frac{p+1}2\pmod p$ because $x^{p-1} ≡ 1 \pmod p$.

|$i$    |0|1  |    2|...|$\frac{p+1}2$|...|$p-2$   |$p-1$        |$p$|$p+1$        |
|-------|-|---|-----|---|-------------|---|--------|-------------|---|-------------|
|$j=i/2$|0|   |    1|   |             |   |        |$\frac{p-1}2$|   |$\frac{p+1}2$|
|$x^i$  |1|$x$|$x^2$|   |$±x$         |   |$x^{-1}$|1            |$x$|$x^2$        |
|$c^j$  |1|   |$c$  |   |             |   |        |1            |   |$c$          |

If $(p+1) \bmod 4 = 0$ then the roots are $±c^\frac{p+1}4$.

|$i$    |0|1  |  2|...|$\frac{p+1}2$  |...|$p-2$   |$p-1$        |$p$|$p+1$        |
|-------|-|---|---|---|---------------|---|--------|-------------|---|-------------|
|$j=i/2$|0|   |  1|   |$\frac{p+1}4$  |   |        |$\frac{p-1}2$|   |$\frac{p+1}2$|
|$x^i$  |1|$x$|$c$|   |$±x$           |   |$x^{-1}$|1            |$x$|$c$          |
|$c^j$  |1|   |$c$|   |$c^\frac{p+1}4$|   |        |1            |   |$c$          |
