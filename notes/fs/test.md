# Agnosticism of Testing Frameworks 

Personal: if you write tests, most likely you used some test framework, it could be

I remember on .Net you had to select which one to use, `xUnit`, `NUnit`, `System.Test`. The biggest problem is that once you choose one, you are stuck with it for the entire project. And when you would like to change it, you will need to refactor all your tests. Now, the test framework has become an obligation.

Similar story in other languages. Sometimes, even worse, for example, in JavaScript, every engine `Node.js`, `Deno`, and `Bun` has their own test framework. Of course, if you develop a library, you may want to avoid it and use one of the popular open source frameworks, but then again, you never know what will happen with this framework in the future, and whether it will be compatible with some new systems and engines.

What if we can run our test code on any test framework? The first requirement would be that such test code should never ever depend on test frameworks.

---

One of the problems with modern test frameworks is their intrusiveness. In order to write a test for a specific unit test framework, your test code should depend on the specific test framework. 
And now you're stuck with the specific framework. 

1. It’s difficult to swap frameworks.
2. Test code is coupled to the framework and is harder to reuse across projects.

But what if we can write our code without test framework dependencies? We can use conventions instead of dependencies.

For FunctionalScript, we developed such conventions, but I'm pretty sure other languages can use the idea. Especially languages with rich runtime information. 

Then we developed a test runner and a simple adapter for `Deno.test`, `Node.js` test, and `Bun`. And these frameworks give us test coverage.

## FunctionalScript Test Conventions

Files that have names such as `test.f.ts`, `test.f.js`.

A runner should load the file as an ES module, take `export default` value as an initial value, and apply this recursive algorithm:

1. If a value is a function with 0 parameters, we assume it's a test.
   The criteria to pass are very simple:
   - If the function has a name equal to `throw`, then we expect that the function throws; otherwise, we expect that the function should not throw.
   We call the function; if the function satisfies the criteria, the test passes.
   Then we use the result of the function as the next value to test and come back to step 1.
2. If the value is an Object (including an Array), then we treat every item as a value for test.

## Example

```ts
export default {
  test: () => [
    () => {},
    () => {}
  ],
  throw: () => {
    throw [
      () => {},
      () => {}
    ]
  },
}
```

Note that in ECMAScript, the property name `throw` is assigned to the function. See https://tc39.es/ecma262/#sec-setfunctionname.

Such conventions allow for the programmatic generation of complex tests.

## Extensions

FunctionalScript is a language w/o side effects, and the current conventions work very well. We may add support for iterators (including generators). 
For JavaScript, it would make sense to add support for asynchronous
