var waxjs = (function (e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var i = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
  }
  return (
    (r.m = e),
    (r.c = t),
    (r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function (e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          r.d(
            n,
            i,
            function (t) {
              return e[t];
            }.bind(null, i)
          );
      return n;
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ""),
    r((r.s = 9))
  );
})([
  function (e, t, r) {
    "use strict";
    var n = r(1),
      i = r(14);
    function a(e, t) {
      return (
        55296 == (64512 & e.charCodeAt(t)) &&
        !(t < 0 || t + 1 >= e.length) &&
        56320 == (64512 & e.charCodeAt(t + 1))
      );
    }
    function s(e) {
      return (
        ((e >>> 24) |
          ((e >>> 8) & 65280) |
          ((e << 8) & 16711680) |
          ((255 & e) << 24)) >>>
        0
      );
    }
    function o(e) {
      return 1 === e.length ? "0" + e : e;
    }
    function u(e) {
      return 7 === e.length
        ? "0" + e
        : 6 === e.length
        ? "00" + e
        : 5 === e.length
        ? "000" + e
        : 4 === e.length
        ? "0000" + e
        : 3 === e.length
        ? "00000" + e
        : 2 === e.length
        ? "000000" + e
        : 1 === e.length
        ? "0000000" + e
        : e;
    }
    (t.inherits = i),
      (t.toArray = function (e, t) {
        if (Array.isArray(e)) return e.slice();
        if (!e) return [];
        var r = [];
        if ("string" == typeof e)
          if (t) {
            if ("hex" === t)
              for (
                (e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 &&
                  (e = "0" + e),
                  i = 0;
                i < e.length;
                i += 2
              )
                r.push(parseInt(e[i] + e[i + 1], 16));
          } else
            for (var n = 0, i = 0; i < e.length; i++) {
              var s = e.charCodeAt(i);
              s < 128
                ? (r[n++] = s)
                : s < 2048
                ? ((r[n++] = (s >> 6) | 192), (r[n++] = (63 & s) | 128))
                : a(e, i)
                ? ((s =
                    65536 + ((1023 & s) << 10) + (1023 & e.charCodeAt(++i))),
                  (r[n++] = (s >> 18) | 240),
                  (r[n++] = ((s >> 12) & 63) | 128),
                  (r[n++] = ((s >> 6) & 63) | 128),
                  (r[n++] = (63 & s) | 128))
                : ((r[n++] = (s >> 12) | 224),
                  (r[n++] = ((s >> 6) & 63) | 128),
                  (r[n++] = (63 & s) | 128));
            }
        else for (i = 0; i < e.length; i++) r[i] = 0 | e[i];
        return r;
      }),
      (t.toHex = function (e) {
        for (var t = "", r = 0; r < e.length; r++) t += o(e[r].toString(16));
        return t;
      }),
      (t.htonl = s),
      (t.toHex32 = function (e, t) {
        for (var r = "", n = 0; n < e.length; n++) {
          var i = e[n];
          "little" === t && (i = s(i)), (r += u(i.toString(16)));
        }
        return r;
      }),
      (t.zero2 = o),
      (t.zero8 = u),
      (t.join32 = function (e, t, r, i) {
        var a = r - t;
        n(a % 4 == 0);
        for (
          var s = new Array(a / 4), o = 0, u = t;
          o < s.length;
          o++, u += 4
        ) {
          var c;
          (c =
            "big" === i
              ? (e[u] << 24) | (e[u + 1] << 16) | (e[u + 2] << 8) | e[u + 3]
              : (e[u + 3] << 24) | (e[u + 2] << 16) | (e[u + 1] << 8) | e[u]),
            (s[o] = c >>> 0);
        }
        return s;
      }),
      (t.split32 = function (e, t) {
        for (
          var r = new Array(4 * e.length), n = 0, i = 0;
          n < e.length;
          n++, i += 4
        ) {
          var a = e[n];
          "big" === t
            ? ((r[i] = a >>> 24),
              (r[i + 1] = (a >>> 16) & 255),
              (r[i + 2] = (a >>> 8) & 255),
              (r[i + 3] = 255 & a))
            : ((r[i + 3] = a >>> 24),
              (r[i + 2] = (a >>> 16) & 255),
              (r[i + 1] = (a >>> 8) & 255),
              (r[i] = 255 & a));
        }
        return r;
      }),
      (t.rotr32 = function (e, t) {
        return (e >>> t) | (e << (32 - t));
      }),
      (t.rotl32 = function (e, t) {
        return (e << t) | (e >>> (32 - t));
      }),
      (t.sum32 = function (e, t) {
        return (e + t) >>> 0;
      }),
      (t.sum32_3 = function (e, t, r) {
        return (e + t + r) >>> 0;
      }),
      (t.sum32_4 = function (e, t, r, n) {
        return (e + t + r + n) >>> 0;
      }),
      (t.sum32_5 = function (e, t, r, n, i) {
        return (e + t + r + n + i) >>> 0;
      }),
      (t.sum64 = function (e, t, r, n) {
        var i = e[t],
          a = (n + e[t + 1]) >>> 0,
          s = (a < n ? 1 : 0) + r + i;
        (e[t] = s >>> 0), (e[t + 1] = a);
      }),
      (t.sum64_hi = function (e, t, r, n) {
        return (((t + n) >>> 0 < t ? 1 : 0) + e + r) >>> 0;
      }),
      (t.sum64_lo = function (e, t, r, n) {
        return (t + n) >>> 0;
      }),
      (t.sum64_4_hi = function (e, t, r, n, i, a, s, o) {
        var u = 0,
          c = t;
        return (
          (u += (c = (c + n) >>> 0) < t ? 1 : 0),
          (u += (c = (c + a) >>> 0) < a ? 1 : 0),
          (e + r + i + s + (u += (c = (c + o) >>> 0) < o ? 1 : 0)) >>> 0
        );
      }),
      (t.sum64_4_lo = function (e, t, r, n, i, a, s, o) {
        return (t + n + a + o) >>> 0;
      }),
      (t.sum64_5_hi = function (e, t, r, n, i, a, s, o, u, c) {
        var l = 0,
          h = t;
        return (
          (l += (h = (h + n) >>> 0) < t ? 1 : 0),
          (l += (h = (h + a) >>> 0) < a ? 1 : 0),
          (l += (h = (h + o) >>> 0) < o ? 1 : 0),
          (e + r + i + s + u + (l += (h = (h + c) >>> 0) < c ? 1 : 0)) >>> 0
        );
      }),
      (t.sum64_5_lo = function (e, t, r, n, i, a, s, o, u, c) {
        return (t + n + a + o + c) >>> 0;
      }),
      (t.rotr64_hi = function (e, t, r) {
        return ((t << (32 - r)) | (e >>> r)) >>> 0;
      }),
      (t.rotr64_lo = function (e, t, r) {
        return ((e << (32 - r)) | (t >>> r)) >>> 0;
      }),
      (t.shr64_hi = function (e, t, r) {
        return e >>> r;
      }),
      (t.shr64_lo = function (e, t, r) {
        return ((e << (32 - r)) | (t >>> r)) >>> 0;
      });
  },
  function (e, t) {
    function r(e, t) {
      if (!e) throw new Error(t || "Assertion failed");
    }
    (e.exports = r),
      (r.equal = function (e, t, r) {
        if (e != t) throw new Error(r || "Assertion failed: " + e + " != " + t);
      });
  },
  function (e, t, r) {
    "use strict";
    var n = r(0),
      i = r(1);
    function a() {
      (this.pending = null),
        (this.pendingTotal = 0),
        (this.blockSize = this.constructor.blockSize),
        (this.outSize = this.constructor.outSize),
        (this.hmacStrength = this.constructor.hmacStrength),
        (this.padLength = this.constructor.padLength / 8),
        (this.endian = "big"),
        (this._delta8 = this.blockSize / 8),
        (this._delta32 = this.blockSize / 32);
    }
    (t.BlockHash = a),
      (a.prototype.update = function (e, t) {
        if (
          ((e = n.toArray(e, t)),
          this.pending
            ? (this.pending = this.pending.concat(e))
            : (this.pending = e),
          (this.pendingTotal += e.length),
          this.pending.length >= this._delta8)
        ) {
          var r = (e = this.pending).length % this._delta8;
          (this.pending = e.slice(e.length - r, e.length)),
            0 === this.pending.length && (this.pending = null),
            (e = n.join32(e, 0, e.length - r, this.endian));
          for (var i = 0; i < e.length; i += this._delta32)
            this._update(e, i, i + this._delta32);
        }
        return this;
      }),
      (a.prototype.digest = function (e) {
        return (
          this.update(this._pad()), i(null === this.pending), this._digest(e)
        );
      }),
      (a.prototype._pad = function () {
        var e = this.pendingTotal,
          t = this._delta8,
          r = t - ((e + this.padLength) % t),
          n = new Array(r + this.padLength);
        n[0] = 128;
        for (var i = 1; i < r; i++) n[i] = 0;
        if (((e <<= 3), "big" === this.endian)) {
          for (var a = 8; a < this.padLength; a++) n[i++] = 0;
          (n[i++] = 0),
            (n[i++] = 0),
            (n[i++] = 0),
            (n[i++] = 0),
            (n[i++] = (e >>> 24) & 255),
            (n[i++] = (e >>> 16) & 255),
            (n[i++] = (e >>> 8) & 255),
            (n[i++] = 255 & e);
        } else
          for (
            n[i++] = 255 & e,
              n[i++] = (e >>> 8) & 255,
              n[i++] = (e >>> 16) & 255,
              n[i++] = (e >>> 24) & 255,
              n[i++] = 0,
              n[i++] = 0,
              n[i++] = 0,
              n[i++] = 0,
              a = 8;
            a < this.padLength;
            a++
          )
            n[i++] = 0;
        return n;
      });
  },
  function (e, t, r) {
    "use strict";
    var n =
        (this && this.__read) ||
        function (e, t) {
          var r = "function" == typeof Symbol && e[Symbol.iterator];
          if (!r) return e;
          var n,
            i,
            a = r.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(n = a.next()).done; )
              s.push(n.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              n && !n.done && (r = a.return) && r.call(a);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
      i =
        (this && this.__spreadArray) ||
        function (e, t) {
          for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
            e[i] = t[r];
          return e;
        },
      a =
        (this && this.__values) ||
        function (e) {
          var t = "function" == typeof Symbol && Symbol.iterator,
            r = t && e[t],
            n = 0;
          if (r) return r.call(e);
          if (e && "number" == typeof e.length)
            return {
              next: function () {
                return (
                  e && n >= e.length && (e = void 0),
                  { value: e && e[n++], done: !e }
                );
              },
            };
          throw new TypeError(
            t ? "Object is not iterable." : "Symbol.iterator is not defined."
          );
        };
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.signatureToString =
        t.stringToSignature =
        t.privateKeyToString =
        t.privateKeyToLegacyString =
        t.stringToPrivateKey =
        t.convertLegacyPublicKeys =
        t.convertLegacyPublicKey =
        t.publicKeyToString =
        t.publicKeyToLegacyString =
        t.stringToPublicKey =
        t.signatureDataSize =
        t.privateKeyDataSize =
        t.publicKeyDataSize =
        t.KeyType =
        t.base64ToBinary =
        t.binaryToBase58 =
        t.base58ToBinary =
        t.signedBinaryToDecimal =
        t.binaryToDecimal =
        t.signedDecimalToBinary =
        t.decimalToBinary =
        t.negate =
        t.isNegative =
          void 0);
    var s = r(13),
      o = r(21).RIPEMD160.hash,
      u = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
      c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      l = (function () {
        for (var e = Array(256).fill(-1), t = 0; t < u.length; ++t)
          e[u.charCodeAt(t)] = t;
        return e;
      })(),
      h = (function () {
        for (var e = Array(256).fill(-1), t = 0; t < c.length; ++t)
          e[c.charCodeAt(t)] = t;
        return (e["=".charCodeAt(0)] = 0), e;
      })();
    t.isNegative = function (e) {
      return 0 != (128 & e[e.length - 1]);
    };
    t.negate = function (e) {
      for (var t = 1, r = 0; r < e.length; ++r) {
        var n = (255 & ~e[r]) + t;
        (e[r] = n), (t = n >> 8);
      }
    };
    t.decimalToBinary = function (e, t) {
      for (var r = new Uint8Array(e), n = 0; n < t.length; ++n) {
        var i = t.charCodeAt(n);
        if (i < "0".charCodeAt(0) || i > "9".charCodeAt(0))
          throw new Error("invalid number");
        for (var a = i - "0".charCodeAt(0), s = 0; s < e; ++s) {
          var o = 10 * r[s] + a;
          (r[s] = o), (a = o >> 8);
        }
        if (a) throw new Error("number is out of range");
      }
      return r;
    };
    t.signedDecimalToBinary = function (e, r) {
      var n = "-" === r[0];
      n && (r = r.substr(1));
      var i = t.decimalToBinary(e, r);
      if (n) {
        if ((t.negate(i), !t.isNegative(i)))
          throw new Error("number is out of range");
      } else if (t.isNegative(i)) throw new Error("number is out of range");
      return i;
    };
    t.binaryToDecimal = function (e, t) {
      void 0 === t && (t = 1);
      for (
        var r = Array(t).fill("0".charCodeAt(0)), a = e.length - 1;
        a >= 0;
        --a
      ) {
        for (var s = e[a], o = 0; o < r.length; ++o) {
          var u = ((r[o] - "0".charCodeAt(0)) << 8) + s;
          (r[o] = "0".charCodeAt(0) + (u % 10)), (s = (u / 10) | 0);
        }
        for (; s; ) r.push("0".charCodeAt(0) + (s % 10)), (s = (s / 10) | 0);
      }
      return r.reverse(), String.fromCharCode.apply(String, i([], n(r)));
    };
    t.signedBinaryToDecimal = function (e, r) {
      if ((void 0 === r && (r = 1), t.isNegative(e))) {
        var n = e.slice();
        return t.negate(n), "-" + t.binaryToDecimal(n, r);
      }
      return t.binaryToDecimal(e, r);
    };
    t.base58ToBinary = function (e, t) {
      if (!e)
        return (function (e) {
          for (var t, r, n = [], i = 0; i < e.length; ++i) {
            var s = l[e.charCodeAt(i)];
            if (s < 0) throw new Error("invalid base-58 value");
            for (var o = 0; o < n.length; ++o) {
              var u = 58 * n[o] + s;
              (n[o] = 255 & u), (s = u >> 8);
            }
            s && n.push(s);
          }
          try {
            for (var c = a(e), h = c.next(); !h.done; h = c.next()) {
              if ("1" !== h.value) break;
              n.push(0);
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              h && !h.done && (r = c.return) && r.call(c);
            } finally {
              if (t) throw t.error;
            }
          }
          return n.reverse(), new Uint8Array(n);
        })(t);
      for (var r = new Uint8Array(e), n = 0; n < t.length; ++n) {
        var i = l[t.charCodeAt(n)];
        if (i < 0) throw new Error("invalid base-58 value");
        for (var s = 0; s < e; ++s) {
          var o = 58 * r[s] + i;
          (r[s] = o), (i = o >> 8);
        }
        if (i) throw new Error("base-58 value is out of range");
      }
      return r.reverse(), r;
    };
    t.binaryToBase58 = function (e, t) {
      var r, s, o, c;
      void 0 === t && (t = 1);
      var h = [];
      try {
        for (var d = a(e), f = d.next(); !f.done; f = d.next()) {
          for (var p = f.value, y = 0; y < h.length; ++y) {
            var _ = (l[h[y]] << 8) + p;
            (h[y] = u.charCodeAt(_ % 58)), (p = (_ / 58) | 0);
          }
          for (; p; ) h.push(u.charCodeAt(p % 58)), (p = (p / 58) | 0);
        }
      } catch (e) {
        r = { error: e };
      } finally {
        try {
          f && !f.done && (s = d.return) && s.call(d);
        } finally {
          if (r) throw r.error;
        }
      }
      try {
        for (var g = a(e), v = g.next(); !v.done; v = g.next()) {
          if (v.value) break;
          h.push("1".charCodeAt(0));
        }
      } catch (e) {
        o = { error: e };
      } finally {
        try {
          v && !v.done && (c = g.return) && c.call(g);
        } finally {
          if (o) throw o.error;
        }
      }
      return h.reverse(), String.fromCharCode.apply(String, i([], n(h)));
    };
    var d;
    (t.base64ToBinary = function (e) {
      var t = e.length;
      if ((1 == (3 & t) && "=" === e[t - 1] && (t -= 1), 0 != (3 & t)))
        throw new Error("base-64 value is not padded correctly");
      var r = t >> 2,
        n = 3 * r;
      t > 0 && "=" === e[t - 1] && ("=" === e[t - 2] ? (n -= 2) : (n -= 1));
      for (var i = new Uint8Array(n), a = 0; a < r; ++a) {
        var s = h[e.charCodeAt(4 * a + 0)],
          o = h[e.charCodeAt(4 * a + 1)],
          u = h[e.charCodeAt(4 * a + 2)],
          c = h[e.charCodeAt(4 * a + 3)];
        (i[3 * a + 0] = (s << 2) | (o >> 4)),
          3 * a + 1 < n && (i[3 * a + 1] = ((15 & o) << 4) | (u >> 2)),
          3 * a + 2 < n && (i[3 * a + 2] = ((3 & u) << 6) | c);
      }
      return i;
    }),
      (function (e) {
        (e[(e.k1 = 0)] = "k1"), (e[(e.r1 = 1)] = "r1"), (e[(e.wa = 2)] = "wa");
      })((d = t.KeyType || (t.KeyType = {}))),
      (t.publicKeyDataSize = 33),
      (t.privateKeyDataSize = 32),
      (t.signatureDataSize = 65);
    var f = function (e, t) {
        for (
          var r = new Uint8Array(e.length + t.length), n = 0;
          n < e.length;
          ++n
        )
          r[n] = e[n];
        for (n = 0; n < t.length; ++n) r[e.length + n] = t.charCodeAt(n);
        return o(r);
      },
      p = function (e, r, n, i) {
        var a = t.base58ToBinary(n ? n + 4 : 0, e),
          s = { type: r, data: new Uint8Array(a.buffer, 0, a.length - 4) },
          o = new Uint8Array(f(s.data, i));
        if (
          o[0] !== a[a.length - 4] ||
          o[1] !== a[a.length - 3] ||
          o[2] !== a[a.length - 2] ||
          o[3] !== a[a.length - 1]
        )
          throw new Error("checksum doesn't match");
        return s;
      },
      y = function (e, r, n) {
        for (
          var i = new Uint8Array(f(e.data, r)),
            a = new Uint8Array(e.data.length + 4),
            s = 0;
          s < e.data.length;
          ++s
        )
          a[s] = e.data[s];
        for (s = 0; s < 4; ++s) a[s + e.data.length] = i[s];
        return n + t.binaryToBase58(a);
      };
    t.stringToPublicKey = function (e) {
      if ("string" != typeof e)
        throw new Error("expected string containing public key");
      if ("EOS" === e.substr(0, 3)) {
        for (
          var r = t.base58ToBinary(t.publicKeyDataSize + 4, e.substr(3)),
            n = { type: d.k1, data: new Uint8Array(t.publicKeyDataSize) },
            i = 0;
          i < t.publicKeyDataSize;
          ++i
        )
          n.data[i] = r[i];
        var a = new Uint8Array(o(n.data));
        if (
          a[0] !== r[t.publicKeyDataSize] ||
          a[1] !== r[34] ||
          a[2] !== r[35] ||
          a[3] !== r[36]
        )
          throw new Error("checksum doesn't match");
        return n;
      }
      if ("PUB_K1_" === e.substr(0, 7))
        return p(e.substr(7), d.k1, t.publicKeyDataSize, "K1");
      if ("PUB_R1_" === e.substr(0, 7))
        return p(e.substr(7), d.r1, t.publicKeyDataSize, "R1");
      if ("PUB_WA_" === e.substr(0, 7)) return p(e.substr(7), d.wa, 0, "WA");
      throw new Error("unrecognized public key format");
    };
    t.publicKeyToLegacyString = function (e) {
      if (e.type === d.k1 && e.data.length === t.publicKeyDataSize)
        return y(e, "", "EOS");
      throw e.type === d.r1 || e.type === d.wa
        ? new Error("Key format not supported in legacy conversion")
        : new Error("unrecognized public key format");
    };
    t.publicKeyToString = function (e) {
      if (e.type === d.k1 && e.data.length === t.publicKeyDataSize)
        return y(e, "K1", "PUB_K1_");
      if (e.type === d.r1 && e.data.length === t.publicKeyDataSize)
        return y(e, "R1", "PUB_R1_");
      if (e.type === d.wa) return y(e, "WA", "PUB_WA_");
      throw new Error("unrecognized public key format");
    };
    t.convertLegacyPublicKey = function (e) {
      return "EOS" === e.substr(0, 3)
        ? t.publicKeyToString(t.stringToPublicKey(e))
        : e;
    };
    t.convertLegacyPublicKeys = function (e) {
      return e.map(t.convertLegacyPublicKey);
    };
    t.stringToPrivateKey = function (e) {
      if ("string" != typeof e)
        throw new Error("expected string containing private key");
      if ("PVT_R1_" === e.substr(0, 7))
        return p(e.substr(7), d.r1, t.privateKeyDataSize, "R1");
      if ("PVT_K1_" === e.substr(0, 7))
        return p(e.substr(7), d.k1, t.privateKeyDataSize, "K1");
      var r = t.base58ToBinary(t.privateKeyDataSize + 5, e),
        n = { type: d.k1, data: new Uint8Array(t.privateKeyDataSize) };
      if (128 !== r[0]) throw new Error("unrecognized private key type");
      for (var i = 0; i < t.privateKeyDataSize; ++i) n.data[i] = r[i + 1];
      return n;
    };
    t.privateKeyToLegacyString = function (e) {
      if (e.type === d.k1 && e.data.length === t.privateKeyDataSize) {
        var r = [];
        r.push(128),
          e.data.forEach(function (e) {
            return r.push(e);
          });
        for (
          var n = new Uint8Array(
              s.sha256().update(s.sha256().update(r).digest()).digest()
            ),
            i = new Uint8Array(t.privateKeyDataSize + 5),
            a = 0;
          a < r.length;
          a++
        )
          i[a] = r[a];
        for (a = 0; a < 4; a++) i[a + r.length] = n[a];
        return t.binaryToBase58(i);
      }
      throw e.type === d.r1 || e.type === d.wa
        ? new Error("Key format not supported in legacy conversion")
        : new Error("unrecognized public key format");
    };
    t.privateKeyToString = function (e) {
      if (e.type === d.r1) return y(e, "R1", "PVT_R1_");
      if (e.type === d.k1) return y(e, "K1", "PVT_K1_");
      throw new Error("unrecognized private key format");
    };
    t.stringToSignature = function (e) {
      if ("string" != typeof e)
        throw new Error("expected string containing signature");
      if ("SIG_K1_" === e.substr(0, 7))
        return p(e.substr(7), d.k1, t.signatureDataSize, "K1");
      if ("SIG_R1_" === e.substr(0, 7))
        return p(e.substr(7), d.r1, t.signatureDataSize, "R1");
      if ("SIG_WA_" === e.substr(0, 7)) return p(e.substr(7), d.wa, 0, "WA");
      throw new Error("unrecognized signature format");
    };
    t.signatureToString = function (e) {
      if (e.type === d.k1) return y(e, "K1", "SIG_K1_");
      if (e.type === d.r1) return y(e, "R1", "SIG_R1_");
      if (e.type === d.wa) return y(e, "WA", "SIG_WA_");
      throw new Error("unrecognized signature format");
    };
  },
  function (e, t, r) {
    "use strict";
    var n =
        (this && this.__assign) ||
        function () {
          return (n =
            Object.assign ||
            function (e) {
              for (var t, r = 1, n = arguments.length; r < n; r++)
                for (var i in (t = arguments[r]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        },
      i =
        (this && this.__read) ||
        function (e, t) {
          var r = "function" == typeof Symbol && e[Symbol.iterator];
          if (!r) return e;
          var n,
            i,
            a = r.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(n = a.next()).done; )
              s.push(n.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              n && !n.done && (r = a.return) && r.call(a);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
      a =
        (this && this.__spreadArray) ||
        function (e, t) {
          for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
            e[i] = t[r];
          return e;
        },
      s =
        (this && this.__values) ||
        function (e) {
          var t = "function" == typeof Symbol && Symbol.iterator,
            r = t && e[t],
            n = 0;
          if (r) return r.call(e);
          if (e && "number" == typeof e.length)
            return {
              next: function () {
                return (
                  e && n >= e.length && (e = void 0),
                  { value: e && e[n++], done: !e }
                );
              },
            };
          throw new TypeError(
            t ? "Object is not iterable." : "Symbol.iterator is not defined."
          );
        };
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.serializeQuery =
        t.deserializeAnyArray =
        t.serializeAnyArray =
        t.deserializeAnyObject =
        t.serializeAnyObject =
        t.deserializeAnyvarShort =
        t.deserializeAnyvar =
        t.serializeAnyvar =
        t.deserializeAction =
        t.deserializeActionData =
        t.serializeAction =
        t.serializeActionData =
        t.transactionHeader =
        t.getTypesFromAbi =
        t.getType =
        t.createTransactionTypes =
        t.createTransactionExtensionTypes =
        t.createAbiTypes =
        t.createInitialTypes =
        t.hexToUint8Array =
        t.arrayToHex =
        t.symbolToString =
        t.stringToSymbol =
        t.blockTimestampToDate =
        t.dateToBlockTimestamp =
        t.timePointSecToDate =
        t.dateToTimePointSec =
        t.timePointToDate =
        t.dateToTimePoint =
        t.supportedAbiVersion =
        t.SerialBuffer =
        t.SerializerState =
          void 0);
    var o = r(3),
      u = function (e) {
        void 0 === e && (e = {}),
          (this.skippedBinaryExtension = !1),
          (this.options = e);
      };
    t.SerializerState = u;
    var c = (function () {
      function e(e) {
        var t = void 0 === e ? {} : e,
          r = t.textEncoder,
          n = t.textDecoder,
          i = t.array;
        (this.readPos = 0),
          (this.array = i || new Uint8Array(1024)),
          (this.length = i ? i.length : 0),
          (this.textEncoder = r || new TextEncoder()),
          (this.textDecoder = n || new TextDecoder("utf-8", { fatal: !0 }));
      }
      return (
        (e.prototype.reserve = function (e) {
          if (!(this.length + e <= this.array.length)) {
            for (var t = this.array.length; this.length + e > t; )
              t = Math.ceil(1.5 * t);
            var r = new Uint8Array(t);
            r.set(this.array), (this.array = r);
          }
        }),
        (e.prototype.haveReadData = function () {
          return this.readPos < this.length;
        }),
        (e.prototype.restartRead = function () {
          this.readPos = 0;
        }),
        (e.prototype.asUint8Array = function () {
          return new Uint8Array(
            this.array.buffer,
            this.array.byteOffset,
            this.length
          );
        }),
        (e.prototype.pushArray = function (e) {
          this.reserve(e.length),
            this.array.set(e, this.length),
            (this.length += e.length);
        }),
        (e.prototype.push = function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          this.pushArray(e);
        }),
        (e.prototype.get = function () {
          if (this.readPos < this.length) return this.array[this.readPos++];
          throw new Error("Read past end of buffer");
        }),
        (e.prototype.pushUint8ArrayChecked = function (e, t) {
          if (e.length !== t) throw new Error("Binary data has incorrect size");
          this.pushArray(e);
        }),
        (e.prototype.getUint8Array = function (e) {
          if (this.readPos + e > this.length)
            throw new Error("Read past end of buffer");
          var t = new Uint8Array(
            this.array.buffer,
            this.array.byteOffset + this.readPos,
            e
          );
          return (this.readPos += e), t;
        }),
        (e.prototype.skip = function (e) {
          if (this.readPos + e > this.length)
            throw new Error("Read past end of buffer");
          this.readPos += e;
        }),
        (e.prototype.pushUint16 = function (e) {
          this.push((e >> 0) & 255, (e >> 8) & 255);
        }),
        (e.prototype.getUint16 = function () {
          var e = 0;
          return (e |= this.get() << 0), (e |= this.get() << 8);
        }),
        (e.prototype.pushUint32 = function (e) {
          this.push(
            (e >> 0) & 255,
            (e >> 8) & 255,
            (e >> 16) & 255,
            (e >> 24) & 255
          );
        }),
        (e.prototype.getUint32 = function () {
          var e = 0;
          return (
            (e |= this.get() << 0),
            (e |= this.get() << 8),
            (e |= this.get() << 16),
            (e |= this.get() << 24) >>> 0
          );
        }),
        (e.prototype.pushNumberAsUint64 = function (e) {
          this.pushUint32(e >>> 0),
            this.pushUint32(Math.floor(e / 4294967296) >>> 0);
        }),
        (e.prototype.getUint64AsNumber = function () {
          var e = this.getUint32();
          return 4294967296 * (this.getUint32() >>> 0) + (e >>> 0);
        }),
        (e.prototype.pushVaruint32 = function (e) {
          for (;;) {
            if (!(e >>> 7)) {
              this.push(e);
              break;
            }
            this.push(128 | (127 & e)), (e >>>= 7);
          }
        }),
        (e.prototype.getVaruint32 = function () {
          for (var e = 0, t = 0; ; ) {
            var r = this.get();
            if (((e |= (127 & r) << t), (t += 7), !(128 & r))) break;
          }
          return e >>> 0;
        }),
        (e.prototype.pushVarint32 = function (e) {
          this.pushVaruint32((e << 1) ^ (e >> 31));
        }),
        (e.prototype.getVarint32 = function () {
          var e = this.getVaruint32();
          return 1 & e ? (~e >> 1) | 2147483648 : e >>> 1;
        }),
        (e.prototype.pushFloat32 = function (e) {
          this.pushArray(new Uint8Array(new Float32Array([e]).buffer));
        }),
        (e.prototype.getFloat32 = function () {
          return new Float32Array(this.getUint8Array(4).slice().buffer)[0];
        }),
        (e.prototype.pushFloat64 = function (e) {
          this.pushArray(new Uint8Array(new Float64Array([e]).buffer));
        }),
        (e.prototype.getFloat64 = function () {
          return new Float64Array(this.getUint8Array(8).slice().buffer)[0];
        }),
        (e.prototype.pushName = function (e) {
          if ("string" != typeof e)
            throw new Error("Expected string containing name");
          if (!new RegExp(/^[.1-5a-z]{0,12}[.1-5a-j]?$/).test(e))
            throw new Error(
              "Name should be less than 13 characters, or less than 14 if last character is between 1-5 or a-j, and only contain the following symbols .12345abcdefghijklmnopqrstuvwxyz"
            );
          for (
            var t = function (e) {
                return e >= "a".charCodeAt(0) && e <= "z".charCodeAt(0)
                  ? e - "a".charCodeAt(0) + 6
                  : e >= "1".charCodeAt(0) && e <= "5".charCodeAt(0)
                  ? e - "1".charCodeAt(0) + 1
                  : 0;
              },
              r = new Uint8Array(8),
              n = 63,
              i = 0;
            i < e.length;
            ++i
          ) {
            var a = t(e.charCodeAt(i));
            n < 5 && (a <<= 1);
            for (var s = 4; s >= 0; --s)
              n >= 0 &&
                ((r[Math.floor(n / 8)] |= ((a >> s) & 1) << n % 8), --n);
          }
          this.pushArray(r);
        }),
        (e.prototype.getName = function () {
          for (var e = this.getUint8Array(8), t = "", r = 63; r >= 0; ) {
            for (var n = 0, i = 0; i < 5; ++i)
              r >= 0 &&
                ((n = (n << 1) | ((e[Math.floor(r / 8)] >> r % 8) & 1)), --r);
            t +=
              n >= 6
                ? String.fromCharCode(n + "a".charCodeAt(0) - 6)
                : n >= 1
                ? String.fromCharCode(n + "1".charCodeAt(0) - 1)
                : ".";
          }
          for (; t.endsWith("."); ) t = t.substr(0, t.length - 1);
          return t;
        }),
        (e.prototype.pushBytes = function (e) {
          this.pushVaruint32(e.length), this.pushArray(e);
        }),
        (e.prototype.getBytes = function () {
          return this.getUint8Array(this.getVaruint32());
        }),
        (e.prototype.pushString = function (e) {
          this.pushBytes(this.textEncoder.encode(e));
        }),
        (e.prototype.getString = function () {
          return this.textDecoder.decode(this.getBytes());
        }),
        (e.prototype.pushSymbolCode = function (e) {
          if ("string" != typeof e)
            throw new Error("Expected string containing symbol_code");
          var t = [];
          for (
            t.push.apply(t, a([], i(this.textEncoder.encode(e))));
            t.length < 8;

          )
            t.push(0);
          this.pushArray(t.slice(0, 8));
        }),
        (e.prototype.getSymbolCode = function () {
          var e,
            t = this.getUint8Array(8);
          for (e = 0; e < t.length && t[e]; ++e);
          return this.textDecoder.decode(
            new Uint8Array(t.buffer, t.byteOffset, e)
          );
        }),
        (e.prototype.pushSymbol = function (e) {
          var t = e.name,
            r = e.precision;
          if (!/^[A-Z]{1,7}$/.test(t))
            throw new Error(
              "Expected symbol to be A-Z and between one and seven characters"
            );
          var n = [255 & r];
          for (
            n.push.apply(n, a([], i(this.textEncoder.encode(t))));
            n.length < 8;

          )
            n.push(0);
          this.pushArray(n.slice(0, 8));
        }),
        (e.prototype.getSymbol = function () {
          var e,
            t = this.get(),
            r = this.getUint8Array(7);
          for (e = 0; e < r.length && r[e]; ++e);
          return {
            name: this.textDecoder.decode(
              new Uint8Array(r.buffer, r.byteOffset, e)
            ),
            precision: t,
          };
        }),
        (e.prototype.pushAsset = function (e) {
          if ("string" != typeof e)
            throw new Error("Expected string containing asset");
          var t = 0,
            r = "",
            n = 0;
          "-" === (e = e.trim())[t] && ((r += "-"), ++t);
          for (
            var i = !1;
            t < e.length &&
            e.charCodeAt(t) >= "0".charCodeAt(0) &&
            e.charCodeAt(t) <= "9".charCodeAt(0);

          )
            (i = !0), (r += e[t]), ++t;
          if (!i) throw new Error("Asset must begin with a number");
          if ("." === e[t])
            for (
              ++t;
              t < e.length &&
              e.charCodeAt(t) >= "0".charCodeAt(0) &&
              e.charCodeAt(t) <= "9".charCodeAt(0);

            )
              (r += e[t]), ++n, ++t;
          var a = e.substr(t).trim();
          this.pushArray(o.signedDecimalToBinary(8, r)),
            this.pushSymbol({ name: a, precision: n });
        }),
        (e.prototype.getAsset = function () {
          var e = this.getUint8Array(8),
            t = this.getSymbol(),
            r = t.name,
            n = t.precision,
            i = o.signedBinaryToDecimal(e, n + 1);
          return (
            n && (i = i.substr(0, i.length - n) + "." + i.substr(i.length - n)),
            i + " " + r
          );
        }),
        (e.prototype.pushPublicKey = function (e) {
          var t = o.stringToPublicKey(e);
          this.push(t.type), this.pushArray(t.data);
        }),
        (e.prototype.getPublicKey = function () {
          var e,
            t = this.get();
          if (t === o.KeyType.wa) {
            var r = this.readPos;
            this.skip(34),
              this.skip(this.getVaruint32()),
              (e = new Uint8Array(
                this.array.buffer,
                this.array.byteOffset + r,
                this.readPos - r
              ));
          } else e = this.getUint8Array(o.publicKeyDataSize);
          return o.publicKeyToString({ type: t, data: e });
        }),
        (e.prototype.pushPrivateKey = function (e) {
          var t = o.stringToPrivateKey(e);
          this.push(t.type), this.pushArray(t.data);
        }),
        (e.prototype.getPrivateKey = function () {
          var e = this.get(),
            t = this.getUint8Array(o.privateKeyDataSize);
          return o.privateKeyToString({ type: e, data: t });
        }),
        (e.prototype.pushSignature = function (e) {
          var t = o.stringToSignature(e);
          this.push(t.type), this.pushArray(t.data);
        }),
        (e.prototype.getSignature = function () {
          var e,
            t = this.get();
          if (t === o.KeyType.wa) {
            var r = this.readPos;
            this.skip(65),
              this.skip(this.getVaruint32()),
              this.skip(this.getVaruint32()),
              (e = new Uint8Array(
                this.array.buffer,
                this.array.byteOffset + r,
                this.readPos - r
              ));
          } else e = this.getUint8Array(o.signatureDataSize);
          return o.signatureToString({ type: t, data: e });
        }),
        e
      );
    })();
    t.SerialBuffer = c;
    t.supportedAbiVersion = function (e) {
      return e.startsWith("eosio::abi/1.");
    };
    var l = function (e) {
      var t = Date.parse(e);
      if (Number.isNaN(t)) throw new Error("Invalid time format");
      return t;
    };
    t.dateToTimePoint = function (e) {
      return Math.round(1e3 * l(e + "Z"));
    };
    t.timePointToDate = function (e) {
      var t = new Date(e / 1e3).toISOString();
      return t.substr(0, t.length - 1);
    };
    t.dateToTimePointSec = function (e) {
      return Math.round(l(e + "Z") / 1e3);
    };
    t.timePointSecToDate = function (e) {
      var t = new Date(1e3 * e).toISOString();
      return t.substr(0, t.length - 1);
    };
    t.dateToBlockTimestamp = function (e) {
      return Math.round((l(e + "Z") - 9466848e5) / 500);
    };
    t.blockTimestampToDate = function (e) {
      var t = new Date(500 * e + 9466848e5).toISOString();
      return t.substr(0, t.length - 1);
    };
    t.stringToSymbol = function (e) {
      if ("string" != typeof e)
        throw new Error("Expected string containing symbol");
      var t = e.match(/^([0-9]+),([A-Z]+)$/);
      if (!t) throw new Error("Invalid symbol");
      return { name: t[2], precision: +t[1] };
    };
    t.symbolToString = function (e) {
      var t = e.name;
      return e.precision + "," + t;
    };
    t.arrayToHex = function (e) {
      var t,
        r,
        n = "";
      try {
        for (var i = s(e), a = i.next(); !a.done; a = i.next()) {
          n += ("00" + a.value.toString(16)).slice(-2);
        }
      } catch (e) {
        t = { error: e };
      } finally {
        try {
          a && !a.done && (r = i.return) && r.call(i);
        } finally {
          if (t) throw t.error;
        }
      }
      return n.toUpperCase();
    };
    function h(e, t) {
      throw new Error("Don't know how to serialize " + this.name);
    }
    function d(e) {
      throw new Error("Don't know how to deserialize " + this.name);
    }
    function f(e, t, r, n) {
      var i, a;
      if (
        (void 0 === r && (r = new u()),
        void 0 === n && (n = !0),
        "object" != typeof t)
      )
        throw new Error(
          "expected object containing data: " + JSON.stringify(t)
        );
      this.base && this.base.serialize(e, t, r, n);
      try {
        for (var o = s(this.fields), c = o.next(); !c.done; c = o.next()) {
          var l = c.value;
          if (l.name in t) {
            if (r.skippedBinaryExtension)
              throw new Error("unexpected " + this.name + "." + l.name);
            l.type.serialize(
              e,
              t[l.name],
              r,
              n && l === this.fields[this.fields.length - 1]
            );
          } else {
            if (!n || !l.type.extensionOf)
              throw new Error(
                "missing " +
                  this.name +
                  "." +
                  l.name +
                  " (type=" +
                  l.type.name +
                  ")"
              );
            r.skippedBinaryExtension = !0;
          }
        }
      } catch (e) {
        i = { error: e };
      } finally {
        try {
          c && !c.done && (a = o.return) && a.call(o);
        } finally {
          if (i) throw i.error;
        }
      }
    }
    function p(e, t, r) {
      var n, i, a;
      void 0 === t && (t = new u()),
        void 0 === r && (r = !0),
        (a = this.base ? this.base.deserialize(e, t, r) : {});
      try {
        for (var o = s(this.fields), c = o.next(); !c.done; c = o.next()) {
          var l = c.value;
          r && l.type.extensionOf && !e.haveReadData()
            ? (t.skippedBinaryExtension = !0)
            : (a[l.name] = l.type.deserialize(e, t, r));
        }
      } catch (e) {
        n = { error: e };
      } finally {
        try {
          c && !c.done && (i = o.return) && i.call(o);
        } finally {
          if (n) throw n.error;
        }
      }
      return a;
    }
    function y(e, t, r, n) {
      if (!Array.isArray(t) || 2 !== t.length || "string" != typeof t[0])
        throw new Error('expected variant: ["type", value]');
      var i = this.fields.findIndex(function (e) {
        return e.name === t[0];
      });
      if (i < 0)
        throw new Error('type "' + t[0] + '" is not valid for variant');
      e.pushVaruint32(i), this.fields[i].type.serialize(e, t[1], r, n);
    }
    function _(e, t, r) {
      var n = e.getVaruint32();
      if (n >= this.fields.length)
        throw new Error("type index " + n + " is not valid for variant");
      var i = this.fields[n];
      return [i.name, i.type.deserialize(e, t, r)];
    }
    function g(e, t, r, n) {
      var i, a;
      e.pushVaruint32(t.length);
      try {
        for (var o = s(t), u = o.next(); !u.done; u = o.next()) {
          var c = u.value;
          this.arrayOf.serialize(e, c, r, !1);
        }
      } catch (e) {
        i = { error: e };
      } finally {
        try {
          u && !u.done && (a = o.return) && a.call(o);
        } finally {
          if (i) throw i.error;
        }
      }
    }
    function v(e, t, r) {
      for (var n = e.getVaruint32(), i = [], a = 0; a < n; ++a)
        i.push(this.arrayOf.deserialize(e, t, !1));
      return i;
    }
    function b(e, t, r, n) {
      null == t
        ? e.push(0)
        : (e.push(1), this.optionalOf.serialize(e, t, r, n));
    }
    function m(e, t, r) {
      return e.get() ? this.optionalOf.deserialize(e, t, r) : null;
    }
    function w(e, t, r, n) {
      this.extensionOf.serialize(e, t, r, n);
    }
    function x(e, t, r) {
      return this.extensionOf.deserialize(e, t, r);
    }
    function z(e, t, r, n) {
      var a,
        o,
        u = Object.entries(t);
      e.pushVaruint32(u.length);
      try {
        for (var c = s(u), l = c.next(); !l.done; l = c.next()) {
          var h = i(l.value, 2),
            d = h[0],
            f = h[1],
            p = this.fields[0].type,
            y = this.fields[1].type;
          p.serialize(e, d, r, n), y.serialize(e, f, r, n);
        }
      } catch (e) {
        a = { error: e };
      } finally {
        try {
          l && !l.done && (o = c.return) && o.call(c);
        } finally {
          if (a) throw a.error;
        }
      }
    }
    function k(e, t, r) {
      for (var n = e.getVaruint32(), i = {}, a = 0; a < n; ++a) {
        var s = this.fields[0].type,
          o = this.fields[1].type;
        i[s.deserialize(e, t, r)] = o.deserialize(e, t, r);
      }
      return i;
    }
    function A(e, t, r, n) {
      var i = this;
      e.pushVaruint32(t.length),
        t.forEach(function (t) {
          i.fields[0].type.serialize(e, t[0], r, n),
            i.fields[1].type.serialize(e, t[1], r, n);
        });
    }
    function S(e, t, r) {
      for (var n = [], i = e.getVaruint32(), a = 0; a < i; ++a)
        n.push(this.fields[0].type.deserialize(e, t, r)),
          n.push(this.fields[1].type.deserialize(e, t, r));
      return n;
    }
    t.hexToUint8Array = function (e) {
      if ("string" != typeof e)
        throw new Error("Expected string containing hex digits");
      if (e.length % 2) throw new Error("Odd number of hex digits");
      for (var t = e.length / 2, r = new Uint8Array(t), n = 0; n < t; ++n) {
        var i = parseInt(e.substr(2 * n, 2), 16);
        if (Number.isNaN(i)) throw new Error("Expected hex string");
        r[n] = i;
      }
      return r;
    };
    var T = function (e) {
        return n(
          {
            name: "<missing name>",
            aliasOfName: "",
            arrayOf: null,
            optionalOf: null,
            extensionOf: null,
            baseName: "",
            base: null,
            fields: [],
            serialize: h,
            deserialize: d,
          },
          e
        );
      },
      E = function (e, t) {
        if (
          Number.isNaN(+e) ||
          Number.isNaN(+t) ||
          ("number" != typeof e && "string" != typeof e)
        )
          throw new Error("Expected number");
        if (+e != +t) throw new Error("Number is out of range");
        return +e;
      };
    t.createInitialTypes = function () {
      var e = new Map(
        Object.entries({
          bool: T({
            name: "bool",
            serialize: function (e, t) {
              if (
                "boolean" != typeof t &&
                ("number" != typeof t || (1 !== t && 0 !== t))
              )
                throw new Error("Expected boolean or number equal to 1 or 0");
              e.push(t ? 1 : 0);
            },
            deserialize: function (e) {
              return !!e.get();
            },
          }),
          uint8: T({
            name: "uint8",
            serialize: function (e, t) {
              e.push(E(t, 255 & t));
            },
            deserialize: function (e) {
              return e.get();
            },
          }),
          int8: T({
            name: "int8",
            serialize: function (e, t) {
              e.push(E(t, (t << 24) >> 24));
            },
            deserialize: function (e) {
              return (e.get() << 24) >> 24;
            },
          }),
          uint16: T({
            name: "uint16",
            serialize: function (e, t) {
              e.pushUint16(E(t, 65535 & t));
            },
            deserialize: function (e) {
              return e.getUint16();
            },
          }),
          int16: T({
            name: "int16",
            serialize: function (e, t) {
              e.pushUint16(E(t, (t << 16) >> 16));
            },
            deserialize: function (e) {
              return (e.getUint16() << 16) >> 16;
            },
          }),
          uint32: T({
            name: "uint32",
            serialize: function (e, t) {
              e.pushUint32(E(t, t >>> 0));
            },
            deserialize: function (e) {
              return e.getUint32();
            },
          }),
          uint64: T({
            name: "uint64",
            serialize: function (e, t) {
              e.pushArray(o.decimalToBinary(8, "" + t));
            },
            deserialize: function (e) {
              return o.binaryToDecimal(e.getUint8Array(8));
            },
          }),
          int64: T({
            name: "int64",
            serialize: function (e, t) {
              e.pushArray(o.signedDecimalToBinary(8, "" + t));
            },
            deserialize: function (e) {
              return o.signedBinaryToDecimal(e.getUint8Array(8));
            },
          }),
          int32: T({
            name: "int32",
            serialize: function (e, t) {
              e.pushUint32(E(t, 0 | t));
            },
            deserialize: function (e) {
              return 0 | e.getUint32();
            },
          }),
          varuint32: T({
            name: "varuint32",
            serialize: function (e, t) {
              e.pushVaruint32(E(t, t >>> 0));
            },
            deserialize: function (e) {
              return e.getVaruint32();
            },
          }),
          varint32: T({
            name: "varint32",
            serialize: function (e, t) {
              e.pushVarint32(E(t, 0 | t));
            },
            deserialize: function (e) {
              return e.getVarint32();
            },
          }),
          uint128: T({
            name: "uint128",
            serialize: function (e, t) {
              e.pushArray(o.decimalToBinary(16, "" + t));
            },
            deserialize: function (e) {
              return o.binaryToDecimal(e.getUint8Array(16));
            },
          }),
          int128: T({
            name: "int128",
            serialize: function (e, t) {
              e.pushArray(o.signedDecimalToBinary(16, "" + t));
            },
            deserialize: function (e) {
              return o.signedBinaryToDecimal(e.getUint8Array(16));
            },
          }),
          float32: T({
            name: "float32",
            serialize: function (e, t) {
              e.pushFloat32(t);
            },
            deserialize: function (e) {
              return e.getFloat32();
            },
          }),
          float64: T({
            name: "float64",
            serialize: function (e, t) {
              e.pushFloat64(t);
            },
            deserialize: function (e) {
              return e.getFloat64();
            },
          }),
          float128: T({
            name: "float128",
            serialize: function (e, r) {
              e.pushUint8ArrayChecked(t.hexToUint8Array(r), 16);
            },
            deserialize: function (e) {
              return t.arrayToHex(e.getUint8Array(16));
            },
          }),
          bytes: T({
            name: "bytes",
            serialize: function (e, r) {
              r instanceof Uint8Array || Array.isArray(r)
                ? e.pushBytes(r)
                : e.pushBytes(t.hexToUint8Array(r));
            },
            deserialize: function (e, r) {
              return r && r.options.bytesAsUint8Array
                ? e.getBytes()
                : t.arrayToHex(e.getBytes());
            },
          }),
          string: T({
            name: "string",
            serialize: function (e, t) {
              e.pushString(t);
            },
            deserialize: function (e) {
              return e.getString();
            },
          }),
          name: T({
            name: "name",
            serialize: function (e, t) {
              e.pushName(t);
            },
            deserialize: function (e) {
              return e.getName();
            },
          }),
          time_point: T({
            name: "time_point",
            serialize: function (e, r) {
              e.pushNumberAsUint64(t.dateToTimePoint(r));
            },
            deserialize: function (e) {
              return t.timePointToDate(e.getUint64AsNumber());
            },
          }),
          time_point_sec: T({
            name: "time_point_sec",
            serialize: function (e, r) {
              e.pushUint32(t.dateToTimePointSec(r));
            },
            deserialize: function (e) {
              return t.timePointSecToDate(e.getUint32());
            },
          }),
          block_timestamp_type: T({
            name: "block_timestamp_type",
            serialize: function (e, r) {
              e.pushUint32(t.dateToBlockTimestamp(r));
            },
            deserialize: function (e) {
              return t.blockTimestampToDate(e.getUint32());
            },
          }),
          symbol_code: T({
            name: "symbol_code",
            serialize: function (e, t) {
              e.pushSymbolCode(t);
            },
            deserialize: function (e) {
              return e.getSymbolCode();
            },
          }),
          symbol: T({
            name: "symbol",
            serialize: function (e, r) {
              e.pushSymbol(t.stringToSymbol(r));
            },
            deserialize: function (e) {
              return t.symbolToString(e.getSymbol());
            },
          }),
          asset: T({
            name: "asset",
            serialize: function (e, t) {
              e.pushAsset(t);
            },
            deserialize: function (e) {
              return e.getAsset();
            },
          }),
          checksum160: T({
            name: "checksum160",
            serialize: function (e, r) {
              e.pushUint8ArrayChecked(t.hexToUint8Array(r), 20);
            },
            deserialize: function (e) {
              return t.arrayToHex(e.getUint8Array(20));
            },
          }),
          checksum256: T({
            name: "checksum256",
            serialize: function (e, r) {
              e.pushUint8ArrayChecked(t.hexToUint8Array(r), 32);
            },
            deserialize: function (e) {
              return t.arrayToHex(e.getUint8Array(32));
            },
          }),
          checksum512: T({
            name: "checksum512",
            serialize: function (e, r) {
              e.pushUint8ArrayChecked(t.hexToUint8Array(r), 64);
            },
            deserialize: function (e) {
              return t.arrayToHex(e.getUint8Array(64));
            },
          }),
          public_key: T({
            name: "public_key",
            serialize: function (e, t) {
              e.pushPublicKey(t);
            },
            deserialize: function (e) {
              return e.getPublicKey();
            },
          }),
          private_key: T({
            name: "private_key",
            serialize: function (e, t) {
              e.pushPrivateKey(t);
            },
            deserialize: function (e) {
              return e.getPrivateKey();
            },
          }),
          signature: T({
            name: "signature",
            serialize: function (e, t) {
              e.pushSignature(t);
            },
            deserialize: function (e) {
              return e.getSignature();
            },
          }),
        })
      );
      return (
        e.set(
          "extended_asset",
          T({
            name: "extended_asset",
            baseName: "",
            fields: [
              { name: "quantity", typeName: "asset", type: e.get("asset") },
              { name: "contract", typeName: "name", type: e.get("name") },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e
      );
    };
    t.createAbiTypes = function () {
      var e = t.createInitialTypes();
      return (
        e.set(
          "extensions_entry",
          T({
            name: "extensions_entry",
            baseName: "",
            fields: [
              { name: "tag", typeName: "uint16", type: null },
              { name: "value", typeName: "bytes", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "type_def",
          T({
            name: "type_def",
            baseName: "",
            fields: [
              { name: "new_type_name", typeName: "string", type: null },
              { name: "type", typeName: "string", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "field_def",
          T({
            name: "field_def",
            baseName: "",
            fields: [
              { name: "name", typeName: "string", type: null },
              { name: "type", typeName: "string", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "struct_def",
          T({
            name: "struct_def",
            baseName: "",
            fields: [
              { name: "name", typeName: "string", type: null },
              { name: "base", typeName: "string", type: null },
              { name: "fields", typeName: "field_def[]", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "action_def",
          T({
            name: "action_def",
            baseName: "",
            fields: [
              { name: "name", typeName: "name", type: null },
              { name: "type", typeName: "string", type: null },
              { name: "ricardian_contract", typeName: "string", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "table_def",
          T({
            name: "table_def",
            baseName: "",
            fields: [
              { name: "name", typeName: "name", type: null },
              { name: "index_type", typeName: "string", type: null },
              { name: "key_names", typeName: "string[]", type: null },
              { name: "key_types", typeName: "string[]", type: null },
              { name: "type", typeName: "string", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "clause_pair",
          T({
            name: "clause_pair",
            baseName: "",
            fields: [
              { name: "id", typeName: "string", type: null },
              { name: "body", typeName: "string", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "error_message",
          T({
            name: "error_message",
            baseName: "",
            fields: [
              { name: "error_code", typeName: "uint64", type: null },
              { name: "error_msg", typeName: "string", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "variant_def",
          T({
            name: "variant_def",
            baseName: "",
            fields: [
              { name: "name", typeName: "string", type: null },
              { name: "types", typeName: "string[]", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "action_result",
          T({
            name: "action_result",
            baseName: "",
            fields: [
              { name: "name", typeName: "name", type: null },
              { name: "result_type", typeName: "string", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "primary_key_index_def",
          T({
            name: "primary_key_index_def",
            baseName: "",
            fields: [
              { name: "name", typeName: "name", type: null },
              { name: "type", typeName: "string", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "secondary_index_def",
          T({
            name: "secondary_index_def",
            baseName: "",
            fields: [{ name: "type", typeName: "string", type: null }],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "secondary_indices",
          T({
            name: "secondary_indices",
            baseName: "",
            fields: [
              { name: "name", typeName: "name", type: null },
              {
                name: "secondary_index_def",
                typeName: "secondary_index_def",
                type: null,
              },
            ],
            serialize: z,
            deserialize: k,
          })
        ),
        e.set(
          "kv_table_entry_def",
          T({
            name: "kv_table_entry_def",
            baseName: "",
            fields: [
              { name: "type", typeName: "string", type: null },
              {
                name: "primary_index",
                typeName: "primary_key_index_def",
                type: null,
              },
              {
                name: "secondary_indices",
                typeName: "secondary_indices",
                type: null,
              },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "kv_table",
          T({
            name: "kv_table",
            baseName: "",
            fields: [
              { name: "name", typeName: "name", type: null },
              {
                name: "kv_table_entry_def",
                typeName: "kv_table_entry_def",
                type: null,
              },
            ],
            serialize: z,
            deserialize: k,
          })
        ),
        e.set(
          "abi_def",
          T({
            name: "abi_def",
            baseName: "",
            fields: [
              { name: "version", typeName: "string", type: null },
              { name: "types", typeName: "type_def[]", type: null },
              { name: "structs", typeName: "struct_def[]", type: null },
              { name: "actions", typeName: "action_def[]", type: null },
              { name: "tables", typeName: "table_def[]", type: null },
              {
                name: "ricardian_clauses",
                typeName: "clause_pair[]",
                type: null,
              },
              {
                name: "error_messages",
                typeName: "error_message[]",
                type: null,
              },
              {
                name: "abi_extensions",
                typeName: "extensions_entry[]",
                type: null,
              },
              { name: "variants", typeName: "variant_def[]$", type: null },
              {
                name: "action_results",
                typeName: "action_result[]$",
                type: null,
              },
              { name: "kv_tables", typeName: "kv_table$", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e
      );
    };
    t.createTransactionExtensionTypes = function () {
      var e = t.createInitialTypes();
      return (
        e.set(
          "resource_payer",
          T({
            name: "resource_payer",
            baseName: "",
            fields: [
              { name: "payer", typeName: "name", type: null },
              { name: "max_net_bytes", typeName: "uint64", type: null },
              { name: "max_cpu_us", typeName: "uint64", type: null },
              { name: "max_memory_bytes", typeName: "uint64", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e
      );
    };
    t.createTransactionTypes = function () {
      var e = t.createInitialTypes();
      return (
        e.set(
          "permission_level",
          T({
            name: "permission_level",
            baseName: "",
            fields: [
              { name: "actor", typeName: "name", type: null },
              { name: "permission", typeName: "name", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "action",
          T({
            name: "action",
            baseName: "",
            fields: [
              { name: "account", typeName: "name", type: null },
              { name: "name", typeName: "name", type: null },
              {
                name: "authorization",
                typeName: "permission_level[]",
                type: null,
              },
              { name: "data", typeName: "bytes", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "extension",
          T({
            name: "extension",
            baseName: "",
            fields: [
              { name: "type", typeName: "uint16", type: null },
              { name: "data", typeName: "bytes", type: null },
            ],
            serialize: A,
            deserialize: S,
          })
        ),
        e.set(
          "transaction_header",
          T({
            name: "transaction_header",
            baseName: "",
            fields: [
              { name: "expiration", typeName: "time_point_sec", type: null },
              { name: "ref_block_num", typeName: "uint16", type: null },
              { name: "ref_block_prefix", typeName: "uint32", type: null },
              {
                name: "max_net_usage_words",
                typeName: "varuint32",
                type: null,
              },
              { name: "max_cpu_usage_ms", typeName: "uint8", type: null },
              { name: "delay_sec", typeName: "varuint32", type: null },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e.set(
          "transaction",
          T({
            name: "transaction",
            baseName: "transaction_header",
            fields: [
              {
                name: "context_free_actions",
                typeName: "action[]",
                type: null,
              },
              { name: "actions", typeName: "action[]", type: null },
              {
                name: "transaction_extensions",
                typeName: "extension",
                type: null,
              },
            ],
            serialize: f,
            deserialize: p,
          })
        ),
        e
      );
    };
    t.getType = function (e, r) {
      var n = e.get(r);
      if (n && n.aliasOfName) return t.getType(e, n.aliasOfName);
      if (n) return n;
      if (r.endsWith("[]"))
        return T({
          name: r,
          arrayOf: t.getType(e, r.substr(0, r.length - 2)),
          serialize: g,
          deserialize: v,
        });
      if (r.endsWith("?"))
        return T({
          name: r,
          optionalOf: t.getType(e, r.substr(0, r.length - 1)),
          serialize: b,
          deserialize: m,
        });
      if (r.endsWith("$"))
        return T({
          name: r,
          extensionOf: t.getType(e, r.substr(0, r.length - 1)),
          serialize: w,
          deserialize: x,
        });
      throw new Error("Unknown type: " + r);
    };
    t.getTypesFromAbi = function (e, r) {
      var n,
        a,
        o,
        u,
        c,
        l,
        h,
        d,
        g,
        v,
        b = new Map(e);
      if (r && r.types)
        try {
          for (var m = s(r.types), w = m.next(); !w.done; w = m.next()) {
            var x = w.value,
              z = x.new_type_name,
              k = x.type;
            b.set(z, T({ name: z, aliasOfName: k }));
          }
        } catch (e) {
          n = { error: e };
        } finally {
          try {
            w && !w.done && (a = m.return) && a.call(m);
          } finally {
            if (n) throw n.error;
          }
        }
      if (r && r.structs)
        try {
          for (var A = s(r.structs), S = A.next(); !S.done; S = A.next()) {
            var E = S.value,
              U = E.name,
              N = E.base,
              D = E.fields;
            b.set(
              U,
              T({
                name: U,
                baseName: N,
                fields: D.map(function (e) {
                  return { name: e.name, typeName: e.type, type: null };
                }),
                serialize: f,
                deserialize: p,
              })
            );
          }
        } catch (e) {
          o = { error: e };
        } finally {
          try {
            S && !S.done && (u = A.return) && u.call(A);
          } finally {
            if (o) throw o.error;
          }
        }
      if (r && r.variants)
        try {
          for (var O = s(r.variants), R = O.next(); !R.done; R = O.next()) {
            var P = R.value,
              B = P.name,
              C = P.types;
            b.set(
              B,
              T({
                name: B,
                fields: C.map(function (e) {
                  return { name: e, typeName: e, type: null };
                }),
                serialize: y,
                deserialize: _,
              })
            );
          }
        } catch (e) {
          c = { error: e };
        } finally {
          try {
            R && !R.done && (l = O.return) && l.call(O);
          } finally {
            if (c) throw c.error;
          }
        }
      try {
        for (var F = s(b), K = F.next(); !K.done; K = F.next()) {
          var j = i(K.value, 2);
          j[0];
          (k = j[1]).baseName && (k.base = t.getType(b, k.baseName));
          try {
            for (
              var L = ((g = void 0), s(k.fields)), I = L.next();
              !I.done;
              I = L.next()
            ) {
              var Z = I.value;
              Z.type = t.getType(b, Z.typeName);
            }
          } catch (e) {
            g = { error: e };
          } finally {
            try {
              I && !I.done && (v = L.return) && v.call(L);
            } finally {
              if (g) throw g.error;
            }
          }
        }
      } catch (e) {
        h = { error: e };
      } finally {
        try {
          K && !K.done && (d = F.return) && d.call(F);
        } finally {
          if (h) throw h.error;
        }
      }
      return b;
    };
    t.transactionHeader = function (e, r) {
      var n,
        i = e.header ? e.header.timestamp : e.timestamp,
        a = parseInt(
          (n = e.id.substr(16, 8)).substr(6, 2) +
            n.substr(4, 2) +
            n.substr(2, 2) +
            n.substr(0, 2),
          16
        );
      return {
        expiration: t.timePointSecToDate(t.dateToTimePointSec(i) + r),
        ref_block_num: 65535 & e.block_num,
        ref_block_prefix: a,
      };
    };
    t.serializeActionData = function (e, r, n, i, a, s) {
      var o = e.actions.get(n);
      if (!o) throw new Error("Unknown action " + n + " in contract " + r);
      var u = new c({ textEncoder: a, textDecoder: s });
      return o.serialize(u, i), t.arrayToHex(u.asUint8Array());
    };
    t.serializeAction = function (e, r, n, i, a, s, o) {
      return {
        account: r,
        name: n,
        authorization: i,
        data: t.serializeActionData(e, r, n, a, s, o),
      };
    };
    t.deserializeActionData = function (e, r, n, i, a, s) {
      var o = e.actions.get(n);
      if (("string" == typeof i && (i = t.hexToUint8Array(i)), !o))
        throw new Error("Unknown action " + n + " in contract " + r);
      var u = new c({ textDecoder: s, textEncoder: a });
      return u.pushArray(i), o.deserialize(u);
    };
    t.deserializeAction = function (e, r, n, i, a, s, o) {
      return {
        account: r,
        name: n,
        authorization: i,
        data: t.deserializeActionData(e, r, n, a, s, o),
      };
    };
    t.serializeAnyvar = function (e, t) {
      var r, n, a, s, o, u, c, l, h;
      null === t
        ? ((l = (r = i([D.null_t, t], 2))[0]), (h = r[1]))
        : "string" == typeof t
        ? ((l = (n = i([D.string, t], 2))[0]), (h = n[1]))
        : "number" == typeof t
        ? ((l = (a = i([D.int32, t], 2))[0]), (h = a[1]))
        : t instanceof Uint8Array
        ? ((l = (s = i([D.bytes, t], 2))[0]), (h = s[1]))
        : Array.isArray(t)
        ? ((l = (o = i([D.any_array, t], 2))[0]), (h = o[1]))
        : 2 === Object.keys(t).length &&
          t.hasOwnProperty("type") &&
          t.hasOwnProperty("value")
        ? ((l = (u = i([D[t.type], t.value], 2))[0]), (h = u[1]))
        : ((l = (c = i([D.any_object, t], 2))[0]), (h = c[1])),
        e.pushVaruint32(l.index),
        l.type.serialize(e, h);
    };
    t.deserializeAnyvar = function (e, t) {
      var r = e.getVaruint32();
      if (r >= O.length)
        throw new Error("Tried to deserialize unknown anyvar type");
      var n = O[r],
        i = n.type.deserialize(e, t);
      return (t && t.options.useShortForm) || n.useShortForm
        ? i
        : { type: n.type.name, value: i };
    };
    t.deserializeAnyvarShort = function (e) {
      return t.deserializeAnyvar(e, new u({ useShortForm: !0 }));
    };
    t.serializeAnyObject = function (e, r) {
      var n,
        a,
        o = Object.entries(r);
      e.pushVaruint32(o.length);
      try {
        for (var u = s(o), c = u.next(); !c.done; c = u.next()) {
          var l = i(c.value, 2),
            h = l[0],
            d = l[1];
          e.pushString(h), t.serializeAnyvar(e, d);
        }
      } catch (e) {
        n = { error: e };
      } finally {
        try {
          c && !c.done && (a = u.return) && a.call(u);
        } finally {
          if (n) throw n.error;
        }
      }
    };
    t.deserializeAnyObject = function (e, r) {
      for (var n = e.getVaruint32(), i = {}, a = 0; a < n; ++a) {
        var s = e.getString();
        if (s in i) {
          for (var o = 1; s + "_" + o in i; ) ++o;
          s = s + "_" + o;
        }
        i[s] = t.deserializeAnyvar(e, r);
      }
      return i;
    };
    t.serializeAnyArray = function (e, r) {
      var n, i;
      e.pushVaruint32(r.length);
      try {
        for (var a = s(r), o = a.next(); !o.done; o = a.next()) {
          var u = o.value;
          t.serializeAnyvar(e, u);
        }
      } catch (e) {
        n = { error: e };
      } finally {
        try {
          o && !o.done && (i = a.return) && i.call(a);
        } finally {
          if (n) throw n.error;
        }
      }
    };
    t.deserializeAnyArray = function (e, r) {
      for (var n = e.getVaruint32(), i = [], a = 0; a < n; ++a)
        i.push(t.deserializeAnyvar(e, r));
      return i;
    };
    var U,
      N =
        ((U = t.createInitialTypes()).set(
          "null_t",
          T({
            name: "null_t",
            serialize: function (e, t) {},
            deserialize: function (e, t) {},
          })
        ),
        U.set(
          "any_object",
          T({
            name: "any_object",
            serialize: t.serializeAnyObject,
            deserialize: t.deserializeAnyObject,
          })
        ),
        U.set(
          "any_array",
          T({
            name: "any_array",
            serialize: t.serializeAnyArray,
            deserialize: t.deserializeAnyArray,
          })
        ),
        U),
      D = {
        null_t: { index: 0, useShortForm: !0, type: N.get("null_t") },
        int64: { index: 1, useShortForm: !1, type: N.get("int64") },
        uint64: { index: 2, useShortForm: !1, type: N.get("uint64") },
        int32: { index: 3, useShortForm: !0, type: N.get("int32") },
        uint32: { index: 4, useShortForm: !1, type: N.get("uint32") },
        int16: { index: 5, useShortForm: !1, type: N.get("int16") },
        uint16: { index: 6, useShortForm: !1, type: N.get("uint16") },
        int8: { index: 7, useShortForm: !1, type: N.get("int8") },
        uint8: { index: 8, useShortForm: !1, type: N.get("uint8") },
        time_point: { index: 9, useShortForm: !1, type: N.get("time_point") },
        checksum256: {
          index: 10,
          useShortForm: !1,
          type: N.get("checksum256"),
        },
        float64: { index: 11, useShortForm: !1, type: N.get("float64") },
        string: { index: 12, useShortForm: !0, type: N.get("string") },
        any_object: { index: 13, useShortForm: !0, type: N.get("any_object") },
        any_array: { index: 14, useShortForm: !0, type: N.get("any_array") },
        bytes: { index: 15, useShortForm: !1, type: N.get("bytes") },
        symbol: { index: 16, useShortForm: !1, type: N.get("symbol") },
        symbol_code: {
          index: 17,
          useShortForm: !1,
          type: N.get("symbol_code"),
        },
        asset: { index: 18, useShortForm: !1, type: N.get("asset") },
      },
      O = [
        D.null_t,
        D.int64,
        D.uint64,
        D.int32,
        D.uint32,
        D.int16,
        D.uint16,
        D.int8,
        D.uint8,
        D.time_point,
        D.checksum256,
        D.float64,
        D.string,
        D.any_object,
        D.any_array,
        D.bytes,
        D.symbol,
        D.symbol_code,
        D.asset,
      ];
    t.serializeQuery = function (e, r) {
      var n, a, o, u, c, l, h, d;
      if (
        ("string" == typeof r
          ? (l = r)
          : Array.isArray(r) && 2 === r.length
          ? ((l = (n = i(r, 2))[0]), (d = n[1]))
          : Array.isArray(r) && 3 === r.length
          ? ((l = (a = i(r, 3))[0]), (h = a[1]), (d = a[2]))
          : ((l = (o = i([r.method, r.arg, r.filter], 3))[0]),
            (h = o[1]),
            (d = o[2])),
        e.pushString(l),
        void 0 === h ? e.push(0) : (e.push(1), t.serializeAnyvar(e, h)),
        void 0 === d)
      )
        e.push(0);
      else {
        e.pushVaruint32(d.length);
        try {
          for (var f = s(d), p = f.next(); !p.done; p = f.next()) {
            var y = p.value;
            t.serializeQuery(e, y);
          }
        } catch (e) {
          u = { error: e };
        } finally {
          try {
            p && !p.done && (c = f.return) && c.call(f);
          } finally {
            if (u) throw u.error;
          }
        }
      }
    };
  },
  function (e, t, r) {
    "use strict";
    var n = r(0).rotr32;
    function i(e, t, r) {
      return (e & t) ^ (~e & r);
    }
    function a(e, t, r) {
      return (e & t) ^ (e & r) ^ (t & r);
    }
    function s(e, t, r) {
      return e ^ t ^ r;
    }
    (t.ft_1 = function (e, t, r, n) {
      return 0 === e
        ? i(t, r, n)
        : 1 === e || 3 === e
        ? s(t, r, n)
        : 2 === e
        ? a(t, r, n)
        : void 0;
    }),
      (t.ch32 = i),
      (t.maj32 = a),
      (t.p32 = s),
      (t.s0_256 = function (e) {
        return n(e, 2) ^ n(e, 13) ^ n(e, 22);
      }),
      (t.s1_256 = function (e) {
        return n(e, 6) ^ n(e, 11) ^ n(e, 25);
      }),
      (t.g0_256 = function (e) {
        return n(e, 7) ^ n(e, 18) ^ (e >>> 3);
      }),
      (t.g1_256 = function (e) {
        return n(e, 17) ^ n(e, 19) ^ (e >>> 10);
      });
  },
  function (e, t, r) {
    "use strict";
    var n = r(0),
      i = r(2),
      a = r(5),
      s = r(1),
      o = n.sum32,
      u = n.sum32_4,
      c = n.sum32_5,
      l = a.ch32,
      h = a.maj32,
      d = a.s0_256,
      f = a.s1_256,
      p = a.g0_256,
      y = a.g1_256,
      _ = i.BlockHash,
      g = [
        1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
        2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
        1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
        264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
        2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
        113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
        1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
        3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
        430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
        1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
        2428436474, 2756734187, 3204031479, 3329325298,
      ];
    function v() {
      if (!(this instanceof v)) return new v();
      _.call(this),
        (this.h = [
          1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
          2600822924, 528734635, 1541459225,
        ]),
        (this.k = g),
        (this.W = new Array(64));
    }
    n.inherits(v, _),
      (e.exports = v),
      (v.blockSize = 512),
      (v.outSize = 256),
      (v.hmacStrength = 192),
      (v.padLength = 64),
      (v.prototype._update = function (e, t) {
        for (var r = this.W, n = 0; n < 16; n++) r[n] = e[t + n];
        for (; n < r.length; n++)
          r[n] = u(y(r[n - 2]), r[n - 7], p(r[n - 15]), r[n - 16]);
        var i = this.h[0],
          a = this.h[1],
          _ = this.h[2],
          g = this.h[3],
          v = this.h[4],
          b = this.h[5],
          m = this.h[6],
          w = this.h[7];
        for (s(this.k.length === r.length), n = 0; n < r.length; n++) {
          var x = c(w, f(v), l(v, b, m), this.k[n], r[n]),
            z = o(d(i), h(i, a, _));
          (w = m),
            (m = b),
            (b = v),
            (v = o(g, x)),
            (g = _),
            (_ = a),
            (a = i),
            (i = o(x, z));
        }
        (this.h[0] = o(this.h[0], i)),
          (this.h[1] = o(this.h[1], a)),
          (this.h[2] = o(this.h[2], _)),
          (this.h[3] = o(this.h[3], g)),
          (this.h[4] = o(this.h[4], v)),
          (this.h[5] = o(this.h[5], b)),
          (this.h[6] = o(this.h[6], m)),
          (this.h[7] = o(this.h[7], w));
      }),
      (v.prototype._digest = function (e) {
        return "hex" === e
          ? n.toHex32(this.h, "big")
          : n.split32(this.h, "big");
      });
  },
  function (e, t, r) {
    "use strict";
    var n = r(0),
      i = r(2),
      a = r(1),
      s = n.rotr64_hi,
      o = n.rotr64_lo,
      u = n.shr64_hi,
      c = n.shr64_lo,
      l = n.sum64,
      h = n.sum64_hi,
      d = n.sum64_lo,
      f = n.sum64_4_hi,
      p = n.sum64_4_lo,
      y = n.sum64_5_hi,
      _ = n.sum64_5_lo,
      g = i.BlockHash,
      v = [
        1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
        3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
        2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
        310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
        1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317,
        3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
        264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901,
        1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837,
        2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
        3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901,
        113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964,
        773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
        1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142,
        2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273,
        3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
        3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720,
        430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593,
        883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
        1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
        2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
        2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
        3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
        3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
        174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
        685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
        1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866,
        1607167915, 987167468, 1816402316, 1246189591,
      ];
    function b() {
      if (!(this instanceof b)) return new b();
      g.call(this),
        (this.h = [
          1779033703, 4089235720, 3144134277, 2227873595, 1013904242,
          4271175723, 2773480762, 1595750129, 1359893119, 2917565137,
          2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209,
        ]),
        (this.k = v),
        (this.W = new Array(160));
    }
    function m(e, t, r, n, i) {
      var a = (e & r) ^ (~e & i);
      return a < 0 && (a += 4294967296), a;
    }
    function w(e, t, r, n, i, a) {
      var s = (t & n) ^ (~t & a);
      return s < 0 && (s += 4294967296), s;
    }
    function x(e, t, r, n, i) {
      var a = (e & r) ^ (e & i) ^ (r & i);
      return a < 0 && (a += 4294967296), a;
    }
    function z(e, t, r, n, i, a) {
      var s = (t & n) ^ (t & a) ^ (n & a);
      return s < 0 && (s += 4294967296), s;
    }
    function k(e, t) {
      var r = s(e, t, 28) ^ s(t, e, 2) ^ s(t, e, 7);
      return r < 0 && (r += 4294967296), r;
    }
    function A(e, t) {
      var r = o(e, t, 28) ^ o(t, e, 2) ^ o(t, e, 7);
      return r < 0 && (r += 4294967296), r;
    }
    function S(e, t) {
      var r = s(e, t, 14) ^ s(e, t, 18) ^ s(t, e, 9);
      return r < 0 && (r += 4294967296), r;
    }
    function T(e, t) {
      var r = o(e, t, 14) ^ o(e, t, 18) ^ o(t, e, 9);
      return r < 0 && (r += 4294967296), r;
    }
    function E(e, t) {
      var r = s(e, t, 1) ^ s(e, t, 8) ^ u(e, t, 7);
      return r < 0 && (r += 4294967296), r;
    }
    function U(e, t) {
      var r = o(e, t, 1) ^ o(e, t, 8) ^ c(e, t, 7);
      return r < 0 && (r += 4294967296), r;
    }
    function N(e, t) {
      var r = s(e, t, 19) ^ s(t, e, 29) ^ u(e, t, 6);
      return r < 0 && (r += 4294967296), r;
    }
    function D(e, t) {
      var r = o(e, t, 19) ^ o(t, e, 29) ^ c(e, t, 6);
      return r < 0 && (r += 4294967296), r;
    }
    n.inherits(b, g),
      (e.exports = b),
      (b.blockSize = 1024),
      (b.outSize = 512),
      (b.hmacStrength = 192),
      (b.padLength = 128),
      (b.prototype._prepareBlock = function (e, t) {
        for (var r = this.W, n = 0; n < 32; n++) r[n] = e[t + n];
        for (; n < r.length; n += 2) {
          var i = N(r[n - 4], r[n - 3]),
            a = D(r[n - 4], r[n - 3]),
            s = r[n - 14],
            o = r[n - 13],
            u = E(r[n - 30], r[n - 29]),
            c = U(r[n - 30], r[n - 29]),
            l = r[n - 32],
            h = r[n - 31];
          (r[n] = f(i, a, s, o, u, c, l, h)),
            (r[n + 1] = p(i, a, s, o, u, c, l, h));
        }
      }),
      (b.prototype._update = function (e, t) {
        this._prepareBlock(e, t);
        var r = this.W,
          n = this.h[0],
          i = this.h[1],
          s = this.h[2],
          o = this.h[3],
          u = this.h[4],
          c = this.h[5],
          f = this.h[6],
          p = this.h[7],
          g = this.h[8],
          v = this.h[9],
          b = this.h[10],
          E = this.h[11],
          U = this.h[12],
          N = this.h[13],
          D = this.h[14],
          O = this.h[15];
        a(this.k.length === r.length);
        for (var R = 0; R < r.length; R += 2) {
          var P = D,
            B = O,
            C = S(g, v),
            F = T(g, v),
            K = m(g, v, b, E, U),
            j = w(g, v, b, E, U, N),
            L = this.k[R],
            I = this.k[R + 1],
            Z = r[R],
            H = r[R + 1],
            M = y(P, B, C, F, K, j, L, I, Z, H),
            V = _(P, B, C, F, K, j, L, I, Z, H);
          (P = k(n, i)),
            (B = A(n, i)),
            (C = x(n, i, s, o, u)),
            (F = z(n, i, s, o, u, c));
          var W = h(P, B, C, F),
            G = d(P, B, C, F);
          (D = U),
            (O = N),
            (U = b),
            (N = E),
            (b = g),
            (E = v),
            (g = h(f, p, M, V)),
            (v = d(p, p, M, V)),
            (f = u),
            (p = c),
            (u = s),
            (c = o),
            (s = n),
            (o = i),
            (n = h(M, V, W, G)),
            (i = d(M, V, W, G));
        }
        l(this.h, 0, n, i),
          l(this.h, 2, s, o),
          l(this.h, 4, u, c),
          l(this.h, 6, f, p),
          l(this.h, 8, g, v),
          l(this.h, 10, b, E),
          l(this.h, 12, U, N),
          l(this.h, 14, D, O);
      }),
      (b.prototype._digest = function (e) {
        return "hex" === e
          ? n.toHex32(this.h, "big")
          : n.split32(this.h, "big");
      });
  },
  function (e, t, r) {
    "use strict";
    var n,
      i =
        (this && this.__extends) ||
        ((n = function (e, t) {
          return (n =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            })(e, t);
        }),
        function (e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Class extends value " +
                String(t) +
                " is not a constructor or null"
            );
          function r() {
            this.constructor = e;
          }
          n(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((r.prototype = t.prototype), new r()));
        });
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.RpcError = void 0);
    var a = (function (e) {
      function t(r) {
        var n = this;
        return (
          r.error &&
          r.error.details &&
          r.error.details.length &&
          r.error.details[0].message
            ? ((n = e.call(this, r.error.details[0].message) || this).details =
                r.error.details)
            : r.processed && r.processed.except && r.processed.except.message
            ? ((n = e.call(this, r.processed.except.message) || this).details =
                r.processed.except)
            : r.result && r.result.except && r.result.except.message
            ? ((n = e.call(this, r.result.except.message) || this).details =
                r.result.except)
            : (n = e.call(this, r.message) || this),
          Object.setPrototypeOf(n, t.prototype),
          (n.json = r),
          n
        );
      }
      return i(t, e), t;
    })(Error);
    t.RpcError = a;
  },
  function (e, t, r) {
    "use strict";
    var n =
        (this && this.__assign) ||
        function () {
          return (n =
            Object.assign ||
            function (e) {
              for (var t, r = 1, n = arguments.length; r < n; r++)
                for (var i in (t = arguments[r]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        },
      i =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, a) {
            function s(e) {
              try {
                u(n.next(e));
              } catch (e) {
                a(e);
              }
            }
            function o(e) {
              try {
                u(n.throw(e));
              } catch (e) {
                a(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function (e) {
                        e(t);
                      })).then(s, o);
            }
            u((n = n.apply(e, t || [])).next());
          });
        },
      a =
        (this && this.__generator) ||
        function (e, t) {
          var r,
            n,
            i,
            a,
            s = {
              label: 0,
              sent: function () {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (a = { next: o(0), throw: o(1), return: o(2) }),
            "function" == typeof Symbol &&
              (a[Symbol.iterator] = function () {
                return this;
              }),
            a
          );
          function o(a) {
            return function (o) {
              return (function (a) {
                if (r) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((r = 1),
                      n &&
                        (i =
                          2 & a[0]
                            ? n.return
                            : a[0]
                            ? n.throw || ((i = n.return) && i.call(n), 0)
                            : n.next) &&
                        !(i = i.call(n, a[1])).done)
                    )
                      return i;
                    switch (((n = 0), i && (a = [2 & a[0], i.value]), a[0])) {
                      case 0:
                      case 1:
                        i = a;
                        break;
                      case 4:
                        return s.label++, { value: a[1], done: !1 };
                      case 5:
                        s.label++, (n = a[1]), (a = [0]);
                        continue;
                      case 7:
                        (a = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
                          (6 === a[0] || 2 === a[0])
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === a[0] &&
                          (!i || (a[1] > i[0] && a[1] < i[3]))
                        ) {
                          s.label = a[1];
                          break;
                        }
                        if (6 === a[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = a);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(a);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    a = t.call(e, s);
                  } catch (e) {
                    (a = [6, e]), (n = 0);
                  } finally {
                    r = i = 0;
                  }
                if (5 & a[0]) throw a[1];
                return { value: a[0] ? a[1] : void 0, done: !0 };
              })([a, o]);
            };
          }
        },
      s =
        (this && this.__read) ||
        function (e, t) {
          var r = "function" == typeof Symbol && e[Symbol.iterator];
          if (!r) return e;
          var n,
            i,
            a = r.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(n = a.next()).done; )
              s.push(n.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              n && !n.done && (r = a.return) && r.call(a);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
      o =
        (this && this.__spread) ||
        function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(s(arguments[t]));
          return e;
        },
      u =
        (this && this.__values) ||
        function (e) {
          var t = "function" == typeof Symbol && Symbol.iterator,
            r = t && e[t],
            n = 0;
          if (r) return r.call(e);
          if (e && "number" == typeof e.length)
            return {
              next: function () {
                return (
                  e && n >= e.length && (e = void 0),
                  { value: e && e[n++], done: !e }
                );
              },
            };
          throw new TypeError(
            t ? "Object is not iterable." : "Symbol.iterator is not defined."
          );
        };
    Object.defineProperty(t, "__esModule", { value: !0 });
    var c = r(10),
      l = r(26),
      h = (function () {
        function e(e) {
          var t = this,
            r = e.rpcEndpoint,
            n = e.tryAutoLogin,
            s = void 0 === n || n,
            o = e.userAccount,
            u = e.pubKeys,
            h = e.apiSigner,
            f = e.waxSigningURL,
            p = void 0 === f ? "https://all-access.wax.io" : f,
            y = e.waxAutoSigningURL,
            _ =
              void 0 === y
                ? "https://api-idm.wax.io/v1/accounts/auto-accept/"
                : y,
            g = e.eosApiArgs,
            v = void 0 === g ? {} : g,
            b = e.freeBandwidth,
            m = void 0 === b || b,
            w = e.verifyTx,
            x = void 0 === w ? d : w;
          (this.signingApi = new l.WaxSigningApi(p, _)),
            (this.rpc = new c.JsonRpc(r)),
            (this.waxSigningURL = p),
            (this.waxAutoSigningURL = _),
            (this.apiSigner = h),
            (this.eosApiArgs = v),
            (this.freeBandwidth = m),
            (this.verifyTx = x),
            o && Array.isArray(u)
              ? this.receiveLogin({ account: o, keys: u })
              : s &&
                this.signingApi.tryAutologin().then(function (e) {
                  return i(t, void 0, void 0, function () {
                    var t;
                    return a(this, function (r) {
                      switch (r.label) {
                        case 0:
                          return e
                            ? ((t = this.receiveLogin),
                              [4, this.signingApi.login()])
                            : [3, 2];
                        case 1:
                          t.apply(this, [r.sent()]), (r.label = 2);
                        case 2:
                          return [2];
                      }
                    });
                  });
                });
        }
        return (
          Object.defineProperty(e.prototype, "userAccount", {
            get: function () {
              return this.user && this.user.account;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, "pubKeys", {
            get: function () {
              return this.user && this.user.keys;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.login = function () {
            return i(this, void 0, void 0, function () {
              var e;
              return a(this, function (t) {
                switch (t.label) {
                  case 0:
                    return this.user
                      ? [3, 2]
                      : ((e = this.receiveLogin), [4, this.signingApi.login()]);
                  case 1:
                    e.apply(this, [t.sent()]), (t.label = 2);
                  case 2:
                    return [2, this.user.account];
                }
              });
            });
          }),
          (e.prototype.isAutoLoginAvailable = function () {
            return i(this, void 0, void 0, function () {
              var e;
              return a(this, function (t) {
                switch (t.label) {
                  case 0:
                    return this.user ? [2, !0] : [3, 1];
                  case 1:
                    return [4, this.signingApi.tryAutologin()];
                  case 2:
                    return t.sent()
                      ? ((e = this.receiveLogin), [4, this.signingApi.login()])
                      : [3, 4];
                  case 3:
                    return e.apply(this, [t.sent()]), [2, !0];
                  case 4:
                    return [2, !1];
                }
              });
            });
          }),
          (e.prototype.receiveLogin = function (e) {
            var t = this;
            this.user = e;
            var r = {
              getAvailableKeys: function () {
                return i(t, void 0, void 0, function () {
                  var e, t;
                  return a(this, function (r) {
                    switch (r.label) {
                      case 0:
                        return (
                          (e = [this.user.keys]),
                          (t = this.apiSigner)
                            ? [4, this.apiSigner.getAvailableKeys()]
                            : [3, 2]
                        );
                      case 1:
                        (t = r.sent()), (r.label = 2);
                      case 2:
                        return [2, o.apply(void 0, e.concat([t || []]))];
                    }
                  });
                });
              },
              sign: function (e) {
                return i(t, void 0, void 0, function () {
                  var t, r, n, i, s, u, c, l;
                  return a(this, function (a) {
                    switch (a.label) {
                      case 0:
                        return [
                          4,
                          this.api.deserializeTransactionWithActions(
                            e.serializedTransaction
                          ),
                        ];
                      case 1:
                        return (
                          (t = a.sent()),
                          [
                            4,
                            this.signingApi.signing(
                              t,
                              e.serializedTransaction,
                              !this.freeBandwidth
                            ),
                          ]
                        );
                      case 2:
                        return (
                          (r = a.sent()),
                          (n = r.serializedTransaction),
                          (i = r.signatures),
                          [4, this.api.deserializeTransactionWithActions(n)]
                        );
                      case 3:
                        return (
                          (s = a.sent()),
                          this.verifyTx(this.user, t, s),
                          (e.serializedTransaction = n),
                          (u = { serializedTransaction: n }),
                          (c = [i]),
                          (l = this.apiSigner)
                            ? [4, this.apiSigner.sign(e)]
                            : [3, 5]
                        );
                      case 4:
                        (l = a.sent().signatures), (a.label = 5);
                      case 5:
                        return [
                          2,
                          ((u.signatures = o.apply(
                            void 0,
                            c.concat([l || []])
                          )),
                          u),
                        ];
                    }
                  });
                });
              },
            };
            this.api = new c.Api(
              n(n({}, this.eosApiArgs), { rpc: this.rpc, signatureProvider: r })
            );
            var s = this.api.transact.bind(this.api);
            this.api.transact = function (e, r) {
              return i(t, void 0, void 0, function () {
                return a(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [4, this.signingApi.prepareTransaction(e)];
                    case 1:
                      return t.sent(), [4, s(e, r)];
                    case 2:
                      return [2, t.sent()];
                  }
                });
              });
            };
          }),
          e
        );
      })();
    function d(e, t, r) {
      var n,
        i,
        a = t.actions,
        s = r.actions;
      if (JSON.stringify(a) !== JSON.stringify(s.slice(s.length - a.length)))
        throw new Error(
          "Augmented transaction actions has modified actions from the original.\nOriginal: " +
            JSON.stringify(a, void 0, 2) +
            "\nAugmented: " +
            JSON.stringify(s, void 0, 2)
        );
      try {
        for (
          var o = u(s.slice(0, s.length - a.length)), c = o.next();
          !c.done;
          c = o.next()
        ) {
          if (
            c.value.authorization.find(function (t) {
              return t.actor === e.account;
            })
          )
            throw new Error(
              "Augmented transaction actions has an extra action from the original authorizing the user.\nOriginal: " +
                JSON.stringify(a, void 0, 2) +
                "\nAugmented: " +
                JSON.stringify(s, void 0, 2)
            );
        }
      } catch (e) {
        n = { error: e };
      } finally {
        try {
          c && !c.done && (i = o.return) && i.call(o);
        } finally {
          if (n) throw n.error;
        }
      }
    }
    t.WaxJS = h;
  },
  function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.Serialize =
        t.RpcError =
        t.RpcInterfaces =
        t.Numeric =
        t.JsonRpc =
        t.ApiInterfaces =
        t.Api =
          void 0);
    var n = r(11);
    Object.defineProperty(t, "Api", {
      enumerable: !0,
      get: function () {
        return n.Api;
      },
    });
    var i = r(22);
    t.ApiInterfaces = i;
    var a = r(23);
    Object.defineProperty(t, "JsonRpc", {
      enumerable: !0,
      get: function () {
        return a.JsonRpc;
      },
    });
    var s = r(3);
    t.Numeric = s;
    var o = r(25);
    t.RpcInterfaces = o;
    var u = r(8);
    Object.defineProperty(t, "RpcError", {
      enumerable: !0,
      get: function () {
        return u.RpcError;
      },
    });
    var c = r(4);
    t.Serialize = c;
  },
  function (e, t, r) {
    "use strict";
    var n =
        (this && this.__assign) ||
        function () {
          return (n =
            Object.assign ||
            function (e) {
              for (var t, r = 1, n = arguments.length; r < n; r++)
                for (var i in (t = arguments[r]))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }).apply(this, arguments);
        },
      i =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, a) {
            function s(e) {
              try {
                u(n.next(e));
              } catch (e) {
                a(e);
              }
            }
            function o(e) {
              try {
                u(n.throw(e));
              } catch (e) {
                a(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function (e) {
                        e(t);
                      })).then(s, o);
            }
            u((n = n.apply(e, t || [])).next());
          });
        },
      a =
        (this && this.__generator) ||
        function (e, t) {
          var r,
            n,
            i,
            a,
            s = {
              label: 0,
              sent: function () {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (a = { next: o(0), throw: o(1), return: o(2) }),
            "function" == typeof Symbol &&
              (a[Symbol.iterator] = function () {
                return this;
              }),
            a
          );
          function o(a) {
            return function (o) {
              return (function (a) {
                if (r) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((r = 1),
                      n &&
                        (i =
                          2 & a[0]
                            ? n.return
                            : a[0]
                            ? n.throw || ((i = n.return) && i.call(n), 0)
                            : n.next) &&
                        !(i = i.call(n, a[1])).done)
                    )
                      return i;
                    switch (((n = 0), i && (a = [2 & a[0], i.value]), a[0])) {
                      case 0:
                      case 1:
                        i = a;
                        break;
                      case 4:
                        return s.label++, { value: a[1], done: !1 };
                      case 5:
                        s.label++, (n = a[1]), (a = [0]);
                        continue;
                      case 7:
                        (a = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
                          (6 === a[0] || 2 === a[0])
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === a[0] &&
                          (!i || (a[1] > i[0] && a[1] < i[3]))
                        ) {
                          s.label = a[1];
                          break;
                        }
                        if (6 === a[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = a);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(a);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    a = t.call(e, s);
                  } catch (e) {
                    (a = [6, e]), (n = 0);
                  } finally {
                    r = i = 0;
                  }
                if (5 & a[0]) throw a[1];
                return { value: a[0] ? a[1] : void 0, done: !0 };
              })([a, o]);
            };
          }
        },
      s =
        (this && this.__read) ||
        function (e, t) {
          var r = "function" == typeof Symbol && e[Symbol.iterator];
          if (!r) return e;
          var n,
            i,
            a = r.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(n = a.next()).done; )
              s.push(n.value);
          } catch (e) {
            i = { error: e };
          } finally {
            try {
              n && !n.done && (r = a.return) && r.call(a);
            } finally {
              if (i) throw i.error;
            }
          }
          return s;
        },
      o =
        (this && this.__spreadArray) ||
        function (e, t) {
          for (var r = 0, n = t.length, i = e.length; r < n; r++, i++)
            e[i] = t[r];
          return e;
        },
      u =
        (this && this.__values) ||
        function (e) {
          var t = "function" == typeof Symbol && Symbol.iterator,
            r = t && e[t],
            n = 0;
          if (r) return r.call(e);
          if (e && "number" == typeof e.length)
            return {
              next: function () {
                return (
                  e && n >= e.length && (e = void 0),
                  { value: e && e[n++], done: !e }
                );
              },
            };
          throw new TypeError(
            t ? "Object is not iterable." : "Symbol.iterator is not defined."
          );
        };
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.ActionBuilder = t.TransactionBuilder = t.Api = void 0);
    var c = r(12),
      l = r(4),
      h = (function () {
        function e(e) {
          (this.contracts = new Map()),
            (this.cachedAbis = new Map()),
            (this.transactionExtensions = [
              {
                id: 1,
                type: "resource_payer",
                keys: [
                  "payer",
                  "max_net_bytes",
                  "max_cpu_us",
                  "max_memory_bytes",
                ],
              },
            ]),
            (this.rpc = e.rpc),
            (this.authorityProvider = e.authorityProvider || e.rpc),
            (this.abiProvider = e.abiProvider || e.rpc),
            (this.signatureProvider = e.signatureProvider),
            (this.chainId = e.chainId),
            (this.textEncoder = e.textEncoder),
            (this.textDecoder = e.textDecoder),
            (this.abiTypes = l.getTypesFromAbi(l.createAbiTypes())),
            (this.transactionTypes = l.getTypesFromAbi(
              l.createTransactionTypes()
            ));
        }
        return (
          (e.prototype.rawAbiToJson = function (e) {
            var t = new l.SerialBuffer({
              textEncoder: this.textEncoder,
              textDecoder: this.textDecoder,
              array: e,
            });
            if (!l.supportedAbiVersion(t.getString()))
              throw new Error("Unsupported abi version");
            return t.restartRead(), this.abiTypes.get("abi_def").deserialize(t);
          }),
          (e.prototype.jsonToRawAbi = function (e) {
            var t = new l.SerialBuffer({
              textEncoder: this.textEncoder,
              textDecoder: this.textDecoder,
            });
            if (
              (this.abiTypes.get("abi_def").serialize(t, e),
              !l.supportedAbiVersion(t.getString()))
            )
              throw new Error("Unsupported abi version");
            return t.asUint8Array();
          }),
          (e.prototype.getCachedAbi = function (e, t) {
            return (
              void 0 === t && (t = !1),
              i(this, void 0, void 0, function () {
                var r, n, i, s;
                return a(this, function (a) {
                  switch (a.label) {
                    case 0:
                      if (!t && this.cachedAbis.get(e))
                        return [2, this.cachedAbis.get(e)];
                      a.label = 1;
                    case 1:
                      return (
                        a.trys.push([1, 3, , 4]),
                        [4, this.abiProvider.getRawAbi(e)]
                      );
                    case 2:
                      return (
                        (n = a.sent().abi),
                        (i = this.rawAbiToJson(n)),
                        (r = { rawAbi: n, abi: i }),
                        [3, 4]
                      );
                    case 3:
                      throw (
                        (((s = a.sent()).message =
                          "fetching abi for " + e + ": " + s.message),
                        s)
                      );
                    case 4:
                      if (!r) throw new Error("Missing abi for " + e);
                      return this.cachedAbis.set(e, r), [2, r];
                  }
                });
              })
            );
          }),
          (e.prototype.getAbi = function (e, t) {
            return (
              void 0 === t && (t = !1),
              i(this, void 0, void 0, function () {
                return a(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return [4, this.getCachedAbi(e, t)];
                    case 1:
                      return [2, r.sent().abi];
                  }
                });
              })
            );
          }),
          (e.prototype.getTransactionAbis = function (e, t) {
            return (
              void 0 === t && (t = !1),
              i(this, void 0, void 0, function () {
                var r,
                  n,
                  u,
                  c,
                  l = this;
                return a(this, function (h) {
                  return (
                    (r = (e.context_free_actions || []).concat(e.actions)),
                    (n = r.map(function (e) {
                      return e.account;
                    })),
                    (u = new Set(n)),
                    (c = o([], s(u)).map(function (e) {
                      return i(l, void 0, void 0, function () {
                        var r;
                        return a(this, function (n) {
                          switch (n.label) {
                            case 0:
                              return (
                                (r = { accountName: e }),
                                [4, this.getCachedAbi(e, t)]
                              );
                            case 1:
                              return [2, ((r.abi = n.sent().rawAbi), r)];
                          }
                        });
                      });
                    })),
                    [2, Promise.all(c)]
                  );
                });
              })
            );
          }),
          (e.prototype.getContract = function (e, t) {
            return (
              void 0 === t && (t = !1),
              i(this, void 0, void 0, function () {
                var r, n, i, s, o, c, h, d, f, p, y;
                return a(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return !t && this.contracts.get(e)
                        ? [2, this.contracts.get(e)]
                        : [4, this.getAbi(e, t)];
                    case 1:
                      (r = a.sent()),
                        (n = l.getTypesFromAbi(l.createInitialTypes(), r)),
                        (i = new Map());
                      try {
                        for (
                          s = u(r.actions), o = s.next();
                          !o.done;
                          o = s.next()
                        )
                          (c = o.value),
                            (h = c.name),
                            (d = c.type),
                            i.set(h, l.getType(n, d));
                      } catch (e) {
                        p = { error: e };
                      } finally {
                        try {
                          o && !o.done && (y = s.return) && y.call(s);
                        } finally {
                          if (p) throw p.error;
                        }
                      }
                      return (
                        (f = { types: n, actions: i }),
                        this.contracts.set(e, f),
                        [2, f]
                      );
                  }
                });
              })
            );
          }),
          (e.prototype.serialize = function (e, t, r) {
            this.transactionTypes.get(t).serialize(e, r);
          }),
          (e.prototype.deserialize = function (e, t) {
            return this.transactionTypes.get(t).deserialize(e);
          }),
          (e.prototype.serializeTransaction = function (e) {
            var t = new l.SerialBuffer({
              textEncoder: this.textEncoder,
              textDecoder: this.textDecoder,
            });
            return (
              this.serialize(
                t,
                "transaction",
                n(
                  {
                    max_net_usage_words: 0,
                    max_cpu_usage_ms: 0,
                    delay_sec: 0,
                    context_free_actions: [],
                    actions: [],
                    transaction_extensions: [],
                  },
                  e
                )
              ),
              t.asUint8Array()
            );
          }),
          (e.prototype.serializeContextFreeData = function (e) {
            var t, r;
            if (!e || !e.length) return null;
            var n = new l.SerialBuffer({
              textEncoder: this.textEncoder,
              textDecoder: this.textDecoder,
            });
            n.pushVaruint32(e.length);
            try {
              for (var i = u(e), a = i.next(); !a.done; a = i.next()) {
                var s = a.value;
                n.pushBytes(s);
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                a && !a.done && (r = i.return) && r.call(i);
              } finally {
                if (t) throw t.error;
              }
            }
            return n.asUint8Array();
          }),
          (e.prototype.deserializeTransaction = function (e) {
            var t = new l.SerialBuffer({
              textEncoder: this.textEncoder,
              textDecoder: this.textDecoder,
            });
            return t.pushArray(e), this.deserialize(t, "transaction");
          }),
          (e.prototype.serializeTransactionExtensions = function (e) {
            var t = [];
            if (e.resource_payer) {
              var r = new l.SerialBuffer({
                textEncoder: this.textEncoder,
                textDecoder: this.textDecoder,
              });
              l
                .getTypesFromAbi(l.createTransactionExtensionTypes())
                .get("resource_payer")
                .serialize(r, e.resource_payer),
                (t = o(o([], s(t)), [[1, l.arrayToHex(r.asUint8Array())]]));
            }
            return t;
          }),
          (e.prototype.deserializeTransactionExtensions = function (e) {
            var t = this,
              r = {};
            return (
              e.forEach(function (e) {
                var n = t.transactionExtensions.find(function (t) {
                  return t.id === e[0];
                });
                if (void 0 === n)
                  throw new Error(
                    "Transaction Extension could not be determined: " + e
                  );
                var i = l.getTypesFromAbi(l.createTransactionExtensionTypes()),
                  a = new l.SerialBuffer({
                    textEncoder: t.textEncoder,
                    textDecoder: t.textDecoder,
                  });
                a.pushArray(l.hexToUint8Array(e[1]));
                var s = i.get(n.type).deserialize(a);
                1 === e[0] &&
                  ((s.max_net_bytes = Number(s.max_net_bytes)),
                  (s.max_cpu_us = Number(s.max_cpu_us)),
                  (s.max_memory_bytes = Number(s.max_memory_bytes)),
                  (r.resource_payer = s));
              }),
              r
            );
          }),
          (e.prototype.deleteTransactionExtensionObjects = function (e) {
            return delete e.resource_payer, e;
          }),
          (e.prototype.serializeActions = function (e) {
            return i(this, void 0, void 0, function () {
              var t = this;
              return a(this, function (r) {
                switch (r.label) {
                  case 0:
                    return [
                      4,
                      Promise.all(
                        e.map(function (e) {
                          return i(t, void 0, void 0, function () {
                            var t, r, n, i, s;
                            return a(this, function (a) {
                              switch (a.label) {
                                case 0:
                                  return (
                                    (t = e.account),
                                    (r = e.name),
                                    (n = e.authorization),
                                    (i = e.data),
                                    [4, this.getContract(t)]
                                  );
                                case 1:
                                  return (
                                    (s = a.sent()),
                                    "object" != typeof i
                                      ? [2, e]
                                      : [
                                          2,
                                          l.serializeAction(
                                            s,
                                            t,
                                            r,
                                            n,
                                            i,
                                            this.textEncoder,
                                            this.textDecoder
                                          ),
                                        ]
                                  );
                              }
                            });
                          });
                        })
                      ),
                    ];
                  case 1:
                    return [2, r.sent()];
                }
              });
            });
          }),
          (e.prototype.deserializeActions = function (e) {
            return i(this, void 0, void 0, function () {
              var t = this;
              return a(this, function (r) {
                switch (r.label) {
                  case 0:
                    return [
                      4,
                      Promise.all(
                        e.map(function (e) {
                          var r = e.account,
                            n = e.name,
                            s = e.authorization,
                            o = e.data;
                          return i(t, void 0, void 0, function () {
                            var e;
                            return a(this, function (t) {
                              switch (t.label) {
                                case 0:
                                  return [4, this.getContract(r)];
                                case 1:
                                  return (
                                    (e = t.sent()),
                                    [
                                      2,
                                      l.deserializeAction(
                                        e,
                                        r,
                                        n,
                                        s,
                                        o,
                                        this.textEncoder,
                                        this.textDecoder
                                      ),
                                    ]
                                  );
                              }
                            });
                          });
                        })
                      ),
                    ];
                  case 1:
                    return [2, r.sent()];
                }
              });
            });
          }),
          (e.prototype.deserializeTransactionWithActions = function (e) {
            return i(this, void 0, void 0, function () {
              var t, r, i;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    return (
                      "string" == typeof e && (e = l.hexToUint8Array(e)),
                      (t = this.deserializeTransaction(e)),
                      [4, this.deserializeActions(t.context_free_actions)]
                    );
                  case 1:
                    return (
                      (r = a.sent()), [4, this.deserializeActions(t.actions)]
                    );
                  case 2:
                    return (
                      (i = a.sent()),
                      [2, n(n({}, t), { context_free_actions: r, actions: i })]
                    );
                }
              });
            });
          }),
          (e.prototype.deflateSerializedArray = function (e) {
            return c.deflate(e, { level: 9 });
          }),
          (e.prototype.inflateSerializedArray = function (e) {
            return c.inflate(e);
          }),
          (e.prototype.transact = function (e, t) {
            var r = void 0 === t ? {} : t,
              s = r.broadcast,
              o = void 0 === s || s,
              u = r.sign,
              c = void 0 === u || u,
              l = r.readOnlyTrx,
              h = r.returnFailureTraces,
              d = r.requiredKeys,
              f = r.compression,
              p = r.blocksBehind,
              y = r.useLastIrreversible,
              _ = r.expireSeconds;
            return i(this, void 0, void 0, function () {
              var t, r, i, s, u, g, v, b;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    if ("number" == typeof p && y)
                      throw new Error(
                        "Use either blocksBehind or useLastIrreversible"
                      );
                    return this.chainId ? [3, 2] : [4, this.rpc.get_info()];
                  case 1:
                    (t = a.sent()), (this.chainId = t.chain_id), (a.label = 2);
                  case 2:
                    return ("number" != typeof p && !y) || !_
                      ? [3, 4]
                      : [4, this.generateTapos(t, e, p, y, _)];
                  case 3:
                    (e = a.sent()), (a.label = 4);
                  case 4:
                    if (!this.hasRequiredTaposFields(e))
                      throw new Error(
                        "Required configuration or TAPOS fields are not present"
                      );
                    return [4, this.getTransactionAbis(e)];
                  case 5:
                    return (
                      (r = a.sent()),
                      (i = [n({}, e)]),
                      (b = {}),
                      [4, this.serializeTransactionExtensions(e)]
                    );
                  case 6:
                    return (
                      (b.transaction_extensions = a.sent()),
                      [4, this.serializeActions(e.context_free_actions || [])]
                    );
                  case 7:
                    return (
                      (b.context_free_actions = a.sent()),
                      [4, this.serializeActions(e.actions)]
                    );
                  case 8:
                    return (
                      (e = n.apply(
                        void 0,
                        i.concat([((b.actions = a.sent()), b)])
                      )),
                      (e = this.deleteTransactionExtensionObjects(e)),
                      (s = this.serializeTransaction(e)),
                      (u = this.serializeContextFreeData(e.context_free_data)),
                      (g = {
                        serializedTransaction: s,
                        serializedContextFreeData: u,
                        signatures: [],
                      }),
                      c
                        ? d
                          ? [3, 11]
                          : [4, this.signatureProvider.getAvailableKeys()]
                        : [3, 13]
                    );
                  case 9:
                    return (
                      (v = a.sent()),
                      [
                        4,
                        this.authorityProvider.getRequiredKeys({
                          transaction: e,
                          availableKeys: v,
                        }),
                      ]
                    );
                  case 10:
                    (d = a.sent()), (a.label = 11);
                  case 11:
                    return [
                      4,
                      this.signatureProvider.sign({
                        chainId: this.chainId,
                        requiredKeys: d,
                        serializedTransaction: s,
                        serializedContextFreeData: u,
                        abis: r,
                      }),
                    ];
                  case 12:
                    (g = a.sent()), (a.label = 13);
                  case 13:
                    return o
                      ? f
                        ? [2, this.pushCompressedSignedTransaction(g, l, h)]
                        : [2, this.pushSignedTransaction(g, l, h)]
                      : [2, g];
                }
              });
            });
          }),
          (e.prototype.query = function (e, t, r, s) {
            var o = s.sign,
              u = s.requiredKeys,
              c = s.authorization,
              h = void 0 === c ? [] : c;
            return i(this, void 0, void 0, function () {
              var i, s, c, d, f, p, y, _, g, v, b;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    return [4, this.rpc.get_info()];
                  case 1:
                    return (i = a.sent()), [4, this.tryRefBlockFromGetInfo(i)];
                  case 2:
                    return (
                      (s = a.sent()),
                      (c = new l.SerialBuffer({
                        textEncoder: this.textEncoder,
                        textDecoder: this.textDecoder,
                      })),
                      l.serializeQuery(c, r),
                      (d = n(n({}, l.transactionHeader(s, 1800)), {
                        context_free_actions: [],
                        actions: [
                          {
                            account: e,
                            name: "queryit",
                            authorization: h,
                            data: l.arrayToHex(c.asUint8Array()),
                          },
                        ],
                      })),
                      (f = this.serializeTransaction(d)),
                      (p = []),
                      o ? [4, this.getTransactionAbis(d)] : [3, 8]
                    );
                  case 3:
                    return (
                      (y = a.sent()),
                      u
                        ? [3, 6]
                        : [4, this.signatureProvider.getAvailableKeys()]
                    );
                  case 4:
                    return (
                      (_ = a.sent()),
                      [
                        4,
                        this.authorityProvider.getRequiredKeys({
                          transaction: d,
                          availableKeys: _,
                        }),
                      ]
                    );
                  case 5:
                    (u = a.sent()), (a.label = 6);
                  case 6:
                    return [
                      4,
                      this.signatureProvider.sign({
                        chainId: this.chainId,
                        requiredKeys: u,
                        serializedTransaction: f,
                        serializedContextFreeData: null,
                        abis: y,
                      }),
                    ];
                  case 7:
                    (g = a.sent()), (p = g.signatures), (a.label = 8);
                  case 8:
                    return [
                      4,
                      this.rpc.send_transaction({
                        signatures: p,
                        compression: 0,
                        serializedTransaction: f,
                      }),
                    ];
                  case 9:
                    return (
                      (v = a.sent()),
                      (b = new l.SerialBuffer({
                        textEncoder: this.textEncoder,
                        textDecoder: this.textDecoder,
                        array: l.hexToUint8Array(
                          v.processed.action_traces[0][1].return_value
                        ),
                      })),
                      t
                        ? [2, l.deserializeAnyvarShort(b)]
                        : [2, l.deserializeAnyvar(b)]
                    );
                }
              });
            });
          }),
          (e.prototype.pushSignedTransaction = function (e, t, r) {
            var n = e.signatures,
              s = e.serializedTransaction,
              o = e.serializedContextFreeData;
            return (
              void 0 === t && (t = !1),
              void 0 === r && (r = !1),
              i(this, void 0, void 0, function () {
                return a(this, function (e) {
                  return t
                    ? [
                        2,
                        this.rpc.push_ro_transaction(
                          {
                            signatures: n,
                            serializedTransaction: s,
                            serializedContextFreeData: o,
                          },
                          r
                        ),
                      ]
                    : [
                        2,
                        this.rpc.push_transaction({
                          signatures: n,
                          serializedTransaction: s,
                          serializedContextFreeData: o,
                        }),
                      ];
                });
              })
            );
          }),
          (e.prototype.pushCompressedSignedTransaction = function (e, t, r) {
            var n = e.signatures,
              s = e.serializedTransaction,
              o = e.serializedContextFreeData;
            return (
              void 0 === t && (t = !1),
              void 0 === r && (r = !1),
              i(this, void 0, void 0, function () {
                var e, i;
                return a(this, function (a) {
                  return (
                    (e = this.deflateSerializedArray(s)),
                    (i = this.deflateSerializedArray(o || new Uint8Array(0))),
                    t
                      ? [
                          2,
                          this.rpc.push_ro_transaction(
                            {
                              signatures: n,
                              compression: 1,
                              serializedTransaction: e,
                              serializedContextFreeData: i,
                            },
                            r
                          ),
                        ]
                      : [
                          2,
                          this.rpc.push_transaction({
                            signatures: n,
                            compression: 1,
                            serializedTransaction: e,
                            serializedContextFreeData: i,
                          }),
                        ]
                  );
                });
              })
            );
          }),
          (e.prototype.generateTapos = function (e, t, r, s, o) {
            return i(this, void 0, void 0, function () {
              var i, u, c, h;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    return e ? [3, 2] : [4, this.rpc.get_info()];
                  case 1:
                    (e = a.sent()), (a.label = 2);
                  case 2:
                    return s ? [4, this.tryRefBlockFromGetInfo(e)] : [3, 4];
                  case 3:
                    return (
                      (i = a.sent()),
                      [2, n(n({}, l.transactionHeader(i, o)), t)]
                    );
                  case 4:
                    return (u = e.head_block_num - r) <=
                      e.last_irreversible_block_num
                      ? [4, this.tryGetBlockInfo(u)]
                      : [3, 6];
                  case 5:
                    return (h = a.sent()), [3, 8];
                  case 6:
                    return [4, this.tryGetBlockHeaderState(u)];
                  case 7:
                    (h = a.sent()), (a.label = 8);
                  case 8:
                    return (c = h), [2, n(n({}, l.transactionHeader(c, o)), t)];
                }
              });
            });
          }),
          (e.prototype.hasRequiredTaposFields = function (e) {
            var t = e.expiration,
              r = e.ref_block_num,
              n = e.ref_block_prefix;
            return !(!t || "number" != typeof r || "number" != typeof n);
          }),
          (e.prototype.tryGetBlockHeaderState = function (e) {
            return i(this, void 0, void 0, function () {
              return a(this, function (t) {
                switch (t.label) {
                  case 0:
                    return (
                      t.trys.push([0, 2, , 4]),
                      [4, this.rpc.get_block_header_state(e)]
                    );
                  case 1:
                    return [2, t.sent()];
                  case 2:
                    return t.sent(), [4, this.tryGetBlockInfo(e)];
                  case 3:
                    return [2, t.sent()];
                  case 4:
                    return [2];
                }
              });
            });
          }),
          (e.prototype.tryGetBlockInfo = function (e) {
            return i(this, void 0, void 0, function () {
              return a(this, function (t) {
                switch (t.label) {
                  case 0:
                    return (
                      t.trys.push([0, 2, , 4]), [4, this.rpc.get_block_info(e)]
                    );
                  case 1:
                    return [2, t.sent()];
                  case 2:
                    return t.sent(), [4, this.rpc.get_block(e)];
                  case 3:
                    return [2, t.sent()];
                  case 4:
                    return [2];
                }
              });
            });
          }),
          (e.prototype.tryRefBlockFromGetInfo = function (e) {
            return i(this, void 0, void 0, function () {
              var t;
              return a(this, function (r) {
                switch (r.label) {
                  case 0:
                    return e.hasOwnProperty("last_irreversible_block_id") &&
                      e.hasOwnProperty("last_irreversible_block_num") &&
                      e.hasOwnProperty("last_irreversible_block_time")
                      ? [
                          2,
                          {
                            block_num: e.last_irreversible_block_num,
                            id: e.last_irreversible_block_id,
                            timestamp: e.last_irreversible_block_time,
                          },
                        ]
                      : [3, 1];
                  case 1:
                    return [
                      4,
                      this.tryGetBlockInfo(e.last_irreversible_block_num),
                    ];
                  case 2:
                    return [
                      2,
                      {
                        block_num: (t = r.sent()).block_num,
                        id: t.id,
                        timestamp: t.timestamp,
                      },
                    ];
                }
              });
            });
          }),
          (e.prototype.with = function (e) {
            return new f(this, e);
          }),
          (e.prototype.buildTransaction = function (e) {
            var t = new d(this);
            return e ? e(t) : t;
          }),
          e
        );
      })();
    t.Api = h;
    var d = (function () {
      function e(e) {
        (this.actions = []), (this.contextFreeGroups = []), (this.api = e);
      }
      return (
        (e.prototype.with = function (e) {
          var t = new f(this.api, e);
          return this.actions.push(t), t;
        }),
        (e.prototype.associateContextFree = function (e) {
          return this.contextFreeGroups.push(e), this;
        }),
        (e.prototype.send = function (e) {
          return i(this, void 0, void 0, function () {
            var t,
              r,
              n,
              s = this;
            return a(this, function (o) {
              switch (o.label) {
                case 0:
                  return (
                    (t = []),
                    (r = []),
                    (n = this.actions.map(function (e) {
                      return e.serializedData;
                    })),
                    [
                      4,
                      Promise.all(
                        this.contextFreeGroups.map(function (e) {
                          return i(s, void 0, void 0, function () {
                            var i, s, o, u;
                            return a(this, function (a) {
                              return (
                                (i = e({ cfd: t.length, cfa: r.length })),
                                (s = i.action),
                                (o = i.contextFreeAction),
                                (u = i.contextFreeData),
                                s && n.push(s),
                                o && r.push(o),
                                u && t.push(u),
                                [2]
                              );
                            });
                          });
                        })
                      ),
                    ]
                  );
                case 1:
                  return (
                    o.sent(),
                    (this.contextFreeGroups = []),
                    (this.actions = []),
                    [
                      4,
                      this.api.transact(
                        {
                          context_free_data: t,
                          context_free_actions: r,
                          actions: n,
                        },
                        e
                      ),
                    ]
                  );
                case 2:
                  return [2, o.sent()];
              }
            });
          });
        }),
        e
      );
    })();
    t.TransactionBuilder = d;
    var f = (function () {
      function e(e, t) {
        (this.api = e), (this.accountName = t);
      }
      return (
        (e.prototype.as = function (e) {
          void 0 === e && (e = []);
          var t = [];
          return (
            (t =
              e && "string" == typeof e
                ? [{ actor: e, permission: "active" }]
                : e),
            new p(this, this.api, this.accountName, t)
          );
        }),
        e
      );
    })();
    t.ActionBuilder = f;
    var p = function (e, t, r, n) {
      var i,
        a,
        s = this,
        o = t.cachedAbis.get(r);
      if (!o)
        throw new Error(
          "ABI must be cached before using ActionBuilder, run api.getAbi()"
        );
      var c = l.getTypesFromAbi(l.createInitialTypes(), o.abi),
        h = new Map();
      try {
        for (var d = u(o.abi.actions), f = d.next(); !f.done; f = d.next()) {
          var p = f.value,
            y = p.name,
            _ = p.type;
          h.set(y, l.getType(c, _));
        }
      } catch (e) {
        i = { error: e };
      } finally {
        try {
          f && !f.done && (a = d.return) && a.call(d);
        } finally {
          if (i) throw i.error;
        }
      }
      h.forEach(function (i, a) {
        var o;
        Object.assign(
          s,
          (((o = {})[a] = function () {
            for (var s = [], o = 0; o < arguments.length; o++)
              s[o] = arguments[o];
            var u = {};
            s.forEach(function (e, t) {
              var r = i.fields[t];
              u[r.name] = e;
            });
            var d = l.serializeAction(
              { types: c, actions: h },
              r,
              a,
              n,
              u,
              t.textEncoder,
              t.textDecoder
            );
            return (e.serializedData = d), d;
          }),
          o)
        );
      });
    };
  },
  function (e, t, r) {
    "use strict";
    r.r(t),
      r.d(t, "Deflate", function () {
        return Yt;
      }),
      r.d(t, "Inflate", function () {
        return er;
      }),
      r.d(t, "constants", function () {
        return ir;
      }),
      r.d(t, "deflate", function () {
        return $t;
      }),
      r.d(t, "deflateRaw", function () {
        return Xt;
      }),
      r.d(t, "gzip", function () {
        return Qt;
      }),
      r.d(t, "inflate", function () {
        return tr;
      }),
      r.d(t, "inflateRaw", function () {
        return rr;
      }),
      r.d(t, "ungzip", function () {
        return nr;
      });
    function n(e) {
      let t = e.length;
      for (; --t >= 0; ) e[t] = 0;
    }
    const i = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4,
        5, 5, 5, 5, 0,
      ]),
      a = new Uint8Array([
        0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
        10, 11, 11, 12, 12, 13, 13,
      ]),
      s = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7,
      ]),
      o = new Uint8Array([
        16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
      ]),
      u = new Array(576);
    n(u);
    const c = new Array(60);
    n(c);
    const l = new Array(512);
    n(l);
    const h = new Array(256);
    n(h);
    const d = new Array(29);
    n(d);
    const f = new Array(30);
    function p(e, t, r, n, i) {
      (this.static_tree = e),
        (this.extra_bits = t),
        (this.extra_base = r),
        (this.elems = n),
        (this.max_length = i),
        (this.has_stree = e && e.length);
    }
    let y, _, g;
    function v(e, t) {
      (this.dyn_tree = e), (this.max_code = 0), (this.stat_desc = t);
    }
    n(f);
    const b = (e) => (e < 256 ? l[e] : l[256 + (e >>> 7)]),
      m = (e, t) => {
        (e.pending_buf[e.pending++] = 255 & t),
          (e.pending_buf[e.pending++] = (t >>> 8) & 255);
      },
      w = (e, t, r) => {
        e.bi_valid > 16 - r
          ? ((e.bi_buf |= (t << e.bi_valid) & 65535),
            m(e, e.bi_buf),
            (e.bi_buf = t >> (16 - e.bi_valid)),
            (e.bi_valid += r - 16))
          : ((e.bi_buf |= (t << e.bi_valid) & 65535), (e.bi_valid += r));
      },
      x = (e, t, r) => {
        w(e, r[2 * t], r[2 * t + 1]);
      },
      z = (e, t) => {
        let r = 0;
        do {
          (r |= 1 & e), (e >>>= 1), (r <<= 1);
        } while (--t > 0);
        return r >>> 1;
      },
      k = (e, t, r) => {
        const n = new Array(16);
        let i,
          a,
          s = 0;
        for (i = 1; i <= 15; i++) n[i] = s = (s + r[i - 1]) << 1;
        for (a = 0; a <= t; a++) {
          let t = e[2 * a + 1];
          0 !== t && (e[2 * a] = z(n[t]++, t));
        }
      },
      A = (e) => {
        let t;
        for (t = 0; t < 286; t++) e.dyn_ltree[2 * t] = 0;
        for (t = 0; t < 30; t++) e.dyn_dtree[2 * t] = 0;
        for (t = 0; t < 19; t++) e.bl_tree[2 * t] = 0;
        (e.dyn_ltree[512] = 1),
          (e.opt_len = e.static_len = 0),
          (e.last_lit = e.matches = 0);
      },
      S = (e) => {
        e.bi_valid > 8
          ? m(e, e.bi_buf)
          : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf),
          (e.bi_buf = 0),
          (e.bi_valid = 0);
      },
      T = (e, t, r, n) => {
        const i = 2 * t,
          a = 2 * r;
        return e[i] < e[a] || (e[i] === e[a] && n[t] <= n[r]);
      },
      E = (e, t, r) => {
        const n = e.heap[r];
        let i = r << 1;
        for (
          ;
          i <= e.heap_len &&
          (i < e.heap_len && T(t, e.heap[i + 1], e.heap[i], e.depth) && i++,
          !T(t, n, e.heap[i], e.depth));

        )
          (e.heap[r] = e.heap[i]), (r = i), (i <<= 1);
        e.heap[r] = n;
      },
      U = (e, t, r) => {
        let n,
          s,
          o,
          u,
          c = 0;
        if (0 !== e.last_lit)
          do {
            (n =
              (e.pending_buf[e.d_buf + 2 * c] << 8) |
              e.pending_buf[e.d_buf + 2 * c + 1]),
              (s = e.pending_buf[e.l_buf + c]),
              c++,
              0 === n
                ? x(e, s, t)
                : ((o = h[s]),
                  x(e, o + 256 + 1, t),
                  (u = i[o]),
                  0 !== u && ((s -= d[o]), w(e, s, u)),
                  n--,
                  (o = b(n)),
                  x(e, o, r),
                  (u = a[o]),
                  0 !== u && ((n -= f[o]), w(e, n, u)));
          } while (c < e.last_lit);
        x(e, 256, t);
      },
      N = (e, t) => {
        const r = t.dyn_tree,
          n = t.stat_desc.static_tree,
          i = t.stat_desc.has_stree,
          a = t.stat_desc.elems;
        let s,
          o,
          u,
          c = -1;
        for (e.heap_len = 0, e.heap_max = 573, s = 0; s < a; s++)
          0 !== r[2 * s]
            ? ((e.heap[++e.heap_len] = c = s), (e.depth[s] = 0))
            : (r[2 * s + 1] = 0);
        for (; e.heap_len < 2; )
          (u = e.heap[++e.heap_len] = c < 2 ? ++c : 0),
            (r[2 * u] = 1),
            (e.depth[u] = 0),
            e.opt_len--,
            i && (e.static_len -= n[2 * u + 1]);
        for (t.max_code = c, s = e.heap_len >> 1; s >= 1; s--) E(e, r, s);
        u = a;
        do {
          (s = e.heap[1]),
            (e.heap[1] = e.heap[e.heap_len--]),
            E(e, r, 1),
            (o = e.heap[1]),
            (e.heap[--e.heap_max] = s),
            (e.heap[--e.heap_max] = o),
            (r[2 * u] = r[2 * s] + r[2 * o]),
            (e.depth[u] =
              (e.depth[s] >= e.depth[o] ? e.depth[s] : e.depth[o]) + 1),
            (r[2 * s + 1] = r[2 * o + 1] = u),
            (e.heap[1] = u++),
            E(e, r, 1);
        } while (e.heap_len >= 2);
        (e.heap[--e.heap_max] = e.heap[1]),
          ((e, t) => {
            const r = t.dyn_tree,
              n = t.max_code,
              i = t.stat_desc.static_tree,
              a = t.stat_desc.has_stree,
              s = t.stat_desc.extra_bits,
              o = t.stat_desc.extra_base,
              u = t.stat_desc.max_length;
            let c,
              l,
              h,
              d,
              f,
              p,
              y = 0;
            for (d = 0; d <= 15; d++) e.bl_count[d] = 0;
            for (
              r[2 * e.heap[e.heap_max] + 1] = 0, c = e.heap_max + 1;
              c < 573;
              c++
            )
              (l = e.heap[c]),
                (d = r[2 * r[2 * l + 1] + 1] + 1),
                d > u && ((d = u), y++),
                (r[2 * l + 1] = d),
                l > n ||
                  (e.bl_count[d]++,
                  (f = 0),
                  l >= o && (f = s[l - o]),
                  (p = r[2 * l]),
                  (e.opt_len += p * (d + f)),
                  a && (e.static_len += p * (i[2 * l + 1] + f)));
            if (0 !== y) {
              do {
                for (d = u - 1; 0 === e.bl_count[d]; ) d--;
                e.bl_count[d]--,
                  (e.bl_count[d + 1] += 2),
                  e.bl_count[u]--,
                  (y -= 2);
              } while (y > 0);
              for (d = u; 0 !== d; d--)
                for (l = e.bl_count[d]; 0 !== l; )
                  (h = e.heap[--c]),
                    h > n ||
                      (r[2 * h + 1] !== d &&
                        ((e.opt_len += (d - r[2 * h + 1]) * r[2 * h]),
                        (r[2 * h + 1] = d)),
                      l--);
            }
          })(e, t),
          k(r, c, e.bl_count);
      },
      D = (e, t, r) => {
        let n,
          i,
          a = -1,
          s = t[1],
          o = 0,
          u = 7,
          c = 4;
        for (
          0 === s && ((u = 138), (c = 3)), t[2 * (r + 1) + 1] = 65535, n = 0;
          n <= r;
          n++
        )
          (i = s),
            (s = t[2 * (n + 1) + 1]),
            (++o < u && i === s) ||
              (o < c
                ? (e.bl_tree[2 * i] += o)
                : 0 !== i
                ? (i !== a && e.bl_tree[2 * i]++, e.bl_tree[32]++)
                : o <= 10
                ? e.bl_tree[34]++
                : e.bl_tree[36]++,
              (o = 0),
              (a = i),
              0 === s
                ? ((u = 138), (c = 3))
                : i === s
                ? ((u = 6), (c = 3))
                : ((u = 7), (c = 4)));
      },
      O = (e, t, r) => {
        let n,
          i,
          a = -1,
          s = t[1],
          o = 0,
          u = 7,
          c = 4;
        for (0 === s && ((u = 138), (c = 3)), n = 0; n <= r; n++)
          if (((i = s), (s = t[2 * (n + 1) + 1]), !(++o < u && i === s))) {
            if (o < c)
              do {
                x(e, i, e.bl_tree);
              } while (0 != --o);
            else
              0 !== i
                ? (i !== a && (x(e, i, e.bl_tree), o--),
                  x(e, 16, e.bl_tree),
                  w(e, o - 3, 2))
                : o <= 10
                ? (x(e, 17, e.bl_tree), w(e, o - 3, 3))
                : (x(e, 18, e.bl_tree), w(e, o - 11, 7));
            (o = 0),
              (a = i),
              0 === s
                ? ((u = 138), (c = 3))
                : i === s
                ? ((u = 6), (c = 3))
                : ((u = 7), (c = 4));
          }
      };
    let R = !1;
    const P = (e, t, r, n) => {
      w(e, 0 + (n ? 1 : 0), 3),
        ((e, t, r, n) => {
          S(e),
            n && (m(e, r), m(e, ~r)),
            e.pending_buf.set(e.window.subarray(t, t + r), e.pending),
            (e.pending += r);
        })(e, t, r, !0);
    };
    var B = {
      _tr_init: (e) => {
        R ||
          ((() => {
            let e, t, r, n, o;
            const v = new Array(16);
            for (r = 0, n = 0; n < 28; n++)
              for (d[n] = r, e = 0; e < 1 << i[n]; e++) h[r++] = n;
            for (h[r - 1] = n, o = 0, n = 0; n < 16; n++)
              for (f[n] = o, e = 0; e < 1 << a[n]; e++) l[o++] = n;
            for (o >>= 7; n < 30; n++)
              for (f[n] = o << 7, e = 0; e < 1 << (a[n] - 7); e++)
                l[256 + o++] = n;
            for (t = 0; t <= 15; t++) v[t] = 0;
            for (e = 0; e <= 143; ) (u[2 * e + 1] = 8), e++, v[8]++;
            for (; e <= 255; ) (u[2 * e + 1] = 9), e++, v[9]++;
            for (; e <= 279; ) (u[2 * e + 1] = 7), e++, v[7]++;
            for (; e <= 287; ) (u[2 * e + 1] = 8), e++, v[8]++;
            for (k(u, 287, v), e = 0; e < 30; e++)
              (c[2 * e + 1] = 5), (c[2 * e] = z(e, 5));
            (y = new p(u, i, 257, 286, 15)),
              (_ = new p(c, a, 0, 30, 15)),
              (g = new p(new Array(0), s, 0, 19, 7));
          })(),
          (R = !0)),
          (e.l_desc = new v(e.dyn_ltree, y)),
          (e.d_desc = new v(e.dyn_dtree, _)),
          (e.bl_desc = new v(e.bl_tree, g)),
          (e.bi_buf = 0),
          (e.bi_valid = 0),
          A(e);
      },
      _tr_stored_block: P,
      _tr_flush_block: (e, t, r, n) => {
        let i,
          a,
          s = 0;
        e.level > 0
          ? (2 === e.strm.data_type &&
              (e.strm.data_type = ((e) => {
                let t,
                  r = 4093624447;
                for (t = 0; t <= 31; t++, r >>>= 1)
                  if (1 & r && 0 !== e.dyn_ltree[2 * t]) return 0;
                if (
                  0 !== e.dyn_ltree[18] ||
                  0 !== e.dyn_ltree[20] ||
                  0 !== e.dyn_ltree[26]
                )
                  return 1;
                for (t = 32; t < 256; t++)
                  if (0 !== e.dyn_ltree[2 * t]) return 1;
                return 0;
              })(e)),
            N(e, e.l_desc),
            N(e, e.d_desc),
            (s = ((e) => {
              let t;
              for (
                D(e, e.dyn_ltree, e.l_desc.max_code),
                  D(e, e.dyn_dtree, e.d_desc.max_code),
                  N(e, e.bl_desc),
                  t = 18;
                t >= 3 && 0 === e.bl_tree[2 * o[t] + 1];
                t--
              );
              return (e.opt_len += 3 * (t + 1) + 5 + 5 + 4), t;
            })(e)),
            (i = (e.opt_len + 3 + 7) >>> 3),
            (a = (e.static_len + 3 + 7) >>> 3),
            a <= i && (i = a))
          : (i = a = r + 5),
          r + 4 <= i && -1 !== t
            ? P(e, t, r, n)
            : 4 === e.strategy || a === i
            ? (w(e, 2 + (n ? 1 : 0), 3), U(e, u, c))
            : (w(e, 4 + (n ? 1 : 0), 3),
              ((e, t, r, n) => {
                let i;
                for (
                  w(e, t - 257, 5), w(e, r - 1, 5), w(e, n - 4, 4), i = 0;
                  i < n;
                  i++
                )
                  w(e, e.bl_tree[2 * o[i] + 1], 3);
                O(e, e.dyn_ltree, t - 1), O(e, e.dyn_dtree, r - 1);
              })(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, s + 1),
              U(e, e.dyn_ltree, e.dyn_dtree)),
          A(e),
          n && S(e);
      },
      _tr_tally: (e, t, r) => (
        (e.pending_buf[e.d_buf + 2 * e.last_lit] = (t >>> 8) & 255),
        (e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t),
        (e.pending_buf[e.l_buf + e.last_lit] = 255 & r),
        e.last_lit++,
        0 === t
          ? e.dyn_ltree[2 * r]++
          : (e.matches++,
            t--,
            e.dyn_ltree[2 * (h[r] + 256 + 1)]++,
            e.dyn_dtree[2 * b(t)]++),
        e.last_lit === e.lit_bufsize - 1
      ),
      _tr_align: (e) => {
        w(e, 2, 3),
          x(e, 256, u),
          ((e) => {
            16 === e.bi_valid
              ? (m(e, e.bi_buf), (e.bi_buf = 0), (e.bi_valid = 0))
              : e.bi_valid >= 8 &&
                ((e.pending_buf[e.pending++] = 255 & e.bi_buf),
                (e.bi_buf >>= 8),
                (e.bi_valid -= 8));
          })(e);
      },
    };
    var C = (e, t, r, n) => {
      let i = (65535 & e) | 0,
        a = ((e >>> 16) & 65535) | 0,
        s = 0;
      for (; 0 !== r; ) {
        (s = r > 2e3 ? 2e3 : r), (r -= s);
        do {
          (i = (i + t[n++]) | 0), (a = (a + i) | 0);
        } while (--s);
        (i %= 65521), (a %= 65521);
      }
      return i | (a << 16) | 0;
    };
    const F = new Uint32Array(
      (() => {
        let e,
          t = [];
        for (var r = 0; r < 256; r++) {
          e = r;
          for (var n = 0; n < 8; n++)
            e = 1 & e ? 3988292384 ^ (e >>> 1) : e >>> 1;
          t[r] = e;
        }
        return t;
      })()
    );
    var K = (e, t, r, n) => {
        const i = F,
          a = n + r;
        e ^= -1;
        for (let r = n; r < a; r++) e = (e >>> 8) ^ i[255 & (e ^ t[r])];
        return -1 ^ e;
      },
      j = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version",
      },
      L = {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_MEM_ERROR: -4,
        Z_BUF_ERROR: -5,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        Z_BINARY: 0,
        Z_TEXT: 1,
        Z_UNKNOWN: 2,
        Z_DEFLATED: 8,
      };
    const {
        _tr_init: I,
        _tr_stored_block: Z,
        _tr_flush_block: H,
        _tr_tally: M,
        _tr_align: V,
      } = B,
      {
        Z_NO_FLUSH: W,
        Z_PARTIAL_FLUSH: G,
        Z_FULL_FLUSH: J,
        Z_FINISH: q,
        Z_BLOCK: Y,
        Z_OK: $,
        Z_STREAM_END: X,
        Z_STREAM_ERROR: Q,
        Z_DATA_ERROR: ee,
        Z_BUF_ERROR: te,
        Z_DEFAULT_COMPRESSION: re,
        Z_FILTERED: ne,
        Z_HUFFMAN_ONLY: ie,
        Z_RLE: ae,
        Z_FIXED: se,
        Z_DEFAULT_STRATEGY: oe,
        Z_UNKNOWN: ue,
        Z_DEFLATED: ce,
      } = L,
      le = 286,
      he = 30,
      de = 19,
      fe = 2 * le + 1,
      pe = 15,
      ye = (e, t) => ((e.msg = j[t]), t),
      _e = (e) => (e << 1) - (e > 4 ? 9 : 0),
      ge = (e) => {
        let t = e.length;
        for (; --t >= 0; ) e[t] = 0;
      };
    let ve = (e, t, r) => ((t << e.hash_shift) ^ r) & e.hash_mask;
    const be = (e) => {
        const t = e.state;
        let r = t.pending;
        r > e.avail_out && (r = e.avail_out),
          0 !== r &&
            (e.output.set(
              t.pending_buf.subarray(t.pending_out, t.pending_out + r),
              e.next_out
            ),
            (e.next_out += r),
            (t.pending_out += r),
            (e.total_out += r),
            (e.avail_out -= r),
            (t.pending -= r),
            0 === t.pending && (t.pending_out = 0));
      },
      me = (e, t) => {
        H(
          e,
          e.block_start >= 0 ? e.block_start : -1,
          e.strstart - e.block_start,
          t
        ),
          (e.block_start = e.strstart),
          be(e.strm);
      },
      we = (e, t) => {
        e.pending_buf[e.pending++] = t;
      },
      xe = (e, t) => {
        (e.pending_buf[e.pending++] = (t >>> 8) & 255),
          (e.pending_buf[e.pending++] = 255 & t);
      },
      ze = (e, t, r, n) => {
        let i = e.avail_in;
        return (
          i > n && (i = n),
          0 === i
            ? 0
            : ((e.avail_in -= i),
              t.set(e.input.subarray(e.next_in, e.next_in + i), r),
              1 === e.state.wrap
                ? (e.adler = C(e.adler, t, i, r))
                : 2 === e.state.wrap && (e.adler = K(e.adler, t, i, r)),
              (e.next_in += i),
              (e.total_in += i),
              i)
        );
      },
      ke = (e, t) => {
        let r,
          n,
          i = e.max_chain_length,
          a = e.strstart,
          s = e.prev_length,
          o = e.nice_match;
        const u =
            e.strstart > e.w_size - 262 ? e.strstart - (e.w_size - 262) : 0,
          c = e.window,
          l = e.w_mask,
          h = e.prev,
          d = e.strstart + 258;
        let f = c[a + s - 1],
          p = c[a + s];
        e.prev_length >= e.good_match && (i >>= 2),
          o > e.lookahead && (o = e.lookahead);
        do {
          if (
            ((r = t),
            c[r + s] === p &&
              c[r + s - 1] === f &&
              c[r] === c[a] &&
              c[++r] === c[a + 1])
          ) {
            (a += 2), r++;
            do {} while (
              c[++a] === c[++r] &&
              c[++a] === c[++r] &&
              c[++a] === c[++r] &&
              c[++a] === c[++r] &&
              c[++a] === c[++r] &&
              c[++a] === c[++r] &&
              c[++a] === c[++r] &&
              c[++a] === c[++r] &&
              a < d
            );
            if (((n = 258 - (d - a)), (a = d - 258), n > s)) {
              if (((e.match_start = t), (s = n), n >= o)) break;
              (f = c[a + s - 1]), (p = c[a + s]);
            }
          }
        } while ((t = h[t & l]) > u && 0 != --i);
        return s <= e.lookahead ? s : e.lookahead;
      },
      Ae = (e) => {
        const t = e.w_size;
        let r, n, i, a, s;
        do {
          if (
            ((a = e.window_size - e.lookahead - e.strstart),
            e.strstart >= t + (t - 262))
          ) {
            e.window.set(e.window.subarray(t, t + t), 0),
              (e.match_start -= t),
              (e.strstart -= t),
              (e.block_start -= t),
              (n = e.hash_size),
              (r = n);
            do {
              (i = e.head[--r]), (e.head[r] = i >= t ? i - t : 0);
            } while (--n);
            (n = t), (r = n);
            do {
              (i = e.prev[--r]), (e.prev[r] = i >= t ? i - t : 0);
            } while (--n);
            a += t;
          }
          if (0 === e.strm.avail_in) break;
          if (
            ((n = ze(e.strm, e.window, e.strstart + e.lookahead, a)),
            (e.lookahead += n),
            e.lookahead + e.insert >= 3)
          )
            for (
              s = e.strstart - e.insert,
                e.ins_h = e.window[s],
                e.ins_h = ve(e, e.ins_h, e.window[s + 1]);
              e.insert &&
              ((e.ins_h = ve(e, e.ins_h, e.window[s + 3 - 1])),
              (e.prev[s & e.w_mask] = e.head[e.ins_h]),
              (e.head[e.ins_h] = s),
              s++,
              e.insert--,
              !(e.lookahead + e.insert < 3));

            );
        } while (e.lookahead < 262 && 0 !== e.strm.avail_in);
      },
      Se = (e, t) => {
        let r, n;
        for (;;) {
          if (e.lookahead < 262) {
            if ((Ae(e), e.lookahead < 262 && t === W)) return 1;
            if (0 === e.lookahead) break;
          }
          if (
            ((r = 0),
            e.lookahead >= 3 &&
              ((e.ins_h = ve(e, e.ins_h, e.window[e.strstart + 3 - 1])),
              (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
              (e.head[e.ins_h] = e.strstart)),
            0 !== r &&
              e.strstart - r <= e.w_size - 262 &&
              (e.match_length = ke(e, r)),
            e.match_length >= 3)
          )
            if (
              ((n = M(e, e.strstart - e.match_start, e.match_length - 3)),
              (e.lookahead -= e.match_length),
              e.match_length <= e.max_lazy_match && e.lookahead >= 3)
            ) {
              e.match_length--;
              do {
                e.strstart++,
                  (e.ins_h = ve(e, e.ins_h, e.window[e.strstart + 3 - 1])),
                  (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                  (e.head[e.ins_h] = e.strstart);
              } while (0 != --e.match_length);
              e.strstart++;
            } else
              (e.strstart += e.match_length),
                (e.match_length = 0),
                (e.ins_h = e.window[e.strstart]),
                (e.ins_h = ve(e, e.ins_h, e.window[e.strstart + 1]));
          else (n = M(e, 0, e.window[e.strstart])), e.lookahead--, e.strstart++;
          if (n && (me(e, !1), 0 === e.strm.avail_out)) return 1;
        }
        return (
          (e.insert = e.strstart < 2 ? e.strstart : 2),
          t === q
            ? (me(e, !0), 0 === e.strm.avail_out ? 3 : 4)
            : e.last_lit && (me(e, !1), 0 === e.strm.avail_out)
            ? 1
            : 2
        );
      },
      Te = (e, t) => {
        let r, n, i;
        for (;;) {
          if (e.lookahead < 262) {
            if ((Ae(e), e.lookahead < 262 && t === W)) return 1;
            if (0 === e.lookahead) break;
          }
          if (
            ((r = 0),
            e.lookahead >= 3 &&
              ((e.ins_h = ve(e, e.ins_h, e.window[e.strstart + 3 - 1])),
              (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
              (e.head[e.ins_h] = e.strstart)),
            (e.prev_length = e.match_length),
            (e.prev_match = e.match_start),
            (e.match_length = 2),
            0 !== r &&
              e.prev_length < e.max_lazy_match &&
              e.strstart - r <= e.w_size - 262 &&
              ((e.match_length = ke(e, r)),
              e.match_length <= 5 &&
                (e.strategy === ne ||
                  (3 === e.match_length &&
                    e.strstart - e.match_start > 4096)) &&
                (e.match_length = 2)),
            e.prev_length >= 3 && e.match_length <= e.prev_length)
          ) {
            (i = e.strstart + e.lookahead - 3),
              (n = M(e, e.strstart - 1 - e.prev_match, e.prev_length - 3)),
              (e.lookahead -= e.prev_length - 1),
              (e.prev_length -= 2);
            do {
              ++e.strstart <= i &&
                ((e.ins_h = ve(e, e.ins_h, e.window[e.strstart + 3 - 1])),
                (r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h]),
                (e.head[e.ins_h] = e.strstart));
            } while (0 != --e.prev_length);
            if (
              ((e.match_available = 0),
              (e.match_length = 2),
              e.strstart++,
              n && (me(e, !1), 0 === e.strm.avail_out))
            )
              return 1;
          } else if (e.match_available) {
            if (
              ((n = M(e, 0, e.window[e.strstart - 1])),
              n && me(e, !1),
              e.strstart++,
              e.lookahead--,
              0 === e.strm.avail_out)
            )
              return 1;
          } else (e.match_available = 1), e.strstart++, e.lookahead--;
        }
        return (
          e.match_available &&
            ((n = M(e, 0, e.window[e.strstart - 1])), (e.match_available = 0)),
          (e.insert = e.strstart < 2 ? e.strstart : 2),
          t === q
            ? (me(e, !0), 0 === e.strm.avail_out ? 3 : 4)
            : e.last_lit && (me(e, !1), 0 === e.strm.avail_out)
            ? 1
            : 2
        );
      };
    function Ee(e, t, r, n, i) {
      (this.good_length = e),
        (this.max_lazy = t),
        (this.nice_length = r),
        (this.max_chain = n),
        (this.func = i);
    }
    const Ue = [
      new Ee(0, 0, 0, 0, (e, t) => {
        let r = 65535;
        for (r > e.pending_buf_size - 5 && (r = e.pending_buf_size - 5); ; ) {
          if (e.lookahead <= 1) {
            if ((Ae(e), 0 === e.lookahead && t === W)) return 1;
            if (0 === e.lookahead) break;
          }
          (e.strstart += e.lookahead), (e.lookahead = 0);
          const n = e.block_start + r;
          if (
            (0 === e.strstart || e.strstart >= n) &&
            ((e.lookahead = e.strstart - n),
            (e.strstart = n),
            me(e, !1),
            0 === e.strm.avail_out)
          )
            return 1;
          if (
            e.strstart - e.block_start >= e.w_size - 262 &&
            (me(e, !1), 0 === e.strm.avail_out)
          )
            return 1;
        }
        return (
          (e.insert = 0),
          t === q
            ? (me(e, !0), 0 === e.strm.avail_out ? 3 : 4)
            : (e.strstart > e.block_start && (me(e, !1), e.strm.avail_out), 1)
        );
      }),
      new Ee(4, 4, 8, 4, Se),
      new Ee(4, 5, 16, 8, Se),
      new Ee(4, 6, 32, 32, Se),
      new Ee(4, 4, 16, 16, Te),
      new Ee(8, 16, 32, 32, Te),
      new Ee(8, 16, 128, 128, Te),
      new Ee(8, 32, 128, 256, Te),
      new Ee(32, 128, 258, 1024, Te),
      new Ee(32, 258, 258, 4096, Te),
    ];
    function Ne() {
      (this.strm = null),
        (this.status = 0),
        (this.pending_buf = null),
        (this.pending_buf_size = 0),
        (this.pending_out = 0),
        (this.pending = 0),
        (this.wrap = 0),
        (this.gzhead = null),
        (this.gzindex = 0),
        (this.method = ce),
        (this.last_flush = -1),
        (this.w_size = 0),
        (this.w_bits = 0),
        (this.w_mask = 0),
        (this.window = null),
        (this.window_size = 0),
        (this.prev = null),
        (this.head = null),
        (this.ins_h = 0),
        (this.hash_size = 0),
        (this.hash_bits = 0),
        (this.hash_mask = 0),
        (this.hash_shift = 0),
        (this.block_start = 0),
        (this.match_length = 0),
        (this.prev_match = 0),
        (this.match_available = 0),
        (this.strstart = 0),
        (this.match_start = 0),
        (this.lookahead = 0),
        (this.prev_length = 0),
        (this.max_chain_length = 0),
        (this.max_lazy_match = 0),
        (this.level = 0),
        (this.strategy = 0),
        (this.good_match = 0),
        (this.nice_match = 0),
        (this.dyn_ltree = new Uint16Array(2 * fe)),
        (this.dyn_dtree = new Uint16Array(2 * (2 * he + 1))),
        (this.bl_tree = new Uint16Array(2 * (2 * de + 1))),
        ge(this.dyn_ltree),
        ge(this.dyn_dtree),
        ge(this.bl_tree),
        (this.l_desc = null),
        (this.d_desc = null),
        (this.bl_desc = null),
        (this.bl_count = new Uint16Array(pe + 1)),
        (this.heap = new Uint16Array(2 * le + 1)),
        ge(this.heap),
        (this.heap_len = 0),
        (this.heap_max = 0),
        (this.depth = new Uint16Array(2 * le + 1)),
        ge(this.depth),
        (this.l_buf = 0),
        (this.lit_bufsize = 0),
        (this.last_lit = 0),
        (this.d_buf = 0),
        (this.opt_len = 0),
        (this.static_len = 0),
        (this.matches = 0),
        (this.insert = 0),
        (this.bi_buf = 0),
        (this.bi_valid = 0);
    }
    const De = (e) => {
        if (!e || !e.state) return ye(e, Q);
        (e.total_in = e.total_out = 0), (e.data_type = ue);
        const t = e.state;
        return (
          (t.pending = 0),
          (t.pending_out = 0),
          t.wrap < 0 && (t.wrap = -t.wrap),
          (t.status = t.wrap ? 42 : 113),
          (e.adler = 2 === t.wrap ? 0 : 1),
          (t.last_flush = W),
          I(t),
          $
        );
      },
      Oe = (e) => {
        const t = De(e);
        return (
          t === $ &&
            ((e) => {
              (e.window_size = 2 * e.w_size),
                ge(e.head),
                (e.max_lazy_match = Ue[e.level].max_lazy),
                (e.good_match = Ue[e.level].good_length),
                (e.nice_match = Ue[e.level].nice_length),
                (e.max_chain_length = Ue[e.level].max_chain),
                (e.strstart = 0),
                (e.block_start = 0),
                (e.lookahead = 0),
                (e.insert = 0),
                (e.match_length = e.prev_length = 2),
                (e.match_available = 0),
                (e.ins_h = 0);
            })(e.state),
          t
        );
      },
      Re = (e, t, r, n, i, a) => {
        if (!e) return Q;
        let s = 1;
        if (
          (t === re && (t = 6),
          n < 0 ? ((s = 0), (n = -n)) : n > 15 && ((s = 2), (n -= 16)),
          i < 1 ||
            i > 9 ||
            r !== ce ||
            n < 8 ||
            n > 15 ||
            t < 0 ||
            t > 9 ||
            a < 0 ||
            a > se)
        )
          return ye(e, Q);
        8 === n && (n = 9);
        const o = new Ne();
        return (
          (e.state = o),
          (o.strm = e),
          (o.wrap = s),
          (o.gzhead = null),
          (o.w_bits = n),
          (o.w_size = 1 << o.w_bits),
          (o.w_mask = o.w_size - 1),
          (o.hash_bits = i + 7),
          (o.hash_size = 1 << o.hash_bits),
          (o.hash_mask = o.hash_size - 1),
          (o.hash_shift = ~~((o.hash_bits + 3 - 1) / 3)),
          (o.window = new Uint8Array(2 * o.w_size)),
          (o.head = new Uint16Array(o.hash_size)),
          (o.prev = new Uint16Array(o.w_size)),
          (o.lit_bufsize = 1 << (i + 6)),
          (o.pending_buf_size = 4 * o.lit_bufsize),
          (o.pending_buf = new Uint8Array(o.pending_buf_size)),
          (o.d_buf = 1 * o.lit_bufsize),
          (o.l_buf = 3 * o.lit_bufsize),
          (o.level = t),
          (o.strategy = a),
          (o.method = r),
          Oe(e)
        );
      };
    var Pe = {
      deflateInit: (e, t) => Re(e, t, ce, 15, 8, oe),
      deflateInit2: Re,
      deflateReset: Oe,
      deflateResetKeep: De,
      deflateSetHeader: (e, t) =>
        e && e.state ? (2 !== e.state.wrap ? Q : ((e.state.gzhead = t), $)) : Q,
      deflate: (e, t) => {
        let r, n;
        if (!e || !e.state || t > Y || t < 0) return e ? ye(e, Q) : Q;
        const i = e.state;
        if (
          !e.output ||
          (!e.input && 0 !== e.avail_in) ||
          (666 === i.status && t !== q)
        )
          return ye(e, 0 === e.avail_out ? te : Q);
        i.strm = e;
        const a = i.last_flush;
        if (((i.last_flush = t), 42 === i.status))
          if (2 === i.wrap)
            (e.adler = 0),
              we(i, 31),
              we(i, 139),
              we(i, 8),
              i.gzhead
                ? (we(
                    i,
                    (i.gzhead.text ? 1 : 0) +
                      (i.gzhead.hcrc ? 2 : 0) +
                      (i.gzhead.extra ? 4 : 0) +
                      (i.gzhead.name ? 8 : 0) +
                      (i.gzhead.comment ? 16 : 0)
                  ),
                  we(i, 255 & i.gzhead.time),
                  we(i, (i.gzhead.time >> 8) & 255),
                  we(i, (i.gzhead.time >> 16) & 255),
                  we(i, (i.gzhead.time >> 24) & 255),
                  we(
                    i,
                    9 === i.level ? 2 : i.strategy >= ie || i.level < 2 ? 4 : 0
                  ),
                  we(i, 255 & i.gzhead.os),
                  i.gzhead.extra &&
                    i.gzhead.extra.length &&
                    (we(i, 255 & i.gzhead.extra.length),
                    we(i, (i.gzhead.extra.length >> 8) & 255)),
                  i.gzhead.hcrc &&
                    (e.adler = K(e.adler, i.pending_buf, i.pending, 0)),
                  (i.gzindex = 0),
                  (i.status = 69))
                : (we(i, 0),
                  we(i, 0),
                  we(i, 0),
                  we(i, 0),
                  we(i, 0),
                  we(
                    i,
                    9 === i.level ? 2 : i.strategy >= ie || i.level < 2 ? 4 : 0
                  ),
                  we(i, 3),
                  (i.status = 113));
          else {
            let t = (ce + ((i.w_bits - 8) << 4)) << 8,
              r = -1;
            (r =
              i.strategy >= ie || i.level < 2
                ? 0
                : i.level < 6
                ? 1
                : 6 === i.level
                ? 2
                : 3),
              (t |= r << 6),
              0 !== i.strstart && (t |= 32),
              (t += 31 - (t % 31)),
              (i.status = 113),
              xe(i, t),
              0 !== i.strstart &&
                (xe(i, e.adler >>> 16), xe(i, 65535 & e.adler)),
              (e.adler = 1);
          }
        if (69 === i.status)
          if (i.gzhead.extra) {
            for (
              r = i.pending;
              i.gzindex < (65535 & i.gzhead.extra.length) &&
              (i.pending !== i.pending_buf_size ||
                (i.gzhead.hcrc &&
                  i.pending > r &&
                  (e.adler = K(e.adler, i.pending_buf, i.pending - r, r)),
                be(e),
                (r = i.pending),
                i.pending !== i.pending_buf_size));

            )
              we(i, 255 & i.gzhead.extra[i.gzindex]), i.gzindex++;
            i.gzhead.hcrc &&
              i.pending > r &&
              (e.adler = K(e.adler, i.pending_buf, i.pending - r, r)),
              i.gzindex === i.gzhead.extra.length &&
                ((i.gzindex = 0), (i.status = 73));
          } else i.status = 73;
        if (73 === i.status)
          if (i.gzhead.name) {
            r = i.pending;
            do {
              if (
                i.pending === i.pending_buf_size &&
                (i.gzhead.hcrc &&
                  i.pending > r &&
                  (e.adler = K(e.adler, i.pending_buf, i.pending - r, r)),
                be(e),
                (r = i.pending),
                i.pending === i.pending_buf_size)
              ) {
                n = 1;
                break;
              }
              (n =
                i.gzindex < i.gzhead.name.length
                  ? 255 & i.gzhead.name.charCodeAt(i.gzindex++)
                  : 0),
                we(i, n);
            } while (0 !== n);
            i.gzhead.hcrc &&
              i.pending > r &&
              (e.adler = K(e.adler, i.pending_buf, i.pending - r, r)),
              0 === n && ((i.gzindex = 0), (i.status = 91));
          } else i.status = 91;
        if (91 === i.status)
          if (i.gzhead.comment) {
            r = i.pending;
            do {
              if (
                i.pending === i.pending_buf_size &&
                (i.gzhead.hcrc &&
                  i.pending > r &&
                  (e.adler = K(e.adler, i.pending_buf, i.pending - r, r)),
                be(e),
                (r = i.pending),
                i.pending === i.pending_buf_size)
              ) {
                n = 1;
                break;
              }
              (n =
                i.gzindex < i.gzhead.comment.length
                  ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++)
                  : 0),
                we(i, n);
            } while (0 !== n);
            i.gzhead.hcrc &&
              i.pending > r &&
              (e.adler = K(e.adler, i.pending_buf, i.pending - r, r)),
              0 === n && (i.status = 103);
          } else i.status = 103;
        if (
          (103 === i.status &&
            (i.gzhead.hcrc
              ? (i.pending + 2 > i.pending_buf_size && be(e),
                i.pending + 2 <= i.pending_buf_size &&
                  (we(i, 255 & e.adler),
                  we(i, (e.adler >> 8) & 255),
                  (e.adler = 0),
                  (i.status = 113)))
              : (i.status = 113)),
          0 !== i.pending)
        ) {
          if ((be(e), 0 === e.avail_out)) return (i.last_flush = -1), $;
        } else if (0 === e.avail_in && _e(t) <= _e(a) && t !== q)
          return ye(e, te);
        if (666 === i.status && 0 !== e.avail_in) return ye(e, te);
        if (
          0 !== e.avail_in ||
          0 !== i.lookahead ||
          (t !== W && 666 !== i.status)
        ) {
          let r =
            i.strategy === ie
              ? ((e, t) => {
                  let r;
                  for (;;) {
                    if (0 === e.lookahead && (Ae(e), 0 === e.lookahead)) {
                      if (t === W) return 1;
                      break;
                    }
                    if (
                      ((e.match_length = 0),
                      (r = M(e, 0, e.window[e.strstart])),
                      e.lookahead--,
                      e.strstart++,
                      r && (me(e, !1), 0 === e.strm.avail_out))
                    )
                      return 1;
                  }
                  return (
                    (e.insert = 0),
                    t === q
                      ? (me(e, !0), 0 === e.strm.avail_out ? 3 : 4)
                      : e.last_lit && (me(e, !1), 0 === e.strm.avail_out)
                      ? 1
                      : 2
                  );
                })(i, t)
              : i.strategy === ae
              ? ((e, t) => {
                  let r, n, i, a;
                  const s = e.window;
                  for (;;) {
                    if (e.lookahead <= 258) {
                      if ((Ae(e), e.lookahead <= 258 && t === W)) return 1;
                      if (0 === e.lookahead) break;
                    }
                    if (
                      ((e.match_length = 0),
                      e.lookahead >= 3 &&
                        e.strstart > 0 &&
                        ((i = e.strstart - 1),
                        (n = s[i]),
                        n === s[++i] && n === s[++i] && n === s[++i]))
                    ) {
                      a = e.strstart + 258;
                      do {} while (
                        n === s[++i] &&
                        n === s[++i] &&
                        n === s[++i] &&
                        n === s[++i] &&
                        n === s[++i] &&
                        n === s[++i] &&
                        n === s[++i] &&
                        n === s[++i] &&
                        i < a
                      );
                      (e.match_length = 258 - (a - i)),
                        e.match_length > e.lookahead &&
                          (e.match_length = e.lookahead);
                    }
                    if (
                      (e.match_length >= 3
                        ? ((r = M(e, 1, e.match_length - 3)),
                          (e.lookahead -= e.match_length),
                          (e.strstart += e.match_length),
                          (e.match_length = 0))
                        : ((r = M(e, 0, e.window[e.strstart])),
                          e.lookahead--,
                          e.strstart++),
                      r && (me(e, !1), 0 === e.strm.avail_out))
                    )
                      return 1;
                  }
                  return (
                    (e.insert = 0),
                    t === q
                      ? (me(e, !0), 0 === e.strm.avail_out ? 3 : 4)
                      : e.last_lit && (me(e, !1), 0 === e.strm.avail_out)
                      ? 1
                      : 2
                  );
                })(i, t)
              : Ue[i.level].func(i, t);
          if (((3 !== r && 4 !== r) || (i.status = 666), 1 === r || 3 === r))
            return 0 === e.avail_out && (i.last_flush = -1), $;
          if (
            2 === r &&
            (t === G
              ? V(i)
              : t !== Y &&
                (Z(i, 0, 0, !1),
                t === J &&
                  (ge(i.head),
                  0 === i.lookahead &&
                    ((i.strstart = 0), (i.block_start = 0), (i.insert = 0)))),
            be(e),
            0 === e.avail_out)
          )
            return (i.last_flush = -1), $;
        }
        return t !== q
          ? $
          : i.wrap <= 0
          ? X
          : (2 === i.wrap
              ? (we(i, 255 & e.adler),
                we(i, (e.adler >> 8) & 255),
                we(i, (e.adler >> 16) & 255),
                we(i, (e.adler >> 24) & 255),
                we(i, 255 & e.total_in),
                we(i, (e.total_in >> 8) & 255),
                we(i, (e.total_in >> 16) & 255),
                we(i, (e.total_in >> 24) & 255))
              : (xe(i, e.adler >>> 16), xe(i, 65535 & e.adler)),
            be(e),
            i.wrap > 0 && (i.wrap = -i.wrap),
            0 !== i.pending ? $ : X);
      },
      deflateEnd: (e) => {
        if (!e || !e.state) return Q;
        const t = e.state.status;
        return 42 !== t &&
          69 !== t &&
          73 !== t &&
          91 !== t &&
          103 !== t &&
          113 !== t &&
          666 !== t
          ? ye(e, Q)
          : ((e.state = null), 113 === t ? ye(e, ee) : $);
      },
      deflateSetDictionary: (e, t) => {
        let r = t.length;
        if (!e || !e.state) return Q;
        const n = e.state,
          i = n.wrap;
        if (2 === i || (1 === i && 42 !== n.status) || n.lookahead) return Q;
        if (
          (1 === i && (e.adler = C(e.adler, t, r, 0)),
          (n.wrap = 0),
          r >= n.w_size)
        ) {
          0 === i &&
            (ge(n.head), (n.strstart = 0), (n.block_start = 0), (n.insert = 0));
          let e = new Uint8Array(n.w_size);
          e.set(t.subarray(r - n.w_size, r), 0), (t = e), (r = n.w_size);
        }
        const a = e.avail_in,
          s = e.next_in,
          o = e.input;
        for (
          e.avail_in = r, e.next_in = 0, e.input = t, Ae(n);
          n.lookahead >= 3;

        ) {
          let e = n.strstart,
            t = n.lookahead - 2;
          do {
            (n.ins_h = ve(n, n.ins_h, n.window[e + 3 - 1])),
              (n.prev[e & n.w_mask] = n.head[n.ins_h]),
              (n.head[n.ins_h] = e),
              e++;
          } while (--t);
          (n.strstart = e), (n.lookahead = 2), Ae(n);
        }
        return (
          (n.strstart += n.lookahead),
          (n.block_start = n.strstart),
          (n.insert = n.lookahead),
          (n.lookahead = 0),
          (n.match_length = n.prev_length = 2),
          (n.match_available = 0),
          (e.next_in = s),
          (e.input = o),
          (e.avail_in = a),
          (n.wrap = i),
          $
        );
      },
      deflateInfo: "pako deflate (from Nodeca project)",
    };
    const Be = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    var Ce = {
      assign: function (e) {
        const t = Array.prototype.slice.call(arguments, 1);
        for (; t.length; ) {
          const r = t.shift();
          if (r) {
            if ("object" != typeof r)
              throw new TypeError(r + "must be non-object");
            for (const t in r) Be(r, t) && (e[t] = r[t]);
          }
        }
        return e;
      },
      flattenChunks: (e) => {
        let t = 0;
        for (let r = 0, n = e.length; r < n; r++) t += e[r].length;
        const r = new Uint8Array(t);
        for (let t = 0, n = 0, i = e.length; t < i; t++) {
          let i = e[t];
          r.set(i, n), (n += i.length);
        }
        return r;
      },
    };
    let Fe = !0;
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (e) {
      Fe = !1;
    }
    const Ke = new Uint8Array(256);
    for (let e = 0; e < 256; e++)
      Ke[e] =
        e >= 252
          ? 6
          : e >= 248
          ? 5
          : e >= 240
          ? 4
          : e >= 224
          ? 3
          : e >= 192
          ? 2
          : 1;
    Ke[254] = Ke[254] = 1;
    var je = {
      string2buf: (e) => {
        let t,
          r,
          n,
          i,
          a,
          s = e.length,
          o = 0;
        for (i = 0; i < s; i++)
          (r = e.charCodeAt(i)),
            55296 == (64512 & r) &&
              i + 1 < s &&
              ((n = e.charCodeAt(i + 1)),
              56320 == (64512 & n) &&
                ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), i++)),
            (o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4);
        for (t = new Uint8Array(o), a = 0, i = 0; a < o; i++)
          (r = e.charCodeAt(i)),
            55296 == (64512 & r) &&
              i + 1 < s &&
              ((n = e.charCodeAt(i + 1)),
              56320 == (64512 & n) &&
                ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), i++)),
            r < 128
              ? (t[a++] = r)
              : r < 2048
              ? ((t[a++] = 192 | (r >>> 6)), (t[a++] = 128 | (63 & r)))
              : r < 65536
              ? ((t[a++] = 224 | (r >>> 12)),
                (t[a++] = 128 | ((r >>> 6) & 63)),
                (t[a++] = 128 | (63 & r)))
              : ((t[a++] = 240 | (r >>> 18)),
                (t[a++] = 128 | ((r >>> 12) & 63)),
                (t[a++] = 128 | ((r >>> 6) & 63)),
                (t[a++] = 128 | (63 & r)));
        return t;
      },
      buf2string: (e, t) => {
        let r, n;
        const i = t || e.length,
          a = new Array(2 * i);
        for (n = 0, r = 0; r < i; ) {
          let t = e[r++];
          if (t < 128) {
            a[n++] = t;
            continue;
          }
          let s = Ke[t];
          if (s > 4) (a[n++] = 65533), (r += s - 1);
          else {
            for (t &= 2 === s ? 31 : 3 === s ? 15 : 7; s > 1 && r < i; )
              (t = (t << 6) | (63 & e[r++])), s--;
            s > 1
              ? (a[n++] = 65533)
              : t < 65536
              ? (a[n++] = t)
              : ((t -= 65536),
                (a[n++] = 55296 | ((t >> 10) & 1023)),
                (a[n++] = 56320 | (1023 & t)));
          }
        }
        return ((e, t) => {
          if (t < 65534 && e.subarray && Fe)
            return String.fromCharCode.apply(
              null,
              e.length === t ? e : e.subarray(0, t)
            );
          let r = "";
          for (let n = 0; n < t; n++) r += String.fromCharCode(e[n]);
          return r;
        })(a, n);
      },
      utf8border: (e, t) => {
        (t = t || e.length) > e.length && (t = e.length);
        let r = t - 1;
        for (; r >= 0 && 128 == (192 & e[r]); ) r--;
        return r < 0 ? t : 0 === r ? t : r + Ke[e[r]] > t ? r : t;
      },
    };
    var Le = function () {
      (this.input = null),
        (this.next_in = 0),
        (this.avail_in = 0),
        (this.total_in = 0),
        (this.output = null),
        (this.next_out = 0),
        (this.avail_out = 0),
        (this.total_out = 0),
        (this.msg = ""),
        (this.state = null),
        (this.data_type = 2),
        (this.adler = 0);
    };
    const Ie = Object.prototype.toString,
      {
        Z_NO_FLUSH: Ze,
        Z_SYNC_FLUSH: He,
        Z_FULL_FLUSH: Me,
        Z_FINISH: Ve,
        Z_OK: We,
        Z_STREAM_END: Ge,
        Z_DEFAULT_COMPRESSION: Je,
        Z_DEFAULT_STRATEGY: qe,
        Z_DEFLATED: Ye,
      } = L;
    function $e(e) {
      this.options = Ce.assign(
        {
          level: Je,
          method: Ye,
          chunkSize: 16384,
          windowBits: 15,
          memLevel: 8,
          strategy: qe,
        },
        e || {}
      );
      let t = this.options;
      t.raw && t.windowBits > 0
        ? (t.windowBits = -t.windowBits)
        : t.gzip &&
          t.windowBits > 0 &&
          t.windowBits < 16 &&
          (t.windowBits += 16),
        (this.err = 0),
        (this.msg = ""),
        (this.ended = !1),
        (this.chunks = []),
        (this.strm = new Le()),
        (this.strm.avail_out = 0);
      let r = Pe.deflateInit2(
        this.strm,
        t.level,
        t.method,
        t.windowBits,
        t.memLevel,
        t.strategy
      );
      if (r !== We) throw new Error(j[r]);
      if (
        (t.header && Pe.deflateSetHeader(this.strm, t.header), t.dictionary)
      ) {
        let e;
        if (
          ((e =
            "string" == typeof t.dictionary
              ? je.string2buf(t.dictionary)
              : "[object ArrayBuffer]" === Ie.call(t.dictionary)
              ? new Uint8Array(t.dictionary)
              : t.dictionary),
          (r = Pe.deflateSetDictionary(this.strm, e)),
          r !== We)
        )
          throw new Error(j[r]);
        this._dict_set = !0;
      }
    }
    function Xe(e, t) {
      const r = new $e(t);
      if ((r.push(e, !0), r.err)) throw r.msg || j[r.err];
      return r.result;
    }
    ($e.prototype.push = function (e, t) {
      const r = this.strm,
        n = this.options.chunkSize;
      let i, a;
      if (this.ended) return !1;
      for (
        a = t === ~~t ? t : !0 === t ? Ve : Ze,
          "string" == typeof e
            ? (r.input = je.string2buf(e))
            : "[object ArrayBuffer]" === Ie.call(e)
            ? (r.input = new Uint8Array(e))
            : (r.input = e),
          r.next_in = 0,
          r.avail_in = r.input.length;
        ;

      )
        if (
          (0 === r.avail_out &&
            ((r.output = new Uint8Array(n)),
            (r.next_out = 0),
            (r.avail_out = n)),
          (a === He || a === Me) && r.avail_out <= 6)
        )
          this.onData(r.output.subarray(0, r.next_out)), (r.avail_out = 0);
        else {
          if (((i = Pe.deflate(r, a)), i === Ge))
            return (
              r.next_out > 0 && this.onData(r.output.subarray(0, r.next_out)),
              (i = Pe.deflateEnd(this.strm)),
              this.onEnd(i),
              (this.ended = !0),
              i === We
            );
          if (0 !== r.avail_out) {
            if (a > 0 && r.next_out > 0)
              this.onData(r.output.subarray(0, r.next_out)), (r.avail_out = 0);
            else if (0 === r.avail_in) break;
          } else this.onData(r.output);
        }
      return !0;
    }),
      ($e.prototype.onData = function (e) {
        this.chunks.push(e);
      }),
      ($e.prototype.onEnd = function (e) {
        e === We && (this.result = Ce.flattenChunks(this.chunks)),
          (this.chunks = []),
          (this.err = e),
          (this.msg = this.strm.msg);
      });
    var Qe = {
      Deflate: $e,
      deflate: Xe,
      deflateRaw: function (e, t) {
        return ((t = t || {}).raw = !0), Xe(e, t);
      },
      gzip: function (e, t) {
        return ((t = t || {}).gzip = !0), Xe(e, t);
      },
      constants: L,
    };
    var et = function (e, t) {
      let r,
        n,
        i,
        a,
        s,
        o,
        u,
        c,
        l,
        h,
        d,
        f,
        p,
        y,
        _,
        g,
        v,
        b,
        m,
        w,
        x,
        z,
        k,
        A;
      const S = e.state;
      (r = e.next_in),
        (k = e.input),
        (n = r + (e.avail_in - 5)),
        (i = e.next_out),
        (A = e.output),
        (a = i - (t - e.avail_out)),
        (s = i + (e.avail_out - 257)),
        (o = S.dmax),
        (u = S.wsize),
        (c = S.whave),
        (l = S.wnext),
        (h = S.window),
        (d = S.hold),
        (f = S.bits),
        (p = S.lencode),
        (y = S.distcode),
        (_ = (1 << S.lenbits) - 1),
        (g = (1 << S.distbits) - 1);
      e: do {
        f < 15 && ((d += k[r++] << f), (f += 8), (d += k[r++] << f), (f += 8)),
          (v = p[d & _]);
        t: for (;;) {
          if (
            ((b = v >>> 24),
            (d >>>= b),
            (f -= b),
            (b = (v >>> 16) & 255),
            0 === b)
          )
            A[i++] = 65535 & v;
          else {
            if (!(16 & b)) {
              if (0 == (64 & b)) {
                v = p[(65535 & v) + (d & ((1 << b) - 1))];
                continue t;
              }
              if (32 & b) {
                S.mode = 12;
                break e;
              }
              (e.msg = "invalid literal/length code"), (S.mode = 30);
              break e;
            }
            (m = 65535 & v),
              (b &= 15),
              b &&
                (f < b && ((d += k[r++] << f), (f += 8)),
                (m += d & ((1 << b) - 1)),
                (d >>>= b),
                (f -= b)),
              f < 15 &&
                ((d += k[r++] << f), (f += 8), (d += k[r++] << f), (f += 8)),
              (v = y[d & g]);
            r: for (;;) {
              if (
                ((b = v >>> 24),
                (d >>>= b),
                (f -= b),
                (b = (v >>> 16) & 255),
                !(16 & b))
              ) {
                if (0 == (64 & b)) {
                  v = y[(65535 & v) + (d & ((1 << b) - 1))];
                  continue r;
                }
                (e.msg = "invalid distance code"), (S.mode = 30);
                break e;
              }
              if (
                ((w = 65535 & v),
                (b &= 15),
                f < b &&
                  ((d += k[r++] << f),
                  (f += 8),
                  f < b && ((d += k[r++] << f), (f += 8))),
                (w += d & ((1 << b) - 1)),
                w > o)
              ) {
                (e.msg = "invalid distance too far back"), (S.mode = 30);
                break e;
              }
              if (((d >>>= b), (f -= b), (b = i - a), w > b)) {
                if (((b = w - b), b > c && S.sane)) {
                  (e.msg = "invalid distance too far back"), (S.mode = 30);
                  break e;
                }
                if (((x = 0), (z = h), 0 === l)) {
                  if (((x += u - b), b < m)) {
                    m -= b;
                    do {
                      A[i++] = h[x++];
                    } while (--b);
                    (x = i - w), (z = A);
                  }
                } else if (l < b) {
                  if (((x += u + l - b), (b -= l), b < m)) {
                    m -= b;
                    do {
                      A[i++] = h[x++];
                    } while (--b);
                    if (((x = 0), l < m)) {
                      (b = l), (m -= b);
                      do {
                        A[i++] = h[x++];
                      } while (--b);
                      (x = i - w), (z = A);
                    }
                  }
                } else if (((x += l - b), b < m)) {
                  m -= b;
                  do {
                    A[i++] = h[x++];
                  } while (--b);
                  (x = i - w), (z = A);
                }
                for (; m > 2; )
                  (A[i++] = z[x++]),
                    (A[i++] = z[x++]),
                    (A[i++] = z[x++]),
                    (m -= 3);
                m && ((A[i++] = z[x++]), m > 1 && (A[i++] = z[x++]));
              } else {
                x = i - w;
                do {
                  (A[i++] = A[x++]),
                    (A[i++] = A[x++]),
                    (A[i++] = A[x++]),
                    (m -= 3);
                } while (m > 2);
                m && ((A[i++] = A[x++]), m > 1 && (A[i++] = A[x++]));
              }
              break;
            }
          }
          break;
        }
      } while (r < n && i < s);
      (m = f >> 3),
        (r -= m),
        (f -= m << 3),
        (d &= (1 << f) - 1),
        (e.next_in = r),
        (e.next_out = i),
        (e.avail_in = r < n ? n - r + 5 : 5 - (r - n)),
        (e.avail_out = i < s ? s - i + 257 : 257 - (i - s)),
        (S.hold = d),
        (S.bits = f);
    };
    const tt = new Uint16Array([
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
        67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
      ]),
      rt = new Uint8Array([
        16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19,
        19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78,
      ]),
      nt = new Uint16Array([
        1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385,
        513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
        0, 0,
      ]),
      it = new Uint8Array([
        16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23,
        24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
      ]);
    var at = (e, t, r, n, i, a, s, o) => {
      const u = o.bits;
      let c,
        l,
        h,
        d,
        f,
        p,
        y = 0,
        _ = 0,
        g = 0,
        v = 0,
        b = 0,
        m = 0,
        w = 0,
        x = 0,
        z = 0,
        k = 0,
        A = null,
        S = 0;
      const T = new Uint16Array(16),
        E = new Uint16Array(16);
      let U,
        N,
        D,
        O = null,
        R = 0;
      for (y = 0; y <= 15; y++) T[y] = 0;
      for (_ = 0; _ < n; _++) T[t[r + _]]++;
      for (b = u, v = 15; v >= 1 && 0 === T[v]; v--);
      if ((b > v && (b = v), 0 === v))
        return (i[a++] = 20971520), (i[a++] = 20971520), (o.bits = 1), 0;
      for (g = 1; g < v && 0 === T[g]; g++);
      for (b < g && (b = g), x = 1, y = 1; y <= 15; y++)
        if (((x <<= 1), (x -= T[y]), x < 0)) return -1;
      if (x > 0 && (0 === e || 1 !== v)) return -1;
      for (E[1] = 0, y = 1; y < 15; y++) E[y + 1] = E[y] + T[y];
      for (_ = 0; _ < n; _++) 0 !== t[r + _] && (s[E[t[r + _]]++] = _);
      if (
        (0 === e
          ? ((A = O = s), (p = 19))
          : 1 === e
          ? ((A = tt), (S -= 257), (O = rt), (R -= 257), (p = 256))
          : ((A = nt), (O = it), (p = -1)),
        (k = 0),
        (_ = 0),
        (y = g),
        (f = a),
        (m = b),
        (w = 0),
        (h = -1),
        (z = 1 << b),
        (d = z - 1),
        (1 === e && z > 852) || (2 === e && z > 592))
      )
        return 1;
      for (;;) {
        (U = y - w),
          s[_] < p
            ? ((N = 0), (D = s[_]))
            : s[_] > p
            ? ((N = O[R + s[_]]), (D = A[S + s[_]]))
            : ((N = 96), (D = 0)),
          (c = 1 << (y - w)),
          (l = 1 << m),
          (g = l);
        do {
          (l -= c), (i[f + (k >> w) + l] = (U << 24) | (N << 16) | D | 0);
        } while (0 !== l);
        for (c = 1 << (y - 1); k & c; ) c >>= 1;
        if ((0 !== c ? ((k &= c - 1), (k += c)) : (k = 0), _++, 0 == --T[y])) {
          if (y === v) break;
          y = t[r + s[_]];
        }
        if (y > b && (k & d) !== h) {
          for (
            0 === w && (w = b), f += g, m = y - w, x = 1 << m;
            m + w < v && ((x -= T[m + w]), !(x <= 0));

          )
            m++, (x <<= 1);
          if (((z += 1 << m), (1 === e && z > 852) || (2 === e && z > 592)))
            return 1;
          (h = k & d), (i[h] = (b << 24) | (m << 16) | (f - a) | 0);
        }
      }
      return (
        0 !== k && (i[f + k] = ((y - w) << 24) | (64 << 16) | 0),
        (o.bits = b),
        0
      );
    };
    const {
        Z_FINISH: st,
        Z_BLOCK: ot,
        Z_TREES: ut,
        Z_OK: ct,
        Z_STREAM_END: lt,
        Z_NEED_DICT: ht,
        Z_STREAM_ERROR: dt,
        Z_DATA_ERROR: ft,
        Z_MEM_ERROR: pt,
        Z_BUF_ERROR: yt,
        Z_DEFLATED: _t,
      } = L,
      gt = (e) =>
        ((e >>> 24) & 255) +
        ((e >>> 8) & 65280) +
        ((65280 & e) << 8) +
        ((255 & e) << 24);
    function vt() {
      (this.mode = 0),
        (this.last = !1),
        (this.wrap = 0),
        (this.havedict = !1),
        (this.flags = 0),
        (this.dmax = 0),
        (this.check = 0),
        (this.total = 0),
        (this.head = null),
        (this.wbits = 0),
        (this.wsize = 0),
        (this.whave = 0),
        (this.wnext = 0),
        (this.window = null),
        (this.hold = 0),
        (this.bits = 0),
        (this.length = 0),
        (this.offset = 0),
        (this.extra = 0),
        (this.lencode = null),
        (this.distcode = null),
        (this.lenbits = 0),
        (this.distbits = 0),
        (this.ncode = 0),
        (this.nlen = 0),
        (this.ndist = 0),
        (this.have = 0),
        (this.next = null),
        (this.lens = new Uint16Array(320)),
        (this.work = new Uint16Array(288)),
        (this.lendyn = null),
        (this.distdyn = null),
        (this.sane = 0),
        (this.back = 0),
        (this.was = 0);
    }
    const bt = (e) => {
        if (!e || !e.state) return dt;
        const t = e.state;
        return (
          (e.total_in = e.total_out = t.total = 0),
          (e.msg = ""),
          t.wrap && (e.adler = 1 & t.wrap),
          (t.mode = 1),
          (t.last = 0),
          (t.havedict = 0),
          (t.dmax = 32768),
          (t.head = null),
          (t.hold = 0),
          (t.bits = 0),
          (t.lencode = t.lendyn = new Int32Array(852)),
          (t.distcode = t.distdyn = new Int32Array(592)),
          (t.sane = 1),
          (t.back = -1),
          ct
        );
      },
      mt = (e) => {
        if (!e || !e.state) return dt;
        const t = e.state;
        return (t.wsize = 0), (t.whave = 0), (t.wnext = 0), bt(e);
      },
      wt = (e, t) => {
        let r;
        if (!e || !e.state) return dt;
        const n = e.state;
        return (
          t < 0
            ? ((r = 0), (t = -t))
            : ((r = 1 + (t >> 4)), t < 48 && (t &= 15)),
          t && (t < 8 || t > 15)
            ? dt
            : (null !== n.window && n.wbits !== t && (n.window = null),
              (n.wrap = r),
              (n.wbits = t),
              mt(e))
        );
      },
      xt = (e, t) => {
        if (!e) return dt;
        const r = new vt();
        (e.state = r), (r.window = null);
        const n = wt(e, t);
        return n !== ct && (e.state = null), n;
      };
    let zt,
      kt,
      At = !0;
    const St = (e) => {
        if (At) {
          (zt = new Int32Array(512)), (kt = new Int32Array(32));
          let t = 0;
          for (; t < 144; ) e.lens[t++] = 8;
          for (; t < 256; ) e.lens[t++] = 9;
          for (; t < 280; ) e.lens[t++] = 7;
          for (; t < 288; ) e.lens[t++] = 8;
          for (
            at(1, e.lens, 0, 288, zt, 0, e.work, { bits: 9 }), t = 0;
            t < 32;

          )
            e.lens[t++] = 5;
          at(2, e.lens, 0, 32, kt, 0, e.work, { bits: 5 }), (At = !1);
        }
        (e.lencode = zt), (e.lenbits = 9), (e.distcode = kt), (e.distbits = 5);
      },
      Tt = (e, t, r, n) => {
        let i;
        const a = e.state;
        return (
          null === a.window &&
            ((a.wsize = 1 << a.wbits),
            (a.wnext = 0),
            (a.whave = 0),
            (a.window = new Uint8Array(a.wsize))),
          n >= a.wsize
            ? (a.window.set(t.subarray(r - a.wsize, r), 0),
              (a.wnext = 0),
              (a.whave = a.wsize))
            : ((i = a.wsize - a.wnext),
              i > n && (i = n),
              a.window.set(t.subarray(r - n, r - n + i), a.wnext),
              (n -= i)
                ? (a.window.set(t.subarray(r - n, r), 0),
                  (a.wnext = n),
                  (a.whave = a.wsize))
                : ((a.wnext += i),
                  a.wnext === a.wsize && (a.wnext = 0),
                  a.whave < a.wsize && (a.whave += i))),
          0
        );
      };
    var Et = {
      inflateReset: mt,
      inflateReset2: wt,
      inflateResetKeep: bt,
      inflateInit: (e) => xt(e, 15),
      inflateInit2: xt,
      inflate: (e, t) => {
        let r,
          n,
          i,
          a,
          s,
          o,
          u,
          c,
          l,
          h,
          d,
          f,
          p,
          y,
          _,
          g,
          v,
          b,
          m,
          w,
          x,
          z,
          k = 0;
        const A = new Uint8Array(4);
        let S, T;
        const E = new Uint8Array([
          16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
        ]);
        if (!e || !e.state || !e.output || (!e.input && 0 !== e.avail_in))
          return dt;
        (r = e.state),
          12 === r.mode && (r.mode = 13),
          (s = e.next_out),
          (i = e.output),
          (u = e.avail_out),
          (a = e.next_in),
          (n = e.input),
          (o = e.avail_in),
          (c = r.hold),
          (l = r.bits),
          (h = o),
          (d = u),
          (z = ct);
        e: for (;;)
          switch (r.mode) {
            case 1:
              if (0 === r.wrap) {
                r.mode = 13;
                break;
              }
              for (; l < 16; ) {
                if (0 === o) break e;
                o--, (c += n[a++] << l), (l += 8);
              }
              if (2 & r.wrap && 35615 === c) {
                (r.check = 0),
                  (A[0] = 255 & c),
                  (A[1] = (c >>> 8) & 255),
                  (r.check = K(r.check, A, 2, 0)),
                  (c = 0),
                  (l = 0),
                  (r.mode = 2);
                break;
              }
              if (
                ((r.flags = 0),
                r.head && (r.head.done = !1),
                !(1 & r.wrap) || (((255 & c) << 8) + (c >> 8)) % 31)
              ) {
                (e.msg = "incorrect header check"), (r.mode = 30);
                break;
              }
              if ((15 & c) !== _t) {
                (e.msg = "unknown compression method"), (r.mode = 30);
                break;
              }
              if (((c >>>= 4), (l -= 4), (x = 8 + (15 & c)), 0 === r.wbits))
                r.wbits = x;
              else if (x > r.wbits) {
                (e.msg = "invalid window size"), (r.mode = 30);
                break;
              }
              (r.dmax = 1 << r.wbits),
                (e.adler = r.check = 1),
                (r.mode = 512 & c ? 10 : 12),
                (c = 0),
                (l = 0);
              break;
            case 2:
              for (; l < 16; ) {
                if (0 === o) break e;
                o--, (c += n[a++] << l), (l += 8);
              }
              if (((r.flags = c), (255 & r.flags) !== _t)) {
                (e.msg = "unknown compression method"), (r.mode = 30);
                break;
              }
              if (57344 & r.flags) {
                (e.msg = "unknown header flags set"), (r.mode = 30);
                break;
              }
              r.head && (r.head.text = (c >> 8) & 1),
                512 & r.flags &&
                  ((A[0] = 255 & c),
                  (A[1] = (c >>> 8) & 255),
                  (r.check = K(r.check, A, 2, 0))),
                (c = 0),
                (l = 0),
                (r.mode = 3);
            case 3:
              for (; l < 32; ) {
                if (0 === o) break e;
                o--, (c += n[a++] << l), (l += 8);
              }
              r.head && (r.head.time = c),
                512 & r.flags &&
                  ((A[0] = 255 & c),
                  (A[1] = (c >>> 8) & 255),
                  (A[2] = (c >>> 16) & 255),
                  (A[3] = (c >>> 24) & 255),
                  (r.check = K(r.check, A, 4, 0))),
                (c = 0),
                (l = 0),
                (r.mode = 4);
            case 4:
              for (; l < 16; ) {
                if (0 === o) break e;
                o--, (c += n[a++] << l), (l += 8);
              }
              r.head && ((r.head.xflags = 255 & c), (r.head.os = c >> 8)),
                512 & r.flags &&
                  ((A[0] = 255 & c),
                  (A[1] = (c >>> 8) & 255),
                  (r.check = K(r.check, A, 2, 0))),
                (c = 0),
                (l = 0),
                (r.mode = 5);
            case 5:
              if (1024 & r.flags) {
                for (; l < 16; ) {
                  if (0 === o) break e;
                  o--, (c += n[a++] << l), (l += 8);
                }
                (r.length = c),
                  r.head && (r.head.extra_len = c),
                  512 & r.flags &&
                    ((A[0] = 255 & c),
                    (A[1] = (c >>> 8) & 255),
                    (r.check = K(r.check, A, 2, 0))),
                  (c = 0),
                  (l = 0);
              } else r.head && (r.head.extra = null);
              r.mode = 6;
            case 6:
              if (
                1024 & r.flags &&
                ((f = r.length),
                f > o && (f = o),
                f &&
                  (r.head &&
                    ((x = r.head.extra_len - r.length),
                    r.head.extra ||
                      (r.head.extra = new Uint8Array(r.head.extra_len)),
                    r.head.extra.set(n.subarray(a, a + f), x)),
                  512 & r.flags && (r.check = K(r.check, n, f, a)),
                  (o -= f),
                  (a += f),
                  (r.length -= f)),
                r.length)
              )
                break e;
              (r.length = 0), (r.mode = 7);
            case 7:
              if (2048 & r.flags) {
                if (0 === o) break e;
                f = 0;
                do {
                  (x = n[a + f++]),
                    r.head &&
                      x &&
                      r.length < 65536 &&
                      (r.head.name += String.fromCharCode(x));
                } while (x && f < o);
                if (
                  (512 & r.flags && (r.check = K(r.check, n, f, a)),
                  (o -= f),
                  (a += f),
                  x)
                )
                  break e;
              } else r.head && (r.head.name = null);
              (r.length = 0), (r.mode = 8);
            case 8:
              if (4096 & r.flags) {
                if (0 === o) break e;
                f = 0;
                do {
                  (x = n[a + f++]),
                    r.head &&
                      x &&
                      r.length < 65536 &&
                      (r.head.comment += String.fromCharCode(x));
                } while (x && f < o);
                if (
                  (512 & r.flags && (r.check = K(r.check, n, f, a)),
                  (o -= f),
                  (a += f),
                  x)
                )
                  break e;
              } else r.head && (r.head.comment = null);
              r.mode = 9;
            case 9:
              if (512 & r.flags) {
                for (; l < 16; ) {
                  if (0 === o) break e;
                  o--, (c += n[a++] << l), (l += 8);
                }
                if (c !== (65535 & r.check)) {
                  (e.msg = "header crc mismatch"), (r.mode = 30);
                  break;
                }
                (c = 0), (l = 0);
              }
              r.head &&
                ((r.head.hcrc = (r.flags >> 9) & 1), (r.head.done = !0)),
                (e.adler = r.check = 0),
                (r.mode = 12);
              break;
            case 10:
              for (; l < 32; ) {
                if (0 === o) break e;
                o--, (c += n[a++] << l), (l += 8);
              }
              (e.adler = r.check = gt(c)), (c = 0), (l = 0), (r.mode = 11);
            case 11:
              if (0 === r.havedict)
                return (
                  (e.next_out = s),
                  (e.avail_out = u),
                  (e.next_in = a),
                  (e.avail_in = o),
                  (r.hold = c),
                  (r.bits = l),
                  ht
                );
              (e.adler = r.check = 1), (r.mode = 12);
            case 12:
              if (t === ot || t === ut) break e;
            case 13:
              if (r.last) {
                (c >>>= 7 & l), (l -= 7 & l), (r.mode = 27);
                break;
              }
              for (; l < 3; ) {
                if (0 === o) break e;
                o--, (c += n[a++] << l), (l += 8);
              }
              switch (((r.last = 1 & c), (c >>>= 1), (l -= 1), 3 & c)) {
                case 0:
                  r.mode = 14;
                  break;
                case 1:
                  if ((St(r), (r.mode = 20), t === ut)) {
                    (c >>>= 2), (l -= 2);
                    break e;
                  }
                  break;
                case 2:
                  r.mode = 17;
                  break;
                case 3:
                  (e.msg = "invalid block type"), (r.mode = 30);
              }
              (c >>>= 2), (l -= 2);
              break;
            case 14:
              for (c >>>= 7 & l, l -= 7 & l; l < 32; ) {
                if (0 === o) break e;
                o--, (c += n[a++] << l), (l += 8);
              }
              if ((65535 & c) != ((c >>> 16) ^ 65535)) {
                (e.msg = "invalid stored block lengths"), (r.mode = 30);
                break;
              }
              if (
                ((r.length = 65535 & c),
                (c = 0),
                (l = 0),
                (r.mode = 15),
                t === ut)
              )
                break e;
            case 15:
              r.mode = 16;
            case 16:
              if (((f = r.length), f)) {
                if ((f > o && (f = o), f > u && (f = u), 0 === f)) break e;
                i.set(n.subarray(a, a + f), s),
                  (o -= f),
                  (a += f),
                  (u -= f),
                  (s += f),
                  (r.length -= f);
                break;
              }
              r.mode = 12;
              break;
            case 17:
              for (; l < 14; ) {
                if (0 === o) break e;
                o--, (c += n[a++] << l), (l += 8);
              }
              if (
                ((r.nlen = 257 + (31 & c)),
                (c >>>= 5),
                (l -= 5),
                (r.ndist = 1 + (31 & c)),
                (c >>>= 5),
                (l -= 5),
                (r.ncode = 4 + (15 & c)),
                (c >>>= 4),
                (l -= 4),
                r.nlen > 286 || r.ndist > 30)
              ) {
                (e.msg = "too many length or distance symbols"), (r.mode = 30);
                break;
              }
              (r.have = 0), (r.mode = 18);
            case 18:
              for (; r.have < r.ncode; ) {
                for (; l < 3; ) {
                  if (0 === o) break e;
                  o--, (c += n[a++] << l), (l += 8);
                }
                (r.lens[E[r.have++]] = 7 & c), (c >>>= 3), (l -= 3);
              }
              for (; r.have < 19; ) r.lens[E[r.have++]] = 0;
              if (
                ((r.lencode = r.lendyn),
                (r.lenbits = 7),
                (S = { bits: r.lenbits }),
                (z = at(0, r.lens, 0, 19, r.lencode, 0, r.work, S)),
                (r.lenbits = S.bits),
                z)
              ) {
                (e.msg = "invalid code lengths set"), (r.mode = 30);
                break;
              }
              (r.have = 0), (r.mode = 19);
            case 19:
              for (; r.have < r.nlen + r.ndist; ) {
                for (
                  ;
                  (k = r.lencode[c & ((1 << r.lenbits) - 1)]),
                    (_ = k >>> 24),
                    (g = (k >>> 16) & 255),
                    (v = 65535 & k),
                    !(_ <= l);

                ) {
                  if (0 === o) break e;
                  o--, (c += n[a++] << l), (l += 8);
                }
                if (v < 16) (c >>>= _), (l -= _), (r.lens[r.have++] = v);
                else {
                  if (16 === v) {
                    for (T = _ + 2; l < T; ) {
                      if (0 === o) break e;
                      o--, (c += n[a++] << l), (l += 8);
                    }
                    if (((c >>>= _), (l -= _), 0 === r.have)) {
                      (e.msg = "invalid bit length repeat"), (r.mode = 30);
                      break;
                    }
                    (x = r.lens[r.have - 1]),
                      (f = 3 + (3 & c)),
                      (c >>>= 2),
                      (l -= 2);
                  } else if (17 === v) {
                    for (T = _ + 3; l < T; ) {
                      if (0 === o) break e;
                      o--, (c += n[a++] << l), (l += 8);
                    }
                    (c >>>= _),
                      (l -= _),
                      (x = 0),
                      (f = 3 + (7 & c)),
                      (c >>>= 3),
                      (l -= 3);
                  } else {
                    for (T = _ + 7; l < T; ) {
                      if (0 === o) break e;
                      o--, (c += n[a++] << l), (l += 8);
                    }
                    (c >>>= _),
                      (l -= _),
                      (x = 0),
                      (f = 11 + (127 & c)),
                      (c >>>= 7),
                      (l -= 7);
                  }
                  if (r.have + f > r.nlen + r.ndist) {
                    (e.msg = "invalid bit length repeat"), (r.mode = 30);
                    break;
                  }
                  for (; f--; ) r.lens[r.have++] = x;
                }
              }
              if (30 === r.mode) break;
              if (0 === r.lens[256]) {
                (e.msg = "invalid code -- missing end-of-block"), (r.mode = 30);
                break;
              }
              if (
                ((r.lenbits = 9),
                (S = { bits: r.lenbits }),
                (z = at(1, r.lens, 0, r.nlen, r.lencode, 0, r.work, S)),
                (r.lenbits = S.bits),
                z)
              ) {
                (e.msg = "invalid literal/lengths set"), (r.mode = 30);
                break;
              }
              if (
                ((r.distbits = 6),
                (r.distcode = r.distdyn),
                (S = { bits: r.distbits }),
                (z = at(2, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, S)),
                (r.distbits = S.bits),
                z)
              ) {
                (e.msg = "invalid distances set"), (r.mode = 30);
                break;
              }
              if (((r.mode = 20), t === ut)) break e;
            case 20:
              r.mode = 21;
            case 21:
              if (o >= 6 && u >= 258) {
                (e.next_out = s),
                  (e.avail_out = u),
                  (e.next_in = a),
                  (e.avail_in = o),
                  (r.hold = c),
                  (r.bits = l),
                  et(e, d),
                  (s = e.next_out),
                  (i = e.output),
                  (u = e.avail_out),
                  (a = e.next_in),
                  (n = e.input),
                  (o = e.avail_in),
                  (c = r.hold),
                  (l = r.bits),
                  12 === r.mode && (r.back = -1);
                break;
              }
              for (
                r.back = 0;
                (k = r.lencode[c & ((1 << r.lenbits) - 1)]),
                  (_ = k >>> 24),
                  (g = (k >>> 16) & 255),
                  (v = 65535 & k),
                  !(_ <= l);

              ) {
                if (0 === o) break e;
                o--, (c += n[a++] << l), (l += 8);
              }
              if (g && 0 == (240 & g)) {
                for (
                  b = _, m = g, w = v;
                  (k = r.lencode[w + ((c & ((1 << (b + m)) - 1)) >> b)]),
                    (_ = k >>> 24),
                    (g = (k >>> 16) & 255),
                    (v = 65535 & k),
                    !(b + _ <= l);

                ) {
                  if (0 === o) break e;
                  o--, (c += n[a++] << l), (l += 8);
                }
                (c >>>= b), (l -= b), (r.back += b);
              }
              if (
                ((c >>>= _), (l -= _), (r.back += _), (r.length = v), 0 === g)
              ) {
                r.mode = 26;
                break;
              }
              if (32 & g) {
                (r.back = -1), (r.mode = 12);
                break;
              }
              if (64 & g) {
                (e.msg = "invalid literal/length code"), (r.mode = 30);
                break;
              }
              (r.extra = 15 & g), (r.mode = 22);
            case 22:
              if (r.extra) {
                for (T = r.extra; l < T; ) {
                  if (0 === o) break e;
                  o--, (c += n[a++] << l), (l += 8);
                }
                (r.length += c & ((1 << r.extra) - 1)),
                  (c >>>= r.extra),
                  (l -= r.extra),
                  (r.back += r.extra);
              }
              (r.was = r.length), (r.mode = 23);
            case 23:
              for (
                ;
                (k = r.distcode[c & ((1 << r.distbits) - 1)]),
                  (_ = k >>> 24),
                  (g = (k >>> 16) & 255),
                  (v = 65535 & k),
                  !(_ <= l);

              ) {
                if (0 === o) break e;
                o--, (c += n[a++] << l), (l += 8);
              }
              if (0 == (240 & g)) {
                for (
                  b = _, m = g, w = v;
                  (k = r.distcode[w + ((c & ((1 << (b + m)) - 1)) >> b)]),
                    (_ = k >>> 24),
                    (g = (k >>> 16) & 255),
                    (v = 65535 & k),
                    !(b + _ <= l);

                ) {
                  if (0 === o) break e;
                  o--, (c += n[a++] << l), (l += 8);
                }
                (c >>>= b), (l -= b), (r.back += b);
              }
              if (((c >>>= _), (l -= _), (r.back += _), 64 & g)) {
                (e.msg = "invalid distance code"), (r.mode = 30);
                break;
              }
              (r.offset = v), (r.extra = 15 & g), (r.mode = 24);
            case 24:
              if (r.extra) {
                for (T = r.extra; l < T; ) {
                  if (0 === o) break e;
                  o--, (c += n[a++] << l), (l += 8);
                }
                (r.offset += c & ((1 << r.extra) - 1)),
                  (c >>>= r.extra),
                  (l -= r.extra),
                  (r.back += r.extra);
              }
              if (r.offset > r.dmax) {
                (e.msg = "invalid distance too far back"), (r.mode = 30);
                break;
              }
              r.mode = 25;
            case 25:
              if (0 === u) break e;
              if (((f = d - u), r.offset > f)) {
                if (((f = r.offset - f), f > r.whave && r.sane)) {
                  (e.msg = "invalid distance too far back"), (r.mode = 30);
                  break;
                }
                f > r.wnext
                  ? ((f -= r.wnext), (p = r.wsize - f))
                  : (p = r.wnext - f),
                  f > r.length && (f = r.length),
                  (y = r.window);
              } else (y = i), (p = s - r.offset), (f = r.length);
              f > u && (f = u), (u -= f), (r.length -= f);
              do {
                i[s++] = y[p++];
              } while (--f);
              0 === r.length && (r.mode = 21);
              break;
            case 26:
              if (0 === u) break e;
              (i[s++] = r.length), u--, (r.mode = 21);
              break;
            case 27:
              if (r.wrap) {
                for (; l < 32; ) {
                  if (0 === o) break e;
                  o--, (c |= n[a++] << l), (l += 8);
                }
                if (
                  ((d -= u),
                  (e.total_out += d),
                  (r.total += d),
                  d &&
                    (e.adler = r.check =
                      r.flags
                        ? K(r.check, i, d, s - d)
                        : C(r.check, i, d, s - d)),
                  (d = u),
                  (r.flags ? c : gt(c)) !== r.check)
                ) {
                  (e.msg = "incorrect data check"), (r.mode = 30);
                  break;
                }
                (c = 0), (l = 0);
              }
              r.mode = 28;
            case 28:
              if (r.wrap && r.flags) {
                for (; l < 32; ) {
                  if (0 === o) break e;
                  o--, (c += n[a++] << l), (l += 8);
                }
                if (c !== (4294967295 & r.total)) {
                  (e.msg = "incorrect length check"), (r.mode = 30);
                  break;
                }
                (c = 0), (l = 0);
              }
              r.mode = 29;
            case 29:
              z = lt;
              break e;
            case 30:
              z = ft;
              break e;
            case 31:
              return pt;
            case 32:
            default:
              return dt;
          }
        return (
          (e.next_out = s),
          (e.avail_out = u),
          (e.next_in = a),
          (e.avail_in = o),
          (r.hold = c),
          (r.bits = l),
          (r.wsize ||
            (d !== e.avail_out && r.mode < 30 && (r.mode < 27 || t !== st))) &&
            Tt(e, e.output, e.next_out, d - e.avail_out),
          (h -= e.avail_in),
          (d -= e.avail_out),
          (e.total_in += h),
          (e.total_out += d),
          (r.total += d),
          r.wrap &&
            d &&
            (e.adler = r.check =
              r.flags
                ? K(r.check, i, d, e.next_out - d)
                : C(r.check, i, d, e.next_out - d)),
          (e.data_type =
            r.bits +
            (r.last ? 64 : 0) +
            (12 === r.mode ? 128 : 0) +
            (20 === r.mode || 15 === r.mode ? 256 : 0)),
          ((0 === h && 0 === d) || t === st) && z === ct && (z = yt),
          z
        );
      },
      inflateEnd: (e) => {
        if (!e || !e.state) return dt;
        let t = e.state;
        return t.window && (t.window = null), (e.state = null), ct;
      },
      inflateGetHeader: (e, t) => {
        if (!e || !e.state) return dt;
        const r = e.state;
        return 0 == (2 & r.wrap) ? dt : ((r.head = t), (t.done = !1), ct);
      },
      inflateSetDictionary: (e, t) => {
        const r = t.length;
        let n, i, a;
        return e && e.state
          ? ((n = e.state),
            0 !== n.wrap && 11 !== n.mode
              ? dt
              : 11 === n.mode && ((i = 1), (i = C(i, t, r, 0)), i !== n.check)
              ? ft
              : ((a = Tt(e, t, r, r)),
                a ? ((n.mode = 31), pt) : ((n.havedict = 1), ct)))
          : dt;
      },
      inflateInfo: "pako inflate (from Nodeca project)",
    };
    var Ut = function () {
      (this.text = 0),
        (this.time = 0),
        (this.xflags = 0),
        (this.os = 0),
        (this.extra = null),
        (this.extra_len = 0),
        (this.name = ""),
        (this.comment = ""),
        (this.hcrc = 0),
        (this.done = !1);
    };
    const Nt = Object.prototype.toString,
      {
        Z_NO_FLUSH: Dt,
        Z_FINISH: Ot,
        Z_OK: Rt,
        Z_STREAM_END: Pt,
        Z_NEED_DICT: Bt,
        Z_STREAM_ERROR: Ct,
        Z_DATA_ERROR: Ft,
        Z_MEM_ERROR: Kt,
      } = L;
    function jt(e) {
      this.options = Ce.assign(
        { chunkSize: 65536, windowBits: 15, to: "" },
        e || {}
      );
      const t = this.options;
      t.raw &&
        t.windowBits >= 0 &&
        t.windowBits < 16 &&
        ((t.windowBits = -t.windowBits),
        0 === t.windowBits && (t.windowBits = -15)),
        !(t.windowBits >= 0 && t.windowBits < 16) ||
          (e && e.windowBits) ||
          (t.windowBits += 32),
        t.windowBits > 15 &&
          t.windowBits < 48 &&
          0 == (15 & t.windowBits) &&
          (t.windowBits |= 15),
        (this.err = 0),
        (this.msg = ""),
        (this.ended = !1),
        (this.chunks = []),
        (this.strm = new Le()),
        (this.strm.avail_out = 0);
      let r = Et.inflateInit2(this.strm, t.windowBits);
      if (r !== Rt) throw new Error(j[r]);
      if (
        ((this.header = new Ut()),
        Et.inflateGetHeader(this.strm, this.header),
        t.dictionary &&
          ("string" == typeof t.dictionary
            ? (t.dictionary = je.string2buf(t.dictionary))
            : "[object ArrayBuffer]" === Nt.call(t.dictionary) &&
              (t.dictionary = new Uint8Array(t.dictionary)),
          t.raw &&
            ((r = Et.inflateSetDictionary(this.strm, t.dictionary)), r !== Rt)))
      )
        throw new Error(j[r]);
    }
    function Lt(e, t) {
      const r = new jt(t);
      if ((r.push(e), r.err)) throw r.msg || j[r.err];
      return r.result;
    }
    (jt.prototype.push = function (e, t) {
      const r = this.strm,
        n = this.options.chunkSize,
        i = this.options.dictionary;
      let a, s, o;
      if (this.ended) return !1;
      for (
        s = t === ~~t ? t : !0 === t ? Ot : Dt,
          "[object ArrayBuffer]" === Nt.call(e)
            ? (r.input = new Uint8Array(e))
            : (r.input = e),
          r.next_in = 0,
          r.avail_in = r.input.length;
        ;

      ) {
        for (
          0 === r.avail_out &&
            ((r.output = new Uint8Array(n)),
            (r.next_out = 0),
            (r.avail_out = n)),
            a = Et.inflate(r, s),
            a === Bt &&
              i &&
              ((a = Et.inflateSetDictionary(r, i)),
              a === Rt ? (a = Et.inflate(r, s)) : a === Ft && (a = Bt));
          r.avail_in > 0 && a === Pt && r.state.wrap > 0 && 0 !== e[r.next_in];

        )
          Et.inflateReset(r), (a = Et.inflate(r, s));
        switch (a) {
          case Ct:
          case Ft:
          case Bt:
          case Kt:
            return this.onEnd(a), (this.ended = !0), !1;
        }
        if (((o = r.avail_out), r.next_out && (0 === r.avail_out || a === Pt)))
          if ("string" === this.options.to) {
            let e = je.utf8border(r.output, r.next_out),
              t = r.next_out - e,
              i = je.buf2string(r.output, e);
            (r.next_out = t),
              (r.avail_out = n - t),
              t && r.output.set(r.output.subarray(e, e + t), 0),
              this.onData(i);
          } else
            this.onData(
              r.output.length === r.next_out
                ? r.output
                : r.output.subarray(0, r.next_out)
            );
        if (a !== Rt || 0 !== o) {
          if (a === Pt)
            return (
              (a = Et.inflateEnd(this.strm)),
              this.onEnd(a),
              (this.ended = !0),
              !0
            );
          if (0 === r.avail_in) break;
        }
      }
      return !0;
    }),
      (jt.prototype.onData = function (e) {
        this.chunks.push(e);
      }),
      (jt.prototype.onEnd = function (e) {
        e === Rt &&
          ("string" === this.options.to
            ? (this.result = this.chunks.join(""))
            : (this.result = Ce.flattenChunks(this.chunks))),
          (this.chunks = []),
          (this.err = e),
          (this.msg = this.strm.msg);
      });
    var It = {
      Inflate: jt,
      inflate: Lt,
      inflateRaw: function (e, t) {
        return ((t = t || {}).raw = !0), Lt(e, t);
      },
      ungzip: Lt,
      constants: L,
    };
    const { Deflate: Zt, deflate: Ht, deflateRaw: Mt, gzip: Vt } = Qe,
      { Inflate: Wt, inflate: Gt, inflateRaw: Jt, ungzip: qt } = It;
    var Yt = Zt,
      $t = Ht,
      Xt = Mt,
      Qt = Vt,
      er = Wt,
      tr = Gt,
      rr = Jt,
      nr = qt,
      ir = L,
      ar = {
        Deflate: Yt,
        deflate: $t,
        deflateRaw: Xt,
        gzip: Qt,
        Inflate: er,
        inflate: tr,
        inflateRaw: rr,
        ungzip: nr,
        constants: ir,
      };
    t.default = ar;
  },
  function (e, t, r) {
    var n = t;
    (n.utils = r(0)),
      (n.common = r(2)),
      (n.sha = r(15)),
      (n.ripemd = r(19)),
      (n.hmac = r(20)),
      (n.sha1 = n.sha.sha1),
      (n.sha256 = n.sha.sha256),
      (n.sha224 = n.sha.sha224),
      (n.sha384 = n.sha.sha384),
      (n.sha512 = n.sha.sha512),
      (n.ripemd160 = n.ripemd.ripemd160);
  },
  function (e, t) {
    "function" == typeof Object.create
      ? (e.exports = function (e, t) {
          t &&
            ((e.super_ = t),
            (e.prototype = Object.create(t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })));
        })
      : (e.exports = function (e, t) {
          if (t) {
            e.super_ = t;
            var r = function () {};
            (r.prototype = t.prototype),
              (e.prototype = new r()),
              (e.prototype.constructor = e);
          }
        });
  },
  function (e, t, r) {
    "use strict";
    (t.sha1 = r(16)),
      (t.sha224 = r(17)),
      (t.sha256 = r(6)),
      (t.sha384 = r(18)),
      (t.sha512 = r(7));
  },
  function (e, t, r) {
    "use strict";
    var n = r(0),
      i = r(2),
      a = r(5),
      s = n.rotl32,
      o = n.sum32,
      u = n.sum32_5,
      c = a.ft_1,
      l = i.BlockHash,
      h = [1518500249, 1859775393, 2400959708, 3395469782];
    function d() {
      if (!(this instanceof d)) return new d();
      l.call(this),
        (this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
        (this.W = new Array(80));
    }
    n.inherits(d, l),
      (e.exports = d),
      (d.blockSize = 512),
      (d.outSize = 160),
      (d.hmacStrength = 80),
      (d.padLength = 64),
      (d.prototype._update = function (e, t) {
        for (var r = this.W, n = 0; n < 16; n++) r[n] = e[t + n];
        for (; n < r.length; n++)
          r[n] = s(r[n - 3] ^ r[n - 8] ^ r[n - 14] ^ r[n - 16], 1);
        var i = this.h[0],
          a = this.h[1],
          l = this.h[2],
          d = this.h[3],
          f = this.h[4];
        for (n = 0; n < r.length; n++) {
          var p = ~~(n / 20),
            y = u(s(i, 5), c(p, a, l, d), f, r[n], h[p]);
          (f = d), (d = l), (l = s(a, 30)), (a = i), (i = y);
        }
        (this.h[0] = o(this.h[0], i)),
          (this.h[1] = o(this.h[1], a)),
          (this.h[2] = o(this.h[2], l)),
          (this.h[3] = o(this.h[3], d)),
          (this.h[4] = o(this.h[4], f));
      }),
      (d.prototype._digest = function (e) {
        return "hex" === e
          ? n.toHex32(this.h, "big")
          : n.split32(this.h, "big");
      });
  },
  function (e, t, r) {
    "use strict";
    var n = r(0),
      i = r(6);
    function a() {
      if (!(this instanceof a)) return new a();
      i.call(this),
        (this.h = [
          3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025,
          1694076839, 3204075428,
        ]);
    }
    n.inherits(a, i),
      (e.exports = a),
      (a.blockSize = 512),
      (a.outSize = 224),
      (a.hmacStrength = 192),
      (a.padLength = 64),
      (a.prototype._digest = function (e) {
        return "hex" === e
          ? n.toHex32(this.h.slice(0, 7), "big")
          : n.split32(this.h.slice(0, 7), "big");
      });
  },
  function (e, t, r) {
    "use strict";
    var n = r(0),
      i = r(7);
    function a() {
      if (!(this instanceof a)) return new a();
      i.call(this),
        (this.h = [
          3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999,
          355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025,
          3675008525, 1694076839, 1203062813, 3204075428,
        ]);
    }
    n.inherits(a, i),
      (e.exports = a),
      (a.blockSize = 1024),
      (a.outSize = 384),
      (a.hmacStrength = 192),
      (a.padLength = 128),
      (a.prototype._digest = function (e) {
        return "hex" === e
          ? n.toHex32(this.h.slice(0, 12), "big")
          : n.split32(this.h.slice(0, 12), "big");
      });
  },
  function (e, t, r) {
    "use strict";
    var n = r(0),
      i = r(2),
      a = n.rotl32,
      s = n.sum32,
      o = n.sum32_3,
      u = n.sum32_4,
      c = i.BlockHash;
    function l() {
      if (!(this instanceof l)) return new l();
      c.call(this),
        (this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
        (this.endian = "little");
    }
    function h(e, t, r, n) {
      return e <= 15
        ? t ^ r ^ n
        : e <= 31
        ? (t & r) | (~t & n)
        : e <= 47
        ? (t | ~r) ^ n
        : e <= 63
        ? (t & n) | (r & ~n)
        : t ^ (r | ~n);
    }
    function d(e) {
      return e <= 15
        ? 0
        : e <= 31
        ? 1518500249
        : e <= 47
        ? 1859775393
        : e <= 63
        ? 2400959708
        : 2840853838;
    }
    function f(e) {
      return e <= 15
        ? 1352829926
        : e <= 31
        ? 1548603684
        : e <= 47
        ? 1836072691
        : e <= 63
        ? 2053994217
        : 0;
    }
    n.inherits(l, c),
      (t.ripemd160 = l),
      (l.blockSize = 512),
      (l.outSize = 160),
      (l.hmacStrength = 192),
      (l.padLength = 64),
      (l.prototype._update = function (e, t) {
        for (
          var r = this.h[0],
            n = this.h[1],
            i = this.h[2],
            c = this.h[3],
            l = this.h[4],
            v = r,
            b = n,
            m = i,
            w = c,
            x = l,
            z = 0;
          z < 80;
          z++
        ) {
          var k = s(a(u(r, h(z, n, i, c), e[p[z] + t], d(z)), _[z]), l);
          (r = l),
            (l = c),
            (c = a(i, 10)),
            (i = n),
            (n = k),
            (k = s(a(u(v, h(79 - z, b, m, w), e[y[z] + t], f(z)), g[z]), x)),
            (v = x),
            (x = w),
            (w = a(m, 10)),
            (m = b),
            (b = k);
        }
        (k = o(this.h[1], i, w)),
          (this.h[1] = o(this.h[2], c, x)),
          (this.h[2] = o(this.h[3], l, v)),
          (this.h[3] = o(this.h[4], r, b)),
          (this.h[4] = o(this.h[0], n, m)),
          (this.h[0] = k);
      }),
      (l.prototype._digest = function (e) {
        return "hex" === e
          ? n.toHex32(this.h, "little")
          : n.split32(this.h, "little");
      });
    var p = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10,
        6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0,
        6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
        4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
      ],
      y = [
        5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0,
        13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8,
        12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10,
        14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
      ],
      _ = [
        11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11,
        9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14,
        8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6,
        5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
      ],
      g = [
        8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7,
        12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12,
        13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12,
        5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
      ];
  },
  function (e, t, r) {
    "use strict";
    var n = r(0),
      i = r(1);
    function a(e, t, r) {
      if (!(this instanceof a)) return new a(e, t, r);
      (this.Hash = e),
        (this.blockSize = e.blockSize / 8),
        (this.outSize = e.outSize / 8),
        (this.inner = null),
        (this.outer = null),
        this._init(n.toArray(t, r));
    }
    (e.exports = a),
      (a.prototype._init = function (e) {
        e.length > this.blockSize && (e = new this.Hash().update(e).digest()),
          i(e.length <= this.blockSize);
        for (var t = e.length; t < this.blockSize; t++) e.push(0);
        for (t = 0; t < e.length; t++) e[t] ^= 54;
        for (this.inner = new this.Hash().update(e), t = 0; t < e.length; t++)
          e[t] ^= 106;
        this.outer = new this.Hash().update(e);
      }),
      (a.prototype.update = function (e, t) {
        return this.inner.update(e, t), this;
      }),
      (a.prototype.digest = function (e) {
        return this.outer.update(this.inner.digest()), this.outer.digest(e);
      });
  },
  function (e, t, r) {
    "use strict";
    var n = function (e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e))
          return (function (e, t) {
            var r = [],
              n = !0,
              i = !1,
              a = void 0;
            try {
              for (
                var s, o = e[Symbol.iterator]();
                !(n = (s = o.next()).done) &&
                (r.push(s.value), !t || r.length !== t);
                n = !0
              );
            } catch (e) {
              (i = !0), (a = e);
            } finally {
              try {
                !n && o.return && o.return();
              } finally {
                if (i) throw a;
              }
            }
            return r;
          })(e, t);
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      },
      i = (function () {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        return function (t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      })();
    var a = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e);
      }
      return (
        i(e, null, [
          {
            key: "get_n_pad_bytes",
            value: function (e) {
              return 64 - ((e + 8) & 63);
            },
          },
          {
            key: "pad",
            value: function (t) {
              var r,
                i,
                a = t.byteLength,
                s = e.get_n_pad_bytes(a),
                o = ((r = a), (i = 536870912), [Math.floor(r / i), r % i]).map(
                  function (e, t) {
                    return t ? 8 * e : e;
                  }
                ),
                u = n(o, 2),
                c = u[0],
                l = u[1],
                h = new Uint8Array(a + s + 8);
              h.set(new Uint8Array(t), 0);
              var d = new DataView(h.buffer);
              return (
                d.setUint8(a, 128),
                d.setUint32(a + s, l, !0),
                d.setUint32(a + s + 4, c, !0),
                h.buffer
              );
            },
          },
          {
            key: "f",
            value: function (e, t, r, n) {
              return 0 <= e && e <= 15
                ? t ^ r ^ n
                : 16 <= e && e <= 31
                ? (t & r) | (~t & n)
                : 32 <= e && e <= 47
                ? (t | ~r) ^ n
                : 48 <= e && e <= 63
                ? (t & n) | (r & ~n)
                : 64 <= e && e <= 79
                ? t ^ (r | ~n)
                : void 0;
            },
          },
          {
            key: "K",
            value: function (e) {
              return 0 <= e && e <= 15
                ? 0
                : 16 <= e && e <= 31
                ? 1518500249
                : 32 <= e && e <= 47
                ? 1859775393
                : 48 <= e && e <= 63
                ? 2400959708
                : 64 <= e && e <= 79
                ? 2840853838
                : void 0;
            },
          },
          {
            key: "KP",
            value: function (e) {
              return 0 <= e && e <= 15
                ? 1352829926
                : 16 <= e && e <= 31
                ? 1548603684
                : 32 <= e && e <= 47
                ? 1836072691
                : 48 <= e && e <= 63
                ? 2053994217
                : 64 <= e && e <= 79
                ? 0
                : void 0;
            },
          },
          {
            key: "add_modulo32",
            value: function () {
              return (
                0 |
                Array.from(arguments).reduce(function (e, t) {
                  return e + t;
                }, 0)
              );
            },
          },
          {
            key: "rol32",
            value: function (e, t) {
              return (e << t) | (e >>> (32 - t));
            },
          },
          {
            key: "hash",
            value: function (t) {
              for (
                var r = e.pad(t),
                  n = [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4,
                    13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14,
                    4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0,
                    8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2,
                    10, 14, 1, 3, 8, 11, 6, 15, 13,
                  ],
                  i = [
                    5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11,
                    3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3,
                    7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11,
                    15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8,
                    7, 6, 2, 13, 14, 0, 3, 9, 11,
                  ],
                  a = [
                    11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7,
                    6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13,
                    6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14,
                    15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6,
                    8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
                  ],
                  s = [
                    8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9,
                    13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7,
                    15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8,
                    11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9,
                    12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
                  ],
                  o = r.byteLength / 64,
                  u = new Array(o).fill(void 0).map(function (e, t) {
                    return function (e) {
                      return new DataView(r, 64 * t, 64).getUint32(4 * e, !0);
                    };
                  }),
                  c = [
                    1732584193, 4023233417, 2562383102, 271733878, 3285377520,
                  ],
                  l = 0;
                l < o;
                ++l
              ) {
                for (
                  var h = c[0],
                    d = c[1],
                    f = c[2],
                    p = c[3],
                    y = c[4],
                    _ = h,
                    g = d,
                    v = f,
                    b = p,
                    m = y,
                    w = 0;
                  w < 80;
                  ++w
                ) {
                  var x = e.add_modulo32(
                    e.rol32(
                      e.add_modulo32(h, e.f(w, d, f, p), u[l](n[w]), e.K(w)),
                      a[w]
                    ),
                    y
                  );
                  (h = y),
                    (y = p),
                    (p = e.rol32(f, 10)),
                    (f = d),
                    (d = x),
                    (x = e.add_modulo32(
                      e.rol32(
                        e.add_modulo32(
                          _,
                          e.f(79 - w, g, v, b),
                          u[l](i[w]),
                          e.KP(w)
                        ),
                        s[w]
                      ),
                      m
                    )),
                    (_ = m),
                    (m = b),
                    (b = e.rol32(v, 10)),
                    (v = g),
                    (g = x);
                }
                var z = e.add_modulo32(c[1], f, b);
                (c[1] = e.add_modulo32(c[2], p, m)),
                  (c[2] = e.add_modulo32(c[3], y, _)),
                  (c[3] = e.add_modulo32(c[4], h, g)),
                  (c[4] = e.add_modulo32(c[0], d, v)),
                  (c[0] = z);
              }
              var k = new ArrayBuffer(20),
                A = new DataView(k);
              return (
                c.forEach(function (e, t) {
                  return A.setUint32(4 * t, e, !0);
                }),
                k
              );
            },
          },
        ]),
        e
      );
    })();
    e.exports = { RIPEMD160: a };
  },
  function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
  },
  function (e, t, r) {
    "use strict";
    (function (e) {
      var n =
          (this && this.__awaiter) ||
          function (e, t, r, n) {
            return new (r || (r = Promise))(function (i, a) {
              function s(e) {
                try {
                  u(n.next(e));
                } catch (e) {
                  a(e);
                }
              }
              function o(e) {
                try {
                  u(n.throw(e));
                } catch (e) {
                  a(e);
                }
              }
              function u(e) {
                var t;
                e.done
                  ? i(e.value)
                  : ((t = e.value),
                    t instanceof r
                      ? t
                      : new r(function (e) {
                          e(t);
                        })).then(s, o);
              }
              u((n = n.apply(e, t || [])).next());
            });
          },
        i =
          (this && this.__generator) ||
          function (e, t) {
            var r,
              n,
              i,
              a,
              s = {
                label: 0,
                sent: function () {
                  if (1 & i[0]) throw i[1];
                  return i[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (a = { next: o(0), throw: o(1), return: o(2) }),
              "function" == typeof Symbol &&
                (a[Symbol.iterator] = function () {
                  return this;
                }),
              a
            );
            function o(a) {
              return function (o) {
                return (function (a) {
                  if (r) throw new TypeError("Generator is already executing.");
                  for (; s; )
                    try {
                      if (
                        ((r = 1),
                        n &&
                          (i =
                            2 & a[0]
                              ? n.return
                              : a[0]
                              ? n.throw || ((i = n.return) && i.call(n), 0)
                              : n.next) &&
                          !(i = i.call(n, a[1])).done)
                      )
                        return i;
                      switch (((n = 0), i && (a = [2 & a[0], i.value]), a[0])) {
                        case 0:
                        case 1:
                          i = a;
                          break;
                        case 4:
                          return s.label++, { value: a[1], done: !1 };
                        case 5:
                          s.label++, (n = a[1]), (a = [0]);
                          continue;
                        case 7:
                          (a = s.ops.pop()), s.trys.pop();
                          continue;
                        default:
                          if (
                            !(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
                            (6 === a[0] || 2 === a[0])
                          ) {
                            s = 0;
                            continue;
                          }
                          if (
                            3 === a[0] &&
                            (!i || (a[1] > i[0] && a[1] < i[3]))
                          ) {
                            s.label = a[1];
                            break;
                          }
                          if (6 === a[0] && s.label < i[1]) {
                            (s.label = i[1]), (i = a);
                            break;
                          }
                          if (i && s.label < i[2]) {
                            (s.label = i[2]), s.ops.push(a);
                            break;
                          }
                          i[2] && s.ops.pop(), s.trys.pop();
                          continue;
                      }
                      a = t.call(e, s);
                    } catch (e) {
                      (a = [6, e]), (n = 0);
                    } finally {
                      r = i = 0;
                    }
                  if (5 & a[0]) throw a[1];
                  return { value: a[0] ? a[1] : void 0, done: !0 };
                })([a, o]);
              };
            }
          },
        a =
          (this && this.__values) ||
          function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
              r = t && e[t],
              n = 0;
            if (r) return r.call(e);
            if (e && "number" == typeof e.length)
              return {
                next: function () {
                  return (
                    e && n >= e.length && (e = void 0),
                    { value: e && e[n++], done: !e }
                  );
                },
              };
            throw new TypeError(
              t ? "Object is not iterable." : "Symbol.iterator is not defined."
            );
          };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.JsonRpc = void 0);
      var s = r(3),
        o = r(8),
        u = function (e) {
          var t,
            r,
            n = "";
          try {
            for (var i = a(e), s = i.next(); !s.done; s = i.next()) {
              n += ("00" + s.value.toString(16)).slice(-2);
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              s && !s.done && (r = i.return) && r.call(i);
            } finally {
              if (t) throw t.error;
            }
          }
          return n;
        },
        c = (function () {
          function t(t, r) {
            void 0 === r && (r = {}),
              (this.endpoint = t.replace(/\/$/, "")),
              r.fetch
                ? (this.fetchBuiltin = r.fetch)
                : (this.fetchBuiltin = e.fetch);
          }
          return (
            (t.prototype.fetch = function (e, t) {
              return n(this, void 0, void 0, function () {
                var r, n, a;
                return i(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return (
                        i.trys.push([0, 3, , 4]),
                        [
                          4,
                          (0, this.fetchBuiltin)(this.endpoint + e, {
                            body: JSON.stringify(t),
                            method: "POST",
                          }),
                        ]
                      );
                    case 1:
                      return [4, (r = i.sent()).json()];
                    case 2:
                      if ((n = i.sent()).processed && n.processed.except)
                        throw new o.RpcError(n);
                      if (n.result && n.result.except) throw new o.RpcError(n);
                      return [3, 4];
                    case 3:
                      throw (((a = i.sent()).isFetchError = !0), a);
                    case 4:
                      if (!r.ok) throw new o.RpcError(n);
                      return [2, n];
                  }
                });
              });
            }),
            (t.prototype.abi_bin_to_json = function (e, t, r) {
              return n(this, void 0, void 0, function () {
                return i(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/abi_bin_to_json", {
                          code: e,
                          action: t,
                          binargs: r,
                        }),
                      ];
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.abi_json_to_bin = function (e, t, r) {
              return n(this, void 0, void 0, function () {
                return i(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/abi_json_to_bin", {
                          code: e,
                          action: t,
                          args: r,
                        }),
                      ];
                    case 1:
                      return [2, n.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_abi = function (e) {
              return n(this, void 0, void 0, function () {
                return i(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_abi", { account_name: e }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_account = function (e) {
              return n(this, void 0, void 0, function () {
                return i(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_account", {
                          account_name: e,
                        }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_accounts_by_authorizers = function (e, t) {
              return n(this, void 0, void 0, function () {
                return i(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_accounts_by_authorizers", {
                          accounts: e,
                          keys: t,
                        }),
                      ];
                    case 1:
                      return [2, r.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_activated_protocol_features = function (e) {
              var t = e.limit,
                r = void 0 === t ? 10 : t,
                a = e.search_by_block_num,
                s = void 0 !== a && a,
                o = e.reverse,
                u = void 0 !== o && o,
                c = e.lower_bound,
                l = void 0 === c ? null : c,
                h = e.upper_bound,
                d = void 0 === h ? null : h;
              return n(this, void 0, void 0, function () {
                return i(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch(
                          "/v1/chain/get_activated_protocol_features",
                          {
                            lower_bound: l,
                            upper_bound: d,
                            limit: r,
                            search_by_block_num: s,
                            reverse: u,
                          }
                        ),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_block_header_state = function (e) {
              return n(this, void 0, void 0, function () {
                return i(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_block_header_state", {
                          block_num_or_id: e,
                        }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_block_info = function (e) {
              return n(this, void 0, void 0, function () {
                return i(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_block_info", {
                          block_num: e,
                        }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_block = function (e) {
              return n(this, void 0, void 0, function () {
                return i(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_block", {
                          block_num_or_id: e,
                        }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_code = function (e) {
              return n(this, void 0, void 0, function () {
                return i(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_code", {
                          account_name: e,
                          code_as_wasm: !0,
                        }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_code_hash = function (e) {
              return n(this, void 0, void 0, function () {
                return i(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_code_hash", {
                          account_name: e,
                        }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_currency_balance = function (e, t, r) {
              return (
                void 0 === r && (r = null),
                n(this, void 0, void 0, function () {
                  return i(this, function (n) {
                    switch (n.label) {
                      case 0:
                        return [
                          4,
                          this.fetch("/v1/chain/get_currency_balance", {
                            code: e,
                            account: t,
                            symbol: r,
                          }),
                        ];
                      case 1:
                        return [2, n.sent()];
                    }
                  });
                })
              );
            }),
            (t.prototype.get_currency_stats = function (e, t) {
              return n(this, void 0, void 0, function () {
                return i(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_currency_stats", {
                          code: e,
                          symbol: t,
                        }),
                      ];
                    case 1:
                      return [2, r.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_info = function () {
              return n(this, void 0, void 0, function () {
                return i(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [4, this.fetch("/v1/chain/get_info", {})];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_producer_schedule = function () {
              return n(this, void 0, void 0, function () {
                return i(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_producer_schedule", {}),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_producers = function (e, t, r) {
              return (
                void 0 === e && (e = !0),
                void 0 === t && (t = ""),
                void 0 === r && (r = 50),
                n(this, void 0, void 0, function () {
                  return i(this, function (n) {
                    switch (n.label) {
                      case 0:
                        return [
                          4,
                          this.fetch("/v1/chain/get_producers", {
                            json: e,
                            lower_bound: t,
                            limit: r,
                          }),
                        ];
                      case 1:
                        return [2, n.sent()];
                    }
                  });
                })
              );
            }),
            (t.prototype.get_raw_code_and_abi = function (e) {
              return n(this, void 0, void 0, function () {
                return i(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_raw_code_and_abi", {
                          account_name: e,
                        }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (t.prototype.getRawAbi = function (e) {
              return n(this, void 0, void 0, function () {
                var t, r;
                return i(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return [4, this.get_raw_abi(e)];
                    case 1:
                      return (
                        (t = n.sent()),
                        (r = s.base64ToBinary(t.abi)),
                        [2, { accountName: t.account_name, abi: r }]
                      );
                  }
                });
              });
            }),
            (t.prototype.get_raw_abi = function (e) {
              return n(this, void 0, void 0, function () {
                return i(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_raw_abi", {
                          account_name: e,
                        }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_scheduled_transactions = function (e, t, r) {
              return (
                void 0 === e && (e = !0),
                void 0 === t && (t = ""),
                void 0 === r && (r = 50),
                n(this, void 0, void 0, function () {
                  return i(this, function (n) {
                    switch (n.label) {
                      case 0:
                        return [
                          4,
                          this.fetch("/v1/chain/get_scheduled_transactions", {
                            json: e,
                            lower_bound: t,
                            limit: r,
                          }),
                        ];
                      case 1:
                        return [2, n.sent()];
                    }
                  });
                })
              );
            }),
            (t.prototype.get_table_rows = function (e) {
              var t = e.json,
                r = void 0 === t || t,
                a = e.code,
                s = e.scope,
                o = e.table,
                u = e.lower_bound,
                c = void 0 === u ? "" : u,
                l = e.upper_bound,
                h = void 0 === l ? "" : l,
                d = e.index_position,
                f = void 0 === d ? 1 : d,
                p = e.key_type,
                y = void 0 === p ? "" : p,
                _ = e.limit,
                g = void 0 === _ ? 10 : _,
                v = e.reverse,
                b = void 0 !== v && v,
                m = e.show_payer,
                w = void 0 !== m && m;
              return n(this, void 0, void 0, function () {
                return i(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_table_rows", {
                          json: r,
                          code: a,
                          scope: s,
                          table: o,
                          lower_bound: c,
                          upper_bound: h,
                          index_position: f,
                          key_type: y,
                          limit: g,
                          reverse: b,
                          show_payer: w,
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_kv_table_rows = function (e) {
              var t = e.json,
                r = void 0 === t || t,
                a = e.code,
                s = e.table,
                o = e.index_name,
                u = e.encode_type,
                c = void 0 === u ? "bytes" : u,
                l = e.index_value,
                h = e.lower_bound,
                d = e.upper_bound,
                f = e.limit,
                p = void 0 === f ? 10 : f,
                y = e.reverse,
                _ = void 0 !== y && y,
                g = e.show_payer,
                v = void 0 !== g && g;
              return n(this, void 0, void 0, function () {
                return i(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_kv_table_rows", {
                          json: r,
                          code: a,
                          table: s,
                          index_name: o,
                          encode_type: c,
                          index_value: l,
                          lower_bound: h,
                          upper_bound: d,
                          limit: p,
                          reverse: _,
                          show_payer: v,
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.get_table_by_scope = function (e) {
              var t = e.code,
                r = e.table,
                a = e.lower_bound,
                s = void 0 === a ? "" : a,
                o = e.upper_bound,
                u = void 0 === o ? "" : o,
                c = e.limit,
                l = void 0 === c ? 10 : c;
              return n(this, void 0, void 0, function () {
                return i(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_table_by_scope", {
                          code: t,
                          table: r,
                          lower_bound: s,
                          upper_bound: u,
                          limit: l,
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.getRequiredKeys = function (e) {
              return n(this, void 0, void 0, function () {
                var t;
                return i(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return (
                        (t = s.convertLegacyPublicKeys),
                        [
                          4,
                          this.fetch("/v1/chain/get_required_keys", {
                            transaction: e.transaction,
                            available_keys: e.availableKeys,
                          }),
                        ]
                      );
                    case 1:
                      return [2, t.apply(void 0, [r.sent().required_keys])];
                  }
                });
              });
            }),
            (t.prototype.push_transaction = function (e) {
              var t = e.signatures,
                r = e.compression,
                a = void 0 === r ? 0 : r,
                s = e.serializedTransaction,
                o = e.serializedContextFreeData;
              return n(this, void 0, void 0, function () {
                return i(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/push_transaction", {
                          signatures: t,
                          compression: a,
                          packed_context_free_data: u(o || new Uint8Array(0)),
                          packed_trx: u(s),
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.push_ro_transaction = function (e, t) {
              var r = e.signatures,
                a = e.compression,
                s = void 0 === a ? 0 : a,
                o = e.serializedTransaction;
              return (
                void 0 === t && (t = !1),
                n(this, void 0, void 0, function () {
                  return i(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return [
                          4,
                          this.fetch("/v1/chain/push_ro_transaction", {
                            transaction: {
                              signatures: r,
                              compression: s,
                              packed_context_free_data: u(new Uint8Array(0)),
                              packed_trx: u(o),
                            },
                            return_failure_traces: t,
                          }),
                        ];
                      case 1:
                        return [2, e.sent()];
                    }
                  });
                })
              );
            }),
            (t.prototype.push_transactions = function (e) {
              return n(this, void 0, void 0, function () {
                var t;
                return i(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return (
                        (t = e.map(function (e) {
                          var t = e.signatures,
                            r = e.compression,
                            n = void 0 === r ? 0 : r,
                            i = e.serializedTransaction,
                            a = e.serializedContextFreeData;
                          return {
                            signatures: t,
                            compression: n,
                            packed_context_free_data: u(a || new Uint8Array(0)),
                            packed_trx: u(i),
                          };
                        })),
                        [4, this.fetch("/v1/chain/push_transactions", t)]
                      );
                    case 1:
                      return [2, r.sent()];
                  }
                });
              });
            }),
            (t.prototype.send_transaction = function (e) {
              var t = e.signatures,
                r = e.compression,
                a = void 0 === r ? 0 : r,
                s = e.serializedTransaction,
                o = e.serializedContextFreeData;
              return n(this, void 0, void 0, function () {
                return i(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/send_transaction", {
                          signatures: t,
                          compression: a,
                          packed_context_free_data: u(o || new Uint8Array(0)),
                          packed_trx: u(s),
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.db_size_get = function () {
              return n(this, void 0, void 0, function () {
                return i(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [4, this.fetch("/v1/db_size/get", {})];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (t.prototype.trace_get_block = function (e) {
              return n(this, void 0, void 0, function () {
                return i(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/trace_api/get_block", { block_num: e }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (t.prototype.history_get_actions = function (e, t, r) {
              return (
                void 0 === t && (t = null),
                void 0 === r && (r = null),
                n(this, void 0, void 0, function () {
                  return i(this, function (n) {
                    switch (n.label) {
                      case 0:
                        return [
                          4,
                          this.fetch("/v1/history/get_actions", {
                            account_name: e,
                            pos: t,
                            offset: r,
                          }),
                        ];
                      case 1:
                        return [2, n.sent()];
                    }
                  });
                })
              );
            }),
            (t.prototype.history_get_transaction = function (e, t) {
              return (
                void 0 === t && (t = null),
                n(this, void 0, void 0, function () {
                  return i(this, function (r) {
                    switch (r.label) {
                      case 0:
                        return [
                          4,
                          this.fetch("/v1/history/get_transaction", {
                            id: e,
                            block_num_hint: t,
                          }),
                        ];
                      case 1:
                        return [2, r.sent()];
                    }
                  });
                })
              );
            }),
            (t.prototype.history_get_key_accounts = function (e) {
              return n(this, void 0, void 0, function () {
                return i(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/history/get_key_accounts", {
                          public_key: e,
                        }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (t.prototype.history_get_controlled_accounts = function (e) {
              return n(this, void 0, void 0, function () {
                return i(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/history/get_controlled_accounts", {
                          controlling_account: e,
                        }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            t
          );
        })();
      t.JsonRpc = c;
    }.call(this, r(24)));
  },
  function (e, t) {
    var r;
    r = (function () {
      return this;
    })();
    try {
      r = r || new Function("return this")();
    } catch (e) {
      "object" == typeof window && (r = window);
    }
    e.exports = r;
  },
  function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
  },
  function (e, t, r) {
    "use strict";
    var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, a) {
            function s(e) {
              try {
                u(n.next(e));
              } catch (e) {
                a(e);
              }
            }
            function o(e) {
              try {
                u(n.throw(e));
              } catch (e) {
                a(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function (e) {
                        e(t);
                      })).then(s, o);
            }
            u((n = n.apply(e, t || [])).next());
          });
        },
      i =
        (this && this.__generator) ||
        function (e, t) {
          var r,
            n,
            i,
            a,
            s = {
              label: 0,
              sent: function () {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (a = { next: o(0), throw: o(1), return: o(2) }),
            "function" == typeof Symbol &&
              (a[Symbol.iterator] = function () {
                return this;
              }),
            a
          );
          function o(a) {
            return function (o) {
              return (function (a) {
                if (r) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((r = 1),
                      n &&
                        (i =
                          2 & a[0]
                            ? n.return
                            : a[0]
                            ? n.throw || ((i = n.return) && i.call(n), 0)
                            : n.next) &&
                        !(i = i.call(n, a[1])).done)
                    )
                      return i;
                    switch (((n = 0), i && (a = [2 & a[0], i.value]), a[0])) {
                      case 0:
                      case 1:
                        i = a;
                        break;
                      case 4:
                        return s.label++, { value: a[1], done: !1 };
                      case 5:
                        s.label++, (n = a[1]), (a = [0]);
                        continue;
                      case 7:
                        (a = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
                          (6 === a[0] || 2 === a[0])
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === a[0] &&
                          (!i || (a[1] > i[0] && a[1] < i[3]))
                        ) {
                          s.label = a[1];
                          break;
                        }
                        if (6 === a[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = a);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(a);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    a = t.call(e, s);
                  } catch (e) {
                    (a = [6, e]), (n = 0);
                  } finally {
                    r = i = 0;
                  }
                if (5 & a[0]) throw a[1];
                return { value: a[0] ? a[1] : void 0, done: !0 };
              })([a, o]);
            };
          }
        };
    Object.defineProperty(t, "__esModule", { value: !0 });
    var a = r(27),
      s = (function () {
        function e(e, t) {
          (this.waxSigningURL = e),
            (this.waxAutoSigningURL = t),
            (this.waxEventSource = new a.WaxEventSource(e));
        }
        return (
          (e.prototype.login = function () {
            return n(this, void 0, void 0, function () {
              return i(this, function (e) {
                switch (e.label) {
                  case 0:
                    return this.user ? [3, 2] : [4, this.loginViaWindow()];
                  case 1:
                    e.sent(), (e.label = 2);
                  case 2:
                    if (this.user) return [2, this.user];
                    throw new Error("Login failed");
                }
              });
            });
          }),
          (e.prototype.tryAutologin = function () {
            return n(this, void 0, void 0, function () {
              return i(this, function (e) {
                switch (e.label) {
                  case 0:
                    if (this.user) return [2, !0];
                    e.label = 1;
                  case 1:
                    return (
                      e.trys.push([1, 3, , 4]), [4, this.loginViaEndpoint()]
                    );
                  case 2:
                    return e.sent(), [2, !0];
                  case 3:
                    return e.sent(), [2, !1];
                  case 4:
                    return [2];
                }
              });
            });
          }),
          (e.prototype.prepareTransaction = function (e) {
            return n(this, void 0, void 0, function () {
              var t;
              return i(this, function (r) {
                switch (r.label) {
                  case 0:
                    return this.canAutoSign(e)
                      ? [3, 2]
                      : ((t = this),
                        [
                          4,
                          this.waxEventSource.openPopup(
                            this.waxSigningURL + "/cloud-wallet/signing/"
                          ),
                        ]);
                  case 1:
                    (t.signingWindow = r.sent()), (r.label = 2);
                  case 2:
                    return [2];
                }
              });
            });
          }),
          (e.prototype.signing = function (e, t, r) {
            return (
              void 0 === r && (r = !1),
              n(this, void 0, void 0, function () {
                return i(this, function (n) {
                  switch (n.label) {
                    case 0:
                      if (!this.canAutoSign(e)) return [3, 4];
                      n.label = 1;
                    case 1:
                      return (
                        n.trys.push([1, 3, , 4]),
                        [4, this.signViaEndpoint(t, r)]
                      );
                    case 2:
                      return [2, n.sent()];
                    case 3:
                      return n.sent(), [3, 4];
                    case 4:
                      return [4, this.signViaWindow(t, this.signingWindow, r)];
                    case 5:
                      return [2, n.sent()];
                  }
                });
              })
            );
          }),
          (e.prototype.loginViaWindow = function () {
            return n(this, void 0, void 0, function () {
              var e;
              return i(this, function (t) {
                switch (t.label) {
                  case 0:
                    return [
                      4,
                      this.waxEventSource.openEventSource(
                        this.waxSigningURL + "/cloud-wallet/login/"
                      ),
                    ];
                  case 1:
                    return (
                      (e = t.sent()),
                      [
                        2,
                        this.waxEventSource.onceEvent(
                          e,
                          this.waxSigningURL,
                          this.receiveLogin.bind(this),
                          void 0
                        ),
                      ]
                    );
                }
              });
            });
          }),
          (e.prototype.loginViaEndpoint = function () {
            return n(this, void 0, void 0, function () {
              var e, t;
              return i(this, function (r) {
                switch (r.label) {
                  case 0:
                    return [
                      4,
                      fetch(this.waxAutoSigningURL + "login", {
                        credentials: "include",
                        method: "get",
                      }),
                    ];
                  case 1:
                    if (!(e = r.sent()).ok)
                      throw new Error(
                        "Login Endpoint Error " + e.status + " " + e.statusText
                      );
                    return [4, e.json()];
                  case 2:
                    if ((t = r.sent()).processed && t.processed.except)
                      throw new Error(t);
                    return [2, this.receiveLogin({ data: t })];
                }
              });
            });
          }),
          (e.prototype.signViaEndpoint = function (e, t) {
            return (
              void 0 === t && (t = !1),
              n(this, void 0, void 0, function () {
                var r, n, a;
                return i(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return (
                        (r = new AbortController()),
                        setTimeout(function () {
                          return r.abort();
                        }, 5e3),
                        [
                          4,
                          fetch(this.waxAutoSigningURL + "signing", {
                            body: JSON.stringify({
                              freeBandwidth: !t,
                              transaction: Object.values(e),
                            }),
                            credentials: "include",
                            headers: { "Content-Type": "application/json" },
                            method: "POST",
                            signal: r.signal,
                          }),
                        ]
                      );
                    case 1:
                      if (!(n = i.sent()).ok)
                        throw (
                          ((this.whitelistedContracts = []),
                          new Error(
                            "Signing Endpoint Error " +
                              n.status +
                              " " +
                              n.statusText
                          ))
                        );
                      return [4, n.json()];
                    case 2:
                      if ((a = i.sent()).processed && a.processed.except)
                        throw (
                          ((this.whitelistedContracts = []),
                          new Error(
                            "Error returned from signing endpoint: " +
                              JSON.stringify(a)
                          ))
                        );
                      return [2, this.receiveSignatures({ data: a })];
                  }
                });
              })
            );
          }),
          (e.prototype.signViaWindow = function (e, t, r) {
            return (
              void 0 === r && (r = !1),
              n(this, void 0, void 0, function () {
                var n;
                return i(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return [
                        4,
                        this.waxEventSource.openEventSource(
                          this.waxSigningURL + "/cloud-wallet/signing/",
                          {
                            freeBandwidth: !r,
                            transaction: e,
                            type: "TRANSACTION",
                          },
                          t
                        ),
                      ];
                    case 1:
                      return (
                        (n = i.sent()),
                        [
                          2,
                          this.waxEventSource.onceEvent(
                            n,
                            this.waxSigningURL,
                            this.receiveSignatures.bind(this),
                            "TX_SIGNED"
                          ),
                        ]
                      );
                  }
                });
              })
            );
          }),
          (e.prototype.receiveLogin = function (e) {
            return n(this, void 0, void 0, function () {
              var t, r, n, a, s;
              return i(this, function (i) {
                if (
                  ((t = e.data),
                  (r = t.verified),
                  (n = t.userAccount),
                  (a = t.pubKeys),
                  (s = t.whitelistedContracts),
                  !r)
                )
                  throw new Error("User declined to share their user account");
                if (!n || !a)
                  throw new Error("User does not have a blockchain account");
                return (
                  (this.whitelistedContracts = s || []),
                  (this.user = { account: n, keys: a }),
                  [2, !0]
                );
              });
            });
          }),
          (e.prototype.receiveSignatures = function (e) {
            return n(this, void 0, void 0, function () {
              var t, r, n, a, s;
              return i(this, function (i) {
                if ("TX_SIGNED" === e.data.type) {
                  if (
                    ((t = e.data),
                    (r = t.verified),
                    (n = t.signatures),
                    (a = t.whitelistedContracts),
                    (s = t.serializedTransaction),
                    !r || !n)
                  )
                    throw new Error("User declined to sign the transaction");
                  return (
                    (this.whitelistedContracts = a || []),
                    [2, { serializedTransaction: s, signatures: n }]
                  );
                }
                throw new Error(
                  "Unexpected response received when attempting signing: " +
                    JSON.stringify(e.data)
                );
              });
            });
          }),
          (e.prototype.canAutoSign = function (e) {
            var t = this,
              r = navigator.userAgent.toLowerCase();
            return (
              !(-1 === r.search("chrome") && r.search("safari") >= 0) &&
              !e.actions.find(function (e) {
                return !t.isWhitelisted(e);
              })
            );
          }),
          (e.prototype.isWhitelisted = function (e) {
            return !(
              !this.whitelistedContracts ||
              !this.whitelistedContracts.find(function (t) {
                return (
                  t.contract === e.account &&
                  ("eosio.token" !== e.account ||
                    "transfer" !== e.name ||
                    t.recipients.includes(e.data.to))
                );
              })
            );
          }),
          e
        );
      })();
    t.WaxSigningApi = s;
  },
  function (e, t, r) {
    "use strict";
    var n =
        (this && this.__awaiter) ||
        function (e, t, r, n) {
          return new (r || (r = Promise))(function (i, a) {
            function s(e) {
              try {
                u(n.next(e));
              } catch (e) {
                a(e);
              }
            }
            function o(e) {
              try {
                u(n.throw(e));
              } catch (e) {
                a(e);
              }
            }
            function u(e) {
              var t;
              e.done
                ? i(e.value)
                : ((t = e.value),
                  t instanceof r
                    ? t
                    : new r(function (e) {
                        e(t);
                      })).then(s, o);
            }
            u((n = n.apply(e, t || [])).next());
          });
        },
      i =
        (this && this.__generator) ||
        function (e, t) {
          var r,
            n,
            i,
            a,
            s = {
              label: 0,
              sent: function () {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (a = { next: o(0), throw: o(1), return: o(2) }),
            "function" == typeof Symbol &&
              (a[Symbol.iterator] = function () {
                return this;
              }),
            a
          );
          function o(a) {
            return function (o) {
              return (function (a) {
                if (r) throw new TypeError("Generator is already executing.");
                for (; s; )
                  try {
                    if (
                      ((r = 1),
                      n &&
                        (i =
                          2 & a[0]
                            ? n.return
                            : a[0]
                            ? n.throw || ((i = n.return) && i.call(n), 0)
                            : n.next) &&
                        !(i = i.call(n, a[1])).done)
                    )
                      return i;
                    switch (((n = 0), i && (a = [2 & a[0], i.value]), a[0])) {
                      case 0:
                      case 1:
                        i = a;
                        break;
                      case 4:
                        return s.label++, { value: a[1], done: !1 };
                      case 5:
                        s.label++, (n = a[1]), (a = [0]);
                        continue;
                      case 7:
                        (a = s.ops.pop()), s.trys.pop();
                        continue;
                      default:
                        if (
                          !(i = (i = s.trys).length > 0 && i[i.length - 1]) &&
                          (6 === a[0] || 2 === a[0])
                        ) {
                          s = 0;
                          continue;
                        }
                        if (
                          3 === a[0] &&
                          (!i || (a[1] > i[0] && a[1] < i[3]))
                        ) {
                          s.label = a[1];
                          break;
                        }
                        if (6 === a[0] && s.label < i[1]) {
                          (s.label = i[1]), (i = a);
                          break;
                        }
                        if (i && s.label < i[2]) {
                          (s.label = i[2]), s.ops.push(a);
                          break;
                        }
                        i[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    a = t.call(e, s);
                  } catch (e) {
                    (a = [6, e]), (n = 0);
                  } finally {
                    r = i = 0;
                  }
                if (5 & a[0]) throw a[1];
                return { value: a[0] ? a[1] : void 0, done: !0 };
              })([a, o]);
            };
          }
        };
    Object.defineProperty(t, "__esModule", { value: !0 });
    var a = (function () {
      function e(e) {
        var t = this;
        (this.waxSigningURL = e),
          (this.timeout = function () {
            return n(t, void 0, void 0, function () {
              return i(this, function (e) {
                return [
                  2,
                  new Promise(function (e, t) {
                    return setTimeout(function () {
                      return t(new Error("Timeout"));
                    }, 5e3);
                  }),
                ];
              });
            });
          }),
          (this.openEventSource = this.openEventSource.bind(this)),
          (this.onceEvent = this.onceEvent.bind(this));
      }
      return (
        (e.prototype.openPopup = function (e) {
          return n(this, void 0, void 0, function () {
            var t;
            return i(this, function (r) {
              switch (r.label) {
                case 0:
                  return [
                    4,
                    window.open(e, "WaxPopup", "height=800,width=600"),
                  ];
                case 1:
                  if ((t = r.sent())) return [2, t];
                  throw new Error("Unable to open popup window");
              }
            });
          });
        }),
        (e.prototype.openEventSource = function (e, t, r) {
          return n(this, void 0, void 0, function () {
            var a,
              s,
              o,
              u,
              c = this;
            return i(this, function (l) {
              switch (l.label) {
                case 0:
                  return r ? ((s = r), [3, 3]) : [3, 1];
                case 1:
                  return [4, this.openPopup(e)];
                case 2:
                  (s = l.sent()), (l.label = 3);
                case 3:
                  if (!(a = s))
                    throw new Error("Unable to open a popup window");
                  return void 0 === t
                    ? [2, a]
                    : ((o = function (e) {
                        return n(c, void 0, void 0, function () {
                          return i(this, function (r) {
                            return (
                              "READY" === e.data.type &&
                                a.postMessage(t, this.waxSigningURL),
                              [2]
                            );
                          });
                        });
                      }),
                      (u = this.onceEvent(a, this.waxSigningURL, o, "READY")),
                      [
                        4,
                        Promise.race([u, this.timeout()]).catch(function (e) {
                          if ("Timeout" !== e.message) throw e;
                          a.postMessage(t, c.waxSigningURL);
                        }),
                      ]);
                case 4:
                  return l.sent(), [2, a];
              }
            });
          });
        }),
        (e.prototype.onceEvent = function (e, t, r, a) {
          return n(this, void 0, void 0, function () {
            return i(this, function (s) {
              return [
                2,
                new Promise(function (s, o) {
                  window.addEventListener(
                    "message",
                    function u(c) {
                      return n(this, void 0, void 0, function () {
                        var n, l;
                        return i(this, function (i) {
                          switch (i.label) {
                            case 0:
                              if (c.origin !== t) return [2];
                              if (c.source !== e) return [2];
                              if ("object" != typeof c.data) return [2];
                              if (a && (!c.data.type || c.data.type !== a))
                                return [2];
                              i.label = 1;
                            case 1:
                              return (
                                i.trys.push([1, 3, , 4]), (n = s), [4, r(c)]
                              );
                            case 2:
                              return n.apply(void 0, [i.sent()]), [3, 4];
                            case 3:
                              return (l = i.sent()), o(l), [3, 4];
                            case 4:
                              return (
                                window.removeEventListener("message", u, !1),
                                [2]
                              );
                          }
                        });
                      });
                    },
                    !1
                  );
                }),
              ];
            });
          });
        }),
        e
      );
    })();
    t.WaxEventSource = a;
  },
]);
