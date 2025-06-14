import {
  require_prop_types
} from "./chunk-HGRDQ7LL.js";
import {
  require_react_dom
} from "./chunk-75BWMHAZ.js";
import {
  require_react
} from "./chunk-TWJRYSII.js";
import {
  __commonJS,
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/scroll/index.js
var require_scroll = __commonJS({
  "node_modules/scroll/index.js"(exports, module) {
    var E_NOSCROLL = new Error("Element already at target scroll position");
    var E_CANCELLED = new Error("Scroll cancelled");
    var min = Math.min;
    var ms = Date.now;
    module.exports = {
      left: make("scrollLeft"),
      top: make("scrollTop")
    };
    function make(prop) {
      return function scroll2(el, to, opts, cb) {
        opts = opts || {};
        if (typeof opts == "function") cb = opts, opts = {};
        if (typeof cb != "function") cb = noop3;
        var start = ms();
        var from = el[prop];
        var ease = opts.ease || inOutSine;
        var duration = !isNaN(opts.duration) ? +opts.duration : 350;
        var cancelled = false;
        return from === to ? cb(E_NOSCROLL, el[prop]) : requestAnimationFrame(animate), cancel;
        function cancel() {
          cancelled = true;
        }
        function animate(timestamp) {
          if (cancelled) return cb(E_CANCELLED, el[prop]);
          var now = ms();
          var time = min(1, (now - start) / duration);
          var eased = ease(time);
          el[prop] = eased * (to - from) + from;
          time < 1 ? requestAnimationFrame(animate) : requestAnimationFrame(function() {
            cb(null, el[prop]);
          });
        }
      };
    }
    function inOutSine(n) {
      return 0.5 * (1 - Math.cos(Math.PI * n));
    }
    function noop3() {
    }
  }
});

// node_modules/scrollparent/scrollparent.js
var require_scrollparent = __commonJS({
  "node_modules/scrollparent/scrollparent.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define([], factory);
      } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
      } else {
        root.Scrollparent = factory();
      }
    })(exports, function() {
      function isScrolling(node) {
        var overflow = getComputedStyle(node, null).getPropertyValue("overflow");
        return overflow.indexOf("scroll") > -1 || overflow.indexOf("auto") > -1;
      }
      function scrollParent2(node) {
        if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
          return void 0;
        }
        var current = node.parentNode;
        while (current.parentNode) {
          if (isScrolling(current)) {
            return current;
          }
          current = current.parentNode;
        }
        return document.scrollingElement || document.documentElement;
      }
      return scrollParent2;
    });
  }
});

// node_modules/react-innertext/index.js
var require_react_innertext = __commonJS({
  "node_modules/react-innertext/index.js"(exports, module) {
    "use strict";
    var hasProps = function(jsx) {
      return Object.prototype.hasOwnProperty.call(jsx, "props");
    };
    var reduceJsxToString = function(previous, current) {
      return previous + innerText2(current);
    };
    var innerText2 = function(jsx) {
      if (jsx === null || typeof jsx === "boolean" || typeof jsx === "undefined") {
        return "";
      }
      if (typeof jsx === "number") {
        return jsx.toString();
      }
      if (typeof jsx === "string") {
        return jsx;
      }
      if (Array.isArray(jsx)) {
        return jsx.reduce(reduceJsxToString, "");
      }
      if (hasProps(jsx) && Object.prototype.hasOwnProperty.call(jsx.props, "children")) {
        return innerText2(jsx.props.children);
      }
      return "";
    };
    innerText2.default = innerText2;
    module.exports = innerText2;
  }
});

// node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/deepmerge/dist/cjs.js"(exports, module) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge4(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge4;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge4;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return Object.propertyIsEnumerable.call(target, symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge4(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge4.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge4(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge4;
    module.exports = deepmerge_1;
  }
});

// node_modules/react-joyride/dist/index.mjs
var React9 = __toESM(require_react(), 1);

// node_modules/@gilbarbara/deep-equal/dist/index.mjs
function isOfType(type) {
  return (value) => typeof value === type;
}
var isFunction = isOfType("function");
var isNull = (value) => {
  return value === null;
};
var isRegex = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1) === "RegExp";
};
var isObject = (value) => {
  return !isUndefined(value) && !isNull(value) && (isFunction(value) || typeof value === "object");
};
var isUndefined = isOfType("undefined");
function equalArray(left, right) {
  const { length } = left;
  if (length !== right.length) {
    return false;
  }
  for (let index = length; index-- !== 0; ) {
    if (!equal(left[index], right[index])) {
      return false;
    }
  }
  return true;
}
function equalArrayBuffer(left, right) {
  if (left.byteLength !== right.byteLength) {
    return false;
  }
  const view1 = new DataView(left.buffer);
  const view2 = new DataView(right.buffer);
  let index = left.byteLength;
  while (index--) {
    if (view1.getUint8(index) !== view2.getUint8(index)) {
      return false;
    }
  }
  return true;
}
function equalMap(left, right) {
  if (left.size !== right.size) {
    return false;
  }
  for (const index of left.entries()) {
    if (!right.has(index[0])) {
      return false;
    }
  }
  for (const index of left.entries()) {
    if (!equal(index[1], right.get(index[0]))) {
      return false;
    }
  }
  return true;
}
function equalSet(left, right) {
  if (left.size !== right.size) {
    return false;
  }
  for (const index of left.entries()) {
    if (!right.has(index[0])) {
      return false;
    }
  }
  return true;
}
function equal(left, right) {
  if (left === right) {
    return true;
  }
  if (left && isObject(left) && right && isObject(right)) {
    if (left.constructor !== right.constructor) {
      return false;
    }
    if (Array.isArray(left) && Array.isArray(right)) {
      return equalArray(left, right);
    }
    if (left instanceof Map && right instanceof Map) {
      return equalMap(left, right);
    }
    if (left instanceof Set && right instanceof Set) {
      return equalSet(left, right);
    }
    if (ArrayBuffer.isView(left) && ArrayBuffer.isView(right)) {
      return equalArrayBuffer(left, right);
    }
    if (isRegex(left) && isRegex(right)) {
      return left.source === right.source && left.flags === right.flags;
    }
    if (left.valueOf !== Object.prototype.valueOf) {
      return left.valueOf() === right.valueOf();
    }
    if (left.toString !== Object.prototype.toString) {
      return left.toString() === right.toString();
    }
    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);
    if (leftKeys.length !== rightKeys.length) {
      return false;
    }
    for (let index = leftKeys.length; index-- !== 0; ) {
      if (!Object.prototype.hasOwnProperty.call(right, leftKeys[index])) {
        return false;
      }
    }
    for (let index = leftKeys.length; index-- !== 0; ) {
      const key = leftKeys[index];
      if (key === "_owner" && left.$$typeof) {
        continue;
      }
      if (!equal(left[key], right[key])) {
        return false;
      }
    }
    return true;
  }
  if (Number.isNaN(left) && Number.isNaN(right)) {
    return true;
  }
  return left === right;
}

// node_modules/is-lite/dist/index.mjs
var objectTypes = [
  "Array",
  "ArrayBuffer",
  "AsyncFunction",
  "AsyncGenerator",
  "AsyncGeneratorFunction",
  "Date",
  "Error",
  "Function",
  "Generator",
  "GeneratorFunction",
  "HTMLElement",
  "Map",
  "Object",
  "Promise",
  "RegExp",
  "Set",
  "WeakMap",
  "WeakSet"
];
var primitiveTypes = [
  "bigint",
  "boolean",
  "null",
  "number",
  "string",
  "symbol",
  "undefined"
];
function getObjectType(value) {
  const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
  if (/HTML\w+Element/.test(objectTypeName)) {
    return "HTMLElement";
  }
  if (isObjectType(objectTypeName)) {
    return objectTypeName;
  }
  return void 0;
}
function isObjectOfType(type) {
  return (value) => getObjectType(value) === type;
}
function isObjectType(name) {
  return objectTypes.includes(name);
}
function isOfType2(type) {
  return (value) => typeof value === type;
}
function isPrimitiveType(name) {
  return primitiveTypes.includes(name);
}
var DOM_PROPERTIES_TO_CHECK = [
  "innerHTML",
  "ownerDocument",
  "style",
  "attributes",
  "nodeValue"
];
function is(value) {
  if (value === null) {
    return "null";
  }
  switch (typeof value) {
    case "bigint":
      return "bigint";
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "string":
      return "string";
    case "symbol":
      return "symbol";
    case "undefined":
      return "undefined";
    default:
  }
  if (is.array(value)) {
    return "Array";
  }
  if (is.plainFunction(value)) {
    return "Function";
  }
  const tagType = getObjectType(value);
  if (tagType) {
    return tagType;
  }
  return "Object";
}
is.array = Array.isArray;
is.arrayOf = (target, predicate) => {
  if (!is.array(target) && !is.function(predicate)) {
    return false;
  }
  return target.every((d) => predicate(d));
};
is.asyncGeneratorFunction = (value) => getObjectType(value) === "AsyncGeneratorFunction";
is.asyncFunction = isObjectOfType("AsyncFunction");
is.bigint = isOfType2("bigint");
is.boolean = (value) => {
  return value === true || value === false;
};
is.date = isObjectOfType("Date");
is.defined = (value) => !is.undefined(value);
is.domElement = (value) => {
  return is.object(value) && !is.plainObject(value) && value.nodeType === 1 && is.string(value.nodeName) && DOM_PROPERTIES_TO_CHECK.every((property) => property in value);
};
is.empty = (value) => {
  return is.string(value) && value.length === 0 || is.array(value) && value.length === 0 || is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length === 0 || is.set(value) && value.size === 0 || is.map(value) && value.size === 0;
};
is.error = isObjectOfType("Error");
is.function = isOfType2("function");
is.generator = (value) => {
  return is.iterable(value) && is.function(value.next) && is.function(value.throw);
};
is.generatorFunction = isObjectOfType("GeneratorFunction");
is.instanceOf = (instance, class_) => {
  if (!instance || !class_) {
    return false;
  }
  return Object.getPrototypeOf(instance) === class_.prototype;
};
is.iterable = (value) => {
  return !is.nullOrUndefined(value) && is.function(value[Symbol.iterator]);
};
is.map = isObjectOfType("Map");
is.nan = (value) => {
  return Number.isNaN(value);
};
is.null = (value) => {
  return value === null;
};
is.nullOrUndefined = (value) => {
  return is.null(value) || is.undefined(value);
};
is.number = (value) => {
  return isOfType2("number")(value) && !is.nan(value);
};
is.numericString = (value) => {
  return is.string(value) && value.length > 0 && !Number.isNaN(Number(value));
};
is.object = (value) => {
  return !is.nullOrUndefined(value) && (is.function(value) || typeof value === "object");
};
is.oneOf = (target, value) => {
  if (!is.array(target)) {
    return false;
  }
  return target.indexOf(value) > -1;
};
is.plainFunction = isObjectOfType("Function");
is.plainObject = (value) => {
  if (getObjectType(value) !== "Object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.getPrototypeOf({});
};
is.primitive = (value) => is.null(value) || isPrimitiveType(typeof value);
is.promise = isObjectOfType("Promise");
is.propertyOf = (target, key, predicate) => {
  if (!is.object(target) || !key) {
    return false;
  }
  const value = target[key];
  if (is.function(predicate)) {
    return predicate(value);
  }
  return is.defined(value);
};
is.regexp = isObjectOfType("RegExp");
is.set = isObjectOfType("Set");
is.string = isOfType2("string");
is.symbol = isOfType2("symbol");
is.undefined = isOfType2("undefined");
is.weakMap = isObjectOfType("WeakMap");
is.weakSet = isObjectOfType("WeakSet");
var src_default = is;

// node_modules/tree-changes/dist/index.mjs
function canHaveLength(...arguments_) {
  return arguments_.every((d) => src_default.string(d) || src_default.array(d) || src_default.plainObject(d));
}
function checkEquality(left, right, value) {
  if (!isSameType(left, right)) {
    return false;
  }
  if ([left, right].every(src_default.array)) {
    return !left.some(hasValue(value)) && right.some(hasValue(value));
  }
  if ([left, right].every(src_default.plainObject)) {
    return !Object.entries(left).some(hasEntry(value)) && Object.entries(right).some(hasEntry(value));
  }
  return right === value;
}
function compareNumbers(previousData, data, options) {
  const { actual, key, previous, type } = options;
  const left = nested(previousData, key);
  const right = nested(data, key);
  let changed = [left, right].every(src_default.number) && (type === "increased" ? left < right : left > right);
  if (!src_default.undefined(actual)) {
    changed = changed && right === actual;
  }
  if (!src_default.undefined(previous)) {
    changed = changed && left === previous;
  }
  return changed;
}
function compareValues(previousData, data, options) {
  const { key, type, value } = options;
  const left = nested(previousData, key);
  const right = nested(data, key);
  const primary = type === "added" ? left : right;
  const secondary = type === "added" ? right : left;
  if (!src_default.nullOrUndefined(value)) {
    if (src_default.defined(primary)) {
      if (src_default.array(primary) || src_default.plainObject(primary)) {
        return checkEquality(primary, secondary, value);
      }
    } else {
      return equal(secondary, value);
    }
    return false;
  }
  if ([left, right].every(src_default.array)) {
    return !secondary.every(isEqualPredicate(primary));
  }
  if ([left, right].every(src_default.plainObject)) {
    return hasExtraKeys(Object.keys(primary), Object.keys(secondary));
  }
  return ![left, right].every((d) => src_default.primitive(d) && src_default.defined(d)) && (type === "added" ? !src_default.defined(left) && src_default.defined(right) : src_default.defined(left) && !src_default.defined(right));
}
function getIterables(previousData, data, { key } = {}) {
  let left = nested(previousData, key);
  let right = nested(data, key);
  if (!isSameType(left, right)) {
    throw new TypeError("Inputs have different types");
  }
  if (!canHaveLength(left, right)) {
    throw new TypeError("Inputs don't have length");
  }
  if ([left, right].every(src_default.plainObject)) {
    left = Object.keys(left);
    right = Object.keys(right);
  }
  return [left, right];
}
function hasEntry(input) {
  return ([key, value]) => {
    if (src_default.array(input)) {
      return equal(input, value) || input.some((d) => equal(d, value) || src_default.array(value) && isEqualPredicate(value)(d));
    }
    if (src_default.plainObject(input) && input[key]) {
      return !!input[key] && equal(input[key], value);
    }
    return equal(input, value);
  };
}
function hasExtraKeys(left, right) {
  return right.some((d) => !left.includes(d));
}
function hasValue(input) {
  return (value) => {
    if (src_default.array(input)) {
      return input.some((d) => equal(d, value) || src_default.array(value) && isEqualPredicate(value)(d));
    }
    return equal(input, value);
  };
}
function includesOrEqualsTo(previousValue, value) {
  return src_default.array(previousValue) ? previousValue.some((d) => equal(d, value)) : equal(previousValue, value);
}
function isEqualPredicate(data) {
  return (value) => data.some((d) => equal(d, value));
}
function isSameType(...arguments_) {
  return arguments_.every(src_default.array) || arguments_.every(src_default.number) || arguments_.every(src_default.plainObject) || arguments_.every(src_default.string);
}
function nested(data, property) {
  if (src_default.plainObject(data) || src_default.array(data)) {
    if (src_default.string(property)) {
      const props = property.split(".");
      return props.reduce((acc, d) => acc && acc[d], data);
    }
    if (src_default.number(property)) {
      return data[property];
    }
    return data;
  }
  return data;
}
function treeChanges(previousData, data) {
  if ([previousData, data].some(src_default.nullOrUndefined)) {
    throw new Error("Missing required parameters");
  }
  if (![previousData, data].every((d) => src_default.plainObject(d) || src_default.array(d))) {
    throw new Error("Expected plain objects or array");
  }
  const added = (key, value) => {
    try {
      return compareValues(previousData, data, { key, type: "added", value });
    } catch {
      return false;
    }
  };
  const changed = (key, actual, previous) => {
    try {
      const left = nested(previousData, key);
      const right = nested(data, key);
      const hasActual = src_default.defined(actual);
      const hasPrevious = src_default.defined(previous);
      if (hasActual || hasPrevious) {
        const leftComparator = hasPrevious ? includesOrEqualsTo(previous, left) : !includesOrEqualsTo(actual, left);
        const rightComparator = includesOrEqualsTo(actual, right);
        return leftComparator && rightComparator;
      }
      if ([left, right].every(src_default.array) || [left, right].every(src_default.plainObject)) {
        return !equal(left, right);
      }
      return left !== right;
    } catch {
      return false;
    }
  };
  const changedFrom = (key, previous, actual) => {
    if (!src_default.defined(key)) {
      return false;
    }
    try {
      const left = nested(previousData, key);
      const right = nested(data, key);
      const hasActual = src_default.defined(actual);
      return includesOrEqualsTo(previous, left) && (hasActual ? includesOrEqualsTo(actual, right) : !hasActual);
    } catch {
      return false;
    }
  };
  const decreased = (key, actual, previous) => {
    if (!src_default.defined(key)) {
      return false;
    }
    try {
      return compareNumbers(previousData, data, { key, actual, previous, type: "decreased" });
    } catch {
      return false;
    }
  };
  const emptied = (key) => {
    try {
      const [left, right] = getIterables(previousData, data, { key });
      return !!left.length && !right.length;
    } catch {
      return false;
    }
  };
  const filled = (key) => {
    try {
      const [left, right] = getIterables(previousData, data, { key });
      return !left.length && !!right.length;
    } catch {
      return false;
    }
  };
  const increased = (key, actual, previous) => {
    if (!src_default.defined(key)) {
      return false;
    }
    try {
      return compareNumbers(previousData, data, { key, actual, previous, type: "increased" });
    } catch {
      return false;
    }
  };
  const removed = (key, value) => {
    try {
      return compareValues(previousData, data, { key, type: "removed", value });
    } catch {
      return false;
    }
  };
  return { added, changed, changedFrom, decreased, emptied, filled, increased, removed };
}

// node_modules/react-joyride/dist/index.mjs
var import_scroll = __toESM(require_scroll(), 1);
var import_scrollparent = __toESM(require_scrollparent(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_react_dom2 = __toESM(require_react_dom(), 1);
var import_react_innertext = __toESM(require_react_innertext(), 1);
var import_deepmerge2 = __toESM(require_cjs(), 1);
var import_deepmerge3 = __toESM(require_cjs(), 1);
var React2 = __toESM(require_react(), 1);
var React3 = __toESM(require_react(), 1);
var React32 = __toESM(require_react(), 1);
var ReactDOM2 = __toESM(require_react_dom(), 1);
var React8 = __toESM(require_react(), 1);

// node_modules/react-floater/es/index.js
var import_react = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/popper.js/dist/esm/popper.js
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && typeof navigator !== "undefined";
var timeoutDuration = function() {
  var longerTimeoutBrowsers = ["Edge", "Trident", "Firefox"];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();
function microtaskDebounce(fn) {
  var called = false;
  return function() {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function() {
      called = false;
      fn();
    });
  };
}
function taskDebounce(fn) {
  var scheduled = false;
  return function() {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function() {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}
var supportsMicroTasks = isBrowser && window.Promise;
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
function isFunction2(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === "[object Function]";
}
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  var window2 = element.ownerDocument.defaultView;
  var css = window2.getComputedStyle(element, null);
  return property ? css[property] : css;
}
function getParentNode(element) {
  if (element.nodeName === "HTML") {
    return element;
  }
  return element.parentNode || element.host;
}
function getScrollParent(element) {
  if (!element) {
    return document.body;
  }
  switch (element.nodeName) {
    case "HTML":
    case "BODY":
      return element.ownerDocument.body;
    case "#document":
      return element.body;
  }
  var _getStyleComputedProp = getStyleComputedProperty(element), overflow = _getStyleComputedProp.overflow, overflowX = _getStyleComputedProp.overflowX, overflowY = _getStyleComputedProp.overflowY;
  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }
  return getScrollParent(getParentNode(element));
}
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}
var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }
  var noOffsetParent = isIE(10) ? document.body : null;
  var offsetParent = element.offsetParent || null;
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }
  var nodeName = offsetParent && offsetParent.nodeName;
  if (!nodeName || nodeName === "BODY" || nodeName === "HTML") {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }
  if (["TH", "TD", "TABLE"].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, "position") === "static") {
    return getOffsetParent(offsetParent);
  }
  return offsetParent;
}
function isOffsetContainer(element) {
  var nodeName = element.nodeName;
  if (nodeName === "BODY") {
    return false;
  }
  return nodeName === "HTML" || getOffsetParent(element.firstElementChild) === element;
}
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }
  return node;
}
function findCommonOffsetParent(element1, element2) {
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;
  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }
    return getOffsetParent(commonAncestorContainer);
  }
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top";
  var upperSide = side === "top" ? "scrollTop" : "scrollLeft";
  var nodeName = element.nodeName;
  if (nodeName === "BODY" || nodeName === "HTML") {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }
  return element[upperSide];
}
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var scrollTop = getScroll(element, "top");
  var scrollLeft = getScroll(element, "left");
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}
function getBordersSize(styles, axis) {
  var sideA = axis === "x" ? "Left" : "Top";
  var sideB = sideA === "Left" ? "Right" : "Bottom";
  return parseFloat(styles["border" + sideA + "Width"]) + parseFloat(styles["border" + sideB + "Width"]);
}
function getSize(axis, body, html, computedStyle) {
  return Math.max(body["offset" + axis], body["scroll" + axis], html["client" + axis], html["offset" + axis], html["scroll" + axis], isIE(10) ? parseInt(html["offset" + axis]) + parseInt(computedStyle["margin" + (axis === "Height" ? "Top" : "Left")]) + parseInt(computedStyle["margin" + (axis === "Height" ? "Bottom" : "Right")]) : 0);
}
function getWindowSizes(document2) {
  var body = document2.body;
  var html = document2.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);
  return {
    height: getSize("Height", body, html, computedStyle),
    width: getSize("Width", body, html, computedStyle)
  };
}
var classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
var createClass = /* @__PURE__ */ function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var defineProperty = function(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
};
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}
function getBoundingClientRect(element) {
  var rect = {};
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, "top");
      var scrollLeft = getScroll(element, "left");
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {
  }
  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };
  var sizes = element.nodeName === "HTML" ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;
  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, "x");
    vertScrollbar -= getBordersSize(styles, "y");
    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }
  return getClientRect(result);
}
function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var isIE102 = isIE(10);
  var isHTML = parent.nodeName === "HTML";
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent2 = getScrollParent(children);
  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth);
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;
  if (!isIE102 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);
    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }
  if (isIE102 && !fixedPosition ? parent.contains(scrollParent2) : parent === scrollParent2 && scrollParent2.nodeName !== "BODY") {
    offsets = includeScroll(offsets, parent);
  }
  return offsets;
}
function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);
  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, "left") : 0;
  var offset2 = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width,
    height
  };
  return getClientRect(offset2);
}
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === "BODY" || nodeName === "HTML") {
    return false;
  }
  if (getStyleComputedProperty(element, "position") === "fixed") {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}
