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

Ok, looks good. Can we now send `add10` to someone else? And now we open a gate to hell. Because we need to send all dependencies as well. For example as a zip archive.
