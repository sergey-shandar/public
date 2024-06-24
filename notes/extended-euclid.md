# Extended Euclid's Algorithm

$f((k_0, k_1)) = a_0 k_0 + a_1 k_1$.

$f(v_i) = a_i$.

In particular:
- $v_0 = (1, 0)$, $f(v_0) = a_0$,
- $v_1 = (0, 1)$, $f(v_1) = a_1$.

$a_i > a_{i+1}$

Euclidian division: $a_i = a_{i-1} q_{i-2} + a_{i-2}$.

Then $a_i = a_{i-2} - a_{i-1} q_i = f(v_{i-2}) - f(v_{i-1}) q_i = f(v_{i-i} - q_i v_i)$.

Then $v_i = v_{i-1} - q_i v_i$
