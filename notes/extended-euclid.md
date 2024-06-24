# Extended Euclid's Algorithm

$f((k_0, k_1)) = a_0 k_0 + a_1 k_1$.

$f(V_i) = a_i$.

In particular:
- $V_0 = (1, 0)$, $f(V_0) = a_0$,
- $V_1 = (0, 1)$, $f(V_1) = a_1$.

$a_i > a_{i+1}$

Euclidian division: $a_i = a_{i-1} q_{i-2} + a_{i-2}$.

Then $a_i = a_{i-2} - a_{i-1} q_i = f(V_{i-2}) - f(V_{i-1}) q_i = f(V_{i-i} - q_i V_i)$.

Then $V_i = V_{i-1} - q_i V_i$
