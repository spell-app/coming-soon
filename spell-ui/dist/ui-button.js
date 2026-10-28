import "./rolldown-runtime-CYGlBXrH.js";
import { Bt as e, Converters as t, Ft as n, IconGlyph as r, It as i, Lt as a, NativeFallback as o, Q as s, Rt as c, SlotContent as l, UI as u, UIComponent as d, Vt as f, controlled as ee, cssState as p, j as m, n as te, on as ne, onChange as h, proto as g, protoMerged as _, state as re, watches as ie, zt as ae } from "./core.js";
import { t as v } from "./UIButton-XkfGqgh6.js";
import { For as oe, Show as y } from "solid-js";
import { addEvent as se, claimElement as ce, className as b, createComponent as x, delegateEvents as le, effect as S, getOwner as C, insert as w, isServer as T, memo as ue, readShallow as E, ref as D, setAttribute as O, setStyleProperty as k, spread as de, template as A } from "@solidjs/web";
//#region src/components/ui-button/UIButton.types.ts
var fe = [
	"primary",
	"secondary",
	"positive",
	"negative"
].map((e) => ({
	from: e,
	value: e
})), pe = {
	both: "attached",
	top: "top attached",
	bottom: "bottom attached",
	left: "left attached",
	right: "right attached"
}, me = class DOMElementClick {
	static press(e) {
		let t = e.getRootNode();
		t.addEventListener("click", DOMElementClick.contain);
		try {
			e.click();
		} finally {
			t.removeEventListener("click", DOMElementClick.contain);
		}
	}
	static contain(e) {
		e.stopPropagation();
	}
}, j = {
	tag: "ui-button",
	formControl: !0,
	topics: [
		"buttons",
		"basic",
		"controls",
		"forms",
		"elements"
	],
	aka: [
		"btn",
		"action",
		"submit",
		"link button"
	],
	skeleton: "inline 6 x 2.5",
	noun: "button",
	plural: "buttons",
	description: "A button indicates a possible action.",
	attributes: [
		{
			name: "size",
			group: "appearance",
			kind: "size",
			default: "medium",
			description: "How big it is, from `mini` to `massive`.  The default is `medium`."
		},
		{
			name: "color",
			group: "appearance",
			kind: "color",
			replaces: fe,
			description: "Its hue:  it fills the button, or only its ring and text when `basic`.  `primary` and `secondary` are the brand's colours.  `positive` and `negative` say what pressing it does.  Written alone, they were its old names."
		},
		{
			name: "appearance",
			group: "appearance",
			kind: "multiple",
			classes: {},
			values: [
				"basic",
				"tertiary",
				"circular"
			],
			replaces: [
				{
					from: "basic",
					value: "basic"
				},
				{
					from: "tertiary",
					value: "tertiary"
				},
				{
					from: "circular",
					value: "circular"
				}
			],
			description: "The look, several words at once.  `basic` is less pronounced:  transparent, with a hairline ring.  `tertiary` is the least:  text only, underlined on hover.  `circular` is pill-shaped, and round when it holds only an icon.  Written alone, each was its old name."
		},
		{
			name: "inverted",
			group: "appearance",
			kind: "keyOnly",
			description: "For dark backgrounds:  an outline that fills on hover."
		},
		{
			name: "toggle",
			group: "appearance",
			kind: "keyOnly",
			description: "Each click turns `selected` on or off, and `aria-pressed` with it.  It sends `ui-selected` or `ui-deselected` as it turns."
		},
		{
			name: "selected",
			group: "states",
			kind: "keyOnly",
			key: "active",
			replaces: ["active"],
			description: "Pressed / on;  with `toggle`, in the positive colour.  Its old name was `active`."
		},
		{
			name: "active-text",
			group: "states",
			kind: "string",
			description: "The text shown while `selected`, instead of the content:  `Following`.  It's Fomantic's `state` behaviour.  With either state text the label says the state, so a toggle button leaves `aria-pressed` off (WAI-ARIA APG)."
		},
		{
			name: "inactive-text",
			group: "states",
			kind: "string",
			description: "The text shown while NOT `selected`, instead of the content:  `Follow`.  It's Fomantic's `state` behaviour, as `active-text` is."
		},
		{
			name: "disabled",
			group: "states",
			kind: "keyOnly",
			description: "Can't be used;  dimmed and inert."
		},
		{
			name: "loading",
			group: "states",
			kind: "keyOnly",
			description: "Shows a spinner in place of the content;  `aria-busy`."
		},
		{
			name: "fluid",
			group: "layout",
			kind: "keyOnly",
			description: "Takes the full width of its container."
		},
		{
			name: "padding",
			group: "layout",
			kind: "valueOnly",
			values: ["none", "compact"],
			classes: { none: "unpadded" },
			replaces: [{
				from: "compact",
				value: "compact"
			}, {
				from: "unpadded",
				value: "none"
			}],
			description: "Room inside it:  `compact` (reduced) or `none` (hugs its content).  Old names:  `compact`, `unpadded`."
		},
		{
			name: "wrap",
			group: "appearance",
			kind: "keyOnly",
			key: "wrapped",
			replaces: ["wrapped"],
			description: "Lets a long text wrap onto more lines.  Without it, a button's text stays on one line.  Its old name was `wrapped`."
		},
		{
			name: "ellipsis",
			group: "appearance",
			kind: "keyOnly",
			description: "One line, cut off with `…` where it doesn't fit.  It needs a width to cut at:  `fluid`, a width of its own, or a narrow parent (it's never wider than that)."
		},
		{
			name: "labeled",
			group: "appearance",
			kind: "keyOrValueAndKey",
			values: ["left", "right"],
			description: "With `icon`, the icon gets a block of its own:  at the start, or at the end with `labeled=\"right\"`.  With `badge`, it picks which side the badge goes:  the end, or the start with `labeled=\"left\"`."
		},
		{
			name: "reveal",
			group: "appearance",
			kind: "valueOnly",
			values: [
				"slide",
				"fade",
				"vertical"
			],
			classes: {
				slide: "animated",
				fade: "fade animated",
				vertical: "vertical animated"
			},
			replaces: [{
				from: "animated",
				value: "slide"
			}],
			description: "On hover, it brings the `icon` slot in over the content, the way its value names:  `slide` is sideways.  Its old name was `animated`."
		},
		{
			name: "attach",
			group: "layout",
			kind: "valueOnly",
			values: [
				"both",
				"top",
				"bottom",
				"left",
				"right"
			],
			classes: pe,
			replaces: [{
				from: "attached",
				value: "both"
			}],
			description: "Joins it to the edge of a segment or another element:  the side its value names, or `both`.  Its old name was `attached`."
		},
		{
			name: "icon",
			group: "content",
			kind: "icon",
			description: "Its icon, by name:  Font Awesome's, or Fomantic's aliases.  With no text, it's an icon button, with square padding (the `icon` class).  With `labeled`, it's a `labeled icon` button."
		},
		{
			name: "icon-position",
			group: "content",
			kind: "enum",
			values: ["left", "right"],
			description: "Which side of the text the icon goes:  `left` (the default) or `right`.  `right` is Fomantic's right icon, as in `Next →`.  The space between them is `--ui-button-icon-spacing`.  A labeled icon block takes its side from `labeled` instead."
		},
		{
			name: "label",
			group: "content",
			kind: "string",
			replaces: ["content"],
			description: "The button's text, written as an attribute instead of in the default slot.  Children in the slot win.  Its old name was `content`.  NOTE:  `label` used to be the joined badge, which is `badge` now."
		},
		{
			name: "badge",
			group: "content",
			kind: "string",
			description: "A badge joined to the button, such as a count:  it draws a `ui labeled button` round the button.  It used to be `label`, which is the button's text now, so it has no old name."
		},
		{
			name: "type",
			group: "appearance",
			kind: "enum",
			values: [
				"button",
				"submit",
				"reset"
			],
			default: "button",
			description: "What it does in a form, as the native `<button type>`.  `submit` calls `form.requestSubmit()`."
		},
		{
			name: "commandfor",
			group: "behaviour",
			kind: "string",
			property: "commandFor",
			description: "The id of the element `command` acts on, as the native `<button commandfor>`.  It's looked up in the button's own tree.  The inner button gets the element itself (`commandForElement`), since a shadow button can't see a light-DOM id.  In a browser without invoker commands (`UI.browser.supports.invokers`), a click runs the built-in commands itself."
		},
		{
			name: "command",
			group: "behaviour",
			kind: "string",
			description: "The invoker command to run, as the native `<button command>`.  A dialog takes `show-modal / close / request-close`, a popover `show-popover / hide-popover / toggle-popover`.  Any other is a custom `--name`, which the target hears as a `command` event.  `<ui-modal>` answers `--show / --close / --toggle`."
		},
		{
			name: "link",
			group: "link",
			kind: "string",
			replaces: ["href"],
			description: "Renders a link (`<a>`) styled as a button.  Its old name was `href`."
		},
		{
			name: "target",
			group: "link",
			kind: "string",
			description: "Link target, with `link`."
		},
		{
			name: "download",
			group: "link",
			kind: "string",
			description: "With `link`:  downloads the file instead of opening it, as the native `<a download>`;  a value names the saved file."
		},
		{
			name: "name",
			group: "name",
			kind: "string",
			description: "Form field name submitted with the button's `value`."
		},
		{
			name: "value",
			group: "form",
			kind: "string",
			description: "Form value submitted when this button submits the form."
		}
	],
	events: [{
		name: "ui-selected",
		detail: "{ active: true, originalEvent?: Event }",
		description: "A `toggle` button turned `selected` on.  NOTE: plain clicks are the native `click`."
	}, {
		name: "ui-deselected",
		detail: "{ active: false, originalEvent?: Event }",
		description: "A `toggle` button turned `selected` off."
	}],
	slots: [
		{
			name: "",
			description: "Content, usually text;  instead of the `label` attribute."
		},
		{
			name: "icon",
			description: "Icon, instead of the `icon` attribute;  the hidden content of `reveal`."
		},
		{
			name: "label",
			description: "The joined badge's content, instead of the `badge` attribute."
		}
	],
	parts: [
		{
			name: "button",
			description: "The inner `<button>` (or `<a>`)."
		},
		{
			name: "icon",
			description: "The icon box."
		},
		{
			name: "label",
			description: "The joined badge of a `badge` button."
		}
	],
	states: [
		{
			name: "active",
			description: "Pressed / on (`selected`)."
		},
		{
			name: "disabled",
			description: "Can't be used."
		},
		{
			name: "loading",
			description: "Busy."
		},
		{
			name: "fluid",
			description: "The host is block-level:  `fluid`, or attached top, bottom or both (`attach`)."
		},
		{
			name: "ellipsis",
			description: "Cuts its text off with `…`:  the host is never wider than its parent."
		}
	],
	texts: [{
		key: "loading",
		text: "Loading…",
		description: "Announced while `loading`."
	}]
}, Invoker = class {
	static resolve(e, t) {
		if (!t) return;
		let n = e.getRootNode();
		return typeof n.getElementById == "function" ? n.getElementById(t) ?? void 0 : void 0;
	}
	static run(e, t, n) {
		let r = this.event(t, n);
		e.dispatchEvent(r) && t && !t.startsWith(he) && (e instanceof HTMLDialogElement ? this.dialog(e, t) : e instanceof HTMLElement && this.popover(e, t));
	}
	static event(e, t) {
		let n = {
			command: e,
			source: t,
			cancelable: !0
		}, r = globalThis.CommandEvent;
		return r ? new r("command", n) : Object.assign(new Event("command", { cancelable: !0 }), {
			command: e,
			source: t
		});
	}
	static dialog(e, t) {
		if (t === M.showModal) e.open || e.showModal();
		else if (t === M.close) e.close();
		else if (t === M.requestClose) {
			let t = e;
			t.requestClose ? t.requestClose() : e.dispatchEvent(new Event("cancel", { cancelable: !0 })) && e.close();
		}
	}
	static popover(e, t) {
		e.hasAttribute("popover") && (t === M.showPopover ? e.showPopover() : t === M.hidePopover ? e.hidePopover() : t === M.togglePopover && e.togglePopover());
	}
}, M = {
	showModal: "show-modal",
	close: "close",
	requestClose: "request-close",
	showPopover: "show-popover",
	hidePopover: "hide-popover",
	togglePopover: "toggle-popover"
}, he = "--", N, P, F, I, L = class _ButtonFallback extends (F = o, P = [g], N = [g], F) {
	build() {
		let { domElement: e } = this, n = this.attr("link") ?? void 0, r = this.flag("disabled"), i = this.flag("toggle"), a = t.icon(this.attr("icon")), o = this.attr("label") ?? void 0, s = a && !o && !e.textContent?.trim(), c = n === void 0 ? this.create("button", {
			type: "button",
			disabled: r
		}) : this.create("a", {
			href: r ? void 0 : n,
			target: this.attr("target"),
			download: this.attr("download"),
			rel: this.attr("target") === "_blank" ? "noopener" : void 0,
			"aria-disabled": r ? "true" : void 0,
			tabindex: r ? "-1" : void 0
		});
		c.className = this.classes(), this.decorate(c, "button");
		let l = this.flag("selected") || t.boolean(e.getAttribute("active"), "active");
		return i && c.setAttribute("aria-pressed", String(l)), s && !c.hasAttribute("aria-label") && c.setAttribute("aria-label", a), c.append(this.slot(o)), this.listen(c, "click", (e) => {
			if (r) return e.preventDefault();
			i && c.setAttribute("aria-pressed", String(c.classList.toggle(te))), this.invoke(c, e), this.activate();
		}), this.listen(e, "click", (t) => {
			t.composedPath()[0] === e && !r && !t.defaultPrevented && me.press(c);
		}), [c];
	}
	invoke(e, t) {
		let n = this.attr(R);
		if (!n) return;
		let r = Invoker.resolve(this.domElement, this.attr("commandfor"));
		u.browser.supports.invokers && e instanceof HTMLButtonElement ? (e.setAttribute(R, n), e.commandForElement = r ?? null) : r && !t.defaultPrevented && Invoker.run(r, n, this.domElement);
	}
	activate() {
		let e = this.attr("type"), t = this.form();
		if (!t) return;
		if (e === "reset") return t.reset();
		if (e !== "submit") return;
		let n = this.formInternals && this.attr("name") !== void 0;
		n && this.formInternals.setFormValue(this.attr("value") ?? "");
		try {
			t.requestSubmit();
		} finally {
			n && this.formInternals.setFormValue(null);
		}
	}
};
I = a(F), n(I, 13, "vocabulary", P, L), n(I, 13, "degraded", N, L), i(I, L), c(L, "ButtonFallback"), e(L, "vocabulary", f(I, 8, L, j)), f(I, 11, L), e(L, "degraded", f(I, 12, L, [
	"`ui-selected` / `ui-deselected` events (toggle only flips `aria-pressed` + `selected`)",
	"`icon` glyph and `icon` / `label` slots",
	"joined `badge`",
	"`reveal`",
	"`loading` spinner",
	"`active-text` / `inactive-text` (the content shows;  a toggle keeps `aria-pressed`)",
	"a `click` handler's preventDefault() on the element cannot veto submit / reset"
])), f(I, 15, L);
var ge = L, R = "command", _e = /* @__PURE__ */ A("<div><span><slot>"), ve = /* @__PURE__ */ A("<a>"), ye = /* @__PURE__ */ A("<button>"), be = /* @__PURE__ */ A("<slot>"), z = /* @__PURE__ */ A("<span>"), xe = /* @__PURE__ */ A("<span><slot>"), B, V, Se, Ce, we, Te, H, U, W, G = class _UIButton extends (H = d, Te = [g], we = [_], Ce = [p("active"), ee("selected")], Se = [p("fluid")], V = [h("commandfor", "hasNativeInvokers")], B = [ne("click")], H) {
	constructor() {
		super(...arguments), f(U, 5, this), ae(this, W, f(U, 8, this, !1)), f(U, 11, this), e(this, "slots", new l(this.domElement)), e(this, "iconGlyph", new r({
			owner: this,
			name: /* @__PURE__ */ c(() => this.icon, "name")
		})), e(this, "innerControl"), e(this, "onClick", /* @__PURE__ */ c((e) => {
			if (this.isDisabled) {
				e.preventDefault();
				return;
			}
			if (this.resolveInvoker(), this.runInvoker(e), this.toggle) {
				let t = !this.isActive;
				this.requestChange("isActive", t, () => this.send(t ? "ui-selected" : "ui-deselected", {
					active: t,
					originalEvent: e
				}));
			}
			let { form: t } = this.domElement.internals;
			t && (this.type === "submit" ? this.submit(t) : this.type === "reset" && t.reset());
		}, "onClick"));
	}
	get stateText() {
		return this.isActive ? this.activeText : this.inactiveText;
	}
	get hasStateText() {
		return this.activeText != null || this.inactiveText != null;
	}
	get ariaLabel() {
		return this.attributes["aria-label"] ?? void 0;
	}
	get iconTooltip() {
		if (!(this.hasText || this.attributes.title != null)) return this.ariaLabel;
	}
	get hasText() {
		return this.slots.hasContent("") || !!this.label || !!this.stateText;
	}
	get hasIcon() {
		return !!this.icon || this.slots.hasContent(this.slotForName("icon"));
	}
	get hasBadge() {
		return !!this.badge || this.slots.hasContent(this.slotForName("label"));
	}
	get isDisabled() {
		return this.isMarkedDisabled;
	}
	get isFluid() {
		let { attach: e } = this;
		return this.fluid || e === "both" || e === "top" || e === "bottom";
	}
	classValue(e) {
		return e === "selected" ? this.isActive : e === "disabled" ? this.isDisabled : e === "labeled" && this.hasBadge ? !1 : super.classValue(e);
	}
	get extraClass() {
		if (!this.hasIcon || this.reveal) return;
		let e = !!this.labeled && !this.hasBadge;
		return !this.hasText || e ? m : void 0;
	}
	render() {
		let e = this;
		return x(y, {
			get when() {
				return e.hasBadge;
			},
			get fallback() {
				return e.control();
			},
			get children() {
				var t = _e(), n = t.firstChild, r = n.firstChild;
				return w(t, () => e.control(), n), r._$owner = C(), w(r, () => e.badge), S(() => ({
					e: E(e.wrapperClass({
						size: e.size,
						color: e.color,
						labeled: e.labeled || !0
					})),
					t: E(Ae),
					a: e.partForName("label"),
					o: e.slotForName("label")
				}), ({ e, t: i, a, o }, s) => {
					b(t, e, s?.e), b(n, i, s?.t), a !== s?.a && O(n, "part", a), o !== s?.o && O(r, "name", o);
				}), t;
			}
		});
	}
	control() {
		let e = /* @__PURE__ */ c(() => this.iconAndText(), "iconAndText"), t = this;
		return x(y, {
			get when() {
				return t.link;
			},
			get fallback() {
				var n = ye();
				return de(n, [
					{
						get type() {
							return t.nativeType;
						},
						get class() {
							return t.rootClass;
						},
						get part() {
							return t.partForName("button");
						},
						get disabled() {
							return t.isDisabled;
						}
					},
					() => t.staticControl,
					{
						get "aria-pressed"() {
							return t.toggle && !t.hasStateText ? t.isActive ? "true" : "false" : void 0;
						},
						get "aria-busy"() {
							return t.loading ? "true" : void 0;
						},
						get "aria-label"() {
							return t.ariaLabel;
						},
						get title() {
							return t.iconTooltip;
						},
						get command() {
							return T || t.hasNativeInvokers ? t.command : void 0;
						},
						get onClick() {
							return t.onClick;
						}
					}
				], !0), D(() => (e) => {
					t.innerControl = e, t.resolveInvoker();
				}, n), w(n, e), n;
			},
			get children() {
				var n = ve(), r = C();
				return se(n, "click", t.onClick, !0), D(() => (e) => t.innerControl = e, n), w(n, e), S(() => ({
					e: E(t.rootClass),
					t: t.partForName("button"),
					a: t.linkTo,
					o: t.linkTarget,
					i: t.download,
					n: t.isDisabled ? "link" : void 0,
					s: t.isDisabled ? "true" : void 0,
					h: t.loading ? "true" : void 0,
					r: t.ariaLabel,
					d: t.iconTooltip
				}), ({ e, t, a: i, o: a, i: o, n: s, s: c, h: l, r: u, d }, f) => {
					b(n, e, f?.e), t !== f?.t && O(n, "part", t), i !== f?.a && O(n, "href", i), a !== f?.o && O(n, "target", a), o !== f?.i && O(n, "download", o), s !== f?.n && O(n, "role", s), c !== f?.s && O(n, "aria-disabled", c), l !== f?.h && O(n, "aria-busy", l), u !== f?.r && O(n, "aria-label", u), d !== f?.d && O(n, "title", d), ce(n, r);
				}), n;
			}
		});
	}
	get nativeType() {
		return T ? this.type ?? "button" : "button";
	}
	get staticControl() {
		if (!T) return {};
		let e = {
			[s]: "",
			name: this.name,
			value: this.value,
			commandfor: this.commandfor
		};
		for (let t of De) {
			let n = this.domElement.getAttribute(t);
			n !== null && (e[t] = n);
		}
		return e;
	}
	iconAndText() {
		let e = this, t = x(y, {
			get when() {
				return e.stateText;
			},
			get fallback() {
				var t = be();
				return t._$owner = C(), w(t, () => e.label), t;
			},
			get children() {
				return e.stateText;
			}
		}), n = /* @__PURE__ */ c(() => this.iconPosition === Oe, "isTrailing"), r = this, i = [
			x(y, {
				get when() {
					return ue(() => !!r.hasIcon)() ? !n() : r.hasIcon;
				},
				get children() {
					return r.iconBox();
				}
			}),
			t,
			x(y, {
				get when() {
					return ue(() => !!r.hasIcon)() ? n() : r.hasIcon;
				},
				get children() {
					return r.iconBox(ke);
				}
			})
		], a = this;
		return x(y, {
			get when() {
				return a.reveal;
			},
			fallback: i,
			get children() {
				return [(() => {
					var e = z();
					return w(e, t), S(() => E(je), (t, n) => {
						b(e, t, n);
					}), e;
				})(), (() => {
					var e = z();
					return w(e, () => a.iconBox()), S(() => E(Me), (t, n) => {
						b(e, t, n);
					}), e;
				})()];
			}
		});
	}
	iconBox(e = m) {
		let t = this;
		var n = xe(), r = n.firstChild;
		return r._$owner = C(), w(r, () => t.iconGlyph.svg), S(() => ({
			e: E(e),
			t: t.partForName("icon"),
			a: t.slotForName("icon")
		}), ({ e, t, a: i }, a) => {
			b(n, e, a?.e), t !== a?.t && O(n, "part", t), i !== a?.a && O(r, "name", i);
		}), n;
	}
	get hasNativeInvokers() {
		return !T && this.isReady ? u.browser.supports.invokers : void 0;
	}
	onCommandTargetChanged() {
		this.resolveInvoker();
	}
	resolveInvoker() {
		let e = this.innerControl;
		e && this.hasNativeInvokers && e instanceof HTMLButtonElement && (e.commandForElement = Invoker.resolve(this.domElement, this.commandfor) ?? null);
	}
	runInvoker(e) {
		let { command: t, commandfor: n } = this;
		if (this.hasNativeInvokers !== !1 || !t || e.defaultPrevented) return;
		let r = Invoker.resolve(this.domElement, n);
		r && Invoker.run(r, t, this.domElement);
	}
	onDOMElementClick(e) {
		let t = this.innerControl;
		e.composedPath()[0] === this.domElement && t?.isConnected && (this.isDisabled || e.defaultPrevented || me.press(t));
	}
	submit(e) {
		let { name: t, value: n } = this, { internals: r } = this.domElement;
		t && r.setFormValue(n ?? "");
		try {
			e.requestSubmit();
		} finally {
			t && r.setFormValue(null);
		}
	}
	focus() {
		this.innerControl?.focus();
	}
};
U = a(H), W = /* @__PURE__ */ new WeakMap(), n(U, 4, "isActive", Ce, G, W), n(U, 2, "isFluid", Se, G), n(U, 1, "onCommandTargetChanged", V, G), n(U, 1, "onDOMElementClick", B, G), n(U, 13, "vocabulary", Te, G), n(U, 13, "elementSetup", we, G), i(U, G), c(G, "UIButton"), e(G, "vocabulary", f(U, 12, G, j)), f(U, 15, G), e(G, "elementSetup", f(U, 16, G, {
	styleSheets: { button: v },
	Fallback: ge,
	isAFormControl: !0,
	disabled: "its own",
	loading: "its own",
	cssStates: ["ellipsis"]
})), f(U, 19, G);
var Ee = G, De = [
	"form",
	"formaction",
	"formenctype",
	"formmethod",
	"formnovalidate",
	"formtarget"
], Oe = "right", ke = "right icon", Ae = "ui basic label", je = "visible content", Me = "hidden content";
le(["click"]);
//#endregion
//#region src/components/ui-button/UIButtons.en.ts
var Ne = {
	tag: "ui-buttons",
	topics: [
		"buttons",
		"controls",
		"layout",
		"elements"
	],
	aka: [
		"button group",
		"segmented control",
		"toolbar"
	],
	noun: "buttons",
	description: "Buttons can exist together as a group.",
	attributes: [
		{
			name: "size",
			group: "appearance",
			kind: "size",
			description: "Size of every button in the group."
		},
		{
			name: "color",
			group: "appearance",
			kind: "color",
			replaces: fe,
			description: "The hue of every button in the group:  any hue, or one of the four a button takes (`primary` ...).  Written alone, they were its old names."
		},
		{
			name: "appearance",
			group: "appearance",
			kind: "multiple",
			classes: {},
			values: [
				"basic",
				"tertiary",
				"circular"
			],
			replaces: [
				{
					from: "basic",
					value: "basic"
				},
				{
					from: "tertiary",
					value: "tertiary"
				},
				{
					from: "circular",
					value: "circular"
				}
			],
			description: "The look of every button, several words at once.  `basic` puts them inside one outer border, and `tertiary` is text only.  `circular` makes them separate pill-shaped buttons.  Written alone, each was its old name."
		},
		{
			name: "inverted",
			group: "appearance",
			kind: "keyOnly",
			description: "Inverted buttons, for dark backgrounds."
		},
		{
			name: "icon",
			group: "content",
			kind: "keyOnly",
			description: "Icon-only buttons:  square padding."
		},
		{
			name: "labeled",
			group: "appearance",
			kind: "keyOrValueAndKey",
			values: ["left", "right"],
			description: "With `icon`, labeled icon buttons.  `labeled=\"right\"` puts the icons at the end."
		},
		{
			name: "padding",
			group: "layout",
			kind: "valueOnly",
			values: ["compact"],
			replaces: [{
				from: "compact",
				value: "compact"
			}],
			description: "Room inside every button:  `compact` (reduced).  Its old name was `compact`."
		},
		{
			name: "toggle",
			group: "appearance",
			kind: "keyOnly",
			description: "`selected` buttons show in the positive colour."
		},
		{
			name: "direction",
			group: "layout",
			kind: "valueOnly",
			values: ["vertical"],
			replaces: [{
				from: "vertical",
				value: "vertical"
			}],
			description: "Which way the buttons run:  `vertical` stacks them.  Its old name was `vertical`."
		},
		{
			name: "fluid",
			group: "layout",
			kind: "keyOnly",
			description: "Takes the full width of its container."
		},
		{
			name: "equal",
			group: "layout",
			kind: "keyOnly",
			description: "Every button the same width, from the buttons themselves (no count):  each as wide as the widest;  with `fluid`, an equal share of the row each."
		},
		{
			name: "wrapping",
			group: "layout",
			kind: "keyOnly",
			description: "Buttons wrap onto more rows."
		},
		{
			name: "spacing",
			group: "layout",
			kind: "valueOnly",
			values: ["md"],
			classes: { md: "spaced" },
			replaces: [{
				from: "spaced",
				value: "md"
			}],
			description: "Room between the buttons:  `md` separates them with gaps.  Its old name was `spaced`."
		},
		{
			name: "stackable",
			group: "layout",
			kind: "keyOnly",
			description: "Stacks vertically on mobile."
		},
		{
			name: "attach",
			group: "layout",
			kind: "valueOnly",
			values: [
				"both",
				"top",
				"bottom",
				"left",
				"right"
			],
			classes: pe,
			replaces: [{
				from: "attached",
				value: "both"
			}],
			description: "Joins it to the edge of a segment:  the side its value names, or `both`.  Its old name was `attached`."
		},
		{
			name: "width",
			group: "layout",
			kind: "width",
			widthClass: "",
			canEqual: !0,
			values: "widths",
			description: "The older, count-based way to write `equal fluid`:  equal-width buttons that fill the row.  A count draws its word (`width=\"3\"` draws `three buttons`).  `\"equal\"` draws `equal width buttons`."
		}
	],
	events: [],
	slots: [{
		name: "",
		description: "`<ui-button>`s and `<ui-or>`s."
	}],
	parts: [{
		name: "group",
		description: "The group box."
	}],
	states: [{
		name: "fluid",
		description: "The host is block-level:  `fluid`, `width`, or attached top, bottom or both."
	}],
	texts: []
}, Pe = /* @__PURE__ */ A("<div role=group><slot>"), Fe = /* @__PURE__ */ A("<span aria-hidden=true>"), Ie, Le, Re, ze, Be, Ve, K, q, J, Y = class _UIButtons extends (K = d, Ve = [g], Be = [_], ze = [p("fluid")], Re = [ie({
	childList: !0,
	subtree: !0,
	attributes: !0
})], Le = [re({ equals: sameRows })], Ie = [h("isReady", "wrapping")], K) {
	constructor() {
		super(...arguments), f(q, 5, this), ae(this, J, f(q, 8, this, [])), f(q, 11, this), e(this, "groupBox");
	}
	get isFluid() {
		let { attach: e } = this;
		return this.fluid || !!this.width || e === "both" || e === "top" || e === "bottom";
	}
	get isTrackless() {
		return !T && [...this.domElement.children].some((e) => _UIButtons.drawsOwnLook(e));
	}
	get extraClass() {
		return this.isTrackless ? We : void 0;
	}
	static drawsOwnLook(e) {
		let t = e.attributeValues;
		if (!t) return !1;
		let { appearance: n } = t;
		return !!t.color || typeof n == "string" && n.split(/\s+/).includes(Ge);
	}
	onWrappingChanged(e, t) {
		let n = this.groupBox, r = n?.querySelector("slot");
		if (!e || !t || !n || !r) return;
		let i = new AbortController(), a = new ResizeObserver(() => this.measureRows());
		a.observe(n);
		let o = /* @__PURE__ */ c(() => {
			for (let e of r.assignedElements()) a.observe(e);
			this.measureRows();
		}, "watchButtons");
		return o(), r.addEventListener("slotchange", o, { signal: i.signal }), () => {
			i.abort(), a.disconnect(), this.rows = [];
		};
	}
	measureRows() {
		let e = this.groupBox, t = e?.querySelector("slot");
		if (!e || !t) return;
		let n = getComputedStyle(e), r = {
			left: parseFloat(n.paddingLeft) + e.clientLeft,
			top: parseFloat(n.paddingTop) + e.clientTop,
			right: parseFloat(n.paddingRight) + parseFloat(n.borderRightWidth),
			bottom: parseFloat(n.paddingBottom) + parseFloat(n.borderBottomWidth)
		}, i = e.getBoundingClientRect(), a = [], o = [], s = /* @__PURE__ */ c(() => {
			o.length && a.push(_UIButtons.rowBox(o, i, e, r)), o = [];
		}, "close");
		for (let e of t.assignedElements()) {
			let t = e.getBoundingClientRect();
			(t.width !== 0 || t.height !== 0) && (o.length && t.top >= Math.max(...o.map((e) => e.bottom)) - .5 && s(), o.push(t));
		}
		s(), this.rows = a;
	}
	render() {
		let e = this;
		var t = Pe(), n = t.firstChild;
		return D(() => (t) => e.groupBox = t, t), n._$owner = C(), w(t, x(oe, {
			get each() {
				return e.rows;
			},
			keyed: !1,
			children: (e) => (() => {
				var t = Fe();
				return S(() => ({
					e: E(Ue),
					t: `${e().left}px`,
					a: `${e().top}px`,
					o: `${e().width}px`,
					i: `${e().height}px`
				}), ({ e, t: n, a: r, o: i, i: a }, o) => {
					b(t, e, o?.e), n !== o?.t && k(t, "left", n), r !== o?.a && k(t, "top", r), i !== o?.o && k(t, "width", i), a !== o?.i && k(t, "height", a);
				}), t;
			})()
		}), null), S(() => ({
			e: E(e.rootClass),
			t: e.partForName("group")
		}), ({ e, t: n }, r) => {
			b(t, e, r?.e), n !== r?.t && O(t, "part", n);
		}), t;
	}
	static rowBox(e, t, n, r) {
		let i = Math.min(...e.map((e) => e.left)) - r.left, a = Math.min(...e.map((e) => e.top)) - r.top, o = Math.max(...e.map((e) => e.right)) + r.right, s = Math.max(...e.map((e) => e.bottom)) + r.bottom;
		return {
			left: i - t.left - n.clientLeft,
			top: a - t.top - n.clientTop,
			width: o - i,
			height: s - a
		};
	}
};
q = a(K), J = /* @__PURE__ */ new WeakMap(), n(q, 2, "isFluid", ze, Y), n(q, 2, "isTrackless", Re, Y), n(q, 4, "rows", Le, Y, J), n(q, 1, "onWrappingChanged", Ie, Y), n(q, 13, "vocabulary", Ve, Y), n(q, 13, "elementSetup", Be, Y), i(q, Y), c(Y, "UIButtons"), e(Y, "vocabulary", f(q, 12, Y, Ne)), f(q, 15, Y), e(Y, "elementSetup", f(q, 16, Y, { styleSheets: { button: v } })), f(q, 19, Y);
var He = Y, Ue = "row", We = "trackless", Ge = "basic";
function sameRows(e, t) {
	let n = /* @__PURE__ */ c((e, t) => Math.abs(e - t) < .5, "near");
	return e.length === t.length && e.every((e, r) => n(e.left, t[r].left) && n(e.top, t[r].top) && n(e.width, t[r].width) && n(e.height, t[r].height));
}
c(sameRows, "sameRows");
//#endregion
//#region src/components/ui-button/UIOr.en.ts
var Ke = {
	tag: "ui-or",
	topics: [
		"buttons",
		"controls",
		"elements"
	],
	aka: ["button separator", "or divider"],
	noun: "or",
	ui: !1,
	description: "A conditional between two buttons of a group.",
	attributes: [{
		name: "label",
		group: "content",
		kind: "string",
		replaces: ["text"],
		description: "Badge text;  default the translated `or` text.  Keep it to a short word.  Its old name was `text`."
	}],
	events: [],
	slots: [],
	parts: [{
		name: "or",
		description: "The badge."
	}],
	states: [{
		name: "or",
		description: "Marks the host as a separator, so a group doesn't stretch it."
	}],
	texts: [{
		key: "or",
		text: "or",
		description: "Badge text."
	}]
}, qe = /* @__PURE__ */ A("<span>"), X, Je, Ye, Z, Q, $ = class _UIOr extends (Z = d, Ye = [g], Je = [_], X = [p("or")], Z) {
	constructor() {
		super(...arguments), f(Q, 5, this);
	}
	get isOr() {
		return !0;
	}
	render() {
		let e = this;
		var t = qe();
		return S(() => ({
			e: E(e.rootClass),
			t: e.partForName("or"),
			a: e.label ?? e.translationForKey("or")
		}), ({ e, t: n, a: r }, i) => {
			b(t, e, i?.e), n !== i?.t && O(t, "part", n), r !== i?.a && O(t, "data-text", r);
		}), t;
	}
};
Q = a(Z), n(Q, 2, "isOr", X, $), n(Q, 13, "vocabulary", Ye, $), n(Q, 13, "elementSetup", Je, $), i(Q, $), c($, "UIOr"), e($, "vocabulary", f(Q, 8, $, Ke)), f(Q, 11, $), e($, "elementSetup", f(Q, 12, $, { styleSheets: { button: v } })), f(Q, 15, $);
var Xe = $;
Ee.define(), He.define(), Xe.define();
//#endregion
export { Ee as UIButton, He as UIButtons, Xe as UIOr };

//# sourceMappingURL=ui-button.js.map