import "./rolldown-runtime-CYGlBXrH.js";
//#region src/styles/styles.en.ts
var e = {
	red: {
		onLight: [
			.57,
			.21,
			27
		],
		onDark: [
			.7,
			.19,
			25
		]
	},
	orange: {
		onLight: [
			.7,
			.18,
			48
		],
		onDark: [
			.77,
			.16,
			52
		]
	},
	yellow: {
		onLight: [
			.84,
			.17,
			86
		],
		onDark: [
			.88,
			.16,
			92
		]
	},
	olive: {
		onLight: [
			.79,
			.18,
			122
		],
		onDark: [
			.86,
			.16,
			118
		]
	},
	green: {
		onLight: [
			.53,
			.17,
			148
		],
		onDark: [
			.75,
			.18,
			148
		]
	},
	teal: {
		onLight: [
			.68,
			.12,
			188
		],
		onDark: [
			.8,
			.12,
			190
		]
	},
	blue: {
		onLight: [
			.55,
			.16,
			250
		],
		onDark: [
			.72,
			.14,
			240
		]
	},
	violet: {
		onLight: [
			.52,
			.22,
			290
		],
		onDark: [
			.7,
			.16,
			290
		]
	},
	purple: {
		onLight: [
			.56,
			.23,
			316
		],
		onDark: [
			.72,
			.19,
			316
		]
	},
	pink: {
		onLight: [
			.58,
			.22,
			355
		],
		onDark: [
			.76,
			.16,
			350
		]
	},
	brown: {
		onLight: [
			.56,
			.1,
			55
		],
		onDark: [
			.7,
			.12,
			60
		]
	},
	grey: {
		onLight: [
			.55,
			.01,
			260
		],
		onDark: [
			.72,
			.01,
			260
		]
	},
	black: {
		onLight: [
			.24,
			.01,
			260
		],
		onDark: [
			.42,
			.01,
			260
		],
		inverted: [
			.87,
			.005,
			260
		],
		states: {
			hover: {
				lightness: .05,
				chroma: 1
			},
			focus: {
				lightness: .08,
				chroma: 1
			},
			down: {
				lightness: .1,
				chroma: 1
			},
			active: {
				lightness: -.05,
				chroma: 1
			}
		}
	}
}, t = {
	primary: "blue",
	secondary: "black"
}, n = {
	hover: {
		lightness: -.05,
		chroma: 1.1
	},
	focus: {
		lightness: -.08,
		chroma: 1.2
	},
	down: {
		lightness: -.1,
		chroma: 1
	},
	active: {
		lightness: -.05,
		chroma: 1.15
	}
}, r = {
	text: {
		light: {
			lightness: .5,
			mode: "atMost",
			chroma: 1
		},
		dark: {
			lightness: .78,
			mode: "atLeast",
			chroma: 1
		}
	},
	header: {
		light: {
			lightness: .45,
			mode: "atMost",
			chroma: 1
		},
		dark: {
			lightness: .85,
			mode: "atLeast",
			chroma: 1
		}
	},
	border: {
		light: {
			lightness: .6,
			mode: "atMost",
			chroma: 1
		},
		dark: {
			lightness: .7,
			mode: "atLeast",
			chroma: 1
		}
	},
	background: {
		light: {
			lightness: .96,
			mode: "exact",
			chroma: .25
		},
		dark: {
			lightness: .28,
			mode: "exact",
			chroma: .35
		}
	}
}, i = {
	positive: { hue: "green" },
	negative: { hue: "red" },
	info: {
		onLight: [
			.74,
			.13,
			218
		],
		onDark: [
			.8,
			.12,
			215
		]
	},
	warning: {
		onLight: [
			.8,
			.16,
			80
		],
		onDark: [
			.86,
			.15,
			85
		]
	}
}, a = {
	success: "positive",
	error: "negative"
}, o = {
	text: {
		light: {
			lightness: .46,
			mode: "exact",
			chroma: .6
		},
		dark: {
			lightness: .85,
			mode: "exact",
			chroma: .6
		}
	},
	header: {
		light: {
			lightness: .4,
			mode: "exact",
			chroma: .6
		},
		dark: {
			lightness: .9,
			mode: "exact",
			chroma: .5
		}
	},
	border: {
		light: {
			lightness: .8,
			mode: "exact",
			chroma: .3
		},
		dark: {
			lightness: .45,
			mode: "exact",
			chroma: .4
		}
	},
	background: {
		light: {
			lightness: .985,
			mode: "exact",
			chroma: .08
		},
		dark: {
			lightness: .25,
			mode: "exact",
			chroma: .25
		}
	}
}, s = {
	ink: {
		onLight: [
			.15,
			.01,
			260
		],
		onDark: [
			.99,
			.005,
			260
		]
	},
	background: {
		onLight: [
			1,
			0,
			0
		],
		onDark: [
			.19,
			.006,
			260
		]
	},
	surface: {
		onLight: [
			1,
			0,
			0
		],
		onDark: [
			.23,
			.006,
			260
		]
	},
	"surface-muted": {
		onLight: [
			.985,
			.002,
			248
		],
		onDark: [
			.26,
			.006,
			260
		]
	},
	"surface-strong": {
		onLight: [
			.967,
			.002,
			248
		],
		onDark: [
			.3,
			.006,
			260
		]
	},
	highlight: {
		onLight: [
			.906,
			.046,
			255
		],
		onDark: [
			.42,
			.09,
			255
		]
	}
}, c = {
	light: {
		color: [
			1,
			0,
			0
		],
		css: "oklch(1 0 0)"
	},
	dark: {
		color: s.ink.onLight,
		css: "var(--ui-ink-on-light)"
	}
}, l = {
	default: {
		onLight: .87,
		onDark: .9
	},
	dark: {
		onLight: .85,
		onDark: .95
	},
	muted: {
		onLight: .6,
		onDark: .8
	},
	light: {
		onLight: .58,
		onDark: .7
	},
	unselected: {
		onLight: .58,
		onDark: .5
	},
	hovered: {
		onLight: .8,
		onDark: 1
	},
	pressed: {
		onLight: .9,
		onDark: 1
	},
	selected: {
		onLight: .95,
		onDark: 1
	},
	disabled: {
		onLight: .3,
		onDark: .3
	}
}, u = {
	default: {
		onLight: .15,
		onDark: .15
	},
	strong: {
		onLight: .22,
		onDark: .25
	},
	internal: {
		onLight: .1,
		onDark: .1
	},
	selected: {
		onLight: .35,
		onDark: .45
	},
	"selected-strong": {
		onLight: .5,
		onDark: .6
	},
	disabled: {
		onLight: .5,
		onDark: .5
	}
}, d = 16, f = {
	default: [
		"system-ui",
		"-apple-system",
		"Segoe UI",
		"Roboto",
		"Helvetica Neue",
		"Noto Sans",
		"Liberation Sans",
		"Arial",
		"sans-serif",
		"Apple Color Emoji",
		"Segoe UI Emoji",
		"Segoe UI Symbol",
		"Noto Color Emoji"
	],
	heading: [
		"system-ui",
		"-apple-system",
		"Segoe UI",
		"Roboto",
		"Helvetica Neue",
		"Noto Sans",
		"Arial",
		"sans-serif"
	],
	mono: [
		"ui-monospace",
		"SFMono-Regular",
		"Menlo",
		"Monaco",
		"Consolas",
		"Liberation Mono",
		"Courier New",
		"monospace"
	],
	serif: [
		"Palatino",
		"Palatino Linotype",
		"Book Antiqua",
		"P052",
		"URW Palladio L",
		"Georgia",
		"serif"
	],
	sans: [
		"system-ui",
		"-apple-system",
		"Segoe UI",
		"Roboto",
		"Helvetica Neue",
		"Noto Sans",
		"Arial",
		"sans-serif"
	],
	subhead: [
		"system-ui",
		"-apple-system",
		"Segoe UI",
		"Roboto",
		"Helvetica Neue",
		"Noto Sans",
		"Arial",
		"sans-serif"
	],
	typewriter: [
		"American Typewriter",
		"Courier Prime",
		"Courier New",
		"Courier",
		"monospace"
	],
	rounded: [
		"ui-rounded",
		"SF Pro Rounded",
		"Arial Rounded MT",
		"Varela Round",
		"Quicksand",
		"Nunito",
		"system-ui",
		"sans-serif"
	],
	emoji: [
		"Apple Color Emoji",
		"Segoe UI Emoji",
		"Noto Color Emoji",
		"Twemoji Mozilla",
		"Segoe UI Symbol"
	]
}, p = {
	light: 300,
	normal: 400,
	semibold: 600,
	bold: 700
}, m = {
	default: 1.5,
	heading: 1.25,
	tight: 1.2
}, h = 1.5, g = .875, _ = {
	mini: .625,
	tiny: .75,
	small: .875,
	medium: 1,
	large: 1.125,
	big: 1.25,
	huge: 1.5,
	massive: 2
}, v = {
	"3xs": .125,
	"2xs": .25,
	xs: .5,
	s: .75,
	m: 1,
	l: 1.5,
	xl: 2,
	"2xl": 3,
	"3xl": 4
}, y = {
	s: "0.25em",
	m: "0.375em",
	l: "0.75em",
	pill: "9999px",
	circle: "50%",
	square: "0"
}, b = 1, x = {
	width: 2,
	offset: 2
}, S = .45, C = 800, w = {
	mobile: 320,
	tablet: 768,
	computer: 992,
	largeMonitor: 1200,
	widescreen: 1920
}, T = {
	dropdown: 100,
	sticky: 800,
	dimmer: 1e3,
	modal: 1010,
	popup: 1900,
	toast: 2e3
}, E = {
	fast: 100,
	normal: 200,
	slow: 300,
	slower: 500,
	slowest: 750
}, D = {
	default: "ease",
	in: "cubic-bezier(0.4, 0, 1, 1)",
	out: "cubic-bezier(0, 0, 0.2, 1)",
	"in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
	spring: "cubic-bezier(0.34, 1.61, 0.7, 1)",
	decelerate: "cubic-bezier(0.215, 0.61, 0.355, 1)",
	expo: "cubic-bezier(0.19, 1, 0.22, 1)"
}, O = {
	subtle: [[
		0,
		1,
		2,
		0,
		.15
	]],
	bottom: [[
		0,
		2,
		1,
		-1,
		.15
	]],
	raised: [[
		0,
		1,
		2,
		0,
		.08
	], [
		0,
		1,
		3,
		0,
		.1
	]],
	floating: [[
		0,
		2,
		4,
		0,
		.12
	], [
		0,
		2,
		10,
		0,
		.15
	]],
	"floating-hover": [[
		0,
		2,
		4,
		0,
		.15
	], [
		0,
		2,
		10,
		0,
		.25
	]],
	overlay: [[
		0,
		4,
		8,
		-2,
		.12
	], [
		0,
		12,
		28,
		-4,
		.22
	]]
}, k = {
	typography: {
		size: "--ui-font-size",
		family: {
			body: "--ui-font-family",
			heading: "--ui-font-family-heading",
			mono: "--ui-font-family-mono",
			serif: "--ui-font-family-serif",
			sans: "--ui-font-family-sans",
			typewriter: "--ui-font-family-typewriter",
			subhead: "--ui-font-family-subhead",
			rounded: "--ui-font-family-rounded"
		},
		weight: tokensFor(p, "--ui-font-weight-"),
		"line-height": {
			body: "--ui-line-height",
			heading: "--ui-line-height-heading",
			tight: "--ui-line-height-tight"
		},
		ratio: {
			heading: "--ui-heading-ratio",
			caption: "--ui-caption-ratio"
		}
	},
	sizes: tokensFor(_, "--ui-size-"),
	spacing: tokensFor(v, "--ui-space-"),
	radii: {
		default: "--ui-radius",
		...tokensFor(y, "--ui-radius-")
	},
	text: {
		ink: {
			light: "--ui-ink-on-light",
			dark: "--ui-ink-on-dark"
		},
		body: "--ui-text-color",
		strong: "--ui-text-dark",
		muted: "--ui-text-muted",
		light: "--ui-text-light",
		unselected: "--ui-text-unselected",
		hovered: "--ui-text-hovered",
		pressed: "--ui-text-pressed",
		selected: "--ui-text-selected",
		disabled: "--ui-text-disabled"
	},
	surfaces: {
		page: "--ui-background",
		panel: "--ui-surface",
		inset: "--ui-surface-muted",
		strong: "--ui-surface-strong",
		bar: "--ui-bar-background",
		code: "--ui-code-background",
		highlight: "--ui-highlight"
	},
	borders: {
		width: "--ui-border-width",
		color: "--ui-border-color",
		strong: "--ui-border-color-strong",
		internal: "--ui-border-color-internal",
		selected: "--ui-border-color-selected",
		"selected-strong": "--ui-border-color-selected-strong",
		disabled: "--ui-border-color-disabled"
	},
	brand: {
		primary: colorTokensFor("primary"),
		secondary: colorTokensFor("secondary"),
		accent: colorTokensFor("accent"),
		link: {
			color: "--ui-link",
			hover: "--ui-link-hover"
		},
		focus: {
			width: "--ui-focus-width",
			offset: "--ui-focus-offset",
			color: "--ui-focus-color",
			border: "--ui-focus-border"
		}
	},
	semantic: {
		positive: colorTokensFor("positive"),
		negative: colorTokensFor("negative"),
		info: colorTokensFor("info"),
		warning: colorTokensFor("warning"),
		success: colorTokensFor("success"),
		error: colorTokensFor("error")
	},
	hues: {
		red: colorTokensFor("red"),
		orange: colorTokensFor("orange"),
		yellow: colorTokensFor("yellow"),
		olive: colorTokensFor("olive"),
		green: colorTokensFor("green"),
		teal: colorTokensFor("teal"),
		blue: colorTokensFor("blue"),
		violet: colorTokensFor("violet"),
		purple: colorTokensFor("purple"),
		pink: colorTokensFor("pink"),
		brown: colorTokensFor("brown"),
		grey: colorTokensFor("grey"),
		black: colorTokensFor("black")
	},
	shadows: {
		ink: "--ui-shadow-ink",
		...tokensFor(O, "--ui-shadow-")
	},
	motion: {
		duration: tokensFor(E, "--ui-duration-"),
		ease: {
			...tokensFor(D, "--ui-ease-"),
			default: "--ui-ease"
		},
		"hover-delay": "--ui-hover-delay"
	}
};
function tokensFor(e, t) {
	return Object.fromEntries(Object.keys(e).map((e) => [e, `${t}${e}`]));
}
function colorTokensFor(e) {
	let token = (t) => `--ui-${e}${t}`;
	return {
		color: token(""),
		base: {
			light: token("-on-light"),
			dark: token("-on-dark")
		},
		on: token("-on"),
		text: token("-text"),
		header: token("-header"),
		border: token("-border"),
		background: token("-background"),
		inverted: token("-inverted"),
		"inverted-on": token("-inverted-on"),
		hover: token("-hover"),
		focus: token("-focus"),
		down: token("-down"),
		active: token("-active")
	};
}
//#endregion
export { T as A, i as C, v as D, _ as E, l as O, a as S, O as T, e as _, S as a, c as b, x as c, f as d, h as f, n as g, r as h, g as i, k, d as l, t as m, b as n, E as o, C as p, w as r, D as s, u as t, p as u, m as v, o as w, y as x, s as y };

//# sourceMappingURL=styles.en-RLpYiO5_.js.map