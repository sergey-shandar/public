## BTrees

## List

**TypeScript:**

```ts
type List<T> = Node<T> | null
type Node<T> = {
  readonly value: T
  readonly next: List<T>
}
```

**Rust**

```rust
enum List<T> {
  None,
  Some<&Node<T>>, // compilation error, but it doesn't matter for the article's purpose.
}

// or
type List<T> = Option<&Node<T>>;

struct Node<T> {
  value: T,
  next: List<T>,
}
```

## Tree

```ts
type Tree<T> = Node<T> | null
type Node<T> = {
  readonly left: Tree<T>
  readonly value: T
  readonlt right: Tree<T>
}
```

```rust
type Tree<T> = Option<&Node<T>>;
struct Node<T> {
    left: Tree<T>,
    value: T,
    right: Tree<T>,
}
```

## BTree23

```ts
type Root<T> = Node<T> | null
type Node<T> = Leaf1<T> | Leaf2<T> | Node1<T> | Node2<T>
type Leaf1<T> = readonly[T]
type Leaf2<T> = readonly[T, T]
type Node1<T> = readonly[Node<T>, T, Node<T>]
type Node2<T> = eadonly[Node<T>, T, Node<T>, T, Node<T>]
```

```rust
enum NodeRef<T> {
    Leaf1(&Leaf1<T>),
    Leaf2(&Leaf2<T>),
    Node1(&Node1<T>),
    Node2(&Node2<T>),
}

struct Leaf1<T>(T);
struct Leaf2<T>(T,T);
struct Node1<T>(NodeRef<T>, T, NodeRef<T>);
struct Node2<T>(NodeRef<T>, T, NodeRef<T>, T, NodeRef<T>);
```
