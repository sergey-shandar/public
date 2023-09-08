# Purely Functional Programming in JavaScript

There are a lot of articles, videos, and blog posts about 
[functional programming](https://en.wikipedia.org/wiki/Functional_programming) using different programming languages,
including [JavaScript](https://en.wikipedia.org/wiki/JavaScript).

Usually, the main topic of these articles is how to use various functional programming paradigms, 
such as [first-class functions](https://en.wikipedia.org/wiki/First-class_function), 
[immutable objects](https://en.wikipedia.org/wiki/Immutable_object), and 
[currying](https://en.wikipedia.org/wiki/Currying).

Nevertheless, the primary value of 
[purely functional programming languages](https://en.wikipedia.org/wiki/Purely_functional_programming) is an absence of 
[side effects](https://en.wikipedia.org/wiki/Side_effect_(computer_science)). Partial applications of different 
functional paradigms in impure languages, such as JavaScript, may reduce the number of side effects but don't guarantee 
their complete elimination.

Side effects reduce scalability and the ability to replace components and platforms. So, it is preferable to reduce 
the number of side effects to a bare minimum.

There are dozens of purely functional programming languages. Some of them are pretty successful in the software 
development industry - for example, [Haskell](https://en.wikipedia.org/wiki/Haskell), 
[Elm](https://en.wikipedia.org/wiki/Elm_(programming_language)), and 
[PureScript](https://en.wikipedia.org/wiki/PureScript). However, the most popular programming language is JavaScript, 
and it is not purely functional.

The main reason to use JavaScript, besides its popularity, is that almost any web browser can run it. Also, one of the 
most popular data interchange and file formats is [JSON](https://en.wikipedia.org/wiki/JSON), a subset of JavaScript. 
Because of this JSON/JavaScript relation, [serialization](https://en.wikipedia.org/wiki/Serialization) in JavaScript is 
more straightforward than in other programming languages. In my experience, 
[object-oriented programming languages](https://en.wikipedia.org/wiki/Object-oriented_programming) usually have 
the biggest challenges in serialization.

Any working program has side effects such as input/output, functions that return the current time, or random numbers.

But it is possible to write a big part of a program without using impure functions. An impure function can be rewritten 
as a pure function.

For example:

```js
const addAndPrint = a => b => {
    const result = a + b
    console.log(result)
    return result
}
```

```js
const pureAddAndPrint = log => a => b => {
    const result = a + b
    log(result)
    return result
}
```
