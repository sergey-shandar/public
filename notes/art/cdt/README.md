# Content Dependent Tree (CDT)

In this example, a node may contain multiple (more than 2) child nodes.

## Level 0. Leaves are bytes/characters

`JavaScript is a weird programming language.`

The hash is one byte and equals to the character.

## Level 1. Nodes contains multiple leaves/bytes.

`Java` `Scri` `pt ` `is ` `a ` `we` `ird` ` pro` `gr` `amm` `ing` ` la` `ng` `ua` `ge.`

The hash is an MSB first sequence. hash(`Java`) = 0x4A617661

## Level 2. Nodes with nodes with leaves.

- `Java` `Scri` `pt ` `is `
- `a ` `we` `ird`
- ` pro` `gr`
- `amm` `ing` ` la` `ng` `ua` `ge.`

## Level 3.

- #4A...
  - `Java` `Scri` `pt ` `is `
  - `a ` `we` `ird`
  - ` pro` `gr`
- #61...
  - `amm` `ing` ` la` `ng` `ua` `ge.`

## Level 4. Root.

- #4A...
  - #4A...
    - `Java` `Scri` `pt ` `is `
    - `a ` `we` `ird`
    - ` pro` `gr`
  - #61...
    - `amm` `ing` ` la` `ng` `ua` `ge.`
