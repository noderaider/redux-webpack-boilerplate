'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExternals = getExternals;
function getExternals(name) {
  if (name !== 'vendor') return { 'react/lib/ReactCSSTransitionGroup': 'ReactCSSTransitionGroup',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'tinymce': 'tinymce'
  };
}