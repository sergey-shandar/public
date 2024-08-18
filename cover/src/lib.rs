const fn new(a: u32, b: u32) -> [u32; 2] {
    [a, b]
}

#[cfg(test)]
mod test {
    use super::*;
    #[test]
    fn test() {
        let a = new(1, 2);
        assert_eq!(a[0], 1);
        assert_eq!(a[1], 2);
    }
}