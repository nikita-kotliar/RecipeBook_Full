import {
  require_react
} from "./chunk-TWJRYSII.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@reactour/tour/dist/index.mjs
var import_react7 = __toESM(require_react(), 1);

// node_modules/@reactour/utils/dist/index.mjs
var import_react2 = __toESM(require_react(), 1);

// node_modules/@rooks/use-mutation-observer/lib/index.esm.js
var import_react = __toESM(require_react());
var config = {
  attributes: true,
  characterData: true,
  subtree: true,
  childList: true
};
function useMutationObserver(ref, callback, options = config) {
  (0, import_react.useEffect)(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => {
        observer.disconnect();
      };
    }
  }, [callback, options]);
}
var index_esm_default = useMutationObserver;

// node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
var MapShim = function() {
  if (typeof Map !== "undefined") {
    return Map;
  }
  function getIndex(arr, key) {
    var result = -1;
    arr.some(function(entry, index2) {
      if (entry[0] === key) {
        result = index2;
        return true;
      }
      return false;
    });
    return result;
  }
  return (
    /** @class */
    function() {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      class_1.prototype.get = function(key) {
        var index2 = getIndex(this.__entries__, key);
        var entry = this.__entries__[index2];
        return entry && entry[1];
      };
      class_1.prototype.set = function(key, value) {
        var index2 = getIndex(this.__entries__, key);
        if (~index2) {
          this.__entries__[index2][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      class_1.prototype.delete = function(key) {
        var entries = this.__entries__;
        var index2 = getIndex(entries, key);
        if (~index2) {
          entries.splice(index2, 1);
        }
      };
      class_1.prototype.has = function(key) {
        return !!~getIndex(this.__entries__, key);
      };
      class_1.prototype.clear = function() {
        this.__entries__.splice(0);
      };
      class_1.prototype.forEach = function(callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };
      return class_1;
    }()
  );
}();
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
var global$1 = function() {
  if (typeof global !== "undefined" && global.Math === Math) {
    return global;
  }
  if (typeof self !== "undefined" && self.Math === Math) {
    return self;
  }
  if (typeof window !== "undefined" && window.Math === Math) {
    return window;
  }
  return Function("return this")();
}();
var requestAnimationFrame$1 = function() {
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame.bind(global$1);
  }
  return function(callback) {
    return setTimeout(function() {
      return callback(Date.now());
    }, 1e3 / 60);
  };
}();
var trailingTimeout = 2;
function throttle(callback, delay) {
  var leadingCall = false, trailingCall = false, lastCallTime = 0;
  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }
    if (trailingCall) {
      proxy();
    }
  }
  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  function proxy() {
    var timeStamp = Date.now();
    if (leadingCall) {
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      }
      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }
    lastCallTime = timeStamp;
  }
  return proxy;
}
var REFRESH_DELAY = 20;
var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
var mutationObserverSupported = typeof MutationObserver !== "undefined";
var ResizeObserverController = (
  /** @class */
  function() {
    function ResizeObserverController2() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController2.prototype.addObserver = function(observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      if (!this.connected_) {
        this.connect_();
      }
    };
    ResizeObserverController2.prototype.removeObserver = function(observer) {
      var observers2 = this.observers_;
      var index2 = observers2.indexOf(observer);
      if (~index2) {
        observers2.splice(index2, 1);
      }
      if (!observers2.length && this.connected_) {
        this.disconnect_();
      }
    };
    ResizeObserverController2.prototype.refresh = function() {
      var changesDetected = this.updateObservers_();
      if (changesDetected) {
        this.refresh();
      }
    };
    ResizeObserverController2.prototype.updateObservers_ = function() {
      var activeObservers = this.observers_.filter(function(observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      activeObservers.forEach(function(observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    ResizeObserverController2.prototype.connect_ = function() {
      if (!isBrowser || this.connected_) {
        return;
      }
      document.addEventListener("transitionend", this.onTransitionEnd_);
      window.addEventListener("resize", this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      } else {
        document.addEventListener("DOMSubtreeModified", this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    ResizeObserverController2.prototype.disconnect_ = function() {
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener("transitionend", this.onTransitionEnd_);
      window.removeEventListener("resize", this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener("DOMSubtreeModified", this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    ResizeObserverController2.prototype.onTransitionEnd_ = function(_a) {
      var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
      var isReflowProperty = transitionKeys.some(function(key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    ResizeObserverController2.getInstance = function() {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController2();
      }
      return this.instance_;
    };
    ResizeObserverController2.instance_ = null;
    return ResizeObserverController2;
  }()
);
var defineConfigurable = function(target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key = _a[_i];
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true
    });
  }
  return target;
};
var getWindowOf = function(target) {
  var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
  return ownerGlobal || global$1;
};
var emptyRect = createRectInit(0, 0, 0, 0);
function toFloat(value) {
  return parseFloat(value) || 0;
}
function getBordersSize(styles) {
  var positions = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }
  return positions.reduce(function(size, position) {
    var value = styles["border-" + position + "-width"];
    return size + toFloat(value);
  }, 0);
}
function getPaddings(styles) {
  var positions = ["top", "right", "bottom", "left"];
  var paddings = {};
  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i];
    var value = styles["padding-" + position];
    paddings[position] = toFloat(value);
  }
  return paddings;
}
function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
function getHTMLElementContentRect(target) {
  var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }
  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom;
  var width = toFloat(styles.width), height = toFloat(styles.height);
  if (styles.boxSizing === "border-box") {
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, "left", "right") + horizPad;
    }
    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, "top", "bottom") + vertPad;
    }
  }
  if (!isDocumentElement(target)) {
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight;
    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }
    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }
  return createRectInit(paddings.left, paddings.top, width, height);
}
var isSVGGraphicsElement = function() {
  if (typeof SVGGraphicsElement !== "undefined") {
    return function(target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  }
  return function(target) {
    return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
  };
}();
function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }
  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }
  return getHTMLElementContentRect(target);
}
function createReadOnlyRect(_a) {
  var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
  var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype);
  defineConfigurable(rect, {
    x,
    y,
    width,
    height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x
  });
  return rect;
}
function createRectInit(x, y, width, height) {
  return { x, y, width, height };
}
var ResizeObservation = (
  /** @class */
  function() {
    function ResizeObservation2(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    ResizeObservation2.prototype.isActive = function() {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };
    ResizeObservation2.prototype.broadcastRect = function() {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation2;
  }()
);
var ResizeObserverEntry = (
  /** @class */
  /* @__PURE__ */ function() {
    function ResizeObserverEntry2(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      defineConfigurable(this, { target, contentRect });
    }
    return ResizeObserverEntry2;
  }()
);
var ResizeObserverSPI = (
  /** @class */
  function() {
    function ResizeObserverSPI2(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI2.prototype.observe = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      this.controller_.refresh();
    };
    ResizeObserverSPI2.prototype.unobserve = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    ResizeObserverSPI2.prototype.disconnect = function() {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    ResizeObserverSPI2.prototype.gatherActive = function() {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function(observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    ResizeObserverSPI2.prototype.broadcastActive = function() {
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      var entries = this.activeObservations_.map(function(observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    ResizeObserverSPI2.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    };
    ResizeObserverSPI2.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI2;
  }()
);
var observers = typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : new MapShim();
var ResizeObserver = (
  /** @class */
  /* @__PURE__ */ function() {
    function ResizeObserver2(callback) {
      if (!(this instanceof ResizeObserver2)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver2;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(method) {
  ResizeObserver.prototype[method] = function() {
    var _a;
    return (_a = observers.get(this))[method].apply(_a, arguments);
  };
});
var index = function() {
  if (typeof global$1.ResizeObserver !== "undefined") {
    return global$1.ResizeObserver;
  }
  return ResizeObserver;
}();
var ResizeObserver_es_default = index;

// node_modules/@reactour/utils/dist/index.mjs
var import_react3 = __toESM(require_react(), 1);
var import_react4 = __toESM(require_react(), 1);
var Observables = ({
  mutationObservables,
  resizeObservables,
  refresh
}) => {
  const [mutationsCounter, setMutationsCounter] = (0, import_react2.useState)(0);
  const ref = (0, import_react2.useRef)(document.documentElement || document.body);
  function refreshHighlightedRegionIfObservable(nodes) {
    const posibleNodes = Array.from(nodes);
    for (const node of posibleNodes) {
      if (mutationObservables) {
        if (!node.attributes) {
          continue;
        }
        const found = mutationObservables.find(
          (observable) => node.matches(observable)
        );
        if (found) {
          refresh(true);
        }
      }
    }
  }
  function incrementMutationsCounterIfObservable(nodes) {
    const posibleNodes = Array.from(nodes);
    for (const node of posibleNodes) {
      if (resizeObservables) {
        if (!node.attributes) {
          continue;
        }
        const found = resizeObservables.find(
          (observable) => node.matches(observable)
        );
        if (found) setMutationsCounter(mutationsCounter + 1);
      }
    }
  }
  index_esm_default(
    ref,
    (mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.addedNodes.length !== 0) {
          refreshHighlightedRegionIfObservable(mutation.addedNodes);
          incrementMutationsCounterIfObservable(mutation.addedNodes);
        }
        if (mutation.removedNodes.length !== 0) {
          refreshHighlightedRegionIfObservable(mutation.removedNodes);
          incrementMutationsCounterIfObservable(mutation.removedNodes);
        }
      }
    },
    { childList: true, subtree: true }
  );
  (0, import_react2.useEffect)(() => {
    if (!resizeObservables) {
      return;
    }
    const resizeObserver = new ResizeObserver_es_default(() => {
      refresh();
    });
    for (const observable of resizeObservables) {
      const element = document.querySelector(observable);
      if (element) {
        resizeObserver.observe(element);
      }
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [resizeObservables, mutationsCounter]);
  return null;
};
var Observables_default = Observables;
function getRect(element) {
  let rect = initialState;
  if (element) {
    const domRect = element.getBoundingClientRect();
    rect = domRect;
  }
  return rect;
}
function useRect(ref, refresher) {
  const [dimensions, setDimensions] = (0, import_react3.useState)(initialState);
  const handleResize = (0, import_react3.useCallback)(() => {
    if (!(ref == null ? void 0 : ref.current)) return;
    setDimensions(getRect(ref == null ? void 0 : ref.current));
  }, [ref == null ? void 0 : ref.current]);
  (0, import_react3.useEffect)(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref == null ? void 0 : ref.current, refresher]);
  return dimensions;
}
var initialState = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0
};
function smoothScroll(elem, options) {
  return new Promise((resolve) => {
    if (!(elem instanceof Element)) {
      throw new TypeError("Argument 1 must be an Element");
    }
    let same = 0;
    let lastPos = null;
    const scrollOptions = Object.assign({ behavior: "smooth" }, options);
    elem.scrollIntoView(scrollOptions);
    requestAnimationFrame(check);
    function check() {
      const newPos = elem == null ? void 0 : elem.getBoundingClientRect().top;
      if (newPos === lastPos) {
        if (same++ > 2) {
          return resolve(null);
        }
      } else {
        same = 0;
        lastPos = newPos;
      }
      requestAnimationFrame(check);
    }
  });
}
function safe(sum) {
  return sum < 0 ? 0 : sum;
}
function getInViewThreshold(threshold) {
  if (typeof threshold === "object" && threshold !== null) {
    return {
      thresholdX: threshold.x || 0,
      thresholdY: threshold.y || 0
    };
  }
  return {
    thresholdX: threshold || 0,
    thresholdY: threshold || 0
  };
}
function getWindow() {
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  const h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return { w, h };
}
function inView({
  top,
  right,
  bottom,
  left,
  threshold
}) {
  const { w: windowWidth, h: windowHeight } = getWindow();
  const { thresholdX, thresholdY } = getInViewThreshold(threshold);
  return top < 0 && bottom - top > windowHeight ? true : top >= 0 + thresholdY && left >= 0 + thresholdX && bottom <= windowHeight - thresholdY && right <= windowWidth - thresholdX;
}
var isOutsideX = (val, windowWidth) => {
  return val > windowWidth;
};
var isOutsideY = (val, windowHeight) => {
  return val > windowHeight;
};
function bestPositionOf(positions, filters = []) {
  const compareFn = (a, b) => filters.includes(a) ? 1 : filters.includes(b) ? -1 : 0;
  return Object.keys(positions).map((p) => {
    return {
      position: p,
      value: positions[p]
    };
  }).sort((a, b) => b.value - a.value).sort((a, b) => compareFn(a.position, b.position)).filter((p) => p.value > 0).map((p) => p.position);
}
var defaultPadding = 10;
function getPadding(padding = defaultPadding) {
  if (Array.isArray(padding)) {
    if (padding.length === 1) {
      return [padding[0], padding[0], padding[0], padding[0]];
    }
    if (padding.length === 2) {
      return [padding[1], padding[0], padding[1], padding[0]];
    }
    if (padding.length === 3) {
      return [padding[0], padding[1], padding[2], padding[1]];
    }
    if (padding.length > 3) {
      return [padding[0], padding[1], padding[2], padding[3]];
    }
    return [defaultPadding, defaultPadding];
  }
  return [padding, padding, padding, padding];
}

// node_modules/@reactour/mask/dist/index.mjs
var import_react5 = __toESM(require_react(), 1);
var defaultStyles = {
  maskWrapper: () => ({
    opacity: 0.7,
    left: 0,
    top: 0,
    position: "fixed",
    zIndex: 99999,
    pointerEvents: "none",
    color: "#000"
  }),
  svgWrapper: ({ windowWidth, windowHeight, wpt, wpl }) => ({
    width: windowWidth,
    height: windowHeight,
    left: Number(wpl),
    top: Number(wpt),
    position: "fixed"
  }),
  maskArea: ({ x, y, width, height }) => ({
    x,
    y,
    width,
    height,
    fill: "black",
    rx: 0
  }),
  maskRect: ({ windowWidth, windowHeight, maskID }) => ({
    x: 0,
    y: 0,
    width: windowWidth,
    height: windowHeight,
    fill: "currentColor",
    mask: `url(#${maskID})`
  }),
  clickArea: ({ windowWidth, windowHeight, clipID }) => ({
    x: 0,
    y: 0,
    width: windowWidth,
    height: windowHeight,
    fill: "currentcolor",
    pointerEvents: "auto",
    clipPath: `url(#${clipID})`
  }),
  highlightedArea: ({ x, y, width, height }) => ({
    x,
    y,
    width,
    height,
    pointerEvents: "auto",
    fill: "transparent",
    display: "none"
  })
};
function stylesMatcher(styles) {
  return (key, state) => {
    const base = defaultStyles[key](state);
    const custom = styles[key];
    return custom ? custom(base, state) : base;
  };
}
var Mask = ({
  padding = 10,
  wrapperPadding = 0,
  onClick,
  onClickHighlighted,
  styles = {},
  sizes,
  className,
  highlightedAreaClassName,
  maskId,
  clipId
}) => {
  const maskID = maskId || uniqueId("mask__");
  const clipID = clipId || uniqueId("clip__");
  const getStyles = stylesMatcher(styles);
  const [pt, pr, pb, pl] = getPadding(padding);
  const [wpt, wpr, wpb, wpl] = getPadding(wrapperPadding);
  const { w, h } = getWindow();
  const width = safe((sizes == null ? void 0 : sizes.width) + pl + pr);
  const height = safe((sizes == null ? void 0 : sizes.height) + pt + pb);
  const top = safe((sizes == null ? void 0 : sizes.top) - pt - wpt);
  const left = safe((sizes == null ? void 0 : sizes.left) - pl - wpl);
  const windowWidth = w - wpl - wpr;
  const windowHeight = h - wpt - wpb;
  const maskAreaStyles = getStyles("maskArea", {
    x: left,
    y: top,
    width,
    height
  });
  const highlightedAreaStyles = getStyles("highlightedArea", {
    x: left,
    y: top,
    width,
    height
  });
  return import_react5.default.createElement(
    "div",
    {
      style: getStyles("maskWrapper", {}),
      onClick,
      className
    },
    import_react5.default.createElement(
      "svg",
      {
        width: windowWidth,
        height: windowHeight,
        xmlns: "http://www.w3.org/2000/svg",
        style: getStyles("svgWrapper", {
          windowWidth,
          windowHeight,
          wpt,
          wpl
        })
      },
      import_react5.default.createElement("defs", null, import_react5.default.createElement("mask", { id: maskID }, import_react5.default.createElement(
        "rect",
        {
          x: 0,
          y: 0,
          width: windowWidth,
          height: windowHeight,
          fill: "white"
        }
      ), import_react5.default.createElement(
        "rect",
        {
          style: maskAreaStyles,
          rx: maskAreaStyles.rx ? 1 : void 0
        }
      )), import_react5.default.createElement("clipPath", { id: clipID }, import_react5.default.createElement(
        "polygon",
        {
          points: `0 0, 0 ${windowHeight}, ${left} ${windowHeight}, ${left} ${top}, ${left + width} ${top}, ${left + width} ${top + height}, ${left} ${top + height}, ${left} ${windowHeight}, ${windowWidth} ${windowHeight}, ${windowWidth} 0`
        }
      ))),
      import_react5.default.createElement(
        "rect",
        {
          style: getStyles("maskRect", {
            windowWidth,
            windowHeight,
            maskID
          })
        }
      ),
      import_react5.default.createElement(
        "rect",
        {
          style: getStyles("clickArea", {
            windowWidth,
            windowHeight,
            top,
            left,
            width,
            height,
            clipID
          })
        }
      ),
      import_react5.default.createElement(
        "rect",
        {
          style: highlightedAreaStyles,
          className: highlightedAreaClassName,
          onClick: onClickHighlighted,
          rx: highlightedAreaStyles.rx ? 1 : void 0
        }
      )
    )
  );
};
var Mask_default = Mask;
function uniqueId(prefix) {
  return prefix + Math.random().toString(36).substring(2, 16);
}

// node_modules/@reactour/popover/dist/index.mjs
var import_react6 = __toESM(require_react(), 1);
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var defaultStyles2 = {
  popover: () => ({
    position: "fixed",
    maxWidth: 353,
    backgroundColor: "#fff",
    padding: "24px 30px",
    boxShadow: "0 0.5em 3em rgba(0, 0, 0, 0.3)",
    color: "inherit",
    zIndex: 1e5,
    transition: "transform 0.3s",
    top: 0,
    left: 0
  })
};
function stylesMatcher2(styles) {
  return (key, state) => {
    const base = defaultStyles2[key](state);
    const custom = styles[key];
    return custom ? custom(base, state) : base;
  };
}
var Popover = (_a) => {
  var _b = _a, {
    children,
    position: providedPosition = "bottom",
    padding = 10,
    styles = {},
    sizes,
    refresher
  } = _b, props = __objRest(_b, [
    "children",
    "position",
    "padding",
    "styles",
    "sizes",
    "refresher"
  ]);
  const helperRef = (0, import_react6.useRef)(null);
  const positionRef = (0, import_react6.useRef)("");
  const verticalAlignRef = (0, import_react6.useRef)("");
  const horizontalAlignRef = (0, import_react6.useRef)("");
  const { w: windowWidth, h: windowHeight } = getWindow();
  const getStyles = stylesMatcher2(styles);
  const helperRect = useRect(helperRef, refresher);
  const { width: helperWidth, height: helperHeight } = helperRect;
  const [pt, pr, pb, pl] = getPadding(padding);
  const targetLeft = (sizes == null ? void 0 : sizes.left) - pl;
  const targetTop = (sizes == null ? void 0 : sizes.top) - pt;
  const targetRight = (sizes == null ? void 0 : sizes.right) + pr;
  const targetBottom = (sizes == null ? void 0 : sizes.bottom) + pb;
  const position = providedPosition && typeof providedPosition === "function" ? providedPosition(
    {
      width: helperWidth,
      height: helperHeight,
      windowWidth,
      windowHeight,
      top: targetTop,
      left: targetLeft,
      right: targetRight,
      bottom: targetBottom,
      x: sizes.x,
      y: sizes.y
    },
    helperRect
  ) : providedPosition;
  const available = {
    left: targetLeft,
    right: windowWidth - targetRight,
    top: targetTop,
    bottom: windowHeight - targetBottom
  };
  const couldPositionAt = (position2, isOutsideX2, isOutsideY2) => {
    switch (position2) {
      case "top":
        return available.top > helperHeight + pb;
      case "right":
        return isOutsideX2 ? false : available.right > helperWidth + pl;
      case "bottom":
        return isOutsideY2 ? false : available.bottom > helperHeight + pt;
      case "left":
        return available.left > helperWidth + pr;
      default:
        return false;
    }
  };
  const autoPosition = (coords, outX, outY) => {
    const positionsOrder = bestPositionOf(
      available,
      outY ? ["right", "left"] : outX ? ["top", "bottom"] : []
    );
    for (let j = 0; j < positionsOrder.length; j++) {
      if (couldPositionAt(positionsOrder[j], outX, outY)) {
        positionRef.current = positionsOrder[j];
        return coords[positionsOrder[j]];
      }
    }
    positionRef.current = "center";
    return coords.center;
  };
  const pos = (helperPosition) => {
    if (Array.isArray(helperPosition)) {
      const isOutX = isOutsideX(helperPosition[0], windowWidth);
      const isOutY = isOutsideY(helperPosition[1], windowHeight);
      positionRef.current = "custom";
      return [
        isOutX ? windowWidth / 2 - helperWidth / 2 : helperPosition[0],
        isOutY ? windowHeight / 2 - helperHeight / 2 : helperPosition[1]
      ];
    }
    const isHelperOutsideX = isOutsideX(targetLeft + helperWidth, windowWidth);
    const isHelperOutsideY = isOutsideY(
      targetBottom + helperHeight,
      windowHeight
    );
    const x = isHelperOutsideX ? Math.min(targetLeft, windowWidth - helperWidth) : Math.max(targetLeft, 0);
    const y = isHelperOutsideY ? helperHeight > available.bottom ? Math.max(targetBottom - helperHeight, 0) : Math.max(targetTop, 0) : targetTop;
    if (isHelperOutsideY) {
      if (helperHeight > available.bottom) {
        verticalAlignRef.current = "bottom";
      } else {
        verticalAlignRef.current = "top";
      }
    } else {
      verticalAlignRef.current = "top";
    }
    if (isHelperOutsideX) {
      horizontalAlignRef.current = "left";
    } else {
      horizontalAlignRef.current = "right";
    }
    const coords = {
      top: [x - pl, targetTop - helperHeight - pb],
      right: [targetRight + pl, y - pt],
      bottom: [x - pl, targetBottom + pt],
      left: [targetLeft - helperWidth - pr, y - pt],
      center: [
        windowWidth / 2 - helperWidth / 2,
        windowHeight / 2 - helperHeight / 2
      ]
    };
    if (helperPosition === "center" || couldPositionAt(helperPosition, isHelperOutsideX, isHelperOutsideY) && !isHelperOutsideX && !isHelperOutsideY) {
      positionRef.current = helperPosition;
      return coords[helperPosition];
    }
    return autoPosition(coords, isHelperOutsideX, isHelperOutsideY);
  };
  const p = pos(position);
  return import_react6.default.createElement(
    "div",
    __spreadValues({
      className: "reactour__popover",
      style: __spreadValues({
        transform: `translate(${Math.round(p[0])}px, ${Math.round(p[1])}px)`
      }, getStyles("popover", {
        position: positionRef.current,
        verticalAlign: verticalAlignRef.current,
        horizontalAlign: horizontalAlignRef.current,
        helperRect,
        targetRect: sizes
      })),
      ref: helperRef
    }, props),
    children
  );
};
var Popover_default = Popover;

// node_modules/@reactour/tour/dist/index.mjs
var import_react8 = __toESM(require_react(), 1);
var import_react9 = __toESM(require_react(), 1);
var import_react10 = __toESM(require_react(), 1);
var import_react11 = __toESM(require_react(), 1);
var import_react12 = __toESM(require_react(), 1);
var import_react13 = __toESM(require_react(), 1);
var import_react14 = __toESM(require_react(), 1);
var import_react15 = __toESM(require_react(), 1);
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var initialState2 = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  windowWidth: 0,
  windowHeight: 0,
  x: 0,
  y: 0
};
function useSizes(step, scrollOptions = {
  block: "center",
  behavior: "smooth",
  inViewThreshold: 0
}) {
  const [transition, setTransition] = (0, import_react8.useState)(false);
  const [observing, setObserving] = (0, import_react8.useState)(false);
  const [isHighlightingObserved, setIsHighlightingObserved] = (0, import_react8.useState)(false);
  const [refresher, setRefresher] = (0, import_react8.useState)(null);
  const [dimensions, setDimensions] = (0, import_react8.useState)(initialState2);
  const target = (step == null ? void 0 : step.selector) instanceof Element ? step == null ? void 0 : step.selector : document.querySelector(step == null ? void 0 : step.selector);
  const handleResize = (0, import_react8.useCallback)(() => {
    const _a = getHighlightedRect(
      target,
      step == null ? void 0 : step.highlightedSelectors,
      step == null ? void 0 : step.bypassElem
    ), { hasHighligtedElems } = _a, newDimensions = __objRest2(_a, ["hasHighligtedElems"]);
    if (Object.entries(dimensions).some(
      ([key, value]) => newDimensions[key] !== value
    )) {
      setDimensions(newDimensions);
    }
  }, [target, step == null ? void 0 : step.highlightedSelectors, dimensions]);
  (0, import_react8.useEffect)(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [target, step == null ? void 0 : step.highlightedSelectors, refresher]);
  (0, import_react8.useEffect)(() => {
    const isInView = inView(__spreadProps(__spreadValues2({}, dimensions), {
      threshold: scrollOptions.inViewThreshold
    }));
    if (!isInView && target) {
      setTransition(true);
      smoothScroll(target, scrollOptions).then(() => {
        if (!observing) setRefresher(Date.now());
      }).finally(() => {
        setTransition(false);
      });
    }
  }, [dimensions]);
  const observableRefresher = (0, import_react8.useCallback)(() => {
    setObserving(true);
    const _a = getHighlightedRect(
      target,
      step == null ? void 0 : step.highlightedSelectors,
      step == null ? void 0 : step.bypassElem
    ), { hasHighligtedElems } = _a, dimesions = __objRest2(_a, ["hasHighligtedElems"]);
    setIsHighlightingObserved(hasHighligtedElems);
    setDimensions(dimesions);
    setObserving(false);
  }, [target, step == null ? void 0 : step.highlightedSelectors, dimensions]);
  return {
    sizes: dimensions,
    transition,
    target,
    observableRefresher,
    isHighlightingObserved
  };
}
function getHighlightedRect(node, highlightedSelectors = [], bypassElem = true) {
  let hasHighligtedElems = false;
  const { w: windowWidth, h: windowHeight } = getWindow();
  if (!highlightedSelectors) {
    return __spreadProps(__spreadValues2({}, getRect(node)), {
      windowWidth,
      windowHeight,
      hasHighligtedElems: false
    });
  }
  let attrs = getRect(node);
  let altAttrs = {
    bottom: 0,
    height: 0,
    left: windowWidth,
    right: 0,
    top: windowHeight,
    width: 0
  };
  for (const selector of highlightedSelectors) {
    const element = document.querySelector(selector);
    if (!element || element.style.display === "none" || element.style.visibility === "hidden") {
      continue;
    }
    const rect = getRect(element);
    hasHighligtedElems = true;
    if (bypassElem || !node) {
      if (rect.top < altAttrs.top) {
        altAttrs.top = rect.top;
      }
      if (rect.right > altAttrs.right) {
        altAttrs.right = rect.right;
      }
      if (rect.bottom > altAttrs.bottom) {
        altAttrs.bottom = rect.bottom;
      }
      if (rect.left < altAttrs.left) {
        altAttrs.left = rect.left;
      }
      altAttrs.width = altAttrs.right - altAttrs.left;
      altAttrs.height = altAttrs.bottom - altAttrs.top;
    } else {
      if (rect.top < attrs.top) {
        attrs.top = rect.top;
      }
      if (rect.right > attrs.right) {
        attrs.right = rect.right;
      }
      if (rect.bottom > attrs.bottom) {
        attrs.bottom = rect.bottom;
      }
      if (rect.left < attrs.left) {
        attrs.left = rect.left;
      }
      attrs.width = attrs.right - attrs.left;
      attrs.height = attrs.bottom - attrs.top;
    }
  }
  const bypassable = bypassElem || !node ? altAttrs.width > 0 && altAttrs.height > 0 : false;
  return {
    left: (bypassable ? altAttrs : attrs).left,
    top: (bypassable ? altAttrs : attrs).top,
    right: (bypassable ? altAttrs : attrs).right,
    bottom: (bypassable ? altAttrs : attrs).bottom,
    width: (bypassable ? altAttrs : attrs).width,
    height: (bypassable ? altAttrs : attrs).height,
    windowWidth,
    windowHeight,
    hasHighligtedElems,
    x: attrs.x,
    y: attrs.y
  };
}
var Keyboard = ({
  disableKeyboardNavigation,
  setCurrentStep,
  currentStep,
  setIsOpen,
  stepsLength,
  disable,
  rtl,
  clickProps,
  keyboardHandler
}) => {
  function keyDownHandler(e) {
    e.stopPropagation();
    if (disableKeyboardNavigation === true || disable) {
      return;
    }
    let isEscDisabled, isRightDisabled, isLeftDisabled;
    if (disableKeyboardNavigation) {
      isEscDisabled = disableKeyboardNavigation.includes("esc");
      isRightDisabled = disableKeyboardNavigation.includes("right");
      isLeftDisabled = disableKeyboardNavigation.includes("left");
    }
    function next() {
      setCurrentStep(Math.min(currentStep + 1, stepsLength - 1));
    }
    function prev() {
      setCurrentStep(Math.max(currentStep - 1, 0));
    }
    if (keyboardHandler && typeof keyboardHandler === "function") {
      keyboardHandler(e, clickProps, {
        isEscDisabled,
        isRightDisabled,
        isLeftDisabled
      });
    } else {
      if (e.keyCode === 27 && !isEscDisabled) {
        e.preventDefault();
        setIsOpen(false);
      }
      if (e.keyCode === 39 && !isRightDisabled) {
        e.preventDefault();
        if (rtl) {
          prev();
        } else {
          next();
        }
      }
      if (e.keyCode === 37 && !isLeftDisabled) {
        e.preventDefault();
        if (rtl) {
          next();
        } else {
          prev();
        }
      }
    }
  }
  (0, import_react9.useEffect)(() => {
    window.addEventListener("keydown", keyDownHandler, false);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [disable, setCurrentStep, currentStep]);
  return null;
};
var Keyboard_default = Keyboard;
var defaultStyles3 = {
  badge: () => ({
    position: "absolute",
    fontFamily: "monospace",
    background: "var(--reactour-accent,#007aff)",
    height: "1.875em",
    lineHeight: 2,
    paddingLeft: "0.8125em",
    paddingRight: "0.8125em",
    fontSize: "1em",
    borderRadius: "1.625em",
    color: "white",
    textAlign: "center",
    boxShadow: "0 0.25em 0.5em rgba(0, 0, 0, 0.3)",
    top: "-0.8125em",
    left: "-0.8125em"
  }),
  controls: () => ({
    display: "flex",
    marginTop: 24,
    alignItems: "center",
    justifyContent: "space-between"
  }),
  navigation: () => ({
    counterReset: "dot",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap"
  }),
  button: ({ disabled }) => ({
    display: "block",
    padding: 0,
    border: 0,
    background: "none",
    cursor: disabled ? "not-allowed" : "pointer"
  }),
  arrow: ({ disabled }) => ({
    color: disabled ? "#caccce" : "#646464",
    width: 16,
    height: 12,
    flex: "0 0 16px"
    // '&:hover': {
    //   color: disabled ? '#caccce' : '#000',
    // },
  }),
  dot: ({ current, disabled, showNumber }) => ({
    counterIncrement: "dot",
    width: 8,
    height: 8,
    border: current ? "0" : "1px solid #caccce",
    borderRadius: "100%",
    padding: 0,
    display: "block",
    margin: 4,
    transition: "opacity 0.3s, transform 0.3s",
    cursor: disabled ? "not-allowed" : "pointer",
    transform: `scale(${current ? 1.25 : 1})`,
    color: current ? "var(--reactour-accent, #007aff)" : "#caccce",
    background: current ? "var(--reactour-accent, #007aff)" : "none"
    // '&:before': {
    //   content: 'counter(dot)',
    //   position: 'absolute',
    //   bottom: 'calc(100% + 0.25em)',
    //   left: '50%',
    //   opacity: 0,
    //   transform: 'translate(-50%, 1em)',
    //   transition: '0.3s',
    //   display: showNumber ? 'block' : 'none',
    // },
    // '&:hover': {
    //   backgroundColor: 'currentColor',
    //   '&:before': {
    //     opacity: 0.5,
    //     transform: 'translate(-50%, -2px)',
    //   },
    // },
  }),
  close: ({ disabled }) => ({
    position: "absolute",
    top: 22,
    right: 22,
    width: 9,
    height: 9,
    "--rt-close-btn": disabled ? "#caccce" : "#5e5e5e",
    "--rt-close-btn-disabled": disabled ? "#caccce" : "#000"
  }),
  svg: () => ({
    display: "block"
  })
};
function stylesMatcher3(styles) {
  return (key, state) => {
    const base = defaultStyles3[key](state);
    const custom = styles[key];
    return custom ? custom(base, state) : base;
  };
}
var Badge = ({
  styles = {},
  children
}) => {
  const getStyles = stylesMatcher3(styles);
  return import_react11.default.createElement("span", { style: getStyles("badge", {}) }, children);
};
var Badge_default = Badge;
var Close = (_a) => {
  var _b = _a, {
    styles = {},
    onClick,
    disabled
  } = _b, props = __objRest2(_b, [
    "styles",
    "onClick",
    "disabled"
  ]);
  const getStyles = stylesMatcher3(styles);
  return import_react12.default.createElement(
    "button",
    __spreadValues2({
      className: "reactour__close-button",
      style: __spreadValues2(__spreadValues2({}, getStyles("button", {})), getStyles("close", { disabled })),
      onClick
    }, props),
    import_react12.default.createElement(
      "svg",
      {
        viewBox: "0 0 9.1 9.1",
        "aria-hidden": true,
        role: "presentation",
        style: __spreadValues2({}, getStyles("svg", {}))
      },
      import_react12.default.createElement(
        "path",
        {
          fill: "currentColor",
          d: "M5.9 4.5l2.8-2.8c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L4.5 3.1 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4l2.8 2.8L.3 7.4c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3L4.5 6l2.8 2.8c.3.2.5.3.8.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.9 4.5z"
        }
      )
    )
  );
};
var Close_default = Close;
var Content = ({
  content,
  setCurrentStep,
  transition,
  isHighlightingObserved,
  currentStep,
  setIsOpen
}) => {
  return typeof content === "function" ? content({
    setCurrentStep,
    transition,
    isHighlightingObserved,
    currentStep,
    setIsOpen
  }) : content;
};
var Content_default = Content;
var Navigation = ({
  styles = {},
  steps,
  setCurrentStep,
  currentStep,
  setIsOpen,
  nextButton,
  prevButton,
  disableDots,
  hideDots,
  hideButtons,
  disableAll,
  rtl,
  Arrow = DefaultArrow
}) => {
  const stepsLength = steps.length;
  const getStyles = stylesMatcher3(styles);
  const Button = ({
    onClick,
    kind = "next",
    children,
    hideArrow
  }) => {
    function clickHandler() {
      if (!disableAll) {
        if (onClick && typeof onClick === "function") {
          onClick();
        } else {
          if (kind === "next") {
            setCurrentStep(Math.min(currentStep + 1, stepsLength - 1));
          } else {
            setCurrentStep(Math.max(currentStep - 1, 0));
          }
        }
      }
    }
    return import_react13.default.createElement(
      "button",
      {
        style: getStyles("button", {
          kind,
          disabled: disableAll ? disableAll : kind === "next" ? stepsLength - 1 === currentStep : currentStep === 0
        }),
        onClick: clickHandler,
        "aria-label": `Go to ${kind} step`
      },
      !hideArrow ? import_react13.default.createElement(
        Arrow,
        {
          styles,
          inverted: rtl ? kind === "prev" : kind === "next",
          disabled: disableAll ? disableAll : kind === "next" ? stepsLength - 1 === currentStep : currentStep === 0
        }
      ) : null,
      children
    );
  };
  return import_react13.default.createElement("div", { style: getStyles("controls", {}), dir: rtl ? "rtl" : "ltr" }, !hideButtons ? prevButton && typeof prevButton === "function" ? prevButton({
    Button,
    setCurrentStep,
    currentStep,
    stepsLength,
    setIsOpen,
    steps
  }) : import_react13.default.createElement(Button, { kind: "prev" }) : null, !hideDots ? import_react13.default.createElement("div", { style: getStyles("navigation", {}) }, Array.from({ length: stepsLength }, (_, i) => i).map((index2) => {
    var _a;
    return import_react13.default.createElement(
      "button",
      {
        style: getStyles("dot", {
          current: index2 === currentStep,
          disabled: disableDots || disableAll
        }),
        onClick: () => {
          if (!disableDots && !disableAll) setCurrentStep(index2);
        },
        key: `navigation_dot_${index2}`,
        "aria-label": ((_a = steps[index2]) == null ? void 0 : _a.navDotAriaLabel) || `Go to step ${index2 + 1}`
      }
    );
  })) : null, !hideButtons ? nextButton && typeof nextButton === "function" ? nextButton({
    Button,
    setCurrentStep,
    currentStep,
    stepsLength,
    setIsOpen,
    steps
  }) : import_react13.default.createElement(Button, null) : null);
};
var Navigation_default = Navigation;
var DefaultArrow = ({
  styles = {},
  inverted = false,
  disabled
}) => {
  const getStyles = stylesMatcher3(styles);
  return import_react13.default.createElement(
    "svg",
    {
      viewBox: "0 0 18.4 14.4",
      style: getStyles("arrow", { inverted, disabled })
    },
    import_react13.default.createElement(
      "path",
      {
        d: inverted ? "M17 7.2H1M10.8 1L17 7.2l-6.2 6.2" : "M1.4 7.2h16M7.6 1L1.4 7.2l6.2 6.2",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeMiterlimit: "10"
      }
    )
  );
};
var components = {
  Badge: Badge_default,
  Close: Close_default,
  Content: Content_default,
  Navigation: Navigation_default,
  Arrow: DefaultArrow
};
var defaultComponents = (comps) => __spreadValues2(__spreadValues2({}, components), comps);
var PopoverContent = ({
  styles,
  components: components2 = {},
  badgeContent,
  accessibilityOptions,
  disabledActions,
  onClickClose,
  steps,
  setCurrentStep,
  currentStep,
  transition,
  isHighlightingObserved,
  setIsOpen,
  nextButton,
  prevButton,
  disableDotsNavigation,
  rtl,
  showPrevNextButtons = true,
  showCloseButton = true,
  showNavigation = true,
  showBadge = true,
  showDots = true,
  meta,
  setMeta,
  setSteps
}) => {
  const step = steps[currentStep];
  const { Badge: Badge2, Close: Close2, Content: Content2, Navigation: Navigation2, Arrow } = defaultComponents(components2);
  const badge = badgeContent && typeof badgeContent === "function" ? badgeContent({
    currentStep,
    totalSteps: steps.length,
    transition
  }) : currentStep + 1;
  function closeClickHandler() {
    if (!disabledActions) {
      if (onClickClose && typeof onClickClose === "function") {
        onClickClose({
          setCurrentStep,
          setIsOpen,
          currentStep,
          steps,
          meta,
          setMeta,
          setSteps
        });
      } else {
        setIsOpen(false);
      }
    }
  }
  return import_react10.default.createElement(import_react10.default.Fragment, null, showBadge ? import_react10.default.createElement(Badge2, { styles }, badge) : null, showCloseButton ? import_react10.default.createElement(
    Close2,
    {
      styles,
      "aria-label": accessibilityOptions == null ? void 0 : accessibilityOptions.closeButtonAriaLabel,
      disabled: disabledActions,
      onClick: closeClickHandler
    }
  ) : null, import_react10.default.createElement(
    Content2,
    {
      content: step == null ? void 0 : step.content,
      setCurrentStep,
      currentStep,
      transition,
      isHighlightingObserved,
      setIsOpen
    }
  ), showNavigation ? import_react10.default.createElement(
    Navigation2,
    {
      setCurrentStep,
      currentStep,
      setIsOpen,
      steps,
      styles,
      "aria-hidden": !(accessibilityOptions == null ? void 0 : accessibilityOptions.showNavigationScreenReaders),
      nextButton,
      prevButton,
      disableDots: disableDotsNavigation,
      hideButtons: !showPrevNextButtons,
      hideDots: !showDots,
      disableAll: disabledActions,
      rtl,
      Arrow
    }
  ) : null);
};
var PopoverContent_default = PopoverContent;
var Tour = (_a) => {
  var _b = _a, {
    currentStep,
    setCurrentStep,
    setIsOpen,
    steps = [],
    setSteps,
    styles: globalStyles = {},
    scrollSmooth,
    afterOpen,
    beforeClose,
    padding = 10,
    position,
    onClickMask,
    onClickHighlighted,
    keyboardHandler,
    className = "reactour__popover",
    maskClassName = "reactour__mask",
    highlightedMaskClassName,
    clipId,
    maskId,
    disableInteraction,
    disableKeyboardNavigation,
    inViewThreshold,
    disabledActions,
    setDisabledActions,
    disableWhenSelectorFalsy,
    rtl,
    accessibilityOptions = {
      closeButtonAriaLabel: "Close Tour",
      showNavigationScreenReaders: true
    },
    ContentComponent,
    Wrapper,
    meta,
    setMeta,
    onTransition = () => {
      return "center";
    }
  } = _b, popoverProps = __objRest2(_b, [
    "currentStep",
    "setCurrentStep",
    "setIsOpen",
    "steps",
    "setSteps",
    "styles",
    "scrollSmooth",
    "afterOpen",
    "beforeClose",
    "padding",
    "position",
    "onClickMask",
    "onClickHighlighted",
    "keyboardHandler",
    "className",
    "maskClassName",
    "highlightedMaskClassName",
    "clipId",
    "maskId",
    "disableInteraction",
    // disableFocusLock,
    "disableKeyboardNavigation",
    "inViewThreshold",
    "disabledActions",
    "setDisabledActions",
    "disableWhenSelectorFalsy",
    "rtl",
    "accessibilityOptions",
    "ContentComponent",
    "Wrapper",
    "meta",
    "setMeta",
    "onTransition"
  ]);
  var _a2;
  const step = steps[currentStep];
  const styles = __spreadValues2(__spreadValues2({}, globalStyles), step == null ? void 0 : step.styles);
  const {
    sizes,
    transition,
    observableRefresher,
    isHighlightingObserved,
    target
  } = useSizes(step, {
    block: "center",
    behavior: scrollSmooth ? "smooth" : "auto",
    inViewThreshold
  });
  (0, import_react7.useEffect)(() => {
    if (afterOpen && typeof afterOpen === "function") {
      afterOpen(target);
    }
    return () => {
      if (beforeClose && typeof beforeClose === "function") {
        beforeClose(target);
      }
    };
  }, []);
  const { maskPadding, popoverPadding, wrapperPadding } = getPadding2(
    (_a2 = step == null ? void 0 : step.padding) != null ? _a2 : padding
  );
  const clickProps = {
    setCurrentStep,
    setIsOpen,
    currentStep,
    setSteps,
    steps,
    setMeta,
    meta
  };
  function maskClickHandler() {
    if (!disabledActions) {
      if (onClickMask && typeof onClickMask === "function") {
        onClickMask(clickProps);
      } else {
        setIsOpen(false);
      }
    }
  }
  const doDisableInteraction = typeof (step == null ? void 0 : step.stepInteraction) === "boolean" ? !(step == null ? void 0 : step.stepInteraction) : disableInteraction ? typeof disableInteraction === "boolean" ? disableInteraction : disableInteraction(clickProps) : false;
  (0, import_react7.useEffect)(() => {
    if ((step == null ? void 0 : step.action) && typeof (step == null ? void 0 : step.action) === "function") {
      step == null ? void 0 : step.action(target);
    }
    if ((step == null ? void 0 : step.disableActions) !== void 0) {
      setDisabledActions(step == null ? void 0 : step.disableActions);
    }
    return () => {
      if ((step == null ? void 0 : step.actionAfter) && typeof (step == null ? void 0 : step.actionAfter) === "function") {
        step == null ? void 0 : step.actionAfter(target);
      }
    };
  }, [step]);
  const popoverPosition = transition ? onTransition : (step == null ? void 0 : step.position) ? step == null ? void 0 : step.position : position;
  const TourWrapper = Wrapper ? Wrapper : import_react7.default.Fragment;
  return step ? import_react7.default.createElement(TourWrapper, null, import_react7.default.createElement(
    Observables_default,
    {
      mutationObservables: step == null ? void 0 : step.mutationObservables,
      resizeObservables: step == null ? void 0 : step.resizeObservables,
      refresh: observableRefresher
    }
  ), import_react7.default.createElement(
    Keyboard_default,
    {
      setCurrentStep,
      currentStep,
      setIsOpen,
      stepsLength: steps.length,
      disableKeyboardNavigation,
      disable: disabledActions,
      rtl,
      clickProps,
      keyboardHandler
    }
  ), (!disableWhenSelectorFalsy || target) && import_react7.default.createElement(
    Mask_default,
    {
      sizes: transition ? initialState22 : sizes,
      onClick: maskClickHandler,
      styles: __spreadValues2({
        highlightedArea: (base) => __spreadProps(__spreadValues2({}, base), {
          display: doDisableInteraction ? "block" : "none"
        })
      }, styles),
      padding: transition ? 0 : maskPadding,
      highlightedAreaClassName: highlightedMaskClassName,
      className: maskClassName,
      onClickHighlighted: (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClickHighlighted)
          onClickHighlighted(e, clickProps);
      },
      wrapperPadding,
      clipId,
      maskId
    }
  ), (!disableWhenSelectorFalsy || target) && import_react7.default.createElement(
    Popover_default,
    {
      sizes,
      styles,
      position: popoverPosition,
      padding: popoverPadding,
      "aria-labelledby": accessibilityOptions == null ? void 0 : accessibilityOptions.ariaLabelledBy,
      className,
      refresher: currentStep
    },
    ContentComponent ? import_react7.default.createElement(
      ContentComponent,
      __spreadValues2({
        styles,
        setCurrentStep,
        currentStep,
        setIsOpen,
        steps,
        accessibilityOptions,
        disabledActions,
        transition,
        isHighlightingObserved,
        rtl
      }, popoverProps)
    ) : import_react7.default.createElement(
      PopoverContent_default,
      __spreadValues2({
        styles,
        setCurrentStep,
        currentStep,
        setIsOpen,
        steps,
        setSteps,
        accessibilityOptions,
        disabledActions,
        transition,
        isHighlightingObserved,
        rtl,
        meta,
        setMeta
      }, popoverProps)
    )
  )) : null;
};
var Tour_default = Tour;
function getPadding2(padding) {
  if (typeof padding === "object" && padding !== null) {
    return {
      maskPadding: padding.mask,
      popoverPadding: padding.popover,
      wrapperPadding: padding.wrapper
    };
  }
  return {
    maskPadding: padding,
    popoverPadding: padding,
    wrapperPadding: 0
  };
}
var initialState22 = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0
};
var defaultState = {
  isOpen: false,
  setIsOpen: () => false,
  currentStep: 0,
  setCurrentStep: () => 0,
  steps: [],
  setSteps: () => [],
  setMeta: () => "",
  disabledActions: false,
  setDisabledActions: () => false,
  components: {}
};
var TourContext = import_react14.default.createContext(defaultState);
var TourProvider = (_a) => {
  var _b = _a, {
    children,
    defaultOpen = false,
    startAt = 0,
    steps: defaultSteps,
    setCurrentStep: customSetCurrentStep,
    currentStep: customCurrentStep
  } = _b, props = __objRest2(_b, [
    "children",
    "defaultOpen",
    "startAt",
    "steps",
    "setCurrentStep",
    "currentStep"
  ]);
  const [isOpen, setIsOpen] = (0, import_react14.useState)(defaultOpen);
  const [currentStep, setCurrentStep] = (0, import_react14.useState)(startAt);
  const [steps, setSteps] = (0, import_react14.useState)(defaultSteps);
  const [meta, setMeta] = (0, import_react14.useState)("");
  const [disabledActions, setDisabledActions] = (0, import_react14.useState)(false);
  const value = __spreadValues2({
    isOpen,
    setIsOpen,
    currentStep: customCurrentStep || currentStep,
    setCurrentStep: customSetCurrentStep && typeof customSetCurrentStep === "function" ? customSetCurrentStep : setCurrentStep,
    steps,
    setSteps,
    disabledActions,
    setDisabledActions,
    meta,
    setMeta
  }, props);
  return import_react14.default.createElement(TourContext.Provider, { value }, children, isOpen ? import_react14.default.createElement(Tour_default, __spreadValues2({}, value)) : null);
};
var Context_default = TourContext;
function useTour() {
  return (0, import_react14.useContext)(TourContext);
}
function withTour(WrappedComponent) {
  const ComponentWithTour = (props) => {
    const tourProps = useTour();
    return import_react15.default.createElement(WrappedComponent, __spreadValues2(__spreadValues2({}, props), tourProps));
  };
  return ComponentWithTour;
}
var index_default = Tour_default;
export {
  Tour_default as Tour,
  Context_default as TourContext,
  TourProvider,
  components,
  index_default as default,
  useTour,
  withTour
};
//# sourceMappingURL=@reactour_tour.js.map
