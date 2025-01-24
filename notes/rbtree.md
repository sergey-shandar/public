# List

```ts
type List<T> = Node<T> | null
type Node<T> = {
  readonly value: T
  readonly next: List<T>
}
```

```rust
enum List<T> {
  None,
  Some<Node<T>>
}

// or
type List<T> = Option<Node<T>>;

struct Node<T> {
  value: T
  next: List<T>
}
```
