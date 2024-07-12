# Elliptic Curve

$$y^2 = x^3 + ax + b$$

## Intersection with a line

$$\begin{cases}
  y = mx + c\\
  y^2 = x^3 + ax + b
\end{cases}$$

$$x^3 + ax + b - (mx + c)^2 = 0$$

$$x^3 + ax + b - (m^2x^2 + 2mxc + c^2) = 0$$

$$x^3 - m^2x^2 + (a - 2mc)x - (c^2 - b) = 0$$

## Roots

Let $x_P$, $x_Q$, and $x_R$ be the roots of the previous equation. Then

$$(x - x_P)(x - x_Q)(x - x_R) = 0$$

$$x^3 - (x_P + x_Q + x_R)x^2 + (x_Px_Q + x_Px_R + x_Qx_R)x - x_Px_Qx_R = 0$$

$$\begin{cases}
  m^2 = x_P + x_Q + x_R\\
  a - 2mc = x_Px_Q + x_Px_R + x_Qx_R\\
  c^2 - b = x_Px_Qx_R
\end{cases}$$

If we know $x_P$ and $x_Q$ then $x_R = m^2 - x_P - x_Q$.

$$\begin{cases}
  a - 2mc = x_Px_Q + m^2(x_P + x_Q) - (x_P + x_Q)^2\\
  c^2 - b = x_Px_Q(m^2 - (x_P + x_Q))
\end{cases}$$

## $x_P ≠ x_Q$

$$\begin{cases}
  y_P = mx_P + c\\
  y_Q = mx_Q + c
\end{cases}$$

$$\begin{cases}
  m = \frac{y_P - y_Q}{x_P - x_Q}\\
  c = \frac{x_Py_Q - x_Qy_P}{x_P - x_Q}
\end{cases}$$

$$\begin{cases}
  y_P^2 = x_P^3 + ax_P + b\\
  y_Q^2 = x_Q^3 + ax_Q + b
\end{cases}$$

$$\begin{cases}
  a = \frac{y_P^2 - y_Q^2 - x_P^3 + x_Q^3}{x_P - x_Q}\\
  b = \frac{x_Py_Q^2 - x_Qy_P^2 - x_Px_Q^3 + x_Qx_P^3}{x_P - x_Q}
\end{cases}$$

### Check $a - 2mc = x_Px_Q + x_Px_R + x_Qx_R$

...

## $x_P = x_Q$



