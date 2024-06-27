# Secp256k1

$y^2 = x^3 + 7$

## Derivative

Let $z = y^2$, then $z = x^3 + 7$.

- $\frac{dz}{dy} = 2y$,
- $\frac{dz}{dx} = 3x^2$.

Then $\frac{dy}{dx} = \frac{3x^2}{2y}$.

Let $m = \frac{3x_0^2}{2y_0}$ and $c = y_0 - mx_0$. 

$$\begin{cases}
  y = mx + c\\
  y^2 = x^3 + 7
\end{cases}$$
