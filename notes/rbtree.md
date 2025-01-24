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
  Some<&Node<T>> // compilation error but it doesn't matter for the article purpose.
}

// or
type List<T> = Option<Node<T>>;

struct Node<T> {
  value: T
  next: List<T>
}
```

## Tree

```
  - computer
- in
```
