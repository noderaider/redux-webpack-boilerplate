"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var full = _ref.full;
  var email = _ref.email;
  var organization = _ref.organization;
  return full + " <" + email + "> (https://github.com/" + organization + ")";
};