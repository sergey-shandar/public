// Mutable:

/**
 * @typedef {{
 *  a: string
 * }} A
 */

/** @type {(a: A) => undefined} */
const f = a => {
    a.a = 'b'
}

/**
 * @typedef {{
 *  a: "a"
 * }} AA
 */

/** @type {AA} */
const aa = { a: 'a' }

// `aa.a = 'b'` after this call but we have no compile errors
f(aa)

// Immutable:

/**
 * @typedef {{
 *  readonly a: string
 * }} RA
 */

/** @type {(a: RA) => RA} */
const rf = a => ({ ...a, a: 'b' })

/**
 * @typedef {{
 *  readonly a: "a"
 * }} RAA
 */

/** @type {RAA} */
let raa = { a: 'a' }

// // a compile error: Type 'RAA' is not assignable to type 'RA'
// raa = rf(raa)
