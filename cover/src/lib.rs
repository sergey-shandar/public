pub struct A(u32, u32);

impl A {
    pub const fn new(a: u32, b: u32) -> Self {
        A(a, b)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    #[test]
    fn test() {
        let a = A::new(1, 2);
        assert_eq!(a.0, 1);
        assert_eq!(a.1, 2);
    }
}