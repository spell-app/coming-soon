//#region ../node_modules/@solidjs/signals/dist/prod/core/error.js
var e = class extends Error {
	constructor(e) {
		let t = Error, n = t.stackTraceLimit;
		n !== void 0 && (t.stackTraceLimit = 0), super(), n !== void 0 && (t.stackTraceLimit = n), this.source = e;
	}
}, t = class extends Error {
	constructor(e, t) {
		try {
			var n = String(t instanceof Error ? t.message : t);
		} catch {}
		super(n, { cause: t }), this.source = e;
	}
};
function n(e) {
	return e instanceof t ? e.cause : e;
}
var r = class extends Error {
	constructor() {
		super("");
	}
}, i = class extends Error {
	constructor() {
		super("");
	}
}, a = 1024, o = 2048, s = 4096, c = 8192, l = 16384, u = 32768, d = 1 << 17, f = 1 << 18, p = 1 << 19, m = 1 << 20, h = 1024, g = 1 << 21, _ = 32768, ee = 16384, v = 1 << 22, y = {}, b = typeof Proxy == "function", x = {}, te = Symbol("refresh");
//#endregion
//#region ../node_modules/@solidjs/signals/dist/prod/core/owner.js
function ne(e) {
	let t = e.De;
	for (; t;) t.R |= 32, ne(t), t = t.pe;
}
function S(e) {
	e.l &= -33, It(e);
}
var re;
function ie(e) {
	try {
		e();
	} catch (e) {
		re ||= [e], P();
	}
}
function ae(e) {
	let t = re;
	if (re = void 0, t && !e) throw t[0];
}
function oe(e, t = !1, n) {
	let r = e.R;
	if (r & 64) return;
	t && !n && e.T !== null && (e.T.Ue !== null || e.T.me !== null) && oe(e, !1, !0), t && (e.R = r | 64), t && e.X && (e.T !== null && (e.T.Se = null), (e.m & 1 && e.T?.Re != null || r & 2048) && P());
	let i = n ? e.T.Ue : e.De;
	for (n ? e.T.Ue = null : e.De = null; i;) {
		let e = i;
		e.l &= -33, Tt(e, M), Nt(e), i.Ze = i, oe(i, !0), i = i.pe;
	}
	if (n || (e.ye = 0), t && !n && !(r & 32) && e._parent !== null && !(e._parent.R & 64)) {
		let t = e.Ze, n = e.pe;
		t === null ? e._parent.De = n : t.pe = n, n !== null && (n.Ze = t), e.Ze = null;
	}
	if (ce(e, n), t && e.Je) {
		let t = e.Je;
		e.Je = void 0, ie(t);
	}
}
function se(e, t) {
	let n = e.De;
	t.Ze = null, t.pe = n, n !== null && (n.Ze = t), e.De = t;
}
function ce(e, t) {
	let n = t ? e.T.me : e.He;
	if (n) {
		if (t ? e.T.me = null : e.He = null, Array.isArray(n)) for (let e = n.length - 1; e >= 0; e--) ie(n[e]);
		else ie(n);
	}
}
function le(e, t) {
	let n = e;
	for (; n.l & 4 && n._parent;) n = n._parent;
	if (n.id != null) return fe(n.id, t ? n.ye++ : n.ye);
	throw Error("");
}
function ue(e) {
	return le(e, !0);
}
function de(e, t, n) {
	return e?.id ?? (t ? n?.id : n?.id == null ? void 0 : ue(n));
}
function fe(e, t) {
	let n = t.toString(36), r = n.length - 1;
	return e + (r ? String.fromCharCode(64 + r) : "") + n;
}
function pe() {
	return U ? W : null;
}
function C() {
	return W;
}
function me(e, t = W) {
	return t && (t.He ? Array.isArray(t.He) ? t.He.push(e) : t.He = [t.He, e] : t.He = e), e;
}
function he(e = !0) {
	oe(this, e), re && !R.q && ae();
}
function w(e) {
	let t = W, n = e?.transparent ?? !1, r = {
		id: de(e, n, t),
		l: n ? 4 : 0,
		R: 0,
		Qe: !0,
		Ye: t?.Qe ? t.Ye : t,
		De: null,
		pe: null,
		Ze: null,
		He: null,
		A: t?.A || x,
		ye: 0,
		T: null,
		_parent: t,
		dispose: he
	};
	return t && se(t, r), r;
}
function ge(e, t) {
	let n = w(t);
	return X(n, () => e(he.bind(n, !0)));
}
//#endregion
//#region ../node_modules/@solidjs/signals/dist/prod/core/scheduler.js
var _e = null, ve = null, ye = null, be = null, xe = null, Se = null, Ce = null, we = null, Te = null, Ee = null, De = null;
function Oe(e, t, n, r, i) {
	Ce = e, we = t, Te = n, Ee = r, De = i;
}
var ke = null, Ae = null, je = null, Me = null, Ne = null, Pe = void 0, T = [];
function Fe(e, t = null) {
	let n = {
		tn: [],
		un: [[], []],
		En: [],
		cn: null,
		_parent: t,
		v: e,
		he: null,
		tt: 0,
		nt: !1,
		en: null,
		ke: !1,
		ln: !1,
		I: null
	};
	return e || T.push(n), n;
}
var E = null;
function Ie(e) {
	E = e;
}
var D = null, O = null;
function Le(e, t) {
	if (R.q && !t || D !== null) return j(e);
	O === null ? O = A(e) : ze(A(e), O), P();
}
function k(e) {
	return e.T.Re = A(e.T.Re);
}
function Re(e) {
	return e = A(e), T.indexOf(e) === -1 ? null : e;
}
function A(e) {
	for (; e.cn !== null;) e = e.cn;
	return e;
}
function j(e) {
	let t = D;
	t === null ? D = e === null ? Fe(!1) : A(e) : e !== null && ze(A(e), t), R.q || P();
}
function ze(e, t) {
	e = A(e), t = A(t), !(e === t || e.v || t.v) && (e.cn = t, t.tt += e.tt, t.nt ||= e.nt, I(t.tn, e.tn), I(t.un[0], e.un[0]), I(t.un[1], e.un[1]), I(t.En, e.En), e.I !== null && I(t.I ??= [], e.I), T.splice(T.indexOf(e), 1));
}
function Be(e) {
	let t = Ve;
	Ve ??= e;
	let n = e.tt !== 0 || Ue(e.tn, e) || !!Se?.(e);
	return Ve = t, n;
}
var Ve = null;
function He(e, t) {
	let n = e.T?.fe;
	if (n === void 0) return !0;
	for (let e of n) {
		let n = e.T?.Re;
		if (n == null || A(n) === t) return !0;
	}
	return !1;
}
function Ue(e, t, n = !1) {
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (!(!(i.m & 1) || i.R & 64 || i.l & 8192 || i.T.Re !== null && k(i) !== t || n && !He(i, t))) {
			if (i.i === 1) {
				if (We(i, Ve ?? t)) return !0;
				continue;
			}
			for (let e = i.o; e !== null; e = e.t) {
				let n = e.u;
				if ((n.i === 1 && n.m & 1 || n.R & 2048 || n.l & 16384 && n.m === 1) && (e.Te === n.Ne || n.T?.F != null) && !(n.R & 64) && We(n, Ve ?? t)) return !0;
			}
		}
	}
	return !1;
}
function We(e, t) {
	return !(e.R & 32 && Ge(e, t)) && !Te?.(e);
}
function Ge(e, t) {
	let n = e;
	for (; n?.R & 32;) n = n._parent;
	return n?.l & 256 && n.T?.Re != null && k(n) === A(t);
}
var Ke = [];
function qe(e) {
	Ke.push(e);
}
var Je = [];
function Ye(e) {
	Tt(e, M), e.R &= -4, Je.push(e);
}
function Xe(e, t) {
	e.l |= 256, Ze(e, t);
}
function Ze(e, t) {
	let n = q(e);
	n.Re !== t && (n.Re = t, t.tn.push(e));
}
function Qe(e, t) {
	for (let n = e.De; n !== null; n = n.pe) n.T?.Re?.v || (n.X !== void 0 && (n.l & 256 || Xe(n, t), n.l |= m), Qe(n, t));
}
function $e(e, t, n) {
	for (let r = e.De; r !== null; r = r.pe) (r.l & 2304) == 256 && k(r) !== t && n(r), $e(r, t, n);
}
function et(e) {
	e.T.Re = null, e.l &= -257;
}
var M = {
	$e: Array(2e3).fill(void 0),
	p: !1,
	Ge: 0,
	et: 0
}, N = 0, tt = !1, nt = !1, rt = !1, it = 0, at = 0, ot = 0;
function P() {
	if (nt) {
		lt();
		return;
	}
	tt || (tt = !0, !it && !R.q && queueMicrotask(bt));
}
var st = Symbol.for("solid-js/root-error-hook");
function ct(e) {
	if (nt) return;
	nt = !0, ae(!0);
	let t = "[REACTIVITY_HALTED]", n = e !== void 0 && globalThis.reportError;
	n || e === void 0 ? console.error(t) : console.error(t, e), n && n(e);
}
function lt() {
	rt || (rt = !0, console.error("[REACTIVITY_HALTED]"));
}
var F = class e {
	un = [[], []];
	q = !1;
	flush() {
		if (!this.q) {
			this.q = !0, Dn(), E = null, O = null;
			try {
				Rt(), Ot(M, e._e), this.settle(), N++, tt = M.et >= M.Ge || L.length !== 0, this.run(1), this.run(2);
			} finally {
				this.q = !1, O = null;
			}
		}
	}
	settle() {
		be?.() && Ot(M, e._e);
		let t = D;
		D = null, ye?.(t);
		let n = t !== null && !t.v ? A(t) : null;
		if (n !== null) {
			let e = L.length;
			for (let t = 0; t < e; t++) {
				let e = L[t];
				if (!(e.l & 2304) && (e.T === null || e.T.Re === null || !e.T.Re.v)) {
					if (e.se === y && e.m & 4 && e.i !== 1) continue;
					if (e.se !== y && !(e.m & 5) && e.T?.Ue == null && e.T?.me == null && Pn(e, e.Ie, e.se)) {
						e.se = y, e.l &= -129;
						continue;
					}
					Xe(e, n);
				}
				e.l & 128 && Qe(e, n);
			}
			L.length = 0, ke?.(n), Je.splice(0);
		} else {
			yt();
			for (let e = 0; e < Ke.length; e++) {
				let t = Ke[e];
				t.T?.F == null && !t.Ae && Mt(t);
			}
		}
		Ke.length &&= 0;
		let r = this.un, i = this.un = [[], []];
		this.un = [[], []];
		for (let e = T.length - 1; e >= 0; e--) {
			let t = T[e];
			Be(t) || (T.splice(e, 1), xe?.(t), dt(t), e = T.length);
		}
		Ae?.();
		let a = n && Re(n);
		Me?.(a);
		let o = a !== null;
		for (let e = 0; e < 2; e++) o && I(a.un[e], r[e]), this.un[e] = o || i[e].length || this.un[e].length ? i[e].concat(o ? [] : r[e], this.un[e]) : r[e];
		if (Je.length !== 0) {
			let e = Je.splice(0).sort((e, t) => e.Fe - t.Fe);
			for (let t = 0; t < e.length; t++) e[t].R & 64 || G(e[t]);
		}
		Ee?.();
	}
	run(e) {
		let t = this.un[e - 1];
		t.length && (this.un[e - 1] = [], xt(t, e));
	}
	enqueue(e, t, n = E) {
		e && (n === null ? this : n).un[e - 1].push(t), P();
	}
	notify(e, t, n, r) {
		return Ce?.(e, n & t, r) ? !0 : t & 1 ? (n & 1 && E === null && j(null), !0) : !1;
	}
};
function ut(e) {
	for (let t = 0; t < e.En.length; t++) {
		let n = e.En[t];
		if (!(n.R & 64 || n.m & 2) && (n.R & 2048 || n.l & 32768)) {
			n.R &= ~o, n.Ae = !1;
			for (let e = n.De; e !== null; e = e.pe) e.i && (e.Ae = !1);
			z(n);
		}
	}
	e.En.length = 0;
}
function dt(e) {
	ut(e), e.I !== null && je(e.I);
	for (let t = 0; t < e.tn.length; t++) {
		let n = e.tn[t];
		n.T.Re !== null && k(n) === e && (n.T.Re = null, vt(n));
	}
	D === e && (D = null), ft(e);
}
function ft(e) {
	for (let t = 0; t < 2; t++) I(R.un[t], e.un[t]), e.un[t] = [];
}
function I(e, t) {
	for (let n = 0; n < t.length; n++) e.push(t[n]);
}
var L = [];
function pt(e, t) {
	e.R & 2048 || (e.R |= o, t.En.push(e));
}
function mt(e) {
	L.push(e), R.q || Sn();
}
var ht = 0;
function gt() {
	ht++;
}
function _t(e) {
	e.Me = ht;
	let t = !!(e.l & 512) && e.T?.Pe !== void 0;
	for (let n = e.o; n !== null; n = n.t) {
		let e = n.u;
		if (e.R & 4 && n.Te === e.Ne && n !== e._ && (e.R |= s), t && e.l & 8) {
			e.R |= 256;
			continue;
		}
		z(e);
	}
}
function vt(e) {
	let t = e;
	if (!t.X) {
		e.l &= -385, e.se !== y && (e.Ie = e.se, e.se = y);
		return;
	}
	let n = e.se === y && !!(t.m & 1), r = e.l & g;
	if (!n && t.T && (t.T.de = void 0), e.l = n ? e.l & -1048833 | h : e.l & -3147137, r) {
		let n = e.se;
		e.se = y, e.ie = N + 1, en(t, 2, n);
	} else e.se !== y && (e.Ie = e.se, e.se = y, t.m &= -5, t.T != null && (t.T.Ve = !1, t.T.je = y), e.i && e.i !== 3 && (e.Ae = !0, R.enqueue(e.i, e.W ??= F.K.bind(null, t))));
	t.ce = !1, t.R &= ~a, t.T?.F ?? Mt(t), t.m & 1 || (t.m &= -5), !n && t.T != null && (t.T.Ue !== null || t.T.me !== null) && F.Ce(t, !1, !0);
}
function yt() {
	for (let e = 0; e < L.length; e++) {
		let t = L[e];
		t.l & 2304 || vt(t);
	}
	L.length = 0;
}
var R = new F();
function bt(e) {
	if (at > 0) return e ? e() : void 0;
	if (e) {
		it++;
		try {
			return e();
		} finally {
			try {
				bt();
			} finally {
				it--;
			}
		}
	}
	if (!R.q && !nt) {
		for (; tt;) R.flush();
		ae();
	}
}
function xt(e, t) {
	for (let n = 0; n < e.length; n++) e[n](t);
}
//#endregion
//#region ../node_modules/@solidjs/signals/dist/prod/core/heap.js
function z(e) {
	M.Ge > e.Fe && (M.Ge = e.Fe), Ct(e, M);
}
function St(e, t) {
	let n = (e._parent?.Qe ? e._parent.Ye?.Fe : e._parent?.Fe) ?? -1;
	n >= e.Fe && (e.Fe = n + 1);
	let r = e.Fe, i = t.$e[r];
	if (i === void 0) t.$e[r] = e;
	else {
		let t = i.We;
		t.be = e, e.We = t, i.We = e;
	}
	r > t.et && (t.et = r);
}
function Ct(e, t) {
	let n = e.R;
	n & 12 || (n & 1 ? e.R = n & -4 | 10 : (e.R = n | 8, t.p && Dt(e)), n & 16 || St(e, t));
}
function wt(e, t) {
	let n = e.R;
	n & 28 || (e.R = n | 16, St(e, t));
}
function Tt(e, t) {
	let n = e.R;
	if (!(n & 24)) return;
	e.R = n & -25;
	let r = e.Fe;
	if (e.We === e) t.$e[r] = void 0;
	else {
		let n = e.be, i = t.$e[r], a = n ?? i;
		e === i ? t.$e[r] = n : e.We.be = n, a.We = e.We;
	}
	e.We = e, e.be = void 0;
}
function Et(e) {
	if (!e.p) {
		e.p = !0;
		for (let t = 0; t <= e.et; t++) for (let n = e.$e[t]; n !== void 0; n = n.be) n.R & 8 && Dt(n);
	}
}
function Dt(e, t = 2) {
	let n = e.R;
	if (!((n & 3) >= t)) {
		e.R = n & -4 | t;
		for (let t = e.o; t !== null; t = t.t) Dt(t.u, 1);
	}
}
function Ot(e, t) {
	for (e.p = !1, e.Ge = 0; e.Ge <= e.et; e.Ge++) {
		let n = e.$e[e.Ge];
		for (; n !== void 0;) n.R & 8 ? t(n) : kt(n, e), n = e.$e[e.Ge];
	}
	e.et = 0;
}
function kt(e, t) {
	Tt(e, t);
	let n = e.Fe;
	for (let t = e.C; t; t = t.G) {
		let e = t.S;
		e.X && e.Fe >= n && (n = e.Fe + 1);
	}
	if (e.Fe !== n) {
		e.Fe = n;
		for (let n = e.o; n !== null; n = n.t) wt(n.u, t);
	}
}
//#endregion
//#region ../node_modules/@solidjs/signals/dist/prod/core/graph.js
var At;
function jt(e) {
	let t = e.S, n = e.G, r = e.t, i = e.Xe;
	if (r === null ? t.ve = i : r.Xe = i, i !== null) i.t = r;
	else if (t.o = r, r === null) {
		t.l & 4096 ? At(t) : t.T?.we && ie(t.T.we);
		let e = t;
		e.X && e.l & 32 && !(e.R & 32) && !(e.m & 1) && (Pt ? Pt.push(e) : It(e));
	}
	return n;
}
function Mt(e) {
	let t = e._, n = t === null ? e.C : t.G;
	if (n !== null) {
		do
			n = jt(n);
		while (n !== null);
		t === null ? e.C = null : t.G = null;
	}
}
function Nt(e) {
	let t = e.C;
	if (t) {
		do
			t = jt(t);
		while (t !== null);
		e.C = null, e._ = null;
	}
}
var Pt = null, Ft = (e) => Pt = e;
function It(e) {
	Tt(e, M), Nt(e), oe(e, !0);
}
var Lt = /* @__PURE__ */ new Set();
function Rt() {
	if (Lt.size !== 0) {
		for (let e of Lt) !e.o && e.l & 32 && !(e.m & 1) && !(e.R & 96) && It(e);
		Lt.clear();
	}
}
function zt(e, t) {
	let n = t._;
	if (n !== null && n.S === e) return;
	let r = null, i = t.R & 4;
	if (i && (r = n === null ? t.C : n.G, r !== null && r.S === e)) {
		r.Te = t.Ne, t._ = r;
		return;
	}
	let a = e.ve;
	if (a !== null && a.u === t && (!i || a.Te === t.Ne)) return;
	let o = t._ = e.ve = {
		S: e,
		u: t,
		G: r,
		Xe: a,
		t: null,
		Te: t.Ne
	};
	n === null ? t.C = o : n.G = o, a === null ? e.o = o : a.t = o, gt();
}
//#endregion
//#region ../node_modules/@solidjs/signals/dist/prod/core/async.js
function Bt(e, t) {
	return !e.T?.fe?.has(t) && ((q(e).fe ??= /* @__PURE__ */ new Set()).add(t), !0);
}
function Vt(e, t) {
	let n = e.T?.fe;
	return n?.delete(t) ? (n.size || (e.T.fe = void 0), !0) : !1;
}
function Ht(e) {
	e.T !== null && (e.T.fe = void 0);
}
function Ut(e, t) {
	for (let n = e.C; n; n = n.G) {
		let e = n.S;
		if (e === t || e.T?.fe?.has(t)) return !0;
	}
	return !1;
}
function Wt(e, t) {
	q(e).ue = !0, t.source && Bt(e, t.source), e.m & 2 || B(e, t.source, t);
}
function B(t, n, r) {
	if (!n) {
		t.T !== null && (t.T.F = null);
		return;
	}
	if (r instanceof e && r.source === n) {
		q(t).F = r;
		return;
	}
	let i = t.T?.F;
	(!(i instanceof e) || i.source !== n) && (q(t).F = new e(n));
}
function V(e, t) {
	for (let n = e.o; n !== null; n = n.t) t(n.u, n);
}
function Gt(e) {
	e.X && e.l & 32 && !e.o && !(e.R & 32) && !(e.m & 1) && It(e);
}
function Kt(e) {
	let t, n = /* @__PURE__ */ new Set(), r = (e) => {
		n.has(e) || (n.add(e), !e.o && e.l & 32 && (t ??= []).push(e), V(e, r));
	};
	if (V(e, r), t) for (let e of t) Gt(e);
}
function qt(e, n, r) {
	return !(e.l & 256 || r && e.R & 16384 && R.q && !e.fam) || E ? !1 : (Ht(e), e.T && (e.T.ue = !1), (e.m &= 6) & 2 || B(e), e.se = n instanceof t ? n : new t(e, n), e.l |= 128 | g, H(e), P(), !0);
}
function Jt(e, t) {
	let n = !1, r = /* @__PURE__ */ new Set(), i = (e) => {
		r.has(e) || (r.add(e), e.T?.F === t && (z(e), n = !0), V(e, i));
	};
	V(e, i), n && P();
}
function H(e, t = e) {
	Vt(e, t);
	let n = !1, r, i = /* @__PURE__ */ new Set(), a = (o) => {
		if (i.has(o) || t !== e && Ut(o, t) || !Vt(o, t)) return o.l & 32768 && z(o);
		i.add(o), o.ie = N;
		let s = o.T?.fe?.values().next().value, c = o.m & 2;
		s ? c || B(o, s) : (o.m &= -2, c || B(o), o.l & 256 && j(k(o)), o.T?.ue && (z(o), n = !0), o.T !== null && (o.T.ue = !1), !o.o && o.l & 32 && (r ??= []).push(o)), V(o, a);
	};
	if (V(e, a), r) for (let e of r) Gt(e);
	n && P();
}
function Yt(e) {
	return typeof e == "object" && !!e && typeof e.then == "function";
}
function Xt(e) {
	let t = e.T?.ae;
	t != null && (e.T.ae = null, t());
}
function Zt(t, n, r, i) {
	let a = !1, o = !1;
	if (typeof n == "object" && n && J(() => {
		a = n[Symbol.asyncIterator], o = !a && Yt(n);
	}), !o && !a) return t.T !== null && (t.T.Se = null), t.ce = !1, n;
	q(t).Se = n, t.T.Ee = ot || 2147483647, t.T.fe = void 0;
	let s, c = (a) => {
		if (t.T?.Se !== n) return;
		let o = a instanceof e;
		if (o && t.ce) {
			t.T !== null && (t.T.Se = null), Wt(t, a), t.ie = N;
			return;
		}
		(o || r || !qt(t, a)) && en(t, o ? 1 : 2, a), o && H(t), t.ie = N, o || Kt(t), i?.(a, o);
	}, l = (e, i) => {
		if (t.T?.Se !== n || t.R & 2) return;
		let a = t.m & 4;
		if ($t(t), r) {
			try {
				r(e);
			} catch (e) {
				c(e);
				return;
			}
			t.l & 256 || (t.T.de = void 0), a && $t(t, !0);
		} else Y(t, () => e);
		t.se === y && (t.ce = !1, Mt(t)), H(t), P(), bt(), i?.();
	}, u = () => t.l & 32 && !t.o && !(t.m & 1) ? (It(t), !0) : !1, d = (e, r) => {
		let i = e[Symbol.asyncIterator](), a = !1, o = !1, d = !r, f = () => {
			if (!o) {
				o = !0;
				try {
					let e = i.return?.();
					Yt(e) && e.then(void 0, () => {});
				} catch {}
			}
		};
		me(f, r), q(t).ae = f;
		let p = () => {
			try {
				u() || m();
			} catch (e) {
				c(e);
			}
		}, m = () => {
			let e, r, f = !1, h = !1, g = !0, _ = i.next();
			if ((Yt(_) ? _ : { then: (e) => void e(_) }).then((r) => {
				if (g && d) e = r, f = !0, r.done && (o = !0);
				else if (t.T?.Se !== n) return;
				else r.done ? (o = !0, a ? (P(), bt()) : l(void 0), u()) : (a = !0, l(r.value, p));
			}, (e) => {
				g && d ? (r = e, h = !0) : t.T?.Se === n && (o = !0, c(e), u());
			}), g = !1, h) {
				if (o = !0, c(r), d) throw r;
				return !0;
			}
			return f && !e.done ? (s = e.value, a = !0, m()) : f && e.done;
		}, h = m();
		return d = !1, a || h;
	}, f = null, p = (e, t) => {
		let n = !1;
		if (typeof e == "object" && e && J(() => {
			n = e[Symbol.asyncIterator];
		}), !n) return !1;
		s = void 0;
		let r = d(e, t);
		return t || (f = r), !0;
	};
	if (o) {
		let r = !1, i = !1, a, o = !0;
		if (n.then((e) => {
			if (o) s = e, r = !0;
			else {
				try {
					if (t.T?.Se === n && !(t.R & 64) && p(e, t)) return;
					l(e);
				} catch (e) {
					c(e);
				}
				u();
			}
		}, (e) => {
			o ? (a = e, i = !0) : (c(e), u());
		}), o = !1, i) throw c(a), a;
		if (r) p(s) || (t.ce = !1);
		else {
			if (t.ce) return t.Ie;
			throw new e(W);
		}
	}
	if (a && p(n), f !== null) {
		if (!f) {
			if (t.ce) return t.Ie;
			throw new e(W);
		}
		t.ce = !1;
	}
	return s;
}
function Qt(e, t = !1) {
	e.T?.fe && Ht(e), e.T?.ue && e.T !== null && (e.T.ue = !1), e.m = t ? 0 : e.m & 4, e.T?.F && B(e);
	let n = pn(e);
	n && n.call(e);
}
function $t(e, t = !1) {
	let n = e.T?.fe;
	n && (n.delete(e), n.size) ? (e.T.ue = !1, t && (e.m = 1), B(e, n.values().next().value)) : Qt(e, t);
}
function en(n, r, i, a) {
	r === 2 && !(i instanceof t) && !(i instanceof e) && (i = new t(n, i));
	let o = r === 1 && i instanceof e ? i.source : void 0;
	if (r === 1 && o ? (n.m & 2 && (n.T.de = n.T.F), Bt(n, o), n.m = 1 | n.m & 4, B(n, o, i)) : (Ht(n), n.m = r | (r === 2 ? 0 : n.m & 4), q(n).F = i), r === 1 && n.l & 8192) {
		E === null && j(null);
		return;
	}
	let s = pn(n);
	if (s) {
		s.call(n);
		return;
	}
	tn(n, r, i);
}
function tn(t, n, r, i) {
	let a = n === 1 && r instanceof e ? r.source : void 0;
	V(t, (e, t) => {
		if (e.ie = N, e.l & 49152 || n === 1 && t.Te !== e.Ne) {
			z(e), P();
			return;
		}
		if (n === 1 && a && e.T?.fe?.has(a)) {
			E === null && (e.l & 2304) == 256 && R.q && !we?.(e, a.ie === N) && j(k(e));
			return;
		}
		(n === 1 && a || n !== 1 && (e.T?.F !== r || e.T?.fe)) && (mt(e), n === 1 && (e.l & 2304) == 256 && !e.i && j(k(e)), en(e, n, r));
	});
}
F._e = (e) => {
	e.i === 3 ? (Tt(e, M), e.Ae = !0, R.enqueue(2, e.M)) : e.R & 32 && !(e.R & 65536) ? Ye(e) : G(e);
}, F.Ce = oe;
var U = !1, W = null, nn;
function G(t, n = !1) {
	gt();
	let r = t.i, i, a = E, m = _e && (nn = n && (a || nn));
	if (Ie(null), !n) {
		if (Tt(t, M), t.T !== null && (t.T.Se = null, Xt(t)), t.m & 1 && (t.l &= ~_), t.l & 256) {
			let e = k(t);
			e.v || t.l & 524288 || (r !== 1 && !(t.l & 32768) ? Le(e, we?.(t, t.m & 4)) : e !== D && !(t.m & 4 || t.l & 1048576) && (t.se = y, r === 1 && (t.l &= -257)));
		}
		if (r === 3 || t.l & 128) {
			let e = Pt;
			Ft(i = []), oe(t), Ft(e);
		} else (t.De !== null || t.He !== null) && ln(t);
		t.l & 2097152 && (t.se = y, t.l ^= g);
	}
	let h = !!(t.m & 4), ee = t.m & 2 ? t.T?.F : void 0, v = t.m & 1 ? t.T?.fe : void 0, b = t.T?.fe?.has(t), x = !1, te = !!(t.R & 8192) && !(t.m & 1 && t.T !== null && !t.T.Ve), ne = W;
	W = t, t._ = null, t.Ne++, t.R = 4 | t.R & (32 | c), t.ie = N;
	let S = t.se === y ? t.l & 2048 && t.T.v !== y ? t.T.v : t.Ie : t.se, re = t.Fe, ie = !1, ae = !1, se = U;
	U = !0;
	try {
		if (t.l & 64) S = t.X(S), t.T !== null && (t.T.Se = null), t.ce = !1;
		else {
			let e = t.T?.Se, n = t.X(S), r = typeof n == "object" && !!n, i = t.T?.Se !== e;
			S = i || !r ? n : Zt(t, n), !i && !r && (t.T !== null && (t.T.Se = null), t.ce = !1);
		}
		(t.m !== 0 || t.T !== null) && Qt(t, n);
	} catch (n) {
		let r = n instanceof e;
		if (r && t.ce) Wt(t, n);
		else if ((r || !(x = qt(t, n, !0))) && (r && (q(t).ue = !0), en(t, r ? 1 : 2, n), r && b && !t.T?.Se && H(t)), (r || x) && v) for (let e of v) e !== t && !t.T?.fe?.has(e) && H(t, e);
	} finally {
		if (U = se, ie = (t.R & s) !== 0, ae = !!(t.R & (m && (a || r || !(t.m & 1)) ? 128 | l : 128)), t.l = t.l & ~_ | t.R & u, t.R = t.R & (96 | o | l | d | f | p) | (n ? t.R & 256 : 0), W = ne, i) for (let e of i) Gt(e);
		t.T !== null && (t.T.Ve = te && !!(t.m & 1));
	}
	if (t.R & 64) {
		Nt(t), t.T !== null && (t.T.Se = null), Ie(a);
		return;
	}
	let ce = !!t.T?.F || x;
	if (!ce) {
		let e = t.se === y ? t.l & 2048 && t.T.v !== y ? t.T.v : t.Ie : t.se, i = !r && h || !!t.T?.de || !Pn(t, e, S);
		if (r && i && !(t.R & 262144 && !t.Ae && Object.is(t.ge, S)) && t.se === y && (t.Ae = !t.T?.F, !n && R.enqueue(r, t.W ??= F.K.bind(null, t), null)), !(!n && t.l & 8192 && ve(t, S, ce)) && !ce) {
			if (i) (n ? !((D !== null || O !== null) && (ae || cn(ne)?.R & 128)) : r && t.se === y) ? t.Ie = S : (t.se = S, n && (Xe(t, D ?? O), t.m |= 4, we?.(t, !m && D))), t.o !== null && _t(t);
			else if (t.Fe != re) for (let e = t.o; e !== null; e = e.t) wt(e.u, M);
		}
		if (!i && !t.T?.F && (ee !== void 0 && Jt(t, ee), v)) for (let e of v) e !== t && H(t, e);
		b && !(t.m & 5) && H(t);
	}
	if (n && ae && t.m & 1) {
		let e = D ?? O;
		e && !e.v && we?.(t) !== 2 && Xe(t, e);
	}
	!t.T?.F && t.se === y && !(r && t.Ae) && (n || r === 3 ? Mt(t) : qe(t)), (t.se !== y || t.T !== null && (t.T.Ue !== null || t.T.me !== null) || t.m & 5 && (!n || t.m & 1)) && (t.l |= 128, mt(t)), Ie(a), ie && (z(t), P());
}
function rn(e) {
	if (!(e.R & 68)) {
		if (e.R & 1) for (let t = e.C; t; t = t.G) {
			let n = t.S;
			if (n.X && rn(n), e.R & 2) break;
		}
		(e.R & 2 || e.T?.F && e.ie < N && !e.T?.Se) && G(e), e.R &= 376 | a | o | l | d | f | p;
	}
}
function K(e, t) {
	let n = t?.transparent ?? !1, r = typeof t == "object" && !!t && "loadingValue" in t, i = {
		id: de(t, n, W),
		l: (n ? 4 : 0) | !!t?.ownedWrite | (!W || t?.lazy ? 32 : 0) | (t?.sync ? 64 : 0) | (t?.le ? 2 : 0) | (t?.Le ?? 0) | 0,
		xe: t?.equals ?? _n,
		He: null,
		A: W?.A ?? x,
		ye: 0,
		X: e,
		Ie: r ? t.loadingValue : void 0,
		Fe: 0,
		be: void 0,
		We: null,
		C: null,
		_: null,
		Ne: 0,
		o: null,
		ve: null,
		_parent: W,
		pe: null,
		Ze: null,
		De: null,
		R: t?.lazy ? 512 : 0,
		m: r ? 0 : 4,
		ie: N,
		se: y,
		Me: -1,
		ce: r,
		T: null
	};
	return t?.unobserved && (q(i).we = t.unobserved), hn(i, t), i;
}
function q(e) {
	return e.T ??= {
		Se: null,
		ae: null,
		F: void 0,
		ue: void 0,
		fe: void 0,
		we: void 0,
		Pe: void 0,
		Ue: null,
		me: null,
		Re: null,
		Ve: !1,
		je: y,
		Be: -1,
		Ee: 0,
		v: y,
		I: 0,
		de: void 0
	};
}
function an(e, t) {
	e.R |= 128, (t.m & 4 || e.i !== 1) && Le(k(t), !e.i && e.m & 4 || we?.(e));
}
function on(e, t) {
	let n = Ne && e.l & 32768, r = _e && E !== null;
	if ((!r || e.m & 4 && t.m & 1) && !n && (e.i !== 1 || t.l & 1024)) return !1;
	let i = k(t);
	return i === D && !r && !n || sn(e, i) ? !1 : (pt(e, i), !0);
}
function sn(e, t) {
	return (e.m & 4 || e.l & 1048576) && e.l & 256 && k(e) === t;
}
function cn(e) {
	return e !== null && e.Qe ? e.Ye : e;
}
function ln(e) {
	ne(e);
	let t = q(e);
	t.me = e.He, t.Ue = e.De, e.He = null, e.De = null, e.ye = 0;
}
function un(e, t, n, r, i) {
	let a = i?.transparent ?? !1, o = {
		id: de(i, a, W),
		l: (a ? 4 : 0) | !!i?.ownedWrite | (i?.sync ? 64 : 0) | (i?.Le ?? 0) | 0,
		xe: !1,
		He: null,
		A: W?.A ?? x,
		ye: 0,
		X: e,
		Ie: void 0,
		Fe: 0,
		be: void 0,
		We: null,
		C: null,
		_: null,
		Ne: 0,
		o: null,
		ve: null,
		_parent: W,
		pe: null,
		Ze: null,
		De: null,
		R: 512,
		m: 4,
		ie: N,
		se: y,
		Me: -1,
		ce: !1,
		Ae: !1,
		ge: void 0,
		Ke: t,
		qe: n,
		Je: void 0,
		i: r,
		T: null
	};
	return i?.unobserved && (q(o).we = i.unobserved), hn(o, mn), o;
}
var dn = null;
function fn(e) {
	dn = e;
}
function pn(e) {
	return e.i ? dn ?? void 0 : void 0;
}
var mn = { lazy: !0 };
function hn(e, t) {
	e.We = e;
	let n = W?.Qe ? W.Ye : W;
	W && se(W, e), n && (e.Fe = n.Fe + 1), Pe?.(e), !t?.lazy && G(e, !0);
}
function gn(e, t) {
	let n = {
		xe: t?.equals ?? _n,
		l: +!!t?.ownedWrite | (t?.le ? 2 : 0),
		Ie: e,
		o: null,
		ve: null,
		ie: N,
		se: y,
		Me: -1,
		T: null
	};
	return t?.unobserved && (q(n).we = t.unobserved), n;
}
function _n(e, t) {
	return e === t;
}
var vn = null;
function J(e, t) {
	let n = U;
	U = !1;
	try {
		return e();
	} finally {
		U = n;
	}
}
function yn(e, t) {
	if (e.R & 512) e.R &= -513, G(e, !0);
	else if (e.R & 64 && e.l & 32) {
		let t = e._parent;
		if (t !== null) {
			if (t.R & 64) {
				e.l &= -33;
				return;
			}
			e.R & 32 || se(t, e);
		}
		G(e, !0);
	}
}
function bn(e, t) {
	return !t || e.se === y || t.l & 16;
}
var xn = !1;
function Sn() {
	xn = !0;
}
function Cn(e) {
	return R.q || e.se === y || e.l & 4194304 ? y : e.l & 256 ? e.T.Be === N ? e.T.je : y : e.Ie;
}
function wn(e) {
	let t = e.T;
	t.Be !== N && (t.je = e.se, t.Be = N, xn = !0);
}
var Tn = [];
function En(e) {
	return e.R |= s, !0;
}
function Dn() {
	if (xn = !1, Tn.length !== 0) {
		for (let e of Tn) e.l &= ~v;
		Tn.length = 0;
	}
}
function On(e, t) {
	e.Fe >= M.Ge ? (Dt(t), Et(M), rn(e)) : t.l & 65536 && rn(e);
	let n = e.Fe;
	n >= t.Fe && e._parent !== t && (t.Fe = n + 1);
}
function kn(e) {
	let t = W;
	t?.Qe && (t = t.Ye);
	let n = e, r = e;
	if (typeof n.X == "function" && yn(e), vn !== null) return vn(e, t);
	if (!n.X && e.T?.Pe === void 0 && (!xn || e.se === y) && !(e.l & 2048)) {
		if (t && (U && zt(e, t), e.l & 256 && !(t.l & 16))) {
			if (on(t, e)) return e.Ie;
			an(t, e);
		}
		return !t || e.se === y || t.l & 16 ? e.Ie : (jn(t), e.se);
	}
	let i = !1;
	if (t && (U && (zt(e, t), r.X && (On(r, t), t.i || (t.R |= r.l & _))), e.l & 256 && !(e.l & 2048) && !(t.l & 16) && (r.m & 4 || !on(t, e) ? an(t, e) : i = !0)), r.m & 1 && !i && !(e.l & 2048) && r.m & 4, r.m & 1 && !i) {
		if (t) {
			if (!(t.l & 16) || r.m & 4) throw !U && e !== t && zt(e, t), r.T?.F;
		} else if (r.m & 4) throw r.T?.F;
	}
	if (r.X && r.m & 2) {
		if (U && r.ie < N) return G(r), kn(e);
		throw r.T?.F;
	}
	if (i) return e.Ie;
	if (!t && e.T?.de) throw e.T.de;
	let a = An(e, t);
	return !t && typeof n.X == "function" && e.l & 32 && !(r.m & 1) && !e.o && (Lt.add(e), P()), a;
}
function An(t, n) {
	if (t.se !== y && t.m & 4 && (!n || n.l & 16)) throw new e(null);
	let r = n && xn ? Cn(t) : y;
	if (r !== y) return En(n), r;
	if (bn(t, n)) return t.Ie;
	if (jn(n, t), t.l & 2097152) throw t.se;
	return t.se;
}
function jn(e, t) {
	t?.m & 4 || (e.R |= l);
}
function Mn(e) {
	R.q || e.l & 4194304 || (e.l |= v, Tn.push(e));
}
var Nn = null;
function Pn(t, n, r) {
	if (t.xe === _n) return n === r;
	try {
		return t.xe && t.xe(n, r);
	} catch (n) {
		if (!(n instanceof e)) return en(t, 2, n), !0;
	}
}
function Y(e, t) {
	Nn !== null && Nn(e);
	let n = e.se === y ? e.Ie : e.se;
	if (typeof t == "function" && (t = t(n)), e.l & 256 && j(k(e)), !(e.m & 4 || e.T?.de || !Pn(e, n, t))) return t;
	let r = e.se !== y;
	return r ? e.l & 256 && !R.q && wn(e) : mt(e), e.se = t, W !== null && Mn(e), e.X !== void 0 && (e.ie = N), r && e.Me === ht ? t : (_t(e), P(), t);
}
function Fn(e, t) {
	let n = e.l & 256 && !(e.R & 1024) && k(e) !== D;
	if (n && typeof t == "function") {
		let n = t(e.Ie);
		t = () => n;
	}
	return e.m & 2 && (e.T.de = e.T.F, en(e, 0, void 0)), t = Y(e, t), e.l &= ~g, n ? (e.R = e.R & -2 | 2, Ct(e, M), P()) : e.se !== y && (e.R |= a), t;
}
function X(e, t) {
	let n = W, r = U;
	W = e, U = !1;
	try {
		return t();
	} finally {
		W = n, U = r;
	}
}
function In(e, t = !0) {
	try {
		return e();
	} finally {}
}
//#endregion
//#region ../node_modules/@solidjs/signals/dist/prod/core/identities.js
var Ln = null;
//#endregion
//#region ../node_modules/@solidjs/signals/dist/prod/core/context.js
function Rn(e, t = C()) {
	if (!t) throw new r();
	let n = t.A[e.id];
	if (n === void 0 && (n = e.defaultValue), n === void 0) throw new i();
	return n;
}
function zn(e, t, n = C()) {
	if (!n) throw new r();
	n.A = {
		...n.A,
		[e.id]: t === void 0 ? e.defaultValue : t
	};
}
//#endregion
//#region ../node_modules/@solidjs/signals/dist/prod/core/effect.js
function Bn(e, t, n, r) {
	let i = un(e, t, n, r?.user ? 2 : 1, r);
	G(i, !0), !r?.defer && i.se === y && !i.T?.Re?.v && (i.i === 2 || r?.schedule ? R.enqueue(i.i, Hn.bind(null, i)) : Hn(i, i.i));
}
function Vn(e, t) {
	let r = e === void 0 ? this.m : e, i = t === void 0 ? this.T?.F : t;
	if (r & 2) {
		if (R.notify(this, 1, 0), this.i === 2) {
			this.m & 2 && (this.Ae = !0, R.enqueue(this.i, this.W ??= Hn.bind(null, this)));
			return;
		}
		if (!R.notify(this, 2, 2)) throw ct(n(i)), i;
	} else this.i === 1 && R.notify(this, 3, r, i);
}
function Hn(e, r) {
	if (!e.Ae || e.R & 64 || De?.(e)) return;
	if (e.m & 2 && e.i === 2) {
		let t = n(e.T?.F);
		e.ge = e.Ie, e.Ae = !1;
		try {
			e.qe ? e.qe(t, () => {
				let t = e.Je;
				e.Je = void 0, t?.();
			}) : console.error(t);
		} catch (t) {
			if (!R.notify(e, 2, 2)) throw ct(t), t;
		}
		return;
	}
	let i = e.T?.F == null, a = e.Je;
	e.Je = void 0;
	try {
		a?.(), e.Je = e.Ke(e.Ie, e.ge);
	} catch (n) {
		if (q(e).F = new t(e, n), e.m |= 2, !R.notify(e, 2, 2)) throw ct(n), n;
	} finally {
		e.ge = e.Ie, e.Ae = !1, i && Mt(e);
	}
}
F.K = Hn;
function Un(e, t) {
	let n = () => {
		if (!(!r.Ae || r.R & 64) && !De?.(r)) try {
			r.Ae = !1, G(r);
		} finally {}
	}, r = K(() => {
		let t = r.Je;
		r.Je = void 0, t?.();
		let n = In(e);
		r.Je = n;
	}, {
		...t,
		lazy: !0
	});
	r.Je = void 0, r.l = r.l & -33 | 16, r.Ae = !0, r.i = 3, r.M = n, z(r), P();
}
fn(Vn);
//#endregion
//#region ../node_modules/@solidjs/signals/dist/prod/core/error-hooks.js
var Wn = /* @__PURE__ */ new WeakSet();
function Gn(e) {
	for (let t = e; t; t = t._parent) {
		let e = t[st];
		if (e !== void 0) return e;
	}
}
function Kn(e) {
	let t = [];
	for (let n = e; n; n = n._parent) {
		let e = n._name;
		typeof e == "string" && e.length && t.push(e);
	}
	return t.length ? t.reverse() : void 0;
}
function qn(e, t, n) {
	if (e !== null && (typeof e == "object" || typeof e == "function")) {
		if (Wn.has(e)) return;
		Wn.add(e);
	}
	let r = Gn(t);
	if (r === void 0) return;
	let i = {}, a = Kn(t), o = Kn(n) ?? a;
	o !== void 0 && (i.ownerPath = o), a !== void 0 && (i.boundaryPath = a);
	try {
		r(e, i);
	} catch (e) {
		console.error(e);
	}
}
//#endregion
//#region ../node_modules/@solidjs/signals/dist/prod/store/types.js
var Jn = Symbol(0), Yn = Symbol(0), Xn = Symbol(0), Zn = Symbol(0);
function Qn(e) {
	return Reflect.ownKeys(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
//#endregion
//#region ../node_modules/@solidjs/signals/dist/prod/signals.js
function $n(e) {
	return me(e);
}
function Z(e) {
	let t = kn.bind(null, e);
	return t[te] = e, t;
}
function er(e, t) {
	if (typeof e == "function") {
		let n = K(e, t);
		return n.l &= -33, [Z(n), Fn.bind(null, n)];
	}
	let n = gn(e, t);
	return Ln !== null && Ln(n), [Z(n), Y.bind(null, n)];
}
function Q(e, t) {
	return Z(K(e, t));
}
function tr(e, t, n) {
	Bn(e, t.effect || t, t.error, {
		user: !0,
		...n
	});
}
function nr(e, t, n) {
	Bn(e, t, void 0, n);
}
function rr(e) {
	let t = C();
	t && !(t.l & 16) ? Un(() => J(e), void 0) : R.enqueue(2, function t() {
		if (M.et >= M.Ge) return R.enqueue(2, t);
		e();
	});
}
//#endregion
//#region ../node_modules/@solidjs/signals/dist/prod/map.js
function ir(e, t, n) {
	let r = typeof n?.keyed == "function" ? n.keyed : void 0, i = t.length > 1, a = t, o = {
		L: w(),
		it: 0,
		st: e,
		ot: [],
		ft: a,
		ht: [],
		tn: [],
		ze: r,
		ct: r || n?.keyed === !1 ? [] : void 0,
		lt: i && n?.keyed !== !1 ? [] : void 0,
		ut: n?.keyed === !1,
		H: n?.fallback
	}, s = K(ur.bind(o), void 0);
	return s.l &= -33, Z(s);
}
var ar = { ownedWrite: !0 };
function or(e, t, n, r) {
	let i = e.ot, a = e.it - 1, o = [], s = [], c = [], l = 256, u = r, d = r, f = !1;
	for (; u <= a && d <= n - 1;) {
		let e = i[u], r = t[d];
		if (e === r) {
			f ||= (c.push(u, d, 0), !0), c[c.length - 1]++, u++, d++;
			continue;
		}
		f = !1;
		let p = -1, m = Math.min(32 - o.length, a - u, l);
		for (let e = 1; e <= m; e++) if (i[u + e] === r) {
			p = e;
			break;
		}
		l -= p === -1 ? m : p;
		let h = -1;
		m = Math.min(32 - s.length, n - 1 - d, l);
		for (let n = 1; n <= m; n++) if (t[d + n] === e) {
			h = n;
			break;
		}
		if (l -= h === -1 ? m : h, p !== -1 && (h === -1 || p <= h)) {
			for (; p-- > 0;) o.push(u++);
			continue;
		}
		if (h !== -1) {
			for (; h-- > 0;) s.push(d++);
			continue;
		}
		if (l <= 0 || o.length === 32 || s.length === 32) return !1;
		o.push(u++), s.push(d++);
	}
	for (; u <= a; u++) {
		if (o.length === 32) return !1;
		o.push(u);
	}
	for (; d <= n - 1; d++) {
		if (s.length === 32) return !1;
		s.push(d);
	}
	return sr(e, t, n, o, s, c);
}
function sr(e, t, n, r, i, a) {
	let o = e.ot, s, c, l;
	if (i.length !== 0) for (l = Array(r.length), c = 0; c < i.length; c++) {
		let e = -1;
		for (s = 0; s < r.length; s++) if (!l[s] && o[r[s]] === t[i[c]]) {
			e = s;
			break;
		}
		if (e === -1) return !1;
		l[e] = !0, i[c] = i[c] << 6 | e;
	}
	if (r.length !== 0 || i.length !== 0) {
		let e = /* @__PURE__ */ new Set();
		for (s = 0; s < r.length; s++) e.add(o[r[s]]);
		for (c = 0; c < i.length; c++) e.add(t[i[c] >> 6]);
		for (let t = 0; t < a.length; t += 3) {
			let n = a[t];
			for (let r = 0, i = a[t + 2]; r < i; r++) if (e.has(o[n + r])) return !1;
		}
	}
	let u = e.ht, d = e.tn, f = u.slice(0, n), p = d.slice(0, n);
	for (let e = 0; e < a.length; e += 3) {
		let t = a[e], n = a[e + 1];
		if (t !== n) for (let r = 0; r < a[e + 2]; r++) f[n + r] = u[t + r], p[n + r] = d[t + r];
	}
	for (c = 0; c < i.length; c++) {
		let e = i[c] >> 6, t = r[i[c] & 63];
		f[e] = u[t], p[e] = d[t];
	}
	for (e.ht = f, e.tn = p, e.it = n, e.ot = t.slice(0), s = 0; s < r.length; s++) (l === void 0 || !l[s]) && d[r[s]].dispose();
	return !0;
}
function cr(e, t, n, r, i, a, o, s, c) {
	let l = e.ze, u = e.ot, d = e.tn, f = [], p = n;
	for (let m = n; m <= i; p++, m++) {
		let i = l ? l(t[m]) : t[m];
		for (; p <= r && (l ? l(u[p]) : u[p]) !== i;) f.push(d[p++]);
		if (p > r) return o.fill(void 0), null;
		a[m] = e.ht[p], o[m - n] = d[p], s && (s[m - n] = e.ct[p]), c && (c[m - n] = e.lt[p]);
	}
	for (; p <= r; p++) f.push(d[p]);
	return f;
}
function lr(e, t, n, r, i, a, o, s, c) {
	let l = e.tn, u = e.ct, d = e.lt, f = e.it, p = n - f, m, h;
	if (p > 0) for (l.length = n, u && (u.length = n), d && (d.length = n), m = f - 1, h = n - 1; m > i; m--, h--) l[h] = l[m], u && (u[h] = u[m]), d && (d[h] = d[m]);
	else if (p < 0) {
		for (m = i + 1, h = a + 1; m < f; m++, h++) l[h] = l[m], u && (u[h] = u[m]), d && (d[h] = d[m]);
		l.length = n, u && (u.length = n), d && (d.length = n);
	}
	for (h = r; h <= a; h++) l[h] = o[h - r], u && Y(u[h] = s[h - r], t[h]), d && Y(d[h] = c[h - r], h);
	for (h = a + 1; h < n; h++) u && Y(u[h], t[h]), d && p !== 0 && Y(d[h], h);
}
function ur() {
	this.L.Ye = C();
	let e = this.st() || [], t = e.length;
	return e[Jn], X(this.L, () => {
		let n, r, i, a, o, s = this.ct ? this.ut ? () => (a[i] = gn(e[r], ar), this.ft(Z(a[i]), r)) : () => (a[i] = gn(e[r], ar), o && (o[i] = gn(r, ar)), this.ft(Z(a[i]), o ? Z(o[i]) : void 0)) : this.lt ? () => {
			let t = e[r];
			return o[i] = gn(r, ar), this.ft(t, Z(o[i]));
		} : () => {
			let t = e[r];
			return this.ft(t);
		};
		if (t === 0) this.it !== 0 && (this.L.dispose(!1), this.tn = [], this.ot = [], this.ht = [], this.it = 0, this.ct &&= [], this.lt &&= []), this.H && !this.ht.length && (this.tn[0]?.dispose(), this.ht[0] = X(this.tn[0] = w(), this.H));
		else if (this.it === 0) {
			let c = Array(t), l = Array(t);
			a = this.ct && Array(t), o = this.lt && Array(t);
			try {
				for (r = 0; r < t; r++) i = r, c[r] = X(l[r] = w(), s);
			} catch (e) {
				for (n = 0; n <= r; n++) l[n]?.dispose();
				throw e;
			}
			this.tn[0] && this.tn[0].dispose(), this.ht = c, this.tn = l, a && (this.ct = a), o && (this.lt = o), this.ot = e.slice(0), this.it = t;
		} else {
			let c, l, u, d, f, p, m, h, g, _ = Y;
			for (c = 0, l = Math.min(this.it, t); c < l && (this.ot[c] === e[c] || this.ct && pr(this.ze, this.ot[c], e[c])); c++) this.ct && _(this.ct[c], e[c]);
			for (l = this.it - 1, u = t - 1; l >= c && u >= c && (this.ot[l] === e[u] || this.ct && pr(this.ze, this.ot[l], e[u])); l--, u--);
			if (c === t && this.it === t) {
				this.ot = e.slice(0);
				return;
			}
			if (t <= this.it && l - c > 64 && this.ct === void 0 && this.lt === void 0) {
				let n = c + (u - c >> 1), r = e[n], i = Math.min(l, n + 32), a = Math.max(c, n - 32);
				for (; a <= i && this.ot[a] !== r;) a++;
				if (a <= i && or(this, e, t, c)) return;
			}
			let ee = t - this.it, v = u - c + 1, y = Array(t), b = Array(v);
			a = this.ct ? Array(v) : void 0, o = this.lt ? Array(v) : void 0;
			let x = ee < 0 ? cr(this, e, c, l, u, y, b, a, o) : null;
			if (x !== null) x.length !== 0 && (h = x);
			else {
				for (p = /* @__PURE__ */ new Map(), m = Array(v), r = u; r >= c; r--) d = e[r], f = this.ze ? this.ze(d) : d, n = p.get(f), m[r - c] = n === void 0 ? -1 : n, p.set(f, r);
				for (n = c; n <= l; n++) d = this.ot[n], f = this.ze ? this.ze(d) : d, r = p.get(f), r !== void 0 && r !== -1 ? (y[r] = this.ht[n], b[r - c] = this.tn[n], a && (a[r - c] = this.ct[n]), o && (o[r - c] = this.lt[n]), r = m[r - c], p.set(f, r)) : (h ??= []).push(this.tn[n]);
				try {
					for (r = c; r <= u; r++) b[r - c] === void 0 && ((g ??= []).push(b[r - c] = w()), i = r - c, y[r] = X(b[r - c], s));
				} catch (e) {
					if (g) for (n = 0; n < g.length; n++) g[n].dispose();
					throw e;
				}
			}
			for (n = 0; n < c; n++) y[n] = this.ht[n];
			for (r = u + 1; r < t; r++) y[r] = this.ht[r - ee];
			if (lr(this, e, t, c, l, u, b, a, o), this.ht = y, this.it = t, this.ot = e.slice(0), h) for (n = 0; n < h.length; n++) h[n].dispose();
		}
	}), this.ht;
}
function dr(e, t, n) {
	let r = t, i = {
		L: w(),
		it: 0,
		dt: 0,
		wt: e,
		ft: r,
		tn: [],
		ht: [],
		Ot: n?.from,
		H: n?.fallback
	}, a = K(fr.bind(i));
	return a.l &= -33, Z(a);
}
function fr() {
	this.L.Ye = C();
	let e = this.wt(), t = this.Ot?.() || 0;
	return X(this.L, () => {
		if (e === 0) {
			this.it !== 0 && (this.L.dispose(!1), this.tn = [], this.ht = [], this.it = 0, this.dt = 0), this.H && !this.ht.length && (this.tn[0]?.dispose(), this.ht[0] = X(this.tn[0] = w(), this.H));
			return;
		}
		let n = t + e, r = this.dt + this.it, i = Math.max(t, this.dt), a = Math.min(n, r), o = Array(e), s = Array(e);
		for (let e = i; e < a; e++) s[e - t] = this.tn[e - this.dt], o[e - t] = this.ht[e - this.dt];
		try {
			for (let e = t; e < n; e++) e >= i && e < a || (o[e - t] = X(s[e - t] = w(), () => this.ft(e)));
		} catch (e) {
			for (let e = t; e < n; e++) (e < i || e >= a) && s[e - t] && s[e - t].dispose();
			throw e;
		}
		if (this.it === 0) this.tn[0]?.dispose();
		else for (let e = this.dt; e < r; e++) (e < t || e >= n) && this.tn[e - this.dt].dispose();
		this.ht = o, this.tn = s, this.dt = t, this.it = e;
	}), this.ht;
}
function pr(e, t, n) {
	return !e || e(t) === e(n);
}
//#endregion
//#region ../node_modules/@solidjs/signals/dist/prod/flatten.js
function mr(e, t) {
	if (typeof e == "function" && !e.length) {
		if (t?.doNotUnwrap) return e;
		do
			e = e();
		while (typeof e == "function" && !e.length);
	}
	if (!t?.skipNonRendered || e != null && e !== !0 && e !== !1 && e !== "") {
		if (Array.isArray(e)) {
			let n = [];
			return hr(e, n, t) ? () => {
				let e = [];
				return hr(n, e, {
					...t,
					doNotUnwrap: !1
				}), e;
			} : n;
		}
		return e;
	}
}
function hr(t, n = [], r) {
	let i = null, a = !1;
	for (let o = 0; o < t.length; o++) try {
		let e = t[o];
		if (typeof e == "function" && !e.length) {
			if (r?.doNotUnwrap) {
				n.push(e), a = !0;
				continue;
			}
			do
				e = e();
			while (typeof e == "function" && !e.length);
		}
		Array.isArray(e) ? a = hr(e, n, r) || a : r?.skipNonRendered && (e == null || e === !0 || e === !1 || e === "") || n.push(e);
	} catch (t) {
		if (!(t instanceof e)) throw t;
		i = t;
	}
	if (i) throw i;
	return a;
}
//#endregion
//#region ../node_modules/@solidjs/signals/dist/prod/boundaries.js
var gr = Symbol(""), _r = Symbol(""), $ = null, vr = /* @__PURE__ */ new Set(), yr = (e) => e.A[gr], br = (e) => e.i === 2 || !e.D || e.h;
function xr(e, t) {
	e.U.add(t), vr.add(e);
}
function Sr(e, t, r) {
	if (e.i === 2) {
		r ??= t.T?.F, t = r?.source ?? t;
		let i = n(r);
		Y(e.F, i), qn(i, e.L, t);
	}
	xr(e, t), e.h && Cr(e), e.H || wr(e), e.V !== null && $.P(e.V);
}
function Cr(e) {
	e.D = !1, e.v = e.B;
	let t = e.j;
	!e.v && t.l & 256 && k(t) !== D && et(t), e.v !== null && e.j !== null && _e(e.j, e.v, !0, !1);
}
function wr(e) {
	e.j !== null && !(e.j.R & 96) && (z(e.j), P());
}
function Tr(e, t, n) {
	if (t === 0) {
		if (vr.size !== 0) for (let t = yr(e); t; t = t._parent) !(e.m & Ar(t)) && t.U.delete(e) && t.U.size === 0 && (t.H && wr(t), t.V !== null && $.P(t.V));
		return !1;
	}
	for (let r = yr(e); r; r = r._parent) if (r.i & t) {
		if (br(r)) return Sr(r, e, n), !r.h || 2;
		xr(r, e);
	}
	return !1;
}
function Er(e) {
	for (let t = yr(e); t; t = t._parent) if (t.i & 1 && br(t)) return t.h;
}
function Dr(e) {
	for (let t = yr(e); t; t = t._parent) if (t.H) return t;
}
function Or(e) {
	let t = Dr(e);
	return t !== void 0 && ((t.Z ??= /* @__PURE__ */ new Set()).add(e), !0);
}
function kr(e) {
	if (e.Z !== null) {
		for (let t of e.Z) {
			let e = t.i;
			R.enqueue(e === 3 ? 2 : e, e === 3 ? t.M : t.W ??= F.K.bind(null, t));
		}
		e.Z = null;
	}
}
var Ar = (e) => e.i === 2 ? 3 : 1;
function jr(e, t) {
	let n = Ar(e);
	for (let r of e.U) if (r.R & 64) e.U.delete(r);
	else if (!(r.m & n)) {
		if ((r !== e.Y || e.h) && (r.l & 2304) == 256) {
			if (!t || !e.D) continue;
			j(k(r));
		}
		e.U.delete(r);
	}
	return e.U.size;
}
function Mr() {
	for (let e of vr) {
		let t = e.j.R;
		if (t & 64) {
			vr.delete(e);
			continue;
		}
		if (t & 32) continue;
		jr(e, !1);
		let n = e.j;
		e.h && !e.D && n.l & 256 && [...e.U].every((e) => !(e.m & 1) && e.l & 256 && k(e) === k(n)) && (e.U.clear(), e.D = !0), e.h = !1, e.U.size === 0 && (vr.delete(e), e.H && wr(e), e.V !== null && $.P(e.V));
	}
}
function Nr(e) {
	if (!e.D) {
		e.H && e.v === null && e.B === null && E !== null && (e.B = E, Cr(e), wr(e));
		return;
	}
	e.h = !0;
	let t = E;
	t === null && R.q && C().l & 32768 && (j(null), t = F.J(D)), e.B = t, vr.add(e);
	let n = e.U.size;
	$e(e.L, D, (t) => xr(e, t));
	for (let t of e.U) if (e.U.size !== n || t.m & 1 && !(t.R & 64)) {
		for (let t = e._parent; t !== null; t = t._parent) for (let n of e.U) t.U.delete(n);
		Cr(e), wr(e);
		return;
	}
}
function Pr(e) {
	for (let t of [...e.U]) t.X !== void 0 && !(t.R & 64) && G(t);
	P();
}
function Fr(t, n, r, i) {
	let a = w(), o = {
		i: t,
		_parent: yr(a) ?? null,
		L: a,
		Y: null,
		j: null,
		U: /* @__PURE__ */ new Set(),
		D: !1,
		h: !1,
		B: null,
		v: null,
		H: !1,
		Z: null,
		V: null,
		$: !1,
		ee: !1,
		F: t === 2 ? gn(void 0, Lr) : null,
		ne: r,
		re: null
	}, s = t === 1 ? a.A[_r] : null;
	if (C() && me(() => {
		vr.delete(o), s && $.te(s, o);
	}), i) {
		let t = !1;
		X(a, () => K(() => {
			try {
				i();
			} catch (t) {
				if (!(t instanceof e)) {
					if (!R.notify(C(), 2, 2, t)) throw ct(t), t;
					return;
				}
			}
			t ? Nr(o) : t = !0;
		})).l |= ee;
	}
	let c = {
		...a.A,
		[gr]: o
	};
	$ !== null && (c[_r] = null), a.A = c;
	let l = X(a, () => {
		let e = K(n);
		return K(() => mr(kn(e)));
	});
	o.Y = l, s && $.oe(s, o);
	let u = K(() => {
		if (o.$ && (zt(l, C()), o.V !== null && $.P(o.V), o.$)) {
			if (o.ee) {
				o.H = !0;
				return;
			}
			return Ir(o);
		}
		let n = l.m & 3;
		if (n !== 0) {
			if (zt(l, C()), n & t) {
				if (br(o)) return Sr(o, l, void 0), Ir(o);
				xr(o, l);
			}
			throw l.T.F;
		}
		if (br(o)) {
			let e = C();
			if (o.U.size !== 0 && e.m & 4 && !(e.l & 256) || jr(o, !0) !== 0) return Ir(o);
		}
		let r;
		try {
			r = kn(l);
		} catch (n) {
			if (n instanceof e ? t === 1 : t === 2) {
				if (br(o)) return Sr(o, l, n), Ir(o);
				xr(o, l);
			}
			throw n;
		}
		if (br(o) && o.U.size !== 0) return Ir(o);
		o.D = !0, o.H = !1;
		let i = o.re;
		if (i !== null && R.enqueue(1, () => {
			!o.H && o.re === i && (S(i), o.re = null);
		}), kr(o), o.V !== null) {
			let e = o.V;
			o.V = null, $.P(e);
		}
		return r;
	}, { le: !0 });
	return u.l |= ee, o.j = u, Z(u);
}
function Ir(e) {
	if (e.v !== null && (Ie(e.v), e.j.R |= d, e.v = null), e.H = !0, e.re === null) {
		let t = C();
		e.re = X(t._parent, () => K(() => e.ne(e), { id: t.id }));
	}
	return kn(e.re);
}
var Lr = {
	ownedWrite: !0,
	le: !0
};
function Rr(e, t) {
	return Fr(2, e, (e) => t(Z(e.F), () => Pr(e)));
}
Oe(Tr, (e, t) => !t && (e.m & 4 ? Tr(e, 1) : Er(e)), Dr, Mr, Or);
//#endregion
//#region ../node_modules/solid-js/dist/solid.js
var zr = !1;
function Br(e, t) {
	let n = Symbol(t && t.name || "");
	function r(e) {
		return ge(() => (zn(r, e.value), Hr(() => e.children)));
	}
	return r.id = n, r.defaultValue = e, r;
}
function Vr(e) {
	return Rn(e);
}
function Hr(e) {
	let t = Q(e, { lazy: !0 }), n = Q(() => mr(t()), {
		lazy: !0,
		sync: !0
	});
	return n.toArray = () => {
		let e = n();
		return Array.isArray(e) ? e : e == null ? [] : [e];
	}, n;
}
var Ur = {
	hydrating: !1,
	registry: void 0,
	done: !1
}, Wr = (...e) => Q(...e), Gr = (...e) => er(...e), Kr = (...e) => Rr(...e), qr = (...e) => ge(...e), Jr = (...e) => nr(...e), Yr = (...e) => tr(...e);
function Xr(e, t, n, r) {
	return J(() => e(t || {}));
}
var Zr = /*#__PURE__*/ Symbol.for("solid.component-binding"), Qr = /*#__PURE__*/ Symbol("solid.dynamic-flight");
function $r(e) {
	return e?.[Zr] || void 0;
}
function ei(e, t, n) {
	if (t?.static) return ti(J(e), n);
	let r = /* @__PURE__ */ new Set(), i, a = (e, t) => {
		let n = $r(e);
		if (!n) return e;
		i = n.address;
		let a = $r(t);
		if (a && a.component === n.component) {
			for (let e of r) e(n.address);
			return t;
		}
		return e;
	}, o = (e, t) => {
		if (e === t) return !0;
		let n = $r(e), a = $r(t);
		if (!n || !a || n.component !== a.component) return !1;
		if (n.address === a.address) return !0;
		if (i === void 0) return !1;
		if (a.address !== i) {
			i = a.address;
			for (let e of r) e(a.address);
		}
		return !0;
	}, s = Wr((t) => {
		let n = e();
		return !n || typeof n.then != "function" ? a(n, t) : { [Qr]: n };
	}, {
		lazy: !0,
		equals: o
	});
	return (e) => {
		if (Ur.hydrating) try {
			J(s);
		} catch {}
		let t = 0, c = Wr((e) => {
			let n = s();
			if (!n || !n[Qr]) return a(n, e);
			let r = n[Qr], i = ++t;
			return { then: (n, o) => r.then((r) => {
				let o = i === t ? a(r, e) : r;
				return n ? n(o) : o;
			}, o) };
		}, { equals: o });
		return Wr(() => {
			let t = c();
			switch (typeof t) {
				case "function": {
					let n = $r(t);
					if (n) {
						let [t, a] = Gr(i ??= n.address, { ownedWrite: !0 });
						return r.add(a), $n(() => r.delete(a)), J(() => n.component(e, t));
					}
					return J(() => t(e));
				}
				case "string": return n ? n(t, e) : void 0;
			}
		});
	};
}
function ti(e, t) {
	if (typeof e == "function") {
		let t = $r(e);
		if (t) {
			let e = () => t.address;
			return (n) => J(() => t.component(n, e));
		}
		return (t) => J(() => e(t));
	}
	return typeof e == "string" && t ? (n) => t(e, n) : () => void 0;
}
var ni = (e) => `Stale read from <${e}>.`;
function ri(e) {
	let t = "fallback" in e ? {
		keyed: e.keyed,
		fallback: () => e.fallback
	} : { keyed: e.keyed }, n = C(), r, i = () => X(n, () => ir(() => e.each, e.children, t));
	return Ur.hydrating && (r = i()), () => (r ??= i())();
}
function ii(e) {
	let t = "fallback" in e ? { fallback: () => e.fallback } : {};
	return t.from = () => e.from, dr(() => e.count, (t) => typeof e.children == "function" ? e.children(t) : e.children, t);
}
function ai(e) {
	let t = e.keyed, n = Q(() => e.when, void 0), r = t ? n : Q(n, {
		equals: (e, t) => !e == !t,
		sync: !0
	}), i = !1;
	return Q(() => {
		let a = r();
		if (i = a, a) {
			let r = e.children;
			return typeof r == "function" && r.length > 0 ? J(t ? () => r(a) : () => r(() => {
				if (!i) throw ni("Show");
				return n();
			}), zr) : r;
		}
		return e.fallback;
	}, { sync: !0 });
}
function oi(e) {
	let t = Hr(() => e.children), n = Q(() => {
		let e = t.toArray(), n = () => void 0;
		for (let t = 0; t < e.length; t++) {
			let r = t, i = e[t];
			if (i == null) continue;
			let a = n, o = Q(() => a() ? void 0 : i.when, void 0), s = i.keyed ? o : Q(o, {
				equals: (e, t) => !e == !t,
				sync: !0
			});
			n = () => {
				let e = a();
				if (e) return e;
				let t = s();
				return t ? [
					r,
					t,
					o,
					i
				] : void 0;
			};
		}
		return n;
	}, { sync: !0 });
	return Q(() => {
		let t = n()();
		if (!t) return e.fallback;
		let [r, i, a, o] = t, s = o.children;
		return typeof s == "function" && s.length > 0 ? o.keyed ? J(() => s(i), zr) : J(() => s(() => {
			if (J(n)()?.[0] !== r) throw ni("Match");
			return a();
		}), zr) : s;
	}, { sync: !0 });
}
function si(e) {
	return e;
}
function ci(e) {
	return Kr(() => e.children, (t, n) => {
		let r = e.fallback;
		return typeof r == "function" ? r(t, n) : r;
	});
}
//#endregion
export { pe as A, Yn as C, st as D, J as E, b as M, bt as O, Zn as S, X as T, mr as _, ai as a, rr as b, Br as c, Jr as d, qr as f, Vr as g, Ur as h, ii as i, C as j, w as k, Yr as l, ei as m, ri as n, oi as o, Gr as p, si as r, Xr as s, ci as t, Wr as u, Q as v, Qn as w, Xn as x, $n as y };
