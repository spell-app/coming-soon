import "./rolldown-runtime-CYGlBXrH.js";
import { Bt as e, Disclosure as t, Ft as n, It as r, Lt as i, Rt as a, UIComponent as o, Vt as s, controlled as c, cssState as l, on as u, proto as ee, protoMerged as te, state as d, untracked as f, zt as p } from "./core.js";
import "./ui-modal.js";
import { Show as m } from "solid-js";
import { className as h, createComponent as g, delegateEvents as ne, effect as _, getOwner as v, insert as y, readShallow as b, ref as x, setAttribute as S, setStyleProperty as re, style as C, template as w } from "@solidjs/web";
//#region src/components/ui-zoom/ImageZoom.ts
var T = class ImageZoom {
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
		return Math.max(n.width, n.height) < A ? !1 : e.naturalWidth > n.width + 1 || e.naturalHeight > n.height + 1 || !!e.closest("figure") || !!t;
	}
	static onClick = (e) => {
		let t = ImageZoom.imageFor(e);
		return t ? (e.preventDefault(), ImageZoom.show(t), !0) : !1;
	};
	static onPointerOver = (e) => {
		let t = e.target instanceof HTMLImageElement ? e.target : null;
		t && !t.hasAttribute(O) && ImageZoom.isZoomable(t) && t.setAttribute(O, "");
	};
	static show(e) {
		let t = document.querySelector(`body > ${E}[${k}]`);
		t || (t = document.createElement(E), t.setAttribute(k, ""), document.body.append(t));
		let n = e.getRootNode();
		ImageZoom.shown = n instanceof ShadowRoot ? n.host : e, t.setAttribute("alt", e.alt), t.setAttribute("src", e.currentSrc || e.src);
	}
	static bounce(e, t) {
		if (!e || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let n = `translateY(${t > 0 ? -D : D}px)`;
		e.animate([
			{ transform: "none" },
			{ transform: n },
			{ transform: "none" }
		], {
			duration: ie,
			easing: "ease-out"
		});
	}
	static shown;
	static zoomables() {
		return [...document.querySelectorAll(ae)].filter((e) => e instanceof HTMLImageElement ? ImageZoom.isZoomable(e) : !e.hasAttribute(k));
	}
	static step(e, t, n) {
		let r = ImageZoom.zoomables();
		if (r.length < 2) return;
		let i = r.indexOf(t ?? ImageZoom.shown), a = r[(i < 0 ? e > 0 ? -1 : r.length : i) + e];
		if (!a) {
			let n = t ?? document.querySelector(`body > ${E}[${k}]`);
			ImageZoom.bounce(n?.shadowRoot?.querySelector(t ? ".content" : "img"), e);
			return;
		}
		if (a.localName === E) {
			n(), a.shadowRoot?.querySelector("button.show")?.click();
			return;
		}
		let o = a instanceof HTMLImageElement ? a : a.shadowRoot?.querySelector("img");
		o && (ImageZoom.show(o), t && n());
	}
	static linksImage(e, t) {
		let n = e.href;
		return !n || n === t.src || n === t.currentSrc || j.test(n);
	}
}, E = "ui-zoom", D = 40, ie = 320, ae = "ui-zoom, ui-image[zoom], img", O = "data-ui-zoom", k = "data-spell-added", oe = "[data-no-zoom], button, ui-button, ui-zoom", A = 64, j = /^data:image\/|\.(png|jpe?g|gif|webp|avif|svg)([?#]|$)/i, M = {
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
}, N = "@layer ui.components.zoom.types{:host{--_ui-zoom-margin:var(--ui-zoom-margin,24px);--_ui-zoom-caption:var(--ui-zoom-caption,2.5em);--_ui-zoom-radius:var(--ui-zoom-radius,var(--ui-radius,4px));inline-size:fit-content;max-inline-size:100%;display:block}:host([src]){display:contents}.view{box-sizing:border-box;border-radius:var(--_ui-zoom-radius);inline-size:fit-content;max-inline-size:100%;position:relative;overflow:hidden}.shrunk{pointer-events:none}.show{border-radius:inherit;cursor:zoom-in;background:0 0;border:0;margin:0;padding:0;position:absolute;inset:0}.show:focus-visible{outline:2px solid var(--ui-focus-color,Highlight);outline-offset:-2px}ui-modal{--ui-modal-dimmer-background:var(--ui-zoom-backdrop,oklch(0% 0 0/.9))}ui-modal::part(modal){width:auto;max-width:none;max-height:none;box-shadow:none;background:0 0;margin:auto;padding:0;overflow:visible}ui-modal::part(close){color:#fff;position:fixed;top:12px;right:12px}.figure{cursor:zoom-out;flex-direction:column;align-items:center;gap:8px;margin:0;display:flex}.image{max-width:calc(100vw - 2 * var(--_ui-zoom-margin));max-height:calc(100vh - 2 * var(--_ui-zoom-margin) - var(--_ui-zoom-caption));object-fit:contain;border-radius:var(--_ui-zoom-radius);display:block}.caption{max-width:calc(100vw - 2 * var(--_ui-zoom-margin));color:#fff;text-align:center;line-height:1.4}.content{box-sizing:border-box;inline-size:fit-content;max-width:calc(100vw - 2 * var(--_ui-zoom-margin));max-height:calc(100vh - 2 * var(--_ui-zoom-margin));padding:var(--ui-zoom-padding,16px);border-radius:var(--_ui-zoom-radius);background:var(--ui-zoom-background,var(--ui-surface,Canvas));color:var(--ui-text-color,CanvasText);margin-inline:auto;overflow:auto}}", se = /* @__PURE__ */ w("<div inert><slot>"), ce = /* @__PURE__ */ w("<div><button type=button aria-haspopup=dialog>"), le = /* @__PURE__ */ w("<ui-modal appearance=basic closable>", 1), ue = /* @__PURE__ */ w("<figcaption>"), de = /* @__PURE__ */ w("<figure><img>"), fe = /* @__PURE__ */ w("<div><div><slot>"), P, F, I, L, R, z, B, V, H, U, W, G, K, q, J, Y = class _UIZoom extends (W = o, U = [ee], H = [te], V = [l("open"), c("open")], B = [d], z = [d], R = [f], L = [u("ui-closed", { target: "renderRoot" })], I = [u("click", { target: "renderRoot" })], F = [u("keydown", { target: "renderRoot" })], P = [f], W) {
	constructor() {
		super(...arguments), s(G, 5, this), p(this, K, s(G, 8, this, !1)), s(G, 11, this), e(this, "disclosure", new t({
			component: this,
			member: "isOpen"
		})), p(this, q, s(G, 12, this)), s(G, 15, this), p(this, J, s(G, 16, this)), s(G, 19, this), e(this, "view"), e(this, "modal");
	}
	get isShowing() {
		return !!this.src || this.isOpen;
	}
	get shrinkRatio() {
		let e = Number.parseFloat(this.shrink ?? "");
		return !Number.isFinite(e) || e <= 0 ? me : Math.min(e, 100) / 100;
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
			let n = e.querySelector(`.${Q}`);
			n && (this.fullWidth = Math.round(n.getBoundingClientRect().width / this.shrinkRatio));
		}
		this.disclosure.open();
	}
	onClosed(e) {
		e.target === this.modal && this.shut();
	}
	onClick(e) {
		e.target instanceof Element && e.target.closest(`.${$}`) && this.shut();
	}
	onKeyDown(e) {
		let t = pe[e.key];
		if (!t || e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || !this.isShowing) return;
		let n = e.composedPath()[0];
		n instanceof HTMLElement && n.matches(Z) || (e.preventDefault(), T.step(t, this.src ? void 0 : this.domElement, () => this.shut()));
	}
	shut() {
		this.src && this.domElement.removeAttribute("src"), this.disclosure.close();
	}
	render() {
		let e = this;
		return [g(m, {
			get when() {
				return !e.src;
			},
			get children() {
				var t = ce(), n = t.firstChild;
				return x(() => (t) => e.view = t, t), y(t, g(m, {
					get when() {
						return !e.isOpen;
					},
					get children() {
						var t = se(), n = t.firstChild;
						return n._$owner = v(), _(() => ({
							e: b(Q),
							t: String(e.shrinkRatio)
						}), ({ e, t: n }, r) => {
							h(t, e, r?.e), n !== r?.t && re(t, "zoom", n);
						}), t;
					}
				}), n), n._$$click = () => e.showFullSize(), _(() => ({
					e: b(he),
					t: e.partForName("view"),
					a: b(e.viewStyle),
					o: b(ge),
					i: e.partForName("button"),
					n: e.translationForKey("show"),
					s: e.disclosure.ariaExpanded,
					h: e.translationForKey("show")
				}), ({ e, t: r, a: i, o: a, i: o, n: s, s: c, h: l }, u) => {
					h(t, e, u?.e), r !== u?.t && S(t, "part", r), C(t, i, u?.a), h(n, a, u?.o), o !== u?.i && S(n, "part", o), s !== u?.n && S(n, "aria-label", s), c !== u?.s && S(n, "aria-expanded", c), l !== u?.h && S(n, "title", l);
				}), t;
			}
		}), (() => {
			var t = le();
			return x(() => (t) => e.modal = t, t), t._$owner = v(), y(t, g(m, {
				get when() {
					return e.src;
				},
				get fallback() {
					return e.fullContent();
				},
				children: (t) => (() => {
					var n = de(), r = n.firstChild;
					return y(n, g(m, {
						get when() {
							return e.alt;
						},
						get children() {
							var t = ue();
							return y(t, () => e.alt), _(() => ({
								e: b(ve),
								t: e.partForName("caption")
							}), ({ e, t: n }, r) => {
								h(t, e, r?.e), n !== r?.t && S(t, "part", n);
							}), t;
						}
					}), null), _(() => ({
						e: b($),
						t: b(_e),
						a: e.partForName("image"),
						o: t(),
						i: e.alt ? e.translationForKey("zoomed", { alt: e.alt }) : e.translationForKey("untitled")
					}), ({ e, t, a: i, o: a, i: o }, s) => {
						h(n, e, s?.e), h(r, t, s?.t), i !== s?.a && S(r, "part", i), a !== s?.o && S(r, "src", a), o !== s?.i && S(r, "alt", o);
					}), n;
				})()
			})), _(() => ({
				e: b(e.rootClass),
				t: e.partForName("base"),
				a: e.isShowing ? "" : void 0
			}), ({ e, t: n, a: r }, i) => {
				h(t, e, i?.e), n !== i?.t && S(t, "part", n), r !== i?.a && S(t, "visible", r);
			}), t;
		})()];
	}
	fullContent() {
		let e = this;
		return g(m, {
			get when() {
				return e.isOpen;
			},
			get children() {
				var t = fe(), n = t.firstChild, r = n.firstChild;
				return r._$owner = v(), _(() => ({
					e: b(ye),
					t: e.partForName("content"),
					a: b(e.fullWidth ? { "inline-size": `${e.fullWidth}px` } : void 0)
				}), ({ e, t: r, a: i }, a) => {
					h(t, e, a?.e), r !== a?.t && S(t, "part", r), C(n, i, a?.a);
				}), t;
			}
		});
	}
};
G = i(W), K = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), n(G, 4, "isOpen", V, Y, K), n(G, 4, "heldSize", B, Y, q), n(G, 4, "fullWidth", z, Y, J), n(G, 1, "showFullSize", R, Y), n(G, 1, "onClosed", L, Y), n(G, 1, "onClick", I, Y), n(G, 1, "onKeyDown", F, Y), n(G, 1, "shut", P, Y), n(G, 13, "vocabulary", U, Y), n(G, 13, "elementSetup", H, Y), r(G, Y), a(Y, "UIZoom"), e(Y, "vocabulary", s(G, 20, Y, M)), s(G, 23, Y), e(Y, "elementSetup", s(G, 24, Y, { styleSheets: { zoom: N } })), s(G, 27, Y);
var X = Y, pe = {
	ArrowRight: 1,
	ArrowDown: 1,
	ArrowLeft: -1,
	ArrowUp: -1
}, Z = "input:not([type=checkbox], [type=radio], [type=button]), textarea, select, [contenteditable]", me = .5, he = "view", Q = "shrunk", ge = "show", $ = "figure", _e = "image", ve = "caption", ye = "content";
//#endregion
//#region src/components/ui-zoom/index.ts
ne(["click"]), X.define();
//#endregion
export { T as ImageZoom, X as UIZoom };

//# sourceMappingURL=ui-zoom.js.map