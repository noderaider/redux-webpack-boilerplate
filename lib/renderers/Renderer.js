'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var html = _fs2.default.readFileSync(_path2.default.resolve(__dirname, '../../public/static/html/index.html'), 'utf-8');

var Renderer = function Renderer() {
  var _this = this;

  var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  _classCallCheck(this, Renderer);

  this.render = function (callback) {
    return callback(_this.html);
  };

  if (props.scriptUrl) html = html.replace('SCRIPT_URL', props.scriptUrl);
  if (props.styleUrl) html = html.replace('STYLE_URL', props.styleUrl);
  this.html = html;
};

exports.default = Renderer;


if (module.hot) module.hot.accept();