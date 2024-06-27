# Elliptic Curve

$y^2 = x^3 + ax + b$.

## Derivative

Let $z = y^2$, then $z = x^3 + ax + b$.

- $\frac{dz}{dy} = 2y$,
- $\frac{dz}{dx} = 3x^2 + a$.

Then $\frac{dy}{dx} = \frac{3x^2 + a}{2y}$.

Let $m = \frac{3x_0^2}{2y_0}$ and $c = y_0 - mx_0$. 

$$\begin{cases}
  y = mx + c\\
  y^2 = x^3 + ax + b
\end{cases}$$

## Secp256k1

$y^2 = x^3 + 7$
