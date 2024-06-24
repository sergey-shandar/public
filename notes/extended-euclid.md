# Extended Euclid's Algorithm

$f((x, y)) = a_0 x + a_1 y$.

$f(V_i) = a_i$.

In particular:
- $V_0 = (1, 0)$, $f(V_0) = a_0$,
- $V_1 = (0, 1)$, $f(V_1) = a_1$.

$a_i > a_{i+1}$

Euclidian division defines $q_{i-2}$ and $a_{i-2}$ by $a_i = a_{i-1} q_{i-2} + a_{i-2}$.

Then $a_i = a_{i-2} - a_{i-1} q_i = f(V_{i-2}) - f(V_{i-1}) q_i = f(V_{i-2} - q_i V_{i-1})$.

Then $V_i = V_{i-2} - q_i V_{i-1}$
