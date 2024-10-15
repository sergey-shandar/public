# CASL

Content-addressable System Language. 

The programming language is content-addressable for modules, types, functions, and other immutable data known at compile-time; run-time is not content-addressable. For example, two types with the same content are the same types.

No global mutable objects!

## Whish List

- C and C ABI as a base. 
- Similar to Rust ownership tracking.
- Pipes. Any static function can be called using pipeline syntax
  ```rust
  fn add(a: i32, b: i32) -> i32 { a + b }
  fn main() {
     let x = 5.add(6);
  }
  ```
  
