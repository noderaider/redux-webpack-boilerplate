webpackJsonp([6,3],{

/***/ 287:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (_ref) {
	  var children = _ref.children;
	  var params = _ref.params;
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'h2',
	      null,
	      'Form Tests'
	    ),
	    params.id ? _react2.default.createElement(
	      'span',
	      null,
	      params.id
	    ) : null,
	    children
	  );
	};

/***/ }

});