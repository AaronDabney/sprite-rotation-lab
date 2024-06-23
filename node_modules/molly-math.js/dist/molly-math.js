/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _quaternion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quaternion */ \"./src/quaternion.js\");\n/* harmony import */ var _vector2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vector2 */ \"./src/vector2.js\");\n/* harmony import */ var _vector3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vector3 */ \"./src/vector3.js\");\n/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transform */ \"./src/transform.js\");\n\n\n\n\nwindow.Quaternion = _quaternion__WEBPACK_IMPORTED_MODULE_0__.Quaternion;\nwindow.Vector2 = _vector2__WEBPACK_IMPORTED_MODULE_1__.Vector2;\nwindow.Vector3 = _vector3__WEBPACK_IMPORTED_MODULE_2__.Vector3;\nwindow.Transform = _transform__WEBPACK_IMPORTED_MODULE_3__.Transform;\n\n//# sourceURL=webpack://molly-math.js/./src/index.js?");

/***/ }),

/***/ "./src/quaternion.js":
/*!***************************!*\
  !*** ./src/quaternion.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Quaternion: () => (/* binding */ Quaternion)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar Quaternion = /*#__PURE__*/function () {\n  function Quaternion() {\n    var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;\n    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n    var z = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;\n    _classCallCheck(this, Quaternion);\n    this.w = w;\n    this.x = x;\n    this.y = y;\n    this.z = z;\n  }\n  return _createClass(Quaternion, [{\n    key: \"print\",\n    value: function print() {\n      console.log(\"w: \".concat(this.w, \" x: \").concat(this.x, \" y: \").concat(this.y, \" z: \").concat(this.z));\n      console.log(\"xAngle: \".concat(this.angles.x, \" yAngle: \").concat(this.angles.y, \" zAngle: \").concat(this.angles.z));\n    }\n\n    /**\n     * Hamilton product\n     * @param {*} q \n     * @returns \n     */\n  }, {\n    key: \"mult\",\n    value: function mult(q) {\n      var p = this;\n      var w = p.w * q.w - p.x * q.x - p.y * q.y - p.z * q.z;\n      var x = p.w * q.x + p.x * q.w + p.y * q.z - p.z * q.y;\n      var y = p.w * q.y + p.y * q.w + p.z * q.x - p.x * q.z;\n      var z = p.w * q.z + p.z * q.w + p.x * q.y - p.y * q.x;\n      return new Quaternion(w, x, y, z);\n    }\n  }, {\n    key: \"rotateVector\",\n    value: function rotateVector(input) {\n      var vectorQuaternion = new Quaternion(0, input.x, input.y, input.z);\n      var rotatedQuaternion = this.mult(vectorQuaternion).mult(this.conjugate);\n      return new Vector3(rotatedQuaternion.x, rotatedQuaternion.y, rotatedQuaternion.z);\n    }\n  }, {\n    key: \"inverse\",\n    value: function inverse() {\n      var q = this.conjugate;\n      var sum = this.w * this.w - this.x * this.x - this.y * this.y - this.z * this.z;\n      return new Quaternion(q.w / sum, -q.x / sum, -q.y / sum, -q.z / sum);\n    }\n  }, {\n    key: \"normalize\",\n    value: function normalize() {\n      var mag = Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);\n      var w = this.w / mag;\n      var x = this.x / mag;\n      var y = this.y / mag;\n      var z = this.z / mag;\n      return new Quaternion(w, x, y, z);\n    }\n  }, {\n    key: \"angles\",\n    get: function get() {\n      return new Vector3(this.xAngle, this.yAngle, this.zAngle);\n    }\n  }, {\n    key: \"conjugate\",\n    get: function get() {\n      return new Quaternion(this.w, -this.x, -this.y, -this.z);\n    }\n  }, {\n    key: \"xAngle\",\n    get: function get() {\n      var radX = Math.atan2(2 * (this.w * this.x + this.y * this.z), 1 - 2 * (this.x * this.x + this.y * this.y));\n      return radX * 180 / Math.PI;\n    }\n  }, {\n    key: \"yAngle\",\n    get: function get() {\n      var radY = -Math.PI / 2 + 2 * Math.atan2(Math.sqrt(1 + 2 * (this.w * this.y - this.x * this.z)), Math.sqrt(1 - 2 * (this.w * this.y - this.x * this.z)));\n      return radY * 180 / Math.PI;\n    }\n  }, {\n    key: \"zAngle\",\n    get: function get() {\n      var radZ = Math.atan2(2 * (this.w * this.z + this.x * this.y), 1 - 2 * (this.y * this.y + this.z * this.z));\n      return radZ * 180 / Math.PI;\n    }\n  }, {\n    key: \"differenceMagnitude\",\n    value:\n    /**\n     * Useful in comparing relative differences between quaternions\n     * @param {*} quat \n     * @returns \n     */\n    function differenceMagnitude(quat) {\n      var xBasis = new Vector3(1, 0, 0);\n      var yBasis = new Vector3(0, 1, 0);\n      var zBasis = new Vector3(0, 0, 1);\n      var xDiff = this.rotateVector(xBasis).dot(quat.rotateVector(xBasis));\n      var yDiff = this.rotateVector(yBasis).dot(quat.rotateVector(yBasis));\n      var zDiff = this.rotateVector(zBasis).dot(quat.rotateVector(zBasis));\n      var xAngle = Math.acos(xDiff) * (180 / Math.PI);\n      var yAngle = Math.acos(yDiff) * (180 / Math.PI);\n      var zAngle = Math.acos(zDiff) * (180 / Math.PI);\n      var diffMagnitude = Math.sqrt(xAngle * xAngle + yAngle * yAngle, zAngle * zAngle);\n      return diffMagnitude;\n    }\n  }, {\n    key: \"angle\",\n    value: function angle(q) {\n      var vec = new Vector3(1, 0, 0);\n      var dot = this.rotateVector(vec).dot(q.rotateVector(vec));\n      var theta = Math.acos(dot);\n      return theta;\n    }\n\n    /**\n     * Negated quaterions behave identically to original\n     * @returns \n     */\n  }, {\n    key: \"flipSign\",\n    value: function flipSign() {\n      return new Quaternion(-this.w, -this.x, -this.y, -this.z);\n    }\n\n    /**\n     * Raw vector distance between 2 quaternions\n     * Both quaternions are first converted to representations with positive w components\n     * @param {*} q \n     * @returns \n     */\n  }, {\n    key: \"dist\",\n    value: function dist(q) {\n      if (q.w < 0) {\n        q = q.flipSign();\n      }\n      var t = this;\n      if (t.w < 0) {\n        t = t.flipSign();\n      }\n      var w = t.w - q.w;\n      var x = t.x - q.x;\n      var y = t.y - q.y;\n      var z = t.z - q.z;\n      var dist = Math.sqrt(w * w + x * x + y * y + z * z);\n      return dist;\n    }\n  }], [{\n    key: \"euler\",\n    value: function euler(roll, pitch, yaw) {\n      // Z-Y-X sequence rotation\n      var degreesToRadians = Math.PI / 180;\n      var conversionRatio = degreesToRadians * 0.5;\n      roll *= conversionRatio;\n      pitch *= conversionRatio;\n      yaw *= conversionRatio;\n      var rollCos = Math.cos(roll);\n      var rollSin = Math.sin(roll);\n      var pitchCos = Math.cos(pitch);\n      var pitchSin = Math.sin(pitch);\n      var yawCos = Math.cos(yaw);\n      var yawSin = Math.sin(yaw);\n      var w = rollCos * pitchCos * yawCos + rollSin * pitchSin * yawSin;\n      var x = rollSin * pitchCos * yawCos - rollCos * pitchSin * yawSin;\n      var y = rollCos * pitchSin * yawCos + rollSin * pitchCos * yawSin;\n      var z = rollCos * pitchCos * yawSin - rollSin * pitchSin * yawCos;\n      return new Quaternion(w, x, y, z);\n    }\n  }, {\n    key: \"randomUnitQuaternion\",\n    value: function randomUnitQuaternion() {\n      var rand = function rand() {\n        return Math.random() * 2 - 1;\n      };\n      var quat = new Quaternion(rand(), rand(), rand(), rand());\n      return quat.normalize();\n    }\n  }, {\n    key: \"identity\",\n    value: function identity() {\n      return new Quaternion();\n    }\n  }]);\n}();\n\n\n//# sourceURL=webpack://molly-math.js/./src/quaternion.js?");

/***/ }),

/***/ "./src/transform.js":
/*!**************************!*\
  !*** ./src/transform.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Transform: () => (/* binding */ Transform)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nvar Transform = /*#__PURE__*/_createClass(function Transform() {\n  var rotation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Quaternion.identity();\n  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector3(0, 0, 0);\n  var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Vector3(1, 1, 1);\n  _classCallCheck(this, Transform);\n  this.rotation = rotation;\n  this.position = position;\n  this.scale = scale;\n});\n\n\n//# sourceURL=webpack://molly-math.js/./src/transform.js?");

