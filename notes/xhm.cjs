/** @typedef {readonly[number, number]} Record */

/** @type {number[]} */
let a = [0]
let size = 0
let bits = 0

// |    0       | 0          |  0 |               |
// |    1..32   | 1          |  1 |         XXXXX |
// |   33..64   | 2 + 1      |  3 |       1_XXXXX |
// |   65..96   | 3 + 1      |  4 |       2_XXXXX |
// | ...        |            |    |               |
// |  993..1024 | 32 + 1     | 33 |   XXXXX_XXXXX |
// | 1025..1056 | 33 + 2 + 1 | 36 | 1_XXXXX_XXXXX |

const findEmpty = (/** @type {number} */i) => {
    let j = 1
    while (true) {
        const n = i ^ j
        if (a[n] === 0) {
            return n
        }
        ++j
    }
}

const add = () => {
    const mask = (1 << bits) - 1

    const unpack = (/** @type {number} */x) => [x >> bits, x & mask]
    const unpack3 = (/** @type {number} */vhn) => {
        const [vh, n] = unpack(vhn)
        const [v, h] = unpack(vh)
        return [v, h, n]
    }
    const pack = (/** @type {Record} */[hi, lo]) => (hi << bits) | lo

    return (/** @type {number} */v) => {
        const create = (/** @type {number} */i) => {
            a[i] = pack([v, 0])
            ++size
            return false
        }
        const [, h] = unpack(v)
        //
        const e = a[h]
        // not occupied.
        if (e === 0) {
            return create(h)
        }
        let [ev, en] = unpack(e)
        let [, i] = unpack(ev)
        // occupied by different hash
        if (i !== h) {
            // x = i
            // #h: ev[_, x], en
            const n = findEmpty(i)
            // #n: 0, 0, 0
            while (true) {
                const [fv, fn] = unpack(a[i])
                // #i: fv[_, x], fn
                const ni = i ^ fn
                // #ni: [_, x], _
                if (ni === h) {
                    //    #i : fv[_, x], (ni ^ i)
                    // #h #ni: ev[_, x], (en ^ h)
                    //    #n :   [0, 0], 0
                    a[i] = pack([fv, n ^ i])
                    a[n] = pack([ev, en === 0 ? 0 : en ^ h ^ n])
                    return create(h)
                    //    #i : fv[_, x], (n ^ i)
                    // #h #ni:  v[_, h], 0
                    //    #n : ev[_, x], (en ^ n)
                }
                i = ni
            }
        }
        // occupied by the same hash (i === h)
        // iterate through the list of the hashes
        while (true) {
            // found
            if (ev === v) {
                return true
            }
            // no transition to the next item
            if (en === 0) {
                const n = findEmpty(h)
                a[i] = pack([ev, i ^ n])
                return create(n)
            }
            i ^= en;
            [ev, en] = unpack(a[i])
        }
    }
}

const init = (/** @type {number} */b) => {
    bits = b
    size = 0
    let len = 1 << b
    a = []
    while (len > 0) {
        a.push(0)
        --len
    }
}

const print = () => {
    for (const e of a) {
        const n = e % 16
        const v = e >> 4
        const h = v % 16
        const x = v >> 4
        console.log(x.toString(16), h.toString(16), n.toString(16))
    }
}

init(4)

const a_add = add()

// const t = [0x86, 0x7b, 0x8a, 0x80, 0xe6, 0xbe, 0x12, 0xb8, 0x82, 0x1e, 0x84, 0x2d, 0x1c, 0xb7, 0x71, 0x70]
// const t = [0x86, 0xe6, 0xb7]
// const t = [0x86, 0x7b, 0x8a, 0x80, 0xe6, 0xb6, 0x12, 0xb8, 0x82, 0x1e, 0x84, 0x2d, 0x1c, 0xb7, 0x71, 0x70]
const t = [0x86, 0x7b, 0x8a, 0x80, 0xe6, 0xb6, 0x12, 0xb8, 0x12, 0x1e, 0x84, 0x2d, 0x1c, 0xb7, 0x71, 0x71]

for (const e of t) {
    a_add(e)
    console.log(e.toString(16))
    print()
}
// print()