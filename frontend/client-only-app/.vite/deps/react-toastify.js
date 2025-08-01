"use client";
import {
  require_react
} from "./chunk-ZAGUJ3RM.js";
import {
  __toESM
} from "./chunk-5WWUZCGV.js";

// node_modules/react-toastify/dist/index.mjs
var import_react = __toESM(require_react(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_react3 = __toESM(require_react(), 1);
var import_react4 = __toESM(require_react(), 1);
var import_react5 = __toESM(require_react(), 1);

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else
      for (f in e)
        e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++)
    (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// node_modules/react-toastify/dist/index.mjs
var import_react6 = __toESM(require_react(), 1);
var import_react7 = __toESM(require_react(), 1);
var import_react8 = __toESM(require_react(), 1);
var import_react9 = __toESM(require_react(), 1);
var import_react10 = __toESM(require_react(), 1);
var import_react11 = __toESM(require_react(), 1);
function Mt(t) {
  if (!t || typeof document == "undefined")
    return;
  let o = document.head || document.getElementsByTagName("head")[0], e = document.createElement("style");
  e.type = "text/css", o.firstChild ? o.insertBefore(e, o.firstChild) : o.appendChild(e), e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
Mt(`:root{--toastify-color-light: #fff;--toastify-color-dark: #121212;--toastify-color-info: #3498db;--toastify-color-success: #07bc0c;--toastify-color-warning: #f1c40f;--toastify-color-error: hsl(6, 78%, 57%);--toastify-color-transparent: rgba(255, 255, 255, .7);--toastify-icon-color-info: var(--toastify-color-info);--toastify-icon-color-success: var(--toastify-color-success);--toastify-icon-color-warning: var(--toastify-color-warning);--toastify-icon-color-error: var(--toastify-color-error);--toastify-container-width: fit-content;--toastify-toast-width: 320px;--toastify-toast-offset: 16px;--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));--toastify-toast-background: #fff;--toastify-toast-padding: 14px;--toastify-toast-min-height: 64px;--toastify-toast-max-height: 800px;--toastify-toast-bd-radius: 6px;--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1);--toastify-font-family: sans-serif;--toastify-z-index: 9999;--toastify-text-color-light: #757575;--toastify-text-color-dark: #fff;--toastify-text-color-info: #fff;--toastify-text-color-success: #fff;--toastify-text-color-warning: #fff;--toastify-text-color-error: #fff;--toastify-spinner-color: #616161;--toastify-spinner-color-empty-area: #e0e0e0;--toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);--toastify-color-progress-dark: #bb86fc;--toastify-color-progress-info: var(--toastify-color-info);--toastify-color-progress-success: var(--toastify-color-success);--toastify-color-progress-warning: var(--toastify-color-warning);--toastify-color-progress-error: var(--toastify-color-error);--toastify-color-progress-bgo: .2}.Toastify__toast-container{z-index:var(--toastify-z-index);-webkit-transform:translate3d(0,0,var(--toastify-z-index));position:fixed;width:var(--toastify-container-width);box-sizing:border-box;color:#fff;display:flex;flex-direction:column}.Toastify__toast-container--top-left{top:var(--toastify-toast-top);left:var(--toastify-toast-left)}.Toastify__toast-container--top-center{top:var(--toastify-toast-top);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--top-right{top:var(--toastify-toast-top);right:var(--toastify-toast-right);align-items:end}.Toastify__toast-container--bottom-left{bottom:var(--toastify-toast-bottom);left:var(--toastify-toast-left)}.Toastify__toast-container--bottom-center{bottom:var(--toastify-toast-bottom);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--bottom-right{bottom:var(--toastify-toast-bottom);right:var(--toastify-toast-right);align-items:end}.Toastify__toast{--y: 0;position:relative;touch-action:none;width:var(--toastify-toast-width);min-height:var(--toastify-toast-min-height);box-sizing:border-box;margin-bottom:1rem;padding:var(--toastify-toast-padding);border-radius:var(--toastify-toast-bd-radius);box-shadow:var(--toastify-toast-shadow);max-height:var(--toastify-toast-max-height);font-family:var(--toastify-font-family);z-index:0;display:flex;flex:1 auto;align-items:center;word-break:break-word}@media only screen and (max-width: 480px){.Toastify__toast-container{width:100vw;left:env(safe-area-inset-left);margin:0}.Toastify__toast-container--top-left,.Toastify__toast-container--top-center,.Toastify__toast-container--top-right{top:env(safe-area-inset-top);transform:translate(0)}.Toastify__toast-container--bottom-left,.Toastify__toast-container--bottom-center,.Toastify__toast-container--bottom-right{bottom:env(safe-area-inset-bottom);transform:translate(0)}.Toastify__toast-container--rtl{right:env(safe-area-inset-right);left:initial}.Toastify__toast{--toastify-toast-width: 100%;margin-bottom:0;border-radius:0}}.Toastify__toast-container[data-stacked=true]{width:var(--toastify-toast-width)}.Toastify__toast--stacked{position:absolute;width:100%;transform:translate3d(0,var(--y),0) scale(var(--s));transition:transform .3s}.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,.Toastify__toast--stacked[data-collapsed] .Toastify__close-button{transition:opacity .1s}.Toastify__toast--stacked[data-collapsed=false]{overflow:visible}.Toastify__toast--stacked[data-collapsed=true]:not(:last-child)>*{opacity:0}.Toastify__toast--stacked:after{content:"";position:absolute;left:0;right:0;height:calc(var(--g) * 1px);bottom:100%}.Toastify__toast--stacked[data-pos=top]{top:0}.Toastify__toast--stacked[data-pos=bot]{bottom:0}.Toastify__toast--stacked[data-pos=bot].Toastify__toast--stacked:before{transform-origin:top}.Toastify__toast--stacked[data-pos=top].Toastify__toast--stacked:before{transform-origin:bottom}.Toastify__toast--stacked:before{content:"";position:absolute;left:0;right:0;bottom:0;height:100%;transform:scaleY(3);z-index:-1}.Toastify__toast--rtl{direction:rtl}.Toastify__toast--close-on-click{cursor:pointer}.Toastify__toast-icon{margin-inline-end:10px;width:22px;flex-shrink:0;display:flex}.Toastify--animate{animation-fill-mode:both;animation-duration:.5s}.Toastify--animate-icon{animation-fill-mode:both;animation-duration:.3s}.Toastify__toast-theme--dark{background:var(--toastify-color-dark);color:var(--toastify-text-color-dark)}.Toastify__toast-theme--light,.Toastify__toast-theme--colored.Toastify__toast--default{background:var(--toastify-color-light);color:var(--toastify-text-color-light)}.Toastify__toast-theme--colored.Toastify__toast--info{color:var(--toastify-text-color-info);background:var(--toastify-color-info)}.Toastify__toast-theme--colored.Toastify__toast--success{color:var(--toastify-text-color-success);background:var(--toastify-color-success)}.Toastify__toast-theme--colored.Toastify__toast--warning{color:var(--toastify-text-color-warning);background:var(--toastify-color-warning)}.Toastify__toast-theme--colored.Toastify__toast--error{color:var(--toastify-text-color-error);background:var(--toastify-color-error)}.Toastify__progress-bar-theme--light{background:var(--toastify-color-progress-light)}.Toastify__progress-bar-theme--dark{background:var(--toastify-color-progress-dark)}.Toastify__progress-bar--info{background:var(--toastify-color-progress-info)}.Toastify__progress-bar--success{background:var(--toastify-color-progress-success)}.Toastify__progress-bar--warning{background:var(--toastify-color-progress-warning)}.Toastify__progress-bar--error{background:var(--toastify-color-progress-error)}.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error{background:var(--toastify-color-transparent)}.Toastify__close-button{color:#fff;position:absolute;top:6px;right:6px;background:transparent;outline:none;border:none;padding:0;cursor:pointer;opacity:.7;transition:.3s ease;z-index:1}.Toastify__toast--rtl .Toastify__close-button{left:6px;right:unset}.Toastify__close-button--light{color:#000;opacity:.3}.Toastify__close-button>svg{fill:currentColor;height:16px;width:14px}.Toastify__close-button:hover,.Toastify__close-button:focus{opacity:1}@keyframes Toastify__trackProgress{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.Toastify__progress-bar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:1;opacity:.7;transform-origin:left}.Toastify__progress-bar--animated{animation:Toastify__trackProgress linear 1 forwards}.Toastify__progress-bar--controlled{transition:transform .2s}.Toastify__progress-bar--rtl{right:0;left:initial;transform-origin:right;border-bottom-left-radius:initial}.Toastify__progress-bar--wrp{position:absolute;overflow:hidden;bottom:0;left:0;width:100%;height:5px;border-bottom-left-radius:var(--toastify-toast-bd-radius);border-bottom-right-radius:var(--toastify-toast-bd-radius)}.Toastify__progress-bar--wrp[data-hidden=true]{opacity:0}.Toastify__progress-bar--bg{opacity:var(--toastify-color-progress-bgo);width:100%;height:100%}.Toastify__spinner{width:20px;height:20px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--toastify-spinner-color-empty-area);border-right-color:var(--toastify-spinner-color);animation:Toastify__spin .65s linear infinite}@keyframes Toastify__bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutRight{20%{opacity:1;transform:translate3d(-20px,var(--y),0)}to{opacity:0;transform:translate3d(2000px,var(--y),0)}}@keyframes Toastify__bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutLeft{20%{opacity:1;transform:translate3d(20px,var(--y),0)}to{opacity:0;transform:translate3d(-2000px,var(--y),0)}}@keyframes Toastify__bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}@keyframes Toastify__bounceOutUp{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}@keyframes Toastify__bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}@keyframes Toastify__bounceOutDown{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.Toastify__bounce-enter--top-left,.Toastify__bounce-enter--bottom-left{animation-name:Toastify__bounceInLeft}.Toastify__bounce-enter--top-right,.Toastify__bounce-enter--bottom-right{animation-name:Toastify__bounceInRight}.Toastify__bounce-enter--top-center{animation-name:Toastify__bounceInDown}.Toastify__bounce-enter--bottom-center{animation-name:Toastify__bounceInUp}.Toastify__bounce-exit--top-left,.Toastify__bounce-exit--bottom-left{animation-name:Toastify__bounceOutLeft}.Toastify__bounce-exit--top-right,.Toastify__bounce-exit--bottom-right{animation-name:Toastify__bounceOutRight}.Toastify__bounce-exit--top-center{animation-name:Toastify__bounceOutUp}.Toastify__bounce-exit--bottom-center{animation-name:Toastify__bounceOutDown}@keyframes Toastify__zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes Toastify__zoomOut{0%{opacity:1}50%{opacity:0;transform:translate3d(0,var(--y),0) scale3d(.3,.3,.3)}to{opacity:0}}.Toastify__zoom-enter{animation-name:Toastify__zoomIn}.Toastify__zoom-exit{animation-name:Toastify__zoomOut}@keyframes Toastify__flipIn{0%{transform:perspective(400px) rotateX(90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes Toastify__flipOut{0%{transform:translate3d(0,var(--y),0) perspective(400px)}30%{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(-20deg);opacity:1}to{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(90deg);opacity:0}}.Toastify__flip-enter{animation-name:Toastify__flipIn}.Toastify__flip-exit{animation-name:Toastify__flipOut}@keyframes Toastify__slideInRight{0%{transform:translate3d(110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInLeft{0%{transform:translate3d(-110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInUp{0%{transform:translate3d(0,110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInDown{0%{transform:translate3d(0,-110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideOutRight{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(110%,var(--y),0)}}@keyframes Toastify__slideOutLeft{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(-110%,var(--y),0)}}@keyframes Toastify__slideOutDown{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,500px,0)}}@keyframes Toastify__slideOutUp{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,-500px,0)}}.Toastify__slide-enter--top-left,.Toastify__slide-enter--bottom-left{animation-name:Toastify__slideInLeft}.Toastify__slide-enter--top-right,.Toastify__slide-enter--bottom-right{animation-name:Toastify__slideInRight}.Toastify__slide-enter--top-center{animation-name:Toastify__slideInDown}.Toastify__slide-enter--bottom-center{animation-name:Toastify__slideInUp}.Toastify__slide-exit--top-left,.Toastify__slide-exit--bottom-left{animation-name:Toastify__slideOutLeft;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-right,.Toastify__slide-exit--bottom-right{animation-name:Toastify__slideOutRight;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-center{animation-name:Toastify__slideOutUp;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--bottom-center{animation-name:Toastify__slideOutDown;animation-timing-function:ease-in;animation-duration:.3s}@keyframes Toastify__spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`);
var L = (t) => typeof t == "number" && !isNaN(t);
var N = (t) => typeof t == "string";
var P = (t) => typeof t == "function";
var mt = (t) => N(t) || L(t);
var B = (t) => N(t) || P(t) ? t : null;
var pt = (t, o) => t === false || L(t) && t > 0 ? t : o;
var z = (t) => (0, import_react.isValidElement)(t) || N(t) || P(t) || L(t);
function Z(t, o, e = 300) {
  let { scrollHeight: r2, style: s } = t;
  requestAnimationFrame(() => {
    s.minHeight = "initial", s.height = r2 + "px", s.transition = `all ${e}ms`, requestAnimationFrame(() => {
      s.height = "0", s.padding = "0", s.margin = "0", setTimeout(o, e);
    });
  });
}
function $({ enter: t, exit: o, appendPosition: e = false, collapse: r2 = true, collapseDuration: s = 300 }) {
  return function({ children: a, position: d, preventExitTransition: c, done: T, nodeRef: g, isIn: v, playToast: x }) {
    let C = e ? `${t}--${d}` : t, S = e ? `${o}--${d}` : o, E = (0, import_react2.useRef)(0);
    return (0, import_react2.useLayoutEffect)(() => {
      let f = g.current, p = C.split(" "), b = (n) => {
        n.target === g.current && (x(), f.removeEventListener("animationend", b), f.removeEventListener("animationcancel", b), E.current === 0 && n.type !== "animationcancel" && f.classList.remove(...p));
      };
      (() => {
        f.classList.add(...p), f.addEventListener("animationend", b), f.addEventListener("animationcancel", b);
      })();
    }, []), (0, import_react2.useEffect)(() => {
      let f = g.current, p = () => {
        f.removeEventListener("animationend", p), r2 ? Z(f, T, s) : T();
      };
      v || (c ? p() : (() => {
        E.current = 1, f.className += ` ${S}`, f.addEventListener("animationend", p);
      })());
    }, [v]), import_react2.default.createElement(import_react2.default.Fragment, null, a);
  };
}
function J(t, o) {
  return { content: tt(t.content, t.props), containerId: t.props.containerId, id: t.props.toastId, theme: t.props.theme, type: t.props.type, data: t.props.data || {}, isLoading: t.props.isLoading, icon: t.props.icon, reason: t.removalReason, status: o };
}
function tt(t, o, e = false) {
  return (0, import_react3.isValidElement)(t) && !N(t.type) ? (0, import_react3.cloneElement)(t, { closeToast: o.closeToast, toastProps: o, data: o.data, isPaused: e }) : P(t) ? t({ closeToast: o.closeToast, toastProps: o, data: o.data, isPaused: e }) : t;
}
function yt({ closeToast: t, theme: o, ariaLabel: e = "close" }) {
  return import_react4.default.createElement("button", { className: `Toastify__close-button Toastify__close-button--${o}`, type: "button", onClick: (r2) => {
    r2.stopPropagation(), t(true);
  }, "aria-label": e }, import_react4.default.createElement("svg", { "aria-hidden": "true", viewBox: "0 0 14 16" }, import_react4.default.createElement("path", { fillRule: "evenodd", d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z" })));
}
function gt({ delay: t, isRunning: o, closeToast: e, type: r2 = "default", hide: s, className: l, controlledProgress: a, progress: d, rtl: c, isIn: T, theme: g }) {
  let v = s || a && d === 0, x = { animationDuration: `${t}ms`, animationPlayState: o ? "running" : "paused" };
  a && (x.transform = `scaleX(${d})`);
  let C = clsx_default("Toastify__progress-bar", a ? "Toastify__progress-bar--controlled" : "Toastify__progress-bar--animated", `Toastify__progress-bar-theme--${g}`, `Toastify__progress-bar--${r2}`, { ["Toastify__progress-bar--rtl"]: c }), S = P(l) ? l({ rtl: c, type: r2, defaultClassName: C }) : clsx_default(C, l), E = { [a && d >= 1 ? "onTransitionEnd" : "onAnimationEnd"]: a && d < 1 ? null : () => {
    T && e();
  } };
  return import_react5.default.createElement("div", { className: "Toastify__progress-bar--wrp", "data-hidden": v }, import_react5.default.createElement("div", { className: `Toastify__progress-bar--bg Toastify__progress-bar-theme--${g} Toastify__progress-bar--${r2}` }), import_react5.default.createElement("div", { role: "progressbar", "aria-hidden": v ? "true" : "false", "aria-label": "notification timer", className: S, style: x, ...E }));
}
var Xt = 1;
var at = () => `${Xt++}`;
function _t(t, o, e) {
  let r2 = 1, s = 0, l = [], a = [], d = o, c = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Set(), g = (i) => (T.add(i), () => T.delete(i)), v = () => {
    a = Array.from(c.values()), T.forEach((i) => i());
  }, x = ({ containerId: i, toastId: n, updateId: u }) => {
    let h = i ? i !== t : t !== 1, m = c.has(n) && u == null;
    return h || m;
  }, C = (i, n) => {
    c.forEach((u) => {
      var h;
      (n == null || n === u.props.toastId) && ((h = u.toggle) == null || h.call(u, i));
    });
  }, S = (i) => {
    var n, u;
    (u = (n = i.props) == null ? void 0 : n.onClose) == null || u.call(n, i.removalReason), i.isActive = false;
  }, E = (i) => {
    if (i == null)
      c.forEach(S);
    else {
      let n = c.get(i);
      n && S(n);
    }
    v();
  }, f = () => {
    s -= l.length, l = [];
  }, p = (i) => {
    var m, _;
    let { toastId: n, updateId: u } = i.props, h = u == null;
    i.staleId && c.delete(i.staleId), i.isActive = true, c.set(n, i), v(), e(J(i, h ? "added" : "updated")), h && ((_ = (m = i.props).onOpen) == null || _.call(m));
  };
  return { id: t, props: d, observe: g, toggle: C, removeToast: E, toasts: c, clearQueue: f, buildToast: (i, n) => {
    if (x(n))
      return;
    let { toastId: u, updateId: h, data: m, staleId: _, delay: k } = n, M = h == null;
    M && s++;
    let A = { ...d, style: d.toastStyle, key: r2++, ...Object.fromEntries(Object.entries(n).filter(([D, Y]) => Y != null)), toastId: u, updateId: h, data: m, isIn: false, className: B(n.className || d.toastClassName), progressClassName: B(n.progressClassName || d.progressClassName), autoClose: n.isLoading ? false : pt(n.autoClose, d.autoClose), closeToast(D) {
      c.get(u).removalReason = D, E(u);
    }, deleteToast() {
      let D = c.get(u);
      if (D != null) {
        if (e(J(D, "removed")), c.delete(u), s--, s < 0 && (s = 0), l.length > 0) {
          p(l.shift());
          return;
        }
        v();
      }
    } };
    A.closeButton = d.closeButton, n.closeButton === false || z(n.closeButton) ? A.closeButton = n.closeButton : n.closeButton === true && (A.closeButton = z(d.closeButton) ? d.closeButton : true);
    let R = { content: i, props: A, staleId: _ };
    d.limit && d.limit > 0 && s > d.limit && M ? l.push(R) : L(k) ? setTimeout(() => {
      p(R);
    }, k) : p(R);
  }, setProps(i) {
    d = i;
  }, setToggle: (i, n) => {
    let u = c.get(i);
    u && (u.toggle = n);
  }, isToastActive: (i) => {
    var n;
    return (n = c.get(i)) == null ? void 0 : n.isActive;
  }, getSnapshot: () => a };
}
var I = /* @__PURE__ */ new Map();
var F = [];
var st = /* @__PURE__ */ new Set();
var Vt = (t) => st.forEach((o) => o(t));
var bt = () => I.size > 0;
function Qt() {
  F.forEach((t) => nt(t.content, t.options)), F = [];
}
var vt = (t, { containerId: o }) => {
  var e;
  return (e = I.get(o || 1)) == null ? void 0 : e.toasts.get(t);
};
function X(t, o) {
  var r2;
  if (o)
    return !!((r2 = I.get(o)) != null && r2.isToastActive(t));
  let e = false;
  return I.forEach((s) => {
    s.isToastActive(t) && (e = true);
  }), e;
}
function ht(t) {
  if (!bt()) {
    F = F.filter((o) => t != null && o.options.toastId !== t);
    return;
  }
  if (t == null || mt(t))
    I.forEach((o) => {
      o.removeToast(t);
    });
  else if (t && ("containerId" in t || "id" in t)) {
    let o = I.get(t.containerId);
    o ? o.removeToast(t.id) : I.forEach((e) => {
      e.removeToast(t.id);
    });
  }
}
var Ct = (t = {}) => {
  I.forEach((o) => {
    o.props.limit && (!t.containerId || o.id === t.containerId) && o.clearQueue();
  });
};
function nt(t, o) {
  z(t) && (bt() || F.push({ content: t, options: o }), I.forEach((e) => {
    e.buildToast(t, o);
  }));
}
function xt(t) {
  var o;
  (o = I.get(t.containerId || 1)) == null || o.setToggle(t.id, t.fn);
}
function rt(t, o) {
  I.forEach((e) => {
    (o == null || !(o != null && o.containerId) || (o == null ? void 0 : o.containerId) === e.id) && e.toggle(t, o == null ? void 0 : o.id);
  });
}
function Et(t) {
  let o = t.containerId || 1;
  return { subscribe(e) {
    let r2 = _t(o, t, Vt);
    I.set(o, r2);
    let s = r2.observe(e);
    return Qt(), () => {
      s(), I.delete(o);
    };
  }, setProps(e) {
    var r2;
    (r2 = I.get(o)) == null || r2.setProps(e);
  }, getSnapshot() {
    var e;
    return (e = I.get(o)) == null ? void 0 : e.getSnapshot();
  } };
}
function Pt(t) {
  return st.add(t), () => {
    st.delete(t);
  };
}
function Wt(t) {
  return t && (N(t.toastId) || L(t.toastId)) ? t.toastId : at();
}
function U(t, o) {
  return nt(t, o), o.toastId;
}
function V(t, o) {
  return { ...o, type: o && o.type || t, toastId: Wt(o) };
}
function Q(t) {
  return (o, e) => U(o, V(t, e));
}
function y(t, o) {
  return U(t, V("default", o));
}
y.loading = (t, o) => U(t, V("default", { isLoading: true, autoClose: false, closeOnClick: false, closeButton: false, draggable: false, ...o }));
function Gt(t, { pending: o, error: e, success: r2 }, s) {
  let l;
  o && (l = N(o) ? y.loading(o, s) : y.loading(o.render, { ...s, ...o }));
  let a = { isLoading: null, autoClose: null, closeOnClick: null, closeButton: null, draggable: null }, d = (T, g, v) => {
    if (g == null) {
      y.dismiss(l);
      return;
    }
    let x = { type: T, ...a, ...s, data: v }, C = N(g) ? { render: g } : g;
    return l ? y.update(l, { ...x, ...C }) : y(C.render, { ...x, ...C }), v;
  }, c = P(t) ? t() : t;
  return c.then((T) => d("success", r2, T)).catch((T) => d("error", e, T)), c;
}
y.promise = Gt;
y.success = Q("success");
y.info = Q("info");
y.error = Q("error");
y.warning = Q("warning");
y.warn = y.warning;
y.dark = (t, o) => U(t, V("default", { theme: "dark", ...o }));
function qt(t) {
  ht(t);
}
y.dismiss = qt;
y.clearWaitingQueue = Ct;
y.isActive = X;
y.update = (t, o = {}) => {
  let e = vt(t, o);
  if (e) {
    let { props: r2, content: s } = e, l = { delay: 100, ...r2, ...o, toastId: o.toastId || t, updateId: at() };
    l.toastId !== t && (l.staleId = t);
    let a = l.render || s;
    delete l.render, U(a, l);
  }
};
y.done = (t) => {
  y.update(t, { progress: 1 });
};
y.onChange = Pt;
y.play = (t) => rt(true, t);
y.pause = (t) => rt(false, t);
function It(t) {
  var a;
  let { subscribe: o, getSnapshot: e, setProps: r2 } = (0, import_react7.useRef)(Et(t)).current;
  r2(t);
  let s = (a = (0, import_react7.useSyncExternalStore)(o, e, e)) == null ? void 0 : a.slice();
  function l(d) {
    if (!s)
      return [];
    let c = /* @__PURE__ */ new Map();
    return t.newestOnTop && s.reverse(), s.forEach((T) => {
      let { position: g } = T.props;
      c.has(g) || c.set(g, []), c.get(g).push(T);
    }), Array.from(c, (T) => d(T[0], T[1]));
  }
  return { getToastToRender: l, isToastActive: X, count: s == null ? void 0 : s.length };
}
function At(t) {
  let [o, e] = (0, import_react8.useState)(false), [r2, s] = (0, import_react8.useState)(false), l = (0, import_react8.useRef)(null), a = (0, import_react8.useRef)({ start: 0, delta: 0, removalDistance: 0, canCloseOnClick: true, canDrag: false, didMove: false }).current, { autoClose: d, pauseOnHover: c, closeToast: T, onClick: g, closeOnClick: v } = t;
  xt({ id: t.toastId, containerId: t.containerId, fn: e }), (0, import_react8.useEffect)(() => {
    if (t.pauseOnFocusLoss)
      return x(), () => {
        C();
      };
  }, [t.pauseOnFocusLoss]);
  function x() {
    document.hasFocus() || p(), window.addEventListener("focus", f), window.addEventListener("blur", p);
  }
  function C() {
    window.removeEventListener("focus", f), window.removeEventListener("blur", p);
  }
  function S(m) {
    if (t.draggable === true || t.draggable === m.pointerType) {
      b();
      let _ = l.current;
      a.canCloseOnClick = true, a.canDrag = true, _.style.transition = "none", t.draggableDirection === "x" ? (a.start = m.clientX, a.removalDistance = _.offsetWidth * (t.draggablePercent / 100)) : (a.start = m.clientY, a.removalDistance = _.offsetHeight * (t.draggablePercent === 80 ? t.draggablePercent * 1.5 : t.draggablePercent) / 100);
    }
  }
  function E(m) {
    let { top: _, bottom: k, left: M, right: A } = l.current.getBoundingClientRect();
    m.nativeEvent.type !== "touchend" && t.pauseOnHover && m.clientX >= M && m.clientX <= A && m.clientY >= _ && m.clientY <= k ? p() : f();
  }
  function f() {
    e(true);
  }
  function p() {
    e(false);
  }
  function b() {
    a.didMove = false, document.addEventListener("pointermove", n), document.addEventListener("pointerup", u);
  }
  function i() {
    document.removeEventListener("pointermove", n), document.removeEventListener("pointerup", u);
  }
  function n(m) {
    let _ = l.current;
    if (a.canDrag && _) {
      a.didMove = true, o && p(), t.draggableDirection === "x" ? a.delta = m.clientX - a.start : a.delta = m.clientY - a.start, a.start !== m.clientX && (a.canCloseOnClick = false);
      let k = t.draggableDirection === "x" ? `${a.delta}px, var(--y)` : `0, calc(${a.delta}px + var(--y))`;
      _.style.transform = `translate3d(${k},0)`, _.style.opacity = `${1 - Math.abs(a.delta / a.removalDistance)}`;
    }
  }
  function u() {
    i();
    let m = l.current;
    if (a.canDrag && a.didMove && m) {
      if (a.canDrag = false, Math.abs(a.delta) > a.removalDistance) {
        s(true), t.closeToast(true), t.collapseAll();
        return;
      }
      m.style.transition = "transform 0.2s, opacity 0.2s", m.style.removeProperty("transform"), m.style.removeProperty("opacity");
    }
  }
  let h = { onPointerDown: S, onPointerUp: E };
  return d && c && (h.onMouseEnter = p, t.stacked || (h.onMouseLeave = f)), v && (h.onClick = (m) => {
    g && g(m), a.canCloseOnClick && T(true);
  }), { playToast: f, pauseToast: p, isRunning: o, preventExitTransition: r2, toastRef: l, eventHandlers: h };
}
var Ot = typeof window != "undefined" ? import_react9.useLayoutEffect : import_react9.useEffect;
var G = ({ theme: t, type: o, isLoading: e, ...r2 }) => import_react11.default.createElement("svg", { viewBox: "0 0 24 24", width: "100%", height: "100%", fill: t === "colored" ? "currentColor" : `var(--toastify-icon-color-${o})`, ...r2 });
function ao(t) {
  return import_react11.default.createElement(G, { ...t }, import_react11.default.createElement("path", { d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z" }));
}
function so(t) {
  return import_react11.default.createElement(G, { ...t }, import_react11.default.createElement("path", { d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z" }));
}
function no(t) {
  return import_react11.default.createElement(G, { ...t }, import_react11.default.createElement("path", { d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z" }));
}
function ro(t) {
  return import_react11.default.createElement(G, { ...t }, import_react11.default.createElement("path", { d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z" }));
}
function io() {
  return import_react11.default.createElement("div", { className: "Toastify__spinner" });
}
var W = { info: so, warning: ao, success: no, error: ro, spinner: io };
var lo = (t) => t in W;
function Nt({ theme: t, type: o, isLoading: e, icon: r2 }) {
  let s = null, l = { theme: t, type: o };
  return r2 === false || (P(r2) ? s = r2({ ...l, isLoading: e }) : (0, import_react11.isValidElement)(r2) ? s = (0, import_react11.cloneElement)(r2, l) : e ? s = W.spinner() : lo(o) && (s = W[o](l))), s;
}
var wt = (t) => {
  let { isRunning: o, preventExitTransition: e, toastRef: r2, eventHandlers: s, playToast: l } = At(t), { closeButton: a, children: d, autoClose: c, onClick: T, type: g, hideProgressBar: v, closeToast: x, transition: C, position: S, className: E, style: f, progressClassName: p, updateId: b, role: i, progress: n, rtl: u, toastId: h, deleteToast: m, isIn: _, isLoading: k, closeOnClick: M, theme: A, ariaLabel: R } = t, D = clsx_default("Toastify__toast", `Toastify__toast-theme--${A}`, `Toastify__toast--${g}`, { ["Toastify__toast--rtl"]: u }, { ["Toastify__toast--close-on-click"]: M }), Y = P(E) ? E({ rtl: u, position: S, type: g, defaultClassName: D }) : clsx_default(D, E), ft = Nt(t), dt = !!n || !c, j = { closeToast: x, type: g, theme: A }, H = null;
  return a === false || (P(a) ? H = a(j) : (0, import_react10.isValidElement)(a) ? H = (0, import_react10.cloneElement)(a, j) : H = yt(j)), import_react10.default.createElement(C, { isIn: _, done: m, position: S, preventExitTransition: e, nodeRef: r2, playToast: l }, import_react10.default.createElement("div", { id: h, tabIndex: 0, onClick: T, "data-in": _, className: Y, ...s, style: f, ref: r2, ..._ && { role: i, "aria-label": R } }, ft != null && import_react10.default.createElement("div", { className: clsx_default("Toastify__toast-icon", { ["Toastify--animate-icon Toastify__zoom-enter"]: !k }) }, ft), tt(d, t, !o), H, !t.customProgressBar && import_react10.default.createElement(gt, { ...b && !dt ? { key: `p-${b}` } : {}, rtl: u, theme: A, delay: c, isRunning: o, isIn: _, closeToast: x, hide: v, type: g, className: p, controlledProgress: dt, progress: n || 0 })));
};
var K = (t, o = false) => ({ enter: `Toastify--animate Toastify__${t}-enter`, exit: `Toastify--animate Toastify__${t}-exit`, appendPosition: o });
var lt = $(K("bounce", true));
var mo = $(K("slide", true));
var po = $(K("zoom"));
var uo = $(K("flip"));
var _o = { position: "top-right", transition: lt, autoClose: 5e3, closeButton: true, pauseOnHover: true, pauseOnFocusLoss: true, draggable: "touch", draggablePercent: 80, draggableDirection: "x", role: "alert", theme: "light", "aria-label": "Notifications Alt+T", hotKeys: (t) => t.altKey && t.code === "KeyT" };
function Lt(t) {
  let o = { ..._o, ...t }, e = t.stacked, [r2, s] = (0, import_react6.useState)(true), l = (0, import_react6.useRef)(null), { getToastToRender: a, isToastActive: d, count: c } = It(o), { className: T, style: g, rtl: v, containerId: x, hotKeys: C } = o;
  function S(f) {
    let p = clsx_default("Toastify__toast-container", `Toastify__toast-container--${f}`, { ["Toastify__toast-container--rtl"]: v });
    return P(T) ? T({ position: f, rtl: v, defaultClassName: p }) : clsx_default(p, B(T));
  }
  function E() {
    e && (s(true), y.play());
  }
  return Ot(() => {
    var f;
    if (e) {
      let p = l.current.querySelectorAll('[data-in="true"]'), b = 12, i = (f = o.position) == null ? void 0 : f.includes("top"), n = 0, u = 0;
      Array.from(p).reverse().forEach((h, m) => {
        let _ = h;
        _.classList.add("Toastify__toast--stacked"), m > 0 && (_.dataset.collapsed = `${r2}`), _.dataset.pos || (_.dataset.pos = i ? "top" : "bot");
        let k = n * (r2 ? 0.2 : 1) + (r2 ? 0 : b * m);
        _.style.setProperty("--y", `${i ? k : k * -1}px`), _.style.setProperty("--g", `${b}`), _.style.setProperty("--s", `${1 - (r2 ? u : 0)}`), n += _.offsetHeight, u += 0.025;
      });
    }
  }, [r2, c, e]), (0, import_react6.useEffect)(() => {
    function f(p) {
      var i;
      let b = l.current;
      C(p) && ((i = b.querySelector('[tabIndex="0"]')) == null || i.focus(), s(false), y.pause()), p.key === "Escape" && (document.activeElement === b || b != null && b.contains(document.activeElement)) && (s(true), y.play());
    }
    return document.addEventListener("keydown", f), () => {
      document.removeEventListener("keydown", f);
    };
  }, [C]), import_react6.default.createElement("section", { ref: l, className: "Toastify", id: x, onMouseEnter: () => {
    e && (s(false), y.pause());
  }, onMouseLeave: E, "aria-live": "polite", "aria-atomic": "false", "aria-relevant": "additions text", "aria-label": o["aria-label"] }, a((f, p) => {
    let b = p.length ? { ...g } : { ...g, pointerEvents: "none" };
    return import_react6.default.createElement("div", { tabIndex: -1, className: S(f), "data-stacked": e, style: b, key: `c-${f}` }, p.map(({ content: i, props: n }) => import_react6.default.createElement(wt, { ...n, stacked: e, collapseAll: E, isIn: d(n.toastId, n.containerId), key: `t-${n.key}` }, i)));
  }));
}
export {
  lt as Bounce,
  uo as Flip,
  W as Icons,
  mo as Slide,
  Lt as ToastContainer,
  po as Zoom,
  Z as collapseToast,
  $ as cssTransition,
  y as toast
};
//# sourceMappingURL=react-toastify.js.map
