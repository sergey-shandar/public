# My JavaScript Set of Best Practices

The article shares my set of rules to follow when coding JavaScript. But, before we go deep into them, I must let you know that the way how I use JavaScript is a little bit unusual. My main purpose in using JavaScript is to use only one programming language for high-level development, instead of C#, F#, Java, Scala, Python, etc. So, I'm trying to avoid non-generic JavaScript frameworks and platform-specific tools. For low-level and system programming, I'm using [Rust](https://en.wikipedia.org/wiki/Rust_(programming_language)), and considering [Zig](https://en.wikipedia.org/wiki/Zig_(programming_language)) programming language.

## TypeScript as a linter

While I'm a big fan of [static typing](https://en.wikipedia.org/wiki/Type_system#Static_type_checking) and am impressed by the [TypeScript](https://en.wikipedia.org/wiki/TypeScript) project, I no longer use TypeScript `.ts` files in my projects. The main reason is to avoid building steps. A project should be ready to use without any build steps. However, I use a TypeScript compiler as a linter and [JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) as type definitions. To use the TypeScript compiler as a linter, you will need to set these properties in your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    ...
    "allowJs": true,
    "checkJs": true,
    ...
    "noEmit": true,
    ...
  }
}
```

Hopefully, one day, we will see the [Type Annotation proposal](https://github.com/tc39/proposal-type-annotations) in ECMAScript and supported by popular JavaScript engines.

## No classes or symbols

I think that user's defined nominal types have no future in deterministic distributed systems. There are two main problems with JavaScript classes:

1. Classes are part of a JavaScript [nominal type system], in contrast to TypeScript [structural type system](https://en.wikipedia.org/wiki/Structural_type_system). Nominal typing is location-based instead of content-based, like structural typing. It means a class is identified by where or when it's defined instead of its content. Location-based identifiers are very difficult to scale and create dependency hell.
2. Serialization and deserialization of classes require additional code. This code, usually, doesn't have any semantic meaning and is an anti-pattern. Use standard JavaScript objects and arrays instead; they can be serialized and deserialized with just one function call.

[JavaScript Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) have the same scalability problems as classes. 

## Functional programming

Use functional programming and pure functions as much as possible. For example:

- Don't use direct I/O. Direct I/O is the primary source of side effects. You can use dependency injection. Instead of writing to a file directly, use a passed function that should write to a file. It will allow you to test your code much more effortlessly.
- Avoid mutability or try to localize data mutations.
- Use arrow functions and currying instead of multiple parameters.

You can read more about functional programming in JavaScript in [this article](https://medium.com/bitsrc/purely-functional-programming-in-javascript-91114b1b2dff).

## Use ECMAScript modules

ECMAScript modules are supported by most of the modern JavaScript engines and browsers. Currently, I'm using only `export default` because it's consistent with loading JSON files and the [CommonJS](https://en.wikipedia.org/wiki/CommonJS) system. I want to use only one `export` method and prefer simplicity over syntax sugar.

```js
import my from './export-default.mjs'
const { a, b } = my
```

Instead of

```js
import { a, b } from './export.mjs'
```

## Avoid third-party dependencies without a good reason

Development dependencies such as TypeScript or ESLint are ok if they don't require additional build steps. Try to avoid libraries and frameworks that use direct I/O or platform specific. They will make your code very hard to test.

## Endnotes

This set of rules is not for everyone. If you work in a big company with a big existing codebase, this may not work for you. However, if you are working on a new project, or you are a startup, or you are working on an open-source project, you may consider these points. Don't rush to infect your codebase with complex things that are difficult to maintain. Please keep it simple as long as possible and add complexity only when needed.
