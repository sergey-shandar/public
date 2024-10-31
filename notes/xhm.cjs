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
            const addHigh = (/** @type {readonly[number, number]} */[v, i]) => {
                const x = a[hh]
                if (x === 0) {
                    i = hh
                } else {
                    i |= high
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
            {
                let p = h
                if (ph !== h) {
                    do {
                        addHigh([pv, p])
                        if (i === h) {
                            // no more items in the list `h`
                            a[h] = 0
                            return
                        }
                        px = a[i]
                        a[i] = 0
                        p = i;
                        [pv, ph, i] = unpack3(px)
                    } while (ph !== h)
                    a[h] = px
                }
            }

            {
                let p = h
                while (i !== h) {
                    const [iv, ih, n] = unpack3(a[i])
                    if (ih === h) {
                        p = i
                        pv = iv
                    } else {
                        addHigh([iv, i])
                        a[p] = pack([pv, n])
                        a[i] = 0
                    }
                    i = n
                }
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
    for (const [i, e] of a.entries()) {
        const [vh, n] = unpack(e)
        console.log(i.toString(16), vh.toString(16), n.toString(16))
    }
}

const add = (/** @type {number} */x) => {
    if (size === a.length) {
        extend()
        console.log('------------')
        print()
    }
    return object().add(x)
}

const t = [
    0xb494, 0x5798, 0x0574, 0xcbdd, 0x7cf1, 0xb144, 0xccf1, 0x4247, 0xb7c9, 0x7013, 0xf53b, 0x4342, 0x7aac, 0x2c66, 0x2c3d, 0x927f,
    0xfbe0, 0xd0e5, 0x4ea8, 0x6aee, 0x7db5, 0x0036, 0xb369, 0xafdb, 0x20e7, 0x6cc9, 0x2d66, 0x86f9, 0x38a0, 0x612d, 0xf445, 0xb3aa,
    0xecf5, 0x7347, 0xf133, 0x4ad5, 0xf9f1, 0x29fa, 0x1ff2, 0xbda4, 0x0d1e, 0x914d, 0xd0f1, 0x831c, 0xf30b, 0xa369, 0xda38, 0x8813,
    0xf355, 0x9597, 0x12ae, 0x7471, 0xa461, 0x6308, 0xd203, 0xda0a, 0x5c2f, 0xc8ed, 0x450a, 0x219a, 0x1012, 0x6f64, 0x6a87, 0xabc5,
    0x77a7, 0x2e73, 0x9653, 0x87d7, 0xdaef, 0x0cdb, 0xaa88, 0xa157, 0x8d61, 0xf310, 0xffcb, 0xe2d1, 0x177a, 0x0e9f, 0xfab3, 0xcaef,
    0x81e1, 0x22cc, 0x6b19, 0x2263, 0xcc48, 0x096b, 0xab9f, 0x60fa, 0x9d37, 0x4469, 0x051b, 0xc850, 0x3276, 0x142a, 0x1362, 0xf822,
    0xc4be, 0x57bd, 0x72ee, 0xe975, 0x46f7, 0xb525, 0x13bc, 0x8cb5, 0x0bd0, 0xc898, 0xad90, 0xb6b0, 0xfd46, 0xf2b3, 0x509c, 0xb896,
    0x364a, 0xcb39, 0xf0d0, 0xa670, 0x723d, 0xa1d5, 0xedee, 0x2f93, 0xd67d, 0x3422, 0x76b8, 0xa0f8, 0x265e, 0xa0be, 0x732d, 0xa534,
    0xb612, 0xecc7, 0x81c6, 0x42f5, 0xb0dd, 0xe198, 0xa4ee, 0x96bc, 0xbc17, 0xe67e, 0xac00, 0xfee6, 0x287c, 0x58db, 0x7543, 0x4a51,
    0x24ad, 0xb982, 0x4dca, 0xebff, 0x2a16, 0xd093, 0x37f8, 0x2d06, 0x1af5, 0xe383, 0x447e, 0xab4c, 0x9994, 0xa250, 0xa4aa, 0x477f,
    0x8356, 0x8c0d, 0xb101, 0x54f0, 0x6cfd, 0x05c3, 0x84f7, 0x2374, 0x1b2e, 0x7d45, 0xe766, 0x39be, 0xcd6d, 0xc1c0, 0x0fd9, 0xed6e,
    0x4d80, 0x7b32, 0x7bd9, 0x9845, 0x5e7a, 0xe9d2, 0xae44, 0x75c6, 0x7ff3, 0x00f1, 0x8dd1, 0x5fb0, 0x8b42, 0x01da, 0x35cd, 0x11b8,
    0xbf15, 0xcfe1, 0x7fdb, 0x2b39, 0x804e, 0xca7b, 0x9402, 0xe15b, 0xe00c, 0xfe93, 0xd5eb, 0xfb86, 0x93be, 0x6ff9, 0xc1a9, 0x89a1,
    0x58cd, 0x9b5c, 0xd4c6, 0x7df6, 0xb465, 0xb15c, 0x21b4, 0x623c, 0xf97a, 0xd0ce, 0x7cd1, 0x29e3, 0x304a, 0x981c, 0xb422, 0x53a4,
    0xf22f, 0x15a6, 0xfec3, 0x3291, 0xf24e, 0x031a, 0xa506, 0xf90c, 0x99e6, 0xddab, 0xfa64, 0x764c, 0x498f, 0x3d6d, 0xa5a0, 0xa725,
    0xf057, 0x9a95, 0xccc3, 0x3969, 0x8fd6, 0x9356, 0x1e70, 0x0ed7, 0xc8d9, 0x5d9f, 0x3561, 0x40ae, 0x2f3d, 0x4b04, 0x8171, 0x205b,
]
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
