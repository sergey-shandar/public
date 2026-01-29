# The Future of High-Level Programming Languages

It's not just purely functional; they should also be content-equatable/addressable.

If we want programs to run on many computers, we need to serialize and deserialize internal state. However, non-content-equatable programming languages (most modern high-level languages) 
create a new copy of the object every time it deserializes. In this case, the program can behave non-deterministically and have side effects.
