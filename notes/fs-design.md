# FS Design, step-by-step

We start with JSON. JSON supports these types: `null`, `bool`, `string`, `number`, `object`, and `array`.

```json
{
  "a": null,
  "b": true,
  "c": ["hello", -36.6]
}
```

JSON itself is not a valid ES module, so we need to add `export default` prefix:

```js
export default {
  "a": null,
  "b": true,
  "c": ["hello", -36.6]
}
```

Now, we cad add `import`:

```js
import x from './x.f.js'
export default {
  "a": null,
  "b": true,
  "c": ["hello", -36.6],
  "x": x
}
```
