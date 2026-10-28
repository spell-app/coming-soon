import "./rolldown-runtime-CYGlBXrH.js";
import { APP_STYLESHEET_ID as e, ApiError as t, Bt as n, BuiltInPacks as r, CODE_LANGUAGES_EVENT as i, CssDisplay as a, DEFAULT_ICON_PACK as o, EN_STRINGS as s, F as c, Ft as l, IconName as u, It as d, LAYER_ORDER as f, LoadOnce as p, Lt as m, PAGE_SCOPE as h, Queued as ee, RUNTIME_KEY as te, RUNTIME_VERSION as ne, Rt as g, SCROLL_LOCK_CLASS as _, SourceError as v, UTILITIES_SHEET as y, VisibilityDirection as b, Vocabulary as re, Vt as x, Warnings as S, after as C, answerOf as w, fetchOk as ie, fetchText as T, isBrowser as ae, lazy as oe, loadUI as se, once as ce, proto as E, soon as le } from "./core.js";
import { i as ue } from "./persist.types-CsZxS8TG.js";
import { animationsCSS as de, colorsCSS as fe, layersCSS as pe, nativeCSS as me, resetCSS as he, sizesCSS as ge, tokensCSS as _e, typographyCSS as ve, utilitiesCSS as ye } from "./styles.js";
//#region src/runtime/Api.ts
var be = class Api {
	latest = /* @__PURE__ */ new Map();
	url(e, t = {}) {
		return e.replace(xe, (n, r) => {
			let i = t[r];
			if (i == null) throw TypeError(`Api.url():  no value for {${r}} in ${e};  pass it in the URL data`);
			return encodeURIComponent(String(i));
		}).replace(Se, (e, n) => {
			let r = t[n];
			return r == null ? "" : `/${encodeURIComponent(String(r))}`;
		});
	}
	async request({ url: e, urlData: t, method: n = "GET", data: r, throttle: i = 0, key: a = e, signal: o, timeout: s, headers: c, responseType: l = "auto" }) {
		let u = this.url(e, t), d = new AbortController();
		i > 0 && (this.latest.get(a)?.abort(new DOMException("Superseded by a newer request", "AbortError")), this.latest.set(a, d));
		let f = [
			d.signal,
			o,
			s ? AbortSignal.timeout(s) : void 0
		], p = AbortSignal.any(f.filter((e) => !!e));
		try {
			i > 0 && await this.delay(i, p);
			let e = {
				method: n,
				headers: new Headers(c),
				signal: p
			};
			n === "GET" || n === "HEAD" ? u = this.withQuery(u, r) : this.setBody(e, r);
			let t = await ie(u, (e) => Api.failed(n, e), e);
			return await this.read(t, n, l);
		} finally {
			this.latest.get(a) === d && this.latest.delete(a);
		}
	}
	delay(e, t) {
		return new Promise((n, r) => {
			if (t.aborted) return r(t.reason);
			let i = C(e / 1e3, () => n());
			t.addEventListener("abort", () => {
				i.cancel(), r(t.reason);
			}, { once: !0 });
		});
	}
	withQuery(e, t) {
		if (!this.isPlainObject(t)) return e;
		let n = new URLSearchParams();
		for (let [e, r] of Object.entries(t)) for (let t of Array.isArray(r) ? r : [r]) t != null && n.append(e, String(t));
		let r = n.toString();
		return r ? e + (e.includes("?") ? "&" : "?") + r : e;
	}
	setBody(e, t) {
		if (t !== void 0) {
			if (this.isPlainObject(t) || Array.isArray(t)) {
				e.body = JSON.stringify(t);
				let n = e.headers;
				n.has("Content-Type") || n.set("Content-Type", "application/json");
			} else e.body = t;
		}
	}
	async read(e, t, n) {
		if (n === "response") return e;
		if (t === "HEAD" || e.status === 204) return;
		if (n === "json") return e.json();
		if (n === "text") return e.text();
		let r = e.headers.get("Content-Type") ?? "";
		return /[/+]json\b/.test(r) ? e.json() : e.text();
	}
	isPlainObject(e) {
		if (typeof e != "object" || !e) return !1;
		let t = Object.getPrototypeOf(e);
		return t === Object.prototype || t === null;
	}
	static failed(e, { url: n, response: r, error: i }) {
		return r ? new t(`Api.request():  ${e} ${n} answered ${w(r)}`, { cause: { response: r } }) : i instanceof Error ? i : Error(String(i));
	}
}, xe = /\{([\w-]+)\}/g, Se = /\/?\{\/([\w-]+)\}/g, Ce = [oe], D, O = class _Browser {
	constructor() {
		x(D, 5, this);
	}
	get supports() {
		return this.detect();
	}
	get isChromium() {
		let e = this.navigator?.userAgentData?.brands;
		return e ? e.some((e) => e.brand === "Chromium") : /Chrom(e|ium)\//.test(this.userAgent);
	}
	get isFirefox() {
		return /Firefox\//.test(this.userAgent);
	}
	get isSafari() {
		let e = this.userAgent;
		return /Safari\//.test(e) && !/Chrom(e|ium)\/|Edg\/|Android/.test(e);
	}
	get isIOS() {
		let e = this.navigator;
		if (!e) return !1;
		let { userAgent: t } = e;
		return /iPad|iPhone|iPod/.test(t) || /Mac/.test(t) && e.maxTouchPoints > 1;
	}
	get isApple() {
		return _Browser.isApplePlatform(this.navigator);
	}
	get isTouch() {
		return this.matches("(pointer: coarse)") || (this.navigator?.maxTouchPoints ?? 0) > 0;
	}
	get isReducedMotion() {
		return this.matches("(prefers-reduced-motion: reduce)");
	}
	get isDark() {
		return this.matches(ue);
	}
	get navigator() {
		return globalThis.navigator;
	}
	get userAgent() {
		return this.navigator?.userAgent ?? "";
	}
	matches(e) {
		return typeof matchMedia == "function" && matchMedia(e).matches;
	}
	detect() {
		let e = ae(), t = typeof CSS < "u" && typeof CSS.supports == "function";
		return {
			anchorPositioning: t && probe(() => CSS.supports("anchor-name: --x")),
			popover: e && probe(() => Object.hasOwn(HTMLElement.prototype, "popover")),
			popoverHint: e && probe(() => this.popoverHintReflects()),
			invokers: e && probe(() => "commandForElement" in HTMLButtonElement.prototype),
			dialogClosedBy: e && probe(() => "closedBy" in HTMLDialogElement.prototype),
			closeWatcher: "CloseWatcher" in globalThis,
			baseSelect: t && probe(() => CSS.supports("appearance", "base-select")),
			styleContainerQueries: e && probe(() => this.parsesStyleQuery()),
			startingStyle: "CSSStartingStyleRule" in globalThis,
			customStates: typeof ElementInternals < "u" && "states" in ElementInternals.prototype,
			viewTransitions: e && "startViewTransition" in document,
			temporal: "Temporal" in globalThis,
			interpolateSize: t && probe(() => CSS.supports("interpolate-size: allow-keywords")),
			anchoredQueries: t && probe(() => CSS.supports("container-type: anchored")),
			fieldSizing: t && probe(() => CSS.supports("field-sizing: content"))
		};
		function probe(e) {
			try {
				return e();
			} catch {
				return !1;
			}
		}
	}
	popoverHintReflects() {
		let e = document.createElement("div");
		return e.setAttribute("popover", "hint"), e.popover === "hint";
	}
	parsesStyleQuery() {
		let e = new CSSStyleSheet();
		e.replaceSync("@container style(--ui-probe: 1) { a { color: red } }");
		let t = e.cssRules[0];
		return typeof CSSContainerRule < "u" && t instanceof CSSContainerRule && /style\(/.test(t.conditionText);
	}
	static isApplePlatform(e = globalThis.navigator) {
		return !!e && we.test(e.platform || e.userAgent);
	}
};
D = m(null), l(D, 2, "supports", Ce, O), d(D, O), g(O, "Browser");
var k = O, we = /Mac|iPhone|iPad|iPod/i, CodeLanguages = class {
	version = 0;
	languages = /* @__PURE__ */ new Map();
	register(e, t) {
		let n = {
			...t,
			name: e.toLowerCase()
		};
		for (let r of [e, ...t.aliases ?? []]) this.languages.set(r.toLowerCase(), n);
		this.version++, globalThis.document?.dispatchEvent(new Event(i));
	}
	find(e) {
		let t = e.toLowerCase(), n = this.languages.get(t);
		if (n) return { language: n };
		let r = t.indexOf("/");
		if (r < 0) return;
		let i = this.languages.get(t.slice(0, r));
		return i ? {
			language: i,
			variant: t.slice(r + 1)
		} : void 0;
	}
	detectable() {
		return [...new Set(this.languages.values())].filter((e) => e.detect && e.grammar);
	}
}, A = class RovingTabindex {
	container;
	source;
	orientation;
	wrap;
	onChange;
	tabindex;
	listeners = new AbortController();
	constructor(e) {
		let { container: t, items: n, orientation: r = "vertical", wrap: i = !0, activeIndex: a, onChange: o, tabindex: s = "roving" } = e;
		this.container = t, this.source = n, this.orientation = r, this.wrap = i, this.onChange = o, this.tabindex = s, this._activeIndex = a ?? this.initialIndex(), this.refresh();
	}
	get items() {
		return typeof this.source == "function" ? this.source() : Array.from(this.container.querySelectorAll(this.source));
	}
	get activeIndex() {
		return this._activeIndex;
	}
	_activeIndex = 0;
	get activeItem() {
		return this.items[this._activeIndex];
	}
	focus(e) {
		let t = this.items[e];
		t && (this.setActive(e), t.focus());
	}
	refresh() {
		if (this.tabindex === "left alone") return;
		let e = this.items;
		this._activeIndex >= e.length && (this._activeIndex = Math.max(0, e.length - 1)), e.forEach((e, t) => e.setAttribute("tabindex", t === this._activeIndex ? "0" : "-1"));
	}
	detach = () => this.listeners.abort();
	onKeyDown = (e) => {
		if (e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented) return !1;
		let t = this.items, n = this.indexOfEvent(e, t);
		if (n < 0) return !1;
		let r = this.targetIndex(e.key, n, t);
		return r === void 0 || r === n ? !1 : (e.preventDefault(), this.focus(r), !0);
	};
	onFocusIn = (e) => {
		let t = this.items, n = this.indexOfEvent(e, t);
		n >= 0 && n !== this._activeIndex && this.setActive(n);
	};
	targetIndex(e, t, n) {
		let r = getComputedStyle(this.container).direction === "rtl", i = this.orientation !== "vertical", a = this.orientation !== "horizontal", o = 0;
		if (a && e === c.arrowDown) o = 1;
		else if (a && e === c.arrowUp) o = -1;
		else if (i && e === c.arrowRight) o = r ? -1 : 1;
		else if (i && e === c.arrowLeft) o = r ? 1 : -1;
		else if (e === c.home) return this.seek(-1, 1, n);
		else if (e === c.end) return this.seek(n.length, -1, n);
		else return;
		return this.seek(t, o, n);
	}
	seek(e, t, n) {
		let r = n.length, i = e < 0 || e >= r, a = e;
		for (let o = 0; o < r; o++) {
			if (a += t, a < 0 || a >= r) {
				if (i) return this._activeIndex;
				if (!this.wrap) return e;
				a = (a + r) % r;
			}
			if (this.isEnabled(n[a])) return a;
		}
		return i ? this._activeIndex : e;
	}
	indexOfEvent(e, t) {
		let n = e.composedPath();
		return t.findIndex((e) => n.includes(e));
	}
	isEnabled(e) {
		return !e.hidden && !e.matches(":disabled") && e.getAttribute("aria-disabled") !== "true";
	}
	setActive(e) {
		this._activeIndex = e, this.refresh();
		let t = this.items[e];
		t && this.onChange?.(t, e);
	}
	initialIndex() {
		let e = this.items.findIndex((e) => e.getAttribute("tabindex") === "0" || e.getAttribute("aria-selected") === "true");
		return Math.max(0, e);
	}
	static attach(e) {
		let t = new RovingTabindex(e), { signal: n } = t.listeners;
		return t.container.addEventListener("keydown", t.onKeyDown, { signal: n }), t.container.addEventListener("focusin", t.onFocusIn, { signal: n }), t;
	}
	static arrowKey(e, t) {
		return new RovingTabindex(t).onKeyDown(e);
	}
}, Focus = class {
	activeElementDeep(e = document) {
		let t = e.activeElement;
		for (; t?.shadowRoot?.activeElement;) t = t.shadowRoot.activeElement;
		let n = (e.ownerDocument ?? e).body;
		return !t || t === n ? void 0 : t;
	}
	focusables(e) {
		let t = [], n = e instanceof Document ? e.documentElement : e;
		return n instanceof Element ? this.visit(n, t) : this.visitChildren(n, t), t;
	}
	first(e) {
		return this.focusables(e)[0];
	}
	last(e) {
		return this.focusables(e).at(-1);
	}
	enter(e) {
		let t = this.focusables(e);
		(t.find((e) => e.hasAttribute("autofocus")) ?? t[0])?.focus();
	}
	moveOutOf(e) {
		let t = e.ownerDocument, n = this.activeElementDeep(t);
		if (!n || !this.containsDeep(e, n)) return;
		let r = this.focusables(t), i = r.findLastIndex((t) => this.containsDeep(e, t)), a = (i >= 0 ? r.slice(i + 1) : r.filter((t) => e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING)).find((t) => !this.containsDeep(e, t));
		a ? a.focus() : n.blur();
	}
	containsDeep(e, t) {
		let n = t;
		for (; n;) {
			if (n === e) return !0;
			n = n.assignedSlot ?? n.parentNode ?? hostOf(n);
		}
		return !1;
		function hostOf(e) {
			return e instanceof ShadowRoot ? e.host : void 0;
		}
	}
	trap(e) {
		let t = e.ownerDocument, n = new AbortController(), r = {
			capture: !0,
			signal: n.signal
		};
		return t.addEventListener("keydown", (t) => this.trapTab(e, t), r), t.addEventListener("focusin", () => this.pullFocusInto(e), r), () => n.abort();
	}
	roving(e) {
		return A.attach(e);
	}
	arrowKey(e, t) {
		return A.arrowKey(e, t);
	}
	trapTab(e, t) {
		if (t.key !== c.tab || t.ctrlKey || t.metaKey) return;
		let n = this.focusables(e);
		if (!n.length) return t.preventDefault();
		let r = this.activeElementDeep(e.ownerDocument), i = n[0], a = n.at(-1);
		t.shiftKey && (r === i || !this.containsDeep(e, r)) ? (t.preventDefault(), a.focus()) : !t.shiftKey && (r === a || !this.containsDeep(e, r)) && (t.preventDefault(), i.focus());
	}
	pullFocusInto(e) {
		let t = this.activeElementDeep(e.ownerDocument);
		t && !this.containsDeep(e, t) && this.first(e)?.focus();
	}
	visit(e, t) {
		if (!(e.hasAttribute("inert") || e.hasAttribute("hidden"))) {
			if (e instanceof HTMLSlotElement) {
				let n = e.assignedElements({ flatten: !0 });
				if (n.length) {
					for (let e of n) this.visit(e, t);
					return;
				}
			} else if (e.checkVisibility({ visibilityProperty: !0 })) e instanceof HTMLElement && this.isTabbable(e) && t.push(e);
			else if (getComputedStyle(e).display !== a.contents) return;
			this.visitChildren(e.shadowRoot ?? e, t);
		}
	}
	visitChildren(e, t) {
		for (let n of e.children) this.visit(n, t);
	}
	isTabbable(e) {
		return e.tabIndex < 0 || e instanceof HTMLDialogElement && !e.hasAttribute("tabindex") || e.matches(":disabled") || e.shadowRoot?.delegatesFocus || e instanceof HTMLInputElement && e.type === "hidden" ? !1 : (e instanceof HTMLAnchorElement || e instanceof HTMLAreaElement) && !e.href ? e.hasAttribute("tabindex") : !0;
	}
}, Te = [ce], j, M = class _I18n {
	constructor({ locale: e, browser: t } = {}) {
		x(j, 5, this), n(this, "locale"), n(this, "packs", /* @__PURE__ */ new Map()), n(this, "scoped", /* @__PURE__ */ new Map()), n(this, "defaults", { ...s }), n(this, "scopedDefaults", /* @__PURE__ */ new Map()), n(this, "browser"), n(this, "polyfill"), n(this, "formatters", /* @__PURE__ */ new Map()), this.locale = e ?? globalThis.navigator?.language ?? N, this.browser = t;
	}
	register(e, t, n) {
		if (n === void 0) return void this.packs.set(e, {
			...this.packs.get(e),
			...t
		});
		let r = this.scoped.get(e);
		r || this.scoped.set(e, r = /* @__PURE__ */ new Map()), r.set(n, {
			...r.get(n),
			...t
		});
	}
	registerDictionary(e) {
		e.texts && this.register(e.lang, e.texts);
		for (let [t, { texts: n }] of Object.entries(e.components ?? {})) n && this.register(e.lang, n, t);
	}
	registerDefaults(e, t) {
		this.scopedDefaults.set(t, {
			...this.scopedDefaults.get(t),
			...e
		}), Object.assign(this.defaults, {
			...e,
			...this.defaults
		});
	}
	t(e, t, n) {
		let r = this.lookup(e, n) ?? e;
		return t ? r.replace(/\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : e) : r;
	}
	has(e, t) {
		return this.lookup(e, t) !== void 0;
	}
	formatDate(e, t = { dateStyle: "medium" }, n = this.locale) {
		return this.dateFormat(t, n).format(e);
	}
	formatNumber(e, t = {}) {
		return this.numberFormat(t).format(e);
	}
	weekdays(e = "long", t = this.locale) {
		let n = this.dateFormat({
			weekday: e,
			timeZone: "UTC"
		}, t);
		return Array.from({ length: 7 }, (e, t) => n.format(Date.UTC(P, 0, 1 + t)));
	}
	months(e = "long", t = this.locale) {
		let n = this.dateFormat({
			month: e,
			timeZone: "UTC"
		}, t);
		return Array.from({ length: 12 }, (e, t) => n.format(Date.UTC(P, t, 1)));
	}
	firstDayOfWeek(e = this.locale) {
		try {
			let t = new Intl.Locale(e), n = t.getWeekInfo?.() ?? t.weekInfo;
			return n ? n.firstDay % 7 : 0;
		} catch {
			return 0;
		}
	}
	get temporal() {
		return this.browser?.supports.temporal ? globalThis.Temporal : this.polyfill;
	}
	loadTemporal() {
		let e = this.temporal;
		return e ? Promise.resolve(e) : import("./TemporalPolyfill-D9mr7_wA.js").then(({ Temporal: e }) => this.polyfill = e);
	}
	displayName(e, t) {
		try {
			return new Intl.DisplayNames([this.locale, N], { type: e }).of(t) ?? t;
		} catch {
			return t;
		}
	}
	lookup(e, t) {
		for (let n of this.chain()) {
			let r = (t === void 0 ? void 0 : this.scoped.get(n)?.get(t)?.[e]) ?? this.packs.get(n)?.[e];
			if (r !== void 0) return r;
		}
		return (t === void 0 ? void 0 : this.scopedDefaults.get(t)?.[e]) ?? this.defaults[e];
	}
	chain() {
		let e = this.locale.split("-")[0] ?? this.locale;
		return [.../* @__PURE__ */ new Set([
			this.locale,
			e,
			N
		])];
	}
	dateFormat(e, t = this.locale) {
		return this.cachedFormat(Intl.DateTimeFormat, t, e);
	}
	numberFormat(e) {
		return this.cachedFormat(Intl.NumberFormat, this.locale, e);
	}
	cachedFormat(e, t, n) {
		let r = `${e.name}|${t}|${JSON.stringify(n)}`, i = this.formatters.get(r);
		return i || this.formatters.set(r, i = new e(t, n)), i;
	}
};
j = m(null), l(j, 1, "loadTemporal", Te, M), d(j, M), g(M, "I18n");
var Ee = M, N = "en", P = 2023, F = class IconPack {
	index;
	url;
	base;
	prefix;
	names;
	constructor({ index: e, url: t, options: n = {} }) {
		this.index = e, this.url = t;
		let r = n.base ? new URL(n.base, IconPack.pageUrl()).href : new URL("./", t).href;
		this.base = r.endsWith("/") ? r : `${r}/`, this.prefix = n.prefix?.toLowerCase(), this.names = u.claim(Object.entries(e.icons).map(([e, t]) => [e, t.alias]));
	}
	get id() {
		return this.index.id;
	}
	answers(e) {
		return e === this.id || e === this.prefix;
	}
	resolve(e) {
		let t = this.names.get(e);
		return t === void 0 ? void 0 : {
			...this.iconFor(t),
			name: e
		};
	}
	icons() {
		let e = /* @__PURE__ */ new Map();
		for (let [t, n] of this.names) e.set(n, [...e.get(n) ?? [], t]);
		return Object.keys(this.index.icons).map((t) => ({
			...this.iconFor(t),
			names: e.get(t) ?? []
		}));
	}
	iconFor(e) {
		let t = this.index.icons[e], n = this.index.defaults ?? {};
		return {
			pack: this.id,
			key: e,
			url: new URL(`${e}.svg`, this.base).href,
			width: t.width ?? n.width ?? I,
			height: t.height ?? n.height ?? I
		};
	}
	static async load(e, t) {
		let n = (await import(
			/* @vite-ignore */
			e
)).default;
		if (!n || typeof n.id != "string" || typeof n.icons != "object") throw TypeError(`IconPack.load():  ${e} isn't an icon pack index (no \`id\` / \`icons\`);  check the URL`);
		return new IconPack({
			index: n,
			url: e,
			options: t
		});
	}
	static pageUrl() {
		return globalThis.document?.baseURI;
	}
}, I = 512, De = class IconPacks {
	sources = [];
	started = !1;
	templates;
	templateLoads;
	registered;
	parent;
	constructor({ parent: e } = {}) {
		this.parent = e;
		let t = e?.();
		this.templates = t?.templates ?? /* @__PURE__ */ new Map(), this.templateLoads = t?.templateLoads ?? new p({ failures: "forgotten offline" }), this.registered = t?.registered ?? /* @__PURE__ */ new Map(), this.started = !!e;
	}
	scope(e, { assets: t, parent: n } = {}) {
		let r = new IconPacks({ parent: n ?? (() => this) });
		for (let n of e) r.add({
			source: n,
			options: {}
		}, t);
		return r;
	}
	use(e, t = {}) {
		return t.only && this.reset(), this.start(), this.add({
			source: e,
			options: t
		}).promise;
	}
	reset() {
		return this.start({ empty: !0 }), this.sources = [], this;
	}
	remove(e) {
		let t = this.sources.findIndex((t) => t.pack?.id === e);
		t >= 0 && this.sources.splice(t, 1);
	}
	get packs() {
		this.start();
		let e = this.sources.flatMap((e) => e.pack ? [e.pack] : []);
		return this.parent ? [...this.parent().packs, ...e] : e;
	}
	get ready() {
		this.start();
		let e = Promise.all(this.sources.map((e) => e.promise));
		return Promise.all([e, this.parent?.().ready]).then(() => void 0);
	}
	resolve(e) {
		this.start();
		let { prefix: t, name: n } = u.split(e);
		for (let e of this.packs.toReversed()) {
			if (t !== void 0 && !e.answers(t)) continue;
			let r = e.resolve(n);
			if (r) return r;
		}
	}
	peek(e) {
		let { prefix: t, name: n } = u.split(e);
		if (t === void 0 && this.registered.has(n)) return this.registered.get(n);
		let r = this.resolve(e)?.url;
		return r === void 0 ? void 0 : this.templates.get(r);
	}
	async get(e) {
		let { prefix: t, name: n } = u.split(e);
		if (t === void 0 && this.registered.has(n)) return this.registered.get(n);
		await this.ready;
		let r = this.resolve(e)?.url;
		return r === void 0 ? void 0 : this.load(r);
	}
	register(e, t) {
		let n = typeof t == "string" ? IconPacks.parse(t) : IconPacks.adopt(t);
		if (!n) throw TypeError(`UI.icons.register():  "${e}" is not an <svg>;  pass SVG text or an <svg> element`);
		this.registered.set(u.normalize(e), n);
	}
	start({ empty: e = !1 } = {}) {
		this.started || (this.started = !0, !(typeof document > "u" || e) && this.add({
			source: o,
			options: {}
		}));
	}
	add(e, t) {
		let n = e, r = IconPacks.urlFor(n.source, t);
		return n.promise = r === void 0 ? Promise.resolve(void 0) : F.load(r, n.options).then((e) => n.pack = e, (e) => {
			S.warn(L, `icon pack ${r} didn't load:`, e);
		}), n.options.only && (this.sources = []), this.sources.push(n), n;
	}
	static urlFor(e, t) {
		try {
			let n = F.pageUrl();
			return r.has(e) ? r.url(e, t === void 0 ? void 0 : new URL(t, n).href) : new URL(e, n).href;
		} catch (t) {
			S.warn(L, `icon pack ${e} has no usable URL:`, t);
			return;
		}
	}
	load(e) {
		return this.templateLoads.get(e, () => this.fetchTemplate(e)).catch(() => void 0);
	}
	async fetchTemplate(e) {
		let { text: t } = await T(e, ({ response: t, error: n }) => t ? /* @__PURE__ */ Error(`UI.icons:  ${e} answered ${w(t)}`) : n instanceof Error ? n : Error(String(n))), n = IconPacks.parse(t);
		return n && this.templates.set(e, n), n;
	}
	static parse(e) {
		let t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
		return t instanceof SVGSVGElement ? IconPacks.adopt(t) : void 0;
	}
	static adopt(e) {
		let t = document.importNode(e, !0), n = t.getAttribute("fill");
		return n === null ? t.setAttribute("fill", "currentColor") : t.style.setProperty("fill", n), t;
	}
}, L = "UI.icons", Ids = class {
	counter = 0;
	next(e = R, t = globalThis.document) {
		let n;
		do
			n = `${e}-${++this.counter}`;
		while (t?.getElementById(n));
		return n;
	}
	ensure(e, t = R) {
		return e.id ||= this.next(t), e.id;
	}
}, R = "ui", Oe = class Chord {
	key;
	keyText;
	modifiers;
	ctrl;
	meta;
	alt;
	shift;
	constructor({ key: e, modifiers: t = [] }) {
		this.key = Chord.normalizeKey(e), this.keyText = e, this.modifiers = t, this.ctrl = t.includes("ctrl"), this.meta = t.includes("meta"), this.alt = t.includes("alt"), this.shift = t.includes("shift");
	}
	get hasCommandModifier() {
		return this.ctrl || this.meta || this.alt;
	}
	toString() {
		return [...[
			this.ctrl && "Ctrl",
			this.meta && "Meta",
			this.alt && "Alt",
			this.shift && "Shift"
		].filter(Boolean), this.key === " " ? "Space" : this.key].join("+");
	}
	matches(e) {
		return e.ctrlKey !== this.ctrl || e.metaKey !== this.meta || e.altKey !== this.alt || e.shiftKey !== this.shift && (!this.isSymbol || this.shift) ? !1 : Chord.normalizeKey(e.key ?? "") === this.key || this.code !== void 0 && e.code === this.code;
	}
	get isSymbol() {
		return this.key.length === 1 && !/[\p{L}\p{N}\s]/u.test(this.key);
	}
	get code() {
		if (/^[a-z]$/.test(this.key)) return `Key${this.key.toUpperCase()}`;
		if (/^[0-9]$/.test(this.key)) return `Digit${this.key}`;
	}
	static parse(e, { isApple: t = k.isApplePlatform() } = {}) {
		let n = Chord.partsOf(e.trim()), r = n.pop()?.trim();
		if (!r) throw SyntaxError(`Chord.parse():  no key in ${JSON.stringify(e)};  end it with one, e.g. "Mod+K"`);
		let i = [];
		for (let r of n) {
			let n = ke[r.trim().toLowerCase()];
			if (!n) throw SyntaxError(`Chord.parse():  unknown modifier ${JSON.stringify(r)} in ${JSON.stringify(e)};  use Mod, Ctrl, Meta, Alt or Shift`);
			let a = n === "mod" ? t ? "meta" : "ctrl" : n;
			i.includes(a) || i.push(a);
		}
		return new Chord({
			key: r,
			modifiers: i
		});
	}
	static partsOf(e) {
		return e === "+" ? [e] : e.endsWith("++") ? [...e.slice(0, -2).split("+"), "+"] : e.split("+");
	}
	static normalizeKey(e) {
		if (e === " ") return e;
		let t = e.toLowerCase();
		return Ae[t] ?? t;
	}
}, ke = {
	mod: "mod",
	modifier: "mod",
	ctrl: "ctrl",
	control: "ctrl",
	meta: "meta",
	cmd: "meta",
	command: "meta",
	alt: "alt",
	option: "alt",
	shift: "shift"
}, Ae = {
	esc: "escape",
	space: " ",
	spacebar: " ",
	up: "arrowup",
	down: "arrowdown",
	left: "arrowleft",
	right: "arrowright",
	del: "delete",
	return: "enter",
	plus: "+"
}, je = [E], z, B = class _Keyboard {
	constructor({ isApple: e = !1 } = {}) {
		n(this, "isApple"), n(this, "registrations", []), n(this, "scopes", [h]), n(this, "listener"), n(this, "onKeyDown", /* @__PURE__ */ g((e) => {
			if (e.defaultPrevented || e.isComposing) return;
			let t = this.activeScope, n = e.composedPath(), r = isEditable(n[0]);
			for (let i = this.registrations.length - 1; i >= 0; i--) {
				let { chord: a, handler: o, options: s, scope: c } = this.registrations[i];
				if ((c === t || s.global) && a.matches(e) && (!r || a.hasCommandModifier || s.inEditable) && (!s.target || n.includes(s.target)) && o(e) !== !1) {
					s.preventDefault !== !1 && e.preventDefault(), s.stopPropagation && e.stopPropagation();
					return;
				}
			}
			function isEditable(e) {
				return e instanceof HTMLElement ? e.isContentEditable || e instanceof HTMLTextAreaElement || e instanceof HTMLSelectElement ? !0 : e instanceof HTMLInputElement && !Ne.has(e.type) : !1;
			}
			g(isEditable, "isEditable");
		}, "onKeyDown")), this.isApple = e;
	}
	chord(e, { isApple: t = this.isApple } = {}) {
		return Oe.parse(e, { isApple: t });
	}
	register({ scope: e = h, chord: t, handler: n, ...r }) {
		let i = {
			scope: e,
			chord: typeof t == "string" ? this.chord(t) : t,
			handler: n,
			options: r
		};
		return this.warnConflicts && this.checkConflict(i), this.registrations.push(i), this.connect(), () => {
			let e = this.registrations.indexOf(i);
			e >= 0 && this.registrations.splice(e, 1);
		};
	}
	get activeScope() {
		return this.scopes.at(-1) ?? "page";
	}
	pushScope(e) {
		this.scopes.push(e);
	}
	popScope(e) {
		if (e === "page") return;
		let t = this.scopes.lastIndexOf(e);
		t > 0 && this.scopes.splice(t, 1);
	}
	dispose() {
		this.listener?.abort(), this.listener = void 0, this.registrations.length = 0, this.scopes.length = 1;
	}
	connect() {
		this.listener || typeof document > "u" || (this.listener = new AbortController(), document.addEventListener("keydown", this.onKeyDown, {
			capture: !0,
			signal: this.listener.signal
		}));
	}
	checkConflict(e) {
		let t = e.chord.toString(), n = this.registrations.find((n) => n.scope === e.scope && n.chord.toString() === t && n.options.target === e.options.target);
		n && S.warn("UI.keyboard", `"${t}" registered twice in scope "${e.scope}";  the newer handler wins:`, {
			existing: n.handler,
			added: e.handler
		});
	}
};
z = m(null), l(z, 13, "warnConflicts", je, B), d(z, B), g(B, "Keyboard"), n(B, "warnConflicts", x(z, 8, B, !1)), x(z, 11, B);
var Me = B, Ne = /* @__PURE__ */ new Set([
	"button",
	"checkbox",
	"radio",
	"range",
	"reset",
	"submit",
	"color",
	"file",
	"image"
]), Pe = class Modals {
	static provider;
	register(e) {
		let t = Modals.provider;
		return Modals.provider = e, () => {
			Modals.provider === e && (Modals.provider = t);
		};
	}
	confirm(e) {
		return this.registeredProvider.confirm(this.optionsFor(e));
	}
	alert(e) {
		return this.registeredProvider.alert(this.optionsFor(e));
	}
	prompt(e) {
		return this.registeredProvider.prompt(this.optionsFor(e));
	}
	get registeredProvider() {
		if (!Modals.provider) throw Error("UI.modals:  ui-modal not registered;  import its family (`spell/ui/ui-modal`) first");
		return Modals.provider;
	}
	optionsFor(e) {
		return typeof e == "string" ? { message: e } : e;
	}
}, Fe = [E], V, H = class _Overlays {
	constructor({ keyboard: e, focus: t, browser: r, styles: i }) {
		n(this, "keyboard"), n(this, "focus"), n(this, "browser"), n(this, "styles"), n(this, "stack", []), n(this, "scrollLocks", 0), n(this, "press"), n(this, "listeners"), n(this, "counter", 0), n(this, "onPointerDown", /* @__PURE__ */ g((e) => {
			this.press = {
				path: e.composedPath(),
				x: e.clientX,
				y: e.clientY
			};
		}, "onPointerDown")), n(this, "onClick", /* @__PURE__ */ g((e) => {
			let t = this.press;
			this.press = void 0;
			let n = {
				path: e.composedPath(),
				x: e.clientX,
				y: e.clientY,
				isKeyboard: !e.detail
			};
			for (let e of this.topmostPerPool()) e.closeOnOutsideClick && (this.isInside(e, n) || t && this.isInside(e, t) || this.dismiss(e, "outside"));
		}, "onClick")), this.keyboard = e, this.focus = t, this.browser = r, this.styles = i;
	}
	open(e) {
		if (this.recordOf(e)) return;
		let t = e.kind === U, n = {
			entry: e,
			pool: e.pool ?? (t ? U : Le),
			closeOnEscape: e.closeOnEscape ?? !t,
			closeOnOutsideClick: e.closeOnOutsideClick ?? !t,
			modal: e.modal ?? Re.has(e.kind),
			scope: `overlay-${++this.counter}`,
			restoreTo: e.restoreFocus === !1 ? void 0 : this.focus.activeElementDeep()
		};
		this.stack.push(n), (n.closeOnEscape || n.modal) && this.keyboard.pushScope(n.scope), n.closeOnEscape && this.watchEscape(n), n.modal && this.lockScroll(), this.listen();
	}
	close(e) {
		let t = this.recordOf(e);
		t && (this.stack.splice(this.stack.indexOf(t), 1), t.unwatchEscape?.(), this.keyboard.popScope(t.scope), t.modal && this.unlockScroll(), this.stack.length || this.unlisten(), this.restoreFocus(t));
	}
	isOpen(e) {
		return !!this.recordOf(e);
	}
	topmost(e) {
		return this.stack.findLast((t) => !e || t.entry.kind === e)?.entry;
	}
	get entries() {
		return this.stack.map((e) => e.entry);
	}
	closeAll(e) {
		let t = this.stack.filter((t) => !e || t.pool === e).reverse();
		for (let e of t) e.entry.onDismiss("close-all");
	}
	dispose() {
		for (let e of [...this.stack].reverse()) this.close(e.entry);
	}
	watchEscape(e) {
		let t = globalThis.CloseWatcher;
		this.useCloseWatcher && this.browser.supports.closeWatcher && t ? this.watchCloseRequests(e, t) : e.unwatchEscape = this.keyboard.register({
			scope: e.scope,
			chord: c.escape,
			handler: /* @__PURE__ */ g(() => void this.dismiss(e, "escape"), "handler"),
			inEditable: !0
		});
	}
	watchCloseRequests(e, t) {
		let n = new t();
		n.addEventListener("close", () => {
			n = void 0, Promise.resolve(this.dismiss(e, "escape")).then(() => {
				this.stack.includes(e) && this.watchCloseRequests(e, t);
			});
		}), e.unwatchEscape = () => {
			n?.destroy(), n = void 0;
		};
	}
	dismiss(e, t) {
		return e.entry.onDismiss(t);
	}
	pressedInvokerOf(e) {
		return !!this.press && _Overlays.invokes(this.press.path, e);
	}
	listen() {
		if (this.listeners) return;
		this.listeners = new AbortController();
		let e = {
			capture: !0,
			signal: this.listeners.signal
		};
		document.addEventListener("pointerdown", this.onPointerDown, e), document.addEventListener("click", this.onClick, e);
	}
	unlisten() {
		this.listeners?.abort(), this.listeners = void 0, this.press = void 0;
	}
	topmostPerPool() {
		let e = /* @__PURE__ */ new Map();
		for (let t of this.stack) e.set(t.pool, t);
		return [...e.values()];
	}
	isInside(e, t) {
		let { element: n, anchor: r } = e.entry;
		if (r && t.path.includes(r) || _Overlays.invokes(t.path, n)) return !0;
		if (!t.path.includes(n)) return !1;
		let i = t.path[0];
		if (i instanceof HTMLDialogElement && !t.isKeyboard) {
			let e = i.getBoundingClientRect();
			return t.x >= e.left && t.x <= e.right && t.y >= e.top && t.y <= e.bottom;
		}
		return !0;
	}
	lockScroll() {
		if (this.scrollLocks++ > 0) return;
		let e = document.documentElement;
		this.styles?.register("scroll-lock", ze, { page: !0 }), e.style.setProperty(W, `${Math.max(0, window.innerWidth - e.clientWidth)}px`), e.classList.add(_);
	}
	unlockScroll() {
		if (this.scrollLocks === 0 || --this.scrollLocks > 0) return;
		let e = document.documentElement;
		e.classList.remove(_), e.style.removeProperty(W);
	}
	restoreFocus(e) {
		let t = e.restoreTo;
		if (!(t instanceof HTMLElement || t instanceof SVGElement) || !t.isConnected) return;
		let n = this.focus.activeElementDeep();
		(!n || this.focus.containsDeep(e.entry.element, n)) && t.focus({ preventScroll: !0 });
	}
	recordOf(e) {
		return this.stack.find((t) => t.entry === e);
	}
	static invokes(e, t) {
		return !!t.id && e.some((e) => e.getAttribute?.("commandfor") === t.id);
	}
};
V = m(null), l(V, 13, "useCloseWatcher", Fe, H), d(V, H), g(H, "Overlays"), n(H, "useCloseWatcher", x(V, 8, H, !0)), x(V, 11, H);
var Ie = H, U = "toast", Le = "default", Re = /* @__PURE__ */ new Set([
	"modal",
	"flyout",
	"dimmer"
]), W = "--ui-scrollbar-width", ze = `${f}
@layer ui.base {
  html.${_} {
    overflow: hidden;
    padding-inline-end: var(${W}, 0px);
  }
}`, PropertyControls = class {
	kinds = new Map(Object.entries(Ve));
	choiceSources = /* @__PURE__ */ new Map();
	rules = /* @__PURE__ */ new Map();
	schemas = /* @__PURE__ */ new Map();
	add(e, t) {
		this.kinds.set(e, t);
	}
	get(e) {
		return this.kinds.get(e);
	}
	kindFor(e) {
		let t;
		for (let [n, r] of this.kinds) r.types?.includes(e) && (t = n);
		return t ?? Be;
	}
	addChoices(e, t) {
		this.choiceSources.set(e, t);
	}
	async choices(e) {
		let t = this.choiceSources.get(e);
		if (t) try {
			return await t();
		} catch {
			return [];
		}
	}
	addRule(e, t) {
		this.rules.set(e, t);
	}
	rule(e) {
		return this.rules.get(e);
	}
	addSchema(e, t) {
		this.schemas.set(e, t);
	}
	schema(e) {
		return this.schemas.get(e);
	}
}, Be = "input", Ve = {
	input: {
		tag: "ui-input",
		types: ["text", "data"]
	},
	text: { tag: "ui-textarea" },
	number: {
		tag: "ui-input",
		attributes: { type: "number" },
		types: ["number"]
	},
	date: {
		tag: "ui-input",
		attributes: { type: "date" },
		types: ["date"]
	},
	select: {
		tag: "ui-select",
		choices: "items",
		types: ["choice"]
	},
	icon: {
		tag: "ui-icon-picker",
		types: ["icon"]
	},
	buttons: {
		tag: "ui-radio",
		choices: "radios"
	},
	range: { tag: "ui-slider" },
	checkbox: {
		tag: "ui-checkbox",
		types: ["boolean"]
	},
	toggle: {
		tag: "ui-checkbox",
		attributes: { type: "toggle" }
	},
	color: {
		tag: "ui-input",
		attributes: { type: "color" }
	},
	editor: {
		tag: "ui-property-editor",
		types: ["thing"]
	}
}, He = class Sources {
	saver;
	cache = new p({ failures: "forgotten" });
	resolve(e, t = document.baseURI) {
		if (location.protocol === "file:") throw new v(`Sources.resolve():  can't reach ${e} from a page opened from disk;  serve the page`, { cause: { kind: "file-protocol" } });
		let n = new URL(e, t);
		if (n.origin !== location.origin) throw new v(`Sources.resolve():  ${n.href} is on another origin;  serve it from ${location.origin}`, { cause: { kind: "cross-origin" } });
		return n;
	}
	load(e, { fresh: t, signal: n } = {}) {
		let r;
		try {
			r = this.resolve(e);
		} catch (e) {
			return Promise.reject(e);
		}
		let i = this.cache.get(r.href, () => this.fetch(r.href), { fresh: t });
		return n ? Sources.abortable(i, n) : i;
	}
	forget(e) {
		this.cache.forget(e === void 0 ? void 0 : new URL(e, document.baseURI).href);
	}
	async fetch(e) {
		let { text: t, response: n } = await T(e, Sources.failed, { cache: "no-cache" });
		return {
			url: e,
			text: t,
			etag: n.headers.get("etag") ?? void 0,
			type: n.headers.get("content-type") ?? void 0
		};
	}
	async save(e) {
		let t = this.resolve(e.url).href;
		if (!this.saver) throw new v(`Sources.save():  this page has no saver for ${t};  set \`UI.sources.saver\``, { cause: { kind: "no-saver" } });
		let n;
		try {
			n = await this.saver({
				...e,
				url: t
			});
		} catch (e) {
			if (e instanceof v) throw e;
			let { kind: n, message: r, status: i } = e ?? {};
			throw new v(`Sources.save():  the saver failed for ${t}:  ${typeof r == "string" ? r : String(e)}`, { cause: {
				kind: v.isKind(n) ? n : "save",
				status: typeof i == "number" ? i : void 0,
				error: e
			} });
		}
		return e.fragment ? this.cache.forget(t) : this.cache.set(t, {
			url: t,
			text: e.text,
			etag: n.etag
		}), n;
	}
	static abortable(e, t) {
		return t.aborted ? Promise.reject(t.reason) : new Promise((n, r) => {
			let onAbort = () => r(t.reason);
			t.addEventListener("abort", onAbort, { once: !0 }), e.then((e) => {
				t.removeEventListener("abort", onAbort), n(e);
			}, (e) => {
				t.removeEventListener("abort", onAbort), r(e);
			});
		});
	}
	static failed({ url: e, response: t, error: n }) {
		if (t) return new v(`Sources.load():  ${e} answered ${w(t)};  check the path`, { cause: {
			kind: "load",
			status: t.status
		} });
		let r = n instanceof Error ? n.message : String(n);
		return new v(`Sources.load():  ${e} didn't answer (${r});  is its server up?`, { cause: {
			kind: "load",
			error: n
		} });
	}
}, Ue = class AppStylesheet {
	sheet;
	onSheetChange;
	syncDelay;
	element;
	elementListeners;
	text = "";
	generation = 0;
	timer;
	treeObserver;
	elementObserver;
	constructor({ onSheetChange: e, syncDelay: t = 30 }) {
		this.onSheetChange = e, this.syncDelay = t, this.sheet = this.createSheet(document.baseURI);
	}
	get ready() {
		return this.latest;
	}
	latest = Promise.resolve();
	get isStarted() {
		return !!this.treeObserver;
	}
	start() {
		if (this.isStarted || typeof document > "u") return this.latest;
		this.treeObserver = new MutationObserver(() => this.onTreeChange());
		for (let e of [
			document.documentElement,
			document.head,
			document.body
		]) e && this.treeObserver.observe(e, { childList: !0 });
		return this.elementObserver = new MutationObserver(() => this.syncSoon()), this.latest = this.sync(), this.latest;
	}
	stop() {
		this.treeObserver?.disconnect(), this.elementObserver?.disconnect(), this.treeObserver = this.elementObserver = void 0, this.elementListeners?.abort(), this.element = this.elementListeners = void 0, this.timer?.cancel();
	}
	onTreeChange() {
		(document.getElementById("ui-app-stylesheet") ?? void 0) !== this.element && this.syncSoon();
	}
	syncSoon() {
		this.timer?.cancel(), this.latest = new Promise((e) => {
			this.timer = C(this.syncDelay / 1e3, () => e(this.sync()));
		});
	}
	watch(e) {
		e !== this.element && (this.elementListeners?.abort(), this.elementObserver?.disconnect(), this.element = e, this.elementListeners = void 0, e && this.elementObserver && (e instanceof HTMLLinkElement ? (this.elementObserver.observe(e, {
			attributes: !0,
			attributeFilter: [
				"href",
				"media",
				"disabled"
			]
		}), this.elementListeners = new AbortController(), e.addEventListener("load", () => this.syncSoon(), { signal: this.elementListeners.signal })) : this.elementObserver.observe(e, {
			characterData: !0,
			childList: !0,
			subtree: !0
		})));
	}
	async sync() {
		let t = ++this.generation, n = document.getElementById(e), r = n instanceof HTMLLinkElement || n instanceof HTMLStyleElement ? n : void 0;
		n && !r && S.warn(G, "must be a <link rel=\"stylesheet\"> or <style>:", n), this.watch(r);
		let i = "", a = document.baseURI;
		try {
			r instanceof HTMLLinkElement ? r.href && (a = r.href, i = await this.readLink(r)) : r && (i = await this.inlineImports(r.textContent ?? "", a));
		} catch (e) {
			S.warn(G, "couldn't read the stylesheet:", e);
			return;
		}
		t === this.generation && this.apply(i, a);
	}
	apply(e, t) {
		if (t !== this.sheet.baseURLForUI) {
			let n = this.createSheet(t);
			n.replaceSync(e), this.sheet = n, this.text = e, this.onSheetChange(n);
		} else e !== this.text && (this.sheet.replaceSync(e), this.text = e);
	}
	createSheet(e) {
		let t = new CSSStyleSheet({ baseURL: e });
		return t.baseURLForUI = e, t;
	}
	async readLink(e) {
		if (e.disabled) return "";
		let t = await this.loadedSheet(e), n;
		try {
			n = t ? this.serialize(t.cssRules) : await this.fetchSheetText(e.href, e.href);
		} catch {
			n = await this.fetchSheetText(e.href, e.href);
		}
		return this.wrap(n, { media: e.media.trim() });
	}
	loadedSheet(e) {
		return e.sheet && e.sheet.href === e.href ? Promise.resolve(e.sheet) : new Promise((t) => {
			e.addEventListener("load", () => t(e.sheet ?? void 0), { once: !0 }), e.addEventListener("error", () => t(void 0), { once: !0 });
		});
	}
	serialize(e) {
		let t = [];
		for (let n of e) {
			if (!(n instanceof CSSImportRule)) {
				t.push(n.cssText);
				continue;
			}
			let e = n.styleSheet;
			if (!e) continue;
			let r;
			try {
				r = this.absolutizeUrls(this.serialize(e.cssRules), e.href ?? document.baseURI);
			} catch {
				S.warn(G, `can't read cross-origin @import ${n.href};  use a <style> instead`);
				continue;
			}
			let i = {
				layer: n.layerName ?? void 0,
				supports: n.supportsText ?? void 0,
				media: n.media.mediaText
			};
			t.push(this.wrap(r, i));
		}
		return t.join("\n");
	}
	async inlineImports(e, t) {
		let n = [...e.matchAll(K)];
		if (!n.length) return e;
		let r = await Promise.all(n.map(async (e) => {
			let n = new URL(e[2] ?? e[4] ?? "", t).href, r = await this.fetchSheetText(n, n);
			return this.wrap(r, this.importConditionsFor(e[5] ?? ""));
		})), i = 0;
		return e.replace(K, () => r[i++] ?? "");
	}
	async fetchSheetText(e, t) {
		let { text: n } = await T(e, AppStylesheet.failed), r = this.absolutizeUrls(n, t);
		return K.test(r) && S.warn(G, `nested @import in ${e} is ignored (only one level is inlined)`), K.lastIndex = 0, r;
	}
	importConditionsFor(e) {
		let t = e.trim(), n, r, i = /^layer(?:\(\s*([^)]*?)\s*\))?/.exec(t);
		i && (n = i[1] ?? "", t = t.slice(i[0].length).trim());
		let a = /^supports\(((?:[^()]|\([^()]*\))*)\)/.exec(t);
		return a && (r = a[1].trim(), t = t.slice(a[0].length).trim()), {
			layer: n,
			supports: r,
			media: t
		};
	}
	wrap(e, { layer: t, supports: n, media: r }) {
		let i = e;
		return t !== void 0 && (i = `@layer ${t} {\n${i}\n}`), n && (i = `@supports (${n.replace(/^\((.*)\)$/, "$1")}) {\n${i}\n}`), r && r !== "all" && (i = `@media ${r} {\n${i}\n}`), t === void 0 ? i : `${f}\n${i}`;
	}
	absolutizeUrls(e, t) {
		return e.replace(We, (e, n, r) => {
			try {
				return `url(${n}${new URL(r, t).href}${n})`;
			} catch {
				return e;
			}
		});
	}
	static failed({ url: e, response: t, error: n }) {
		return t ? /* @__PURE__ */ Error(`AppStylesheet.fetchSheetText():  ${e} answered ${w(t)};  check the stylesheet's URL`) : n instanceof Error ? n : Error(String(n));
	}
}, G = `#${e}`, K = /@import\s+(?:url\(\s*(['"]?)([^'")]+)\1\s*\)|(['"])([^'"]+)\3)\s*([^;]*);/g, We = /url\(\s*(['"]?)(?![a-z][\w+.-]*:|#)([^'")]+)\1\s*\)/gi, Styles = class {
	sheets = /* @__PURE__ */ new Map();
	texts = /* @__PURE__ */ new Map();
	owned = /* @__PURE__ */ new WeakSet();
	pageNames = /* @__PURE__ */ new Set();
	shadowNames = /* @__PURE__ */ new Set();
	linkedNames = /* @__PURE__ */ new Set();
	foundation = [];
	utilities = [y];
	roots = /* @__PURE__ */ new Set();
	rootNames = /* @__PURE__ */ new WeakMap();
	isWatchingLoad = !1;
	register(e, t, { page: n = !1, linked: r = !1, shadow: i = !1 } = {}) {
		if (t === "") return this.unregister(e);
		let a = this.sheets.get(e), o = !1;
		typeof t == "string" ? (a ||= new CSSStyleSheet(), this.texts.get(e) !== t && (this.texts.has(e) && a.cssRules[0], a.replaceSync(t), this.texts.set(e, t))) : t !== a && (o = !!a, a = t, this.texts.delete(e));
		let s = !this.sheets.has(e);
		this.sheets.set(e, a), this.owned.add(a);
		let c = n && !this.pageNames.has(e), l = n && r && !this.linkedNames.has(e);
		c && this.pageNames.add(e), l && this.linkedNames.add(e), (c || l || o && this.pageNames.has(e)) && this.refreshPage();
		let u = i && !this.shadowNames.has(e);
		return u && this.shadowNames.add(e), (s || o || u) && this.refreshRoots(), a;
	}
	unregister(e) {
		let t = this.sheets.delete(e);
		return this.texts.delete(e), this.linkedNames.delete(e), this.shadowNames.delete(e), this.pageNames.delete(e) && this.refreshPage(), t && this.refreshRoots(), new CSSStyleSheet();
	}
	registerOnce(e) {
		for (let [t, n] of Object.entries(e)) this.has(t) || this.register(t, n);
	}
	sheet(e) {
		return this.sheets.get(e);
	}
	has(e) {
		return this.sheets.has(e);
	}
	setFoundation(e) {
		this.foundation = [...e], this.refreshRoots();
	}
	setUtilities(e) {
		this.utilities = [...e], this.refreshRoots();
	}
	adoptInto(e, t) {
		let n = this.rootNames.has(e);
		this.rootNames.set(e, [...t]), n || this.roots.add(new WeakRef(e)), this.startApp(), this.push(e);
	}
	get appSheetReady() {
		return this.startApp() ?? Promise.resolve();
	}
	get appSheet() {
		return this.app?.sheet;
	}
	app;
	dispose() {
		this.app?.stop(), this.app = void 0, this.roots.clear();
	}
	startApp() {
		if (typeof document < "u") return this.app || (this.app = new Ue({ onSheetChange: (e) => {
			this.owned.add(e), this.refreshRoots();
		} }), this.owned.add(this.app.sheet)), this.app.start(), this.app.ready;
	}
	push(e) {
		let t = this.rootNames.get(e) ?? [], n = e.adoptedStyleSheets.filter((e) => !this.owned.has(e)), r = [
			...this.lookup(this.foundation),
			...this.lookup(t),
			...n,
			...this.lookup(this.utilities),
			...this.lookup(this.shadowNames),
			...this.app ? [this.app.sheet] : []
		];
		e.adoptedStyleSheets = [...new Set(r)];
	}
	refreshRoots() {
		for (let e of this.roots) {
			let t = e.deref();
			t ? this.push(t) : this.roots.delete(e);
		}
	}
	refreshPage() {
		if (typeof document > "u") return;
		let e = document.adoptedStyleSheets.filter((e) => !this.owned.has(e)), t = this.isPageLinked, n = this.lookup([...this.pageNames].filter((e) => !t || !this.linkedNames.has(e)));
		document.adoptedStyleSheets = [...e, ...n], !t && !this.isWatchingLoad && document.readyState !== "complete" && (this.isWatchingLoad = !0, window.addEventListener("load", () => this.refreshPage(), { once: !0 }));
	}
	get isPageLinked() {
		return getComputedStyle(document.documentElement).getPropertyValue(Ge).trim() === Ke;
	}
	lookup(e) {
		let t = [];
		for (let n of e) {
			let e = this.sheets.get(n);
			e && t.push(e);
		}
		return t;
	}
}, Ge = "--ui-page-sheet", Ke = "linked", Themes = class {
	static RENAMED = {
		studio: "merlot",
		"spell-brand": "spell"
	};
	base = q;
	own = [
		"spell",
		"glass",
		"fruity",
		"merlot",
		"paper",
		"midnight",
		"crisp",
		"pop",
		"matrix"
	];
	slots = {
		base: q,
		theme: "theme"
	};
	sheets = Object.keys(J).sort();
	current;
	styles;
	calls = 0;
	constructor({ styles: e }) {
		this.styles = e;
	}
	has(e) {
		return e in J;
	}
	load(e) {
		let t = J[e];
		if (!t) throw TypeError(`Themes.load():  no sheet \`${e}\`;  pick one of:  ${this.sheets.join(", ")}`);
		return t();
	}
	async apply(e) {
		if (e === "" && (e = void 0), e !== void 0 && (!this.has(e) || e === Je)) throw TypeError(`Themes.apply():  \`${e}\` isn't a theme;  pick \`${q}\` or one of:  ${this.own.join(", ")}`);
		let t = ++this.calls;
		this.current = e;
		let n = e === void 0 ? "" : await this.load(q), r = e === void 0 || e === q ? "" : await this.load(e);
		if (t !== this.calls) return;
		let i = {
			page: !0,
			shadow: !0
		};
		this.styles.has(this.slots.base) || this.styles.register(this.slots.theme, "", i), this.styles.register(this.slots.base, n, i), this.styles.register(this.slots.theme, r, i);
	}
	async scopedTokens(e, t) {
		let [n, r] = await Promise.all([this.load(q), this.load(e)]), i = [this.styles.sheet(this.slots.base), this.styles.sheet(this.slots.theme)], a = typeof document > "u" ? [] : document.adoptedStyleSheets.filter((e) => !i.includes(e)), o = [n, r].map((e) => {
			let t = new CSSStyleSheet();
			return t.replaceSync(e), t;
		});
		return [...a, ...o].map((e) => rootRulesOn(e.cssRules, t)).join("\n");
	}
};
function rootRulesOn(e, t) {
	let n = [];
	for (let r of e) if (r instanceof CSSStyleRule) {
		let e = r.selectorText.split(",").map((e) => e.trim()).filter((e) => qe.test(e));
		e.length && n.push(`${e.map((e) => `${e} ${t}`).join(", ")} { ${r.style.cssText} }`);
	} else if (r instanceof CSSMediaRule || r instanceof CSSSupportsRule) {
		let e = rootRulesOn(r.cssRules, t);
		e && n.push(`@${r instanceof CSSMediaRule ? "media" : "supports"} ${r.conditionText} { ${e} }`);
	} else r instanceof CSSLayerBlockRule && n.push(rootRulesOn(r.cssRules, t));
	return n.filter(Boolean).join("\n");
}
var qe = /^:root(?:[.:[][^\s>+~]*)?$/, q = "classic", Je = "dark", J = Object.fromEntries(Object.entries(/* #__PURE__ */ Object.assign({
	"../styles/themes/classic.css": () => import("./classic-DCTQrteU.js").then((e) => e.default),
	"../styles/themes/crisp.css": () => import("./crisp-CoZRRDuQ.js").then((e) => e.default),
	"../styles/themes/dark.css": () => import("./dark-CbUdPe0a.js").then((e) => e.default),
	"../styles/themes/fruity.css": () => import("./fruity-CQFYeRlh.js").then((e) => e.default),
	"../styles/themes/glass.css": () => import("./glass-CAfW11kL.js").then((e) => e.default),
	"../styles/themes/matrix.css": () => import("./matrix-CqA59hiF.js").then((e) => e.default),
	"../styles/themes/merlot.css": () => import("./merlot-DOXLuUaU.js").then((e) => e.default),
	"../styles/themes/midnight.css": () => import("./midnight-BnoVOrhC.js").then((e) => e.default),
	"../styles/themes/paper.css": () => import("./paper-CynH8ZuT.js").then((e) => e.default),
	"../styles/themes/pop.css": () => import("./pop-D2i9V_rG.js").then((e) => e.default),
	"../styles/themes/spell.css": () => import("./spell-BFtLICm7.js").then((e) => e.default)
})).map(([e, t]) => [e.replace(/^.*\//, "").replace(/\.css$/, ""), t])), Ye = class Toasts {
	static provider;
	register(e) {
		let t = Toasts.provider;
		return Toasts.provider = e, () => {
			Toasts.provider === e && (Toasts.provider = t);
		};
	}
	show(e) {
		return this.registeredProvider.show(e);
	}
	dismiss(e) {
		this.registeredProvider.dismiss(e);
	}
	get registeredProvider() {
		if (!Toasts.provider) throw Error("UI.toasts:  ui-toast not registered;  import its family (`spell/ui/ui-toast`) first");
		return Toasts.provider;
	}
}, Xe, Ze = [E], Y;
Xe = [E];
var X = class _Transitions {
	constructor({ browser: e }) {
		n(this, "browser"), n(this, "running", /* @__PURE__ */ new WeakMap()), this.browser = e;
	}
	animate({ element: e, name: t, direction: n, ...r }) {
		if (this.running.get(e)?.finish(!1), n === "in" && this.reveal(e), this.browser.isReducedMotion) return e.removeAttribute(Z), n === "out" && this.hide(e), Promise.resolve(!0);
		this.setOptions(e, r);
		let i = `${t} ${n}`;
		e.getAttribute(Z) === i && (e.removeAttribute(Z), e.offsetWidth), e.setAttribute(Z, i);
		let a = this.expectedDuration(e);
		return a === 0 ? (this.cleanup(e, n, r), Promise.resolve(!0)) : new Promise((t) => {
			let i = new AbortController(), o = /* @__PURE__ */ g((t) => {
				t.target === e && c(!0);
			}, "onEnd"), s = C((a + this.failSafeDelay) / 1e3, () => c(!0)), c = /* @__PURE__ */ g((a) => {
				this.running.get(e) === l && (this.running.delete(e), s.cancel(), i.abort(), a && this.cleanup(e, n, r), t(a));
			}, "finish"), l = {
				direction: n,
				finish: c
			};
			this.running.set(e, l);
			for (let t of tt) e.addEventListener(t, o, { signal: i.signal });
		});
	}
	isAnimating(e, t) {
		let n = this.running.get(e);
		return !!n && (!t || n.direction === t);
	}
	async whenTransitionEnds(e, { subtree: t = !1 } = {}) {
		await Promise.allSettled(e.getAnimations({ subtree: t }).map((e) => e.finished));
	}
	reveal(e) {
		e.hidden = !1, e.hasAttribute(this.forcedDisplayAttribute) && (e.style.removeProperty("display"), e.removeAttribute(this.forcedDisplayAttribute));
	}
	hide(e) {
		e.hidden = !0, e.isConnected && getComputedStyle(e).display !== a.none && (e.style.setProperty("display", a.none), e.setAttribute(this.forcedDisplayAttribute, ""));
	}
	setOptions(e, { duration: t, easing: n }) {
		t !== void 0 && e.style.setProperty($e, typeof t == "number" ? `${t}ms` : t), n !== void 0 && e.style.setProperty(et, n);
	}
	cleanup(e, t, n) {
		t === "out" && this.hide(e), e.removeAttribute(Z), n.duration !== void 0 && e.style.removeProperty($e), n.easing !== void 0 && e.style.removeProperty(et);
	}
	expectedDuration(e) {
		if (!e.isConnected) return 0;
		let t = getComputedStyle(e), n = t.animationName.split(",").map((e) => e.trim()), r = t.animationDuration.split(",").map(toMs), i = t.animationDelay.split(",").map(toMs), a = t.animationIterationCount.split(",").map((e) => Number.parseFloat(e) || 1), o = 0;
		return n.forEach((e, t) => {
			if (e === "none") return;
			let n = r[t % r.length] ?? 0, s = i[t % i.length] ?? 0, c = a[t % a.length] ?? 1;
			o = Math.max(o, Math.max(0, s) + n * c);
		}), o;
		function toMs(e) {
			let t = Number.parseFloat(e);
			return Number.isNaN(t) ? 0 : e.trim().endsWith("ms") ? t : t * 1e3;
		}
	}
};
Y = m(null), l(Y, 13, "failSafeDelay", Ze, X), l(Y, 13, "forcedDisplayAttribute", Xe, X), d(Y, X), g(X, "Transitions"), n(X, "failSafeDelay", x(Y, 8, X, 100)), x(Y, 11, X), n(X, "forcedDisplayAttribute", x(Y, 12, X, "data-ui-hidden-by-animation")), x(Y, 15, X);
var Qe = X, Z = "data-ui-animation", $e = "--ui-animation-duration", et = "--ui-animation-easing", tt = ["animationend", "animationcancel"], Visibility = class {
	transitions;
	constructor({ transitions: e }) {
		this.transitions = e;
	}
	observe(e, t = {}) {
		let n = new nt({
			element: e,
			options: t
		});
		return () => n.dispose();
	}
	lazyImage(e, t = {}) {
		let n = e.getAttribute(st.src);
		if (!n) return () => void 0;
		let r = this.observe(e, {
			once: !0,
			offset: t.offset,
			context: t.context,
			onOnScreen: () => {
				r(), this.load(e, n, t);
			}
		});
		return r;
	}
	async load(e, t, n) {
		let { transition: r = ct.transition, duration: i = ct.duration } = n, a = e.getAttribute(st.srcset), o = new Image();
		a && (o.srcset = a), o.src = t;
		try {
			await o.decode();
		} catch {}
		a && (e.srcset = a), e.src = t, r !== !1 && await this.transitions.animate({
			element: e,
			name: r,
			direction: "in",
			duration: i
		}), n.onLoad?.(e);
	}
}, nt = class VisibilityWatch {
	element;
	target;
	hasWaited = !1;
	hasWarned = !1;
	options;
	observers = [];
	occurred = /* @__PURE__ */ new Set();
	previous;
	lastTop;
	checks = new ee({
		when: le,
		run: () => {
			this.observers.length && this.check();
		}
	});
	unwatchSize;
	constructor({ element: e, options: t }) {
		this.element = e, this.options = t, this.target = VisibilityWatch.boxOf(e) ?? e, this.build();
		let n = t.context;
		if (n) {
			let e = new ResizeObserver(() => this.build());
			e.observe(n), this.unwatchSize = () => e.disconnect();
		} else {
			let t = e.ownerDocument.defaultView, onResize = () => this.build();
			t?.addEventListener("resize", onResize), this.unwatchSize = () => t?.removeEventListener("resize", onResize);
		}
	}
	dispose() {
		for (let e of this.observers.splice(0)) e.disconnect();
		this.checks.cancel(), this.unwatchSize();
	}
	build() {
		for (let e of this.observers.splice(0)) e.disconnect();
		let { element: e, target: t } = this, n = this.options.context, r = this.options.offset ?? 0, i = n ? n.clientHeight : e.ownerDocument.documentElement.clientHeight, a = n ?? e.ownerDocument, o = Math.max(0, i - r - 1), s = Math.max(0, i - 1);
		for (let [e, n] of [
			[`${-r}px 0px 0px 0px`, [0, 1]],
			[`${-r}px 0px ${-o}px 0px`, [0]],
			[`${-s}px 0px 0px 0px`, [0]]
		]) {
			let r = new IntersectionObserver(() => this.checkSoon(), {
				root: a,
				rootMargin: e,
				threshold: [...n]
			});
			r.observe(t), this.observers.push(r);
		}
	}
	checkSoon() {
		this.checks.ask();
	}
	check() {
		if (!this.retarget()) return;
		let e = this.target.getBoundingClientRect();
		if (!e.width && !e.height) return;
		let t = this.calculate(e), n = this.previous;
		this.previous = t;
		for (let e of it) n?.[e] && !t[e] && this.reverse(ot[e], t);
		for (let e of rt) this.forward(at[e], t[e], t);
		this.options.onUpdate?.(t);
	}
	retarget() {
		let e = this.target;
		if (e.isConnected && e !== this.element) return !0;
		let t = VisibilityWatch.boxOf(this.element);
		if (t && t !== e) return this.target = t, this.build(), !1;
		if (t || !this.element.isConnected || getComputedStyle(this.element).display !== a.contents) return !0;
		let n = this.element.ready;
		return !this.hasWaited && n instanceof Promise && (this.hasWaited = !0, n.then(() => this.observers.length && this.checkSoon())), !1;
	}
	calculate(e) {
		let t = this.options.context, n = (t ? t.getBoundingClientRect().top + t.clientTop : 0) + (this.options.offset ?? 0), r = t ? t.getBoundingClientRect().top + t.clientTop + t.clientHeight : this.element.ownerDocument.documentElement.clientHeight, i = n >= e.top, a = n >= e.bottom, o = r >= e.top && !i, s = r >= e.bottom && !a, c = i && !a, l = (o || c) && !a, u = this.lastTop;
		this.lastTop = e.top;
		let d = u === void 0 || u === e.top ? b.static : e.top < u ? b.down : b.up;
		return {
			topPassed: i,
			bottomPassed: a,
			topVisible: o,
			bottomVisible: s,
			passing: c,
			onScreen: l,
			offScreen: !l,
			pixelsPassed: c ? n - e.top : 0,
			percentagePassed: c && e.height ? (n - e.top) / e.height : 0,
			direction: d
		};
	}
	forward(e, t, n) {
		let { once: r = !0, continuous: i = !1 } = this.options;
		if (!t) {
			r || this.occurred.delete(e);
			return;
		}
		(i || !this.occurred.has(e)) && (this.occurred.add(e), this.options[e]?.(n));
	}
	reverse(e, t) {
		(this.options.once ?? !0) && this.occurred.has(e) || (this.occurred.add(e), this.options[e]?.(t));
	}
	static boxOf(e) {
		let t = getComputedStyle(e).display;
		if (t === a.none) return;
		if (t !== a.contents) return e;
		let n = e instanceof HTMLSlotElement ? e.assignedElements({ flatten: !0 }) : [...(e.shadowRoot ?? e).children];
		for (let e of n) {
			let t = VisibilityWatch.boxOf(e);
			if (t) return t;
		}
	}
}, rt = [
	"onScreen",
	"offScreen",
	"passing",
	"topVisible",
	"bottomVisible",
	"topPassed",
	"bottomPassed"
], it = [
	"passing",
	"topVisible",
	"bottomVisible",
	"topPassed",
	"bottomPassed"
], at = {
	onScreen: "onOnScreen",
	offScreen: "onOffScreen",
	passing: "onPassing",
	topVisible: "onTopVisible",
	bottomVisible: "onBottomVisible",
	topPassed: "onTopPassed",
	bottomPassed: "onBottomPassed"
}, ot = {
	passing: "onPassingReverse",
	topVisible: "onTopVisibleReverse",
	bottomVisible: "onBottomVisibleReverse",
	topPassed: "onTopPassedReverse",
	bottomPassed: "onBottomPassedReverse"
}, st = {
	src: "data-src",
	srcset: "data-srcset"
}, ct = {
	transition: "fade",
	duration: 1e3
}, lt = [E], Q, $ = class _UIRuntime {
	constructor() {
		n(this, "browser", new k()), n(this, "ids", new Ids()), n(this, "keyboard", new Me({ isApple: this.browser.isApple })), n(this, "focus", new Focus()), n(this, "styles", new Styles()), n(this, "themes", new Themes({ styles: this.styles })), n(this, "overlays", new Ie({
			keyboard: this.keyboard,
			focus: this.focus,
			browser: this.browser,
			styles: this.styles
		})), n(this, "transitions", new Qe({ browser: this.browser })), n(this, "visibility", new Visibility({ transitions: this.transitions })), n(this, "i18n", new Ee({ browser: this.browser })), n(this, "toasts", new Ye()), n(this, "modals", new Pe()), n(this, "api", new be()), n(this, "icons", new De()), n(this, "sources", new He()), n(this, "code", new CodeLanguages()), n(this, "vocabulary", new re()), n(this, "propertyControls", new PropertyControls()), n(this, "ready"), this.registerFoundation(), this.ready = Promise.resolve();
	}
	async load() {
		return await this.ready, this;
	}
	toast(e) {
		return this.toasts.show(e);
	}
	observeVisibility(e, t) {
		return this.visibility.observe(e, t);
	}
	registerFoundation() {
		for (let [e, t] of Object.entries(ft)) this.styles.register(e, t, {
			page: !0,
			linked: !0
		});
		this.styles.setFoundation(Object.keys(dt));
	}
	static get instance() {
		let e = globalThis;
		return e[te] || (e[te] = new _UIRuntime());
	}
	static load() {
		return se();
	}
};
Q = m(null), l(Q, 13, "version", lt, $), d(Q, $), g($, "UIRuntime"), n($, "version", x(Q, 8, $, ne)), x(Q, 11, $);
var ut = $, dt = {
	layers: pe,
	reset: he,
	tokens: _e,
	colors: fe,
	sizes: ge,
	animations: de
}, ft = {
	...dt,
	[y]: ye,
	typography: ve,
	native: me
};
//#endregion
export { ut as UIRuntime };

//# sourceMappingURL=UIRuntime-DoM9kxHU.js.map