# Content Dependent Tree (CDT)

In this example, a node may contain multiple (more than 2) child nodes.

## Level 0. Leaves are bytes/characters

`JavaScript is a weird programming language.`
`JavaScript is a strange programming language.`

The hash is one byte and equals the character.

## Level 1. Nodes contain multiple leaves/bytes.

**Text # 1:**
[X] `Java` `Scri` `pt ` `is ` `a `
[ ] `we` `ird` ` pro` [X] `gr` `amm` `ing` ` la` `ng` `ua` `ge.`

**Text # 2:** [X] `Java` `Scri` `pt ` `is ` `a ` [ ] `str` `ang` `e ` `pro` [X] `gr` `amm` `ing` ` la` `ng` `ua` `ge.`

## Level 2. Nodes with nodes with leaves.

**Text # 1**

- [X] `Java` `Scri` `pt ` `is `
- [ ] `a ` `we` `ird`
- [ ] ` pro` `gr`
- [X] `amm` `ing` ` la` `ng` `ua` `ge.`

**Text # 2**

- [X] `Java` `Scri` `pt ` `is `
- [ ] `a ` `str` `ang`
- [ ] `e ` `pro` `gr`
- [X] `amm` `ing` ` la` `ng` `ua` `ge.`

## Tree

**Text # 1**

- [ ] #4A...
  - [ ] #4A...
    - [X] `Java` `Scri` `pt ` `is `
    - [ ] `a ` `we` `ird`
    - [ ] ` pro` `gr`
  - [ ] #61...
    - [X] `amm` `ing` ` la` `ng` `ua` `ge.`

**Text # 2**

- [ ] #4A...
  - [X] `Java` `Scri` `pt ` `is `
  - [ ] `a ` `str` `ang`
  - [ ] `e ` `pro` `gr`
  - [X] `amm` `ing` ` la` `ng` `ua` `ge.`
