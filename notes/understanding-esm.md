During conversion from CommonJS to ESM we learn a lot about how import works, especially cross import beetwen CommonJS and ESM. To understand ESM we need to firstly, understand an internal structure of a module. Without this understanding, we made a lot of mistakes. Actuallty it's quite simple:

```ts
type Module = {
    // properties in a format `export const x = 5`
    readonly [k in string]: unknown
    // A default property, in a form `export default 'Hello world!`
    readonly default?: unknown
}
```

Import

```ts
import mDefault, * as mOthers from 'module.mjs'
```

```ts
const m = require('module.mjs')
const mDefault = m.default
```

Note, you can't import the whole module using `import from` but you can do it using `const m = import('module.mjs)`.

```ts
import { a } from 'module.mjs' // a = m.a
```

```ts
import m from 'module.mjs'
const { a } = m // a = m.default.a
```

JSON, CommonJS are using only the `default` property. That's the main reason why `export default` is the first choice for FunctionalScript

## Types

```ts
import mDefault, Type from 'module.mjs'
```

For JSDoc

```js
import defaultProperty, * as MTypes from 'module.mjs'
/** @typedef {MTypes.Type} Type */
```

Or

```js
import defaultProperty from 'module.mjs'
/** @typedef {import('module.mjs').Type} Type
```