function getFixedPositionOffsetParent(element) {
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, "transform") === "none") {
    el = el.parentElement;
  }
  return el || document.documentElement;
}
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  if (boundariesElement === "viewport") {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    var boundariesNode = void 0;
    if (boundariesElement === "scrollParent") {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === "BODY") {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === "window") {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }
    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);
    if (boundariesNode.nodeName === "HTML" && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument), height = _getWindowSizes.height, width = _getWindowSizes.width;
      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      boundaries = offsets;
    }
  }
  padding = padding || 0;
  var isPaddingNumber = typeof padding === "number";
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
  return boundaries;
}
function getArea(_ref) {
  var width = _ref.width, height = _ref.height;
  return width * height;
}
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
  if (placement.indexOf("auto") === -1) {
    return placement;
  }
  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };
  var sortedAreas = Object.keys(rects).map(function(key) {
    return _extends({
      key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function(a, b) {
    return b.area - a.area;
  });
  var filteredAreas = sortedAreas.filter(function(_ref2) {
    var width = _ref2.width, height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });
  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
  var variation = placement.split("-")[1];
  return computedPlacement + (variation ? "-" + variation : "");
}
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}
function getOuterSizes(element) {
  var window2 = element.ownerDocument.defaultView;
  var styles = window2.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}
function getOppositePlacement(placement) {
  var hash = { left: "right", right: "left", bottom: "top", top: "bottom" };
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split("-")[0];
  var popperRect = getOuterSizes(popper);
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };
  var isHoriz = ["right", "left"].indexOf(placement) !== -1;
  var mainSide = isHoriz ? "top" : "left";
  var secondarySide = isHoriz ? "left" : "top";
  var measurement = isHoriz ? "height" : "width";
  var secondaryMeasurement = !isHoriz ? "height" : "width";
  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }
  return popperOffsets;
}
function find(arr, check) {
  if (Array.prototype.find) {
    return arr.find(check);
  }
  return arr.filter(check)[0];
}
function findIndex(arr, prop, value) {
  if (Array.prototype.findIndex) {
    return arr.findIndex(function(cur) {
      return cur[prop] === value;
    });
  }
  var match = find(arr, function(obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}
function runModifiers(modifiers2, data, ends) {
  var modifiersToRun = ends === void 0 ? modifiers2 : modifiers2.slice(0, findIndex(modifiers2, "name", ends));
  modifiersToRun.forEach(function(modifier) {
    if (modifier["function"]) {
      console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
    }
    var fn = modifier["function"] || modifier.fn;
    if (modifier.enabled && isFunction2(fn)) {
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);
      data = fn(data, modifier);
    }
  });
  return data;
}
function update() {
  if (this.state.isDestroyed) {
    return;
  }
  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);
  data.originalPlacement = data.placement;
  data.positionFixed = this.options.positionFixed;
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute";
  data = runModifiers(this.modifiers, data);
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}
function isModifierEnabled(modifiers2, modifierName) {
  return modifiers2.some(function(_ref) {
    var name = _ref.name, enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}
function getSupportedPropertyName(property) {
  var prefixes = [false, "ms", "Webkit", "Moz", "O"];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? "" + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== "undefined") {
      return toCheck;
    }
  }
  return null;
}
function destroy() {
  this.state.isDestroyed = true;
  if (isModifierEnabled(this.modifiers, "applyStyle")) {
    this.popper.removeAttribute("x-placement");
    this.popper.style.position = "";
    this.popper.style.top = "";
    this.popper.style.left = "";
    this.popper.style.right = "";
    this.popper.style.bottom = "";
    this.popper.style.willChange = "";
    this.popper.style[getSupportedPropertyName("transform")] = "";
  }
  this.disableEventListeners();
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}
function attachToScrollParents(scrollParent2, event, callback, scrollParents) {
  var isBody = scrollParent2.nodeName === "BODY";
  var target = isBody ? scrollParent2.ownerDocument.defaultView : scrollParent2;
  target.addEventListener(event, callback, { passive: true });
  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}
function setupEventListeners(reference, options, state, updateBound) {
  state.updateBound = updateBound;
  getWindow(reference).addEventListener("resize", state.updateBound, { passive: true });
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, "scroll", state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;
  return state;
}
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}
function removeEventListeners(reference, state) {
  getWindow(reference).removeEventListener("resize", state.updateBound);
  state.scrollParents.forEach(function(target) {
    target.removeEventListener("scroll", state.updateBound);
  });
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}
function isNumeric(n) {
  return n !== "" && !isNaN(parseFloat(n)) && isFinite(n);
}
function setStyles(element, styles) {
  Object.keys(styles).forEach(function(prop) {
    var unit = "";
    if (["width", "height", "top", "right", "bottom", "left"].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = "px";
    }
    element.style[prop] = styles[prop] + unit;
  });
}
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function(prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}
function applyStyle(data) {
  setStyles(data.instance.popper, data.styles);
  setAttributes(data.instance.popper, data.attributes);
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }
  return data;
}
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
  popper.setAttribute("x-placement", placement);
  setStyles(popper, { position: options.positionFixed ? "fixed" : "absolute" });
  return options;
}
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
  var round = Math.round, floor = Math.floor;
  var noRound = function noRound2(v) {
    return v;
  };
  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);
  var isVertical = ["left", "right"].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf("-") !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;
  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;
  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}
