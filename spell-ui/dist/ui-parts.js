import "./rolldown-runtime-CYGlBXrH.js";
import { Bt as e, Ft as t, It as n, Lt as r, PartComponent as i, Rt as a, Vt as o, proto as s, protoMerged as ee } from "./core.js";
import { Show as te } from "solid-js";
import { Dynamic as ne, createComponent as re, effect as ie, getOwner as ae, memo as oe, setAttribute as c, template as l } from "@solidjs/web";
//#region src/components/ui-parts/UIContent.en.ts
var se = {
	tag: "ui-content",
	topics: [
		"content parts",
		"containers",
		"cards"
	],
	aka: [
		"body",
		"content area",
		"card body"
	],
	noun: "content",
	ui: !1,
	description: "The main content block of a card, item, event, comment, modal, message, list item, step ...",
	attributes: [
		{
			name: "image",
			group: "content",
			kind: "keyOnly",
			description: "In a modal:  an image beside the description (a flex row)."
		},
		{
			name: "scrolling",
			group: "layout",
			kind: "keyOnly",
			description: "In a modal:  a capped height that scrolls."
		},
		{
			name: "align",
			group: "layout",
			kind: "textAlign",
			values: "alignments",
			replaces: ["text-align"],
			description: "Aligns its text `left`, `center`, `right` or `justified` (a card's `center aligned content`).  Its old name was `text-align`."
		},
		{
			name: "vertical-align",
			group: "layout",
			kind: "verticalAlign",
			values: "verticalAlignments",
			description: "In an item or a list:  `top`, `middle` or `bottom` against the image or icon beside it."
		}
	],
	events: [],
	slots: [{
		name: "",
		description: "Content, usually other parts."
	}],
	parts: [{
		name: "content",
		description: "The content box."
	}],
	states: [
		{
			name: "in-card",
			description: "Owned by a card."
		},
		{
			name: "in-item",
			description: "Owned by an item."
		},
		{
			name: "in-feed",
			description: "Owned by a feed."
		},
		{
			name: "in-comment",
			description: "Owned by a comment."
		},
		{
			name: "in-modal",
			description: "Owned by a modal."
		},
		{
			name: "in-flyout",
			description: "Owned by a flyout."
		},
		{
			name: "in-message",
			description: "Owned by a message."
		},
		{
			name: "in-list",
			description: "Owned by a list."
		},
		{
			name: "in-step",
			description: "Owned by a step."
		},
		{
			name: "in-accordion",
			description: "Owned by an accordion."
		},
		{
			name: "in-popup",
			description: "Owned by a popup."
		},
		{
			name: "in-toast",
			description: "Owned by a toast."
		},
		{
			name: "in-search",
			description: "Owned by a search."
		},
		{
			name: "in-header",
			description: "Owned by a header."
		}
	],
	texts: []
}, ce, u, d, f = class _UIContent extends (u = i, ce = [s], u) {
	get rootTabIndex() {
		return this.scrolling ? 0 : void 0;
	}
};
d = r(u), t(d, 13, "vocabulary", ce, f), n(d, f), a(f, "UIContent"), e(f, "vocabulary", o(d, 8, f, se)), o(d, 11, f);
var le = f, ue = {
	tag: "ui-header",
	topics: [
		"content parts",
		"typography",
		"text",
		"basic",
		"elements"
	],
	aka: [
		"heading",
		"title",
		"h1",
		"headline"
	],
	skeleton: "medium line",
	noun: "header",
	plural: "headers",
	description: "A header provides a short summary of content.",
	attributes: [
		{
			name: "level",
			group: "appearance",
			kind: "enum",
			values: [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6"
			],
			description: "Page header:  renders `<h1>` ... `<h6>`, sized by level unless `size` is set."
		},
		{
			name: "size",
			group: "appearance",
			kind: "size",
			description: "Content header size relative to the surrounding text, `mini` ... `massive`;  `medium` is the default."
		},
		{
			name: "color",
			group: "appearance",
			kind: "color",
			description: "Hue of the text (and of a `dividing` rule)."
		},
		{
			name: "sub",
			group: "appearance",
			kind: "keyOnly",
			description: "A sub heading:  small, uppercase.  Inside a header, its sub header."
		},
		{
			name: "icon",
			group: "content",
			kind: "keyOnly",
			description: "Icon header:  a large slotted icon centred above the text."
		},
		{
			name: "dividing",
			group: "appearance",
			kind: "keyOnly",
			description: "A rule below it."
		},
		{
			name: "block",
			group: "layout",
			kind: "keyOnly",
			description: "In a tinted box."
		},
		{
			name: "attach",
			group: "layout",
			kind: "valueOnly",
			values: [
				"both",
				"top",
				"bottom"
			],
			classes: {
				both: "attached",
				top: "top attached",
				bottom: "bottom attached"
			},
			replaces: [{
				from: "attached",
				value: "both"
			}],
			description: "Joined to a segment below (`top`) or above (`bottom`);  `both` sits between two.  Its old name was `attached`."
		},
		{
			name: "seamless",
			group: "appearance",
			kind: "keyOnly",
			description: "With `attached`:  no line where it meets the segment."
		},
		{
			name: "align",
			group: "layout",
			kind: "textAlign",
			values: "alignments",
			replaces: ["text-align"],
			description: "Aligns its text `left`, `center`, `right` or `justified`.  Its old name was `text-align`."
		},
		{
			name: "padding",
			group: "layout",
			kind: "valueOnly",
			values: ["none"],
			classes: { none: "fitted" },
			replaces: [{
				from: "fitted",
				value: "none"
			}],
			description: "`none`:  no padding.  Its old name was `fitted`."
		},
		{
			name: "disabled",
			group: "states",
			kind: "keyOnly",
			description: "Dimmed."
		},
		{
			name: "inverted",
			group: "appearance",
			kind: "keyOnly",
			description: "For dark backgrounds:  the dark scheme, for it and its parts."
		},
		{
			name: "link",
			group: "link",
			kind: "string",
			replaces: ["href"],
			description: "Renders a link (`<a>`) styled as a header.  Its old name was `href`."
		}
	],
	events: [],
	slots: [{
		name: "",
		description: "Text, a slotted `<ui-icon>` / `<img>`, a `<ui-content>` and a nested `<ui-header>` (sub header)."
	}],
	parts: [{
		name: "header",
		description: "The header box (`<div>`, `<h1>` ... `<h6>`, or `<a>`)."
	}],
	states: [
		{
			name: "in-card",
			description: "Owned by a card."
		},
		{
			name: "in-item",
			description: "Owned by an item."
		},
		{
			name: "in-modal",
			description: "Owned by a modal."
		},
		{
			name: "in-flyout",
			description: "Owned by a flyout."
		},
		{
			name: "in-message",
			description: "Owned by a message."
		},
		{
			name: "in-list",
			description: "Owned by a list."
		},
		{
			name: "in-popup",
			description: "Owned by a popup."
		},
		{
			name: "in-toast",
			description: "Owned by a toast."
		},
		{
			name: "in-header",
			description: "Owned by a header."
		},
		{
			name: "in-menu",
			description: "Owned by a menu:  an item's sub header (a vertical menu's `.item > .header`)."
		}
	],
	texts: [],
	ownsParts: ["header", "content"]
}, de = /* @__PURE__ */ l("<slot>"), fe, p, m, h, g = class _UIHeader extends (m = i, p = [s], fe = [ee], m) {
	render() {
		let e = this;
		return re(ne, {
			get component() {
				return e.rootTag;
			},
			get class() {
				return e.rootClass;
			},
			get part() {
				return e.partForName("header");
			},
			get href() {
				return e.linkTo;
			},
			get target() {
				return e.linkTarget;
			},
			get role() {
				return e.link && e.level ? "heading" : void 0;
			},
			get "aria-level"() {
				return oe(() => !!e.link)() ? e.level : void 0;
			},
			get children() {
				var e = de();
				return e._$owner = ae(), e;
			}
		});
	}
	get rootTag() {
		if (this.link) return "a";
		let e = this.level ? Number(this.level) : void 0;
		return e ? `h${e}` : "div";
	}
	get rootClass() {
		return this.context.ownerNoun ? this.vocabulary.noun : super.rootClass;
	}
};
h = r(m), t(h, 13, "vocabulary", p, g), t(h, 13, "elementSetup", fe, g), n(h, g), a(g, "UIHeader"), e(g, "vocabulary", o(h, 8, g, ue)), o(h, 11, g), e(g, "elementSetup", o(h, 12, g, { disabled: "its own" })), o(h, 15, g);
var pe = g, me = {
	tag: "ui-description",
	topics: ["content parts", "text"],
	aka: [
		"body text",
		"summary text",
		"details"
	],
	noun: "description",
	ui: !1,
	description: "A description of the content:  card / item / modal / list / step / search text, a comment's text.",
	attributes: [],
	events: [],
	slots: [{
		name: "",
		description: "Text."
	}],
	parts: [{
		name: "description",
		description: "The description box."
	}],
	states: [
		{
			name: "in-card",
			description: "Owned by a card."
		},
		{
			name: "in-item",
			description: "Owned by an item."
		},
		{
			name: "in-comment",
			description: "Owned by a comment."
		},
		{
			name: "in-modal",
			description: "Owned by a modal."
		},
		{
			name: "in-flyout",
			description: "Owned by a flyout."
		},
		{
			name: "in-list",
			description: "Owned by a list."
		},
		{
			name: "in-step",
			description: "Owned by a step."
		},
		{
			name: "in-search",
			description: "Owned by a search."
		}
	],
	texts: []
}, _, v, y, b = class _UIDescription extends (v = i, _ = [s], v) {};
y = r(v), t(y, 13, "vocabulary", _, b), n(y, b), a(b, "UIDescription"), e(b, "vocabulary", o(y, 8, b, me)), o(y, 11, b);
var he = b, ge = {
	tag: "ui-meta",
	topics: ["content parts", "text"],
	aka: [
		"metadata",
		"subtitle",
		"byline",
		"caption"
	],
	noun: "meta",
	ui: !1,
	description: "Metadata about the content, e.g. a date or a category;  a comment's `metadata`.",
	attributes: [],
	events: [],
	slots: [{
		name: "",
		description: "Short items, spaced apart (`<span>`s, links)."
	}],
	parts: [{
		name: "meta",
		description: "The meta box."
	}],
	states: [
		{
			name: "in-card",
			description: "Owned by a card."
		},
		{
			name: "in-item",
			description: "Owned by an item."
		},
		{
			name: "in-feed",
			description: "Owned by a feed."
		},
		{
			name: "in-comment",
			description: "Owned by a comment."
		}
	],
	texts: []
}, _e, x, S, C = class _UIMeta extends (x = i, _e = [s], x) {};
S = r(x), t(S, 13, "vocabulary", _e, C), n(S, C), a(C, "UIMeta"), e(C, "vocabulary", o(S, 8, C, ge)), o(S, 11, C);
var ve = C, ye = {
	tag: "ui-extra",
	topics: ["content parts", "cards"],
	aka: [
		"footer",
		"card footer",
		"extra content"
	],
	noun: "extra",
	ui: !1,
	description: "Extra content, set apart from the main content, e.g. a card's footer.",
	attributes: [{
		name: "text",
		group: "name",
		kind: "keyOnly",
		description: "In a feed:  a block of extra text."
	}],
	events: [],
	slots: [{
		name: "",
		description: "Content."
	}],
	parts: [{
		name: "extra",
		description: "The extra box."
	}],
	states: [
		{
			name: "in-card",
			description: "Owned by a card."
		},
		{
			name: "in-item",
			description: "Owned by an item."
		},
		{
			name: "in-feed",
			description: "Owned by a feed."
		}
	],
	texts: []
}, be, w, T, E = class _UIExtra extends (w = i, be = [s], w) {};
T = r(w), t(T, 13, "vocabulary", be, E), n(T, E), a(E, "UIExtra"), e(E, "vocabulary", o(T, 8, E, ye)), o(T, 11, E);
var xe = E, Se = {
	tag: "ui-actions",
	topics: [
		"content parts",
		"buttons",
		"dialogs"
	],
	aka: [
		"footer buttons",
		"button bar",
		"dialog actions"
	],
	noun: "actions",
	ui: !1,
	description: "Actions a person can take:  a modal's or toast's buttons, a comment's reply links.",
	attributes: [],
	events: [],
	slots: [{
		name: "",
		description: "Buttons or links."
	}],
	parts: [{
		name: "actions",
		description: "The actions box."
	}],
	states: [
		{
			name: "in-comment",
			description: "Owned by a comment."
		},
		{
			name: "in-modal",
			description: "Owned by a modal."
		},
		{
			name: "in-flyout",
			description: "Owned by a flyout."
		},
		{
			name: "in-toast",
			description: "Owned by a toast."
		}
	],
	texts: []
}, Ce, D, O, k = class _UIActions extends (D = i, Ce = [s], D) {};
O = r(D), t(O, 13, "vocabulary", Ce, k), n(O, k), a(k, "UIActions"), e(k, "vocabulary", o(O, 8, k, Se)), o(O, 11, k);
var A = k, we = {
	tag: "ui-title",
	topics: [
		"content parts",
		"typography",
		"containers"
	],
	aka: [
		"accordion title",
		"summary",
		"toggle header"
	],
	noun: "title",
	ui: !1,
	description: "A title:  a step's, an accordion panel's, a search result's.",
	attributes: [{
		name: "link",
		group: "link",
		kind: "string",
		replaces: ["href"],
		description: "Renders a link (`<a>`).  Its old name was `href`."
	}],
	events: [],
	slots: [{
		name: "",
		description: "Text."
	}],
	parts: [{
		name: "title",
		description: "The title box."
	}],
	states: [
		{
			name: "in-step",
			description: "Owned by a step."
		},
		{
			name: "in-accordion",
			description: "Owned by an accordion."
		},
		{
			name: "in-search",
			description: "Owned by a search."
		}
	],
	texts: []
}, j, M, N, P = class _UITitle extends (M = i, j = [s], M) {
	get rootTag() {
		return this.link ? "a" : "div";
	}
};
N = r(M), t(N, 13, "vocabulary", j, P), n(N, P), a(P, "UITitle"), e(P, "vocabulary", o(N, 8, P, we)), o(N, 11, P);
var Te = P, Ee = {
	tag: "ui-summary",
	topics: ["content parts", "social"],
	aka: ["event summary", "headline"],
	noun: "summary",
	ui: !1,
	description: "A feed event's summary line, e.g. who did what, with an inline date.",
	attributes: [],
	events: [],
	slots: [{
		name: "",
		description: "Text, `<ui-author>`, `<ui-date>`."
	}],
	parts: [{
		name: "summary",
		description: "The summary box."
	}],
	states: [{
		name: "in-feed",
		description: "Owned by a feed."
	}],
	texts: []
}, De, F, I, L = class _UISummary extends (F = i, De = [s], F) {};
I = r(F), t(I, 13, "vocabulary", De, L), n(I, L), a(L, "UISummary"), e(L, "vocabulary", o(I, 8, L, Ee)), o(I, 11, L);
var Oe = L, ke = {
	tag: "ui-date",
	topics: [
		"content parts",
		"date & time",
		"social"
	],
	aka: [
		"timestamp",
		"time ago",
		"posted at"
	],
	noun: "date",
	ui: !1,
	description: "When something happened;  inline and small inside a summary.",
	attributes: [{
		name: "datetime",
		group: "appearance",
		kind: "string",
		property: "dateTime",
		description: "Machine-readable date, as `<time datetime>`."
	}],
	events: [],
	slots: [{
		name: "",
		description: "The human-readable date."
	}],
	parts: [{
		name: "date",
		description: "The `<time>`."
	}],
	states: [{
		name: "in-feed",
		description: "Owned by a feed."
	}],
	texts: []
}, Ae, R, z, B = class _UIDate extends (R = i, Ae = [s], R) {
	get rootTag() {
		return "time";
	}
	get rootDatetime() {
		return this.datetime;
	}
};
z = r(R), t(z, 13, "vocabulary", Ae, B), n(z, B), a(B, "UIDate"), e(B, "vocabulary", o(z, 8, B, ke)), o(z, 11, B);
var je = B, Me = {
	tag: "ui-author",
	topics: ["content parts", "social"],
	aka: [
		"user name",
		"byline",
		"poster"
	],
	noun: "author",
	ui: !1,
	description: "Who wrote a comment or did a feed event (Fomantic's feed `user`).",
	attributes: [{
		name: "link",
		group: "link",
		kind: "string",
		replaces: ["href"],
		description: "Renders a link (`<a>`), e.g. to a profile.  Its old name was `href`."
	}, {
		name: "target",
		group: "link",
		kind: "string",
		description: "Link target, with `link`."
	}],
	events: [],
	slots: [{
		name: "",
		description: "The name."
	}],
	parts: [{
		name: "author",
		description: "The author box."
	}],
	states: [{
		name: "in-comment",
		description: "Owned by a comment."
	}, {
		name: "in-feed",
		description: "Owned by a feed."
	}],
	texts: []
}, Ne, V, H, U = class _UIAuthor extends (V = i, Ne = [s], V) {
	get rootTag() {
		return this.link ? "a" : "span";
	}
};
H = r(V), t(H, 13, "vocabulary", Ne, U), n(H, U), a(U, "UIAuthor"), e(U, "vocabulary", o(H, 8, U, Me)), o(H, 11, U);
var Pe = U, Fe = {
	tag: "ui-avatar",
	topics: [
		"content parts",
		"images",
		"social"
	],
	aka: [
		"profile picture",
		"user image",
		"userpic"
	],
	noun: "avatar",
	ui: !1,
	description: "A small picture of a person:  a comment's or a card's.",
	attributes: [{
		name: "src",
		group: "link",
		kind: "string",
		description: "Image URL;  renders the `<img>` (or slot one)."
	}, {
		name: "tooltip",
		group: "content",
		kind: "string",
		replaces: ["alt"],
		description: "Who it is:  the picture's tooltip and its alternative text for screen readers.  Default none (decorative:  the name is nearly always beside it).  Its old name was `alt`."
	}],
	events: [],
	slots: [{
		name: "",
		description: "An `<img>`, instead of `src`."
	}],
	parts: [{
		name: "avatar",
		description: "The avatar box."
	}, {
		name: "image",
		description: "The `<img>` rendered from `src`."
	}],
	states: [
		{
			name: "in-card",
			description: "Owned by a card."
		},
		{
			name: "in-item",
			description: "Owned by an item."
		},
		{
			name: "in-comment",
			description: "Owned by a comment."
		}
	],
	texts: []
}, Ie = /* @__PURE__ */ l("<img>"), Le = /* @__PURE__ */ l("<slot>"), Re, W, G, K = class _UIAvatar extends (W = i, Re = [s], W) {
	get rootTag() {
		return "span";
	}
	content() {
		let e = this;
		return re(te, {
			get when() {
				return e.src;
			},
			get fallback() {
				var e = Le();
				return e._$owner = ae(), e;
			},
			get children() {
				var t = Ie();
				return ie(() => ({
					e: e.src,
					t: e.tooltip ?? "",
					a: e.tooltip,
					o: e.partForName("image")
				}), ({ e, t: n, a: r, o: i }, a) => {
					e !== a?.e && c(t, "src", e), n !== a?.t && c(t, "alt", n), r !== a?.a && c(t, "title", r), i !== a?.o && c(t, "part", i);
				}), t;
			}
		});
	}
};
G = r(W), t(G, 13, "vocabulary", Re, K), n(G, K), a(K, "UIAvatar"), e(K, "vocabulary", o(G, 8, K, Fe)), o(G, 11, K);
var q = K, ze = {
	tag: "ui-detail",
	topics: ["content parts", "text"],
	aka: ["secondary text", "note"],
	noun: "detail",
	ui: !1,
	description: "A label's dimmer second value, e.g. a count.",
	attributes: [{
		name: "link",
		group: "link",
		kind: "string",
		replaces: ["href"],
		description: "Renders a link (`<a class=\"detail\" href>`).  Its old name was `href`."
	}],
	events: [],
	slots: [{
		name: "",
		description: "Text, an icon."
	}],
	parts: [{
		name: "detail",
		description: "The detail box."
	}],
	states: [{
		name: "in-label",
		description: "Owned by a label."
	}],
	texts: []
}, Be, J, Y, X = class _UIDetail extends (J = i, Be = [s], J) {
	get rootTag() {
		return this.link ? "a" : "span";
	}
};
Y = r(J), t(Y, 13, "vocabulary", Be, X), n(Y, X), a(X, "UIDetail"), e(X, "vocabulary", o(Y, 8, X, ze)), o(Y, 11, X);
var Ve = X, He = {
	tag: "ui-value",
	topics: ["content parts", "data display"],
	aka: [
		"statistic value",
		"number",
		"metric value"
	],
	noun: "value",
	ui: !1,
	description: "A statistic's value;  a search result's price.",
	attributes: [{
		name: "text",
		group: "name",
		kind: "keyOnly",
		description: "In a statistic:  a word value, smaller and bold."
	}],
	events: [],
	slots: [{
		name: "",
		description: "The value:  a number, a word, an icon or image."
	}],
	parts: [{
		name: "value",
		description: "The value box."
	}],
	states: [{
		name: "in-statistic",
		description: "Owned by a statistic."
	}, {
		name: "in-search",
		description: "Owned by a search."
	}],
	texts: []
}, Ue, Z, Q, $ = class _UIValue extends (Z = i, Ue = [s], Z) {};
Q = r(Z), t(Q, 13, "vocabulary", Ue, $), n(Q, $), a($, "UIValue"), e($, "vocabulary", o(Q, 8, $, He)), o(Q, 11, $);
var We = $;
le.define(), pe.define(), he.define(), ve.define(), xe.define(), A.define(), Te.define(), Oe.define(), je.define(), Pe.define(), q.define(), Ve.define(), We.define();
//#endregion
export { A as UIActions, Pe as UIAuthor, q as UIAvatar, le as UIContent, je as UIDate, he as UIDescription, Ve as UIDetail, xe as UIExtra, pe as UIHeader, ve as UIMeta, Oe as UISummary, Te as UITitle, We as UIValue };

//# sourceMappingURL=ui-parts.js.map