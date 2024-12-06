/** @type {(a: number) => (b: number) => number} */
const x = a => b => {
    return a + b
}
const y = x(5)
console.log(y.toString())
console.log({}.toString())
console.log(`"${[].toString()}"`)