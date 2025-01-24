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
