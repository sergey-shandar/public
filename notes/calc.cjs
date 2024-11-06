/**
 * @typedef {{
 *  D: number
 *  R: number
 * }} Result
 */

/**
 * @typedef {{
 *  readonly voted: number
 *  readonly D: number
 *  readonly R: number
 * }} County
 */

/**
 * @typedef {{
 *  readonly [name in string]: County
 * }} State
 */

/**
 * @typedef {{
 *  readonly [name in string]: State
 * }} States
 */

/** @type {States} */
const states = {
    Pennsylvania: {
        "Philadelphia": {
            voted: 67.3,
            D: 406_602,
            R: 112_018,
        },
        "Delaware": {
            voted: 68.2,
            D: 138_564,
            R: 89_921
        },
        "Chester": {
            voted: 47.5,
            D: 90_209,
            R: 59_116
        },
        "Montgomery": {
            voted: 59.4,
            D: 199_362,
            R: 105_486,
        },
        Bucks: {
            voted: 63.1,
            D: 124_094,
            R: 121_808,
        },
        "Lehigh": {
            voted: 83.5,
            D: 81_188,
            R: 73_801,
        },
        "Dauphin": {
            voted: 54.7,
            D: 45_766,
            R: 36_440,
        },
        Monroe: {
            voted: 98.0,
            R: 40_654,
            D: 40_460,
        },
        "Lackawanna": {
            voted: 98.0,
            D: 58_956,
            R: 55_744,
        },
        "Cambria": {
            voted: 20.3,
            D: 7_463,
            R: 7_270,
        },
        "Allegheny": {
            voted: 92.4,
            D: 408_543,
            R: 275_245,
        },
        Erie: {
            voted: 98.0,
            D: 65_464,
            R: 67_399,
        },
        //
        Greene: {
            voted: 98.0,
            R: 12_258,
            D: 4_554,
        },
        Somerset: {
            voted: 76.3,
            R: 26_216,
            D: 5_316,
        },
        Bedford: {
            voted: 85.5,
            R: 19_425,
            D: 3_829,
        },
        Fulton: {
            voted: 98.0,
            R: 6_984,
            D: 1_082,
        },
        Franklin: {
            voted: 98.0,
            R: 59_105,
            D: 22_968,
        },
        Adams: {
            voted: 98.0,
            R: 40_021,
            D: 19_623,
        },
        Blair: {
            voted: 40.7,
            R: 19_619,
            D: 6_345,
        },
        Huntingdon: {
            voted: 98.0,
            R: 17_561,
            D: 5_332,
        },
        Mifflin: {
            voted: 95.0,
            R: 14_255,
            D: 2_716,
        },
        Juniata: {
            voted: 98.0,
            R: 8_308,
            D: 1_489,
        },
        Perry: {
            voted: 81.8,
            R: 16_131,
            D: 4_058,
        },
        Snyder: {
            voted: 97.7,
            R: 14_592,
            D: 5_184,
        },
        Schuylkill: {
            voted: 98.0,
            R: 48_838,
            D: 13_652,
        },
        Carbon: {
            voted: 90.0,
            R: 20_323,
            D: 7_270,
        },
        Columbia: {
            voted: 97.0,
            R: 18_134,
            D: 7_292,
        },
        Lycoming: {
            voted: 98.0,
            R: 41_677,
            D: 17_012,
        },
        Sullivan: {
            voted: 98.0,
            R: 2_697,
            D: 956,
        },
        Susquehanna: {
            voted: 98.0,
            R: 15_949,
            D: 5_998,
        },
        Bradford: {
            voted: 97.7,
            R: 22_658,
            D: 7_816,
        },
        Tioga: {
            voted: 98.0,
            R: 16_222,
            D: 5_080,
        },
        Clinton: {
            voted: 98.0,
            R: 12_908,
            D: 5_366,
        },
        Potter: {
            voted: 98.0,
            R: 7_303,
            D: 1_664,
        },
        McKean: {
            voted: 46.9,
            R: 6_813,
            D: 2_558,
        },
        Elk: {
            voted: 95.0,
            R: 12_506,
            D: 4_464,
        },
        Clearfield: {
            voted: 98.0,
            R: 30_363,
            D: 9_565,
        },
        Jefferson: {
            voted: 98.0,
            R: 18_196,
            D: 4_696,
        },
        Forest: {
            voted: 98.0,
            R: 1_897,
            D: 719,
        },
        Venango: {
            voted: 96.5,
            R: 18_747,
            D: 7_531,
        },
        Clarion: {
            voted: 98.0,
            R: 14_972,
            D: 4_529
        },
        Armstrong: {
            voted: 98.0,
            R: 28_084,
            D: 8_442
        },
        Warren: {
            voted: 98.0,
            R: 14_273,
            D: 6_164,
        },
        Crawford: {
            voted: 94.1,
            R: 29_450,
            D: 12_644,
        },
        Mercer: {
            voted: 98.0,
            R: 36_679,
            D: 19_272,
        },
        Lawrence: {
            voted: 98.0,
            R: 31_164,
            D: 15_281,
        },
        Butler: {
            voted: 98.0,
            R: 79_147,
            D: 40_046,
        },
        Beaver: {
            voted: 98.0,
            R: 56_082,
            D: 36_585,
        },
        Washington: {
            voted: 98.0,
            R: 75_084,
            D: 43_979,
        },
        Fayette: {
            voted: 98.0,
            R: 43_076,
            D: 19_238,
        },
        Westmoreland: {
            voted: 83.9,
            R: 118_551,
            D: 55_671,
        },
        Indiana: {
            voted: 97.9,
            R: 29_111,
            D: 12_610,
        },
        Centre: {
            voted: 81.1,
            R: 34_204,
            D: 31_481,
        },
        Union: {
            voted: 98.0,
            R: 12_594,
            D: 7_457,
        },
        Northumberland: {
            voted: 98.0,
            R: 29_984,
            D: 12_716,
        },
        Montour: {
            voted: 74.5,
            R: 4_790,
            D: 2_351,
        },
        Cumberland: {
            voted: 98.0,
            R: 79_784,
            D: 65_506,
        },
        York: {
            voted: 44.2,
            R: 58_035,
            D: 51_117,
        },
        Lancaster: {
            voted: 97.0,
            R: 164_386,
            D: 117_526,
        },
        Lebanon: {
            voted: 98.0,
            R: 47_775,
            D: 24_265
        },
        Berks: {
            voted: 98.0,
            R: 111_124,
            D: 84_869
        },
        Northampton: {
            voted: 97.7,
            R: 82_797,
            D: 74_439,
        },
        Luzerne: {
            voted: 95.1,
            R: 87_512,
            D: 56_424,
        },
        Wyoming: {
            voted: 98.0,
            R: 10_183,
            D: 4_656,
        },
        Wayne: {
            voted: 98.0,
            R: 19_911,
            D: 9_100,
        },
        Pike: {
            voted: 98.0,
            R: 21_298,
            D: 12_993,
        }
    }
}

/** @typedef {(_: County) => Result} F */

/** @type {F} */
const id = v => v

/** @type {F} */
const countyPredict = ({ voted, D, R}) => ({ D: D * 100 / voted, R: R * 100 / voted })

/** @type {(_: F) => (_: State) => Result} */
const state = f => state => {
    let result = { D: 0, R: 0 }
    for (const n in state) {
        const c = f(state[n])
        result.D += c.D
        result.R += c.R
    }
    return result
}

/** @type {(_: F) => void} */
const print = f => {
    for (const n in states) {
        const x = state(f)(states[n])
        console.log(n, x.D / (x.D + x.R), x)
    }
}

print(id)
console.log('predict')
print(countyPredict)
