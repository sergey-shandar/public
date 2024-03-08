/**
 * @typedef {{
 *  a: string
 * }} A
 */

/**
 * @typedef {{
 *  a: "a"
 * }} AA
 */

/** @type {(a: A) => undefined} */
const f = a => {
    a.a = 'b'
}

/** @type {A} */
const aa = { a: 'a' }

f(aa)

export default void 0;
