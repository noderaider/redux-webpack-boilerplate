'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTarget = getTarget;
function getTarget(name) {
  if (name === 'lambda') return 'node';
  return 'web';
}