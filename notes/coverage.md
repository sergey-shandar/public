# One Method To Increase Code Coverage For Rust Const Functions

I like test code coverage and I'm trying to keep it at 100% for my projects. One of the technique to achieve 100% test code coverage is to never use [I/O directly](https://medium.com/@sergeyshandar/functionalscript-5cf817345376). In this case, you can mock I/O and write a set of tests which will cover all code branches.

However, this article is about different issue. I'm a big fan of Rust `const` functions and I hope Rust team will improve support for such functions. For example, [here](https://github.com/datablockset/blockset/blob/main/blockset-lib/src/sha2/sha224.rs#L16) is a usage of SHA2 at compile time without macros. 
One of the problem with such functions, that compiler can optimize or inline `const` and other simple functions so we will have no code coverage for these functions even if we call them in our unit tests.
