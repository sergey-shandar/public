const SOME_CONSTANT: u32 = 42;

fn main() {
    match 5 {
        SOME_CONSTAT => println!("5 == 42"),
        _ => println!("Ok"),
    }
}

#[cfg(test)]
mod test {
    #[test]
    fn test() {
        match 5 {
            SOME_CONSTANT => panic!("5 == 42"),
            _ => (),
        }
    }
}