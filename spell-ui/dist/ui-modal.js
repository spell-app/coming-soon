import "./rolldown-runtime-CYGlBXrH.js";
import { B as e, Bt as t, CloseButton as n, D as r, Disclosure as i, F as a, Ft as o, It as s, Lt as c, O as ee, Rt as l, UI as u, UIComponent as d, Vt as f, a as te, c as ne, f as p, isBrowser as re, kt as ie, on as m, onChange as ae, proto as h, protoMerged as g, soon as oe, state as se, u as _, untracked as v, whileConnected as ce, zt as le } from "./core.js";
import "./ui-button.js";
import "./ui-parts.js";
import { Show as ue } from "solid-js";
import { addEvent as y, className as b, createComponent as x, delegateEvents as de, effect as S, getOwner as fe, insert as C, isServer as pe, readShallow as w, ref as me, setAttribute as T, template as E } from "@solidjs/web";
//#region src/components/ui-modal/DialogComponent.tsx
var D = /* @__PURE__ */ E("<div>"), he = /* @__PURE__ */ E("<dialog><!><slot></slot><!>"), O, k, A, j, M, N, P, F, I, L, R, z, B = class _DialogComponent extends (L = d, I = [g], F = [v], P = [ce], N = [m("command")], M = [v], j = [v], A = [se], k = [m("slotchange", { target: "renderRoot" })], O = [ae("isReady", "ariaLabel", "heading", "slottedHeading")], L) {
	constructor(...e) {
		super(...e), f(R, 5, this), t(this, "dialog"), t(this, "overlayEntry", {
			element: this.domElement,
			kind: "modal",
			onDismiss: /* @__PURE__ */ l((e) => void this.requestClose(e), "onDismiss")
		}), t(this, "generation", 0), t(this, "disclosure", new i({
			component: this,
			member: "isVisible",
			detail: /* @__PURE__ */ l((e, t) => e ? {
				visible: e,
				originalEvent: t
			} : {
				visible: e,
				reason: this.closeReason,
				originalEvent: t
			}, "detail"),
			afterDetail: /* @__PURE__ */ l((e) => ({ visible: e }), "afterDetail")
		})), t(this, "closeReason", "escape"), t(this, "isDismissing", !1), t(this, "pressStartedOnBackdrop", !1), t(this, "onPointerDown", /* @__PURE__ */ l((e) => {
			let t = this.dialog;
			if (!t || e.target !== t) return void (this.pressStartedOnBackdrop = !1);
			let n = t.getBoundingClientRect(), { clientX: r, clientY: i } = e;
			this.pressStartedOnBackdrop = r < n.left || r > n.right || i < n.top || i > n.bottom;
		}, "onPointerDown")), t(this, "onCancel", /* @__PURE__ */ l((e) => {
			e.preventDefault();
			let t = this.pressStartedOnBackdrop ? "outside" : "escape";
			if (this.pressStartedOnBackdrop = !1, this.isDismissing) return;
			let n = this.closedBy;
			n === "none" || t === "outside" && n !== "any" || this.requestClose(t, e);
		}, "onCancel")), t(this, "onClose", f(R, 16, this, /* @__PURE__ */ l((e) => {
			!this.dialog?.open && this.domElement.isConnected && (this.closeReason = "escape", this.disclosure.adopt(!1, e));
		}, "onClose"))), f(R, 19, this), t(this, "closeButton", new n({
			owner: this,
			shows: /* @__PURE__ */ l(() => !!this.closable, "shows"),
			label: /* @__PURE__ */ l(() => this.closeText, "label"),
			part: this.dialogPart(_),
			onClick: /* @__PURE__ */ l((e) => this.onCloseIcon(e), "onClick")
		})), t(this, "onCloseIcon", /* @__PURE__ */ l((e) => {
			e.stopPropagation(), this.requestClose("close", e);
		}, "onCloseIcon")), t(this, "onDialogClick", /* @__PURE__ */ l((e) => {
			let t = _DialogComponent.actionFor(e, this.domElement);
			if (!t) return;
			let [n, r] = t, i = {
				action: r,
				originalEvent: e
			};
			this.fire(n === "approve" ? "ui-approving" : "ui-denying", i) && this.requestClose(n, e);
		}, "onDialogClick")), le(this, z, f(R, 8, this, this.findHeading())), f(R, 11, this), t(this, "headerId", ""), this.overlayEntry.kind = this.overlayKind;
	}
	get isModeless() {
		return !1;
	}
	get extraClass() {
		return this.isVisible ? this.shownClass : void 0;
	}
	requestOpen(e) {
		return this.disclosure.open(e);
	}
	requestClose(e, t) {
		return this.isVisible ? (this.isDismissing = !0, oe(() => this.isDismissing = !1), this.closeReason = e, this.disclosure.close(t)) : !1;
	}
	async onVisibleChange(e, t) {
		let n = this.dialog;
		if (!n) return;
		let r = te.keyframesBeside(t, this.elementSetup.animation);
		if (e) {
			this.show(), r && await u.transitions.animate({
				element: n,
				name: r,
				direction: "in"
			}), await this.transitionsEnd() && this.isVisible && this.disclosure.sendAfter(!0);
			return;
		}
		let i = u.overlays.isOpen(this.overlayEntry);
		r && i && await u.transitions.animate({
			element: n,
			name: r,
			direction: "out"
		}), !this.isVisible && (this.hide(), i && await this.transitionsEnd() && !this.isVisible && this.domElement.isConnected && this.disclosure.sendAfter(!1));
	}
	watchPlacement() {
		return this.isVisible && this.isReady && this.show(), () => this.hide();
	}
	show() {
		let e = this.dialog;
		if (!e) return;
		let t = this.isModeless, n = this.closedBy, r = u.browser.supports.dialogClosedBy && !t;
		r ? e.setAttribute("closedby", n) : e.removeAttribute("closedby"), this.overlayEntry.closeOnEscape = n !== "none", this.overlayEntry.closeOnOutsideClick = !r && n === "any", this.overlayEntry.modal = !t, u.transitions.reveal(e), e.open || (t ? e.show() : e.showModal(), u.focus.enter(e)), u.overlays.open(this.overlayEntry);
	}
	hide() {
		let e = this.dialog;
		e?.open && e.close(), u.overlays.close(this.overlayEntry);
	}
	async transitionsEnd() {
		let e = ++this.generation, t = this.dialog?.getAnimations() ?? [];
		return await Promise.allSettled(t.map((e) => e.finished)), e === this.generation;
	}
	fire(e, t) {
		return this.send(e, t);
	}
	onCommand(e) {
		let t = ie.action(e, this.isVisible);
		t === "show" ? this.requestOpen(e) : t === "close" && this.requestClose("close", e);
	}
	get closedBy() {
		return this.domElement.hasAttribute("closedby") ? this.closedby ?? "any" : this.domElement.hasAttribute(ge) && !this.closable ? "none" : "any";
	}
	get closeText() {
		return this.translationForKey(_);
	}
	get ariaLabel() {
		return this.attributes["aria-label"] ?? void 0;
	}
	onSlotChange() {
		this.slottedHeading = this.findHeading();
	}
	findHeading() {
		for (let e of this.domElement.children) if (d.registry.definitions.get(e.localName)?.vocabulary.noun === "header") return e;
	}
	onNameChanged(e, t, n, r) {
		let i = this.dialog;
		if (!i) return;
		let a = !!n, o = i;
		t ? i.setAttribute("aria-label", t) : i.removeAttribute("aria-label"), o.ariaLabelledByElements = !t && !a && r ? [r] : null, !t && a && i.setAttribute("aria-labelledby", this.headerId);
	}
	serverLabelledBy() {
		if (this.ariaLabel) return;
		if (this.heading) return this.headerId;
		let e = this.slottedHeading;
		return e ? u.ids.ensure(e, `ui-${this.elementDefinition.vocabulary.noun}-heading`) : void 0;
	}
	render() {
		this.headerId = u.ids.next(`ui-${this.elementDefinition.vocabulary.noun}`);
		let e = this;
		var t = he(), n = t.firstChild, i = n.nextSibling, a = i.nextSibling;
		return y(t, "click", e.onDialogClick, !0), y(t, "pointerdown", e.onPointerDown, !0), y(t, "close", e.onClose), y(t, "cancel", e.onCancel), me(() => (t) => e.dialog = t, t), C(t, x(ue, {
			get when() {
				return e.heading;
			},
			get children() {
				var t = D();
				return C(t, () => e.heading), S(() => ({
					e: e.headerId,
					t: w(r),
					a: e.dialogPart(r)
				}), ({ e, t: n, a: r }, i) => {
					e !== i?.e && T(t, "id", e), b(t, n, i?.t), r !== i?.a && T(t, "part", r);
				}), t;
			}
		}), n), C(t, x(ue, {
			get when() {
				return e.content;
			},
			get children() {
				var t = D();
				return C(t, () => e.content), S(() => ({
					e: w(p),
					t: e.dialogPart(p)
				}), ({ e, t: n }, r) => {
					b(t, e, r?.e), n !== r?.t && T(t, "part", n);
				}), t;
			}
		}), i), i._$owner = fe(), C(t, () => e.closeButton.draw(), a), S(() => ({
			e: w(e.rootClass),
			t: e.dialogPart(e.rootPart),
			a: pe ? e.serverLabelledBy() : void 0
		}), ({ e, t: n, a: r }, i) => {
			b(t, e, i?.e), n !== i?.t && T(t, "part", n), r !== i?.a && T(t, "aria-labelledby", r);
		}), t;
	}
	dialogPart(e) {
		return this.partForName(e);
	}
	static actionFor(t, n) {
		for (let r of e.lightPath(t, n)) {
			let t = e.of(r);
			if (t) return [t, r];
		}
	}
};
R = c(L), z = /* @__PURE__ */ new WeakMap(), o(R, 1, "requestClose", F, B), o(R, 1, "watchPlacement", P, B), o(R, 1, "onCommand", N, B), o(R, 2, "closedBy", M, B), o(R, 4, "slottedHeading", A, B, z), o(R, 1, "onSlotChange", k, B), o(R, 1, "onNameChanged", O, B), o(R, 13, "elementSetup", I, B), o(R, 5, "onClose", j, B), s(R, B), l(B, "DialogComponent"), t(B, "elementSetup", f(R, 12, B, { visible: "hidden" })), f(R, 15, B);
var V = B, ge = "closable";
de(["pointerdown", "click"]);
//#endregion
//#region src/components/ui-modal/UIModal.en.ts
var H = {
	tag: "ui-modal",
	topics: [
		"dialogs",
		"overlays",
		"popups",
		"modules"
	],
	aka: [
		"dialog",
		"popup window",
		"lightbox",
		"confirm",
		"alert dialog"
	],
	noun: "modal",
	description: "A modal displays content that temporarily blocks interactions with the main view of a site.",
	attributes: [
		{
			name: "size",
			group: "appearance",
			kind: "size",
			description: "Width, `mini` ... `massive` (Fomantic's ratios of the default width);  `medium` is the default."
		},
		{
			name: "appearance",
			group: "appearance",
			kind: "multiple",
			values: ["basic"],
			classes: {},
			replaces: [{
				from: "basic",
				value: "basic"
			}],
			description: "The look:  `basic`, no box:  light text straight on the dimmer.  Old name:  `basic`."
		},
		{
			name: "inverted",
			group: "appearance",
			kind: "keyOnly",
			description: "The dark scheme."
		},
		{
			name: "fullscreen",
			group: "appearance",
			kind: "keyOnly",
			description: "Nearly the whole viewport wide."
		},
		{
			name: "overlay",
			group: "appearance",
			kind: "keyOnly",
			description: "With `fullscreen`:  covers the whole viewport, edge to edge (`overlay fullscreen`)."
		},
		{
			name: "scrolling",
			group: "layout",
			kind: "keyOnly",
			description: "Scrolls inside itself when taller than the viewport."
		},
		{
			name: "vertical-align",
			group: "layout",
			kind: "verticalAlign",
			values: ["top", "bottom"],
			description: "Pinned near the `top` or `bottom` of the viewport instead of centred (`top aligned`)."
		},
		{
			name: "closable",
			group: "behaviour",
			kind: "boolean",
			description: "Shows a close icon (Fomantic's `closeIcon` setting).  `closable=\"false\"` is also Fomantic's `closable: false` setting:  no icon AND `closedby=\"none\"` (Escape and the dimmer do nothing), unless `closedby` is set, which wins for dismissal.  Absent:  no icon, dismissed by `closedby` (default `any`)."
		},
		{
			name: "closedby",
			group: "behaviour",
			kind: "enum",
			values: [
				"any",
				"closerequest",
				"none"
			],
			default: "any",
			property: "closedBy",
			description: "What dismisses it, as `<dialog closedby>` (Fomantic's `closable` setting, in three steps):  `any` -- Escape or a click on the dimmer (default);  `closerequest` -- Escape only;  `none` -- only its own buttons.  Read when it opens;  when set, it wins over `closable=\"false\"`."
		},
		{
			name: "heading",
			replaces: ["header"],
			group: "name",
			kind: "string",
			description: "Shorthand for a header;  a slotted `<ui-header>` is the rich version (and names the dialog).  Its old name was `header`."
		},
		{
			name: "content",
			group: "content",
			kind: "string",
			description: "Shorthand for a content block of text;  a slotted `<ui-content>` is the rich version."
		}
	],
	events: [
		{
			name: "ui-opening",
			detail: "{ visible: true, originalEvent?: Event }",
			cancelable: !0,
			description: "About to show (a person's action, not a `visible` write);  `preventDefault()` keeps it hidden."
		},
		{
			name: "ui-opened",
			detail: "{ visible: true }",
			description: "Shown, its entry transition finished (Fomantic's `onVisible`)."
		},
		{
			name: "ui-closing",
			detail: "{ visible: false, reason: ModalCloseReason, originalEvent?: Event }",
			cancelable: !0,
			description: "About to hide:  Escape, the dimmer, the close icon, approve or deny.  `preventDefault()` keeps it shown."
		},
		{
			name: "ui-closed",
			detail: "{ visible: false }",
			description: "Hidden, its exit transition finished (Fomantic's `onHidden`)."
		},
		{
			name: "ui-approving",
			detail: "{ action: Element, originalEvent?: Event }",
			cancelable: !0,
			description: "An approve button (`.approve` / `.ok` / `.positive`, `<ui-button color=\"positive\">`) was activated;  `preventDefault()` keeps the modal shown (Fomantic's `onApprove` returning `false`)."
		},
		{
			name: "ui-denying",
			detail: "{ action: Element, originalEvent?: Event }",
			cancelable: !0,
			description: "A deny button (`.deny` / `.cancel` / `.negative`, `<ui-button color=\"negative\">`) was activated;  `preventDefault()` keeps the modal shown."
		}
	],
	slots: [{
		name: "",
		description: "Content parts:  `<ui-header>`, `<ui-content>` (`image`, `scrolling`), `<ui-actions>` with buttons."
	}],
	parts: [
		{
			name: "modal",
			description: "The `<dialog>` box;  its `::backdrop` is the dimmer."
		},
		{
			name: "header",
			description: "The `header` shorthand."
		},
		{
			name: "content",
			description: "The `content` shorthand."
		},
		{
			name: "close",
			description: "The close icon of a `closable` modal."
		}
	],
	states: [],
	texts: [
		{
			key: "close",
			text: "Close",
			description: "Accessible name of the close icon."
		},
		{
			key: "ok",
			text: "OK",
			description: "Approve button of `UI.modals.confirm()` / `alert()` / `prompt()`."
		},
		{
			key: "cancel",
			text: "Cancel",
			description: "Deny button of `UI.modals.confirm()` / `prompt()`."
		}
	],
	ownsParts: [
		"header",
		"content",
		"description",
		"actions"
	]
}, _e = "@layer ui.components.modal.types{:host{display:contents}.ui.modal{--_ui-modal-background:var(--ui-modal-background,var(--ui-surface));--_ui-modal-color:var(--ui-modal-color,var(--ui-text-color));--_ui-modal-radius:var(--ui-modal-radius,var(--ui-radius));--_ui-modal-shadow:var(--ui-modal-shadow,1px 3px 3px 0 oklch(0% 0 0/.2), 1px 3px 15px 2px oklch(0% 0 0/.2));--_ui-modal-dimmer-background:var(--ui-modal-dimmer-background,var(--ui-dimmer-background,oklch(0% 0 0/.85)));--_ui-modal-duration:var(--ui-modal-duration,var(--ui-duration-slow));--_ui-modal-close-size:var(--ui-modal-close-size,1.25em);--_ui-modal-close-hitbox:var(--ui-modal-close-hitbox,2.25em);--_ui-modal-close-opacity:var(--ui-modal-close-opacity,.8);--_ui-modal-inner-close-top:var(--ui-modal-inner-close-top,1.0625em);--_ui-modal-inner-close-right:var(--ui-modal-inner-close-right,1em);--_ui-modal-width:var(--ui-modal-width,var(--_modal-width));--_ui-modal-aligned-margin:var(--ui-modal-aligned-margin,var(--_modal-aligned-margin));--_modal-ratio:1;--_modal-width:95%;--_modal-aligned-margin:5vh;--_ui-modal-basic:0;--_ui-modal-header-size:var(--ui-modal-header-size,1.42857em);--_ui-modal-header-color:var(--ui-modal-header-color,var(--ui-text-dark));--_ui-modal-header-background:var(--ui-modal-header-background,var(--ui-surface));--_ui-modal-content-background:var(--ui-modal-content-background,var(--ui-surface));--_ui-modal-actions-background:var(--ui-modal-actions-background,var(--ui-surface-muted));--ui-inverted:0;z-index:var(--ui-z-modal);box-sizing:border-box;width:var(--_ui-modal-width);border-radius:var(--_ui-modal-radius);background:var(--_ui-modal-background);max-width:100%;box-shadow:var(--_ui-modal-shadow);color:var(--_ui-modal-color);font-family:var(--ui-font-family);font-size:var(--ui-font-size);line-height:var(--ui-line-height);text-align:start;transform-origin:50% 25%;-webkit-user-select:text;user-select:text;border:none;outline:none;flex:none;margin:0;padding:0;display:none;position:absolute}dialog.ui.modal{overscroll-behavior:contain;opacity:1;max-height:calc(100dvh - 2em);transition:opacity var(--_ui-modal-duration) var(--ui-ease), transform var(--_ui-modal-duration) var(--ui-ease), display var(--_ui-modal-duration) allow-discrete, overlay var(--_ui-modal-duration) allow-discrete;margin:auto;position:fixed;inset:0;overflow:auto;transform:none}dialog.ui.modal[open]{display:block}dialog.ui.modal:not([open]){opacity:0;transform:scale(.8)}@starting-style{dialog.ui.modal[open]{opacity:0;transform:scale(.8)}}dialog.ui.modal::backdrop{background:var(--_ui-modal-dimmer-background);backdrop-filter:var(--ui-modal-dimmer-filter,none);opacity:1;transition:opacity var(--_ui-modal-duration) var(--ui-ease), display var(--_ui-modal-duration) allow-discrete, overlay var(--_ui-modal-duration) allow-discrete}dialog.ui.modal:not([open])::backdrop{opacity:0}@starting-style{dialog.ui.modal[open]::backdrop{opacity:0}}@media (prefers-reduced-motion:reduce){dialog.ui.modal::backdrop{transition-duration:.01ms}}.ui.modal slot{--ui-color:initial;--ui-color-text:initial;--ui-color-header:initial;--ui-color-border:initial;--ui-color-background:initial;--ui-color-inverted:initial;--ui-color-on:initial;--ui-color-inverted-on:initial;--ui-scale:initial}.ui.modal>:first-child:not(.close),.ui.modal>.close:first-child+*{border-start-start-radius:var(--_ui-modal-radius);border-start-end-radius:var(--_ui-modal-radius)}.ui.modal>:last-child{border-end-end-radius:var(--_ui-modal-radius);border-end-start-radius:var(--_ui-modal-radius)}}@layer ui.components.modal.content{.ui.modal>.close{top:calc(-.25em - var(--_ui-modal-close-hitbox));right:calc(-.25em - var(--_ui-modal-close-hitbox));z-index:1;box-sizing:border-box;width:var(--_ui-modal-close-hitbox);height:var(--_ui-modal-close-hitbox);border-radius:var(--ui-radius);color:var(--ui-text-inverted-color);font-size:var(--_ui-modal-close-size);opacity:var(--_ui-modal-close-opacity);cursor:pointer;background:0 0;border:none;justify-content:center;align-items:center;margin:0;padding:0;display:inline-flex;position:absolute}.ui.modal>.close>svg{width:1em;height:1em}.ui.modal>.close:is(:hover,:focus-visible){opacity:1}.ui.modal>.close:focus-visible{outline:var(--ui-focus-width) solid var(--ui-focus-color);outline-offset:calc(var(--ui-focus-width) * -1)}dialog.ui.modal>.close,.ui.modal>.close.inside,.ui.fullscreen.modal>.close{top:var(--_ui-modal-inner-close-top);right:var(--_ui-modal-inner-close-right);color:var(--_ui-modal-color);font-size:1em}@media (width<768px),(768px<=width<992px){.ui.modal>.close{top:var(--_ui-modal-inner-close-top);right:var(--_ui-modal-inner-close-right);color:var(--_ui-modal-color);font-size:1em}}.ui.modal:has(>.close)>.header{padding-inline-end:calc(var(--_ui-modal-close-hitbox) * 1.2)}.ui.modal>.header{border-bottom:var(--ui-border-width) solid var(--ui-border-color);background:var(--_ui-modal-header-background);box-shadow:none;color:var(--_ui-modal-header-color);font-family:var(--ui-font-family-heading);margin:0;padding:.875em 1.05em;display:block}.ui.modal>.header:not(.ui){font-size:var(--_ui-modal-header-size);font-weight:var(--ui-font-weight-bold);line-height:var(--ui-line-height-heading)}.ui.modal>.content{box-sizing:border-box;width:100%;padding:var(--ui-modal-content-padding,1.5em);background:var(--_ui-modal-content-background);font-size:1em;line-height:1.4;display:block}.ui.modal>.image.content{flex-direction:row;display:flex}.ui.modal>.content>.image{flex:0 auto;align-self:start;max-width:100%;display:block}.ui.modal>.content>.description{flex:1 0 auto;align-self:start;min-width:0;display:block}.ui.modal>.content>:is(.icon,.image)+.description{width:auto;min-width:auto;flex:auto;padding-inline-start:var(--ui-modal-description-distance,2em)}.ui.modal>.scrolling.content{max-height:var(--ui-modal-scrolling-height,calc(80dvh - 10em));overscroll-behavior:none;overflow:auto}.ui.modal>.actions{padding:var(--ui-modal-actions-padding,1em);border-top:var(--ui-border-width) solid var(--ui-border-color);background:var(--_ui-modal-actions-background);text-align:right}.ui.modal .actions>.button:not(.fluid){margin-inline-start:var(--ui-modal-button-distance,.75em)}.ui.modal>.left.actions{text-align:left}.ui.modal>.left.actions>.button:not(.fluid){margin-inline:.5em}.ui.modal>:is(.centered,[class*=center\\ aligned]){text-align:center}.ui.modal>:is(.centered,[class*=center\\ aligned]).actions>.button:not(.fluid){margin-inline:.5em}@media (width<768px){.ui.modal>.header{padding:.525em .7em}.ui.modal>.content{padding:1em;display:block}.ui.modal .image.content{flex-direction:column}.ui.modal>.content>.image{text-align:center;max-width:100%;margin:0 auto;padding:0 0 1em;display:block}.ui.modal>.content>.description,.ui.modal>.content>:is(.icon,.image)+.description{width:100%;margin:0;padding:1em 0;display:block}.ui.modal>.actions{padding:1em 1em 0}.ui.modal .actions>:is(.buttons,.button){margin-bottom:1em}}}@layer ui.components.modal.variations{.ui.mini.modal{--_modal-ratio:.4;--_ui-modal-header-size:1.3em}.ui.tiny.modal{--_modal-ratio:.6;--_ui-modal-header-size:1.3em}.ui.small.modal{--_modal-ratio:.8;--_ui-modal-header-size:1.3em}.ui.large.modal{--_modal-ratio:1.2;--_ui-modal-header-size:1.6em}.ui.big.modal{--_modal-ratio:1.4;--_ui-modal-header-size:1.6em}.ui.huge.modal{--_modal-ratio:1.6;--_ui-modal-header-size:1.6em}.ui.massive.modal{--_modal-ratio:1.8;--_ui-modal-header-size:1.8em}@media (768px<=width<992px){.ui.modal{--_modal-width:calc(88% * min(var(--_modal-ratio), 1))}}@media (width>=992px){.ui.modal{--_modal-width:calc(850px * var(--_modal-ratio))}}@media (width>=1200px){.ui.modal{--_modal-width:calc(900px * var(--_modal-ratio))}}@media (width>=1920px){.ui.modal{--_modal-width:calc(950px * var(--_modal-ratio))}}.ui.fullscreen.modal{--_ui-modal-width:95%}dialog.ui.fullscreen.modal{margin-block:1em}.ui.overlay.fullscreen.modal{--_ui-modal-width:100%;border-radius:0}dialog.ui.overlay.fullscreen.modal{height:100dvh;max-height:100dvh;margin:0}dialog.ui[class*=top\\ aligned].modal{margin-block:var(--_ui-modal-aligned-margin) auto}dialog.ui[class*=bottom\\ aligned].modal{margin-block:auto var(--_ui-modal-aligned-margin)}@media (width<768px){.ui.modal{--_modal-aligned-margin:1em}}dialog.ui.scrolling.modal{max-height:calc(100dvh - 4em)}.ui.basic.modal{--_ui-modal-basic:1;--_ui-modal-background:transparent;--_ui-modal-color:var(--ui-text-inverted-color);--_ui-modal-header-color:var(--ui-text-inverted-color);--_ui-modal-header-background:transparent;--_ui-modal-content-background:transparent;--_ui-modal-actions-background:transparent;box-shadow:none;border-radius:0}.ui.basic.modal>.header{border-bottom:none}.ui.basic.modal>.actions{border-top:none}.ui.basic.modal>.close{color:var(--ui-text-inverted-color);top:1em;right:1.5em}.ui.inverted.modal{--ui-inverted:1;--ui-scheme:dark;color-scheme:dark}}@layer ui.components.modal.states{.ui.active.modal{display:block}}", U, W, G, K, q, J, Y, X = class _UIModal extends (J = V, q = [h], K = [g], G = [h], W = [h], U = [h], J) {};
Y = c(J), o(Y, 13, "vocabulary", q, X), o(Y, 13, "elementSetup", K, X), o(Y, 13, "rootPart", G, X), o(Y, 13, "overlayKind", W, X), o(Y, 13, "shownClass", U, X), s(Y, X), l(X, "UIModal"), t(X, "vocabulary", f(Y, 8, X, H)), f(Y, 11, X), t(X, "elementSetup", f(Y, 12, X, {
	styleSheets: { modal: _e },
	animation: "scale"
})), f(Y, 15, X), t(X, "rootPart", f(Y, 16, X, "modal")), f(Y, 19, X), t(X, "overlayKind", f(Y, 20, X, "modal")), f(Y, 23, X), t(X, "shownClass", f(Y, 24, X, "active")), f(Y, 27, X);
var Z = X, Q = class ModalDialogs {
	document;
	constructor({ document: e = globalThis.document } = {}) {
		this.document = e;
	}
	confirm(e) {
		return this.run(e, { canDeny: !0 }, (e) => e);
	}
	alert(e) {
		return this.run(e, { canDeny: !1 }, () => void 0);
	}
	prompt(e) {
		return this.run(e, {
			canDeny: !0,
			input: e.value ?? ""
		}, (e, t) => e ? t : void 0);
	}
	run(e, { canDeny: t, input: n }, r) {
		let i = this.document.createElement(H.tag);
		i.setAttribute(be, xe), i.setAttribute("closedby", "closerequest"), e.title ? i.setAttribute(ee, e.title) : i.setAttribute("aria-label", e.message);
		let o = this.document.createElement(ModalDialogs.tagFor(p)), s = n === void 0 ? void 0 : this.input(n);
		o.append(s ? this.label(e.message, s) : this.paragraph(e.message));
		let c = this.document.createElement(ModalDialogs.tagFor(Se));
		t && c.append(this.button(e.cancelText ?? u.i18n.t($), $));
		let l = this.button(e.okText ?? u.i18n.t(Ee), Te);
		return l.setAttribute(we, Ce), c.append(l), i.append(o, c), s?.addEventListener("keydown", (e) => {
			e.key === a.enter && l.click();
		}), this.document.body.append(i), i.visible = !0, new Promise((e) => {
			let t = !1;
			i.addEventListener(ve, () => t = !0), i.addEventListener(ye, () => {
				i.remove(), e(r(t, s?.value ?? ""));
			}, { once: !0 });
		});
	}
	paragraph(e) {
		let t = this.document.createElement("p");
		return t.textContent = e, t;
	}
	input(e) {
		let t = this.document.createElement("input");
		return t.type = "text", t.value = e, t.autofocus = !0, t;
	}
	label(e, t) {
		let n = this.document.createElement("label");
		return n.className = De, n.style.cssText = Oe, n.append(e, t), n;
	}
	button(e, t) {
		let n = this.document.createElement(ModalDialogs.tagFor(ne));
		return n.className = t, n.textContent = e, n;
	}
	static tagFor(e) {
		for (let t of u.vocabulary.vocabularies.values()) if (t.noun === e) return t.tag;
		throw Error(`UI.modals:  no component with the class noun "${e}" is registered;  import its family (\`spell/ui/components/ui-parts\`, \`ui-button\`) before opening a dialog`);
	}
}, ve = "ui-approving", ye = "ui-closed", be = "size", xe = "tiny", Se = "actions", Ce = "primary", we = "color", Te = "approve", $ = "cancel", Ee = "ok", De = "ui-native", Oe = "display: grid; gap: 0.5em";
Z.define(), re() && u.load().then(() => u.modals.register(new Q()));
//#endregion
export { V as DialogComponent, Q as ModalDialogs, Z as UIModal };

//# sourceMappingURL=ui-modal.js.map