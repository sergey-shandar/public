# CASL

Content-addressable System Language. 

The programming language is content addressable for module and type system only, run-time is not content-addressable. For example, two types withe the same content are the same types.

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
  
