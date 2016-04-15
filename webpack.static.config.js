'use strict';

var _make = require('./webpack/make');

var _make2 = _interopRequireDefault(_make);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = [(0, _make2.default)('static'), (0, _make2.default)('vendor')];
