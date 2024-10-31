/** @typedef {readonly[number, number]} Record */

/** @typedef {readonly[number, number, number]} Record3 */

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

const object = () => {
    const b = bits
    const mask = (1 << bits) - 1

    /** @type {(x: number) => Record} */
    const unpack = x => [x >> b, x & mask]
    const pack = (/** @type {Record} */[hi, lo]) => (hi << b) | lo
    /** @type {(x: number) => Record3} */
    const unpack3 = x => {
        const [v, n] = unpack(x)
        return [v, v & mask, n]
    }

    return {
        mask,
        unpack,
        unpack3,
        pack,
        add: (/** @type {number} */v) => {
            const [, h] = unpack(v)
            const create = (/** @type {number} */i) => {
                a[i] = pack([v, h])
                ++size
                return false
            }
            const e = a[h]
            // not occupied.
            if (e === 0) {
                return create(h)
            }
            let [ev, i, en] = unpack3(e)
            // occupied by different hash
            if (i !== h) {
                // x = i
                // #h: ev[_, x], en
                const n = findEmpty(i)
                // #n: 0, 0, 0
                while (true) {
                    const [fv, fn] = unpack(a[i])
                    // #i: fv[_, x], fn
                    // #ni: [_, x], _
                    if (fn === h) {
                        //    #i : fv[_, x], fn
                        // #h #fn: ev[_, x], en
                        //    #en:   [_, x], _
                        //    #n :   [0, 0], 0
                        a[i] = pack([fv, n])
                        a[n] = e
                        return create(h)
                        //    #i : fv[_, x], n
                        // #h #fn:  v[_, h], 0
                        //    #en:   [_, x], _
                        //    #n : ev[_, x], en
                    }
                    i = fn
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
                if (en === h) {
                    const n = findEmpty(h)
                    a[i] = pack([ev, n])
                    return create(n)
                }
                i = en;
                [ev, en] = unpack(a[i])
            }
        }
    }
}

const extend = () => {
    const { unpack: oldUnpack, mask: oldMask } = object()
    // resize
    const oldLength = a.length
    {
        let i = oldLength
        while (i !== 0) {
            --i
            a.push(0)
        }
    }
    const high = 1 << bits
    bits += 1
    //
    const { unpack, pack, unpack3 } = object()
    // change format
    {
        let i = oldLength
        while (i !== 0) {
            --i
            a[i] = pack(oldUnpack(a[i]))
        }
    }
    //
    {
        const updateList = (/** @type {number} */h) => {
            const hh = h | high
            const addHigh = (/** @type {number} */v) => {
                const x = a[hh]
                let i;
                if (x === 0) {
                    i = hh
                } else {
                    i = findEmpty(hh)
                    a[i] = x
                }
                a[hh] = pack([v, i])
            }

            let px = a[h]

            if (px === 0) {
                // an empty cell
                return
            }

            let [pv, ph, i] = unpack3(px)
            if (h !== (ph & oldMask)) {
                // not a beginning of a list
                return
            }

            // a beginning of a list

            // move all high-bit items from #h position
            if (ph !== h) {
                do {
                    addHigh(pv)
                    if (i === h) {
                        // no more items in the list `h`
                        a[h] = 0
                        return
                    }
                    px = a[i]
                    a[i] = 0;
                    [pv, ph, i] = unpack3(px)
                } while (ph !== h)
                a[h] = px
            }

            let p = h
            while (i !== h) {
                const [iv, ih, n] = unpack3(a[i])
                if (ih === h) {
                    p = i
                    pv = iv
                } else {
                    addHigh(iv)
                    a[p] = pack([pv, n])
                    a[i] = 0
                }
                i = n
            }
        }

        let h = oldLength
        while (h !== 0) {
            --h
            updateList(h)
        }
    }
}

const print = () => {
    const { unpack } = object()
    for (const e of a) {
        const [vh, n] = unpack(e)
        console.log(vh.toString(16), n.toString(16))
    }
}

const add = (/** @type {number} */x) => {
    if (size === a.length) {
        extend()
    }
    return object().add(x)
}

//           x     x     x     x     x     x     x     x     x     x     x     x     x     x     x     x
const t = [0x86, 0x7b, 0x8a, 0x80, 0xe6, 0xbe, 0x12, 0xb8, 0x82, 0x1e, 0x84, 0x2d, 0x1c, 0xb7, 0x71, 0x70]
// const t = [0x86, 0xe6, 0xb7]
// const t = [0x86, 0x7b, 0x8a, 0x80, 0xe6, 0xb6, 0x12, 0xb8, 0x82, 0x1e, 0x84, 0x2d, 0x1c, 0xb7, 0x71, 0x70]
// const t = [0x86, 0x7b, 0x8a, 0x80, 0xe6, 0xb6, 0x12, 0xb8, 0x12, 0x1e, 0x84, 0x2d, 0x1c, 0xb7, 0x71, 0x71]

for (const e of t) {
    add(e)
    console.log()
    console.log(`## ${e.toString(16)}`)
    console.log()
    print()
}
