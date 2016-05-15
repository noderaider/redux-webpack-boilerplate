webpackJsonp([5,3],{

/***/ 458:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _PrimaryGrid = __webpack_require__(99);

	var _PrimaryGrid2 = _interopRequireDefault(_PrimaryGrid);

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
	      'Grid Tests'
	    ),
	    params.id ? _react2.default.createElement(
	      'span',
	      null,
	      params.id
	    ) : null,
	    _react2.default.createElement(_PrimaryGrid2.default, null),
	    children
	  );
	};

/***/ }

});