trait HashValue: Sized + PartialEq + Default {
    type Value;
    fn hash(&self) -> u64;
}

/// Meta information structure:
///
/// ```
/// type Next = U<L>; // where L is log2(N), N is a size of v.
/// type NextArray = [Next; K]; // where K is a number of bits in a usize.
/// ```
struct Map<T: HashValue> {
    v: Vec<T>,
}

fn main() {
    println!("Hello, world!");
}
