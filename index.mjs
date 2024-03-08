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

/** @type {A} */
const aa = { a: 'a' }

f(aa)

if (aa.a !== 'a') {
    throw new Error('Invalid AA object.')
}
