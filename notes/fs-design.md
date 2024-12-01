# FS Design, step-by-step

We start with JSON, which supports the following types: `null`, `bool`, `string`, `number`, `object`, and `array`.

```json
{
  "a": null,
  "b": true,
  "c": ["hello", -36.6]
}
```

## 1. JSON as an ES module 

JSON itself is not a valid ES module, so we need to add `export default` prefix:

```js
export default {
  "a": null,
  "b": true,
  "c": ["hello", -36.6]
}
```

File extension `.d.mjs`

### 1.1. Syntax Sugar

```js
// comments
export default {
  /* block comments
   */
  "a": null,
  // strings with `'`
  'b': true,
  // property names
  c: ["hello", -36.6], // trailing comma
}
```

## 2 Constants

This feature allows to create a graph and deduplicate data. Also it is on of the possible outputs from a VM.

```js
const a = ["Hello", 53]
const b = "ok"
export default {
  "a": a,
  "b": "ok"
}
```

### 1.2. Syntax Sugar

```js
// destruction
const [a, b] = [["Hello", 53], "ok"]
export default {
  a, // short name reference
  "b": "ok"
}
```

## 3. Import

Now, we can add `import`:

```js
import x from './x.f.js'
export default {
  "a": null,
  "b": true,
  "c": ["hello", -36.6],
  "x": x
}
```
