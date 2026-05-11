import { forwardRef as e, useEffect as t, useImperativeHandle as n, useRef as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/ColorEditorDialog.tsx
var s = [
	"r",
	"g",
	"b",
	"a"
];
function c({ color: e, hexValue: t, rgba: n, target: r, onChannelChange: i, onHexChange: c, onClose: l }) {
	return /* @__PURE__ */ a("div", {
		className: "redraw__dialog-backdrop",
		role: "presentation",
		onClick: l,
		children: /* @__PURE__ */ o("div", {
			className: "redraw__dialog",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "redraw-color-editor-title",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ o("div", {
					className: "redraw__panel-heading",
					children: [/* @__PURE__ */ o("h2", {
						id: "redraw-color-editor-title",
						className: "redraw__panel-title",
						children: [
							"Custom ",
							r,
							" color"
						]
					}), /* @__PURE__ */ a("button", {
						type: "button",
						className: "redraw__dialog-close",
						onClick: l,
						"aria-label": "Close color editor",
						children: "Close"
					})]
				}),
				/* @__PURE__ */ o("div", {
					className: "redraw__dialog-preview",
					children: [/* @__PURE__ */ a("span", {
						className: "redraw__dialog-preview-chip",
						style: { backgroundColor: e }
					}), /* @__PURE__ */ a("input", {
						"aria-label": "Custom color hex",
						value: t,
						onChange: c
					})]
				}),
				/* @__PURE__ */ a("div", {
					className: "redraw__sliders",
					children: s.map((e) => /* @__PURE__ */ o("label", {
						className: "redraw__slider",
						children: [/* @__PURE__ */ a("span", { children: e.toUpperCase() }), /* @__PURE__ */ a("input", {
							type: "range",
							min: 0,
							max: 255,
							value: n[e],
							onChange: (t) => i(e, Number(t.target.value))
						})]
					}, e))
				})
			]
		})
	});
}
//#endregion
//#region src/components/ColorStatus.tsx
var l = {
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 1.8,
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className: "redraw__action-icon-svg",
	"aria-hidden": !0
};
function u({ strokeColor: e, fillColor: t, activeTarget: n, onTargetChange: r, onSwap: i }) {
	return /* @__PURE__ */ o("section", {
		className: "redraw__panel redraw__color-status",
		"aria-labelledby": "redraw-colors-title",
		children: [/* @__PURE__ */ o("div", {
			className: "redraw__panel-heading",
			children: [/* @__PURE__ */ a("h2", {
				id: "redraw-colors-title",
				className: "redraw__panel-title",
				children: "Colors"
			}), /* @__PURE__ */ a("button", {
				type: "button",
				className: "redraw__swap-button",
				onClick: i,
				"aria-label": "Swap",
				children: /* @__PURE__ */ a("span", {
					className: "redraw__action-icon",
					children: /* @__PURE__ */ o("svg", {
						...l,
						children: [
							/* @__PURE__ */ a("path", { d: "M7 8h10" }),
							/* @__PURE__ */ a("path", { d: "m13 4 4 4-4 4" }),
							/* @__PURE__ */ a("path", { d: "M17 16H7" }),
							/* @__PURE__ */ a("path", { d: "m11 12-4 4 4 4" })
						]
					})
				})
			})]
		}), /* @__PURE__ */ o("div", {
			className: "redraw__color-preview-stack",
			children: [/* @__PURE__ */ o("button", {
				type: "button",
				className: "redraw__current-color",
				"data-active": n === "stroke" ? "true" : "false",
				onClick: () => r("stroke"),
				"aria-pressed": n === "stroke",
				children: [/* @__PURE__ */ a("span", {
					className: "redraw__current-color-chip",
					style: { backgroundColor: e }
				}), /* @__PURE__ */ a("span", {
					className: "redraw__current-color-label",
					children: "Stroke"
				})]
			}), /* @__PURE__ */ o("button", {
				type: "button",
				className: "redraw__current-color",
				"data-active": n === "fill" ? "true" : "false",
				onClick: () => r("fill"),
				"aria-pressed": n === "fill",
				children: [/* @__PURE__ */ a("span", {
					className: "redraw__current-color-chip",
					style: { backgroundColor: t }
				}), /* @__PURE__ */ a("span", {
					className: "redraw__current-color-label",
					children: "Fill"
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/ColorSwatches.tsx
function d({ swatches: e, activeTarget: t, activeColor: n, onSelectColor: r, onCustomizeColor: i }) {
	return /* @__PURE__ */ o("section", {
		className: "redraw__panel redraw__palette",
		"aria-labelledby": "redraw-palette-title",
		children: [/* @__PURE__ */ o("div", {
			className: "redraw__panel-heading",
			children: [/* @__PURE__ */ a("h2", {
				id: "redraw-palette-title",
				className: "redraw__panel-title",
				children: "Palette"
			}), /* @__PURE__ */ o("span", {
				className: "redraw__panel-meta",
				children: ["Editing ", t]
			})]
		}), /* @__PURE__ */ a("div", {
			className: "redraw__swatches",
			role: "grid",
			"aria-label": "Color swatches",
			children: e.map((e, t) => /* @__PURE__ */ a("button", {
				type: "button",
				role: "gridcell",
				"aria-label": `Swatch ${e}`,
				className: "redraw__swatch",
				"data-selected": n === e ? "true" : "false",
				style: { backgroundColor: e },
				onClick: () => r(e),
				onDoubleClick: i
			}, `${e}-${t}`))
		})]
	});
}
//#endregion
//#region src/components/ControlsPanel.tsx
var f = {
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 1.8,
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className: "redraw__action-icon-svg",
	"aria-hidden": !0
};
function p({ strokeWidth: e, canUndo: t, canRedo: n, onStrokeWidthChange: r, onUndo: i, onRedo: s, onClear: c }) {
	return /* @__PURE__ */ o("section", {
		className: "redraw__panel redraw__controls",
		"aria-labelledby": "redraw-controls-title",
		children: [
			/* @__PURE__ */ a("div", {
				className: "redraw__panel-heading",
				children: /* @__PURE__ */ a("h2", {
					id: "redraw-controls-title",
					className: "redraw__panel-title",
					children: "Controls"
				})
			}),
			/* @__PURE__ */ o("label", {
				className: "redraw__field",
				children: [/* @__PURE__ */ a("span", { children: "Stroke width" }), /* @__PURE__ */ a("input", {
					"aria-label": "Stroke width",
					type: "range",
					min: 1,
					max: 48,
					value: e,
					onChange: (e) => r(Number(e.target.value))
				})]
			}),
			/* @__PURE__ */ o("div", {
				className: "redraw__actions",
				children: [
					/* @__PURE__ */ a("button", {
						type: "button",
						onClick: i,
						disabled: !t,
						"aria-label": "Undo",
						children: /* @__PURE__ */ a("span", {
							className: "redraw__action-icon",
							children: /* @__PURE__ */ o("svg", {
								...f,
								children: [/* @__PURE__ */ a("path", { d: "M9 7 5 11l4 4" }), /* @__PURE__ */ a("path", { d: "M5 11h8a5 5 0 1 1 0 10h-1" })]
							})
						})
					}),
					/* @__PURE__ */ a("button", {
						type: "button",
						onClick: s,
						disabled: !n,
						"aria-label": "Redo",
						children: /* @__PURE__ */ a("span", {
							className: "redraw__action-icon",
							children: /* @__PURE__ */ o("svg", {
								...f,
								children: [/* @__PURE__ */ a("path", { d: "m15 7 4 4-4 4" }), /* @__PURE__ */ a("path", { d: "M19 11h-8a5 5 0 1 0 0 10h1" })]
							})
						})
					}),
					/* @__PURE__ */ a("button", {
						type: "button",
						onClick: c,
						"aria-label": "Clear",
						children: /* @__PURE__ */ a("span", {
							className: "redraw__action-icon",
							children: /* @__PURE__ */ o("svg", {
								...f,
								children: [
									/* @__PURE__ */ a("path", { d: "M4 7h16" }),
									/* @__PURE__ */ a("path", { d: "M9 7V5h6v2" }),
									/* @__PURE__ */ a("path", { d: "m7 7 1 12h8l1-12" }),
									/* @__PURE__ */ a("path", { d: "M10 11v5M14 11v5" })
								]
							})
						})
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/ToolPalette.tsx
var m = {
	pen: "Pen",
	spray: "Spray",
	eraser: "Eraser",
	spoid: "Picker",
	fill: "Fill",
	line: "Line",
	rectangle: "Rect",
	circle: "Ellipse"
}, h = {
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 1.8,
	strokeLinecap: "round",
	strokeLinejoin: "round",
	className: "redraw__tool-icon-svg",
	"aria-hidden": !0
}, g = {
	pen: /* @__PURE__ */ o("svg", {
		...h,
		children: [/* @__PURE__ */ a("path", { d: "M5 19l3.5-.8L18 8.7 15.3 6 5.8 15.5 5 19Z" }), /* @__PURE__ */ a("path", { d: "M13.9 7.4 16.6 10.1" })]
	}),
	spray: /* @__PURE__ */ o("svg", {
		...h,
		children: [
			/* @__PURE__ */ a("path", { d: "M4 12a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" }),
			/* @__PURE__ */ a("path", { d: "M6 10V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4" }),
			/* @__PURE__ */ a("path", { d: "M10 7h1" }),
			/* @__PURE__ */ a("path", { d: "M15 7h.01M18 9h.01M18 5h.01M21 3h.01M21 7h.01M21 11h.01" })
		]
	}),
	eraser: /* @__PURE__ */ o("svg", {
		...h,
		children: [/* @__PURE__ */ a("path", { d: "M8.2 7 4.5 10.7a2 2 0 0 0 0 2.8l2 2a2 2 0 0 0 2.8 0L13 11.8a2 2 0 0 0 0-2.8l-2-2a2 2 0 0 0-2.8 0Z" }), /* @__PURE__ */ a("path", { d: "M11 18h8" })]
	}),
	spoid: /* @__PURE__ */ o("svg", {
		...h,
		children: [/* @__PURE__ */ a("path", { d: "M11 7 17 13" }), /* @__PURE__ */ a("path", { d: "M4 16 15.7 4.3a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4L8 20H4v-4" })]
	}),
	fill: /* @__PURE__ */ o("svg", {
		...h,
		children: [
			/* @__PURE__ */ a("path", { d: "M5 16l1.465 1.638a2 2 0 1 1-3.015.099L5 16" }),
			/* @__PURE__ */ a("path", { d: "M13.737 9.737c2.299-2.3 3.23-5.095 2.081-6.245-1.15-1.15-3.945-.217-6.244 2.082-2.3 2.299-3.231 5.095-2.082 6.244 1.15 1.15 3.946.218 6.245-2.081" }),
			/* @__PURE__ */ a("path", { d: "M7.492 11.818c.362.362.768.676 1.208.934l6.895 4.047c1.078.557 2.255-.075 3.692-1.512 1.437-1.437 2.07-2.614 1.512-3.692-.372-.718-1.72-3.017-4.047-6.895a6.015 6.015 0 0 0-.934-1.208" })
		]
	}),
	line: /* @__PURE__ */ o("svg", {
		...h,
		children: [/* @__PURE__ */ a("path", { d: "M5 18 19 6" }), /* @__PURE__ */ a("path", { d: "M5 18h.01M19 6h.01" })]
	}),
	rectangle: /* @__PURE__ */ a("svg", {
		...h,
		children: /* @__PURE__ */ a("rect", {
			x: "5",
			y: "7",
			width: "14",
			height: "10",
			rx: "1"
		})
	}),
	circle: /* @__PURE__ */ a("svg", {
		...h,
		children: /* @__PURE__ */ a("ellipse", {
			cx: "12",
			cy: "12",
			rx: "7",
			ry: "5"
		})
	})
};
function ee({ activeTool: e, onToolChange: t, tools: n }) {
	return /* @__PURE__ */ o("section", {
		className: "redraw__panel redraw__tools",
		"aria-labelledby": "redraw-tools-title",
		children: [/* @__PURE__ */ a("div", {
			className: "redraw__panel-heading",
			children: /* @__PURE__ */ a("h2", {
				id: "redraw-tools-title",
				className: "redraw__panel-title",
				children: "Tools"
			})
		}), /* @__PURE__ */ a("div", {
			className: "redraw__tool-grid",
			role: "radiogroup",
			"aria-label": "Tools",
			children: n.map((n) => /* @__PURE__ */ a("button", {
				type: "button",
				role: "radio",
				"aria-label": m[n],
				"aria-checked": e === n,
				className: "redraw__tool-button",
				"data-active": e === n ? "true" : "false",
				onClick: () => t(n),
				children: /* @__PURE__ */ a("span", {
					className: "redraw__tool-icon",
					children: g[n]
				})
			}, n))
		})]
	});
}
//#endregion
//#region src/utils/color.ts
var _ = /^#([\da-f]{3,8})$/i, v = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/i, y = (e, t, n) => Math.min(n, Math.max(t, e)), te = (e) => {
	let t = e.trim().match(_);
	if (!t) return "#000000";
	let n = t[1];
	return n.length === 3 || n.length === 4 ? `#${n.split("").map((e) => e + e).join("").slice(0, 6)}` : `#${n.slice(0, 6)}`;
}, b = (e) => {
	let t = e.trim(), n = t.match(_);
	if (n) {
		let e = n[1];
		if (e.length === 3 || e.length === 4) {
			let [t, n, r, i = "f"] = e.split("").map((e) => e + e);
			return {
				r: Number.parseInt(t, 16),
				g: Number.parseInt(n, 16),
				b: Number.parseInt(r, 16),
				a: Math.round(Number.parseInt(i, 16) / 255 * 255)
			};
		}
		if (e.length === 6 || e.length === 8) return {
			r: Number.parseInt(e.slice(0, 2), 16),
			g: Number.parseInt(e.slice(2, 4), 16),
			b: Number.parseInt(e.slice(4, 6), 16),
			a: e.length === 8 ? Number.parseInt(e.slice(6, 8), 16) : 255
		};
	}
	let r = t.match(v);
	return r ? {
		r: y(Number.parseInt(r[1], 10), 0, 255),
		g: y(Number.parseInt(r[2], 10), 0, 255),
		b: y(Number.parseInt(r[3], 10), 0, 255),
		a: Math.round(y(r[4] ? Number.parseFloat(r[4]) : 1, 0, 1) * 255)
	} : {
		r: 0,
		g: 0,
		b: 0,
		a: 255
	};
}, x = ({ r: e, g: t, b: n, a: r }) => {
	let i = Math.round(r / 255 * 1e3) / 1e3;
	return `rgba(${y(e, 0, 255)}, ${y(t, 0, 255)}, ${y(n, 0, 255)}, ${i})`;
}, S = ({ r: e, g: t, b: n }) => {
	let r = (e) => y(e, 0, 255).toString(16).padStart(2, "0");
	return `#${r(e)}${r(t)}${r(n)}`;
}, C = (e) => b(e), w = (e, t) => e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3], T = /* @__PURE__ */ "#000000.#7f7f7f.#880015.#ed1c24.#ff7f27.#fff200.#22b14c.#00a2e8.#3f48cc.#a349a4.#ffffff.#c3c3c3.#b97a57.#ffaec9.#ffc90e.#efe4b0.#b5e61d.#99d9ea.#7092be.#c8bfe7.#404040.#bfbfbf.#5c4033.#ff99c8.#ffb347.#fdfd96.#77dd77.#aec6cf.#779ecb.#cdb4db.#1b1b1b.#e8e8e8".split("."), ne = (e, t, n, r) => ({
	imageData: e.getImageData(0, 0, t, n),
	backgroundColor: r
}), re = (e, t, n) => {
	e.putImageData(t.imageData, 0, 0);
	let r = n.getContext("2d");
	r && (r.clearRect(0, 0, n.width, n.height), r.fillStyle = t.backgroundColor, r.fillRect(0, 0, n.width, n.height));
}, E = (e, t, n, r, i, a, o, s = !1) => {
	e.save(), e.globalCompositeOperation = s ? "destination-out" : "source-over", e.strokeStyle = a, e.lineWidth = o, e.lineCap = "round", e.lineJoin = "round", e.beginPath(), e.moveTo(t, n), e.lineTo(r, i), e.stroke(), e.restore();
}, ie = (e, t, n, r, i, a, o, s) => {
	e.save(), e.fillStyle = s, e.strokeStyle = a, e.lineWidth = o, e.beginPath(), e.rect(t, n, r, i), e.fill(), e.stroke(), e.restore();
}, ae = (e, t, n, r, i, a, o, s) => {
	let c = t + r / 2, l = n + i / 2, u = Math.abs(r / 2), d = Math.abs(i / 2);
	e.save(), e.fillStyle = s, e.strokeStyle = a, e.lineWidth = o, e.beginPath(), e.ellipse(c, l, u, d, 0, 0, Math.PI * 2), e.fill(), e.stroke(), e.restore();
}, oe = (e, t, n, r, i) => {
	let a = Math.max(12, Math.round(r * 4));
	e.save(), e.fillStyle = i;
	for (let i = 0; i < a; i += 1) {
		let i = Math.random() * Math.PI * 2, a = Math.random() * r;
		e.fillRect(t + Math.cos(i) * a, n + Math.sin(i) * a, 1.2, 1.2);
	}
	e.restore();
}, se = (e, t, n, r) => {
	let i = e.width, a = e.height, o = e.data, s = Math.floor(t), c = Math.floor(n);
	if (s < 0 || s >= i || c < 0 || c >= a) return !1;
	let l = b(r), u = (c * i + s) * 4, d = o.slice(u, u + 4), f = new Uint8ClampedArray([
		l.r,
		l.g,
		l.b,
		l.a
	]);
	if (w(d, f)) return !1;
	let p = [[s, c]];
	for (; p.length > 0;) {
		let [e, t] = p.pop();
		if (e < 0 || e >= i || t < 0 || t >= a) continue;
		let n = (t * i + e) * 4;
		w(o.slice(n, n + 4), d) && (o[n] = f[0], o[n + 1] = f[1], o[n + 2] = f[2], o[n + 3] = f[3], p.push([e + 1, t]), p.push([e - 1, t]), p.push([e, t + 1]), p.push([e, t - 1]));
	}
	return !0;
}, ce = (e, t, n) => {
	let r = e.getImageData(Math.floor(t), Math.floor(n), 1, 1).data;
	return {
		r: r[0],
		g: r[1],
		b: r[2],
		a: r[3]
	};
}, le = (e, t) => {
	let n = document.createElement("canvas");
	n.width = e.width, n.height = e.height;
	let r = n.getContext("2d");
	return r ? (r.fillStyle = t, r.fillRect(0, 0, n.width, n.height), r.drawImage(e, 0, 0), n.toDataURL("image/png")) : "";
}, ue = class {
	limit;
	snapshots;
	index;
	constructor(e = 40) {
		this.limit = e, this.snapshots = [], this.index = -1;
	}
	push(e) {
		let t = this.snapshots.slice(0, this.index + 1);
		t.push(e), t.length > this.limit && t.shift(), this.snapshots = t, this.index = this.snapshots.length - 1;
	}
	current() {
		return this.snapshots[this.index] ?? null;
	}
	undo() {
		return this.index <= 0 ? null : (--this.index, this.snapshots[this.index]);
	}
	redo() {
		return this.index >= this.snapshots.length - 1 ? null : (this.index += 1, this.snapshots[this.index]);
	}
	canUndo() {
		return this.index > 0;
	}
	canRedo() {
		return this.index >= 0 && this.index < this.snapshots.length - 1;
	}
}, de = 500, fe = 500, pe = "#101418", me = "#ff6b35", he = "#ffffff", ge = [
	"pen",
	"spray",
	"eraser",
	"spoid",
	"fill",
	"line",
	"rectangle",
	"circle"
], D = (e) => {
	let t = e.currentTarget.getBoundingClientRect(), n = e.currentTarget.width / t.width, r = e.currentTarget.height / t.height;
	return {
		x: (e.clientX - t.left) * n,
		y: (e.clientY - t.top) * r
	};
}, O = (e, t) => {
	let n = e?.getContext("2d");
	!e || !n || (n.clearRect(0, 0, e.width, e.height), n.fillStyle = t, n.fillRect(0, 0, e.width, e.height));
}, k = (e) => {
	let t = e?.getContext("2d");
	!e || !t || t.clearRect(0, 0, e.width, e.height);
}, A = e(function({ width: e = de, height: s = fe, tool: l = "pen", strokeColor: f = pe, strokeWidth: m = 2, fillColor: h = me, backgroundColor: g = he, dataUrl: _ = "", onChange: v }, y) {
	let b = r(null), w = r(null), A = r(null), j = r(new ue()), M = r(null), N = r(!1), P = r(_), [F, I] = i(l), [L, R] = i(f), [z, _e] = i(m), [B, V] = i(h), [H, ve] = i(g), [ye, U] = i(() => C(f)), [be, W] = i(() => C(h)), [xe, Se] = i({
		canUndo: !1,
		canRedo: !1
	}), [G, Ce] = i("stroke"), [we, Te] = i(!1), K = (e) => {
		let t = b.current;
		if (!t) return "";
		let n = le(t, e ?? H);
		return P.current = n, v?.(n), n;
	}, Ee = () => {
		Se({
			canUndo: j.current.canUndo(),
			canRedo: j.current.canRedo()
		});
	}, q = (e) => {
		let t = b.current, n = t?.getContext("2d");
		!t || !n || (j.current.push(ne(n, t.width, t.height, e ?? H)), Ee());
	}, J = (e) => {
		let t = e === "undo" ? j.current.undo() : j.current.redo(), n = b.current?.getContext("2d"), r = w.current;
		!t || !n || !r || (re(n, t, r), ve(t.backgroundColor), Ee(), K(t.backgroundColor));
	}, Y = () => {
		let e = A.current, t = e?.getContext("2d");
		!e || !t || t.clearRect(0, 0, e.width, e.height);
	}, X = (e, t, n) => {
		e(n), t(C(n));
	}, Z = (e, t) => {
		if (e === "stroke") {
			X(R, U, t);
			return;
		}
		X(V, W, t);
	}, De = () => {
		let e = B, t = L;
		X(R, U, e), X(V, W, t);
	}, Q = async (e) => {
		let t = b.current, n = t?.getContext("2d");
		if (!(!t || !n)) {
			if (!e) {
				k(t), q(), K();
				return;
			}
			await new Promise((r, i) => {
				let a = new Image();
				a.onload = () => {
					n.clearRect(0, 0, t.width, t.height), n.drawImage(a, 0, 0, t.width, t.height), r();
				}, a.onerror = () => i(/* @__PURE__ */ Error("Unable to load data URL.")), a.src = e;
			}), q(), K();
		}
	};
	t(() => {
		I(l);
	}, [l]), t(() => {
		X(R, U, f);
	}, [f]), t(() => {
		_e(m);
	}, [m]), t(() => {
		X(V, W, h);
	}, [h]), t(() => {
		ve(g), O(w.current, g);
	}, [g]), t(() => {
		O(w.current, H);
	}, [H]), t(() => {
		N.current && _ !== P.current && Q(_);
	}, [_]), t(() => {
		let t = b.current, n = A.current, r = w.current;
		!t || !n || !r || (t.width = e, t.height = s, n.width = e, n.height = s, r.width = e, r.height = s, O(r, H), k(t), Y(), j.current = new ue(), q(), N.current = !0, _ ? Q(_) : K());
	}, [e, s]), n(y, () => ({
		getDataUrl: () => b.current ? le(b.current, H) : "",
		setDataUrl: async (e) => {
			await Q(e);
		},
		undo: () => J("undo"),
		redo: () => J("redo"),
		clear: () => {
			k(b.current), q(), K();
		}
	}), [H]);
	let Oe = (e, t) => {
		let n = A.current, r = n?.getContext("2d");
		if (!n || !r) return;
		Y();
		let i = t.x - e.x, a = t.y - e.y;
		if (F === "line") {
			E(r, e.x, e.y, t.x, t.y, L, z);
			return;
		}
		let o = i < 0 ? t.x : e.x, s = a < 0 ? t.y : e.y, c = Math.abs(i), l = Math.abs(a);
		if (F === "rectangle") {
			ie(r, o, s, c, l, L, z, B);
			return;
		}
		ae(r, o, s, c, l, L, z, B);
	}, ke = (e, t) => {
		let n = b.current, r = n?.getContext("2d");
		if (!n || !r) return;
		let i = t.x - e.x, a = t.y - e.y;
		if (F === "line") E(r, e.x, e.y, t.x, t.y, L, z);
		else {
			let n = i < 0 ? t.x : e.x, o = a < 0 ? t.y : e.y, s = Math.abs(i), c = Math.abs(a);
			F === "rectangle" ? ie(r, n, o, s, c, L, z, B) : ae(r, n, o, s, c, L, z, B);
		}
		Y(), q(), K();
	}, Ae = (e) => {
		let t = b.current, n = t?.getContext("2d");
		if (!t || !n) return;
		let r = ce(n, e.x, e.y);
		Z(G, x(r.a === 0 ? C(H) : r));
	}, je = (e) => {
		let t = b.current, n = t?.getContext("2d");
		if (!t || !n) return;
		let r = n.getImageData(0, 0, t.width, t.height);
		se(r, e.x, e.y, B) && (n.putImageData(r, 0, 0), q(), K());
	}, Me = (e) => {
		let t = D(e), n = b.current, r = n?.getContext("2d");
		if (!(!n || !r)) {
			if (F === "spoid") {
				Ae(t);
				return;
			}
			if (F === "fill") {
				je(t);
				return;
			}
			if (M.current = {
				pointerId: e.pointerId,
				start: t,
				previous: t
			}, e.currentTarget.setPointerCapture(e.pointerId), F === "pen") {
				E(r, t.x, t.y, t.x, t.y, L, z);
				return;
			}
			if (F === "spray") {
				oe(r, t.x, t.y, z * 2, L);
				return;
			}
			F === "eraser" && E(r, t.x, t.y, t.x, t.y, "#000000", z * 2, !0);
		}
	}, Ne = (e) => {
		let t = M.current;
		if (!t || t.pointerId !== e.pointerId) return;
		let n = D(e), r = b.current, i = r?.getContext("2d");
		!r || !i || (F === "pen" ? E(i, t.previous.x, t.previous.y, n.x, n.y, L, z) : F === "spray" ? oe(i, n.x, n.y, z * 2, L) : F === "eraser" ? E(i, t.previous.x, t.previous.y, n.x, n.y, "#000000", z * 2, !0) : Oe(t.start, n), t.previous = n);
	}, Pe = (e) => {
		let t = M.current;
		if (!t || t.pointerId !== e.pointerId) return;
		let n = D(e);
		F === "line" || F === "rectangle" || F === "circle" ? ke(t.start, n) : (q(), K()), M.current = null, e.currentTarget.releasePointerCapture(e.pointerId);
	}, Fe = (e) => {
		Z(G, te(e.target.value));
	}, Ie = (e, t) => {
		Z(G, x({
			...G === "stroke" ? ye : be,
			[e]: t
		}));
	}, Le = G === "stroke" ? L : B, $ = G === "stroke" ? ye : be;
	return /* @__PURE__ */ o("div", {
		className: "redraw",
		children: [/* @__PURE__ */ o("div", {
			className: "redraw__workspace",
			children: [
				/* @__PURE__ */ o("aside", {
					className: "redraw__sidebar",
					children: [/* @__PURE__ */ a(ee, {
						activeTool: F,
						onToolChange: I,
						tools: ge
					}), /* @__PURE__ */ a(p, {
						strokeWidth: z,
						canUndo: xe.canUndo,
						canRedo: xe.canRedo,
						onStrokeWidthChange: _e,
						onUndo: () => J("undo"),
						onRedo: () => J("redo"),
						onClear: () => {
							k(b.current), q(), K();
						}
					})]
				}),
				/* @__PURE__ */ a("section", {
					className: "redraw__main",
					children: /* @__PURE__ */ a("div", {
						className: "redraw__stage-panel",
						children: /* @__PURE__ */ o("div", {
							className: "redraw__stage",
							style: {
								width: e,
								height: s
							},
							children: [
								/* @__PURE__ */ a("canvas", {
									className: "redraw__canvas redraw__canvas--background",
									ref: w
								}),
								/* @__PURE__ */ a("canvas", {
									className: "redraw__canvas redraw__canvas--drawing",
									ref: b,
									onPointerDown: Me,
									onPointerMove: Ne,
									onPointerUp: Pe
								}),
								/* @__PURE__ */ a("canvas", {
									className: "redraw__canvas redraw__canvas--preview",
									ref: A
								})
							]
						})
					})
				}),
				/* @__PURE__ */ o("div", {
					className: "redraw__footer",
					children: [/* @__PURE__ */ a(u, {
						strokeColor: L,
						fillColor: B,
						activeTarget: G,
						onTargetChange: Ce,
						onSwap: De
					}), /* @__PURE__ */ a(d, {
						swatches: T,
						activeTarget: G,
						activeColor: S($),
						onSelectColor: (e) => Z(G, e),
						onCustomizeColor: () => Te(!0)
					})]
				})
			]
		}), we ? /* @__PURE__ */ a(c, {
			color: Le,
			hexValue: S($),
			rgba: $,
			target: G,
			onChannelChange: Ie,
			onHexChange: Fe,
			onClose: () => Te(!1)
		}) : null]
	});
}), j = (e) => new Promise((t, n) => {
	let r = new FileReader();
	r.onload = () => {
		let e = r.result;
		if (typeof e == "string") {
			t(e);
			return;
		}
		n(/* @__PURE__ */ Error("Unable to load image file."));
	}, r.onerror = () => n(r.error ?? /* @__PURE__ */ Error("Unable to load image file.")), r.readAsDataURL(e);
}), M = (e, t = "drawing.png") => {
	let n = document.createElement("a");
	n.href = e, n.download = t, n.click();
};
//#endregion
export { T as DEFAULT_SWATCHES, A as Redraw, j as loadImage, M as saveImage };

//# sourceMappingURL=redraw.js.map