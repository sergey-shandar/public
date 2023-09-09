# FunctionalScript and I/O

I’ve often seen growing businesses rewrite their business logic software multiple times. 
For example, it can go through the following stages:

1. Using Excel for accounting, inventory, etc.
2. Implementing the same business logic in a custom program with a user interface and serializing data to JSON or XML.
3. Rewriting the program to support multithreading or asynchronous processing.
4. Rewriting the program to use SQL database.
5. Rewriting the program to Java to use distributed systems like Hadoop.
6. Rewriting the program to Scala for compatibility with Spark.
7. Creating a small program to handle a subset of data on a workstation for a specific department.
8. Rewriting part of the business logic in JavaScript to make it available for front-end applications.

The business logic remains constant throughout these stages, but the business rewrites it because the software 
doesn’t scale well. Rewriting the business logic is expensive and error-prone and produces inconsistencies between 
different parts of the system. This scenario highlights one of the biggest problems in modern software development.

## The Problem with Direct I/O Usage in Libraries

When libraries use I/O operations directly, it limits the reusability of the library’s logic. Direct I/O usage acts 
like a virus, making a library unusable when the I/O system changes. This creates a need for a solution that 
separates business logic from I/O operations, allowing the logic to be reusable and easily integrated into different 
systems.

## Questions about Existing Solutions

While there are programming languages with no side effects and no direct IO, such as Haskell, Elm, and PureScript, 
integrating them with the existing systems can be very challenging. Furthermore, not many programmers are familiar 
with these languages. This raises two important questions:

1. How can we effectively integrate functional business logic into existing systems?
2. How can we find programmers who are knowledgeable in purely functional programming languages?

## Introducing FunctionalScript

[FunctionalScript](https://github.com/functionalscript/functionalscript) is a purely functional subset of JavaScript 
designed to provide scalable and reusable components for  business logic. As a subset, it maintains forward 
compatibility with JavaScript, which means any FunctionalScript module can be used in any JavaScript program 
without any modifications. This feature simplifies integration into existing systems without requiring additional 
build steps or tools. It allows programmers to use their existing JavaScript knowledge and relies on the familiar 
JavaScript API as its standard library.

One significant advantage of FunctionalScript over other functional programming languages is the absence of vendor 
lock-in. The language has no dependencies, such as a standard library or run-time modules. If the language project is 
abandoned, FunctionalScript modules will still work as regular JavaScript modules, ensuring the longevity of your code.

Moreover, JavaScript is the most popular programming language in the world, which means that programmers don’t need 
to learn a new sophisticated language to benefit from functional programming with FunctionalScript. This widespread familiarity makes it easier to find and onboard developers to work with FunctionalScript, helping to address the challenges posed by other purely functional programming languages.

## Type System

FunctionalScript, like JavaScript, is a [dynamically typed language](https://en.wikipedia.org/wiki/Dynamic_programming_language). However, it benefits from the use of [TypeScript/JSDoc type annotations](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) to help catch most type errors. TypeScript employs a structural type system, as opposed to the nominal type systems found in many modern languages, such as C++, Rust, C#, and Java. In practice, a structural type system tends to cause fewer issues than a nominal type system, which often leads to excessive adapters between interfaces, ultimately hurting code reusability.

```js
/**
 * @template T
 * @typedef {T|undefined} Option
 */

/** @type {<T, R>(f: (value: T) => R) => (value: T|undefined) => R|undefined} */
const optionMap = f => value => value === undefined ? undefined : f(value)

// test optionMap
{
    const optionSq = optionMap(v => v * v)
    const sq3 = optionSq(3)
    if (sq3 !== 9) { throw sq3 }
    const sqUndefined = optionSq(undefined)
    if (sqUndefined !== undefined) { throw sqUndefined }
}
```

## Creating Applications using FunctionalScript

- Q: How can we build applications using FunctionalScript if it has no I/O?
- A: It’s true that any working program requires I/O. The key idea behind FunctionalScript, however, is to delay I/O operations as long as possible, ensuring that the core business logic remains separate from I/O-related concerns. This approach allows the core functionality to be more reusable and adaptable to different I/O systems. The following dependency diagram showcases this structure:
  ```mermaid
  graph TD
    A[application.js] --> B[lib.f.js]
    A --> C[IO: Node.js, Web Browser, Deno]
  ```

In this structure, application.js serves as the orchestrator, containing only the glue code that connects lib.f.js (the core business logic) with the platform-specific I/O. Here is an example of a simple application:

### logic.f.js

```js
/** @typedef {(text: string) => undefined} ConsoleOut */

/** @type {(out: ConsoleOut) => undefined} */
const main = out => out('Hello world!')

module.exports = { main }
```

### application.js

```js
const logic = require('logic.f.js')

logic.main(console.log)
```

FunctionalScript can be utilized in various types of applications, including:

- Front-end applications (Web, Mobile)
- Back-end applications (Node.js, Deno, Bun)
- JSON extensions for scripting languages, like build and deployment tools
- Sophisticated query languages for distributed systems

By using FunctionalScript in these scenarios, you can ensure better separation of concerns, easier code maintenance, and greater adaptability to different IO systems or requirements.

As mentioned before, the main target is to have scalable and reusable components. Users who formally describe a business logic should not have to rewrite it for a new distributed computation system, nor should they have to learn a new programming language.

## Current State

FunctionalScript is an open-source project released under the MIT license. The project is still in its early stages of development, and we are actively working on creating a parser and other essential modules.

All the code is written in FunctionalScript, which is a testament to the language’s capabilities. Once the parser is complete, it could be used to build different linter tools and compilers. Until then, we manually check our code using FunctionalScript as a code convention.
