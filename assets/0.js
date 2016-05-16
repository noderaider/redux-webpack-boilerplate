webpackJsonp([0,1],{

/***/ 579:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var path = 'frames';
	var getComponent = function getComponent(nextState, cb) {
	  return __webpack_require__.e/* nsure */(8, function (require) {
	    return cb(null, __webpack_require__(578).default);
	  });
	};
	exports.default = { path: path, getComponent: getComponent };

/***/ },

/***/ 581:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = { path: '*',
	    getComponent: function getComponent(nextState, cb) {
	        __webpack_require__.e/* nsure */(7, function (require) {
	            return cb(null, __webpack_require__(580).default);
	        });
	    }
	};

/***/ },

/***/ 583:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = { path: 'test',
	    getComponent: function getComponent(nextState, cb) {
	        __webpack_require__.e/* nsure */(6, function (require) {
	            return cb(null, __webpack_require__(582).default);
	        });
	    },
	    getChildRoutes: function getChildRoutes(location, cb) {
	        __webpack_require__.e/* nsure */(3, function (require) {
	            return cb(null, [__webpack_require__(587).default, __webpack_require__(585).default]);
	        });
	    }
	};

/***/ }

});