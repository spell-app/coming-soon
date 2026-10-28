import { n as e, r as t } from "./rolldown-runtime-CYGlBXrH.js";
import { Errored as n, Show as r, createEffect as i, createMemo as a, createRenderEffect as o, createRoot as s, createSignal as c, getObserver as l, getOwner as u, onSettled as d, runWithOwner as f, untrack as p } from "solid-js";
import { DelegatedEvents as ee, Dynamic as te, addEvent as ne, className as re, createComponent as m, delegateEvents as ie, effect as ae, getDelegatedRoot as oe, getOwner as se, insert as ce, isServer as h, memo as g, readShallow as le, registerDelegatedContainer as ue, setAttribute as de, ssr as fe, template as pe, unregisterDelegatedRoot as me } from "@solidjs/web";
//#region ../src/util/class.ts
function hasOwnProp(e, t) {
	return e != null && Object.hasOwn(e, t);
}
function getSuperHierarchy(e, t = Object) {
	if (typeof e?.constructor != "function") return;
	let n = [], r = e;
	for (; (r = Object.getPrototypeOf(r)) && (typeof r.constructor == "function" && n.push(r.constructor), r.constructor !== t););
	return n;
}
function hasDescriptor(e, t, n) {
	for (; e;) {
		let r = Object.getOwnPropertyDescriptor(e, t);
		if (r && (!n || n === "get" && r.get || n === "set" && r.set)) return r;
		e = e.__proto__;
	}
	return !1;
}
//#endregion
//#region ../src/util/decorators.ts
function proto(e, t) {
	if (!t.static) throw TypeError(`@proto ${String(t.name)}: only works on 'static' fields.`);
	return function(e) {
		return Object.defineProperty(this.prototype, t.name, {
			value: e,
			writable: !0,
			configurable: !0
		}), this.protoDefined?.(t.name, e), e;
	};
}
function protoMerged(e, t) {
	if (!t.static) throw TypeError(`@protoMerged ${String(t.name)}: only works on 'static' fields;  make it 'static'.`);
	return function(e) {
		let n = Object.getPrototypeOf(this.prototype)?.[t.name];
		return n && Object.setPrototypeOf(e, n), Object.defineProperty(this.prototype, t.name, {
			value: e,
			writable: !0,
			configurable: !0
		}), this.protoDefined?.(t.name, e), e;
	};
}
function lazy(e, t) {
	if (t.kind !== "getter") throw TypeError(`@lazy ${String(t.name)}: only works on getters;  make it a 'get'.`);
	return function() {
		return remembered(this, t.name, () => e.call(this));
	};
}
function once(e, t) {
	if (t.kind !== "method") throw TypeError(`@once ${String(t.name)}: only works on methods.`);
	return function() {
		return remembered(this, t.name, () => e.call(this));
	};
}
function resets(...e) {
	return function(t, n) {
		return { set(n) {
			for (let t of e) forget(this, t);
			t.set.call(this, n);
		} };
	};
}
function forget(e, t) {
	he.get(e)?.delete(t);
}
function remembered(e, t, n) {
	let r = he.get(e);
	if (r?.has(t)) return r.get(t);
	let i = n();
	return r || he.set(e, r = /* @__PURE__ */ new Map()), r.set(t, i), i;
}
var he = /* @__PURE__ */ new WeakMap(), _ = {
	element: 1,
	text: 3,
	documentFragment: 11
}, ge = 4;
function byDocumentOrder(e, t) {
	return e.compareDocumentPosition(t) & ge ? -1 : 1;
}
function isBrowser() {
	return typeof window < "u" && typeof document < "u" && typeof customElements < "u";
}
async function nextFrame(e = 1) {
	let t = performance.now();
	for (let n = e; n > 0; n--) t = await new Promise((e) => requestAnimationFrame(e));
	return t;
}
async function copyText(e) {
	try {
		return await navigator.clipboard.writeText(e), !0;
	} catch {
		try {
			let t = document.createElement("textarea");
			t.value = e, t.setAttribute("readonly", ""), t.style.cssText = "position: fixed; opacity: 0; pointer-events: none", document.body.append(t), t.select();
			let n = document.execCommand("copy");
			return t.remove(), n;
		} catch {
			return !1;
		}
	}
}
function whenDefined(e) {
	return customElements.whenDefined(e);
}
function closestAcrossShadow(e, t) {
	for (let n = e; n; n = flatParentFor(n)) if (n.matches(t)) return n;
	return null;
}
function flatParentFor(e) {
	if (e.assignedSlot) return e.assignedSlot;
	if (e.parentElement) return e.parentElement;
	let t = e.getRootNode();
	return t.nodeType === _.documentFragment && t.host ? t.host : void 0;
}
var _e = .8, ve = "(prefers-reduced-motion: reduce)";
function scrollEnds(e) {
	return {
		start: e.scrollLeft > 1,
		end: e.scrollLeft + e.clientWidth < e.scrollWidth - 1
	};
}
function scrollByRow(e, t) {
	let n = !!e.ownerDocument.defaultView?.matchMedia(ve).matches;
	e.scrollBy({
		left: t * e.clientWidth * _e,
		behavior: n ? "instant" : "smooth"
	});
}
//#endregion
//#region ../src/util/string.ts
function kebabCase(e) {
	return ye[e] ??= e.replace(/\p{Lu}/gu, (e) => `-${e.toLowerCase()}`);
}
var ye = Object.create(null);
function camelCase(e) {
	return be[e] ??= e.replace(/-([\p{Ll}\d])/gu, (e, t) => t.toUpperCase());
}
var be = Object.create(null);
function numberToWord(e) {
	let t = typeof e == "number" ? e : /^\d+$/.test(e.trim()) ? Number(e) : NaN;
	return Number.isInteger(t) ? xe[t - 1] : void 0;
}
var xe = [
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"ten",
	"eleven",
	"twelve",
	"thirteen",
	"fourteen",
	"fifteen",
	"sixteen"
];
function levenshtein(e, t) {
	if (e === t) return 0;
	if (!e.length) return t.length;
	if (!t.length) return e.length;
	let n = Array.from({ length: t.length + 1 }, (e, t) => t), r = Array(t.length + 1);
	for (let i = 1; i <= e.length; i++) {
		r[0] = i;
		for (let a = 1; a <= t.length; a++) {
			let o = e[i - 1] === t[a - 1] ? 0 : 1;
			r[a] = Math.min(n[a] + 1, r[a - 1] + 1, n[a - 1] + o);
		}
		[n, r] = [r, n];
	}
	return n[t.length];
}
function suggest(e, t, n = 2) {
	let r = e.toLowerCase(), i, a = n + 1;
	for (let e of t) {
		let t = levenshtein(r, e.toLowerCase());
		t < a && (i = e, a = t);
	}
	return i;
}
function slug(e, { as: t = "id", fallback: n = "" } = {}) {
	return (t === "github" ? e.trim().toLowerCase().replace(/[^\p{L}\p{M}\p{N}\p{Pc}\- ]/gu, "").replace(/ /g, "-") : withoutAccents(e.normalize("NFKD")).toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")) || n;
}
function withoutAccents(e, { keep: t = "" } = {}) {
	let n = t.normalize("NFC").toLowerCase();
	return e.normalize("NFC").replace(/\P{ASCII}/gu, (e) => n.includes(e.toLowerCase()) ? e : e.normalize("NFD").replace(/\p{M}+/gu, ""));
}
function escapeRegExp(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function escapeHTML(e) {
	return e.replace(/[&<>"']/g, (e) => Se[e]);
}
var Se = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};
function dedent(e) {
	let t = e.split("\n");
	for (; t.length && !t[0].trim();) t.shift();
	for (; t.length && !t.at(-1).trim();) t.pop();
	let n = t.filter((e) => e.trim()).map((e) => /^[ \t]*/.exec(e)[0].length), r = n.length ? Math.min(...n) : 0;
	return t.map((e) => e.slice(r)).join("\n");
}
function indented(e, t) {
	let n = typeof t == "number" ? " ".repeat(t) : t;
	return e.split("\n").map((e) => e.trim() ? `${n}${e}` : e).join("\n");
}
//#endregion
//#region ../src/util/timing.ts
function afterSolidUpdate(e) {
	queueMicrotask(e);
}
function beforeNextPaint(e) {
	let t = requestAnimationFrame(e);
	return () => cancelAnimationFrame(t);
}
function soon(e) {
	let t = setTimeout(e, 0);
	return () => clearTimeout(t);
}
function after(e, t) {
	let cancel = () => {}, n = new Promise((r, i) => {
		let a = setTimeout(() => {
			cancel = () => {};
			try {
				r(t?.());
			} catch (e) {
				i(e);
			}
		}, e * 1e3);
		cancel = () => {
			cancel = () => {}, clearTimeout(a), n.catch(() => {}), i(new DOMException("after():  canceled", "AbortError"));
		};
	});
	return Object.assign(n, { cancel: () => cancel() });
}
function every(e, t) {
	let n = setInterval(t, e * 1e3);
	return () => clearInterval(n);
}
var Queued = class {
	when;
	run;
	dropPending;
	constructor({ when: e, run: t }) {
		this.when = e, this.run = t;
	}
	get isPending() {
		return this.dropPending !== void 0;
	}
	ask() {
		if (this.dropPending) return;
		let e = !1, t = this.when(() => {
			e || (this.dropPending = void 0, this.run());
		});
		this.dropPending = () => {
			e = !0, t && t();
		};
	}
	cancel() {
		this.dropPending?.(), this.dropPending = void 0;
	}
};
async function waitUntil(e, { timeout: t, every: n = .1 }) {
	let r = Date.now() + t * 1e3;
	for (;;) {
		let t = await e();
		if (t) return t;
		let i = r - Date.now();
		if (i <= 0) return;
		await after(Math.min(n, i / 1e3));
	}
}
async function within(e, t) {
	let n = after(t);
	try {
		return await Promise.race([e, n.then(() => void 0, () => void 0)]);
	} finally {
		n.cancel();
	}
}
//#endregion
//#region ../src/element/vocabulary.types.ts
var Ce = [
	"name",
	"content",
	"appearance",
	"layout",
	"states",
	"form",
	"link",
	"behaviour",
	"advanced"
], v = "none", we = {
	role: "role",
	busy: "ariaBusy",
	checked: "ariaChecked",
	colSpan: "ariaColSpan",
	current: "ariaCurrent",
	disabled: "ariaDisabled",
	hidden: "ariaHidden",
	label: "ariaLabel",
	level: "ariaLevel",
	live: "ariaLive",
	roleDescription: "ariaRoleDescription",
	selected: "ariaSelected",
	valueMin: "ariaValueMin"
}, Te = "ui-error", Ee = "errored", y = class SpellSolid {
	static install(e) {
		SpellSolid.installed = e;
		for (let e of SpellSolid.waiting.splice(0)) e();
	}
	static whenInstalled(e) {
		if (SpellSolid.installed) {
			e();
			return;
		}
		SpellSolid.waiting.push(e), !(SpellSolid.waiting.length > 1) && after(De, () => {
			SpellSolid.waiting.length && console.warn(`[spell/element] SpellSolid:  ${SpellSolid.waiting.length} element(s) wait to be defined, and no settings are installed;  load a component set's runtime (Spell UI's \`spell/ui/core\`)`);
		});
	}
	static get settings() {
		if (SpellSolid.installed) return SpellSolid.installed;
		throw Error("SpellSolid.settings:  no settings installed;  a component set's runtime installs them as it loads (Spell UI's, as `spell/ui/core` loads):  import it before defining an element");
	}
	static get isInstalled() {
		return SpellSolid.installed !== void 0;
	}
	static installed;
	static waiting = [];
}, De = 5, b = class Reactive {
	static ownRoot(e) {
		return f(Le, () => s(e));
	}
	static recordOf(e) {
		return e[Oe] ??= {
			values: {},
			sources: /* @__PURE__ */ new Map(),
			caches: /* @__PURE__ */ new Map()
		};
	}
	static accessorsOf(e) {
		let t = Reactive.recordOf(e);
		return t.accessors ??= new Proxy({}, { get: (t, n) => t[n] ??= () => e[n] });
	}
	static installAttributeGetters(e, t) {
		if (!Reactive.withGetters.has(e)) {
			Reactive.withGetters.add(e);
			for (let { key: n, name: r } of t) n in e || Object.defineProperty(e, n, {
				get() {
					return Reactive.attributeValue(this, n);
				},
				set(e) {
					this.domElement[this.elementDefinition.attribute(r).property] = e;
				},
				configurable: !0
			});
		}
	}
	static attributeValue(e, t) {
		if (x || l()) {
			let n = Reactive.recordOf(e), r = n.sources.get(Fe + t);
			r || (n.sources.set(Fe + t, r = new AttributeSource(e, t)), watchAttributeValues(n, e)), reading(r);
		}
		return attributeValueNow(e, t);
	}
	static attributesOf(e, t, n = sameName) {
		let r = Reactive.recordOf(e);
		return r.attributes ??= new Proxy({}, { get: (e, i) => {
			if (typeof i != "string") return;
			let a = n(i);
			return (x || l()) && reading(rawAttributeSource(r, t, a)), t.getAttribute(a);
		} });
	}
	static startEffects(e) {
		let t = e;
		for (let n of Reactive.listFor(e, je)) {
			let { method: e, members: r, writesDOMElement: o, defer: s, whileConnected: c } = n, compute = () => r.map((e) => t[e]), apply = (n) => {
				if (c && !n[0]) return;
				let call = () => t[e](...c ? [] : n), r = p(call);
				return typeof r == "function" ? r : void 0;
			};
			h ? o && !s && apply(p(compute)) : i(a(compute, { equals: isSameList }), apply, { defer: s });
		}
		if (Reactive.startAriaEffect(e, t), !h) for (let { method: n, options: r } of Reactive.listFor(e, Me)) {
			let call = (e) => t[n](e);
			watchContent(e, r, call);
		}
	}
	static startAriaEffect(e, t) {
		let n = Reactive.listFor(e, Ae, { claims: (e) => e.property });
		if (!n.length) return;
		let compute = () => n.map(({ member: e }) => ariaText(t[e])), apply = (t) => {
			let r = e.domElement.internals;
			n.forEach(({ property: e }, n) => r[e] = t[n]);
		};
		h ? apply(p(compute)) : i(a(compute, { equals: isSameList }), apply);
	}
	static cssStatesOf(e, t = []) {
		let n = Reactive.listFor(e, ke, { claims: (e) => e.state });
		if (!t.length) return n;
		let r = new Set(n.map(({ state: e }) => e)), i = t.filter((e) => !r.has(e));
		return [...n, ...i.map((e) => ({
			member: camelCase(e),
			state: e
		}))];
	}
	static listenersOf(e) {
		return Reactive.listFor(e, Ne, { combine: baseFirstOnce });
	}
	static isControlled(e, t) {
		return !!Reactive.recordOf(e).controlled?.[t];
	}
	static isControlledByPage(e, t) {
		let { key: n } = Reactive.controlledAttribute(e, t);
		return p(() => attributeValueNow(e, n)) !== void 0;
	}
	static requestChange(e, t, n, r) {
		let { key: i } = Reactive.controlledAttribute(e, t), a = watchPropertyWrites(Reactive.recordOf(e), e), o = a[i] ?? 0;
		return !r() || (a[i] ?? 0) !== o ? !1 : (e[t] = n, !0);
	}
	static controlledAttribute(e, t) {
		let n = Reactive.recordOf(e).controlled?.[t];
		if (!n) throw TypeError(`Reactive:  \`${t}\` isn't a @controlled member;  declare it @controlled("<attribute>")`);
		return e.elementDefinition.attribute(n);
	}
	static listFor(e, t, { combine: n = ownFirst, claims: r } = {}) {
		let i = e.constructor[Pe];
		if (!i) return [];
		let a = Reactive.lists.get(i);
		a || Reactive.lists.set(i, a = /* @__PURE__ */ new Map());
		let o = a.get(t);
		if (!o) {
			let e = [];
			for (let n = i; n; n = Object.getPrototypeOf(n)) Object.hasOwn(n, t) && e.push(n[t]);
			if (o = n(e), r) {
				let e = /* @__PURE__ */ new Set();
				o = o.filter((t) => {
					let n = r(t);
					return !e.has(n) && (e.add(n), !0);
				});
			}
			a.set(t, o);
		}
		return o;
	}
	static lists = /* @__PURE__ */ new WeakMap();
	static withGetters = /* @__PURE__ */ new WeakSet();
};
function state(e, t) {
	if (!t) {
		let t = e;
		return ((e, n) => stateAccessor(n, t));
	}
	return stateAccessor(t, {});
}
function controlled(e) {
	return function(t, n) {
		let r = n.name;
		return {
			get() {
				let { key: t } = this.elementDefinition.attribute(e), n = b.attributeValue(this, t);
				return n === void 0 ? b.recordOf(this).values[r] : n;
			},
			set(t) {
				let { property: n } = this.elementDefinition.attribute(e);
				this.domElement[n] = t;
			},
			init(t) {
				let n = b.recordOf(this);
				return n.values[r] = t, (n.controlled ??= {})[r] = e, this.domElement && watchPropertyWrites(n, this), t;
			}
		};
	};
}
function watchPropertyWrites(e, t) {
	if (e.propertyWrites) return e.propertyWrites;
	let n = e.propertyWrites = {};
	return t.domElement.addPropertyChangedCallback((e) => {
		n[e] = (n[e] ?? 0) + 1;
	}), n;
}
function derived(e, t) {
	if (!t) {
		let { equals: t } = e;
		return ((e, n) => derivedGetter(e, n.name, t));
	}
	return derivedGetter(e, t.name);
}
function derivedGetter(e, t, n = isSame) {
	return function() {
		let r = b.recordOf(this), i = r.caches.get(t);
		return i || r.caches.set(t, i = new DerivedCache(() => e.call(this), n)), i.read();
	};
}
function cssState(e) {
	return function(t, n) {
		ownList(n.metadata, ke).push({
			member: n.name,
			state: e
		});
	};
}
function aria(e) {
	return function(t, n) {
		ownList(n.metadata, Ae).push({
			member: n.name,
			property: we[e]
		});
	};
}
function ariaText(e) {
	return e === !0 ? "true" : e === !1 || e == null ? null : String(e);
}
function onChange(...e) {
	let t = typeof e[e.length - 1] == "object" ? e.pop() : {};
	return function(n, r) {
		ownList(r.metadata, je).push({
			method: r.name,
			members: e,
			writesDOMElement: !!t.writesDOMElement,
			defer: !!t.defer
		});
	};
}
function whileConnected(e, t) {
	ownList(t.metadata, je).push({
		method: t.name,
		members: ["isConnected"],
		writesDOMElement: !1,
		whileConnected: !0
	});
}
function watches(e) {
	function decorate(t, n) {
		if (n.kind === "method") {
			ownList(n.metadata, Me).push({
				method: n.name,
				options: e
			});
			return;
		}
		let r = n.name, { equals: i = isSame } = e;
		return function() {
			let n = b.recordOf(this), a = n.caches.get(r);
			if (!a) {
				let o = a = new ContentCache(() => t.call(this), i);
				n.caches.set(r, o), h || watchContent(this, e, () => o.contentChanged());
			}
			return a.read();
		};
	}
	return decorate;
}
function on(e, t = {}) {
	return function(n, r) {
		if (r.kind !== "method" || r.static) throw TypeError(`@on ${String(r.name)}:  only works on instance methods;  make it a method`);
		ownList(r.metadata, Ne).push({
			method: r.name,
			type: e,
			options: t
		});
	};
}
function untracked(e, t) {
	let n = String(t.name);
	if (t.kind === "method" || t.kind === "getter") return untrackedCall(e);
	if (t.kind !== "field" || t.static) throw TypeError(`@untracked ${n}:  only works on methods, getters and arrow-function fields;  untrack() its reads`);
	return (e) => {
		if (typeof e != "function") throw TypeError(`@untracked ${n}:  the field holds no function;  untrack() its reads instead`);
		return untrackedCall(e);
	};
}
function untrackedCall(e) {
	return function(...t) {
		return p(() => e.apply(this, t));
	};
}
var Notifier = class {
	version = 0;
	signal;
	ownedWrite;
	constructor(e) {
		this.ownedWrite = e;
	}
	track() {
		l() && (this.signal ??= c(void 0, {
			equals: !1,
			ownedWrite: this.ownedWrite
		}))[0]();
	}
	changed() {
		this.version++, this.tell();
	}
	tell() {
		let e = this.signal;
		e && notify(() => e[1]());
	}
}, AttributeSource = class extends Notifier {
	component;
	key;
	last;
	constructor(e, t) {
		super(!0), this.component = e, this.key = t, this.last = attributeValueNow(e, t);
	}
	refresh() {
		this.hasMoved();
	}
	written() {
		this.hasMoved() && this.tell();
	}
	hasMoved() {
		let e = attributeValueNow(this.component, this.key);
		return e !== this.last && (this.last = e, this.version++, !0);
	}
}, RawAttributeSource = class extends Notifier {
	domElement;
	name;
	startWatching;
	last;
	constructor(e, t, n) {
		super(!1), this.domElement = e, this.name = t, this.startWatching = n, this.last = e.getAttribute(t);
	}
	refresh() {
		let e = this.domElement.getAttribute(this.name);
		e !== this.last && (this.last = e, this.changed());
	}
	track() {
		l() && (this.startWatching(), super.track());
	}
}, DerivedCache = class {
	version = 0;
	value;
	isComputed = !1;
	dependencies = /* @__PURE__ */ new Map();
	compute;
	equals;
	constructor(e, t) {
		this.compute = e, this.equals = t;
	}
	read() {
		return this.refresh(), x?.set(this, this.version), l() && this.track(), this.value;
	}
	refresh() {
		if (this.isComputed && !this.isStale()) return;
		let e = x, t = /* @__PURE__ */ new Map();
		x = t;
		let n;
		try {
			n = this.compute();
		} finally {
			x = e;
		}
		this.dependencies = t, (!this.isComputed || !this.equals(this.value, n)) && (this.value = n, this.version++), this.isComputed = !0;
	}
	track() {
		for (let e of this.dependencies.keys()) e.track();
	}
	isStale() {
		for (let [e, t] of this.dependencies) if (e.refresh?.(), e.version !== t) return !0;
		return !1;
	}
}, ContentCache = class extends DerivedCache {
	content;
	changes = new Notifier(!1);
	constructor(e, t) {
		let n = {
			version: 0,
			track: () => void 0
		};
		super(() => (reading(n), e()), t), this.content = n;
	}
	track() {
		super.track(), this.changes.track();
	}
	contentChanged() {
		this.content.version++;
		let e = this.version;
		this.refresh(), this.version !== e && this.changes.changed();
	}
}, x;
function reading(e) {
	e.refresh?.(), x?.set(e, e.version), e.track();
}
function notify(e) {
	if (!u()) return e();
	try {
		e();
	} catch {
		afterSolidUpdate(e);
	}
}
function stateAccessor(e, { equals: t = isSame, ownedWrite: n = !1 }) {
	let r = e.name, i = t === !1 ? isNever : t;
	return {
		get() {
			let e = b.recordOf(this);
			return (x || l()) && reading(notifierFor(e, r, n)), e.values[r];
		},
		set(e) {
			let t = b.recordOf(this);
			i(t.values[r], e) || (t.values[r] = e, t.sources.get(r)?.changed());
		},
		init(e) {
			return b.recordOf(this).values[r] = e, e;
		}
	};
}
function notifierFor(e, t, n) {
	let r = e.sources.get(t);
	return r || e.sources.set(t, r = new Notifier(n)), r;
}
function rawAttributeSource(e, t, n) {
	let r = Ie + n, i = e.sources.get(r);
	return i || e.sources.set(r, i = new RawAttributeSource(t, n, () => watchAttributes(e, t))), i;
}
function watchAttributes(e, t) {
	if (h || e.attributeObserver) return;
	let n = e.attributeObserver = new MutationObserver((t) => {
		for (let { attributeName: n } of t) e.sources.get(Ie + n)?.refresh();
	});
	n.observe(t, { attributes: !0 }), t.addReleaseCallback?.(() => n.disconnect());
}
function watchAttributeValues(e, t) {
	e.isWatchingValues || (e.isWatchingValues = !0, t.domElement.addPropertyChangedCallback((t) => {
		e.sources.get(Fe + t)?.written();
	}));
}
function watchContent(e, t, n) {
	let r = b.recordOf(e), { domElement: i } = e, a = r.content;
	if (!a) {
		let e = [], t = new MutationObserver((t) => {
			for (let n of e) {
				let e = t.filter((e) => isWatched(n.options, e, i));
				e.length && n.changed(e);
			}
		});
		a = r.content = {
			observer: t,
			watches: e
		}, i.addReleaseCallback?.(() => t.disconnect());
	}
	a.watches.push({
		options: t,
		changed: n
	}), a.observer.observe(i, observedUnion(a.watches));
}
function isWatched(e, t, n) {
	if (!e.subtree && t.target !== n) return !1;
	if (t.type === "childList") return !!e.childList;
	if (t.type === "characterData") return !!e.characterData;
	let { attributeFilter: r } = e;
	return r ? r.includes(t.attributeName) : !!e.attributes;
}
function observedUnion(e) {
	let t = e.map((e) => e.options), n = {
		childList: t.some((e) => e.childList),
		subtree: t.some((e) => e.subtree),
		characterData: t.some((e) => e.characterData)
	}, r = t.filter((e) => e.attributes || e.attributeFilter);
	return r.length ? r.some((e) => !e.attributeFilter) ? {
		...n,
		attributes: !0
	} : {
		...n,
		attributeFilter: [...new Set(r.flatMap((e) => e.attributeFilter))]
	} : n;
}
function attributeValueNow(e, t) {
	return e.domElement.attributeValues[t];
}
function ownList(e, t) {
	let n = e;
	return Object.hasOwn(n, t) || (n[t] = []), n[t];
}
function ownFirst(e) {
	return e.flat();
}
function baseFirstOnce(e) {
	let t = /* @__PURE__ */ new Set();
	return e.toReversed().flat().filter(({ method: e, type: n, options: r }) => {
		let i = `${String(e)} ${n} ${r.target ?? ""}`;
		return !t.has(i) && (t.add(i), !0);
	});
}
function isSame(e, t) {
	return e === t;
}
function sameName(e) {
	return e;
}
function isNever() {
	return !1;
}
function isSameList(e, t) {
	return e.length === t.length && e.every((e, n) => e === t[n]);
}
var Oe = Symbol("reactive"), ke = Symbol("cssStates"), Ae = Symbol("aria"), je = Symbol("onChange"), Me = Symbol("contentMethods"), Ne = Symbol("listeners"), Pe = Symbol.metadata ?? Symbol.for("Symbol.metadata"), Fe = "attribute:", Ie = "raw:", Le = s(() => u()), Cell = class {
	get;
	set;
	constructor(e, t) {
		let [n, r] = c(e, t);
		this.get = n, this.set = (e) => void r(e);
	}
}, Re = class ElementDefinition {
	vocabulary;
	localized;
	tag;
	builder;
	attributes;
	byName = /* @__PURE__ */ new Map();
	byAttribute = /* @__PURE__ */ new Map();
	words = y.settings.words;
	names = this.words.names();
	constructor(e, { tag: t, dictionary: n } = {}) {
		this.vocabulary = e;
		let r = t ? t.slice(0, t.indexOf("-")) : void 0;
		this.names.register(e);
		let i = this.names.define(r, n).get(e.tag);
		this.localized = i, this.tag = t ?? (n ? i.tag : e.tag), this.builder = this.words.classes(e), this.attributes = this.words.attributesFor(e).map((e) => {
			let t = i.names.attributes.get(e.name) ?? e.name, n = camelCase(e.name), r = {
				spec: e,
				attribute: t,
				key: n,
				property: t === e.name ? e.property ?? n : camelCase(t),
				reflect: e.kind !== "json" && e.reflect !== !1
			};
			return this.byName.set(e.name, r), this.byAttribute.set(t, r), r;
		});
	}
	attribute(e) {
		let t = this.byName.get(e);
		if (!t) throw TypeError(`ElementDefinition.attribute():  <${this.tag}> has no attribute ${JSON.stringify(e)};  pass a canonical name from its vocabulary`);
		return t;
	}
	takesAttribute(e) {
		return this.byName.has(e);
	}
	takesShared(e) {
		return this.words.takesShared(this.vocabulary, e);
	}
	attributeNamed(e) {
		return this.byAttribute.get(e);
	}
	localAttribute(e) {
		return this.byName.get(e)?.attribute ?? e;
	}
	event(e) {
		return this.localized.names.events.get(e) ?? e;
	}
	slot(e) {
		return this.localized.names.slots.get(e) ?? e;
	}
	part(e) {
		let t = this.localized.names.parts.get(e) ?? e;
		return t === e ? e : `${e} ${t}`;
	}
	classInput(e) {
		let t = {};
		for (let { spec: n } of this.attributes) Object.defineProperty(t, n.name, {
			get: () => e(n.name),
			enumerable: !0
		});
		return t;
	}
	convert(e, t) {
		let { spec: n } = e, r = this.canonicalValue(e, t ?? n.default), i = {
			attribute: e.attribute,
			tag: this.tag
		};
		switch (n.kind) {
			case "keyOnly":
			case "boolean": return this.words.converters.boolean(r, e.attribute);
			case "keyOrValueAndKey": return this.words.converters.keyOrValue(r, this.words.valuesFor(n), i);
			case "size":
			case "color":
			case "valueOnly":
			case "enum":
			case "valueAndKey":
			case "textAlign":
			case "verticalAlign": {
				let e = this.words.valuesFor(n);
				return r == null || r === "" ? void 0 : e ? this.words.converters.enumValue(ElementDefinition.text(r), e, i) : ElementDefinition.text(r);
			}
			case "number": return this.words.converters.number(r);
			case "json": return this.words.converters.json(r);
			case "icon": return this.words.converters.icon(r, n.default);
			case "width":
			case "multiple": return r == null || r === "" ? void 0 : r;
			default: return r == null ? void 0 : Array.isArray(r) ? r : ElementDefinition.text(r);
		}
	}
	startingValue(e) {
		let t = this.convert(e, void 0);
		return Array.isArray(t) ? t.slice() : t && typeof t == "object" ? { ...t } : t;
	}
	visibleInMarkup(e, t) {
		if (e("hidden") !== null) return !1;
		let n = this.byName.get(ze), r = n && e(n.attribute);
		return n && r != null ? this.convert(n, r) === !0 : t === "shown";
	}
	canonicalValue(e, t) {
		return typeof t != "string" || !this.localized.values.has(e.spec.name) ? t : this.names.canonicalize(this.localized.tag, e.attribute, t)?.value ?? t;
	}
	attributeText(e, t) {
		let { spec: n } = e;
		if (n.kind === "keyOnly" || n.kind === "boolean") {
			let e = this.words.converters.boolean(t);
			return !e && n.default === !0 ? "false" : this.words.converters.booleanToAttribute(e);
		}
		if (n.kind === "icon" && t == null && typeof n.default == "string") return "false";
		if (t == null || t === !1) return null;
		if (t === !0) return "";
		if (Array.isArray(t) && t.every((e) => ElementDefinition.isPrimitive(e))) return t.join(",");
		let r = ElementDefinition.text(t);
		return this.localized.names.values.get(n.name)?.get(r) ?? r;
	}
	static text(e) {
		return typeof e == "string" ? e : ElementDefinition.isPrimitive(e) ? String(e) : JSON.stringify(e);
	}
	static isPrimitive(e) {
		return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
	}
}, ze = "visible", S = class RichAttributes {
	static isRich(e) {
		return typeof e == "function" || typeof e == "object" && !!e;
	}
	static apply(e, t, n, r) {
		if (t.startsWith(Be)) return RichAttributes.listen(e, t, n, r);
		e[RichAttributes.propertyFor(t, r)] = n, (Ue.get(e) ?? Ue.set(e, /* @__PURE__ */ new Set()).get(e)).add(t);
	}
	static clear(e, t, n) {
		C.get(e)?.delete(t);
		let r = He.get(e)?.get(t);
		r && (e.removeEventListener(r.type, r.listener), He.get(e).delete(t)), Ue.get(e)?.delete(t) && (e[RichAttributes.propertyFor(t, n)] = void 0);
	}
	static replay(e, t) {
		let n = C.get(e);
		if (n) {
			C.delete(e);
			for (let [r, i] of n) RichAttributes.apply(e, r, i, t);
		}
	}
	static isScriptApi(e, t, n, r) {
		if (!r || r.attributeNamed(t)) return !1;
		let i = camelCase(t), a = Object.getPrototypeOf(Object.getPrototypeOf(e));
		for (; a && a !== n.prototype;) {
			if (Object.getOwnPropertyDescriptor(a, i)?.set) return !0;
			a = Object.getPrototypeOf(a);
		}
		return !1;
	}
	static readScriptApiAttributes(e, t, n) {
		for (let { name: r, value: i } of [...e.attributes]) RichAttributes.isScriptApi(e, r, t, n) && RichAttributes.apply(e, r, i, n);
	}
	static installPatch() {
		let e = globalThis.Element;
		if (!e || We) return;
		let t = e.prototype, { setAttribute: n, removeAttribute: r } = t;
		We = {
			setAttribute: n,
			removeAttribute: r
		}, t.setAttribute = function(e, t) {
			if (RichAttributes.isRich(t) && isUndefinedTag(this) && !RichAttributes.isPure()) {
				(C.get(this) ?? C.set(this, /* @__PURE__ */ new Map()).get(this)).set(e, t);
				return;
			}
			n.call(this, e, t);
		}, t.removeAttribute = function(e) {
			C.get(this)?.delete(e), r.call(this, e);
		};
	}
	static isPure() {
		return !We || !globalThis.document?.querySelector(Ve) ? !1 : (Object.assign(globalThis.Element.prototype, We), We = void 0, !0);
	}
	static listen(e, t, n, r) {
		let i = t.slice(Be.length), a = r?.event(i) ?? i;
		RichAttributes.clear(e, t, r), e.addEventListener(a, n), (He.get(e) ?? He.set(e, /* @__PURE__ */ new Map()).get(e)).set(t, {
			type: a,
			listener: n
		});
	}
	static propertyFor(e, t) {
		return t?.attributeNamed(e)?.property ?? camelCase(e);
	}
};
function isUndefinedTag(e) {
	return e.localName.includes("-") && !customElements.get(e.localName);
}
var Be = "on-", Ve = "ui-root[pure]", C = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakMap(), We;
S.installPatch();
//#endregion
//#region ../src/element/DOMElement.ts
var Ge = globalThis.HTMLElement ?? class {}, w = class DOMElement extends Ge {
	component;
	internals;
	attributeValues = {};
	ready;
	connectedState;
	constructor() {
		super();
		let e = this.connectedState = {
			isMounted: !1,
			releaseCallbacks: [],
			propertyChangedCallbacks: [],
			resolveReady: () => void 0
		};
		this.ready = new Promise((t) => e.resolveReady = t), this.internals = this.attachInternals();
		let t = this.tagSetup?.elementDefinition;
		if (t) {
			for (let e of t.attributes) this.attributeValues[e.key] = t.startingValue(e);
			this.visibleAttribute && (this.attributeValues[qe] = this.isVisibleInMarkup), this.captureUpgradeValues(t);
		} else Xe.get(this.constructor)?.pending.add(this), DOMElement.isPending(this) && this.setState(Je, !0);
		this.addEventListener("click", (e) => this.swallowClickWhileDisabled(e), { capture: !0 }), DOMElement.hotReloadHooks?.created(this);
	}
	connectedCallback() {
		if (DOMElement.isPending(this)) return;
		this.settleVisible(), this.restoreUpgradeValues(), S.replay(this, this.tagSetup?.elementDefinition);
		let { connectedState: e } = this;
		e.isMounted || (e.isMounted = !0, S.readScriptApiAttributes(this, DOMElement, this.tagSetup?.elementDefinition), this.tagSetup?.mountComponent(this), this.handOverEarlyFormState()), this.component?.onConnect();
	}
	disconnectedCallback() {
		this.component?.onDisconnect();
	}
	dispose() {
		let { connectedState: e } = this;
		if (!e.isMounted) return;
		e.isMounted = !1, e.propertyChangedCallbacks.length = 0;
		let t;
		for (; t = e.releaseCallbacks.pop();) t(this);
	}
	addReleaseCallback(e) {
		this.connectedState.releaseCallbacks.push(e);
	}
	attributeChangedCallback(e, t, n) {
		let r = this.tagSetup?.elementDefinition, { connectedState: i } = this;
		if (i.reflecting === e) return;
		let a = this.visibleAttribute, o = r?.attributeNamed(e);
		if (a && e === "hidden" && !o) return this.onHiddenAttributeChanged(n);
		if (o && !i.upgradeValues?.has(o.property)) {
			if (o === a) return this.onVisibleAttributeChanged(n);
			this.setValue(o, r.convert(o, n), "attribute");
		}
	}
	setAttribute(e, t) {
		let n = this.tagSetup?.elementDefinition;
		if (S.isRich(t) || S.isScriptApi(this, e, DOMElement, n)) return S.apply(this, e, t, n);
		super.setAttribute(e, t);
	}
	removeAttribute(e) {
		S.clear(this, e, this.tagSetup?.elementDefinition), super.removeAttribute(e);
	}
	addPropertyChangedCallback(e) {
		this.connectedState.propertyChangedCallbacks.push(e);
	}
	valueNamed(e) {
		return this.attributeValues[this.tagSetup.elementDefinition.attribute(e).key];
	}
	setValueNamed(e, t) {
		let { elementDefinition: n } = this.tagSetup, r = n.attribute(e);
		this.setValue(r, n.convert(r, t), "property");
	}
	setValue(e, t, n) {
		if (n === "property" && e === this.visibleAttribute) return this.writeVisible(t === !0);
		n === "property" && e.reflect && this.reflectAttribute(e, t), this.storeValue(e, t, n);
	}
	storeValue(e, t, n) {
		let r = this.attributeValues[e.key];
		this.attributeValues[e.key] = t, DOMElement.hotReloadHooks?.valueSet(this, e.key, n);
		for (let i of this.connectedState.propertyChangedCallbacks.slice()) i(e.key, t, r, n);
	}
	reflectAttribute(e, t) {
		this.writeAttribute(e.attribute, this.tagSetup.elementDefinition.attributeText(e, t));
	}
	writeAttribute(e, t) {
		if (this.getAttribute(e) === t) return;
		let { connectedState: n } = this, r = n.reflecting;
		n.reflecting = e;
		try {
			t === null ? this.removeAttribute(e) : this.setAttribute(e, t);
		} finally {
			n.reflecting = r;
		}
	}
	get visibleAttribute() {
		let e = this.tagSetup?.elementDefinition;
		return e?.takesShared(qe) ? e.attribute(qe) : void 0;
	}
	get isVisibleInMarkup() {
		return this.tagSetup.elementDefinition.visibleInMarkup((e) => this.getAttribute(e), this.tagSetup.visible);
	}
	settleVisible() {
		let { connectedState: e } = this, t = this.visibleAttribute;
		!e.isVisibleSettled && t && (e.isVisibleSettled = !0, this.writeVisible(this.isVisibleInMarkup, "attribute"));
	}
	writeVisible(e, t = "property") {
		let { connectedState: n } = this, r = this.visibleAttribute;
		n.isVisibleSettled = !0, e ? this.writeAttribute("hidden", null) : this.hasAttribute("hidden") || this.writeAttribute("hidden", "");
		let i = this.getAttribute(r.attribute), a = i !== null && this.tagSetup.elementDefinition.convert(r, i) === !0;
		i !== null && a !== e && this.writeAttribute(r.attribute, e ? "" : "false"), this.storeValue(r, e, t);
	}
	onHiddenAttributeChanged(e) {
		if (!this.connectedState.isVisibleSettled) return this.storeValue(this.visibleAttribute, this.isVisibleInMarkup, "attribute");
		this.writeVisible(e === null, "attribute");
	}
	onVisibleAttributeChanged(e) {
		let t = this.visibleAttribute;
		if (!this.connectedState.isVisibleSettled) return this.storeValue(t, this.isVisibleInMarkup, "attribute");
		if (e === null) return this.writeVisible(this.isVisibleInMarkup, "attribute");
		this.writeVisible(this.tagSetup.elementDefinition.convert(t, e) === !0, "attribute");
	}
	captureUpgradeValues(e) {
		let t = this;
		for (let n of e.attributes) {
			if (!Object.hasOwn(this, n.property)) continue;
			let r = t[n.property];
			delete t[n.property], (this.connectedState.upgradeValues ??= /* @__PURE__ */ new Map()).set(n.property, r), this.attributeValues[n.key] = e.convert(n, r);
		}
	}
	restoreUpgradeValues() {
		let e = this.connectedState.upgradeValues;
		if (e) {
			this.connectedState.upgradeValues = void 0;
			for (let [t, n] of e) this[t] = n;
		}
	}
	get renderRoot() {
		let { connectedState: e } = this;
		if (e.root) return e.root;
		let t = this.shadowRoot ?? this.internals.shadowRoot;
		return t ? (e.hasServerContent = t.childNodes.length > 0, e.root = t) : e.root = this.attachShadow(this.tagSetup.shadowRootInit);
	}
	clearServerContent() {
		let e = this.renderRoot;
		this.connectedState.hasServerContent && (this.connectedState.hasServerContent = !1, e.replaceChildren());
	}
	formAssociatedCallback(e) {
		this.component ? this.component.onFormAssociated(e) : (this.connectedState.earlyForm ??= {}).form = e;
	}
	formDisabledCallback(e) {
		this.component ? this.component.onFormDisabled(e) : (this.connectedState.earlyForm ??= {}).disabled = e;
	}
	formResetCallback() {
		this.component?.onFormReset();
	}
	formStateRestoreCallback(e, t) {
		this.component?.onFormStateRestore(e, t);
	}
	handOverEarlyFormState() {
		let e = this.connectedState.earlyForm, { component: t } = this;
		e && t && (this.connectedState.earlyForm = void 0, e.form !== void 0 && t.onFormAssociated(e.form), e.disabled !== void 0 && t.onFormDisabled(e.disabled));
	}
	setState(e, t) {
		t ? this.internals.states.add(e) : this.internals.states.delete(e);
	}
	markReady() {
		(this.tagSetup?.elementDefinition.vocabulary.states)?.some(({ name: e }) => e === Ye) || this.setState(Ye, !0), this.connectedState.resolveReady();
	}
	swallowClickWhileDisabled(e) {
		this.component?.isDisabled && (e.preventDefault(), e.stopImmediatePropagation());
	}
	get tagSetup() {
		return this.constructor.tagSetup;
	}
	static get observedAttributes() {
		let e = this.tagSetup?.elementDefinition;
		return e ? DOMElement.observedAttributesFor(e) : [];
	}
	static observedAttributesFor(e) {
		let t = e.attributes.map(({ attribute: e }) => e);
		return e.takesShared(qe) && !t.includes("hidden") ? [...t, "hidden"] : t;
	}
	static subclassForTag(e, t) {
		let n = className$1(t.elementDefinition.tag), r = { [n]: class extends e {} }[n];
		return r.tagSetup = t, Object.defineProperty(r, "formAssociated", { value: t.isAFormControl }), DOMElement.defineProperties(r), r;
	}
	static defineProperties(e) {
		let { elementDefinition: t } = e.tagSetup, n = e.prototype, r = t.attributes.filter(({ key: e, property: t }) => t === e).map(({ property: e }) => e).filter((e) => e in n || Ke.includes(e));
		if (r.length) throw TypeError(`<${t.tag}>:  ${r.map((e) => JSON.stringify(e)).join(", ")} would hide the element's own member${r.length === 1 ? "" : "s"};  rename the attribute's property in its vocabulary (\`property: "..."\`)`);
		for (let e of t.attributes) Object.defineProperty(n, e.property, {
			get() {
				return this.attributeValues[e.key];
			},
			set(t) {
				this.setValue(e, this.tagSetup.elementDefinition.convert(e, t), "property");
			},
			enumerable: !0,
			configurable: !0
		});
	}
	static removeProperties(e) {
		for (let { property: t } of e.tagSetup.elementDefinition.attributes) delete e.prototype[t];
	}
	static defineEarly(e, t) {
		if (customElements.get(e)) return;
		let n = className$1(e), r = { [n]: class extends DOMElement {} }[n], resolve = () => {}, i = new Promise((e) => resolve = e);
		return Xe.set(r, {
			...t,
			tag: e,
			pending: /* @__PURE__ */ new Set(),
			isAttached: !1,
			attached: i,
			resolve
		}), Object.defineProperty(r, "formAssociated", { value: t.isAFormControl }), Object.defineProperty(r, "observedAttributes", { value: [...t.attributes] }), customElements.define(e, r), r;
	}
	static isEarly(e) {
		let t = e && Xe.get(e);
		return !!t && !t.isAttached;
	}
	static attach(e, t, n) {
		let r = Xe.get(e), i = DOMElement.observedAttributesFor(n.elementDefinition).filter((e) => !r.attributes.includes(e));
		if (n.isAFormControl !== r.isAFormControl || i.length) throw TypeError(`<${r.tag}>:  its root's catalog is stale (${i.length ? `no ${i.join(", ")}` : "form control"});  regenerate it (Spell UI's \`yarn gen:root\`, a pack's \`spell-pack build\`)`);
		t !== DOMElement && (Object.setPrototypeOf(e, t), Object.setPrototypeOf(e.prototype, t.prototype)), e.tagSetup = n, DOMElement.defineProperties(e), r.isAttached = !0;
		for (let e of r.pending) e.attachPending();
		r.pending.clear(), r.resolve();
	}
	static isPending(e) {
		return DOMElement.isEarly(e.constructor);
	}
	static isAttached(e) {
		let t = customElements.get(e);
		return !!t && !DOMElement.isEarly(t);
	}
	static async whenAttached(e) {
		let t = await customElements.whenDefined(e);
		await Xe.get(t)?.attached;
	}
	static notAttached = ":is(:not(:defined), :state(pending))";
	attachPending() {
		let e = this.tagSetup.elementDefinition;
		for (let t of e.attributes) this.attributeValues[t.key] = e.startingValue(t);
		this.visibleAttribute && (this.attributeValues[qe] = this.isVisibleInMarkup), this.captureUpgradeValues(e);
		for (let t of DOMElement.observedAttributesFor(e)) {
			let e = this.getAttribute(t);
			e !== null && this.attributeChangedCallback(t, null, e);
		}
		this.setState(Je, !1), this.isConnected && this.connectedCallback();
	}
	static hotReloadHooks;
};
function className$1(e) {
	return e.replace(/(^|-)(\w)/g, (e, t, n) => n.toUpperCase()).replace(/\W/g, "");
}
t(className$1, "className");
var Ke = [
	"internals",
	"attributeValues",
	"component",
	"ready",
	"connectedState"
], qe = "visible", Je = "pending", Ye = "ready", Xe = /* @__PURE__ */ new WeakMap(), Ze = class OwnerContext {
	static find(e, t, n = {}) {
		let r = 0;
		for (let i = flatParentFor(e); i; i = flatParentFor(i)) {
			let e = i.localName, a = OwnerContext.nounFor(i, t);
			if (a) return {
				owner: i,
				ownerNoun: a,
				depth: r
			};
			if (n.barrier?.(i)) return;
			e.includes("-") && r++;
		}
	}
	static stateName(e) {
		return `in-${e}`;
	}
	static nounFor(e, t) {
		let n = e.localName;
		if (t instanceof Map) return t.get(n);
		if (t instanceof Set) return t.has(n) ? OwnerContext.stem(n) : void 0;
		let r = t(n, e);
		return typeof r == "string" ? r || void 0 : r ? OwnerContext.stem(n) : void 0;
	}
	static stem(e) {
		return e.slice(e.indexOf("-") + 1);
	}
}, Qe = Object.create, $e = Object.defineProperty, et = Object.getOwnPropertyDescriptor, __knownSymbol = (e, t) => (t = Symbol[e]) ? t : /* @__PURE__ */ Symbol.for("Symbol." + e), __typeError = (e) => {
	throw TypeError(e);
}, __defNormalProp = (e, t, n) => t in e ? $e(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, __name = (e, t) => $e(e, "name", {
	value: t,
	configurable: !0
}), __decoratorStart = (e) => [
	,
	,
	,
	Qe(e?.[__knownSymbol("metadata")] ?? null)
], tt = [
	"class",
	"method",
	"getter",
	"setter",
	"accessor",
	"field",
	"value",
	"get",
	"set"
], __expectFn = (e) => e !== void 0 && typeof e != "function" ? __typeError("Function expected") : e, __decoratorContext = (e, t, n, r, i) => ({
	kind: tt[e],
	name: t,
	metadata: r,
	addInitializer: (e) => n._ ? __typeError("Already initialized") : i.push(__expectFn(e || null))
}), __decoratorMetadata = (e, t) => __defNormalProp(t, __knownSymbol("metadata"), e[3]), __runInitializers = (e, t, n, r) => {
	for (var i = 0, a = e[t >> 1], o = a && a.length; i < o; i++) t & 1 ? a[i].call(n) : r = a[i].call(n, r);
	return r;
}, __decorateElement = (e, t, n, r, i, a) => {
	var o, s, c, l, u, d = t & 7, f = !!(t & 8), p = !!(t & 16), ee = d > 3 ? e.length + 1 : d ? f ? 1 : 2 : 0, te = tt[d + 5], ne = d > 3 && (e[ee - 1] = []), re = e[ee] || (e[ee] = []), m = d && (!p && !f && (i = i.prototype), d < 5 && (d > 3 || !p) && et(d < 4 ? i : {
		get [n]() {
			return __privateGet(this, a);
		},
		set [n](e) {
			return __privateSet(this, a, e);
		}
	}, n));
	d ? p && d < 4 && __name(a, (d > 2 ? "set " : d > 1 ? "get " : "") + n) : __name(i, n);
	for (var ie = r.length - 1; ie >= 0; ie--) l = __decoratorContext(d, n, c = {}, e[3], re), d && (l.static = f, l.private = p, u = l.access = { has: p ? (e) => __privateIn(i, e) : (e) => n in e }, d ^ 3 && (u.get = p ? (e) => (d ^ 1 ? __privateGet : __privateMethod)(e, i, d ^ 4 ? a : m.get) : (e) => e[n]), d > 2 && (u.set = p ? (e, t) => __privateSet(e, i, t, d ^ 4 ? a : m.set) : (e, t) => e[n] = t)), s = (0, r[ie])(d ? d < 4 ? p ? a : m[te] : d > 4 ? void 0 : {
		get: m.get,
		set: m.set
	} : i, l), c._ = 1, d ^ 4 || s === void 0 ? __expectFn(s) && (d > 4 ? ne.unshift(s) : d ? p ? a = s : m[te] = s : i = s) : typeof s != "object" || !s ? __typeError("Object expected") : (__expectFn(o = s.get) && (m.get = o), __expectFn(o = s.set) && (m.set = o), __expectFn(o = s.init) && ne.unshift(o));
	return d || __decoratorMetadata(e, i), m && $e(i, n, m), p ? d ^ 4 ? a : m : i;
}, __publicField = (e, t, n) => __defNormalProp(e, typeof t == "symbol" ? t : t + "", n), __accessCheck = (e, t, n) => t.has(e) || __typeError("Cannot " + n), __privateIn = (e, t) => Object(t) === t ? e.has(t) : __typeError("Cannot use the \"in\" operator on this value"), __privateGet = (e, t, n) => (__accessCheck(e, t, "read from private field"), n ? n.call(e) : t.get(e)), __privateAdd = (e, t, n) => t.has(e) ? __typeError("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), __privateSet = (e, t, n, r) => (__accessCheck(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), __privateMethod = (e, t, n) => (__accessCheck(e, t, "access private method"), n), nt, rt, T, it;
function isSameOwner(e, t) {
	return e?.owner === t?.owner && e?.ownerNoun === t?.ownerNoun && e?.depth === t?.depth;
}
__name(isSameOwner, "isSameOwner"), rt = [state({ equals: isSameOwner })], nt = [onChange("ownerNoun", { writesDOMElement: !0 })];
var E = class _PartContext {
	constructor({ domElement: e, noun: t, isDirect: n = !1, barrier: r = _PartContext.isBarrier }) {
		__runInitializers(T, 5, this), __privateAdd(this, it, __runInitializers(T, 8, this)), __runInitializers(T, 11, this), __publicField(this, "domElement"), __publicField(this, "noun"), __publicField(this, "isDirect"), __publicField(this, "barrier"), __publicField(this, "hasConnected", !1), this.domElement = e, this.noun = t, this.isDirect = n, this.barrier = r, this.owner = this.resolve(), _PartContext.contexts.set(e, this), b.startEffects(this), d(() => (this.refresh(), () => {
			_PartContext.contexts.get(e) === this && _PartContext.contexts.delete(e);
		}));
	}
	get ownerNoun() {
		return this.owner?.ownerNoun;
	}
	onOwnerChanged(e) {
		if (!e) return;
		let t = Ze.stateName(e);
		return this.domElement.setState(t, !0), () => this.domElement.setState(t, !1);
	}
	ownerComponent() {
		return _PartContext.componentFor(this.owner);
	}
	refresh() {
		this.update();
		for (let e of this.domElement.querySelectorAll("*")) _PartContext.contexts.get(e)?.update();
	}
	resolve() {
		if (!this.isDirect) return _PartContext.ownerFor(this.domElement, this.noun, this.barrier);
		let e = this.domElement.getRootNode();
		return _PartContext.ownerFor(this.domElement, this.noun, (t) => t.localName !== "slot" && t.getRootNode() === e);
	}
	update() {
		this.owner = this.resolve();
	}
	static define({ vocabulary: e, tag: t, isAPart: n, isConditionalOwner: r = !1 }) {
		_PartContext.definedTags.add(t), n && _PartContext.partTags.add(t), r && _PartContext.conditionalTags.add(t);
		for (let n of e.ownsParts ?? []) {
			let r = _PartContext.owners.get(n);
			r || _PartContext.owners.set(n, r = /* @__PURE__ */ new Map()), r.set(t, e.noun);
		}
	}
	static ownerFor(e, t, n = _PartContext.isBarrier) {
		let r = _PartContext.owners.get(t);
		if (r?.size) return p(() => Ze.find(e, _PartContext.lookupFor(t, r), { barrier: n }));
	}
	static componentFor(e) {
		return e?.owner?.component;
	}
	static isBarrier(e) {
		return _PartContext.definedTags.has(e.localName) && !_PartContext.partTags.has(e.localName);
	}
	static noBarrier(e) {
		return !1;
	}
	static slotChanged(e) {
		let t = e.assignedElements({ flatten: !0 }), n = _PartContext.lastAssigned.get(e) ?? [];
		_PartContext.lastAssigned.set(e, t);
		for (let e of /* @__PURE__ */ new Set([...n, ...t])) {
			let t = _PartContext.contexts.get(e);
			if (t) t.refresh();
			else for (let t of e.querySelectorAll("*")) _PartContext.contexts.get(t)?.refresh();
		}
	}
	static connected(e) {
		let t = _PartContext.contexts.get(e);
		t && (t.hasConnected ? afterSolidUpdate(() => t.refresh()) : t.hasConnected = !0);
	}
	static reset() {
		_PartContext.owners.clear(), _PartContext.definedTags.clear(), _PartContext.partTags.clear(), _PartContext.conditionalTags.clear(), _PartContext.contexts = /* @__PURE__ */ new WeakMap(), _PartContext.lastAssigned = /* @__PURE__ */ new WeakMap();
	}
	static lookupFor(e, t) {
		return _PartContext.conditionalTags.size ? (n, r) => {
			let i = t.get(n);
			return !i || !_PartContext.conditionalTags.has(n) || r.component?.isOwnerOf?.(e) ? i : void 0;
		} : t;
	}
};
T = __decoratorStart(null), it = /* @__PURE__ */ new WeakMap(), __decorateElement(T, 4, "owner", rt, E, it), __decorateElement(T, 1, "onOwnerChanged", nt, E), __decoratorMetadata(T, E), __name(E, "PartContext"), __publicField(E, "owners", /* @__PURE__ */ new Map()), __publicField(E, "definedTags", /* @__PURE__ */ new Set()), __publicField(E, "partTags", /* @__PURE__ */ new Set()), __publicField(E, "conditionalTags", /* @__PURE__ */ new Set()), __publicField(E, "contexts", /* @__PURE__ */ new WeakMap()), __publicField(E, "lastAssigned", /* @__PURE__ */ new WeakMap());
var D = E, at = class ShadowEvents {
	static register(e) {
		ct.has(e) || ShadowEvents.bridge(e);
		let t = ue(e, e);
		t && (t.roots = (t.roots ?? 0) + 1, lt.set(e, t));
	}
	static unregister(e) {
		me(e);
	}
	static bridge(e) {
		ct.add(e);
		let t = e.addEventListener, n = e.removeEventListener, r = /* @__PURE__ */ new WeakMap(), i = e instanceof ShadowRoot;
		Object.defineProperties(e, {
			addEventListener: {
				configurable: !0,
				value(n, i, a) {
					if (typeof i != "function" || a !== void 0 || !ee.has(n)) return t.call(e, n, i, a);
					let o = r.get(i);
					return o || r.set(i, o = wrap(i)), t.call(e, n, o);
				}
			},
			removeEventListener: {
				configurable: !0,
				value(t, i, a) {
					let o = a === void 0 ? r.get(i) : void 0;
					return n.call(e, t, o ?? i, a);
				}
			}
		});
		function wrap(t) {
			return function(n) {
				if (lt.get(e)?.handlers.get(n.type) !== t) return t.call(this, n);
				i && ShadowEvents.before(n, e);
				try {
					t.call(this, n);
				} finally {
					ShadowEvents.after(n, e);
				}
			};
		}
	}
	static before(e, t) {
		let n = e[ot];
		if (!n || n === !0) return;
		let r = ut.get(e), i = r?.marker === n ? r.node : n;
		if (i !== r?.node && t.contains(i)) return;
		let a = e.composedPath(), o = a.indexOf(i);
		if (o < 0) return;
		let s = a.slice(o + 1);
		delete e[ot], Object.defineProperty(e, "composedPath", {
			configurable: !0,
			value() {
				return ShadowEvents.unwalk(e, "composedPath"), s;
			}
		});
	}
	static after(e, t) {
		if (ShadowEvents.unwalk(e, "target", "currentTarget", "composedPath"), !(t instanceof ShadowRoot) || e[ot] !== t || e.cancelBubble) return;
		let n = t.host, r = !t.contains(e.target), i = t;
		n[`${st}${e.type}`] !== void 0 && !ShadowEvents.bridgeWalksNext(e, t, n) && (ShadowEvents.runHandler(e, n), i = n);
		let a = i === n && r ? ShadowEvents.parentOf(n) ?? !0 : n;
		e[ot] = a, ut.set(e, {
			node: i,
			marker: a
		});
	}
	static bridgeWalksNext(e, t, n) {
		let r = e.composedPath(), i = r.indexOf(t) + 1, a = r.findIndex((e, t) => t > i && ct.has(e));
		if (a < 0) return !1;
		let o = ShadowEvents.parentOf(n), s = o ? oe(o) : void 0, c = s ? r.indexOf(s) : -1;
		return c < 0 || a <= c;
	}
	static runHandler(e, t) {
		let n = `${st}${e.type}`, r = t[n];
		if (!r || t.disabled) return;
		let i = t[`${n}Data`];
		Object.defineProperty(e, "target", {
			configurable: !0,
			value: t
		}), Object.defineProperty(e, "currentTarget", {
			configurable: !0,
			value: t
		});
		try {
			i === void 0 ? typeof r == "function" ? r.call(t, e) : r.handleEvent(e) : r.call(t, i, e);
		} finally {
			ShadowEvents.unwalk(e, "target", "currentTarget");
		}
	}
	static unwalk(e, ...t) {
		for (let n of t) delete e[n];
	}
	static parentOf(e) {
		return e._$host ?? e.parentNode ?? e.host ?? null;
	}
}, ot = "_$SOLID_EVENT_OWNER", st = "_$$", ct = /* @__PURE__ */ new WeakSet(), lt = /* @__PURE__ */ new WeakMap(), ut = /* @__PURE__ */ new WeakMap(), dt, ft, pt, mt, ht, gt, _t, vt, yt, bt, xt, St, Ct, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt = [protoMerged], O, Nt, Pt, Ft, It, Lt;
jt = [cssState("linked")], At = [onChange("sharedFontSize", { writesDOMElement: !0 })], kt = [onChange("sharedTooltip", "sharedLabel", { writesDOMElement: !0 })], Ot = [on("click")], Dt = [state], Et = [state], Tt = [onChange("isReady")], wt = [untracked], Ct = [cssState("disabled")], St = [state], xt = [cssState("loading")], bt = [cssState("busy")], yt = [cssState("dimmed")], vt = [onChange("hasInertContent", "isDisabled", "showsLoader", "isReady", { writesDOMElement: !0 })], _t = [controlled("visible")], gt = [cssState("hidden")], ht = [cssState("hiding"), state], mt = [untracked], pt = [cssState("still")], ft = [onChange("isVisible", "isReady")], dt = [on("slotchange", { target: "renderRoot" })];
var k = class _UIComponent {
	constructor(e, t) {
		__runInitializers(O, 5, this), __publicField(this, "elementDefinition"), __publicField(this, "domElement"), __publicField(this, "appContext"), __privateAdd(this, Nt, __runInitializers(O, 8, this, !1)), __runInitializers(O, 11, this), __privateAdd(this, Pt, __runInitializers(O, 12, this, !1)), __runInitializers(O, 15, this), __privateAdd(this, Ft, __runInitializers(O, 16, this, !1)), __runInitializers(O, 19, this), __privateAdd(this, It, __runInitializers(O, 20, this, !0)), __runInitializers(O, 23, this), __privateAdd(this, Lt, __runInitializers(O, 24, this, !1)), __runInitializers(O, 27, this), __publicField(this, "internalState"), this.domElement = e, this.elementDefinition = t, e.component = this, this.appContext = h ? null : _UIComponent.appContextFor(e), this.internalState = { classInput: t.classInput((e) => this.classValue(e)) }, this.isConnected = h || e.isConnected;
		for (let [t, n] of Object.entries(this.elementSetup.aria)) e.internals[we[t]] = n;
		let { runtime: n } = y.settings;
		this.isReady = h || n.isLoaded, !h && (this.startListeners(), this.isReady || n.load().then(() => this.onRuntimeLoaded()));
	}
	partForName(e) {
		return this.elementDefinition.part(e);
	}
	slotForName(e) {
		return this.elementDefinition.slot(e);
	}
	translationForKey(e, t) {
		return y.settings.words.text(e, t, this.vocabulary.tag);
	}
	onMount() {
		!h && p(() => this.isReady) && this.adoptStyleSheets();
		let e = b.cssStatesOf(this, this.elementSetup.cssStates);
		o(() => {
			let t = {
				...this.fontStates,
				...this.cssStates()
			};
			for (let { member: n, state: r } of e) t[r] = !!this[n];
			return t;
		}, (e) => {
			for (let [t, n] of Object.entries(e)) this.domElement.setState(t, !!n);
		}), b.startEffects(this), this.followParent(), this.followHostLayout(), i(() => this.styleSheetNames.join(" "), (e) => {
			p(() => this.isReady) && y.settings.styles.adoptInto(this.domElement.renderRoot, e ? e.split(" ") : []);
		}, { defer: !0 });
		let { canRenderUnstyled: t } = this.elementSetup, n = this;
		return m(r, {
			get when() {
				return t || n.isReady;
			},
			get children() {
				return p(() => n.render());
			}
		});
	}
	onConnect() {
		let { domElement: e } = this;
		afterSolidUpdate(() => this.isConnected = e.isConnected), D.connected(e);
	}
	onRuntimeLoaded() {
		this.adoptStyleSheets(), this.isReady = !0;
	}
	onFormAssociated(e) {}
	onFormDisabled(e) {
		u() ? afterSolidUpdate(() => this.formIsDisabled = e) : this.formIsDisabled = e;
	}
	onFormReset() {}
	onFormStateRestore(e, t) {}
	onDisconnect() {
		let { domElement: e } = this;
		afterSolidUpdate(() => this.isConnected = e.isConnected);
	}
	get sharedLink() {
		return this.sharedText(Bt);
	}
	get sharedTarget() {
		return this.sharedText(Vt);
	}
	get linkTo() {
		let e = b.attributeValue(this, Bt);
		return typeof e == "string" && e !== "" && !this.isMarkedDisabled ? e : void 0;
	}
	get linkTarget() {
		if (!this.linkTo) return;
		let e = b.attributeValue(this, Vt);
		return typeof e == "string" && e !== "" ? e : void 0;
	}
	get fontStates() {
		if (!this.elementDefinition.takesShared(Ht)) return {};
		let e = new Set((this.sharedText(Ht) ?? "").split(/\s+/)), { values: t } = this.elementDefinition.attribute(Ht).spec, n = Array.isArray(t) ? t : [...e].filter((e) => !Ut.test(e));
		return {
			...Object.fromEntries(n.filter(Boolean).map((t) => [`${Ht}-${t}`, e.has(t)])),
			[Wt]: this.sharedFontSize !== void 0
		};
	}
	get sharedFontSize() {
		return this.sharedText(Ht)?.split(/\s+/).find((e) => Ut.test(e));
	}
	onFontSizeChanged(e) {
		let { style: t } = this.domElement, [, n, r] = e?.match(Ut) ?? [];
		n ? t.setProperty(Gt, `${n}px`) : this.internalState.wroteFontSize && t.removeProperty(Gt), n && r ? t.setProperty(Kt, String(Number(r) / Number(n))) : this.internalState.wroteFontSize && t.removeProperty(Kt), this.internalState.wroteFontSize = !!n;
	}
	get sharedTooltip() {
		return this.sharedText(qt);
	}
	get sharedLabel() {
		return this.sharedText(Jt);
	}
	onSharedWordsChanged(e, t) {
		let { domElement: n, internalState: r } = this;
		e === void 0 ? r.wroteTitle && n.removeAttribute("title") : n.setAttribute("title", e), r.wroteTitle = e !== void 0, this.elementDefinition.takesShared(Jt) && (n.internals.ariaLabel = t ?? null);
	}
	onSharedLinkClick(e) {
		let t = this.sharedLink;
		!t || this.elementSetup.link !== "click" || this.isDisabled || e.defaultPrevented || OwnControls.isClicked(e, { upTo: this.domElement }) || this.followLink(t, this.sharedTarget);
	}
	followLink(e, t) {
		t && t !== "_self" ? window.open(e, t) : window.location.assign(e);
	}
	sharedText(e) {
		if (!this.elementDefinition.takesShared(e)) return;
		let t = b.attributeValue(this, e);
		return typeof t == "string" && t !== "" ? t : void 0;
	}
	followParent() {
		let { domElement: e, elementDefinition: t } = this;
		if (h || !t.takesAttribute(Yt)) return;
		let n = new mn({
			domElement: e,
			attribute: t.localAttribute(Yt)
		}), r = a(() => this.isConnected ? b.attributeValue(this, Yt) : void 0);
		i(r, (e) => n.follow(e));
	}
	get hostLayout() {}
	followHostLayout() {
		if (h || !_UIComponent.overrides(this, "hostLayout")) return;
		let e = this.domElement.renderRoot, t, n = a(() => this.hostLayout ?? "");
		i(n, (n) => {
			(n || t) && (t || (t = new CSSStyleSheet(), e.adoptedStyleSheets = [...e.adoptedStyleSheets, t]), t.replaceSync(n ? `:host { ${n} }` : ""));
		});
	}
	static overrides(e, t) {
		for (let n = Object.getPrototypeOf(e); n && n !== _UIComponent.prototype; n = Object.getPrototypeOf(n)) if (Object.hasOwn(n, t)) return !0;
		return !1;
	}
	static appContextFor(e) {
		let t = e.parentNode;
		for (; t;) {
			let { localName: e } = t;
			if (e && _UIComponent.isRootTag(e)) return t.appContext ?? null;
			t = t.parentNode ?? (t.nodeType === 11 ? t.host : null);
		}
		return null;
	}
	static isRootTag(e) {
		return e === zt || _UIComponent.rootTags.has(e);
	}
	get attributes() {
		let { elementDefinition: e } = this;
		return b.attributesOf(this, this.domElement, (t) => e.localAttribute(t));
	}
	get $() {
		return b.accessorsOf(this);
	}
	onReadyChanged(e) {
		e && afterSolidUpdate(() => this.domElement.markReady());
	}
	get styleSheetNames() {
		return Object.keys(this.elementSetup.styleSheets);
	}
	adoptStyleSheets() {
		let { styles: e } = y.settings;
		e.registerOnce(this.elementSetup.styleSheets), e.adoptInto(this.domElement.renderRoot, this.styleSheetNames);
	}
	get isMarkedDisabled() {
		return b.attributeValue(this, "disabled") === !0 || this.formIsDisabled;
	}
	get isDisabled() {
		return this.elementSetup.disabled === "unusable" && this.isMarkedDisabled;
	}
	get isEnabled() {
		return !this.isDisabled;
	}
	get isMarkedLoading() {
		return b.attributeValue(this, "loading") === !0;
	}
	get showsLoader() {
		return this.elementSetup.loading === "loader" && this.isMarkedLoading;
	}
	get hasInertContent() {
		return this.elementSetup.disabled === "unusable" && this.isMarkedDisabled || this.showsLoader;
	}
	onSharedStatesChanged(e, t, n, r) {
		let { domElement: i, elementSetup: a, internalState: o } = this;
		if (a.disabled === "unusable" && (i.internals.ariaDisabled = t ? "true" : null), a.loading === "loader" && (i.internals.ariaBusy = n ? "true" : null), h || !r) return;
		if (!e) {
			for (let e of o.madeInert ?? []) e.inert = !1;
			o.madeInert = void 0;
			return;
		}
		y.settings.focus.moveOutOf(i);
		let s = o.madeInert ??= [];
		for (let e of i.renderRoot.children) {
			let t = e;
			t.inert || (t.inert = !0, s.push(t));
		}
	}
	get isHidden() {
		return !this.isVisible && !this.isHiding;
	}
	get animationToRun() {
		let e = b.attributeValue(this, "animation");
		return e === "none" || this.isMotionOff ? v : e ?? this.elementSetup.animation;
	}
	get isStill() {
		return b.attributeValue(this, "animation") === v;
	}
	get isMotionOff() {
		let { motion: e } = y.settings;
		if (e.isReduced) return !0;
		let { domElement: t } = this;
		return t.isConnected ? getComputedStyle(t).getPropertyValue(e.property).trim() === v : !1;
	}
	async onVisibleChange(e, t) {
		let { internalState: n } = this, r = n.animatedOut ?? [], i = [...this.domElement.renderRoot.children].filter((e) => e.localName !== "slot" && (!e.hidden || r.includes(e)));
		n.animatedOut = void 0;
		let { motion: a } = y.settings;
		if (t === "none" || a.isAttention(t)) {
			if (e) for (let e of i) a.reveal(e);
			return;
		}
		e || (n.animatedOut = i), await Promise.all(i.map((n) => a.animate(n, t, e)));
	}
	onVisibleOrReadyChanged(e, t) {
		if (!t) return;
		let { internalState: n } = this, r = n.wasVisible === void 0;
		(r || n.wasVisible !== e) && (n.wasVisible = e, this.runVisibleChange(e, r ? v : this.animationToRun));
	}
	async runVisibleChange(e, t) {
		let { internalState: n } = this, r = n.visibleRun = (n.visibleRun ?? 0) + 1;
		this.isHiding = !e && t !== "none";
		try {
			await this.onVisibleChange(e, t);
		} catch (e) {
			y.settings.warn(`<${this.domElement.localName}>.onVisibleChange()`, "failed;  the change ends here", e);
		}
		n.visibleRun === r && (this.isHiding = !1);
	}
	get rootClass() {
		let { extraClass: e, classNoun: t } = this;
		return this.elementDefinition.builder.build(this.internalState.classInput, {
			extra: e,
			noun: t
		});
	}
	get extraClass() {}
	get classNoun() {}
	classValue(e) {
		return b.attributeValue(this, this.elementDefinition.attribute(e).key);
	}
	wrapperClass(e, t) {
		return this.elementDefinition.builder.build(e, { extra: t });
	}
	cssStates() {
		return {};
	}
	requestChange(e, t, n) {
		return b.requestChange(this, e, t, n);
	}
	isControlledByPage(e) {
		return b.isControlledByPage(this, e);
	}
	on(e, t, { target: n, ...r } = {}) {
		let i = this.internalState.listeners ??= _UIComponent.abortedOnDispose(this.domElement);
		(n ?? this.domElement).addEventListener(e, t, {
			...r,
			signal: i.signal
		});
	}
	static abortedOnDispose(e) {
		let t = new AbortController();
		return e.addReleaseCallback(() => t.abort()), t;
	}
	startListeners() {
		let e = this;
		for (let { method: t, type: n, options: r } of b.listenersOf(this)) {
			let i = r.target && this.domElement[r.target];
			this.on(n, (n) => p(() => e[t](n)), {
				...r,
				target: i
			});
		}
	}
	onSlotChangeForParts(e) {
		D.slotChanged(e.target);
	}
	send(e, t) {
		let n = this.elementDefinition.vocabulary.events.find((t) => t.name === e), r = new CustomEvent(this.elementDefinition.event(e), {
			bubbles: !0,
			composed: !0,
			cancelable: !!n?.cancelable,
			detail: t
		});
		return this.domElement.dispatchEvent(r);
	}
	static mount(e, t, r, i) {
		b.ownRoot((a) => {
			let o = r.renderRoot;
			r.addReleaseCallback(() => {
				at.unregister(o), o.textContent = "", a();
			});
			let s = n({
				get children() {
					return p(() => new e(r, t).onMount());
				},
				fallback: /* @__PURE__ */ __name((e) => {
					let t = e();
					return f(null, () => _UIComponent.onError(r, t)) ? _UIComponent.renderFallback(r, t, i) : void 0;
				}, "fallback")
			});
			r.clearServerContent(), at.register(o), ce(o, s);
		});
	}
	static onError(e, t) {
		e.setState(Ee, !0), console.error(`<${e.localName}> failed:`, t), e.component = void 0, e.markReady();
		let n = new CustomEvent(Te, {
			bubbles: !0,
			composed: !0,
			cancelable: !0,
			detail: { error: t }
		});
		return e.dispatchEvent(n);
	}
	static renderFallback(e, t, n) {
		afterSolidUpdate(() => {
			let r = e.renderRoot, i = n ? n.render({
				domElement: e,
				root: r,
				error: t,
				internals: e.internals
			}) : (r.replaceChildren(e.ownerDocument.createElement("slot")), void 0);
			i && e.addReleaseCallback(() => i.dispose());
		});
	}
	static define(e, t) {
		if (!y.isInstalled) {
			y.whenInstalled(() => void _UIComponent.define.call(this, e, t));
			return;
		}
		let n = new Re(this.prototype.vocabulary, {
			tag: e,
			dictionary: t
		}), r = customElements.get(n.tag), i = w.isEarly(r);
		if (r && !i) return r;
		_UIComponent.register.call(this, n);
		let a = this.prototype.elementSetup.cssStates.filter((e) => !(camelCase(e) in this.prototype));
		if (a.length) throw TypeError(`UIComponent.define():  <${n.tag}>'s elementSetup.cssStates names ${a.join(", ")}, which it has no attribute or member for;  fix the name, or give the class that member`);
		let o = _UIComponent.tagSetupFor(this, n);
		if (i) return w.attach(r, this.prototype.elementSetup.DOMElement, o), r;
		let s = w.subclassForTag(this.prototype.elementSetup.DOMElement, o);
		return customElements.define(n.tag, s), s;
	}
	static tagSetupFor(e, t) {
		let { delegatesFocus: n, slotAssignment: r, isAFormControl: i, Fallback: a, visible: o } = e.prototype.elementSetup;
		return {
			elementDefinition: t,
			shadowRootInit: {
				mode: "open",
				delegatesFocus: n,
				slotAssignment: r
			},
			isAFormControl: i,
			visible: o,
			mountComponent: /* @__PURE__ */ __name((n) => _UIComponent.mount(e, t, n, a), "mountComponent")
		};
	}
	static register(e) {
		let { vocabulary: t } = this.prototype;
		_UIComponent.registry.definitions.set(e.tag, e), this.prototype.elementSetup.root && _UIComponent.rootTags.add(e.tag), D.define({
			vocabulary: t,
			tag: e.tag,
			isAPart: this.prototype.elementSetup.isAPart,
			isConditionalOwner: "isOwnerOf" in this.prototype
		});
		let { runtime: n, words: r } = y.settings, i = n.isLoaded, a = /* @__PURE__ */ __name((e, t) => _UIComponent.define.call(this, e, t), "define");
		!_UIComponent.registry.vocabularies.has(t) && (i || !h) && (_UIComponent.registry.vocabularies.add(t), i ? handOver() : n.load().then(handOver)), b.installAttributeGetters(this.prototype, e.attributes.map(({ key: e, spec: t }) => ({
			key: e,
			name: t.name
		})));
		function handOver() {
			r.registerVocabulary(t, h ? "replace" : "register", a);
			let e = {};
			for (let { key: n, text: r } of t.texts) e[n] = r;
			r.registerTexts(e, t.tag);
		}
		__name(handOver, "handOver");
	}
	static describe() {
		return this.prototype.vocabulary;
	}
};
O = __decoratorStart(null), Nt = /* @__PURE__ */ new WeakMap(), Pt = /* @__PURE__ */ new WeakMap(), Ft = /* @__PURE__ */ new WeakMap(), It = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakMap(), __decorateElement(O, 2, "sharedLink", jt, k), __decorateElement(O, 1, "onFontSizeChanged", At, k), __decorateElement(O, 1, "onSharedWordsChanged", kt, k), __decorateElement(O, 1, "onSharedLinkClick", Ot, k), __decorateElement(O, 4, "isConnected", Dt, k, Nt), __decorateElement(O, 4, "isReady", Et, k, Pt), __decorateElement(O, 1, "onReadyChanged", Tt, k), __decorateElement(O, 1, "adoptStyleSheets", wt, k), __decorateElement(O, 2, "isMarkedDisabled", Ct, k), __decorateElement(O, 4, "formIsDisabled", St, k, Ft), __decorateElement(O, 2, "isMarkedLoading", xt, k), __decorateElement(O, 2, "showsLoader", bt, k), __decorateElement(O, 2, "hasInertContent", yt, k), __decorateElement(O, 1, "onSharedStatesChanged", vt, k), __decorateElement(O, 4, "isVisible", _t, k, It), __decorateElement(O, 2, "isHidden", gt, k), __decorateElement(O, 4, "isHiding", ht, k, Lt), __decorateElement(O, 2, "animationToRun", mt, k), __decorateElement(O, 2, "isStill", pt, k), __decorateElement(O, 1, "onVisibleOrReadyChanged", ft, k), __decorateElement(O, 1, "onSlotChangeForParts", dt, k), __decorateElement(O, 13, "elementSetup", Mt, k), __decoratorMetadata(O, k), __name(k, "UIComponent"), __publicField(k, "elementSetup", __runInitializers(O, 28, k, {
	styleSheets: {},
	cssStates: [],
	isAFormControl: !1,
	delegatesFocus: !0,
	slotAssignment: "named",
	isAPart: !1,
	DOMElement: w,
	Fallback: void 0,
	canRenderUnstyled: !1,
	root: !1,
	aria: {},
	disabled: "unusable",
	loading: "loader",
	link: "click",
	visible: "shown",
	get animation() {
		return y.settings.motion.defaultAnimation;
	}
})), __runInitializers(O, 31, k), __publicField(k, "rootTags", /* @__PURE__ */ new Set()), __publicField(k, "registry", {
	definitions: /* @__PURE__ */ new Map(),
	vocabularies: /* @__PURE__ */ new WeakSet()
});
var Rt = k, zt = "ui-root", Bt = "link", Vt = "target", Ht = "font", Ut = /^(\d+(?:\.\d+)?)(?:\/(\d+(?:\.\d+)?))?$/, Wt = "font-size", Gt = "--ui-font-size", Kt = "--ui-line-height", qt = "tooltip", Jt = "label", Yt = "parent", Xt, Zt, Qt;
function isSameSet(e, t) {
	return e.size === t.size && [...e].every((e) => t.has(e));
}
__name(isSameSet, "isSameSet"), Xt = [state({ equals: isSameSet })];
var $t = class _SlotContent {
	constructor(e) {
		__privateAdd(this, Qt, __runInitializers(Zt, 8, this, /* @__PURE__ */ new Set())), __runInitializers(Zt, 11, this), __publicField(this, "domElement"), this.domElement = e, this.filledSlots = this.scan(), d(() => {
			let t = new MutationObserver(() => this.filledSlots = this.scan());
			return t.observe(e, {
				childList: !0,
				characterData: !0,
				subtree: !0,
				attributeFilter: ["slot"]
			}), this.filledSlots = this.scan(), () => t.disconnect();
		});
	}
	hasContent(e) {
		return this.filledSlots.has(e);
	}
	scan() {
		let e = /* @__PURE__ */ new Set();
		for (let t of this.domElement.childNodes) t.nodeType === _.element ? e.add(t.getAttribute("slot") ?? "") : t.nodeType === _.text && t.textContent?.trim() && e.add("");
		return e;
	}
};
Zt = __decoratorStart(null), Qt = /* @__PURE__ */ new WeakMap(), __decorateElement(Zt, 4, "filledSlots", Xt, $t, Qt), __decoratorMetadata(Zt, $t), __name($t, "SlotContent");
var en = $t, tn = [state], nn, rn, an = class _Disclosure {
	constructor(e = {}) {
		this.setup = e, __privateAdd(this, rn, __runInitializers(nn, 8, this)), __runInitializers(nn, 11, this), __publicField(this, "toggle", /* @__PURE__ */ __name((e) => this.request(!p(() => this.isOpen), e), "toggle")), __publicField(this, "open", /* @__PURE__ */ __name((e) => this.request(!0, e), "open")), __publicField(this, "close", /* @__PURE__ */ __name((e) => this.request(!1, e), "close")), __publicField(this, "revealOnMatch", /* @__PURE__ */ __name((e) => {
			e.addEventListener("beforematch", () => this.adopt(!0));
		}, "revealOnMatch"));
	}
	setup;
	get isOpen() {
		let { setup: e } = this;
		return e.isOpen ? e.isOpen() : this.storedOpen;
	}
	get storedOpen() {
		let { component: e, member: t, memberMeans: n, kept: r, initial: i } = this.setup;
		if (e && t) {
			let r = !!e[t];
			return n === "closed" ? !r : r;
		}
		return r ? r.isOpen() : this.toggled ?? i?.() ?? !1;
	}
	request(e, t) {
		return p(() => {
			if (e === this.isOpen) return !1;
			let { setup: n } = this;
			if (n.canChange && !n.canChange(e)) return !1;
			let r = /* @__PURE__ */ __name(() => {
				let r = this.send(e ? cn : ln, e, t);
				return r && n.beforeChange?.(e), r;
			}, "announce"), { component: i, member: a, memberMeans: o } = n, s;
			if (i && a && b.isControlled(i, a)) {
				let t = o === "closed" ? !e : e;
				s = i.requestChange(a, t, r);
			} else s = r(), s && this.write(e);
			return s && n.onChange?.(e), s;
		});
	}
	sendAfter(e, t) {
		this.send(e ? un : dn, e, t, { after: !0 });
	}
	adopt(e, t) {
		p(() => {
			e !== this.isOpen && (this.send(e ? cn : ln, e, t, { cancelable: !1 }), this.write(e), this.setup.onChange?.(e));
		});
	}
	write(e) {
		let { component: t, member: n, memberMeans: r, kept: i } = this.setup;
		t && n ? t[n] = r === "closed" ? !e : e : i ? i.setOpen(e) : this.toggled = e;
	}
	get ariaExpanded() {
		return this.isOpen ? "true" : "false";
	}
	get hidden() {
		return this.isOpen ? void 0 : fn;
	}
	send(e, t, n, { cancelable: r, after: i } = {}) {
		let { component: a, detail: o, afterDetail: s } = this.setup;
		if (!a || !a.vocabulary.events.some((t) => t.name === e)) return !0;
		let c = i && s ? s(t) : o ? o(t, n) : {
			open: t,
			originalEvent: n
		};
		if (r !== !1) return a.send(e, c);
		let l = {
			bubbles: !0,
			composed: !0,
			cancelable: !1,
			detail: c
		};
		return a.domElement.dispatchEvent(new CustomEvent(a.elementDefinition.event(e), l));
	}
};
nn = __decoratorStart(null), rn = /* @__PURE__ */ new WeakMap(), __decorateElement(nn, 4, "toggled", tn, an, rn), __decoratorMetadata(nn, an), __name(an, "Disclosure");
var sn = an, cn = "ui-opening", ln = "ui-closing", un = "ui-opened", dn = "ui-closed", fn = "until-found", OwnControls = class {
	static isClicked(e, { upTo: t, before: n } = {}) {
		for (let r of e.composedPath()) {
			if (r === t) return !1;
			let e = r;
			if (e.matches) {
				if (n && e.matches(n)) return !1;
				if (e.matches(pn)) return !0;
			}
		}
		return !1;
	}
}, pn = "a, button, input, select, textarea, label, details, summary, [contenteditable], [tabindex], [role=button], [role=link]", mn = class ParentLink {
	domElement;
	attribute;
	constructor(e) {
		this.domElement = e.domElement, this.attribute = e.attribute;
	}
	follow(e) {
		if (!e) return;
		let t = !1, n;
		return ParentLink.whenPageRead(this.domElement.ownerDocument, () => {
			!t && this.domElement.isConnected && (this.join(e) || (ParentLink.warnMissing(e, this.domElement.localName, this.attribute), n = ParentLink.watch(this.root, () => !this.domElement.isConnected || this.join(e))));
		}), () => {
			t = !0, n?.();
		};
	}
	join(e) {
		let t = this.root, n = t.getElementById(e);
		if (!n) return !1;
		let { attribute: r } = this, i = [...t.querySelectorAll(`${this.domElement.localName}[${r}]`)].filter((t) => t.getAttribute(r) === e && !n.contains(t)), a = [], o = [];
		for (let t of i) t.contains(n) ? y.settings.warn(ParentLink.source(t.localName, r, e), "it holds that element;  it stays put") : t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING ? a.push(t) : o.push(t);
		return a.length && n.prepend(...a), o.length && n.append(...o), !0;
	}
	get root() {
		return this.domElement.getRootNode();
	}
	static whenPageRead(e, t) {
		e.readyState === "loading" ? e.addEventListener("DOMContentLoaded", t, { once: !0 }) : afterSolidUpdate(t);
	}
	static warnMissing(e, t, n) {
		ParentLink.warned.has(e) || (ParentLink.warned.add(e), y.settings.warn(ParentLink.source(t, n, e), `no element has the id "${e}";  it stays where it is, and joins one if it arrives`));
	}
	static source(e, t, n) {
		return `<${e} ${t}="${n}">`;
	}
	static watch(e, t) {
		let n = ParentLink.waiting.get(e);
		if (!n) {
			let t = /* @__PURE__ */ new Set(), r = new MutationObserver(() => {
				for (let e of [...t]) e() && t.delete(e);
				t.size || ParentLink.stopWatching(e);
			});
			r.observe(e, {
				childList: !0,
				subtree: !0,
				attributeFilter: ["id"]
			}), n = {
				waits: t,
				observer: r
			}, ParentLink.waiting.set(e, n);
		}
		let { waits: r } = n;
		return r.add(t), () => {
			r.delete(t), r.size || ParentLink.stopWatching(e);
		};
	}
	static stopWatching(e) {
		ParentLink.waiting.get(e)?.observer.disconnect(), ParentLink.waiting.delete(e);
	}
	static reset() {
		ParentLink.warned.clear();
	}
	static warned = /* @__PURE__ */ new Set();
	static waiting = /* @__PURE__ */ new WeakMap();
};
//#endregion
//#region ../src/util/number.ts
function clamp(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function kb(e, { digits: t = 1 } = {}) {
	return `${(e / 1024).toFixed(t)} KB`;
}
//#endregion
//#region src/util/Warnings.ts
var Warnings = class {
	static warn(e, t, ...n) {
		console.warn(`${hn} ${e}:  ${t}`, ...n);
	}
	static error(e, t, ...n) {
		console.error(`${hn} ${e}:  ${t}`, ...n);
	}
	static devWarn(e, t, ...n) {}
}, hn = "[spell-ui]", gn = class LoadOnce {
	failures;
	loads = /* @__PURE__ */ new Map();
	constructor({ failures: e = "kept" } = {}) {
		this.failures = e;
	}
	get(e, t, { fresh: n = !1 } = {}) {
		let r = n ? void 0 : this.loads.get(e);
		if (r) return r;
		let i = LoadOnce.start(t);
		return this.loads.set(e, i), this.failures !== "kept" && i.catch(() => {
			this.loads.get(e) === i && this.forgetsNow() && this.loads.delete(e);
		}), i;
	}
	has(e) {
		return this.loads.has(e);
	}
	keys() {
		return this.loads.keys();
	}
	set(e, t) {
		this.loads.set(e, Promise.resolve(t));
	}
	forget(e) {
		e === void 0 ? this.loads.clear() : this.loads.delete(e);
	}
	static start(e) {
		try {
			return e();
		} catch (e) {
			return Promise.reject(e);
		}
	}
	forgetsNow() {
		return this.failures === "forgotten" || typeof navigator < "u" && navigator.onLine === !1;
	}
}, _n, vn, yn, bn, xn, Sn, Cn, wn, Tn, En, Dn = [proto], A;
En = [proto], Tn = [proto], wn = [proto], Cn = [proto], Sn = [proto], xn = [proto], bn = [proto], yn = [proto], vn = [proto], _n = [proto];
var j = class _ValueSets {
	static get(e) {
		return typeof e == "string" ? _ValueSets.prototype[e] ?? [] : e;
	}
	static has(e, t) {
		if (e === "widths") {
			let e = _ValueSets.columns(t);
			return e !== void 0 && _ValueSets.isColumnCount(Math.round(e));
		}
		return _ValueSets.lookup(_ValueSets.get(e)).has(t);
	}
	static suggest(e, t) {
		return suggest(t, _ValueSets.get(e));
	}
	static add(e, ...t) {
		let n = _ValueSets.get(e), r = Object.freeze([...n, ...t.filter((e) => !n.includes(e))]);
		Object.defineProperty(_ValueSets.prototype, e, {
			value: r,
			writable: !0,
			configurable: !0
		}), _ValueSets[e] = r;
	}
	static setFor(e) {
		let t = kn;
		return e.values ?? t[e.kind];
	}
	static columns(e) {
		let t;
		if (typeof e == "number") t = e;
		else {
			let n = e.trim(), r = An.exec(n), i = jn.exec(n);
			t = r ? On * Number(r[1]) / Number(r[2]) : i ? On * Number(i[1]) / 100 : Mn.test(n) ? Number(n) : _ValueSets.wordColumns().get(n.toLowerCase()) ?? NaN;
		}
		return Number.isFinite(t) && t > 0 && t < On + .5 ? t : void 0;
	}
	static isColumnCount(e) {
		return Number.isInteger(e) && e >= 1 && e <= On;
	}
	static lookup(e) {
		let t = _ValueSets.sets.get(e);
		return t || _ValueSets.sets.set(e, t = new Set(e)), t;
	}
	static wordColumns() {
		if (!_ValueSets.words) {
			_ValueSets.words = /* @__PURE__ */ new Map();
			for (let e = 1; e <= On; e++) _ValueSets.words.set(numberToWord(e), e);
		}
		return _ValueSets.words;
	}
};
A = __decoratorStart(null), __decorateElement(A, 13, "hues", Dn, j), __decorateElement(A, 13, "sizes", En, j), __decorateElement(A, 13, "positions", Tn, j), __decorateElement(A, 13, "attachments", wn, j), __decorateElement(A, 13, "alignments", Cn, j), __decorateElement(A, 13, "verticalAlignments", Sn, j), __decorateElement(A, 13, "floats", xn, j), __decorateElement(A, 13, "widths", bn, j), __decorateElement(A, 13, "devices", yn, j), __decorateElement(A, 13, "booleans", vn, j), __decorateElement(A, 13, "topics", _n, j), __decoratorMetadata(A, j), __name(j, "ValueSets"), __publicField(j, "hues", __runInitializers(A, 8, j, [
	"primary",
	"secondary",
	"red",
	"orange",
	"yellow",
	"olive",
	"green",
	"teal",
	"blue",
	"violet",
	"purple",
	"pink",
	"brown",
	"grey",
	"black",
	"positive",
	"negative"
])), __runInitializers(A, 11, j), __publicField(j, "sizes", __runInitializers(A, 12, j, [
	"mini",
	"tiny",
	"small",
	"medium",
	"large",
	"big",
	"huge",
	"massive"
])), __runInitializers(A, 15, j), __publicField(j, "positions", __runInitializers(A, 16, j, [
	"top left",
	"top center",
	"top right",
	"bottom left",
	"bottom center",
	"bottom right",
	"left center",
	"right center",
	"left top",
	"left bottom",
	"right top",
	"right bottom"
])), __runInitializers(A, 19, j), __publicField(j, "attachments", __runInitializers(A, 20, j, [
	"top",
	"bottom",
	"left",
	"right",
	"top left",
	"top right",
	"bottom left",
	"bottom right"
])), __runInitializers(A, 23, j), __publicField(j, "alignments", __runInitializers(A, 24, j, [
	"left",
	"center",
	"right",
	"justified"
])), __runInitializers(A, 27, j), __publicField(j, "verticalAlignments", __runInitializers(A, 28, j, [
	"top",
	"middle",
	"bottom"
])), __runInitializers(A, 31, j), __publicField(j, "floats", __runInitializers(A, 32, j, ["left", "right"])), __runInitializers(A, 35, j), __publicField(j, "widths", __runInitializers(A, 36, j, [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"16"
])), __runInitializers(A, 39, j), __publicField(j, "devices", __runInitializers(A, 40, j, [
	"mobile",
	"tablet",
	"computer",
	"large screen",
	"widescreen"
])), __runInitializers(A, 43, j), __publicField(j, "booleans", __runInitializers(A, 44, j, [
	"true",
	"false",
	"yes",
	"no"
])), __runInitializers(A, 47, j), __publicField(j, "topics", __runInitializers(A, 48, j, /* @__PURE__ */ "basic.layout.containers.navigation.menus.forms.inputs.controls.buttons.selection.date & time.text.typography.media.images.icons.data display.lists.tables.cards.feedback.messages.notifications.overlays.dialogs.popups.loading.progress.status.animation.social.content parts.documentation.elements.collections.views.modules".split("."))), __runInitializers(A, 51, j), __publicField(j, "sets", /* @__PURE__ */ new WeakMap()), __publicField(j, "words");
var M = j, On = 16, kn = {
	color: "hues",
	size: "sizes",
	textAlign: "alignments",
	verticalAlign: "verticalAlignments",
	multiple: "devices",
	boolean: "booleans"
}, An = /^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/, jn = /^(\d+(?:\.\d+)?)\s*%$/, Mn = /^\d+(?:\.\d+)?$/, N = class Converters {
	static boolean(e, t) {
		if (e == null) return !1;
		if (typeof e == "boolean") return e;
		let n = e.trim().toLowerCase();
		return Nn.has(n) || n === t ? !0 : !Fn.has(n);
	}
	static booleanToAttribute(e) {
		return e ? "" : null;
	}
	static keyOrValue(e, t, n = {}) {
		if (e == null || typeof e == "boolean") return e ?? !1;
		let r = e.trim().toLowerCase();
		return Nn.has(r) || r === n.attribute ? !0 : Fn.has(r) ? !1 : t ? Converters.enumValue(r, t, n) ?? !0 : r;
	}
	static icon(e, t) {
		if (e == null || e === !1) return;
		let n = typeof e == "string" ? e.trim() : e === !0 ? "" : typeof e == "number" ? `${e}` : void 0;
		if (n === void 0) return;
		let r = n.toLowerCase();
		if (!Pn.has(r)) return Nn.has(r) ? typeof t == "string" ? t : "" : n;
	}
	static enumValue(e, t, n = {}) {
		if (e == null) return;
		let r = e.trim().toLowerCase().replace(Ln, " ");
		if (M.has(t, r)) return r;
		if (r === "") return;
		let i = M.suggest(t, r), a = n.tag ? `<${n.tag} ${n.attribute ?? ""}>` : n.attribute ?? "value";
		Warnings.devWarn(a, `unknown value ${JSON.stringify(e)}${i ? `;  did you mean ${JSON.stringify(i)}?` : ""}`);
	}
	static number(e) {
		if (e == null) return;
		if (typeof e == "number") return Number.isNaN(e) ? void 0 : e;
		if (e.trim() === "") return;
		let t = Number(e);
		return Number.isNaN(t) ? void 0 : t;
	}
	static json(e) {
		if (typeof e != "string") return e;
		let t = e.trim();
		if (t !== "") {
			if (!Rn.includes(t[0])) return e;
			try {
				return JSON.parse(t);
			} catch (t) {
				Warnings.devWarn("Converters.json()", `invalid JSON ${JSON.stringify(e)}:`, t.message);
				return;
			}
		}
	}
	static list(e) {
		return e == null ? [] : typeof e == "string" ? e.split(In).filter(Boolean) : [...e];
	}
}, Nn = /* @__PURE__ */ new Set([
	"",
	"true",
	"yes"
]), Pn = /* @__PURE__ */ new Set(["false", "no"]), Fn = /* @__PURE__ */ new Set([...Pn, "0"]), In = /[\s,]+/, Ln = /\s+/g, Rn = "[{\"", zn = /* @__PURE__ */ e({
	ACTIVE: () => zr,
	ANIMATING: () => Hr,
	APPEARANCE: () => Yr,
	AnimationLookup: () => yr,
	Animations: () => pr,
	AttentionAnimations: () => dr,
	BAR: () => "bar",
	BASIC: () => ii,
	BOTTOM: () => Rr,
	BUTTON: () => Gr,
	BreadcrumbDividerTokens: () => tr,
	CLOSE: () => Ir,
	CLOSE_CLASS: () => oi,
	CLOSE_ICON: () => si,
	CLOSE_TEXT: () => "×",
	CODE_SPAN: () => ji,
	COLOR_CLASS_PREFIX: () => "ui-",
	CONTENT: () => Kr,
	DEFAULT_ANIMATION: () => _r,
	DESCRIPTION: () => Xr,
	DIGITS: () => fi,
	DISABLED: () => Br,
	DISABLED_STATE: () => Pr,
	FIELD_HOST_STATE: () => ir,
	FLUID: () => ai,
	Flags: () => Bn,
	FontFaces: () => mr,
	FontFamilies: () => hr,
	FontWords: () => gr,
	FormControlAttributes: () => pi,
	FormControlStates: () => mi,
	FormStates: () => li,
	GRID_CONTAINER_NAME: () => Jn,
	HEADER: () => qr,
	HEADING: () => Jr,
	HeadingLevels: () => HeadingLevels,
	ICON: () => Zr,
	ICON_CLASS: () => Qr,
	IMAGE: () => $r,
	IN: () => "in",
	ITEM: () => ei,
	InputOwnerTokens: () => rr,
	ItemAlignments: () => er,
	Key: () => Nr,
	LABEL: () => ti,
	LEFT: () => Lr,
	MESSAGE: () => ni,
	MOTION_PROPERTY: () => vr,
	MenuAppearances: () => $n,
	ModalActionSelectors: () => cr,
	ModalActions: () => ModalActions,
	NO_ANIMATION: () => fr,
	ORDERED: () => Fr,
	OUT: () => "out",
	PART_STATIC_CLASS_PREFIX: () => "in-",
	PLACEHOLDER_HOST_STATE: () => nr,
	PUSHABLE_HOST_STATE: () => Tr,
	PUSHER_HOST_STATE: () => Cr,
	PartOwnerTokens: () => Gn,
	PopupTrigger: () => P,
	PopupTriggers: () => sr,
	PusherTokens: () => Er,
	REQUIRED_RULE: () => ui,
	SELECTED: () => Vr,
	SIDEBAR_HOST_STATE: () => wr,
	SIDE_HOST_STATE: () => jr,
	STACK_WITH_CLASS: () => Zn,
	STACK_WITH_TOKEN: () => Xn,
	STATIC_CONTROL: () => Kn,
	STATIC_ROOT: () => qn,
	SearchMatch: () => F,
	SearchMatches: () => lr,
	SectionTitle: () => Mr,
	ShapeCommands: () => Ar,
	ShapeFlips: () => kr,
	SourceAttributes: () => gi,
	SourceBodyAttributes: () => Si,
	SourceBodyEvents: () => Ci,
	SourceBodyParts: () => wi,
	SourceBodyStates: () => Ti,
	SourceEvents: () => _i,
	SourceFailureTexts: () => bi,
	SourceLoadModes: () => hi,
	SourceParts: () => vi,
	SourceStates: () => yi,
	SourceTexts: () => xi,
	SpaceSteps: () => Qn,
	SpecialFlags: () => Vn,
	StackClasses: () => StackClasses,
	StackWithValues: () => Yn,
	TABLE_SORT_KEY: () => or,
	TABLE_SORT_OPT_OUT: () => ar,
	TEXT: () => ri,
	TITLE: () => Wr,
	TOP: () => "top",
	ThemeCorners: () => Oi,
	ThemeDepths: () => ki,
	ThemeFonts: () => Di,
	ThemeGlasses: () => Ai,
	ThemeHues: () => Ei,
	ThemeNames: () => ThemeNames,
	TocMarks: () => Mi,
	ToggleCommands: () => Sr,
	TransitionCommands: () => xr,
	VISIBLE: () => Ur,
	VISUALLY_HIDDEN: () => ci,
	VisibilityAnimations: () => ur,
	WHITESPACE: () => di,
	WordWidthClasses: () => WordWidthClasses,
	WordWidths: () => Dr
}), Bn = class Flags {
	static emojiFor(e) {
		let t = e.toLowerCase();
		return Flags.isSpecial(t) ? Vn[t] : Hn.test(t) ? String.fromCodePoint(...Array.from(t, (e) => Un + e.charCodeAt(0) - Wn)) : "";
	}
	static isSpecial(e) {
		return Object.hasOwn(Vn, e);
	}
}, Vn = {
	rainbow: "🏳️‍🌈",
	transgender: "🏳️‍⚧️",
	pirate: "🏴‍☠️",
	"gb-eng": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
	"gb-sct": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
	"gb-wls": "🏴󠁧󠁢󠁷󠁬󠁳󠁿"
}, Hn = /^[a-z]{2}$/, Un = 127462, Wn = 97, Gn = {
	inverted: "--ui-inverted",
	cardLayout: "--_ui-card-layout",
	cardLeading: "--_ui-card-leading",
	itemLayout: "--_ui-item-layout",
	itemState: "--_ui-item-state",
	commentsMinimal: "--_ui-comments-minimal",
	modalBasic: "--_ui-modal-basic",
	modalHeaderSize: "--_ui-modal-header-size",
	messageLayout: "--_ui-message-layout",
	listLayout: "--_ui-list-layout",
	itemMedia: "--_ui-item-media",
	eventLabel: "--_ui-event-label",
	statisticLayout: "--_ui-statistic-layout",
	statisticValueSize: "--_ui-statistic-value-size",
	stepState: "--_ui-step-state",
	stepLayout: "--_ui-step-layout",
	accordionStyle: "--_ui-accordion-style",
	accordionOpen: "--_ui-accordion-open",
	searchResult: "--_ui-search-result",
	headerLayout: "--_ui-header-layout",
	labelLayout: "--_ui-label-layout",
	part: "--_ui-part"
}, Kn = "data-ui-control", qn = "data-ui", Jn = "ui-grid", Yn = ["container", "page"], Xn = "--ui-stack-with", Zn = "stack-with-", StackClasses = class {
	static classFor(e) {
		return e ? `${Zn}${e}` : void 0;
	}
}, Qn = {
	none: "0",
	xs: "var(--ui-space-xs)",
	sm: "var(--ui-space-s)",
	md: "var(--ui-space-m)",
	lg: "var(--ui-space-l)",
	xl: "var(--ui-space-xl)"
}, $n = [
	"tabular",
	"pointing",
	"secondary",
	"text",
	"segmented"
], er = [
	"fluid",
	"left",
	"center",
	"right"
], tr = {
	text: "--ui-breadcrumb-divider",
	icon: "--ui-breadcrumb-divider-icon",
	layout: "--_ui-breadcrumb-divider-layout"
}, nr = "placeholder", rr = {
	width: "--_ui-input-owner-width",
	color: "--_ui-field-state-color",
	background: "--_ui-field-state-background",
	border: "--_ui-field-state-border"
}, ir = "field", ar = {
	attribute: "data-sortable",
	value: "false"
}, or = "data-key", P = {
	hover: "hover",
	focus: "focus",
	click: "click",
	manual: "manual"
}, sr = [
	P.hover,
	P.focus,
	P.click,
	P.manual
], cr = {
	approve: ".approve, .ok, .positive, [color=\"positive\"], [positive]:not([positive=\"false\"], [positive=\"no\"])",
	deny: ".deny, .cancel, .negative, [color=\"negative\"], [negative]:not([negative=\"false\"], [negative=\"no\"])"
}, ModalActions = class {
	static of(e) {
		if (e.matches(cr.approve)) return "approve";
		if (e.matches(cr.deny)) return "deny";
	}
	static *lightPath(e, t) {
		let n = t.getRootNode();
		for (let r of e.composedPath()) {
			if (r === t) return;
			let e = r;
			e.matches && e.getRootNode?.() === n && (yield r);
		}
	}
}, F = {
	exact: "exact",
	fuzzy: "fuzzy",
	prefix: "prefix",
	some: "some",
	all: "all"
}, lr = [
	F.exact,
	F.fuzzy,
	F.prefix,
	F.some,
	F.all
], ur = /* @__PURE__ */ "fade.fade up.fade down.fade left.fade right.scale.zoom.drop.browse.browse right.fly.fly up.fly down.fly left.fly right.slide.slide up.slide down.slide left.slide right.swing.swing up.swing down.swing left.swing right.horizontal flip.vertical flip".split("."), dr = [
	"flash",
	"shake",
	"bounce",
	"tada",
	"pulse",
	"jiggle",
	"glow"
], fr = "none", pr = [
	...ur,
	...dr,
	fr
], mr = [
	"bold",
	"italic",
	"underline",
	"strikethrough",
	"code",
	"highlight",
	"subscript",
	"superscript",
	"all-caps",
	"title-caps"
], hr = [
	"headline",
	"subhead",
	"serif",
	"sans-serif",
	"typewriter"
], gr = [...mr, ...hr], _r = "fade", vr = "--ui-motion", yr = class AnimationLookup {
	static fomanticNameFor(e) {
		let t = e.trim().replace(/\s+/g, " ");
		return pr.includes(t) ? t : pr.find((e) => AnimationLookup.runtimeNameFor(e) === t);
	}
	static runtimeNameFor(e) {
		return br[e] ?? e.replace(/ /g, "-");
	}
	static isAttention(e) {
		return dr.includes(e);
	}
	static keyframesBeside(e, t) {
		if (e !== "none" && e !== t) return AnimationLookup.isAttention(e) ? void 0 : AnimationLookup.runtimeNameFor(e);
	}
}, br = {
	"horizontal flip": "flip-horizontal",
	"vertical flip": "flip-vertical",
	slide: "slide-down",
	swing: "swing-down"
}, xr = {
	show: "--show",
	close: "--close",
	toggle: "--toggle",
	transition: "--transition"
}, Sr = class ToggleCommands {
	static show = "--show";
	static close = "--close";
	static toggle = "--toggle";
	static action(e, t) {
		let { command: n } = e;
		if (n === ToggleCommands.show || n === ToggleCommands.toggle && !t) return "show";
		if (n === ToggleCommands.close || n === ToggleCommands.toggle) return "close";
	}
}, Cr = "pusher", wr = "sidebar", Tr = "pushable", Er = {
	transform: "--_ui-pusher-transform",
	origin: "--_ui-pusher-origin",
	dimmed: "--_ui-pusher-dimmed",
	blurring: "--_ui-pusher-blurring"
}, Dr = [
	"very thin",
	"thin",
	"wide",
	"very wide"
], WordWidthClasses = class {
	static classFor(e) {
		let t = typeof e == "string" ? e.trim().replace(Or, " ") : void 0;
		return Dr.find((e) => e === t);
	}
}, Or = /[\s-]+/g, kr = [
	"up",
	"down",
	"left",
	"right",
	"over",
	"back"
], Ar = {
	next: "--next",
	previous: "--previous",
	flip: "--flip-"
}, jr = "side", Mr = { textOf(e) {
	let t = e.getAttribute("label");
	if (t) return t;
	let n = [...e.children].find((e) => e.getAttribute("slot") === "label");
	return n ? n.textContent ?? void 0 : void 0;
} }, Nr = {
	arrowUp: "ArrowUp",
	arrowDown: "ArrowDown",
	arrowLeft: "ArrowLeft",
	arrowRight: "ArrowRight",
	home: "Home",
	end: "End",
	pageUp: "PageUp",
	pageDown: "PageDown",
	enter: "Enter",
	space: " ",
	escape: "Escape",
	tab: "Tab",
	backspace: "Backspace",
	delete: "Delete"
}, Pr = ":state(disabled)", Fr = "ordered", Ir = "close", Lr = "left", Rr = "bottom", zr = "active", Br = "disabled", Vr = "selected", Hr = "animating", Ur = "visible", Wr = "title", Gr = "button", Kr = "content", qr = "header", Jr = "heading", Yr = "appearance", Xr = "description", Zr = "icon", Qr = "icon", $r = "image", ei = "item", ti = "label", ni = "message", ri = "text", ii = "basic", ai = "fluid", oi = "close icon", si = "xmark", ci = "ui-visually-hidden-force", li = [
	"error",
	"info",
	"success",
	"warning"
], ui = "notEmpty", di = /\s+/, fi = /^\d+(\.\d+)?$/, pi = {
	name: {
		name: "name",
		group: "name",
		kind: "string",
		description: "Form field name."
	},
	required: {
		name: "required",
		group: "form",
		kind: "boolean",
		description: "Form validation:  a value must be chosen."
	},
	readonly: {
		name: "readonly",
		group: "form",
		kind: "keyOnly",
		property: "readOnly",
		key: "read-only",
		description: "Shows its value but can't be changed;  submitted with the form (unlike `disabled`)."
	},
	placeholder: {
		name: "placeholder",
		group: "form",
		kind: "string",
		description: "Hint shown while empty."
	}
}, mi = {
	readonly: {
		name: "readonly",
		description: "`readonly`:  can't be changed."
	},
	invalid: {
		name: "invalid",
		description: "Fails validation, once a person has interacted (`:user-invalid` semantics)."
	}
}, hi = [
	"eager",
	"visible",
	"idle"
], gi = [{
	name: "source",
	kind: "string",
	description: "URL of the file to show, relative to the page;  same origin only (another site's URL shows an error).  Changing it loads the new file.  Without it, the element shows its own content."
}, {
	name: "load",
	kind: "enum",
	values: hi,
	default: "eager",
	description: "When to fetch `source`:  `eager` (at once), `visible` (once scrolled into view) or `idle` (when the browser has nothing else to do).  Like Astro's `client:visible` / `client:idle`."
}], _i = [
	{
		name: "ui-loaded",
		detail: "{ source?: string, content: string }",
		description: "Content arrived:  fetched from `source`, or read from the element's own content."
	},
	{
		name: "ui-changed",
		detail: "{ content: string }",
		description: "The `content` property was set:  the element shows the new text, and is `dirty` until saved."
	},
	{
		name: "ui-saving",
		detail: "{ source?: string, content: string, etag?: string }",
		cancelable: !0,
		description: "`host.save()` is about to save:  `preventDefault()` to save it yourself (an editor posting elsewhere)."
	},
	{
		name: "ui-saved",
		detail: "{ source?: string, etag?: string }",
		description: "Saved;  `etag` is the file's new version."
	},
	{
		name: "ui-error",
		detail: "{ kind: 'load' | 'cross-origin' | 'file-protocol' | 'save' | 'conflict' | 'no-saver' | 'render', source?: string, error: unknown }",
		cancelable: !0,
		description: "Loading, showing or saving failed;  `kind` says why.  Load and render failures show an error message unless cancelled;  save failures keep the content as it is."
	}
], vi = [{
	name: "loader",
	description: "The `<ui-loader>` shown while `source` loads."
}, {
	name: "error",
	description: "The `<ui-message>` shown when loading or showing failed."
}], yi = [
	{
		name: "loading",
		description: "Fetching `source`."
	},
	{
		name: "error",
		description: "Loading or showing failed:  the error message shows."
	},
	{
		name: "saving",
		description: "`save()` is in progress."
	},
	{
		name: "dirty",
		description: "`content` changed since it was loaded or saved."
	}
], bi = [
	{
		key: "sourceLoadError",
		text: "Couldn't load {source}.",
		description: "The fetch failed."
	},
	{
		key: "sourceCrossOrigin",
		text: "Can't show {source}:  only files from this site can be shown.",
		description: "`source` is on another origin."
	},
	{
		key: "sourceFileProtocol",
		text: "Can't load {source}:  this page was opened from disk.  Open it from a web server to see it.",
		description: "The page is a `file://` page."
	},
	{
		key: "sourceRenderError",
		text: "Couldn't show {source}.",
		description: "The text arrived, but couldn't be shown."
	}
], xi = [{
	key: "sourceLoading",
	text: "Loading {source}",
	description: "Accessible name of the loader."
}, ...bi], Si = [{
	name: "source",
	kind: "string",
	description: "URL of an HTML file whose `<body>` is the content, fetched the first time it opens (at once when it starts open);  same origin only.  Any content already there is a placeholder the file replaces.  `load()` fetches it now, `reload()` again."
}, {
	name: "selector",
	kind: "string",
	replaces: ["select"],
	description: "With `source`:  a CSS selector;  only its first match in the file becomes the content.  Its old name was `select`."
}], Ci = [
	{
		name: "ui-loading",
		detail: "{ source: string }",
		description: "The `source` file is on its way:  the section unfolded for the first time, or `reloadBody()`."
	},
	{
		name: "ui-loaded",
		detail: "{ source: string, content: string }",
		description: "The `source` file arrived and its body is in place (`content` is the file's text)."
	},
	{
		name: "ui-error",
		detail: "{ kind: 'load' | 'cross-origin' | 'file-protocol' | 'render', source: string, error: unknown }",
		cancelable: !0,
		description: "The `source` file couldn't be loaded or shown;  `kind` says why.  An error line shows in the content unless cancelled;  opening it again tries again."
	}
], wi = [{
	name: "error",
	description: "With `source`:  the line saying the file couldn't be loaded."
}], Ti = [{
	name: "loaded",
	description: "With `source`:  the file's body is in place."
}, {
	name: "error",
	description: "With `source`:  the file couldn't be loaded or shown."
}], Ei = [
	"red",
	"orange",
	"yellow",
	"olive",
	"green",
	"teal",
	"blue",
	"violet",
	"purple",
	"pink",
	"brown",
	"grey",
	"black"
], Di = [
	"system",
	"rounded",
	"serif",
	"georgia",
	"humanist",
	"verdana",
	"mono"
], Oi = [
	"sharp",
	"soft",
	"round",
	"pill"
], ki = [
	"flat",
	"soft",
	"lifted"
], Ai = [
	"clear",
	"frosted",
	"solid"
], ThemeNames = class {
	static titleOf(e) {
		return e.split("-").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
	}
	static nameNow(e, t) {
		return e.constructor.RENAMED[t] ?? t;
	}
}, HeadingLevels = class {
	static levelFor(e, t) {
		let n = Math.round(Number(e ?? t.fallback));
		return Number.isFinite(n) ? Math.min(t.max, Math.max(t.min, n)) : t.fallback;
	}
	static attributeFor(e) {
		return String(Math.min(6, Math.max(1, Math.round(e))));
	}
}, ji = /`([^`]+)`/g, Mi = {
	entry: "data-toc",
	group: "data-toc-group"
}, Ni = {
	lang: "es",
	attributes: {
		disabled: "desactivado",
		loading: "cargando",
		visible: "visible",
		animation: "animacion",
		link: "enlace",
		target: "destino",
		font: "letra",
		tooltip: "ayuda",
		label: "etiqueta"
	},
	values: { font: {
		bold: "negrita",
		italic: "cursiva",
		underline: "subrayado",
		strikethrough: "tachado",
		code: "código",
		highlight: "resaltado",
		subscript: "subíndice",
		superscript: "superíndice",
		"all-caps": "mayúsculas",
		"title-caps": "iniciales",
		headline: "titular",
		subhead: "subtítulo",
		serif: "serifa",
		"sans-serif": "sin-serifa",
		typewriter: "máquina"
	} }
}, I = class SharedVocabulary {
	static attributesFor(e) {
		return SharedVocabulary.withShared(e).attributes;
	}
	static statesFor(e) {
		return SharedVocabulary.withShared(e).states;
	}
	static takesShared(e, t) {
		return SharedVocabulary.withShared(e).shared.has(t);
	}
	static translated(e, t) {
		return Fi.get(e)?.attributes[t];
	}
	static translatedValues(e, t) {
		return Fi.get(e)?.values?.[t];
	}
	static get attributeNames() {
		return Pi.map(({ name: e }) => e);
	}
	static isSharedAttribute(e) {
		return Pi.some((t) => t.name === e);
	}
	static withShared(e) {
		let t = SharedVocabulary.cache.get(e);
		if (t) return t;
		let n = new Set(e.attributes.map(({ name: e }) => e)), r = Pi.filter(({ name: e }) => !n.has(e)), i = new Set(e.states.map(({ name: e }) => e));
		return t = {
			attributes: r.length ? [...e.attributes, ...r] : e.attributes,
			states: [...e.states, ...Ii.filter(({ name: e }) => !i.has(e))],
			shared: new Set(r.map(({ name: e }) => e))
		}, SharedVocabulary.cache.set(e, t), t;
	}
	static cache = /* @__PURE__ */ new WeakMap();
}, Pi = [
	{
		name: "disabled",
		kind: "boolean",
		description: "Can't be used:  dimmed, out of the tab order, and everything inside it inert;  `aria-disabled`.  Shared by every element;  a family may give it a meaning of its own (`elementSetup.disabled`)."
	},
	{
		name: "loading",
		kind: "boolean",
		description: "Busy:  dimmed under a loader, and inert;  `aria-busy`.  Shared by every element;  a family may draw its own loader (`elementSetup.loading`)."
	},
	{
		name: "visible",
		kind: "boolean",
		description: "Shown:  the platform's `hidden`, turned round (`el.visible === !el.hidden`).  Writing either one shows or hides the element with its `animation`;  `visible=\"false\"` writes `hidden`.  Neither written:  the family decides (a modal starts hidden, a message shown).  Both written in markup and disagreeing:  `hidden` wins."
	},
	{
		name: "animation",
		kind: "enum",
		values: pr,
		description: "How it shows and hides (Fomantic's names:  `fade up`, `scale`, `fly down` ...);  default its family's, else `fade`.  `none` turns motion off for it and everything inside it, as the person's reduced-motion setting does;  an element inside can't turn it back on."
	},
	{
		name: "link",
		group: "link",
		kind: "string",
		replaces: ["href"],
		description: "Where a click on it goes, as a link's `href`:  `<ui-text link>` is a link in running text.  A family that draws its own link (text, button, image ...) draws an `<a>`;  on any other element a click goes there, except on a control of its own inside.  Its old name was `href`."
	},
	{
		name: "target",
		group: "link",
		kind: "string",
		description: "Where `link` opens:  `_blank` for a new tab, or a window's name;  as a link's `target`."
	},
	{
		name: "font",
		group: "appearance",
		kind: "multiple",
		values: gr,
		description: "How its letters look, several words at once:  `bold`, `italic`, `underline`, `strikethrough`, `code`, `highlight`, `subscript`, `superscript`, `all-caps`, `title-caps` (`font=\"bold italic\"`);  a family from the theme, `headline`, `subhead`, `serif`, `sans-serif` or `typewriter`;  and a size in pixels, `14`, or with its line height, `10/20` (`font=\"bold serif 10/20\"`).  `<ui-text>` draws each face as its HTML element (`<strong>`, `<em>` ...), so screen readers hear it, and takes each word as a bare attribute too (`<ui-text bold serif>`);  every other element shows the look alone."
	},
	{
		name: "tooltip",
		group: "content",
		kind: "string",
		description: "Its tooltip:  the browser's own, written as the element's `title`."
	},
	{
		name: "label",
		group: "content",
		kind: "string",
		description: "Its name for screen readers (`aria-label`), where it has no words of its own.  A family whose `label` is something else (a field's, a statistic's) keeps its own."
	}
], Fi = /* @__PURE__ */ new Map([[Ni.lang, Ni]]), Ii = [
	{
		name: "disabled",
		description: "`disabled` is set (or, on a form control, a `<fieldset disabled>` around it)."
	},
	{
		name: "loading",
		description: "`loading` is set."
	},
	{
		name: "busy",
		description: "`loading`, and the element draws the shared loader:  a spinner over it (`elementSetup.loading`)."
	},
	{
		name: "dimmed",
		description: "Disabled or loading the shared way:  everything inside is inert, and dimmed."
	},
	{
		name: "hidden",
		description: "Hidden (`hidden`, or `visible=\"false\"`), once its animation has run."
	},
	{
		name: "still",
		description: "`animation=\"none\"`:  no motion here, nor anywhere inside it (`--ui-motion: none`)."
	},
	{
		name: "hiding",
		description: "Animating out:  `hidden` is already set, and the element stays on screen until it ends."
	},
	{
		name: "pending",
		description: "Defined by its `<ui-root>` before its family loaded:  no component yet, its values kept until it arrives."
	},
	{
		name: "ready",
		description: "Ready to go:  drawn with its styles (its `ready` promise has resolved)."
	}
], Li, Ri = [proto], L;
Li = [proto];
var R = class _Vocabulary {
	constructor() {
		__publicField(this, "vocabularies", /* @__PURE__ */ new Map()), __publicField(this, "localized", /* @__PURE__ */ new Map()), __publicField(this, "dictionaries", /* @__PURE__ */ new Map()), __publicField(this, "languages", []), __publicField(this, "components", /* @__PURE__ */ new Map());
	}
	register(e) {
		let t = this.vocabularies.get(e.tag);
		if (t && t !== e) throw TypeError(`Vocabulary.register():  <${e.tag}> is already registered by another vocabulary;  give one a new tag`);
		return this.vocabularies.set(e.tag, e), e;
	}
	replace(e) {
		let t = this.vocabularies.get(e.tag);
		if (this.vocabularies.set(e.tag, e), !t || t === e) return e;
		for (let [n, r] of this.localized) {
			if (r.vocabulary !== t) continue;
			let i = this.dictionaries.get(n) ?? this.dictionary;
			this.localized.set(n, this.resolve(e, r.prefix, i));
		}
		return e;
	}
	registerComponent(e, t) {
		this.register(e), this.components.set(e.tag, t);
		for (let n of this.languages) this.defineIn(n, e, t);
		return e;
	}
	get(e) {
		return this.vocabularies.get(e);
	}
	define(e = this.prefix, t = this.dictionary) {
		let n = /* @__PURE__ */ new Map();
		for (let r of this.vocabularies.values()) {
			let i = this.resolve(r, e, t), a = this.localized.get(i.tag);
			if (a && a.vocabulary !== r) throw TypeError(`Vocabulary.define():  <${i.tag}> would name both <${a.vocabulary.tag}> and <${r.tag}>;  give one of them another tag in the dictionary`);
			this.localized.set(i.tag, i), this.dictionaries.set(i.tag, t), n.set(r.tag, i);
		}
		return n;
	}
	resolve(e, t = this.prefix, n = this.dictionary) {
		let r = n.components?.[e.tag] ?? {}, i = {
			attributes: /* @__PURE__ */ new Map(),
			values: /* @__PURE__ */ new Map(),
			events: /* @__PURE__ */ new Map(),
			slots: /* @__PURE__ */ new Map(),
			parts: /* @__PURE__ */ new Map()
		}, a = {
			lang: n.lang,
			prefix: t,
			vocabulary: e,
			tag: `${t}-${n.tags?.[e.tag] ?? _Vocabulary.stem(e.tag)}`,
			attributes: /* @__PURE__ */ new Map(),
			values: /* @__PURE__ */ new Map(),
			events: /* @__PURE__ */ new Map(),
			slots: /* @__PURE__ */ new Map(),
			parts: /* @__PURE__ */ new Map(),
			names: i
		}, o = `<${a.tag}>`;
		for (let t of I.attributesFor(e)) {
			let s = r.attributes?.[t.name] ?? n.attributes?.[t.name] ?? I.translated(n.lang, t.name) ?? t.name;
			_Vocabulary.claim({
				map: a.attributes,
				name: s,
				value: t,
				what: `${o} attribute`
			}), i.attributes.set(t.name, s);
			let c = I.takesShared(e, t.name), l = _Vocabulary.resolveValues({
				spec: t,
				tag: e.tag,
				dictionary: n,
				isShared: c
			});
			l && (a.values.set(t.name, l.forward), i.values.set(t.name, l.inverse));
		}
		for (let t of e.attributes) for (let e of t.aliases ?? []) a.attributes.has(e) || a.attributes.set(e, t);
		for (let s of e.events) {
			let e = r.events?.[s.name] ?? n.events?.[s.name], c = _Vocabulary.eventName(s.name, t, e);
			_Vocabulary.claim({
				map: a.events,
				name: c,
				value: s,
				what: `${o} event`
			}), i.events.set(s.name, c);
		}
		for (let t of e.slots) {
			let e = t.name && (r.slots?.[t.name] ?? n.slots?.[t.name] ?? t.name);
			_Vocabulary.claim({
				map: a.slots,
				name: e,
				value: t,
				what: `${o} slot`
			}), i.slots.set(t.name, e);
		}
		for (let t of e.parts) {
			let e = r.parts?.[t.name] ?? n.parts?.[t.name] ?? t.name;
			_Vocabulary.claim({
				map: a.parts,
				name: e,
				value: t,
				what: `${o} part`
			}), i.parts.set(t.name, e);
		}
		return a;
	}
	defineComponents(e) {
		let { prefix: t, dictionary: n } = e, r = this.languages.find((e) => e.prefix === t);
		if (r?.dictionary !== n) {
			if (r || t === this.prefix) throw TypeError(`Vocabulary.defineComponents():  the prefix \`${t}\` is taken;  give the ${n.lang} dictionary another`);
			this.checkTags(e), this.languages.push(e);
			for (let [t, n] of this.components) this.defineIn(e, this.vocabularies.get(t), n);
		}
	}
	canonicalTagFor(e) {
		if (e.startsWith(`${this.prefix}-`)) return e;
		for (let { prefix: t, dictionary: n } of this.languages) {
			if (!e.startsWith(`${t}-`)) continue;
			let r = e.slice(t.length + 1), i = Object.entries(n.tags ?? {}).find(([, e]) => e === r)?.[0];
			if (i) return i;
		}
	}
	static dictionaryFrom(e, t) {
		let n = { ...e.tags }, r = { ...e.components };
		for (let i of t) {
			if (i.lang !== e.lang || r[i.tag]) throw TypeError(`Vocabulary.dictionaryFrom():  <${i.tag}>'s ${i.lang} names don't belong in the ${e.lang} dictionary, or come twice;  one file per tag and language`);
			n[i.tag] = i.name, r[i.tag] = i;
		}
		return {
			...e,
			tags: n,
			components: r
		};
	}
	defineIn(e, t, n) {
		let { prefix: r, dictionary: i } = e;
		i.tags?.[t.tag] && n(this.resolve(t, r, i).tag, i);
	}
	checkTags({ prefix: e, dictionary: t }) {
		let n = /* @__PURE__ */ new Map();
		for (let [r, i] of Object.entries(t.tags ?? {})) _Vocabulary.claim({
			map: n,
			name: `${e}-${i}`,
			value: r,
			what: `the ${t.lang} tag`
		});
	}
	canonicalize(e, t, n) {
		let r = this.localizedFor(e), i = r?.attributes.get(t);
		if (r && i) return {
			attribute: i.name,
			value: _Vocabulary.mapValue(i, r.values.get(i.name), n)
		};
	}
	localize(e, t, n) {
		let r = this.localizedFor(e), i = r?.names.attributes.get(t), a = r?.attributes.get(i ?? "");
		if (r && i && a) return {
			attribute: i,
			value: _Vocabulary.mapValue(a, r.names.values.get(t), n)
		};
	}
	localizedFor(e) {
		let t = this.localized.get(e);
		if (t) return t;
		let n = this.vocabularies.get(e);
		if (!n) return;
		let r = this.resolve(n);
		return r.tag === e && this.localized.set(e, r), r;
	}
	static resolveValues({ spec: e, tag: t, dictionary: n, isShared: r }) {
		let i = M.setFor(e);
		if (!i) return;
		let a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = typeof i == "string" ? n.values?.[i] : r ? I.translatedValues(n.lang, e.name) : void 0, c = n.components?.[t]?.values?.[e.name], l = r ? void 0 : n.words;
		add(M.get(i), s), e.kind === "keyOrValueAndKey" && add(M.get("booleans"), n.values?.booleans);
		for (let [e, t] of [...a]) {
			let n = withoutAccents(e);
			a.has(n) || a.set(n, t);
		}
		return {
			forward: a,
			inverse: o
		};
		function add(n, r) {
			for (let i of n) {
				if (o.has(i)) continue;
				let n = c?.[i] ?? r?.[i] ?? l?.[i] ?? i;
				_Vocabulary.claim({
					map: a,
					name: n,
					value: i,
					what: `<${t} ${e.name}> value`
				}), o.set(i, n);
			}
		}
	}
	static claim({ map: e, name: t, value: n, what: r }) {
		let i = e.get(t);
		if (i !== void 0 && i !== n) throw TypeError(`Vocabulary.resolve():  ${r} ${JSON.stringify(t)} is used twice;  translate one of them differently`);
		e.set(t, n);
	}
	static mapValue(e, t, n) {
		if (n === void 0 || !t) return n;
		let r = n.trim();
		if (e.kind !== "multiple") return t.get(r) ?? n;
		let i = r.split(/\s+/), a = [];
		for (let e = 0; e < i.length;) {
			let n = Math.min(Vi, i.length - e);
			for (; n > 1 && !t.has(i.slice(e, e + n).join(" ")); n--);
			let r = i.slice(e, e + n).join(" ");
			a.push(t.get(r) ?? r), e += n;
		}
		return a.join(" ");
	}
	static stem(e) {
		let t = e.indexOf("-");
		return t < 0 ? e : e.slice(t + 1);
	}
	static eventName(e, t, n) {
		return n === void 0 ? e.startsWith(Bi) ? `${t}-${_Vocabulary.stem(e)}` : e : `${t}-${n}`;
	}
};
L = __decoratorStart(null), __decorateElement(L, 13, "prefix", Ri, R), __decorateElement(L, 13, "dictionary", Li, R), __decoratorMetadata(L, R), __name(R, "Vocabulary"), __publicField(R, "prefix", __runInitializers(L, 8, R, "ui")), __runInitializers(L, 11, R), __publicField(R, "dictionary", __runInitializers(L, 12, R, { lang: "en" })), __runInitializers(L, 15, R);
var zi = R, Bi = "ui-", Vi = 3, Hi = "0.8.0", z = Symbol.for("spell-ui:runtime"), Ui = Hi, Wi = "@layer ui.reset, ui.tokens, ui.base, ui.components, ui.utilities, ui.theme, ui.app;", Gi = {
	none: "none",
	contents: "contents"
}, Ki = "page", qi = "ui-scroll-locked", Ji = "ui-app-stylesheet", Yi = "utilities", Xi = /* @__PURE__ */ "fade.fade-up.fade-down.fade-left.fade-right.scale.zoom.drop.browse.browse-right.fly.fly-up.fly-down.fly-left.fly-right.slide-up.slide-down.slide-left.slide-right.swing-up.swing-down.swing-left.swing-right.flip-horizontal.flip-vertical.flash.shake.bounce.tada.pulse.jiggle.glow".split("."), Zi = {
	close: "Close",
	cancel: "Cancel",
	ok: "OK",
	noResults: "No results found.",
	addItem: "Add {value}",
	loading: "Loading…",
	today: "Today",
	clear: "Clear",
	removeValue: "Remove {value}",
	selectAll: "Select all",
	more: "More",
	less: "Less",
	required: "Required",
	invalid: "Invalid value"
}, Qi = "temporal-polyfill";
async function fetchOk(e, t, n) {
	let r;
	try {
		r = await fetch(e, n);
	} catch (r) {
		throw r instanceof DOMException && r.name === "AbortError" || n?.signal?.aborted ? r : t({
			url: e,
			error: r
		});
	}
	if (!r.ok) throw t({
		url: e,
		response: r
	});
	return r;
}
async function fetchText(e, t, n) {
	let r = await fetchOk(e, t, n);
	return {
		text: await r.text(),
		response: r
	};
}
function answerOf(e) {
	return `${e.status} ${e.statusText}`.trim();
}
var ApiError = class extends Error {
	get status() {
		return this.cause?.response.status;
	}
	get response() {
		return this.cause?.response;
	}
};
ApiError.prototype.name = "ApiError";
var $i = [
	"load",
	"cross-origin",
	"file-protocol",
	"save",
	"conflict",
	"no-saver",
	"render"
], B = class SourceError extends Error {
	get kind() {
		return this.cause?.kind;
	}
	get status() {
		return this.cause?.status;
	}
	static kindFor(e, t) {
		return e instanceof SourceError && e.kind || t;
	}
	static isKind(e) {
		return $i.includes(e);
	}
};
B.prototype.name = "SourceError";
var ea = "ui-languages-changed", ta = {
	up: "up",
	down: "down",
	static: "static"
}, na;
function load() {
	let e = pageRuntime();
	return e ? e.load() : (na ??= import("./UIRuntime-DoM9kxHU.js").then(({ UIRuntime: e }) => e.instance.load(), (e) => {
		throw na = void 0, e;
	}), na);
}
var V = new Proxy({}, {
	get(e, t) {
		if (t === "load") return load;
		let n = pageRuntime();
		if (n) return Reflect.get(n, t, n);
		if (t !== "then" && typeof t != "symbol") throw notLoaded(t);
	},
	set(e, t, n) {
		let r = pageRuntime();
		if (!r) throw notLoaded(t);
		return Reflect.set(r, t, n, r);
	},
	has(e, t) {
		let n = pageRuntime();
		return n ? t in n : t === "load";
	}
});
function pageRuntime() {
	return globalThis[z];
}
function notLoaded(e) {
	return /* @__PURE__ */ Error(`UI.${String(e)}:  the UI runtime isn't loaded yet;  \`await UI.load()\` first`);
}
//#endregion
//#region src/elements/ClassBuilder.ts
var ra = [proto], ia, H = class _ClassBuilder {
	constructor(e) {
		__publicField(this, "vocabulary"), __publicField(this, "specs"), __publicField(this, "keys"), this.vocabulary = e, this.specs = [
			...byKind("size"),
			...e.attributes.filter((e) => e.kind === "color" || e.kind === "valueOnly"),
			...byKind("keyOnly").sort((e, t) => e.name < t.name ? -1 : +(e.name > t.name)),
			...e.attributes.filter((e) => e.kind === "valueAndKey" || e.kind === "keyOrValueAndKey"),
			...byKind("multiple"),
			...byKind("width"),
			...byKind("textAlign"),
			...byKind("verticalAlign")
		], this.keys = this.specs.map((e) => e.key ?? e.name.replaceAll("-", " "));
		function byKind(t) {
			return e.attributes.filter((e) => e.kind === t);
		}
		__name(byKind, "byKind");
	}
	build(e, t = {}) {
		let { grammar: n, specs: r, keys: i } = this, a = this.vocabulary.ui === !1 ? [] : [n.ui];
		for (let t = 0; t < r.length; t++) {
			let o = r[t], s = e[o.name];
			if (!s) continue;
			let c = i[t], l = s === !0 ? void 0 : _ClassBuilder.text(s);
			if (s === !0 || l !== void 0) {
				if (o.classes && l) {
					this.pushClasses(a, l, o);
					continue;
				}
				switch (o.kind) {
					case "size":
						l && l !== n.medium && a.push(l);
						break;
					case "color":
					case "valueOnly":
						l && a.push(l);
						break;
					case "keyOnly":
						a.push(c);
						break;
					case "valueAndKey":
						l && a.push(`${l} ${c}`);
						break;
					case "keyOrValueAndKey":
						a.push(l ? `${l} ${c}` : c);
						break;
					case "multiple":
						l && this.pushMultiple(a, l, c);
						break;
					case "width":
						l && this.pushWidth(a, l, o);
						break;
					case "textAlign":
						l === n.justified ? a.push(n.justified) : l && a.push(`${l} ${n.aligned}`);
						break;
					case "verticalAlign": l && a.push(`${l} ${n.aligned}`);
				}
			}
		}
		return t.extra && a.push(t.extra), a.push(t.noun ?? this.vocabulary.noun), a.join(" ");
	}
	pushClasses(e, t, n) {
		let r = n.kind === "multiple" ? t.trim().split(oa) : [t];
		for (let t of r) {
			let r = n.classes[t] ?? t;
			r && e.push(r);
		}
	}
	pushMultiple(e, t, n) {
		let r = t.trim().split(oa);
		for (let t = 0; t < r.length; t++) {
			let i = r[t];
			i = i === "large" && r[t + 1] === "screen" ? `${i} ${r[++t]}` : i.replace("-", " "), r[t + 1] === "vertically" && (i = `${i} ${r[++t]}`), e.push(`${i} ${n}`);
		}
	}
	pushWidth(e, t, n) {
		let { grammar: r } = this;
		if (t === r.equal && n.canEqual) {
			e.push(r.equalWidth);
			return;
		}
		let i = M.columns(t), a = i === void 0 ? 0 : Math.round(i), o = `<${this.vocabulary.tag} ${n.name}>`;
		if (!M.isColumnCount(a)) {
			Warnings.devWarn(o, `${JSON.stringify(t)} is not a width of 1..16 columns`);
			return;
		}
		a !== i && Warnings.devWarn(o, `${JSON.stringify(t)} is ${i.toFixed(2)} of 16 columns;  using ${a}`);
		let s = numberToWord(a), c = n.widthClass ?? r.wide;
		e.push(c ? `${s} ${c}` : s);
	}
	static text(e) {
		if (typeof e == "string") return e;
		if (typeof e == "number") return String(e);
		if (Array.isArray(e)) return e.map((e) => _ClassBuilder.text(e) ?? "").join(" ");
	}
};
ia = __decoratorStart(null), __decorateElement(ia, 13, "grammar", ra, H), __decoratorMetadata(ia, H), __name(H, "ClassBuilder"), __publicField(H, "grammar", __runInitializers(ia, 8, H, {
	ui: "ui",
	medium: "medium",
	aligned: "aligned",
	justified: "justified",
	wide: "wide",
	equal: "equal",
	equalWidth: "equal width"
})), __runInitializers(ia, 11, H);
var aa = H, SpellUISettings = class {
	static settings = {
		runtime: {
			get isLoaded() {
				return !!globalThis[z];
			},
			load: () => V.load()
		},
		words: {
			names: () => new zi(),
			classes: (e) => new aa(e),
			attributesFor: (e) => I.attributesFor(e),
			takesShared: (e, t) => I.takesShared(e, t),
			converters: N,
			valuesFor: (e) => M.setFor(e),
			text: (e, t, n) => V.i18n.t(e, t, n),
			registerVocabulary(e, t, n) {
				t === "replace" ? V.vocabulary.replace(e) : n ? V.vocabulary.registerComponent(e, n) : V.vocabulary.register(e);
			},
			registerTexts: (e, t) => V.i18n.registerDefaults(e, t)
		},
		styles: {
			registerOnce: (e) => V.styles.registerOnce(e),
			register: (e, t) => V.styles.register(e, t),
			adoptInto: (e, t) => V.styles.adoptInto(e, t)
		},
		focus: { moveOutOf: (e) => V.focus.moveOutOf(e) },
		motion: {
			defaultAnimation: _r,
			property: vr,
			get isReduced() {
				return V.browser.isReducedMotion;
			},
			isAttention: (e) => yr.isAttention(e),
			reveal: (e) => V.transitions.reveal(e),
			animate: (e, t, n) => V.transitions.animate({
				element: e,
				name: yr.runtimeNameFor(t),
				direction: n ? "in" : "out"
			})
		},
		warn: (e, t, ...n) => Warnings.warn(e, t, ...n)
	};
};
y.install(SpellUISettings.settings);
//#endregion
//#region src/elements/elements.types.ts
var oa = /\s+/, sa = ["value", "length"];
function markedPieces(e, t) {
	let n = [], r = 0;
	for (let [i, a] of t) i > r && n.push({
		text: e.slice(r, i),
		isMarked: !1
	}), n.push({
		text: e.slice(i, a),
		isMarked: !0
	}), r = a;
	return r < e.length && n.push({
		text: e.slice(r),
		isMarked: !1
	}), n;
}
var ca = ["text", "value"], U = {
	idle: "idle",
	loading: "loading",
	loaded: "loaded",
	error: "error"
}, la = "ui-loader", ua = "ui-message", da = [
	"href",
	"src",
	"action",
	"poster",
	"source"
], fa = da.map((e) => `[${e}]`).join(","), pa = "data-ui-include-", ma = 8, ha = {
	load: "sourceLoadError",
	"cross-origin": "sourceCrossOrigin",
	"file-protocol": "sourceFileProtocol",
	render: "sourceRenderError"
}, ga = 300, _a = "source", W = {
	load: "ui-loaded",
	loading: "ui-loading",
	loaded: "ui-loaded",
	change: "ui-changed",
	save: "ui-saving",
	saved: "ui-saved",
	error: Te
}, va = ["top", "bottom"], ya = /* @__PURE__ */ new Set([
	"auto",
	"scroll",
	"overlay",
	"hidden"
]), ba = .5, xa = .5, Sa = class Shorthand {
	static resolve(e, t, n = {}) {
		if (e == null || typeof e == "boolean") return;
		let r;
		if (typeof e == "string" || typeof e == "number" || Array.isArray(e)) r = t(e);
		else if (Shorthand.isPlainObject(e)) r = e;
		else {
			Warnings.devWarn("Shorthand.resolve()", `expected string | number | array | object, got ${typeof e}`);
			return;
		}
		let i = n.defaults ?? {}, a = typeof n.overrides == "function" ? n.overrides({
			...i,
			...r
		}) : n.overrides ?? {}, o = {
			...i,
			...r,
			...a
		}, s = Shorthand.mergeClasses(i.class, r.class, a.class);
		s && (o.class = s);
		let c = Shorthand.mergeStyles(i.style, r.style, a.style);
		return c !== void 0 && (o.style = c), o;
	}
	static mergeClasses(...e) {
		let t = /* @__PURE__ */ new Set();
		for (let n of e) if (n) for (let e of n.split(oa)) e && t.add(e);
		return t.size ? [...t].join(" ") : void 0;
	}
	static mergeStyles(...e) {
		let t = e.filter((e) => e !== void 0 && e !== "");
		if (t.length) return t.every((e) => typeof e == "object") ? Object.assign({}, ...t) : t.filter((e) => typeof e == "string").join("; ");
	}
	static isPlainObject(e) {
		if (typeof e != "object" || !e) return !1;
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	}
	static map = {
		content: (e) => ({ content: e }),
		name: (e) => ({ name: e }),
		src: (e) => ({ src: e }),
		type: (e) => ({ type: e })
	};
}, Ca, wa, Ta, Ea = [proto], G;
Ta = [proto], wa = [proto], Ca = [lazy];
var K = class _NativeFallback {
	constructor({ domElement: e, root: t, error: n, internals: r }) {
		__runInitializers(G, 5, this), __publicField(this, "domElement"), __publicField(this, "root"), __publicField(this, "error"), __publicField(this, "internals"), __publicField(this, "formInternals"), __publicField(this, "disposers", []), this.domElement = e, this.root = t, this.error = n, this.internals = r, this.formInternals = e.constructor.formAssociated ? r : void 0;
		let { vocabularies: i } = this;
		i.length && (this.vocabulary = i.find(({ tag: t }) => t === e.localName) ?? i[0]);
	}
	static render(e) {
		let t = new this(e);
		return e.root.replaceChildren(...t.build()), t.sync(), e.internals?.states.add(Ee), {
			dispose: /* @__PURE__ */ __name(() => t.dispose(), "dispose"),
			degraded: t.degraded
		};
	}
	dispose() {
		for (let e of this.disposers.splice(0)) e();
	}
	attr(e) {
		return this.domElement.getAttribute(e) ?? void 0;
	}
	flag(e) {
		return N.boolean(this.domElement.getAttribute(e), e);
	}
	classes(e) {
		let t = {}, { valueNamed: n } = this.domElement;
		for (let e of this.vocabulary.attributes) {
			if (n) {
				t[e.name] = n.call(this.domElement, e.name);
				continue;
			}
			let r = this.domElement.getAttribute(e.name) ?? _NativeFallback.defaultText(e.default);
			r !== void 0 && (e.kind === "keyOnly" ? t[e.name] = N.boolean(r, e.name) : e.kind === "keyOrValueAndKey" ? t[e.name] = N.keyOrValue(r, void 0) : t[e.name] = r);
		}
		return this.builder.build(t, { extra: e });
	}
	get builder() {
		return new aa(this.vocabulary);
	}
	form() {
		return this.formInternals?.form ?? this.domElement.closest("form") ?? void 0;
	}
	sync() {}
	syncForm({ value: e, control: t, valueMissing: n }) {
		let r = this.formInternals;
		if (!r) return;
		let i = this.domElement.getAttribute("name");
		if (!i || e === void 0) r.setFormValue(null);
		else if (typeof e == "string") r.setFormValue(e);
		else {
			let t = new FormData();
			for (let n of e) t.append(i, n);
			r.setFormValue(t);
		}
		t && (n === void 0 ? t.validity.valid ? r.setValidity({}) : r.setValidity(t.validity, t.validationMessage, t) : r.setValidity(n ? { valueMissing: n } : {}, t.validationMessage, t));
	}
	create(e, t = {}, ...n) {
		let r = this.domElement.ownerDocument.createElement(e);
		for (let [e, n] of Object.entries(t)) n != null && n !== !1 && r.setAttribute(e, n === !0 ? "" : n);
		return r.append(...n), r;
	}
	slot(e) {
		return this.create("slot", {}, ...e ? [e] : []);
	}
	decorate(e, t, ...n) {
		this.vocabulary.parts.some((e) => e.name === t) || Warnings.devWarn(`<${this.vocabulary.tag}> fallback`, `"${t}" is not a part in its vocabulary`), e.setAttribute("part", [t, ...n].join(" "));
		for (let { name: t, value: n } of this.domElement.attributes) t.startsWith("aria-") && e.setAttribute(t, n);
		return this.vocabulary.attributes.find((e) => e.name === Oa)?.kind === "keyOnly" && N.boolean(this.domElement.getAttribute(Oa), Oa) && e.setAttribute("aria-busy", "true"), e;
	}
	nameFromPlaceholder(e) {
		let t = this.domElement.getAttribute(ka);
		!e.hasAttribute("aria-label") && t && e.setAttribute("aria-label", t);
	}
	send(e, t) {
		let n = this.vocabulary.events.find((t) => t.name === e), r = this.domElement.constructor.tagSetup?.elementDefinition, i = new CustomEvent(r?.event(e) ?? e, {
			bubbles: !0,
			composed: !0,
			cancelable: !!n?.cancelable,
			detail: t
		});
		return this.domElement.dispatchEvent(i);
	}
	listen(e, t, n) {
		e.addEventListener(t, n), this.disposers.push(() => e.removeEventListener(t, n));
	}
	static defaultText(e) {
		if (e != null && e !== !1) return e === !0 ? "" : String(e);
	}
};
G = __decoratorStart(null), __decorateElement(G, 2, "builder", Ca, K), __decorateElement(G, 13, "vocabulary", Ea, K), __decorateElement(G, 13, "vocabularies", Ta, K), __decorateElement(G, 13, "degraded", wa, K), __decoratorMetadata(G, K), __name(K, "NativeFallback"), __publicField(K, "vocabulary", __runInitializers(G, 8, K, {
	tag: "",
	noun: "",
	attributes: [],
	events: [],
	slots: [],
	parts: [],
	states: [],
	texts: []
})), __runInitializers(G, 11, K), __publicField(K, "vocabularies", __runInitializers(G, 12, K, [])), __runInitializers(G, 15, K), __publicField(K, "degraded", __runInitializers(G, 16, K, [])), __runInitializers(G, 19, K);
var Da = K, Oa = "loading", ka = "placeholder", Aa = class StickyWatch {
	stuckTo;
	onReport;
	box;
	scrollRoot;
	constructor(e) {
		this.onReport = e;
	}
	observe(e, t) {
		let { domElement: n, top: r, bottom: i, box: a } = e;
		this.box = a;
		let o = StickyWatch.scrollContainer(n);
		this.scrollRoot = o ?? n.ownerDocument.documentElement;
		let s = new IntersectionObserver(() => this.measure(e, o, t), {
			root: o ?? n.ownerDocument,
			rootMargin: `${-t.offset}px 0px ${-(t.bottomOffset ?? 0)}px 0px`,
			threshold: [0, 1]
		});
		for (let e of [
			r,
			i,
			a
		]) e && s.observe(e);
		let c = new ResizeObserver(() => {
			this.stuckTo && this.scrollRoot && StickyWatch.reserve(this.scrollRoot);
		});
		return c.observe(a), () => {
			s.disconnect(), c.disconnect();
		};
	}
	reset() {
		this.report(ja);
	}
	measure(e, t, n) {
		let { domElement: r, top: i, bottom: a, box: o } = e, s = StickyWatch.area(t, r.ownerDocument), c = s.top + n.offset, l = s.bottom - (n.bottomOffset ?? 0), u = o.getBoundingClientRect(), d, f = !1;
		i.getBoundingClientRect().top < c - .5 ? u.top < c - .5 ? f = !0 : d = "top" : n.pushing && a && a.getBoundingClientRect().top > l + .5 && (u.bottom > l + .5 ? f = !0 : d = "bottom"), this.report({
			edge: d,
			isBound: f
		}), d && this.scrollRoot && StickyWatch.reserve(this.scrollRoot);
	}
	report({ edge: e, isBound: t }) {
		let n = this.stuckTo;
		e !== n && (this.stuckTo = e, this.trackStuck()), this.onReport({
			edge: e,
			isBound: t,
			previous: n
		});
	}
	trackStuck() {
		let e = this.scrollRoot;
		if (!e) return;
		let t = StickyWatch.stuckIn.get(e);
		this.stuckTo ? (t || StickyWatch.stuckIn.set(e, t = /* @__PURE__ */ new Set()), t.add(this)) : t && (t.delete(this), t.size || StickyWatch.stuckIn.delete(e)), StickyWatch.reserve(e);
	}
	static reserve(e) {
		let t = e.ownerDocument, n = StickyWatch.area(e === t.documentElement ? void 0 : e, t), r = (n.bottom - n.top) * ba, i = e.clientWidth * ba, a = 0, o = 0;
		for (let t of StickyWatch.stuckIn.get(e) ?? []) {
			let e = t.box?.getBoundingClientRect();
			!e || e.height > r || e.width < i || (t.stuckTo === "top" ? a = Math.max(a, e.bottom - n.top) : t.stuckTo === "bottom" && (o = Math.max(o, n.bottom - e.top)));
		}
		StickyWatch.setPadding(e, "scroll-padding-top", a), StickyWatch.setPadding(e, "scroll-padding-bottom", o);
	}
	static setPadding(e, t, n) {
		let r = n > 0 ? `${Math.ceil(n)}px` : "";
		e.style.getPropertyValue(t) !== r && (r ? e.style.setProperty(t, r) : e.style.removeProperty(t));
	}
	static area(e, t) {
		if (!e) return {
			top: 0,
			bottom: t.documentElement.clientHeight
		};
		let n = e.getBoundingClientRect().top + e.clientTop;
		return {
			top: n,
			bottom: n + e.clientHeight
		};
	}
	static scrollContainer(e) {
		let t = e.ownerDocument, n = e;
		for (; n;) {
			let e = flatParentFor(n);
			if (!e || e === t.body || e === t.documentElement) return;
			if (ya.has(getComputedStyle(e).overflowY)) return e;
			n = e;
		}
	}
	static stuckIn = /* @__PURE__ */ new Map();
}, ja = {
	edge: void 0,
	isBound: !1
}, Ma = [
	"fa7-free",
	"fa7-brands",
	"fomantic"
], Na = "fa7-free", Pa = "pack.js", Fa = ":", Ia = class IconName {
	static normalize(e) {
		return e.toLowerCase().replace(Ra, " ").trim();
	}
	static fromKey(e) {
		return IconName.normalize(IconName.fileOf(e));
	}
	static fileOf(e) {
		return e.slice(e.lastIndexOf("/") + 1);
	}
	static labelOf(e, t) {
		let n = IconName.fromKey(e);
		return t.includes(n) ? n : t[0] ?? n;
	}
	static aliases(e) {
		return e === void 0 ? [] : (Array.isArray(e) ? e : [e]).map(IconName.normalize).filter(Boolean);
	}
	static split(e) {
		let t = e.indexOf(":");
		return t < 0 ? { name: IconName.normalize(e) } : {
			prefix: e.slice(0, t).trim().toLowerCase(),
			name: IconName.normalize(e.slice(t + 1))
		};
	}
	static claim(e) {
		let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
		for (let [r, i] of e) {
			for (let e of IconName.aliases(i)) t.has(e) || t.set(e, r);
			let e = IconName.fromKey(r);
			e && !n.has(e) && n.set(e, r);
		}
		for (let [e, r] of t) n.set(e, r);
		return n;
	}
	static search(e, t, { names: n, terms: r }) {
		let i = IconName.normalize(t);
		if (!i) return e;
		let a = [];
		for (let t of e) {
			let e = IconName.rankOf(n(t), r(t), i);
			e < La && a.push({
				item: t,
				rank: e
			});
		}
		return a.sort((e, t) => e.rank - t.rank).map((e) => e.item);
	}
	static rankOf(e, t, n) {
		let r = La;
		for (let t of e) {
			if (t === n) return 0;
			t.startsWith(n) ? r = Math.min(r, 1) : t.includes(n) && (r = Math.min(r, 2));
		}
		return r < La ? r : t.some((e) => IconName.normalize(e).includes(n)) ? 3 : La;
	}
}, La = 4, Ra = /[\s_-]+/g, za = class BuiltInPacks {
	static base = import.meta.url;
	static has(e) {
		return Ma.includes(e);
	}
	static url(e, t = BuiltInPacks.base) {
		return new URL(`icon-packs/${e}/${Pa}`, t).href;
	}
}, Ba = "@layer ui.components.parts.types{:host{display:contents}.content{--_ui-part:content}.header{--_ui-part:header}.description{--_ui-part:description}.meta{--_ui-part:meta}.extra{--_ui-part:extra}.actions{--_ui-part:actions}.title{--_ui-part:title}.summary{--_ui-part:summary}.date{--_ui-part:date}.author{--_ui-part:author}.avatar{--_ui-part:avatar}.detail{--_ui-part:detail}.value{--_ui-part:value}.avatar:not(.images) img,.avatar:not(.images) ::slotted(img){object-fit:cover;width:100%;height:100%;display:block}.ui.header{--_ui-header-color:var(--ui-header-color,var(--ui-text-dark));--_ui-header-font-weight:var(--ui-header-font-weight,var(--ui-font-weight-bold));--_ui-header-line-height:var(--ui-header-line-height,var(--ui-line-height-heading));--_ui-header-offset:var(--ui-header-offset,calc((var(--ui-line-height-heading) - 1) * .5em));--_ui-header-margin-top:var(--ui-header-margin-top,calc(var(--ui-font-size) * 2));--_ui-header-margin-bottom:var(--ui-header-margin-bottom,var(--ui-font-size));--_ui-header-icon-size:var(--ui-header-icon-size,1.5em);--_ui-header-icon-margin:var(--ui-header-icon-margin,calc(var(--ui-font-size) * .75));--_ui-header-image-width:var(--ui-header-image-width,2.5em);--_ui-header-sub-color:var(--ui-header-sub-color,var(--ui-text-muted));--_ui-header-sub-font-size:var(--ui-header-sub-font-size,clamp(calc(var(--ui-font-size) * .92857), .78em, calc(var(--ui-font-size) * 1.42857)));--_ui-header-sub-margin:var(--ui-header-sub-margin,0);--_ui-header-sub-heading-ratio:var(--ui-header-sub-heading-ratio,.85714);--_ui-header-sub-heading-color:var(--ui-header-sub-heading-color,inherit);--_ui-header-icon-header-size:var(--ui-header-icon-header-size,3em);--_ui-header-icon-header-margin:var(--ui-header-icon-header-margin,calc(var(--ui-font-size) * .5));--_ui-header-dividing-padding:var(--ui-header-dividing-padding,.21428em);--_ui-header-dividing-border:var(--ui-header-dividing-border,var(--ui-border-width) solid var(--ui-border-color));--_ui-header-colored-border-width:var(--ui-header-colored-border-width,2px);--_ui-header-block-background:var(--ui-header-block-background,var(--ui-surface-strong));--_ui-header-block-border:var(--ui-header-block-border,var(--ui-border-width) solid var(--ui-border-color-strong));--_ui-header-block-padding:var(--ui-header-block-padding,.78571em 1em);--_ui-header-attached-background:var(--ui-header-attached-background,var(--ui-surface));--_ui-header-floated-margin:var(--ui-header-floated-margin,.5em);--_ui-header-disabled-opacity:var(--ui-header-disabled-opacity,var(--ui-disabled-opacity));--_ui-header-size-mini:var(--ui-header-size-mini,.85714);--_ui-header-size-tiny:var(--ui-header-size-tiny,1);--_ui-header-size-small:var(--ui-header-size-small,1.07142);--_ui-header-size-medium:var(--ui-header-size-medium,1.28571);--_ui-header-size-large:var(--ui-header-size-large,1.71428);--_ui-header-size-big:var(--ui-header-size-big,1.85714);--_ui-header-size-huge:var(--ui-header-size-huge,2);--_ui-header-size-massive:var(--ui-header-size-massive,2.28571);--_ui-header-h1:var(--ui-header-h1,2);--_ui-header-h2:var(--ui-header-h2,1.71428);--_ui-header-h3:var(--ui-header-h3,1.28571);--_ui-header-h4:var(--ui-header-h4,1.07142);--_ui-header-h5:var(--ui-header-h5,1);--_ui-header-h6:var(--ui-header-h6,.85714);--ui-size-mini:calc(var(--_ui-header-size-mini) / var(--_ui-header-size-medium));--ui-size-tiny:calc(var(--_ui-header-size-tiny) / var(--_ui-header-size-medium));--ui-size-small:calc(var(--_ui-header-size-small) / var(--_ui-header-size-medium));--ui-size-large:calc(var(--_ui-header-size-large) / var(--_ui-header-size-medium));--ui-size-big:calc(var(--_ui-header-size-big) / var(--_ui-header-size-medium));--ui-size-huge:calc(var(--_ui-header-size-huge) / var(--_ui-header-size-medium));--ui-size-massive:calc(var(--_ui-header-size-massive) / var(--_ui-header-size-medium));--_ui-header-layout:text;--_ui-icon-owner-size:var(--_ui-header-icon-size);--_ui-icon-owner-margin:0 var(--_ui-header-icon-margin) 0 0;--_ui-icon-owner-align:middle;--_ui-icon-owner-display:inline-flex;box-sizing:border-box;margin:var(--_header-margin-top,calc(var(--_ui-header-margin-top) - var(--_ui-header-offset))) 0 var(--_header-margin-bottom,var(--_ui-header-margin-bottom));color:var(--ui-color-header,var(--_ui-header-color));font-family:var(--ui-font-family-heading);font-size:calc(var(--_header-base,1em * var(--_ui-header-size-medium)) * var(--ui-scale,1));font-weight:var(--_ui-header-font-weight);line-height:var(--_ui-header-line-height);text-transform:none;border:none;padding:0;display:block}.ui.header:not(.mini,.tiny,.small,.medium,.large,.big,.huge,.massive){--ui-scale:1}.ui.header>slot{--ui-scale:initial}.ui.header:first-child{--_header-margin-top:calc(var(--_ui-header-offset) * -1)}.ui.header:last-child{--_header-margin-bottom:0}:host(:not(:first-child))>.ui.header{--_header-margin-top:initial}:host(:not(:last-child))>.ui.header{--_header-margin-bottom:initial}a.ui.header:hover{color:var(--ui-color-hover,var(--ui-link-hover))}h1.ui.header:not(.mini,.tiny,.small,.medium,.large,.big,.huge,.massive,.sub){--_header-base:calc(var(--ui-font-size) * var(--_ui-header-h1))}h2.ui.header:not(.mini,.tiny,.small,.medium,.large,.big,.huge,.massive,.sub){--_header-base:calc(var(--ui-font-size) * var(--_ui-header-h2))}h3.ui.header:not(.mini,.tiny,.small,.medium,.large,.big,.huge,.massive,.sub){--_header-base:calc(var(--ui-font-size) * var(--_ui-header-h3))}h4.ui.header:not(.mini,.tiny,.small,.medium,.large,.big,.huge,.massive,.sub){--_header-base:calc(var(--ui-font-size) * var(--_ui-header-h4))}h5.ui.header:not(.mini,.tiny,.small,.medium,.large,.big,.huge,.massive,.sub){--_header-base:calc(var(--ui-font-size) * var(--_ui-header-h5))}h6.ui.header:not(.mini,.tiny,.small,.medium,.large,.big,.huge,.massive,.sub){--_header-base:calc(var(--ui-font-size) * var(--_ui-header-h6))}.ui.header>img,.ui.header ::slotted(img){width:var(--_ui-header-image-width);height:auto;margin-top:calc(var(--_ui-header-offset) * -1);vertical-align:middle;margin-inline-end:var(--_ui-header-icon-margin);display:inline-block}.ui.sub.header{--_header-base:calc(1em * var(--_ui-header-sub-heading-ratio));--_header-margin-bottom:.14285em;color:var(--ui-color-header,var(--_ui-header-sub-heading-color));text-transform:uppercase;padding:0}.ui.icon.header{--_ui-header-layout:icon;--_ui-icon-owner-size:var(--_ui-header-icon-header-size);--_ui-icon-owner-display:flex;--_ui-icon-owner-margin:0 auto var(--_ui-header-icon-header-margin);--_ui-icon-owner-align:baseline;margin-top:var(--_ui-header-margin-top);text-align:center;display:inline-block}.ui.icon.header>img,.ui.icon.header ::slotted(img){margin:0 auto var(--_ui-header-icon-header-margin);display:block}.ui.icon.header:first-child{margin-top:0}:host(:not(:first-child))>.ui.icon.header{margin-top:var(--_ui-header-margin-top)}.ui.icon.header:after{content:\"\";clear:both;visibility:hidden;height:0;display:block}}@layer ui.components.parts.content{:host(:state(in-header))>.content,.in-header.content{vertical-align:top;display:inline-block}:host(:state(in-header):not(:first-child))>.content,.in-header.content:not(:first-child){vertical-align:middle}:host(:state(in-header))>.header,.in-header.header{margin:var(--_ui-header-sub-margin,var(--ui-header-sub-margin,0));color:var(--_ui-header-sub-color,var(--ui-header-sub-color,var(--ui-text-muted)));font-size:var(--_ui-header-sub-font-size,var(--ui-header-sub-font-size,1em));font-weight:var(--ui-font-weight-normal);padding:0;line-height:1.2em;display:block}:host(:state(in-card))>.content,.in-card.content{padding:var(--ui-card-content-padding,1em);border:none;border-top:var(--ui-border-width) solid var(--ui-card-divider-color,var(--ui-border-color-internal));box-shadow:none;background:0 0;border-radius:0;flex-grow:1;margin:0;font-size:1em}:host(:state(in-card):first-child)>.content,.in-card.content:first-child{border-top:none}@container style(--_ui-card-leading:1){:host(:state(in-card):first-child)>.content{border-top:var(--ui-border-width) solid var(--ui-card-divider-color,var(--ui-border-color-internal))}}:host(:state(in-card))>.content:after,.in-card.content:after{content:\" \";clear:both;visibility:hidden;height:0;display:block;overflow:hidden}:host(:state(in-card))>.header,.in-card.header{margin-top:calc((1 - var(--ui-line-height)) * .5em);color:var(--ui-card-header-color,var(--ui-text-dark));font-family:var(--ui-font-family-heading);font-size:var(--ui-card-header-font-size,1.28571em);font-weight:var(--ui-font-weight-bold);line-height:var(--ui-line-height-heading);display:block}:host(:state(in-card))>a.header,a.in-card.header{text-decoration:none}:host(:state(in-card))>a.header:hover,a.in-card.header:hover{color:var(--ui-link-hover)}:host(:state(in-card))>.meta,.in-card.meta{color:var(--ui-card-meta-color,var(--ui-text-light));font-size:1em}:host(:state(in-card))>.meta>::slotted(*),.in-card.meta>*{margin-inline-end:var(--ui-card-meta-spacing,.3em)}:host(:state(in-card))>.meta>::slotted(:last-child),.in-card.meta>:last-child{margin-inline-end:0}:host(:state(in-card))>.meta>::slotted(a),.in-card.meta>a{color:var(--ui-text-light);text-decoration:none}:host(:state(in-card))>.meta>::slotted(a:hover),.in-card.meta>a:hover{color:var(--ui-text-color)}:host(:state(in-card))>.description,.in-card.description{clear:both;color:var(--ui-card-description-color,oklch(from var(--ui-ink) l c h / .68))}:host(:state(in-card):not(:first-child))>.description,.in-card.description:not(:first-child){margin-top:var(--ui-card-description-distance,.5em)}:host(:state(in-card))>.extra,.in-card.extra{width:auto;max-width:100%;min-height:0;padding:var(--ui-card-extra-padding,.75em 1em);border-top:var(--ui-border-width) solid var(--ui-card-extra-divider,oklch(from var(--ui-ink) l c h / .05));box-shadow:none;color:var(--ui-card-extra-color,var(--ui-text-light));transition:color var(--ui-duration-fast) var(--ui-ease);background:0 0;flex-grow:0;margin:0;position:static}:host(:state(in-card))>.extra>::slotted(a),.in-card.extra>a{color:var(--ui-text-unselected);text-decoration:none}:host(:state(in-card))>.extra>::slotted(a:hover),.in-card.extra>a:hover{color:var(--ui-link-hover)}:host(:state(in-card))>.avatar,.in-card.avatar{width:var(--ui-card-avatar-size,2em);height:var(--ui-card-avatar-size,2em);border-radius:var(--ui-radius-circle);vertical-align:middle;display:inline-block;overflow:hidden}:host(:state(in-item))>.content,.in-item.content{box-shadow:none;color:var(--ui-item-content-color,var(--ui-text-color));background:0 0;border:none;border-radius:0;flex:auto;margin:0;padding:0;font-size:1em;display:block}:host(:state(in-item))>.content:after,.in-item.content:after{content:\" \";clear:both;visibility:hidden;height:0;display:block;overflow:hidden}:host(:state(in-item):not(:first-child))>.content,.in-item.content:not(:first-child){width:auto;min-width:0;align-self:start;padding-inline-start:var(--_ui-item-content-distance,1.5em)}:host(:state(in-item))>.header,.in-item.header{margin:calc((1 - var(--ui-line-height)) * .5em) 0 0;color:var(--ui-item-header-color,var(--ui-text-dark));font-family:var(--ui-font-family-heading);font-size:var(--ui-item-header-font-size,1.28571em);font-weight:var(--ui-font-weight-bold);display:inline-block}:host(:state(in-item))>a.header:hover,a.in-item.header:hover{color:var(--ui-link-hover)}:host(:state(in-item))>.description,.in-item.description{max-width:none;margin-top:var(--ui-item-description-distance,.6em);color:var(--ui-item-description-color,var(--ui-text-color));font-size:1em;line-height:var(--ui-line-height)}:host(:state(in-item))>.meta,.in-item.meta{color:var(--ui-item-meta-color,var(--ui-text-muted));margin:.5em 0;font-size:1em;line-height:1em}:host(:state(in-item))>.meta>::slotted(*),.in-item.meta>*{margin-inline-end:var(--ui-item-meta-spacing,.3em)}:host(:state(in-item))>.meta>::slotted(:last-child),.in-item.meta>:last-child{margin-inline-end:0}:host(:state(in-item))>.extra,.in-item.extra{width:100%;box-shadow:none;color:var(--ui-item-extra-color,var(--ui-text-light));transition:color var(--ui-duration-fast) var(--ui-ease);background:0 0;border-top:none;margin:.5em 0 0;padding:0;display:block;position:relative}:host(:state(in-item))>.extra>::slotted(*),.in-item.extra>*{margin:.25em .5em .25em 0}:host(:state(in-item))>.extra:after,.in-item.extra:after{content:\" \";clear:both;visibility:hidden;height:0;display:block;overflow:hidden}:host(:state(in-item))>.avatar,.in-item.avatar{border-radius:var(--ui-radius-circle);display:inline-block;overflow:hidden}:host(:is(:state(in-card),:state(in-item)))>.description>::slotted(p),:is(.in-card,.in-item).description>p{margin:0 0 .5em}:host(:is(:state(in-card),:state(in-item)))>.description>::slotted(p:last-child),:is(.in-card,.in-item).description>p:last-child{margin-bottom:0}:host(:state(in-feed))>.content,.in-feed.content{text-align:start;overflow-wrap:break-word;flex:auto;align-self:stretch;display:block}:host(:state(in-feed):not(:first-child))>.content,.in-feed.content:not(:first-child){margin:.5em 0 .35714em 1.14285em}:host(:state(in-feed))>.summary,.in-feed.summary{color:var(--ui-feed-summary-color,var(--ui-text-color));font-size:1em;font-weight:var(--ui-font-weight-bold);margin:0}:host(:state(in-feed))>.date,.in-feed.date{color:var(--ui-feed-date-color,var(--ui-text-light));font-size:1em;font-style:normal;font-weight:var(--ui-font-weight-normal);margin:-.5em 0 0;padding:0}:host(:state(in-feed))>.author,.in-feed.author{font-weight:var(--ui-font-weight-bold);vertical-align:baseline;margin-inline-end:0;display:inline-block}:host(:state(in-feed))>a.author,a.in-feed.author{color:var(--ui-feed-author-color,var(--ui-link))}:host(:state(in-feed))>a.author:hover,a.in-feed.author:hover{color:var(--ui-link-hover)}:host(:state(in-feed))>.extra,.in-feed.extra{color:var(--ui-feed-extra-color,var(--ui-text-color));background:0 0;margin:.5em 0 0;padding:0}:host(:state(in-feed))>.extra.text,.in-feed.extra.text{max-width:var(--ui-feed-extra-text-width,500px);font-size:1em;line-height:var(--ui-line-height);border-inline-start:none;padding:0}:host(:state(in-feed))>.meta,.in-feed.meta{box-shadow:none;color:var(--ui-feed-meta-color,var(--ui-text-muted));background:0 0;border:none;border-radius:0;margin:.5em 0 0;padding:0;font-size:.85714em;display:inline-block}:host(:state(in-feed))>.meta>::slotted(*),.in-feed.meta>*{margin-inline-start:.75em;position:relative}:host(:state(in-feed))>.meta>::slotted(:first-child),.in-feed.meta>:first-child{margin-inline-start:0}:host(:state(in-feed))>.meta>::slotted(a),.in-feed.meta>a{color:var(--ui-feed-meta-action-color,var(--ui-text-light));cursor:pointer;transition:color var(--ui-duration-fast) var(--ui-ease)}:host(:state(in-feed))>.meta>::slotted(a:hover),.in-feed.meta>a:hover{color:var(--ui-text-selected)}:host(:state(in-comment))>.avatar,.in-comment.avatar{float:left;width:var(--ui-comment-avatar-width,2.5em);height:auto;margin:.2em 0 0;display:block}:host(:state(in-comment))>.avatar img,:host(:state(in-comment))>.avatar ::slotted(img),.in-comment.avatar img{border-radius:var(--ui-radius-s);margin:0 auto}:host(:state(in-comment))>.content,.in-comment.content{display:block}:host(:state(in-comment):not(:first-child))>.content,.in-comment.content:not(:first-child){margin-inline-start:var(--ui-comment-content-margin,3.5em)}:host(:state(in-comment))>.content:is(:hover,:focus-within),.in-comment.content:is(:hover,:focus-within){--_ui-comment-hover:1}:host(:state(in-comment))>.author,.in-comment.author{color:var(--ui-comment-author-color,var(--ui-text-color));font-size:1em;font-weight:var(--ui-font-weight-bold)}:host(:state(in-comment))>a.author:hover,a.in-comment.author:hover{color:var(--ui-link-hover)}:host(:state(in-comment))>.meta,.in-comment.meta{color:var(--ui-comment-meta-color,var(--ui-text-light));margin-inline-start:.5em;font-size:.875em;display:inline-block}:host(:state(in-comment))>.meta>::slotted(*),.in-comment.meta>*{margin:0 .5em 0 0;display:inline-block}:host(:state(in-comment))>.meta>::slotted(:last-child),.in-comment.meta>:last-child{margin-inline-end:0}:host(:state(in-comment))>.description,.in-comment.description{color:var(--ui-comment-text-color,var(--ui-text-color));overflow-wrap:break-word;margin:.25em 0 .5em;font-size:1em;line-height:1.3}:host(:state(in-comment))>.actions,.in-comment.actions{font-size:.875em}:host(:state(in-comment))>.actions>::slotted(:is(a,button)),.in-comment.actions>:is(a,button){color:var(--ui-comment-action-color,var(--ui-text-unselected));font:inherit;cursor:pointer;background:0 0;border:none;margin:0 .75em 0 0;padding:0;display:inline-block}:host(:state(in-comment))>.actions>::slotted(:is(a,button):last-child),.in-comment.actions>:is(a,button):last-child{margin-inline-end:0}:host(:state(in-comment))>.actions>::slotted(:is(a,button):is(:hover,.active)),.in-comment.actions>:is(a,button):is(:hover,.active){color:var(--ui-text-hovered)}:host(:state(in-modal))>.header,.in-modal.header{border-bottom:var(--ui-border-width) solid var(--ui-border-color);background:var(--_ui-modal-header-background,var(--ui-surface));box-shadow:none;color:var(--_ui-modal-header-color,var(--ui-text-dark));font-family:var(--ui-font-family-heading);font-size:var(--_ui-modal-header-size,1.42857em);font-weight:var(--ui-font-weight-bold);line-height:var(--ui-line-height-heading);margin:0;padding:.875em 1.05em;display:block}:host(:state(in-modal))>.content,.in-modal.content{width:100%;padding:var(--ui-modal-content-padding,1.5em);background:var(--_ui-modal-content-background,var(--ui-surface));font-size:1em;line-height:1.4;display:block}:host(:state(in-modal))>.content.image,.in-modal.content.image{flex-direction:row;display:flex}:host(:state(in-modal))>.content.scrolling,.in-modal.content.scrolling{max-height:var(--ui-modal-scrolling-height,calc(80dvh - 10em));overscroll-behavior:none;overflow:auto}:host(:state(in-modal))>.description,.in-modal.description{flex:1 0 auto;align-self:start;min-width:0;display:block}:host(:state(in-modal):not(:first-child))>.description,.in-modal.description:not(:first-child){width:auto;min-width:auto;flex:auto;padding-inline-start:var(--ui-modal-description-distance,2em)}:host(:state(in-modal))>.actions,.in-modal.actions{padding:var(--ui-modal-actions-padding,1em);border-top:var(--ui-border-width) solid var(--ui-border-color);background:var(--_ui-modal-actions-background,var(--ui-surface-muted));text-align:right}:host(:state(in-modal))>.actions>::slotted(*),.in-modal.actions>*{margin-inline-start:var(--ui-modal-button-distance,.75em)}:host(:state(in-modal):first-child)>:is(.header,.content,.actions),.in-modal:is(.header,.content,.actions):first-child{border-start-start-radius:var(--_ui-modal-radius,var(--ui-radius));border-start-end-radius:var(--_ui-modal-radius,var(--ui-radius))}:host(:state(in-modal):last-child)>:is(.header,.content,.actions),.in-modal:is(.header,.content,.actions):last-child{border-end-end-radius:var(--_ui-modal-radius,var(--ui-radius));border-end-start-radius:var(--_ui-modal-radius,var(--ui-radius))}@media (width<768px){:host(:state(in-modal))>.header,.in-modal.header{padding:.525em .7em}:host(:state(in-modal))>.content,.in-modal.content{padding:1em;display:block}:host(:state(in-modal))>.content.image,.in-modal.content.image{flex-direction:column}:host(:state(in-modal))>.description,.in-modal.description,:host(:state(in-modal):not(:first-child))>.description,.in-modal.description:not(:first-child){width:100%;margin:0;padding:1em 0;display:block}:host(:state(in-modal))>.actions,.in-modal.actions{padding:1em 1em 0}:host(:state(in-modal))>.actions>::slotted(*),.in-modal.actions>*{margin-bottom:1em}}:host(:state(in-flyout))>.header,.in-flyout.header{border-bottom:var(--ui-border-width) solid var(--ui-border-color);background:var(--ui-flyout-header-background,var(--_ui-flyout-background,var(--ui-surface)));color:var(--_ui-flyout-header-color,var(--ui-text-dark));font-family:var(--ui-font-family-heading);font-size:var(--ui-flyout-header-size,1.28571em);font-weight:var(--ui-font-weight-bold);line-height:var(--ui-line-height-heading);margin:0;padding:1.25em 1.5em;display:block}:host(:state(in-flyout))>.content,.in-flyout.content{box-sizing:border-box;width:100%;padding:var(--ui-flyout-content-padding,1.5em);background:var(--ui-flyout-content-background,var(--_ui-flyout-background,var(--ui-surface)));flex:1 0 auto;font-size:1em;line-height:1.4;display:block}:host(:state(in-flyout))>.actions,.in-flyout.actions{padding:var(--ui-flyout-actions-padding,1em);border-top:var(--ui-border-width) solid var(--ui-border-color);background:var(--_ui-flyout-actions-background,var(--ui-surface-muted));text-align:right;flex:none}:host(:state(in-flyout))>.actions>::slotted(*),.in-flyout.actions>*{margin-inline-start:var(--ui-flyout-button-distance,.75em)}:host(:state(in-message))>.header,.in-message.header{margin:calc((1 - var(--ui-line-height-heading)) * .5em) 0 0;color:var(--ui-color-header,inherit);font-family:var(--ui-font-family-heading);font-size:var(--_ui-message-header-font-size,1.14285em);font-weight:var(--ui-font-weight-bold);display:block}:host(:state(in-list))>.content,.in-list.content{color:var(--_ui-list-content-color,var(--ui-text-color));line-height:1.14285em}:host(:state(in-list):not(:first-child))>.content,.in-list.content:not(:first-child){width:100%;padding:0 0 0 var(--_ui-list-content-distance,.5em);vertical-align:var(--_ui-list-align,top);display:table-cell}img.image+.in-list.content{width:auto;display:inline-block}:host(:state(in-list))>.header,.in-list.header{color:var(--_ui-list-header-color,var(--ui-text-color));font-family:var(--ui-font-family-heading);font-weight:var(--ui-font-weight-bold);margin:0;display:block}:host(:state(in-list))>a.header,a.in-list.header{color:var(--ui-link);cursor:pointer}:host(:state(in-list))>a.header:hover,a.in-list.header:hover{color:var(--ui-link-hover)}:host(:state(in-list))>.description,.in-list.description{color:var(--_ui-list-description-color,oklch(from var(--ui-ink) l c h / .7));display:block}:host(:state(in-menu))>.header,.in-menu.header{font-size:1em;font-weight:var(--ui-font-weight-bold);margin:0 0 .5em;display:block}:host(:state(in-statistic))>.value,.in-statistic.value{color:var(--ui-color,var(--ui-statistic-value-color,var(--ui-ink)));font-family:var(--ui-font-family);font-size:var(--_ui-statistic-value-size,calc(var(--ui-font-size) * 4));font-weight:var(--ui-font-weight-normal);text-align:center;text-transform:uppercase;line-height:1em}:host(:state(in-statistic))>.value.text,.in-statistic.value.text{min-height:2em;font-size:var(--_ui-statistic-text-value-size,calc(var(--ui-font-size) * 2));font-weight:var(--ui-font-weight-bold);line-height:1em}:host(:state(in-statistic))>.label,.in-statistic.label{color:var(--ui-statistic-label-color,var(--ui-text-color));font-family:var(--ui-font-family-heading);font-size:1em;font-weight:var(--ui-font-weight-bold);text-align:center;text-transform:uppercase;margin:0;padding:0;display:block}:host(:state(in-statistic))>.value ::slotted(img),.in-statistic.value img{max-height:calc(var(--ui-font-size) * 3);vertical-align:baseline}:host(:state(in-statistic))>.value,.in-statistic.value{--_ui-icon-owner-margin:0;--_ui-icon-owner-opacity:1}:host(:state(in-step))>.content,.in-step.content{margin:var(--_ui-step-content-margin,0);padding:var(--_ui-step-content-padding,0);flex:0 auto;align-self:center;display:block}:host(:state(in-step))>.title,.in-step.title{width:100%;font-family:var(--ui-font-family-heading);font-size:var(--ui-step-title-font-size,1.14285em);font-weight:var(--ui-font-weight-bold);line-height:1.14285em}:host(:state(in-step))>.description,.in-step.description{width:100%;color:var(--ui-step-description-color,var(--ui-text-color));font-size:var(--ui-step-description-font-size,.92857em);font-weight:var(--ui-font-weight-normal);line-height:1.14285em}:host(:state(in-step):not(:first-child))>.description,.in-step.description:not(:first-child){margin-top:var(--_ui-step-description-distance,.25em)}:host(:state(in-accordion))>.title,.in-accordion.title{padding:var(--_ui-accordion-title-padding,.5em 0);color:var(--_ui-accordion-title-color,var(--ui-text-color));font-family:var(--ui-font-family-heading);cursor:pointer;font-size:1em;line-height:1;list-style:none}:host(:state(in-accordion))>.content,.in-accordion.content{padding:var(--_ui-accordion-content-padding,.5em 0 1em)}:host(:state(in-accordion):last-child)>.content,.in-accordion.content:last-child{padding-bottom:0}:host(:state(in-popup))>.header,.in-popup.header{font-family:var(--ui-font-family-heading);font-size:var(--_ui-popup-header-font-size,1.14285em);font-weight:var(--ui-font-weight-bold);padding:0;line-height:1.2}:host(:state(in-popup):not(:first-child))>.content,.in-popup.content:not(:first-child){padding-top:var(--_ui-popup-header-distance,.5em)}:host(:state(in-toast))>.header,.in-toast.header{color:inherit;font-weight:var(--ui-font-weight-bold);margin:0}:host(:state(in-toast))>.actions,.in-toast.actions{border-top:var(--ui-border-width) solid var(--ui-toast-actions-border,oklch(from var(--ui-shadow-ink) l c h / .2));background:var(--ui-toast-actions-background,oklch(from var(--ui-ink-on-dark) l c h / .25));text-align:right;margin:.5em -1em -1em;padding:.5em .5em .75em}:host(:state(in-search))>.title,.in-search.title{margin:calc((1 - var(--ui-line-height-heading)) * .5em) 0 0;color:var(--_ui-search-title-color,var(--ui-text-dark));font-family:var(--ui-font-family-heading);font-size:1em;font-weight:var(--ui-font-weight-bold)}:host(:state(in-search))>.description,.in-search.description{color:var(--_ui-search-description-color,var(--ui-text-light));margin-top:0;font-size:.92857em}:host(:state(in-search))>.value,.in-search.value{float:right;color:var(--_ui-search-price-color,var(--ui-green-text))}:host(:state(in-label))>.detail,.in-label.detail{--_ui-icon-owner-margin:0 .25em 0 0;font-weight:var(--_ui-label-detail-weight,var(--ui-font-weight-bold));opacity:var(--_ui-label-detail-opacity,1);vertical-align:top;margin-inline-start:var(--_ui-label-detail-distance,1em);display:inline-block}}@layer ui.components.parts.variations{.ui.dividing.header{padding-bottom:var(--_ui-header-dividing-padding);border-bottom:var(--_ui-header-dividing-border);border-bottom-color:var(--ui-color,var(--ui-border-color));box-shadow:inset 0 calc(var(--ui-border-width) - var(--_ui-header-colored-border-width)) 0 0 var(--ui-color,transparent)}.ui.block.header{padding:var(--_ui-header-block-padding);border:var(--_ui-header-block-border);border-radius:var(--ui-radius);background:var(--_ui-header-block-background);box-shadow:none}.ui.block.header:not(h1,h2,h3,h4,h5,h6){--_header-base:var(--ui-font-size)}.ui.attached.header{margin:0 calc(var(--ui-border-width) * -1);padding:var(--_ui-header-block-padding);border:var(--_ui-header-block-border);background:var(--_ui-header-attached-background);box-shadow:none;border-radius:0}.ui.attached.block.header{background:var(--_ui-header-block-background)}.ui.attached:not(.top).header{border-top:none}.ui[class*=top\\ attached].header{border-radius:var(--ui-radius) var(--ui-radius) 0 0}.ui[class*=bottom\\ attached].header{border-radius:0 0 var(--ui-radius) var(--ui-radius)}.ui.seamless.attached:not(.bottom).header{border-bottom:none}.ui.attached.header:not(h1,h2,h3,h4,h5,h6){--_header-base:1em}.ui.inverted.header{--ui-inverted:1;--ui-scheme:dark;color-scheme:dark}.ui[class*=left\\ aligned].header{text-align:left}.ui[class*=right\\ aligned].header{text-align:right}.ui:is(.centered,[class*=center\\ aligned]).header{text-align:center}.ui.justified.header{text-align:justify}.ui.justified.header:after{content:\"\";width:100%;display:inline-block}.ui.icon.header:is(.centered,[class*=aligned],.justified){margin-inline:auto;display:block}.ui:is(.floated,[class*=left\\ floated]).header{float:left;margin-top:0;margin-inline-end:var(--_ui-header-floated-margin)}.ui[class*=right\\ floated].header{float:right;margin-top:0;margin-inline-start:var(--_ui-header-floated-margin)}.ui.fitted.header{padding:0}@container style(--_ui-header-layout:icon){:host(:state(in-header))>.content,.in-header.content{padding:0;display:block}}@container style(--_ui-card-layout:horizontal){:host(:state(in-card))>.content,.in-card.content{border-top:none;flex-basis:1px}:host(:state(in-card))>.extra,.in-card.extra{flex-basis:100%}}@container style(--_ui-item-media:1){:host(:state(in-item))>.content{width:auto;min-width:0;align-self:start;padding-inline-start:var(--_ui-item-content-distance,1.5em)}}@container style(--_ui-item-layout:stacked){:host(:state(in-item):not(:first-child))>.content,.in-item.content:not(:first-child){padding:var(--ui-item-content-distance-mobile,1.5em) 0 0;display:block}}@container style(--_ui-item-layout:stacked) and style(--_ui-item-media:1){:host(:state(in-item))>.content{padding:var(--ui-item-content-distance-mobile,1.5em) 0 0;display:block}}@container style(--_ui-item-state:hover){:host(:state(in-item))>.header,.in-item.header{color:var(--ui-link-hover)}}@container style(--ui-inverted:1){:host(:state(in-card))>a.header,a.in-card.header,:host(:state(in-item))>a.header,a.in-item.header,:host(:state(in-list))>a.header,a.in-list.header{color:var(--ui-text-inverted-color)}:host(:state(in-statistic))>.value,.in-statistic.value{color:var(--ui-color,var(--ui-ink-on-dark))}}@container style(--_ui-comments-minimal:1){:host(:state(in-comment))>.actions,.in-comment.actions{opacity:0;transition:opacity var(--ui-duration-normal) var(--ui-ease) .1s;position:absolute;top:0;left:auto;right:0}}@container style(--_ui-comments-minimal:1) and style(--_ui-comment-hover:1){:host(:state(in-comment))>.actions,.in-comment.actions{opacity:1}}@container style(--_ui-modal-basic:1){:host(:state(in-modal))>:is(.header,.content,.actions),.in-modal:is(.header,.content,.actions){background-color:#0000;border:none}:host(:state(in-modal))>.header,.in-modal.header{color:var(--ui-ink-on-dark)}}@container style(--_ui-message-layout:icon){:host(:state(in-message))>.content,.in-message.content{vertical-align:middle;flex:auto;padding-inline-start:0;display:block}}@container style(--_ui-event-label:1){:host(:state(in-feed))>.content{margin:.5em 0 .35714em 1.14285em}}.content[class*=left\\ floated]{float:left}.content[class*=right\\ floated]{float:right}.content[class*=left\\ aligned]{text-align:left}.content[class*=center\\ aligned]{text-align:center}.content[class*=right\\ aligned]{text-align:right}.content.justified{text-align:justify}:host(:state(in-item))>.content[class*=top\\ aligned],.in-item.content[class*=top\\ aligned]{align-self:flex-start}:host(:state(in-item))>.content[class*=middle\\ aligned],.in-item.content[class*=middle\\ aligned]{align-self:center}:host(:state(in-item))>.content[class*=bottom\\ aligned],.in-item.content[class*=bottom\\ aligned]{align-self:flex-end}:host(:state(in-list))>.content[class*=top\\ aligned],.in-list.content[class*=top\\ aligned]{vertical-align:top}:host(:state(in-list))>.content[class*=middle\\ aligned],.in-list.content[class*=middle\\ aligned]{vertical-align:middle}:host(:state(in-list))>.content[class*=bottom\\ aligned],.in-list.content[class*=bottom\\ aligned]{vertical-align:bottom}@container style(--_ui-item-media:1){:host(:state(in-list))>.content{width:100%;padding:0 0 0 var(--_ui-list-content-distance,.5em);vertical-align:var(--_ui-list-align,top);display:table-cell}}@container style(--_ui-item-media:image){:host(:state(in-list))>.content{width:auto;padding:0 0 0 var(--_ui-list-content-distance,.5em);vertical-align:var(--_ui-list-align,top);display:inline-block}}@container style(--_ui-list-layout:horizontal){:host(:state(in-list))>.content,.in-list.content,:host(:state(in-list):not(:first-child))>.content,.in-list.content:not(:first-child){width:auto;vertical-align:var(--_ui-list-align,middle);display:inline-block}}@container style(--_ui-statistic-layout:horizontal){:host(:state(in-statistic))>.value,.in-statistic.value{font-size:var(--_ui-statistic-value-size,calc(var(--ui-font-size) * 3));vertical-align:middle;display:inline-block}:host(:state(in-statistic))>.value.text,.in-statistic.value.text{min-height:0}:host(:state(in-statistic))>.label,.in-statistic.label{vertical-align:middle;margin:0 0 0 .75em;display:inline-block}}@container style(--_ui-step-layout:stacked){:host(:state(in-step))>.content,.in-step.content{text-align:center}}@container style(--_ui-accordion-style:styled){:host(:state(in-accordion))>.title,.in-accordion.title{border-top:var(--ui-border-width) solid var(--ui-border-color);color:var(--ui-text-unselected);font-weight:var(--ui-font-weight-bold);transition:background var(--ui-duration-fast) var(--ui-ease), color var(--ui-duration-fast) var(--ui-ease);margin:0;padding:.75em 1em}:host(:state(in-accordion):first-child)>.title,.in-accordion.title:first-child{border-top:none}:host(:state(in-accordion))>.content,.in-accordion.content{margin:0;padding:.5em 1em 1.5em}}@container style(--_ui-label-layout:image){:host(:state(in-label))>.detail,.in-label.detail{border-radius:0 var(--ui-radius) var(--ui-radius) 0;background:var(--_ui-label-detail-background,var(--ui-label-detail-background,oklch(from var(--ui-shadow-ink) l c h / .1)));opacity:1;margin:-.5833em -.833em -.5833em .5em;padding:.5833em .833em}}@container style(--_ui-part:summary){:host(:state(in-feed))>.date,.in-feed.date{color:var(--ui-feed-date-color,var(--ui-text-light));font-size:.85714em;font-style:normal;font-weight:var(--ui-font-weight-normal);margin:0 0 0 .5em;padding:0;display:inline-block}}}@layer ui.components.parts.states{.ui.disabled.header{opacity:var(--_ui-header-disabled-opacity)}@container style(--_ui-step-state:active){:host(:state(in-step))>.title,.in-step.title{color:var(--_ui-step-active-title-color,var(--ui-link))}}@container style(--_ui-step-state:disabled){:host(:state(in-step))>:is(.title,.description),.in-step:is(.title,.description){color:var(--ui-text-disabled)}}@container style(--_ui-accordion-style:styled){:host(:state(in-accordion))>.title:hover,.in-accordion.title:hover{color:var(--ui-text-color)}}@container style(--_ui-accordion-style:styled) and style(--_ui-accordion-open:1){:host(:state(in-accordion))>.title,.in-accordion.title{color:var(--ui-text-selected)}}@container style(--_ui-search-result:active){:host(:state(in-search))>:is(.title,.description),.in-search:is(.title,.description){color:var(--ui-text-dark)}}}", Va = /* @__PURE__ */ pe("<slot>"), Ha, Ua, Wa, q = class _PartComponent extends (Ua = Rt, Ha = [protoMerged], Ua) {
	constructor() {
		super(...arguments), __publicField(this, "context", new D({
			domElement: this.domElement,
			noun: this.vocabulary.noun
		}));
	}
	render() {
		let e = this;
		return m(te, {
			get component() {
				return e.rootTag;
			},
			get class() {
				return e.rootClass;
			},
			get part() {
				return e.partForName(e.vocabulary.noun);
			},
			get href() {
				return g(() => e.rootTag === "a")() ? e.linkTo : void 0;
			},
			get target() {
				return g(() => e.rootTag === "a")() ? e.linkTarget : void 0;
			},
			get datetime() {
				return e.rootDatetime;
			},
			get tabindex() {
				return e.rootTabIndex;
			},
			get children() {
				return e.content();
			}
		});
	}
	get rootTag() {
		return "div";
	}
	get rootDatetime() {}
	get rootTabIndex() {}
	content() {
		var e = Va();
		return e._$owner = se(), e;
	}
};
Wa = __decoratorStart(Ua), __decorateElement(Wa, 13, "elementSetup", Ha, q), __decoratorMetadata(Wa, q), __name(q, "PartComponent"), __publicField(q, "elementSetup", __runInitializers(Wa, 8, q, {
	styleSheets: { parts: Ba },
	isAPart: !0
})), __runInitializers(Wa, 11, q);
var Ga = q, Ka = [state], qa, Ja, J = class _RootSettings {
	static set(e, t) {
		_RootSettings.byRoot.set(e, t), _RootSettings.generation += 1;
	}
	static delete(e) {
		_RootSettings.byRoot.delete(e) && (_RootSettings.generation += 1);
	}
	static nearest(e, t) {
		for (let n = e; n; n = flatParentFor(n)) {
			let e = _RootSettings.byRoot.get(n)?.[t];
			if (e !== void 0) return e;
		}
	}
	static reset() {
		_RootSettings.byRoot = /* @__PURE__ */ new WeakMap(), _RootSettings.generation += 1;
	}
};
qa = __decoratorStart(null), Ja = /* @__PURE__ */ new WeakMap(), __decorateElement(qa, 12, "generation", Ka, J, Ja), __decoratorMetadata(qa, J), __name(J, "RootSettings"), __privateAdd(J, Ja, __runInitializers(qa, 8, J, 0)), __runInitializers(qa, 11, J), __publicField(J, "byRoot", /* @__PURE__ */ new WeakMap());
var Ya = J, Xa, Za = [state], Y, Qa;
Xa = [derived];
var $a = class _IconGlyph {
	constructor({ owner: e, name: t }) {
		__runInitializers(Y, 5, this), __privateAdd(this, Qa, __runInitializers(Y, 8, this)), __runInitializers(Y, 11, this), __publicField(this, "owner"), __publicField(this, "name"), __publicField(this, "request", 0), this.owner = e, this.name = t, !h && (this.svgTemplate = p(() => _IconGlyph.peek(e.domElement, t())), i(() => ({
			name: t(),
			connected: e.isConnected,
			generation: Ya.generation
		}), ({ name: e, connected: t }) => {
			(t || !this.request) && this.load(e);
		}));
	}
	get svg() {
		if (h) return _IconGlyph.serverSvg(this.owner.domElement, p(this.name));
		let e = this.svgTemplate;
		return e ? _IconGlyph.draw(e) : void 0;
	}
	async load(e) {
		let t = ++this.request, n = e ? await V.load().then((t) => _IconGlyph.packsFor(this.owner.domElement, t.icons).get(e)).catch(() => void 0) : void 0;
		this.request === t && (this.svgTemplate = n);
	}
	static packsFor(e, t) {
		return Ya.nearest(e, "icons") ?? t;
	}
	static draw(e) {
		let t = e.cloneNode(!0);
		return t.setAttribute("aria-hidden", "true"), t;
	}
	static serverSvg(e, t) {
		let n = globalThis[z]?.icons;
		if (!t || !n || !_IconGlyph.serverMarkup) return;
		let r = _IconGlyph.serverMarkup(_IconGlyph.packsFor(e, n), t);
		if (r) return fe([r.replace(to, "<svg aria-hidden=\"true\"")]);
	}
	static peek(e, t) {
		let n = globalThis[z]?.icons;
		return t && n ? _IconGlyph.packsFor(e, n).peek(t) : void 0;
	}
};
Y = __decoratorStart(null), Qa = /* @__PURE__ */ new WeakMap(), __decorateElement(Y, 4, "svgTemplate", Za, $a, Qa), __decorateElement(Y, 2, "svg", Xa, $a), __decoratorMetadata(Y, $a), __name($a, "IconGlyph"), __publicField($a, "serverMarkup");
var eo = $a, to = /<svg\b/, no = /* @__PURE__ */ pe("<button type=button>"), CloseButton = class {
	props;
	glyph;
	constructor(e) {
		this.props = e, this.glyph = new eo({
			owner: e.owner,
			name: () => e.shows() ? si : void 0
		});
	}
	draw() {
		let { shows: e, label: t, part: n, onClick: i } = this.props, a = this;
		return m(r, {
			get when() {
				return e();
			},
			get children() {
				var e = no();
				return ne(e, "click", i, !0), de(e, "part", n), ce(e, () => a.glyph.svg), ae(() => ({
					e: le(oi),
					t: t()
				}), ({ e: t, t: n }, r) => {
					re(e, t, r?.e), n !== r?.t && de(e, "aria-label", n);
				}), e;
			}
		});
	}
};
ie(["click"]);
//#endregion
//#region src/elements/ClipboardCopy.ts
var ro = [state], io, ao, oo = class _ClipboardCopy {
	constructor({ seconds: e = co } = {}) {
		__privateAdd(this, ao, __runInitializers(io, 8, this, !1)), __runInitializers(io, 11, this), __publicField(this, "seconds"), __publicField(this, "copiedTimer"), this.seconds = e;
	}
	async copy(e) {
		return await copyText(e) ? (this.isCopied = !0, this.copiedTimer?.cancel(), this.copiedTimer = after(this.seconds, () => this.isCopied = !1), !0) : !1;
	}
};
io = __decoratorStart(null), ao = /* @__PURE__ */ new WeakMap(), __decorateElement(io, 4, "isCopied", ro, oo, ao), __decoratorMetadata(io, oo), __name(oo, "ClipboardCopy");
var so = oo, co = 2, PopoverPanel = class extends sn {
	panelSetup;
	constructor(e) {
		super(e), this.panelSetup = e;
	}
	get overlay() {
		let { component: e, restoreFocus: t, onDismiss: n } = this.panelSetup;
		return this.overlayEntry ??= {
			element: e.domElement,
			kind: "popover",
			restoreFocus: t,
			onDismiss: n ?? (() => void this.close())
		};
	}
	overlayEntry;
	follow(e, t) {
		if (!t || !e || !e.popover) return;
		e.matches(lo) || e.showPopover();
		let { overlay: n } = this;
		return V.overlays.open(n), () => {
			e.matches(lo) && e.hidePopover(), V.overlays.close(n);
		};
	}
	get anchorStyle() {
		return { "anchor-name": this.anchorName };
	}
	get panelStyle() {
		return { "position-anchor": this.anchorName };
	}
	get anchorName() {
		return this.anchorId ??= `--${V.ids.next(this.panelSetup.component.vocabulary.tag)}`;
	}
	anchorId;
}, lo = ":popover-open", uo = class DOMLoadableElement extends w {
	get content() {
		return this.component?.content ?? this.pendingContent ?? "";
	}
	set content(e) {
		this.component ? this.component.content = e : this.pendingContent = e;
	}
	get etag() {
		return this.component?.lastETag;
	}
	get dirty() {
		return this.component?.isDirty ?? this.pendingContent !== void 0;
	}
	get loaded() {
		return this.currentLoad.promise;
	}
	save(e) {
		return this.component?.save(e) ?? Promise.resolve(!1);
	}
	reload() {
		return this.component?.reload() ?? this.currentLoad.promise;
	}
	takePendingContent() {
		let e = this.pendingContent;
		return this.pendingContent = void 0, e;
	}
	beginLoad() {
		this.settled &&= (this.openLoad = DOMLoadableElement.deferred(), !1);
	}
	get currentLoad() {
		return this.openLoad ??= DOMLoadableElement.deferred();
	}
	endLoad(e) {
		this.settled = !0, this.currentLoad.resolve(e);
	}
	failLoad(e) {
		this.settled = !0, this.currentLoad.reject(e);
	}
	static deferred() {
		let e, t, n = new Promise((n, r) => {
			e = n, t = r;
		});
		return n.catch(() => {}), {
			promise: n,
			resolve: e,
			reject: t
		};
	}
}, fo, po, mo, ho, go, _o, vo, yo, bo, xo, So, Co, wo, To, Eo, Do, Oo, ko, Ao, X, jo, Mo, No, Po, Fo, Io, Z = class _LoadableComponent extends (Ao = Rt, ko = [protoMerged], Oo = [proto], Do = [watches({
	childList: !0,
	characterData: !0,
	subtree: !0
})], Eo = [state], To = [state], wo = [state], Co = [cssState("loading")], So = [onChange("source", "loadingPolicy", "isConnected")], xo = [untracked], bo = [untracked], yo = [state], vo = [cssState("error")], _o = [untracked], go = [cssState("saving"), state], ho = [cssState("dirty"), state], mo = [untracked], po = [lazy], fo = [lazy], Ao) {
	constructor() {
		super(...arguments), __runInitializers(X, 5, this), __privateAdd(this, jo, __runInitializers(X, 8, this)), __runInitializers(X, 11, this), __privateAdd(this, Mo, __runInitializers(X, 12, this, this.domElement.takePendingContent())), __runInitializers(X, 15, this), __privateAdd(this, No, __runInitializers(X, 16, this, U.idle)), __runInitializers(X, 19, this), __publicField(this, "contentSource"), __publicField(this, "fetchedSource"), __publicField(this, "isFresh", !1), __publicField(this, "stopLoading"), __privateAdd(this, Po, __runInitializers(X, 20, this)), __runInitializers(X, 23, this), __privateAdd(this, Fo, __runInitializers(X, 24, this, !1)), __runInitializers(X, 27, this), __privateAdd(this, Io, __runInitializers(X, 28, this, this.wasEdited !== void 0)), __runInitializers(X, 31, this), __publicField(this, "lastETag");
	}
	get inlineText() {
		return h || !this.wantsInlineContent ? "" : _LoadableComponent.inlineTextOf(this.domElement);
	}
	get textToShow() {
		let e = this.wasEdited;
		return e === void 0 ? this.source ? this.fetchedText ?? "" : this.inlineText : e;
	}
	get content() {
		return p(() => this.textToShow);
	}
	set content(e) {
		e !== this.content && (this.wasEdited = e, this.isDirty = !0, this.sendSourceEvent(W.change, { content: e }));
	}
	get isLoading() {
		return this.loadStatus === U.loading;
	}
	get loadingPolicy() {
		return this.load ?? "eager";
	}
	onSourceChanged(e, t, n) {
		if (n) return this.stopLoading = this.scheduleLoad(e || void 0, t), () => {
			this.stopLoading?.(), this.stopLoading = void 0;
		};
	}
	scheduleLoad(e, t) {
		let n = this.domElement;
		if (e !== this.contentSource && (this.contentSource = e, this.dropEdits(), n.beginLoad()), !e) {
			this.loadStatus = U.loaded, this.loadError = void 0, afterSolidUpdate(() => this.onLoaded(this.textToShow));
			return;
		}
		if (e === this.fetchedSource && !this.isFresh) return;
		try {
			this.checkSource(e);
		} catch (e) {
			this.onLoadError(e);
			return;
		}
		let r = new AbortController(), i, a = /* @__PURE__ */ __name(() => {
			i?.(), i = void 0, this.fetchSource(e, r.signal);
		}, "start");
		if (t === "visible") V.load().then(() => {
			r.signal.aborted || (i = V.visibility.observe(this.domElement, {
				onOnScreen: a,
				once: !0
			}));
		});
		else if (t === "idle" && typeof requestIdleCallback == "function") {
			let e = requestIdleCallback(a);
			i = /* @__PURE__ */ __name(() => cancelIdleCallback(e), "undo");
		} else a();
		return () => {
			r.abort(), i?.();
		};
	}
	async fetchSource(e, t) {
		this.loadStatus = U.loading, this.loadError = void 0;
		let n = this.isFresh;
		this.isFresh = !1;
		try {
			let r = await (await V.load()).sources.load(e, {
				signal: t,
				fresh: n
			});
			this.fetchedSource = e, this.fetchedText = r.text, this.lastETag = r.etag, this.loadStatus = U.loaded, this.onLoaded(r.text);
		} catch (e) {
			if (t.aborted) return;
			this.onLoadError(e);
		}
	}
	onLoaded(e) {
		let t = this.wasEdited ?? e;
		this.domElement.endLoad(t), this.sendSourceEvent(W.load, {
			source: this.source || void 0,
			content: t
		});
	}
	reload() {
		let e = this.domElement, t = this.source || void 0;
		return this.dropEdits(), t ? (this.stopLoading?.(), e.beginLoad(), this.isFresh = !0, this.fetchedSource = void 0, this.stopLoading = this.scheduleLoad(t, "eager"), e.loaded) : e.loaded;
	}
	get hasError() {
		return this.loadStatus === U.error;
	}
	get errorText() {
		let e = this.loadError;
		if (!e) return;
		let t = ha[e.kind] ?? ha.load;
		return this.translationForKey(t, { source: this.source ?? "" });
	}
	onLoadError(e, t = "load") {
		let n = B.kindFor(e, t);
		this.loadStatus = U.error, this.domElement.failLoad(e);
		let r = this.source || void 0;
		this.sendSourceEvent(W.error, {
			kind: n,
			source: r,
			error: e
		}) && (this.loadError = {
			kind: n,
			error: e
		});
	}
	async save(e) {
		e !== void 0 && (this.content = e);
		let { content: t, lastETag: n } = this, r = this.source || void 0;
		if (!this.sendSourceEvent(W.save, {
			source: r,
			content: t,
			etag: n
		})) return !1;
		if (!r) return this.isDirty = !1, this.sendSourceEvent(W.saved, { source: r }), !0;
		this.isSaving = !0;
		try {
			let e = await (await V.load()).sources.save({
				url: r,
				text: t,
				etag: n,
				fragment: this.saveFragment()
			});
			return this.lastETag = e.etag, this.isDirty = !1, this.sendSourceEvent(W.saved, {
				source: r,
				etag: e.etag
			}), !0;
		} catch (e) {
			let t = B.kindFor(e, "save");
			return this.sendSourceEvent(W.error, {
				kind: t,
				source: r,
				error: e
			}), !1;
		} finally {
			this.isSaving = !1;
		}
	}
	dropEdits() {
		this.wasEdited = void 0, this.isDirty = !1;
	}
	render() {
		let e = this;
		return [
			g(() => g(() => !!e.isLoading)() ? e.loader() : void 0),
			g(() => g(() => !!e.errorText)() ? e.errorMessage() : void 0),
			g(() => e.renderContent())
		];
	}
	loader() {
		let e = this.loaderElement;
		return e.setAttribute("aria-label", this.translationForKey("sourceLoading", { source: this.source ?? "" })), e;
	}
	get loaderElement() {
		return this.statusElement(la, "loader");
	}
	errorMessage() {
		let e = this.errorElement;
		return e.textContent = this.errorText ?? "", e;
	}
	get errorElement() {
		return this.statusElement(ua, "error");
	}
	statusElement(e, t) {
		let n = this.domElement.ownerDocument.createElement(e);
		n.setAttribute("part", this.partForName(t));
		for (let [t, r] of Object.entries(Ro[e])) n.setAttribute(t, r);
		return n;
	}
	checkSource(e) {}
	saveFragment() {}
	sendSourceEvent(e, t) {
		return this.send(e, t);
	}
	static inlineTextOf(e) {
		let t = e.textContent ?? "";
		for (let n of e.children) {
			if (n.localName === "script" && n.type.startsWith("text/")) {
				t = n.text;
				break;
			}
			if (n.localName === "template") {
				t = n.innerHTML;
				break;
			}
		}
		return _LoadableComponent.dedent(t);
	}
	static dedent(e) {
		let t = e.replace(/\r\n?/g, "\n").split("\n");
		for (; t.length && !t[0].trim();) t.shift();
		for (; t.length && !t[t.length - 1].trim();) t.pop();
		let n = Infinity;
		for (let e of t) e.trim() && (n = Math.min(n, e.length - e.trimStart().length));
		return !Number.isFinite(n) || n === 0 ? t.join("\n") : t.map((e) => e.slice(Math.min(n, e.length - e.trimStart().length))).join("\n");
	}
};
X = __decoratorStart(Ao), jo = /* @__PURE__ */ new WeakMap(), Mo = /* @__PURE__ */ new WeakMap(), No = /* @__PURE__ */ new WeakMap(), Po = /* @__PURE__ */ new WeakMap(), Fo = /* @__PURE__ */ new WeakMap(), Io = /* @__PURE__ */ new WeakMap(), __decorateElement(X, 2, "inlineText", Do, Z), __decorateElement(X, 4, "fetchedText", Eo, Z, jo), __decorateElement(X, 4, "wasEdited", To, Z, Mo), __decorateElement(X, 4, "loadStatus", wo, Z, No), __decorateElement(X, 2, "isLoading", Co, Z), __decorateElement(X, 1, "onSourceChanged", So, Z), __decorateElement(X, 1, "onLoaded", xo, Z), __decorateElement(X, 1, "reload", bo, Z), __decorateElement(X, 4, "loadError", yo, Z, Po), __decorateElement(X, 2, "hasError", vo, Z), __decorateElement(X, 1, "onLoadError", _o, Z), __decorateElement(X, 4, "isSaving", go, Z, Fo), __decorateElement(X, 4, "isDirty", ho, Z, Io), __decorateElement(X, 1, "save", mo, Z), __decorateElement(X, 2, "loaderElement", po, Z), __decorateElement(X, 2, "errorElement", fo, Z), __decorateElement(X, 13, "elementSetup", ko, Z), __decorateElement(X, 13, "wantsInlineContent", Oo, Z), __decoratorMetadata(X, Z), __name(Z, "LoadableComponent"), __publicField(Z, "elementSetup", __runInitializers(X, 32, Z, { DOMElement: uo })), __runInitializers(X, 35, Z), __publicField(Z, "wantsInlineContent", __runInitializers(X, 36, Z, !0)), __runInitializers(X, 39, Z);
var Lo = Z, Ro = {
	[la]: {
		visible: "",
		inline: "",
		centered: ""
	},
	[ua]: { state: "error" }
}, zo = class SourceMarkup {
	static parse(e, { page: t, source: n, select: r }) {
		let i = new DOMParser().parseFromString(e, "text/html"), a;
		if (r) {
			let e;
			try {
				e = i.querySelector(r);
			} catch (e) {
				throw new B(`SourceMarkup.parse():  "${r}" isn't a CSS selector;  fix \`select\``, { cause: {
					kind: "render",
					error: e
				} });
			}
			if (!e) throw new B(`SourceMarkup.parse():  nothing in ${n ?? "the content"} matches "${r}";  fix \`select\``, { cause: { kind: "render" } });
			a = [e];
		} else a = [...i.body.childNodes];
		let o = t.createDocumentFragment();
		for (let e of a) o.append(t.importNode(e, !0));
		return n && SourceMarkup.rewriteUrls(o, n, t), o;
	}
	static rewriteUrls(e, t, n) {
		let r = new URL(t, n.baseURI);
		for (let t of e.querySelectorAll(fa)) for (let e of da) {
			let i = t.getAttribute(e);
			if (i === null || i.startsWith("#")) continue;
			let a;
			try {
				a = new URL(i, r).href;
			} catch {
				continue;
			}
			a !== new URL(i, n.baseURI).href && (t.setAttribute(pa + e, i), t.setAttribute(e, a));
		}
	}
	static restoreUrls(e) {
		for (let t of e.querySelectorAll("*")) for (let e of da) {
			let n = t.getAttribute(pa + e);
			n !== null && (t.setAttribute(e, n), t.removeAttribute(pa + e));
		}
	}
	static checkNesting(e, t, n) {
		let r = e.ownerDocument.baseURI, i = new URL(t, r).href, a = 0;
		for (let o = SourceMarkup.parentFor(e); o; o = SourceMarkup.parentFor(o)) {
			if (!n(o)) continue;
			a++;
			let e = o.getAttribute(_a);
			if (e && new URL(e, r).href === i) throw new B(`SourceMarkup.checkNesting():  ${t} includes itself;  point \`source\` elsewhere`, { cause: { kind: "render" } });
		}
		if (a >= 8) throw new B(`SourceMarkup.checkNesting():  ${t} is nested more than 8 sources deep;  look for a cycle`, { cause: { kind: "render" } });
	}
	static parentFor(e) {
		let t = e.parentNode;
		if (t?.nodeType === _.element) return t;
		if (t?.nodeType === _.documentFragment) return t.host;
	}
}, Bo, Vo, Ho, Uo, Wo, Go = [state], Q, Ko, qo, Jo, Yo;
Wo = [state], Uo = [state], Ho = [state], Vo = [untracked], Bo = [untracked];
var $ = class _LoadableBody {
	constructor(e) {
		__runInitializers(Q, 5, this), __privateAdd(this, Ko, __runInitializers(Q, 8, this, U.idle)), __runInitializers(Q, 11, this), __privateAdd(this, qo, __runInitializers(Q, 12, this, !1)), __runInitializers(Q, 15, this), __privateAdd(this, Jo, __runInitializers(Q, 16, this)), __runInitializers(Q, 19, this), __privateAdd(this, Yo, __runInitializers(Q, 20, this, !1)), __runInitializers(Q, 23, this), __publicField(this, "owner"), __publicField(this, "pending"), __publicField(this, "pendingKey"), __publicField(this, "generation", 0), __publicField(this, "inserted", []), this.owner = e;
	}
	get isVeiled() {
		if (this.hasShownABody) return !1;
		let e = this.loadStatus;
		return (e === U.idle || e === U.loading) && !this.isOverdue;
	}
	get isBusy() {
		return this.loadStatus === U.loading && this.isOverdue;
	}
	load() {
		let e = this.owner.source();
		if (!e) return Promise.resolve();
		let t = this.owner.select();
		return this.pending && this.pendingKey === _LoadableBody.key(e, t) ? this.pending : this.start({
			source: e,
			select: t,
			fresh: !1
		});
	}
	reload() {
		let e = this.owner.source();
		return e ? this.start({
			source: e,
			select: this.owner.select(),
			fresh: !0
		}) : Promise.resolve();
	}
	start(e) {
		let t = ++this.generation;
		this.pendingKey = _LoadableBody.key(e.source, e.select), this.loadStatus = U.loading, this.loadError = void 0, this.owner.send(W.loading, { source: e.source }), this.isOverdue = !1;
		let n = after(300 / 1e3, () => {
			t === this.generation && (this.isOverdue = !0);
		}), r = this.fetch(e, t).finally(() => n.cancel());
		return this.pending = r, r.catch(() => {
			this.pending === r && (this.pending = void 0);
		}), r;
	}
	async fetch({ source: e, select: t, fresh: n }, r) {
		let { domElement: i } = this.owner;
		try {
			zo.checkNesting(i, e, (e) => e.hasAttribute(_a));
			let a = await (await V.load()).sources.load(e, { fresh: n });
			if (r !== this.generation) return;
			this.insert(zo.parse(a.text, {
				page: i.ownerDocument,
				source: e,
				select: t
			})), this.loadStatus = U.loaded, this.owner.send(W.loaded, {
				source: e,
				content: a.text
			});
		} catch (t) {
			if (r !== this.generation) return;
			throw this.fail(e, t), t;
		}
	}
	insert(e) {
		let t = this.owner.target();
		for (let e of this.inserted) e.remove();
		for (let e of [...t.childNodes]) _LoadableBody.isPlaceholder(e) && e.remove();
		this.inserted = [...e.childNodes], t.append(e), this.hasShownABody = !0;
	}
	fail(e, t) {
		let n = B.kindFor(t, "load");
		this.loadStatus = U.error;
		let r = this.owner.send(W.error, {
			kind: n,
			source: e,
			error: t
		});
		this.loadError = r ? {
			kind: n,
			error: t
		} : void 0;
	}
	static key(e, t) {
		return t ? `${e} ${t}` : e;
	}
	static isPlaceholder(e) {
		return !(e.nodeType === _.element && e.hasAttribute("slot"));
	}
};
Q = __decoratorStart(null), Ko = /* @__PURE__ */ new WeakMap(), qo = /* @__PURE__ */ new WeakMap(), Jo = /* @__PURE__ */ new WeakMap(), Yo = /* @__PURE__ */ new WeakMap(), __decorateElement(Q, 4, "loadStatus", Go, $, Ko), __decorateElement(Q, 4, "isOverdue", Wo, $, qo), __decorateElement(Q, 4, "loadError", Uo, $, Jo), __decorateElement(Q, 4, "hasShownABody", Ho, $, Yo), __decorateElement(Q, 1, "load", Vo, $), __decorateElement(Q, 1, "reload", Bo, $), __decoratorMetadata(Q, $), __name($, "LoadableBody");
var Xo = $, DOMLoadableBodyElement = class extends w {
	load() {
		return this.component?.loadBody() ?? Promise.resolve();
	}
	reload() {
		return this.component?.reloadBody() ?? Promise.resolve();
	}
}, Zo = /* @__PURE__ */ e({
	APP_STYLESHEET_ID: () => Ji,
	ATTRIBUTE_GROUPS: () => Ce,
	AnimationNames: () => Xi,
	ApiError: () => ApiError,
	AriaNames: () => we,
	BuiltInIconPacks: () => Ma,
	BuiltInPacks: () => za,
	CODE_LANGUAGES_EVENT: () => ea,
	Cell: () => Cell,
	ClassBuilder: () => aa,
	ClipboardCopy: () => so,
	CloseButton: () => CloseButton,
	Converters: () => N,
	CssDisplay: () => Gi,
	DEFAULT_ICON_PACK: () => Na,
	DOMElement: () => w,
	DOMLoadableBodyElement: () => DOMLoadableBodyElement,
	DOMLoadableElement: () => uo,
	Disclosure: () => sn,
	E: () => Zo,
	EN_STRINGS: () => Zi,
	ERRORED_STATE: () => Ee,
	ERROR_EVENT: () => Te,
	ElementDefinition: () => Re,
	ICON_PACK_INDEX: () => Pa,
	ICON_PREFIX_SEPARATOR: () => ":",
	IconGlyph: () => eo,
	IconName: () => Ia,
	LAYER_ORDER: () => Wi,
	LoadOnce: () => gn,
	LoadableBody: () => Xo,
	LoadableComponent: () => Lo,
	MAX_DEPTH: () => 8,
	MenuSearchFields: () => ca,
	NO_ANIMATION: () => v,
	NativeFallback: () => Da,
	NodeType: () => _,
	ORIGINAL_PREFIX: () => pa,
	OwnControls: () => OwnControls,
	OwnerContext: () => Ze,
	PAGE_SCOPE: () => Ki,
	ParentLink: () => mn,
	PartComponent: () => Ga,
	PartContext: () => D,
	PopoverPanel: () => PopoverPanel,
	Queued: () => Queued,
	RUNTIME_KEY: () => z,
	RUNTIME_VERSION: () => Ui,
	RangeMeasures: () => sa,
	Reactive: () => b,
	RootSettings: () => Ya,
	SCROLL_LOCK_CLASS: () => qi,
	SOURCE_ATTRIBUTE: () => _a,
	SOURCE_BODY_HOLD_MS: () => 300,
	SOURCE_FAILURE_KEYS: () => ha,
	SOURCE_LOADER_TAG: () => la,
	SOURCE_MESSAGE_TAG: () => ua,
	STICKY_MAX_RESERVE: () => ba,
	STICKY_SCROLLING: () => ya,
	STICKY_SLACK: () => xa,
	SharedVocabulary: () => I,
	Shorthand: () => Sa,
	SlotContent: () => en,
	SourceError: () => B,
	SourceErrorKinds: () => $i,
	SourceEvent: () => W,
	SourceMarkup: () => zo,
	SourceStatus: () => U,
	SpellSolid: () => y,
	StickyWatch: () => Aa,
	StickyWatchEdges: () => va,
	TEMPORAL_POLYFILL: () => Qi,
	UI: () => V,
	UIComponent: () => Rt,
	UIT: () => zn,
	URL_ATTRIBUTES: () => da,
	URL_SELECTOR: () => fa,
	UTILITIES_SHEET: () => Yi,
	ValueSets: () => M,
	VisibilityDirection: () => ta,
	Vocabulary: () => zi,
	WHITESPACE: () => oa,
	Warnings: () => Warnings,
	after: () => after,
	afterSolidUpdate: () => afterSolidUpdate,
	answerOf: () => answerOf,
	aria: () => aria,
	beforeNextPaint: () => beforeNextPaint,
	byDocumentOrder: () => byDocumentOrder,
	camelCase: () => camelCase,
	clamp: () => clamp,
	closestAcrossShadow: () => closestAcrossShadow,
	controlled: () => controlled,
	copyText: () => copyText,
	cssState: () => cssState,
	dedent: () => dedent,
	derived: () => derived,
	escapeHTML: () => escapeHTML,
	escapeRegExp: () => escapeRegExp,
	every: () => every,
	fetchOk: () => fetchOk,
	fetchText: () => fetchText,
	flatParentFor: () => flatParentFor,
	forget: () => forget,
	getSuperHierarchy: () => getSuperHierarchy,
	hasDescriptor: () => hasDescriptor,
	hasOwnProp: () => hasOwnProp,
	indented: () => indented,
	isBrowser: () => isBrowser,
	isSameList: () => isSameList,
	kb: () => kb,
	kebabCase: () => kebabCase,
	lazy: () => lazy,
	levenshtein: () => levenshtein,
	loadUI: () => load,
	markedPieces: () => markedPieces,
	nextFrame: () => nextFrame,
	numberToWord: () => numberToWord,
	on: () => on,
	onChange: () => onChange,
	once: () => once,
	proto: () => proto,
	protoMerged: () => protoMerged,
	resets: () => resets,
	scrollByRow: () => scrollByRow,
	scrollEnds: () => scrollEnds,
	slug: () => slug,
	soon: () => soon,
	state: () => state,
	suggest: () => suggest,
	untracked: () => untracked,
	waitUntil: () => waitUntil,
	watches: () => watches,
	whenDefined: () => whenDefined,
	whileConnected: () => whileConnected,
	within: () => within,
	withoutAccents: () => withoutAccents
});
//#endregion
export { qn as $, Zr as A, Ji as APP_STYLESHEET_ID, Ce as ATTRIBUTE_GROUPS, Xi as AnimationNames, ApiError, we as AriaNames, xr as At, ModalActions as B, __publicField as Bt, Ma as BuiltInIconPacks, za as BuiltInPacks, pi as C, ea as CODE_LANGUAGES_EVENT, Cell, aa as ClassBuilder, so as ClipboardCopy, CloseButton, N as Converters, Gi as CssDisplay, ki as Ct, qr as D, Na as DEFAULT_ICON_PACK, w as DOMElement, DOMLoadableBodyElement, uo as DOMLoadableElement, sn as Disclosure, ThemeNames as Dt, Zo as E, Zi as EN_STRINGS, Ee as ERRORED_STATE, Te as ERROR_EVENT, Re as ElementDefinition, Ei as Et, Nr as F, __decorateElement as Ft, P as G, nr as H, ti as I, Pa as ICON_PACK_INDEX, Fa as ICON_PREFIX_SEPARATOR, eo as IconGlyph, Ia as IconName, __decoratorMetadata as It, ui as J, sr as K, Lr as L, Wi as LAYER_ORDER, gn as LoadOnce, Xo as LoadableBody, Lo as LoadableComponent, __decoratorStart as Lt, $r as M, ma as MAX_DEPTH, ca as MenuSearchFields, ci as Mt, ei as N, v as NO_ANIMATION, Da as NativeFallback, _ as NodeType, di as Nt, Jr as O, pa as ORIGINAL_PREFIX, Mi as Ot, OwnControls, Ze as OwnerContext, er as P, Ki as PAGE_SCOPE, mn as ParentLink, Ga as PartComponent, D as PartContext, PopoverPanel, WordWidthClasses as Pt, Kn as Q, Queued, ni as R, z as RUNTIME_KEY, Ui as RUNTIME_VERSION, sa as RangeMeasures, b as Reactive, Ya as RootSettings, __name as Rt, gr as S, qi as SCROLL_LOCK_CLASS, _a as SOURCE_ATTRIBUTE, ga as SOURCE_BODY_HOLD_MS, ha as SOURCE_FAILURE_KEYS, la as SOURCE_LOADER_TAG, ua as SOURCE_MESSAGE_TAG, ba as STICKY_MAX_RESERVE, ya as STICKY_SCROLLING, xa as STICKY_SLACK, I as SharedVocabulary, Sa as Shorthand, en as SlotContent, B as SourceError, $i as SourceErrorKinds, W as SourceEvent, zo as SourceMarkup, U as SourceStatus, y as SpellSolid, Oi as St, Aa as StickyWatch, va as StickyWatchEdges, li as T, Qi as TEMPORAL_POLYFILL, Ai as Tt, Tr as U, V as UI, Rt as UIComponent, zn as UIT, da as URL_ATTRIBUTES, fa as URL_SELECTOR, Yi as UTILITIES_SHEET, fr as V, M as ValueSets, ta as VisibilityDirection, zi as Vocabulary, __runInitializers as Vt, Gn as W, oa as WHITESPACE, Warnings, wr as X, Vr as Y, Xn as Z, ir as _, Yn as _t, yr as a, after, afterSolidUpdate, answerOf, aria, gi as at, mr as b, beforeNextPaint, ri as bt, byDocumentOrder, Gr as c, camelCase, clamp, closestAcrossShadow, controlled, copyText, cssState, wi as ct, ji as d, dedent, derived, bi as dt, escapeHTML, escapeRegExp, F as et, every, Kr as f, fetchOk, fetchText, flatParentFor, forget, vi as ft, Pr as g, getSuperHierarchy, StackClasses as gt, Br as h, hasDescriptor, hasOwnProp, Qn as ht, Yr as i, indented, isBrowser, isSameList, kr as it, Qr as j, Ur as jt, HeadingLevels as k, kb, kebabCase, Sr as kt, tr as l, lazy, levenshtein, load as loadUI, Ti as lt, fi as m, markedPieces, xi as mt, zr as n, nextFrame, Mr as nt, numberToWord, ii as o, on, onChange, once, Si as ot, Xr as p, proto, protoMerged, yi as pt, Er as q, Hr as r, resets, Ar as rt, Rr as s, scrollByRow, scrollEnds, slug, soon, Ci as st, state, suggest, Ba as t, lr as tt, Ir as u, untracked, _i as ut, ai as v, or as vt, mi as w, waitUntil, watches, whenDefined, whileConnected, within, withoutAccents, Di as wt, hr as x, Wr as xt, Bn as y, ar as yt, $n as z, __privateAdd as zt };

//# sourceMappingURL=core.js.map