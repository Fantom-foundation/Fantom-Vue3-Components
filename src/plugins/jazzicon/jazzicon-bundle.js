/*
ISC License

Copyright (c) 2020 Dan Finlay

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
var t = function (t) {
    null == t && (t = new Date().getTime()),
        (this.N = 624),
        (this.M = 397),
        (this.MATRIX_A = 2567483615),
        (this.UPPER_MASK = 2147483648),
        (this.LOWER_MASK = 2147483647),
        (this.mt = new Array(this.N)),
        (this.mti = this.N + 1),
        t.constructor == Array ? this.init_by_array(t, t.length) : this.init_seed(t);
};
(t.prototype.init_seed = function (t) {
    for (this.mt[0] = t >>> 0, this.mti = 1; this.mti < this.N; this.mti++) {
        t = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
        (this.mt[this.mti] = ((1812433253 * ((4294901760 & t) >>> 16)) << 16) + 1812433253 * (65535 & t) + this.mti),
            (this.mt[this.mti] >>>= 0);
    }
}),
    (t.prototype.init_by_array = function (t, e) {
        var r, n, a;
        for (this.init_seed(19650218), r = 1, n = 0, a = this.N > e ? this.N : e; a; a--) {
            var s = this.mt[r - 1] ^ (this.mt[r - 1] >>> 30);
            (this.mt[r] =
                (this.mt[r] ^ (((1664525 * ((4294901760 & s) >>> 16)) << 16) + 1664525 * (65535 & s))) + t[n] + n),
                (this.mt[r] >>>= 0),
                n++,
                ++r >= this.N && ((this.mt[0] = this.mt[this.N - 1]), (r = 1)),
                n >= e && (n = 0);
        }
        for (a = this.N - 1; a; a--) {
            s = this.mt[r - 1] ^ (this.mt[r - 1] >>> 30);
            (this.mt[r] =
                (this.mt[r] ^ (((1566083941 * ((4294901760 & s) >>> 16)) << 16) + 1566083941 * (65535 & s))) - r),
                (this.mt[r] >>>= 0),
                ++r >= this.N && ((this.mt[0] = this.mt[this.N - 1]), (r = 1));
        }
        this.mt[0] = 2147483648;
    }),
    (t.prototype.random_int = function () {
        var t,
            e = new Array(0, this.MATRIX_A);
        if (this.mti >= this.N) {
            var r;
            for (this.mti == this.N + 1 && this.init_seed(5489), r = 0; r < this.N - this.M; r++)
                (t = (this.mt[r] & this.UPPER_MASK) | (this.mt[r + 1] & this.LOWER_MASK)),
                    (this.mt[r] = this.mt[r + this.M] ^ (t >>> 1) ^ e[1 & t]);
            for (; r < this.N - 1; r++)
                (t = (this.mt[r] & this.UPPER_MASK) | (this.mt[r + 1] & this.LOWER_MASK)),
                    (this.mt[r] = this.mt[r + (this.M - this.N)] ^ (t >>> 1) ^ e[1 & t]);
            (t = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK)),
                (this.mt[this.N - 1] = this.mt[this.M - 1] ^ (t >>> 1) ^ e[1 & t]),
                (this.mti = 0);
        }
        return (
            (t = this.mt[this.mti++]),
            (t ^= t >>> 11),
            (t ^= (t << 7) & 2636928640),
            (t ^= (t << 15) & 4022730752),
            (t ^= t >>> 18) >>> 0
        );
    }),
    (t.prototype.random_int31 = function () {
        return this.random_int() >>> 1;
    }),
    (t.prototype.random_incl = function () {
        return this.random_int() * (1 / 4294967295);
    }),
    (t.prototype.random = function () {
        return this.random_int() * (1 / 4294967296);
    }),
    (t.prototype.random_excl = function () {
        return (this.random_int() + 0.5) * (1 / 4294967296);
    }),
    (t.prototype.random_long = function () {
        return (67108864 * (this.random_int() >>> 5) + (this.random_int() >>> 6)) * (1 / 9007199254740992);
    });
var e = t;
var r = function (t, e) {
        var r = document.createElement('div');
        return (
            (r.style.overflow = 'hidden'),
            (r.style.padding = '0px'),
            (r.style.margin = '0px'),
            (r.style.width = t + 'px'),
            (r.style.height = t + 'px'),
            (r.style.display = 'inline-block'),
            (r.style.background = e),
            { container: r }
        );
    },
    n = { exports: {} };
!(function (t) {
    var e = (function () {
        function t(e, n, a, s) {
            'object' == typeof n && ((a = n.depth), (s = n.prototype), n.filter, (n = n.circular));
            var i = [],
                h = [],
                l = 'undefined' != typeof Buffer;
            return (
                void 0 === n && (n = !0),
                void 0 === a && (a = 1 / 0),
                (function e(a, u) {
                    if (null === a) return null;
                    if (0 == u) return a;
                    var o, c;
                    if ('object' != typeof a) return a;
                    if (t.__isArray(a)) o = [];
                    else if (t.__isRegExp(a))
                        (o = new RegExp(a.source, r(a))), a.lastIndex && (o.lastIndex = a.lastIndex);
                    else if (t.__isDate(a)) o = new Date(a.getTime());
                    else {
                        if (l && Buffer.isBuffer(a))
                            return (
                                (o = Buffer.allocUnsafe ? Buffer.allocUnsafe(a.length) : new Buffer(a.length)),
                                a.copy(o),
                                o
                            );
                        void 0 === s
                            ? ((c = Object.getPrototypeOf(a)), (o = Object.create(c)))
                            : ((o = Object.create(s)), (c = s));
                    }
                    if (n) {
                        var f = i.indexOf(a);
                        if (-1 != f) return h[f];
                        i.push(a), h.push(o);
                    }
                    for (var v in a) {
                        var g;
                        c && (g = Object.getOwnPropertyDescriptor(c, v)),
                            (g && null == g.set) || (o[v] = e(a[v], u - 1));
                    }
                    return o;
                })(e, a)
            );
        }
        function e(t) {
            return Object.prototype.toString.call(t);
        }
        function r(t) {
            var e = '';
            return t.global && (e += 'g'), t.ignoreCase && (e += 'i'), t.multiline && (e += 'm'), e;
        }
        return (
            (t.clonePrototype = function (t) {
                if (null === t) return null;
                var e = function () {};
                return (e.prototype = t), new e();
            }),
            (t.__objToStr = e),
            (t.__isDate = function (t) {
                return 'object' == typeof t && '[object Date]' === e(t);
            }),
            (t.__isArray = function (t) {
                return 'object' == typeof t && '[object Array]' === e(t);
            }),
            (t.__isRegExp = function (t) {
                return 'object' == typeof t && '[object RegExp]' === e(t);
            }),
            (t.__getRegExpFlags = r),
            t
        );
    })();
    t.exports && (t.exports = e);
})(n);
var a = { exports: {} },
    s = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50],
    },
    i = s,
    h = {};
for (var l in i) i.hasOwnProperty(l) && (h[i[l]] = l);
var u = (a.exports = {
    rgb: { channels: 3, labels: 'rgb' },
    hsl: { channels: 3, labels: 'hsl' },
    hsv: { channels: 3, labels: 'hsv' },
    hwb: { channels: 3, labels: 'hwb' },
    cmyk: { channels: 4, labels: 'cmyk' },
    xyz: { channels: 3, labels: 'xyz' },
    lab: { channels: 3, labels: 'lab' },
    lch: { channels: 3, labels: 'lch' },
    hex: { channels: 1, labels: ['hex'] },
    keyword: { channels: 1, labels: ['keyword'] },
    ansi16: { channels: 1, labels: ['ansi16'] },
    ansi256: { channels: 1, labels: ['ansi256'] },
    hcg: { channels: 3, labels: ['h', 'c', 'g'] },
    apple: { channels: 3, labels: ['r16', 'g16', 'b16'] },
    gray: { channels: 1, labels: ['gray'] },
});
for (var o in u)
    if (u.hasOwnProperty(o)) {
        if (!('channels' in u[o])) throw new Error('missing channels property: ' + o);
        if (!('labels' in u[o])) throw new Error('missing channel labels property: ' + o);
        if (u[o].labels.length !== u[o].channels) throw new Error('channel and label counts mismatch: ' + o);
        var c = u[o].channels,
            f = u[o].labels;
        delete u[o].channels,
            delete u[o].labels,
            Object.defineProperty(u[o], 'channels', { value: c }),
            Object.defineProperty(u[o], 'labels', { value: f });
    }
(u.rgb.hsl = function (t) {
    var e,
        r,
        n = t[0] / 255,
        a = t[1] / 255,
        s = t[2] / 255,
        i = Math.min(n, a, s),
        h = Math.max(n, a, s),
        l = h - i;
    return (
        h === i
            ? (e = 0)
            : n === h
            ? (e = (a - s) / l)
            : a === h
            ? (e = 2 + (s - n) / l)
            : s === h && (e = 4 + (n - a) / l),
        (e = Math.min(60 * e, 360)) < 0 && (e += 360),
        (r = (i + h) / 2),
        [e, 100 * (h === i ? 0 : r <= 0.5 ? l / (h + i) : l / (2 - h - i)), 100 * r]
    );
}),
    (u.rgb.hsv = function (t) {
        var e,
            r,
            n,
            a,
            s,
            i = t[0] / 255,
            h = t[1] / 255,
            l = t[2] / 255,
            u = Math.max(i, h, l),
            o = u - Math.min(i, h, l),
            c = function (t) {
                return (u - t) / 6 / o + 0.5;
            };
        return (
            0 === o
                ? (a = s = 0)
                : ((s = o / u),
                  (e = c(i)),
                  (r = c(h)),
                  (n = c(l)),
                  i === u ? (a = n - r) : h === u ? (a = 1 / 3 + e - n) : l === u && (a = 2 / 3 + r - e),
                  a < 0 ? (a += 1) : a > 1 && (a -= 1)),
            [360 * a, 100 * s, 100 * u]
        );
    }),
    (u.rgb.hwb = function (t) {
        var e = t[0],
            r = t[1],
            n = t[2];
        return [
            u.rgb.hsl(t)[0],
            100 * ((1 / 255) * Math.min(e, Math.min(r, n))),
            100 * (n = 1 - (1 / 255) * Math.max(e, Math.max(r, n))),
        ];
    }),
    (u.rgb.cmyk = function (t) {
        var e,
            r = t[0] / 255,
            n = t[1] / 255,
            a = t[2] / 255;
        return [
            100 * ((1 - r - (e = Math.min(1 - r, 1 - n, 1 - a))) / (1 - e) || 0),
            100 * ((1 - n - e) / (1 - e) || 0),
            100 * ((1 - a - e) / (1 - e) || 0),
            100 * e,
        ];
    }),
    (u.rgb.keyword = function (t) {
        var e = h[t];
        if (e) return e;
        var r,
            n,
            a,
            s = 1 / 0;
        for (var l in i)
            if (i.hasOwnProperty(l)) {
                var u = i[l],
                    o =
                        ((n = t),
                        (a = u),
                        Math.pow(n[0] - a[0], 2) + Math.pow(n[1] - a[1], 2) + Math.pow(n[2] - a[2], 2));
                o < s && ((s = o), (r = l));
            }
        return r;
    }),
    (u.keyword.rgb = function (t) {
        return i[t];
    }),
    (u.rgb.xyz = function (t) {
        var e = t[0] / 255,
            r = t[1] / 255,
            n = t[2] / 255;
        return [
            100 *
                (0.4124 * (e = e > 0.04045 ? Math.pow((e + 0.055) / 1.055, 2.4) : e / 12.92) +
                    0.3576 * (r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92) +
                    0.1805 * (n = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92)),
            100 * (0.2126 * e + 0.7152 * r + 0.0722 * n),
            100 * (0.0193 * e + 0.1192 * r + 0.9505 * n),
        ];
    }),
    (u.rgb.lab = function (t) {
        var e = u.rgb.xyz(t),
            r = e[0],
            n = e[1],
            a = e[2];
        return (
            (n /= 100),
            (a /= 108.883),
            (r = (r /= 95.047) > 0.008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116),
            [
                116 * (n = n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) - 16,
                500 * (r - n),
                200 * (n - (a = a > 0.008856 ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116)),
            ]
        );
    }),
    (u.hsl.rgb = function (t) {
        var e,
            r,
            n,
            a,
            s,
            i = t[0] / 360,
            h = t[1] / 100,
            l = t[2] / 100;
        if (0 === h) return [(s = 255 * l), s, s];
        (e = 2 * l - (r = l < 0.5 ? l * (1 + h) : l + h - l * h)), (a = [0, 0, 0]);
        for (var u = 0; u < 3; u++)
            (n = i + (1 / 3) * -(u - 1)) < 0 && n++,
                n > 1 && n--,
                (s = 6 * n < 1 ? e + 6 * (r - e) * n : 2 * n < 1 ? r : 3 * n < 2 ? e + (r - e) * (2 / 3 - n) * 6 : e),
                (a[u] = 255 * s);
        return a;
    }),
    (u.hsl.hsv = function (t) {
        var e = t[0],
            r = t[1] / 100,
            n = t[2] / 100,
            a = r,
            s = Math.max(n, 0.01);
        return (
            (r *= (n *= 2) <= 1 ? n : 2 - n),
            (a *= s <= 1 ? s : 2 - s),
            [e, 100 * (0 === n ? (2 * a) / (s + a) : (2 * r) / (n + r)), 100 * ((n + r) / 2)]
        );
    }),
    (u.hsv.rgb = function (t) {
        var e = t[0] / 60,
            r = t[1] / 100,
            n = t[2] / 100,
            a = Math.floor(e) % 6,
            s = e - Math.floor(e),
            i = 255 * n * (1 - r),
            h = 255 * n * (1 - r * s),
            l = 255 * n * (1 - r * (1 - s));
        switch (((n *= 255), a)) {
            case 0:
                return [n, l, i];
            case 1:
                return [h, n, i];
            case 2:
                return [i, n, l];
            case 3:
                return [i, h, n];
            case 4:
                return [l, i, n];
            case 5:
                return [n, i, h];
        }
    }),
    (u.hsv.hsl = function (t) {
        var e,
            r,
            n,
            a = t[0],
            s = t[1] / 100,
            i = t[2] / 100,
            h = Math.max(i, 0.01);
        return (
            (n = (2 - s) * i),
            (r = s * h),
            [a, 100 * (r = (r /= (e = (2 - s) * h) <= 1 ? e : 2 - e) || 0), 100 * (n /= 2)]
        );
    }),
    (u.hwb.rgb = function (t) {
        var e,
            r,
            n,
            a,
            s,
            i,
            h,
            l = t[0] / 360,
            u = t[1] / 100,
            o = t[2] / 100,
            c = u + o;
        switch (
            (c > 1 && ((u /= c), (o /= c)),
            (n = 6 * l - (e = Math.floor(6 * l))),
            0 != (1 & e) && (n = 1 - n),
            (a = u + n * ((r = 1 - o) - u)),
            e)
        ) {
            default:
            case 6:
            case 0:
                (s = r), (i = a), (h = u);
                break;
            case 1:
                (s = a), (i = r), (h = u);
                break;
            case 2:
                (s = u), (i = r), (h = a);
                break;
            case 3:
                (s = u), (i = a), (h = r);
                break;
            case 4:
                (s = a), (i = u), (h = r);
                break;
            case 5:
                (s = r), (i = u), (h = a);
        }
        return [255 * s, 255 * i, 255 * h];
    }),
    (u.cmyk.rgb = function (t) {
        var e = t[0] / 100,
            r = t[1] / 100,
            n = t[2] / 100,
            a = t[3] / 100;
        return [
            255 * (1 - Math.min(1, e * (1 - a) + a)),
            255 * (1 - Math.min(1, r * (1 - a) + a)),
            255 * (1 - Math.min(1, n * (1 - a) + a)),
        ];
    }),
    (u.xyz.rgb = function (t) {
        var e,
            r,
            n,
            a = t[0] / 100,
            s = t[1] / 100,
            i = t[2] / 100;
        return (
            (r = -0.9689 * a + 1.8758 * s + 0.0415 * i),
            (n = 0.0557 * a + -0.204 * s + 1.057 * i),
            (e =
                (e = 3.2406 * a + -1.5372 * s + -0.4986 * i) > 0.0031308
                    ? 1.055 * Math.pow(e, 1 / 2.4) - 0.055
                    : 12.92 * e),
            (r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r),
            (n = n > 0.0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - 0.055 : 12.92 * n),
            [
                255 * (e = Math.min(Math.max(0, e), 1)),
                255 * (r = Math.min(Math.max(0, r), 1)),
                255 * (n = Math.min(Math.max(0, n), 1)),
            ]
        );
    }),
    (u.xyz.lab = function (t) {
        var e = t[0],
            r = t[1],
            n = t[2];
        return (
            (r /= 100),
            (n /= 108.883),
            (e = (e /= 95.047) > 0.008856 ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116),
            [
                116 * (r = r > 0.008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116) - 16,
                500 * (e - r),
                200 * (r - (n = n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116)),
            ]
        );
    }),
    (u.lab.xyz = function (t) {
        var e,
            r,
            n,
            a = t[0];
        (e = t[1] / 500 + (r = (a + 16) / 116)), (n = r - t[2] / 200);
        var s = Math.pow(r, 3),
            i = Math.pow(e, 3),
            h = Math.pow(n, 3);
        return (
            (r = s > 0.008856 ? s : (r - 16 / 116) / 7.787),
            (e = i > 0.008856 ? i : (e - 16 / 116) / 7.787),
            (n = h > 0.008856 ? h : (n - 16 / 116) / 7.787),
            [(e *= 95.047), (r *= 100), (n *= 108.883)]
        );
    }),
    (u.lab.lch = function (t) {
        var e,
            r = t[0],
            n = t[1],
            a = t[2];
        return (e = (360 * Math.atan2(a, n)) / 2 / Math.PI) < 0 && (e += 360), [r, Math.sqrt(n * n + a * a), e];
    }),
    (u.lch.lab = function (t) {
        var e,
            r = t[0],
            n = t[1];
        return (e = (t[2] / 360) * 2 * Math.PI), [r, n * Math.cos(e), n * Math.sin(e)];
    }),
    (u.rgb.ansi16 = function (t) {
        var e = t[0],
            r = t[1],
            n = t[2],
            a = 1 in arguments ? arguments[1] : u.rgb.hsv(t)[2];
        if (0 === (a = Math.round(a / 50))) return 30;
        var s = 30 + ((Math.round(n / 255) << 2) | (Math.round(r / 255) << 1) | Math.round(e / 255));
        return 2 === a && (s += 60), s;
    }),
    (u.hsv.ansi16 = function (t) {
        return u.rgb.ansi16(u.hsv.rgb(t), t[2]);
    }),
    (u.rgb.ansi256 = function (t) {
        var e = t[0],
            r = t[1],
            n = t[2];
        return e === r && r === n
            ? e < 8
                ? 16
                : e > 248
                ? 231
                : Math.round(((e - 8) / 247) * 24) + 232
            : 16 + 36 * Math.round((e / 255) * 5) + 6 * Math.round((r / 255) * 5) + Math.round((n / 255) * 5);
    }),
    (u.ansi16.rgb = function (t) {
        var e = t % 10;
        if (0 === e || 7 === e) return t > 50 && (e += 3.5), [(e = (e / 10.5) * 255), e, e];
        var r = 0.5 * (1 + ~~(t > 50));
        return [(1 & e) * r * 255, ((e >> 1) & 1) * r * 255, ((e >> 2) & 1) * r * 255];
    }),
    (u.ansi256.rgb = function (t) {
        if (t >= 232) {
            var e = 10 * (t - 232) + 8;
            return [e, e, e];
        }
        var r;
        return (
            (t -= 16), [(Math.floor(t / 36) / 5) * 255, (Math.floor((r = t % 36) / 6) / 5) * 255, ((r % 6) / 5) * 255]
        );
    }),
    (u.rgb.hex = function (t) {
        var e = (((255 & Math.round(t[0])) << 16) + ((255 & Math.round(t[1])) << 8) + (255 & Math.round(t[2])))
            .toString(16)
            .toUpperCase();
        return '000000'.substring(e.length) + e;
    }),
    (u.hex.rgb = function (t) {
        var e = t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
        if (!e) return [0, 0, 0];
        var r = e[0];
        3 === e[0].length &&
            (r = r
                .split('')
                .map(function (t) {
                    return t + t;
                })
                .join(''));
        var n = parseInt(r, 16);
        return [(n >> 16) & 255, (n >> 8) & 255, 255 & n];
    }),
    (u.rgb.hcg = function (t) {
        var e,
            r = t[0] / 255,
            n = t[1] / 255,
            a = t[2] / 255,
            s = Math.max(Math.max(r, n), a),
            i = Math.min(Math.min(r, n), a),
            h = s - i;
        return (
            (e = h <= 0 ? 0 : s === r ? ((n - a) / h) % 6 : s === n ? 2 + (a - r) / h : 4 + (r - n) / h + 4),
            (e /= 6),
            [360 * (e %= 1), 100 * h, 100 * (h < 1 ? i / (1 - h) : 0)]
        );
    }),
    (u.hsl.hcg = function (t) {
        var e = t[1] / 100,
            r = t[2] / 100,
            n = 1,
            a = 0;
        return (
            (n = r < 0.5 ? 2 * e * r : 2 * e * (1 - r)) < 1 && (a = (r - 0.5 * n) / (1 - n)), [t[0], 100 * n, 100 * a]
        );
    }),
    (u.hsv.hcg = function (t) {
        var e = t[1] / 100,
            r = t[2] / 100,
            n = e * r,
            a = 0;
        return n < 1 && (a = (r - n) / (1 - n)), [t[0], 100 * n, 100 * a];
    }),
    (u.hcg.rgb = function (t) {
        var e = t[0] / 360,
            r = t[1] / 100,
            n = t[2] / 100;
        if (0 === r) return [255 * n, 255 * n, 255 * n];
        var a,
            s = [0, 0, 0],
            i = (e % 1) * 6,
            h = i % 1,
            l = 1 - h;
        switch (Math.floor(i)) {
            case 0:
                (s[0] = 1), (s[1] = h), (s[2] = 0);
                break;
            case 1:
                (s[0] = l), (s[1] = 1), (s[2] = 0);
                break;
            case 2:
                (s[0] = 0), (s[1] = 1), (s[2] = h);
                break;
            case 3:
                (s[0] = 0), (s[1] = l), (s[2] = 1);
                break;
            case 4:
                (s[0] = h), (s[1] = 0), (s[2] = 1);
                break;
            default:
                (s[0] = 1), (s[1] = 0), (s[2] = l);
        }
        return (a = (1 - r) * n), [255 * (r * s[0] + a), 255 * (r * s[1] + a), 255 * (r * s[2] + a)];
    }),
    (u.hcg.hsv = function (t) {
        var e = t[1] / 100,
            r = e + (t[2] / 100) * (1 - e),
            n = 0;
        return r > 0 && (n = e / r), [t[0], 100 * n, 100 * r];
    }),
    (u.hcg.hsl = function (t) {
        var e = t[1] / 100,
            r = (t[2] / 100) * (1 - e) + 0.5 * e,
            n = 0;
        return (
            r > 0 && r < 0.5 ? (n = e / (2 * r)) : r >= 0.5 && r < 1 && (n = e / (2 * (1 - r))),
            [t[0], 100 * n, 100 * r]
        );
    }),
    (u.hcg.hwb = function (t) {
        var e = t[1] / 100,
            r = e + (t[2] / 100) * (1 - e);
        return [t[0], 100 * (r - e), 100 * (1 - r)];
    }),
    (u.hwb.hcg = function (t) {
        var e = t[1] / 100,
            r = 1 - t[2] / 100,
            n = r - e,
            a = 0;
        return n < 1 && (a = (r - n) / (1 - n)), [t[0], 100 * n, 100 * a];
    }),
    (u.apple.rgb = function (t) {
        return [(t[0] / 65535) * 255, (t[1] / 65535) * 255, (t[2] / 65535) * 255];
    }),
    (u.rgb.apple = function (t) {
        return [(t[0] / 255) * 65535, (t[1] / 255) * 65535, (t[2] / 255) * 65535];
    }),
    (u.gray.rgb = function (t) {
        return [(t[0] / 100) * 255, (t[0] / 100) * 255, (t[0] / 100) * 255];
    }),
    (u.gray.hsl = u.gray.hsv =
        function (t) {
            return [0, 0, t[0]];
        }),
    (u.gray.hwb = function (t) {
        return [0, 100, t[0]];
    }),
    (u.gray.cmyk = function (t) {
        return [0, 0, 0, t[0]];
    }),
    (u.gray.lab = function (t) {
        return [t[0], 0, 0];
    }),
    (u.gray.hex = function (t) {
        var e = 255 & Math.round((t[0] / 100) * 255),
            r = ((e << 16) + (e << 8) + e).toString(16).toUpperCase();
        return '000000'.substring(r.length) + r;
    }),
    (u.rgb.gray = function (t) {
        return [((t[0] + t[1] + t[2]) / 3 / 255) * 100];
    });
var v = a.exports;
function g(t) {
    var e = (function () {
            for (var t = {}, e = Object.keys(v), r = e.length, n = 0; n < r; n++)
                t[e[n]] = { distance: -1, parent: null };
            return t;
        })(),
        r = [t];
    for (e[t].distance = 0; r.length; )
        for (var n = r.pop(), a = Object.keys(v[n]), s = a.length, i = 0; i < s; i++) {
            var h = a[i],
                l = e[h];
            -1 === l.distance && ((l.distance = e[n].distance + 1), (l.parent = n), r.unshift(h));
        }
    return e;
}
function b(t, e) {
    return function (r) {
        return e(t(r));
    };
}
function p(t, e) {
    for (var r = [e[t].parent, t], n = v[e[t].parent][t], a = e[t].parent; e[a].parent; )
        r.unshift(e[a].parent), (n = b(v[e[a].parent][a], n)), (a = e[a].parent);
    return (n.conversion = r), n;
}
var d = a.exports,
    m = function (t) {
        for (var e = g(t), r = {}, n = Object.keys(e), a = n.length, s = 0; s < a; s++) {
            var i = n[s];
            null !== e[i].parent && (r[i] = p(i, e));
        }
        return r;
    },
    y = {};
Object.keys(d).forEach(function (t) {
    (y[t] = {}),
        Object.defineProperty(y[t], 'channels', { value: d[t].channels }),
        Object.defineProperty(y[t], 'labels', { value: d[t].labels });
    var e = m(t);
    Object.keys(e).forEach(function (r) {
        var n = e[r];
        (y[t][r] = (function (t) {
            var e = function (e) {
                if (null == e) return e;
                arguments.length > 1 && (e = Array.prototype.slice.call(arguments));
                var r = t(e);
                if ('object' == typeof r) for (var n = r.length, a = 0; a < n; a++) r[a] = Math.round(r[a]);
                return r;
            };
            return 'conversion' in t && (e.conversion = t.conversion), e;
        })(n)),
            (y[t][r].raw = (function (t) {
                var e = function (e) {
                    return null == e ? e : (arguments.length > 1 && (e = Array.prototype.slice.call(arguments)), t(e));
                };
                return 'conversion' in t && (e.conversion = t.conversion), e;
            })(n));
    });
});
var w = y,
    M = s,
    k = {
        getRgba: x,
        getHsla: S,
        getRgb: function (t) {
            var e = x(t);
            return e && e.slice(0, 3);
        },
        getHsl: function (t) {
            var e = S(t);
            return e && e.slice(0, 3);
        },
        getHwb: A,
        getAlpha: function (t) {
            var e = x(t);
            if (e) return e[3];
            if ((e = S(t))) return e[3];
            if ((e = A(t))) return e[3];
        },
        hexString: function (t) {
            return '#' + O(t[0]) + O(t[1]) + O(t[2]);
        },
        rgbString: function (t, e) {
            if (e < 1 || (t[3] && t[3] < 1)) return _(t, e);
            return 'rgb(' + t[0] + ', ' + t[1] + ', ' + t[2] + ')';
        },
        rgbaString: _,
        percentString: function (t, e) {
            if (e < 1 || (t[3] && t[3] < 1)) return N(t, e);
            var r = Math.round((t[0] / 255) * 100),
                n = Math.round((t[1] / 255) * 100),
                a = Math.round((t[2] / 255) * 100);
            return 'rgb(' + r + '%, ' + n + '%, ' + a + '%)';
        },
        percentaString: N,
        hslString: function (t, e) {
            if (e < 1 || (t[3] && t[3] < 1)) return j(t, e);
            return 'hsl(' + t[0] + ', ' + t[1] + '%, ' + t[2] + '%)';
        },
        hslaString: j,
        hwbString: function (t, e) {
            void 0 === e && (e = void 0 !== t[3] ? t[3] : 1);
            return 'hwb(' + t[0] + ', ' + t[1] + '%, ' + t[2] + '%' + (void 0 !== e && 1 !== e ? ', ' + e : '') + ')';
        },
        keyword: function (t) {
            return E[t.slice(0, 3)];
        },
    };
function x(t) {
    if (t) {
        var e = [0, 0, 0],
            r = 1,
            n = t.match(/^#([a-fA-F0-9]{3})$/);
        if (n) {
            n = n[1];
            for (var a = 0; a < e.length; a++) e[a] = parseInt(n[a] + n[a], 16);
        } else if ((n = t.match(/^#([a-fA-F0-9]{6})$/))) {
            n = n[1];
            for (a = 0; a < e.length; a++) e[a] = parseInt(n.slice(2 * a, 2 * a + 2), 16);
        } else if (
            (n = t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/))
        ) {
            for (a = 0; a < e.length; a++) e[a] = parseInt(n[a + 1]);
            r = parseFloat(n[4]);
        } else if (
            (n = t.match(
                /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/
            ))
        ) {
            for (a = 0; a < e.length; a++) e[a] = Math.round(2.55 * parseFloat(n[a + 1]));
            r = parseFloat(n[4]);
        } else if ((n = t.match(/(\D+)/))) {
            if ('transparent' == n[1]) return [0, 0, 0, 0];
            if (!(e = M[n[1]])) return;
        }
        for (a = 0; a < e.length; a++) e[a] = C(e[a], 0, 255);
        return (r = r || 0 == r ? C(r, 0, 1) : 1), (e[3] = r), e;
    }
}
function S(t) {
    if (t) {
        var e = t.match(
            /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/
        );
        if (e) {
            var r = parseFloat(e[4]);
            return [
                C(parseInt(e[1]), 0, 360),
                C(parseFloat(e[2]), 0, 100),
                C(parseFloat(e[3]), 0, 100),
                C(isNaN(r) ? 1 : r, 0, 1),
            ];
        }
    }
}
function A(t) {
    if (t) {
        var e = t.match(
            /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/
        );
        if (e) {
            var r = parseFloat(e[4]);
            return [
                C(parseInt(e[1]), 0, 360),
                C(parseFloat(e[2]), 0, 100),
                C(parseFloat(e[3]), 0, 100),
                C(isNaN(r) ? 1 : r, 0, 1),
            ];
        }
    }
}
function _(t, e) {
    return (
        void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), 'rgba(' + t[0] + ', ' + t[1] + ', ' + t[2] + ', ' + e + ')'
    );
}
function N(t, e) {
    return (
        'rgba(' +
        Math.round((t[0] / 255) * 100) +
        '%, ' +
        Math.round((t[1] / 255) * 100) +
        '%, ' +
        Math.round((t[2] / 255) * 100) +
        '%, ' +
        (e || t[3] || 1) +
        ')'
    );
}
function j(t, e) {
    return (
        void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), 'hsla(' + t[0] + ', ' + t[1] + '%, ' + t[2] + '%, ' + e + ')'
    );
}
function C(t, e, r) {
    return Math.min(Math.max(e, t), r);
}
function O(t) {
    var e = t.toString(16).toUpperCase();
    return e.length < 2 ? '0' + e : e;
}
var E = {};
for (var V in M) E[M[V]] = V;
var F = n.exports,
    P = w,
    R = k,
    I = function (t) {
        if (t instanceof I) return t;
        if (!(this instanceof I)) return new I(t);
        var e;
        if (
            ((this.values = {
                rgb: [0, 0, 0],
                hsl: [0, 0, 0],
                hsv: [0, 0, 0],
                hwb: [0, 0, 0],
                cmyk: [0, 0, 0, 0],
                alpha: 1,
            }),
            'string' == typeof t)
        )
            if ((e = R.getRgba(t))) this.setValues('rgb', e);
            else if ((e = R.getHsla(t))) this.setValues('hsl', e);
            else {
                if (!(e = R.getHwb(t))) throw new Error('Unable to parse color from string "' + t + '"');
                this.setValues('hwb', e);
            }
        else if ('object' == typeof t)
            if (void 0 !== (e = t).r || void 0 !== e.red) this.setValues('rgb', e);
            else if (void 0 !== e.l || void 0 !== e.lightness) this.setValues('hsl', e);
            else if (void 0 !== e.v || void 0 !== e.value) this.setValues('hsv', e);
            else if (void 0 !== e.w || void 0 !== e.whiteness) this.setValues('hwb', e);
            else {
                if (void 0 === e.c && void 0 === e.cyan)
                    throw new Error('Unable to parse color from object ' + JSON.stringify(t));
                this.setValues('cmyk', e);
            }
    };
(I.prototype = {
    rgb: function () {
        return this.setSpace('rgb', arguments);
    },
    hsl: function () {
        return this.setSpace('hsl', arguments);
    },
    hsv: function () {
        return this.setSpace('hsv', arguments);
    },
    hwb: function () {
        return this.setSpace('hwb', arguments);
    },
    cmyk: function () {
        return this.setSpace('cmyk', arguments);
    },
    rgbArray: function () {
        return this.values.rgb;
    },
    hslArray: function () {
        return this.values.hsl;
    },
    hsvArray: function () {
        return this.values.hsv;
    },
    hwbArray: function () {
        return 1 !== this.values.alpha ? this.values.hwb.concat([this.values.alpha]) : this.values.hwb;
    },
    cmykArray: function () {
        return this.values.cmyk;
    },
    rgbaArray: function () {
        return this.values.rgb.concat([this.values.alpha]);
    },
    rgbaArrayNormalized: function () {
        for (var t = this.values.rgb, e = [], r = 0; r < 3; r++) e[r] = t[r] / 255;
        return e.push(this.values.alpha), e;
    },
    hslaArray: function () {
        return this.values.hsl.concat([this.values.alpha]);
    },
    alpha: function (t) {
        return void 0 === t ? this.values.alpha : (this.setValues('alpha', t), this);
    },
    red: function (t) {
        return this.setChannel('rgb', 0, t);
    },
    green: function (t) {
        return this.setChannel('rgb', 1, t);
    },
    blue: function (t) {
        return this.setChannel('rgb', 2, t);
    },
    hue: function (t) {
        return t && (t = (t %= 360) < 0 ? 360 + t : t), this.setChannel('hsl', 0, t);
    },
    saturation: function (t) {
        return this.setChannel('hsl', 1, t);
    },
    lightness: function (t) {
        return this.setChannel('hsl', 2, t);
    },
    saturationv: function (t) {
        return this.setChannel('hsv', 1, t);
    },
    whiteness: function (t) {
        return this.setChannel('hwb', 1, t);
    },
    blackness: function (t) {
        return this.setChannel('hwb', 2, t);
    },
    value: function (t) {
        return this.setChannel('hsv', 2, t);
    },
    cyan: function (t) {
        return this.setChannel('cmyk', 0, t);
    },
    magenta: function (t) {
        return this.setChannel('cmyk', 1, t);
    },
    yellow: function (t) {
        return this.setChannel('cmyk', 2, t);
    },
    black: function (t) {
        return this.setChannel('cmyk', 3, t);
    },
    hexString: function () {
        return R.hexString(this.values.rgb);
    },
    rgbString: function () {
        return R.rgbString(this.values.rgb, this.values.alpha);
    },
    rgbaString: function () {
        return R.rgbaString(this.values.rgb, this.values.alpha);
    },
    percentString: function () {
        return R.percentString(this.values.rgb, this.values.alpha);
    },
    hslString: function () {
        return R.hslString(this.values.hsl, this.values.alpha);
    },
    hslaString: function () {
        return R.hslaString(this.values.hsl, this.values.alpha);
    },
    hwbString: function () {
        return R.hwbString(this.values.hwb, this.values.alpha);
    },
    keyword: function () {
        return R.keyword(this.values.rgb, this.values.alpha);
    },
    rgbNumber: function () {
        return (this.values.rgb[0] << 16) | (this.values.rgb[1] << 8) | this.values.rgb[2];
    },
    luminosity: function () {
        for (var t = this.values.rgb, e = [], r = 0; r < t.length; r++) {
            var n = t[r] / 255;
            e[r] = n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
    },
    contrast: function (t) {
        var e = this.luminosity(),
            r = t.luminosity();
        return e > r ? (e + 0.05) / (r + 0.05) : (r + 0.05) / (e + 0.05);
    },
    level: function (t) {
        var e = this.contrast(t);
        return e >= 7.1 ? 'AAA' : e >= 4.5 ? 'AA' : '';
    },
    dark: function () {
        var t = this.values.rgb;
        return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128;
    },
    light: function () {
        return !this.dark();
    },
    negate: function () {
        for (var t = [], e = 0; e < 3; e++) t[e] = 255 - this.values.rgb[e];
        return this.setValues('rgb', t), this;
    },
    lighten: function (t) {
        return (this.values.hsl[2] += this.values.hsl[2] * t), this.setValues('hsl', this.values.hsl), this;
    },
    darken: function (t) {
        return (this.values.hsl[2] -= this.values.hsl[2] * t), this.setValues('hsl', this.values.hsl), this;
    },
    saturate: function (t) {
        return (this.values.hsl[1] += this.values.hsl[1] * t), this.setValues('hsl', this.values.hsl), this;
    },
    desaturate: function (t) {
        return (this.values.hsl[1] -= this.values.hsl[1] * t), this.setValues('hsl', this.values.hsl), this;
    },
    whiten: function (t) {
        return (this.values.hwb[1] += this.values.hwb[1] * t), this.setValues('hwb', this.values.hwb), this;
    },
    blacken: function (t) {
        return (this.values.hwb[2] += this.values.hwb[2] * t), this.setValues('hwb', this.values.hwb), this;
    },
    greyscale: function () {
        var t = this.values.rgb,
            e = 0.3 * t[0] + 0.59 * t[1] + 0.11 * t[2];
        return this.setValues('rgb', [e, e, e]), this;
    },
    clearer: function (t) {
        return this.setValues('alpha', this.values.alpha - this.values.alpha * t), this;
    },
    opaquer: function (t) {
        return this.setValues('alpha', this.values.alpha + this.values.alpha * t), this;
    },
    rotate: function (t) {
        var e = this.values.hsl[0];
        return (
            (e = (e = (e + t) % 360) < 0 ? 360 + e : e),
            (this.values.hsl[0] = e),
            this.setValues('hsl', this.values.hsl),
            this
        );
    },
    mix: function (t, e) {
        var r = this,
            n = t,
            a = void 0 === e ? 0.5 : e,
            s = 2 * a - 1,
            i = r.alpha() - n.alpha(),
            h = ((s * i == -1 ? s : (s + i) / (1 + s * i)) + 1) / 2,
            l = 1 - h;
        return this.rgb(h * r.red() + l * n.red(), h * r.green() + l * n.green(), h * r.blue() + l * n.blue()).alpha(
            r.alpha() * a + n.alpha() * (1 - a)
        );
    },
    toJSON: function () {
        return this.rgb();
    },
    clone: function () {
        var t = new I();
        return (t.values = F(this.values)), t;
    },
}),
    (I.prototype.getValues = function (t) {
        for (var e = {}, r = 0; r < t.length; r++) e[t.charAt(r)] = this.values[t][r];
        return 1 !== this.values.alpha && (e.a = this.values.alpha), e;
    }),
    (I.prototype.setValues = function (t, e) {
        var r,
            n,
            a = {
                rgb: ['red', 'green', 'blue'],
                hsl: ['hue', 'saturation', 'lightness'],
                hsv: ['hue', 'saturation', 'value'],
                hwb: ['hue', 'whiteness', 'blackness'],
                cmyk: ['cyan', 'magenta', 'yellow', 'black'],
            },
            s = {
                rgb: [255, 255, 255],
                hsl: [360, 100, 100],
                hsv: [360, 100, 100],
                hwb: [360, 100, 100],
                cmyk: [100, 100, 100, 100],
            },
            i = 1;
        if ('alpha' === t) i = e;
        else if (e.length) (this.values[t] = e.slice(0, t.length)), (i = e[t.length]);
        else if (void 0 !== e[t.charAt(0)]) {
            for (r = 0; r < t.length; r++) this.values[t][r] = e[t.charAt(r)];
            i = e.a;
        } else if (void 0 !== e[a[t][0]]) {
            var h = a[t];
            for (r = 0; r < t.length; r++) this.values[t][r] = e[h[r]];
            i = e.alpha;
        }
        if (((this.values.alpha = Math.max(0, Math.min(1, void 0 === i ? this.values.alpha : i))), 'alpha' === t))
            return !1;
        for (r = 0; r < t.length; r++)
            (n = Math.max(0, Math.min(s[t][r], this.values[t][r]))), (this.values[t][r] = Math.round(n));
        for (var l in a)
            for (l !== t && (this.values[l] = P[t][l](this.values[t])), r = 0; r < l.length; r++)
                (n = Math.max(0, Math.min(s[l][r], this.values[l][r]))), (this.values[l][r] = Math.round(n));
        return !0;
    }),
    (I.prototype.setSpace = function (t, e) {
        var r = e[0];
        return void 0 === r
            ? this.getValues(t)
            : ('number' == typeof r && (r = Array.prototype.slice.call(e)), this.setValues(t, r), this);
    }),
    (I.prototype.setChannel = function (t, e, r) {
        return void 0 === r
            ? this.values[t][e]
            : (r === this.values[t][e] || ((this.values[t][e] = r), this.setValues(t, this.values[t])), this);
    });
var q,
    U = e,
    z = r,
    D = I,
    K = ['#01888C', '#FC7500', '#034F5D', '#F73F01', '#FC1960', '#C7144C', '#F3C100', '#1598F2', '#2465E1', '#F19E02'],
    B = 'http://www.w3.org/2000/svg',
    H = function (t, e) {
        q = new U(e);
        var r = (function (t, e) {
                var r = 30 * e.random() - 15;
                return t.map(function (t) {
                    var e = D(t);
                    return e.rotate(r), e.hexString();
                });
            })(K.slice(), q),
            n = z(t, L(r)).container,
            a = document.createElementNS(B, 'svg');
        a.setAttributeNS(null, 'x', '0'),
            a.setAttributeNS(null, 'y', '0'),
            a.setAttributeNS(null, 'width', t),
            a.setAttributeNS(null, 'height', t),
            n.appendChild(a);
        for (var s = 0; s < 3; s++) T(r, t, s, 3, a);
        return n;
    };
function T(t, e, r, n, a) {
    var s = e / 2,
        i = document.createElementNS(B, 'rect');
    i.setAttributeNS(null, 'x', '0'),
        i.setAttributeNS(null, 'y', '0'),
        i.setAttributeNS(null, 'width', e),
        i.setAttributeNS(null, 'height', e);
    var h = q.random(),
        l = 2 * Math.PI * h,
        u = (e / n) * q.random() + (r * e) / n,
        o =
            'translate(' +
            Math.cos(l) * u +
            ' ' +
            Math.sin(l) * u +
            ')' +
            ' ' +
            ('rotate(' + (360 * h + 180 * q.random()).toFixed(1) + ' ' + s + ' ' + s + ')');
    i.setAttributeNS(null, 'transform', o);
    var c = L(t);
    i.setAttributeNS(null, 'fill', c), a.appendChild(i);
}
function L(t) {
    q.random();
    var e = Math.floor(t.length * q.random());
    return t.splice(e, 1)[0];
}
export { H as default };
