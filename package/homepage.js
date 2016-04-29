'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = require('./name.js');

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var host = _ref.host;
  var organization = _ref.organization;
  return host === 'js.org' ? 'https://' + _name2.default + '.js.org' : 'https://' + organization + '.github.io/' + _name2.default;
};