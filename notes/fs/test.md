# Agnosticism of Testing Frameworks 

One of the problems with modern test frameworks is their intrusivness. In order to write a test for a specific unit test framework, your test code should depend on the specific test frawework. 
And now you stuck with the specific framework. 

1. It’s difficult to swap frameworks.
2. Test code is coupled to the framework and harder to reuse across projects.

But what if we can write our code without test framework dependencies? We can use conventiontions instead of dependencies.

For FunctionalScrupt we developed such conventions but I'm pretty sure other languages can use the idea. Especially languages with rich runtime information. 

Then we developed a test runner and a simple adpter for `Deno.test` that gives us also test coverage.

## FunctionalScript Test Conventions

Files that have names such as `test.f.ts`, `test.f.js`.

A runner should load the file as an ES module, take `export default` value as an initial value and apply this recursive algorithm:

1. If a value is a function with 0 parameters, we assume it's a test.
   The criteria to pass is very simple:
   - If the function has a name equals to `throw` then we expect that the function throws, otherwise we expect that the function should not throw.
   We call the function, if the function satisfies the criteria, the test passes.
   Then we use the result of the function as a next value to test and come back to step 1.
2. If the value is an Object (including an Array) then we treat every item as a value for test.

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

Note, that in ECMAScript the property name `throw` is assign to the function. See https://tc39.es/ecma262/#sec-setfunctionname.

Such conventions allow programatically generate complex test.
