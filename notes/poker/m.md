012 : 012
    : 021
    : 102
    : 120
    : 201
    : 210

f(m, x) => (x + m) % 6

| |  0|  1|  2|  3|  4|  5|
|-|---|---|---|---|---|---|
|0|012|021|102|120|201|210|
|1|021|102|120|201|210|012|
|2|102|120|201|210|012|021|
|3|120|201|210|012|021|102|
|4|201|210|012|021|102|120|
|5|210|012|021|102|120|201|

fr(m, x) => (x + 6 - m) % 6

Alice: an? ak?

publish: an + ak

Bob: bn? bk?

publish: bn + bk

x A B A B = x

x A B AR BR = x


3**3 = 27:

|        |       |       |
|--------|-------|-------|
|  000   |  001  |  002  |
|  010   |  011  |**012**|
|  020   |**021**|  022  |
|  100   |  101  |**102**|
|  110   |  111  |  112  |
|**120** |  121  |  122  |
|  200   |**201**|  202  |
|**210** |  211  |  212  |
|  220   |  221  |  222  |


```

000  001  002
010  011 [012]
020 [021] 022

     100  101 [102]
     110  111  112
    [120] 121  122

          200 [201] 202
         [210] 211  212
          220  221  222
```

012 ^ 012 => 0 2 1
012 ^ 021 => 0 0 0
012 ^ 102 => 1 1 1
012 ^ 120 => 1 0 2
012 ^ 201 => 2 1 0
012 ^ 210 => 2 2 2

----

Ai + Bi => i.

// Alice gives AK[i] to Bob. Bob applies AK[i] + BK[i] and have a card.

0000 0001 0002 0003 | 0100 0101 0102 0103 | 0200 0201 0202 0203 | 0300 0301 0302 0303
0010 0011 0012 0013 | 0110 0111 0112 0113 | 0210 0211 0212[0213]| 0310 0311[0312]0313
0020 0021 0022 0023 | 0120 0121 0122[0123]| 0220 0221 0222 0223 | 0320[0321]0322 0323
0030 0031 0032 0033 | 0130 0131[0132]0133 | 0230[0231]0232 0233 | 0330 0331 0332 0333

1000 1001 1002 1003 | 1100 1101 1102 1103 | 1200 1201 1202[1203]| 1300 1301[1302]1303
1010 1011 1012 1013 | 1110 1111 1112 1113 | 1210 1211 1212 1213 | 1310 1311 1312 1313
1020 1021 1022[1023]| 1120 1121 1122 1123 | 1220 1221 1222 1223 |[1320]1321 1322 1323
1030 1031[1032]1033 | 1130 1131 1132 1133 |[1230]1231 1232 1233 | 1330 1331 1332 1333

2000 2001 2002 2003 | 2100 2101 2102[2103]| 2200 2201 2202 2203 | 2300[2301]2302 2303
2010 2011 2012[2013]| 2110 2111 2112 2113 | 2210 2211 2212 2213 |[2310]2311 2312 2313
2020 2021 2022 2023 | 2120 2121 2122 2123 | 2220 2221 2222 2223 | 2320 2321 2322 2323
2030[2031]2032 2033 |[2130]2131 2132 2133 | 2230 2231 2232 2233 | 2330 2331 2332 2333

3000 3001 3002 3003 | 3100 3101[3102]3103 | 3200[3201]3202 3203 | 3300 3301 3302 3303
3010 3011[3012]3013 | 3110 3111 3112 3113 |[3210]3211 3212 3213 | 3310 3311 3312 3313
3020[3021]3022 3023 |[3120]3121 3122 3123 | 3220 3221 3222 3223 | 3320 3321 3322 3323
3030 3031 3032 3033 | 3130 3131 3132 3133 | 3230 3231 3232 3233 | 3330 3331 3332 3333

## Using Elliptic Curves

These keys are temporary.

Alice:
- Private Key: Sa
- Public Key: Pa
Bob Private Key:
- Private Key: Sb
- Public Key: Pb

Alice takes 52 cards `C = [0, 1, ..., 51]` and encrypt each card with Sa, shuffle and then publish it for Bob: `Ca = [Ca0, Ca1, ...]`.
Bob takes the Ca and encrypt each card with `Cab = [Cab0, Cab1, ...]`.

Additional:
- each card may have additional random values.

Then Alice and Bob agrees to take two cards each from the array, for example `Cab0, Cab1` for Alice and `Cab2, Cab3` for Bob.

Bob decrypt `Cab0` and `Cab1` for Alice by applying `-Sb` so Alice received `Ca{a0}` and `Ca{a1}`.
Alice decrypts these cards `C{a0}, C{a1}` and now knows the result.

The same way Bob received his cards `C{b0}, C{b1}`.

Community cards are open by decrypting and then publishing the cards by both parties in any order.

https://en.wikipedia.org/wiki/Mental_poker

1. c = shuffle & encrypt by A => cA
  = shuffle and encrypt by B => cAB

  open for B: Alice decrypt cAB[i] and give cB[i] to B.
  open for A: Bob decrypt cAB[i] and give cA[i] to A.
  open for everyone: in any order.

2. c = shuffle & encrypt by A   => cA
  = shuffle and encrypt by B => cAB
  = decrypt by A (`cB`) and encrypt by [A0, ...] => CXAB
  = decrypt by B (`cA`) and encrypt by [B0, ...] => CXAXB

Why do we need `[A0, ...]`? We can postpone the process until we need to open the card for one of the party.

1. `cAB[0]` =>
    - Alice converts it to `cB[0]` by removing `A` and give it to Bob.

2. `cAB[0]` =>
    Bob converts it to `cAXB[0]` by adding `B0` and give it to Alice.
    Alice converts it to `cXB[0]` by removing `A` and give it to Bob.
        Bob knows `cAB[0]`, `cXB[0]`, `c[0]` and can calculate `cB[0]` by removing `B0` and adding `B`.
        Alice knows `cXB[0]` and can calculate `cB[0]` by removing `A` from `cAB[0]`.

The only advantage I see is that if the last person doesn't publish `cAB` but he knows it.

## Cards

a * P0 = P1
b * P1 = P2 = a * b * P0
ar * P2 = P3 = b * P0
br * P3 = P0

a * Q0 = Q1

B doesn't know a.
B knows P0 and P1, such as a * P0 = P1.
B knows Q1.
B doesn't know Q0.
How can B find Q0?

Q1 = a * Q0, P1 = a * P1

Q1 + P1 = a * (P0 + Q0)
