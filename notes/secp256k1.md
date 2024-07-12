# Elliptic Curve

$y^2 = x^3 + ax + b$.

## Different Points

Points $P$ and $Q$.

- $x_R=m^2-x_P-x_Q$,
- $y_R=m(x_R-x_P)+y_P$ or $y_R=m(x_R-x_Q)+y_Q$.

### Equations

- $y_P^2 = x_P^3 + ax_P + b$
- $y_Q^2 = x_Q^3 + ax_Q + b$

Then

- $b = y_P^2 - x_P^3 - ax_P = y_Q^2 - x_P^3 - ax_Q$
- $a = \frac{y_P^2 - x_P^3 - b}{x_P} = \frac{y_P^2 - b}{x_P} - x_P^2 = \frac{y_Q^2 - x_Q^3 - b}{x_Q} = \frac{y_Q^2 - b}{x_Q} - x_Q^2$

Without dependencies on $a$ and $b$:

$$\begin{cases}
  a = \frac{y_P^2 - y_Q^2 - x_P^3 + x_Q^3}{x_P - x_Q}\\
  x_Py_Q^2 - x_Qy_P^2 - x_Px_Q^3 + x_Qx_P^3 = b(x_P - x_Q)
\end{cases}$$ 

## Derivative

Let $z = y^2$, then $z = x^3 + ax + b$.

- $\frac{dz}{dy} = 2y$,
- $\frac{dz}{dx} = 3x^2 + a$.

Then $\frac{dy}{dx} = \frac{3x^2 + a}{2y}$.

Assume we have a point $P = (x_P, y_P)$ so $y_P^2=x_P^3+ax_P+b$.

Let $m = \frac{3x_P^2+a}{2y_P}$ then 

$$\begin{cases}
  y = m(x-x_P) + y_P\\
  y^2 = x^3 + ax + b
\end{cases}$$

## Solution

- $x_R=m^2-2x_P$
- $y_R=m(x_R-x_P)+y_P=m(m^2-3x_P)+y_P=m^3-2mx_P+y_P$

## Proof

Let $x_Δ=x_R-x_P=m^2-3x_P$. Then

- $x_R=x_Δ+x_P$,
- $y_R=mx_Δ+y_P$.

Apply these to both sides of the equation $y_R^2 = x_R^3 + ax_R + b$:

$$\begin{equation}\begin{aligned}
  y_R^2            &= (mx_Δ+y_P)^2 = \\
                   &= m^2x_Δ^2 + 2mx_Δy_P + y_P^2 \\
  x_R^3 + ax_R + b &= x_Δ^3 + 3x_Δ^2x_P + 3x_Δx_P^2 + x_P^3 + ax_Δ + ax_P + b = \\
                   &= (x_Δ + 3x_P)x_Δ^2 + 3x_Δx_P^2 + ax_Δ + y_P^2 = \\
                   &= m^2x_Δ^2 + x_Δ(3x_P^2 + a) + y_P^2
\end{aligned}\end{equation}$$ 

Now $2mx_Δy_P=x_Δ(3x_P^2 + a) ⇒ 2my_P=3x_P^2+a$.

For derivatives: $m = \frac{3x_P^2+a}{2y_P}$, $2my_P = 2y_P\frac{3x_P^x+a}{2y_P} = 3x_P^2 + a$.

https://andrea.corbellini.name/2015/05/17/elliptic-curve-cryptography-a-gentle-introduction/

## Secp256k1

$y^2 = x^3 + 7$
