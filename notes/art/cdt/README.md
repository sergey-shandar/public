# Content Dependent Tree (CDT)

## Level 0. Leaves are bytes

`JavaScript is a weird programming language.`

The hash is one byte and equal to the one character.

## Level 1. Nodes with leaves.

`Java` `Scri` `pt ` `is ` `a ` `we` `ird` ` pro` `gr` `amm` `ing` ` la` `ng` `ua` `ge.`

The hash is an MSB first sequence. hash(`Java`) = 0x4A617661

## Stage 2. Nodes with nodes with leaves.

- `Java` `Scri` `pt ` `is `
- `a ` `we` `ird`
- ` pro` `gr`
- `amm` `ing` ` la` `ng` `ua` `ge.`

## Stage 3. Nodes with nodes with leaves.

- #4A...
  - `Java` `Scri` `pt ` `is `
  - `a ` `we` `ird`
  - ` pro` `gr`
- #61...
  - `amm` `ing` ` la` `ng` `ua` `ge.`
