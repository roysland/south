"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a5, b4) => {
    for (var prop in b4 ||= {})
      if (__hasOwnProp.call(b4, prop))
        __defNormalProp(a5, prop, b4[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b4)) {
        if (__propIsEnum.call(b4, prop))
          __defNormalProp(a5, prop, b4[prop]);
      }
    return a5;
  };
  var __spreadProps = (a5, b4) => __defProps(a5, __getOwnPropDescs(b4));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i10 = decorators.length - 1, decorator; i10 >= 0; i10--)
      if (decorator = decorators[i10])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e13) {
          reject(e13);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e13) {
          reject(e13);
        }
      };
      var step = (x4) => x4.done ? resolve(x4.value) : Promise.resolve(x4.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // ../../node_modules/@lit/reactive-element/css-tag.js
  var t = window;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var n = /* @__PURE__ */ new WeakMap();
  var o = class {
    constructor(t7, e13, n11) {
      if (this._$cssResult$ = true, n11 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t7, this.t = e13;
    }
    get styleSheet() {
      let t7 = this.o;
      const s9 = this.t;
      if (e && void 0 === t7) {
        const e13 = void 0 !== s9 && 1 === s9.length;
        e13 && (t7 = n.get(s9)), void 0 === t7 && ((this.o = t7 = new CSSStyleSheet()).replaceSync(this.cssText), e13 && n.set(s9, t7));
      }
      return t7;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t7) => new o("string" == typeof t7 ? t7 : t7 + "", void 0, s);
  var i = (t7, ...e13) => {
    const n11 = 1 === t7.length ? t7[0] : e13.reduce((e14, s9, n12) => e14 + ((t8) => {
      if (true === t8._$cssResult$)
        return t8.cssText;
      if ("number" == typeof t8)
        return t8;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s9) + t7[n12 + 1], t7[0]);
    return new o(n11, t7, s);
  };
  var S = (s9, n11) => {
    e ? s9.adoptedStyleSheets = n11.map((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet) : n11.forEach((e13) => {
      const n12 = document.createElement("style"), o13 = t.litNonce;
      void 0 !== o13 && n12.setAttribute("nonce", o13), n12.textContent = e13.cssText, s9.appendChild(n12);
    });
  };
  var c = e ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
    let e13 = "";
    for (const s9 of t8.cssRules)
      e13 += s9.cssText;
    return r(e13);
  })(t7) : t7;

  // ../../node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window;
  var r2 = e2.trustedTypes;
  var h = r2 ? r2.emptyScript : "";
  var o2 = e2.reactiveElementPolyfillSupport;
  var n2 = { toAttribute(t7, i10) {
    switch (i10) {
      case Boolean:
        t7 = t7 ? h : null;
        break;
      case Object:
      case Array:
        t7 = null == t7 ? t7 : JSON.stringify(t7);
    }
    return t7;
  }, fromAttribute(t7, i10) {
    let s9 = t7;
    switch (i10) {
      case Boolean:
        s9 = null !== t7;
        break;
      case Number:
        s9 = null === t7 ? null : Number(t7);
        break;
      case Object:
      case Array:
        try {
          s9 = JSON.parse(t7);
        } catch (t8) {
          s9 = null;
        }
    }
    return s9;
  } };
  var a = (t7, i10) => i10 !== t7 && (i10 == i10 || t7 == t7);
  var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
  var d = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
    }
    static addInitializer(t7) {
      var i10;
      this.finalize(), (null !== (i10 = this.h) && void 0 !== i10 ? i10 : this.h = []).push(t7);
    }
    static get observedAttributes() {
      this.finalize();
      const t7 = [];
      return this.elementProperties.forEach((i10, s9) => {
        const e13 = this._$Ep(s9, i10);
        void 0 !== e13 && (this._$Ev.set(e13, s9), t7.push(e13));
      }), t7;
    }
    static createProperty(t7, i10 = l) {
      if (i10.state && (i10.attribute = false), this.finalize(), this.elementProperties.set(t7, i10), !i10.noAccessor && !this.prototype.hasOwnProperty(t7)) {
        const s9 = "symbol" == typeof t7 ? Symbol() : "__" + t7, e13 = this.getPropertyDescriptor(t7, s9, i10);
        void 0 !== e13 && Object.defineProperty(this.prototype, t7, e13);
      }
    }
    static getPropertyDescriptor(t7, i10, s9) {
      return { get() {
        return this[i10];
      }, set(e13) {
        const r9 = this[t7];
        this[i10] = e13, this.requestUpdate(t7, r9, s9);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t7) {
      return this.elementProperties.get(t7) || l;
    }
    static finalize() {
      if (this.hasOwnProperty("finalized"))
        return false;
      this.finalized = true;
      const t7 = Object.getPrototypeOf(this);
      if (t7.finalize(), void 0 !== t7.h && (this.h = [...t7.h]), this.elementProperties = new Map(t7.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t8 = this.properties, i10 = [...Object.getOwnPropertyNames(t8), ...Object.getOwnPropertySymbols(t8)];
        for (const s9 of i10)
          this.createProperty(s9, t8[s9]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i10) {
      const s9 = [];
      if (Array.isArray(i10)) {
        const e13 = new Set(i10.flat(1 / 0).reverse());
        for (const i11 of e13)
          s9.unshift(c(i11));
      } else
        void 0 !== i10 && s9.push(c(i10));
      return s9;
    }
    static _$Ep(t7, i10) {
      const s9 = i10.attribute;
      return false === s9 ? void 0 : "string" == typeof s9 ? s9 : "string" == typeof t7 ? t7.toLowerCase() : void 0;
    }
    u() {
      var t7;
      this._$E_ = new Promise((t8) => this.enableUpdating = t8), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t7 = this.constructor.h) || void 0 === t7 || t7.forEach((t8) => t8(this));
    }
    addController(t7) {
      var i10, s9;
      (null !== (i10 = this._$ES) && void 0 !== i10 ? i10 : this._$ES = []).push(t7), void 0 !== this.renderRoot && this.isConnected && (null === (s9 = t7.hostConnected) || void 0 === s9 || s9.call(t7));
    }
    removeController(t7) {
      var i10;
      null === (i10 = this._$ES) || void 0 === i10 || i10.splice(this._$ES.indexOf(t7) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t7, i10) => {
        this.hasOwnProperty(i10) && (this._$Ei.set(i10, this[i10]), delete this[i10]);
      });
    }
    createRenderRoot() {
      var t7;
      const s9 = null !== (t7 = this.shadowRoot) && void 0 !== t7 ? t7 : this.attachShadow(this.constructor.shadowRootOptions);
      return S(s9, this.constructor.elementStyles), s9;
    }
    connectedCallback() {
      var t7;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t7 = this._$ES) || void 0 === t7 || t7.forEach((t8) => {
        var i10;
        return null === (i10 = t8.hostConnected) || void 0 === i10 ? void 0 : i10.call(t8);
      });
    }
    enableUpdating(t7) {
    }
    disconnectedCallback() {
      var t7;
      null === (t7 = this._$ES) || void 0 === t7 || t7.forEach((t8) => {
        var i10;
        return null === (i10 = t8.hostDisconnected) || void 0 === i10 ? void 0 : i10.call(t8);
      });
    }
    attributeChangedCallback(t7, i10, s9) {
      this._$AK(t7, s9);
    }
    _$EO(t7, i10, s9 = l) {
      var e13;
      const r9 = this.constructor._$Ep(t7, s9);
      if (void 0 !== r9 && true === s9.reflect) {
        const h7 = (void 0 !== (null === (e13 = s9.converter) || void 0 === e13 ? void 0 : e13.toAttribute) ? s9.converter : n2).toAttribute(i10, s9.type);
        this._$El = t7, null == h7 ? this.removeAttribute(r9) : this.setAttribute(r9, h7), this._$El = null;
      }
    }
    _$AK(t7, i10) {
      var s9;
      const e13 = this.constructor, r9 = e13._$Ev.get(t7);
      if (void 0 !== r9 && this._$El !== r9) {
        const t8 = e13.getPropertyOptions(r9), h7 = "function" == typeof t8.converter ? { fromAttribute: t8.converter } : void 0 !== (null === (s9 = t8.converter) || void 0 === s9 ? void 0 : s9.fromAttribute) ? t8.converter : n2;
        this._$El = r9, this[r9] = h7.fromAttribute(i10, t8.type), this._$El = null;
      }
    }
    requestUpdate(t7, i10, s9) {
      let e13 = true;
      void 0 !== t7 && (((s9 = s9 || this.constructor.getPropertyOptions(t7)).hasChanged || a)(this[t7], i10) ? (this._$AL.has(t7) || this._$AL.set(t7, i10), true === s9.reflect && this._$El !== t7 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t7, s9))) : e13 = false), !this.isUpdatePending && e13 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t8) {
        Promise.reject(t8);
      }
      const t7 = this.scheduleUpdate();
      return null != t7 && await t7, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t7;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t8, i11) => this[i11] = t8), this._$Ei = void 0);
      let i10 = false;
      const s9 = this._$AL;
      try {
        i10 = this.shouldUpdate(s9), i10 ? (this.willUpdate(s9), null === (t7 = this._$ES) || void 0 === t7 || t7.forEach((t8) => {
          var i11;
          return null === (i11 = t8.hostUpdate) || void 0 === i11 ? void 0 : i11.call(t8);
        }), this.update(s9)) : this._$Ek();
      } catch (t8) {
        throw i10 = false, this._$Ek(), t8;
      }
      i10 && this._$AE(s9);
    }
    willUpdate(t7) {
    }
    _$AE(t7) {
      var i10;
      null === (i10 = this._$ES) || void 0 === i10 || i10.forEach((t8) => {
        var i11;
        return null === (i11 = t8.hostUpdated) || void 0 === i11 ? void 0 : i11.call(t8);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
    }
    _$Ek() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t7) {
      return true;
    }
    update(t7) {
      void 0 !== this._$EC && (this._$EC.forEach((t8, i10) => this._$EO(i10, this[i10], t8)), this._$EC = void 0), this._$Ek();
    }
    updated(t7) {
    }
    firstUpdated(t7) {
    }
  };
  d.finalized = true, d.elementProperties = /* @__PURE__ */ new Map(), d.elementStyles = [], d.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: d }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.5.0");

  // ../../node_modules/lit-html/lit-html.js
  var t2;
  var i2 = window;
  var s3 = i2.trustedTypes;
  var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
  var o3 = `lit$${(Math.random() + "").slice(9)}$`;
  var n3 = "?" + o3;
  var l2 = `<${n3}>`;
  var h2 = document;
  var r3 = (t7 = "") => h2.createComment(t7);
  var d2 = (t7) => null === t7 || "object" != typeof t7 && "function" != typeof t7;
  var u = Array.isArray;
  var c2 = (t7) => u(t7) || "function" == typeof (null == t7 ? void 0 : t7[Symbol.iterator]);
  var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var a2 = /-->/g;
  var f = />/g;
  var _ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var m = /'/g;
  var p = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var g = (t7) => (i10, ...s9) => ({ _$litType$: t7, strings: i10, values: s9 });
  var y = g(1);
  var w = g(2);
  var x = Symbol.for("lit-noChange");
  var b = Symbol.for("lit-nothing");
  var T = /* @__PURE__ */ new WeakMap();
  var A = h2.createTreeWalker(h2, 129, null, false);
  var E = (t7, i10) => {
    const s9 = t7.length - 1, n11 = [];
    let h7, r9 = 2 === i10 ? "<svg>" : "", d5 = v;
    for (let i11 = 0; i11 < s9; i11++) {
      const s10 = t7[i11];
      let e13, u7, c8 = -1, g4 = 0;
      for (; g4 < s10.length && (d5.lastIndex = g4, u7 = d5.exec(s10), null !== u7); )
        g4 = d5.lastIndex, d5 === v ? "!--" === u7[1] ? d5 = a2 : void 0 !== u7[1] ? d5 = f : void 0 !== u7[2] ? ($.test(u7[2]) && (h7 = RegExp("</" + u7[2], "g")), d5 = _) : void 0 !== u7[3] && (d5 = _) : d5 === _ ? ">" === u7[0] ? (d5 = null != h7 ? h7 : v, c8 = -1) : void 0 === u7[1] ? c8 = -2 : (c8 = d5.lastIndex - u7[2].length, e13 = u7[1], d5 = void 0 === u7[3] ? _ : '"' === u7[3] ? p : m) : d5 === p || d5 === m ? d5 = _ : d5 === a2 || d5 === f ? d5 = v : (d5 = _, h7 = void 0);
      const y4 = d5 === _ && t7[i11 + 1].startsWith("/>") ? " " : "";
      r9 += d5 === v ? s10 + l2 : c8 >= 0 ? (n11.push(e13), s10.slice(0, c8) + "$lit$" + s10.slice(c8) + o3 + y4) : s10 + o3 + (-2 === c8 ? (n11.push(void 0), i11) : y4);
    }
    const u6 = r9 + (t7[s9] || "<?>") + (2 === i10 ? "</svg>" : "");
    if (!Array.isArray(t7) || !t7.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [void 0 !== e3 ? e3.createHTML(u6) : u6, n11];
  };
  var C = class {
    constructor({ strings: t7, _$litType$: i10 }, e13) {
      let l10;
      this.parts = [];
      let h7 = 0, d5 = 0;
      const u6 = t7.length - 1, c8 = this.parts, [v4, a5] = E(t7, i10);
      if (this.el = C.createElement(v4, e13), A.currentNode = this.el.content, 2 === i10) {
        const t8 = this.el.content, i11 = t8.firstChild;
        i11.remove(), t8.append(...i11.childNodes);
      }
      for (; null !== (l10 = A.nextNode()) && c8.length < u6; ) {
        if (1 === l10.nodeType) {
          if (l10.hasAttributes()) {
            const t8 = [];
            for (const i11 of l10.getAttributeNames())
              if (i11.endsWith("$lit$") || i11.startsWith(o3)) {
                const s9 = a5[d5++];
                if (t8.push(i11), void 0 !== s9) {
                  const t9 = l10.getAttribute(s9.toLowerCase() + "$lit$").split(o3), i12 = /([.?@])?(.*)/.exec(s9);
                  c8.push({ type: 1, index: h7, name: i12[2], strings: t9, ctor: "." === i12[1] ? M : "?" === i12[1] ? k : "@" === i12[1] ? H : S2 });
                } else
                  c8.push({ type: 6, index: h7 });
              }
            for (const i11 of t8)
              l10.removeAttribute(i11);
          }
          if ($.test(l10.tagName)) {
            const t8 = l10.textContent.split(o3), i11 = t8.length - 1;
            if (i11 > 0) {
              l10.textContent = s3 ? s3.emptyScript : "";
              for (let s9 = 0; s9 < i11; s9++)
                l10.append(t8[s9], r3()), A.nextNode(), c8.push({ type: 2, index: ++h7 });
              l10.append(t8[i11], r3());
            }
          }
        } else if (8 === l10.nodeType)
          if (l10.data === n3)
            c8.push({ type: 2, index: h7 });
          else {
            let t8 = -1;
            for (; -1 !== (t8 = l10.data.indexOf(o3, t8 + 1)); )
              c8.push({ type: 7, index: h7 }), t8 += o3.length - 1;
          }
        h7++;
      }
    }
    static createElement(t7, i10) {
      const s9 = h2.createElement("template");
      return s9.innerHTML = t7, s9;
    }
  };
  function P(t7, i10, s9 = t7, e13) {
    var o13, n11, l10, h7;
    if (i10 === x)
      return i10;
    let r9 = void 0 !== e13 ? null === (o13 = s9._$Co) || void 0 === o13 ? void 0 : o13[e13] : s9._$Cl;
    const u6 = d2(i10) ? void 0 : i10._$litDirective$;
    return (null == r9 ? void 0 : r9.constructor) !== u6 && (null === (n11 = null == r9 ? void 0 : r9._$AO) || void 0 === n11 || n11.call(r9, false), void 0 === u6 ? r9 = void 0 : (r9 = new u6(t7), r9._$AT(t7, s9, e13)), void 0 !== e13 ? (null !== (l10 = (h7 = s9)._$Co) && void 0 !== l10 ? l10 : h7._$Co = [])[e13] = r9 : s9._$Cl = r9), void 0 !== r9 && (i10 = P(t7, r9._$AS(t7, i10.values), r9, e13)), i10;
  }
  var V = class {
    constructor(t7, i10) {
      this.u = [], this._$AN = void 0, this._$AD = t7, this._$AM = i10;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    v(t7) {
      var i10;
      const { el: { content: s9 }, parts: e13 } = this._$AD, o13 = (null !== (i10 = null == t7 ? void 0 : t7.creationScope) && void 0 !== i10 ? i10 : h2).importNode(s9, true);
      A.currentNode = o13;
      let n11 = A.nextNode(), l10 = 0, r9 = 0, d5 = e13[0];
      for (; void 0 !== d5; ) {
        if (l10 === d5.index) {
          let i11;
          2 === d5.type ? i11 = new N(n11, n11.nextSibling, this, t7) : 1 === d5.type ? i11 = new d5.ctor(n11, d5.name, d5.strings, this, t7) : 6 === d5.type && (i11 = new I(n11, this, t7)), this.u.push(i11), d5 = e13[++r9];
        }
        l10 !== (null == d5 ? void 0 : d5.index) && (n11 = A.nextNode(), l10++);
      }
      return o13;
    }
    p(t7) {
      let i10 = 0;
      for (const s9 of this.u)
        void 0 !== s9 && (void 0 !== s9.strings ? (s9._$AI(t7, s9, i10), i10 += s9.strings.length - 2) : s9._$AI(t7[i10])), i10++;
    }
  };
  var N = class {
    constructor(t7, i10, s9, e13) {
      var o13;
      this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t7, this._$AB = i10, this._$AM = s9, this.options = e13, this._$Cm = null === (o13 = null == e13 ? void 0 : e13.isConnected) || void 0 === o13 || o13;
    }
    get _$AU() {
      var t7, i10;
      return null !== (i10 = null === (t7 = this._$AM) || void 0 === t7 ? void 0 : t7._$AU) && void 0 !== i10 ? i10 : this._$Cm;
    }
    get parentNode() {
      let t7 = this._$AA.parentNode;
      const i10 = this._$AM;
      return void 0 !== i10 && 11 === t7.nodeType && (t7 = i10.parentNode), t7;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t7, i10 = this) {
      t7 = P(this, t7, i10), d2(t7) ? t7 === b || null == t7 || "" === t7 ? (this._$AH !== b && this._$AR(), this._$AH = b) : t7 !== this._$AH && t7 !== x && this.g(t7) : void 0 !== t7._$litType$ ? this.$(t7) : void 0 !== t7.nodeType ? this.T(t7) : c2(t7) ? this.k(t7) : this.g(t7);
    }
    O(t7, i10 = this._$AB) {
      return this._$AA.parentNode.insertBefore(t7, i10);
    }
    T(t7) {
      this._$AH !== t7 && (this._$AR(), this._$AH = this.O(t7));
    }
    g(t7) {
      this._$AH !== b && d2(this._$AH) ? this._$AA.nextSibling.data = t7 : this.T(h2.createTextNode(t7)), this._$AH = t7;
    }
    $(t7) {
      var i10;
      const { values: s9, _$litType$: e13 } = t7, o13 = "number" == typeof e13 ? this._$AC(t7) : (void 0 === e13.el && (e13.el = C.createElement(e13.h, this.options)), e13);
      if ((null === (i10 = this._$AH) || void 0 === i10 ? void 0 : i10._$AD) === o13)
        this._$AH.p(s9);
      else {
        const t8 = new V(o13, this), i11 = t8.v(this.options);
        t8.p(s9), this.T(i11), this._$AH = t8;
      }
    }
    _$AC(t7) {
      let i10 = T.get(t7.strings);
      return void 0 === i10 && T.set(t7.strings, i10 = new C(t7)), i10;
    }
    k(t7) {
      u(this._$AH) || (this._$AH = [], this._$AR());
      const i10 = this._$AH;
      let s9, e13 = 0;
      for (const o13 of t7)
        e13 === i10.length ? i10.push(s9 = new N(this.O(r3()), this.O(r3()), this, this.options)) : s9 = i10[e13], s9._$AI(o13), e13++;
      e13 < i10.length && (this._$AR(s9 && s9._$AB.nextSibling, e13), i10.length = e13);
    }
    _$AR(t7 = this._$AA.nextSibling, i10) {
      var s9;
      for (null === (s9 = this._$AP) || void 0 === s9 || s9.call(this, false, true, i10); t7 && t7 !== this._$AB; ) {
        const i11 = t7.nextSibling;
        t7.remove(), t7 = i11;
      }
    }
    setConnected(t7) {
      var i10;
      void 0 === this._$AM && (this._$Cm = t7, null === (i10 = this._$AP) || void 0 === i10 || i10.call(this, t7));
    }
  };
  var S2 = class {
    constructor(t7, i10, s9, e13, o13) {
      this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t7, this.name = i10, this._$AM = e13, this.options = o13, s9.length > 2 || "" !== s9[0] || "" !== s9[1] ? (this._$AH = Array(s9.length - 1).fill(new String()), this.strings = s9) : this._$AH = b;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t7, i10 = this, s9, e13) {
      const o13 = this.strings;
      let n11 = false;
      if (void 0 === o13)
        t7 = P(this, t7, i10, 0), n11 = !d2(t7) || t7 !== this._$AH && t7 !== x, n11 && (this._$AH = t7);
      else {
        const e14 = t7;
        let l10, h7;
        for (t7 = o13[0], l10 = 0; l10 < o13.length - 1; l10++)
          h7 = P(this, e14[s9 + l10], i10, l10), h7 === x && (h7 = this._$AH[l10]), n11 || (n11 = !d2(h7) || h7 !== this._$AH[l10]), h7 === b ? t7 = b : t7 !== b && (t7 += (null != h7 ? h7 : "") + o13[l10 + 1]), this._$AH[l10] = h7;
      }
      n11 && !e13 && this.j(t7);
    }
    j(t7) {
      t7 === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t7 ? t7 : "");
    }
  };
  var M = class extends S2 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t7) {
      this.element[this.name] = t7 === b ? void 0 : t7;
    }
  };
  var R = s3 ? s3.emptyScript : "";
  var k = class extends S2 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t7) {
      t7 && t7 !== b ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
    }
  };
  var H = class extends S2 {
    constructor(t7, i10, s9, e13, o13) {
      super(t7, i10, s9, e13, o13), this.type = 5;
    }
    _$AI(t7, i10 = this) {
      var s9;
      if ((t7 = null !== (s9 = P(this, t7, i10, 0)) && void 0 !== s9 ? s9 : b) === x)
        return;
      const e13 = this._$AH, o13 = t7 === b && e13 !== b || t7.capture !== e13.capture || t7.once !== e13.once || t7.passive !== e13.passive, n11 = t7 !== b && (e13 === b || o13);
      o13 && this.element.removeEventListener(this.name, this, e13), n11 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
    }
    handleEvent(t7) {
      var i10, s9;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s9 = null === (i10 = this.options) || void 0 === i10 ? void 0 : i10.host) && void 0 !== s9 ? s9 : this.element, t7) : this._$AH.handleEvent(t7);
    }
  };
  var I = class {
    constructor(t7, i10, s9) {
      this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i10, this.options = s9;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t7) {
      P(this, t7);
    }
  };
  var L = { P: "$lit$", A: o3, M: n3, C: 1, L: E, R: V, D: c2, V: P, I: N, H: S2, N: k, U: H, B: M, F: I };
  var z = i2.litHtmlPolyfillSupport;
  null == z || z(C, N), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.5.0");
  var Z = (t7, i10, s9) => {
    var e13, o13;
    const n11 = null !== (e13 = null == s9 ? void 0 : s9.renderBefore) && void 0 !== e13 ? e13 : i10;
    let l10 = n11._$litPart$;
    if (void 0 === l10) {
      const t8 = null !== (o13 = null == s9 ? void 0 : s9.renderBefore) && void 0 !== o13 ? o13 : null;
      n11._$litPart$ = l10 = new N(i10.insertBefore(r3(), t8), t8, void 0, null != s9 ? s9 : {});
    }
    return l10._$AI(t7), l10;
  };

  // ../../node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends d {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t7, e13;
      const i10 = super.createRenderRoot();
      return null !== (t7 = (e13 = this.renderOptions).renderBefore) && void 0 !== t7 || (e13.renderBefore = i10.firstChild), i10;
    }
    update(t7) {
      const i10 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Do = Z(i10, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t7;
      super.connectedCallback(), null === (t7 = this._$Do) || void 0 === t7 || t7.setConnected(true);
    }
    disconnectedCallback() {
      var t7;
      super.disconnectedCallback(), null === (t7 = this._$Do) || void 0 === t7 || t7.setConnected(false);
    }
    render() {
      return x;
    }
  };
  s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
  var n4 = globalThis.litElementPolyfillSupport;
  null == n4 || n4({ LitElement: s4 });
  (null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.2.2");

  // ../../node_modules/@lit/reactive-element/decorators/custom-element.js
  var e4 = (e13) => (n11) => "function" == typeof n11 ? ((e14, n12) => (customElements.define(e14, n12), n12))(e13, n11) : ((e14, n12) => {
    const { kind: t7, elements: s9 } = n12;
    return { kind: t7, elements: s9, finisher(n13) {
      customElements.define(e14, n13);
    } };
  })(e13, n11);

  // ../../node_modules/@lit/reactive-element/decorators/property.js
  var i3 = (i10, e13) => "method" === e13.kind && e13.descriptor && !("value" in e13.descriptor) ? { ...e13, finisher(n11) {
    n11.createProperty(e13.key, i10);
  } } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e13.key, initializer() {
    "function" == typeof e13.initializer && (this[e13.key] = e13.initializer.call(this));
  }, finisher(n11) {
    n11.createProperty(e13.key, i10);
  } };
  function e5(e13) {
    return (n11, t7) => void 0 !== t7 ? ((i10, e14, n12) => {
      e14.constructor.createProperty(n12, i10);
    })(e13, n11, t7) : i3(e13, n11);
  }

  // ../../node_modules/@lit/reactive-element/decorators/state.js
  function t3(t7) {
    return e5({ ...t7, state: true });
  }

  // ../../node_modules/@lit/reactive-element/decorators/base.js
  var o5 = ({ finisher: e13, descriptor: t7 }) => (o13, n11) => {
    var r9;
    if (void 0 === n11) {
      const n12 = null !== (r9 = o13.originalKey) && void 0 !== r9 ? r9 : o13.key, i10 = null != t7 ? { kind: "method", placement: "prototype", key: n12, descriptor: t7(o13.key) } : { ...o13, key: n12 };
      return null != e13 && (i10.finisher = function(t8) {
        e13(t8, n12);
      }), i10;
    }
    {
      const r10 = o13.constructor;
      void 0 !== t7 && Object.defineProperty(o13, n11, t7(n11)), null == e13 || e13(r10, n11);
    }
  };

  // ../../node_modules/@lit/reactive-element/decorators/query.js
  function i4(i10, n11) {
    return o5({ descriptor: (o13) => {
      const t7 = { get() {
        var o14, n12;
        return null !== (n12 = null === (o14 = this.renderRoot) || void 0 === o14 ? void 0 : o14.querySelector(i10)) && void 0 !== n12 ? n12 : null;
      }, enumerable: true, configurable: true };
      if (n11) {
        const n12 = "symbol" == typeof o13 ? Symbol() : "__" + o13;
        t7.get = function() {
          var o14, t8;
          return void 0 === this[n12] && (this[n12] = null !== (t8 = null === (o14 = this.renderRoot) || void 0 === o14 ? void 0 : o14.querySelector(i10)) && void 0 !== t8 ? t8 : null), this[n12];
        };
      }
      return t7;
    } });
  }

  // ../../node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  var n5;
  var e6 = null != (null === (n5 = window.HTMLSlotElement) || void 0 === n5 ? void 0 : n5.prototype.assignedElements) ? (o13, n11) => o13.assignedElements(n11) : (o13, n11) => o13.assignedNodes(n11).filter((o14) => o14.nodeType === Node.ELEMENT_NODE);

  // src/common/styles/Component.scss
  var styles = i`:host {
  all: unset;
  display: block;
  font-family: var(--n-font-family);
  font-size: var(--n-font-size-m);
  line-height: var(--n-line-height);
  font-feature-settings: var(--n-font-features);
  box-sizing: border-box;
  text-align: start;
}

*,
::after,
::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:host([hidden]),
[hidden] {
  display: none !important;
}`;
  var Component_default = styles;

  // src/avatar/Avatar.scss
  var styles2 = i`:host {
  --_n-avatar-color: var(--n-avatar-color, var(--n-color-status-highlight));
  --_n-avatar-size: var(--n-avatar-size, var(--n-size-icon-l));
  --_n-avatar-border-radius: var(--n-border-radius-circle);
  --_n-avatar-font-size: var(--n-font-size-xs);
  --_n-avatar-box-shadow: none;
  display: inline-flex;
  block-size: var(--_n-avatar-size);
  inline-size: var(--_n-avatar-size);
}

:host(:empty) .n-avatar-inner,
:host(:not(:empty)) svg {
  display: none;
}

.n-avatar {
  background: var(--_n-avatar-color);
  border-radius: var(--_n-avatar-border-radius);
  box-shadow: var(--_n-avatar-box-shadow);
  overflow: hidden;
  inline-size: 100%;
  block-size: 100%;
  display: grid;
  place-items: center;
  color: var(--n-color-text-on-accent);
  font-size: var(--_n-avatar-font-size);
  font-weight: var(--n-font-weight-active);
}

img,
svg {
  inline-size: 100%;
  block-size: auto;
  object-fit: cover;
}

.n-loading {
  display: none;
}

:host([size=s]) {
  --_n-avatar-size: var(--n-avatar-size, calc(var(--n-size-icon-m) * 1.25));
  --_n-avatar-font-size: calc(var(--n-font-size-xs) / 1.1) ;
}

:host([size=l]) {
  --_n-avatar-size: var(--n-avatar-size, var(--n-size-icon-xl));
  --_n-avatar-font-size: var(--n-font-size-m) ;
}

:host([size=xl]) {
  --_n-avatar-size: var(--n-avatar-size, var(--n-size-icon-xxl));
  --_n-avatar-font-size: var(--n-font-size-xxl) ;
}

:host([size=xxl]) {
  --_n-avatar-size: var(--n-avatar-size, calc(var(--n-size-icon-xxl) * 1.5));
  --_n-avatar-font-size: var(--n-font-size-xxxl) ;
}

:host([variant=square]) {
  --_n-avatar-color: var(--n-avatar-color, var(--n-color-accent));
  --_n-avatar-border-radius: var(--n-border-radius);
  --_n-avatar-box-shadow: var(--n-box-shadow) ;
}`;
  var Avatar_default = styles2;

  // src/common/fsm.ts
  function fsm(config) {
    return {
      transition(currentState, event) {
        const nextState = config[currentState][event];
        return nextState || currentState;
      }
    };
  }

  // src/common/decorators/observe.ts
  var PropertyObserverController = class {
    constructor(host, key, cb, lifecycle) {
      this.host = host;
      this.key = key;
      this.cb = cb;
      this.lifecycle = lifecycle;
      host.addController(this);
    }
    hostUpdate() {
      if (this.lifecycle === "update") {
        this.handle();
      }
    }
    hostUpdated() {
      if (this.lifecycle === "updated") {
        this.handle();
      }
    }
    handle() {
      const { key, _value, host } = this;
      const newValue = host[key];
      if (_value !== newValue) {
        this._value = newValue;
        this.cb.call(host, _value, newValue, key);
      }
    }
  };
  function observe(propertyName, lifecycle = "update") {
    return function decorator(target, methodName) {
      const proto = target.constructor;
      proto.addInitializer((el) => {
        const cb = el[methodName];
        if (true) {
          if (!(propertyName in el)) {
            throw new TypeError(
              `@observe: property '${propertyName}' does not exist.
Possible properties: ${Object.keys(target).map((p5) => `'${p5}'`).join(", ")}`
            );
          }
        }
        el.addController(new PropertyObserverController(el, propertyName, cb, lifecycle));
      });
    };
  }

  // src/visually-hidden/VisuallyHidden.scss
  var styles3 = i`:host {
  all: initial;
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  block-size: 1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  inset-block-start: 0;
  inline-size: 1px !important;
}`;
  var VisuallyHidden_default = styles3;

  // src/visually-hidden/VisuallyHidden.ts
  var VisuallyHidden = class extends s4 {
    render() {
      return y`<slot></slot>`;
    }
  };
  VisuallyHidden.styles = VisuallyHidden_default;
  VisuallyHidden = __decorateClass([
    e4("kabal-visually-hidden")
  ], VisuallyHidden);

  // src/avatar/Avatar.ts
  var { transition } = fsm({
    initial: {
      "src-set": "loading"
    },
    loading: {
      load: "loaded",
      error: "initial",
      "src-clear": "initial"
    },
    loaded: {
      "src-set": "loading",
      "src-clear": "initial"
    }
  });
  var Avatar = class extends s4 {
    constructor() {
      super(...arguments);
      this.state = "initial";
      this.size = "m";
      this.name = "";
      this.variant = "default";
    }
    render() {
      return y`
      <div class="n-avatar">
        ${this.state !== "initial" ? this.renderImage() : b}
        ${this.state !== "loaded" ? this.renderFallback() : b}
      </div>
    `;
    }
    handleSrcChange() {
      const event = this.src ? "src-set" : "src-clear";
      this.state = transition(this.state, event);
    }
    renderImage() {
      return this.src ? y`
          <slot hidden></slot>
          <img
            class="n-${this.state}"
            src=${this.src}
            @load=${this.handleLoad}
            @error=${this.handleError}
            alt=${this.name || ""}
          />
        ` : b;
    }
    renderFallback() {
      return y`
      <kabal-visually-hidden>${this.name}</kabal-visually-hidden>
      <div class="n-avatar-inner" aria-hidden="true">
        <slot></slot>
      </div>
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27">
        <rect fill="var(--_n-avatar-color)" height="27" rx="12" width="27" x="0" y="0"></rect>
        <g fill="#fff" opacity=".5">
          <circle cx="13.5" cy="30" r="13"></circle>
          <circle cx="13.5" cy="11" r="5"></circle>
        </g>
      </svg>
    `;
    }
    handleLoad() {
      this.state = transition(this.state, "load");
    }
    handleError() {
      this.state = transition(this.state, "error");
    }
  };
  Avatar.styles = [Component_default, Avatar_default];
  __decorateClass([
    t3()
  ], Avatar.prototype, "state", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Avatar.prototype, "size", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Avatar.prototype, "src", 2);
  __decorateClass([
    e5()
  ], Avatar.prototype, "name", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Avatar.prototype, "variant", 2);
  __decorateClass([
    observe("src")
  ], Avatar.prototype, "handleSrcChange", 1);
  Avatar = __decorateClass([
    e4("kabal-avatar")
  ], Avatar);

  // ../../node_modules/@nordhealth/icons/lib/assets/interface-cancelled-small.js
  var interface_cancelled_small_exports = {};
  __export(interface_cancelled_small_exports, {
    default: () => interface_cancelled_small_default,
    tags: () => tags,
    title: () => title
  });
  var interface_cancelled_small_default = '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m7.80265 23.7423c-2.51458-4.4598-1.87318-10.2181 1.9242-14.01545 3.79735-3.79738 9.55565-4.43878 14.01545-1.9242zm4.45465 4.4548 15.9398-15.9398c2.5149 4.4599 1.8735 10.2184-1.9239 14.0159-3.7975 3.7974-9.556 4.4388-14.0159 1.9239zm-6.98522 2.5308c-7.02944-7.0294-7.02944-18.4264 0-25.45582 7.02942-7.02944 18.42642-7.02944 25.45582 0 7.0295 7.02942 7.0295 18.42642 0 25.45582-7.0294 7.0295-18.4264 7.0295-25.45582 0z" fill="currentColor" fill-rule="evenodd"/></svg>';
  var title = "interface-cancelled-small";
  var tags = "nordicon interface small badge process indicator status cancelled progress";

  // ../../node_modules/@nordhealth/icons/lib/assets/interface-complete-small.js
  var interface_complete_small_exports = {};
  __export(interface_complete_small_exports, {
    default: () => interface_complete_small_default,
    tags: () => tags2,
    title: () => title2
  });
  var interface_complete_small_default = '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" fill="currentColor" r="18"/></svg>';
  var title2 = "interface-complete-small";
  var tags2 = "nordicon interface small badge process indicator status fulfilled complete progress";

  // ../../node_modules/@nordhealth/icons/lib/assets/interface-incomplete-small.js
  var interface_incomplete_small_exports = {};
  __export(interface_incomplete_small_exports, {
    default: () => interface_incomplete_small_default,
    tags: () => tags3,
    title: () => title3
  });
  var interface_incomplete_small_default = '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m18 29.7c6.4617 0 11.7-5.2383 11.7-11.7s-5.2383-11.7-11.7-11.7-11.7 5.2383-11.7 11.7 5.2383 11.7 11.7 11.7zm0 6.3c9.9411 0 18-8.0589 18-18 0-9.94112-8.0589-18-18-18-9.94112 0-18 8.05888-18 18 0 9.9411 8.05888 18 18 18z" fill="currentColor" fill-rule="evenodd"/></svg>';
  var title3 = "interface-incomplete-small";
  var tags3 = "nordicon interface small badge process indicator status cancelled unfulfilled incomplete progress";

  // ../../node_modules/@nordhealth/icons/lib/assets/interface-partially-complete-small.js
  var interface_partially_complete_small_exports = {};
  __export(interface_partially_complete_small_exports, {
    default: () => interface_partially_complete_small_default,
    tags: () => tags4,
    title: () => title4
  });
  var interface_partially_complete_small_default = '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m6.3 18h23.4c0-6.4617-5.2383-11.7-11.7-11.7s-11.7 5.2383-11.7 11.7zm29.7 0c0 9.9411-8.0589 18-18 18-9.94113 0-18-8.0589-18-18 0-9.94113 8.05887-18 18-18 9.9411 0 18 8.05887 18 18z" fill="currentColor" fill-rule="evenodd"/></svg>';
  var title4 = "interface-partially-complete-small";
  var tags4 = "nordicon interface small badge process indicator status partially fulfilled complete progress";

  // ../../node_modules/lit-html/directives/if-defined.js
  var l5 = (l10) => null != l10 ? l10 : b;

  // ../../node_modules/lit-html/directive.js
  var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e7 = (t7) => (...e13) => ({ _$litDirective$: t7, values: e13 });
  var i5 = class {
    constructor(t7) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t7, e13, i10) {
      this._$Ct = t7, this._$AM = e13, this._$Ci = i10;
    }
    _$AS(t7, e13) {
      return this.update(t7, e13);
    }
    update(t7, e13) {
      return this.render(...e13);
    }
  };

  // ../../node_modules/lit-html/directives/unsafe-html.js
  var e8 = class extends i5 {
    constructor(i10) {
      if (super(i10), this.it = b, i10.type !== t4.CHILD)
        throw Error(this.constructor.directiveName + "() can only be used in child bindings");
    }
    render(r9) {
      if (r9 === b || null == r9)
        return this._t = void 0, this.it = r9;
      if (r9 === x)
        return r9;
      if ("string" != typeof r9)
        throw Error(this.constructor.directiveName + "() called with a non-string value");
      if (r9 === this.it)
        return this._t;
      this.it = r9;
      const s9 = [r9];
      return s9.raw = s9, this._t = { _$litType$: this.constructor.resultType, strings: s9, values: [] };
    }
  };
  e8.directiveName = "unsafeHTML", e8.resultType = 1;
  var o6 = e7(e8);

  // src/common/directives/cond.ts
  function cond(condition, trueCase = condition, falseCase = b) {
    return condition ? trueCase : falseCase;
  }

  // src/icon/Icon.scss
  var styles4 = i`:host {
  --_n-icon-size: var(--n-size-icon-m);
  display: inline-block;
  block-size: var(--_n-icon-size);
  inline-size: var(--_n-icon-size);
  min-inline-size: var(--_n-icon-size);
}

:host([size=xxs]) {
  --_n-icon-size: var(--n-size-icon-xxs) ;
}

:host([size=xs]) {
  --_n-icon-size: var(--n-size-icon-xs) ;
}

:host([size=s]) {
  --_n-icon-size: var(--n-size-icon-s) ;
}

:host([size=l]) {
  --_n-icon-size: var(--n-size-icon-l) ;
}

:host([size=xl]) {
  --_n-icon-size: var(--n-size-icon-xl) ;
}

:host([size=xxl]) {
  --_n-icon-size: var(--n-size-icon-xxl) ;
}

.n-icon {
  display: block;
}

svg {
  display: block;
}`;
  var Icon_default = styles4;

  // src/icon/Icon.ts
  var loadIcon = (name) => import(`@nordhealth/icons/lib/assets/${name}.js`).then(({ default: svg }) => svg);
  var Icon = class extends s4 {
    constructor() {
      super(...arguments);
      this.name = "";
      this.svg = "";
    }
    static registerResolver(resolver) {
      Icon.resolver = resolver;
    }
    static registerIcon(iconOrName, icon) {
      let name;
      let svg;
      if (typeof iconOrName === "string") {
        name = iconOrName;
        svg = icon;
      } else {
        name = iconOrName.title;
        svg = iconOrName.default;
      }
      if (!name) {
        throw new Error("name is required when registering an icon");
      }
      if (!svg) {
        throw new Error("icon must not be empty");
      }
      if (!Icon.registeredIcons.has(name)) {
        Icon.registeredIcons.set(name, svg);
      }
    }
    render() {
      return y`
      <div
        role=${cond(this.label, "img")}
        style=${cond(this.color, `color:${this.color}`)}
        aria-label=${l5(this.label)}
      >
        <slot aria-hidden="true"></slot>
        <div aria-hidden="true">${o6(this.svg)}</div>
      </div>
    `;
    }
    handleNameChange() {
      if (!this.name) {
        this.svg = "";
        return;
      }
      if (Icon.registeredIcons.has(this.name)) {
        this.svg = Icon.registeredIcons.get(this.name);
        return;
      }
      Icon.resolver(this.name).then((svg) => {
        this.svg = svg;
      }).catch(() => {
        this.svg = "";
      });
    }
  };
  Icon.styles = [Component_default, Icon_default];
  Icon.resolver = true ? loadIcon : loadIconCdn;
  Icon.registeredIcons = /* @__PURE__ */ new Map();
  __decorateClass([
    e5({ reflect: true })
  ], Icon.prototype, "name", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Icon.prototype, "size", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Icon.prototype, "color", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Icon.prototype, "label", 2);
  __decorateClass([
    t3()
  ], Icon.prototype, "svg", 2);
  __decorateClass([
    observe("name")
  ], Icon.prototype, "handleNameChange", 1);
  Icon = __decorateClass([
    e4("kabal-icon")
  ], Icon);

  // src/badge/Badge.scss
  var styles5 = i`:host {
  --_n-badge-color: var(--n-color-text);
  --_n-badge-chip-color: var(--n-color-status-neutral-weak);
  display: inline;
  vertical-align: middle;
}

.n-badge {
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
  border-radius: var(--n-border-radius-pill);
  background: var(--_n-badge-chip-color);
  font-size: var(--n-font-size-s);
  font-family: var(--n-font-family);
  font-weight: var(--n-font-weight);
  font-feature-settings: var(--n-font-features);
  line-height: var(--n-line-height);
  letter-spacing: 0;
  padding-block-start: calc(var(--n-space-s) / 4);
  padding-block-end: calc(var(--n-space-s) / 4);
  padding-inline-start: var(--n-space-s);
  padding-inline-end: var(--n-space-s);
  color: var(--_n-badge-color);
  gap: calc(var(--n-space-s) / 2);
  align-items: center;
  display: inline-flex;
  white-space: nowrap;
  position: relative;
}

:host([type=success]) {
  --_n-badge-chip-color: var(--n-color-status-success-weak) ;
}

:host([type=warning]) {
  --_n-badge-chip-color: var(--n-color-status-warning-weak) ;
}

:host([type=highlight]) {
  --_n-badge-chip-color: var(--n-color-status-highlight-weak) ;
}

:host([type=info]) {
  --_n-badge-chip-color: var(--n-color-status-info-weak) ;
}

:host([type=progress]) {
  --_n-badge-chip-color: var(--n-color-status-progress-weak) ;
}

:host([type=danger]) {
  --_n-badge-chip-color: var(--n-color-status-danger);
  --_n-badge-color: var(--n-color-text-on-accent) ;
}`;
  var Badge_default = styles5;

  // src/badge/Badge.ts
  Icon.registerIcon(interface_cancelled_small_exports);
  Icon.registerIcon(interface_complete_small_exports);
  Icon.registerIcon(interface_incomplete_small_exports);
  Icon.registerIcon(interface_partially_complete_small_exports);
  var iconMap = {
    cancelled: title,
    complete: title2,
    incomplete: title3,
    "partially-complete": title4
  };
  var Badge = class extends s4 {
    constructor() {
      super(...arguments);
      this.type = "neutral";
    }
    render() {
      const icon = this.progress ? iconMap[this.progress] : "";
      return y`
      <span class="n-badge">
        <kabal-icon name=${icon} size="xxs" ?hidden=${!icon}></kabal-icon>
        <slot></slot>
      </span>
    `;
    }
  };
  Badge.styles = [Component_default, Badge_default];
  __decorateClass([
    e5({ reflect: true })
  ], Badge.prototype, "type", 2);
  __decorateClass([
    e5()
  ], Badge.prototype, "progress", 2);
  Badge = __decorateClass([
    e4("kabal-badge")
  ], Badge);

  // ../../node_modules/@nordhealth/icons/lib/assets/interface-help-2.js
  var interface_help_2_exports = {};
  __export(interface_help_2_exports, {
    default: () => interface_help_2_default,
    tags: () => tags5,
    title: () => title5
  });
  var interface_help_2_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path d="M7 70a63 63 0 1 0 126 0A63 63 0 1 0 7 70z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"/><path fill="currentColor" d="M59.5 101.5a10.5 10.5 0 1 0 21 0 10.5 10.5 0 1 0-21 0z"/><path d="M70 70a17.5 17.5 0 1 0-14-28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"/></svg>';
  var title5 = "interface-help-2";
  var tags5 = "nordicon interface help support question mark circle round";

  // ../../node_modules/@nordhealth/icons/lib/assets/interface-warning.js
  var interface_warning_exports = {};
  __export(interface_warning_exports, {
    default: () => interface_warning_default,
    tags: () => tags6,
    title: () => title6
  });
  var interface_warning_default = '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 9C18.9941 9 19.8 9.80589 19.8 10.8V18C19.8 18.9941 18.9941 19.8 18 19.8C17.0058 19.8 16.2 18.9941 16.2 18V10.8C16.2 9.80589 17.0058 9 18 9Z" fill="currentColor"/><path d="M15.3214 25.2C15.3214 25.9104 15.6036 26.5917 16.106 27.0941C16.6083 27.5964 17.2896 27.8786 18 27.8786C18.7105 27.8786 19.3918 27.5964 19.8941 27.0941C20.3965 26.5917 20.6787 25.9104 20.6787 25.2C20.6787 24.4896 20.3965 23.8083 19.8941 23.3059C19.3918 22.8036 18.7105 22.5214 18 22.5214C17.2896 22.5214 16.6083 22.8036 16.106 23.3059C15.6036 23.8083 15.3214 24.4896 15.3214 25.2Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15.3891 0.71328C16.1794 0.244619 17.0813 -0.00268555 18.0002 -0.00268555C18.919 -0.00268555 19.8209 0.244619 20.6113 0.71328C21.3993 1.18057 22.0474 1.85075 22.4881 2.65385L35.092 25.2668L35.0968 25.2753C35.7031 26.3771 36.0118 27.618 35.9924 28.8754C35.973 30.1329 35.6263 31.3636 34.9863 32.4462C34.3463 33.5288 33.4352 34.426 32.3428 35.0491C31.2505 35.6723 30.0146 36 28.757 35.9999C28.757 35.9999 28.757 35.9999 28.757 35.9999H7.23618C7.23611 35.9999 7.23626 35.9999 7.23618 35.9999C5.97993 35.9998 4.74519 35.6722 3.65409 35.0496C2.56299 34.427 1.65299 33.5308 1.01378 32.4493C0.374574 31.3678 0.0282382 30.1384 0.00891227 28.8823C-0.0104135 27.6262 0.297938 26.3868 0.90357 25.2862L0.90814 25.2779L13.5122 2.65398C13.9529 1.85082 14.601 1.1806 15.3891 0.71328ZM7.23641 32.3999H28.757C29.3889 32.4 30.0101 32.2353 30.559 31.9222C31.1079 31.609 31.5657 31.1582 31.8873 30.6142C32.2089 30.0703 32.3831 29.4518 32.3928 28.82C32.4026 28.1896 32.2482 27.5676 31.945 27.0149C31.9442 27.0136 31.9435 27.0123 31.9428 27.011L19.3403 4.40069L19.3332 4.38778C19.2024 4.14852 19.0096 3.94887 18.7751 3.80979C18.5405 3.67071 18.2729 3.59731 18.0002 3.59731C17.7275 3.59731 17.4599 3.67071 17.2253 3.80979C16.9908 3.94887 16.798 4.14852 16.6672 4.38778L16.6602 4.40037L4.0576 27.0217C4.05692 27.0229 4.05625 27.0242 4.05558 27.0254C3.75289 27.577 3.59881 28.1978 3.60849 28.827C3.61819 29.4575 3.79205 30.0747 4.11292 30.6175C4.4338 31.1604 4.89061 31.6103 5.43834 31.9229C5.986 32.2354 6.60586 32.3998 7.23641 32.3999C7.23648 32.3999 7.23633 32.3999 7.23641 32.3999Z" fill="currentColor"/></svg>\n';
  var title6 = "interface-warning";
  var tags6 = "nordicon interface warning exclamation mark triangle shape alert error";

  // ../../node_modules/@nordhealth/icons/lib/assets/interface-info.js
  var interface_info_exports = {};
  __export(interface_info_exports, {
    default: () => interface_info_default,
    tags: () => tags7,
    title: () => title7
  });
  var interface_info_default = '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.27208 5.27208C8.64773 1.89642 13.2261 0 18 0C22.7739 0 27.3523 1.89642 30.7279 5.27208C34.1036 8.64773 36 13.2261 36 18C36 22.7739 34.1036 27.3523 30.7279 30.7279C27.3523 34.1036 22.7739 36 18 36C13.2261 36 8.64773 34.1036 5.27208 30.7279C1.89642 27.3523 0 22.7739 0 18C0 13.2261 1.89642 8.64773 5.27208 5.27208ZM18 3.6C14.1809 3.6 10.5182 5.11714 7.81766 7.81766C5.11714 10.5182 3.6 14.1809 3.6 18C3.6 21.8191 5.11714 25.4818 7.81766 28.1823C10.5182 30.8829 14.1809 32.4 18 32.4C21.8191 32.4 25.4818 30.8829 28.1823 28.1823C30.8829 25.4818 32.4 21.8191 32.4 18C32.4 14.1809 30.8829 10.5182 28.1823 7.81766C25.4818 5.11714 21.8191 3.6 18 3.6Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18 18C18.9941 18 19.8 18.8059 19.8 19.8V27C19.8 27.9941 18.9941 28.8 18 28.8C17.0058 28.8 16.2 27.9941 16.2 27V19.8C16.2 18.8059 17.0058 18 18 18Z" fill="currentColor"/><path d="M15.2795 10.7999C15.2795 11.5213 15.5661 12.2132 16.0763 12.7234C16.5864 13.2336 17.2784 13.5202 17.9998 13.5202C18.7213 13.5202 19.4132 13.2336 19.9234 12.7234C20.4335 12.2132 20.7201 11.5213 20.7201 10.7999C20.7201 10.0784 20.4335 9.38649 19.9234 8.87634C19.4132 8.36619 18.7213 8.07959 17.9998 8.07959C17.2784 8.07959 16.5864 8.36619 16.0763 8.87634C15.5661 9.38649 15.2795 10.0784 15.2795 10.7999Z" fill="currentColor"/></svg>\n';
  var title7 = "interface-info";
  var tags7 = "nordicon interface info circle round alert notice information";

  // ../../node_modules/@nordhealth/icons/lib/assets/interface-checked-circle.js
  var interface_checked_circle_exports = {};
  __export(interface_checked_circle_exports, {
    default: () => interface_checked_circle_default,
    tags: () => tags8,
    title: () => title8
  });
  var interface_checked_circle_default = '<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.67198 5.27208C9.04764 1.89642 13.626 0 18.3999 0C23.1738 0 27.7522 1.89642 31.1278 5.27208C34.5035 8.64773 36.3999 13.2261 36.3999 18C36.3999 22.7739 34.5035 27.3523 31.1278 30.7279C27.7522 34.1036 23.1738 36 18.3999 36C13.626 36 9.04764 34.1036 5.67198 30.7279C2.29633 27.3523 0.399902 22.7739 0.399902 18C0.399902 13.2261 2.29633 8.64773 5.67198 5.27208ZM18.3999 3.6C14.5808 3.6 10.9181 5.11714 8.21757 7.81766C5.51704 10.5182 3.9999 14.1809 3.9999 18C3.9999 21.8191 5.51704 25.4818 8.21757 28.1823C10.9181 30.8829 14.5808 32.4 18.3999 32.4C22.219 32.4 25.8817 30.8829 28.5822 28.1823C31.2828 25.4818 32.7999 21.8191 32.7999 18C32.7999 14.1809 31.2828 10.5182 28.5822 7.81766C25.8817 5.11714 22.219 3.6 18.3999 3.6Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M27.0484 10.0907C27.8261 10.7099 27.9546 11.8423 27.3354 12.62L16.233 26.5642C15.8927 26.9915 15.3768 27.2412 14.8306 27.243C14.2843 27.2447 13.7669 26.9983 13.4239 26.5732L9.39039 21.5735C8.76619 20.7998 8.8874 19.6666 9.66112 19.0424C10.4348 18.4182 11.5681 18.5394 12.1923 19.3131L14.8156 22.5648L24.5191 10.3776C25.1383 9.59994 26.2707 9.47146 27.0484 10.0907Z" fill="currentColor"/></svg>\n';
  var title8 = "interface-checked-circle";
  var tags8 = "nordicon interface circle round checked checkmark ready done success";

  // src/banner/Banner.scss
  var styles6 = i`:host {
  --_n-banner-box-shadow: var(--n-banner-box-shadow, none);
  --_n-banner-border-radius: var(--n-banner-border-radius, var(--n-border-radius));
  --_n-banner-background: var(--n-color-status-info-weak);
  color: var(--n-color-text);
}

.n-banner {
  background: var(--_n-banner-background);
  border-radius: var(--_n-banner-border-radius);
  box-shadow: var(--_n-banner-box-shadow);
  padding: calc(var(--n-space-m) / 1.2) var(--n-space-l);
  margin: 0;
  inline-size: 100%;
}

.n-banner-content {
  inline-size: calc(100% - var(--n-space-xl));
}

kabal-icon {
  transform: translateY(2px);
  color: var(--n-color-icon-hover);
}

::slotted(a) {
  color: var(--n-color-text) !important;
  text-decoration: underline !important;
}

::slotted(p) {
  margin: 0 !important;
}

:host([variant=success]) {
  --_n-banner-background: var(--n-color-status-success-weak) ;
}

:host([variant=danger]) {
  --_n-banner-background: var(--n-color-status-danger-weak) ;
}

:host([variant=warning]) {
  --_n-banner-background: var(--n-color-status-warning-weak) ;
}`;
  var Banner_default = styles6;

  // src/banner/Banner.ts
  Icon.registerIcon(interface_help_2_exports);
  Icon.registerIcon(interface_warning_exports);
  Icon.registerIcon(interface_info_exports);
  Icon.registerIcon(interface_checked_circle_exports);
  var iconMap2 = {
    warning: title5,
    danger: title6,
    info: title7,
    success: title8
  };
  var Banner = class extends s4 {
    constructor() {
      super(...arguments);
      this.variant = "info";
    }
    render() {
      const icon = iconMap2[this.variant] || iconMap2.info;
      return y`
      <div class="n-banner" role="alert">
        <kabal-stack align-items="start" direction="horizontal">
          <kabal-icon name=${icon} size="m"></kabal-icon>
          <div class="n-banner-content">
            <slot></slot>
          </div>
        </kabal-stack>
      </div>
    `;
    }
  };
  Banner.styles = [Component_default, Banner_default];
  __decorateClass([
    e5({ reflect: true })
  ], Banner.prototype, "variant", 2);
  Banner = __decorateClass([
    e4("kabal-banner")
  ], Banner);

  // ../../node_modules/lit-html/directive-helpers.js
  var { I: l6 } = L;
  var e9 = (o13) => void 0 === o13.strings;
  var c3 = () => document.createComment("");
  var r4 = (o13, t7, i10) => {
    var n11;
    const d5 = o13._$AA.parentNode, v4 = void 0 === t7 ? o13._$AB : t7._$AA;
    if (void 0 === i10) {
      const t8 = d5.insertBefore(c3(), v4), n12 = d5.insertBefore(c3(), v4);
      i10 = new l6(t8, n12, o13, o13.options);
    } else {
      const l10 = i10._$AB.nextSibling, t8 = i10._$AM, e13 = t8 !== o13;
      if (e13) {
        let l11;
        null === (n11 = i10._$AQ) || void 0 === n11 || n11.call(i10, o13), i10._$AM = o13, void 0 !== i10._$AP && (l11 = o13._$AU) !== t8._$AU && i10._$AP(l11);
      }
      if (l10 !== v4 || e13) {
        let o14 = i10._$AA;
        for (; o14 !== l10; ) {
          const l11 = o14.nextSibling;
          d5.insertBefore(o14, v4), o14 = l11;
        }
      }
    }
    return i10;
  };
  var u2 = (o13, l10, t7 = o13) => (o13._$AI(l10, t7), o13);
  var f2 = {};
  var s5 = (o13, l10 = f2) => o13._$AH = l10;
  var m2 = (o13) => o13._$AH;
  var p2 = (o13) => {
    var l10;
    null === (l10 = o13._$AP) || void 0 === l10 || l10.call(o13, false, true);
    let t7 = o13._$AA;
    const i10 = o13._$AB.nextSibling;
    for (; t7 !== i10; ) {
      const o14 = t7.nextSibling;
      t7.remove(), t7 = o14;
    }
  };

  // ../../node_modules/lit-html/async-directive.js
  var s6 = (i10, t7) => {
    var e13, o13;
    const r9 = i10._$AN;
    if (void 0 === r9)
      return false;
    for (const i11 of r9)
      null === (o13 = (e13 = i11)._$AO) || void 0 === o13 || o13.call(e13, t7, false), s6(i11, t7);
    return true;
  };
  var o7 = (i10) => {
    let t7, e13;
    do {
      if (void 0 === (t7 = i10._$AM))
        break;
      e13 = t7._$AN, e13.delete(i10), i10 = t7;
    } while (0 === (null == e13 ? void 0 : e13.size));
  };
  var r5 = (i10) => {
    for (let t7; t7 = i10._$AM; i10 = t7) {
      let e13 = t7._$AN;
      if (void 0 === e13)
        t7._$AN = e13 = /* @__PURE__ */ new Set();
      else if (e13.has(i10))
        break;
      e13.add(i10), l7(t7);
    }
  };
  function n6(i10) {
    void 0 !== this._$AN ? (o7(this), this._$AM = i10, r5(this)) : this._$AM = i10;
  }
  function h3(i10, t7 = false, e13 = 0) {
    const r9 = this._$AH, n11 = this._$AN;
    if (void 0 !== n11 && 0 !== n11.size)
      if (t7)
        if (Array.isArray(r9))
          for (let i11 = e13; i11 < r9.length; i11++)
            s6(r9[i11], false), o7(r9[i11]);
        else
          null != r9 && (s6(r9, false), o7(r9));
      else
        s6(this, i10);
  }
  var l7 = (i10) => {
    var t7, s9, o13, r9;
    i10.type == t4.CHILD && (null !== (t7 = (o13 = i10)._$AP) && void 0 !== t7 || (o13._$AP = h3), null !== (s9 = (r9 = i10)._$AQ) && void 0 !== s9 || (r9._$AQ = n6));
  };
  var c4 = class extends i5 {
    constructor() {
      super(...arguments), this._$AN = void 0;
    }
    _$AT(i10, t7, e13) {
      super._$AT(i10, t7, e13), r5(this), this.isConnected = i10._$AU;
    }
    _$AO(i10, t7 = true) {
      var e13, r9;
      i10 !== this.isConnected && (this.isConnected = i10, i10 ? null === (e13 = this.reconnected) || void 0 === e13 || e13.call(this) : null === (r9 = this.disconnected) || void 0 === r9 || r9.call(this)), t7 && (s6(this, i10), o7(this));
    }
    setValue(t7) {
      if (e9(this._$Ct))
        this._$Ct._$AI(t7, this);
      else {
        const i10 = [...this._$Ct._$AH];
        i10[this._$Ci] = t7, this._$Ct._$AI(i10, this, 0);
      }
    }
    disconnected() {
    }
    reconnected() {
    }
  };

  // ../../node_modules/lit-html/directives/ref.js
  var e10 = () => new o8();
  var o8 = class {
  };
  var h4 = /* @__PURE__ */ new WeakMap();
  var n7 = e7(class extends c4 {
    render(t7) {
      return b;
    }
    update(t7, [s9]) {
      var e13;
      const o13 = s9 !== this.Y;
      return o13 && void 0 !== this.Y && this.rt(void 0), (o13 || this.lt !== this.ct) && (this.Y = s9, this.dt = null === (e13 = t7.options) || void 0 === e13 ? void 0 : e13.host, this.rt(this.ct = t7.element)), b;
    }
    rt(i10) {
      var t7;
      if ("function" == typeof this.Y) {
        const s9 = null !== (t7 = this.dt) && void 0 !== t7 ? t7 : globalThis;
        let e13 = h4.get(s9);
        void 0 === e13 && (e13 = /* @__PURE__ */ new WeakMap(), h4.set(s9, e13)), void 0 !== e13.get(this.Y) && this.Y.call(this.dt, void 0), e13.set(this.Y, i10), void 0 !== i10 && this.Y.call(this.dt, i10);
      } else
        this.Y.value = i10;
    }
    get lt() {
      var i10, t7, s9;
      return "function" == typeof this.Y ? null === (t7 = h4.get(null !== (i10 = this.dt) && void 0 !== i10 ? i10 : globalThis)) || void 0 === t7 ? void 0 : t7.get(this.Y) : null === (s9 = this.Y) || void 0 === s9 ? void 0 : s9.value;
    }
    disconnected() {
      this.lt === this.ct && this.rt(void 0);
    }
    reconnected() {
      this.rt(this.ct);
    }
  });

  // src/common/controllers/EventController.ts
  var EventController = class {
    constructor(host) {
      this.listeners = [];
      host.addController(this);
    }
    hostDisconnected() {
      this.listeners.forEach((stop) => stop());
      this.listeners = [];
    }
    listen(element, type, listener, options) {
      element.addEventListener(type, listener, options);
      const stop = () => element.removeEventListener(type, listener, options);
      this.listeners.push(stop);
    }
  };

  // src/common/controllers/LightDomController.ts
  var LightDomController = class {
    constructor(host, options) {
      this.host = host;
      this.options = options;
      host.addController(this);
    }
    get container() {
      return this.options.container || this.host;
    }
    hostUpdated() {
      this.render();
    }
    hostDisconnected() {
      Z(b, this.container, this.options.renderOptions);
    }
    render() {
      Z(this.options.render(), this.container, this.options.renderOptions);
    }
  };

  // src/spinner/Spinner.scss
  var styles7 = i`:host {
  --_n-spinner-size: var(--n-size-icon-m);
  inline-size: var(--_n-spinner-size);
  block-size: var(--_n-spinner-size);
  display: inline-flex;
  position: relative;
  color: inherit;
}

:host([size=xs]) {
  --_n-spinner-size: var(--n-size-icon-xs) ;
}

:host([size=s]) {
  --_n-spinner-size: var(--n-size-icon-s) ;
}

:host([size=l]) {
  --_n-spinner-size: var(--n-size-icon-l) ;
}

:host([size=xl]) {
  --_n-spinner-size: var(--n-size-icon-xl) ;
}

:host([size=xxl]) {
  --_n-spinner-size: var(--n-size-icon-xxl) ;
}

.n-spinner,
.n-spinner::after {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  z-index: var(--n-index-spinner);
  transform: translateZ(0) translateX(-50%) translateY(-50%);
  transform-origin: 0 0;
}

.n-spinner {
  block-size: var(--_n-spinner-size);
  inline-size: var(--_n-spinner-size);
  font-size: var(--_n-spinner-size);
  color: var(--n-color-accent);
  border: 0.18em solid transparent;
  border-inline-start: 0.18em solid currentColor;
  border-radius: var(--n-border-radius-circle);
  animation: nRotate 0.66s linear infinite;
}

.n-spinner::after {
  box-sizing: content-box;
  inline-size: 100%;
  block-size: 100%;
  overflow: hidden;
  content: "";
  border: 0.18em solid currentColor;
  border-radius: var(--n-border-radius-circle);
  opacity: 0.3;
}

@keyframes nRotate {
  0% {
    transform: translateZ(0) rotate(0) translateX(-50%) translateY(-50%);
  }
  100% {
    transform: translateZ(0) rotate(360deg) translateX(-50%) translateY(-50%);
  }
}`;
  var Spinner_default = styles7;

  // src/spinner/Spinner.ts
  var Spinner = class extends s4 {
    constructor() {
      super(...arguments);
      this.size = "m";
    }
    render() {
      return y`
      <div
        class="n-spinner"
        role=${cond(this.label, "img")}
        aria-label=${l5(this.label)}
        style=${cond(this.color, `color:${this.color}`)}
      ></div>
    `;
    }
  };
  Spinner.styles = [Component_default, Spinner_default];
  __decorateClass([
    e5({ reflect: true })
  ], Spinner.prototype, "size", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Spinner.prototype, "color", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Spinner.prototype, "label", 2);
  Spinner = __decorateClass([
    e4("kabal-spinner")
  ], Spinner);

  // src/common/mixins/FocusableMixin.ts
  function FocusableMixin(superClass) {
    class FocusableElement extends superClass {
      constructor() {
        super(...arguments);
        this.focusableRef = e10();
      }
      focus(options) {
        var _a;
        (_a = this.focusableRef.value) == null ? void 0 : _a.focus(options);
      }
      blur() {
        var _a;
        (_a = this.focusableRef.value) == null ? void 0 : _a.blur();
      }
      click() {
        var _a;
        (_a = this.focusableRef.value) == null ? void 0 : _a.click();
      }
    }
    return FocusableElement;
  }

  // src/common/mixins/InputMixin.ts
  function InputMixin(superClass) {
    class InputElement extends superClass {
      constructor() {
        super(...arguments);
        this.disabled = false;
        this.value = "";
      }
      get form() {
        if (this.hasAttribute("form")) {
          const root = this.getRootNode();
          return root.querySelector(`form#${this.getAttribute("form")}`);
        }
        return this.closest("form");
      }
    }
    __decorateClass([
      e5({ type: Boolean, reflect: true })
    ], InputElement.prototype, "disabled", 2);
    __decorateClass([
      e5()
    ], InputElement.prototype, "name", 2);
    __decorateClass([
      e5()
    ], InputElement.prototype, "value", 2);
    return InputElement;
  }

  // src/button/Button.scss
  var styles8 = i`:host {
  --_n-button-border-radius: var(--n-button-border-radius, var(--n-border-radius-s));
  --_n-button-gap: var(--n-button-gap, var(--n-space-s));
  --_n-button-gradient: var(--n-button-gradient, linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.013) 100%));
  --_n-button-background-color: var(--n-button-background-color, var(--n-color-button));
  --_n-button-border-color: var(--n-button-border-color, var(--n-color-border-strong));
  --_n-button-text-align: var(--n-button-text-align, center);
  --_n-button-box-shadow: var(--n-button-box-shadow, var(--n-box-shadow));
  --_n-button-padding-inline: calc(var(--n-space-m) / 1.2);
  --_n-button-color: var(--n-color-text);
  --_n-button-opacity: 1;
  --_n-button-border-style: solid;
  --_n-button-font-size: var(--n-font-size-m);
  --_n-button-font-weight: var(--n-font-weight);
  --_n-button-min-block-size: var(--n-space-xl);
  --_n-button-inline-size: fit-content;
  --_n-button-padding-block: calc(var(--n-space-s) / 1.6);
  --_n-button-icon-size: var(--n-size-icon-s);
  display: inline-block;
}

.n-button {
  -webkit-appearance: none;
  align-items: center;
  appearance: none;
  background: var(--_n-button-background-color);
  opacity: var(--_n-button-opacity);
  border-radius: var(--_n-button-border-radius);
  border: 1px var(--_n-button-border-style) var(--_n-button-border-color);
  box-shadow: var(--_n-button-box-shadow);
  color: var(--_n-button-color);
  cursor: pointer;
  display: flex;
  gap: var(--_n-button-gap);
  font-family: var(--n-font-family);
  font-feature-settings: var(--n-font-features);
  font-size: var(--_n-button-font-size);
  font-weight: var(--_n-button-font-weight);
  line-height: var(--n-line-height-form);
  margin: 0;
  min-block-size: var(--_n-button-min-block-size);
  padding: var(--_n-button-padding-block) var(--_n-button-padding-inline);
  text-align: var(--_n-button-text-align);
  text-decoration: none;
  transition: 0.1s ease;
  transition-property: background-color, opacity, color, box-shadow, border-color;
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  inline-size: var(--_n-button-inline-size);
}

.n-button::after {
  content: "";
  position: absolute;
  background: 0 0;
  background-image: var(--_n-button-gradient);
  border-radius: var(--_n-button-border-radius);
  background-repeat: repeat-x;
  inline-size: 100%;
  inset-inline: 0;
  block-size: 100%;
  inset-block-start: 0;
}

:host([expand]) {
  --_n-button-inline-size: 100%;
  display: block;
}

.n-content {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}

.n-button:hover {
  --_n-button-border-color: var(--n-button-border-color, var(--n-color-border-hover));
  --_n-button-background-color: var(--n-button-background-color, var(--n-color-button-hover)) ;
}

.n-button:focus {
  --_n-button-border-color: var(--n-button-border-color, var(--n-color-accent));
  --_n-button-border-style: solid;
  --_n-button-box-shadow: 0 0 0 1px var(--n-color-accent), var(--n-box-shadow);
  outline: 0;
}

.n-button:active {
  opacity: 0.8;
  transform: translateY(1px);
  transition: none;
}

:host([variant=primary]) {
  --_n-button-box-shadow: var(--n-button-box-shadow, none);
  --_n-button-color: var(--n-color-text-on-accent);
  --_n-button-font-weight: var(--n-font-weight-active) ;
}

:host([variant=primary]),
:host([variant=primary]) .n-button:hover {
  --_n-button-border-color: var(--n-button-border-color, transparent);
  --_n-button-background-color: var(--n-button-background-color, var(--n-color-accent)) ;
}

:host([variant=primary]) .n-button:hover {
  filter: brightness(93%);
}

:host([variant=primary]) .n-button:focus {
  --_n-button-box-shadow: 0 0 0 1px var(--n-color-surface), 0 0 0 3px var(--_n-button-border-color) ;
}

:host([variant=dashed]) {
  --_n-button-border-color: var(--n-button-border-color, var(--n-color-border-hover));
  --_n-button-box-shadow: var(--n-button-box-shadow, none);
  --_n-button-color: var(--n-color-text-weaker);
  --_n-button-border-style: dashed ;
}

:host([variant=dashed]) .n-button:hover {
  --_n-button-color: var(--n-color-text) ;
}

:host([variant=dashed]) .n-button::after {
  display: none;
}

:host([variant=plain]) {
  --_n-button-box-shadow: var(--n-button-box-shadow, none) ;
}

:host([variant=plain]),
:host([variant=plain]) .n-button:hover {
  --_n-button-border-color: var(--n-button-border-color, transparent) ;
}

:host([variant=plain]) .n-button::after {
  display: none;
}

:host([variant=danger]) {
  --_n-button-box-shadow: var(--n-button-box-shadow, none);
  --_n-button-color: var(--n-color-text-on-accent);
  --_n-button-font-weight: var(--n-font-weight-active) ;
}

:host([variant=danger]),
:host([variant=danger]) .n-button:hover {
  --_n-button-border-color: var(--n-button-border-color, transparent);
  --_n-button-background-color: var(--n-button-background-color, var(--n-color-status-danger)) ;
}

:host([variant=danger]) .n-button:hover {
  filter: brightness(93%);
}

:host([variant=danger]) .n-button:focus {
  --_n-button-border-color: var(--n-button-border-color, var(--n-color-status-danger));
  --_n-button-box-shadow: 0 0 0 1px var(--n-color-surface), 0 0 0 3px var(--n-color-status-danger) ;
}

:host([variant=switch]) {
  --_n-button-border-radius: var(--n-button-border-radius, var(--n-border-radius-sharp));
  --_n-button-border-color: var(--n-button-border-color, transparent);
  --_n-button-text-align: var(--n-button-text-align, start);
  --_n-button-background-color: var(--n-button-background-color, transparent);
  --_n-button-box-shadow: var(--n-button-box-shadow, none);
  --_n-button-color: var(--n-color-text);
  --_n-button-font-weight: var(--n-font-weight-heading);
  --_n-button-min-block-size: calc(var(--n-space-xxl) - 1px);
  --_n-button-font-size: var(--n-font-size-l);
  --_n-button-padding-inline: var(--n-space-m);
  --_n-button-icon-size: var(--n-size-icon-s);
  display: flex;
  align-items: center;
}

:host([variant=switch]) .n-button * {
  pointer-events: none;
}

:host([variant=switch]) .n-button::after {
  display: none;
}

:host([variant=switch]) .n-button:hover,
:host([variant=switch][aria-expanded=true]) .n-button {
  --_n-button-border-color: var(--n-button-border-color, transparent);
  --_n-button-background-color: var(--n-button-background-color, var(--n-color-nav-hover)) ;
}

:host([variant=switch]) .n-button:focus {
  --_n-button-box-shadow: inset 0 0 0 1px var(--_n-button-border-color) ;
}

:host([variant=switch]) slot[name=end] kabal-icon {
  color: var(--n-color-icon);
  margin-inline-end: var(--n-space-s);
}

:host([disabled]) {
  --_n-button-border-color: var(--n-button-border-color, var(--_n-button-background-color));
  --_n-button-background-color: var(--n-button-background-color, var(--n-color-border));
  --_n-button-box-shadow: var(--n-button-box-shadow, none);
  --_n-button-color: var(--n-color-text-weaker);
  --_n-button-opacity: 0.5;
  pointer-events: none;
}

:host([disabled]) .n-button::after {
  display: none;
}

.n-button-spinner {
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  inset-block-start: 50%;
  inset-inline-start: 50%;
}

:host([loading]:not([href])) {
  pointer-events: none;
}

:host([loading]:not([href])) .n-content,
:host([loading]:not([href])) ::slotted([slot=end]),
:host([loading]:not([href])) ::slotted([slot=start]) {
  opacity: 0;
}

:host([size=s]) {
  --_n-button-gap: var(--n-button-gap, calc(var(--n-space-s) / 2));
  --_n-button-padding-inline: var(--n-space-s);
  --_n-button-padding-block: calc(var(--n-space-s) / 1.5);
  --_n-button-font-size: var(--n-font-size-s);
  --_n-button-min-block-size: var(--n-space-l);
  --_n-button-icon-size: var(--n-size-icon-xs) ;
}

:host([size=s]) .n-button {
  line-height: var(--n-line-height-tight);
}

:host([size=l]) {
  --_n-button-border-radius: var(--n-button-border-radius, var(--n-border-radius));
  --_n-button-padding-inline: calc(var(--n-space-l) / 1.3);
  --_n-button-font-size: var(--n-font-size-l);
  --_n-button-min-block-size: calc(var(--n-space-xxl) - var(--n-space-l));
  --_n-button-font-weight: var(--n-font-weight-active);
  --_n-button-icon-size: var(--n-size-icon-m) ;
}

::slotted(*) {
  color: inherit;
  pointer-events: none;
}

::slotted(svg) {
  color: var(--n-color-icon);
}

::slotted(button[slot=proxy]) {
  display: none;
}

:host(:not([variant=primary], [variant=danger])) ::slotted(kabal-icon),
:host(:not([variant=primary], [variant=danger])) kabal-icon {
  color: var(--n-color-icon);
}

slot:not([name])::slotted(kabal-icon) {
  transform: translateY(1px);
}

:host([size=s]) slot:not([name])::slotted(kabal-icon:not([size])),
slot:not([name])::slotted(kabal-icon[size=xs]) {
  transform: translateY(0);
}

::slotted(kabal-icon:not([size])),
kabal-icon {
  --_n-icon-size: var(--_n-button-icon-size) ;
}`;
  var Button_default = styles8;

  // src/common/controllers/SlotController.ts
  var SlotController = class {
    constructor(host, slotName = "") {
      this.host = host;
      this.slotName = slotName;
      this.handleSlotChange = (e13) => {
        const slot = e13.target;
        if (slot.name === this.slotName) {
          this.onChange(e13);
        }
      };
      host.addController(this);
      this.events = new EventController(host);
      this.selector = slotName ? `:scope > [slot="${slotName}"]` : `:scope > :not([slot])`;
    }
    hostConnected() {
      if (this.host.shadowRoot) {
        this.events.listen(this.host.shadowRoot, "slotchange", this.handleSlotChange);
      }
    }
    get hasContent() {
      return this.content != null;
    }
    get isEmpty() {
      return !this.hasContent;
    }
    get content() {
      return this.host.querySelector(this.selector);
    }
    get assigned() {
      return Array.from(this.host.querySelectorAll(this.selector));
    }
    onChange(_e) {
      this.host.requestUpdate();
    }
  };

  // src/button/Button.ts
  var Button = class extends InputMixin(FocusableMixin(s4)) {
    constructor() {
      super(...arguments);
      this.defaultSlot = new SlotController(this);
      this.buttonRef = e10();
      this.events = new EventController(this);
      this.lightDom = new LightDomController(this, {
        render: () => this.renderLightDom()
      });
      this.variant = "default";
      this.type = "submit";
      this.size = "m";
      this.download = false;
      this.target = "_self";
      this.expand = false;
      this.loading = false;
      this.handleOuterClick = (e13) => {
        const isInternalButton = e13.composedPath().some((node) => node === this.focusableRef.value || node === this.buttonRef.value);
        if (!isInternalButton) {
          e13.stopPropagation();
        }
      };
    }
    connectedCallback() {
      super.connectedCallback();
      this.events.listen(this, "click", this.handleOuterClick, true);
    }
    render() {
      var _a;
      const isSwitch = this.variant === "switch";
      const isDropdownToggle = ((_a = this.assignedSlot) == null ? void 0 : _a.name) === "toggle";
      const isIconButton = this.defaultSlot.assigned.some((node) => node.localName === "kabal-icon");
      const shouldShowDropdownIcon = (isSwitch || isDropdownToggle && !isIconButton) && !this.href;
      const innards = y`
      <slot name="start"></slot>
      <div class="n-content">
        <slot></slot>
      </div>
      <kabal-spinner
        class="n-button-spinner"
        color="currentColor"
        ?hidden=${!this.loading || Boolean(this.href)}
      ></kabal-spinner>
      <slot name="end">
        ${shouldShowDropdownIcon ? y`<kabal-icon name="interface-dropdown-small"></kabal-icon>` : b}
      </slot>
    `;
      return this.href ? this.renderLink(innards) : this.renderButton(innards);
    }
    renderLink(innards) {
      return y`
      <a
        ${n7(this.focusableRef)}
        class="n-button"
        target=${this.target}
        ?download=${this.download}
        href=${cond(this.disabled, b, this.href)}
        tabindex=${cond(this.disabled, "-1")}
        aria-disabled=${cond(this.disabled, "true")}
        role=${cond(this.disabled, "link")}
        >${innards}
      </a>
    `;
    }
    renderButton(innards) {
      return y`
      <slot name="proxy" @slotchange=${this.handleProxyChange}></slot>
      <button
        ${n7(this.focusableRef)}
        class="n-button"
        ?disabled=${this.disabled}
        name=${cond(this.name)}
        value=${cond(this.value)}
        @click=${this.handleClick}
        aria-disabled=${cond(this.loading, "true")}
        aria-expanded=${cond(this.accessibleExpanded)}
        aria-haspopup=${cond(this.accessibleHasPopup)}
      >
        ${innards}
      </button>
    `;
    }
    renderLightDom() {
      if (this.href || !this.form) {
        return b;
      }
      return y`
      <button
        ${n7(this.buttonRef)}
        slot="proxy"
        name=${cond(this.name)}
        value=${cond(this.value)}
        ?disabled=${this.disabled}
        form=${cond(this.getAttribute("form"))}
        type=${this.type}
      ></button>
    `;
    }
    handleClick(e13) {
      if (this.buttonRef.value) {
        e13.stopPropagation();
        this.buttonRef.value.click();
      }
    }
    handleProxyChange(e13) {
      const slot = e13.target;
      const proxyButton = this.buttonRef.value;
      if (proxyButton && proxyButton.assignedSlot !== slot) {
        this.appendChild(proxyButton);
      }
    }
  };
  Button.styles = [Component_default, Button_default];
  __decorateClass([
    e5({ reflect: true })
  ], Button.prototype, "variant", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Button.prototype, "type", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Button.prototype, "size", 2);
  __decorateClass([
    e5({ attribute: "aria-expanded" })
  ], Button.prototype, "accessibleExpanded", 2);
  __decorateClass([
    e5({ attribute: "aria-haspopup" })
  ], Button.prototype, "accessibleHasPopup", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Button.prototype, "href", 2);
  __decorateClass([
    e5({ type: Boolean })
  ], Button.prototype, "download", 2);
  __decorateClass([
    e5()
  ], Button.prototype, "target", 2);
  __decorateClass([
    e5({ reflect: true, type: Boolean })
  ], Button.prototype, "expand", 2);
  __decorateClass([
    e5({ reflect: true, type: Boolean })
  ], Button.prototype, "loading", 2);
  Button = __decorateClass([
    e4("kabal-button")
  ], Button);

  // src/common/mixins/DraftComponentMixin.ts
  function DraftComponentMixin(superClass) {
    class DraftComponent extends superClass {
      connectedCallback() {
        super.connectedCallback();
        if (false) {
          console.warn(
            `NORD: %c${this.localName}%c should not be used in production, as it is in draft status.`,
            "font-weight:bold",
            "font-weight:normal"
          );
          _DraftComponent._warningLogged = true;
        }
      }
    }
    DraftComponent._warningLogged = false;
    return DraftComponent;
  }

  // src/button-group/ButtonGroup.scss
  var styles9 = i`:host {
  --_n-button-group-border-radius: var(--n-button-group-border-radius, var(--n-border-radius-s));
  --_n-button-group-box-shadow: var(--n-button-group-box-shadow, var(--n-box-shadow));
  --n-button-border-radius: 0;
  --n-button-box-shadow: none ;
}

.n-button-group {
  display: flex;
  max-inline-size: max-content;
  border-radius: var(--_n-button-group-border-radius);
  box-shadow: var(--_n-button-group-box-shadow);
}

:host([direction=horizontal]) ::slotted(*) {
  margin-inline-end: -1px;
}

::slotted(:is(:hover, :focus, :focus-within, [aria-pressed=true])) {
  z-index: var(--n-index-masked);
}

::slotted([aria-pressed=true]) {
  --n-button-background-color: var(--n-color-status-info-weak);
  --n-button-border-color: var(--n-color-accent) ;
}

::slotted(:first-child) {
  --n-button-border-radius: var(--_n-button-group-border-radius) 0 0 var(--_n-button-group-border-radius);
  border-radius: var(--_n-button-group-border-radius) 0 0 var(--_n-button-group-border-radius);
}

::slotted(:last-child) {
  --n-button-border-radius: 0 var(--_n-button-group-border-radius) var(--_n-button-group-border-radius) 0;
  border-radius: 0 var(--_n-button-group-border-radius) var(--_n-button-group-border-radius) 0;
}

:host([direction=vertical]) .n-button-group {
  flex-direction: column;
}

:host([direction=vertical]) ::slotted(*) {
  margin-block-end: -1px;
}

:host([direction=vertical]) ::slotted(:first-child) {
  --n-button-border-radius: var(--_n-button-group-border-radius) var(--_n-button-group-border-radius) 0 0 ;
}

:host([direction=vertical]) ::slotted(:last-child) {
  --n-button-border-radius: 0 0 var(--_n-button-group-border-radius) var(--_n-button-group-border-radius) ;
}

::slotted(kabal-button[variant=primary]) {
  position: relative;
}

::slotted(kabal-button[variant=primary]:not(:is(:focus, :first-child)))::before,
::slotted(kabal-button[variant=primary]:not(:is(:focus, :last-child)))::after {
  content: "";
  position: absolute;
  z-index: var(--n-index-mask);
  background: var(--n-color-text);
  opacity: 0.25;
}

:host([direction=horizontal]) ::slotted(kabal-button[variant=primary])::after,
:host([direction=horizontal]) ::slotted(kabal-button[variant=primary])::before {
  inline-size: 1px;
  inset-block: 0;
}

:host([direction=horizontal]) ::slotted(kabal-button[variant=primary])::after {
  inset-inline-end: 0;
}

:host([direction=vertical]) ::slotted(kabal-button[variant=primary])::after,
:host([direction=vertical]) ::slotted(kabal-button[variant=primary])::before {
  block-size: 1px;
  inset-inline: 0;
}

:host([direction=vertical]) ::slotted(kabal-button[variant=primary])::after {
  inset-block-end: 0;
}`;
  var ButtonGroup_default = styles9;

  // src/button-group/ButtonGroup.ts
  var ButtonGroup = class extends DraftComponentMixin(s4) {
    constructor() {
      super(...arguments);
      this.direction = "horizontal";
      this.role = "group";
    }
    render() {
      return y`
      <div class="n-button-group">
        <slot></slot>
      </div>
    `;
    }
  };
  ButtonGroup.styles = [Component_default, ButtonGroup_default];
  __decorateClass([
    e5({ reflect: true })
  ], ButtonGroup.prototype, "direction", 2);
  __decorateClass([
    e5({ reflect: true })
  ], ButtonGroup.prototype, "role", 2);
  ButtonGroup = __decorateClass([
    e4("kabal-button-group")
  ], ButtonGroup);

  // ../../node_modules/lit-html/directives/class-map.js
  var o9 = e7(class extends i5 {
    constructor(t7) {
      var i10;
      if (super(t7), t7.type !== t4.ATTRIBUTE || "class" !== t7.name || (null === (i10 = t7.strings) || void 0 === i10 ? void 0 : i10.length) > 2)
        throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t7) {
      return " " + Object.keys(t7).filter((i10) => t7[i10]).join(" ") + " ";
    }
    update(i10, [s9]) {
      var r9, o13;
      if (void 0 === this.nt) {
        this.nt = /* @__PURE__ */ new Set(), void 0 !== i10.strings && (this.st = new Set(i10.strings.join(" ").split(/\s/).filter((t7) => "" !== t7)));
        for (const t7 in s9)
          s9[t7] && !(null === (r9 = this.st) || void 0 === r9 ? void 0 : r9.has(t7)) && this.nt.add(t7);
        return this.render(s9);
      }
      const e13 = i10.element.classList;
      this.nt.forEach((t7) => {
        t7 in s9 || (e13.remove(t7), this.nt.delete(t7));
      });
      for (const t7 in s9) {
        const i11 = !!s9[t7];
        i11 === this.nt.has(t7) || (null === (o13 = this.st) || void 0 === o13 ? void 0 : o13.has(t7)) || (i11 ? (e13.add(t7), this.nt.add(t7)) : (e13.remove(t7), this.nt.delete(t7)));
      }
      return x;
    }
  });

  // ../../node_modules/lit-html/directives/repeat.js
  var u3 = (e13, s9, t7) => {
    const r9 = /* @__PURE__ */ new Map();
    for (let l10 = s9; l10 <= t7; l10++)
      r9.set(e13[l10], l10);
    return r9;
  };
  var c5 = e7(class extends i5 {
    constructor(e13) {
      if (super(e13), e13.type !== t4.CHILD)
        throw Error("repeat() can only be used in text expressions");
    }
    ht(e13, s9, t7) {
      let r9;
      void 0 === t7 ? t7 = s9 : void 0 !== s9 && (r9 = s9);
      const l10 = [], o13 = [];
      let i10 = 0;
      for (const s10 of e13)
        l10[i10] = r9 ? r9(s10, i10) : i10, o13[i10] = t7(s10, i10), i10++;
      return { values: o13, keys: l10 };
    }
    render(e13, s9, t7) {
      return this.ht(e13, s9, t7).values;
    }
    update(s9, [t7, r9, c8]) {
      var d5;
      const a5 = m2(s9), { values: p5, keys: v4 } = this.ht(t7, r9, c8);
      if (!Array.isArray(a5))
        return this.ut = v4, p5;
      const h7 = null !== (d5 = this.ut) && void 0 !== d5 ? d5 : this.ut = [], m5 = [];
      let y4, x4, j = 0, k3 = a5.length - 1, w4 = 0, A4 = p5.length - 1;
      for (; j <= k3 && w4 <= A4; )
        if (null === a5[j])
          j++;
        else if (null === a5[k3])
          k3--;
        else if (h7[j] === v4[w4])
          m5[w4] = u2(a5[j], p5[w4]), j++, w4++;
        else if (h7[k3] === v4[A4])
          m5[A4] = u2(a5[k3], p5[A4]), k3--, A4--;
        else if (h7[j] === v4[A4])
          m5[A4] = u2(a5[j], p5[A4]), r4(s9, m5[A4 + 1], a5[j]), j++, A4--;
        else if (h7[k3] === v4[w4])
          m5[w4] = u2(a5[k3], p5[w4]), r4(s9, a5[j], a5[k3]), k3--, w4++;
        else if (void 0 === y4 && (y4 = u3(v4, w4, A4), x4 = u3(h7, j, k3)), y4.has(h7[j]))
          if (y4.has(h7[k3])) {
            const e13 = x4.get(v4[w4]), t8 = void 0 !== e13 ? a5[e13] : null;
            if (null === t8) {
              const e14 = r4(s9, a5[j]);
              u2(e14, p5[w4]), m5[w4] = e14;
            } else
              m5[w4] = u2(t8, p5[w4]), r4(s9, a5[j], t8), a5[e13] = null;
            w4++;
          } else
            p2(a5[k3]), k3--;
        else
          p2(a5[j]), j++;
      for (; w4 <= A4; ) {
        const e13 = r4(s9, m5[A4 + 1]);
        u2(e13, p5[w4]), m5[w4++] = e13;
      }
      for (; j <= k3; ) {
        const e13 = a5[j++];
        null !== e13 && p2(e13);
      }
      return this.ut = v4, s5(s9, m5), x;
    }
  });

  // ../../node_modules/tinykeys/dist/tinykeys.module.js
  var t5 = ["Shift", "Meta", "Alt", "Control"];
  var e11 = "object" == typeof navigator && /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "Meta" : "Control";
  function n8(t7, e13) {
    return "function" == typeof t7.getModifierState && t7.getModifierState(e13);
  }
  function r6(t7) {
    return t7.trim().split(" ").map(function(t8) {
      var n11 = t8.split(/\b\+/), r9 = n11.pop();
      return [n11 = n11.map(function(t9) {
        return "$mod" === t9 ? e11 : t9;
      }), r9];
    });
  }
  function o10(e13, o13) {
    var i10;
    void 0 === o13 && (o13 = {});
    var u6 = null != (i10 = o13.timeout) ? i10 : 1e3, a5 = Object.keys(e13).map(function(t7) {
      return [r6(t7), e13[t7]];
    }), f5 = /* @__PURE__ */ new Map(), c8 = null;
    return function(e14) {
      e14 instanceof KeyboardEvent && (a5.forEach(function(r9) {
        var o14 = r9[0], i11 = r9[1], u7 = f5.get(o14) || o14;
        !function(e15, r10) {
          return !(r10[1].toUpperCase() !== e15.key.toUpperCase() && r10[1] !== e15.code || r10[0].find(function(t7) {
            return !n8(e15, t7);
          }) || t5.find(function(t7) {
            return !r10[0].includes(t7) && r10[1] !== t7 && n8(e15, t7);
          }));
        }(e14, u7[0]) ? n8(e14, e14.key) || f5.delete(o14) : u7.length > 1 ? f5.set(o14, u7.slice(1)) : (f5.delete(o14), i11(e14));
      }), c8 && clearTimeout(c8), c8 = setTimeout(f5.clear.bind(f5), u6));
    };
  }
  function i6(t7, e13, n11) {
    var r9;
    void 0 === n11 && (n11 = {});
    var i10 = null != (r9 = n11.event) ? r9 : "keydown", u6 = o10(e13, n11);
    return t7.addEventListener(i10, u6), function() {
      t7.removeEventListener(i10, u6);
    };
  }
  var tinykeys_module_default = i6;

  // ../../node_modules/@nordhealth/icons/lib/assets/arrow-right-small.js
  var arrow_right_small_exports = {};
  __export(arrow_right_small_exports, {
    default: () => arrow_right_small_default,
    tags: () => tags9,
    title: () => title9
  });
  var arrow_right_small_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M105 57.4 47.6 2.8a10.566 10.566 0 1 0-14.56 15.316l51.968 49.35a3.486 3.486 0 0 1 0 5.068l-51.968 49.35a10.502 10.502 0 0 0 14.462 15.232l57.638-54.74A17.584 17.584 0 0 0 105 57.4z"/></svg>';
  var title9 = "arrow-right-small";
  var tags9 = "nordicon arrow right small caret pointing triangle chevron";

  // ../../node_modules/@nordhealth/icons/lib/assets/arrow-left-small.js
  var arrow_left_small_exports = {};
  __export(arrow_left_small_exports, {
    default: () => arrow_left_small_default,
    tags: () => tags10,
    title: () => title10
  });
  var arrow_left_small_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M99.736 140a10.486 10.486 0 0 1-7.238-2.884L35 82.6a17.598 17.598 0 0 1-.14-24.976l57.638-54.74a10.502 10.502 0 1 1 14.462 15.232l-51.968 49.35a3.486 3.486 0 0 0 0 5.068l51.968 49.35A10.5 10.5 0 0 1 99.736 140z"/></svg>';
  var title10 = "arrow-left-small";
  var tags10 = "nordicon arrow left small caret pointing triangle chevron";

  // ../../node_modules/@nordhealth/icons/lib/assets/arrow-down-small.js
  var arrow_down_small_exports = {};
  __export(arrow_down_small_exports, {
    default: () => arrow_down_small_default,
    tags: () => tags11,
    title: () => title11
  });
  var arrow_down_small_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M70 110.236a17.332 17.332 0 0 1-12.306-5.096L2.884 47.502A10.502 10.502 0 1 1 18.116 33.04l49.35 51.968a3.486 3.486 0 0 0 5.068 0l49.35-51.968a10.502 10.502 0 1 1 15.232 14.462L82.6 105a17.766 17.766 0 0 1-12.6 5.236z"/></svg>';
  var title11 = "arrow-down-small";
  var tags11 = "nordicon arrow down small caret pointing triangle chevron";

  // src/common/controllers/SwipeController.ts
  var preventDefault = (e13) => e13.preventDefault();
  var SwipeController = class {
    constructor(host, options) {
      this.hadFirstUpdate = false;
      this.initialTouchX = 0;
      this.initialTouchY = 0;
      this.handleTouchStart = (event) => {
        const [{ pageX, pageY }] = event.changedTouches;
        this.initialTouchX = pageX;
        this.initialTouchY = pageY;
      };
      this.handleTouchEnd = (event) => {
        const [{ pageX, pageY }] = event.changedTouches;
        const { matchesGesture, onSwipeEnd } = this.options;
        const distX = pageX - this.initialTouchX;
        const distY = pageY - this.initialTouchY;
        const details = { initialX: this.initialTouchX, initialY: this.initialTouchY, pageX, pageY, distX, distY };
        if (matchesGesture(details)) {
          event.preventDefault();
          onSwipeEnd(details);
        }
      };
      host.addController(this);
      this.events = new EventController(host);
      this.options = __spreadValues({
        target: () => host
      }, options);
    }
    hostUpdated() {
      if (!this.hadFirstUpdate) {
        this.hadFirstUpdate = true;
        const target = this.options.target();
        this.events.listen(target, "touchstart", this.handleTouchStart);
        this.events.listen(target, "touchmove", preventDefault);
        this.events.listen(target, "touchend", this.handleTouchEnd);
      }
    }
    hostDisconnected() {
      this.hadFirstUpdate = false;
    }
  };
  var THRESHOLD = 70;
  var isHorizontalSwipe = ({ distX, distY }) => Math.abs(distX) >= THRESHOLD && Math.abs(distY) <= THRESHOLD;
  var isDownwardsSwipe = ({ distX, distY }) => Math.abs(distY) >= THRESHOLD && Math.abs(distX) <= THRESHOLD && distY > 0;

  // src/common/controllers/DirectionController.ts
  var _DirectionController = class {
    constructor(host) {
      this.host = host;
      this.host.addController(this);
    }
    get dir() {
      return document.documentElement.dir || "ltr";
    }
    get isLTR() {
      return this.dir === "ltr";
    }
    get isRTL() {
      return this.dir === "rtl";
    }
    hostConnected() {
      if (!_DirectionController.observer) {
        _DirectionController.observer = new MutationObserver(_DirectionController.observe);
        _DirectionController.observer.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
      }
      if (!_DirectionController.hosts.has(this.host)) {
        _DirectionController.hosts.add(this.host);
      }
    }
    hostDisconnected() {
      _DirectionController.hosts.delete(this.host);
    }
    static observe() {
      _DirectionController.hosts.forEach((host) => host.requestUpdate());
    }
  };
  var DirectionController = _DirectionController;
  DirectionController.hosts = /* @__PURE__ */ new Set();

  // src/command-menu/localization.ts
  var commandMenuLocalization = {
    instructions: "Press 'Enter' to confirm your input or 'Escape' to cancel",
    inputLabel: "Type the name of a command to run.",
    footerArrowKeys: "Navigate",
    footerEnterKey: "Select",
    footerEscapeKey: "Esc to dismiss",
    footerBackspaceKey: "Move to parent",
    noResults: (searchTerm) => `No results for \u201C${searchTerm}\u201D`,
    tip: "Search tips: some search terms require exact match. Try typing the entire command name, or use a different word or phrase."
  };
  var localization_default = commandMenuLocalization;

  // src/date-picker/localization.ts
  var datePickerLocalization = {
    modalHeading: "Choose a date",
    closeLabel: "Close window",
    buttonLabel: "Choose date",
    selectedDateMessage: "Selected date is"
  };
  var localization_default2 = datePickerLocalization;

  // src/calendar/localization.ts
  var calendarLocalization = {
    prevMonthLabel: "Previous month",
    nextMonthLabel: "Next month",
    monthSelectLabel: "Month",
    yearSelectLabel: "Year"
  };
  var localization_default3 = calendarLocalization;

  // src/modal/localization.ts
  var localization = {
    closeLabel: "Close dialog"
  };
  var localization_default4 = localization;

  // src/nav-toggle/localization.ts
  var localization2 = {
    label: "Toggle navigation"
  };
  var localization_default5 = localization2;

  // src/textarea/localization.ts
  var localization3 = {
    remainingCharacters: (remainder) => `Characters remaining: ${remainder}`
  };
  var localization_default6 = localization3;

  // src/localization/en-us.ts
  var en = {
    $lang: "en-US",
    $name: "English",
    $dir: "ltr",
    "kabal-command-menu": localization_default,
    "kabal-calendar": localization_default3,
    "kabal-date-picker": localization_default2,
    "kabal-modal": localization_default4,
    "kabal-nav-toggle": localization_default5,
    "kabal-textarea": localization_default6
  };
  var en_us_default = en;

  // src/localization/translation.ts
  var subscribers = /* @__PURE__ */ new Set();
  var translations = /* @__PURE__ */ new Map();
  function update() {
    for (const subscriber of subscribers) {
      subscriber();
    }
  }
  var observer = new MutationObserver(update);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
  });
  function subscribe(onChange) {
    subscribers.add(onChange);
    return () => subscribers.delete(onChange);
  }
  function resolveTranslation(langCode) {
    const lang = langCode.toLowerCase();
    const [langOnly] = lang.split("-");
    return translations.get(lang) || translations.get(langOnly) || en_us_default;
  }

  // src/localization/LocalizeController.ts
  var noop = () => {
  };
  var LocalizeController = class {
    constructor(host, options = { onLangChange: noop }) {
      this.host = host;
      this.options = options;
      this.handleLangChange = () => {
        const resolved = resolveTranslation(this.lang);
        if (this.resolvedTranslation !== resolved) {
          this.resolvedTranslation = resolved;
          this.options.onLangChange();
          this.host.requestUpdate();
        }
      };
      host.addController(this);
      this.resolvedTranslation = resolveTranslation(this.lang);
    }
    get lang() {
      return this.host.lang || document.documentElement.lang;
    }
    get resolvedLang() {
      return this.resolvedTranslation.$lang;
    }
    hostConnected() {
      this.unsubscribe = subscribe(this.handleLangChange);
      this.options.onLangChange();
    }
    hostDisconnected() {
      var _a;
      (_a = this.unsubscribe) == null ? void 0 : _a.call(this);
    }
    term(key, ...args) {
      const componentName = this.host.localName;
      const translation = this.resolvedTranslation[componentName];
      const t7 = translation[key];
      return typeof t7 === "function" ? t7(...args) : t7;
    }
  };

  // src/common/collection.ts
  function groupBy(array, key) {
    var _a;
    const grouped = /* @__PURE__ */ new Map();
    for (const item of array) {
      const value = item[key];
      const collection = (_a = grouped.get(value)) != null ? _a : [];
      if (!grouped.has(value)) {
        grouped.set(value, []);
      }
      collection.push(item);
      grouped.set(value, collection);
    }
    return grouped;
  }
  function chunk(array, chunkSize) {
    const result = [];
    for (let i10 = 0; i10 < array.length; i10 += chunkSize) {
      result.push(array.slice(i10, i10 + chunkSize));
    }
    return result;
  }
  function mapWithOffset(array, startingOffset, mapFn) {
    return array.map((_2, i10) => {
      const adjustedIndex = (i10 + startingOffset) % array.length;
      return mapFn(array[adjustedIndex], adjustedIndex);
    });
  }

  // src/common/number.ts
  function wrap(val, min, max) {
    if (val > max)
      return min;
    if (val < min)
      return max;
    return val;
  }
  function range(from, to) {
    const result = [];
    for (let i10 = from; i10 <= to; i10++) {
      result.push(i10);
    }
    return result;
  }
  function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  // src/common/dates.ts
  var ISO_DATE_FORMAT = /^(\d{4})-(\d{2})-(\d{2})$/;
  function createDate(year, month, day) {
    const dayInt = parseInt(day, 10);
    const monthInt = parseInt(month, 10);
    const yearInt = parseInt(year, 10);
    const isValid = Number.isInteger(yearInt) && Number.isInteger(monthInt) && Number.isInteger(dayInt) && monthInt > 0 && monthInt <= 12 && dayInt > 0 && dayInt <= 31 && yearInt > 0;
    if (isValid) {
      const date = new Date(yearInt, monthInt - 1, dayInt);
      date.setFullYear(yearInt);
      return date;
    }
    return void 0;
  }
  function parseISODate(value) {
    if (!value) {
      return void 0;
    }
    const matches = value.match(ISO_DATE_FORMAT);
    if (matches) {
      return createDate(matches[1], matches[2], matches[3]);
    }
    return void 0;
  }
  function printISODate(date) {
    if (!date) {
      return "";
    }
    const d5 = date.getDate().toString(10);
    const m5 = (date.getMonth() + 1).toString(10);
    const y4 = date.getFullYear().toString(10);
    return `${y4.padStart(4, "0")}-${m5.padStart(2, "0")}-${d5.padStart(2, "0")}`;
  }
  function today() {
    const date = new Date();
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0));
  }
  function getDayNames(locale, weekday) {
    const days = [];
    const options = { weekday };
    const day = today();
    for (let i10 = 0; i10 < 7; i10++) {
      days[day.getDay()] = day.toLocaleDateString(locale, options);
      day.setDate(day.getDate() + 1);
    }
    return days;
  }
  function getMonthNames(locale, month) {
    const months = [];
    const options = { month };
    const day = today();
    day.setDate(1);
    for (let i10 = 0; i10 < 12; i10++) {
      months[day.getMonth()] = day.toLocaleDateString(locale, options);
      day.setMonth(day.getMonth() + 1);
    }
    return months;
  }
  function isEqualMonth(a5, b4) {
    if (a5 == null || b4 == null) {
      return false;
    }
    return a5.getFullYear() === b4.getFullYear() && a5.getMonth() === b4.getMonth();
  }
  function isEqual(a5, b4) {
    if (a5 == null || b4 == null) {
      return false;
    }
    return isEqualMonth(a5, b4) && a5.getDate() === b4.getDate();
  }
  function addDays(date, days) {
    const d5 = new Date(date);
    d5.setDate(d5.getDate() + days);
    return d5;
  }
  function startOfWeek(date, firstDayOfWeek = 1 /* Monday */) {
    const d5 = new Date(date);
    const day = d5.getDay();
    const diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;
    d5.setDate(d5.getDate() - diff);
    return d5;
  }
  function endOfWeek(date, firstDayOfWeek = 1 /* Monday */) {
    const d5 = new Date(date);
    const day = d5.getDay();
    const diff = (day < firstDayOfWeek ? -7 : 0) + 6 - (day - firstDayOfWeek);
    d5.setDate(d5.getDate() + diff);
    return d5;
  }
  function startOfMonth(date) {
    const d5 = new Date(date.getFullYear(), date.getMonth(), 1);
    d5.setFullYear(date.getFullYear());
    return d5;
  }
  function endOfMonth(date) {
    const d5 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    d5.setFullYear(date.getFullYear());
    return d5;
  }
  function setMonth(date, month) {
    const d5 = new Date(date);
    d5.setMonth(month);
    return d5;
  }
  function setYear(date, year) {
    const d5 = new Date(date);
    d5.setFullYear(year);
    return d5;
  }
  function clamp2(date, min, max) {
    const time = date.getTime();
    if (min && min instanceof Date && time < min.getTime()) {
      return min;
    }
    if (max && max instanceof Date && time > max.getTime()) {
      return max;
    }
    return date;
  }
  function inRange(date, min, max) {
    return clamp2(date, min, max) === date;
  }
  function getDaysInRange(start, end) {
    const days = [];
    let current = start;
    while (!isEqual(current, end)) {
      days.push(current);
      current = addDays(current, 1);
    }
    days.push(current);
    return days;
  }
  function getViewOfMonth(date, firstDayOfWeek = 1 /* Monday */) {
    const start = startOfWeek(startOfMonth(date), firstDayOfWeek);
    const end = endOfWeek(endOfMonth(date), firstDayOfWeek);
    return getDaysInRange(start, end);
  }

  // src/common/events.ts
  var NordEvent = class extends Event {
    constructor(type, eventInitDict) {
      super(type, __spreadValues({
        bubbles: true,
        composed: true
      }, eventInitDict));
    }
  };

  // src/calendar/DateSelectEvent.ts
  var DateSelectEvent = class extends NordEvent {
    constructor(name, date) {
      super(name);
      this.date = date;
    }
  };

  // src/calendar/Calendar.scss
  var styles10 = i`:host {
  --_n-calendar-box-shadow: var(--n-calendar-box-shadow, var(--n-box-shadow-popout));
  --_n-calendar-border-radius: var(--n-calendar-border-radius, var(--n-border-radius-s));
  --_n-calendar-highlight-color: var(--n-calendar-highlight-color, var(--n-color-accent));
  --_n-calendar-padding: var(--n-space-m) var(--n-space-m) calc(var(--n-space-m) * 1.25);
  --_n-calendar-inline-size: max-content;
  font-feature-settings: var(--n-font-features-reduced);
}

.n-calendar {
  -webkit-user-select: none;
  user-select: none;
  background: var(--n-color-surface);
  box-shadow: var(--_n-calendar-box-shadow);
  border-radius: var(--_n-calendar-border-radius);
  inline-size: var(--_n-calendar-inline-size);
  min-inline-size: min-content;
  padding: var(--_n-calendar-padding);
}

:host([expand]) {
  --_n-calendar-inline-size: 100% ;
}

.n-calendar-table {
  border-collapse: collapse;
  border-spacing: 0;
  color: var(--n-color-text);
  font-size: var(--n-font-size-m);
  font-weight: var(--n-font-weight);
  text-align: center;
  inline-size: 100%;
}

.n-calendar-table-header {
  font-size: var(--n-font-size-s);
  font-weight: var(--n-font-weight-active);
  letter-spacing: 1px;
  padding-block-end: var(--n-space-s);
  text-decoration: none;
  text-transform: uppercase;
}

.n-calendar-cell {
  text-align: center;
  padding: 1px;
}

.n-calendar-day {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: 0 0;
  border: 0;
  border-radius: var(--n-border-radius-s);
  color: var(--n-color-text);
  cursor: pointer;
  display: inline-block;
  font-family: var(--n-font-family);
  font-size: var(--n-font-size-m);
  font-weight: var(--n-font-weight);
  font-variant-numeric: tabular-nums;
  block-size: var(--n-space-xl);
  inline-size: var(--n-space-xl);
  padding: 0 0 1px;
  position: relative;
  text-align: center;
  vertical-align: middle;
}

.n-calendar-day[aria-current=date] {
  box-shadow: 0 0 0 1px var(--n-color-accent);
  color: var(--n-color-text-link);
  position: relative;
}

.n-calendar-day:hover {
  background: var(--n-color-active);
}

.n-calendar-day:focus,
.n-calendar-day[aria-pressed=true] {
  background: var(--n-color-accent);
  box-shadow: none;
  color: var(--n-color-text-on-accent);
  outline: 0;
}

.n-calendar-day:active {
  background: var(--n-color-accent);
  box-shadow: none !important;
  color: var(--n-color-text-on-accent);
}

.n-calendar-day:focus {
  box-shadow: 0 0 5px var(--n-color-accent);
}

.n-calendar-day:not(.is-month) {
  box-shadow: none;
}

.n-calendar-day:not(.is-month),
.n-calendar-day[aria-disabled=true] {
  background: 0 0;
  color: var(--n-color-text-weakest);
  cursor: default;
}

.n-calendar-day[aria-disabled=true] {
  color: var(--n-color-text-weaker);
  text-decoration: line-through;
}

.n-calendar-day:not(.is-month)[aria-disabled=true] {
  color: var(--n-color-text-weakest);
  text-decoration: none;
}

.n-calendar-day[aria-disabled=true][aria-current=date] {
  box-shadow: 0 0 0 1px var(--n-color-accent);
  color: var(--n-color-text-link);
}

.n-calendar-day[aria-disabled=true][aria-current=date]:focus {
  box-shadow: 0 0 5px var(--n-color-accent);
  background: var(--n-color-accent);
  color: var(--n-color-text-on-accent);
}

.n-calendar-day[aria-disabled=true]:not([aria-current=date])::before {
  display: none;
}

.n-calendar-day.is-outside {
  background: 0 0;
  box-shadow: none;
  color: var(--n-color-text-weakest);
  cursor: default;
  pointer-events: none;
}

.n-calendar-day.is-outside::before {
  display: none;
}

.n-calendar-day.is-highlighted::after {
  --_n-calendar-highlight-size: 5px;
  content: "";
  position: absolute;
  inset-inline-start: calc(50% - var(--_n-calendar-highlight-size) / 2);
  inset-block-end: calc(var(--n-space-s) / 2);
  block-size: var(--_n-calendar-highlight-size);
  inline-size: var(--_n-calendar-highlight-size);
  border-radius: var(--n-border-radius-circle);
  background-color: var(--_n-calendar-highlight-color);
}

.n-calendar-day.is-highlighted.is-month:is([aria-pressed=true], :focus):not([aria-disabled=true])::after {
  background-color: var(--n-color-text-on-accent);
}

.n-calendar-day.is-highlighted:is(:not(.is-month), .is-outside, [aria-disabled=true])::after {
  background-color: var(--n-color-text-weakest);
}

.n-calendar-header {
  align-items: start;
  display: flex;
  justify-content: space-between;
  margin-block-end: var(--n-space-m);
  inline-size: 100%;
}

.n-calendar-nav {
  white-space: nowrap;
}

.n-calendar-nav kabal-button {
  --_n-button-padding-inline: 11px;
  margin-inline-start: calc(var(--n-space-s) / 2);
}

.n-calendar-select {
  display: inline-flex;
  margin-block-start: calc(var(--n-space-s) / 2);
  position: relative;
  line-height: var(--n-line-height);
}

.n-calendar-select span {
  margin-inline-end: var(--n-space-s);
}

.n-calendar-select select {
  cursor: pointer;
  font-size: var(--n-font-size-l);
  block-size: 100%;
  inset-inline-start: 0;
  opacity: 0;
  position: absolute;
  inset-block-start: 0;
  inline-size: 100%;
}

.n-calendar-select select:focus + .n-calendar-select-label {
  box-shadow: 0 0 0 2px var(--n-color-accent);
}

.n-calendar-select-label {
  display: flex;
  align-items: center;
  border-radius: var(--n-border-radius-s);
  color: var(--n-color-text);
  font-size: var(--n-font-size-xl);
  font-weight: var(--n-font-weight-active);
  padding-block: 0;
  padding-inline-start: var(--n-space-s);
  padding-inline-end: calc(var(--n-space-s) / 2);
  pointer-events: none;
  position: relative;
  inline-size: 100%;
}`;
  var Calendar_default = styles10;

  // src/calendar/Calendar.ts
  Icon.registerIcon(arrow_right_small_exports);
  Icon.registerIcon(arrow_left_small_exports);
  Icon.registerIcon(arrow_down_small_exports);
  var preventDefault2 = (fn) => (e13) => {
    e13.preventDefault();
    fn(e13);
  };
  var isDateDisabled = () => false;
  var isDateHighlighted = () => false;
  var dialogLabelId = "dialog-header";
  var Calendar = class extends s4 {
    constructor() {
      super(...arguments);
      this.direction = new DirectionController(this);
      this.swipe = new SwipeController(this, {
        matchesGesture: isHorizontalSwipe,
        onSwipeEnd: ({ distX }) => this.addMonths(distX < 0 ? 1 : -1)
      });
      this.shortcuts = o10({
        ArrowRight: preventDefault2(() => this.addDays(this.direction.isLTR ? 1 : -1)),
        ArrowLeft: preventDefault2(() => this.addDays(this.direction.isLTR ? -1 : 1)),
        ArrowDown: preventDefault2(() => this.addDays(7)),
        ArrowUp: preventDefault2(() => this.addDays(-7)),
        Home: preventDefault2(() => this.startOfWeek()),
        End: preventDefault2(() => this.endOfWeek()),
        PageUp: preventDefault2(() => this.addMonths(-1)),
        PageDown: preventDefault2(() => this.addMonths(1)),
        "Shift+PageUp": preventDefault2(() => this.addYears(-1)),
        "Shift+PageDown": preventDefault2(() => this.addYears(1))
      });
      this.localize = new LocalizeController(this, {
        onLangChange: () => this.handleLangChange()
      });
      this.value = "";
      this.firstDayOfWeek = 1 /* Monday */;
      this.min = "";
      this.max = "";
      this.expand = false;
      this.isDateDisabled = isDateDisabled;
      this.isDateHighlighted = isDateHighlighted;
      this.activeFocus = false;
      this.focusedDay = new Date();
      this.handleDaySelect = (day) => {
        const isInRange = inRange(day, parseISODate(this.min), parseISODate(this.max));
        const isAllowed = !this.isDateDisabled(day);
        if (isInRange && isAllowed) {
          this.value = printISODate(day);
          this.dispatchEvent(new DateSelectEvent("change", day));
        }
      };
      this.handleMonthSelect = (e13) => {
        this.setMonth(parseInt(e13.target.value, 10));
      };
      this.handleYearSelect = (e13) => {
        this.setYear(parseInt(e13.target.value, 10));
      };
      this.handleNextMonthClick = (event) => {
        event.preventDefault();
        this.addMonths(1);
      };
      this.handlePreviousMonthClick = (event) => {
        event.preventDefault();
        this.addMonths(-1);
      };
      this.enableActiveFocus = () => {
        this.activeFocus = true;
      };
      this.disableActiveFocus = (e13) => {
        const table = e13.currentTarget;
        const relatedTarget = e13.relatedTarget;
        if (relatedTarget && !table.contains(relatedTarget)) {
          this.activeFocus = false;
        }
      };
    }
    focus(options) {
      var _a;
      const target = (_a = options == null ? void 0 : options.target) != null ? _a : "day";
      if (target === "day") {
        this.focusedDayNode.focus();
      } else if (target === "month") {
        this.monthSelectNode.focus();
      }
    }
    render() {
      const today2 = new Date();
      const valueAsDate = parseISODate(this.value);
      const focusedMonth = this.focusedDay.getMonth();
      const focusedYear = this.focusedDay.getFullYear();
      const minDate = parseISODate(this.min);
      const maxDate = parseISODate(this.max);
      const minDateStartOfMonth = minDate ? startOfMonth(minDate) : void 0;
      const maxDateEndOfMonth = maxDate ? endOfMonth(maxDate) : void 0;
      const selectedYear = (valueAsDate || this.focusedDay).getFullYear();
      const minYear = minDate ? minDate.getFullYear() : selectedYear - 10;
      const maxYear = maxDate ? maxDate.getFullYear() : selectedYear + 10;
      return y`
      <div class="n-calendar">
        <div class="n-calendar-header">
          <div>
            <kabal-visually-hidden>
              <h2 id=${dialogLabelId} aria-live="polite" aria-atomic="true">
                ${this.monthNames[focusedMonth]}, ${this.focusedDay.getFullYear()}
              </h2>
            </kabal-visually-hidden>

            <div class="n-calendar-select">
              <select
                aria-label=${this.localize.term("monthSelectLabel")}
                class="n-calendar-select-month"
                @input=${this.handleMonthSelect}
              >
                ${this.monthNames.map(
        (month, i10) => y`
                      <option
                        value=${i10}
                        ?selected=${i10 === focusedMonth}
                        ?disabled=${!inRange(new Date(focusedYear, i10, 1), minDateStartOfMonth, maxDateEndOfMonth)}
                      >
                        ${month}
                      </option>
                    `
      )}
              </select>
              <div class="n-calendar-select-label" aria-hidden="true">
                <span>${this.monthNamesShort[focusedMonth]}</span>
                <kabal-icon color="var(--n-color-icon)" name="arrow-down-small" size="xxs"></kabal-icon>
              </div>
            </div>

            <div class="n-calendar-select">
              <select
                aria-label=${this.localize.term("yearSelectLabel")}
                class="n-calendar-select-year"
                @input=${this.handleYearSelect}
              >
                ${c5(
        range(minYear, maxYear),
        (year) => year,
        (year) => y`<option ?selected=${year === focusedYear}>${year}</option>`
      )}
              </select>
              <div class="n-calendar-select-label" aria-hidden="true">
                <span>${this.focusedDay.getFullYear()}</span>
                <kabal-icon color="var(--n-color-icon)" name="arrow-down-small" size="xxs"></kabal-icon>
              </div>
            </div>
          </div>

          <div class="n-calendar-nav">
            <kabal-button
              class="n-calendar-prev"
              @click=${this.handlePreviousMonthClick}
              ?disabled=${isEqualMonth(minDate, this.focusedDay)}
              type="button"
            >
              <kabal-visually-hidden>${this.localize.term("prevMonthLabel")}</kabal-visually-hidden>
              <kabal-icon name=${this.direction.isLTR ? "arrow-left-small" : "arrow-right-small"} size="s"></kabal-icon>
            </kabal-button>

            <kabal-button
              class="n-calendar-next"
              @click=${this.handleNextMonthClick}
              ?disabled=${isEqualMonth(maxDate, this.focusedDay)}
              type="button"
            >
              <kabal-visually-hidden>${this.localize.term("nextMonthLabel")}</kabal-visually-hidden>
              <kabal-icon name=${this.direction.isLTR ? "arrow-right-small" : "arrow-left-small"} size="s"></kabal-icon>
            </kabal-button>
          </div>
        </div>

        <table
          class="n-calendar-table"
          aria-labelledby=${dialogLabelId}
          @focusin=${this.enableActiveFocus}
          @focusout=${this.disableActiveFocus}
        >
          <thead>
            <tr>
              ${mapWithOffset(
        this.dayNames,
        this.firstDayOfWeek,
        (dayName, i10) => y`
                    <th class="n-calendar-table-header" scope="col">
                      <span aria-hidden="true">${this.dayNamesShort[i10]}</span>
                      <kabal-visually-hidden>${dayName}</kabal-visually-hidden>
                    </th>
                  `
      )}
            </tr>
          </thead>
          <tbody>
            ${chunk(getViewOfMonth(this.focusedDay, this.firstDayOfWeek), 7).map(
        (week) => y`
                  <tr class="n-calendar-row">
                    ${week.map((day) => {
          const outsideRange = !inRange(day, minDate, maxDate);
          const isToday = isEqual(day, today2);
          const isDisabled = this.isDateDisabled(day);
          const isSelected = isEqual(day, valueAsDate);
          const isInMonth = isEqualMonth(day, this.focusedDay);
          const isHighlighted = this.isDateHighlighted(day);
          const formattedDate = this.dateFormatShort.format(day);
          const accessibleLabel = isHighlighted && typeof isHighlighted === "string" ? `${formattedDate}, ${isHighlighted}` : formattedDate;
          return y`
                        <td class="n-calendar-cell">
                          <button
                            type="button"
                            tabindex=${isEqual(day, this.focusedDay) ? 0 : -1}
                            class=${o9({
            "n-calendar-day": true,
            "is-outside": outsideRange,
            "is-month": isInMonth,
            "is-highlighted": isHighlighted
          })}
                            @click=${() => this.handleDaySelect(day)}
                            @keydown=${this.shortcuts}
                            ?disabled=${outsideRange}
                            aria-disabled=${cond(isDisabled, "true")}
                            aria-pressed=${isSelected ? "true" : "false"}
                            aria-current=${cond(isToday, "date")}
                            aria-label=${accessibleLabel}
                          >
                            <span aria-hidden="true">${day.getDate()}</span>
                          </button>
                        </td>
                      `;
        })}
                  </tr>
                `
      )}
          </tbody>
        </table>
      </div>
    `;
    }
    handleValueChange() {
      this.setFocusedDay(parseISODate(this.value) || new Date());
    }
    handleFocusedDayChange() {
      if (this.activeFocus) {
        this.focusedDayNode.focus();
      }
    }
    handleLangChange() {
      const lang = this.localize.resolvedLang;
      this.dateFormatShort = new Intl.DateTimeFormat(lang, { day: "numeric", month: "long" });
      this.monthNames = getMonthNames(lang, "long");
      this.monthNamesShort = getMonthNames(lang, "short");
      this.dayNames = getDayNames(lang, "long");
      this.dayNamesShort = getDayNames(lang, "narrow");
    }
    addDays(days) {
      this.setFocusedDay(addDays(this.focusedDay, days));
    }
    addMonths(months) {
      this.setMonth(this.focusedDay.getMonth() + months);
    }
    addYears(years) {
      this.setYear(this.focusedDay.getFullYear() + years);
    }
    startOfWeek() {
      this.setFocusedDay(startOfWeek(this.focusedDay, this.firstDayOfWeek));
    }
    endOfWeek() {
      this.setFocusedDay(endOfWeek(this.focusedDay, this.firstDayOfWeek));
    }
    setMonth(month) {
      const min = setMonth(startOfMonth(this.focusedDay), month);
      const max = endOfMonth(min);
      const date = setMonth(this.focusedDay, month);
      this.setFocusedDay(clamp2(date, min, max));
    }
    setYear(year) {
      const min = setYear(startOfMonth(this.focusedDay), year);
      const max = endOfMonth(min);
      const date = setYear(this.focusedDay, year);
      this.setFocusedDay(clamp2(date, min, max));
    }
    setFocusedDay(day) {
      this.focusedDay = clamp2(day, parseISODate(this.min), parseISODate(this.max));
      this.dispatchEvent(new DateSelectEvent("kabal-focus-date", this.focusedDay));
    }
  };
  Calendar.styles = [Component_default, Calendar_default];
  __decorateClass([
    i4(".n-calendar-select-month", true)
  ], Calendar.prototype, "monthSelectNode", 2);
  __decorateClass([
    i4(`button[tabindex="0"]`)
  ], Calendar.prototype, "focusedDayNode", 2);
  __decorateClass([
    e5()
  ], Calendar.prototype, "value", 2);
  __decorateClass([
    e5({ type: Number })
  ], Calendar.prototype, "firstDayOfWeek", 2);
  __decorateClass([
    e5()
  ], Calendar.prototype, "min", 2);
  __decorateClass([
    e5()
  ], Calendar.prototype, "max", 2);
  __decorateClass([
    e5({ reflect: true, type: Boolean })
  ], Calendar.prototype, "expand", 2);
  __decorateClass([
    e5({ attribute: false })
  ], Calendar.prototype, "isDateDisabled", 2);
  __decorateClass([
    e5({ attribute: false })
  ], Calendar.prototype, "isDateHighlighted", 2);
  __decorateClass([
    t3()
  ], Calendar.prototype, "activeFocus", 2);
  __decorateClass([
    t3()
  ], Calendar.prototype, "focusedDay", 2);
  __decorateClass([
    observe("value")
  ], Calendar.prototype, "handleValueChange", 1);
  __decorateClass([
    observe("focusedDay", "updated")
  ], Calendar.prototype, "handleFocusedDayChange", 1);
  Calendar = __decorateClass([
    e4("kabal-calendar")
  ], Calendar);

  // src/card/Card.scss
  var styles11 = i`:host {
  --_n-card-padding: var(--n-card-padding, var(--n-space-m));
  --_n-card-slot-padding: var(--n-card-slot-padding, var(--n-space-m));
  --_n-card-box-shadow: var(--n-card-box-shadow, var(--n-box-shadow-card));
  --_n-card-border-radius: var(--n-card-border-radius, var(--n-border-radius));
  color: var(--n-color-text);
  display: block;
  inline-size: 100%;
}

.n-card {
  background: var(--n-color-surface);
  border-radius: var(--_n-card-border-radius);
  box-shadow: var(--_n-card-box-shadow);
  block-size: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  border-block-end: 1px solid var(--n-color-border);
  padding: var(--n-space-m) var(--_n-card-slot-padding);
  display: flex;
  gap: var(--n-space-s);
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

:host([padding=l]) {
  --_n-card-padding: var(--n-card-padding, var(--n-space-l));
  --_n-card-slot-padding: var(--n-card-slot-padding, var(--n-space-l)) ;
}

:host([padding=none]) {
  --_n-card-padding: var(--n-card-padding, 0) ;
}

slot {
  display: block;
}

slot:not([name]) {
  padding: var(--_n-card-padding);
  flex: 1;
}

slot[name=footer] {
  padding: var(--_n-card-slot-padding);
  padding-block-start: 0;
  white-space: nowrap;
}

::slotted([slot=header-end]) {
  --n-stack-gap: var(--n-space-s);
  display: flex;
  gap: var(--n-stack-gap);
  align-items: center;
  flex-wrap: wrap;
}

::slotted([slot=header]) {
  font-size: var(--n-font-size-m);
  font-weight: var(--n-font-weight-heading);
  margin: 0;
}

::slotted(a) {
  color: var(--n-color-text-link);
  text-decoration: underline;
}

::slotted(a:hover) {
  text-decoration: none;
}`;
  var Card_default = styles11;

  // src/card/Card.ts
  var Card = class extends s4 {
    constructor() {
      super(...arguments);
      this.headerSlot = new SlotController(this, "header");
      this.headerEndSlot = new SlotController(this, "header-end");
      this.footerSlot = new SlotController(this, "footer");
      this.padding = "m";
    }
    render() {
      return y`
      <div class="n-card">
        <div class="header" ?hidden=${this.headerSlot.isEmpty && this.headerEndSlot.isEmpty}>
          <slot name=${this.headerSlot.slotName}></slot>
          <slot name=${this.headerEndSlot.slotName}></slot>
        </div>
        <slot></slot>
        <slot name=${this.footerSlot.slotName} ?hidden=${this.footerSlot.isEmpty}></slot>
      </div>
    `;
    }
  };
  Card.styles = [Component_default, Card_default];
  __decorateClass([
    e5({ reflect: true })
  ], Card.prototype, "padding", 2);
  Card = __decorateClass([
    e4("kabal-card")
  ], Card);

  // ../../node_modules/@nordhealth/icons/lib/assets/interface-checked-small.js
  var interface_checked_small_exports = {};
  __export(interface_checked_small_exports, {
    default: () => interface_checked_small_default,
    tags: () => tags12,
    title: () => title12
  });
  var interface_checked_small_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M41.86 131.25a23.982 23.982 0 0 1-18.494-8.666L2.254 95.746a10.5 10.5 0 1 1 16.492-12.992l21 26.6a2.24 2.24 0 0 0 2.212.882 3.038 3.038 0 0 0 2.38-1.148l76.958-96.39a10.5 10.5 0 1 1 16.408 13.104L60.606 122.29A24.038 24.038 0 0 1 42 131.25z"/></svg>';
  var title12 = "interface-checked-small";
  var tags12 = "nordicon interface checked small symbol checkmark done ready";

  // ../../node_modules/@nordhealth/icons/lib/assets/interface-remove-small.js
  var interface_remove_small_exports = {};
  __export(interface_remove_small_exports, {
    default: () => interface_remove_small_default,
    tags: () => tags13,
    title: () => title13
  });
  var interface_remove_small_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M129.5 80.5h-119a10.5 10.5 0 0 1 0-21h119a10.5 10.5 0 0 1 0 21z"/></svg>';
  var title13 = "interface-remove-small";
  var tags13 = "nordicon interface remove small delete erase minimize line";

  // src/common/controllers/FormDataController.ts
  var FormDataController = class {
    constructor(host, options) {
      this.host = host;
      this.options = options;
      this.handleFormData = (e13) => {
        const { disabled, name } = this.host;
        if (disabled) {
          return;
        }
        const value = this.options.value();
        if (name && value != null) {
          e13.formData.append(name, value);
        }
      };
      host.addController(this);
      this.events = new EventController(host);
    }
    hostConnected() {
      if (this.host.form) {
        this.events.listen(this.host.form, "formdata", this.handleFormData);
      }
    }
  };

  // src/common/mixins/FormAssociatedMixin.ts
  function FormAssociatedMixin(superClass) {
    class FormAssociatedElement extends superClass {
      constructor() {
        super(...arguments);
        this.labelSlot = new SlotController(this, "label");
        this.errorSlot = new SlotController(this, "error");
        this.hintSlot = new SlotController(this, "hint");
        this.formData = new FormDataController(this, { value: () => this.formValue });
        this.inputId = "input";
        this.errorId = "error";
        this.hintId = "hint";
        this.label = "";
        this.hideLabel = false;
        this.required = false;
        this.hideRequired = false;
      }
      get formValue() {
        return this.value;
      }
      handleInput(e13) {
        e13.stopPropagation();
        const target = e13.target;
        this.value = target.value;
        this.dispatchEvent(new NordEvent("input"));
      }
      handleChange(e13) {
        e13.stopPropagation();
        this.dispatchEvent(new NordEvent("change"));
      }
      renderLabel(additionalContent) {
        const label = y`
        <label for=${this.inputId}>
          <slot name="label">${this.label}</slot
          ><span ?hidden=${!this.required || this.hideRequired} aria-hidden="true" class="n-required">*</span>
          ${additionalContent}
        </label>

        <div class="n-caption n-hint" id=${this.hintId} ?hidden=${!this.hasHint}>
          <slot name="hint">${this.hint}</slot>
        </div>
      `;
        return this.hideLabel ? y`<kabal-visually-hidden>${label}</kabal-visually-hidden>` : y`<div class="n-label-container">${label}</div>`;
      }
      renderError() {
        return y`
        <div class="n-caption n-error" id=${this.errorId} role="alert" ?hidden=${!this.hasError}>
          <slot name="error">${this.error}</slot>
        </div>
      `;
      }
      getDescribedBy() {
        const { hasHint, hasError } = this;
        if (hasHint && hasError) {
          return `${this.hintId} ${this.errorId}`;
        }
        if (hasHint) {
          return this.hintId;
        }
        if (hasError) {
          return this.errorId;
        }
        return void 0;
      }
      getInvalid() {
        return this.hasError ? "true" : void 0;
      }
      get hasHint() {
        return Boolean(this.hint) || this.hintSlot.hasContent;
      }
      get hasError() {
        return Boolean(this.error) || this.errorSlot.hasContent;
      }
    }
    __decorateClass([
      e5()
    ], FormAssociatedElement.prototype, "label", 2);
    __decorateClass([
      e5()
    ], FormAssociatedElement.prototype, "hint", 2);
    __decorateClass([
      e5({ type: Boolean, attribute: "hide-label" })
    ], FormAssociatedElement.prototype, "hideLabel", 2);
    __decorateClass([
      e5()
    ], FormAssociatedElement.prototype, "placeholder", 2);
    __decorateClass([
      e5()
    ], FormAssociatedElement.prototype, "error", 2);
    __decorateClass([
      e5({ type: Boolean })
    ], FormAssociatedElement.prototype, "required", 2);
    __decorateClass([
      e5({ type: Boolean, attribute: "hide-required" })
    ], FormAssociatedElement.prototype, "hideRequired", 2);
    return FormAssociatedElement;
  }

  // src/common/mixins/SizeMixin.ts
  function SizeMixin(superClass) {
    class SizeElement extends superClass {
      constructor() {
        super(...arguments);
        this.size = "m";
      }
    }
    __decorateClass([
      e5({ reflect: true })
    ], SizeElement.prototype, "size", 2);
    return SizeElement;
  }

  // src/common/styles/FormField.scss
  var styles12 = i`.n-caption,
::slotted(.n-caption) {
  font-size: var(--n-font-size-s);
  line-height: var(--n-line-height-caption);
}

.n-label-container {
  margin-block-end: var(--n-space-s);
  display: inline-block;
}

.n-label,
::slotted(label),
label {
  display: block !important;
  color: var(--n-color-text);
  font-family: var(--n-font-family);
  font-size: var(--n-font-size-m);
  font-weight: var(--n-font-weight-heading) !important;
  line-height: var(--n-line-height-heading);
  margin: 0 !important;
}

.n-hint {
  padding-block-start: calc(var(--n-space-s) / 2);
  color: var(--n-color-text-weaker);
}

.n-error {
  margin-block-start: var(--n-space-s);
  color: var(--n-color-text-error);
}

.n-required {
  color: var(--n-color-status-danger);
  margin-inline-start: calc(var(--n-space-s) / 2);
}`;
  var FormField_default = styles12;

  // src/checkbox/Checkbox.scss
  var styles13 = i`:host {
  --_n-checkbox-size: calc(var(--n-space-m) * 1.25);
  --_n-checkbox-accent-color: var(--n-color-accent);
  --_n-checkbox-border-color: var(--n-color-border-hover);
  --_n-checkbox-icon-size: var(--n-size-icon-s);
  display: inline-block;
}

.n-flex {
  display: flex;
}

.n-expand {
  flex: 1;
}

.n-input-container {
  position: relative;
}

input {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid var(--_n-checkbox-border-color);
  border-radius: var(--n-border-radius-s);
  display: block;
  inline-size: var(--_n-checkbox-size);
  block-size: var(--_n-checkbox-size);
  cursor: pointer;
}

input:checked,
input:indeterminate {
  --_n-checkbox-border-color: var(--n-color-accent);
  background: var(--_n-checkbox-accent-color);
}

input[aria-invalid] {
  --_n-checkbox-accent-color: var(--n-color-status-danger);
  --_n-checkbox-border-color: var(--_n-checkbox-accent-color) ;
}

input:focus-visible {
  outline: 0 !important;
}

input:focus {
  outline: 0 !important;
  box-shadow: 0 0 0 1px var(--n-color-surface), 0 0 0 3px var(--n-color-accent);
}

input:active {
  opacity: 0.8;
}

:host([disabled]) label {
  color: var(--n-color-text-weaker);
  cursor: default;
}

:host([disabled]) input {
  --_n-checkbox-accent-color: var(--n-color-border-strong);
  --_n-checkbox-border-color: var(--_n-checkbox-accent-color);
  background: var(--_n-checkbox-accent-color);
  cursor: default;
  opacity: 1;
}

kabal-icon {
  --_n-icon-size: var(--_n-checkbox-icon-size);
  display: none;
  position: absolute;
  color: var(--n-color-text-on-accent);
  inset: calc(var(--n-space-s) / 2);
  z-index: var(--n-index-default);
  pointer-events: none;
}

input:checked ~ .icon-checked,
input:indeterminate ~ .icon-indeterminate {
  display: block;
}

.n-label-container {
  margin-block-end: 0;
}

label {
  -webkit-user-select: none;
  user-select: none;
  font-weight: var(--n-font-weight) !important;
  line-height: var(--n-line-height-form);
  padding-inline-start: var(--n-space-s);
  cursor: pointer;
}

.n-hint {
  padding-inline-start: var(--n-space-s);
}

.n-error {
  margin-block-start: calc(var(--n-space-s) / 2);
  padding-inline-start: var(--n-space-s);
}

:host([size=s]) {
  --_n-checkbox-size: var(--n-space-m);
  --_n-checkbox-icon-size: var(--n-size-icon-xs) ;
}

:host([size=s]) kabal-icon {
  inset: calc(var(--n-space-s) / 2.6);
}

:host([size=s]:not([hide-label])) .n-input-container {
  margin: calc(var(--n-space-s) / 2.6) 0;
}

:host([size=l]) {
  --_n-checkbox-size: var(--n-space-l);
  --_n-checkbox-icon-size: var(--n-size-icon-m) ;
}`;
  var Checkbox_default = styles13;

  // src/checkbox/Checkbox.ts
  Icon.registerIcon(interface_checked_small_exports);
  Icon.registerIcon(interface_remove_small_exports);
  var Checkbox = class extends SizeMixin(FormAssociatedMixin(InputMixin(FocusableMixin(s4)))) {
    constructor() {
      super(...arguments);
      this.indeterminate = false;
      this.checked = false;
    }
    get formValue() {
      return this.checked ? this.value || "on" : void 0;
    }
    render() {
      return y`
      <div class="n-flex">
        <div class="n-input-container">
          <input
            ${n7(this.focusableRef)}
            class="n-input"
            id=${this.inputId}
            type="checkbox"
            name=${l5(this.name)}
            .value=${this.value}
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-describedby=${l5(this.getDescribedBy())}
            aria-invalid=${l5(this.getInvalid())}
            @change=${this.handleChange}
          />
          <kabal-icon class="icon-checked" name="interface-checked-small"></kabal-icon>
          <kabal-icon class="icon-indeterminate" name="interface-remove-small"></kabal-icon>
        </div>
        <div class="n-expand">${this.renderLabel()} ${this.renderError()}</div>
      </div>
    `;
    }
    handleChange(e13) {
      const target = e13.target;
      this.checked = target.checked;
      super.handleChange(e13);
    }
  };
  Checkbox.styles = [Component_default, FormField_default, Checkbox_default];
  __decorateClass([
    e5({ type: Boolean })
  ], Checkbox.prototype, "indeterminate", 2);
  __decorateClass([
    e5({ type: Boolean })
  ], Checkbox.prototype, "checked", 2);
  Checkbox = __decorateClass([
    e4("kabal-checkbox")
  ], Checkbox);

  // ../../node_modules/@nordhealth/icons/lib/assets/keyboard-arrow-up-down.js
  var keyboard_arrow_up_down_exports = {};
  __export(keyboard_arrow_up_down_exports, {
    default: () => keyboard_arrow_up_down_default,
    tags: () => tags14,
    title: () => title14
  });
  var keyboard_arrow_up_down_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path d="M105.833 24v93m0-93L80 49.833M105.833 24l25.834 25.833M34.167 117V24m0 93L60 91.167M34.167 117 8.333 91.167" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var title14 = "keyboard-arrow-up-down";
  var tags14 = "nordicon keyboard keys arrow up down shortcut";

  // ../../node_modules/@nordhealth/icons/lib/assets/keyboard-return.js
  var keyboard_return_exports = {};
  __export(keyboard_return_exports, {
    default: () => keyboard_return_default,
    tags: () => tags15,
    title: () => title15
  });
  var keyboard_return_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"><path d="M35 133 7 105l28-28"/><path d="M7 105h112a14 14 0 0 0 14-14V21a14 14 0 0 0-14-14H77"/></g></svg>';
  var title15 = "keyboard-return";
  var tags15 = "nordicon keyboard return key shortcut";

  // ../../node_modules/@nordhealth/icons/lib/assets/keyboard-backspace.js
  var keyboard_backspace_exports = {};
  __export(keyboard_backspace_exports, {
    default: () => keyboard_backspace_default,
    tags: () => tags16,
    title: () => title16
  });
  var keyboard_backspace_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M6.707 4.879A3 3 0 0 1 8.828 4H15a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H8.828a3 3 0 0 1-2.12-.879l-4.415-4.414a1 1 0 0 1 0-1.414l4.414-4.414zm4 2.414a1 1 0 0 0-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 1 0 1.414 1.414L12 11.414l1.293 1.293a1 1 0 0 0 1.414-1.414L13.414 10l1.293-1.293a1 1 0 0 0-1.414-1.414L12 8.586l-1.293-1.293z" clip-rule="evenodd"/></svg>';
  var title16 = "keyboard-backspace";
  var tags16 = "nordicon keyboard backspace back delete key shortcut";

  // src/common/focus.ts
  function getFocusedElement(root) {
    var _a;
    if ((_a = root.activeElement) == null ? void 0 : _a.shadowRoot) {
      return getFocusedElement(root.activeElement.shadowRoot);
    }
    return root.activeElement || void 0;
  }

  // src/common/controllers/ShortcutController.ts
  var ARROW_RE = /Arrow(Up|Down|Left|Right)/g;
  var ESC_RE = /Escape/g;
  function normalise(shortcuts) {
    const normalised = {};
    Object.keys(shortcuts).forEach((keybinding) => {
      normalised[keybinding] = shortcuts[keybinding];
      if (ARROW_RE.test(keybinding)) {
        const mapped = keybinding.replace(ARROW_RE, (_match, capture) => capture);
        normalised[mapped] = normalised[keybinding];
      }
      if (ESC_RE.test(keybinding)) {
        const mapped = keybinding.replace(ESC_RE, () => "Esc");
        normalised[mapped] = normalised[keybinding];
      }
    });
    return normalised;
  }
  var ShortcutController = class {
    constructor(host, shortcuts, target = window) {
      this.shortcuts = shortcuts;
      this.target = target;
      host.addController(this);
    }
    hostConnected() {
      if (this.shortcuts) {
        this.bind(this.shortcuts);
      }
    }
    hostDisconnected() {
      this.unbind();
    }
    unbind() {
      var _a;
      (_a = this.unregister) == null ? void 0 : _a.call(this);
    }
    bind(shortcuts) {
      this.unbind();
      this.shortcuts = shortcuts;
      this.unregister = tinykeys_module_default(this.target, normalise(this.shortcuts));
    }
  };

  // src/common/controllers/LightDismissController.ts
  var LightDismissController = class {
    constructor(host, options) {
      this.host = host;
      this.options = options;
      this.handleEsc = (e13) => {
        if (!this.options.isOpen()) {
          return;
        }
        this.options.onDismiss(e13);
      };
      this.handleClickOut = (e13) => {
        var _a;
        if (!this.options.isOpen()) {
          return;
        }
        const predicate = (_a = this.options.isDismissible) != null ? _a : (node) => node !== this.host;
        const isClickOutside = e13.composedPath().every(predicate);
        if (isClickOutside) {
          this.options.onDismiss(e13);
        }
      };
      host.addController(this);
      this.shortcut = new ShortcutController(host, { Escape: this.handleEsc });
      this.events = new EventController(host);
    }
    hostConnected() {
      this.events.listen(document, "click", this.handleClickOut, true);
    }
  };

  // src/command-menu/KeyboardController.ts
  var preventDefault3 = (fn) => (e13) => {
    e13.preventDefault();
    fn(e13);
  };
  var KeyboardController = class {
    constructor(host, actions) {
      this.host = host;
      host.addController(this);
      this.commandShortcuts = new ShortcutController(host);
      this.globalShortcuts = new ShortcutController(host, { "$mod+k": preventDefault3(actions.toggleOpen) });
      this.navigationShortcuts = new ShortcutController(
        host,
        {
          Enter: preventDefault3(actions.trigger),
          Backspace: actions.goBack,
          End: preventDefault3(actions.end),
          Home: preventDefault3(actions.start),
          ArrowDown: preventDefault3(actions.next),
          ArrowUp: preventDefault3(actions.previous)
        },
        host
      );
    }
    registerCommandShortcuts() {
      const shortcuts = {};
      for (const command of this.host.commands) {
        if (command.shortcut) {
          shortcuts[command.shortcut] = () => {
            var _a;
            return (_a = command.handler) == null ? void 0 : _a.call(command, this.host);
          };
        }
      }
      this.commandShortcuts.bind(shortcuts);
    }
  };

  // ../../node_modules/@nordhealth/icons/lib/assets/arrow-right.js
  var arrow_right_exports = {};
  __export(arrow_right_exports, {
    default: () => arrow_right_default,
    tags: () => tags17,
    title: () => title17
  });
  var arrow_right_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path d="m38.5 7 60.9 58.044a7 7 0 0 1 0 9.912L38.5 133" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"/></svg>';
  var title17 = "arrow-right";
  var tags17 = "nordicon arrow right caret pointing triangle chevron";

  // ../../node_modules/@nordhealth/icons/lib/assets/arrow-left.js
  var arrow_left_exports = {};
  __export(arrow_left_exports, {
    default: () => arrow_left_default,
    tags: () => tags18,
    title: () => title18
  });
  var arrow_left_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path d="M101.5 133 40.6 74.956a7 7 0 0 1 0-9.912L101.5 7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"/></svg>';
  var title18 = "arrow-left";
  var tags18 = "nordicon arrow left caret pointing triangle chevron";

  // ../../node_modules/@nordhealth/icons/lib/assets/keyboard-option.js
  var keyboard_option_exports = {};
  __export(keyboard_option_exports, {
    default: () => keyboard_option_default,
    tags: () => tags19,
    title: () => title19
  });
  var keyboard_option_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(14,0,0,14,0,0)"><path d="M0.5 3L3 3 6.5 7 9.5 7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.5 3L9.5 3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>';
  var title19 = "keyboard-option";
  var tags19 = "nordicon keyboard option key shortcut";

  // src/command-menu/CommandMenuAction.scss
  var styles14 = i`:host {
  display: flex;
}

.n-command {
  display: flex;
  flex: 1;
  border-inline-start: 2px solid transparent;
  align-items: center;
  color: var(--n-color-text);
  border-block-end: 1px solid var(--n-color-border);
  padding: calc(var(--n-space-m) / 1.5) var(--n-space-m);
}

.n-command.n-selected,
.n-command:hover {
  cursor: pointer;
  background-color: var(--n-color-active);
}

.n-command.n-selected {
  border-inline-start-color: var(--n-color-accent);
}

kabal-icon {
  color: var(--n-color-icon);
}

.n-command-icon {
  margin-inline-start: 2px;
  margin-inline-end: calc(var(--n-space-s) * 1.4);
  line-height: var(--n-line-height-tight);
}

.n-selected .n-command-icon kabal-icon {
  color: var(--n-color-icon-hover);
}

.n-title {
  flex: 1;
  margin-inline-end: calc(var(--n-space-s) / 2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.n-shortcuts {
  display: flex;
  gap: calc(var(--n-space-s) / 2);
}

.n-shortcut {
  padding: calc(var(--n-space-s) / 4) calc(var(--n-space-s) / 3);
  text-transform: capitalize;
  font-size: var(--n-font-size-xs);
  border: 1px solid var(--n-color-border-strong);
  font-weight: var(--n-font-weight);
  box-shadow: var(--n-box-shadow);
  border-radius: var(--n-border-radius-s);
  color: var(--n-color-icon);
  background: var(--n-color-button);
  line-height: var(--n-line-height-tight);
  min-inline-size: var(--n-space-s);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}`;
  var CommandMenuAction_default = styles14;

  // src/command-menu/CommandMenuAction.ts
  var KEY_REGEX = /(?:Key|Digit)([A-Z0-9])/g;
  var isMacintosh = () => navigator.platform.indexOf("Mac") > -1;
  Icon.registerIcon(arrow_left_exports);
  Icon.registerIcon(arrow_right_exports);
  Icon.registerIcon(keyboard_option_exports);
  var CommandMenuAction = class extends s4 {
    constructor() {
      super(...arguments);
      this.direction = new DirectionController(this);
      this.selected = false;
    }
    render() {
      return y`
      <div
        class=${o9({
        "n-selected": this.selected,
        "n-command": true
      })}
      >
        <div aria-hidden="true" class="n-command-icon">
          <kabal-icon size="s" name=${this.getIconName()}></kabal-icon>
        </div>
        <div class="n-title">${this.command.title}</div>
        ${this.renderShortcut()}
      </div>
    `;
    }
    ensureInView() {
      if (this.selected) {
        requestAnimationFrame(() => this.scrollIntoView({ block: "nearest" }));
      }
    }
    getIconName() {
      if (this.command.icon) {
        return this.command.icon;
      }
      return this.direction.isLTR ? title17 : title18;
    }
    renderShortcut() {
      if (!this.command.shortcut) {
        return b;
      }
      const keys = this.command.shortcut.replace(KEY_REGEX, "$1");
      return y`
      <kabal-visually-hidden>, ${keys}</kabal-visually-hidden>

      <div aria-hidden="true" class="n-shortcuts">
        ${keys.split("+").map(
        (key) => y`<div class="n-shortcut">
                ${key.toLowerCase() === "alt" && isMacintosh() ? y`<kabal-icon name=${title19} size="s"></kabal-icon>` : key}
              </div>`
      )}
      </div>
    `;
    }
  };
  CommandMenuAction.styles = CommandMenuAction_default;
  __decorateClass([
    e5({ type: Object })
  ], CommandMenuAction.prototype, "command", 2);
  __decorateClass([
    e5({ type: Boolean })
  ], CommandMenuAction.prototype, "selected", 2);
  __decorateClass([
    observe("selected")
  ], CommandMenuAction.prototype, "ensureInView", 1);
  CommandMenuAction = __decorateClass([
    e4("kabal-command-menu-action")
  ], CommandMenuAction);

  // src/command-menu/SelectEvent.ts
  var _SelectEvent = class extends NordEvent {
    constructor(command) {
      super(_SelectEvent.eventName);
      this.command = command;
    }
  };
  var SelectEvent = _SelectEvent;
  SelectEvent.eventName = "kabal-select";

  // src/command-menu/CommandMenu.scss
  var styles15 = i`:host {
  --_n-command-menu-inline-size: var(--n-command-menu-inline-size, 640px);
  --_n-command-menu-block-size: var(--n-command-menu-block-size, 290px);
  --_n-command-menu-block-start: var(--n-command-menu-block-start, 16%) ;
}

.n-modal {
  display: none;
  position: fixed;
  pointer-events: none;
  z-index: var(--n-index-modal);
  inset-inline-start: 0;
  inset-block-start: 0;
  inline-size: 100%;
  block-size: 100%;
  overflow: auto;
}

.n-modal.n-visible {
  display: block;
}

.n-modal-content {
  position: relative;
  pointer-events: all;
  inset-block-start: var(--_n-command-menu-block-start);
  margin: auto;
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
  background: var(--n-color-surface);
  border-radius: var(--n-border-radius);
  box-shadow: var(--n-box-shadow-modal);
  max-inline-size: var(--_n-command-menu-inline-size);
  overflow: hidden;
}

.n-bump {
  animation: zoom-in-zoom-out var(--n-transition-slowly);
}

@keyframes zoom-in-zoom-out {
  0% {
    transform: translateY(-10px) scale(0.97);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1.0001);
    opacity: 1;
  }
}
.n-modal-footer {
  display: flex;
  gap: var(--n-space-s);
  padding: var(--n-space-s) var(--n-space-m);
  font-size: calc(var(--n-font-size-s) - 1px);
  color: var(--n-color-text-weaker);
}

.n-help {
  display: flex;
  align-items: center;
  gap: 2px;
}

.n-help + .n-help {
  padding-inline-start: var(--n-space-s);
  border-inline-start: 1px solid var(--n-color-border-strong);
}

.n-help kabal-icon {
  --_n-icon-size: 10px;
  color: currentColor;
  margin: 3px 4px;
}

.n-help.n-backspace kabal-icon {
  --_n-icon-size: 12px ;
}

.n-search-wrapper {
  display: flex;
  border-block-end: 1px solid var(--n-color-border);
}

[role=combobox] {
  flex: 1;
  font-size: var(--n-font-size-l);
  font-weight: var(--n-font-weight);
  font-family: inherit;
  background: 0 0;
  color: var(--n-color-text);
  border: none;
  border-radius: 0;
  appearance: none;
  outline: 0;
  margin: 0;
  padding: var(--n-space-m);
}

[role=combobox]::-webkit-input-placeholder {
  color: var(--n-color-text-weaker);
  opacity: 0.6 !important;
}

[role=combobox]::-moz-placeholder {
  color: var(--n-color-text-weaker);
  opacity: 0.6 !important;
}

[role=combobox]::-ms-input-placeholder {
  color: var(--n-color-text-weaker);
  opacity: 0.6 !important;
}

[role=listbox] {
  max-block-size: var(--_n-command-menu-block-size);
  overflow: auto;
  margin: 0;
  padding: 0;
}

.n-group-header {
  line-height: var(--n-line-height);
  border-block-end: 1px solid var(--n-color-border);
  padding: calc(var(--n-space-s) / 1.4) var(--n-space-m);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: var(--n-font-size-s);
  background: var(--n-color-surface-raised);
  font-weight: var(--n-font-weight-active);
  color: var(--n-color-text-weaker);
}

.n-command-empty {
  display: flex;
  flex: 1;
  flex-direction: column;
  border-inline-start: 2px solid transparent;
  align-items: flex-start;
  color: var(--n-color-text);
  border-block-end: 1px solid var(--n-color-border);
  padding: calc(var(--n-space-m) / 1.5) var(--n-space-m);
}

.n-command-empty .n-title {
  flex: 1;
  margin-block-start: var(--n-space-s);
  margin-inline-end: calc(var(--n-space-s) / 2);
  max-inline-size: 100%;
  font-size: var(--n-font-size-m);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.n-command-empty .n-tip {
  flex: 1;
  margin-block-start: var(--n-space-s);
  margin-block-end: var(--n-space-m);
  font-size: var(--n-font-size-s);
  color: var(--n-color-text-weaker);
}`;
  var CommandMenu_default = styles15;

  // src/command-menu/CommandMenu.ts
  Icon.registerIcon(keyboard_arrow_up_down_exports);
  Icon.registerIcon(keyboard_return_exports);
  Icon.registerIcon(keyboard_backspace_exports);
  var CommandMenu = class extends s4 {
    constructor() {
      super(...arguments);
      this.inputRef = e10();
      this.listRef = e10();
      this.localize = new LocalizeController(this);
      this.dismissController = new LightDismissController(this, {
        isOpen: () => this.open,
        onDismiss: () => this.close()
      });
      this.keyboardController = new KeyboardController(this, {
        trigger: () => this.select(),
        goBack: () => this.goBack(),
        end: () => this.end(),
        start: () => this.start(),
        next: () => this.next(),
        previous: () => this.previous(),
        toggleOpen: () => this.toggleOpen()
      });
      this.open = false;
      this.placeholder = "Type a command or search...";
      this.commands = [];
      this.search = "";
      this.bump = true;
      this.selectedIndex = 0;
      this.filteredCommands = [];
    }
    get selected() {
      return this.filteredCommands[this.selectedIndex];
    }
    show(options = {}) {
      const notCancelled = this.dispatchEvent(new NordEvent("open", { cancelable: true }));
      if (notCancelled) {
        this.open = true;
        this.setParent(options.parent);
      }
    }
    close() {
      var _a;
      this.open = false;
      (_a = this.previousFocus) == null ? void 0 : _a.focus();
      this.previousFocus = void 0;
      this.dispatchEvent(new NordEvent("close"));
    }
    toggleOpen() {
      if (this.open) {
        this.close();
      } else {
        this.show();
      }
    }
    focus() {
      var _a;
      (_a = this.inputRef.value) == null ? void 0 : _a.focus();
    }
    render() {
      var _a;
      const sections = groupBy(this.filteredCommands, "section");
      const activeDescendant = this.filteredCommands.length === 0 ? "no-results" : (_a = this.selected) == null ? void 0 : _a.id;
      return y`
      <div
        class=${o9({
        "n-visible": this.open,
        "n-modal": true
      })}
      >
        <div
          @animationend=${this.handleAnimationEnd}
          class=${o9({
        "n-bump": this.bump,
        "n-modal-content": true
      })}
        >
          <div class="n-search-wrapper">
            <kabal-visually-hidden id="instructions"> ${this.localize.term("instructions")} </kabal-visually-hidden>
            <input
              type="text"
              id="search"
              @input=${this.handleInput}
              @blur=${this.handleBlur}
              ${n7(this.inputRef)}
              placeholder=${this.placeholder}
              .value=${this.search}
              spellcheck="false"
              autocomplete="off"
              autocapitalize="off"
              aria-label=${this.localize.term("inputLabel")}
              aria-autocomplete="list"
              aria-haspopup="listbox"
              role="combobox"
              aria-controls="list"
              aria-expanded="true"
              aria-activedescendant=${l5(activeDescendant)}
              aria-describedby="instructions"
            />
          </div>

          <div class="n-modal-body">
            <div id="list" ${n7(this.listRef)} role="listbox">
              ${this.filteredCommands.length === 0 ? this.renderNoResults() : Array.from(sections, ([section, commands]) => this.renderSection(section, commands))}
            </div>
          </div>
          <slot name="footer">
            <div class="n-modal-footer">
              <span class="n-help">
                <kabal-icon label="Arrow keys" name=${title14}></kabal-icon>
                ${this.localize.term("footerArrowKeys")}
              </span>
              <span class="n-help">
                <kabal-icon label="Enter key" name=${title15}></kabal-icon>
                ${this.localize.term("footerEnterKey")}
              </span>
              <span class="n-help">${this.localize.term("footerEscapeKey")}</span>
              <span class="n-help n-backspace">
                <kabal-icon label="Backspace key" name=${title16}></kabal-icon>
                ${this.localize.term("footerBackspaceKey")}
              </span>
            </div>
          </slot>
        </div>
      </div>
    `;
    }
    renderNoResults() {
      return y`
      <div id="no-results" class="n-command-empty" role="option" aria-selected="true">
        <div class="n-title">${this.localize.term("noResults", this.search)}</div>
        <div class="n-tip">${this.localize.term("tip")}</div>
      </div>
    `;
    }
    renderSection(section, commands) {
      const sectionId = `section-${section}`;
      return y`
      <div role="group" aria-labelledby=${cond(section, sectionId)}>
        ${section ? y`<div class="n-group-header" role="presentation" id=${sectionId}>${section}</div>` : b}
        ${c5(
        commands,
        (command) => command.id,
        (command) => {
          var _a, _b;
          return y`
            <kabal-command-menu-action
              id=${command.id}
              .command=${command}
              ?selected=${this.open && command.id === ((_a = this.selected) == null ? void 0 : _a.id)}
              @click=${() => this.select(command)}
              role="option"
              aria-selected=${cond(command.id === ((_b = this.selected) == null ? void 0 : _b.id), "true")}
            ></kabal-command-menu-action>
          `;
        }
      )}
      </div>
    `;
    }
    handleCommandsChange() {
      this.keyboardController.registerCommandShortcuts();
    }
    handleBump() {
      if (this.open) {
        this.bump = true;
      }
    }
    focusOnOpen() {
      if (this.open) {
        this.previousFocus = getFocusedElement(document);
        this.focus();
        if (this.listRef.value) {
          this.listRef.value.scrollTop = 0;
        }
      }
    }
    handleAnimationEnd() {
      this.bump = false;
    }
    handleBlur() {
      if (this.open) {
        this.focus();
      }
    }
    handleInput(event) {
      const input = event.target;
      this.setSearch(input.value);
    }
    select(command = this.selected) {
      var _a;
      const isParent = this.commands.some((item) => item.parent === command.id);
      if (isParent) {
        this.setParent(command.id);
        this.bump = true;
        this.focus();
      } else {
        this.close();
      }
      this.setSearch("");
      (_a = command.handler) == null ? void 0 : _a.call(command, this);
      const event = new SelectEvent(command);
      this.dispatchEvent(event);
    }
    start() {
      this.selectedIndex = 0;
    }
    end() {
      this.selectedIndex = this.filteredCommands.length - 1;
    }
    next() {
      this.selectedIndex = wrap(this.selectedIndex + 1, 0, this.filteredCommands.length - 1);
    }
    previous() {
      this.selectedIndex = wrap(this.selectedIndex - 1, 0, this.filteredCommands.length - 1);
    }
    goBack() {
      if (this.search) {
        return;
      }
      if (this.parent) {
        const parentCommand = this.commands.find((command) => command.id === this.parent);
        this.setParent(parentCommand == null ? void 0 : parentCommand.parent);
      }
    }
    setParent(parent) {
      this.parent = parent;
      this.setSearch("");
    }
    setSearch(str) {
      this.search = str;
      this.selectedIndex = 0;
    }
    filterCommands() {
      const searchTerms = this.search.toLocaleLowerCase().split(/\s+/);
      this.filteredCommands = this.commands.filter(({ title: title27, keywords = "", parent }) => {
        const searchSpace = `${title27} ${keywords}`.toLocaleLowerCase();
        const matcher = searchTerms.every((term) => searchSpace.includes(term));
        if (!this.parent && this.search) {
          return matcher;
        }
        return parent == this.parent && matcher;
      });
    }
  };
  CommandMenu.styles = [Component_default, CommandMenu_default];
  __decorateClass([
    e5({ type: Boolean })
  ], CommandMenu.prototype, "open", 2);
  __decorateClass([
    e5({ type: String })
  ], CommandMenu.prototype, "placeholder", 2);
  __decorateClass([
    e5({ type: Array, attribute: false })
  ], CommandMenu.prototype, "commands", 2);
  __decorateClass([
    t3()
  ], CommandMenu.prototype, "parent", 2);
  __decorateClass([
    t3()
  ], CommandMenu.prototype, "search", 2);
  __decorateClass([
    t3()
  ], CommandMenu.prototype, "bump", 2);
  __decorateClass([
    t3()
  ], CommandMenu.prototype, "selectedIndex", 2);
  __decorateClass([
    t3()
  ], CommandMenu.prototype, "filteredCommands", 2);
  __decorateClass([
    observe("commands")
  ], CommandMenu.prototype, "handleCommandsChange", 1);
  __decorateClass([
    observe("open")
  ], CommandMenu.prototype, "handleBump", 1);
  __decorateClass([
    observe("open", "updated")
  ], CommandMenu.prototype, "focusOnOpen", 1);
  __decorateClass([
    observe("search"),
    observe("parent"),
    observe("commands")
  ], CommandMenu.prototype, "filterCommands", 1);
  CommandMenu = __decorateClass([
    e4("kabal-command-menu")
  ], CommandMenu);

  // ../../node_modules/@nordhealth/icons/lib/assets/interface-calendar.js
  var interface_calendar_exports = {};
  __export(interface_calendar_exports, {
    default: () => interface_calendar_default,
    tags: () => tags20,
    title: () => title20
  });
  var interface_calendar_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path d="M7 21h126v112H7zM35 7v28m70-28v28M7 63h126" stroke-width="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var title20 = "interface-calendar";
  var tags20 = "nordicon interface calendar date time day week month year";

  // ../../node_modules/@nordhealth/icons/lib/assets/interface-close-small.js
  var interface_close_small_exports = {};
  __export(interface_close_small_exports, {
    default: () => interface_close_small_default,
    tags: () => tags21,
    title: () => title21
  });
  var interface_close_small_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M89.796 74.956a7 7 0 0 1 0-9.912L136.92 17.92a10.5 10.5 0 0 0-14.84-14.84L74.956 50.204a7 7 0 0 1-9.912 0L17.92 3.08A10.5 10.5 0 0 0 3.08 17.92l47.124 47.124a7 7 0 0 1 0 9.912L3.08 122.08a10.5 10.5 0 1 0 14.84 14.84l47.124-47.124a7 7 0 0 1 9.912 0l47.124 47.124a10.5 10.5 0 0 0 14.84-14.84z"/></svg>';
  var title21 = "interface-close-small";
  var tags21 = "nordicon interface close remove small cross delete erase symbol";

  // ../../node_modules/@nordhealth/icons/lib/assets/navigation-search.js
  var navigation_search_exports = {};
  __export(navigation_search_exports, {
    default: () => navigation_search_default,
    tags: () => tags22,
    title: () => title22
  });
  var navigation_search_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path d="M7 59.5a52.5 52.5 0 1 0 105 0 52.5 52.5 0 1 0-105 0zM133 133 96.628 96.628" stroke-width="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var title22 = "navigation-search";
  var tags22 = "nordicon navigation menu find search magnifying glass";

  // src/common/mixins/ReadonlyMixin.ts
  function ReadonlyMixin(superClass) {
    class ReadonlyElement extends superClass {
      constructor() {
        super(...arguments);
        this.readonly = false;
      }
    }
    __decorateClass([
      e5({ type: Boolean, reflect: true })
    ], ReadonlyElement.prototype, "readonly", 2);
    return ReadonlyElement;
  }

  // src/common/mixins/AutocompleteMixin.ts
  function AutocompleteMixin(superClass) {
    class AutocompleteElement extends superClass {
      constructor() {
        super(...arguments);
        this.autocomplete = "off";
      }
    }
    __decorateClass([
      e5()
    ], AutocompleteElement.prototype, "autocomplete", 2);
    return AutocompleteElement;
  }

  // src/common/styles/TextField.scss
  var styles16 = i`:host {
  --_n-input-inline-size: var(--n-input-inline-size, 240px);
  --_n-input-background: var(--n-input-background, var(--n-color-active));
  --_n-input-color: var(--n-input-color, var(--n-color-text));
  --_n-input-border-color: var(--n-input-border-color, var(--n-color-border-strong));
  --_n-input-border-radius: var(--n-input-border-radius, var(--n-border-radius-s)) ;
}

.n-input-container {
  position: relative;
  inline-size: var(--_n-input-inline-size);
}

.n-input {
  background: var(--_n-input-background);
  color: var(--_n-input-color);
  padding: calc(var(--n-space-s) - 1px) calc(var(--n-space-s) * 1.6);
  border-radius: var(--_n-input-border-radius);
  border: 1px solid var(--_n-input-border-color);
  font-family: var(--n-font-family);
  font-size: var(--n-font-size-m);
  line-height: var(--n-line-height-form);
  inline-size: 100%;
  transition: border var(--n-transition-slowly), box-shadow var(--n-transition-slowly), background var(--n-transition-slowly);
}

@media (max-width: 480px) {
  .n-input {
    font-size: var(--n-font-size-l);
  }
}
:host([expand]) {
  --_n-input-inline-size: 100%;
  inline-size: 100%;
}

.n-input:hover,
.n-label-container:hover + .n-input-container {
  --_n-input-border-color: var(--n-input-border-color, var(--n-color-border-hover)) ;
}

.n-input:focus {
  --_n-input-border-color: var(--n-input-border-color, var(--n-color-accent));
  --_n-input-background: var(--n-input-background, var(--n-color-surface));
  outline: 0;
  box-shadow: 0 0 0 1px var(--_n-input-border-color);
}

.n-input::placeholder {
  color: var(--n-color-text-weakest);
}

.n-input[aria-invalid=true] {
  --_n-input-border-color: var(--n-input-border-color, var(--n-color-status-danger)) !important ;
}

.n-input:disabled,
.n-input[readonly],
.n-label-container:hover + .n-input-container .n-input:disabled,
.n-label-container:hover + .n-input-container .n-input[readonly] {
  --_n-input-border-color: var(--n-input-border-color, var(--n-color-active));
  --_n-input-color: var(--n-input-color, var(--n-color-text-weakest)) ;
}

.n-input[readonly],
.n-label-container:hover + .n-input-container .n-input[readonly] {
  --_n-input-color: var(--n-input-color, var(--n-color-text-weak)) ;
}

.n-input[readonly]:focus {
  --_n-input-border-color: var(--n-input-border-color, var(--n-color-accent)) ;
}

:host([size=s]) :is(.n-input-container, .n-input) {
  font-size: var(--n-font-size-s);
}

:host([size=s]) .n-input {
  padding: calc(var(--n-space-s) / 2 - 2px) calc(var(--n-space-s) / 2 * 1.6);
}

:host([size=l]) :is(.n-input-container, .n-input) {
  font-size: var(--n-font-size-l);
}

:host([size=l]) .n-input {
  padding-block-start: calc(var(--n-space-m) / 1.25);
  padding-block-end: calc(var(--n-space-m) / 1.25);
}`;
  var TextField_default = styles16;

  // src/input/Input.scss
  var styles17 = i`.n-input::-webkit-search-cancel-button,
.n-input::-webkit-search-decoration {
  -webkit-appearance: none;
  appearance: none;
}

.n-input-container {
  font-size: var(--n-font-size-m);
  display: grid;
  grid-template-columns: max-content 1fr max-content;
}

.n-input {
  grid-area: 1/1/2/4;
}

slot[name=end],
slot[name=start] {
  pointer-events: none;
  display: flex;
  align-items: center;
  color: var(--n-color-icon);
}

slot[name=start] {
  grid-area: 1/1/2/2;
  order: 1;
}

slot[name=end] {
  grid-area: 1/3/2/4;
}

.is-rtl slot[name=end],
slot[name=start] {
  --n-button-border-radius: var(--n-border-radius-s) 0 0 var(--n-border-radius-s) ;
}

.is-rtl slot[name=start],
slot[name=end] {
  --n-button-border-radius: 0 var(--n-border-radius-s) var(--n-border-radius-s) 0 ;
}

:is([name=start], [name=end])::slotted(:not(kabal-button, kabal-dropdown)),
kabal-icon {
  margin-inline-start: var(--n-space-m);
  margin-inline-end: var(--n-space-m);
}

:host([size=s]) :is([name=start], [name=end])::slotted(:not(kabal-button, kabal-dropdown)),
:host([size=s]) kabal-icon {
  margin-inline-start: var(--n-space-s);
  margin-inline-end: var(--n-space-s);
}

:host([size=l]) :is([name=start], [name=end])::slotted(:not(kabal-button, kabal-dropdown)),
:host([size=l]) kabal-icon {
  margin-inline-start: var(--n-space-m);
  margin-inline-end: var(--n-space-m);
}

.has-start .n-input {
  padding-inline-start: var(--n-space-xl);
}

.has-end .n-input {
  padding-inline-end: var(--n-space-xl);
}

:host([size=s]) .has-start .n-input,
:host([size=s][type=search]) .n-input {
  padding-inline-start: var(--n-space-l);
}

:host([size=s]) .has-end .n-input {
  padding-inline-end: var(--n-space-l);
}

:host([size=l]) .has-start .n-input,
:host([size=l][type=search]) .n-input {
  padding-inline-start: calc(var(--n-space-xl) * 1.1);
}

:host([size=l]) .has-end .n-input {
  padding-inline-end: calc(var(--n-space-xl) * 1.1);
}

::slotted(kabal-button:not([disabled])),
::slotted(kabal-dropdown) {
  pointer-events: auto;
  position: relative;
  --n-button-box-shadow: none ;
}

::slotted(kabal-button:active),
::slotted(kabal-dropdown:active:not([open])) {
  inset-block-start: -1px;
}

::slotted(kabal-button[disabled]) {
  --n-button-background-color: transparent ;
}

.n-input-container:hover:not(:focus-within) ::slotted(:is(kabal-button, kabal-dropdown)),
.n-label-container:hover ~ .n-input-container:not(:focus-within) ::slotted(:is(kabal-button, kabal-dropdown)) {
  --n-button-border-color: var(--n-input-border-color, var(--n-color-border-hover)) ;
}

.n-input-container:focus-within ::slotted(:is(kabal-button, kabal-dropdown:not([open]))) {
  --n-button-border-color: var(--n-input-border-color, var(--n-color-accent)) ;
}

:host([error]) .n-input-container ::slotted(:is(kabal-button:not(:focus), kabal-dropdown:not(:focus-within), kabal-dropdown[open])) {
  --n-button-border-color: var(--n-input-border-color, var(--n-color-status-danger)) ;
}

.has-start-button .n-input {
  padding-inline-start: calc(var(--n-space-l) * 2);
}

.has-end-button .n-input {
  padding-inline-end: calc(var(--n-space-l) * 2);
}

:host([size=s]) .has-start-button .n-input {
  padding-inline-start: calc(var(--n-space-m) * 2.5);
}

:host([size=s]) .has-end-button .n-input {
  padding-inline-end: calc(var(--n-space-m) * 2.5);
}

:host([size=l]) .has-start-button .n-input {
  padding-inline-start: calc(var(--n-space-l) * 2.5);
}

:host([size=l]) .has-end-button .n-input {
  padding-inline-end: calc(var(--n-space-l) * 2.5);
}

:host([size=s]) ::slotted(kabal-button) {
  --_n-button-padding-inline: calc(var(--n-space-s) * 1.4) ;
}

:host {
  --_n-input-icon-size: var(--n-size-icon-s) ;
}

:host([size=s]) {
  --_n-input-icon-size: var(--n-size-icon-xs) ;
}

:host([size=l]) {
  --_n-input-icon-size: var(--n-size-icon-m) ;
}

::slotted(kabal-icon:not([size])),
kabal-icon {
  --_n-icon-size: var(--_n-input-icon-size) ;
}`;
  var Input_default = styles17;

  // src/common/form.ts
  function getSubmitButton(form) {
    let button = form.querySelector(`button[type="submit"]`);
    if (!button && form.id) {
      const root = form.getRootNode();
      button = root.querySelector(`button[form=${form.id}]`);
    }
    return button;
  }

  // src/common/input.ts
  function cleanValue(inputEl, regex) {
    const { value } = inputEl;
    const cursor = inputEl.selectionStart;
    const beforeCursor = value.slice(0, cursor);
    const afterCursor = value.slice(cursor, value.length);
    const filteredBeforeCursor = beforeCursor.replace(regex, "");
    const filterAfterCursor = afterCursor.replace(regex, "");
    const newValue = filteredBeforeCursor + filterAfterCursor;
    const newCursor = filteredBeforeCursor.length;
    inputEl.value = newValue;
    inputEl.selectionStart = newCursor;
    inputEl.selectionEnd = newCursor;
    return newValue;
  }

  // src/input/Input.ts
  Icon.registerIcon(navigation_search_exports);
  var isButtonOrDropdown = (el) => {
    if (el === null)
      return false;
    return el.localName === "kabal-button" || el.localName === "kabal-dropdown";
  };
  var Input = class extends SizeMixin(
    FormAssociatedMixin(AutocompleteMixin(ReadonlyMixin(InputMixin(FocusableMixin(s4)))))
  ) {
    constructor() {
      super(...arguments);
      this.startSlot = new SlotController(this, "start");
      this.endSlot = new SlotController(this, "end");
      this.direction = new DirectionController(this);
      this.type = "text";
      this.expand = false;
      this.disallowPattern = void 0;
      this.handleInputChange = (e13) => {
        const target = e13.target;
        if (this.disallowPattern) {
          cleanValue(target, new RegExp(this.disallowPattern, "g"));
        }
        this.handleInput(e13);
      };
    }
    render() {
      var _a;
      const startSlotHasContent = this.type === "search" || this.startSlot.hasContent;
      const isNumber = this.type === "number";
      return y`
      ${this.renderLabel()}

      <div
        class=${o9({
        "n-input-container": true,
        "has-start": startSlotHasContent,
        "has-end": this.endSlot.hasContent,
        "has-start-button": isButtonOrDropdown(this.startSlot.content),
        "has-end-button": isButtonOrDropdown(this.endSlot.content),
        "is-rtl": this.direction.dir === "rtl"
      })}
      >
        <slot name=${this.startSlot.slotName} ?hidden=${!startSlotHasContent}>
          ${this.type === "search" ? y`<kabal-icon name="navigation-search"></kabal-icon>` : b}
        </slot>
        <input
          ${n7(this.focusableRef)}
          id=${this.inputId}
          class="n-input"
          type=${isNumber ? "text" : this.type}
          inputmode=${cond(isNumber, "numeric")}
          pattern=${cond(isNumber, "[0-9]*")}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          name=${l5(this.name)}
          .value=${(_a = this.value) != null ? _a : ""}
          placeholder=${l5(this.placeholder)}
          @input=${this.handleInputChange}
          @change=${this.handleChange}
          @keydown=${this.handleKeydown}
          aria-describedby=${l5(this.getDescribedBy())}
          aria-invalid=${l5(this.getInvalid())}
          spellcheck="false"
          autocomplete=${this.autocomplete}
        />
        <slot name=${this.endSlot.slotName} ?hidden=${this.endSlot.isEmpty}></slot>
      </div>

      ${this.renderError()}
    `;
    }
    handleKeydown(e13) {
      const { form } = this;
      if (e13.key === "Enter" && form) {
        const button = getSubmitButton(form);
        setTimeout(() => button == null ? void 0 : button.click(), 0);
      }
    }
  };
  Input.styles = [Component_default, FormField_default, TextField_default, Input_default];
  __decorateClass([
    e5({ reflect: true })
  ], Input.prototype, "type", 2);
  __decorateClass([
    e5({ reflect: true, type: Boolean })
  ], Input.prototype, "expand", 2);
  __decorateClass([
    e5({ reflect: true, attribute: "disallow-pattern" })
  ], Input.prototype, "disallowPattern", 2);
  Input = __decorateClass([
    e4("kabal-input")
  ], Input);

  // ../../node_modules/@floating-ui/core/dist/floating-ui.core.browser.min.mjs
  function t6(t7) {
    return t7.split("-")[0];
  }
  function e12(t7) {
    return t7.split("-")[1];
  }
  function n9(e13) {
    return ["top", "bottom"].includes(t6(e13)) ? "x" : "y";
  }
  function i7(t7) {
    return "y" === t7 ? "height" : "width";
  }
  function r7(r9, o13, a5) {
    let { reference: l10, floating: s9 } = r9;
    const c8 = l10.x + l10.width / 2 - s9.width / 2, f5 = l10.y + l10.height / 2 - s9.height / 2, u6 = n9(o13), m5 = i7(u6), g4 = l10[m5] / 2 - s9[m5] / 2, d5 = "x" === u6;
    let p5;
    switch (t6(o13)) {
      case "top":
        p5 = { x: c8, y: l10.y - s9.height };
        break;
      case "bottom":
        p5 = { x: c8, y: l10.y + l10.height };
        break;
      case "right":
        p5 = { x: l10.x + l10.width, y: f5 };
        break;
      case "left":
        p5 = { x: l10.x - s9.width, y: f5 };
        break;
      default:
        p5 = { x: l10.x, y: l10.y };
    }
    switch (e12(o13)) {
      case "start":
        p5[u6] -= g4 * (a5 && d5 ? -1 : 1);
        break;
      case "end":
        p5[u6] += g4 * (a5 && d5 ? -1 : 1);
    }
    return p5;
  }
  var o11 = async (t7, e13, n11) => {
    const { placement: i10 = "bottom", strategy: o13 = "absolute", middleware: a5 = [], platform: l10 } = n11, s9 = a5.filter(Boolean), c8 = await (null == l10.isRTL ? void 0 : l10.isRTL(e13));
    let f5 = await l10.getElementRects({ reference: t7, floating: e13, strategy: o13 }), { x: u6, y: m5 } = r7(f5, i10, c8), g4 = i10, d5 = {}, p5 = 0;
    for (let n12 = 0; n12 < s9.length; n12++) {
      const { name: a6, fn: h7 } = s9[n12], { x: y4, y: x4, data: w4, reset: v4 } = await h7({ x: u6, y: m5, initialPlacement: i10, placement: g4, strategy: o13, middlewareData: d5, rects: f5, platform: l10, elements: { reference: t7, floating: e13 } });
      u6 = null != y4 ? y4 : u6, m5 = null != x4 ? x4 : m5, d5 = { ...d5, [a6]: { ...d5[a6], ...w4 } }, v4 && p5 <= 50 && (p5++, "object" == typeof v4 && (v4.placement && (g4 = v4.placement), v4.rects && (f5 = true === v4.rects ? await l10.getElementRects({ reference: t7, floating: e13, strategy: o13 }) : v4.rects), { x: u6, y: m5 } = r7(f5, g4, c8)), n12 = -1);
    }
    return { x: u6, y: m5, placement: g4, strategy: o13, middlewareData: d5 };
  };
  function a3(t7) {
    return "number" != typeof t7 ? function(t8) {
      return { top: 0, right: 0, bottom: 0, left: 0, ...t8 };
    }(t7) : { top: t7, right: t7, bottom: t7, left: t7 };
  }
  function l8(t7) {
    return { ...t7, top: t7.y, left: t7.x, right: t7.x + t7.width, bottom: t7.y + t7.height };
  }
  async function s7(t7, e13) {
    var n11;
    void 0 === e13 && (e13 = {});
    const { x: i10, y: r9, platform: o13, rects: s9, elements: c8, strategy: f5 } = t7, { boundary: u6 = "clippingAncestors", rootBoundary: m5 = "viewport", elementContext: g4 = "floating", altBoundary: d5 = false, padding: p5 = 0 } = e13, h7 = a3(p5), y4 = c8[d5 ? "floating" === g4 ? "reference" : "floating" : g4], x4 = l8(await o13.getClippingRect({ element: null == (n11 = await (null == o13.isElement ? void 0 : o13.isElement(y4))) || n11 ? y4 : y4.contextElement || await (null == o13.getDocumentElement ? void 0 : o13.getDocumentElement(c8.floating)), boundary: u6, rootBoundary: m5, strategy: f5 })), w4 = "floating" === g4 ? { ...s9.floating, x: i10, y: r9 } : s9.reference, v4 = await (null == o13.getOffsetParent ? void 0 : o13.getOffsetParent(c8.floating)), b4 = await (null == o13.isElement ? void 0 : o13.isElement(v4)) && await (null == o13.getScale ? void 0 : o13.getScale(v4)) || { x: 1, y: 1 }, R4 = l8(o13.convertOffsetParentRelativeRectToViewportRelativeRect ? await o13.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: w4, offsetParent: v4, strategy: f5 }) : w4);
    return { top: (x4.top - R4.top + h7.top) / b4.y, bottom: (R4.bottom - x4.bottom + h7.bottom) / b4.y, left: (x4.left - R4.left + h7.left) / b4.x, right: (R4.right - x4.right + h7.right) / b4.x };
  }
  var c6 = Math.min;
  var f3 = Math.max;
  function u4(t7, e13, n11) {
    return f3(t7, c6(e13, n11));
  }
  var g2 = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function d3(t7) {
    return t7.replace(/left|right|bottom|top/g, (t8) => g2[t8]);
  }
  function p3(t7, r9, o13) {
    void 0 === o13 && (o13 = false);
    const a5 = e12(t7), l10 = n9(t7), s9 = i7(l10);
    let c8 = "x" === l10 ? a5 === (o13 ? "end" : "start") ? "right" : "left" : "start" === a5 ? "bottom" : "top";
    return r9.reference[s9] > r9.floating[s9] && (c8 = d3(c8)), { main: c8, cross: d3(c8) };
  }
  var h5 = { start: "end", end: "start" };
  function y2(t7) {
    return t7.replace(/start|end/g, (t8) => h5[t8]);
  }
  var x2 = ["top", "right", "bottom", "left"];
  var w2 = x2.reduce((t7, e13) => t7.concat(e13, e13 + "-start", e13 + "-end"), []);
  var b2 = function(e13) {
    return void 0 === e13 && (e13 = {}), { name: "flip", options: e13, async fn(n11) {
      var i10;
      const { placement: r9, middlewareData: o13, rects: a5, initialPlacement: l10, platform: c8, elements: f5 } = n11, { mainAxis: u6 = true, crossAxis: m5 = true, fallbackPlacements: g4, fallbackStrategy: h7 = "bestFit", flipAlignment: x4 = true, ...w4 } = e13, v4 = t6(r9), b4 = g4 || (v4 === l10 || !x4 ? [d3(l10)] : function(t7) {
        const e14 = d3(t7);
        return [y2(t7), e14, y2(e14)];
      }(l10)), R4 = [l10, ...b4], A4 = await s7(n11, w4), P3 = [];
      let T4 = (null == (i10 = o13.flip) ? void 0 : i10.overflows) || [];
      if (u6 && P3.push(A4[v4]), m5) {
        const { main: t7, cross: e14 } = p3(r9, a5, await (null == c8.isRTL ? void 0 : c8.isRTL(f5.floating)));
        P3.push(A4[t7], A4[e14]);
      }
      if (T4 = [...T4, { placement: r9, overflows: P3 }], !P3.every((t7) => t7 <= 0)) {
        var O3, E4;
        const t7 = (null != (O3 = null == (E4 = o13.flip) ? void 0 : E4.index) ? O3 : 0) + 1, e14 = R4[t7];
        if (e14)
          return { data: { index: t7, overflows: T4 }, reset: { placement: e14 } };
        let n12 = "bottom";
        switch (h7) {
          case "bestFit": {
            var L4;
            const t8 = null == (L4 = T4.map((t9) => [t9, t9.overflows.filter((t10) => t10 > 0).reduce((t10, e15) => t10 + e15, 0)]).sort((t9, e15) => t9[1] - e15[1])[0]) ? void 0 : L4[0].placement;
            t8 && (n12 = t8);
            break;
          }
          case "initialPlacement":
            n12 = l10;
        }
        if (r9 !== n12)
          return { reset: { placement: n12 } };
      }
      return {};
    } };
  };
  function R2(t7, e13) {
    return { top: t7.top - e13.height, right: t7.right - e13.width, bottom: t7.bottom - e13.height, left: t7.left - e13.width };
  }
  function A2(t7) {
    return x2.some((e13) => t7[e13] >= 0);
  }
  var P2 = function(t7) {
    let { strategy: e13 = "referenceHidden", ...n11 } = void 0 === t7 ? {} : t7;
    return { name: "hide", async fn(t8) {
      const { rects: i10 } = t8;
      switch (e13) {
        case "referenceHidden": {
          const e14 = R2(await s7(t8, { ...n11, elementContext: "reference" }), i10.reference);
          return { data: { referenceHiddenOffsets: e14, referenceHidden: A2(e14) } };
        }
        case "escaped": {
          const e14 = R2(await s7(t8, { ...n11, altBoundary: true }), i10.floating);
          return { data: { escapedOffsets: e14, escaped: A2(e14) } };
        }
        default:
          return {};
      }
    } };
  };
  var T2 = function(i10) {
    return void 0 === i10 && (i10 = 0), { name: "offset", options: i10, async fn(r9) {
      const { x: o13, y: a5 } = r9, l10 = await async function(i11, r10) {
        const { placement: o14, platform: a6, elements: l11 } = i11, s9 = await (null == a6.isRTL ? void 0 : a6.isRTL(l11.floating)), c8 = t6(o14), f5 = e12(o14), u6 = "x" === n9(o14), m5 = ["left", "top"].includes(c8) ? -1 : 1, g4 = s9 && u6 ? -1 : 1, d5 = "function" == typeof r10 ? r10(i11) : r10;
        let { mainAxis: p5, crossAxis: h7, alignmentAxis: y4 } = "number" == typeof d5 ? { mainAxis: d5, crossAxis: 0, alignmentAxis: null } : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...d5 };
        return f5 && "number" == typeof y4 && (h7 = "end" === f5 ? -1 * y4 : y4), u6 ? { x: h7 * g4, y: p5 * m5 } : { x: p5 * m5, y: h7 * g4 };
      }(r9, i10);
      return { x: o13 + l10.x, y: a5 + l10.y, data: l10 };
    } };
  };
  function O(t7) {
    return "x" === t7 ? "y" : "x";
  }
  var E2 = function(e13) {
    return void 0 === e13 && (e13 = {}), { name: "shift", options: e13, async fn(i10) {
      const { x: r9, y: o13, placement: a5 } = i10, { mainAxis: l10 = true, crossAxis: c8 = false, limiter: f5 = { fn: (t7) => {
        let { x: e14, y: n11 } = t7;
        return { x: e14, y: n11 };
      } }, ...m5 } = e13, g4 = { x: r9, y: o13 }, d5 = await s7(i10, m5), p5 = n9(t6(a5)), h7 = O(p5);
      let y4 = g4[p5], x4 = g4[h7];
      if (l10) {
        const t7 = "y" === p5 ? "bottom" : "right";
        y4 = u4(y4 + d5["y" === p5 ? "top" : "left"], y4, y4 - d5[t7]);
      }
      if (c8) {
        const t7 = "y" === h7 ? "bottom" : "right";
        x4 = u4(x4 + d5["y" === h7 ? "top" : "left"], x4, x4 - d5[t7]);
      }
      const w4 = f5.fn({ ...i10, [p5]: y4, [h7]: x4 });
      return { ...w4, data: { x: w4.x - r9, y: w4.y - o13 } };
    } };
  };

  // ../../node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.min.mjs
  function n10(t7) {
    var e13;
    return (null == (e13 = t7.ownerDocument) ? void 0 : e13.defaultView) || window;
  }
  function o12(t7) {
    return n10(t7).getComputedStyle(t7);
  }
  function i8(t7) {
    return f4(t7) ? (t7.nodeName || "").toLowerCase() : "";
  }
  var r8;
  function l9() {
    if (r8)
      return r8;
    const t7 = navigator.userAgentData;
    return t7 && Array.isArray(t7.brands) ? (r8 = t7.brands.map((t8) => t8.brand + "/" + t8.version).join(" "), r8) : navigator.userAgent;
  }
  function c7(t7) {
    return t7 instanceof n10(t7).HTMLElement;
  }
  function s8(t7) {
    return t7 instanceof n10(t7).Element;
  }
  function f4(t7) {
    return t7 instanceof n10(t7).Node;
  }
  function u5(t7) {
    if ("undefined" == typeof ShadowRoot)
      return false;
    return t7 instanceof n10(t7).ShadowRoot || t7 instanceof ShadowRoot;
  }
  function a4(t7) {
    const { overflow: e13, overflowX: n11, overflowY: i10, display: r9 } = o12(t7);
    return /auto|scroll|overlay|hidden/.test(e13 + i10 + n11) && !["inline", "contents"].includes(r9);
  }
  function d4(t7) {
    return ["table", "td", "th"].includes(i8(t7));
  }
  function h6(t7) {
    const e13 = /firefox/i.test(l9()), n11 = o12(t7), i10 = n11.backdropFilter || n11.WebkitBackdropFilter;
    return "none" !== n11.transform || "none" !== n11.perspective || !!i10 && "none" !== i10 || e13 && "filter" === n11.willChange || e13 && !!n11.filter && "none" !== n11.filter || ["transform", "perspective"].some((t8) => n11.willChange.includes(t8)) || ["paint", "layout", "strict", "content"].some((t8) => {
      const e14 = n11.contain;
      return null != e14 && e14.includes(t8);
    });
  }
  function g3() {
    return !/^((?!chrome|android).)*safari/i.test(l9());
  }
  function m4(t7) {
    return ["html", "body", "#document"].includes(i8(t7));
  }
  var p4 = { x: 1, y: 1 };
  function y3(t7) {
    const e13 = !s8(t7) && t7.contextElement ? t7.contextElement : s8(t7) ? t7 : null;
    if (!e13)
      return p4;
    const n11 = e13.getBoundingClientRect(), i10 = o12(e13);
    let r9 = n11.width / parseFloat(i10.width), l10 = n11.height / parseFloat(i10.height);
    return r9 && Number.isFinite(r9) || (r9 = 1), l10 && Number.isFinite(l10) || (l10 = 1), { x: r9, y: l10 };
  }
  function w3(t7, e13, o13, i10) {
    var r9, l10, c8, f5;
    void 0 === e13 && (e13 = false), void 0 === o13 && (o13 = false);
    const u6 = t7.getBoundingClientRect();
    let a5 = p4;
    e13 && (i10 ? s8(i10) && (a5 = y3(i10)) : a5 = y3(t7));
    const d5 = s8(t7) ? n10(t7) : window, h7 = !g3() && o13, m5 = (u6.left + (h7 && null != (r9 = null == (l10 = d5.visualViewport) ? void 0 : l10.offsetLeft) ? r9 : 0)) / a5.x, w4 = (u6.top + (h7 && null != (c8 = null == (f5 = d5.visualViewport) ? void 0 : f5.offsetTop) ? c8 : 0)) / a5.y, x4 = u6.width / a5.x, v4 = u6.height / a5.y;
    return { width: x4, height: v4, top: w4, right: m5 + x4, bottom: w4 + v4, left: m5, x: m5, y: w4 };
  }
  function x3(t7) {
    return ((f4(t7) ? t7.ownerDocument : t7.document) || window.document).documentElement;
  }
  function v3(t7) {
    return s8(t7) ? { scrollLeft: t7.scrollLeft, scrollTop: t7.scrollTop } : { scrollLeft: t7.pageXOffset, scrollTop: t7.pageYOffset };
  }
  function b3(t7) {
    return w3(x3(t7)).left + v3(t7).scrollLeft;
  }
  function L3(t7, e13, n11) {
    const o13 = c7(e13), r9 = x3(e13), l10 = w3(t7, true, "fixed" === n11, e13);
    let s9 = { scrollLeft: 0, scrollTop: 0 };
    const f5 = { x: 0, y: 0 };
    if (o13 || !o13 && "fixed" !== n11)
      if (("body" !== i8(e13) || a4(r9)) && (s9 = v3(e13)), c7(e13)) {
        const t8 = w3(e13, true);
        f5.x = t8.x + e13.clientLeft, f5.y = t8.y + e13.clientTop;
      } else
        r9 && (f5.x = b3(r9));
    return { x: l10.left + s9.scrollLeft - f5.x, y: l10.top + s9.scrollTop - f5.y, width: l10.width, height: l10.height };
  }
  function E3(t7) {
    if ("html" === i8(t7))
      return t7;
    const e13 = t7.assignedSlot || t7.parentNode || (u5(t7) ? t7.host : null) || x3(t7);
    return u5(e13) ? e13.host : e13;
  }
  function R3(t7) {
    return c7(t7) && "fixed" !== o12(t7).position ? t7.offsetParent : null;
  }
  function T3(t7) {
    const e13 = n10(t7);
    let r9 = R3(t7);
    for (; r9 && d4(r9) && "static" === o12(r9).position; )
      r9 = R3(r9);
    return r9 && ("html" === i8(r9) || "body" === i8(r9) && "static" === o12(r9).position && !h6(r9)) ? e13 : r9 || function(t8) {
      let e14 = E3(t8);
      for (; c7(e14) && !m4(e14); ) {
        if (h6(e14))
          return e14;
        e14 = E3(e14);
      }
      return null;
    }(t7) || e13;
  }
  var W = Math.min;
  var C2 = Math.max;
  function D2(t7) {
    const e13 = E3(t7);
    return m4(e13) ? t7.ownerDocument.body : c7(e13) && a4(e13) ? e13 : D2(e13);
  }
  function F(t7, e13) {
    var o13;
    void 0 === e13 && (e13 = []);
    const i10 = D2(t7), r9 = i10 === (null == (o13 = t7.ownerDocument) ? void 0 : o13.body), l10 = n10(i10);
    return r9 ? e13.concat(l10, l10.visualViewport || [], a4(i10) ? i10 : []) : e13.concat(i10, F(i10));
  }
  function A3(e13, i10, r9) {
    return "viewport" === i10 ? l8(function(t7, e14) {
      const o13 = n10(t7), i11 = x3(t7), r10 = o13.visualViewport;
      let l10 = i11.clientWidth, c8 = i11.clientHeight, s9 = 0, f5 = 0;
      if (r10) {
        l10 = r10.width, c8 = r10.height;
        const t8 = g3();
        (t8 || !t8 && "fixed" === e14) && (s9 = r10.offsetLeft, f5 = r10.offsetTop);
      }
      return { width: l10, height: c8, x: s9, y: f5 };
    }(e13, r9)) : s8(i10) ? function(t7, e14) {
      const n11 = w3(t7, true, "fixed" === e14), o13 = n11.top + t7.clientTop, i11 = n11.left + t7.clientLeft, r10 = c7(t7) ? y3(t7) : { x: 1, y: 1 }, l10 = t7.clientWidth * r10.x, s9 = t7.clientHeight * r10.y, f5 = i11 * r10.x, u6 = o13 * r10.y;
      return { top: u6, left: f5, right: f5 + l10, bottom: u6 + s9, x: f5, y: u6, width: l10, height: s9 };
    }(i10, r9) : l8(function(t7) {
      var e14;
      const n11 = x3(t7), i11 = v3(t7), r10 = null == (e14 = t7.ownerDocument) ? void 0 : e14.body, l10 = C2(n11.scrollWidth, n11.clientWidth, r10 ? r10.scrollWidth : 0, r10 ? r10.clientWidth : 0), c8 = C2(n11.scrollHeight, n11.clientHeight, r10 ? r10.scrollHeight : 0, r10 ? r10.clientHeight : 0);
      let s9 = -i11.scrollLeft + b3(t7);
      const f5 = -i11.scrollTop;
      return "rtl" === o12(r10 || n11).direction && (s9 += C2(n11.clientWidth, r10 ? r10.clientWidth : 0) - l10), { width: l10, height: c8, x: s9, y: f5 };
    }(x3(e13)));
  }
  var H2 = { getClippingRect: function(t7) {
    let { element: e13, boundary: n11, rootBoundary: r9, strategy: l10 } = t7;
    const c8 = "clippingAncestors" === n11 ? function(t8, e14) {
      const n12 = e14.get(t8);
      if (n12)
        return n12;
      let r10 = F(t8).filter((t9) => s8(t9) && "body" !== i8(t9)), l11 = null;
      const c9 = "fixed" === o12(t8).position;
      let f6 = c9 ? E3(t8) : t8;
      for (; s8(f6) && !m4(f6); ) {
        const t9 = o12(f6), e15 = h6(f6);
        (c9 ? e15 || l11 : e15 || "static" !== t9.position || !l11 || !["absolute", "fixed"].includes(l11.position)) ? l11 = t9 : r10 = r10.filter((t10) => t10 !== f6), f6 = E3(f6);
      }
      return e14.set(t8, r10), r10;
    }(e13, this._c) : [].concat(n11), f5 = [...c8, r9], u6 = f5[0], a5 = f5.reduce((t8, n12) => {
      const o13 = A3(e13, n12, l10);
      return t8.top = C2(o13.top, t8.top), t8.right = W(o13.right, t8.right), t8.bottom = W(o13.bottom, t8.bottom), t8.left = C2(o13.left, t8.left), t8;
    }, A3(e13, u6, l10));
    return { width: a5.right - a5.left, height: a5.bottom - a5.top, x: a5.left, y: a5.top };
  }, convertOffsetParentRelativeRectToViewportRelativeRect: function(t7) {
    let { rect: e13, offsetParent: n11, strategy: o13 } = t7;
    const r9 = c7(n11), l10 = x3(n11);
    if (n11 === l10)
      return e13;
    let s9 = { scrollLeft: 0, scrollTop: 0 }, f5 = { x: 1, y: 1 };
    const u6 = { x: 0, y: 0 };
    if ((r9 || !r9 && "fixed" !== o13) && (("body" !== i8(n11) || a4(l10)) && (s9 = v3(n11)), c7(n11))) {
      const t8 = w3(n11);
      f5 = y3(n11), u6.x = t8.x + n11.clientLeft, u6.y = t8.y + n11.clientTop;
    }
    return { width: e13.width * f5.x, height: e13.height * f5.y, x: e13.x * f5.x - s9.scrollLeft * f5.x + u6.x, y: e13.y * f5.y - s9.scrollTop * f5.y + u6.y };
  }, isElement: s8, getDimensions: function(t7) {
    if (c7(t7))
      return { width: t7.offsetWidth, height: t7.offsetHeight };
    const e13 = w3(t7);
    return { width: e13.width, height: e13.height };
  }, getOffsetParent: T3, getDocumentElement: x3, getScale: y3, async getElementRects(t7) {
    let { reference: e13, floating: n11, strategy: o13 } = t7;
    const i10 = this.getOffsetParent || T3, r9 = this.getDimensions;
    return { reference: L3(e13, await i10(n11), o13), floating: { x: 0, y: 0, ...await r9(n11) } };
  }, getClientRects: (t7) => Array.from(t7.getClientRects()), isRTL: (t7) => "rtl" === o12(t7).direction };
  function S3(t7, e13, n11, o13) {
    void 0 === o13 && (o13 = {});
    const { ancestorScroll: i10 = true, ancestorResize: r9 = true, elementResize: l10 = true, animationFrame: c8 = false } = o13, f5 = i10 && !c8, u6 = f5 || r9 ? [...s8(t7) ? F(t7) : t7.contextElement ? F(t7.contextElement) : [], ...F(e13)] : [];
    u6.forEach((t8) => {
      f5 && t8.addEventListener("scroll", n11, { passive: true }), r9 && t8.addEventListener("resize", n11);
    });
    let a5, d5 = null;
    if (l10) {
      let o14 = true;
      d5 = new ResizeObserver(() => {
        o14 || n11(), o14 = false;
      }), s8(t7) && !c8 && d5.observe(t7), s8(t7) || !t7.contextElement || c8 || d5.observe(t7.contextElement), d5.observe(e13);
    }
    let h7 = c8 ? w3(t7) : null;
    return c8 && function e14() {
      const o14 = w3(t7);
      !h7 || o14.x === h7.x && o14.y === h7.y && o14.width === h7.width && o14.height === h7.height || n11();
      h7 = o14, a5 = requestAnimationFrame(e14);
    }(), n11(), () => {
      var t8;
      u6.forEach((t9) => {
        f5 && t9.removeEventListener("scroll", n11), r9 && t9.removeEventListener("resize", n11);
      }), null == (t8 = d5) || t8.disconnect(), d5 = null, c8 && cancelAnimationFrame(a5);
    };
  }
  var O2 = (t7, n11, o13) => {
    const i10 = /* @__PURE__ */ new Map(), r9 = { platform: H2, ...o13 }, l10 = { ...r9.platform, _c: i10 };
    return o11(t7, n11, { ...r9, platform: l10 });
  };

  // src/common/controllers/ScrollbarController.ts
  var _ScrollbarController = class {
    constructor(host) {
      host.addController(this);
    }
    hostDisconnected() {
      this.unlockScroll();
    }
    lockScroll() {
      if (_ScrollbarController.locks.size === 0) {
        const documentWidth = document.documentElement.clientWidth;
        const width = Math.abs(window.innerWidth - documentWidth);
        const computedStyle = getComputedStyle(document.body);
        const paddingRight = parseInt(computedStyle.paddingRight, 10) || 0;
        _ScrollbarController.setStyle("--n-scrollbar-gutter", `${width + paddingRight}px`);
        _ScrollbarController.setStyle("overflow", "hidden");
        _ScrollbarController.setStyle("padding-right", `var(--n-scrollbar-gutter)`);
      }
      _ScrollbarController.locks.add(this);
    }
    unlockScroll() {
      _ScrollbarController.locks.delete(this);
      if (_ScrollbarController.locks.size === 0) {
        _ScrollbarController.resets.forEach((reset) => reset());
        _ScrollbarController.resets = [];
      }
    }
    static setStyle(property, value) {
      const { style } = document.body;
      const previous = style.getPropertyValue(property);
      style.setProperty(property, value);
      _ScrollbarController.resets.push(() => style.setProperty(property, previous));
    }
  };
  var ScrollbarController = _ScrollbarController;
  ScrollbarController.locks = /* @__PURE__ */ new Set();
  ScrollbarController.resets = [];

  // src/common/mixins/FloatingComponentMixin.ts
  function FloatingMixin(superClass) {
    class FloatingElement extends superClass {
      constructor() {
        super(...arguments);
        this.open = false;
        this.align = "start";
        this.position = "block-end";
      }
    }
    __decorateClass([
      e5({ type: Boolean, reflect: true })
    ], FloatingElement.prototype, "open", 2);
    __decorateClass([
      e5({ reflect: true })
    ], FloatingElement.prototype, "align", 2);
    __decorateClass([
      e5({ reflect: true })
    ], FloatingElement.prototype, "position", 2);
    return FloatingElement;
  }

  // src/popout/Popout.scss
  var styles18 = i`:host {
  position: fixed;
  pointer-events: none;
  z-index: var(--n-index-popout);
  left: var(--_n-popout-position-x);
  top: var(--_n-popout-position-y);
  color: var(--n-color-text);
  opacity: 0;
  transition: opacity var(--n-transition-slowly);
}

.n-popout {
  pointer-events: none;
  transform: translateY(-10px) scale(0.97);
  visibility: hidden;
  transition: transform var(--n-transition-slowly), visibility var(--n-transition-slowly);
  transform-origin: top left;
  will-change: transform, opacity, visibility;
  background: var(--n-color-surface);
  box-shadow: var(--n-box-shadow-popout);
  border-radius: var(--n-border-radius-s);
}

:host([open]) {
  opacity: 1;
}

:host([open]) .n-popout {
  transition-property: transform;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0) translateX(0) scale(1);
}

@media (max-width: 35.9375em) {
  :host {
    position: fixed;
    inset: 0;
    overflow-y: auto;
    opacity: 1;
    background: 0 0;
    transition: background var(--n-transition-mobile);
  }
  :host([open]) {
    pointer-events: auto;
    background: var(--n-color-overlay);
  }
  :host .n-popout {
    position: fixed;
    inset: 0;
    inset-block-start: auto;
    transform: translateY(100%);
    transition: transform var(--n-transition-mobile), visibility var(--n-transition-mobile);
    transform-origin: bottom center;
    border-radius: 0;
  }
}
.top-end, .top-start {
  transform: translateY(10px) scale(0.97);
}

.left-end, .left-start {
  transform: translateX(10px) scale(0.97);
}

.right-end, .right-start {
  transform: translateX(-10px) scale(0.97);
}

.bottom-start.is-rtl, .left-end, .top-end {
  transform-origin: bottom right;
}

.bottom-end, .left-start, .top-start.is-rtl {
  transform-origin: top right;
}

.bottom-end.is-rtl, .right-end, .right-start {
  transform-origin: bottom left;
}

.right-start, .top-end.is-rtl {
  transform-origin: top left;
}`;
  var Popout_default = styles18;

  // src/common/positioning.ts
  var logicalMapLTR = {
    "inline-start-start": "left-start",
    "inline-start-end": "left-end",
    "inline-end-start": "right-start",
    "inline-end-end": "right-end",
    "block-start-start": "top-start",
    "block-start-end": "top-end",
    "block-end-start": "bottom-start",
    "block-end-end": "bottom-end"
  };
  var logicalMapRTL = {
    "inline-start-start": "right-start",
    "inline-start-end": "right-end",
    "inline-end-start": "left-start",
    "inline-end-end": "left-end",
    "block-start-start": "top-start",
    "block-start-end": "top-end",
    "block-end-start": "bottom-start",
    "block-end-end": "bottom-end"
  };
  var logicalMap = {
    "block-end": "bottom",
    "block-start": "top",
    "inline-start": "left",
    "inline-end": "right"
  };
  function logicalToPhysical(logicalSide, alignment, dir) {
    if (alignment != null && dir != null) {
      const logicalSideAlign = `${logicalSide}-${alignment}`;
      return dir === "ltr" ? logicalMapLTR[logicalSideAlign] : logicalMapRTL[logicalSideAlign];
    }
    return logicalMap[logicalSide];
  }

  // src/popout/Popout.ts
  var mediaQuery = matchMedia("(max-width: 35.9375em)");
  var Popout = class extends FloatingMixin(s4) {
    constructor() {
      super(...arguments);
      this.scrollBar = new ScrollbarController(this);
      this.dismiss = new LightDismissController(this, {
        isOpen: () => this.open,
        onDismiss: (e13) => this.hide(e13.type !== "click"),
        isDismissible: (node) => node !== this.popout && node !== this.targetElement
      });
      this.events = new EventController(this);
      this.direction = new DirectionController(this);
      this.smallViewport = mediaQuery.matches;
      this.id = "";
      this.enableScroll = () => {
        if (!this.open) {
          this.scrollBar.unlockScroll();
        }
      };
      this.updatePosition = () => __async(this, null, function* () {
        var _a;
        const { x: x4, y: y4, placement, middlewareData } = yield O2(this.anchorElement, this, {
          strategy: "fixed",
          placement: logicalToPhysical(this.position, this.align, this.direction.dir),
          middleware: [
            T2(8),
            b2(),
            E2({
              padding: 8
            }),
            P2()
          ]
        });
        this.computedPosition = placement;
        this.style.setProperty("--_n-popout-position-x", `${x4}px`);
        this.style.setProperty("--_n-popout-position-y", `${y4}px`);
        if ((_a = middlewareData.hide) == null ? void 0 : _a.referenceHidden) {
          this.hide();
        }
      });
      this.toggleOpen = (e13) => {
        e13.preventDefault();
        if (this.open) {
          this.hide(false);
        } else if (!this.smallViewport) {
          this.updatePosition().then(() => this.show());
        } else {
          this.show();
        }
      };
      this.handleMediaQueryChange = () => {
        var _a;
        this.smallViewport = mediaQuery.matches;
        (_a = this.cleanupAutoUpdate) == null ? void 0 : _a.call(this);
        if (!this.smallViewport && this.open) {
          this.cleanupAutoUpdate = S3(this.anchorElement, this, this.updatePosition);
          this.scrollBar.unlockScroll();
        } else if (this.open) {
          this.scrollBar.lockScroll();
        }
      };
    }
    show() {
      if (this.open) {
        return;
      }
      this.open = true;
      this.updateComplete.then(() => {
        this.dispatchEvent(new NordEvent("open"));
      });
    }
    hide(moveFocusToButton = true) {
      var _a;
      if (!this.open) {
        return;
      }
      this.open = false;
      (_a = this.cleanupAutoUpdate) == null ? void 0 : _a.call(this);
      this.dispatchEvent(new NordEvent("close"));
      if (moveFocusToButton) {
        this.targetElement.focus({ preventScroll: true });
      }
    }
    firstUpdated() {
      if (!this.smallViewport) {
        this.updatePosition();
      }
    }
    connectedCallback() {
      super.connectedCallback();
      this.targetElement = this.getToggle();
      this.anchorElement = this.anchor ? this.getAnchor() : this.targetElement;
      this.events.listen(this.targetElement, "click", this.toggleOpen);
      this.events.listen(mediaQuery, "change", this.handleMediaQueryChange);
    }
    disconnectedCallback() {
      var _a;
      super.disconnectedCallback();
      (_a = this.cleanupAutoUpdate) == null ? void 0 : _a.call(this);
      this.targetElement.removeAttribute("aria-expanded");
    }
    render() {
      return y`
      <div
        class="n-popout ${this.computedPosition} is-${this.direction.dir}"
        aria-hidden=${this.open ? "false" : "true"}
        @transitionend=${this.enableScroll}
      >
        <slot></slot>
      </div>
    `;
    }
    handleIdChange() {
      if (!this.id) {
        console.warn("NORD: popout requires an id attribute and value");
      }
    }
    handleOpenChange() {
      var _a;
      this.targetElement.setAttribute("aria-expanded", `${this.open}`);
      if (this.open) {
        if (this.smallViewport) {
          this.scrollBar.lockScroll();
        } else {
          this.cleanupAutoUpdate = S3(this.anchorElement, this, this.updatePosition);
        }
      } else {
        (_a = this.cleanupAutoUpdate) == null ? void 0 : _a.call(this);
      }
    }
    getToggle() {
      const rootNode = this.getRootNode();
      const toggle = rootNode.querySelector(`[aria-controls='${this.id}']`);
      if (toggle instanceof HTMLSlotElement) {
        return toggle.assignedElements()[0];
      }
      return toggle;
    }
    getAnchor() {
      const rootNode = this.getRootNode();
      const anchor = rootNode.querySelector(`#${this.anchor}`);
      if (anchor instanceof HTMLSlotElement) {
        return anchor.assignedElements()[0];
      }
      return anchor;
    }
  };
  Popout.styles = [Component_default, Popout_default];
  __decorateClass([
    i4(".n-popout", true)
  ], Popout.prototype, "popout", 2);
  __decorateClass([
    t3()
  ], Popout.prototype, "computedPosition", 2);
  __decorateClass([
    t3()
  ], Popout.prototype, "smallViewport", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Popout.prototype, "id", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Popout.prototype, "anchor", 2);
  __decorateClass([
    observe("id")
  ], Popout.prototype, "handleIdChange", 1);
  __decorateClass([
    observe("open")
  ], Popout.prototype, "handleOpenChange", 1);
  Popout = __decorateClass([
    e4("kabal-popout")
  ], Popout);

  // src/stack/Stack.scss
  var styles19 = i`:host {
  --_n-stack-gap: var(--n-stack-gap, var(--n-space-m));
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  color: var(--n-color-text);
  gap: var(--_n-stack-gap);
  max-inline-size: 100%;
  inline-size: 100%;
}

:host([direction=horizontal]) {
  flex-direction: row;
}

:host([wrap]) {
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  :host([responsive]) {
    flex-direction: column !important;
  }
}
:host([align-items=center]) {
  align-items: center;
}

:host([align-items=start]) {
  align-items: flex-start;
}

:host([align-items=end]) {
  align-items: flex-end;
}

:host([justify-content=center]) {
  justify-content: center;
}

:host([justify-content=start]) {
  justify-content: flex-start;
}

:host([justify-content=end]) {
  justify-content: flex-end;
}

:host([justify-content=space-between]) {
  justify-content: space-between;
}

:host([justify-content=space-evenly]) {
  justify-content: space-evenly;
}

:host([justify-content=space-around]) {
  justify-content: space-around;
}

::slotted(*) {
  margin: 0 !important;
  min-inline-size: 0;
  max-inline-size: 100%;
}

:host([gap=none]) {
  --_n-stack-gap: var(--n-stack-gap, 0) ;
}

:host([gap=s]) {
  --_n-stack-gap: var(--n-stack-gap, var(--n-space-s)) ;
}

:host([gap=m]) {
  --_n-stack-gap: var(--n-stack-gap, var(--n-space-m)) ;
}

:host([gap=l]) {
  --_n-stack-gap: var(--n-stack-gap, var(--n-space-l)) ;
}

:host([gap=xl]) {
  --_n-stack-gap: var(--n-stack-gap, var(--n-space-xl)) ;
}

:host([gap=xxl]) {
  --_n-stack-gap: var(--n-stack-gap, var(--n-space-xxl)) ;
}`;
  var Stack_default = styles19;

  // src/stack/Stack.ts
  var Stack = class extends s4 {
    constructor() {
      super(...arguments);
      this.gap = "m";
      this.direction = "vertical";
      this.alignItems = "stretch";
      this.responsive = false;
      this.wrap = false;
    }
    render() {
      return y`<slot></slot>`;
    }
  };
  Stack.styles = [Component_default, Stack_default];
  __decorateClass([
    e5({ reflect: true })
  ], Stack.prototype, "gap", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Stack.prototype, "direction", 2);
  __decorateClass([
    e5({ reflect: true, attribute: "align-items" })
  ], Stack.prototype, "alignItems", 2);
  __decorateClass([
    e5({ reflect: true, type: Boolean })
  ], Stack.prototype, "responsive", 2);
  __decorateClass([
    e5({ reflect: true, type: Boolean })
  ], Stack.prototype, "wrap", 2);
  __decorateClass([
    e5({ reflect: true, attribute: "justify-content" })
  ], Stack.prototype, "justifyContent", 2);
  Stack = __decorateClass([
    e4("kabal-stack")
  ], Stack);

  // src/date-picker/DatePicker.scss
  var styles20 = i`:host {
  color: var(--n-color-text);
  position: relative;
}

:host(:not([expand])) .n-date-picker-input {
  max-inline-size: max-content;
}

.n-date-picker-calendar {
  --n-calendar-box-shadow:none;
}

@media (max-width: 35.9375em) {
  .n-date-picker-header {
    padding: calc(var(--n-space-s) * 1.5) var(--n-space-m);
    border-block-end: 1px solid var(--n-color-border);
  }
  .n-date-picker-calendar {
    --_n-calendar-padding:var(--n-space-l);
  }
}
.n-date-picker-close-button {
  --n-button-border-radius:var(--n-border-radius-circle);
  --_n-button-padding-inline:calc(var(--n-space-s) / 1.3);
  --_n-button-padding-block:0;
  opacity: 0;
  position: absolute;
  inset-block-start: calc(var(--n-space-s) * -1);
  inset-inline-end: calc(var(--n-space-s) * -1);
}

.n-date-picker-close-button:focus {
  opacity: 1;
}

.n-date-picker-heading {
  display: none;
  font-weight: var(--n-font-weight-active);
}

@media (max-width: 35.9375em) {
  .n-date-picker-close-button {
    opacity: 1;
    position: relative;
    inset: auto;
  }
  .n-date-picker-heading {
    display: initial;
  }
}`;
  var DatePicker_default = styles20;

  // src/date-picker/date-adapter.ts
  var isoAdapter = { parse: parseISODate, format: printISODate };

  // src/date-picker/DatePicker.ts
  Icon.registerIcon(interface_calendar_exports);
  Icon.registerIcon(interface_close_small_exports);
  var isDateDisabled2 = () => false;
  var isDateHighlighted2 = () => false;
  var DatePicker = class extends SizeMixin(
    FormAssociatedMixin(ReadonlyMixin(InputMixin(FocusableMixin(s4))))
  ) {
    constructor() {
      super(...arguments);
      this.swipe = new SwipeController(this, {
        target: () => this.popout,
        matchesGesture: isDownwardsSwipe,
        onSwipeEnd: () => this.hide()
      });
      this.localize = new LocalizeController(this, {
        onLangChange: () => this.createDateFormatters()
      });
      this.value = "";
      this.open = false;
      this.min = "";
      this.max = "";
      this.direction = "right";
      this.firstDayOfWeek = 1 /* Monday */;
      this.dateAdapter = isoAdapter;
      this.isDateDisabled = isDateDisabled2;
      this.isDateHighlighted = isDateHighlighted2;
      this.expand = false;
      this.handleDaySelect = (e13) => {
        e13.stopPropagation();
        this.setValue(e13.date);
        this.hide();
      };
      this.handleBlur = (event) => {
        event.stopPropagation();
        this.dispatchEvent(new NordEvent("blur"));
      };
      this.handleFocus = (event) => {
        event.stopPropagation();
        this.dispatchEvent(new NordEvent("focus"));
      };
      this.handleInputChange = (e13) => {
        const target = e13.target;
        const parsed = this.dateAdapter.parse(target.value, createDate);
        if (parsed || target.value === "") {
          this.setValue(parsed);
        }
      };
    }
    get valueAsDate() {
      return parseISODate(this.value);
    }
    set valueAsDate(date) {
      this.value = date ? printISODate(date) : "";
    }
    get valueAsNumber() {
      var _a, _b;
      return (_b = (_a = this.valueAsDate) == null ? void 0 : _a.getTime()) != null ? _b : NaN;
    }
    set valueAsNumber(date) {
      this.value = date ? printISODate(new Date(date)) : "";
    }
    render() {
      const { valueAsDate } = this;
      const formattedDate = valueAsDate ? this.dateAdapter.format(valueAsDate) : "";
      return y`
      <kabal-input
        class="n-date-picker-input"
        value=${formattedDate}
        label=${l5(this.label)}
        hint=${l5(this.hint)}
        error=${l5(this.error)}
        placeholder=${l5(this.placeholder)}
        id=${this.inputId}
        size=${this.size}
        ?expand=${this.expand}
        ?disabled=${this.disabled}
        ?required=${this.required}
        ?readonly=${this.readonly}
        ?hide-label=${this.hideLabel}
        disallow-pattern="[^0-9./-]"
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @input=${this.handleInputChange}
        ${n7(this.focusableRef)}
        aria-invalid=${cond(this.error, "true")}
        aria-describedby=${l5(this.getDescribedBy())}
      >
        ${!this.hintSlot.isEmpty ? y`<slot name="hint" slot="hint"></slot>` : b}
        ${!this.labelSlot.isEmpty ? y`<slot name="label" slot="label"></slot>` : b}
        <kabal-button
          size=${this.size}
          ?disabled=${this.disabled || this.readonly}
          slot="end"
          class="n-date-picker-toggle"
          aria-controls="popout"
          type="button"
        >
          <kabal-icon name="interface-calendar"></kabal-icon>
          <kabal-visually-hidden>
            ${this.localize.term("buttonLabel")}
            ${valueAsDate ? y`
                  <span>
                    , ${this.localize.term("selectedDateMessage")} ${this.dateFormatLong.format(valueAsDate)}
                  </span>
                ` : b}
          </kabal-visually-hidden>
        </kabal-button>
      </kabal-input>
      <kabal-popout
        id="popout"
        anchor=${this.inputId}
        align="end"
        position="block-end"
        role="dialog"
        aria-modal="true"
        ?open=${this.open}
        @open=${this.handleOpen}
        @close=${this.handleClose}
        aria-labelledby="header"
      >
        <div aria-hidden="true" tabindex="0" @focus=${this.focusLast}></div>

        <kabal-stack class="n-date-picker-header" direction="horizontal" justify-content="space-between">
          <div class="n-date-picker-heading" id="header">${this.localize.term("modalHeading")}</div>
          <kabal-button
            class="n-date-picker-close-button"
            type="button"
            size="s"
            variant="plain"
            @click=${this.handleClose}
          >
            <kabal-visually-hidden>${this.localize.term("closeLabel")}</kabal-visually-hidden>
            <kabal-icon name="interface-close-small"></kabal-icon>
          </kabal-button>
        </kabal-stack>

        <kabal-calendar
          class="n-date-picker-calendar"
          expand
          value=${this.value}
          min=${this.min}
          max=${this.max}
          .firstDayOfWeek=${this.firstDayOfWeek}
          .isDateDisabled=${this.isDateDisabled}
          .isDateHighlighted=${this.isDateHighlighted}
          @change=${this.handleDaySelect}
        ></kabal-calendar>

        <div aria-hidden="true" tabindex="0" @focus=${this.focusFirst}></div>
      </kabal-popout>
    `;
    }
    createDateFormatters() {
      this.dateFormatLong = new Intl.DateTimeFormat(this.localize.resolvedLang, {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }
    focusFirst() {
      this.closeButton.focus();
    }
    focusLast() {
      this.calendar.focus({ target: "day" });
    }
    handleOpen() {
      this.open = true;
      this.calendar.focus({ target: "month" });
    }
    handleClose() {
      this.open = false;
    }
    setValue(date) {
      this.value = date ? printISODate(date) : "";
      this.dispatchEvent(new NordEvent("change"));
    }
    hide(moveFocusToButton) {
      this.popout.hide(moveFocusToButton);
    }
    show() {
      this.popout.show();
    }
  };
  DatePicker.styles = [Component_default, FormField_default, TextField_default, DatePicker_default];
  __decorateClass([
    i4(`.n-date-picker-toggle`, true)
  ], DatePicker.prototype, "toggleButton", 2);
  __decorateClass([
    i4(`.n-date-picker-close-button`, true)
  ], DatePicker.prototype, "closeButton", 2);
  __decorateClass([
    i4(`kabal-calendar`, true)
  ], DatePicker.prototype, "calendar", 2);
  __decorateClass([
    i4(`[role="dialog"]`, true)
  ], DatePicker.prototype, "popout", 2);
  __decorateClass([
    e5()
  ], DatePicker.prototype, "value", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], DatePicker.prototype, "open", 2);
  __decorateClass([
    e5()
  ], DatePicker.prototype, "min", 2);
  __decorateClass([
    e5()
  ], DatePicker.prototype, "max", 2);
  __decorateClass([
    e5()
  ], DatePicker.prototype, "direction", 2);
  __decorateClass([
    e5({ attribute: "first-day-of-week", type: Number })
  ], DatePicker.prototype, "firstDayOfWeek", 2);
  __decorateClass([
    e5({ attribute: false })
  ], DatePicker.prototype, "dateAdapter", 2);
  __decorateClass([
    e5({ attribute: false })
  ], DatePicker.prototype, "isDateDisabled", 2);
  __decorateClass([
    e5({ attribute: false })
  ], DatePicker.prototype, "isDateHighlighted", 2);
  __decorateClass([
    e5({ reflect: true, type: Boolean })
  ], DatePicker.prototype, "expand", 2);
  DatePicker = __decorateClass([
    e4("kabal-date-picker")
  ], DatePicker);

  // src/divider/Divider.scss
  var styles21 = i`:host {
  --_n-divider-color:var(--n-divider-color, var(--n-color-border));
  --_n-divider-size:var(--n-divider-size, 1px);
}

:host([direction=horizontal]) {
  display: block;
  border-block-start: var(--_n-divider-size) solid var(--_n-divider-color);
}

:host([direction=vertical]) {
  display: inline-block;
  min-block-size: 100%;
  border-inline-start: var(--_n-divider-size) solid var(--_n-divider-color);
}`;
  var Divider_default = styles21;

  // src/divider/Divider.ts
  var Divider = class extends s4 {
    constructor() {
      super(...arguments);
      this.direction = "horizontal";
    }
    firstUpdated() {
      this.setAttribute("role", "separator");
    }
    handleDirectionChange() {
      this.setAttribute("aria-orientation", this.direction === "vertical" ? "vertical" : "horizontal");
    }
  };
  Divider.styles = [Component_default, Divider_default];
  __decorateClass([
    e5({ reflect: true })
  ], Divider.prototype, "direction", 2);
  __decorateClass([
    observe("direction")
  ], Divider.prototype, "handleDirectionChange", 1);
  Divider = __decorateClass([
    e4("kabal-divider")
  ], Divider);

  // src/drawer/Drawer.scss
  var styles22 = i`:host {
  --_n-drawer-padding: var(--n-drawer-padding, var(--n-space-l)) ;
}

.n-drawer {
  display: flex;
  flex-direction: column;
  block-size: 100%;
}

.n-drawer-main {
  flex: 1;
  padding: var(--_n-drawer-padding);
  overflow-y: auto;
}

.n-drawer-footer {
  padding: var(--n-space-m) var(--n-space-l);
  border-block-start: 1px solid var(--n-color-border);
}

:host([padding=none]) {
  --_n-drawer-padding: var(--n-drawer-padding, 0) ;
}

::slotted(kabal-header) {
  --_n-header-box-shadow: none ;
}

slot[name=footer] {
  display: flex;
  justify-content: flex-end;
  gap: var(--n-space-s);
  flex-direction: row;
  align-items: center;
}`;
  var Drawer_default = styles22;

  // src/drawer/Drawer.ts
  var Drawer = class extends DraftComponentMixin(s4) {
    constructor() {
      super(...arguments);
      this.footerSlot = new SlotController(this, "footer");
      this.padding = "m";
      this.open = false;
    }
    show() {
      this.open = true;
    }
    close() {
      this.open = false;
    }
    handleOpenUpdated() {
      console.log("drawer changed");
    }
    render() {
      return y`
      <div class="n-drawer ${this.open ? "open" : "closed"}">
        <slot name="header"></slot>

        <div class="n-drawer-main">
          <slot></slot>
        </div>

        <div class="n-drawer-footer" ?hidden=${this.footerSlot.isEmpty}>
          <slot name=${this.footerSlot.slotName}></slot>
        </div>
      </div>
    `;
    }
  };
  Drawer.styles = [Component_default, Drawer_default];
  __decorateClass([
    e5({ reflect: true })
  ], Drawer.prototype, "padding", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Drawer.prototype, "open", 2);
  __decorateClass([
    observe("open")
  ], Drawer.prototype, "handleOpenUpdated", 1);
  Drawer = __decorateClass([
    e4("kabal-drawer")
  ], Drawer);

  // src/dropdown/Dropdown.scss
  var styles23 = i`:host {
  --_n-dropdown-size:var(--n-dropdown-size, 250px);
}

.n-dropdown-content {
  padding: var(--n-space-s) 0;
  min-inline-size: var(--_n-dropdown-size);
  max-inline-size: calc(var(--_n-dropdown-size) * 1.5);
}

@media (max-width: 35.9375em) {
  .n-dropdown-content {
    max-block-size: 80vh;
    max-inline-size: none;
    overflow-y: auto;
  }
}
::slotted(kabal-dropdown-group), ::slotted(kabal-dropdown-item) {
  padding-inline-start: var(--n-space-s);
  padding-inline-end: var(--n-space-s);
}

::slotted(kabal-dropdown-group) {
  padding-block-end: var(--n-space-s);
  border-block-end: 1px solid var(--n-color-border);
  margin-block-end: var(--n-space-s);
}

::slotted(kabal-dropdown-group:last-child) {
  padding-block-end: 0;
  border-block-end: 0;
  margin-block-end: 0;
}

slot[name=toggle] {
  display: inline-block;
}

:host([expand]) slot[name=toggle] {
  inline-size: 100%;
}

:host([size=s]) {
  --_n-dropdown-size:var(--n-dropdown-size, 150px);
}

:host([size=l]) {
  --_n-dropdown-size:var(--n-dropdown-size, 300px);
}`;
  var Dropdown_default = styles23;

  // src/dropdown/Dropdown.ts
  var Dropdown = class extends FloatingMixin(s4) {
    constructor() {
      super(...arguments);
      this.expand = false;
      this.size = "m";
    }
    connectedCallback() {
      super.connectedCallback();
      const toggle = this.querySelector(`[slot="toggle"]`);
      toggle == null ? void 0 : toggle.setAttribute("aria-haspopup", "true");
    }
    render() {
      return y`
      <div class="n-dropdown" @focusout=${this.handleBlur}>
        <slot name="toggle" aria-controls="popout"></slot>
        <kabal-popout
          id="popout"
          align=${l5(this.align)}
          position=${l5(this.position)}
          ?open=${this.open}
          @open=${this.handleOpen}
          @close=${this.handleClose}
        >
          <div class="n-dropdown-content">
            <slot></slot>
          </div>
        </kabal-popout>
      </div>
    `;
    }
    handleBlur(e13) {
      const relatedTarget = e13.relatedTarget;
      if (relatedTarget && !this.contains(relatedTarget)) {
        this.popout.hide(false);
      }
    }
    handleOpen() {
      var _a;
      this.open = true;
      (_a = this.querySelector("kabal-dropdown-item")) == null ? void 0 : _a.focus();
    }
    handleClose() {
      this.open = false;
    }
    hide(moveFocusToButton) {
      this.popout.hide(moveFocusToButton);
    }
    show() {
      this.popout.show();
    }
  };
  Dropdown.styles = [Component_default, Dropdown_default];
  Dropdown.shadowRootOptions = __spreadProps(__spreadValues({}, s4.shadowRootOptions), { delegatesFocus: true });
  __decorateClass([
    i4("kabal-popout", true)
  ], Dropdown.prototype, "popout", 2);
  __decorateClass([
    e5({ reflect: true, type: Boolean })
  ], Dropdown.prototype, "expand", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Dropdown.prototype, "size", 2);
  Dropdown = __decorateClass([
    e4("kabal-dropdown")
  ], Dropdown);

  // src/dropdown-group/DropdownGroup.scss
  var styles24 = i`.n-dropdown-group-heading {
  font-size: var(--n-font-size-xs);
  font-weight: var(--n-font-weight-heading);
  color: var(--n-color-text-weaker);
  padding: calc(var(--n-space-s) / 2) var(--n-space-s);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 35.9375em) {
  .n-dropdown-group-heading {
    padding: calc(var(--n-space-s) / 1.5) var(--n-space-m);
  }
}
.n-dropdown-group-content {
  display: flex;
  flex-direction: column;
}`;
  var DropdownGroup_default = styles24;

  // src/dropdown-group/DropdownGroup.ts
  var DropdownGroup = class extends s4 {
    render() {
      return y`
      <div class="n-dropdown-group">
        ${this.heading ? y`<p id="heading" aria-hidden="true" class="n-dropdown-group-heading">${this.heading}</p>` : b}
        <div class="n-dropdown-group-content" role="group" aria-labelledby=${this.heading ? "heading" : b}>
          <slot></slot>
        </div>
      </div>
    `;
    }
  };
  DropdownGroup.styles = [Component_default, DropdownGroup_default];
  __decorateClass([
    e5()
  ], DropdownGroup.prototype, "heading", 2);
  DropdownGroup = __decorateClass([
    e4("kabal-dropdown-group")
  ], DropdownGroup);

  // src/dropdown-item/DropdownItem.scss
  var styles25 = i`:host {
  display: flex;
  line-height: var(--n-line-height-tight);
}

.n-dropdown-item {
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  display: flex;
  flex: 1;
  gap: var(--n-space-s);
  align-items: center;
  font-family: inherit;
  font-size: inherit;
  text-decoration: none;
  border: 0;
  color: var(--n-color-text);
  padding: var(--n-space-s);
  border-radius: var(--n-border-radius-s);
  background: 0 0;
  text-align: start;
  box-shadow: var(--n-dropdown-item-box-shadow, none);
  min-inline-size: 0;
}

.n-dropdown-item:hover {
  background: var(--n-color-accent);
  color: var(--n-color-text-on-accent);
}

.n-dropdown-item:hover ::slotted(*) {
  color: var(--n-color-text-on-accent) !important;
}

.n-dropdown-item ::slotted(kabal-icon) {
  color: var(--n-color-icon);
}

.n-dropdown-item:hover ::slotted(kabal-icon) {
  color: currentColor;
}

.n-dropdown-item:active {
  opacity: 0.7;
}

.n-dropdown-item:focus {
  --n-dropdown-item-box-shadow: 0 0 0 2px var(--n-color-accent);
  outline: 0;
  position: relative;
  z-index: var(--n-index-masked);
}

@supports selector(:focus-visible) {
  .n-dropdown-item:focus {
    --n-dropdown-item-box-shadow: none ;
  }
  .n-dropdown-item:focus-visible {
    --n-dropdown-item-box-shadow: 0 0 0 2px var(--n-color-accent) ;
  }
}
@media (max-width: 35.9375em) {
  .n-dropdown-item {
    gap: var(--n-space-m);
    padding: calc(var(--n-space-m) / 1.5) var(--n-space-m);
  }
  .n-dropdown-item ::slotted(kabal-icon) {
    block-size: var(--n-size-icon-m);
    inline-size: var(--n-size-icon-m);
  }
}
slot[name=end],
slot[name=start] {
  flex: 0 0 auto;
}

slot[name=end] {
  display: flex;
  margin-inline-start: auto;
}

.n-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

::slotted(kabal-icon:not([size])) {
  --_n-icon-size: var(--n-size-icon-s) ;
}`;
  var DropdownItem_default = styles25;

  // src/dropdown-item/DropdownItem.ts
  var DropdownItem = class extends FocusableMixin(s4) {
    render() {
      const link = (content) => y`<a href=${l5(this.href)} ${n7(this.focusableRef)} class="n-dropdown-item">${content}</a>`;
      const button = (content) => y`<button ${n7(this.focusableRef)} class="n-dropdown-item">${content}</button>`;
      const container = this.href ? link : button;
      return container(y`
      <slot name="start"></slot>
      <span class="n-truncate"><slot></slot></span>
      <slot name="end"></slot>
    `);
    }
  };
  DropdownItem.styles = [Component_default, DropdownItem_default];
  __decorateClass([
    e5({ reflect: true })
  ], DropdownItem.prototype, "href", 2);
  DropdownItem = __decorateClass([
    e4("kabal-dropdown-item")
  ], DropdownItem);

  // src/empty-state/EmptyState.scss
  var styles26 = i`:host {
  background: var(--n-color-surface);
  color: var(--n-color-text);
}

.n-empty-state {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: var(--n-space-xl);
}

@media (max-width: 500px) {
  .n-empty-state {
    padding: var(--n-space-l) var(--n-space-m);
  }
}
::slotted(h1), ::slotted(h2), ::slotted(h3), ::slotted(h4), ::slotted(h5), ::slotted(h6) {
  color: var(--n-color-text) !important;
  margin: 0 0 var(--n-space-m) !important;
  font-weight: var(--n-font-weight-heading) !important;
  font-size: var(--n-font-size-xl) !important;
  line-height: var(--n-line-height-heading) !important;
}

::slotted(p) {
  margin: 0 0 var(--n-space-l) !important;
  font-size: var(--n-font-size-m) !important;
  color: var(--n-color-text-weaker) !important;
  line-height: var(--n-line-height) !important;
  max-inline-size: var(--n-empty-state-text-width, 400px);
}`;
  var EmptyState_default = styles26;

  // src/empty-state/EmptyState.ts
  var EmptyState = class extends s4 {
    render() {
      return y`<div class="n-empty-state">
      <slot></slot>
    </div>`;
    }
  };
  EmptyState.styles = [Component_default, EmptyState_default];
  EmptyState = __decorateClass([
    e4("kabal-empty-state")
  ], EmptyState);

  // src/fieldset/Fieldset.scss
  var styles27 = i`fieldset {
  border: none;
}

.n-label-container {
  margin-block-end: calc(var(--n-space-s) * 2);
}`;
  var Fieldset_default = styles27;

  // src/fieldset/Fieldset.ts
  var Fieldset = class extends s4 {
    constructor() {
      super(...arguments);
      this.errorSlot = new SlotController(this, "error");
      this.hintSlot = new SlotController(this, "hint");
      this.label = "";
      this.required = false;
      this.hideRequired = false;
    }
    render() {
      const { hasError } = this;
      return y`
      <fieldset
        aria-invalid=${cond(hasError, "true")}
        aria-describedby=${cond(hasError, "error")}
        ?aria-required=${this.required}
      >
        <legend class="n-label-container">
          <div class="n-label">
            <slot name="label">${this.label}</slot
            ><span aria-hidden="true" class="n-required" ?hidden=${!this.required || this.hideRequired}>*</span>
          </div>

          <div class="n-caption n-hint" ?hidden=${!this.hasHint}>
            <slot name="hint">${this.hint}</slot>
          </div>
        </legend>

        <slot></slot>

        <div class="n-caption n-error" id="error" role="alert" ?hidden=${!this.hasError}>
          <slot name="error">${this.error}</slot>
        </div>
      </fieldset>
    `;
    }
    get hasHint() {
      return Boolean(this.hint) || this.hintSlot.hasContent;
    }
    get hasError() {
      return Boolean(this.error) || this.errorSlot.hasContent;
    }
  };
  Fieldset.styles = [Component_default, FormField_default, Fieldset_default];
  __decorateClass([
    e5()
  ], Fieldset.prototype, "label", 2);
  __decorateClass([
    e5()
  ], Fieldset.prototype, "hint", 2);
  __decorateClass([
    e5()
  ], Fieldset.prototype, "error", 2);
  __decorateClass([
    e5({ type: Boolean })
  ], Fieldset.prototype, "required", 2);
  __decorateClass([
    e5({ type: Boolean, attribute: "hide-required" })
  ], Fieldset.prototype, "hideRequired", 2);
  Fieldset = __decorateClass([
    e4("kabal-fieldset")
  ], Fieldset);

  // src/header/Header.scss
  var styles28 = i`:host {
  color: var(--n-color-text);
  --_n-header-gutter: var(--n-space-l);
  --_n-header-box-shadow: var(--n-box-shadow-header) ;
}

::slotted(*) {
  margin: 0 !important;
}

::slotted(a) {
  color: var(--n-color-text-link);
  text-decoration: underline;
}

::slotted(a:hover) {
  text-decoration: none;
}

.n-header,
.n-header-end {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: var(--n-space-m);
}

.n-header {
  padding: var(--n-space-m) var(--n-space-l);
  padding-inline-start: var(--_n-header-gutter);
  background-color: var(--n-color-surface);
  border-block-end: 1px solid var(--n-color-border);
  box-shadow: var(--_n-header-box-shadow);
  min-block-size: var(--n-space-xxl);
}

.n-header-end {
  margin-inline-start: auto;
  gap: var(--n-space-s);
}`;
  var Header_default = styles28;

  // src/header/Header.ts
  var Header = class extends s4 {
    constructor() {
      super(...arguments);
      this.endSlot = new SlotController(this, "end");
    }
    render() {
      return y`
      <header class="n-header">
        <slot></slot>
        <div class="n-header-end" ?hidden=${this.endSlot.isEmpty}>
          <slot name="end"></slot>
        </div>
      </header>
    `;
    }
  };
  Header.styles = [Component_default, Header_default];
  Header = __decorateClass([
    e4("kabal-header")
  ], Header);

  // ../../node_modules/lit-html/directives/style-map.js
  var i9 = e7(class extends i5 {
    constructor(t7) {
      var e13;
      if (super(t7), t7.type !== t4.ATTRIBUTE || "style" !== t7.name || (null === (e13 = t7.strings) || void 0 === e13 ? void 0 : e13.length) > 2)
        throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
    }
    render(t7) {
      return Object.keys(t7).reduce((e13, r9) => {
        const s9 = t7[r9];
        return null == s9 ? e13 : e13 + `${r9 = r9.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s9};`;
      }, "");
    }
    update(e13, [r9]) {
      const { style: s9 } = e13.element;
      if (void 0 === this.vt) {
        this.vt = /* @__PURE__ */ new Set();
        for (const t7 in r9)
          this.vt.add(t7);
        return this.render(r9);
      }
      this.vt.forEach((t7) => {
        null == r9[t7] && (this.vt.delete(t7), t7.includes("-") ? s9.removeProperty(t7) : s9[t7] = "");
      });
      for (const t7 in r9) {
        const e14 = r9[t7];
        null != e14 && (this.vt.add(t7), t7.includes("-") ? s9.setProperty(t7, e14) : s9[t7] = e14);
      }
      return x;
    }
  });

  // src/common/storage.ts
  function storage(key, defaultValue, serialize = JSON.stringify, deserialize = JSON.parse) {
    return {
      get value() {
        try {
          const value = localStorage.getItem(key);
          return value ? deserialize(value) : defaultValue;
        } catch (e13) {
          return defaultValue;
        }
      },
      set value(value) {
        try {
          localStorage.setItem(key, serialize(value));
        } catch (e13) {
        }
      }
    };
  }

  // ../../node_modules/@nordhealth/icons/lib/assets/navigation-toggle.js
  var navigation_toggle_exports = {};
  __export(navigation_toggle_exports, {
    default: () => navigation_toggle_default,
    tags: () => tags23,
    title: () => title23
  });
  var navigation_toggle_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path d="M7 21h126M7 70h126M7 119h126" stroke-width="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var title23 = "navigation-toggle";
  var tags23 = "nordicon navigation hamburger menu toggle navigation three lines";

  // ../../node_modules/@nordhealth/icons/lib/assets/navigation-toggle-lock.js
  var navigation_toggle_lock_exports = {};
  __export(navigation_toggle_lock_exports, {
    default: () => navigation_toggle_lock_default,
    tags: () => tags24,
    title: () => title24
  });
  var navigation_toggle_lock_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"><path d="m70 133 60.956-58.044a7 7 0 0 0 0-9.912L70 7"/><path d="m7 133 60.956-58.044a7 7 0 0 0 0-9.912L7 7"/></g></svg>';
  var title24 = "navigation-toggle-lock";
  var tags24 = "nordicon navigation hamburger menu toggle navigation arrow right double lock triangle chevron";

  // src/nav-toggle/NavToggle.scss
  var styles29 = i`:host {
  display: inline-flex;
}

kabal-icon {
  display: block;
}

kabal-icon[name=navigation-toggle-lock] {
  display: none;
}

.is-rtl kabal-icon[name=navigation-toggle-lock] {
  transform: rotate(180deg);
}

@media (min-width: 768px) {
  :host(:is(:hover, :focus-within)) kabal-icon[name=navigation-toggle-lock] {
    display: block;
  }
  :host(:is(:hover, :focus-within)) kabal-icon[name=navigation-toggle] {
    display: none;
  }
}`;
  var NavToggle_default = styles29;

  // src/nav-toggle/NavToggle.ts
  Icon.registerIcon(navigation_toggle_exports);
  Icon.registerIcon(navigation_toggle_lock_exports);
  var NavToggle = class extends FocusableMixin(s4) {
    constructor() {
      super(...arguments);
      this.direction = new DirectionController(this);
      this.localization = new LocalizeController(this);
    }
    render() {
      return y`
      <kabal-button
        variant="plain"
        size="s"
        ${n7(this.focusableRef)}
        class=${o9({ "is-rtl": this.direction.isRTL })}
      >
        <kabal-visually-hidden>${this.localization.term("label")}</kabal-visually-hidden>
        <kabal-icon size="m" color="var(--n-color-icon)" name=${title23} class="nav-unlock"></kabal-icon>
        <kabal-icon size="m" color="var(--n-color-text)" name=${title24} class="nav-lock"></kabal-icon>
      </kabal-button>
    `;
    }
  };
  NavToggle.styles = [Component_default, NavToggle_default];
  NavToggle = __decorateClass([
    e4("kabal-nav-toggle")
  ], NavToggle);

  // src/common/styles/Sticky.scss
  var styles30 = i`:host {
  --_n-sticky-size:0px;
  --_n-sticky-top:var(--n-sticky-top, 0px);
  --_n-sticky-index:var(--n-sticky-index, var(--n-index-sticky));
}

:host([sticky]) .n-sticky {
  position: sticky;
  inset-block-start: var(--_n-sticky-top);
  z-index: var(--_n-sticky-index);
}

:host([sticky]) > * {
  --n-sticky-top:calc(var(--_n-sticky-top) + var(--_n-sticky-size));
  --n-sticky-index:calc(var(--_n-sticky-index) - 1);
}`;
  var Sticky_default = styles30;

  // src/layout/Layout.scss
  var styles31 = i`:host {
  --_n-layout-padding: var(--n-layout-padding, var(--n-space-l));
  --_n-layout-drawer-inline-size: var(--n-layout-drawer-inline-size, 320px);
  --_n-layout-background-color: var(--n-layout-background-color, var(--n-color-background));
  --_n-layout-nav-transition-duration: var(--n-transition-mobile);
  background: var(--_n-layout-background-color);
  color: var(--n-color-text);
}

.n-layout-main,
.n-layout-nav {
  background: var(--_n-layout-background-color);
  min-block-size: 100%;
}

.n-layout-nav {
  position: fixed;
  user-select: none;
  inline-size: var(--_n-layout-nav-width);
  z-index: var(--n-index-nav);
  inset-block-start: 0;
  inset-inline-start: 0;
  inset-block-end: 0;
  transform: translateX(var(--n-nav-transform));
  box-shadow: var(--n-box-shadow-nav);
}

.n-layout-main {
  position: relative;
}

main {
  padding: var(--_n-layout-padding);
}

aside {
  position: fixed;
  z-index: var(--n-index-nav);
  inset-block: 0;
  inset-inline-end: 0;
  inline-size: var(--_n-layout-drawer-inline-size);
  max-inline-size: 100%;
  background: var(--n-color-surface);
  box-shadow: var(--n-box-shadow-nav);
}

@media (min-width: 1240px) {
  .n-has-drawer {
    margin-inline-end: var(--_n-layout-drawer-inline-size);
  }
  aside {
    box-shadow: var(--n-box-shadow-header);
    border-inline-start: 1px solid var(--n-color-border);
  }
}
slot[name=drawer]::slotted(*) {
  block-size: 100% !important;
}

:is([data-nav=closed], [data-nav=unpeek]) .n-layout-nav {
  transform: translateX(-110%);
}

.n-rtl:is([data-nav=closed], [data-nav=unpeek]) .n-layout-nav {
  transform: translateX(110%);
}

[data-screen=narrow] .n-layout-nav {
  z-index: var(--n-index-popout);
  transition: transform var(--_n-layout-nav-transition-duration);
}

[data-screen=wide]:is([data-nav=peek], [data-nav=wait], [data-nav=unpeek], [data-nav=blocked]) .n-layout-nav {
  transition: transform var(--_n-layout-nav-transition-duration);
  border-start-end-radius: var(--n-border-radius);
  border-end-end-radius: var(--n-border-radius);
  min-block-size: 0;
  inset-block-start: calc(var(--n-space-m) * 4);
  inset-block-end: var(--n-space-l);
}

[data-screen=wide][data-nav=opened] .n-layout-nav {
  border-inline-end: 1px solid var(--n-color-border);
  box-shadow: none;
}

[data-screen=wide]:not([data-nav=opened]) .n-layout-nav {
  overflow: hidden;
}

[data-screen=wide][data-nav=opened] .n-layout-main {
  margin-inline-start: var(--_n-layout-nav-width);
}

[data-screen=narrow] .n-layout-main::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: var(--n-index-overlay);
  transition: opacity var(--n-transition-mobile), visibility var(--n-transition-mobile);
  background: var(--n-color-overlay);
}

[data-screen=narrow]:not([data-nav=opened], [data-nav=peek]) .n-layout-main::after {
  visibility: hidden;
  opacity: 0;
}

.n-resize {
  touch-action: none;
  position: absolute;
  min-block-size: 100%;
  inset-block: 0;
  inset-inline-end: -8px;
  inline-size: 10px;
  background: 0 0;
}

[data-nav=opened] .n-resize {
  cursor: col-resize;
}

.n-resize::after {
  content: "";
  position: absolute;
  z-index: var(--n-index-sticky);
  inset-block: 0;
  inset-inline-end: 5px;
  inline-size: 3px;
  background: var(--n-color-accent);
  transition: opacity var(--n-transition-slowly);
  opacity: 0;
}

.n-resize:focus {
  outline: 0;
}

.n-dragging .n-resize::after,
.n-resize:focus::after,
[data-nav=opened] .n-resize:hover::after {
  opacity: 1;
  transition-delay: 0.15s;
}

@supports selector(:focus-visible) {
  .n-resize:focus::after {
    opacity: 0;
  }
  .n-resize:focus-visible::after {
    opacity: 1;
  }
}
.n-dragging {
  cursor: col-resize !important;
  -webkit-user-select: none;
  user-select: none;
}

:host([padding=none]) {
  --_n-layout-padding: var(--n-layout-padding, 0) ;
}

.n-nav-toggle-container {
  position: absolute;
  padding: var(--n-space-m) var(--n-space-l);
  min-block-size: calc(var(--n-space-xxl) - var(--n-space-s) / 2);
  display: flex;
  align-items: center;
}

[data-screen=wide][data-nav=opened] .n-nav-toggle-container {
  display: none;
}

:is([data-screen=wide]:not([data-nav=opened]), [data-screen=narrow]) .n-has-own-nav-toggle slot[name=header]::slotted(kabal-header) {
  --_n-header-gutter: calc(var(--n-space-l) * 3) ;
}`;
  var Layout_default = styles31;

  // src/layout/Layout.ts
  var NAV_DEFAULT_WIDTH = 250;
  var NAV_MIN_WIDTH = 220;
  var NAV_MAX_WIDTH = 400;
  var NAV_COLLAPSE_WIDTH = 100;
  var NAV_RESIZE_STEP = 30;
  var NAV_PEEK_DELAY = 300;
  var mediaQuery2 = matchMedia("(min-width: 768px)");
  var store = storage("kabal-layout.navWidth", NAV_DEFAULT_WIDTH);
  var navMachine = fsm({
    opened: {
      toggle: "closed",
      close: "closed"
    },
    closed: {
      toggle: "opened",
      open: "opened",
      focusin: "peek",
      pointerenter: "peek"
    },
    peek: {
      toggle: "opened",
      focusout: "unpeek",
      pointerleave: "wait",
      dropdownOpen: "blocked",
      click: "unpeek",
      open: "opened"
    },
    blocked: {
      dropdownClose: "peek",
      open: "opened"
    },
    wait: {
      toggle: "opened",
      focusin: "peek",
      pointerenter: "peek",
      timeout: "unpeek"
    },
    unpeek: {
      toggle: "opened",
      focusin: "peek",
      pointerenter: "peek",
      transitionend: "closed"
    }
  });
  function isElement(el) {
    return el != null && el.nodeType === Node.ELEMENT_NODE;
  }
  var Layout = class extends s4 {
    constructor() {
      super(...arguments);
      this.resizeObserver = new ResizeObserver((entries) => {
        this.stickySize = Math.round(entries[0].borderBoxSize[0].blockSize);
      });
      this.navSlot = new SlotController(this, "nav");
      this.drawerSlot = new SlotController(this, "drawer");
      this.direction = new DirectionController(this);
      this.events = new EventController(this);
      this.lightDismiss = new LightDismissController(this, {
        isOpen: () => this.navState === "opened" && !this.wideScreen,
        onDismiss: () => this.navTransition("close"),
        isDismissible: (node) => node !== this.navEl
      });
      this.navWidth = store.value;
      this.isDragging = false;
      this.navState = mediaQuery2.matches ? "opened" : "closed";
      this.wideScreen = mediaQuery2.matches;
      this.stickySize = 0;
      this.navOpen = this.navState === "opened";
      this.padding = "m";
      this.sticky = false;
      this.handleMediaQueryChange = () => {
        this.wideScreen = mediaQuery2.matches;
        this.navTransition(this.wideScreen ? "open" : "close");
      };
      this.handleToggleClick = () => {
        this.navTransition("toggle");
      };
      this.handleNavFocus = () => {
        this.navTransition("focusin");
      };
      this.handleMainFocus = () => {
        this.navTransition("focusout");
      };
      this.handleMouseEnter = () => {
        if (this.wideScreen) {
          this.navTransition("pointerenter");
        }
      };
      this.handleMouseLeave = () => {
        this.navTransition("pointerleave");
      };
      this.handleTransitionEnd = () => {
        this.navTransition("transitionend");
      };
    }
    connectedCallback() {
      super.connectedCallback();
      this.events.listen(mediaQuery2, "change", this.handleMediaQueryChange);
      this.events.listen(this, "click", (e13) => {
        if (this.isNavToggle(e13.target)) {
          this.handleToggleClick();
        }
      });
      this.events.listen(this, "mouseover", (e13) => {
        if (this.isNavToggle(e13.target)) {
          this.handleMouseEnter();
        }
      });
      this.events.listen(this, "mouseout", (e13) => {
        if (this.isNavToggle(e13.target)) {
          this.handleMouseLeave();
        }
      });
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.resizeObserver.disconnect();
    }
    render() {
      const { navWidth, navState, navSlot, isDragging, direction } = this;
      const adjustedNavWidth = navState === "opened" && this.wideScreen ? navWidth : NAV_DEFAULT_WIDTH;
      const shouldRenderOwnNavToggle = navSlot.hasContent && !this.navToggle;
      return y`
      <div
        class=${o9({
        "n-layout": true,
        "n-rtl": direction.isRTL,
        "n-dragging": isDragging
      })}
        style=${i9({
        "--_n-layout-nav-width": `${adjustedNavWidth}px`,
        "--_n-sticky-size": typeof this.stickySize === "number" ? `${this.stickySize}px` : null
      })}
        data-nav=${navSlot.hasContent ? navState : "closed"}
        data-screen=${this.wideScreen ? "wide" : "narrow"}
      >
        <div
          class="n-layout-nav"
          ?hidden=${navSlot.isEmpty}
          @focusin=${this.handleNavFocus}
          @mouseenter=${this.handleMouseEnter}
          @mouseleave=${this.handleMouseLeave}
          @open=${this.handleDropdownOpen}
          @close=${this.handleDropdownClose}
        >
          <slot name="nav"></slot>
          <div
            class="n-resize"
            role="separator"
            aria-orientation="vertical"
            tabindex="0"
            @pointerdown=${cond(navState === "opened", this.startDragging)}
            @pointermove=${cond(isDragging, this.handleDrag)}
            @pointerleave=${this.stopDragging}
            @pointerup=${this.stopDragging}
            @keydown=${this.handleKeyboardResize}
          ></div>
        </div>

        <div
          class=${o9({ "n-layout-main": true, "n-has-own-nav-toggle": shouldRenderOwnNavToggle })}
          @focusin=${this.handleMainFocus}
          @click=${this.handleClick}
        >
          <div class=${o9({ "n-has-drawer": this.drawerSlot.hasContent })}>
            <div class="n-layout-header n-sticky">
              ${shouldRenderOwnNavToggle ? this.renderNavToggle() : b}
              <slot name="header"></slot>
            </div>
            <main>
              <slot></slot>
            </main>
          </div>
          <aside ?hidden=${this.drawerSlot.isEmpty}>
            <slot name="drawer"></slot>
          </aside>
        </div>
      </div>
    `;
    }
    renderNavToggle() {
      return y`
      <div class="n-nav-toggle-container">
        <slot
          name="nav-toggle"
          @click=${this.handleToggleClick}
          @mouseover=${this.handleMouseEnter}
          @mouseout=${this.handleMouseLeave}
        >
          <kabal-nav-toggle></kabal-nav-toggle>
        </slot>
      </div>
    `;
    }
    handleStickyChange(prev) {
      if (this.sticky === true) {
        this.resizeObserver.observe(this.stickyElement, { box: "border-box" });
      } else if (prev === true && this.sticky === false) {
        this.resizeObserver.unobserve(this.stickyElement);
        this.stickySize = null;
      }
    }
    handleNavWidthChange() {
      store.value = this.navWidth;
    }
    handleNavStateChange(prev) {
      if (prev === "wait" && this.peekTimeoutId) {
        clearTimeout(this.peekTimeoutId);
      }
      if (prev === "unpeek") {
        this.navEl.removeEventListener("transitionend", this.handleTransitionEnd);
      }
      switch (this.navState) {
        case "closed":
          this.navOpen = false;
          break;
        case "opened":
          this.navOpen = true;
          break;
        case "wait":
          this.peekTimeoutId = setTimeout(() => this.navTransition("timeout"), NAV_PEEK_DELAY);
          break;
        case "unpeek":
          this.navEl.addEventListener("transitionend", this.handleTransitionEnd, { once: true });
          break;
        default:
          break;
      }
    }
    handleOpenChange() {
      if (!this.isDragging) {
        this.setNavWidth(Math.max(this.navWidth, NAV_DEFAULT_WIDTH));
      }
      this.navTransition(this.navOpen ? "open" : "close");
    }
    navTransition(event) {
      this.navState = navMachine.transition(this.navState, event);
    }
    handleClick() {
      this.navTransition("click");
    }
    handleDropdownOpen(e13) {
      const target = e13.target;
      if (target.localName === "kabal-dropdown") {
        this.navTransition("dropdownOpen");
      }
    }
    handleDropdownClose(e13) {
      const target = e13.target;
      if (target.localName === "kabal-dropdown") {
        this.navTransition("dropdownClose");
      }
    }
    isNavToggle(node) {
      return Boolean(this.navToggle) && isElement(node) && node.id === this.navToggle;
    }
    handleKeyboardResize(e13) {
      const {
        navWidth,
        direction: { isLTR }
      } = this;
      switch (e13.key) {
        case "ArrowLeft":
          this.setNavWidth(navWidth + (isLTR ? -NAV_RESIZE_STEP : NAV_RESIZE_STEP));
          break;
        case "ArrowRight":
          this.setNavWidth(navWidth + (isLTR ? NAV_RESIZE_STEP : -NAV_RESIZE_STEP));
          break;
        case "Enter":
          this.navTransition("toggle");
          break;
        case "Home":
          this.setNavWidth(NAV_MIN_WIDTH);
          break;
        case "End":
          this.setNavWidth(NAV_MAX_WIDTH);
          break;
        default:
          return;
      }
      e13.preventDefault();
    }
    setNavWidth(width) {
      this.navWidth = clamp(Math.round(width), NAV_MIN_WIDTH, NAV_MAX_WIDTH);
    }
    startDragging(e13) {
      if (e13.button === 0) {
        const target = e13.target;
        target.setPointerCapture(e13.pointerId);
        this.isDragging = true;
      }
    }
    stopDragging() {
      this.isDragging = false;
    }
    handleDrag(e13) {
      const width = this.direction.isRTL ? this.clientWidth - e13.clientX : e13.clientX;
      this.setNavWidth(width);
      this.navTransition(width >= NAV_COLLAPSE_WIDTH ? "open" : "close");
    }
  };
  Layout.styles = [Component_default, Sticky_default, Layout_default];
  __decorateClass([
    i4(".n-sticky", true)
  ], Layout.prototype, "stickyElement", 2);
  __decorateClass([
    i4(".n-layout-nav", true)
  ], Layout.prototype, "navEl", 2);
  __decorateClass([
    t3()
  ], Layout.prototype, "navWidth", 2);
  __decorateClass([
    t3()
  ], Layout.prototype, "isDragging", 2);
  __decorateClass([
    t3()
  ], Layout.prototype, "navState", 2);
  __decorateClass([
    t3()
  ], Layout.prototype, "wideScreen", 2);
  __decorateClass([
    t3()
  ], Layout.prototype, "stickySize", 2);
  __decorateClass([
    e5({ reflect: true, type: Boolean, attribute: "nav-open" })
  ], Layout.prototype, "navOpen", 2);
  __decorateClass([
    e5({ attribute: "nav-toggle" })
  ], Layout.prototype, "navToggle", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Layout.prototype, "padding", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Layout.prototype, "sticky", 2);
  __decorateClass([
    observe("sticky", "updated")
  ], Layout.prototype, "handleStickyChange", 1);
  __decorateClass([
    observe("navWidth", "updated")
  ], Layout.prototype, "handleNavWidthChange", 1);
  __decorateClass([
    observe("navState")
  ], Layout.prototype, "handleNavStateChange", 1);
  __decorateClass([
    observe("navOpen", "updated")
  ], Layout.prototype, "handleOpenChange", 1);
  Layout = __decorateClass([
    e4("kabal-layout")
  ], Layout);

  // src/modal/Modal.scss
  var styles32 = i`:host {
  --_n-modal-padding-inline:var(--n-modal-padding-inline, var(--n-space-m));
  --_n-modal-padding-block:var(--n-modal-padding-block, var(--n-space-m));
  --_n-modal-focus-ring:0 0 0 2px var(--n-color-accent);
  --_n-modal-max-inline-size:var(--n-modal-max-inline-size, 620px);
  color: var(--n-color-text);
  position: fixed;
  inset: 0;
  visibility: hidden;
  transition: visibility var(--n-transition-slowly);
  z-index: var(--n-index-overlay);
}

:host([open]) {
  transition-property: none;
  visibility: visible;
}

.n-modal-backdrop {
  position: fixed;
  inset: 0;
  background: var(--n-color-overlay);
  transition: opacity var(--n-transition-slowly);
  padding: var(--n-space-l);
  padding-block-start: clamp(var(--n-space-l), min(10vh, 10vw) - 1em, var(--n-space-xxl) + var(--n-space-s));
  overflow-y: auto;
}

:host(:not([open])) .n-modal-backdrop {
  opacity: 0;
}

.n-modal {
  position: relative;
  display: flex;
  flex-direction: column;
  inline-size: 100%;
  max-inline-size: var(--_n-modal-max-inline-size);
  margin: auto;
  background: var(--n-color-surface);
  box-shadow: var(--n-box-shadow-modal);
  border-radius: var(--n-border-radius);
  transition: opacity var(--n-transition-slowly), transform var(--n-transition-slowly);
}

.n-rounded-top {
  border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
}

:host(:not([open])) .n-modal {
  transform: translateY(-10px) scale(0.97);
  opacity: 0;
}

.n-modal:focus {
  outline: 0;
}

.n-modal-body {
  flex: 1;
}

.n-body-padded {
  display: block;
  padding: var(--n-space-l) var(--_n-modal-padding-inline) var(--n-space-xl);
}

.n-modal-header {
  display: flex;
  gap: var(--n-space-m);
  align-items: start;
  background: var(--n-color-nav-surface);
  border-block-end: 1px solid var(--n-color-border);
}

.n-modal-footer {
  border-block-start: 1px solid var(--n-color-border);
}

.n-padded {
  padding: var(--_n-modal-padding-block) var(--_n-modal-padding-inline);
}

.n-close {
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  block-size: var(--n-space-xl);
  inline-size: var(--n-space-xl);
  background-color: transparent;
  border-radius: var(--n-border-radius);
  inset-block-start: var(--n-space-s);
  inset-inline-end: var(--n-space-s);
  color: var(--n-color-text);
  cursor: pointer;
  transition: color var(--n-transition-quickly);
  position: relative;
}

.n-close::after {
  content: "";
  position: absolute;
  display: block;
  inset: calc(var(--n-space-s) * -1);
  border-radius: var(--n-border-radius);
}

.n-close:not(:hover) {
  color: var(--n-color-icon);
}

.n-close:active {
  transform: translateY(1px);
}

.n-close:focus {
  outline: 0;
  box-shadow: var(--_n-modal-focus-ring);
}

@supports selector(:focus-visible) {
  .n-close:focus {
    box-shadow: none;
  }
  .n-close:focus-visible {
    box-shadow: var(--_n-modal-focus-ring);
  }
}
:host([scrollable]) .n-modal {
  max-block-size: 100%;
}

:host([scrollable]) .n-modal-body {
  overflow-y: auto;
}

@media (min-width: 489px) {
  :host {
    --_n-modal-padding-inline:var(--n-modal-padding-inline, var(--n-space-l));
  }
  :host([size=s]) {
    --_n-modal-padding-inline:var(--n-modal-padding-inline, var(--n-space-m));
    --_n-modal-max-inline-size:var(--n-modal-max-inline-size, 440px);
  }
  :host([size=l]) {
    --_n-modal-padding-inline:var(--n-modal-padding-inline, var(--n-space-l));
    --_n-modal-max-inline-size:var(--n-modal-max-inline-size, 1320px);
  }
}
slot[name] {
  display: flex;
}

slot[name=header] {
  flex: 1;
}

slot[name=header]::slotted(*) {
  margin: 0 !important;
  padding: 0 !important;
  font-size: var(--n-font-size-l) !important;
  font-weight: var(--n-font-weight-heading) !important;
  line-height: var(--n-line-height-heading) !important;
}

slot[name=footer] {
  gap: calc(var(--n-space-s) / 2);
  flex-direction: column;
}

@media (min-width: 489px) {
  slot[name=footer] {
    gap: var(--n-space-s);
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
}
slot[name=feature] {
  overflow: hidden;
}

slot[name=feature]::slotted(*) {
  inline-size: 100%;
  block-size: auto;
}`;
  var Modal_default = styles32;

  // src/common/controllers/FocusTrapController.ts
  var FocusTrapController = class {
    constructor(host, boundary = () => host) {
      this.boundary = boundary;
      this.lastScrollY = 0;
      this.handleFocusOut = (e13) => {
        this.lastFocused = e13.target;
        if (e13.relatedTarget === this.boundary()) {
          this.recaptureFocus();
        }
      };
      this.handleFocusIn = (e13) => {
        const isOutside = !e13.composedPath().includes(this.boundary());
        if (isOutside) {
          this.recaptureFocus();
        }
      };
      this.restoreScroll = () => {
        window.scrollTo(window.scrollX, this.lastScrollY);
      };
      host.addController(this);
    }
    hostDisconnected() {
      this.release();
    }
    trap() {
      this.lastScrollY = window.scrollY;
      this.boundary().addEventListener("focusout", this.handleFocusOut);
      window.addEventListener("scroll", this.restoreScroll);
      window.addEventListener("focusin", this.handleFocusIn);
    }
    release() {
      this.lastScrollY = 0;
      this.lastFocused = void 0;
      this.boundary().removeEventListener("focusout", this.handleFocusOut);
      window.removeEventListener("scroll", this.restoreScroll);
      window.removeEventListener("focusin", this.handleFocusIn);
    }
    recaptureFocus() {
      var _a;
      (_a = this.lastFocused) == null ? void 0 : _a.focus({ preventScroll: true });
    }
  };

  // src/modal/ModalController.ts
  var Stack2 = class {
    constructor() {
      this.items = [];
    }
    get length() {
      return this.items.length;
    }
    get top() {
      return this.items[this.length - 1];
    }
    push(item) {
      this.items.push(item);
    }
    pop() {
      return this.items.pop();
    }
    remove(item) {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }
  };
  var isButton = (element) => element.localName === "button";
  var _ModalController = class {
    constructor(host, options) {
      this.host = host;
      this.trackLastButton = (e13) => {
        const target = e13.target;
        if (isButton(target)) {
          this.lastButton = target;
        }
      };
      this.polyfillSubmitter = (e13) => {
        e13.submitter = this.lastButton;
      };
      this.handleTransitionEnd = (e13) => {
        if (!this.options.isOpen() && e13.target === this.host) {
          this.scrollBar.unlockScroll();
        }
      };
      this.handleLightDismiss = (e13) => {
        if (this.host.contains(e13.target)) {
          this.options.onDismiss(e13);
        }
      };
      this.handleSubmit = (e13) => {
        this.lastButton = void 0;
        const target = e13.target;
        const submitter = e13.submitter;
        const isDialogProperty = target.method === "dialog";
        const isDialogAttr = target.getAttribute("method") === "dialog";
        if (isDialogAttr && !isDialogProperty) {
          e13.preventDefault();
        }
        if (isDialogAttr || isDialogProperty) {
          this.options.close(submitter == null ? void 0 : submitter.value);
        }
      };
      host.addController(this);
      this.options = options;
      this.scrollBar = new ScrollbarController(host);
      this.focusTrap = new FocusTrapController(host, options.dialog);
      this.events = new EventController(host);
      this.lightDismiss = new LightDismissController(host, {
        isOpen: options.isOpen,
        isDismissible: (node) => node !== options.dialog(),
        onDismiss: this.handleLightDismiss
      });
    }
    hostConnected() {
      if (!window.SubmitEvent) {
        this.events.listen(this.host, "click", this.trackLastButton, true);
        this.events.listen(this.host, "submit", this.polyfillSubmitter, true);
      }
      this.events.listen(this.host, "transitionend", this.handleTransitionEnd);
      this.events.listen(this.host, "submit", this.handleSubmit);
    }
    hostDisconnected() {
      _ModalController.openModals.remove(this);
    }
    block() {
      var _a;
      (_a = _ModalController.openModals.top) == null ? void 0 : _a.focusTrap.release();
      _ModalController.openModals.push(this);
      this.scrollBar.lockScroll();
      this.trigger = document.activeElement;
      const focusTarget = this.host.querySelector("[autofocus]") || this.host;
      focusTarget.focus();
      this.focusTrap.trap();
    }
    unblock() {
      var _a, _b;
      if (_ModalController.openModals.top !== this) {
        return;
      }
      _ModalController.openModals.pop();
      this.options.backdrop().scrollTop = 0;
      this.focusTrap.release();
      (_a = this.trigger) == null ? void 0 : _a.focus();
      this.trigger = void 0;
      (_b = _ModalController.openModals.top) == null ? void 0 : _b.focusTrap.trap();
    }
  };
  var ModalController = _ModalController;
  ModalController.openModals = new Stack2();

  // src/modal/Modal.ts
  Icon.registerIcon(interface_close_small_exports);
  var Modal = class extends s4 {
    constructor() {
      super(...arguments);
      this.headerSlot = new SlotController(this, "header");
      this.featureSlot = new SlotController(this, "feature");
      this.footerSlot = new SlotController(this, "footer");
      this.localize = new LocalizeController(this);
      this.modalController = new ModalController(this, {
        isOpen: () => this.open,
        onDismiss: () => this.handleDismiss(),
        dialog: () => this.modal,
        backdrop: () => this.backdrop,
        close: (returnValue) => this.close(returnValue)
      });
      this.open = false;
      this.size = "m";
      this.returnValue = "";
      this.scrollable = false;
    }
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("role", "dialog");
      this.setAttribute("aria-modal", "true");
    }
    showModal() {
      this.open = true;
    }
    close(returnValue) {
      this.open = false;
      if (returnValue != null) {
        this.returnValue = returnValue;
      }
      this.dispatchEvent(new NordEvent("close"));
    }
    focus(options) {
      this.modal.focus(__spreadValues({ preventScroll: true }, options));
    }
    render() {
      return y`
      <div class="n-modal-backdrop">
        <div class="n-modal" tabindex="0">
          <div class="n-modal-header n-rounded-top" ?hidden=${this.headerSlot.isEmpty}>
            <slot class="n-padded" name=${this.headerSlot.slotName}></slot>
            <button class="n-close" @click=${this.handleDismiss}>
              <kabal-icon name="interface-close-small" size="s" label=${this.localize.term("closeLabel")}></kabal-icon>
            </button>
          </div>

          <div class="n-modal-body">
            <slot
              name=${this.featureSlot.slotName}
              class=${this.headerSlot.isEmpty ? "n-rounded-top" : ""}
              ?hidden=${this.featureSlot.isEmpty}
            ></slot>
            <slot class="n-body-padded"></slot>
          </div>

          <div class="n-modal-footer n-padded" ?hidden=${this.footerSlot.isEmpty}>
            <slot name=${this.footerSlot.slotName}></slot>
          </div>
        </div>
      </div>
    `;
    }
    handleOpenUpdated(prev) {
      if (this.open) {
        this.modalController.block();
      } else if (prev === true) {
        this.modalController.unblock();
      }
    }
    handleDismiss() {
      const allowed = this.dispatchEvent(new NordEvent("cancel", { cancelable: true }));
      if (allowed) {
        this.close();
      }
    }
  };
  Modal.styles = [Component_default, Modal_default];
  Modal.shadowRootOptions = __spreadProps(__spreadValues({}, s4.shadowRootOptions), { delegatesFocus: true });
  __decorateClass([
    i4(".n-modal", true)
  ], Modal.prototype, "modal", 2);
  __decorateClass([
    i4(".n-modal-backdrop", true)
  ], Modal.prototype, "backdrop", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Modal.prototype, "open", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Modal.prototype, "size", 2);
  __decorateClass([
    e5({ attribute: false })
  ], Modal.prototype, "returnValue", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Modal.prototype, "scrollable", 2);
  __decorateClass([
    observe("open", "updated")
  ], Modal.prototype, "handleOpenUpdated", 1);
  Modal = __decorateClass([
    e4("kabal-modal")
  ], Modal);

  // src/nav-group/NavGroup.scss
  var styles33 = i`:host {
  color: var(--n-color-text-weak);
  font-weight: var(--n-font-weight);
  line-height: var(--n-line-height-tight);
  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;
  all: unset;
  display: block;
  font-family: var(--n-font-family);
  font-size: var(--n-font-size-m);
}

*, ::after, ::before {
  box-sizing: border-box;
}

[role=list] {
  margin-block-end: var(--n-space-m);
  min-inline-size: 100%;
  list-style: none;
  appearance: none;
  border: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.n-heading {
  min-inline-size: 100%;
  color: var(--n-color-nav-heading);
  font-weight: var(--n-font-weight-active);
  line-height: var(--n-line-height-tight);
  padding-inline-start: var(--n-space-s);
  margin-block-end: var(--n-space-s);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`;
  var NavGroup_default = styles33;

  // src/nav-group/NavGroup.ts
  var NavGroup = class extends s4 {
    render() {
      return y`
      ${this.heading ? y`<p id="heading" aria-hidden="true" class="n-heading">${this.heading}</p>` : b}
      <div role="list" aria-labelledby=${this.heading ? "heading" : b}>
        <slot></slot>
      </div>
    `;
    }
  };
  NavGroup.styles = NavGroup_default;
  __decorateClass([
    e5()
  ], NavGroup.prototype, "heading", 2);
  NavGroup = __decorateClass([
    e4("kabal-nav-group")
  ], NavGroup);

  // src/nav-item/NavItem.scss
  var styles34 = i`:host {
  --_n-nav-item-box-shadow:none;
  all: unset;
  display: block;
  font-feature-settings: var(--n-font-features);
  font-family: var(--n-font-family);
}

*, ::after, ::before {
  box-sizing: border-box;
}

.n-nav-item {
  -webkit-user-select: none;
  user-select: none;
  display: flex;
  align-items: center;
  font-family: inherit;
  font-size: inherit;
  line-height: var(--n-line-height-tight);
  -webkit-appearance: none;
  appearance: none;
  color: var(--n-color-text-weak);
  padding: var(--n-space-s);
  min-block-size: 28px;
  margin-block-end: 1px;
  border-radius: var(--n-border-radius-s);
  text-decoration: none;
  inline-size: 100%;
  max-inline-size: 100%;
  background: 0 0;
  cursor: pointer;
  border: 0;
  text-align: start;
  box-shadow: var(--_n-nav-item-box-shadow);
  position: relative;
}

.n-nav-item:focus {
  --_n-nav-item-box-shadow:0 0 0 2px var(--n-color-accent);
  outline: 0;
  position: relative;
  z-index: var(--n-index-masked);
}

@supports selector(:focus-visible) {
  .n-nav-item:focus {
    --_n-nav-item-box-shadow:none;
  }
  .n-nav-item:focus-visible {
    --_n-nav-item-box-shadow:0 0 0 2px var(--n-color-accent);
  }
}
.n-nav-item:hover {
  background: var(--n-color-nav-hover);
  color: var(--n-color-text);
}

.n-nav-item:active {
  opacity: 0.7;
}

.n-nav-content {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:host([badge]) .n-nav-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-inline-size: calc(100% - (var(--n-space-m) + var(--n-space-m)));
  margin-block-end: -3px;
}

:host([active]) .n-nav-item {
  --_n-nav-item-box-shadow:var(--n-box-shadow);
  background: var(--n-color-accent);
  color: var(--n-color-text-on-accent);
  font-weight: var(--n-font-weight-active);
}

:host([active]) .n-nav-item:focus {
  --_n-nav-item-box-shadow:0 0 0 1px var(--n-color-nav-surface),0 0 0 3px var(--n-color-accent);
}

:host([active]) kabal-icon {
  color: currentColor;
}

.n-toggle-icon {
  color: var(--n-color-icon);
  margin-inline-end: var(--n-space-s);
  margin-inline-start: var(--n-space-s);
}

.n-toggle-icon.n-rtl {
  transform: rotate(-180deg);
}

[aria-expanded=true] .n-toggle-icon {
  transform: rotate(90deg);
}

.n-nav-icon {
  margin-inline-end: calc(var(--n-space-s) * 1.4);
  flex-shrink: 0;
}

::slotted(kabal-nav-group) {
  margin-inline-start: calc(var(--n-space-m) + var(--n-space-s) * 1.3);
}

.n-nav-badge {
  border-radius: var(--n-border-radius-pill);
  background: var(--n-color-status-warning);
  color: rgba(0, 0, 0, 0.8);
  font-weight: var(--n-font-weight);
  font-feature-settings: var(--n-font-features-reduced);
  padding: 4px 6px;
  text-align: center;
  min-inline-size: 20px;
  position: absolute;
  margin-block-start: -2px;
  margin-inline-start: calc(var(--n-space-s) / 1.5);
  font-size: var(--n-font-size-xs);
  display: inline-block;
}`;
  var NavItem_default = styles34;

  // src/nav-item/NavItem.ts
  var NavItem = class extends FocusableMixin(s4) {
    constructor() {
      super(...arguments);
      this.subnavSlot = new SlotController(this, "subnav");
      this.direction = new DirectionController(this);
      this.active = false;
      this.open = false;
    }
    connectedCallback() {
      super.connectedCallback();
      if (this.querySelector(`kabal-nav-item[active]`)) {
        this.open = true;
      }
    }
    render() {
      const innards = y`
      ${this.icon ? y`<kabal-icon class="n-nav-icon" name=${this.icon} size="m"></kabal-icon>` : b}
      <div class="n-nav-content">
        <span class="n-nav-label"><slot></slot></span>
        ${this.badge ? y`<span class="n-nav-badge">${this.badge}</span>` : b}
      </div>
    `;
      let element;
      if (this.subnavSlot.hasContent) {
        element = this.renderToggle(innards);
      } else if (this.href) {
        element = this.renderLink(innards);
      } else {
        element = this.renderButton(innards);
      }
      return y`
      <div role="listitem">
        ${element}
        <slot name=${this.subnavSlot.slotName} ?hidden=${!this.open}></slot>
      </div>
    `;
    }
    renderLink(innards) {
      return y`
      <a class="n-nav-item" ${n7(this.focusableRef)} aria-current=${cond(this.active, "page")} href=${this.href || ""}>
        ${innards}
      </a>
    `;
    }
    renderToggle(innards) {
      return y`
      <button
        class="n-nav-item"
        @click=${this.toggleOpen}
        aria-expanded=${this.open ? "true" : "false"}
        ${n7(this.focusableRef)}
      >
        ${innards}

        <kabal-icon
          size="xxs"
          class=${o9({ "n-toggle-icon": true, "n-rtl": this.direction.isRTL })}
          name="arrow-expand-right-small"
        ></kabal-icon>
      </button>
    `;
    }
    renderButton(innards) {
      return y`<button class="n-nav-item" ${n7(this.focusableRef)}>${innards}</button>`;
    }
    toggleOpen() {
      this.open = !this.open;
      this.dispatchEvent(new NordEvent("toggle"));
    }
  };
  NavItem.styles = NavItem_default;
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], NavItem.prototype, "active", 2);
  __decorateClass([
    e5()
  ], NavItem.prototype, "icon", 2);
  __decorateClass([
    e5()
  ], NavItem.prototype, "href", 2);
  __decorateClass([
    e5()
  ], NavItem.prototype, "badge", 2);
  __decorateClass([
    e5({ type: Boolean })
  ], NavItem.prototype, "open", 2);
  NavItem = __decorateClass([
    e4("kabal-nav-item")
  ], NavItem);

  // src/navigation/Navigation.scss
  var styles35 = i`:host {
  all: unset;
  display: flex;
  flex-direction: column;
  block-size: 100%;
  background: var(--n-color-nav-surface);
  overflow: hidden auto;
}

*,
::after,
::before {
  box-sizing: border-box;
}

nav {
  flex-grow: 1;
  padding: var(--n-space-m);
}

slot[name=footer],
slot[name=header] {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

slot[name=header] {
  min-block-size: var(--n-space-xxl);
  border-block-end: 1px solid var(--n-color-border);
}

slot[name=footer] {
  padding: var(--n-space-m);
}`;
  var Navigation_default = styles35;

  // src/navigation/Navigation.ts
  var Navigation = class extends s4 {
    render() {
      return y`
      <slot name="header"></slot>
      <nav>
        <slot></slot>
      </nav>
      <slot name="footer"></slot>
    `;
    }
  };
  Navigation.styles = Navigation_default;
  Navigation = __decorateClass([
    e4("kabal-navigation")
  ], Navigation);

  // src/progress-bar/ProgressBar.scss
  var styles36 = i`:host {
  --_n-progress-size: var(--n-progress-size, var(--n-space-s));
  --_n-progress-border-radius: var(--n-progress-border-radius, var(--n-border-radius-s));
  --_n-progress-color: var(--n-progress-color, var(--n-color-accent));
  inline-size: 100%;
}

progress {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  inline-size: 100%;
  block-size: var(--_n-progress-size);
  background-color: var(--n-color-nav-hover);
  border-radius: var(--_n-progress-border-radius);
  box-shadow: none;
  display: block;
  border: 0;
  margin: 0;
}

label {
  display: block;
}

progress::-webkit-progress-bar {
  background-color: transparent;
  border-radius: var(--_n-progress-border-radius);
}

progress::-moz-progress-bar {
  background: var(--_n-progress-color);
  border-radius: var(--_n-progress-border-radius);
}

progress::-webkit-progress-value {
  background: var(--_n-progress-color);
  border-radius: var(--_n-progress-border-radius);
  transition: width 0.25s ease-out, background 0.25s ease-out;
}

progress:indeterminate {
  background-color: var(--n-color-nav-hover);
  background-image: linear-gradient(to right, transparent 45%, var(--n-color-accent) 0, var(--n-color-accent) 55%, transparent 0);
  background-position: right;
  background-size: 225% 100%;
  animation: animate-indeterminate 2s infinite ease;
}

progress:indeterminate::-moz-progress-bar {
  background-color: transparent;
}

progress:indeterminate::-webkit-progress-value {
  background-color: transparent;
}

@keyframes animate-indeterminate {
  50% {
    background-position: left;
  }
}
progress:focus {
  box-shadow: 0 0 0 1px var(--n-color-background), 0 0 0 3px var(--n-color-accent);
  outline: 0;
}`;
  var ProgressBar_default = styles36;

  // src/progress-bar/ProgressBar.ts
  var ProgressBar = class extends FocusableMixin(s4) {
    constructor() {
      super(...arguments);
      this.max = 100;
      this.label = "Current progress";
    }
    render() {
      return y`<label>
      <kabal-visually-hidden>${this.label}</kabal-visually-hidden>
      <progress
        ${n7(this.focusableRef)}
        aria-valuenow=${l5(this.value)}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        tabindex="-1"
        max=${this.max}
        value=${l5(this.value)}
      ></progress>
    </label>`;
    }
  };
  ProgressBar.styles = [Component_default, ProgressBar_default];
  __decorateClass([
    e5({ reflect: true, type: Number })
  ], ProgressBar.prototype, "value", 2);
  __decorateClass([
    e5({ reflect: true, type: Number })
  ], ProgressBar.prototype, "max", 2);
  __decorateClass([
    e5({ reflect: true })
  ], ProgressBar.prototype, "label", 2);
  ProgressBar = __decorateClass([
    e4("kabal-progress-bar")
  ], ProgressBar);

  // src/common/controllers/LightSlotController.ts
  var LightSlotController = class extends SlotController {
    constructor(host, options) {
      super(host, options.slotName);
      this.options = options;
      this.onChange = () => {
        this.syncLightDom();
      };
      this.renderHook = document.createComment(this.slotName);
      this.lightDom = new LightDomController(host, {
        render: () => this.hasContent ? b : this.options.render(),
        renderOptions: { renderBefore: this.renderHook }
      });
    }
    hostConnected() {
      super.hostConnected();
      this.host.appendChild(this.renderHook);
      this.syncLightDom();
    }
    hostDisconnected() {
      this.renderHook.remove();
    }
    syncLightDom() {
      const node = this.content;
      if (node) {
        this.options.syncLightDom(node);
      }
    }
  };

  // src/common/directives/wrapIf.ts
  function wrapIf(condition, inner, wrapper) {
    return condition ? wrapper(inner()) : inner();
  }

  // src/radio/Radio.scss
  var styles37 = i`:host {
  --_n-radio-size:calc(var(--n-space-m) * 1.25);
  display: inline-block;
  line-height: var(--n-line-height);
}

.n-flex {
  display: flex;
}

.n-expand {
  flex: 1;
}

.n-input-container {
  position: relative;
}

::slotted(input) {
  --_n-radio-accent-color:var(--n-color-accent);
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  margin: 0 !important;
  padding: 0 !important;
  border: 1px solid var(--_n-radio-border-color, var(--n-color-border-hover)) !important;
  border-radius: var(--n-border-radius-circle) !important;
  transition: none !important;
  display: block !important;
  inline-size: var(--_n-radio-size) !important;
  block-size: var(--_n-radio-size) !important;
  cursor: pointer;
}

::slotted(input:checked) {
  --_n-radio-border-color:var(--n-color-accent);
  background: var(--_n-radio-accent-color) !important;
}

::slotted(input[aria-invalid]) {
  --_n-radio-accent-color:var(--n-color-status-danger);
  --_n-radio-border-color:var(--_n-radio-accent-color);
}

::slotted(input:active) {
  opacity: 0.8;
}

::slotted(input:focus-visible) {
  outline: 0 !important;
}

::slotted(input:focus) {
  outline: 0 !important;
  box-shadow: 0 0 0 1px var(--n-color-surface), 0 0 0 3px var(--n-color-accent) !important;
}

:host([disabled]) ::slotted(input) {
  --_n-radio-accent-color:var(--n-color-border-strong);
  --_n-radio-border-color:var(--_n-radio-accent-color);
  background: var(--_n-radio-accent-color);
  cursor: default;
  opacity: 1;
}

:host([disabled]) ::slotted(label) {
  color: var(--n-color-text-weaker);
  cursor: default;
}

.n-dot {
  --_n-radio-dot-size:var(--n-space-s);
  --_n-radio-dot-inset:calc((var(--_n-radio-size) - var(--_n-radio-dot-size)) / 2);
  position: absolute;
  border-radius: var(--n-border-radius-circle);
  inline-size: var(--_n-radio-dot-size);
  block-size: var(--_n-radio-dot-size);
  background-color: var(--n-color-text-on-accent);
  inset-inline-start: var(--_n-radio-dot-inset);
  inset-block-start: var(--_n-radio-dot-inset);
  z-index: var(--n-index-default);
  pointer-events: none;
}

.n-label-container {
  margin-block-end: 0;
}

::slotted(label) {
  -webkit-user-select: none;
  user-select: none;
  font-weight: var(--n-font-weight) !important;
  line-height: var(--n-line-height-l) !important;
  padding-inline-start: var(--n-space-s) !important;
  cursor: pointer;
}

.n-hint {
  padding-inline-start: var(--n-space-s);
}

.n-error {
  margin-block-start: calc(var(--n-space-s) / 2);
  padding-inline-start: var(--n-space-s);
}`;
  var Radio_default = styles37;

  // src/radio/Radio.ts
  var id = 0;
  var createId = (suffix) => `kabal-radio-${suffix}-${id++}`;
  function isLabel(element) {
    return element.localName === "label";
  }
  var Radio = class extends FormAssociatedMixin(InputMixin(FocusableMixin(s4))) {
    constructor() {
      super(...arguments);
      this.inputId = createId("input");
      this.hintId = createId("hint");
      this.errorId = createId("error");
      this.hintSlot = new LightSlotController(this, {
        slotName: "hint",
        render: () => this.hint ? y`<div slot="hint-internal" id=${this.hintId}>${this.hint}</div>` : b,
        syncLightDom: (element) => {
          element.id = this.hintId;
        }
      });
      this.labelSlot = new LightSlotController(this, {
        slotName: "label",
        render: () => this.label ? y`<label slot="label-internal" for=${this.inputId}>${this.label}</label>` : b,
        syncLightDom: (element) => {
          if (!isLabel(element)) {
            console.warn(`NORD: Only <label> elements should be placed in radio's "label" slot`);
          } else {
            element.htmlFor = this.inputId;
          }
        }
      });
      this.errorSlot = new LightSlotController(this, {
        slotName: "error",
        render: () => this.error ? y`<div slot="error-internal" id=${this.errorId}>${this.error}</div>` : b,
        syncLightDom: (element) => {
          element.id = this.hintId;
        }
      });
      this.inputSlot = new LightDomController(this, {
        render: () => y`
        <input
          slot="input"
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          ${n7(this.focusableRef)}
          class="n-input"
          id=${this.inputId}
          type="radio"
          name=${cond(this.name)}
          .value=${cond(this.value)}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-describedby=${cond(this.getDescribedBy())}
          aria-invalid=${cond(this.getInvalid())}
          form=${cond(this.getAttribute("form") || void 0)}
        />
      `
      });
      this.checked = false;
      this.handleBlur = (e13) => {
        e13.stopPropagation();
        this.dispatchEvent(new Event("blur", { bubbles: false, cancelable: true }));
      };
      this.handleFocus = (e13) => {
        e13.stopPropagation();
        this.dispatchEvent(new Event("focus", { bubbles: false, cancelable: true }));
      };
    }
    get formValue() {
      return void 0;
    }
    render() {
      return y`
      <div class="n-flex">
        <div class="n-input-container" @change=${this.handleChange}>
          <slot name="input"></slot>
          ${this.checked ? y`<div class="n-dot"></div>` : b}
        </div>
        <div class="n-expand">
          <div class="n-label-container">
            ${wrapIf(
        this.hideLabel,
        () => y`
                <slot name="label"></slot>
                <slot name="label-internal"></slot>
              `,
        (content) => y`<kabal-visually-hidden>${content}</kabal-visually-hidden>`
      )}
            <div class="n-caption n-hint" ?hidden=${!this.hasHint}>
              <slot name="hint"></slot>
              <slot name="hint-internal"></slot>
            </div>
          </div>
          <div class="n-caption n-error" role="alert" ?hidden=${!this.hasError}>
            <slot name="error"></slot>
            <slot name="error-internal"></slot>
          </div>
        </div>
      </div>
    `;
    }
    handleCheckedChange(previousChecked) {
      if (!previousChecked && this.checked) {
        this.uncheckSiblings();
      }
    }
    uncheckSiblings() {
      const root = this.getRootNode();
      root.querySelectorAll(`kabal-radio[name="${this.name}"]`).forEach((radio) => {
        if (radio !== this) {
          radio.checked = false;
        }
      });
    }
    handleChange(e13) {
      e13.stopPropagation();
      const target = e13.target;
      this.checked = target.checked;
      super.handleChange(e13);
    }
  };
  Radio.styles = [Component_default, FormField_default, Radio_default];
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Radio.prototype, "checked", 2);
  __decorateClass([
    observe("checked")
  ], Radio.prototype, "handleCheckedChange", 1);
  Radio = __decorateClass([
    e4("kabal-radio")
  ], Radio);

  // src/range/Range.scss
  var styles38 = i`:host {
  --_n-range-progress:0%;
  --_n-range-thumb-focus-ring:0 0 0 1px var(--n-color-accent);
  --_n-range-thumb-color:var(--n-color-text-on-accent);
  --_n-range-thumb-border-size:1px;
  --_n-range-thumb-border-color:var(--n-color-border-strong);
  --_n-range-gradient-direction:right;
  --_n-range-thumb-size:var(--n-range-thumb-size, 20px);
  --_n-range-track-color-active:var(--n-range-track-color-active, var(--n-color-accent));
  --_n-range-track-color-inactive:var(--n-range-track-color-inactive, var(--n-color-border-strong));
  --_n-range-track-size:var(--n-range-track-size, 3px);
}

.n-range {
  -webkit-appearance: none;
  appearance: none;
  inline-size: 100%;
  background: linear-gradient(to var(--_n-range-gradient-direction), var(--_n-range-track-color-active) 0, var(--_n-range-track-color-active) var(--_n-range-progress), var(--_n-range-track-color-inactive) var(--_n-range-progress));
  border-radius: var(--n-border-radius-s);
}

.n-range.is-rtl {
  --_n-range-gradient-direction:left;
}

.n-range::-webkit-slider-runnable-track {
  inline-size: 100%;
  block-size: var(--_n-range-track-size);
}

.n-range::-webkit-slider-thumb {
  block-size: var(--_n-range-thumb-size);
  inline-size: var(--_n-range-thumb-size);
  box-shadow: var(--n-box-shadow), var(--n-box-shadow);
  border-radius: var(--n-border-radius-circle);
  background: var(--_n-range-thumb-color);
  border: var(--_n-range-thumb-border-size) solid var(--_n-range-thumb-border-color);
  cursor: pointer;
  -webkit-appearance: none;
  margin-block-start: calc((var(--_n-range-thumb-size) - var(--_n-range-track-size)) / 2 * -1);
}

.n-range::-moz-range-track {
  border: var(--n-space-s) solid var(--n-color-surface);
  inline-size: 100%;
  block-size: var(--_n-range-track-size);
}

.n-range::-moz-range-thumb {
  block-size: var(--_n-range-thumb-size);
  inline-size: var(--_n-range-thumb-size);
  box-shadow: var(--n-box-shadow);
  border-radius: var(--n-border-radius-circle);
  background: var(--_n-range-thumb-color);
  border: var(--_n-range-thumb-border-size) solid var(--_n-range-thumb-border-color);
  cursor: pointer;
  appearance: none;
  margin-block-start: calc((var(--_n-range-thumb-size) - var(--_n-range-track-size)) / 2 * -1);
}

.n-label-container {
  margin-block-end: 0;
  inline-size: 100%;
}

label {
  display: flex !important;
}

.n-range-output {
  font-weight: var(--n-font-weight);
  color: var(--n-color-text-weaker);
  font-size: var(--n-font-size-m);
  margin-inline-start: auto;
}

.n-range:focus {
  outline: 0;
}

.n-label-container:hover + .n-input-container .n-input:disabled, .n-range:disabled {
  opacity: 0.5;
}

.n-range:disabled::-webkit-slider-thumb, .n-range[readonly]::-webkit-slider-thumb {
  --_n-range-thumb-color:var(--n-color-border);
  --_n-range-thumb-border-color:var(--n-color-border);
  box-shadow: none;
  cursor: default;
}

.n-range:disabled::-moz-range-thumb, .n-range[readonly]::-moz-range-thumb {
  --_n-range-thumb-color:var(--n-color-border);
  --_n-range-thumb-border-color:var(--n-color-border);
  box-shadow: none;
  cursor: default;
}

.n-range:focus::-webkit-slider-thumb {
  --_n-range-thumb-border-color:var(--n-color-accent);
  box-shadow: var(--_n-range-thumb-focus-ring);
}

.n-range:focus::-moz-range-thumb {
  --_n-range-thumb-border-color:var(--n-color-accent);
  box-shadow: var(--_n-range-thumb-focus-ring);
}`;
  var Range_default = styles38;

  // src/range/Range.ts
  var Range = class extends FormAssociatedMixin(
    AutocompleteMixin(ReadonlyMixin(InputMixin(FocusableMixin(s4))))
  ) {
    constructor() {
      super(...arguments);
      this.direction = new DirectionController(this);
      this.min = 0;
      this.max = 10;
      this.step = 1;
      this.expand = false;
    }
    render() {
      const value = Number(this.value) || 0;
      const percent = Math.max(0, (value - this.min) / (this.max - this.min));
      return y`
      <div class="n-input-container">
        ${this.renderLabel(y`<span class="n-range-output" aria-hidden="true">${value}</span>`)}

        <input
          ${n7(this.focusableRef)}
          id=${this.inputId}
          type="range"
          class=${o9({
        "n-range": true,
        "is-rtl": this.direction.isRTL
      })}
          name=${l5(this.name)}
          min=${this.min}
          step=${this.step}
          max=${this.max}
          style=${`--_n-range-progress: ${percent * 100}%`}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          .value=${this.value ? this.value : "0"}
          @input=${this.handleInput}
          @change=${this.handleChange}
          aria-describedby=${l5(this.getDescribedBy())}
          aria-invalid=${l5(this.getInvalid())}
        />
      </div>

      ${this.renderError()}
    `;
    }
    handleInput(e13) {
      e13.stopPropagation();
      const target = e13.target;
      if (this.readonly) {
        e13.preventDefault();
        target.value = this.value;
        return;
      }
      this.value = target.value;
      this.dispatchEvent(new NordEvent("input"));
    }
  };
  Range.styles = [Component_default, FormField_default, TextField_default, Range_default];
  __decorateClass([
    e5()
  ], Range.prototype, "min", 2);
  __decorateClass([
    e5()
  ], Range.prototype, "max", 2);
  __decorateClass([
    e5()
  ], Range.prototype, "step", 2);
  __decorateClass([
    e5({ reflect: true, type: Boolean })
  ], Range.prototype, "expand", 2);
  Range = __decorateClass([
    e4("kabal-range")
  ], Range);

  // ../../node_modules/@nordhealth/icons/lib/assets/interface-dropdown-small.js
  var interface_dropdown_small_exports = {};
  __export(interface_dropdown_small_exports, {
    default: () => interface_dropdown_small_default,
    tags: () => tags25,
    title: () => title25
  });
  var interface_dropdown_small_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><g transform="translate(6,6) scale(0.9)"><path fill="currentColor" d="M105 56a10.416 10.416 0 0 1-7.42-3.08L72.478 27.818a3.528 3.528 0 0 0-4.956 0L42.42 52.92a10.5 10.5 0 0 1-14.84-14.84l35-35a10.486 10.486 0 0 1 14.84 0l35 35A10.5 10.5 0 0 1 105 56zm-35 84a10.416 10.416 0 0 1-7.42-3.08l-35-35a10.5 10.5 0 0 1 14.84-14.84l25.102 25.102a3.528 3.528 0 0 0 4.956 0L97.58 87.08a10.5 10.5 0 1 1 14.84 14.84l-35 35A10.416 10.416 0 0 1 70 140z"/></g></svg>';
  var title25 = "interface-dropdown-small";
  var tags25 = "nordicon small interface dropdown select arrow up down caret triangle chevron";

  // src/select/Select.scss
  var styles39 = i`.n-select-container {
  position: relative;
  inline-size: fit-content;
}

:host([expand]) {
  inline-size: 100%;
}

:host([expand]) .n-select-container {
  inline-size: 100%;
}

select {
  -webkit-appearance: none;
  appearance: none;
  position: absolute;
  font-size: var(--n-font-size-m);
  font-family: var(--n-font-family);
  color: var(--n-color-text);
  inline-size: 100%;
  opacity: 0.0001;
  cursor: pointer;
  background: 0 0;
  border: 0;
  block-size: var(--n-space-xl);
  inset-block-end: 0;
  inset-inline-start: 0;
  z-index: var(--n-index-default);
}

option {
  color: initial;
}

kabal-button {
  --n-button-text-align:start;
}

kabal-icon {
  color: var(--n-color-icon);
}

.n-label-container:hover + .n-select-container kabal-button, select:hover + kabal-button {
  --n-button-border-color:var(--n-color-border-hover);
  --_n-button-background-color:var(--n-color-button-hover);
}

.n-label-container:hover + .n-select-container kabal-button kabal-icon, select:hover + kabal-button kabal-icon {
  color: var(--n-color-icon-hover);
}

select:focus + kabal-button {
  --n-button-border-color:var(--n-color-accent);
  --_n-button-box-shadow:0 0 0 1px var(--n-button-border-color);
}

:host([disabled]) {
  cursor: auto;
  pointer-events: none;
}

:host([disabled]) kabal-button {
  --n-input-border-color:var(--n-color-active);
  --_n-button-color:var(--n-color-text-weakest);
  --_n-button-background-color:var(--n-color-active);
  --_n-button-opacity:1;
}

:host([disabled]) kabal-icon {
  color: var(--n-color-text-weakest);
}

::slotted(:not([slot])) {
  display: none;
}

select[aria-invalid=true] + kabal-button {
  --n-button-border-color:var(--n-color-status-danger);
}`;
  var Select_default = styles39;

  // src/select/Select.ts
  Icon.registerIcon(interface_dropdown_small_exports);
  var Select = class extends SizeMixin(
    FormAssociatedMixin(AutocompleteMixin(InputMixin(FocusableMixin(s4))))
  ) {
    constructor() {
      super(...arguments);
      this.defaultSlot = new SlotController(this);
      this.inputId = "select";
      this.expand = false;
    }
    get formValue() {
      return this.value || void 0;
    }
    render() {
      const slottedOptions = this.options;
      const buttonText = this.getButtonText(slottedOptions);
      return y`
      <slot></slot>
      ${this.renderLabel()}

      <div class="n-select-container">
        <select
          ${n7(this.focusableRef)}
          id=${this.inputId}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name=${l5(this.name)}
          @change=${this.handleChange}
          @input=${this.handleInput}
          aria-describedby=${l5(this.getDescribedBy())}
          aria-invalid=${l5(this.getInvalid())}
          autocomplete=${this.autocomplete}
        >
          ${this.placeholder && y`<option value="" disabled ?selected=${!this.value}>${this.placeholder}</option>`}
          ${slottedOptions.map((option) => this.renderOption(option))}
        </select>

        <kabal-button
          size=${this.size}
          tabindex="-1"
          ?disabled=${this.disabled}
          ?expand=${this.expand}
          aria-hidden="true"
          type="button"
        >
          <slot slot="start" name="icon"></slot>
          ${buttonText}
          <kabal-icon slot="end" name="interface-dropdown-small"></kabal-icon>
        </kabal-button>
      </div>

      ${this.renderError()}
    `;
    }
    get options() {
      return Array.from(this.querySelectorAll("option"));
    }
    getButtonText(options) {
      const selected = options.find((option) => option.value === this.value.toString());
      if (selected) {
        return selected.text;
      }
      if (this.placeholder) {
        return this.placeholder;
      }
      if (options[0]) {
        return options[0].text;
      }
      return "";
    }
    renderOption(option) {
      return y`
      <option
        value=${l5(option.value)}
        ?disabled=${option.disabled}
        .selected=${option.value === this.value.toString()}
      >
        ${option.text}
      </option>
    `;
    }
  };
  Select.styles = [Component_default, FormField_default, Select_default];
  __decorateClass([
    e5({ reflect: true, type: Boolean })
  ], Select.prototype, "expand", 2);
  Select = __decorateClass([
    e4("kabal-select")
  ], Select);

  // src/skeleton/Skeleton.scss
  var styles40 = i`:host {
  --_n-skeleton-border-radius: var(--n-skeleton-border-radius, var(--n-border-radius));
  --_n-skeleton-color: var(--n-skeleton-color, var(--n-color-border));
  --_n-skeleton-sheen-color: var(--n-skeleton-sheen-color, var(--n-color-border-strong));
  --_n-skeleton-animation: none;
}

.n-skeleton {
  display: flex;
  inline-size: 100%;
  block-size: 100%;
  min-block-size: var(--n-space-m);
}
.n-skeleton .n-skeleton-indicator {
  flex: 1 1 auto;
  background: var(--_n-skeleton-color);
  border-radius: var(--_n-skeleton-border-radius);
  opacity: 0.6;
  animation: var(--_n-skeleton-animation);
}`;
  var Skeleton_default = styles40;

  // src/skeleton/Skeleton.ts
  var Skeleton = class extends s4 {
    constructor() {
      super(...arguments);
      this.effect = "none";
    }
    render() {
      return y`
      <div class="n-skeleton" aria-hidden="true">
        <div class="n-skeleton-indicator"></div>
      </div>
    `;
    }
  };
  Skeleton.styles = [Component_default, Skeleton_default];
  __decorateClass([
    e5()
  ], Skeleton.prototype, "effect", 2);
  Skeleton = __decorateClass([
    e4("kabal-skeleton")
  ], Skeleton);

  // src/tab/Tab.scss
  var styles41 = i`:host {
  --_n-tab-color:var(--n-tab-color, var(--n-color-text-weak));
  --_n-tab-font-weight:var(--n-tab-font-weight, var(--n-font-weight));
  --_n-tab-border:1px solid transparent;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  padding: calc(var(--n-space-l) / 2) calc(var(--n-space-s) / 2);
  border-block-end: var(--_n-tab-border);
  transition: border var(--n-transition-quickly) ease;
}

.n-tab {
  color: var(--_n-tab-color);
  font-family: var(--n-font-family);
  font-feature-settings: var(--n-font-features);
  font-size: var(--n-font-size-m);
  font-weight: var(--_n-tab-font-weight);
  line-height: var(--n-line-height-form);
  border-radius: var(--n-border-radius-sharp);
  white-space: nowrap;
}

.n-tab, .n-tab[data-text]:not([data-text=""])::before {
  font-weight: var(--_n-tab-font-weight);
}

.n-tab[data-text=""] {
  display: flex;
  gap: var(--n-space-s);
  align-items: center;
}

.n-tab[data-text]:not([data-text=""]) {
  text-align: center;
}

.n-tab[data-text]:not([data-text=""])::before {
  content: attr(data-text);
  display: block;
  block-size: 0;
  visibility: hidden;
}

:host(:hover) {
  --_n-tab-color:var(--n-tab-color, var(--n-color-text));
}

.n-tab[data-text]:not([data-text=""])::before, :host([aria-selected=true]) {
  --_n-tab-color:var(--n-tab-color, var(--n-color-text-link));
  --_n-tab-font-weight:var(--n-tab-font-weight, var(--n-font-weight-active));
  --_n-tab-border:2px solid var(--n-color-text-link);
}

:host(:active) {
  opacity: 0.8;
  transform: translateY(1px);
}

:host(:focus) .n-tab {
  box-shadow: 0 0 0 2px var(--n-color-background), 0 0 0 4px var(--n-color-text-link);
  outline: 0;
}

@supports selector(:focus-visible) {
  :host(:focus) .n-tab {
    box-shadow: none;
  }
  :host(:focus-visible) .n-tab {
    box-shadow: 0 0 0 2px var(--n-color-background), 0 0 0 4px var(--n-color-text-link);
  }
}`;
  var Tab_default = styles41;

  // src/tab/Tab.ts
  var Tab = class extends s4 {
    constructor() {
      super(...arguments);
      this.defaultSlot = new SlotController(this);
      this.selected = false;
    }
    render() {
      return y`<div class="n-tab" data-text="${this.defaultSlot.isEmpty ? this.textContent : ""}">
      <slot></slot>
    </div>`;
    }
    handleSelectionChange() {
      this.setAttribute("aria-selected", `${this.selected}`);
      this.setAttribute("tabindex", this.selected ? "0" : "-1");
    }
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("role", "tab");
    }
  };
  Tab.styles = [Component_default, Tab_default];
  __decorateClass([
    e5({ reflect: true, type: Boolean })
  ], Tab.prototype, "selected", 2);
  __decorateClass([
    observe("selected")
  ], Tab.prototype, "handleSelectionChange", 1);
  Tab = __decorateClass([
    e4("kabal-tab")
  ], Tab);

  // src/tab-group/TabGroup.scss
  var styles42 = i`:host {
  --_n-tab-group-padding:var(--n-tab-group-padding, 0);
  --_n-tab-group-list-background:var(--n-color-background);
  --_n-tab-group-list-border:inset 0 -1px 0 0 var(--n-color-border);
  --_n-tab-group-list-shadow:var(--n-box-shadow-header);
  --_n-sticky-size:46px;
  border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
}

.n-tab-group-list {
  list-style: none;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior: none;
  box-shadow: var(--_n-tab-group-list-border);
  border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
  gap: var(--n-space-s);
  background-color: var(--_n-tab-group-list-background);
  background-image: radial-gradient(ellipse farthest-side at 0 50%, var(--n-color-border-strong) 0, var(--_n-tab-group-list-background)), radial-gradient(ellipse farthest-side at 100% 50%, var(--n-color-border-strong) 0, var(--_n-tab-group-list-background));
  background-repeat: no-repeat;
  background-position: 0 calc(var(--n-space-s) / 2), 100% calc(var(--n-space-s) / 2);
  background-size: var(--n-space-s) var(--n-space-xl), var(--n-space-s) var(--n-space-xl);
}

.n-tab-group-list::after, .n-tab-group-list::before {
  content: "";
  box-sizing: content-box;
  align-self: stretch;
  min-inline-size: var(--n-space-l);
  margin-block-end: 1px;
}

.n-tab-group-list::before {
  margin-inline-end: calc(-1 * (var(--n-space-l) + var(--n-space-s)));
  padding-inline-start: var(--_n-tab-group-padding);
}

.n-tab-group-list::after {
  margin-inline-start: calc(-1 * (var(--n-space-l) + var(--n-space-s)));
  padding-inline-end: var(--_n-tab-group-padding);
  flex: 1;
}

.n-tab-group-list::before, .n-tab-group.is-rtl .n-tab-group-list::after {
  box-shadow: inset var(--n-space-l) 0 var(--n-space-s) calc(-1 * var(--n-space-s)) var(--_n-tab-group-list-background);
}

.n-tab-group-list::after, .n-tab-group.is-rtl .n-tab-group-list::before {
  box-shadow: inset calc(-1 * var(--n-space-l)) 0 var(--n-space-s) calc(-1 * var(--n-space-s)) var(--_n-tab-group-list-background);
}

::slotted(kabal-tab-panel) {
  display: none;
  padding: var(--_n-tab-group-padding);
}

::slotted(kabal-tab-panel[aria-hidden=false]) {
  display: block;
}

::slotted(kabal-tab) {
  z-index: var(--n-index-default);
}

:host([padding=m]) {
  --_n-tab-group-padding:var(--n-tab-group-padding, var(--n-space-m));
}

:host([padding=l]) {
  --_n-tab-group-padding:var(--n-tab-group-padding, var(--n-space-l));
}

:host([sticky]) .n-sticky {
  box-shadow: var(--_n-tab-group-list-border), var(--_n-tab-group-list-shadow);
  inset-inline: 0;
  inset-block-end: auto;
}`;
  var TabGroup_default = styles42;

  // src/tab-group/TabGroup.ts
  var tabGroupCount = 1;
  var TabGroup = class extends s4 {
    constructor() {
      super(...arguments);
      this.direction = new DirectionController(this);
      this.tabGroupId = `kabal-tab-group-${tabGroupCount++}`;
      this.label = "";
      this.padding = "m";
      this.sticky = false;
      this.selectedTab = this.initialSelectedTab;
      this.handleMutation = (mutations) => {
        mutations.forEach((mutation) => {
          var _a, _b;
          if (mutation.attributeName === "selected" && mutation.oldValue === null) {
            const selectedTab = mutation.target;
            (_a = this.observer) == null ? void 0 : _a.disconnect();
            this.updateSelectedTab(selectedTab);
            (_b = this.observer) == null ? void 0 : _b.observe(this, TabGroup.observerOptions);
          }
        });
      };
    }
    render() {
      return y`
      <div class="n-tab-group is-${this.direction.dir}">
        <div
          class="n-tab-group-list n-sticky"
          role="tablist"
          aria-label="${this.label}"
          @click=${this.handleTabChange}
          @keydown=${this.handleKeydown}
        >
          <slot name="tab"></slot>
        </div>
        <slot></slot>
      </div>
    `;
    }
    connectedCallback() {
      super.connectedCallback();
      this.updateSlots();
    }
    updateSlots() {
      this.setupTabs();
      this.setupPanels();
    }
    firstUpdated() {
      var _a;
      this.observer = new MutationObserver(this.handleMutation);
      (_a = this.observer) == null ? void 0 : _a.observe(this, TabGroup.observerOptions);
    }
    get initialSelectedTab() {
      return this.querySelector("kabal-tab[selected]") || this.querySelector("kabal-tab");
    }
    setupTabs() {
      const tabs = this.querySelectorAll("kabal-tab");
      tabs.forEach((tab, index) => {
        tab.setAttribute("id", `${this.tabGroupId}-tab-${index + 1}`);
        tab.setAttribute("aria-controls", `${this.tabGroupId}-panel-${index + 1}`);
        tab.toggleAttribute("selected", tab === this.selectedTab);
      });
    }
    setupPanels() {
      var _a;
      const panels = this.querySelectorAll("kabal-tab-panel");
      const selectedPanelId = (_a = this.selectedTab) == null ? void 0 : _a.getAttribute("aria-controls");
      panels.forEach((panel, index) => {
        panel.setAttribute("id", `${this.tabGroupId}-panel-${index + 1}`);
        panel.setAttribute("aria-labelledby", `${this.tabGroupId}-tab-${index + 1}`);
        panel.setAttribute("aria-hidden", `${panel.getAttribute("id") !== selectedPanelId}`);
      });
    }
    handleTabChange(event) {
      this.scrollTo({ top: 0 });
      if (!(event.target instanceof Tab) || event.target === this.selectedTab)
        return;
      this.updateSelectedTab(event.target);
    }
    previousTab(tab) {
      const tabs = [...this.querySelectorAll("kabal-tab")];
      const selectedTabIndex = tabs.indexOf(tab);
      return tabs[selectedTabIndex - 1];
    }
    handleKeydown(event) {
      const tab = event.target;
      const firstTab = this.querySelector("kabal-tab:first-of-type");
      const lastTab = this.querySelector("kabal-tab:last-of-type");
      const nextTab = this.querySelector(`#${tab.getAttribute("id")} ~ kabal-tab`) || firstTab;
      const previousTab = this.previousTab(tab) || lastTab;
      const updateTab = (selectedTab, keyEvent) => {
        keyEvent.preventDefault();
        this.scrollTo({ top: 0 });
        this.updateSelectedTab(selectedTab);
      };
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowUp":
          updateTab(this.direction.isLTR ? previousTab : nextTab, event);
          break;
        case "ArrowRight":
        case "ArrowDown":
          updateTab(this.direction.isLTR ? nextTab : previousTab, event);
          break;
        case "Home":
          updateTab(firstTab, event);
          break;
        case "End":
          updateTab(lastTab, event);
          break;
        default:
          break;
      }
    }
    updateSelectedTab(selectedTab) {
      const selectedPanel = this.querySelector(`#${selectedTab.getAttribute("aria-controls")}`);
      if (selectedTab === this.selectedTab)
        return;
      this.querySelectorAll("kabal-tab").forEach((tab) => {
        tab.removeAttribute("selected");
        if (tab === selectedTab) {
          tab.setAttribute("selected", "");
          tab.focus();
          tab.scrollIntoView({ block: "nearest", inline: "nearest" });
          this.selectedTab = tab;
        }
      });
      this.querySelectorAll("kabal-tab-panel").forEach((panel) => {
        panel.setAttribute("aria-hidden", `${panel !== selectedPanel}`);
      });
    }
  };
  TabGroup.styles = [Component_default, Sticky_default, TabGroup_default];
  TabGroup.observerOptions = {
    attributes: true,
    subtree: true,
    attributeFilter: ["selected"],
    attributeOldValue: true
  };
  __decorateClass([
    e5({ reflect: true })
  ], TabGroup.prototype, "label", 2);
  __decorateClass([
    e5({ reflect: true })
  ], TabGroup.prototype, "padding", 2);
  __decorateClass([
    e5({ reflect: true, type: Boolean })
  ], TabGroup.prototype, "sticky", 2);
  __decorateClass([
    t3()
  ], TabGroup.prototype, "selectedTab", 2);
  TabGroup = __decorateClass([
    e4("kabal-tab-group")
  ], TabGroup);

  // src/tab-panel/TabPanel.scss
  var styles43 = i`.n-tab-panel {
  font-size: var(--n-font-size-m);
  color: var(--n-color-text);
}

::slotted(*) {
  margin: 0;
}`;
  var TabPanel_default = styles43;

  // src/tab-panel/TabPanel.ts
  var TabPanel = class extends s4 {
    render() {
      return y`<div class="n-tab-panel"><slot></slot></div>`;
    }
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("role", "tabpanel");
      this.setAttribute("tabindex", "0");
    }
  };
  TabPanel.styles = [Component_default, TabPanel_default];
  TabPanel = __decorateClass([
    e4("kabal-tab-panel")
  ], TabPanel);

  // src/table/Table.scss
  var styles44 = i`kabal-table {
  --_n-table-td-padding:var(--n-table-td-padding, calc(var(--n-space-m) * 0.8));
  --_n-table-border-radius:var(--n-table-border-radius, var(--n-border-radius));
  all: unset;
  color: var(--n-color-text);
  -webkit-user-select: inherit;
  user-select: inherit;
  display: block;
  max-inline-size: 100%;
  overflow-x: auto;
}

kabal-table table {
  inline-size: 100%;
  font-size: var(--n-font-size-m);
  font-family: var(--n-font-family);
  font-feature-settings: var(--n-font-features);
  line-height: var(--n-line-height-tight);
  text-align: start;
  border-spacing: 0;
  border-collapse: separate;
  color: var(--n-color-text);
  font-variant-numeric: tabular-nums;
}

kabal-table th {
  border-block-end: 1px solid var(--n-color-border);
  font-weight: var(--n-font-weight-active);
  font-size: var(--n-font-size-s);
  color: var(--n-color-text-weaker);
  text-align: start;
  background: var(--n-color-surface-raised);
}

kabal-table td {
  border-block-end: 1px solid var(--n-color-border);
  white-space: nowrap;
}

kabal-table :is(td, th) {
  padding: var(--_n-table-td-padding) var(--n-space-s);
}

kabal-table :is(td, th):first-child {
  padding-inline-start: var(--n-space-m);
}

kabal-table :is(td, th):last-child {
  padding-inline-end: var(--n-space-m);
}

kabal-table tbody tr:hover {
  background: var(--n-color-active);
}

kabal-table tbody :is(.n-row-selected, .n-row-selected:hover) {
  background: var(--n-color-active);
  color: var(--n-color-text);
  opacity: 1;
  cursor: default;
}

kabal-table tbody :is(tr:hover, .n-row-selected) td {
  color: var(--n-color-text);
}

kabal-table th[aria-sort] {
  cursor: pointer;
}

kabal-table th[aria-sort]:not([aria-sort=none]) {
  color: var(--n-color-text);
}

kabal-table[density=condensed] {
  --_n-table-td-padding:var(--n-table-td-padding, calc(var(--n-space-m) * 0.5));
}

kabal-table[density=relaxed] {
  --_n-table-td-padding:var(--n-table-td-padding, calc(var(--n-space-m) * 1.1));
}

kabal-card kabal-table tbody tr:last-child td {
  border-block-end-color: transparent;
}

kabal-card kabal-table th:first-child {
  border-start-start-radius: var(--_n-table-border-radius);
}

kabal-card kabal-table th:last-child {
  border-start-end-radius: var(--_n-table-border-radius);
}

kabal-card [slot=header] ~ kabal-table th:is(:first-child, :last-child) {
  border-radius: 0;
}

kabal-card kabal-table tbody tr:last-child td:first-child {
  border-end-start-radius: var(--_n-table-border-radius);
}

kabal-card kabal-table tbody tr:last-child td:last-child {
  border-end-end-radius: var(--_n-table-border-radius);
}

kabal-table[scroll-snap] {
  scroll-snap-type: inline mandatory;
  scroll-behavior: smooth;
}

kabal-table[scroll-snap] :is(th, td) {
  scroll-snap-align: start;
}

kabal-table:where([striped]) tbody tr:where(:nth-child(even)) {
  background: var(--n-color-surface-raised);
}

kabal-table .n-table-ellipsis {
  max-inline-size: 0;
  inline-size: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

kabal-table .n-table-align-right {
  text-align: end;
}

kabal-table .n-table-actions {
  display: flex;
  justify-content: center;
}

kabal-table .n-table-actions kabal-button {
  margin-block: -10px;
}`;
  var Table_default = styles44;

  // src/table/Table.ts
  function isDocument(node) {
    return node.nodeType === Node.DOCUMENT_NODE;
  }
  var Table = class extends s4 {
    constructor() {
      super(...arguments);
      this.density = "default";
      this.scrollSnap = false;
      this.striped = false;
    }
    connectedCallback() {
      super.connectedCallback();
      this.renderStyles();
    }
    renderStyles() {
      const rootNode = this.getRootNode();
      const renderTarget = isDocument(rootNode) ? rootNode.head : rootNode;
      const tagName = this.localName;
      const componentStyles = rootNode.querySelector(`style[data-component=${tagName}]`);
      if (componentStyles) {
        return;
      }
      const fragment = document.createDocumentFragment();
      Z(
        y`
        <style data-component=${tagName}>
          ${Table_default}
        </style>
      `,
        fragment
      );
      renderTarget.appendChild(fragment);
    }
    createRenderRoot() {
      return this;
    }
  };
  __decorateClass([
    e5({ reflect: true })
  ], Table.prototype, "density", 2);
  __decorateClass([
    e5({ reflect: true, type: Boolean, attribute: "scroll-snap" })
  ], Table.prototype, "scrollSnap", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Table.prototype, "striped", 2);
  Table = __decorateClass([
    e4("kabal-table")
  ], Table);

  // src/textarea/Textarea.scss
  var styles45 = i`:host {
  --_n-textarea-inline-size:var(--n-textarea-inline-size, 240px);
  --_n-textarea-block-size:var(--n-textarea-block-size, 76px);
  --_n-input-background:var(--n-textarea-background, var(--n-color-active));
  --_n-input-color:var(--n-textarea-color, var(--n-color-text));
  --_n-input-border-color:var(--n-textarea-border-color, var(--n-color-border-strong));
  --_n-input-border-radius:var(--n-textarea-border-radius, var(--n-border-radius-s));
}

.n-input-container {
  position: relative;
  inline-size: var(--_n-textarea-inline-size);
}

.n-input {
  min-block-size: var(--_n-textarea-block-size);
  transition: border var(--n-transition-slowly), box-shadow var(--n-transition-slowly), background var(--n-transition-slowly);
  display: block;
  resize: vertical;
}

:host([resize=auto]) .n-input {
  resize: none;
  overflow: hidden;
}

:host([expand]) {
  --_n-textarea-inline-size:100%;
}

.n-character-counter {
  margin-block-start: calc(var(--n-space-s) / 2);
  color: var(--n-color-text-weaker);
}

.n-input:hover, .n-label-container:hover + .n-input-container .n-input {
  --_n-input-border-color:var(--n-textarea-border-color, var(--n-color-border-hover));
}

.n-input:focus {
  --_n-input-border-color:var(--n-textarea-border-color, var(--n-color-accent));
  --_n-input-background:var(--n-textarea-background, var(--n-color-surface));
}

.n-input[aria-invalid=true] {
  --_n-input-border-color:var(--n-textarea-border-color, var(--n-color-status-danger))!important;
}

.n-input:disabled, .n-input[readonly], .n-label-container:hover + .n-input-container .n-input:disabled, .n-label-container:hover + .n-input-container .n-input[readonly] {
  --_n-input-border-color:var(--n-textarea-border-color, var(--n-color-active));
  --_n-input-color:var(--n-textarea-color, var(--n-color-text-weakest));
}

.n-input[readonly], .n-label-container:hover + .n-input-container .n-input[readonly] {
  --_n-input-color:var(--n-textarea-color, var(--n-color-text-weak));
}

.n-input[readonly]:focus {
  --_n-input-border-color:var(--n-textarea-border-color, var(--n-color-accent));
}`;
  var Textarea_default = styles45;

  // src/textarea/Textarea.ts
  function createLengthMeasurer(locale) {
    if (Intl.Segmenter) {
      const segmenter = new Intl.Segmenter(locale);
      return (value) => [...segmenter.segment(value)].length;
    }
    return (value) => value.length;
  }
  var Textarea = class extends SizeMixin(
    FormAssociatedMixin(AutocompleteMixin(ReadonlyMixin(InputMixin(FocusableMixin(s4)))))
  ) {
    constructor() {
      super(...arguments);
      this.inputId = "textarea";
      this.localize = new LocalizeController(this, {
        onLangChange: () => this.handleLangChange()
      });
      this.resize = "vertical";
      this.expand = false;
      this.characterCounter = false;
    }
    render() {
      var _a;
      return y`
      ${this.renderLabel()}

      <div class="n-input-container">
        <textarea
          ${n7(this.focusableRef)}
          id=${this.inputId}
          class="n-input"
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          name=${l5(this.name)}
          maxlength=${l5(this.maxLength)}
          .value=${(_a = this.value) != null ? _a : ""}
          placeholder=${l5(this.placeholder)}
          @change=${this.handleChange}
          @input=${this.handleInput}
          aria-describedby=${l5(this.getDescribedBy())}
          aria-invalid=${l5(this.getInvalid())}
          autocomplete=${this.autocomplete}
        ></textarea>

        ${this.characterCounter ? this.renderCharacterCounter() : b}
      </div>

      ${this.renderError()}
    `;
    }
    renderCharacterCounter() {
      const { value, maxLength } = this;
      const length = typeof value === "string" ? this.lengthMeasurer(value) : 0;
      const remainder = maxLength ? maxLength - length : void 0;
      const counter = maxLength ? `${length}/${maxLength}` : length;
      return y`
      <kabal-visually-hidden aria-live="polite" aria-atomic="true">
        ${remainder != null && remainder <= 10 ? this.localize.term("remainingCharacters", remainder) : ""}
      </kabal-visually-hidden>
      <div class="n-character-counter">${counter}</div>
    `;
    }
    handleLangChange() {
      const lang = this.localize.resolvedLang;
      this.lengthMeasurer = createLengthMeasurer(lang);
    }
    resizeToFitContent() {
      const textarea = this.focusableRef.value;
      if (!textarea) {
        return;
      }
      if (this.resize === "auto") {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      } else {
        textarea.style.height = "";
      }
    }
  };
  Textarea.styles = [Component_default, FormField_default, TextField_default, Textarea_default];
  __decorateClass([
    e5({ reflect: true })
  ], Textarea.prototype, "resize", 2);
  __decorateClass([
    e5({ reflect: true, type: Boolean })
  ], Textarea.prototype, "expand", 2);
  __decorateClass([
    e5({ attribute: "maxlength", type: Number })
  ], Textarea.prototype, "maxLength", 2);
  __decorateClass([
    e5({ type: Boolean, attribute: "character-counter" })
  ], Textarea.prototype, "characterCounter", 2);
  __decorateClass([
    observe("resize", "updated"),
    observe("value", "updated")
  ], Textarea.prototype, "resizeToFitContent", 1);
  Textarea = __decorateClass([
    e4("kabal-textarea")
  ], Textarea);

  // ../../node_modules/@nordhealth/icons/lib/assets/interface-close.js
  var interface_close_exports = {};
  __export(interface_close_exports, {
    default: () => interface_close_default,
    tags: () => tags26,
    title: () => title26
  });
  var interface_close_default = '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path d="M133 7 7 133M7 7l126 126" stroke-width="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var title26 = "interface-close";
  var tags26 = "nordicon interface close cross remove delete erase symbol";

  // src/toast/Toast.scss
  var styles46 = i`:host {
  --_n-toast-color:var(--n-color-surface);
  --_n-toast-background-color:var(--n-color-text);
}

.n-toast {
  display: flex;
  gap: var(--n-space-l);
  align-items: flex-start;
  background-color: var(--_n-toast-background-color);
  color: var(--_n-toast-color);
  border-radius: var(--n-border-radius);
  animation: n-enter var(--n-transition-slowly) forwards 1;
  z-index: var(--n-index-toast);
  box-shadow: var(--n-box-shadow-popout);
}

.n-dismissed {
  animation-name: n-exit;
}

@keyframes n-enter {
  from {
    transform: translateY(50%);
    opacity: 0;
  }
}
@keyframes n-exit {
  to {
    transform: scale(0.97);
    opacity: 0;
  }
}
.n-toast-inner {
  padding: var(--n-space-m);
  flex: 1;
}

.n-dismiss {
  --_n-toast-focus-ring:0 0 0 2px var(--n-color-accent);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  block-size: var(--n-space-xl);
  inline-size: var(--n-space-xl);
  position: relative;
  inset-inline-end: var(--n-space-s);
  inset-block-start: var(--n-space-s);
  background-color: transparent;
  border-radius: var(--n-border-radius);
  cursor: pointer;
}

.n-dismiss::after, .n-dismiss::before {
  content: "";
  position: absolute;
  display: block;
  border-radius: var(--n-border-radius);
}

.n-dismiss::before {
  inset: 0;
  background: var(--_n-toast-color);
  transition: opacity var(--n-transition-quickly);
  opacity: 0;
}

.n-dismiss:is(:hover, :focus)::before {
  opacity: 0.06;
}

.n-dismiss::after {
  inset: calc(var(--n-space-s) * -1);
}

.n-dismiss:active {
  transform: translateY(1px);
}

.n-dismiss:focus {
  outline: 0;
  box-shadow: var(--_n-toast-focus-ring);
}

@supports selector(:focus-visible) {
  .n-dismiss:focus {
    box-shadow: none;
  }
  .n-dismiss:focus-visible {
    box-shadow: var(--_n-toast-focus-ring);
  }
}
.n-dismiss kabal-icon {
  opacity: 0.53;
  transition: opacity var(--n-transition-quickly);
  color: var(--_n-toast-color);
}

.n-dismiss:is(:hover, :focus) kabal-icon {
  opacity: 1;
}

:host([variant=danger]) {
  --_n-toast-background-color:var(--n-color-status-danger);
  --_n-toast-color:var(--n-color-text-on-accent);
}`;
  var Toast_default = styles46;

  // src/toast/Toast.ts
  Icon.registerIcon(interface_close_exports);
  var Toast = class extends s4 {
    constructor() {
      super(...arguments);
      this.events = new EventController(this);
      this.dismissed = false;
      this.variant = "default";
      this.autoDismiss = 1e4;
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      clearTimeout(this.timeoutId);
    }
    dismiss() {
      this.dismissed = true;
      clearTimeout(this.timeoutId);
      return new Promise((resolve) => {
        this.events.listen(
          this.toast,
          "animationend",
          () => {
            this.dispatchEvent(new NordEvent("dismiss"));
            resolve();
          },
          { once: true }
        );
      });
    }
    render() {
      return y`
      <div class=${o9({ "n-toast": true, "n-dismissed": this.dismissed })}>
        <div class="n-toast-inner">
          <slot></slot>
        </div>

        <button class="n-dismiss" @click=${this.dismiss} aria-hidden="true">
          <kabal-icon name="interface-close" size="s"></kabal-icon>
        </button>
      </div>
    `;
    }
    handleAutoDismissChange() {
      clearTimeout(this.timeoutId);
      if (this.autoDismiss != null && this.autoDismiss >= 0) {
        setTimeout(() => this.dismiss(), this.autoDismiss);
      }
    }
  };
  Toast.styles = [Component_default, Toast_default];
  __decorateClass([
    i4(".n-toast", true)
  ], Toast.prototype, "toast", 2);
  __decorateClass([
    t3()
  ], Toast.prototype, "dismissed", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Toast.prototype, "variant", 2);
  __decorateClass([
    e5({ type: Number, attribute: "auto-dismiss" })
  ], Toast.prototype, "autoDismiss", 2);
  __decorateClass([
    observe("autoDismiss")
  ], Toast.prototype, "handleAutoDismissChange", 1);
  Toast = __decorateClass([
    e4("kabal-toast")
  ], Toast);

  // src/toast-group/ToastGroup.scss
  var styles47 = i`.n-toast-group {
  display: flex;
  flex-direction: column;
  gap: var(--n-space-s);
  position: fixed;
  z-index: var(--n-index-toast);
  inset: 0;
  inset-block-start: auto;
  inset-inline-end: var(--n-scrollbar-gutter, 0);
  margin: 1em;
  pointer-events: none;
}

::slotted(kabal-toast) {
  max-inline-size: calc(var(--n-space-xxl) * 5);
  inline-size: 100%;
  margin-inline: auto;
  pointer-events: auto;
}`;
  var ToastGroup_default = styles47;

  // src/toast-group/ToastGroup.ts
  var ToastGroup = class extends s4 {
    render() {
      return y`
      <div class="n-toast-group" role="log" aria-relevant="additions">
        <slot></slot>
      </div>
    `;
    }
    addToast(text, options = {}) {
      const { variant, autoDismiss } = options;
      const toast = document.createElement("kabal-toast");
      if (variant) {
        toast.variant = variant;
      }
      if (autoDismiss != null) {
        toast.autoDismiss = autoDismiss;
      }
      toast.textContent = text;
      this.appendChild(toast);
      return toast;
    }
  };
  ToastGroup.styles = [Component_default, ToastGroup_default];
  ToastGroup = __decorateClass([
    e4("kabal-toast-group")
  ], ToastGroup);

  // src/common/attribute.ts
  function getTokens(element, attr) {
    const value = element.getAttribute(attr);
    return value ? value.split(/\s+/) : [];
  }
  function setTokens(element, attr, tokens) {
    element.setAttribute(attr, tokens.join(" "));
  }
  function add(element, attr, token) {
    const tokens = getTokens(element, attr);
    if (!tokens.includes(token)) {
      setTokens(element, attr, tokens.concat(token));
    }
  }
  function remove(element, attr, token) {
    const tokens = getTokens(element, attr);
    if (tokens.includes(token)) {
      setTokens(
        element,
        attr,
        tokens.filter((t7) => t7 !== token)
      );
    }
  }

  // src/tooltip/Tooltip.scss
  var styles48 = i`:host {
  --_n-tooltip-max-size: var(--n-tooltip-max-size, 50ch);
  --_n-tooltip-background: rgba(20, 20, 20, 0.95);
  --_n-tooltip-color: #fff;
  --_n-tooltip-key-border: rgba(255, 255, 255, 0.03);
  --_n-tooltip-key-background: rgba(255, 255, 255, 0.1);
  position: fixed;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition: opacity var(--n-transition-slowly), visibility var(--n-transition-slowly);
  transition-timing-function: ease;
  z-index: var(--n-index-popout);
}

.n-tooltip {
  gap: var(--n-space-s);
  font-family: var(--n-font-family);
  font-size: var(--n-font-size-xs);
  line-height: var(--n-line-height);
  color: var(--_n-tooltip-color);
  padding: calc(var(--n-space-s) / 1.5) var(--n-space-s);
  background-color: var(--_n-tooltip-background);
  border-radius: var(--n-border-radius-s);
  word-break: break-word;
  max-inline-size: var(--_n-tooltip-max-size);
}

.n-tooltip,
.n-tooltip-shortcut {
  display: flex;
  align-items: center;
}

.n-tooltip-shortcut {
  gap: 2px;
}

::slotted([slot=shortcut]) {
  box-sizing: border-box;
  margin: 0;
  inline-size: var(--n-size-icon-m);
  block-size: var(--n-size-icon-m);
  border-radius: var(--n-border-radius-s);
  border: 1px solid var(--_n-tooltip-key-border) !important;
  padding: 1px !important;
  text-align: center;
  font-size: var(--n-font-size-xs);
  line-height: var(--n-line-height-tight);
  letter-spacing: -0.5px;
  vertical-align: middle !important;
  background-color: var(--_n-tooltip-key-background);
}

[slot=shortcut]::slotted(kabal-icon:not([size])) {
  --_n-icon-size: var(--n-size-icon-s) ;
}`;
  var Tooltip_default = styles48;

  // src/tooltip/Tooltip.ts
  function isElement2(el) {
    return el.nodeType === Node.ELEMENT_NODE;
  }
  function referencesTooltip(node, tooltip) {
    return Boolean(tooltip.id) && isElement2(node) && node.getAttribute("aria-describedby") === tooltip.id;
  }
  function getFocusable(el) {
    var _a;
    const focusable = (_a = el == null ? void 0 : el.focusableRef) == null ? void 0 : _a.value;
    if (focusable && "focusableRef" in focusable) {
      return getFocusable(focusable);
    }
    return focusable;
  }
  var { transition: transition2 } = fsm({
    hidden: {
      show: "waiting"
    },
    visible: {
      hide: "hidden",
      reposition: "positioning",
      show: "positioning"
    },
    waiting: {
      timeout: "positioning",
      hide: "hidden"
    },
    positioning: {
      positioned: "visible",
      hide: "hidden"
    }
  });
  var Tooltip = class extends s4 {
    constructor() {
      super(...arguments);
      this.shortcutSlot = new SlotController(this, "shortcut");
      this.events = new EventController(this);
      this.proxy = document.createElement("span");
      this.state = "hidden";
      this.coords = [0, 0];
      this.position = "block-start";
      this.role = "tooltip";
      this.id = "";
      this.delay = 500;
      this.updatePosition = (currentElement) => O2(currentElement, this, {
        strategy: "fixed",
        placement: logicalToPhysical(this.position),
        middleware: [
          T2(8),
          b2(),
          E2({
            padding: 8
          })
        ]
      }).then(({ x: x4, y: y4 }) => {
        this.coords = [x4, y4];
        this.state = transition2(this.state, "positioned");
      });
      this.hideTooltip = () => {
        this.state = transition2(this.state, "hide");
      };
      this.reposition = () => {
        this.state = transition2(this.state, "reposition");
      };
      this.handleShow = (e13) => {
        const target = e13.target;
        if (referencesTooltip(target, this)) {
          this.currentElement = target;
          this.state = transition2(this.state, "show");
        }
      };
      this.handleHide = (e13) => {
        if (e13.target === this.currentElement) {
          this.hideTooltip();
        }
      };
      this.hideOnEscape = (e13) => {
        if (e13.key === "Escape") {
          this.hideTooltip();
        }
      };
      this.addDescribedBy = () => {
        const focusable = getFocusable(this.currentElement);
        if (focusable) {
          this.proxy.hidden = true;
          this.proxy.id = this.id;
          this.proxy.textContent = this.textContent;
          focusable.insertAdjacentElement("afterend", this.proxy);
          add(focusable, "aria-describedby", this.id);
        }
      };
      this.removeDescribedBy = () => {
        const focusable = getFocusable(this.currentElement);
        if (focusable) {
          this.proxy.remove();
          remove(focusable, "aria-describedby", this.id);
        }
      };
    }
    connectedCallback() {
      super.connectedCallback();
      const rootNode = this.getRootNode();
      this.events.listen(rootNode, "keydown", this.hideOnEscape);
      this.events.listen(rootNode, "mouseover", this.handleShow);
      this.events.listen(rootNode, "focusin", this.handleShow);
      this.events.listen(rootNode, "mouseout", this.handleHide);
      this.events.listen(rootNode, "focusout", this.handleHide);
      this.events.listen(rootNode, "click", this.handleHide, { capture: true });
      this.events.listen(window, "resize", this.reposition, { passive: true });
      this.events.listen(window, "scroll", this.reposition, { passive: true });
    }
    render() {
      return y`
      <div class="n-tooltip">
        <slot></slot>
        <div class="n-tooltip-shortcut" ?hidden=${this.shortcutSlot.isEmpty}>
          <slot class="n-tooltip-key" name="shortcut"></slot>
        </div>
      </div>
    `;
    }
    handleIdChange() {
      if (!this.id) {
        console.warn("NORD: The tooltip requires an id attribute and value");
      }
    }
    handleStateChange(prevState) {
      var _a;
      switch (this.state) {
        case "hidden": {
          if (prevState === "waiting" && this.timeoutId) {
            clearTimeout(this.timeoutId);
          }
          this.removeDescribedBy();
          this.currentElement = void 0;
          this.style.visibility = "hidden";
          this.style.opacity = "0";
          break;
        }
        case "visible": {
          this.timeoutId = void 0;
          Tooltip.lastOpened = this;
          this.addDescribedBy();
          const [x4, y4] = this.coords;
          this.style.left = `${x4}px`;
          this.style.top = `${y4}px`;
          this.style.visibility = "visible";
          this.style.opacity = "1";
          break;
        }
        case "waiting": {
          this.timeoutId = setTimeout(() => {
            this.state = transition2(this.state, "timeout");
          }, this.delay);
          break;
        }
        case "positioning": {
          if (Tooltip.lastOpened !== this) {
            (_a = Tooltip.lastOpened) == null ? void 0 : _a.hideTooltip();
          }
          if (this.currentElement) {
            this.updatePosition(this.currentElement);
          }
          break;
        }
      }
    }
  };
  Tooltip.styles = [Component_default, Tooltip_default];
  __decorateClass([
    t3()
  ], Tooltip.prototype, "state", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Tooltip.prototype, "position", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Tooltip.prototype, "role", 2);
  __decorateClass([
    e5({ reflect: true })
  ], Tooltip.prototype, "id", 2);
  __decorateClass([
    e5({ reflect: true, type: Number })
  ], Tooltip.prototype, "delay", 2);
  __decorateClass([
    observe("id")
  ], Tooltip.prototype, "handleIdChange", 1);
  __decorateClass([
    observe("state")
  ], Tooltip.prototype, "handleStateChange", 1);
  Tooltip = __decorateClass([
    e4("kabal-tooltip")
  ], Tooltip);
})();
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
