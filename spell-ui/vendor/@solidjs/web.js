import { C as e, D as t, E as n, M as r, O as i, S as a, T as o, _ as s, d as c, f as l, h as u, j as d, k as f, l as p, m as ee, s as te, u as ne, v as re, w as ie, x as m } from "../chunks/solid-DRPWa45J.js";
//#region ../node_modules/@solidjs/signals/dist/prod/store/utils.js
function h() {
	return !0;
}
var ae = Object.freeze({});
function g(e, t) {
	return t === 3 ? (e = e()) ?? ae : e;
}
var _ = class {
	source;
	kind;
	hidden;
	table = 0;
	keys = void 0;
	descs = void 0;
	constructor(e, t, n) {
		this.source = e, this.kind = t, this.hidden = n;
	}
};
function v(e, t) {
	let n = e.hidden;
	return typeof n == "function" ? n(t) : n.includes(t);
}
function oe(e, t) {
	if (typeof e != "function" && typeof t != "function") {
		let n = e.slice();
		for (let e = 0; e < t.length; e++) n.push(t[e]);
		return n;
	}
	return (n) => (typeof e == "function" ? e(n) : e.includes(n)) || (typeof t == "function" ? t(n) : t.includes(n));
}
function y(e) {
	return g(e.source, e.kind);
}
function b(e) {
	return e[a];
}
function se(e, t) {
	return t === 0 ? Object.keys(e) : t === 2 || e[m] === e ? Reflect.ownKeys(e) : Object.keys(e);
}
function ce(e, t) {
	if (t === 1) {
		if (e.kind === 4) return Te(e.source, !1, e);
		let t = se(y(e), e.kind), n = [];
		for (let r = 0; r < t.length; r++) v(e, t[r]) || n.push(t[r]);
		return n;
	}
	return se(g(e, t), t);
}
function x(e, t, n) {
	return t === 1 ? v(e, n) ? !1 : e.kind === 4 ? Ce(e.source, n) : n in y(e) : n in g(e, t);
}
function le(e, t, n) {
	return t === 1 ? v(e, n) ? void 0 : e.kind === 4 ? M(e.source, n) : y(e)[n] : g(e, t)[n];
}
function S(e, t) {
	return t === 0 ? !0 : t === 1 ? e.kind === 0 || e.kind === 4 && C(e.source) : !1;
}
function C(e) {
	let t = e.sources, n = e.kinds;
	for (let e = 0; e < t.length; e++) if (!S(t[e], n[e])) return !1;
	return !0;
}
function ue(e) {
	if (!(m in e)) return !0;
	let t = b(e);
	return t instanceof fe ? C(t) : t !== void 0 && S(t, 1);
}
function w(e, t = !0) {
	return {
		configurable: !0,
		enumerable: t,
		get: e,
		set: h
	};
}
function T(e, t, n, r = !1) {
	if (t === 1) return v(e, n) ? void 0 : T(e.source, e.kind, n, r);
	if (t === 4) return we(e, n);
	if (t === 3) return r || n in g(e, t) ? w(() => g(e, t)[n]) : void 0;
	if (t === 2) return b(e) === void 0 ? r || n in e ? w(() => e[n]) : void 0 : Reflect.getOwnPropertyDescriptor(e, n);
	let i = Reflect.getOwnPropertyDescriptor(e, n);
	if (i !== void 0) return i.get !== void 0 || i.set !== void 0 ? w(() => e[n], i.enumerable) : i.configurable ? i : {
		configurable: !0,
		enumerable: i.enumerable,
		writable: !0,
		value: i.value
	};
}
function de(e, t) {
	{
		if (e.kind === 4) return Oe(e.source, e);
		let t = ie(y(e)), n = [];
		for (let r = 0; r < t.length; r++) v(e, t[r]) || n.push(t[r]);
		return n;
	}
}
var fe = class {
	sources;
	kinds;
	table = 0;
	keys = void 0;
	descs = void 0;
	constructor(e, t) {
		this.sources = e, this.kinds = t;
	}
};
function E(e) {
	return e != null && m in e ? e[a] : void 0;
}
function pe(e) {
	if (e == null || !(m in e)) return;
	let t = b(e);
	return t instanceof _ ? he(t) : t === void 0 ? void 0 : D(t);
}
function D(e) {
	let t = e.table;
	if (typeof t != "object") {
		let n = e.sources, r = e.kinds;
		for (let t = 0; t < n.length; t++) if (!S(n[t], r[t])) {
			e.table = null;
			return;
		}
		t = /* @__PURE__ */ new Map(), O(t, e, void 0), e.table = t;
	}
	return t === null ? void 0 : t;
}
function O(e, t, n) {
	let r = t.sources, i = t.kinds;
	for (let t = 0; t < r.length; t++) {
		let a = r[t];
		if (i[t] === 1) {
			if (a.kind === 4) {
				n === void 0 ? n = [a] : n.push(a), O(e, a.source, n), n.pop();
				continue;
			}
			let t = a.source, r = Reflect.ownKeys(t);
			for (let i = 0; i < r.length; i++) {
				let o = r[i];
				!v(a, o) && !k(n, o) && me(e, o, t);
			}
		} else {
			let t = Reflect.ownKeys(a);
			for (let r = 0; r < t.length; r++) {
				let i = t[r];
				k(n, i) || me(e, i, a);
			}
		}
	}
}
function k(e, t) {
	if (e !== void 0) {
		for (let n = e.length - 1; n >= 0; n--) if (v(e[n], t)) return !0;
	}
	return !1;
}
function me(e, t, n) {
	e.has(t) && e.delete(t), e.set(t, n);
}
function he(e) {
	let t = e.table;
	if (typeof t != "object") {
		let n = e.source;
		if (e.kind === 4) {
			if (!C(n)) {
				e.table = null;
				return;
			}
			t = /* @__PURE__ */ new Map(), O(t, n, [e]);
		} else if (e.kind === 0) {
			t = /* @__PURE__ */ new Map();
			let r = Reflect.ownKeys(n);
			for (let i = 0; i < r.length; i++) {
				let a = r[i];
				v(e, a) || t.set(a, n);
			}
		} else {
			e.table = null;
			return;
		}
		e.table = t;
	}
	return t === null ? void 0 : t;
}
var ge = Object.prototype.propertyIsEnumerable;
function _e(e, t) {
	let n = e.keys;
	if (n === void 0) {
		n = e.keys = [];
		for (let [e, r] of t) ge.call(r, e) && n.push(e);
	}
	return n;
}
function ve(e, t, n) {
	let r = t.get(n);
	if (r === void 0) return;
	let i = e.descs;
	i === void 0 && (i = e.descs = /* @__PURE__ */ new Map());
	let a = i.get(n);
	return a === void 0 ? (a = T(r, 0, n), a === void 0 ? void 0 : (i.set(n, a), a)) : a.get === void 0 ? {
		configurable: !0,
		enumerable: a.enumerable,
		writable: a.writable,
		value: r[n]
	} : a;
}
var A = 16;
function ye(e) {
	let t = e.table;
	if (typeof t == "object") return t === null ? void 0 : t;
	if (t + 1 < A) {
		e.table = t + 1;
		return;
	}
	return D(e);
}
function be(e) {
	let t = e.table;
	if (typeof t == "object") return t === null ? void 0 : t;
	if (t + 1 < A) {
		e.table = t + 1;
		return;
	}
	return he(e);
}
function xe(e) {
	let t = e.table;
	return typeof t == "object" && t ? t : void 0;
}
var j = Symbol();
function Se(e, t) {
	let n = xe(e);
	if (n !== void 0) {
		let e = n.get(t);
		return e === void 0 ? j : e[t];
	}
	let r = e.sources, i = e.kinds;
	for (let e = r.length - 1; e >= 0; e--) {
		let n = i[e];
		if (n === 0) {
			let n = r[e];
			if (t in n) return n[t];
			continue;
		}
		if (n === 1) {
			let n = r[e];
			if (v(n, t)) continue;
			if (n.kind === 4) {
				let e = Se(n.source, t);
				if (e !== j) return e;
				continue;
			}
			let i = y(n);
			if (t in i) return i[t];
		} else {
			let i = g(r[e], n);
			if (t in i) return i[t];
		}
	}
	return j;
}
function M(e, t) {
	let n = Se(e, t);
	return n === j ? void 0 : n;
}
function Ce(e, t) {
	let n = xe(e);
	if (n !== void 0) return n.has(t);
	let r = e.sources, i = e.kinds;
	for (let e = r.length - 1; e >= 0; e--) if (x(r[e], i[e], t)) return !0;
	return !1;
}
function we(e, t) {
	let n = xe(e);
	if (n !== void 0) return ve(e, n, t);
	let r = e.sources, i = e.kinds;
	for (let n = r.length - 1; n >= 0; n--) if (x(r[n], i[n], t)) return T(r[n], i[n], t, !0) ?? w(() => M(e, t));
}
function Te(e, t, n) {
	let r = [];
	return Ee(e, n === void 0 ? void 0 : [n], t, r, null), r;
}
function Ee(e, t, n, r, i) {
	let a = e.sources, o = e.kinds;
	for (let e = 0; e < a.length; e++) {
		let s = a[e], c = o[e], l;
		if (c === 1) {
			if (s.kind === 4) {
				t === void 0 ? t = [s] : t.push(s), Ee(s.source, t, n, r, i), t.pop();
				continue;
			}
			l = s, c = s.kind, s = s.source;
		}
		s = g(s, c);
		let u = n ? ie(s) : se(s, c);
		for (let e = 0; e < u.length; e++) {
			let n = u[e];
			l !== void 0 && v(l, n) || k(t, n) || De(r, i, n, s);
		}
	}
}
function De(e, t, n, r) {
	let i = e.indexOf(n);
	i !== -1 && (e.splice(i, 1), t !== null && t.splice(i, 1)), e.push(n), t !== null && t.push(r);
}
function Oe(e, t) {
	let n = D(e);
	if (n === void 0) return Te(e, !0, t);
	let r = _e(e, n);
	if (t === void 0) return r;
	let i = [];
	for (let e = 0; e < r.length; e++) v(t, r[e]) || i.push(r[e]);
	return i;
}
var ke = {
	get(t, n, r) {
		if (typeof n == "symbol") {
			if (n === m) return r;
			if (n === a) return t;
			if (n === e) return;
		}
		let i = t.table, o;
		if (typeof i != "object") {
			if (i + 1 < A) {
				t.table = i + 1;
				let e = t.sources, r = t.kinds;
				for (let i = e.length - 1; i >= 0; i--) {
					if (r[i] !== 0) return M(t, n);
					let a = e[i][n];
					if (a !== void 0 || n in e[i]) return a;
				}
				return;
			}
			if (o = D(t), o === void 0) return M(t, n);
		} else if (i === null) return M(t, n);
		else o = i;
		let s = o.get(n);
		return s === void 0 ? void 0 : s[n];
	},
	has(t, n) {
		if (n === m) return !0;
		if (n === e || n === a) return !1;
		let r = ye(t);
		return r === void 0 ? Ce(t, n) : r.has(n);
	},
	set: h,
	deleteProperty: h,
	getOwnPropertyDescriptor(t, n) {
		if (n === m || n === e || n === a) return;
		let r = ye(t);
		return r === void 0 ? we(t, n) : ve(t, r, n);
	},
	ownKeys(e) {
		return Oe(e);
	}
}, Ae = {
	get(t, n, r) {
		if (n === m) return r;
		if (n === a) return t;
		if (n !== e) {
			if (t.kind === 4) {
				let e = be(t);
				if (e !== void 0) {
					let t = e.get(n);
					return t === void 0 ? void 0 : t[n];
				}
				return v(t, n) ? void 0 : M(t.source, n);
			}
			if (!v(t, n)) return y(t)[n];
		}
	},
	has(t, n) {
		if (n === m) return !0;
		if (n === e || n === a) return !1;
		if (t.kind === 4) {
			let e = be(t);
			return e === void 0 ? !v(t, n) && Ce(t.source, n) : e.has(n);
		}
		return !v(t, n) && n in y(t);
	},
	set: h,
	deleteProperty: h,
	getOwnPropertyDescriptor(t, n) {
		if (n !== m && n !== e && n !== a) {
			if (t.kind === 4) {
				let e = be(t);
				if (e !== void 0) return ve(t, e, n);
			}
			return T(t, 1, n);
		}
	},
	ownKeys(e) {
		if (e.kind === 4) {
			let t = he(e);
			return t === void 0 ? de(e) : _e(e, t);
		}
		let t = Reflect.ownKeys(y(e)), n = [];
		for (let r = 0; r < t.length; r++) v(e, t[r]) || n.push(t[r]);
		return n;
	}
};
function je(...e) {
	if (e.length === 1 && typeof e[0] != "function") return e[0];
	let t = Array(e.length), n = Array(e.length), i = 0, a, o = 0;
	for (let r = 0; r < e.length; r++) {
		let s = e[r];
		if (s) {
			if (o++, a = s, typeof s == "function") {
				t[i] = re(s), n[i++] = 3;
				continue;
			}
			if (m in s) {
				let e = b(s);
				if (e instanceof fe) for (let r = 0; r < e.sources.length; r++) t[i] = e.sources[r], n[i++] = e.kinds[r];
				else e === void 0 ? (t[i] = s, n[i++] = 2) : (t[i] = e, n[i++] = 1);
				continue;
			}
			t[i] = s, n[i++] = 0;
		}
	}
	if (i !== t.length && (t.length = i, n.length = i), r) return o === 1 && typeof a != "function" ? a : new Proxy(new fe(t, n), ke);
	let s = Object.create(null), c = !1, l = t.length - 1;
	for (let e = l; e >= 0; e--) {
		let n = t[e];
		if (!n) {
			e === l && l--;
			continue;
		}
		let r = Object.getOwnPropertyNames(n);
		for (let t = r.length - 1; t >= 0; t--) {
			let i = r[t];
			if (i !== "__proto__" && i !== "constructor" && !s[i]) {
				c ||= e !== l;
				let t = Object.getOwnPropertyDescriptor(n, i);
				s[i] = t.get ? {
					enumerable: !0,
					configurable: !0,
					get: t.get.bind(n)
				} : t;
			}
		}
	}
	if (!c) return t[l];
	let u = {}, d = Object.keys(s);
	for (let e = d.length - 1; e >= 0; e--) {
		let t = d[e], n = s[t];
		n.get ? Object.defineProperty(u, t, n) : u[t] = n.value;
	}
	return u;
}
function Me(e, ...t) {
	let n = t.length === 1 && typeof t[0] == "function" ? t[0] : t;
	if (r) {
		let t = e, r = 0;
		if (typeof e == "function") r = 3;
		else if (m in e) {
			r = 2;
			let i = b(e);
			i instanceof _ ? (t = i.source, r = i.kind, n = oe(i.hidden, n)) : i !== void 0 && (t = i, r = 4);
		}
		return new Proxy(new _(t, r, n), Ae);
	}
	let i = {}, a = Object.getOwnPropertyNames(e), o = typeof n == "function" ? n : n.length > 4 && a.length > n.length ? ((e) => (t) => e.has(t))(new Set(n)) : (e) => n.includes(e);
	for (let t of a) if (!o(t)) {
		let n = Object.getOwnPropertyDescriptor(e, t);
		!n.get && !n.set && n.enumerable && n.writable && n.configurable ? i[t] = n.value : n.get || n.set ? Object.defineProperty(i, t, {
			enumerable: n.enumerable,
			configurable: !0,
			get: n.get && n.get.bind(e),
			set: n.set && n.set.bind(e)
		}) : Object.defineProperty(i, t, n);
	}
	return i;
}
//#endregion
//#region ../node_modules/solid-js/dist/internal.js
var Ne = ee, N = u, Pe = {
	INPUT: {
		value: 1,
		defaultValue: 2,
		checked: 1,
		defaultChecked: 2
	},
	SELECT: { value: 1 },
	OPTION: {
		value: 1,
		selected: 1,
		defaultSelected: 2
	},
	TEXTAREA: {
		value: 1,
		defaultValue: 2
	},
	VIDEO: {
		muted: 1,
		defaultMuted: 2
	},
	AUDIO: {
		muted: 1,
		defaultMuted: 2
	}
}, Fe = /*#__PURE__*/ new Set([
	"innerHTML",
	"textContent",
	"innerText",
	"children"
]), P = /*#__PURE__*/ Symbol("slot"), Ie = /*#__PURE__*/ Symbol("host"), Le = /*#__PURE__*/ new Set([
	"beforeinput",
	"click",
	"dblclick",
	"contextmenu",
	"focusin",
	"focusout",
	"input",
	"keydown",
	"keyup",
	"mousedown",
	"mousemove",
	"mouseout",
	"mouseover",
	"mouseup",
	"pointerdown",
	"pointermove",
	"pointerout",
	"pointerover",
	"pointerup",
	"touchend",
	"touchmove",
	"touchstart"
]), Re = /*#__PURE__*/ new Set(/* @__PURE__ */ "altGlyph.altGlyphDef.altGlyphItem.animate.animateColor.animateMotion.animateTransform.circle.clipPath.color-profile.cursor.defs.desc.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.font.font-face.font-face-format.font-face-name.font-face-src.font-face-uri.foreignObject.g.glyph.glyphRef.hkern.image.line.linearGradient.marker.mask.metadata.missing-glyph.mpath.path.pattern.polygon.polyline.radialGradient.rect.set.stop.svg.switch.symbol.text.textPath.tref.tspan.use.view.vkern".split(".")), ze = /*#__PURE__*/ new Set(/* @__PURE__ */ "annotation.annotation-xml.maction.math.menclose.merror.mfenced.mfrac.mi.mmultiscripts.mn.mo.mover.mpadded.mphantom.mprescripts.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msubsup.msup.mtable.mtd.mtext.mtr.munder.munderover.semantics".split(".")), Be = {
	svg: "http://www.w3.org/2000/svg",
	mathml: "http://www.w3.org/1998/Math/MathML",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace"
}, Ve = {
	transparent: !0,
	sync: !0
}, He = { sync: !0 };
function F(e, t, n) {
	let r = n ? {
		sync: !0,
		...n,
		transparent: !n.scope
	} : Ve;
	c(e, t, r);
}
function Ue(e) {
	return ne(() => e(), He);
}
function We(e, t, n, r) {
	let i = (t) => {
		if (!t) return !1;
		let n = t[P];
		return t.parentNode === e && (!n || n === r);
	}, a = n.length, o = t.length, s = a, c = 0, l = 0, u = t[o - 1], d = i(u) ? u.nextSibling : r || null, f = null, p, ee;
	for (; c < o || l < s;) {
		if (t[c] === n[l]) {
			c++, l++;
			continue;
		}
		for (; o > c && s > l && t[o - 1] === n[s - 1];) o--, s--;
		if (o === c) {
			let t;
			if (s < a) {
				if (l && i(t = n[l - 1])) t = t.nextSibling;
				else {
					let e = s;
					for (; e < a && !i(n[e]);) e++;
					t = e < a ? n[e] : d;
				}
			} else t = d;
			for (; l < s;) {
				let i = n[l++];
				e.insertBefore(i, t), r && (i[P] = r);
			}
		} else if (s === l) for (; c < o;) {
			let e = t[c++];
			(!f || !f.has(e)) && i(e) && e.remove();
		}
		else if ((p = t[c]) === n[s - 1] && n[l] === t[o - 1] && p.parentNode === e && (!(ee = p[P]) || ee === r)) {
			if (r) do {
				let n = t[--o];
				if (e.insertBefore(n, p), n[P] = r, l++, c >= o - 1 || l >= s) break;
			} while (t[c] === n[s - 1] && n[l] === t[o - 1]);
			else do
				if (e.insertBefore(t[--o], p), l++, c >= o - 1 || l >= s) break;
			while (t[c] === n[s - 1] && n[l] === t[o - 1]);
		} else {
			if (!i(t[c])) {
				c++;
				continue;
			}
			if (!f) {
				f = /* @__PURE__ */ new Map();
				let e = l;
				for (; e < s;) f.set(n[e], e++);
			}
			let a = f.get(t[c]);
			if (a != null) {
				if (l < a && a < s) {
					let i = c, u = 1, d;
					for (; ++i < o && i < s && (d = f.get(t[i])) != null && d === a + u;) u++;
					if (u > a - l) {
						let i = t[c];
						for (; l < a;) {
							let t = n[l++];
							e.insertBefore(t, i), r && (t[P] = r);
						}
					} else {
						let i = n[l++];
						e.replaceChild(i, t[c++]), r && (i[P] = r);
					}
				} else c++;
			} else t[c++].remove();
		}
	}
}
var Ge = "_$$", Ke = "_$SOLID_EVENT_OWNER", qe = Symbol(), Je = Object.prototype.hasOwnProperty, Ye = {}, Xe = /* @__PURE__ */ new Set(), I = /* @__PURE__ */ new Map();
function Ze(e, n, r, a = {}) {
	let o;
	tt(n);
	try {
		l((i) => {
			if (o = i, a.onError && (d()[t] = a.onError), n === document) {
				let t = e();
				F(() => s(t), () => {});
			} else {
				let t = e();
				q(n, () => t, n.firstChild ? null : void 0, r, {
					...a.insertOptions,
					schedule: !0
				});
			}
		}, { id: a.renderId }), i();
	} catch (e) {
		throw o && o(), L(n), e;
	}
	return () => {
		o(), L(n), n.textContent = "";
	};
}
function Qe(e, t, n) {
	let r = document.createElement("template");
	return r.innerHTML = e, n === 2 ? r.content.firstChild.firstChild : r.content.firstChild;
}
function $e(e, t) {
	let n;
	return t === 1 ? (r) => document.importNode(n ||= Qe(e, r, t), !0) : (r) => (n ||= Qe(e, r, t)).cloneNode(!0);
}
function et(e) {
	for (let t = 0, n = e.length; t < n; t++) {
		let n = e[t];
		Xe.has(n) || (Xe.add(n), I.forEach((e, t) => rt(n, t, e)));
	}
}
function tt(e) {
	let t = R(e, e);
	t && (t.roots = (t.roots || 0) + 1);
}
function L(e) {
	let t = I.get(e);
	t && (t.roots > 1 ? t.roots-- : delete t.roots), nt(e, e);
}
function R(e, t = e) {
	if (!e || !t) return;
	let n = I.get(e);
	return n || I.set(e, n = {
		owners: /* @__PURE__ */ new Map(),
		handlers: /* @__PURE__ */ new Map()
	}), n.owners.set(t, (n.owners.get(t) || 0) + 1), Xe.forEach((t) => rt(t, e, n)), n;
}
function nt(e, t = e) {
	let n = I.get(e);
	if (!n) return;
	let r = n.owners.get(t);
	r > 1 ? n.owners.set(t, r - 1) : n.owners.delete(t), !n.owners.size && (n.handlers.forEach((t, n) => e.removeEventListener(n, t)), I.delete(e));
}
function rt(e, t, n) {
	if (n.handlers.has(e)) return;
	let r = (e) => At(e, t, n);
	n.handlers.set(e, r), t.addEventListener(e, r);
}
function it(e) {
	for (; e;) {
		if (I.get(e)?.roots) return e;
		e = e._$host || e.parentNode || e.host;
	}
}
function at(e, t) {
	let n = e, r = 0;
	for (; n;) {
		if (t.owners.has(n)) return {
			owner: n,
			distance: r
		};
		r++, n = n._$host || n.parentNode || n.host;
	}
}
var z = null, ot = [];
function B(e, t) {
	for (let n = 0; n < e.length; n++) e[n](t);
}
function V(e, t) {
	z !== null && e._$claimed && ot.some((e) => e.includes(t.slice(t.indexOf(":") + 1))) && B(z, e);
}
function st(e, t) {
	return z !== null && !e._$claimed && (e._$claimed = !0, t === void 0 ? B(z, e) : o(t, () => B(z, e))), e;
}
function H(e, t, n) {
	if (J(e)) return;
	let r = t === "multiple" && e.localName === "select";
	if (n == null || n === !1) e.removeAttribute(t);
	else if (e.setAttribute(t, n === !0 ? "" : n), r && !e._$multiple) {
		let t = e.options;
		for (let e = 0; e < t.length; e++) t[e].defaultSelected && (t[e].selected = !0);
	}
	r && (e._$multiple = !0), V(e, t);
}
function ct(e, t, n, r) {
	J(e) || (r == null || r === !1 ? e.removeAttributeNS(t, n.indexOf(":") > -1 ? n.split(":").pop() : n) : e.setAttributeNS(t, n, r === !0 ? "" : r), V(e, n));
}
function lt(e, t, n) {
	if (typeof t == "number" && (t = "" + t), typeof n == "number" && (n = "" + n), J(e)) {
		e._$classes = t && typeof t == "object" ? Dt(t) : void 0;
		return;
	}
	if (t == null || t === !1) {
		(n || e._$classes) && (e.removeAttribute("class"), e._$classes = void 0);
		return;
	}
	if (typeof t == "string") {
		e._$classes = void 0, t !== n && e.setAttribute("class", t);
		return;
	}
	let r;
	typeof n == "string" ? (r = {}, e.removeAttribute("class")) : r = e._$classes || Dt(n || {}), t = Dt(t);
	let i = Object.keys(t), a = Object.keys(r), o, s;
	for (o = 0, s = a.length; o < s; o++) {
		let n = a[o];
		n && n !== "undefined" && !t[n] && e.classList.remove(n);
	}
	for (o = 0, s = i.length; o < s; o++) {
		let n = i[o], a = !!t[n];
		n && n !== "undefined" && r[n] !== a && a && e.classList.add(n);
	}
	e._$classes = t;
}
function ut(e, t, n, r) {
	if (r) {
		let r = Ge + t, i;
		Array.isArray(n) ? (i = n[1], e[r] = n[0]) : e[r] = n, e[`${r}Data`] = i;
		return;
	}
	if (Array.isArray(n)) {
		let r = n[0], i = (t) => r.call(e, n[1], t);
		return i[qe] = n, e.addEventListener(t, i), i;
	}
	return e.addEventListener(t, n, typeof n != "function" && n), n;
}
function dt(e, t, n) {
	if (J(e)) return;
	if (!t) {
		(n || e._$styles) && (H(e, "style"), e._$styles = void 0);
		return;
	}
	let r = e.style;
	if (typeof t == "string") return e._$styles = void 0, r.cssText = t;
	typeof n == "string" && (r.cssText = "", n = void 0);
	let i = e._$styles;
	i ||= e._$styles = n ? { ...n } : {};
	let a, o;
	for (o in i) (!Je.call(t, o) || t[o] == null) && (r.removeProperty(o), delete i[o]);
	for (o in t) Je.call(t, o) && (a = t[o], a != null && a !== i[o] && (r.setProperty(o, a), i[o] = a));
}
function U(e) {
	if (typeof e != "object" || !e) return e;
	if (Array.isArray(e)) return e.map(U);
	if (e[m] !== e) return e;
	let t = Reflect.ownKeys(e), n = {};
	for (let r = 0; r < t.length; r++) {
		let i = t[r];
		typeof i == "string" && (n[i] = e[i]);
	}
	return n;
}
function ft(e, t, n) {
	J(e) || (n == null ? e.style.removeProperty(t) : e.style.setProperty(t, n));
}
function pt(e, t, n, r, i, a) {
	let o = {}, s = z !== null && (e.localName === "a" || e.localName === "form") ? d() : void 0, c = (t) => {
		let n = t.ref;
		n !== o.ref && (typeof n == "function" || Array.isArray(n)) && xt(() => n, e), Ct(e, t, !0, o, !0), s !== void 0 && st(e, s);
	};
	if (Array.isArray(t)) return F(() => _t({}, t, void 0, r), c), !n && !(r !== void 0 && r("children")) && q(e, () => {
		for (let e = t.length - 1; e >= 0; e--) {
			let n = W(t[e]);
			if (n != null && ht(n, "children")) return gt(n, "children");
		}
	}), o;
	if (F(() => {
		let e = W(t), n = {}, i = pe(e);
		if (i !== void 0) return mt(n, i, r);
		if (e != null) {
			let t = E(e);
			t instanceof _ ? yt(n, t, 1, r) : t === void 0 ? yt(n, e, m in e ? 2 : 0, r) : _t(n, t.sources, t.kinds, r);
		}
		return n;
	}, c), !n && !(r !== void 0 && r("children"))) {
		if (typeof t != "function" && t != null && ue(t)) {
			let n = Object.getOwnPropertyDescriptor(t, "children");
			n !== void 0 && (n.get === void 0 ? q(e, n.value) : q(e, () => t.children));
		} else q(e, () => {
			let e = W(t);
			return e != null && ht(e, "children") ? gt(e, "children") : void 0;
		});
	}
	return o;
}
function mt(e, t, n) {
	for (let [r, i] of t) {
		if (typeof r != "string" || r === "children" || n !== void 0 && n(r)) continue;
		let t = i[r];
		e[r] = r === "style" || r === "class" ? U(t) : t;
	}
	return e;
}
function W(e) {
	return typeof e == "function" ? e() : e;
}
function ht(e, t) {
	let n = E(e);
	return n instanceof _ ? x(n, 1, t) : t in e;
}
function gt(e, t) {
	let n = E(e);
	return n instanceof _ ? le(n, 1, t) : e[t];
}
function _t(e, t, n, r) {
	let i = [], a = [];
	for (let e = 0; e < t.length; e++) vt(i, a, t[e], n === void 0 ? 3 : n[e]);
	for (let t = 0; t < i.length; t++) yt(e, i[t], a[t], r, i, a, t + 1);
	return e;
}
function vt(e, t, n, r) {
	if (r !== 3) {
		e.push(n), t.push(r);
		return;
	}
	if (n = W(n), n == null) return;
	let i = E(n);
	if (i instanceof _) e.push(i), t.push(1);
	else if (i !== void 0) {
		let n = i.sources, r = i.kinds;
		for (let i = 0; i < n.length; i++) vt(e, t, n[i], r[i]);
	} else e.push(n), t.push(m in n ? 2 : 0);
}
function yt(e, t, n, r, i, a, o) {
	let s = ce(t, n);
	outer: for (let c = 0; c < s.length; c++) {
		let l = s[c];
		if (typeof l != "string" || l === "children" || r !== void 0 && r(l)) continue;
		if (i !== void 0) {
			for (let e = o; e < i.length; e++) if (x(i[e], a[e], l)) continue outer;
		}
		let u = le(t, n, l);
		e[l] = l === "style" || l === "class" ? U(u) : u;
	}
}
function bt(e, t) {
	Array.isArray(e) ? e.flat(Infinity).forEach((e) => e && e(t)) : e(t);
}
function xt(e, t) {
	let r = n(e);
	o(null, () => bt(r, t));
}
var St = { scope: !0 }, G = null, K = null;
function q(e, t, n, r, i) {
	let a = n !== void 0, o = i && i.host;
	if (a && !r && (r = []), G !== null && (r = G.claimInitial(e, a, r)), typeof t != "function" && (t = Z(t, r, a, !0), typeof t != "function")) {
		Y(e, t, r, n), o && Q(t, o);
		return;
	}
	if (a && r.length === 0) {
		let t = document.createTextNode("");
		e.insertBefore(t, n), r = [t];
	}
	let s = r, c = !1;
	F(() => {
		G !== null && (s = G.reclaimRegion(s, e, n));
		let r = Z(t(), s, a, !0), l = c;
		return c = !0, typeof r == "function" ? (F(() => (G !== null && (s = G.reclaimRegion(s, e, n)), Z(r, s, a)), (t) => {
			s = Y(e, t, s, n), o && Q(s, o);
		}, l && !(i && i.schedule) ? {
			...i,
			schedule: !0
		} : i), Ye) : r;
	}, (t) => {
		t !== Ye && (s = Y(e, t, s, n), o && Q(s, o));
	}, t.$s ? i ? {
		...i,
		scope: !0
	} : St : i);
}
function Ct(e, t, n, r = {}, i = !1) {
	let a = e.nodeName;
	t ||= {};
	for (let n in r) if (!(n in t)) {
		if (n === "children") continue;
		r[n] = kt(e, n, null, r[n], i, a);
	}
	for (let o in t) {
		if (o === "children") {
			n || Y(e, Z(t.children, void 0, !1));
			continue;
		}
		r[o] = kt(e, o, t[o], r[o], i, a);
	}
}
function wt(e) {
	let t, n;
	if (!J() || !(t = N.registry.get(n = Ft()))) {
		if (!e) throw Error(`Hydration Mismatch. Unable to find DOM nodes for hydration key: ${n}`);
		return e(!0);
	}
	return N.completed && N.completed.add(t), N.registry.delete(n), t;
}
function Tt() {
	N.events && !N.events.queued && (queueMicrotask(() => {
		let { completed: e, events: t } = N;
		if (t) {
			for (t.queued = !1; t.length;) {
				let [n, r] = t[0];
				if (!e.has(n)) return;
				t.shift();
				let i, a, o, s;
				for (let [e, t] of I) {
					if (!t.handlers.has(r.type)) continue;
					let n = at(r.target, t);
					n && (i ? (s ||= [{
						container: i,
						state: a,
						distance: o
					}], s.push({
						container: e,
						state: t,
						distance: n.distance
					})) : (i = e, a = t, o = n.distance));
				}
				if (s) {
					s.sort((e, t) => e.distance - t.distance);
					for (let e = 0; e < s.length; e++) At(r, s[e].container, s[e].state);
				} else i && At(r, i, a);
			}
			N.done && (N.events = _$HY.events = null, N.completed = _$HY.completed = null);
		}
	}), N.events.queued = !0);
}
function J(e) {
	return !N.hydrating || N.isClaiming && !N.isClaiming() ? !1 : !e || e.isConnected ? !0 : Et !== null && Et.claimed(e);
}
var Et = null;
function Dt(e) {
	if (Array.isArray(e)) {
		let t = {};
		Ot(e, t), e = t;
	}
	if (e && typeof e == "object") {
		let t = {}, n = Object.keys(e);
		for (let r = 0, i = n.length; r < i; r++) {
			let i = n[r];
			if (!e[i]) continue;
			let a = i.trim().split(/\s+/);
			for (let e = 0, n = a.length; e < n; e++) a[e] && (t[a[e]] = !0);
		}
		return t;
	}
	return e;
}
function Ot(e, t) {
	for (let n = 0, r = e.length; n < r; n++) {
		let r = e[n];
		Array.isArray(r) ? Ot(r, t) : typeof r == "object" && r ? Object.assign(t, r) : typeof r != "boolean" && (r || r === 0) && (t[r] = !0);
	}
}
function kt(e, t, n, r, i, a) {
	if (t === "style") return dt(e, n, r), n;
	if (t === "class") return lt(e, n, r), n;
	if (n === r && Pe[a]?.[t] !== 1) return r;
	if (t === "ref") return !i && n && xt(() => n, e), n;
	let o, s = t.indexOf(":") > -1;
	if (!s && t.startsWith("on") && (o = t.charCodeAt(2)) > 64 && o < 91) {
		let i = t.slice(2).toLowerCase(), a = Le.has(i);
		if (!a && r) {
			if (Array.isArray(n) && typeof r == "function" && r[qe] === n) return r;
			e.removeEventListener(i, r, typeof r != "function" && r);
		}
		if (a || n) {
			let t = ut(e, i, n, a);
			if (a && et([i]), !a) return t;
		}
	} else if (s && t.slice(0, 5) === "prop:" || Fe.has(t) || Pe[a]?.[t]) {
		if (s) t = t.slice(5);
		else if (J(e)) return n;
		t === "value" && a === "SELECT" ? jt(e, n) : (t === "value" || t === "defaultValue") && (a === "INPUT" || a === "TEXTAREA") ? n == null && /^(checkbox|radio)$/.test(e.type) ? e.removeAttribute("value") : e[t] = n ?? "" : e[t] = n, V(e, t);
	} else {
		let r = s && Be[t.split(":")[0]];
		r ? ct(e, r, t, n) : H(e, t, n);
	}
	return n;
}
function At(e, t, n) {
	if (G !== null && G.dedupEvent(e)) return;
	let r = e[Ke], i;
	if (r) {
		if (r === !0 || r === t || !t.contains(r)) return;
		i = r;
	}
	let a = n.owners.size === 1 && n.owners.has(t) ? t : at(e.target, n)?.owner;
	if (!a || a === i) return;
	e[Ke] = a;
	let o = i || e.target, s = Ge + e.type, c = e.target, l = (t) => Object.defineProperty(e, "target", {
		configurable: !0,
		value: t
	}), u = () => {
		let t = o[s];
		if (t && !o.disabled) {
			let n = o[`${s}Data`];
			if (n === void 0 ? typeof t == "function" ? t.call(o, e) : t.handleEvent(e) : t.call(o, n, e), e.cancelBubble) return;
		}
		return o.host && typeof o.host != "string" && !o.host._$host && o.contains(e.target) && l(o.host), !0;
	}, d = () => {
		for (; o && u() && o !== a && o.parentNode !== a;) o = o._$host || o.parentNode || o.host;
	};
	if (Object.defineProperty(e, "currentTarget", {
		configurable: !0,
		get() {
			return o || a;
		}
	}), i) i === e.target && (o = i._$host || i.parentNode || i.host), o && o !== a && d();
	else if (e.composedPath) {
		let t = e.composedPath();
		if (t.length) {
			l(t[0]);
			for (let e = 0; e < t.length && (o = t[e], u()); e++) {
				if (o._$host) {
					o = o._$host, d();
					break;
				}
				if (o === a || o.parentNode === a) break;
			}
		} else d();
	} else d();
	l(c);
}
function Y(e, t, n, r) {
	if (G !== null && J(e)) {
		if (t && t !== n) {
			let e = Array.isArray(t);
			for (let r of e ? t : [t]) if (r && r.nodeType) {
				if (!J(r)) return n;
			} else if (e && (typeof r == "string" || typeof r == "number")) return n;
		}
		return t;
	}
	if (t === n) return t;
	if (G !== null && N.hydrating && t && t.length !== 0) {
		let r = [].concat(n ?? []);
		if ([].concat(t).every((t) => (t === r[0] && r.shift(), t?.parentNode === e)) && !r.length) return t;
	}
	let i = typeof t, a = r !== void 0;
	if (i === "string" || i === "number") {
		let r = typeof n;
		r === "string" || r === "number" ? e.firstChild.data = t : Nt(e, n) ? e.textContent = t : (Pt(e, n), e.insertBefore(document.createTextNode(t), e.firstChild));
	} else if (t === void 0) $(e, n, r);
	else if (t.nodeType) Array.isArray(n) ? $(e, n, a ? r : null, t) : n != null && n.nodeType ? n.parentNode === e ? e.replaceChild(t, n) : e.appendChild(t) : n != null && e.firstChild ? e.replaceChild(t, e.firstChild) : e.appendChild(t), r && (t[P] = r);
	else if (Array.isArray(t)) {
		let i = Array.isArray(n);
		for (let e = 0, r = t.length; e < r; e++) {
			let r = t[e], a = typeof r;
			if (a === "string" || a === "number") {
				let a = i ? n[e] : void 0;
				a && a.nodeType === 3 ? (a.data !== "" + r && (a.data = r), t[e] = a) : t[e] = document.createTextNode(r);
			}
		}
		t.length === 0 ? $(e, n, r) : i ? n.length === 0 ? Mt(e, t, r) : We(e, n, t, r) : (n != null && $(e, n), Mt(e, t));
	}
	return K && K(e), t;
}
function X(e) {
	(e = e.currentTarget || e)._$v = null, e.removeEventListener("change", X, !0);
}
function jt(e, t) {
	let n = e._$v && e._$v.map;
	if (t != null && t.map ? n || e.addEventListener("change", X, !0) : n && e.removeEventListener("change", X, !0), t == null) return e._$v = null, queueMicrotask(() => e.value = t) || (e.value = t);
	e._$v = t, (K ||= (e) => {
		e && e._$v == null && (e = e.parentNode);
		let t = e && e._$v;
		if (t != null) {
			if (t.map) {
				let n = [...e.options];
				for (let e = 0; e < n.length; e++) n[e].selected = t.some((t) => t == n[e].value);
				t.every((e) => n.some((t) => t.value == e)) && X(e);
			} else e.value = t, e.selectedIndex > -1 && e.value == t && (e._$v = null);
		}
	})(e), queueMicrotask(() => K(e));
}
function Z(e, t, n, r) {
	if (e = s(e, {
		skipNonRendered: !0,
		doNotUnwrap: r
	}), r && typeof e == "function") return e;
	if (n && !Array.isArray(e) && (e = [e ?? ""]), G !== null && N.hydrating && Array.isArray(e)) for (let n = 0, r = e.length; n < r; n++) {
		let r = e[n], i = t && t[n], a = typeof r;
		(a === "string" || a === "number") && i && i.nodeType === 3 && J(i) && (e[n] = i);
	}
	return e;
}
function Q(e, t) {
	if (Array.isArray(e)) for (let n = 0, r = e.length; n < r; n++) Q(e[n], t);
	else e && e.nodeType && e[Ie] !== t && (e[Ie] = t, Object.defineProperty(e, "_$host", {
		get: t,
		configurable: !0
	}));
}
function Mt(e, t, n = null) {
	for (let r = 0, i = t.length; r < i; r++) {
		let i = t[r];
		e.insertBefore(i, n), n && (i[P] = n);
	}
}
function Nt(e, t) {
	if (t == null) return !0;
	if (Array.isArray(t)) return t.length ? e.firstChild === t[0] && e.lastChild === t[t.length - 1] : e.firstChild === null;
	if (t === "") return e.firstChild === null;
	if (t.nodeType) return e.firstChild === t && e.lastChild === t;
	let n = e.firstChild;
	return n !== null && n.nodeType === 3 && e.lastChild === n;
}
function Pt(e, t) {
	if (Array.isArray(t)) for (let n = 0; n < t.length; n++) {
		let r = t[n];
		r.parentNode === e && r.remove();
	}
	else if (t.nodeType) t.parentNode === e && t.remove();
	else {
		let t = e.firstChild;
		t && t.nodeType === 3 && t.remove();
	}
}
function $(e, t, n, r) {
	if (n === void 0) return Nt(e, t) ? e.textContent = "" : Pt(e, t);
	if (t.length) {
		let i = !1;
		for (let a = t.length - 1; a >= 0; a--) {
			let o = t[a];
			if (r !== o) {
				let t = o[P], s = o.parentNode === e && (!t || t === n);
				r && !i && !a ? s ? e.replaceChild(r, o) : e.insertBefore(r, n) : s && o.remove();
			} else i = !0;
		}
	} else r && e.insertBefore(r, n);
	r && n && (r[P] = n);
}
function Ft() {
	return N.getNextContextId();
}
function It(e, ...t) {}
var Lt = !1;
function Rt(e) {
	return o(f(), () => zt(e));
}
function zt(e) {
	let t = document.createTextNode(""), r = document.createTextNode(""), i = document.createTextNode(""), a = () => e.mount || document.body, s = ne(() => [r, e.children], {
		ssrSource: "client",
		loadingValue: void 0
	});
	return c(() => [
		a(),
		s(),
		d()
	], ([, e, s]) => {
		let c = n(a);
		c.appendChild(i);
		let u = o(s, () => l((n) => (q(c, e, i, void 0, { host: () => t.parentNode }), n)));
		return () => {
			u();
			let e = r;
			for (; e;) {
				let t = e.nextSibling;
				if (c.removeChild(e), e === i) break;
				e = t;
			}
		};
	}, {
		schedule: !0,
		ssrSource: "client"
	}), p(a, () => {
		let e = n(a), r = it(t);
		if (r && !r.contains(e)) return R(e, r), () => nt(e, r);
	}, { ssrSource: "client" }), N.hydrating ? ne(() => t, {
		ssrSource: "client",
		loadingValue: void 0
	}) : t;
}
function Bt(e, t) {
	return Ne(e, t, Vt);
}
function Vt(e, t) {
	let r = N.hydrating, i = r ? wt() : Ut(e, n(() => t.is), n(() => t.xmlns));
	return pt(i, t), r && Tt(), i;
}
function Ht(e) {
	let t = Bt(() => e.component);
	return te(t, Me(e, "component"));
}
function Ut(e, t = void 0, n = void 0) {
	return n ? document.createElementNS(n, e, { is: t }) : Re.has(e) ? document.createElementNS(Be.svg, e) : ze.has(e) ? document.createElementNS(Be.mathml, e) : document.createElement(e, { is: t });
}
//#endregion
export { Le as DelegatedEvents, Ht as Dynamic, Rt as Portal, ut as addEvent, st as claimElement, lt as className, te as createComponent, et as delegateEvents, F as effect, it as getDelegatedRoot, d as getOwner, q as insert, Lt as isServer, Ue as memo, je as mergeProps, U as readShallow, xt as ref, R as registerDelegatedContainer, Ze as render, H as setAttribute, ft as setStyleProperty, pt as spread, It as ssr, dt as style, $e as template, L as unregisterDelegatedRoot };
