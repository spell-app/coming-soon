import "./rolldown-runtime-CYGlBXrH.js";
import { Bt as e, Disclosure as t, Ft as n, It as r, Lt as i, Rt as a, UIComponent as o, Vt as s, beforeNextPaint as c, controlled as l, cssState as u, on as d, onChange as ee, proto as te, protoMerged as ne, state as f, untracked as p, zt as m } from "./core.js";
import "./ui-modal.js";
import { Show as h } from "solid-js";
import { className as g, createComponent as _, delegateEvents as re, effect as v, getOwner as y, insert as b, readShallow as x, ref as S, setAttribute as C, setStyleProperty as ie, style as w, template as T } from "@solidjs/web";
//#region src/components/ui-zoom/ImageZoom.ts
var E = class ImageZoom {
	static imageFor(e) {
		if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		let t = e.target instanceof Element ? e.target : null, n = t?.closest("img") ?? t?.closest("a")?.querySelector("img");
		return n && ImageZoom.isZoomable(n) ? n : void 0;
	}
	static isZoomable(e) {
		if (e.closest(oe)) return !1;
		let t = e.closest("a");
		if (t && !ImageZoom.linksImage(t, e)) return !1;
		let n = e.getBoundingClientRect();
		return Math.max(n.width, n.height) < se ? !1 : e.naturalWidth > n.width + 1 || e.naturalHeight > n.height + 1 || !!e.closest("figure") || !!t;
	}
	static onClick = (e) => {
		let t = ImageZoom.imageFor(e);
		return t ? (e.preventDefault(), ImageZoom.show(t), !0) : !1;
	};
	static onPointerOver = (e) => {
		let t = e.target instanceof HTMLImageElement ? e.target : null;
		t && !t.hasAttribute(k) && ImageZoom.isZoomable(t) && t.setAttribute(k, "");
	};
	static show(e) {
		let t = document.querySelector(`body > ${D}[${A}]`);
		t || (t = document.createElement(D), t.setAttribute(A, ""), document.body.append(t));
		let n = e.getRootNode();
		ImageZoom.shown = n instanceof ShadowRoot ? n.host : e, t.setAttribute("alt", e.alt), t.setAttribute("src", e.currentSrc || e.src);
	}
	static bounce(e, t) {
		if (!e || O.isStill()) return;
		let n = `translateY(${t > 0 ? -O.bouncePx : O.bouncePx}px)`;
		e.animate([
			{ transform: "none" },
			{ transform: n },
			{ transform: "none" }
		], {
			duration: O.bounceMs,
			easing: "ease-out"
		});
	}
	static async slide(e, t, n) {
		let r = e.shadowRoot?.querySelector(".figure");
		if (!r || O.isStill()) return n();
		let i = r.getBoundingClientRect(), a = r.cloneNode(!0);
		Object.assign(a.style, {
			position: "fixed",
			left: `${i.left}px`,
			top: `${i.top}px`,
			width: `${i.width}px`,
			margin: "0",
			pointerEvents: "none"
		}), r.after(a);
		let o = t > 0 ? "-100vh" : "100vh", s = t > 0 ? "100vh" : "-100vh";
		r.style.transform = `translateY(${s})`, n(), await new Promise((e) => c(() => e(void 0))), await r.querySelector("img")?.decode().catch(() => void 0);
		let l = {
			duration: O.slideMs,
			easing: O.ease
		};
		a.animate([{ transform: "none" }, { transform: `translateY(${o})` }], l).finished.then(() => a.remove(), () => a.remove()), r.animate([{ transform: `translateY(${s})` }, { transform: "none" }], l).finished.then(() => r.style.transform = "", () => r.style.transform = "");
	}
	static shown;
	static zoomables() {
		return [...document.querySelectorAll(ae)].filter((e) => e instanceof HTMLImageElement ? ImageZoom.isZoomable(e) : !e.hasAttribute(A));
	}
	static step(e, t, n) {
		let r = ImageZoom.zoomables();
		if (r.length < 2) return;
		let i = r.indexOf(t ?? ImageZoom.shown), a = r[(i < 0 ? e > 0 ? -1 : r.length : i) + e];
		if (!a) {
			let n = t ?? document.querySelector(`body > ${D}[${A}]`);
			ImageZoom.bounce(n?.shadowRoot?.querySelector(t ? ".content" : ".figure"), e);
			return;
		}
		if (a.localName === D) {
			n(), a.shadowRoot?.querySelector("button.show")?.click();
			return;
		}
		let o = a instanceof HTMLImageElement ? a : a.shadowRoot?.querySelector("img");
		if (!o) return;
		if (t) {
			ImageZoom.show(o), n();
			return;
		}
		let s = document.querySelector(`body > ${D}[${A}]`);
		s ? ImageZoom.slide(s, e, () => ImageZoom.show(o)) : ImageZoom.show(o);
	}
	static linksImage(e, t) {
		let n = e.href;
		return !n || n === t.src || n === t.currentSrc || ce.test(n);
	}
}, D = "ui-zoom", O = {
	ease: "cubic-bezier(.2, .8, .2, 1)",
	growMs: 320,
	shrinkMs: 240,
	slideMs: 380,
	bouncePx: 40,
	bounceMs: 320,
	isStill: () => matchMedia("(prefers-reduced-motion: reduce)").matches
}, ae = "ui-zoom, ui-image[zoom], img", k = "data-ui-zoom", A = "data-spell-added", oe = "[data-no-zoom], button, ui-button, ui-zoom", se = 64, ce = /^data:image\/|\.(png|jpe?g|gif|webp|avif|svg)([?#]|$)/i, le = {
	tag: "ui-zoom",
	topics: [
		"images",
		"media",
		"overlays"
	],
	aka: [
		"lightbox",
		"zoom",
		"full size",
		"image viewer",
		"magnifier",
		"expand",
		"screenshot",
		"thumbnail"
	],
	noun: "zoom",
	description: "A zoom shows something full size, over the page.  Round any content it shows it shrunk, within a width and height, and full size on a click;  with `src` it shows that image full size.  Escape, a click outside it or its close button close it.",
	attributes: [
		{
			name: "max-width",
			group: "layout",
			kind: "string",
			description: "The widest the shrunk view gets, a CSS length (`320px`, `50%`);  none:  its container's width.  Content past it is cut off, until it's shown full size."
		},
		{
			name: "max-height",
			group: "layout",
			kind: "string",
			description: "The tallest the shrunk view gets, a CSS length (`200px`, `20em`);  none:  as tall as its content.  Content past it is cut off, until it's shown full size."
		},
		{
			name: "shrink",
			group: "layout",
			kind: "string",
			default: "50%",
			description: "How big its content is in the shrunk view, a percentage of its full size:  `50%` by default;  `100%` keeps it full size, cut off by `max-width` / `max-height`."
		},
		{
			name: "open",
			group: "states",
			kind: "boolean",
			description: "Shown full size, over the page.  Set to open it from script;  closing it clears it."
		},
		{
			name: "src",
			group: "link",
			kind: "string",
			description: "An image to show full size, in place of its content:  open while it's set, and cleared as it closes.  The page's zoom for its screenshots (`ImageZoom`) is one of these."
		},
		{
			name: "alt",
			group: "content",
			kind: "string",
			description: "With `src`:  the image's alt text, its caption, and the zoomed image's own name."
		}
	],
	events: [],
	slots: [{
		name: "",
		description: "What it zooms:  any content, shown shrunk, then full size on a click."
	}],
	parts: [
		{
			name: "view",
			description: "The shrunk view of its content, in the page."
		},
		{
			name: "button",
			description: "The button over the shrunk view that shows it full size."
		},
		{
			name: "base",
			description: "The `<ui-modal>`, over the whole window."
		},
		{
			name: "content",
			description: "Its content, full size, in the modal."
		},
		{
			name: "image",
			description: "With `src`:  the image, as large as fits."
		},
		{
			name: "caption",
			description: "With `src`:  its alt text, under it."
		}
	],
	states: [{
		name: "open",
		description: "Shown full size, over the page."
	}],
	texts: [
		{
			key: "show",
			text: "Show full size",
			description: "The name of the button over the shrunk view."
		},
		{
			key: "zoomed",
			text: "{alt}, full size",
			description: "The zoomed image's alt text (its own `alt`)."
		},
		{
			key: "untitled",
			text: "Image, full size",
			description: "The zoomed image's alt text, when it had none."
		}
	]
}, ue = "@layer ui.components.zoom.types{:host{--_ui-zoom-margin:var(--ui-zoom-margin,24px);--_ui-zoom-caption:var(--ui-zoom-caption,2.5em);--_ui-zoom-radius:var(--ui-zoom-radius,var(--ui-radius,4px));inline-size:fit-content;max-inline-size:100%;display:block}:host([src]){display:contents}.view{box-sizing:border-box;border-radius:var(--_ui-zoom-radius);inline-size:fit-content;max-inline-size:100%;position:relative;overflow:hidden}.shrunk{pointer-events:none}.show{border-radius:inherit;cursor:zoom-in;background:0 0;border:0;margin:0;padding:0;position:absolute;inset:0}.show:focus-visible{outline:2px solid var(--ui-focus-color,Highlight);outline-offset:-2px}ui-modal{--ui-modal-dimmer-background:var(--ui-zoom-backdrop,oklch(0% 0 0/.9))}ui-modal::part(modal){width:auto;max-width:none;max-height:none;box-shadow:none;background:0 0;margin:auto;padding:0;overflow:visible;transform:none}ui-modal::part(close){color:#fff;position:fixed;top:12px;right:12px}.figure{cursor:zoom-out;flex-direction:column;align-items:center;gap:8px;margin:0;display:flex}.image{max-width:calc(100vw - 2 * var(--_ui-zoom-margin));max-height:calc(100vh - 2 * var(--_ui-zoom-margin) - var(--_ui-zoom-caption));object-fit:contain;border-radius:var(--_ui-zoom-radius);display:block}.caption{max-width:calc(100vw - 2 * var(--_ui-zoom-margin));color:#fff;text-align:center;line-height:1.4}.content{box-sizing:border-box;inline-size:fit-content;max-width:calc(100vw - 2 * var(--_ui-zoom-margin));max-height:calc(100vh - 2 * var(--_ui-zoom-margin));padding:var(--ui-zoom-padding,16px);border-radius:var(--_ui-zoom-radius);background:var(--ui-zoom-background,var(--ui-surface,Canvas));color:var(--ui-text-color,CanvasText);margin-inline:auto;overflow:auto}}", de = /* @__PURE__ */ T("<div inert><slot>"), fe = /* @__PURE__ */ T("<div><button type=button aria-haspopup=dialog>"), pe = /* @__PURE__ */ T("<ui-modal appearance=basic closable>", 1), me = /* @__PURE__ */ T("<figcaption>"), he = /* @__PURE__ */ T("<figure><img>"), ge = /* @__PURE__ */ T("<div><div><slot>"), j, M, N, P, F, I, L, R, z, B, V, H, U, W, G, K, q, J, Y = class _UIZoom extends (W = o, U = [te], H = [ne], V = [u("open"), l("open")], B = [f], z = [f], R = [p], L = [d("ui-closed", { target: "renderRoot" })], I = [d("ui-closing", { target: "renderRoot" })], F = [d("click", { target: "renderRoot" })], P = [ee("src", "isOpen")], N = [p], M = [d("keydown", { target: "renderRoot" })], j = [p], W) {
	constructor() {
		super(...arguments), s(G, 5, this), m(this, K, s(G, 8, this, !1)), s(G, 11, this), e(this, "disclosure", new t({
			component: this,
			member: "isOpen"
		})), m(this, q, s(G, 12, this)), s(G, 15, this), m(this, J, s(G, 16, this)), s(G, 19, this), e(this, "view"), e(this, "modal"), e(this, "wasShowing", !1), e(this, "isShrinking", !1);
	}
	get isShowing() {
		return !!this.src || this.isOpen;
	}
	get shrinkRatio() {
		let e = Number.parseFloat(this.shrink ?? "");
		return !Number.isFinite(e) || e <= 0 ? be : Math.min(e, 100) / 100;
	}
	get viewStyle() {
		let e = {};
		this.maxWidth && (e["max-inline-size"] = `min(100%, ${this.maxWidth})`), this.maxHeight && (e["max-block-size"] = this.maxHeight);
		let t = this.isOpen ? this.heldSize : void 0;
		return t && Object.assign(e, {
			"inline-size": `${t.width}px`,
			"block-size": `${t.height}px`
		}), e;
	}
	showFullSize() {
		let e = this.view;
		if (e) {
			let t = e.getBoundingClientRect();
			this.heldSize = {
				width: t.width,
				height: t.height
			};
			let n = e.querySelector(`.${Z}`);
			n && (this.fullWidth = Math.round(n.getBoundingClientRect().width / this.shrinkRatio));
		}
		this.disclosure.open();
	}
	onClosed(e) {
		e.target === this.modal && this.shut();
	}
	onClosing(e) {
		e.target === this.modal && (this.isShrinking || this.canMove()) && (e.preventDefault(), this.dismiss());
	}
	onClick(e) {
		e.target instanceof Element && e.target.closest(`.${Q}`) && this.dismiss();
	}
	onShowingChanged() {
		let e = this.isShowing;
		e && !this.wasShowing && this.grow(), this.wasShowing = e;
	}
	get zoomed() {
		return this.modal?.querySelector(`.${$}, .${we}`) ?? null;
	}
	get placeOnPage() {
		let e;
		if (this.src) {
			let t = E.shown, n = t instanceof HTMLImageElement ? t : t?.shadowRoot?.querySelector("img");
			n?.isConnected && (n.currentSrc || n.src) === this.src && (e = n.getBoundingClientRect());
		} else e = this.view?.getBoundingClientRect();
		return e?.width ? e : void 0;
	}
	canMove() {
		return !O.isStill() && !!this.zoomed && !!this.placeOnPage;
	}
	static over(e, t) {
		return `translate(${e.left + e.width / 2 - (t.left + t.width / 2)}px, ${e.top + e.height / 2 - (t.top + t.height / 2)}px) scale(${e.width / t.width})`;
	}
	async grow() {
		if (O.isStill()) return;
		let e = this.zoomed;
		for (let t = 0; !e && t < ye; t++) await new Promise((e) => c(() => e(void 0))), e = this.zoomed;
		let t = this.placeOnPage;
		if (!e || !t) return;
		e instanceof HTMLImageElement && await e.decode().catch(() => void 0);
		let n = [{
			transform: _UIZoom.over(t, e.getBoundingClientRect()),
			opacity: .6
		}, {
			transform: "none",
			opacity: 1
		}];
		e.animate(n, {
			duration: O.growMs,
			easing: O.ease
		});
	}
	async dismiss() {
		if (this.isShrinking) return;
		let e = this.zoomed, t = this.placeOnPage;
		if (!e || !t || O.isStill()) return this.shut();
		this.isShrinking = !0;
		let n = [{
			transform: "none",
			opacity: 1
		}, {
			transform: _UIZoom.over(t, e.getBoundingClientRect()),
			opacity: .4
		}];
		await e.animate(n, {
			duration: O.shrinkMs,
			easing: O.ease,
			fill: "forwards"
		}).finished.catch(() => void 0), this.isShrinking = !1, this.shut();
	}
	onKeyDown(e) {
		let t = _e[e.key];
		if (!t || e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || !this.isShowing) return;
		let n = e.composedPath()[0];
		n instanceof HTMLElement && n.matches(ve) || (e.preventDefault(), E.step(t, this.src ? void 0 : this.domElement, () => this.shut()));
	}
	shut() {
		this.src && this.domElement.removeAttribute("src"), this.disclosure.close();
	}
	render() {
		let e = this;
		return [_(h, {
			get when() {
				return !e.src;
			},
			get children() {
				var t = fe(), n = t.firstChild;
				return S(() => (t) => e.view = t, t), b(t, _(h, {
					get when() {
						return !e.isOpen;
					},
					get children() {
						var t = de(), n = t.firstChild;
						return n._$owner = y(), v(() => ({
							e: x(Z),
							t: String(e.shrinkRatio)
						}), ({ e, t: n }, r) => {
							g(t, e, r?.e), n !== r?.t && ie(t, "zoom", n);
						}), t;
					}
				}), n), n._$$click = () => e.showFullSize(), v(() => ({
					e: x(xe),
					t: e.partForName("view"),
					a: x(e.viewStyle),
					o: x(Se),
					i: e.partForName("button"),
					n: e.translationForKey("show"),
					s: e.disclosure.ariaExpanded,
					h: e.translationForKey("show")
				}), ({ e, t: r, a: i, o: a, i: o, n: s, s: c, h: l }, u) => {
					g(t, e, u?.e), r !== u?.t && C(t, "part", r), w(t, i, u?.a), g(n, a, u?.o), o !== u?.i && C(n, "part", o), s !== u?.n && C(n, "aria-label", s), c !== u?.s && C(n, "aria-expanded", c), l !== u?.h && C(n, "title", l);
				}), t;
			}
		}), (() => {
			var t = pe();
			return S(() => (t) => e.modal = t, t), t._$owner = y(), b(t, _(h, {
				get when() {
					return e.src;
				},
				get fallback() {
					return e.fullContent();
				},
				children: (t) => (() => {
					var n = he(), r = n.firstChild;
					return b(n, _(h, {
						get when() {
							return e.alt;
						},
						get children() {
							var t = me();
							return b(t, () => e.alt), v(() => ({
								e: x(Ce),
								t: e.partForName("caption")
							}), ({ e, t: n }, r) => {
								g(t, e, r?.e), n !== r?.t && C(t, "part", n);
							}), t;
						}
					}), null), v(() => ({
						e: x(Q),
						t: x($),
						a: e.partForName("image"),
						o: t(),
						i: e.alt ? e.translationForKey("zoomed", { alt: e.alt }) : e.translationForKey("untitled")
					}), ({ e, t, a: i, o: a, i: o }, s) => {
						g(n, e, s?.e), g(r, t, s?.t), i !== s?.a && C(r, "part", i), a !== s?.o && C(r, "src", a), o !== s?.i && C(r, "alt", o);
					}), n;
				})()
			})), v(() => ({
				e: x(e.rootClass),
				t: e.partForName("base"),
				a: e.isShowing ? "" : void 0
			}), ({ e, t: n, a: r }, i) => {
				g(t, e, i?.e), n !== i?.t && C(t, "part", n), r !== i?.a && C(t, "visible", r);
			}), t;
		})()];
	}
	fullContent() {
		let e = this;
		return _(h, {
			get when() {
				return e.isOpen;
			},
			get children() {
				var t = ge(), n = t.firstChild, r = n.firstChild;
				return r._$owner = y(), v(() => ({
					e: x(we),
					t: e.partForName("content"),
					a: x(e.fullWidth ? { "inline-size": `${e.fullWidth}px` } : void 0)
				}), ({ e, t: r, a: i }, a) => {
					g(t, e, a?.e), r !== a?.t && C(t, "part", r), w(n, i, a?.a);
				}), t;
			}
		});
	}
};
G = i(W), K = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), n(G, 4, "isOpen", V, Y, K), n(G, 4, "heldSize", B, Y, q), n(G, 4, "fullWidth", z, Y, J), n(G, 1, "showFullSize", R, Y), n(G, 1, "onClosed", L, Y), n(G, 1, "onClosing", I, Y), n(G, 1, "onClick", F, Y), n(G, 1, "onShowingChanged", P, Y), n(G, 1, "dismiss", N, Y), n(G, 1, "onKeyDown", M, Y), n(G, 1, "shut", j, Y), n(G, 13, "vocabulary", U, Y), n(G, 13, "elementSetup", H, Y), r(G, Y), a(Y, "UIZoom"), e(Y, "vocabulary", s(G, 20, Y, le)), s(G, 23, Y), e(Y, "elementSetup", s(G, 24, Y, { styleSheets: { zoom: ue } })), s(G, 27, Y);
var X = Y, _e = {
	ArrowRight: 1,
	ArrowDown: 1,
	ArrowLeft: -1,
	ArrowUp: -1
}, ve = "input:not([type=checkbox], [type=radio], [type=button]), textarea, select, [contenteditable]", ye = 30, be = .5, xe = "view", Z = "shrunk", Se = "show", Q = "figure", $ = "image", Ce = "caption", we = "content";
//#endregion
//#region src/components/ui-zoom/index.ts
re(["click"]), X.define();
//#endregion
export { E as ImageZoom, X as UIZoom };

//# sourceMappingURL=ui-zoom.js.map