var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);
function computeStyle(data, options) {
  var x = options.x, y = options.y;
  var popper = data.offsets.popper;
  var legacyGpuAccelerationOption = find(data.instance.modifiers, function(modifier) {
    return modifier.name === "applyStyle";
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== void 0) {
    console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== void 0 ? legacyGpuAccelerationOption : options.gpuAcceleration;
  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);
  var styles = {
    position: popper.position
  };
  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
  var sideA = x === "bottom" ? "top" : "bottom";
  var sideB = y === "right" ? "left" : "right";
  var prefixedProperty = getSupportedPropertyName("transform");
  var left = void 0, top = void 0;
  if (sideA === "bottom") {
    if (offsetParent.nodeName === "HTML") {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === "right") {
    if (offsetParent.nodeName === "HTML") {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = "translate3d(" + left + "px, " + top + "px, 0)";
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = "transform";
  } else {
    var invertTop = sideA === "bottom" ? -1 : 1;
    var invertLeft = sideB === "right" ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ", " + sideB;
  }
  var attributes = {
    "x-placement": data.placement
  };
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
  return data;
}
function isModifierRequired(modifiers2, requestingName, requestedName) {
  var requesting = find(modifiers2, function(_ref) {
    var name = _ref.name;
    return name === requestingName;
  });
  var isRequired = !!requesting && modifiers2.some(function(modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });
  if (!isRequired) {
    var _requesting = "`" + requestingName + "`";
    var requested = "`" + requestedName + "`";
    console.warn(requested + " modifier is required by " + _requesting + " modifier in order to work, be sure to include it before " + _requesting + "!");
  }
  return isRequired;
}
function arrow(data, options) {
  var _data$offsets$arrow;
  if (!isModifierRequired(data.instance.modifiers, "arrow", "keepTogether")) {
    return data;
  }
  var arrowElement = options.element;
  if (typeof arrowElement === "string") {
    arrowElement = data.instance.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return data;
    }
  } else {
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn("WARNING: `arrow.element` must be child of its popper element!");
      return data;
    }
  }
  var placement = data.placement.split("-")[0];
  var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
  var isVertical = ["left", "right"].indexOf(placement) !== -1;
  var len = isVertical ? "height" : "width";
  var sideCapitalized = isVertical ? "Top" : "Left";
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? "left" : "top";
  var opSide = isVertical ? "bottom" : "right";
  var arrowElementSize = getOuterSizes(arrowElement)[len];
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css["margin" + sideCapitalized]);
  var popperBorderSide = parseFloat(css["border" + sideCapitalized + "Width"]);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ""), _data$offsets$arrow);
  return data;
}
function getOppositeVariation(variation) {
  if (variation === "end") {
    return "start";
  } else if (variation === "start") {
    return "end";
  }
  return variation;
}
var placements = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"];
var validPlacements = placements.slice(3);
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}
var BEHAVIORS = {
  FLIP: "flip",
  CLOCKWISE: "clockwise",
  COUNTERCLOCKWISE: "counterclockwise"
};
function flip(data, options) {
  if (isModifierEnabled(data.instance.modifiers, "inner")) {
    return data;
  }
  if (data.flipped && data.placement === data.originalPlacement) {
    return data;
  }
  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
  var placement = data.placement.split("-")[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split("-")[1] || "";
  var flipOrder = [];
  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }
  flipOrder.forEach(function(step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }
    placement = data.placement.split("-")[0];
    placementOpposite = getOppositePlacement(placement);
    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;
    var floor = Math.floor;
    var overlapsRef = placement === "left" && floor(popperOffsets.right) > floor(refOffsets.left) || placement === "right" && floor(popperOffsets.left) < floor(refOffsets.right) || placement === "top" && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === "bottom" && floor(popperOffsets.top) < floor(refOffsets.bottom);
    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
    var overflowsBoundaries = placement === "left" && overflowsLeft || placement === "right" && overflowsRight || placement === "top" && overflowsTop || placement === "bottom" && overflowsBottom;
    var isVertical = ["top", "bottom"].indexOf(placement) !== -1;
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === "start" && overflowsLeft || isVertical && variation === "end" && overflowsRight || !isVertical && variation === "start" && overflowsTop || !isVertical && variation === "end" && overflowsBottom);
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === "start" && overflowsRight || isVertical && variation === "end" && overflowsLeft || !isVertical && variation === "start" && overflowsBottom || !isVertical && variation === "end" && overflowsTop);
    var flippedVariation = flippedVariationByRef || flippedVariationByContent;
    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      data.flipped = true;
      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }
      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }
      data.placement = placement + (variation ? "-" + variation : "");
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
      data = runModifiers(data.instance.modifiers, data, "flip");
    }
  });
  return data;
}
function keepTogether(data) {
  var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
  var placement = data.placement.split("-")[0];
  var floor = Math.floor;
  var isVertical = ["top", "bottom"].indexOf(placement) !== -1;
  var side = isVertical ? "right" : "bottom";
  var opSide = isVertical ? "left" : "top";
  var measurement = isVertical ? "width" : "height";
  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }
  return data;
}
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];
  if (!value) {
    return str;
  }
  if (unit.indexOf("%") === 0) {
    var element = void 0;
    switch (unit) {
      case "%p":
        element = popperOffsets;
        break;
      case "%":
      case "%r":
      default:
        element = referenceOffsets;
    }
    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === "vh" || unit === "vw") {
    var size = void 0;
    if (unit === "vh") {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    return value;
  }
}
function parseOffset(offset2, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];
  var useHeight = ["right", "left"].indexOf(basePlacement) !== -1;
  var fragments = offset2.split(/(\+|\-)/).map(function(frag) {
    return frag.trim();
  });
  var divider = fragments.indexOf(find(fragments, function(frag) {
    return frag.search(/,|\s/) !== -1;
  }));
  if (fragments[divider] && fragments[divider].indexOf(",") === -1) {
    console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
  }
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];
  ops = ops.map(function(op, index) {
    var measurement = (index === 1 ? !useHeight : useHeight) ? "height" : "width";
    var mergeWithPrevious = false;
    return op.reduce(function(a, b) {
      if (a[a.length - 1] === "" && ["+", "-"].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, []).map(function(str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });
  ops.forEach(function(op, index) {
    op.forEach(function(frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === "-" ? -1 : 1);
      }
    });
  });
  return offsets;
}
function offset(data, _ref) {
  var offset2 = _ref.offset;
  var placement = data.placement, _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
  var basePlacement = placement.split("-")[0];
  var offsets = void 0;
  if (isNumeric(+offset2)) {
    offsets = [+offset2, 0];
  } else {
    offsets = parseOffset(offset2, popper, reference, basePlacement);
  }
  if (basePlacement === "left") {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === "right") {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === "top") {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === "bottom") {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }
  data.popper = popper;
  return data;
}
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }
  var transformProp = getSupportedPropertyName("transform");
  var popperStyles = data.instance.popper.style;
  var top = popperStyles.top, left = popperStyles.left, transform = popperStyles[transformProp];
  popperStyles.top = "";
  popperStyles.left = "";
  popperStyles[transformProp] = "";
  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;
  options.boundaries = boundaries;
  var order = options.priority;
  var popper = data.offsets.popper;
  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === "right" ? "left" : "top";
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === "right" ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };
  order.forEach(function(placement) {
    var side = ["left", "top"].indexOf(placement) !== -1 ? "primary" : "secondary";
    popper = _extends({}, popper, check[side](placement));
  });
  data.offsets.popper = popper;
  return data;
}
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split("-")[0];
  var shiftvariation = placement.split("-")[1];
  if (shiftvariation) {
    var _data$offsets = data.offsets, reference = _data$offsets.reference, popper = _data$offsets.popper;
    var isVertical = ["bottom", "top"].indexOf(basePlacement) !== -1;
    var side = isVertical ? "left" : "top";
    var measurement = isVertical ? "width" : "height";
    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };
    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }
  return data;
}
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, "hide", "preventOverflow")) {
    return data;
  }
  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function(modifier) {
    return modifier.name === "preventOverflow";
  }).boundaries;
  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    if (data.hide === true) {
      return data;
    }
    data.hide = true;
    data.attributes["x-out-of-boundaries"] = "";
  } else {
    if (data.hide === false) {
      return data;
    }
    data.hide = false;
    data.attributes["x-out-of-boundaries"] = false;
  }
  return data;
}
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split("-")[0];
  var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
  var isHoriz = ["left", "right"].indexOf(basePlacement) !== -1;
  var subtractLength = ["top", "left"].indexOf(basePlacement) === -1;
  popper[isHoriz ? "left" : "top"] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? "width" : "height"] : 0);
  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);
  return data;
}
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },
  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },
  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ["left", "right", "top", "bottom"],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: "scrollParent"
  },
  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },
  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: "[x-arrow]"
  },
  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: "flip",
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: "viewport",
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },
  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },
  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },
  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: "bottom",
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: "right"
  },
  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: void 0
  }
};
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: "bottom",
  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,
  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,
  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,
  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {
  },
  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {
  },
  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers
};
var Popper = function() {
  function Popper2(reference, popper) {
    var _this = this;
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    classCallCheck(this, Popper2);
    this.scheduleUpdate = function() {
      return requestAnimationFrame(_this.update);
    };
    this.update = debounce(this.update.bind(this));
    this.options = _extends({}, Popper2.Defaults, options);
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper2.Defaults.modifiers, options.modifiers)).forEach(function(name) {
      _this.options.modifiers[name] = _extends({}, Popper2.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });
    this.modifiers = Object.keys(this.options.modifiers).map(function(name) {
      return _extends({
        name
      }, _this.options.modifiers[name]);
    }).sort(function(a, b) {
      return a.order - b.order;
    });
    this.modifiers.forEach(function(modifierOptions) {
      if (modifierOptions.enabled && isFunction2(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });
    this.update();
    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      this.enableEventListeners();
    }
    this.state.eventsEnabled = eventsEnabled;
  }
  createClass(Popper2, [{
    key: "update",
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: "destroy",
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: "enableEventListeners",
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: "disableEventListeners",
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }
    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */
    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */
  }]);
  return Popper2;
}();
Popper.Utils = (typeof window !== "undefined" ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;
var popper_default = Popper;

// node_modules/react-floater/es/index.js
var import_deepmerge = __toESM(require_cjs());

// node_modules/react-floater/node_modules/is-lite/esm/index.js
var DOM_PROPERTIES_TO_CHECK2 = [
  "innerHTML",
  "ownerDocument",
  "style",
  "attributes",
  "nodeValue"
];
var objectTypes2 = [
  "Array",
  "ArrayBuffer",
  "AsyncFunction",
  "AsyncGenerator",
  "AsyncGeneratorFunction",
  "Date",
  "Error",
  "Function",
  "Generator",
  "GeneratorFunction",
  "HTMLElement",
  "Map",
  "Object",
  "Promise",
  "RegExp",
  "Set",
  "WeakMap",
  "WeakSet"
];
var primitiveTypes2 = [
  "bigint",
  "boolean",
  "null",
  "number",
  "string",
  "symbol",
  "undefined"
];
function getObjectType2(value) {
  var objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
  if (/HTML\w+Element/.test(objectTypeName)) {
    return "HTMLElement";
  }
  if (isObjectType2(objectTypeName)) {
    return objectTypeName;
  }
  return void 0;
}
function isObjectOfType2(type) {
  return function(value) {
    return getObjectType2(value) === type;
  };
}
function isObjectType2(name) {
  return objectTypes2.includes(name);
}
function isOfType3(type) {
  return function(value) {
    return typeof value === type;
  };
}
function isPrimitiveType2(name) {
  return primitiveTypes2.includes(name);
}
function is2(value) {
  if (value === null) {
    return "null";
  }
  switch (typeof value) {
    case "bigint":
      return "bigint";
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "string":
      return "string";
    case "symbol":
      return "symbol";
    case "undefined":
      return "undefined";
    default:
  }
  if (is2.array(value)) {
    return "Array";
  }
  if (is2.plainFunction(value)) {
    return "Function";
  }
  var tagType = getObjectType2(value);
  if (tagType) {
    return tagType;
  }
  return "Object";
}
is2.array = Array.isArray;
is2.arrayOf = function(target, predicate) {
  if (!is2.array(target) && !is2.function(predicate)) {
    return false;
  }
  return target.every(function(d) {
    return predicate(d);
  });
};
is2.asyncGeneratorFunction = function(value) {
  return getObjectType2(value) === "AsyncGeneratorFunction";
};
is2.asyncFunction = isObjectOfType2("AsyncFunction");
is2.bigint = isOfType3("bigint");
is2.boolean = function(value) {
  return value === true || value === false;
};
is2.date = isObjectOfType2("Date");
is2.defined = function(value) {
  return !is2.undefined(value);
};
is2.domElement = function(value) {
  return is2.object(value) && !is2.plainObject(value) && value.nodeType === 1 && is2.string(value.nodeName) && DOM_PROPERTIES_TO_CHECK2.every(function(property) {
    return property in value;
  });
};
is2.empty = function(value) {
  return is2.string(value) && value.length === 0 || is2.array(value) && value.length === 0 || is2.object(value) && !is2.map(value) && !is2.set(value) && Object.keys(value).length === 0 || is2.set(value) && value.size === 0 || is2.map(value) && value.size === 0;
};
is2.error = isObjectOfType2("Error");
is2.function = isOfType3("function");
is2.generator = function(value) {
  return is2.iterable(value) && is2.function(value.next) && is2.function(value.throw);
};
is2.generatorFunction = isObjectOfType2("GeneratorFunction");
is2.instanceOf = function(instance, class_) {
  if (!instance || !class_) {
    return false;
  }
  return Object.getPrototypeOf(instance) === class_.prototype;
};
is2.iterable = function(value) {
  return !is2.nullOrUndefined(value) && is2.function(value[Symbol.iterator]);
};
is2.map = isObjectOfType2("Map");
is2.nan = function(value) {
  return Number.isNaN(value);
};
is2.null = function(value) {
  return value === null;
};
is2.nullOrUndefined = function(value) {
  return is2.null(value) || is2.undefined(value);
};
is2.number = function(value) {
  return isOfType3("number")(value) && !is2.nan(value);
};
is2.numericString = function(value) {
  return is2.string(value) && value.length > 0 && !Number.isNaN(Number(value));
};
is2.object = function(value) {
  return !is2.nullOrUndefined(value) && (is2.function(value) || typeof value === "object");
};
is2.oneOf = function(target, value) {
  if (!is2.array(target)) {
    return false;
  }
  return target.indexOf(value) > -1;
};
is2.plainFunction = isObjectOfType2("Function");
is2.plainObject = function(value) {
  if (getObjectType2(value) !== "Object") {
    return false;
  }
  var prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.getPrototypeOf({});
};
is2.primitive = function(value) {
  return is2.null(value) || isPrimitiveType2(typeof value);
};
is2.promise = isObjectOfType2("Promise");
is2.propertyOf = function(target, key, predicate) {
  if (!is2.object(target) || !key) {
    return false;
  }
  var value = target[key];
  if (is2.function(predicate)) {
    return predicate(value);
  }
  return is2.defined(value);
};
is2.regexp = isObjectOfType2("RegExp");
is2.set = isObjectOfType2("Set");
is2.string = isOfType3("string");
is2.symbol = isOfType3("symbol");
is2.undefined = isOfType3("undefined");
is2.weakMap = isObjectOfType2("WeakMap");
is2.weakSet = isObjectOfType2("WeakSet");
var esm_default = is2;

// node_modules/react-floater/node_modules/@gilbarbara/deep-equal/esm/helpers.js
function isOfType4(type) {
  return function(value) {
    return typeof value === type;
  };
}
var isFunction3 = isOfType4("function");
var isNull2 = function(value) {
  return value === null;
};
var isRegex2 = function(value) {
  return Object.prototype.toString.call(value).slice(8, -1) === "RegExp";
};
var isObject2 = function(value) {
  return !isUndefined2(value) && !isNull2(value) && (isFunction3(value) || typeof value === "object");
};
var isUndefined2 = isOfType4("undefined");

// node_modules/react-floater/node_modules/@gilbarbara/deep-equal/esm/index.js
var __values = function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
function equalArray2(left, right) {
  var length = left.length;
  if (length !== right.length) {
    return false;
  }
  for (var index = length; index-- !== 0; ) {
    if (!equal2(left[index], right[index])) {
      return false;
    }
  }
  return true;
}
function equalArrayBuffer2(left, right) {
  if (left.byteLength !== right.byteLength) {
    return false;
  }
  var view1 = new DataView(left.buffer);
  var view2 = new DataView(right.buffer);
  var index = left.byteLength;
  while (index--) {
    if (view1.getUint8(index) !== view2.getUint8(index)) {
      return false;
    }
  }
  return true;
}
function equalMap2(left, right) {
  var e_1, _a, e_2, _b;
  if (left.size !== right.size) {
    return false;
  }
  try {
    for (var _c = __values(left.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
      var index = _d.value;
      if (!right.has(index[0])) {
        return false;
      }
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  try {
    for (var _e = __values(left.entries()), _f = _e.next(); !_f.done; _f = _e.next()) {
      var index = _f.value;
      if (!equal2(index[1], right.get(index[0]))) {
        return false;
      }
    }
  } catch (e_2_1) {
    e_2 = { error: e_2_1 };
  } finally {
    try {
      if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
    } finally {
      if (e_2) throw e_2.error;
    }
  }
  return true;
}
function equalSet2(left, right) {
  var e_3, _a;
  if (left.size !== right.size) {
    return false;
  }
  try {
    for (var _b = __values(left.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
      var index = _c.value;
      if (!right.has(index[0])) {
        return false;
      }
    }
  } catch (e_3_1) {
    e_3 = { error: e_3_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    } finally {
      if (e_3) throw e_3.error;
    }
  }
  return true;
}
function equal2(left, right) {
  if (left === right) {
    return true;
  }
  if (left && isObject2(left) && right && isObject2(right)) {
    if (left.constructor !== right.constructor) {
      return false;
    }
    if (Array.isArray(left) && Array.isArray(right)) {
      return equalArray2(left, right);
    }
    if (left instanceof Map && right instanceof Map) {
      return equalMap2(left, right);
    }
    if (left instanceof Set && right instanceof Set) {
      return equalSet2(left, right);
    }
    if (ArrayBuffer.isView(left) && ArrayBuffer.isView(right)) {
      return equalArrayBuffer2(left, right);
    }
    if (isRegex2(left) && isRegex2(right)) {
      return left.source === right.source && left.flags === right.flags;
    }
    if (left.valueOf !== Object.prototype.valueOf) {
      return left.valueOf() === right.valueOf();
    }
    if (left.toString !== Object.prototype.toString) {
      return left.toString() === right.toString();
    }
    var leftKeys = Object.keys(left);
    var rightKeys = Object.keys(right);
    if (leftKeys.length !== rightKeys.length) {
      return false;
    }
    for (var index = leftKeys.length; index-- !== 0; ) {
      if (!Object.prototype.hasOwnProperty.call(right, leftKeys[index])) {
        return false;
      }
    }
    for (var index = leftKeys.length; index-- !== 0; ) {
      var key = leftKeys[index];
      if (key === "_owner" && left.$$typeof) {
        continue;
      }
      if (!equal2(left[key], right[key])) {
        return false;
      }
    }
    return true;
  }
  if (Number.isNaN(left) && Number.isNaN(right)) {
    return true;
  }
  return left === right;
}

// node_modules/react-floater/node_modules/tree-changes/esm/helpers.js
function canHaveLength2() {
  var arguments_ = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    arguments_[_i] = arguments[_i];
  }
  return arguments_.every(function(d) {
    return esm_default.string(d) || esm_default.array(d) || esm_default.plainObject(d);
  });
}
function checkEquality2(left, right, value) {
  if (!isSameType2(left, right)) {
    return false;
  }
  if ([left, right].every(esm_default.array)) {
    return !left.some(hasValue2(value)) && right.some(hasValue2(value));
  }
  if ([left, right].every(esm_default.plainObject)) {
    return !Object.entries(left).some(hasEntry2(value)) && Object.entries(right).some(hasEntry2(value));
  }
  return right === value;
}
function compareNumbers2(previousData, data, options) {
  var actual = options.actual, key = options.key, previous = options.previous, type = options.type;
  var left = nested2(previousData, key);
  var right = nested2(data, key);
  var changed = [left, right].every(esm_default.number) && (type === "increased" ? left < right : left > right);
  if (!esm_default.undefined(actual)) {
    changed = changed && right === actual;
  }
  if (!esm_default.undefined(previous)) {
    changed = changed && left === previous;
  }
  return changed;
}
function compareValues2(previousData, data, options) {
  var key = options.key, type = options.type, value = options.value;
  var left = nested2(previousData, key);
  var right = nested2(data, key);
  var primary = type === "added" ? left : right;
  var secondary = type === "added" ? right : left;
  if (!esm_default.nullOrUndefined(value)) {
    if (esm_default.defined(primary)) {
      if (esm_default.array(primary) || esm_default.plainObject(primary)) {
        return checkEquality2(primary, secondary, value);
      }
    } else {
      return equal2(secondary, value);
    }
    return false;
  }
  if ([left, right].every(esm_default.array)) {
    return !secondary.every(isEqualPredicate2(primary));
  }
  if ([left, right].every(esm_default.plainObject)) {
    return hasExtraKeys2(Object.keys(primary), Object.keys(secondary));
  }
  return ![left, right].every(function(d) {
    return esm_default.primitive(d) && esm_default.defined(d);
  }) && (type === "added" ? !esm_default.defined(left) && esm_default.defined(right) : esm_default.defined(left) && !esm_default.defined(right));
}
function getIterables2(previousData, data, _a) {
  var _b = _a === void 0 ? {} : _a, key = _b.key;
  var left = nested2(previousData, key);
  var right = nested2(data, key);
  if (!isSameType2(left, right)) {
    throw new TypeError("Inputs have different types");
  }
  if (!canHaveLength2(left, right)) {
    throw new TypeError("Inputs don't have length");
  }
  if ([left, right].every(esm_default.plainObject)) {
    left = Object.keys(left);
    right = Object.keys(right);
  }
  return [left, right];
}
function hasEntry2(input) {
  return function(_a) {
    var key = _a[0], value = _a[1];
    if (esm_default.array(input)) {
      return equal2(input, value) || input.some(function(d) {
        return equal2(d, value) || esm_default.array(value) && isEqualPredicate2(value)(d);
      });
    }
    if (esm_default.plainObject(input) && input[key]) {
      return !!input[key] && equal2(input[key], value);
    }
    return equal2(input, value);
  };
}
function hasExtraKeys2(left, right) {
  return right.some(function(d) {
    return !left.includes(d);
  });
}
function hasValue2(input) {
  return function(value) {
    if (esm_default.array(input)) {
      return input.some(function(d) {
        return equal2(d, value) || esm_default.array(value) && isEqualPredicate2(value)(d);
      });
    }
    return equal2(input, value);
  };
}
function includesOrEqualsTo2(previousValue, value) {
  return esm_default.array(previousValue) ? previousValue.some(function(d) {
    return equal2(d, value);
  }) : equal2(previousValue, value);
}
function isEqualPredicate2(data) {
  return function(value) {
    return data.some(function(d) {
      return equal2(d, value);
    });
  };
}
function isSameType2() {
  var arguments_ = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    arguments_[_i] = arguments[_i];
  }
  return arguments_.every(esm_default.array) || arguments_.every(esm_default.number) || arguments_.every(esm_default.plainObject) || arguments_.every(esm_default.string);
}
function nested2(data, property) {
  if (esm_default.plainObject(data) || esm_default.array(data)) {
    if (esm_default.string(property)) {
      var props = property.split(".");
      return props.reduce(function(acc, d) {
        return acc && acc[d];
      }, data);
    }
    if (esm_default.number(property)) {
      return data[property];
    }
    return data;
  }
  return data;
}

// node_modules/react-floater/node_modules/tree-changes/esm/index.js
function treeChanges2(previousData, data) {
  if ([previousData, data].some(esm_default.nullOrUndefined)) {
    throw new Error("Missing required parameters");
  }
  if (![previousData, data].every(function(d) {
    return esm_default.plainObject(d) || esm_default.array(d);
  })) {
    throw new Error("Expected plain objects or array");
  }
  var added = function(key, value) {
    try {
      return compareValues2(previousData, data, { key, type: "added", value });
    } catch (_a) {
      return false;
    }
  };
  var changed = function(key, actual, previous) {
    try {
      var left = nested2(previousData, key);
      var right = nested2(data, key);
      var hasActual = esm_default.defined(actual);
      var hasPrevious = esm_default.defined(previous);
      if (hasActual || hasPrevious) {
        var leftComparator = hasPrevious ? includesOrEqualsTo2(previous, left) : !includesOrEqualsTo2(actual, left);
        var rightComparator = includesOrEqualsTo2(actual, right);
        return leftComparator && rightComparator;
      }
      if ([left, right].every(esm_default.array) || [left, right].every(esm_default.plainObject)) {
        return !equal2(left, right);
      }
      return left !== right;
    } catch (_a) {
      return false;
    }
  };
  var changedFrom = function(key, previous, actual) {
    if (!esm_default.defined(key)) {
      return false;
    }
    try {
      var left = nested2(previousData, key);
      var right = nested2(data, key);
      var hasActual = esm_default.defined(actual);
      return includesOrEqualsTo2(previous, left) && (hasActual ? includesOrEqualsTo2(actual, right) : !hasActual);
    } catch (_a) {
      return false;
    }
  };
  var changedTo = function(key, actual) {
    if (!esm_default.defined(key)) {
      return false;
    }
    if (true) {
      console.warn("`changedTo` is deprecated! Replace it with `change`");
    }
    return changed(key, actual);
  };
  var decreased = function(key, actual, previous) {
    if (!esm_default.defined(key)) {
      return false;
    }
    try {
      return compareNumbers2(previousData, data, { key, actual, previous, type: "decreased" });
    } catch (_a) {
      return false;
    }
  };
  var emptied = function(key) {
    try {
      var _a = getIterables2(previousData, data, { key }), left = _a[0], right = _a[1];
      return !!left.length && !right.length;
    } catch (_b) {
      return false;
    }
  };
  var filled = function(key) {
    try {
      var _a = getIterables2(previousData, data, { key }), left = _a[0], right = _a[1];
      return !left.length && !!right.length;
    } catch (_b) {
      return false;
    }
  };
  var increased = function(key, actual, previous) {
    if (!esm_default.defined(key)) {
      return false;
    }
    try {
      return compareNumbers2(previousData, data, { key, actual, previous, type: "increased" });
    } catch (_a) {
      return false;
    }
  };
  var removed = function(key, value) {
    try {
      return compareValues2(previousData, data, { key, type: "removed", value });
    } catch (_a) {
      return false;
    }
  };
  return { added, changed, changedFrom, changedTo, decreased, emptied, filled, increased, removed };
}

// node_modules/react-floater/es/index.js
var import_react_dom = __toESM(require_react_dom());
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
var DEFAULTS = { flip: { padding: 20 }, preventOverflow: { padding: 10 } };
var VALIDATOR_ARG_ERROR_MESSAGE = "The typeValidator argument must be a function with the signature function(props, propName, componentName).";
var MESSAGE_ARG_ERROR_MESSAGE = "The error message is optional, but must be a string if provided.";
function propIsRequired(condition, props, propName, componentName) {
  if (typeof condition === "boolean") {
    return condition;
  }
  if (typeof condition === "function") {
    return condition(props, propName, componentName);
  }
  if (Boolean(condition) === true) {
    return Boolean(condition);
  }
  return false;
}
function propExists(props, propName) {
  return Object.hasOwnProperty.call(props, propName);
}
function missingPropError(props, propName, componentName, message) {
  if (message) {
    return new Error(message);
  }
  return new Error("Required ".concat(props[propName], " `").concat(propName, "` was not specified in `").concat(componentName, "`."));
}
function guardAgainstInvalidArgTypes(typeValidator, message) {
  if (typeof typeValidator !== "function") {
    throw new TypeError(VALIDATOR_ARG_ERROR_MESSAGE);
  }
  if (Boolean(message) && typeof message !== "string") {
    throw new TypeError(MESSAGE_ARG_ERROR_MESSAGE);
  }
}
function isRequiredIf(typeValidator, condition, message) {
  guardAgainstInvalidArgTypes(typeValidator, message);
  return function(props, propName, componentName) {
    for (var _len = arguments.length, rest = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      rest[_key - 3] = arguments[_key];
    }
    if (propIsRequired(condition, props, propName, componentName)) {
      if (propExists(props, propName)) {
        return typeValidator.apply(void 0, [props, propName, componentName].concat(rest));
      }
      return missingPropError(props, propName, componentName, message);
    }
    return typeValidator.apply(void 0, [props, propName, componentName].concat(rest));
  };
}
var STATUS = { INIT: "init", IDLE: "idle", OPENING: "opening", OPEN: "open", CLOSING: "closing", ERROR: "error" };
var isReact16 = import_react_dom.default.createPortal !== void 0;
function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
function isMobile() {
  return "ontouchstart" in window && /Mobi/.test(navigator.userAgent);
}
function log(_ref) {
  var title = _ref.title, data = _ref.data, _ref$warn = _ref.warn, warn = _ref$warn === void 0 ? false : _ref$warn, _ref$debug = _ref.debug, debug = _ref$debug === void 0 ? false : _ref$debug;
  var logFn = warn ? console.warn || console.error : console.log;
  if (debug && title && data) {
    console.groupCollapsed("%creact-floater: ".concat(title), "color: #9b00ff; font-weight: bold; font-size: 12px;");
    if (Array.isArray(data)) {
      data.forEach(function(d) {
        if (esm_default.plainObject(d) && d.key) {
          logFn.apply(console, [d.key, d.value]);
        } else {
          logFn.apply(console, [d]);
        }
      });
    } else {
      logFn.apply(console, [data]);
    }
    console.groupEnd();
  }
}
function on(element, event, cb) {
  var capture = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  element.addEventListener(event, cb, capture);
}
function off(element, event, cb) {
  var capture = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  element.removeEventListener(event, cb, capture);
}
function once(element, event, cb) {
  var capture = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  var _nextCB;
  _nextCB = function nextCB(e) {
    cb(e);
    off(element, event, _nextCB);
  };
  on(element, event, _nextCB, capture);
}
function noop() {
}
var ReactFloaterPortal = function(_React$Component) {
  _inherits(ReactFloaterPortal2, _React$Component);
  var _super = _createSuper(ReactFloaterPortal2);
  function ReactFloaterPortal2() {
    _classCallCheck(this, ReactFloaterPortal2);
    return _super.apply(this, arguments);
  }
  _createClass(ReactFloaterPortal2, [{ key: "componentDidMount", value: function componentDidMount() {
    if (!canUseDOM()) return;
    if (!this.node) {
      this.appendNode();
    }
    if (!isReact16) {
      this.renderPortal();
    }
  } }, { key: "componentDidUpdate", value: function componentDidUpdate() {
    if (!canUseDOM()) return;
    if (!isReact16) {
      this.renderPortal();
    }
  } }, { key: "componentWillUnmount", value: function componentWillUnmount() {
    if (!canUseDOM() || !this.node) return;
    if (!isReact16) {
      import_react_dom.default.unmountComponentAtNode(this.node);
    }
    if (this.node && this.node.parentNode === document.body) {
      document.body.removeChild(this.node);
      this.node = void 0;
    }
  } }, { key: "appendNode", value: function appendNode() {
    var _this$props = this.props, id = _this$props.id, zIndex = _this$props.zIndex;
    if (!this.node) {
      this.node = document.createElement("div");
      if (id) {
        this.node.id = id;
      }
      if (zIndex) {
        this.node.style.zIndex = zIndex;
      }
      document.body.appendChild(this.node);
    }
  } }, { key: "renderPortal", value: function renderPortal() {
    if (!canUseDOM()) return null;
    var _this$props2 = this.props, children = _this$props2.children, setRef = _this$props2.setRef;
    if (!this.node) {
      this.appendNode();
    }
    if (isReact16) {
      return import_react_dom.default.createPortal(children, this.node);
    }
    var portal = import_react_dom.default.unstable_renderSubtreeIntoContainer(this, children.length > 1 ? import_react.default.createElement("div", null, children) : children[0], this.node);
    setRef(portal);
    return null;
  } }, { key: "renderReact16", value: function renderReact16() {
    var _this$props3 = this.props, hasChildren = _this$props3.hasChildren, placement = _this$props3.placement, target = _this$props3.target;
    if (!hasChildren) {
      if (target || placement === "center") {
        return this.renderPortal();
      }
      return null;
    }
    return this.renderPortal();
  } }, { key: "render", value: function render() {
    if (!isReact16) {
      return null;
    }
    return this.renderReact16();
  } }]);
  return ReactFloaterPortal2;
}(import_react.default.Component);
_defineProperty(ReactFloaterPortal, "propTypes", { children: import_prop_types.default.oneOfType([import_prop_types.default.element, import_prop_types.default.array]), hasChildren: import_prop_types.default.bool, id: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number]), placement: import_prop_types.default.string, setRef: import_prop_types.default.func.isRequired, target: import_prop_types.default.oneOfType([import_prop_types.default.object, import_prop_types.default.string]), zIndex: import_prop_types.default.number });
var FloaterArrow = function(_React$Component) {
  _inherits(FloaterArrow2, _React$Component);
  var _super = _createSuper(FloaterArrow2);
  function FloaterArrow2() {
    _classCallCheck(this, FloaterArrow2);
    return _super.apply(this, arguments);
  }
  _createClass(FloaterArrow2, [{ key: "parentStyle", get: function get() {
    var _this$props = this.props, placement = _this$props.placement, styles = _this$props.styles;
    var length = styles.arrow.length;
    var arrow2 = { pointerEvents: "none", position: "absolute", width: "100%" };
    if (placement.startsWith("top")) {
      arrow2.bottom = 0;
      arrow2.left = 0;
      arrow2.right = 0;
      arrow2.height = length;
    } else if (placement.startsWith("bottom")) {
      arrow2.left = 0;
      arrow2.right = 0;
      arrow2.top = 0;
      arrow2.height = length;
    } else if (placement.startsWith("left")) {
      arrow2.right = 0;
      arrow2.top = 0;
      arrow2.bottom = 0;
    } else if (placement.startsWith("right")) {
      arrow2.left = 0;
      arrow2.top = 0;
    }
    return arrow2;
  } }, { key: "render", value: function render() {
    var _this$props2 = this.props, placement = _this$props2.placement, setArrowRef = _this$props2.setArrowRef, styles = _this$props2.styles;
    var _styles$arrow = styles.arrow, color = _styles$arrow.color, display = _styles$arrow.display, length = _styles$arrow.length, margin = _styles$arrow.margin, position = _styles$arrow.position, spread = _styles$arrow.spread;
    var arrowStyles = { display, position };
    var points;
    var x = spread;
    var y = length;
    if (placement.startsWith("top")) {
      points = "0,0 ".concat(x / 2, ",").concat(y, " ").concat(x, ",0");
      arrowStyles.bottom = 0;
      arrowStyles.marginLeft = margin;
      arrowStyles.marginRight = margin;
    } else if (placement.startsWith("bottom")) {
      points = "".concat(x, ",").concat(y, " ").concat(x / 2, ",0 0,").concat(y);
      arrowStyles.top = 0;
      arrowStyles.marginLeft = margin;
      arrowStyles.marginRight = margin;
    } else if (placement.startsWith("left")) {
      y = spread;
      x = length;
      points = "0,0 ".concat(x, ",").concat(y / 2, " 0,").concat(y);
      arrowStyles.right = 0;
      arrowStyles.marginTop = margin;
      arrowStyles.marginBottom = margin;
    } else if (placement.startsWith("right")) {
      y = spread;
      x = length;
      points = "".concat(x, ",").concat(y, " ").concat(x, ",0 0,").concat(y / 2);
      arrowStyles.left = 0;
      arrowStyles.marginTop = margin;
      arrowStyles.marginBottom = margin;
    }
    return import_react.default.createElement("div", { className: "__floater__arrow", style: this.parentStyle }, import_react.default.createElement("span", { ref: setArrowRef, style: arrowStyles }, import_react.default.createElement("svg", { width: x, height: y, version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, import_react.default.createElement("polygon", { points, fill: color }))));
  } }]);
  return FloaterArrow2;
}(import_react.default.Component);
_defineProperty(FloaterArrow, "propTypes", { placement: import_prop_types.default.string.isRequired, setArrowRef: import_prop_types.default.func.isRequired, styles: import_prop_types.default.object.isRequired });
var _excluded$1 = ["color", "height", "width"];
function FloaterCloseBtn(_ref) {
  var handleClick = _ref.handleClick, styles = _ref.styles;
  var color = styles.color, height = styles.height, width = styles.width, style = _objectWithoutProperties(styles, _excluded$1);
  return import_react.default.createElement("button", { "aria-label": "close", onClick: handleClick, style, type: "button" }, import_react.default.createElement("svg", { width: "".concat(width, "px"), height: "".concat(height, "px"), viewBox: "0 0 18 18", version: "1.1", xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMid" }, import_react.default.createElement("g", null, import_react.default.createElement("path", { d: "M8.13911129,9.00268191 L0.171521827,17.0258467 C-0.0498027049,17.248715 -0.0498027049,17.6098394 0.171521827,17.8327545 C0.28204354,17.9443526 0.427188206,17.9998706 0.572051765,17.9998706 C0.71714958,17.9998706 0.862013139,17.9443526 0.972581703,17.8327545 L9.0000937,9.74924618 L17.0276057,17.8327545 C17.1384085,17.9443526 17.2832721,17.9998706 17.4281356,17.9998706 C17.5729992,17.9998706 17.718097,17.9443526 17.8286656,17.8327545 C18.0499901,17.6098862 18.0499901,17.2487618 17.8286656,17.0258467 L9.86135722,9.00268191 L17.8340066,0.973848225 C18.0553311,0.750979934 18.0553311,0.389855532 17.8340066,0.16694039 C17.6126821,-0.0556467968 17.254037,-0.0556467968 17.0329467,0.16694039 L9.00042166,8.25611765 L0.967006424,0.167268345 C0.745681892,-0.0553188426 0.387317931,-0.0553188426 0.165993399,0.167268345 C-0.0553311331,0.390136635 -0.0553311331,0.751261038 0.165993399,0.974176179 L8.13920499,9.00268191 L8.13911129,9.00268191 Z", fill: color }))));
}
FloaterCloseBtn.propTypes = { handleClick: import_prop_types.default.func.isRequired, styles: import_prop_types.default.object.isRequired };
function FloaterContainer(_ref) {
  var content = _ref.content, footer = _ref.footer, handleClick = _ref.handleClick, open = _ref.open, positionWrapper = _ref.positionWrapper, showCloseButton = _ref.showCloseButton, title = _ref.title, styles = _ref.styles;
  var output = { content: import_react.default.isValidElement(content) ? content : import_react.default.createElement("div", { className: "__floater__content", style: styles.content }, content) };
  if (title) {
    output.title = import_react.default.isValidElement(title) ? title : import_react.default.createElement("div", { className: "__floater__title", style: styles.title }, title);
  }
  if (footer) {
    output.footer = import_react.default.isValidElement(footer) ? footer : import_react.default.createElement("div", { className: "__floater__footer", style: styles.footer }, footer);
  }
  if ((showCloseButton || positionWrapper) && !esm_default["boolean"](open)) {
    output.close = import_react.default.createElement(FloaterCloseBtn, { styles: styles.close, handleClick });
  }
  return import_react.default.createElement("div", { className: "__floater__container", style: styles.container }, output.close, output.title, output.content, output.footer);
}
FloaterContainer.propTypes = { content: import_prop_types.default.node.isRequired, footer: import_prop_types.default.node, handleClick: import_prop_types.default.func.isRequired, open: import_prop_types.default.bool, positionWrapper: import_prop_types.default.bool.isRequired, showCloseButton: import_prop_types.default.bool.isRequired, styles: import_prop_types.default.object.isRequired, title: import_prop_types.default.node };
var Floater = function(_React$Component) {
  _inherits(Floater2, _React$Component);
  var _super = _createSuper(Floater2);
  function Floater2() {
    _classCallCheck(this, Floater2);
    return _super.apply(this, arguments);
  }
  _createClass(Floater2, [{ key: "style", get: function get() {
    var _this$props = this.props, disableAnimation = _this$props.disableAnimation, component = _this$props.component, placement = _this$props.placement, hideArrow = _this$props.hideArrow, status = _this$props.status, styles = _this$props.styles;
    var length = styles.arrow.length, floater = styles.floater, floaterCentered = styles.floaterCentered, floaterClosing = styles.floaterClosing, floaterOpening = styles.floaterOpening, floaterWithAnimation = styles.floaterWithAnimation, floaterWithComponent = styles.floaterWithComponent;
    var element = {};
    if (!hideArrow) {
      if (placement.startsWith("top")) {
        element.padding = "0 0 ".concat(length, "px");
      } else if (placement.startsWith("bottom")) {
        element.padding = "".concat(length, "px 0 0");
      } else if (placement.startsWith("left")) {
        element.padding = "0 ".concat(length, "px 0 0");
      } else if (placement.startsWith("right")) {
        element.padding = "0 0 0 ".concat(length, "px");
      }
    }
    if ([STATUS.OPENING, STATUS.OPEN].indexOf(status) !== -1) {
      element = _objectSpread2(_objectSpread2({}, element), floaterOpening);
    }
    if (status === STATUS.CLOSING) {
      element = _objectSpread2(_objectSpread2({}, element), floaterClosing);
    }
    if (status === STATUS.OPEN && !disableAnimation) {
      element = _objectSpread2(_objectSpread2({}, element), floaterWithAnimation);
    }
    if (placement === "center") {
      element = _objectSpread2(_objectSpread2({}, element), floaterCentered);
    }
    if (component) {
      element = _objectSpread2(_objectSpread2({}, element), floaterWithComponent);
    }
    return _objectSpread2(_objectSpread2({}, floater), element);
  } }, { key: "render", value: function render() {
    var _this$props2 = this.props, component = _this$props2.component, closeFn = _this$props2.handleClick, hideArrow = _this$props2.hideArrow, setFloaterRef = _this$props2.setFloaterRef, status = _this$props2.status;
    var output = {};
    var classes = ["__floater"];
    if (component) {
      if (import_react.default.isValidElement(component)) {
        output.content = import_react.default.cloneElement(component, { closeFn });
      } else {
        output.content = component({ closeFn });
      }
    } else {
      output.content = import_react.default.createElement(FloaterContainer, this.props);
    }
    if (status === STATUS.OPEN) {
      classes.push("__floater__open");
    }
    if (!hideArrow) {
      output.arrow = import_react.default.createElement(FloaterArrow, this.props);
    }
    return import_react.default.createElement("div", { ref: setFloaterRef, className: classes.join(" "), style: this.style }, import_react.default.createElement("div", { className: "__floater__body" }, output.content, output.arrow));
  } }]);
  return Floater2;
}(import_react.default.Component);
_defineProperty(Floater, "propTypes", { component: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.element]), content: import_prop_types.default.node, disableAnimation: import_prop_types.default.bool.isRequired, footer: import_prop_types.default.node, handleClick: import_prop_types.default.func.isRequired, hideArrow: import_prop_types.default.bool.isRequired, open: import_prop_types.default.bool, placement: import_prop_types.default.string.isRequired, positionWrapper: import_prop_types.default.bool.isRequired, setArrowRef: import_prop_types.default.func.isRequired, setFloaterRef: import_prop_types.default.func.isRequired, showCloseButton: import_prop_types.default.bool, status: import_prop_types.default.string.isRequired, styles: import_prop_types.default.object.isRequired, title: import_prop_types.default.node });
var ReactFloaterWrapper = function(_React$Component) {
  _inherits(ReactFloaterWrapper2, _React$Component);
  var _super = _createSuper(ReactFloaterWrapper2);
  function ReactFloaterWrapper2() {
    _classCallCheck(this, ReactFloaterWrapper2);
    return _super.apply(this, arguments);
  }
  _createClass(ReactFloaterWrapper2, [{ key: "render", value: function render() {
    var _this$props = this.props, children = _this$props.children, handleClick = _this$props.handleClick, handleMouseEnter = _this$props.handleMouseEnter, handleMouseLeave = _this$props.handleMouseLeave, setChildRef = _this$props.setChildRef, setWrapperRef = _this$props.setWrapperRef, style = _this$props.style, styles = _this$props.styles;
    var element;
    if (children) {
      if (import_react.default.Children.count(children) === 1) {
        if (!import_react.default.isValidElement(children)) {
          element = import_react.default.createElement("span", null, children);
        } else {
          var refProp = esm_default["function"](children.type) ? "innerRef" : "ref";
          element = import_react.default.cloneElement(import_react.default.Children.only(children), _defineProperty({}, refProp, setChildRef));
        }
      } else {
        element = children;
      }
    }
    if (!element) {
      return null;
    }
    return import_react.default.createElement("span", { ref: setWrapperRef, style: _objectSpread2(_objectSpread2({}, styles), style), onClick: handleClick, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }, element);
  } }]);
  return ReactFloaterWrapper2;
}(import_react.default.Component);
_defineProperty(ReactFloaterWrapper, "propTypes", { children: import_prop_types.default.node, handleClick: import_prop_types.default.func.isRequired, handleMouseEnter: import_prop_types.default.func.isRequired, handleMouseLeave: import_prop_types.default.func.isRequired, setChildRef: import_prop_types.default.func.isRequired, setWrapperRef: import_prop_types.default.func.isRequired, style: import_prop_types.default.object, styles: import_prop_types.default.object.isRequired });
var defaultOptions = { zIndex: 100 };
function getStyles(styles) {
  var options = (0, import_deepmerge.default)(defaultOptions, styles.options || {});
  return { wrapper: { cursor: "help", display: "inline-flex", flexDirection: "column", zIndex: options.zIndex }, wrapperPosition: { left: -1e3, position: "absolute", top: -1e3, visibility: "hidden" }, floater: { display: "inline-block", filter: "drop-shadow(0 0 3px rgba(0, 0, 0, 0.3))", maxWidth: 300, opacity: 0, position: "relative", transition: "opacity 0.3s", visibility: "hidden", zIndex: options.zIndex }, floaterOpening: { opacity: 1, visibility: "visible" }, floaterWithAnimation: { opacity: 1, transition: "opacity 0.3s, transform 0.2s", visibility: "visible" }, floaterWithComponent: { maxWidth: "100%" }, floaterClosing: { opacity: 0, visibility: "visible" }, floaterCentered: { left: "50%", position: "fixed", top: "50%", transform: "translate(-50%, -50%)" }, container: { backgroundColor: "#fff", color: "#666", minHeight: 60, minWidth: 200, padding: 20, position: "relative", zIndex: 10 }, title: { borderBottom: "1px solid #555", color: "#555", fontSize: 18, marginBottom: 5, paddingBottom: 6, paddingRight: 18 }, content: { fontSize: 15 }, close: { backgroundColor: "transparent", border: 0, borderRadius: 0, color: "#555", fontSize: 0, height: 15, outline: "none", padding: 10, position: "absolute", right: 0, top: 0, width: 15, WebkitAppearance: "none" }, footer: { borderTop: "1px solid #ccc", fontSize: 13, marginTop: 10, paddingTop: 5 }, arrow: { color: "#fff", display: "inline-flex", length: 16, margin: 8, position: "absolute", spread: 32 }, options };
}
var _excluded = ["arrow", "flip", "offset"];
var POSITIONING_PROPS = ["position", "top", "right", "bottom", "left"];
var ReactFloater = function(_React$Component) {
  _inherits(ReactFloater2, _React$Component);
  var _super = _createSuper(ReactFloater2);
  function ReactFloater2(props) {
    var _this;
    _classCallCheck(this, ReactFloater2);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "setArrowRef", function(ref) {
      _this.arrowRef = ref;
    });
    _defineProperty(_assertThisInitialized(_this), "setChildRef", function(ref) {
      _this.childRef = ref;
    });
    _defineProperty(_assertThisInitialized(_this), "setFloaterRef", function(ref) {
      _this.floaterRef = ref;
    });
    _defineProperty(_assertThisInitialized(_this), "setWrapperRef", function(ref) {
      _this.wrapperRef = ref;
    });
    _defineProperty(_assertThisInitialized(_this), "handleTransitionEnd", function() {
      var status = _this.state.status;
      var callback = _this.props.callback;
      if (_this.wrapperPopper) {
        _this.wrapperPopper.instance.update();
      }
      _this.setState({ status: status === STATUS.OPENING ? STATUS.OPEN : STATUS.IDLE }, function() {
        var newStatus = _this.state.status;
        callback(newStatus === STATUS.OPEN ? "open" : "close", _this.props);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleClick", function() {
      var _this$props = _this.props, event = _this$props.event, open = _this$props.open;
      if (esm_default["boolean"](open)) return;
      var _this$state = _this.state, positionWrapper = _this$state.positionWrapper, status = _this$state.status;
      if (_this.event === "click" || _this.event === "hover" && positionWrapper) {
        log({ title: "click", data: [{ event, status: status === STATUS.OPEN ? "closing" : "opening" }], debug: _this.debug });
        _this.toggle();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function() {
      var _this$props2 = _this.props, event = _this$props2.event, open = _this$props2.open;
      if (esm_default["boolean"](open) || isMobile()) return;
      var status = _this.state.status;
      if (_this.event === "hover" && status === STATUS.IDLE) {
        log({ title: "mouseEnter", data: [{ key: "originalEvent", value: event }], debug: _this.debug });
        clearTimeout(_this.eventDelayTimeout);
        _this.toggle();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function() {
      var _this$props3 = _this.props, event = _this$props3.event, eventDelay = _this$props3.eventDelay, open = _this$props3.open;
      if (esm_default["boolean"](open) || isMobile()) return;
      var _this$state2 = _this.state, status = _this$state2.status, positionWrapper = _this$state2.positionWrapper;
      if (_this.event === "hover") {
        log({ title: "mouseLeave", data: [{ key: "originalEvent", value: event }], debug: _this.debug });
        if (!eventDelay) {
          _this.toggle(STATUS.IDLE);
        } else if ([STATUS.OPENING, STATUS.OPEN].indexOf(status) !== -1 && !positionWrapper && !_this.eventDelayTimeout) {
          _this.eventDelayTimeout = setTimeout(function() {
            delete _this.eventDelayTimeout;
            _this.toggle();
          }, eventDelay * 1e3);
        }
      }
    });
    _this.state = { currentPlacement: props.placement, needsUpdate: false, positionWrapper: props.wrapperOptions.position && !!props.target, status: STATUS.INIT, statusWrapper: STATUS.INIT };
    _this._isMounted = false;
    _this.hasMounted = false;
    if (canUseDOM()) {
      window.addEventListener("load", function() {
        if (_this.popper) {
          _this.popper.instance.update();
        }
        if (_this.wrapperPopper) {
          _this.wrapperPopper.instance.update();
        }
      });
    }
    return _this;
  }
  _createClass(ReactFloater2, [{ key: "componentDidMount", value: function componentDidMount() {
    if (!canUseDOM()) return;
    var positionWrapper = this.state.positionWrapper;
    var _this$props5 = this.props, children = _this$props5.children, open = _this$props5.open, target = _this$props5.target;
    this._isMounted = true;
    log({ title: "init", data: { hasChildren: !!children, hasTarget: !!target, isControlled: esm_default["boolean"](open), positionWrapper, target: this.target, floater: this.floaterRef }, debug: this.debug });
    if (!this.hasMounted) {
      this.initPopper();
      this.hasMounted = true;
    }
    if (!children && target && !esm_default["boolean"](open)) ;
  } }, { key: "componentDidUpdate", value: function componentDidUpdate(prevProps, prevState) {
    if (!canUseDOM()) return;
    var _this$props6 = this.props, autoOpen = _this$props6.autoOpen, open = _this$props6.open, target = _this$props6.target, wrapperOptions = _this$props6.wrapperOptions;
    var _treeChanges = treeChanges2(prevState, this.state), changedFrom = _treeChanges.changedFrom, changed = _treeChanges.changed;
    if (prevProps.open !== open) {
      var forceStatus;
      if (esm_default["boolean"](open)) {
        forceStatus = open ? STATUS.OPENING : STATUS.CLOSING;
      }
      this.toggle(forceStatus);
    }
    if (prevProps.wrapperOptions.position !== wrapperOptions.position || prevProps.target !== target) {
      this.changeWrapperPosition(this.props);
    }
    if (changed("status", STATUS.IDLE) && open) {
      this.toggle(STATUS.OPEN);
    } else if (changedFrom("status", STATUS.INIT, STATUS.IDLE) && autoOpen) {
      this.toggle(STATUS.OPEN);
    }
    if (this.popper && changed("status", STATUS.OPENING)) {
      this.popper.instance.update();
    }
    if (this.floaterRef && (changed("status", STATUS.OPENING) || changed("status", STATUS.CLOSING))) {
      once(this.floaterRef, "transitionend", this.handleTransitionEnd);
    }
    if (changed("needsUpdate", true)) {
      this.rebuildPopper();
    }
  } }, { key: "componentWillUnmount", value: function componentWillUnmount() {
    if (!canUseDOM()) return;
    this._isMounted = false;
    if (this.popper) {
      this.popper.instance.destroy();
    }
    if (this.wrapperPopper) {
      this.wrapperPopper.instance.destroy();
    }
  } }, { key: "initPopper", value: function initPopper() {
    var _this2 = this;
    var target = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.target;
    var positionWrapper = this.state.positionWrapper;
    var _this$props7 = this.props, disableFlip = _this$props7.disableFlip, getPopper = _this$props7.getPopper, hideArrow = _this$props7.hideArrow, offset2 = _this$props7.offset, placement = _this$props7.placement, wrapperOptions = _this$props7.wrapperOptions;
    var flipBehavior = placement === "top" || placement === "bottom" ? "flip" : ["right", "bottom-end", "top-end", "left", "top-start", "bottom-start"];
    if (placement === "center") {
      this.setState({ status: STATUS.IDLE });
    } else if (target && this.floaterRef) {
      var _this$options = this.options, arrow2 = _this$options.arrow, flip2 = _this$options.flip, offsetOptions = _this$options.offset, rest = _objectWithoutProperties(_this$options, _excluded);
      new popper_default(target, this.floaterRef, { placement, modifiers: _objectSpread2({ arrow: _objectSpread2({ enabled: !hideArrow, element: this.arrowRef }, arrow2), flip: _objectSpread2({ enabled: !disableFlip, behavior: flipBehavior }, flip2), offset: _objectSpread2({ offset: "0, ".concat(offset2, "px") }, offsetOptions) }, rest), onCreate: function onCreate2(data) {
        var _this2$floaterRef;
        _this2.popper = data;
        if (!((_this2$floaterRef = _this2.floaterRef) !== null && _this2$floaterRef !== void 0 && _this2$floaterRef.isConnected)) {
          _this2.setState({ needsUpdate: true });
          return;
        }
        getPopper(data, "floater");
        if (_this2._isMounted) {
          _this2.setState({ currentPlacement: data.placement, status: STATUS.IDLE });
        }
        if (placement !== data.placement) {
          setTimeout(function() {
            data.instance.update();
          }, 1);
        }
      }, onUpdate: function onUpdate2(data) {
        _this2.popper = data;
        var currentPlacement = _this2.state.currentPlacement;
        if (_this2._isMounted && data.placement !== currentPlacement) {
          _this2.setState({ currentPlacement: data.placement });
        }
      } });
    }
    if (positionWrapper) {
      var wrapperOffset = !esm_default.undefined(wrapperOptions.offset) ? wrapperOptions.offset : 0;
      new popper_default(this.target, this.wrapperRef, { placement: wrapperOptions.placement || placement, modifiers: { arrow: { enabled: false }, offset: { offset: "0, ".concat(wrapperOffset, "px") }, flip: { enabled: false } }, onCreate: function onCreate2(data) {
        _this2.wrapperPopper = data;
        if (_this2._isMounted) {
          _this2.setState({ statusWrapper: STATUS.IDLE });
        }
        getPopper(data, "wrapper");
        if (placement !== data.placement) {
          setTimeout(function() {
            data.instance.update();
          }, 1);
        }
      } });
    }
  } }, { key: "rebuildPopper", value: function rebuildPopper() {
    var _this3 = this;
    this.floaterRefInterval = setInterval(function() {
      var _this3$floaterRef;
      if ((_this3$floaterRef = _this3.floaterRef) !== null && _this3$floaterRef !== void 0 && _this3$floaterRef.isConnected) {
        clearInterval(_this3.floaterRefInterval);
        _this3.setState({ needsUpdate: false });
        _this3.initPopper();
      }
    }, 50);
  } }, { key: "changeWrapperPosition", value: function changeWrapperPosition(_ref) {
    var target = _ref.target, wrapperOptions = _ref.wrapperOptions;
    this.setState({ positionWrapper: wrapperOptions.position && !!target });
  } }, { key: "toggle", value: function toggle(forceStatus) {
    var status = this.state.status;
    var nextStatus = status === STATUS.OPEN ? STATUS.CLOSING : STATUS.OPENING;
    if (!esm_default.undefined(forceStatus)) {
      nextStatus = forceStatus;
    }
    this.setState({ status: nextStatus });
  } }, { key: "debug", get: function get() {
    var debug = this.props.debug;
    return debug || canUseDOM() && "ReactFloaterDebug" in window && !!window.ReactFloaterDebug;
  } }, { key: "event", get: function get() {
    var _this$props8 = this.props, disableHoverToClick = _this$props8.disableHoverToClick, event = _this$props8.event;
    if (event === "hover" && isMobile() && !disableHoverToClick) {
      return "click";
    }
    return event;
  } }, { key: "options", get: function get() {
    var options = this.props.options;
    return (0, import_deepmerge.default)(DEFAULTS, options || {});
  } }, { key: "styles", get: function get() {
    var _this4 = this;
    var _this$state3 = this.state, status = _this$state3.status, positionWrapper = _this$state3.positionWrapper, statusWrapper = _this$state3.statusWrapper;
    var styles = this.props.styles;
    var nextStyles = (0, import_deepmerge.default)(getStyles(styles), styles);
    if (positionWrapper) {
      var wrapperStyles;
      if (!([STATUS.IDLE].indexOf(status) !== -1) || !([STATUS.IDLE].indexOf(statusWrapper) !== -1)) {
        wrapperStyles = nextStyles.wrapperPosition;
      } else {
        wrapperStyles = this.wrapperPopper.styles;
      }
      nextStyles.wrapper = _objectSpread2(_objectSpread2({}, nextStyles.wrapper), wrapperStyles);
    }
    if (this.target) {
      var targetStyles = window.getComputedStyle(this.target);
      if (this.wrapperStyles) {
        nextStyles.wrapper = _objectSpread2(_objectSpread2({}, nextStyles.wrapper), this.wrapperStyles);
      } else if (!(["relative", "static"].indexOf(targetStyles.position) !== -1)) {
        this.wrapperStyles = {};
        if (!positionWrapper) {
          POSITIONING_PROPS.forEach(function(d) {
            _this4.wrapperStyles[d] = targetStyles[d];
          });
          nextStyles.wrapper = _objectSpread2(_objectSpread2({}, nextStyles.wrapper), this.wrapperStyles);
          this.target.style.position = "relative";
          this.target.style.top = "auto";
          this.target.style.right = "auto";
          this.target.style.bottom = "auto";
          this.target.style.left = "auto";
        }
      }
    }
    return nextStyles;
  } }, { key: "target", get: function get() {
    if (!canUseDOM()) return null;
    var target = this.props.target;
    if (target) {
      if (esm_default.domElement(target)) {
        return target;
      }
      return document.querySelector(target);
    }
    return this.childRef || this.wrapperRef;
  } }, { key: "render", value: function render() {
    var _this$state4 = this.state, currentPlacement = _this$state4.currentPlacement, positionWrapper = _this$state4.positionWrapper, status = _this$state4.status;
    var _this$props9 = this.props, children = _this$props9.children, component = _this$props9.component, content = _this$props9.content, disableAnimation = _this$props9.disableAnimation, footer = _this$props9.footer, hideArrow = _this$props9.hideArrow, id = _this$props9.id, open = _this$props9.open, showCloseButton = _this$props9.showCloseButton, style = _this$props9.style, target = _this$props9.target, title = _this$props9.title;
    var wrapper = import_react.default.createElement(ReactFloaterWrapper, { handleClick: this.handleClick, handleMouseEnter: this.handleMouseEnter, handleMouseLeave: this.handleMouseLeave, setChildRef: this.setChildRef, setWrapperRef: this.setWrapperRef, style, styles: this.styles.wrapper }, children);
    var output = {};
    if (positionWrapper) {
      output.wrapperInPortal = wrapper;
    } else {
      output.wrapperAsChildren = wrapper;
    }
    return import_react.default.createElement("span", null, import_react.default.createElement(ReactFloaterPortal, { hasChildren: !!children, id, placement: currentPlacement, setRef: this.setFloaterRef, target, zIndex: this.styles.options.zIndex }, import_react.default.createElement(Floater, { component, content, disableAnimation, footer, handleClick: this.handleClick, hideArrow: hideArrow || currentPlacement === "center", open, placement: currentPlacement, positionWrapper, setArrowRef: this.setArrowRef, setFloaterRef: this.setFloaterRef, showCloseButton, status, styles: this.styles, title }), output.wrapperInPortal), output.wrapperAsChildren);
  } }]);
  return ReactFloater2;
}(import_react.default.Component);
_defineProperty(ReactFloater, "propTypes", { autoOpen: import_prop_types.default.bool, callback: import_prop_types.default.func, children: import_prop_types.default.node, component: isRequiredIf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.element]), function(props) {
  return !props.content;
}), content: isRequiredIf(import_prop_types.default.node, function(props) {
  return !props.component;
}), debug: import_prop_types.default.bool, disableAnimation: import_prop_types.default.bool, disableFlip: import_prop_types.default.bool, disableHoverToClick: import_prop_types.default.bool, event: import_prop_types.default.oneOf(["hover", "click"]), eventDelay: import_prop_types.default.number, footer: import_prop_types.default.node, getPopper: import_prop_types.default.func, hideArrow: import_prop_types.default.bool, id: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number]), offset: import_prop_types.default.number, open: import_prop_types.default.bool, options: import_prop_types.default.object, placement: import_prop_types.default.oneOf(["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end", "auto", "center"]), showCloseButton: import_prop_types.default.bool, style: import_prop_types.default.object, styles: import_prop_types.default.object, target: import_prop_types.default.oneOfType([import_prop_types.default.object, import_prop_types.default.string]), title: import_prop_types.default.node, wrapperOptions: import_prop_types.default.shape({ offset: import_prop_types.default.number, placement: import_prop_types.default.oneOf(["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end", "auto"]), position: import_prop_types.default.bool }) });
_defineProperty(ReactFloater, "defaultProps", { autoOpen: false, callback: noop, debug: false, disableAnimation: false, disableFlip: false, disableHoverToClick: false, event: "click", eventDelay: 0.4, getPopper: noop, hideArrow: false, offset: 15, placement: "bottom", showCloseButton: false, styles: {}, target: null, wrapperOptions: { position: false } });

// node_modules/react-joyride/dist/index.mjs
var React4 = __toESM(require_react(), 1);
var React7 = __toESM(require_react(), 1);
var React6 = __toESM(require_react(), 1);
var import_react3 = __toESM(require_react(), 1);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var ACTIONS = {
  INIT: "init",
  START: "start",
  STOP: "stop",
  RESET: "reset",
  PREV: "prev",
  NEXT: "next",
  GO: "go",
  CLOSE: "close",
  SKIP: "skip",
  UPDATE: "update"
};
var EVENTS = {
  TOUR_START: "tour:start",
  STEP_BEFORE: "step:before",
  BEACON: "beacon",
  TOOLTIP: "tooltip",
  STEP_AFTER: "step:after",
  TOUR_END: "tour:end",
  TOUR_STATUS: "tour:status",
  TARGET_NOT_FOUND: "error:target_not_found",
  ERROR: "error"
};
var LIFECYCLE = {
  INIT: "init",
  READY: "ready",
  BEACON: "beacon",
  TOOLTIP: "tooltip",
  COMPLETE: "complete",
  ERROR: "error"
};
var ORIGIN = {
  BUTTON_CLOSE: "button_close",
  BUTTON_PRIMARY: "button_primary",
  KEYBOARD: "keyboard",
  OVERLAY: "overlay"
};
var STATUS2 = {
  IDLE: "idle",
  READY: "ready",
  WAITING: "waiting",
  RUNNING: "running",
  PAUSED: "paused",
  SKIPPED: "skipped",
  FINISHED: "finished",
  ERROR: "error"
};
function canUseDOM2() {
  var _a;
  return !!(typeof window !== "undefined" && ((_a = window.document) == null ? void 0 : _a.createElement));
}
function getClientRect2(element) {
  if (!element) {
    return null;
  }
  return element.getBoundingClientRect();
}
function getDocumentHeight(median = false) {
  const { body, documentElement } = document;
  if (!body || !documentElement) {
    return 0;
  }
  if (median) {
    const heights = [
      body.scrollHeight,
      body.offsetHeight,
      documentElement.clientHeight,
      documentElement.scrollHeight,
      documentElement.offsetHeight
    ].sort((a, b) => a - b);
    const middle = Math.floor(heights.length / 2);
    if (heights.length % 2 === 0) {
      return (heights[middle - 1] + heights[middle]) / 2;
    }
    return heights[middle];
  }
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    documentElement.clientHeight,
    documentElement.scrollHeight,
    documentElement.offsetHeight
  );
}
function getElement(element) {
  if (typeof element === "string") {
    try {
      return document.querySelector(element);
    } catch (error) {
      if (true) {
        console.error(error);
      }
      return null;
    }
  }
  return element;
}
function getStyleComputedProperty2(el) {
  if (!el || el.nodeType !== 1) {
    return null;
  }
  return getComputedStyle(el);
}
function getScrollParent2(element, skipFix, forListener) {
  if (!element) {
    return scrollDocument();
  }
  const parent = (0, import_scrollparent.default)(element);
  if (parent) {
    if (parent.isSameNode(scrollDocument())) {
      if (forListener) {
        return document;
      }
      return scrollDocument();
    }
    const hasScrolling = parent.scrollHeight > parent.offsetHeight;
    if (!hasScrolling && !skipFix) {
      parent.style.overflow = "initial";
      return scrollDocument();
    }
  }
  return parent;
}
function hasCustomScrollParent(element, skipFix) {
  if (!element) {
    return false;
  }
  const parent = getScrollParent2(element, skipFix);
  return parent ? !parent.isSameNode(scrollDocument()) : false;
}
function hasCustomOffsetParent(element) {
  return element.offsetParent !== document.body;
}
function hasPosition(el, type = "fixed") {
  if (!el || !(el instanceof HTMLElement)) {
    return false;
  }
  const { nodeName } = el;
  const styles = getStyleComputedProperty2(el);
  if (nodeName === "BODY" || nodeName === "HTML") {
    return false;
  }
  if (styles && styles.position === type) {
    return true;
  }
  if (!el.parentNode) {
    return false;
  }
  return hasPosition(el.parentNode, type);
}
function isElementVisible(element) {
  var _a;
  if (!element) {
    return false;
  }
  let parentElement = element;
  while (parentElement) {
    if (parentElement === document.body) {
      break;
    }
    if (parentElement instanceof HTMLElement) {
      const { display, visibility } = getComputedStyle(parentElement);
      if (display === "none" || visibility === "hidden") {
        return false;
      }
    }
    parentElement = (_a = parentElement.parentElement) != null ? _a : null;
  }
  return true;
}
function getElementPosition(element, offset2, skipFix) {
  var _a, _b, _c;
  const elementRect = getClientRect2(element);
  const parent = getScrollParent2(element, skipFix);
  const hasScrollParent = hasCustomScrollParent(element, skipFix);
  const isFixedTarget = hasPosition(element);
  let parentTop = 0;
  let top = (_a = elementRect == null ? void 0 : elementRect.top) != null ? _a : 0;
  if (hasScrollParent && isFixedTarget) {
    const offsetTop = (_b = element == null ? void 0 : element.offsetTop) != null ? _b : 0;
    const parentScrollTop = (_c = parent == null ? void 0 : parent.scrollTop) != null ? _c : 0;
    top = offsetTop - parentScrollTop;
  } else if (parent instanceof HTMLElement) {
    parentTop = parent.scrollTop;
    if (!hasScrollParent && !hasPosition(element)) {
      top += parentTop;
    }
    if (!parent.isSameNode(scrollDocument())) {
      top += scrollDocument().scrollTop;
    }
  }
  return Math.floor(top - offset2);
}
function getScrollTo(element, offset2, skipFix) {
  var _a;
  if (!element) {
    return 0;
  }
  const { offsetTop = 0, scrollTop = 0 } = (_a = (0, import_scrollparent.default)(element)) != null ? _a : {};
  let top = element.getBoundingClientRect().top + scrollTop;
  if (!!offsetTop && (hasCustomScrollParent(element, skipFix) || hasCustomOffsetParent(element))) {
    top -= offsetTop;
  }
  const output = Math.floor(top - offset2);
  return output < 0 ? 0 : output;
}
function scrollDocument() {
  var _a;
  return (_a = document.scrollingElement) != null ? _a : document.documentElement;
}
function scrollTo(value, options) {
  const { duration, element } = options;
  return new Promise((resolve, reject) => {
    const { scrollTop } = element;
    const limit = value > scrollTop ? value - scrollTop : scrollTop - value;
    import_scroll.default.top(element, value, { duration: limit < 100 ? 50 : duration }, (error) => {
      if (error && error.message !== "Element already at target scroll position") {
        return reject(error);
      }
      return resolve();
    });
  });
}
var isReact162 = import_react_dom2.createPortal !== void 0;
function getBrowser(userAgent = navigator.userAgent) {
  let browser = userAgent;
  if (typeof window === "undefined") {
    browser = "node";
  } else if (document.documentMode) {
    browser = "ie";
  } else if (/Edge/.test(userAgent)) {
    browser = "edge";
  } else if (Boolean(window.opera) || userAgent.includes(" OPR/")) {
    browser = "opera";
  } else if (typeof window.InstallTrigger !== "undefined") {
    browser = "firefox";
  } else if (window.chrome) {
    browser = "chrome";
  } else if (/(Version\/([\d._]+).*Safari|CriOS|FxiOS| Mobile\/)/.test(userAgent)) {
    browser = "safari";
  }
  return browser;
}
function getObjectType3(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}
function getReactNodeText(input, options = {}) {
  const { defaultValue, step, steps } = options;
  let text = (0, import_react_innertext.default)(input);
  if (!text) {
    if ((0, import_react2.isValidElement)(input) && !Object.values(input.props).length && getObjectType3(input.type) === "function") {
      const component = input.type({});
      text = getReactNodeText(component, options);
    } else {
      text = (0, import_react_innertext.default)(defaultValue);
    }
  } else if ((text.includes("{step}") || text.includes("{steps}")) && step && steps) {
    text = text.replace("{step}", step.toString()).replace("{steps}", steps.toString());
  }
  return text;
}
function hasValidKeys(object, keys) {
  if (!src_default.plainObject(object) || !src_default.array(keys)) {
    return false;
  }
  return Object.keys(object).every((d) => keys.includes(d));
}
function hexToRGB(hex) {
  const shorthandRegex = /^#?([\da-f])([\da-f])([\da-f])$/i;
  const properHex = hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(properHex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [];
}
function hideBeacon(step) {
  return step.disableBeacon || step.placement === "center";
}
function isLegacy() {
  return !["chrome", "safari", "firefox", "opera"].includes(getBrowser());
}
function log2({ data, debug = false, title, warn = false }) {
  const logFn = warn ? console.warn || console.error : console.log;
  if (debug) {
    if (title && data) {
      console.groupCollapsed(
        `%creact-joyride: ${title}`,
        "color: #ff0044; font-weight: bold; font-size: 12px;"
      );
      if (Array.isArray(data)) {
        data.forEach((d) => {
          if (src_default.plainObject(d) && d.key) {
            logFn.apply(console, [d.key, d.value]);
          } else {
            logFn.apply(console, [d]);
          }
        });
      } else {
        logFn.apply(console, [data]);
      }
      console.groupEnd();
    } else {
      console.error("Missing title or data props");
    }
  }
}
function noop2() {
  return void 0;
}
function objectKeys(input) {
  return Object.keys(input);
}
function omit(input, ...filter) {
  if (!src_default.plainObject(input)) {
    throw new TypeError("Expected an object");
  }
  const output = {};
  for (const key in input) {
    if ({}.hasOwnProperty.call(input, key)) {
      if (!filter.includes(key)) {
        output[key] = input[key];
      }
    }
  }
  return output;
}
function pick(input, ...filter) {
  if (!src_default.plainObject(input)) {
    throw new TypeError("Expected an object");
  }
  if (!filter.length) {
    return input;
  }
  const output = {};
  for (const key in input) {
    if ({}.hasOwnProperty.call(input, key)) {
      if (filter.includes(key)) {
        output[key] = input[key];
      }
    }
  }
  return output;
}
function replaceLocaleContent(input, step, steps) {
  const replacer = (text) => text.replace("{step}", String(step)).replace("{steps}", String(steps));
  if (getObjectType3(input) === "string") {
    return replacer(input);
  }
  if (!(0, import_react2.isValidElement)(input)) {
    return input;
  }
  const { children } = input.props;
  if (getObjectType3(children) === "string" && children.includes("{step}")) {
    return (0, import_react2.cloneElement)(input, {
      children: replacer(children)
    });
  }
  if (Array.isArray(children)) {
    return (0, import_react2.cloneElement)(input, {
      children: children.map((child) => {
        if (typeof child === "string") {
          return replacer(child);
        }
        return replaceLocaleContent(child, step, steps);
      })
    });
  }
  if (getObjectType3(input.type) === "function" && !Object.values(input.props).length) {
    const component = input.type({});
    return replaceLocaleContent(component, step, steps);
  }
  return input;
}
function shouldScroll(options) {
  const { isFirstStep, lifecycle, previousLifecycle, scrollToFirstStep, step, target } = options;
  return !step.disableScrolling && (!isFirstStep || scrollToFirstStep || lifecycle === LIFECYCLE.TOOLTIP) && step.placement !== "center" && (!step.isFixed || !hasPosition(target)) && // fixed steps don't need to scroll
  previousLifecycle !== lifecycle && [LIFECYCLE.BEACON, LIFECYCLE.TOOLTIP].includes(lifecycle);
}
var defaultFloaterProps = {
  options: {
    preventOverflow: {
      boundariesElement: "scrollParent"
    }
  },
  wrapperOptions: {
    offset: -18,
    position: true
  }
};
var defaultLocale = {
  back: "Back",
  close: "Close",
  last: "Last",
  next: "Next",
  nextLabelWithProgress: "Next (Step {step} of {steps})",
  open: "Open the dialog",
  skip: "Skip"
};
var defaultStep = {
  event: "click",
  placement: "bottom",
  offset: 10,
  disableBeacon: false,
  disableCloseOnEsc: false,
  disableOverlay: false,
  disableOverlayClose: false,
  disableScrollParentFix: false,
  disableScrolling: false,
  hideBackButton: false,
  hideCloseButton: false,
  hideFooter: false,
  isFixed: false,
  locale: defaultLocale,
  showProgress: false,
  showSkipButton: false,
  spotlightClicks: false,
  spotlightPadding: 10
};
var defaultProps = {
  continuous: false,
  debug: false,
  disableCloseOnEsc: false,
  disableOverlay: false,
  disableOverlayClose: false,
  disableScrolling: false,
  disableScrollParentFix: false,
  getHelpers: noop2(),
  hideBackButton: false,
  run: true,
  scrollOffset: 20,
  scrollDuration: 300,
  scrollToFirstStep: false,
  showSkipButton: false,
  showProgress: false,
  spotlightClicks: false,
  spotlightPadding: 10,
  steps: []
};
var defaultOptions2 = {
  arrowColor: "#fff",
  backgroundColor: "#fff",
  beaconSize: 36,
  overlayColor: "rgba(0, 0, 0, 0.5)",
  primaryColor: "#f04",
  spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
  textColor: "#333",
  width: 380,
  zIndex: 100
};
var buttonBase = {
  backgroundColor: "transparent",
  border: 0,
  borderRadius: 0,
  color: "#555",
  cursor: "pointer",
  fontSize: 16,
  lineHeight: 1,
  padding: 8,
  WebkitAppearance: "none"
};
var spotlight = {
  borderRadius: 4,
  position: "absolute"
};
function getStyles2(props, step) {
  var _a, _b, _c, _d, _e;
  const { floaterProps, styles } = props;
  const mergedFloaterProps = (0, import_deepmerge3.default)((_a = step.floaterProps) != null ? _a : {}, floaterProps != null ? floaterProps : {});
  const mergedStyles = (0, import_deepmerge3.default)(styles != null ? styles : {}, (_b = step.styles) != null ? _b : {});
  const options = (0, import_deepmerge3.default)(defaultOptions2, mergedStyles.options || {});
  const hideBeacon2 = step.placement === "center" || step.disableBeacon;
  let { width } = options;
  if (window.innerWidth > 480) {
    width = 380;
  }
  if ("width" in options) {
    width = typeof options.width === "number" && window.innerWidth < options.width ? window.innerWidth - 30 : options.width;
  }
  const overlay = {
    bottom: 0,
    left: 0,
    overflow: "hidden",
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: options.zIndex
  };
  const defaultStyles = {
    beacon: {
      ...buttonBase,
      display: hideBeacon2 ? "none" : "inline-block",
      height: options.beaconSize,
      position: "relative",
      width: options.beaconSize,
      zIndex: options.zIndex
    },
    beaconInner: {
      animation: "joyride-beacon-inner 1.2s infinite ease-in-out",
      backgroundColor: options.primaryColor,
      borderRadius: "50%",
      display: "block",
      height: "50%",
      left: "50%",
      opacity: 0.7,
      position: "absolute",
      top: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%"
    },
    beaconOuter: {
      animation: "joyride-beacon-outer 1.2s infinite ease-in-out",
      backgroundColor: `rgba(${hexToRGB(options.primaryColor).join(",")}, 0.2)`,
      border: `2px solid ${options.primaryColor}`,
      borderRadius: "50%",
      boxSizing: "border-box",
      display: "block",
      height: "100%",
      left: 0,
      opacity: 0.9,
      position: "absolute",
      top: 0,
      transformOrigin: "center",
      width: "100%"
    },
    tooltip: {
      backgroundColor: options.backgroundColor,
      borderRadius: 5,
      boxSizing: "border-box",
      color: options.textColor,
      fontSize: 16,
      maxWidth: "100%",
      padding: 15,
      position: "relative",
      width
    },
    tooltipContainer: {
      lineHeight: 1.4,
      textAlign: "center"
    },
    tooltipTitle: {
      fontSize: 18,
      margin: 0
    },
    tooltipContent: {
      padding: "20px 10px"
    },
    tooltipFooter: {
      alignItems: "center",
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 15
    },
    tooltipFooterSpacer: {
      flex: 1
    },
    buttonNext: {
      ...buttonBase,
      backgroundColor: options.primaryColor,
      borderRadius: 4,
      color: "#fff"
    },
    buttonBack: {
      ...buttonBase,
      color: options.primaryColor,
      marginLeft: "auto",
      marginRight: 5
    },
    buttonClose: {
      ...buttonBase,
      color: options.textColor,
      height: 14,
      padding: 15,
      position: "absolute",
      right: 0,
      top: 0,
      width: 14
    },
    buttonSkip: {
      ...buttonBase,
      color: options.textColor,
      fontSize: 14
    },
    overlay: {
      ...overlay,
      backgroundColor: options.overlayColor,
      mixBlendMode: "hard-light"
    },
    overlayLegacy: {
      ...overlay
    },
    overlayLegacyCenter: {
      ...overlay,
      backgroundColor: options.overlayColor
    },
    spotlight: {
      ...spotlight,
      backgroundColor: "gray"
    },
    spotlightLegacy: {
      ...spotlight,
      boxShadow: `0 0 0 9999px ${options.overlayColor}, ${options.spotlightShadow}`
    },
    floaterStyles: {
      arrow: {
        color: (_e = (_d = (_c = mergedFloaterProps == null ? void 0 : mergedFloaterProps.styles) == null ? void 0 : _c.arrow) == null ? void 0 : _d.color) != null ? _e : options.arrowColor
      },
      options: {
        zIndex: options.zIndex + 100
      }
    },
    options
  };
  return (0, import_deepmerge3.default)(defaultStyles, mergedStyles);
}
function getTourProps(props) {
  return pick(
    props,
    "beaconComponent",
    "disableCloseOnEsc",
    "disableOverlay",
    "disableOverlayClose",
    "disableScrolling",
    "disableScrollParentFix",
    "floaterProps",
    "hideBackButton",
    "hideCloseButton",
    "locale",
    "showProgress",
    "showSkipButton",
    "spotlightClicks",
    "spotlightPadding",
    "styles",
    "tooltipComponent"
  );
}
function getMergedStep(props, currentStep) {
  var _a, _b, _c, _d, _e, _f;
  const step = currentStep != null ? currentStep : {};
  const mergedStep = import_deepmerge2.default.all([defaultStep, getTourProps(props), step], {
    isMergeableObject: src_default.plainObject
  });
  const mergedStyles = getStyles2(props, mergedStep);
  const scrollParent2 = hasCustomScrollParent(
    getElement(mergedStep.target),
    mergedStep.disableScrollParentFix
  );
  const floaterProps = import_deepmerge2.default.all([
    defaultFloaterProps,
    (_a = props.floaterProps) != null ? _a : {},
    (_b = mergedStep.floaterProps) != null ? _b : {}
  ]);
  floaterProps.offset = mergedStep.offset;
  floaterProps.styles = (0, import_deepmerge2.default)((_c = floaterProps.styles) != null ? _c : {}, mergedStyles.floaterStyles);
  floaterProps.offset += (_e = (_d = props.spotlightPadding) != null ? _d : mergedStep.spotlightPadding) != null ? _e : 0;
  if (mergedStep.placementBeacon && floaterProps.wrapperOptions) {
    floaterProps.wrapperOptions.placement = mergedStep.placementBeacon;
  }
  if (scrollParent2 && floaterProps.options.preventOverflow) {
    floaterProps.options.preventOverflow.boundariesElement = "window";
  }
  return {
    ...mergedStep,
    locale: import_deepmerge2.default.all([defaultLocale, (_f = props.locale) != null ? _f : {}, mergedStep.locale || {}]),
    floaterProps,
    styles: omit(mergedStyles, "floaterStyles")
  };
}
function validateStep(step, debug = false) {
  if (!src_default.plainObject(step)) {
    log2({
      title: "validateStep",
      data: "step must be an object",
      warn: true,
      debug
    });
    return false;
  }
  if (!step.target) {
    log2({
      title: "validateStep",
      data: "target is missing from the step",
      warn: true,
      debug
    });
    return false;
  }
  return true;
}
function validateSteps(steps, debug = false) {
  if (!src_default.array(steps)) {
    log2({
      title: "validateSteps",
      data: "steps must be an array",
      warn: true,
      debug
    });
    return false;
  }
  return steps.every((d) => validateStep(d, debug));
}
var defaultState = {
  action: "init",
  controlled: false,
  index: 0,
  lifecycle: LIFECYCLE.INIT,
  origin: null,
  size: 0,
  status: STATUS2.IDLE
};
var validKeys = objectKeys(omit(defaultState, "controlled", "size"));
var Store = class {
  constructor(options) {
    __publicField(this, "beaconPopper");
    __publicField(this, "tooltipPopper");
    __publicField(this, "data", /* @__PURE__ */ new Map());
    __publicField(this, "listener");
    __publicField(this, "store", /* @__PURE__ */ new Map());
    __publicField(this, "addListener", (listener) => {
      this.listener = listener;
    });
    __publicField(this, "setSteps", (steps2) => {
      const { size, status } = this.getState();
      const state = {
        size: steps2.length,
        status
      };
      this.data.set("steps", steps2);
      if (status === STATUS2.WAITING && !size && steps2.length) {
        state.status = STATUS2.RUNNING;
      }
      this.setState(state);
    });
    __publicField(this, "getPopper", (name) => {
      if (name === "beacon") {
        return this.beaconPopper;
      }
      return this.tooltipPopper;
    });
    __publicField(this, "setPopper", (name, popper) => {
      if (name === "beacon") {
        this.beaconPopper = popper;
      } else {
        this.tooltipPopper = popper;
      }
    });
    __publicField(this, "cleanupPoppers", () => {
      this.beaconPopper = null;
      this.tooltipPopper = null;
    });
    __publicField(this, "close", (origin = null) => {
      const { index, status } = this.getState();
      if (status !== STATUS2.RUNNING) {
        return;
      }
      this.setState({
        ...this.getNextState({ action: ACTIONS.CLOSE, index: index + 1, origin })
      });
    });
    __publicField(this, "go", (nextIndex) => {
      const { controlled, status } = this.getState();
      if (controlled || status !== STATUS2.RUNNING) {
        return;
      }
      const step = this.getSteps()[nextIndex];
      this.setState({
        ...this.getNextState({ action: ACTIONS.GO, index: nextIndex }),
        status: step ? status : STATUS2.FINISHED
      });
    });
    __publicField(this, "info", () => this.getState());
    __publicField(this, "next", () => {
      const { index, status } = this.getState();
      if (status !== STATUS2.RUNNING) {
        return;
      }
      this.setState(this.getNextState({ action: ACTIONS.NEXT, index: index + 1 }));
    });
    __publicField(this, "open", () => {
      const { status } = this.getState();
      if (status !== STATUS2.RUNNING) {
        return;
      }
      this.setState({
        ...this.getNextState({ action: ACTIONS.UPDATE, lifecycle: LIFECYCLE.TOOLTIP })
      });
    });
    __publicField(this, "prev", () => {
      const { index, status } = this.getState();
      if (status !== STATUS2.RUNNING) {
        return;
      }
      this.setState({
        ...this.getNextState({ action: ACTIONS.PREV, index: index - 1 })
      });
    });
    __publicField(this, "reset", (restart = false) => {
      const { controlled } = this.getState();
      if (controlled) {
        return;
      }
      this.setState({
        ...this.getNextState({ action: ACTIONS.RESET, index: 0 }),
        status: restart ? STATUS2.RUNNING : STATUS2.READY
      });
    });
    __publicField(this, "skip", () => {
      const { status } = this.getState();
      if (status !== STATUS2.RUNNING) {
        return;
      }
      this.setState({
        action: ACTIONS.SKIP,
        lifecycle: LIFECYCLE.INIT,
        status: STATUS2.SKIPPED
      });
    });
    __publicField(this, "start", (nextIndex) => {
      const { index, size } = this.getState();
      this.setState({
        ...this.getNextState(
          {
            action: ACTIONS.START,
            index: src_default.number(nextIndex) ? nextIndex : index
          },
          true
        ),
        status: size ? STATUS2.RUNNING : STATUS2.WAITING
      });
    });
    __publicField(this, "stop", (advance = false) => {
      const { index, status } = this.getState();
      if ([STATUS2.FINISHED, STATUS2.SKIPPED].includes(status)) {
        return;
      }
      this.setState({
        ...this.getNextState({ action: ACTIONS.STOP, index: index + (advance ? 1 : 0) }),
        status: STATUS2.PAUSED
      });
    });
    __publicField(this, "update", (state) => {
      var _a, _b;
      if (!hasValidKeys(state, validKeys)) {
        throw new Error(`State is not valid. Valid keys: ${validKeys.join(", ")}`);
      }
      this.setState({
        ...this.getNextState(
          {
            ...this.getState(),
            ...state,
            action: (_a = state.action) != null ? _a : ACTIONS.UPDATE,
            origin: (_b = state.origin) != null ? _b : null
          },
          true
        )
      });
    });
    const { continuous = false, stepIndex, steps = [] } = options != null ? options : {};
    this.setState(
      {
        action: ACTIONS.INIT,
        controlled: src_default.number(stepIndex),
        continuous,
        index: src_default.number(stepIndex) ? stepIndex : 0,
        lifecycle: LIFECYCLE.INIT,
        origin: null,
        status: steps.length ? STATUS2.READY : STATUS2.IDLE
      },
      true
    );
    this.beaconPopper = null;
    this.tooltipPopper = null;
    this.listener = null;
    this.setSteps(steps);
  }
  getState() {
    if (!this.store.size) {
      return { ...defaultState };
    }
    return {
      action: this.store.get("action") || "",
      controlled: this.store.get("controlled") || false,
      index: parseInt(this.store.get("index"), 10),
      lifecycle: this.store.get("lifecycle") || "",
      origin: this.store.get("origin") || null,
      size: this.store.get("size") || 0,
      status: this.store.get("status") || ""
    };
  }
  getNextState(state, force = false) {
    var _a, _b, _c, _d, _e;
    const { action, controlled, index, size, status } = this.getState();
    const newIndex = src_default.number(state.index) ? state.index : index;
    const nextIndex = controlled && !force ? index : Math.min(Math.max(newIndex, 0), size);
    return {
      action: (_a = state.action) != null ? _a : action,
      controlled,
      index: nextIndex,
      lifecycle: (_b = state.lifecycle) != null ? _b : LIFECYCLE.INIT,
      origin: (_c = state.origin) != null ? _c : null,
      size: (_d = state.size) != null ? _d : size,
      status: nextIndex === size ? STATUS2.FINISHED : (_e = state.status) != null ? _e : status
    };
  }
  getSteps() {
    const steps = this.data.get("steps");
    return Array.isArray(steps) ? steps : [];
  }
  hasUpdatedState(oldState) {
    const before = JSON.stringify(oldState);
    const after = JSON.stringify(this.getState());
    return before !== after;
  }
  setState(nextState, initial = false) {
    const state = this.getState();
    const {
      action,
      index,
      lifecycle,
      origin = null,
      size,
      status
    } = {
      ...state,
      ...nextState
    };
    this.store.set("action", action);
    this.store.set("index", index);
    this.store.set("lifecycle", lifecycle);
    this.store.set("origin", origin);
    this.store.set("size", size);
    this.store.set("status", status);
    if (initial) {
      this.store.set("controlled", nextState.controlled);
      this.store.set("continuous", nextState.continuous);
    }
    if (this.listener && this.hasUpdatedState(state)) {
      this.listener(this.getState());
    }
  }
  getHelpers() {
    return {
      close: this.close,
      go: this.go,
      info: this.info,
      next: this.next,
      open: this.open,
      prev: this.prev,
      reset: this.reset,
      skip: this.skip
    };
  }
};
function createStore(options) {
  return new Store(options);
}
function JoyrideSpotlight({ styles }) {
  return React3.createElement(
    "div",
    {
      key: "JoyrideSpotlight",
      className: "react-joyride__spotlight",
      "data-test-id": "spotlight",
      style: styles
    }
  );
}
var Spotlight_default = JoyrideSpotlight;
var JoyrideOverlay = class extends React2.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "isActive", false);
    __publicField(this, "resizeTimeout");
    __publicField(this, "scrollTimeout");
    __publicField(this, "scrollParent");
    __publicField(this, "state", {
      isScrolling: false,
      mouseOverSpotlight: false,
      showSpotlight: true
    });
    __publicField(this, "hideSpotlight", () => {
      const { continuous, disableOverlay, lifecycle } = this.props;
      const hiddenLifecycles = [
        LIFECYCLE.INIT,
        LIFECYCLE.BEACON,
        LIFECYCLE.COMPLETE,
        LIFECYCLE.ERROR
      ];
      return disableOverlay || (continuous ? hiddenLifecycles.includes(lifecycle) : lifecycle !== LIFECYCLE.TOOLTIP);
    });
    __publicField(this, "handleMouseMove", (event) => {
      const { mouseOverSpotlight } = this.state;
      const { height, left, position, top, width } = this.spotlightStyles;
      const offsetY = position === "fixed" ? event.clientY : event.pageY;
      const offsetX = position === "fixed" ? event.clientX : event.pageX;
      const inSpotlightHeight = offsetY >= top && offsetY <= top + height;
      const inSpotlightWidth = offsetX >= left && offsetX <= left + width;
      const inSpotlight = inSpotlightWidth && inSpotlightHeight;
      if (inSpotlight !== mouseOverSpotlight) {
        this.updateState({ mouseOverSpotlight: inSpotlight });
      }
    });
    __publicField(this, "handleScroll", () => {
      const { target } = this.props;
      const element = getElement(target);
      if (this.scrollParent !== document) {
        const { isScrolling } = this.state;
        if (!isScrolling) {
          this.updateState({ isScrolling: true, showSpotlight: false });
        }
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = window.setTimeout(() => {
          this.updateState({ isScrolling: false, showSpotlight: true });
        }, 50);
      } else if (hasPosition(element, "sticky")) {
        this.updateState({});
      }
    });
    __publicField(this, "handleResize", () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = window.setTimeout(() => {
        if (!this.isActive) {
          return;
        }
        this.forceUpdate();
      }, 100);
    });
  }
  componentDidMount() {
    const { debug, disableScrolling, disableScrollParentFix = false, target } = this.props;
    const element = getElement(target);
    this.scrollParent = getScrollParent2(element != null ? element : document.body, disableScrollParentFix, true);
    this.isActive = true;
    if (true) {
      if (!disableScrolling && hasCustomScrollParent(element, true)) {
        log2({
          title: "step has a custom scroll parent and can cause trouble with scrolling",
          data: [{ key: "parent", value: this.scrollParent }],
          debug
        });
      }
    }
    window.addEventListener("resize", this.handleResize);
  }
  componentDidUpdate(previousProps) {
    var _a;
    const { disableScrollParentFix, lifecycle, spotlightClicks, target } = this.props;
    const { changed } = treeChanges(previousProps, this.props);
    if (changed("target") || changed("disableScrollParentFix")) {
      const element = getElement(target);
      this.scrollParent = getScrollParent2(element != null ? element : document.body, disableScrollParentFix, true);
    }
    if (changed("lifecycle", LIFECYCLE.TOOLTIP)) {
      (_a = this.scrollParent) == null ? void 0 : _a.addEventListener("scroll", this.handleScroll, { passive: true });
      setTimeout(() => {
        const { isScrolling } = this.state;
        if (!isScrolling) {
          this.updateState({ showSpotlight: true });
        }
      }, 100);
    }
    if (changed("spotlightClicks") || changed("disableOverlay") || changed("lifecycle")) {
      if (spotlightClicks && lifecycle === LIFECYCLE.TOOLTIP) {
        window.addEventListener("mousemove", this.handleMouseMove, false);
      } else if (lifecycle !== LIFECYCLE.TOOLTIP) {
        window.removeEventListener("mousemove", this.handleMouseMove);
      }
    }
  }
  componentWillUnmount() {
    var _a;
    this.isActive = false;
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("resize", this.handleResize);
    clearTimeout(this.resizeTimeout);
    clearTimeout(this.scrollTimeout);
    (_a = this.scrollParent) == null ? void 0 : _a.removeEventListener("scroll", this.handleScroll);
  }
  get overlayStyles() {
    const { mouseOverSpotlight } = this.state;
    const { disableOverlayClose, placement, styles } = this.props;
    let baseStyles = styles.overlay;
    if (isLegacy()) {
      baseStyles = placement === "center" ? styles.overlayLegacyCenter : styles.overlayLegacy;
    }
    return {
      cursor: disableOverlayClose ? "default" : "pointer",
      height: getDocumentHeight(),
      pointerEvents: mouseOverSpotlight ? "none" : "auto",
      ...baseStyles
    };
  }
  get spotlightStyles() {
    var _a, _b, _c;
    const { showSpotlight } = this.state;
    const {
      disableScrollParentFix = false,
      spotlightClicks,
      spotlightPadding = 0,
      styles,
      target
    } = this.props;
    const element = getElement(target);
    const elementRect = getClientRect2(element);
    const isFixedTarget = hasPosition(element);
    const top = getElementPosition(element, spotlightPadding, disableScrollParentFix);
    return {
      ...isLegacy() ? styles.spotlightLegacy : styles.spotlight,
      height: Math.round(((_a = elementRect == null ? void 0 : elementRect.height) != null ? _a : 0) + spotlightPadding * 2),
      left: Math.round(((_b = elementRect == null ? void 0 : elementRect.left) != null ? _b : 0) - spotlightPadding),
      opacity: showSpotlight ? 1 : 0,
      pointerEvents: spotlightClicks ? "none" : "auto",
      position: isFixedTarget ? "fixed" : "absolute",
      top,
      transition: "opacity 0.2s",
      width: Math.round(((_c = elementRect == null ? void 0 : elementRect.width) != null ? _c : 0) + spotlightPadding * 2)
    };
  }
  updateState(state) {
    if (!this.isActive) {
      return;
    }
    this.setState((previousState) => ({ ...previousState, ...state }));
  }
  render() {
    const { showSpotlight } = this.state;
    const { onClickOverlay, placement } = this.props;
    const { hideSpotlight, overlayStyles, spotlightStyles } = this;
    if (hideSpotlight()) {
      return null;
    }
    let spotlight2 = placement !== "center" && showSpotlight && React2.createElement(Spotlight_default, { styles: spotlightStyles });
    if (getBrowser() === "safari") {
      const { mixBlendMode, zIndex, ...safariOverlay } = overlayStyles;
      spotlight2 = React2.createElement("div", { style: { ...safariOverlay } }, spotlight2);
      delete overlayStyles.backgroundColor;
    }
    return React2.createElement(
      "div",
      {
        className: "react-joyride__overlay",
        "data-test-id": "overlay",
        onClick: onClickOverlay,
        role: "presentation",
        style: overlayStyles
      },
      spotlight2
    );
  }
};
var JoyridePortal = class extends React32.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "node", null);
  }
  componentDidMount() {
    const { id } = this.props;
    if (!canUseDOM2()) {
      return;
    }
    this.node = document.createElement("div");
    this.node.id = id;
    document.body.appendChild(this.node);
    if (!isReact162) {
      this.renderReact15();
    }
  }
  componentDidUpdate() {
    if (!canUseDOM2()) {
      return;
    }
    if (!isReact162) {
      this.renderReact15();
    }
  }
  componentWillUnmount() {
    if (!canUseDOM2() || !this.node) {
      return;
    }
    if (!isReact162) {
      ReactDOM2.unmountComponentAtNode(this.node);
    }
    if (this.node.parentNode === document.body) {
      document.body.removeChild(this.node);
      this.node = null;
    }
  }
  renderReact15() {
    if (!canUseDOM2()) {
      return;
    }
    const { children } = this.props;
    if (this.node) {
      ReactDOM2.unstable_renderSubtreeIntoContainer(this, children, this.node);
    }
  }
  renderReact16() {
    if (!canUseDOM2() || !isReact162) {
      return null;
    }
    const { children } = this.props;
    if (!this.node) {
      return null;
    }
    return ReactDOM2.createPortal(children, this.node);
  }
  render() {
    if (!isReact162) {
      return null;
    }
    return this.renderReact16();
  }
};
var Scope = class {
  constructor(element, options) {
    __publicField(this, "element");
    __publicField(this, "options");
    __publicField(this, "canBeTabbed", (element2) => {
      const { tabIndex } = element2;
      if (tabIndex === null || tabIndex < 0) {
        return false;
      }
      return this.canHaveFocus(element2);
    });
    __publicField(this, "canHaveFocus", (element2) => {
      const validTabNodes = /input|select|textarea|button|object/;
      const nodeName = element2.nodeName.toLowerCase();
      const isValid = validTabNodes.test(nodeName) && !element2.getAttribute("disabled") || nodeName === "a" && !!element2.getAttribute("href");
      return isValid && this.isVisible(element2);
    });
    __publicField(this, "findValidTabElements", () => [].slice.call(this.element.querySelectorAll("*"), 0).filter(this.canBeTabbed));
    __publicField(this, "handleKeyDown", (event) => {
      const { code = "Tab" } = this.options;
      if (event.code === code) {
        this.interceptTab(event);
      }
    });
    __publicField(this, "interceptTab", (event) => {
      event.preventDefault();
      const elements = this.findValidTabElements();
      const { shiftKey } = event;
      if (!elements.length) {
        return;
      }
      let x = document.activeElement ? elements.indexOf(document.activeElement) : 0;
      if (x === -1 || !shiftKey && x + 1 === elements.length) {
        x = 0;
      } else if (shiftKey && x === 0) {
        x = elements.length - 1;
      } else {
        x += shiftKey ? -1 : 1;
      }
      elements[x].focus();
    });
    __publicField(this, "isHidden", (element2) => {
      const noSize = element2.offsetWidth <= 0 && element2.offsetHeight <= 0;
      const style = window.getComputedStyle(element2);
      if (noSize && !element2.innerHTML) {
        return true;
      }
      return noSize && style.getPropertyValue("overflow") !== "visible" || style.getPropertyValue("display") === "none";
    });
    __publicField(this, "isVisible", (element2) => {
      let parentElement = element2;
      while (parentElement) {
        if (parentElement instanceof HTMLElement) {
          if (parentElement === document.body) {
            break;
          }
          if (this.isHidden(parentElement)) {
            return false;
          }
          parentElement = parentElement.parentNode;
        }
      }
      return true;
    });
    __publicField(this, "removeScope", () => {
      window.removeEventListener("keydown", this.handleKeyDown);
    });
    __publicField(this, "checkFocus", (target) => {
      if (document.activeElement !== target) {
        target.focus();
        window.requestAnimationFrame(() => this.checkFocus(target));
      }
    });
    __publicField(this, "setFocus", () => {
      const { selector } = this.options;
      if (!selector) {
        return;
      }
      const target = this.element.querySelector(selector);
      if (target) {
        window.requestAnimationFrame(() => this.checkFocus(target));
      }
    });
    if (!(element instanceof HTMLElement)) {
      throw new TypeError("Invalid parameter: element must be an HTMLElement");
    }
    this.element = element;
    this.options = options;
    window.addEventListener("keydown", this.handleKeyDown, false);
    this.setFocus();
  }
};
var JoyrideBeacon = class extends React4.Component {
  constructor(props) {
    super(props);
    __publicField(this, "beacon", null);
    __publicField(this, "setBeaconRef", (c) => {
      this.beacon = c;
    });
    if (props.beaconComponent) {
      return;
    }
    const head = document.head || document.getElementsByTagName("head")[0];
    const style = document.createElement("style");
    style.id = "joyride-beacon-animation";
    if (props.nonce) {
      style.setAttribute("nonce", props.nonce);
    }
    const css = `
        @keyframes joyride-beacon-inner {
          20% {
            opacity: 0.9;
          }
        
          90% {
            opacity: 0.7;
          }
        }
        
        @keyframes joyride-beacon-outer {
          0% {
            transform: scale(1);
          }
        
          45% {
            opacity: 0.7;
            transform: scale(0.75);
          }
        
          100% {
            opacity: 0.9;
            transform: scale(1);
          }
        }
      `;
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
  }
  componentDidMount() {
    const { shouldFocus } = this.props;
    if (true) {
      if (!src_default.domElement(this.beacon)) {
        console.warn("beacon is not a valid DOM element");
      }
    }
    setTimeout(() => {
      if (src_default.domElement(this.beacon) && shouldFocus) {
        this.beacon.focus();
      }
    }, 0);
  }
  componentWillUnmount() {
    const style = document.getElementById("joyride-beacon-animation");
    if (style == null ? void 0 : style.parentNode) {
      style.parentNode.removeChild(style);
    }
  }
  render() {
    const {
      beaconComponent,
      continuous,
      index,
      isLastStep,
      locale,
      onClickOrHover,
      size,
      step,
      styles
    } = this.props;
    const title = getReactNodeText(locale.open);
    const sharedProps = {
      "aria-label": title,
      onClick: onClickOrHover,
      onMouseEnter: onClickOrHover,
      ref: this.setBeaconRef,
      title
    };
    let component;
    if (beaconComponent) {
      const BeaconComponent = beaconComponent;
      component = React4.createElement(
        BeaconComponent,
        {
          continuous,
          index,
          isLastStep,
          size,
          step,
          ...sharedProps
        }
      );
    } else {
      component = React4.createElement(
        "button",
        {
          key: "JoyrideBeacon",
          className: "react-joyride__beacon",
          "data-test-id": "button-beacon",
          style: styles.beacon,
          type: "button",
          ...sharedProps
        },
        React4.createElement("span", { style: styles.beaconInner }),
        React4.createElement("span", { style: styles.beaconOuter })
      );
    }
    return component;
  }
};
function JoyrideTooltipCloseButton({ styles, ...props }) {
  const { color, height, width, ...style } = styles;
  return import_react3.default.createElement("button", { style, type: "button", ...props }, import_react3.default.createElement(
    "svg",
    {
      height: typeof height === "number" ? `${height}px` : height,
      preserveAspectRatio: "xMidYMid",
      version: "1.1",
      viewBox: "0 0 18 18",
      width: typeof width === "number" ? `${width}px` : width,
      xmlns: "http://www.w3.org/2000/svg"
    },
    import_react3.default.createElement("g", null, import_react3.default.createElement(
      "path",
      {
        d: "M8.13911129,9.00268191 L0.171521827,17.0258467 C-0.0498027049,17.248715 -0.0498027049,17.6098394 0.171521827,17.8327545 C0.28204354,17.9443526 0.427188206,17.9998706 0.572051765,17.9998706 C0.71714958,17.9998706 0.862013139,17.9443526 0.972581703,17.8327545 L9.0000937,9.74924618 L17.0276057,17.8327545 C17.1384085,17.9443526 17.2832721,17.9998706 17.4281356,17.9998706 C17.5729992,17.9998706 17.718097,17.9443526 17.8286656,17.8327545 C18.0499901,17.6098862 18.0499901,17.2487618 17.8286656,17.0258467 L9.86135722,9.00268191 L17.8340066,0.973848225 C18.0553311,0.750979934 18.0553311,0.389855532 17.8340066,0.16694039 C17.6126821,-0.0556467968 17.254037,-0.0556467968 17.0329467,0.16694039 L9.00042166,8.25611765 L0.967006424,0.167268345 C0.745681892,-0.0553188426 0.387317931,-0.0553188426 0.165993399,0.167268345 C-0.0553311331,0.390136635 -0.0553311331,0.751261038 0.165993399,0.974176179 L8.13920499,9.00268191 L8.13911129,9.00268191 Z",
        fill: color
      }
    ))
  ));
}
var CloseButton_default = JoyrideTooltipCloseButton;
function JoyrideTooltipContainer(props) {
  const { backProps, closeProps, index, isLastStep, primaryProps, skipProps, step, tooltipProps } = props;
  const { content, hideBackButton, hideCloseButton, hideFooter, showSkipButton, styles, title } = step;
  const output = {};
  output.primary = React6.createElement(
    "button",
    {
      "data-test-id": "button-primary",
      style: styles.buttonNext,
      type: "button",
      ...primaryProps
    }
  );
  if (showSkipButton && !isLastStep) {
    output.skip = React6.createElement(
      "button",
      {
        "aria-live": "off",
        "data-test-id": "button-skip",
        style: styles.buttonSkip,
        type: "button",
        ...skipProps
      }
    );
  }
  if (!hideBackButton && index > 0) {
    output.back = React6.createElement("button", { "data-test-id": "button-back", style: styles.buttonBack, type: "button", ...backProps });
  }
  output.close = !hideCloseButton && React6.createElement(CloseButton_default, { "data-test-id": "button-close", styles: styles.buttonClose, ...closeProps });
  return React6.createElement(
    "div",
    {
      key: "JoyrideTooltip",
      "aria-label": getReactNodeText(title != null ? title : content),
      className: "react-joyride__tooltip",
      style: styles.tooltip,
      ...tooltipProps
    },
    React6.createElement("div", { style: styles.tooltipContainer }, title && React6.createElement("h1", { "aria-label": getReactNodeText(title), style: styles.tooltipTitle }, title), React6.createElement("div", { style: styles.tooltipContent }, content)),
    !hideFooter && React6.createElement("div", { style: styles.tooltipFooter }, React6.createElement("div", { style: styles.tooltipFooterSpacer }, output.skip), output.back, output.primary),
    output.close
  );
}
var Container_default = JoyrideTooltipContainer;
var JoyrideTooltip = class extends React7.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "handleClickBack", (event) => {
      event.preventDefault();
      const { helpers } = this.props;
      helpers.prev();
    });
    __publicField(this, "handleClickClose", (event) => {
      event.preventDefault();
      const { helpers } = this.props;
      helpers.close("button_close");
    });
    __publicField(this, "handleClickPrimary", (event) => {
      event.preventDefault();
      const { continuous, helpers } = this.props;
      if (!continuous) {
        helpers.close("button_primary");
        return;
      }
      helpers.next();
    });
    __publicField(this, "handleClickSkip", (event) => {
      event.preventDefault();
      const { helpers } = this.props;
      helpers.skip();
    });
    __publicField(this, "getElementsProps", () => {
      const { continuous, index, isLastStep, setTooltipRef, size, step } = this.props;
      const { back, close, last, next, nextLabelWithProgress, skip } = step.locale;
      const backText = getReactNodeText(back);
      const closeText = getReactNodeText(close);
      const lastText = getReactNodeText(last);
      const nextText = getReactNodeText(next);
      const skipText = getReactNodeText(skip);
      let primary = close;
      let primaryText = closeText;
      if (continuous) {
        primary = next;
        primaryText = nextText;
        if (step.showProgress && !isLastStep) {
          const labelWithProgress = getReactNodeText(nextLabelWithProgress, {
            step: index + 1,
            steps: size
          });
          primary = replaceLocaleContent(nextLabelWithProgress, index + 1, size);
          primaryText = labelWithProgress;
        }
        if (isLastStep) {
          primary = last;
          primaryText = lastText;
        }
      }
      return {
        backProps: {
          "aria-label": backText,
          children: back,
          "data-action": "back",
          onClick: this.handleClickBack,
          role: "button",
          title: backText
        },
        closeProps: {
          "aria-label": closeText,
          children: close,
          "data-action": "close",
          onClick: this.handleClickClose,
          role: "button",
          title: closeText
        },
        primaryProps: {
          "aria-label": primaryText,
          children: primary,
          "data-action": "primary",
          onClick: this.handleClickPrimary,
          role: "button",
          title: primaryText
        },
        skipProps: {
          "aria-label": skipText,
          children: skip,
          "data-action": "skip",
          onClick: this.handleClickSkip,
          role: "button",
          title: skipText
        },
        tooltipProps: {
          "aria-modal": true,
          ref: setTooltipRef,
          role: "alertdialog"
        }
      };
    });
  }
  render() {
    const { continuous, index, isLastStep, setTooltipRef, size, step } = this.props;
    const { beaconComponent, tooltipComponent, ...cleanStep } = step;
    let component;
    if (tooltipComponent) {
      const renderProps = {
        ...this.getElementsProps(),
        continuous,
        index,
        isLastStep,
        size,
        step: cleanStep,
        setTooltipRef
      };
      const TooltipComponent = tooltipComponent;
      component = React7.createElement(TooltipComponent, { ...renderProps });
    } else {
      component = React7.createElement(
        Container_default,
        {
          ...this.getElementsProps(),
          continuous,
          index,
          isLastStep,
          size,
          step
        }
      );
    }
    return component;
  }
};
var JoyrideStep = class extends React8.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "scope", null);
    __publicField(this, "tooltip", null);
    __publicField(this, "handleClickHoverBeacon", (event) => {
      const { step, store } = this.props;
      if (event.type === "mouseenter" && step.event !== "hover") {
        return;
      }
      store.update({ lifecycle: LIFECYCLE.TOOLTIP });
    });
    __publicField(this, "setTooltipRef", (element) => {
      this.tooltip = element;
    });
    __publicField(this, "setPopper", (popper, type) => {
      var _a;
      const { action, lifecycle, step, store } = this.props;
      if (type === "wrapper") {
        store.setPopper("beacon", popper);
      } else {
        store.setPopper("tooltip", popper);
      }
      if (store.getPopper("beacon") && (store.getPopper("tooltip") || step.placement === "center") && lifecycle === LIFECYCLE.INIT) {
        store.update({
          action,
          lifecycle: LIFECYCLE.READY
        });
      }
      if ((_a = step.floaterProps) == null ? void 0 : _a.getPopper) {
        step.floaterProps.getPopper(popper, type);
      }
    });
    __publicField(this, "renderTooltip", (renderProps) => {
      const { continuous, helpers, index, size, step } = this.props;
      return React8.createElement(
        JoyrideTooltip,
        {
          continuous,
          helpers,
          index,
          isLastStep: index + 1 === size,
          setTooltipRef: this.setTooltipRef,
          size,
          step,
          ...renderProps
        }
      );
    });
  }
  componentDidMount() {
    const { debug, index } = this.props;
    log2({
      title: `step:${index}`,
      data: [{ key: "props", value: this.props }],
      debug
    });
  }
  componentDidUpdate(previousProps) {
    var _a;
    const {
      action,
      callback,
      continuous,
      controlled,
      debug,
      helpers,
      index,
      lifecycle,
      shouldScroll: shouldScroll2,
      status,
      step,
      store
    } = this.props;
    const { changed, changedFrom } = treeChanges(previousProps, this.props);
    const state = helpers.info();
    const skipBeacon = continuous && action !== ACTIONS.CLOSE && (index > 0 || action === ACTIONS.PREV);
    const hasStoreChanged = changed("action") || changed("index") || changed("lifecycle") || changed("status");
    const isInitial = changedFrom("lifecycle", [LIFECYCLE.TOOLTIP, LIFECYCLE.INIT], LIFECYCLE.INIT);
    const isAfterAction = changed("action", [
      ACTIONS.NEXT,
      ACTIONS.PREV,
      ACTIONS.SKIP,
      ACTIONS.CLOSE
    ]);
    const isControlled = controlled && index === previousProps.index;
    if (isAfterAction && (isInitial || isControlled)) {
      callback({
        ...state,
        index: previousProps.index,
        lifecycle: LIFECYCLE.COMPLETE,
        step: previousProps.step,
        type: EVENTS.STEP_AFTER
      });
    }
    if (step.placement === "center" && status === STATUS2.RUNNING && changed("index") && action !== ACTIONS.START && lifecycle === LIFECYCLE.INIT) {
      store.update({ lifecycle: LIFECYCLE.READY });
    }
    if (hasStoreChanged) {
      const element = getElement(step.target);
      const elementExists = !!element;
      const hasRenderedTarget = elementExists && isElementVisible(element);
      if (hasRenderedTarget) {
        if (changedFrom("status", STATUS2.READY, STATUS2.RUNNING) || changedFrom("lifecycle", LIFECYCLE.INIT, LIFECYCLE.READY)) {
          callback({
            ...state,
            step,
            type: EVENTS.STEP_BEFORE
          });
        }
      } else {
        console.warn(elementExists ? "Target not visible" : "Target not mounted", step);
        callback({
          ...state,
          type: EVENTS.TARGET_NOT_FOUND,
          step
        });
        if (!controlled) {
          store.update({ index: index + (action === ACTIONS.PREV ? -1 : 1) });
        }
      }
    }
    if (changedFrom("lifecycle", LIFECYCLE.INIT, LIFECYCLE.READY)) {
      store.update({
        lifecycle: hideBeacon(step) || skipBeacon ? LIFECYCLE.TOOLTIP : LIFECYCLE.BEACON
      });
    }
    if (changed("index")) {
      log2({
        title: `step:${lifecycle}`,
        data: [{ key: "props", value: this.props }],
        debug
      });
    }
    if (changed("lifecycle", LIFECYCLE.BEACON)) {
      callback({
        ...state,
        step,
        type: EVENTS.BEACON
      });
    }
    if (changed("lifecycle", LIFECYCLE.TOOLTIP)) {
      callback({
        ...state,
        step,
        type: EVENTS.TOOLTIP
      });
      if (shouldScroll2 && this.tooltip) {
        this.scope = new Scope(this.tooltip, { selector: "[data-action=primary]" });
        this.scope.setFocus();
      }
    }
    if (changedFrom("lifecycle", [LIFECYCLE.TOOLTIP, LIFECYCLE.INIT], LIFECYCLE.INIT)) {
      (_a = this.scope) == null ? void 0 : _a.removeScope();
      store.cleanupPoppers();
    }
  }
  componentWillUnmount() {
    var _a;
    (_a = this.scope) == null ? void 0 : _a.removeScope();
  }
  get open() {
    const { lifecycle, step } = this.props;
    return hideBeacon(step) || lifecycle === LIFECYCLE.TOOLTIP;
  }
  render() {
    const { continuous, debug, index, nonce, shouldScroll: shouldScroll2, size, step } = this.props;
    const target = getElement(step.target);
    if (!validateStep(step) || !src_default.domElement(target)) {
      return null;
    }
    return React8.createElement("div", { key: `JoyrideStep-${index}`, className: "react-joyride__step" }, React8.createElement(
      ReactFloater,
      {
        ...step.floaterProps,
        component: this.renderTooltip,
        debug,
        getPopper: this.setPopper,
        id: `react-joyride-step-${index}`,
        open: this.open,
        placement: step.placement,
        target: step.target
      },
      React8.createElement(
        JoyrideBeacon,
        {
          beaconComponent: step.beaconComponent,
          continuous,
          index,
          isLastStep: index + 1 === size,
          locale: step.locale,
          nonce,
          onClickOrHover: this.handleClickHoverBeacon,
          shouldFocus: shouldScroll2,
          size,
          step,
          styles: step.styles
        }
      )
    ));
  }
};
var Joyride = class extends React9.Component {
  constructor(props) {
    super(props);
    __publicField(this, "helpers");
    __publicField(this, "store");
    __publicField(this, "callback", (data) => {
      const { callback } = this.props;
      if (src_default.function(callback)) {
        callback(data);
      }
    });
    __publicField(this, "handleKeyboard", (event) => {
      const { index, lifecycle } = this.state;
      const { steps } = this.props;
      const step = steps[index];
      if (lifecycle === LIFECYCLE.TOOLTIP) {
        if (event.code === "Escape" && step && !step.disableCloseOnEsc) {
          this.store.close("keyboard");
        }
      }
    });
    __publicField(this, "handleClickOverlay", () => {
      const { index } = this.state;
      const { steps } = this.props;
      const step = getMergedStep(this.props, steps[index]);
      if (!step.disableOverlayClose) {
        this.helpers.close("overlay");
      }
    });
    __publicField(this, "syncState", (state) => {
      this.setState(state);
    });
    const { debug, getHelpers, run = true, stepIndex } = props;
    this.store = createStore({
      ...props,
      controlled: run && src_default.number(stepIndex)
    });
    this.helpers = this.store.getHelpers();
    const { addListener } = this.store;
    log2({
      title: "init",
      data: [
        { key: "props", value: this.props },
        { key: "state", value: this.state }
      ],
      debug
    });
    addListener(this.syncState);
    if (getHelpers) {
      getHelpers(this.helpers);
    }
    this.state = this.store.getState();
  }
  componentDidMount() {
    if (!canUseDOM2()) {
      return;
    }
    const { debug, disableCloseOnEsc, run, steps } = this.props;
    const { start } = this.store;
    if (validateSteps(steps, debug) && run) {
      start();
    }
    if (!disableCloseOnEsc) {
      document.body.addEventListener("keydown", this.handleKeyboard, { passive: true });
    }
  }
  componentDidUpdate(previousProps, previousState) {
    if (!canUseDOM2()) {
      return;
    }
    const { action, controlled, index, status } = this.state;
    const { debug, run, stepIndex, steps } = this.props;
    const { stepIndex: previousStepIndex, steps: previousSteps } = previousProps;
    const { reset, setSteps, start, stop, update: update2 } = this.store;
    const { changed: changedProps } = treeChanges(previousProps, this.props);
    const { changed, changedFrom } = treeChanges(previousState, this.state);
    const step = getMergedStep(this.props, steps[index]);
    const stepsChanged = !equal(previousSteps, steps);
    const stepIndexChanged = src_default.number(stepIndex) && changedProps("stepIndex");
    const target = getElement(step.target);
    if (stepsChanged) {
      if (validateSteps(steps, debug)) {
        setSteps(steps);
      } else {
        console.warn("Steps are not valid", steps);
      }
    }
    if (changedProps("run")) {
      if (run) {
        start(stepIndex);
      } else {
        stop();
      }
    }
    if (stepIndexChanged) {
      let nextAction = src_default.number(previousStepIndex) && previousStepIndex < stepIndex ? ACTIONS.NEXT : ACTIONS.PREV;
      if (action === ACTIONS.STOP) {
        nextAction = ACTIONS.START;
      }
      if (![STATUS2.FINISHED, STATUS2.SKIPPED].includes(status)) {
        update2({
          action: action === ACTIONS.CLOSE ? ACTIONS.CLOSE : nextAction,
          index: stepIndex,
          lifecycle: LIFECYCLE.INIT
        });
      }
    }
    if (!controlled && status === STATUS2.RUNNING && index === 0 && !target) {
      this.store.update({ index: index + 1 });
      this.callback({
        ...this.state,
        type: EVENTS.TARGET_NOT_FOUND,
        step
      });
    }
    const callbackData = {
      ...this.state,
      index,
      step
    };
    const isAfterAction = changed("action", [
      ACTIONS.NEXT,
      ACTIONS.PREV,
      ACTIONS.SKIP,
      ACTIONS.CLOSE
    ]);
    if (isAfterAction && changed("status", STATUS2.PAUSED)) {
      const previousStep = getMergedStep(this.props, steps[previousState.index]);
      this.callback({
        ...callbackData,
        index: previousState.index,
        lifecycle: LIFECYCLE.COMPLETE,
        step: previousStep,
        type: EVENTS.STEP_AFTER
      });
    }
    if (changed("status", [STATUS2.FINISHED, STATUS2.SKIPPED])) {
      const previousStep = getMergedStep(this.props, steps[previousState.index]);
      if (!controlled) {
        this.callback({
          ...callbackData,
          index: previousState.index,
          lifecycle: LIFECYCLE.COMPLETE,
          step: previousStep,
          type: EVENTS.STEP_AFTER
        });
      }
      this.callback({
        ...callbackData,
        type: EVENTS.TOUR_END,
        // Return the last step when the tour is finished
        step: previousStep,
        index: previousState.index
      });
      reset();
    } else if (changedFrom("status", [STATUS2.IDLE, STATUS2.READY], STATUS2.RUNNING)) {
      this.callback({
        ...callbackData,
        type: EVENTS.TOUR_START
      });
    } else if (changed("status") || changed("action", ACTIONS.RESET)) {
      this.callback({
        ...callbackData,
        type: EVENTS.TOUR_STATUS
      });
    }
    this.scrollToStep(previousState);
  }
  componentWillUnmount() {
    const { disableCloseOnEsc } = this.props;
    if (!disableCloseOnEsc) {
      document.body.removeEventListener("keydown", this.handleKeyboard);
    }
  }
  scrollToStep(previousState) {
    const { index, lifecycle, status } = this.state;
    const {
      debug,
      disableScrollParentFix = false,
      scrollDuration,
      scrollOffset = 20,
      scrollToFirstStep = false,
      steps
    } = this.props;
    const step = getMergedStep(this.props, steps[index]);
    const target = getElement(step.target);
    const shouldScrollToStep = shouldScroll({
      isFirstStep: index === 0,
      lifecycle,
      previousLifecycle: previousState.lifecycle,
      scrollToFirstStep,
      step,
      target
    });
    if (status === STATUS2.RUNNING && shouldScrollToStep) {
      const hasCustomScroll = hasCustomScrollParent(target, disableScrollParentFix);
      const scrollParent2 = getScrollParent2(target, disableScrollParentFix);
      let scrollY = Math.floor(getScrollTo(target, scrollOffset, disableScrollParentFix)) || 0;
      log2({
        title: "scrollToStep",
        data: [
          { key: "index", value: index },
          { key: "lifecycle", value: lifecycle },
          { key: "status", value: status }
        ],
        debug
      });
      const beaconPopper = this.store.getPopper("beacon");
      const tooltipPopper = this.store.getPopper("tooltip");
      if (lifecycle === LIFECYCLE.BEACON && beaconPopper) {
        const { offsets, placement } = beaconPopper;
        if (!["bottom"].includes(placement) && !hasCustomScroll) {
          scrollY = Math.floor(offsets.popper.top - scrollOffset);
        }
      } else if (lifecycle === LIFECYCLE.TOOLTIP && tooltipPopper) {
        const { flipped, offsets, placement } = tooltipPopper;
        if (["top", "right", "left"].includes(placement) && !flipped && !hasCustomScroll) {
          scrollY = Math.floor(offsets.popper.top - scrollOffset);
        } else {
          scrollY -= step.spotlightPadding;
        }
      }
      scrollY = scrollY >= 0 ? scrollY : 0;
      if (status === STATUS2.RUNNING) {
        scrollTo(scrollY, { element: scrollParent2, duration: scrollDuration }).then(
          () => {
            setTimeout(() => {
              var _a;
              (_a = this.store.getPopper("tooltip")) == null ? void 0 : _a.instance.update();
            }, 10);
          }
        );
      }
    }
  }
  render() {
    if (!canUseDOM2()) {
      return null;
    }
    const { index, lifecycle, status } = this.state;
    const {
      continuous = false,
      debug = false,
      nonce,
      scrollToFirstStep = false,
      steps
    } = this.props;
    const isRunning = status === STATUS2.RUNNING;
    const content = {};
    if (isRunning && steps[index]) {
      const step = getMergedStep(this.props, steps[index]);
      content.step = React9.createElement(
        JoyrideStep,
        {
          ...this.state,
          callback: this.callback,
          continuous,
          debug,
          helpers: this.helpers,
          nonce,
          shouldScroll: !step.disableScrolling && (index !== 0 || scrollToFirstStep),
          step,
          store: this.store
        }
      );
      content.overlay = React9.createElement(JoyridePortal, { id: "react-joyride-portal" }, React9.createElement(
        JoyrideOverlay,
        {
          ...step,
          continuous,
          debug,
          lifecycle,
          onClickOverlay: this.handleClickOverlay
        }
      ));
    }
    return React9.createElement("div", { className: "react-joyride" }, content.step, content.overlay);
  }
};
__publicField(Joyride, "defaultProps", defaultProps);
var components_default = Joyride;
export {
  ACTIONS,
  EVENTS,
  LIFECYCLE,
  ORIGIN,
  STATUS2 as STATUS,
  components_default as default
};
/*! Bundled license information:

popper.js/dist/esm/popper.js:
  (**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.16.1
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *)
*/
//# sourceMappingURL=react-joyride.js.map
