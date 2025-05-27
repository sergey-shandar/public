# Code as Data

Code-as-data is a principle of the Von Neumann architecture.

But are we still following the rule?

Let's see.

Can we send code as data over the network? In theory, yes. For example, we can send a source file, let's say a JavaScript module:

```js
export default a => b => a + b
```

Looks good, and in theory, we can save it with a specific file name and use it in our program.

- `add.js`:
  ```js
  export default a => b => a + b
  ```
- `add10.js`:
  ```js
  import add from './add.js'
  export default add(10)
  ```

Ok, looks good. Can we now send `add10` to someone else? And now we open a gate to hell. Because we need to send all dependencies as well. For example, as a zip archive, or publish dependencies somewhere and then use URLs.

- `https://example.com/add.js`:
  ```js
  export default a => b => a + b
  ```
- `add10.js`:
  ```js
  import add from 'https://example.com/add.js'
  export default add(10)
  ```

But this is mutable. If the owner of example.com deletes or changes the content of the `add.js` file, our program will no longer work, may not work correctly, or, even worse, execute malicious code.

The package managers are trying hard to solve the problem by introducing:

- additional configuration files, such as `pacakge.json`,
- lock files, `package-lock.json`.
- version.

But they still don't solve the problems.

- it's still a centralized service,
- introduce additional files `package.json`,
- version and dependency hell, with problems such as diamond dependencies.

## How it should be done.

Content-addressable.
