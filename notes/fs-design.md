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

### Syntax Sugar

```js
// comments
export default {
  /* block comments
   */
  "a": null,
  // strings with `'`
  'b': true,
  // property names
  c: ["hello", -36.6]
}
```

## 2 Constants

This feature allows to create a graph and deduplicate data. Also it is on of the possible outputs from a VM.

```js
export default {
  
}
```

## 2. Import

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
