/**
 * @template T
 * @typedef {readonly[Tree<T>,T,Tree<T>]} TreeNode
 */

/**
 * @template T
 * @typedef {TreeNode<T> | null} Tree<T>
 */

/** @type {<T>(v: T) => Tree<T>} */
const one = a => [null, a, null]
