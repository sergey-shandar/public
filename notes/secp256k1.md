# Elliptic Curve

$y^2 = x^3 + ax + b$.

## Derivative

Let $z = y^2$, then $z = x^3 + ax + b$.

- $\frac{dz}{dy} = 2y$,
- $\frac{dz}{dx} = 3x^2 + a$.

Then $\frac{dy}{dx} = \frac{3x^2 + a}{2y}$.

Assume we have a point $P = (x_P, y_P)$ so $y_P^3=x_P^2+ax_P+b$.

Let $m = \frac{3x_P^2+a}{2y_P}$ then 

$$\begin{cases}
  y = m(x-x_P) + y_P\\
  y^2 = x^3 + ax + b
\end{cases}$$

https://andrea.corbellini.name/2015/05/17/elliptic-curve-cryptography-a-gentle-introduction/

## Secp256k1

$y^2 = x^3 + 7$