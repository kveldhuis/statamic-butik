/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(6);

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(25);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(44)
/* template */
var __vue_template__ = __webpack_require__(45)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/stacks/Form.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f2a7c6e6", Component.options)
  } else {
    hotAPI.reload("data-v-f2a7c6e6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(49)
/* template */
var __vue_template__ = __webpack_require__(50)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/partials/CreateButton.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68d7463d", Component.options)
  } else {
    hotAPI.reload("data-v-68d7463d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(1);
var normalizeHeaderName = __webpack_require__(31);
var enhanceError = __webpack_require__(8);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(9);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(9);
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);
var settle = __webpack_require__(32);
var cookies = __webpack_require__(33);
var buildURL = __webpack_require__(7);
var buildFullPath = __webpack_require__(34);
var parseHeaders = __webpack_require__(37);
var isURLSameOrigin = __webpack_require__(38);
var createError = __webpack_require__(10);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(8);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(15);
module.exports = __webpack_require__(88);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_taxes_Listing__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_taxes_Listing___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_taxes_Listing__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_orders_Listing__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_orders_Listing___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_orders_Listing__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_shipping_Overview__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_shipping_Overview___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_shipping_Overview__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_variants_ManageProductVariants__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_variants_ManageProductVariants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_variants_ManageProductVariants__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fieldtypes_categoriesFieldtype__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fieldtypes_categoriesFieldtype___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__fieldtypes_categoriesFieldtype__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fieldtypes_countriesFieldtype__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fieldtypes_countriesFieldtype___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__fieldtypes_countriesFieldtype__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__fieldtypes_moneyFieldtype__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__fieldtypes_moneyFieldtype___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__fieldtypes_moneyFieldtype__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__fieldtypes_numberFieldtype__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__fieldtypes_numberFieldtype___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__fieldtypes_numberFieldtype__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__fieldtypes_shippingFieldtype__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__fieldtypes_shippingFieldtype___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__fieldtypes_shippingFieldtype__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__fieldtypes_taxFieldtype__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__fieldtypes_taxFieldtype___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__fieldtypes_taxFieldtype__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__fieldtypes_variantsFieldtype__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__fieldtypes_variantsFieldtype___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__fieldtypes_variantsFieldtype__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__partials_CreateButton__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__partials_CreateButton___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__partials_CreateButton__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__partials_PublishFormRedirect__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__partials_PublishFormRedirect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__partials_PublishFormRedirect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__partials_TrackAndTrace__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__partials_TrackAndTrace___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__partials_TrackAndTrace__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_orders_Notes__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_orders_Notes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__components_orders_Notes__);




















Statamic.booting(function () {
    // Control Panel
    Statamic.$components.register('butik-tax-list', __WEBPACK_IMPORTED_MODULE_0__components_taxes_Listing___default.a);
    Statamic.$components.register('butik-order-list', __WEBPACK_IMPORTED_MODULE_1__components_orders_Listing___default.a);
    Statamic.$components.register('butik-shipping-overview', __WEBPACK_IMPORTED_MODULE_2__components_shipping_Overview___default.a);
    Statamic.$components.register('butik-manage-product-variants', __WEBPACK_IMPORTED_MODULE_3__components_variants_ManageProductVariants___default.a);

    // Fieldtypes
    Statamic.$components.register('categories-fieldtype', __WEBPACK_IMPORTED_MODULE_4__fieldtypes_categoriesFieldtype___default.a);
    Statamic.$components.register('countries-fieldtype', __WEBPACK_IMPORTED_MODULE_5__fieldtypes_countriesFieldtype___default.a);
    Statamic.$components.register('money-fieldtype', __WEBPACK_IMPORTED_MODULE_6__fieldtypes_moneyFieldtype___default.a);
    Statamic.$components.register('number-fieldtype', __WEBPACK_IMPORTED_MODULE_7__fieldtypes_numberFieldtype___default.a);
    Statamic.$components.register('shipping-fieldtype', __WEBPACK_IMPORTED_MODULE_8__fieldtypes_shippingFieldtype___default.a);
    Statamic.$components.register('tax-fieldtype', __WEBPACK_IMPORTED_MODULE_9__fieldtypes_taxFieldtype___default.a);
    Statamic.$components.register('variants-fieldtype', __WEBPACK_IMPORTED_MODULE_10__fieldtypes_variantsFieldtype___default.a);

    // Partials
    Statamic.$components.register('create-button', __WEBPACK_IMPORTED_MODULE_11__partials_CreateButton___default.a);
    Statamic.$components.register('publish-form-redirect', __WEBPACK_IMPORTED_MODULE_12__partials_PublishFormRedirect___default.a);
    Statamic.$components.register('track-and-trace', __WEBPACK_IMPORTED_MODULE_13__partials_TrackAndTrace___default.a);
    Statamic.$components.register('notes', __WEBPACK_IMPORTED_MODULE_14__components_orders_Notes___default.a);
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(17)
/* template */
var __vue_template__ = __webpack_require__(19)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/taxes/Listing.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5bb8a8b3", Component.options)
  } else {
    hotAPI.reload("data-v-5bb8a8b3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DeletesListingRow_js__ = __webpack_require__(18);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({

    mixins: [__WEBPACK_IMPORTED_MODULE_0__DeletesListingRow_js__["a" /* default */]],

    props: ['initial-rows', 'columns'],

    data: function data() {
        return {
            rows: this.initialRows
        };
    }
});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            deletingRow: false
        };
    },


    computed: {
        deletingModalTitle: function deletingModalTitle() {
            return this.deletingModalTitleFromRowKey('title');
        }
    },

    methods: {
        confirmDeleteRow: function confirmDeleteRow(id, index) {
            this.deletingRow = { id: id, index: index };
        },
        deletingModalTitleFromRowKey: function deletingModalTitleFromRowKey(key) {
            return __('Delete') + ' ' + this.rows[this.deletingRow.index][key];
        },
        deleteRow: function deleteRow(resourceRoute, message) {
            var _this = this;

            var id = this.deletingRow.id;
            message = message || __('Deleted');

            this.$axios.delete(cp_url(resourceRoute + '/' + id)).then(function () {
                var i = _.indexOf(_this.rows, _.findWhere(_this.rows, { id: id }));
                _this.rows.splice(i, 1);
                _this.deletingRow = false;
                _this.$toast.success(message);

                if (_this.rows.length === 0) location.reload();
            }).catch(function (e) {
                _this.$toast.error(e.response ? e.response.data.message : __('Something went wrong'));
            });
        },
        cancelDeleteRow: function cancelDeleteRow() {
            this.deletingRow = false;
        }
    }
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("data-list", {
    attrs: { columns: _vm.columns, rows: _vm.rows },
    scopedSlots: _vm._u([
      {
        key: "default",
        fn: function(ref) {
          var rows = ref.filteredRows
          return _c(
            "div",
            { staticClass: "card p-0" },
            [
              _c("data-list-table", {
                attrs: { rows: rows },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "cell-title",
                      fn: function(ref) {
                        var collection = ref.row
                        return [
                          _c("a", { attrs: { href: collection.edit_url } }, [
                            _vm._v(_vm._s(collection.title))
                          ])
                        ]
                      }
                    },
                    {
                      key: "actions",
                      fn: function(ref) {
                        var collection = ref.row
                        var index = ref.index
                        return [
                          _c(
                            "dropdown-list",
                            [
                              _c("dropdown-item", {
                                attrs: {
                                  text: _vm.__("Edit"),
                                  redirect: collection.edit_url
                                }
                              }),
                              _vm._v(" "),
                              collection.deleteable
                                ? _c("dropdown-item", {
                                    staticClass: "warning",
                                    attrs: { text: _vm.__("Delete") },
                                    on: {
                                      click: function($event) {
                                        return _vm.confirmDeleteRow(
                                          collection.slug,
                                          index
                                        )
                                      }
                                    }
                                  })
                                : _vm._e()
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _vm.deletingRow !== false
                            ? _c("confirmation-modal", {
                                attrs: {
                                  title: _vm.deletingModalTitle,
                                  bodyText: _vm.__(
                                    "Are you sure you want to delete this tax? You will not be able to delete this shipping if used by any product."
                                  ),
                                  buttonText: _vm.__("Delete"),
                                  danger: true
                                },
                                on: {
                                  confirm: function($event) {
                                    return _vm.deleteRow(
                                      "/butik/settings/taxes"
                                    )
                                  },
                                  cancel: _vm.cancelDeleteRow
                                }
                              })
                            : _vm._e()
                        ]
                      }
                    }
                  ],
                  null,
                  true
                )
              })
            ],
            1
          )
        }
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5bb8a8b3", module.exports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(21)
/* template */
var __vue_template__ = __webpack_require__(22)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/orders/Listing.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1a4cbf45", Component.options)
  } else {
    hotAPI.reload("data-v-1a4cbf45", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [Listing],

    props: {
        ordersRequestUrl: '',
        showRoute: ''
    },

    data: function data() {
        return {
            rows: this.initialRows,
            requestUrl: this.ordersRequestUrl,
            preferencesPrefix: 'butik.orders'
        };
    },


    methods: {
        showUrl: function showUrl(order) {
            return this.showRoute.replace('XXX', order.id);
        }
    }
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.initializing
        ? _c("div", { staticClass: "card loading" }, [_c("loading-graphic")], 1)
        : _vm._e(),
      _vm._v(" "),
      !_vm.initializing
        ? _c("data-list", {
            attrs: {
              columns: _vm.columns,
              rows: _vm.items,
              sort: false,
              "sort-column": _vm.sortColumn,
              "sort-direction": _vm.sortDirection
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "default",
                  fn: function(ref) {
                    var hasSelections = ref.hasSelections
                    return _c(
                      "div",
                      {},
                      [
                        _c(
                          "div",
                          { staticClass: "card p-0 relative" },
                          [
                            _c(
                              "div",
                              { staticClass: "data-list-header" },
                              [
                                _c("data-list-filters", {
                                  attrs: {
                                    filters: _vm.filters,
                                    "active-preset": _vm.activePreset,
                                    "active-preset-payload":
                                      _vm.activePresetPayload,
                                    "active-filters": _vm.activeFilters,
                                    "active-filter-badges":
                                      _vm.activeFilterBadges,
                                    "active-count": _vm.activeFilterCount,
                                    "search-query": _vm.searchQuery,
                                    "saves-presets": true,
                                    "preferences-prefix": _vm.preferencesPrefix
                                  },
                                  on: {
                                    "filter-changed": _vm.filterChanged,
                                    "search-changed": _vm.searchChanged,
                                    saved: function($event) {
                                      return _vm.$refs.presets.setPreset($event)
                                    },
                                    deleted: function($event) {
                                      return _vm.$refs.presets.refreshPresets()
                                    },
                                    "restore-preset": function($event) {
                                      return _vm.$refs.presets.viewPreset(
                                        $event
                                      )
                                    },
                                    reset: _vm.filtersReset
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("div", {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.items.length === 0,
                                  expression: "items.length === 0"
                                }
                              ],
                              staticClass: "p-3 text-center text-grey-50",
                              domProps: {
                                textContent: _vm._s(_vm.__("No results"))
                              }
                            }),
                            _vm._v(" "),
                            _c("data-list-bulk-actions", {
                              attrs: { url: _vm.bulkActionsUrl },
                              on: {
                                started: _vm.actionStarted,
                                completed: _vm.actionCompleted
                              }
                            }),
                            _vm._v(" "),
                            _vm.items.length
                              ? _c("data-list-table", {
                                  attrs: {
                                    loading: _vm.loading,
                                    "allow-bulk-actions": true,
                                    "allow-column-picker": true,
                                    "column-preferences-key": _vm.preferencesKey(
                                      "columns"
                                    )
                                  },
                                  on: { sorted: _vm.sorted },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "cell-name",
                                        fn: function(ref) {
                                          var order = ref.row
                                          var value = ref.value
                                          return [
                                            _c(
                                              "a",
                                              {
                                                attrs: {
                                                  href: _vm.showUrl(order)
                                                }
                                              },
                                              [_vm._v(_vm._s(value))]
                                            )
                                          ]
                                        }
                                      },
                                      {
                                        key: "actions",
                                        fn: function(ref) {
                                          var order = ref.row
                                          var index = ref.index
                                          return [
                                            _c(
                                              "dropdown-list",
                                              [
                                                _c("dropdown-item", {
                                                  attrs: {
                                                    text: _vm.__("View"),
                                                    redirect: _vm.showUrl(order)
                                                  }
                                                }),
                                                _vm._v(" "),
                                                _c("data-list-inline-actions", {
                                                  attrs: {
                                                    item: order.id,
                                                    url: _vm.runActionUrl,
                                                    actions: order.actions
                                                  },
                                                  on: {
                                                    started: _vm.actionStarted,
                                                    completed:
                                                      _vm.actionCompleted
                                                  }
                                                })
                                              ],
                                              1
                                            )
                                          ]
                                        }
                                      }
                                    ],
                                    null,
                                    true
                                  )
                                })
                              : _vm._e()
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("data-list-pagination", {
                          staticClass: "mt-3",
                          attrs: {
                            "resource-meta": _vm.meta,
                            "per-page": _vm.perPage
                          },
                          on: {
                            "page-selected": _vm.selectPage,
                            "per-page-changed": _vm.changePerPage
                          }
                        })
                      ],
                      1
                    )
                  }
                }
              ],
              null,
              false,
              3601896263
            )
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1a4cbf45", module.exports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(24)
/* template */
var __vue_template__ = __webpack_require__(57)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/shipping/Overview.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-597bd91f", Component.options)
  } else {
    hotAPI.reload("data-v-597bd91f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stacks_Form__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stacks_Form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stacks_Form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ProfileCard__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ProfileCard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ProfileCard__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__partials_CreateButton__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__partials_CreateButton___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__partials_CreateButton__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ManageProfileStack__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ManageProfileStack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ManageProfileStack__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        shippingProfileCreateTitle: String,
        shippingProfileRoute: String,
        shippingProfileBlueprint: Array,
        shippingProfileValues: Array,
        shippingProfileMeta: Array,

        shippingZoneCreateTitle: String,
        shippingZoneRoute: String,
        shippingZoneBlueprint: Array,
        shippingZoneValues: Array,
        shippingZoneMeta: Array,

        shippingRateCreateTitle: String,
        shippingRateRoute: String,
        shippingRateBlueprint: Array,
        shippingRateValues: Array,
        shippingRateMeta: Array
    },

    components: {
        CreateButton: __WEBPACK_IMPORTED_MODULE_3__partials_CreateButton___default.a,
        FormStack: __WEBPACK_IMPORTED_MODULE_1__stacks_Form___default.a,
        ManageProfileStack: __WEBPACK_IMPORTED_MODULE_4__ManageProfileStack___default.a,
        ProfileCard: __WEBPACK_IMPORTED_MODULE_2__ProfileCard___default.a
    },

    data: function data() {
        return {
            showCreateShippingProfileStack: false,
            showShippingProfileManageStack: false,
            shippingProfiles: []
        };
    },
    mounted: function mounted() {
        this.fetchShippingProfiles();
    },


    methods: {
        refresh: function refresh() {
            this.fetchShippingProfiles();
        },
        fetchShippingProfiles: function fetchShippingProfiles() {
            var _this = this;

            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(this.shippingProfileRoute).then(function (response) {
                _this.shippingProfiles = response.data;
            }).catch(function (error) {
                _this.$toast.error(error);
            });
        },
        shippingProfileSaved: function shippingProfileSaved() {
            this.showCreateShippingProfileStack = false;
            this.refresh();
        },
        openManageStack: function openManageStack(slug) {
            this.showShippingProfileManageStack = slug;
        },
        closeShippingProfileManageStack: function closeShippingProfileManageStack() {
            this.showShippingProfileManageStack = false;
            this.refresh();
        },
        deleteShippingProfile: function deleteShippingProfile(slug) {
            var _this2 = this;

            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(this.shippingProfileRoute + "/" + slug).then(function () {
                _this2.showShippingProfileManageStack = false;
                _this2.fetchShippingProfiles();
            }).catch(function (error) {
                _this2.$toast.error('You can\'t delete this shipping profile, if still related to a product.');
            });
        }
    }
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);
var bind = __webpack_require__(6);
var Axios = __webpack_require__(26);
var mergeConfig = __webpack_require__(12);
var defaults = __webpack_require__(5);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(13);
axios.CancelToken = __webpack_require__(41);
axios.isCancel = __webpack_require__(11);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(42);

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(43);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);
var buildURL = __webpack_require__(7);
var InterceptorManager = __webpack_require__(27);
var dispatchRequest = __webpack_require__(28);
var mergeConfig = __webpack_require__(12);
var validator = __webpack_require__(39);

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);
var transformData = __webpack_require__(29);
var isCancel = __webpack_require__(11);
var defaults = __webpack_require__(5);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);
var defaults = __webpack_require__(5);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(10);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(35);
var combineURLs = __webpack_require__(36);

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pkg = __webpack_require__(40);

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');

/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */
function isOlderVersion(version, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
  var destVer = version.split('.');
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}

/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  var isDeprecated = version && isOlderVersion(version);

  function formatMessage(opt, desc) {
    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  isOlderVersion: isOlderVersion,
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = {"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(13);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        blueprint: null,
        meta: null,
        values: null,
        method: { default: 'post' },
        title: String,
        action: String,
        narrow: Boolean
    },

    methods: {
        close: function close() {
            this.$emit('closed', true);
        },
        saved: function saved() {
            this.$emit('saved', true);
        }
    }
});

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "stack",
    {
      attrs: { name: "Form Stack", narrow: _vm.narrow },
      on: { closed: _vm.close }
    },
    [
      _c("div", { staticClass: "h-full bg-grey-30 p-4 overflow-auto" }, [
        _c(
          "header",
          {
            staticClass:
              "pb-3 py-1 border-b border-grey-30 text-lg font-medium flex items-center justify-between"
          },
          [
            _vm._v("\n            " + _vm._s(_vm.title) + "\n            "),
            _c(
              "button",
              {
                staticClass: "btn-close",
                attrs: { type: "button" },
                on: { click: _vm.close }
              },
              [_vm._v("×")]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          [
            _c("publish-form", {
              attrs: {
                name: "Form Stack publish form",
                title: _vm.title,
                action: _vm.action,
                method: _vm.method,
                blueprint: _vm.blueprint,
                meta: _vm.meta,
                values: _vm.values
              },
              on: { saved: _vm.saved }
            })
          ],
          1
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f2a7c6e6", module.exports)
  }
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(47)
/* template */
var __vue_template__ = __webpack_require__(48)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/shipping/ProfileCard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5fe7abba", Component.options)
  } else {
    hotAPI.reload("data-v-5fe7abba", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        title: {
            type: String,
            default: ''
        },
        slug: {
            type: String,
            default: ''
        },
        zones: {
            type: Array,
            default: []
        }
    },

    methods: {
        manage: function manage(slug) {
            this.$emit('manage', slug);
        },
        isDefault: function isDefault(slug) {
            return slug === 'default';
        }
    }
});

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "card mb-2" }, [
    _c("header", { staticClass: "flex justify-between items-center" }, [
      _c("h2", { staticClass: "mb-2" }, [_vm._v(_vm._s(_vm.title))]),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass:
            "flex items-center text-xs text-grey-70 hover:text-blue outline-none",
          on: {
            click: function($event) {
              return _vm.manage(_vm.slug)
            }
          }
        },
        [
          _vm._v("\n            Manage\n            "),
          _c(
            "svg",
            {
              staticClass: "ml-1",
              attrs: {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }
            },
            [
              _c("path", {
                attrs: {
                  d:
                    "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                }
              }),
              _c("path", {
                attrs: {
                  d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                }
              })
            ]
          )
        ]
      )
    ]),
    _vm._v(" "),
    _vm.isDefault(_vm.slug)
      ? _c("p", { staticClass: "text-grey-70 mb-2" }, [
          _vm._v("\n        Your starting point for shipping rates.\n    ")
        ])
      : _vm._e(),
    _vm._v(" "),
    _c("h3", { staticClass: "mb-1 font-bold" }, [_vm._v("Rates for")]),
    _vm._v(" "),
    _c(
      "ul",
      _vm._l(_vm.zones, function(zone) {
        return _vm.zones.length > 0
          ? _c("li", { staticClass: "mb-1 flex items-center" }, [
              _c(
                "svg",
                {
                  staticClass: "mr-1 text-grey-70",
                  attrs: {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }
                },
                [
                  _c("circle", { attrs: { cx: "12", cy: "12", r: "10" } }),
                  _c("line", {
                    attrs: { x1: "2", y1: "12", x2: "22", y2: "12" }
                  }),
                  _c("path", {
                    attrs: {
                      d:
                        "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                    }
                  })
                ]
              ),
              _vm._v("\n            " + _vm._s(zone.title) + "\n        ")
            ])
          : _vm._e()
      }),
      0
    ),
    _vm._v(" "),
    _vm.zones.length === 0
      ? _c("span", { staticClass: "flex items-center text-xs text-grey-70" }, [
          _vm._v("\n            No Shipping Zones created.\n            "),
          _c(
            "button",
            {
              staticClass: "ml-sm text-blue hover:underline",
              on: {
                click: function($event) {
                  return _vm.manage(_vm.slug)
                }
              }
            },
            [_vm._v("Create")]
          )
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5fe7abba", module.exports)
  }
}

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        label: {
            type: String,
            default: ''
        },
        classes: {
            type: String,
            default: 'bg-white'
        }
    },

    methods: {
        click: function click() {
            this.$emit('clicked', true);
        }
    }
});

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "flex justify-center" }, [
    _c(
      "button",
      {
        staticClass:
          "flex inline-flex items-center px-3 py-1 rounded-full shadow-sm text-grey-70 text-sm hover:text-blue outline-none",
        class: _vm.classes,
        on: { click: _vm.click }
      },
      [
        _c(
          "svg",
          {
            staticClass: "mr-1",
            attrs: {
              xmlns: "http://www.w3.org/2000/svg",
              width: "15",
              height: "15",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }
          },
          [
            _c("line", { attrs: { x1: "12", y1: "5", x2: "12", y2: "19" } }),
            _c("line", { attrs: { x1: "5", y1: "12", x2: "19", y2: "12" } })
          ]
        ),
        _vm._v("\n        " + _vm._s(_vm.label) + "\n    ")
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-68d7463d", module.exports)
  }
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(52)
/* template */
var __vue_template__ = __webpack_require__(56)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/shipping/ManageProfileStack.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-baa75dec", Component.options)
  } else {
    hotAPI.reload("data-v-baa75dec", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ManageZoneStack__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ManageZoneStack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ManageZoneStack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_CreateButton__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__partials_CreateButton___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__partials_CreateButton__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stacks_Form__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stacks_Form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__stacks_Form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
    components: { ManageZoneStack: __WEBPACK_IMPORTED_MODULE_0__ManageZoneStack___default.a, CreateButton: __WEBPACK_IMPORTED_MODULE_1__partials_CreateButton___default.a, FormStack: __WEBPACK_IMPORTED_MODULE_2__stacks_Form___default.a },

    props: {
        slug: {
            type: String,
            default: null
        },
        shippingProfileRoute: {
            type: String,
            default: null
        },
        shippingZoneRoute: {
            type: String,
            default: null
        },
        shippingZoneCreateTitle: {
            type: String,
            default: null
        },
        shippingZoneBlueprint: {
            type: Array,
            default: []
        },
        shippingZoneMeta: {
            type: Array,
            default: []
        },
        shippingZoneValues: {
            type: Array,
            default: []
        },
        shippingRateCreateTitle: {
            type: String,
            default: ''
        },
        shippingRateRoute: {
            type: String,
            default: ''
        },
        shippingRateBlueprint: {
            type: Array,
            default: []
        },
        shippingRateValues: {
            type: Array,
            default: []
        },
        shippingRateMeta: {
            type: Array,
            default: []
        }
    },

    data: function data() {
        return {
            showCreateShippingZoneStack: false,
            showCreateShippingRateStack: null,
            showUpdateShippingRateStack: false,
            showShippingZoneManageStack: false,
            shippingZoneUpdatedValues: [],
            shippingRateUpdatedValues: [],
            shippingRateUpdateRoute: '',
            confirmProfileDeletion: false,
            confirmRateDeletion: false,
            profile: []
        };
    },
    mounted: function mounted() {
        this.refresh();
        this.shippingZoneUpdatedValues = this.shippingZoneValues;
        this.shippingRateUpdatedValues = this.shippingRateValues;
        this.updateShippingZoneSlug();
    },


    methods: {
        close: function close() {
            this.$emit('closed', true);
        },
        saved: function saved() {
            this.$emit('saved', true);
        },
        fetchShippingProfile: function fetchShippingProfile(slug) {
            var _this = this;

            __WEBPACK_IMPORTED_MODULE_3_axios___default.a.get(this.shippingProfileRoute + "/" + slug).then(function (response) {
                _this.profile = response.data;
            }).catch(function (error) {
                _this.$toast.error(error);
            });
        },
        refresh: function refresh() {
            this.fetchShippingProfile(this.slug);
        },
        updateShippingZoneSlug: function updateShippingZoneSlug() {
            this.shippingZoneUpdatedValues.shipping_profile_slug = this.slug;
        },
        shippingZoneSaved: function shippingZoneSaved() {
            this.showCreateShippingZoneStack = false;
            this.refresh();
        },
        shippingRateSaved: function shippingRateSaved() {
            this.showCreateShippingRateStack = false;
            this.refresh();
        },
        deleteShippingProfile: function deleteShippingProfile() {
            this.$emit('deleteShippingProfile', this.slug);
            this.confirmProfileDeletion = false;
        },
        editShippingRate: function editShippingRate(rate) {
            this.shippingRateUpdateRoute = this.shippingRateRoute + "/" + rate.id;
            rate.price = rate.price.replace(',', '.'); // make sure to never pass values like 3,02
            this.showUpdateShippingRateStack = rate;
        },
        deleteShippingRate: function deleteShippingRate(id) {
            var _this2 = this;

            __WEBPACK_IMPORTED_MODULE_3_axios___default.a.delete(this.shippingRateRoute + "/" + id).then(function () {
                _this2.refresh();
                _this2.confirmRateDeletion = false;
            }).catch(function (error) {
                _this2.$toast.error(error);
            });
        },
        openCreateShippingRateStack: function openCreateShippingRateStack(id) {
            this.shippingRateUpdatedValues.shipping_zone_id = id;
            this.showCreateShippingRateStack = id;
        },
        closeShippingZoneManageStack: function closeShippingZoneManageStack() {
            this.refresh();
            this.showShippingZoneManageStack = false;
        },
        closeShippingRateUpdateStack: function closeShippingRateUpdateStack() {
            this.refresh();
            this.showUpdateShippingRateStack = false;
        }
    }
});

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(54)
/* template */
var __vue_template__ = __webpack_require__(55)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/shipping/ManageZoneStack.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ff0797be", Component.options)
  } else {
    hotAPI.reload("data-v-ff0797be", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_CreateButton__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_CreateButton___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__partials_CreateButton__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stacks_Form__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stacks_Form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stacks_Form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    components: { CreateButton: __WEBPACK_IMPORTED_MODULE_0__partials_CreateButton___default.a, FormStack: __WEBPACK_IMPORTED_MODULE_1__stacks_Form___default.a },

    props: {
        zone: {
            type: Array,
            default: []
        },
        route: {
            type: String,
            default: ''
        },
        blueprint: {
            type: Array,
            default: []
        },
        meta: {
            type: Array,
            default: []
        },
        values: {
            type: Array,
            default: []
        }
    },

    data: function data() {
        return {
            confirmZoneDeletion: false
        };
    },
    mounted: function mounted() {
        this.values.title = this.zone.title;
        this.values.type = this.zone.type;
        this.values.tax_slug = this.zone.tax_slug;
        this.values.countries = this.zone.countries;
    },


    methods: {
        close: function close() {
            this.$emit('closed', true);
        },
        saved: function saved() {
            this.$emit('saved', true);
        },
        deleteShippingZone: function deleteShippingZone() {
            var _this = this;

            __WEBPACK_IMPORTED_MODULE_2_axios___default.a.delete(this.route + "/" + this.zone.id).then(function () {
                _this.close();
            }).catch(function (error) {
                _this.$toast.error(error);
            });
        }
    }
});

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("stack", { on: { closed: _vm.close } }, [
    _c(
      "div",
      { staticClass: "h-full bg-grey-30 p-4 overflow-auto" },
      [
        _c(
          "header",
          {
            staticClass:
              "pb-5 py-2 border-grey-30 text-lg font-medium flex items-center justify-between"
          },
          [
            _c("div", { staticClass: "flex items-center" }, [
              _c("h2", [
                _vm._v("Manage " + _vm._s(_vm.zone.title) + " shipping zone")
              ])
            ]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn-close",
                attrs: { type: "button" },
                on: { click: _vm.close }
              },
              [_vm._v("×")]
            )
          ]
        ),
        _vm._v(" "),
        _c("publish-form", {
          attrs: {
            action: this.route + "/" + this.zone.id,
            title: "Update general information",
            blueprint: _vm.blueprint,
            meta: _vm.meta,
            method: "patch",
            values: _vm.values
          },
          on: { saved: _vm.close }
        }),
        _vm._v(" "),
        _c("hr", { staticClass: "mt-6 mb-3" }),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "btn-danger",
            on: {
              click: function($event) {
                _vm.confirmZoneDeletion = true
              }
            }
          },
          [_vm._v("Delete shipping zone")]
        ),
        _vm._v(" "),
        _vm.confirmZoneDeletion
          ? _c("confirmation-modal", {
              attrs: {
                danger: "",
                buttonText: "Delete shipping zone",
                title: "Delete",
                bodyText:
                  "Are you sure you want delete this shipping zone? All connected rates will be deleted as well. "
              },
              on: {
                confirm: _vm.deleteShippingZone,
                cancel: function($event) {
                  _vm.confirmZoneDeletion = false
                }
              }
            })
          : _vm._e()
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ff0797be", module.exports)
  }
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("stack", { on: { closed: _vm.close } }, [
    _c(
      "div",
      { staticClass: "h-full bg-white p-4 overflow-auto" },
      [
        _c(
          "header",
          {
            staticClass:
              "pb-5 py-2 border-grey-30 text-lg font-medium flex items-center justify-between"
          },
          [
            _c(
              "div",
              { staticClass: "flex items-center" },
              [
                _c("h2", [
                  _vm._v("Manage " + _vm._s(_vm.profile.title) + " Shipping")
                ]),
                _vm._v(" "),
                _c("create-button", {
                  attrs: {
                    label: "Create shipping zone",
                    classes: "bg-grey-20 ml-4"
                  },
                  on: {
                    clicked: function($event) {
                      _vm.showCreateShippingZoneStack = true
                    }
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn-close",
                attrs: { type: "button" },
                on: { click: _vm.close }
              },
              [_vm._v("×")]
            )
          ]
        ),
        _vm._v(" "),
        _vm._l(_vm.profile.zones, function(zone) {
          return _c("section", { staticClass: "mb-6 max-w-md" }, [
            _c(
              "header",
              { staticClass: "mb-1 flex items-start leading-none" },
              [
                _c(
                  "svg",
                  {
                    staticClass: "mr-2 text-grey-70 flex-shrink-0",
                    attrs: {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "24",
                      height: "24",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }
                  },
                  [
                    _c("circle", { attrs: { cx: "12", cy: "12", r: "10" } }),
                    _c("line", {
                      attrs: { x1: "2", y1: "12", x2: "22", y2: "12" }
                    }),
                    _c("path", {
                      attrs: {
                        d:
                          "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                      }
                    })
                  ]
                ),
                _vm._v(" "),
                _c("section", [
                  _c("h3", { staticClass: "block text-2xl" }, [
                    _vm._v(
                      "\n                        " +
                        _vm._s(zone.title) +
                        "\n                        "
                    ),
                    _c(
                      "button",
                      {
                        staticClass:
                          "align-bottom hover:text-blue inline-flex ml-1 text-grey-40 outline-none",
                        on: {
                          click: function($event) {
                            _vm.showShippingZoneManageStack = zone
                          }
                        }
                      },
                      [
                        _c(
                          "svg",
                          {
                            staticClass: "w-6 h-6",
                            attrs: {
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }
                          },
                          [
                            _c("path", {
                              attrs: {
                                d:
                                  "M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                              }
                            }),
                            _c("path", {
                              attrs: {
                                "fill-rule": "evenodd",
                                d:
                                  "M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z",
                                "clip-rule": "evenodd"
                              }
                            })
                          ]
                        )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "ul",
                    {
                      staticClass:
                        "flex flex-wrap leading-loose text-grey-70 list-disc list-inside"
                    },
                    _vm._l(zone.country_names, function(country) {
                      return _c("li", { staticClass: "mr-2" }, [
                        _vm._v(_vm._s(country))
                      ])
                    }),
                    0
                  )
                ])
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "max-w-md mt-4 ml-5 -pl-1" },
              [
                zone.rates.length > 0
                  ? _c(
                      "table",
                      { staticClass: "w-full leading-loose text-grey-70" },
                      [
                        _c(
                          "tr",
                          { staticClass: "text-left border-b-2 text-grey-80" },
                          [
                            _c("th", { staticClass: "font-medium py-2 pl-1" }, [
                              _vm._v("Rate name")
                            ]),
                            _vm._v(" "),
                            _c("th", { staticClass: "font-medium py-2" }, [
                              _vm._v("Minimum amount")
                            ]),
                            _vm._v(" "),
                            _c("th", { staticClass: "font-medium py-2" }, [
                              _vm._v("Price")
                            ]),
                            _vm._v(" "),
                            _c("th", { staticClass: "font-medium py-2" })
                          ]
                        ),
                        _vm._v(" "),
                        _vm._l(zone.rates, function(rate) {
                          return _c(
                            "tr",
                            { staticClass: "border-b hover:bg-grey-10" },
                            [
                              _c("td", { staticClass: "py-2 pl-1" }, [
                                _vm._v(_vm._s(rate.title))
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "py-2" }, [
                                _vm._v(_vm._s(rate.minimum))
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "py-2" }, [
                                _vm._v(_vm._s(rate.price))
                              ]),
                              _vm._v(" "),
                              _c(
                                "td",
                                {
                                  staticClass:
                                    "text-right hover:text-grey-80 pr-1"
                                },
                                [
                                  _c(
                                    "dropdown-list",
                                    { staticClass: "flex justify-end" },
                                    [
                                      _c("dropdown-item", {
                                        attrs: { text: _vm.__("Edit") },
                                        on: {
                                          click: function($event) {
                                            return _vm.editShippingRate(rate)
                                          }
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c("dropdown-item", {
                                        staticClass: "warning",
                                        attrs: { text: _vm.__("Delete") },
                                        on: {
                                          click: function($event) {
                                            _vm.confirmRateDeletion = rate.id
                                          }
                                        }
                                      })
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ]
                          )
                        })
                      ],
                      2
                    )
                  : _c(
                      "div",
                      {
                        staticClass:
                          "bg-orange border-l-8 mb-1 px-4 py-2 text-grey-80"
                      },
                      [
                        _vm._v(
                          "\n                    No rates have been created yet.\n                "
                        )
                      ]
                    ),
                _vm._v(" "),
                _c("create-button", {
                  attrs: {
                    label: "Add rate",
                    classes: "bg-grey-20 mt-2 mr-auto"
                  },
                  on: {
                    clicked: function($event) {
                      return _vm.openCreateShippingRateStack(zone.id)
                    }
                  }
                })
              ],
              1
            )
          ])
        }),
        _vm._v(" "),
        _c("hr", { staticClass: "mt-6 mb-3" }),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "btn-danger",
            on: {
              click: function($event) {
                _vm.confirmProfileDeletion = true
              }
            }
          },
          [_vm._v("Delete shipping profile")]
        ),
        _vm._v(" "),
        _vm.confirmProfileDeletion
          ? _c("confirmation-modal", {
              attrs: {
                danger: "",
                buttonText: "Delete shipping profile",
                title: "Delete",
                bodyText: "Are you sure you want delete this shipping profile?"
              },
              on: {
                confirm: _vm.deleteShippingProfile,
                cancel: function($event) {
                  _vm.confirmProfileDeletion = false
                }
              }
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.confirmRateDeletion !== false
          ? _c("confirmation-modal", {
              attrs: {
                danger: "",
                buttonText: "Delete shipping rate",
                title: "Delete",
                bodyText: "Are you sure you want delete this shipping rate?"
              },
              on: {
                confirm: function($event) {
                  return _vm.deleteShippingRate(_vm.confirmRateDeletion)
                },
                cancel: function($event) {
                  _vm.confirmRateDeletion = false
                }
              }
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.showCreateShippingZoneStack
          ? _c("form-stack", {
              attrs: {
                action: _vm.shippingZoneRoute,
                title: _vm.shippingZoneCreateTitle,
                blueprint: _vm.shippingZoneBlueprint,
                meta: _vm.shippingZoneMeta,
                values: _vm.shippingZoneUpdatedValues
              },
              on: {
                closed: function($event) {
                  _vm.showCreateShippingZoneStack = false
                },
                saved: _vm.shippingZoneSaved
              }
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.showCreateShippingRateStack
          ? _c("form-stack", {
              attrs: {
                action: _vm.shippingRateRoute,
                title: _vm.shippingRateCreateTitle,
                blueprint: _vm.shippingRateBlueprint,
                meta: _vm.shippingRateMeta,
                values: _vm.shippingRateUpdatedValues
              },
              on: {
                closed: function($event) {
                  _vm.showCreateShippingRateStack = false
                },
                saved: _vm.shippingRateSaved
              }
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.showShippingZoneManageStack !== false
          ? _c("manage-zone-stack", {
              attrs: {
                zone: _vm.showShippingZoneManageStack,
                route: _vm.shippingZoneRoute,
                blueprint: _vm.shippingZoneBlueprint,
                meta: _vm.shippingZoneMeta,
                values: _vm.shippingZoneUpdatedValues
              },
              on: {
                closed: function($event) {
                  return _vm.closeShippingZoneManageStack()
                }
              }
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.showUpdateShippingRateStack !== false
          ? _c("form-stack", {
              attrs: {
                action: _vm.shippingRateUpdateRoute,
                method: "patch",
                title: "Update shipping rate",
                blueprint: _vm.shippingRateBlueprint,
                meta: _vm.shippingRateMeta,
                values: _vm.showUpdateShippingRateStack
              },
              on: {
                closed: function($event) {
                  _vm.showUpdateShippingRateStack = false
                },
                saved: function($event) {
                  return _vm.closeShippingRateUpdateStack()
                }
              }
            })
          : _vm._e()
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-baa75dec", module.exports)
  }
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm._l(_vm.shippingProfiles, function(profile) {
        return _c("profile-card", {
          key: "profile.slug",
          attrs: {
            title: profile.title,
            slug: profile.slug,
            zones: profile.zones
          },
          on: { manage: _vm.openManageStack }
        })
      }),
      _vm._v(" "),
      _c("create-button", {
        attrs: { label: "Create a new shipping profile" },
        on: {
          clicked: function($event) {
            _vm.showCreateShippingProfileStack = true
          }
        }
      }),
      _vm._v(" "),
      _vm.showCreateShippingProfileStack
        ? _c("form-stack", {
            attrs: {
              narrow: "",
              action: _vm.shippingProfileRoute,
              title: _vm.shippingProfileCreateTitle,
              blueprint: _vm.shippingProfileBlueprint,
              meta: _vm.shippingProfileMeta,
              values: _vm.shippingProfileValues
            },
            on: {
              closed: function($event) {
                _vm.showCreateShippingProfileStack = false
              },
              saved: _vm.shippingProfileSaved
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.showShippingProfileManageStack !== false
        ? _c("manage-profile-stack", {
            attrs: {
              slug: _vm.showShippingProfileManageStack,
              shippingProfileRoute: _vm.shippingProfileRoute,
              shippingZoneRoute: _vm.shippingZoneRoute,
              shippingZoneCreateTitle: _vm.shippingZoneCreateTitle,
              shippingZoneBlueprint: _vm.shippingZoneBlueprint,
              shippingZoneMeta: _vm.shippingZoneMeta,
              shippingZoneValues: _vm.shippingZoneValues,
              shippingRateRoute: _vm.shippingRateRoute,
              shippingRateCreateTitle: _vm.shippingRateCreateTitle,
              shippingRateBlueprint: _vm.shippingRateBlueprint,
              shippingRateMeta: _vm.shippingRateMeta,
              shippingRateValues: _vm.shippingRateValues
            },
            on: {
              closed: _vm.closeShippingProfileManageStack,
              deleteShippingProfile: _vm.deleteShippingProfile
            }
          })
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-597bd91f", module.exports)
  }
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(59)
/* template */
var __vue_template__ = __webpack_require__(60)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/variants/ManageProductVariants.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-69603122", Component.options)
  } else {
    hotAPI.reload("data-v-69603122", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stacks_Form__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stacks_Form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stacks_Form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    components: { FormStack: __WEBPACK_IMPORTED_MODULE_0__stacks_Form___default.a },

    props: {
        action: {
            type: String,
            default: ''
        },
        productSlug: {
            type: String,
            default: ''
        },
        variantIndexRoute: {
            type: String,
            default: ''
        },
        variantManageRoute: {
            type: String,
            default: ''
        },
        variantBlueprint: {
            type: Array,
            default: []
        },
        variantMeta: {
            type: Array,
            default: []
        },
        variantValues: {
            type: Array,
            default: []
        }
    },

    data: function data() {
        return {
            variants: {
                type: Array,
                default: []
            },
            stackValues: {
                type: Array,
                default: []
            },
            stackMethod: 'post',
            stackAction: '',
            showVariantStack: false
        };
    },
    mounted: function mounted() {
        this.variants = this.fetchVariants();
    },


    methods: {
        openCreateVariantStack: function openCreateVariantStack() {
            this.stackValues = this.variantValues;
            this.stackValues.product_slug = this.productSlug;
            this.stackMethod = 'post';
            this.stackAction = this.action;
            this.showVariantStack = true;
        },
        openEditVariantStack: function openEditVariantStack(variant) {
            this.stackValues = variant;
            // We need to transform a , into a dot, to preprocess the values correct
            this.stackValues.price = variant.price.replace(',', '.');
            this.stackAction = this.action + "/" + variant.id;
            this.stackMethod = 'patch';
            this.showVariantStack = true;
        },
        closeVariantStack: function closeVariantStack() {
            this.fetchVariants();
            this.showVariantStack = false;
        },
        fetchVariants: function fetchVariants() {
            var _this = this;

            __WEBPACK_IMPORTED_MODULE_1_axios___default.a.get(this.variantIndexRoute).then(function (response) {
                _this.variants = response.data;
            }).catch(function (error) {
                _this.$toast.error(error);
            });
        },
        deleteVariant: function deleteVariant(variant) {
            var _this2 = this;

            __WEBPACK_IMPORTED_MODULE_1_axios___default.a.delete(this.variantManageRoute + "/" + variant.id).then(function (response) {
                _this2.$toast.success(__('Removed'));
                _this2.fetchVariants();
            }).catch(function (error) {
                _this2.$toast.error(error);
            });
        }
    }
});

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "flex mt-6" },
    [
      _c("section", { staticClass: "flex-grow" }, [
        _c(
          "header",
          { staticClass: "flex mb-3 justify-between" },
          [
            _c("h1", [_vm._v("Variants")]),
            _vm._v(" "),
            _c("create-button", {
              attrs: { label: "New variant", classes: "bg-white" },
              on: { clicked: _vm.openCreateVariantStack }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "publish-section" }, [
          _c("table", { staticClass: "data-table" }, [
            _c(
              "tbody",
              [
                _vm._l(_vm.variants, function(variant) {
                  return _c(
                    "tr",
                    { class: { "bg-grey-30 opacity-75": !variant.available } },
                    [
                      _c("td", { staticClass: "text-base" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(variant.title) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "span",
                          { staticClass: "flex items-center text-xs" },
                          [
                            _vm._v(
                              "\n                            Price:\n                            "
                            ),
                            variant.inherit_price
                              ? _c(
                                  "svg",
                                  {
                                    staticClass: "h-6 ml-1",
                                    attrs: {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      viewBox: "0 0 24 24"
                                    }
                                  },
                                  [
                                    _c("path", {
                                      attrs: {
                                        d:
                                          "M10.082 9.5A4.47 4.47 0 0 0 6.75 8h-1.5a4.5 4.5 0 0 0 0 9h1.5a4.474 4.474 0 0 0 3.332-1.5M13.918 9.5A4.469 4.469 0 0 1 17.25 8h1.5a4.5 4.5 0 1 1 0 9h-1.5a4.472 4.472 0 0 1-3.332-1.5M6.75 12.499h10.5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "1.5"
                                      }
                                    })
                                  ]
                                )
                              : _c("span", { staticClass: "text-base ml-1" }, [
                                  _vm._v(_vm._s(variant.price))
                                ])
                          ]
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "span",
                          { staticClass: "flex items-center text-xs" },
                          [
                            _vm._v(
                              "\n                            Stock:\n                            "
                            ),
                            variant.inherit_stock
                              ? _c(
                                  "svg",
                                  {
                                    staticClass: "h-6 ml-1",
                                    attrs: {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      viewBox: "0 0 24 24"
                                    }
                                  },
                                  [
                                    _c("path", {
                                      attrs: {
                                        d:
                                          "M10.082 9.5A4.47 4.47 0 0 0 6.75 8h-1.5a4.5 4.5 0 0 0 0 9h1.5a4.474 4.474 0 0 0 3.332-1.5M13.918 9.5A4.469 4.469 0 0 1 17.25 8h1.5a4.5 4.5 0 1 1 0 9h-1.5a4.472 4.472 0 0 1-3.332-1.5M6.75 12.499h10.5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "1.5"
                                      }
                                    })
                                  ]
                                )
                              : _c("span", { staticClass: "text-base ml-1" }, [
                                  _vm._v(_vm._s(variant.stock))
                                ])
                          ]
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "td",
                        [
                          _c("toggle-input", {
                            model: {
                              value: variant.available,
                              callback: function($$v) {
                                _vm.$set(variant, "available", $$v)
                              },
                              expression: "variant.available"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "td",
                        [
                          _c(
                            "dropdown-list",
                            { staticClass: "flex justify-end" },
                            [
                              _c("dropdown-item", {
                                attrs: { text: _vm.__("Edit") },
                                on: {
                                  click: function($event) {
                                    return _vm.openEditVariantStack(variant)
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c("dropdown-item", {
                                staticClass: "warning",
                                attrs: { text: _vm.__("Delete") },
                                on: {
                                  click: function($event) {
                                    return _vm.deleteVariant(variant)
                                  }
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ]
                  )
                }),
                _vm._v(" "),
                !_vm.variants || _vm.variants.length === 0
                  ? _c("tr", [
                      _c("td", { attrs: { colspan: "3" } }, [
                        _vm._v("No variants have been created yet.")
                      ])
                    ])
                  : _vm._e()
              ],
              2
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", {
        staticClass: "hidden xl:block ml-2",
        staticStyle: { width: "300px" }
      }),
      _vm._v(" "),
      _vm.showVariantStack
        ? _c("form-stack", {
            attrs: {
              name: "variant stack",
              action: _vm.stackAction,
              title: "Variants",
              blueprint: _vm.variantBlueprint,
              meta: _vm.variantMeta,
              method: _vm.stackMethod,
              values: _vm.stackValues
            },
            on: {
              closed: function($event) {
                _vm.showVariantStack = false
              },
              saved: _vm.closeVariantStack
            }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-69603122", module.exports)
  }
}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(62)
/* template */
var __vue_template__ = __webpack_require__(63)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/fieldtypes/categoriesFieldtype.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2b7587b4", Component.options)
  } else {
    hotAPI.reload("data-v-2b7587b4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_stacks_Form__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_stacks_Form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_stacks_Form__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [Fieldtype],

    components: { FormStack: __WEBPACK_IMPORTED_MODULE_1__components_stacks_Form___default.a },

    data: function data() {
        return {
            categories: [],
            categoryIndexRoute: this.meta.categoryIndexRoute,
            categoryAttachRoute: this.meta.categoryAttachRoute,
            categoryManageRoute: this.meta.categoryManageRoute,
            productSlug: this.meta.productSlug,
            categoryName: '',
            showNewCategory: false,
            isCreateRoute: this.meta.isCreateRoute,
            showCategoryStack: false,
            categoryBlueprint: this.meta.categoryBlueprint,
            categoryValues: this.meta.categoryValues,
            categoryMeta: this.meta.categoryMeta,
            categoryMethod: 'patch'
        };
    },
    mounted: function mounted() {
        if (!this.isCreateRoute) {
            this.categories = this.fetchCategories();
        }
    },


    methods: {
        update: function update(category) {
            if (category.is_attached) {
                this.attachCategory(category);
            } else {
                this.detachCategory(category);
            }
        },
        fetchCategories: function fetchCategories() {
            var _this = this;

            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(this.categoryIndexRoute).then(function (response) {
                _this.categories = response.data;
            }).catch(function (error) {
                _this.$toast.error(error);
            });
        },
        attachCategory: function attachCategory(category) {
            var _this2 = this;

            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(this.createAttachRoute(category)).then(function () {
                _this2.$toast.success(__('Saved'));
            }).catch(function (error) {
                _this2.$toast.error(error);
            });
        },
        detachCategory: function detachCategory(category) {
            var _this3 = this;

            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(this.createAttachRoute(category)).then(function () {
                _this3.$toast.success(__('Saved'));
            }).catch(function (error) {
                _this3.$toast.error(error);
            });
        },
        deleteCategory: function deleteCategory(category) {
            var _this4 = this;

            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(this.categoryDeleteRoute(category)).then(function () {
                _this4.fetchCategories();
                _this4.$toast.success(__('Deleted'));
            }).catch(function (error) {
                _this4.$toast.error(error);
            });

            this.categories.splice(category.slug, 1);
        },
        addCategory: function addCategory() {
            var _this5 = this;

            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(this.categoryManageRoute, {
                name: this.categoryName,
                slug: this.categoryName.toLowerCase().replaceAll(' ', '-')
            }).then(function () {
                _this5.fetchCategories();
                _this5.$toast.success(__('Saved'));
            }).catch(function (error) {
                _this5.$toast.error(error);
            });

            // Add the category to the list
            this.categories.push({
                is_attached: false,
                name: this.categoryName,
                slug: this.categoryName.toLowerCase()
            });

            // Reset our name input
            this.categoryName = '';
        },
        createAttachRoute: function createAttachRoute(category) {
            var route = this.categoryAttachRoute;
            route = route.replace('x-category', category.slug);
            route = route.replace('x-product', this.productSlug);
            return route;
        },
        categoryDeleteRoute: function categoryDeleteRoute(category) {
            return this.categoryManageRoute + "/" + category.slug;
        },
        openEditCategoryStack: function openEditCategoryStack(category) {
            this.categoryValues = category;
            this.categoryAction = this.categoryManageRoute + "/" + category.slug;
            this.showCategoryStack = true;
        },
        closeCategoryStack: function closeCategoryStack() {
            this.fetchCategories();
            this.showCategoryStack = false;
        }
    }
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "flex" },
    [
      !_vm.isCreateRoute
        ? _c("section", { staticClass: "flex-grow" }, [
            _c(
              "header",
              { staticClass: "flex justify-end -mt-5 mb-2 w-full" },
              [
                _c("create-button", {
                  attrs: { label: "New category", classes: "bg-grey-30 z-0" },
                  on: {
                    clicked: function($event) {
                      _vm.showNewCategory = !_vm.showNewCategory
                    }
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _vm.showNewCategory
              ? _c("div", { staticClass: "flex card mb-3" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.categoryName,
                        expression: "categoryName"
                      }
                    ],
                    staticClass: "input-text",
                    domProps: { value: _vm.categoryName },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.categoryName = $event.target.value
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn-primary ml-2",
                      on: { click: _vm.addCategory }
                    },
                    [_vm._v(_vm._s(_vm.__("Save")))]
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "publish-section" }, [
              _c("table", { staticClass: "data-table" }, [
                _c(
                  "tbody",
                  [
                    _vm._l(_vm.categories, function(category) {
                      return _c(
                        "tr",
                        {
                          class: {
                            "bg-grey-30 opacity-75": !category.is_attached
                          }
                        },
                        [
                          _c("td", { staticClass: "pl-2 py-1 text-base" }, [
                            _vm._v(_vm._s(category.name))
                          ]),
                          _vm._v(" "),
                          _c(
                            "td",
                            [
                              _c("toggle-input", {
                                on: {
                                  input: function($event) {
                                    return _vm.update(category)
                                  }
                                },
                                model: {
                                  value: category.is_attached,
                                  callback: function($$v) {
                                    _vm.$set(category, "is_attached", $$v)
                                  },
                                  expression: "category.is_attached"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "td",
                            [
                              _c(
                                "dropdown-list",
                                { staticClass: "flex justify-end" },
                                [
                                  _c("dropdown-item", {
                                    attrs: { text: _vm.__("Edit") },
                                    on: {
                                      click: function($event) {
                                        return _vm.openEditCategoryStack(
                                          category
                                        )
                                      }
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("dropdown-item", {
                                    staticClass: "warning",
                                    attrs: { text: _vm.__("Delete") },
                                    on: {
                                      click: function($event) {
                                        return _vm.deleteCategory(category)
                                      }
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ]
                      )
                    }),
                    _vm._v(" "),
                    !_vm.categories || _vm.categories.length === 0
                      ? _c("tr", [
                          _c("td", { attrs: { colspan: "3" } }, [
                            _vm._v("No Categories have been created yet.")
                          ])
                        ])
                      : _vm._e()
                  ],
                  2
                )
              ])
            ])
          ])
        : _c("section", { staticClass: "w-full" }, [_vm._m(0)]),
      _vm._v(" "),
      _vm.showCategoryStack
        ? _c("form-stack", {
            attrs: {
              name: "category stack",
              title: "Edit this category",
              action: _vm.categoryAction,
              blueprint: _vm.categoryBlueprint,
              meta: _vm.categoryMeta,
              method: _vm.categoryMethod,
              values: _vm.categoryValues
            },
            on: {
              closed: function($event) {
                _vm.showCategoryStack = false
              },
              saved: _vm.closeCategoryStack
            }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "publish-section" }, [
      _c("table", { staticClass: "data-table" }, [
        _c("tbody", [
          _c("tr", [
            _c("td", [
              _vm._v("You can create categories, after saving the product.")
            ])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2b7587b4", module.exports)
  }
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(65)
/* template */
var __vue_template__ = __webpack_require__(66)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/fieldtypes/countriesFieldtype.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9f8c5cbc", Component.options)
  } else {
    hotAPI.reload("data-v-9f8c5cbc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [Fieldtype],

    data: function data() {
        return {
            countries: this.meta.countries
        };
    }
});

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("select-input", {
        attrs: {
          handle: _vm.config.handle,
          value: _vm.value,
          options: _vm.countries
        },
        on: { input: _vm.update }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9f8c5cbc", module.exports)
  }
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(68)
/* template */
var __vue_template__ = __webpack_require__(69)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/fieldtypes/moneyFieldtype.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5de5b7d4", Component.options)
  } else {
    hotAPI.reload("data-v-5de5b7d4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [Fieldtype],

    data: function data() {
        return {
            currencySymbol: this.meta.currencySymbol
        };
    }
});

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("text-input", {
        attrs: {
          type: "number",
          prepend: _vm.currencySymbol,
          min: "0",
          step: "0.01",
          placeholder: "0.00",
          value: _vm.value
        },
        on: { input: _vm.update }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5de5b7d4", module.exports)
  }
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(71)
/* template */
var __vue_template__ = __webpack_require__(72)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/fieldtypes/numberFieldtype.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4a463319", Component.options)
  } else {
    hotAPI.reload("data-v-4a463319", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [Fieldtype],

    data: function data() {
        return {};
    }
});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("text-input", {
        attrs: {
          type: "number",
          min: "0",
          placeholder: "0.00",
          value: _vm.value
        },
        on: { input: _vm.update }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4a463319", module.exports)
  }
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(74)
/* template */
var __vue_template__ = __webpack_require__(75)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/fieldtypes/shippingFieldtype.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b1216158", Component.options)
  } else {
    hotAPI.reload("data-v-b1216158", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [Fieldtype],

    data: function data() {
        return {
            taxes: this.meta.shippings
        };
    }
});

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("select-input", {
        attrs: {
          handle: _vm.config.handle,
          value: _vm.value,
          options: _vm.taxes
        },
        on: { input: _vm.update }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b1216158", module.exports)
  }
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(77)
/* template */
var __vue_template__ = __webpack_require__(78)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/fieldtypes/taxFieldtype.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-19cac4ea", Component.options)
  } else {
    hotAPI.reload("data-v-19cac4ea", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [Fieldtype],

    data: function data() {
        return {
            taxes: this.meta.taxes
        };
    }
});

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("select-input", {
        attrs: {
          handle: _vm.config.handle,
          value: _vm.value,
          options: _vm.taxes
        },
        on: { input: _vm.update }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-19cac4ea", module.exports)
  }
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(80)
/* template */
var __vue_template__ = __webpack_require__(81)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/fieldtypes/variantsFieldtype.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9b864f18", Component.options)
  } else {
    hotAPI.reload("data-v-9b864f18", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_stacks_Form__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_stacks_Form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_stacks_Form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [Fieldtype],

    components: { FormStack: __WEBPACK_IMPORTED_MODULE_0__components_stacks_Form___default.a },

    data: function data() {
        return {
            action: this.meta.action,
            variants: this.meta.variants,
            variantIndexRoute: this.meta.variantIndexRoute,
            variantManageRoute: this.meta.variantManageRoute,
            variantBlueprint: this.meta.variantBlueprint,
            variantMeta: this.meta.variantMeta,
            variantValues: this.meta.variantValues,
            productSlug: this.meta.productSlug,
            showVariantStack: false,
            stackAction: null,
            stackMethod: 'post',
            stackValues: null,
            isCreateRoute: this.meta.isCreateRoute
        };
    },
    mounted: function mounted() {
        if (!this.isCreateRoute) {
            this.fetchVariants();
        }
    },


    methods: {
        fetchVariants: function fetchVariants() {
            var _this = this;

            __WEBPACK_IMPORTED_MODULE_1_axios___default.a.get(this.variantIndexRoute).then(function (response) {
                _this.variants = response.data;
            }).catch(function (error) {
                _this.$toast.error(error);
            });
        },
        openCreateVariantStack: function openCreateVariantStack() {
            this.stackValues = this.variantValues;
            this.stackValues.product_slug = this.productSlug;
            this.stackMethod = 'post';
            this.stackAction = this.action;
            this.showVariantStack = true;
        },
        openEditVariantStack: function openEditVariantStack(variant) {
            this.stackValues = variant;
            // We need to transform a , into a dot, to preprocess the values correct
            this.stackValues.price = variant.price.replace(',', '.');
            this.stackAction = this.action + "/" + variant.id;
            this.stackMethod = 'patch';
            this.showVariantStack = true;
        },
        closeVariantStack: function closeVariantStack() {
            this.fetchVariants();
            this.showVariantStack = false;
        },
        deleteVariant: function deleteVariant(variant) {
            var _this2 = this;

            __WEBPACK_IMPORTED_MODULE_1_axios___default.a.delete(this.variantManageRoute + "/" + variant.id).then(function (response) {
                _this2.$toast.success(__('Removed'));
                _this2.fetchVariants();
            }).catch(function (error) {
                _this2.$toast.error(error);
            });

            this.fetchVariants();
        }
    }
});

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "flex" },
    [
      !_vm.isCreateRoute
        ? _c("section", { staticClass: "flex-grow" }, [
            _c(
              "header",
              { staticClass: "flex justify-end -mt-5 mb-2 w-full" },
              [
                !_vm.isCreateRoute
                  ? _c("create-button", {
                      attrs: {
                        label: "New variant",
                        classes: "bg-grey-30 z-0"
                      },
                      on: { clicked: _vm.openCreateVariantStack }
                    })
                  : _vm._e()
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "publish-section" }, [
              _c("table", { staticClass: "data-table" }, [
                _c(
                  "tbody",
                  [
                    _vm._l(_vm.variants, function(variant) {
                      return _c(
                        "tr",
                        {
                          class: { "bg-grey-30 opacity-75": !variant.available }
                        },
                        [
                          _c("td", { staticClass: "text-base" }, [
                            _vm._v(
                              "\n                        " +
                                _vm._s(variant.title) +
                                "\n                    "
                            )
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _c(
                              "span",
                              { staticClass: "flex items-center text-xs" },
                              [
                                _vm._v(
                                  "\n                            Price:\n                            "
                                ),
                                variant.inherit_price
                                  ? _c(
                                      "svg",
                                      {
                                        staticClass: "h-6 ml-1",
                                        attrs: {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          viewBox: "0 0 24 24"
                                        }
                                      },
                                      [
                                        _c("path", {
                                          attrs: {
                                            d:
                                              "M10.082 9.5A4.47 4.47 0 0 0 6.75 8h-1.5a4.5 4.5 0 0 0 0 9h1.5a4.474 4.474 0 0 0 3.332-1.5M13.918 9.5A4.469 4.469 0 0 1 17.25 8h1.5a4.5 4.5 0 1 1 0 9h-1.5a4.472 4.472 0 0 1-3.332-1.5M6.75 12.499h10.5",
                                            fill: "none",
                                            stroke: "currentColor",
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round",
                                            "stroke-width": "1.5"
                                          }
                                        })
                                      ]
                                    )
                                  : _c(
                                      "span",
                                      { staticClass: "text-base ml-1" },
                                      [_vm._v(_vm._s(variant.price))]
                                    )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _c(
                              "span",
                              { staticClass: "flex items-center text-xs" },
                              [
                                _vm._v(
                                  "\n                            Stock:\n                            "
                                ),
                                variant.inherit_stock
                                  ? _c(
                                      "svg",
                                      {
                                        staticClass: "h-6 ml-1",
                                        attrs: {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          viewBox: "0 0 24 24"
                                        }
                                      },
                                      [
                                        _c("path", {
                                          attrs: {
                                            d:
                                              "M10.082 9.5A4.47 4.47 0 0 0 6.75 8h-1.5a4.5 4.5 0 0 0 0 9h1.5a4.474 4.474 0 0 0 3.332-1.5M13.918 9.5A4.469 4.469 0 0 1 17.25 8h1.5a4.5 4.5 0 1 1 0 9h-1.5a4.472 4.472 0 0 1-3.332-1.5M6.75 12.499h10.5",
                                            fill: "none",
                                            stroke: "currentColor",
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round",
                                            "stroke-width": "1.5"
                                          }
                                        })
                                      ]
                                    )
                                  : _c(
                                      "span",
                                      { staticClass: "text-base ml-1" },
                                      [_vm._v(_vm._s(variant.stock))]
                                    )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "td",
                            [
                              _c("toggle-input", {
                                model: {
                                  value: variant.available,
                                  callback: function($$v) {
                                    _vm.$set(variant, "available", $$v)
                                  },
                                  expression: "variant.available"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "td",
                            [
                              _c(
                                "dropdown-list",
                                { staticClass: "flex justify-end" },
                                [
                                  _c("dropdown-item", {
                                    attrs: { text: _vm.__("Edit") },
                                    on: {
                                      click: function($event) {
                                        return _vm.openEditVariantStack(variant)
                                      }
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("dropdown-item", {
                                    staticClass: "warning",
                                    attrs: { text: _vm.__("Delete") },
                                    on: {
                                      click: function($event) {
                                        return _vm.deleteVariant(variant)
                                      }
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ]
                      )
                    }),
                    _vm._v(" "),
                    !_vm.variants || _vm.variants.length === 0
                      ? _c("tr", [
                          _c("td", { attrs: { colspan: "3" } }, [
                            _vm._v("No variants have been created yet.")
                          ])
                        ])
                      : _vm._e()
                  ],
                  2
                )
              ])
            ])
          ])
        : _c("section", { staticClass: "w-full" }, [_vm._m(0)]),
      _vm._v(" "),
      _vm.showVariantStack
        ? _c("form-stack", {
            attrs: {
              name: "variant stack",
              action: _vm.stackAction,
              title: "Variants",
              blueprint: _vm.variantBlueprint,
              meta: _vm.variantMeta,
              method: _vm.stackMethod,
              values: _vm.stackValues
            },
            on: {
              closed: function($event) {
                _vm.showVariantStack = false
              },
              saved: _vm.closeVariantStack
            }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "publish-section" }, [
      _c("table", { staticClass: "data-table" }, [
        _c("tbody", [
          _c("tr", [
            _c("td", { attrs: { colspan: "3" } }, [
              _vm._v("You can create variants, after saving the product.")
            ])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9b864f18", module.exports)
  }
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(83)
/* template */
var __vue_template__ = __webpack_require__(84)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/partials/PublishFormRedirect.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9cf6d160", Component.options)
  } else {
    hotAPI.reload("data-v-9cf6d160", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        title: String,
        action: String,
        blueprint: Array,
        meta: Array,
        redirectTo: String,
        values: Array
    },

    methods: {
        saved: function saved(event) {
            var _this = this;

            setTimeout(function () {
                return _this.redirect(event.data);
            }, 600);
        },
        redirect: function redirect(slug) {
            window.location.href = this.createEditRoute(slug);
        },
        createEditRoute: function createEditRoute(slug) {
            return this.redirectTo.replace('x-product', slug);
        }
    }
});

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("publish-form", {
    attrs: {
      title: _vm.title,
      action: _vm.action,
      blueprint: _vm.blueprint,
      meta: _vm.meta,
      values: _vm.values
    },
    on: { saved: _vm.saved }
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9cf6d160", module.exports)
  }
}

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(86)
/* template */
var __vue_template__ = __webpack_require__(87)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/partials/TrackAndTrace.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-03b875ba", Component.options)
  } else {
    hotAPI.reload("data-v-03b875ba", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        value: {
            type: String
        },
        id: {
            type: String
        },
        url: {
            type: String
        }
    },
    methods: {
        updateValue: function updateValue(value) {
            this.$emit('input', value);
        },
        click: function click() {
            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(this.url, {
                trackAndTrace: this.value
            }).then(function (repsonse) {
                console.log(response);
            });
        }
    }
});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.value,
          expression: "value"
        }
      ],
      staticClass: "border border-sky-500",
      attrs: { type: "text", placeholder: "3SQBEF0052264" },
      domProps: { value: _vm.value },
      on: {
        input: [
          function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.value = $event.target.value
          },
          function($event) {
            return _vm.updateValue($event.target.value)
          }
        ]
      }
    }),
    _vm._v(" "),
    _c("button", { staticClass: "submit", on: { click: _vm.click } }, [
      _vm._v("Opslaan")
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-03b875ba", module.exports)
  }
}

/***/ }),
/* 88 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(97)
/* template */
var __vue_template__ = __webpack_require__(98)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/orders/Notes.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-616e397c", Component.options)
  } else {
    hotAPI.reload("data-v-616e397c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        value: {
            type: String
        },
        editing: {
            type: Boolean,
            default: false
        },
        id: {
            type: String
        },
        url: {
            type: String
        }
    },
    methods: {
        updateValue: function updateValue(value) {
            this.$emit('input', value);
        },
        click: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
                var _this = this;

                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return __WEBPACK_IMPORTED_MODULE_1_axios___default.a.post(this.url, {
                                    note: this.value
                                }).then(function (response) {
                                    _this.$toast.info('Gegevens opgeslagen!'); // Basic message
                                }).catch(function (error) {
                                    _this.$toast.error(error);
                                });

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function click() {
                return _ref.apply(this, arguments);
            }

            return click;
        }()
    }
});

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "px-5 py-2" }, [
    _c("div", { staticClass: "text-right" }, [
      _c(
        "a",
        {
          on: {
            click: function($event) {
              $event.preventDefault()
              _vm.editing = !_vm.editing
            }
          }
        },
        [_vm._v("Edit")]
      )
    ]),
    _vm._v(" "),
    _vm.editing == false
      ? _c("div", [_c("p", [_vm._v(_vm._s(_vm.value))])])
      : _vm._e(),
    _vm._v(" "),
    _vm.editing
      ? _c("div", [
          _c("textarea", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.value,
                expression: "value"
              }
            ],
            staticClass: "w-full border border-sky-500",
            attrs: { rows: "20" },
            domProps: { value: _vm.value },
            on: {
              input: [
                function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.value = $event.target.value
                },
                function($event) {
                  return _vm.updateValue($event.target.value)
                }
              ]
            }
          }),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "submit btn btn-default my-1",
              on: { click: _vm.click }
            },
            [_vm._v("Opslaan")]
          )
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-616e397c", module.exports)
  }
}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(100);


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(101);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 101 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ })
/******/ ]);