/***/ }),

/***/ "./src/vector2.js":
/*!************************!*\
  !*** ./src/vector2.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Vector2: () => (/* binding */ Vector2)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar Vector2 = /*#__PURE__*/function () {\n  function Vector2() {\n    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n    _classCallCheck(this, Vector2);\n    this.x = x;\n    this.y = y;\n  }\n  return _createClass(Vector2, [{\n    key: \"mag\",\n    value: function mag() {\n      return Math.sqrt(this.x * this.x + this.y * this.y);\n    }\n  }, {\n    key: \"mult\",\n    value: function mult(scalar) {\n      return new Vector2(this.x * scalar, this.y * scalar);\n    }\n  }, {\n    key: \"norm\",\n    value: function norm() {\n      var mag = this.mag();\n      return new Vector2(this.x / mag, this.y / mag);\n    }\n  }, {\n    key: \"add\",\n    value: function add(input) {\n      return new Vector2(this.x + input.x, this.y + input.y);\n    }\n  }, {\n    key: \"toVector3\",\n    value: function toVector3() {\n      return new Vector3(this.x, this.y, 0);\n    }\n  }, {\n    key: \"dot\",\n    value: function dot(input) {\n      return this.x * input.x + this.y + input.y;\n    }\n  }]);\n}();\n\n\n//# sourceURL=webpack://molly-math.js/./src/vector2.js?");

/***/ }),

/***/ "./src/vector3.js":
/*!************************!*\
  !*** ./src/vector3.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Vector3: () => (/* binding */ Vector3)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar Vector3 = /*#__PURE__*/function () {\n  function Vector3() {\n    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n    _classCallCheck(this, Vector3);\n    this.x = x;\n    this.y = y;\n    this.z = z;\n  }\n  return _createClass(Vector3, [{\n    key: \"mag\",\n    value: function mag() {\n      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);\n    }\n  }, {\n    key: \"mult\",\n    value: function mult(scalar) {\n      return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);\n    }\n  }, {\n    key: \"norm\",\n    value: function norm() {\n      return new Vector2(this.x / this.mag, this.y / this.mag, this.z / this.mag);\n    }\n  }, {\n    key: \"add\",\n    value: function add(input) {\n      return new Vector3(this.x + input.x, this.y + input.y, this.z + input.z);\n    }\n  }, {\n    key: \"toVector2\",\n    value: function toVector2() {\n      return new Vector2(this.x, this.y);\n    }\n  }, {\n    key: \"dot\",\n    value: function dot(vec) {\n      return vec.x * this.x + vec.y * this.y + vec.z * this.z;\n    }\n  }]);\n}();\n\n\n//# sourceURL=webpack://molly-math.js/./src/vector3.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;