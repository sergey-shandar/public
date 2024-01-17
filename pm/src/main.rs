const ANSWER_TO_QUESTION: u32 = 42;

fn main() {
    match 5 {
        ANSWER_TO_QESTION => println!("5 is not the answer!"),
        _ => println!("Ok"),
    }
}

#[cfg(test)]
mod test {
    #[test]
    fn test() {
        match 5 {
            ANSWER_TO_QUESTION => panic!("5 is not the answer!"),
            _ => (),
        }
    }
}
