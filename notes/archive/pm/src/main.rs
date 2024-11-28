const ANSWER_TO_QUESTION: u32 = 42;

fn main() {
    match 5 {
        ANSWER_TO_QUESTION => println!("5 is not the answer!"),
        _ => println!("Ok"),
    }
}

#[cfg(test)]
mod test {
    use super::*;
    #[test]
    fn test() {
        match 5 {
            ANSWER_TO_QUESTION => panic!("5 is not the answer!"),
            _ => (),
        }
    }
}
