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

Pure functions are much more flexible. A developer may use the `pureAddAndPrint` function with either pure or 
impure arguments, such as `console.log`. Some platforms may not have `console.log`, and in that case, a developer 
could provide a replacement for it.

Another use case is unit testing, and a developer may create a mock function and pass it as an argument.

## Currying

You may notice function declarations in this article use currying. In most purely functional programming languages, a function can accept only one argument, and currying is a way to provide multiple arguments to a function.

Another way is to use a [tuple](https://en.wikipedia.org/wiki/Tuple) as an argument:

```js
const tupleAddAndPrint = ([log, a, b]) => {
    const result = a + b
    log(result)
    return result
}
```

However, currying can simplify partial function applications:

```js
// using currying
const consoleLogAddCurry = pureAddAndPrint(console.log)
// using tuples
const consoleLogAddTuple = ([a, b]) => 
    tupleAddAndPrint([console.log, a, b])
```

## Safety

Usually, purely functional languages provide better safety. A pure function can’t access data outside passed 
arguments. On the contrary, an impure function can access almost anything, which increases the probability of 
vulnerabilities.

One such example is the famous [Log4Shell](https://en.wikipedia.org/wiki/Log4Shell). 
[Log4j](https://en.wikipedia.org/wiki/Log4j) is written in an impure language (Java), and users were not aware it 
uses HTTPS to download and run code. A pure implementation of Log4j would require an HTTPS protocol as an argument.

In this case, users have some level of control, and, most likely, they would provide a 
[stub](https://en.wikipedia.org/wiki/Method_stub) instead of an actual HTTPS protocol. Pure functions do not 
provide absolute protection, but they can significantly reduce the probability of vulnerabilities.

## FunctionalScript

It is possible to write purely functional code in an impure language. 
[FunctionalScript](https://github.com/functionalscript/functionalscript) is an attempt to create a purely 
functional subset of JavaScript, and the subset should not have the ability to create a function with side effects.

Because FunctionalScript is a subset of JavaScript, we do not need to develop compilers, transpilers, debuggers, 
IDEs, and other development tools for the language.

Also, developers do not need to learn an entirely new programming language and how it interacts with other systems 
and languages. FunctionalScript is an open specification and has no risk of vendor lock-in.

Even if the FunctionalScript specification disappears completely, any FunctionalScript code will still work like 
any other JavaScript code.

## Recursion Problem

Most purely functional programming languages have no loops because all data is immutable.

Instead, developers use recursion:

```js
const factorial = n => n <= 0 ? 1 : n * factorial(n - 1)
```

Recursion consumes stack, and it can cause a stack overflow in case of too many recursive calls. Functional languages solve this problem by [tail call](https://en.wikipedia.org/wiki/Tail_call) elimination. Note that a compiler can only eliminate a call if it’s the last call or operation.

For example, a tail call elimination can not be applied to our factorial function because the last operation is 
multiplication instead of factorial. However, we can change the function so that the tail call elimination can 
be applied.

```js
const factorialTail = result => n =>
    n <= 0 ? result : factorialTail(result * n)(n - 1)
const factorial = factorialTail(1)
```

The JavaScript standard ([ECMAScript 6](https://webkit.org/blog/6240/ecmascript-6-proper-tail-calls-in-webkit/)) 
supports the tail call elimination (aka a proper tail call), but V8 and 
SpiderMonkey do not. That means that Google Chrome, Microsoft Edge, Node.js, and Firefox do not support PTC. 
So, de facto, JavaScript has no PTC.

## Loops in FunctionalScript

The problem is that FunctionalScript objects are immutable, and, as shown above, we can’t use recursion for 
iterations.

FunctionalScript allows reassigning of local variables declared with let as a workaround for this problem, and such 
variables can only be used inside a function where the variables are declared.

```js
const factorial = n => {
    let i = n
    let result = 1
    while (i > 1) {
        result = result * i
        i = i - 1
    }
    return result
}
```

## WebAssembly

[WebAssembly](https://en.wikipedia.org/wiki/WebAssembly) allows developers to create web applications using almost any programming language. It is derived from [asm.js](https://en.wikipedia.org/wiki/Asm.js), which is also a subset of JavaScript.

Advantages:

- near-native code execution speed,
- different programming languages support compilation to WebAssembly.

Disadvantages:

- requires additional build steps and tools,
- WebAssembly programs should interact with [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) and
  other JavaScript [API](https://en.wikipedia.org/wiki/API) using a
  [language interoperability](https://en.wikipedia.org/wiki/Language_interoperability) layer.
  
asm.js inspired FunctionalScript as a subset of JavaScript. Compared to asm.js and WebAssembly, FunctionalScript is a high-level programming language. Theoretically, it is possible to create [JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation) and [AOT](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) compilers from FunctionalScript to WebAssembly, or any other assembly language.

Compared to JavaScript, a compiler from FunctionalScript may generate more optimal code because similar FunctionalScript code is more deterministic.

For example, FunctionalScript can use a reference counter instead of a proper garbage collector because immutable data can not have circular references.

Also, other purely functional programming languages, such as Elm, can use FunctionalScript as a compilation target.

## FunctionalScript API Limitations

As was mentioned earlier, FunctionalScript can not directly call functions with side effects. Because JavaScript API has many impure functions, only a limited subset of JavaScript API is available to FunctionalScript.

However, a JavaScript program can pass impure functions to FunctionalScript modules.

## Typing

FunctionalScript derived a 
[dynamic type system](https://en.wikipedia.org/wiki/Type_system#Dynamic_type_checking_and_runtime_type_information) 
from JavaScript. Nevertheless, it is possible to use [JSDoc type annotations](https://en.wikipedia.org/wiki/JSDoc) 
and a [TypeScript](https://en.wikipedia.org/wiki/TypeScript) compiler as a validator. For example

```js
/** @type {(a: number) => (b: number) => number} */
const add = a => b => a + b
```

See [TypeScript JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) for more 
details.

TypeScript uses a [structural type system](https://en.wikipedia.org/wiki/Structural_type_system) instead of a 
[nominal type system](https://en.wikipedia.org/wiki/Nominal_type_system). Languages with a nominal type system may 
cause typecasting problems in big projects with many third-party modules. For example, two definitions of Vector3D 
are not compatible, and [adapters](https://en.wikipedia.org/wiki/Adapter_pattern) are required. Because of this, 
structural type systems enhance modularization and code reuse.

## Modules and Packages

FunctionalScript uses a [Node.js](https://en.wikipedia.org/wiki/Node.js) package manager 
([npm](https://en.wikipedia.org/wiki/Npm)) and [CommonJS](https://en.wikipedia.org/wiki/CommonJS) as a module system. CommonJS is easy to implement even without a FunctionalScript parser.

Because FunctionalScript is a purely functional language, a FunctionalScript module can only reference another 
FunctionalScript module. But, a JavaScript module can reference any FunctionalScript module.

Currently, FunctionalScript does not support ECMAScript Modules and asynchronous modules.

## JSON Modules

CommonJS supports loading JSON files as JavaScript modules. Because JSON contains only data, any JSON file is also 
a FunctionalScript module.

Note that the loading procedure differs for JSON and JavaScript files, even if JSON is a subset of JavaScript.

A JSON module declares all public exports in the first expression.

```json
{
   "a": "Hello",
   "b": 42
}
```

A JavaScript Common.js module declares all public exports in module.exports.

```js
module.exports = {
   a: "Hello",
   b: 42
}
```

## Applications

FunctionalScript code can be used in any JavaScript/TypeScript application. Because FunctionalScript code has no direct access to IO, the same code can be used on different platforms, for example, web-browser, Node.js.

FunctionalScript is a superset of JSON. Because it has no side effects, it can be used as a JSON with pure functions and expressions, for example, in configuration files.

Another application is a query language as an alternative to [SQL](https://en.wikipedia.org/wiki/SQL) and 
[LINQ](https://en.wikipedia.org/wiki/Language_Integrated_Query).
