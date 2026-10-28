import "./rolldown-runtime-CYGlBXrH.js";
import { Bt as e, Ft as t, It as n, Lt as r, Rt as i, SlotContent as a, UIComponent as o, Vt as s, proto as c, protoMerged as l, untracked as u } from "./core.js";
import { Show as d } from "solid-js";
import { addEvent as f, claimElement as p, className as m, createComponent as h, delegateEvents as g, effect as _, getOwner as v, insert as y, readShallow as b, setAttribute as x, template as S } from "@solidjs/web";
//#region src/components/ui-image/UIImage.en.ts
var C = {
	tag: "ui-image",
	topics: [
		"images",
		"media",
		"basic",
		"elements"
	],
	aka: [
		"picture",
		"img",
		"photo",
		"avatar",
		"thumbnail"
	],
	skeleton: "10 wide: square image",
	noun: "image",
	plural: "images",
	description: "An image is a graphic representation of something.",
	attributes: [
		{
			name: "size",
			group: "appearance",
			kind: "size",
			description: "Width, `mini` (35px) ... `massive` (960px) at 16px;  `medium` is the natural size."
		},
		{
			name: "avatar",
			group: "content",
			kind: "keyOnly",
			description: "A small circle sitting in a line of text."
		},
		{
			name: "appearance",
			group: "appearance",
			kind: "multiple",
			classes: {},
			values: [
				"bordered",
				"circular",
				"rounded"
			],
			replaces: [
				{
					from: "bordered",
					value: "bordered"
				},
				{
					from: "circular",
					value: "circular"
				},
				{
					from: "rounded",
					value: "rounded"
				}
			],
			description: "The look, several words at once:  `bordered` (a hairline border, for images with white edges), `circular` (cropped to a circle;  a pill when not square), `rounded` (softly rounded corners).  Old names:  `bordered`, `circular`, `rounded` written alone."
		},
		{
			name: "align",
			group: "layout",
			kind: "valueOnly",
			values: ["center"],
			classes: { center: "centered" },
			replaces: [{
				from: "centered",
				value: "center"
			}],
			description: "`center`:  a block centred in its container.  Its old name was `centered`."
		},
		{
			name: "disabled",
			group: "states",
			kind: "keyOnly",
			description: "Faded:  shown as unavailable."
		},
		{
			name: "fluid",
			group: "layout",
			kind: "keyOnly",
			description: "Fills its container's width."
		},
		{
			name: "inline",
			group: "layout",
			kind: "keyOnly",
			description: "Sits inline in running text instead of as a block."
		},
		{
			name: "floated",
			group: "layout",
			kind: "valueAndKey",
			values: "floats",
			description: "Floats `left` or `right` of the text."
		},
		{
			name: "spacing",
			group: "layout",
			kind: "valueOnly",
			values: [
				"md",
				"left",
				"right"
			],
			classes: {
				md: "spaced",
				left: "left spaced",
				right: "right spaced"
			},
			replaces: [{
				from: "spaced",
				value: "md"
			}],
			description: "Room from the text around it:  `md` on both sides, or `left` / `right` only.  Its old name was `spaced`."
		},
		{
			name: "vertical-align",
			group: "layout",
			kind: "verticalAlign",
			values: "verticalAlignments",
			description: "Aligns `top`, `middle` or `bottom` against the text (or, in a group, the row)."
		},
		{
			name: "src",
			group: "link",
			kind: "string",
			description: "Image URL, as the native `<img src>`."
		},
		{
			name: "caption",
			group: "content",
			kind: "string",
			description: "A caption under the picture:  the image becomes a figure (`<figure>` and `<figcaption>`).  The `caption` slot is its rich version."
		},
		{
			name: "alt",
			group: "content",
			kind: "string",
			description: "Text alternative, as the native `<img alt>`;  `alt=\"\"` marks the image decorative."
		},
		{
			name: "width",
			group: "layout",
			kind: "number",
			description: "Intrinsic width in px, as the native `<img width>`:  reserves space before load.  NOT the column `width` grammar;  size variations still set the rendered width."
		},
		{
			name: "height",
			group: "layout",
			kind: "number",
			description: "Intrinsic height in px, as the native `<img height>`:  reserves space before load."
		},
		{
			name: "loading",
			group: "states",
			kind: "enum",
			values: ["eager", "lazy"],
			description: "When to load, as the native `<img loading>`."
		},
		{
			name: "zoom",
			group: "behaviour",
			kind: "boolean",
			description: "A click (or Enter) shows it full size, over the page, in the page's `<ui-zoom>`;  with `link`, a click with a modifier key still follows the link."
		},
		{
			name: "link",
			group: "link",
			kind: "string",
			replaces: ["href"],
			description: "Renders a link (`<a>`) around the image.  Its old name was `href`."
		}
	],
	events: [],
	slots: [{
		name: "caption",
		description: "The rich version of `caption`:  links, emphasis."
	}],
	parts: [
		{
			name: "figure",
			description: "The `<figure>` round the picture and its caption, with `caption`."
		},
		{
			name: "caption",
			description: "The `<figcaption>` under the picture."
		},
		{
			name: "image",
			description: "The image box:  the `<img>`, or the `<a>` with `link`."
		},
		{
			name: "img",
			description: "With `link`:  the `<img>` inside the link."
		}
	],
	states: [{
		name: "disabled",
		description: "Faded:  shown as unavailable."
	}],
	texts: [{
		key: "zoom",
		text: "{alt}:  show full size",
		description: "With `zoom`:  the image's name, as a button."
	}, {
		key: "zoomUntitled",
		text: "Show the image full size",
		description: "With `zoom`, and no `alt`:  its name."
	}]
}, w = "@layer ui.components.image.types{:host{display:var(--_ui-image-owner-display,contents);vertical-align:var(--_ui-image-owner-align,baseline)}.ui.image,.ui.images{--_ui-image-placeholder-color:var(--ui-image-placeholder-color,transparent);--_ui-image-rounded-radius:var(--ui-image-rounded-radius,var(--ui-radius));--_ui-image-circular-radius:var(--ui-image-circular-radius,var(--ui-radius-pill));--_ui-image-border:var(--ui-image-border,var(--ui-border-width) solid var(--ui-border-color));--_ui-image-group-margin-x:var(--ui-image-group-margin-x,var(--ui-space-2xs));--_ui-image-group-margin-y:var(--ui-image-group-margin-y,var(--ui-space-xs));--_ui-image-avatar-size:var(--ui-image-avatar-size,2em);--_ui-image-avatar-margin:var(--ui-image-avatar-margin,var(--ui-space-2xs));--_ui-image-spaced-distance:var(--ui-image-spaced-distance,var(--ui-space-xs));--_ui-image-floated-margin-x:var(--ui-image-floated-margin-x,var(--ui-space-m));--_ui-image-floated-margin-y:var(--ui-image-floated-margin-y,var(--ui-space-m));--_ui-image-disabled-opacity:var(--ui-image-disabled-opacity,var(--ui-disabled-opacity));--_ui-image-focus-width:var(--ui-image-focus-width,var(--ui-focus-width,2px));--_ui-image-width-mini:var(--ui-image-width-mini,calc(var(--ui-font-size) * 2.1875));--_ui-image-width-tiny:var(--ui-image-width-tiny,calc(var(--ui-font-size) * 5));--_ui-image-width-small:var(--ui-image-width-small,calc(var(--ui-font-size) * 9.375));--_ui-image-width-medium:var(--ui-image-width-medium,calc(var(--ui-font-size) * 18.75));--_ui-image-width-large:var(--ui-image-width-large,calc(var(--ui-font-size) * 28.125));--_ui-image-width-big:var(--ui-image-width-big,calc(var(--ui-font-size) * 37.5));--_ui-image-width-huge:var(--ui-image-width-huge,calc(var(--ui-font-size) * 50));--_ui-image-width-massive:var(--ui-image-width-massive,calc(var(--ui-font-size) * 60))}.ui.image,.ui.images>:is(img,svg),.ui.images>::slotted(:is(img,svg)){box-sizing:border-box;display:var(--_image-display,inline-block);align-self:var(--_image-align,var(--_ui-images-align,var(--_ui-image-owner-align-self,auto)));vertical-align:var(--_image-valign,middle);width:var(--_ui-image-owner-width,var(--_image-width,var(--_ui-images-width,auto)));max-width:var(--_ui-image-owner-max-width,100%);max-height:var(--_ui-image-owner-max-height,none);height:var(--_image-height,var(--_ui-images-height,auto));margin:var(--_image-margin,var(--_ui-images-margin,0));border:var(--_image-border,var(--_ui-images-border,none));border-radius:var(--_image-radius,var(--_ui-images-radius,0));background-color:var(--_ui-image-placeholder-color);object-fit:var(--_image-fit,fill);position:relative}img.ui.image{--_image-display:block}a.ui.image{color:inherit;line-height:0;text-decoration:none}a.ui.image:focus-visible{outline:var(--_ui-image-focus-width) solid var(--ui-focus-color);outline-offset:var(--_ui-image-focus-width)}.ui.image img,.ui.image svg{width:var(--_image-inner-width,auto);max-width:100%;height:var(--_image-inner-height,auto);border-radius:inherit;object-fit:inherit;display:block}.ui.image>*{--_ui-images-width:initial;--_ui-images-height:initial;--_ui-images-margin:initial;--_ui-images-border:initial;--_ui-images-radius:initial;--_ui-images-align:initial;--_image-size:initial;--_image-display:initial;--_image-align:initial;--_image-valign:initial;--_image-width:initial;--_image-height:initial;--_image-margin:initial;--_image-border:initial;--_image-radius:initial;--_image-fit:initial;--_image-floated-bottom:initial}.ui.images{box-sizing:border-box;margin:0 calc(var(--_ui-image-group-margin-x) * -1);flex-wrap:wrap;align-items:center;display:flex}.ui.images>*,.ui.images>::slotted(*){--_ui-images-margin:0 var(--_ui-image-group-margin-x) var(--_ui-image-group-margin-y);--_ui-images-width:var(--_image-size)}}@layer ui.components.image.content{.figure{margin:0 0 1em;display:table}:host(:last-child)>.figure{margin-block-end:0}.figure>figcaption{caption-side:bottom;color:var(--ui-text-muted);font-size:.875em;line-height:var(--ui-line-height);padding-block-start:var(--ui-space-xs);display:table-caption}}@layer ui.components.image.variations{.ui.inline.image{--_image-display:inline-block}.ui.inline.image>:is(img,svg){display:inline-block}.ui:is([class*=top\\ aligned],[class*=middle\\ aligned],[class*=bottom\\ aligned]).image{--_image-display:inline-block}.ui[class*=top\\ aligned].image{--_image-valign:top;--_image-align:flex-start}.ui[class*=middle\\ aligned].image{--_image-valign:middle;--_image-align:center}.ui[class*=bottom\\ aligned].image{--_image-valign:bottom;--_image-align:flex-end}.ui[class*=top\\ aligned].images{align-items:flex-start}.ui[class*=bottom\\ aligned].images{align-items:flex-end}.ui.rounded.image{--_image-radius:var(--_ui-image-rounded-radius)}.ui.rounded.images>*,.ui.rounded.images>::slotted(*){--_ui-images-radius:var(--_ui-image-rounded-radius)}.ui.bordered.image:is(img,svg){--_image-border:var(--_ui-image-border)}.ui.bordered.image>:is(img,svg){border:var(--_ui-image-border)}.ui.bordered.images>*,.ui.bordered.images>::slotted(*){--_ui-images-border:var(--_ui-image-border)}.ui.circular.image{--_image-radius:var(--_ui-image-circular-radius);overflow:hidden}.ui.circular.images>*,.ui.circular.images>::slotted(*){--_ui-images-radius:var(--_ui-image-circular-radius)}.ui.fluid.image{--_image-display:block;--_image-width:100%;--_image-inner-width:100%}.ui.fluid.images{width:100%}.ui.fluid.images>*,.ui.fluid.images>::slotted(*){--_ui-images-width:100%}.ui.avatar.image{--_image-display:inline-block;--_image-width:var(--_ui-image-avatar-size);--_image-height:var(--_ui-image-avatar-size);--_image-inner-width:100%;--_image-inner-height:100%;--_image-margin:0 var(--_ui-image-avatar-margin) 0 0;--_image-radius:var(--_ui-image-circular-radius);--_image-fit:cover}.ui.avatar.images>*,.ui.avatar.images>::slotted(*){--_ui-images-width:var(--_ui-image-avatar-size);--_ui-images-height:var(--_ui-image-avatar-size);--_ui-images-radius:var(--_ui-image-circular-radius)}.ui.spaced.image,.ui:is([class*=left\\ spaced],[class*=right\\ spaced]).image{--_image-display:inline-block;--_image-margin:0 var(--_ui-image-spaced-distance)}.ui[class*=left\\ spaced].image{--_image-margin:0 0 0 var(--_ui-image-spaced-distance)}.ui[class*=right\\ spaced].image{--_image-margin:0 var(--_ui-image-spaced-distance) 0 0}.ui:is(.floated,[class*=left\\ floated]):is(.image,.images){--_image-floated-bottom:var(--_ui-image-floated-margin-y);float:left}.ui[class*=right\\ floated]:is(.image,.images){float:right}.ui.floated:is(.image,.images):last-child{--_image-floated-bottom:0px}:host(:not(:last-child))>.ui.floated:is(.image,.images){--_image-floated-bottom:var(--_ui-image-floated-margin-y)}.ui.floated.image{--_image-margin:0 var(--_ui-image-floated-margin-x) var(--_image-floated-bottom) 0}.ui[class*=right\\ floated].image{--_image-margin:0 0 var(--_image-floated-bottom) var(--_ui-image-floated-margin-x)}.ui.floated.images{margin:0 var(--_ui-image-floated-margin-x) var(--_image-floated-bottom) 0}.ui[class*=right\\ floated].images{margin:0 0 var(--_image-floated-bottom) var(--_ui-image-floated-margin-x)}.ui.centered.image{--_image-display:block;--_image-margin:0 auto}.ui.centered.images{justify-content:center}.ui.mini:is(.image,.images){--_image-size:var(--_ui-image-width-mini)}.ui.tiny:is(.image,.images){--_image-size:var(--_ui-image-width-tiny)}.ui.small:is(.image,.images){--_image-size:var(--_ui-image-width-small)}.ui.medium:is(.image,.images){--_image-size:var(--_ui-image-width-medium)}.ui.large:is(.image,.images){--_image-size:var(--_ui-image-width-large)}.ui.big:is(.image,.images){--_image-size:var(--_ui-image-width-big)}.ui.huge:is(.image,.images){--_image-size:var(--_ui-image-width-huge)}.ui.massive:is(.image,.images){--_image-size:var(--_ui-image-width-massive)}.ui:is(.mini,.tiny,.small,.medium,.large,.big,.huge,.massive):is(.image,.images){font-size:calc(var(--ui-font-size) * var(--ui-scale,1))}.ui:is(.mini,.tiny,.small,.medium,.large,.big,.huge,.massive).image{--_image-width:var(--_image-size);--_image-height:auto;--_image-inner-width:100%}}@layer ui.components.image.states{.ui.hidden:is(.image,.images){display:none}.ui.disabled:is(.image,.images){cursor:default;opacity:var(--_ui-image-disabled-opacity)}:host([zoom]:not([disabled])) img{cursor:zoom-in}:host([zoom]) img:focus-visible{outline:2px solid var(--ui-focus-color,Highlight);outline-offset:2px}}", T = /* @__PURE__ */ S("<figure><figcaption><slot>"), E = /* @__PURE__ */ S("<a>"), D = /* @__PURE__ */ S("<img>", 1), O, k, A, j, M, N, P = class _UIImage extends (M = o, j = [c], A = [l], k = [u], O = [u], M) {
	constructor() {
		super(...arguments), e(this, "slots", new a(this.domElement)), e(this, "onZoomClick", s(N, 16, this, /* @__PURE__ */ i((e) => {
			this.zoom && !this.disabled && e.button === 0 && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (e.preventDefault(), this.showFullSize()));
		}, "onZoomClick"))), s(N, 19, this), e(this, "onZoomKey", s(N, 20, this, /* @__PURE__ */ i((e) => {
			!this.isZoomButton || e.key !== "Enter" && e.key !== " " || (e.preventDefault(), this.showFullSize());
		}, "onZoomKey"))), s(N, 23, this);
	}
	get hasCaption() {
		return !!this.caption || this.slots.hasContent(this.slotForName("caption"));
	}
	render() {
		let e = this;
		return h(d, {
			get when() {
				return e.hasCaption;
			},
			get fallback() {
				return e.picture();
			},
			get children() {
				var t = T(), n = t.firstChild, r = n.firstChild;
				return y(t, () => e.picture(), n), r._$owner = v(), y(r, () => e.caption), _(() => ({
					e: b(I),
					t: e.partForName("figure"),
					a: e.partForName("caption"),
					o: e.slotForName("caption")
				}), ({ e, t: i, a, o }, s) => {
					m(t, e, s?.e), i !== s?.t && x(t, "part", i), a !== s?.a && x(n, "part", a), o !== s?.o && x(r, "name", o);
				}), t;
			}
		});
	}
	picture() {
		let e = this;
		return h(d, {
			get when() {
				return e.link;
			},
			get fallback() {
				return e.image("image");
			},
			get children() {
				var t = E(), n = v();
				return f(t, "click", e.onZoomClick, !0), y(t, () => e.image("img")), _(() => ({
					e: b(e.rootClass),
					t: e.partForName("image"),
					a: e.linkTo,
					o: e.linkTarget,
					i: e.disabled ? "true" : void 0
				}), ({ e, t: r, a: i, o: a, i: o }, s) => {
					m(t, e, s?.e), r !== s?.t && x(t, "part", r), i !== s?.a && x(t, "href", i), a !== s?.o && x(t, "target", a), o !== s?.i && x(t, "aria-disabled", o), p(t, n);
				}), t;
			}
		});
	}
	image(e) {
		let t = /* @__PURE__ */ i(() => e === "image" && this.isZoomButton, "isButton"), n = this;
		var r = D();
		return f(r, "keydown", e === "image" ? n.onZoomKey : void 0, !0), f(r, "click", e === "image" ? n.onZoomClick : void 0, !0), _(() => ({
			e: b(e === "image" ? n.rootClass : void 0),
			t: n.partForName(e),
			a: n.src,
			o: n.alt,
			i: n.width,
			n: n.height,
			s: n.loading,
			h: t() ? "button" : void 0,
			r: t() ? 0 : void 0,
			d: t() ? n.zoomLabel : void 0,
			l: t() ? "dialog" : void 0
		}), ({ e, t, a: n, o: i, i: a, n: o, s, h: c, r: l, d: u, l: d }, f) => {
			m(r, e, f?.e), t !== f?.t && x(r, "part", t), n !== f?.a && x(r, "src", n), i !== f?.o && x(r, "alt", i), a !== f?.i && x(r, "width", a), o !== f?.n && x(r, "height", o), s !== f?.s && x(r, "loading", s), c !== f?.h && x(r, "role", c), l !== f?.r && x(r, "tabindex", l), u !== f?.d && x(r, "aria-label", u), d !== f?.l && x(r, "aria-haspopup", d);
		}), r;
	}
	get isZoomButton() {
		return !!this.zoom && !this.link && !this.disabled;
	}
	get zoomLabel() {
		return this.alt ? this.translationForKey("zoom", { alt: this.alt }) : this.translationForKey("zoomUntitled");
	}
	showFullSize() {
		let e = this.domElement.shadowRoot?.querySelector("img");
		e && import("./ui-zoom.js").then(({ ImageZoom: t }) => t.show(e)).catch((e) => console.error(e));
	}
};
N = r(M), t(N, 13, "vocabulary", j, P), t(N, 13, "elementSetup", A, P), t(N, 5, "onZoomClick", k, P), t(N, 5, "onZoomKey", O, P), n(N, P), i(P, "UIImage"), e(P, "vocabulary", s(N, 8, P, C)), s(N, 11, P), e(P, "elementSetup", s(N, 12, P, {
	styleSheets: { image: w },
	loading: "its own"
})), s(N, 15, P);
var F = P, I = "figure";
g(["click", "keydown"]);
//#endregion
//#region src/components/ui-image/UIImages.en.ts
var L = {
	tag: "ui-images",
	topics: [
		"images",
		"media",
		"layout",
		"elements"
	],
	aka: [
		"image group",
		"gallery",
		"avatars"
	],
	noun: "images",
	description: "A group of images can be formatted together.",
	attributes: [
		{
			name: "size",
			group: "appearance",
			kind: "size",
			description: "Width of every image in the group, `mini` ... `massive`."
		},
		{
			name: "avatar",
			group: "content",
			kind: "keyOnly",
			description: "Every image a small circle."
		},
		{
			name: "appearance",
			group: "appearance",
			kind: "multiple",
			classes: {},
			values: [
				"bordered",
				"circular",
				"rounded"
			],
			replaces: [
				{
					from: "bordered",
					value: "bordered"
				},
				{
					from: "circular",
					value: "circular"
				},
				{
					from: "rounded",
					value: "rounded"
				}
			],
			description: "Every image's look, several words at once:  `bordered` (a hairline border), `circular` (cropped to a circle), `rounded` (softly rounded corners).  Old names:  `bordered`, `circular`, `rounded` written alone."
		},
		{
			name: "align",
			group: "layout",
			kind: "valueOnly",
			values: ["center"],
			classes: { center: "centered" },
			replaces: [{
				from: "centered",
				value: "center"
			}],
			description: "`center`:  rows centred in the container.  Its old name was `centered`."
		},
		{
			name: "disabled",
			group: "states",
			kind: "keyOnly",
			description: "The whole group faded."
		},
		{
			name: "fluid",
			group: "layout",
			kind: "keyOnly",
			description: "Every image fills the group's width, one per row."
		},
		{
			name: "vertical-align",
			group: "layout",
			kind: "verticalAlign",
			values: [
				"top",
				"middle",
				"bottom"
			],
			description: "Aligns the images of a row `top`, `middle` (default) or `bottom`."
		}
	],
	events: [],
	slots: [{
		name: "",
		description: "`<ui-image>`s (or plain `<img>`s)."
	}],
	parts: [{
		name: "group",
		description: "The group box."
	}],
	states: [],
	texts: []
}, R = /* @__PURE__ */ S("<div><slot>"), z, B, V, H, U = class _UIImages extends (V = o, B = [c], z = [l], V) {
	render() {
		let e = this;
		var t = R(), n = t.firstChild;
		return n._$owner = v(), _(() => ({
			e: b(e.rootClass),
			t: e.partForName("group")
		}), ({ e, t: n }, r) => {
			m(t, e, r?.e), n !== r?.t && x(t, "part", n);
		}), t;
	}
};
H = r(V), t(H, 13, "vocabulary", B, U), t(H, 13, "elementSetup", z, U), n(H, U), i(U, "UIImages"), e(U, "vocabulary", s(H, 8, U, L)), s(H, 11, U), e(U, "elementSetup", s(H, 12, U, {
	styleSheets: { image: w },
	delegatesFocus: !1
})), s(H, 15, U);
var W = U;
F.define(), W.define();
//#endregion
export { F as UIImage, W as UIImages };

//# sourceMappingURL=ui-image.js.map