webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(859);

	var _performance = __webpack_require__(104);

	var _performance2 = _interopRequireDefault(_performance);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Spinner = __webpack_require__(336);

	var _Spinner2 = _interopRequireDefault(_Spinner);

	var _elements = __webpack_require__(166);

	var _elements2 = _interopRequireDefault(_elements);

	var _bunyan = __webpack_require__(118);

	var _globalStore = __webpack_require__(169);

	var _configureStore = __webpack_require__(361);

	var _configureStore2 = _interopRequireDefault(_configureStore);

	var _chai = __webpack_require__(102);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	_performance2.default.addTiming('loadingStart');

	/** STUFF HERE IS RUN SYNCHRONOUSLY IN HEAD OR TOP OF BODY, NO WEB FORMS YET */
	(0, _elements.blockBody)();

	var Loading = function (_Component) {
	  _inherits(Loading, _Component);

	  function Loading() {
	    _classCallCheck(this, Loading);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Loading).apply(this, arguments));
	  }

	  _createClass(Loading, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement('div', { ref: function ref(x) {
	          return _this2.__element = x;
	        } });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.spinner = new _Spinner2.default();
	      this.spinner.spin(this.__element);
	      (0, _elements.unblockBody)();
	      (0, _globalStore.saveGlobalStore)((0, _configureStore2.default)());
	    }
	  }]);

	  return Loading;
	}(_react.Component);

	var loading = new _elements2.default('loading', { backgroundColor: 'rgb(240, 240, 240)', position: 'fixed', zIndex: 99999, width: '100%', height: '100%', left: 0, top: 0 }, { children: _react2.default.createElement(Loading, null) });
	loading.render().then(function () {});

/***/ },

/***/ 167:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	                              value: true
	});
	var IDLESTATUS_NOT_VERY_ACTIVE = exports.IDLESTATUS_NOT_VERY_ACTIVE = 'NOT_VERY_ACTIVE';
	var IDLESTATUS_GONE_FOR_LIKE_A_SECOND = exports.IDLESTATUS_GONE_FOR_LIKE_A_SECOND = 'GONE_FOR_LIKE_A_SECOND';
	var IDLESTATUS_LAZY_TYPER = exports.IDLESTATUS_LAZY_TYPER = 'LAZY_TYPER';
	var IDLESTATUS_ARE_YOU_STILL_THERE = exports.IDLESTATUS_ARE_YOU_STILL_THERE = 'ARE_YOU_STILL_THERE';
	var IDLESTATUS_GONE = exports.IDLESTATUS_GONE = 'GONE';
	var IDLESTATUS_THEY_DONT_CARE_ABOUT_YOU = exports.IDLESTATUS_THEY_DONT_CARE_ABOUT_YOU = 'THEY_DONT_CARE_ABOUT_YOU';
	var IDLESTATUS_THEY_ARE_NEVER_COMING_BACK = exports.IDLESTATUS_THEY_ARE_NEVER_COMING_BACK = 'THEY_ARE_NEVER_COMING_BACK';
	var IDLESTATUS_STONE_AGE_GONE = exports.IDLESTATUS_STONE_AGE_GONE = 'STONE_AGE_GONE';
	var IDLESTATUS_EXTINCT = exports.IDLESTATUS_EXTINCT = 'EXTINCT';

	var IDLE_STATUSES = exports.IDLE_STATUSES = [IDLESTATUS_NOT_VERY_ACTIVE, IDLESTATUS_GONE_FOR_LIKE_A_SECOND, IDLESTATUS_LAZY_TYPER, IDLESTATUS_ARE_YOU_STILL_THERE, IDLESTATUS_GONE, IDLESTATUS_THEY_DONT_CARE_ABOUT_YOU, IDLESTATUS_THEY_ARE_NEVER_COMING_BACK, IDLESTATUS_STONE_AGE_GONE, IDLESTATUS_EXTINCT];

/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.middleware = exports.actions = exports.reducer = undefined;

	var _reduxIdleMonitor = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"redux-idle-monitor\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _reduxIdleMonitor2 = _interopRequireDefault(_reduxIdleMonitor);

	var _name = __webpack_require__(171);

	var _name2 = _interopRequireDefault(_name);

	var _constants = __webpack_require__(167);

	var _actions = __webpack_require__(356);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var opts = { appName: _name2.default, IDLE_STATUSES: _constants.IDLE_STATUSES, idleStatusDelay: _actions.idleStatusDelay, activeStatusAction: _actions.activeStatusAction, idleStatusAction: _actions.idleStatusAction };

	var _configure = (0, _reduxIdleMonitor2.default)(opts);

	var reducer = _configure.reducer;
	var actions = _configure.actions;
	var middleware = _configure.middleware;
	exports.reducer = reducer;
	exports.actions = actions;
	exports.middleware = middleware;

/***/ },

/***/ 171:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = 'redux-webpack-boilerplate';

/***/ },

/***/ 336:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright (c) 2011-2014 Felix Gnass
	 * Licensed under the MIT license
	 * http://spin.js.org/
	 * ES6ified by Cole Chamberlain
	 *
	 * Example:
	    var opts = {
	      lines: 12             // The number of lines to draw
	    , length: 7             // The length of each line
	    , width: 5              // The line thickness
	    , radius: 10            // The radius of the inner circle
	    , scale: 1.0            // Scales overall size of the spinner
	    , corners: 1            // Roundness (0..1)
	    , color: '#000'         // #rgb or #rrggbb
	    , opacity: 1/4          // Opacity of the lines
	    , rotate: 0             // Rotation offset
	    , direction: 1          // 1: clockwise, -1: counterclockwise
	    , speed: 1              // Rounds per second
	    , trail: 100            // Afterglow percentage
	    , fps: 20               // Frames per second when using setTimeout()
	    , zIndex: 2e9           // Use a high z-index by default
	    , className: 'spinner'  // CSS class to assign to the element
	    , top: '50%'            // center vertically
	    , left: '50%'           // center horizontally
	    , shadow: false         // Whether to render a shadow
	    , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
	    , position: 'absolute'  // Element positioning
	    }
	    var target = document.getElementById('foo')
	    var spinner = new Spinner(opts).spin(target)
	 */
	var defaults = { lines: 8 // The number of lines to draw
	  , length: 12 // The length of each line
	  , width: 10 // The line thickness
	  , radius: 25 // The radius of the inner circle
	  , scale: 1.0 // Scales overall size of the spinner
	  , corners: 1 // Roundness (0..1)
	  , color: '#839496' // #rgb or #rrggbb
	  , opacity: 1 / 4 // Opacity of the lines
	  , rotate: 0 // Rotation offset
	  , direction: 1 // 1: clockwise, -1: counterclockwise
	  , speed: 1 // Rounds per second
	  , trail: 100 // Afterglow percentage
	  , fps: 20 // Frames per second when using setTimeout()
	  , zIndex: 2e9 // Use a high z-index by default
	  , className: 'spinner' // CSS class to assign to the element
	  , top: '50%' // center vertically
	  , left: '50%' // center horizontally
	  , shadow: false // Whether to render a shadow
	  , hwaccel: false // Whether to use hardware acceleration (might be buggy)
	  , position: 'absolute' // Element positioning
	};

	var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
	,
	    animations = {} /* Animation rules keyed by their name */
	,
	    useCssAnimations /* Whether to use CSS animations or setTimeout */
	,
	    sheet; /* A stylesheet to hold the @keyframe or VML rules. */

	/**
	 * Sets multiple style properties at once.
	 */
	function css(el, prop) {
	  for (var n in prop) {
	    el.style[vendor(el, n) || n] = prop[n];
	  }

	  return el;
	}

	/**
	 * Tries various vendor prefixes and returns the first supported property.
	 */
	function vendor(el, prop) {
	  var s = el.style,
	      pp,
	      i;

	  prop = prop.charAt(0).toUpperCase() + prop.slice(1);
	  if (s[prop] !== undefined) return prop;
	  for (i = 0; i < prefixes.length; i++) {
	    pp = prefixes[i] + prop;
	    if (s[pp] !== undefined) return pp;
	  }
	}

	/**
	 * Utility function to create elements. If no tag name is given,
	 * a DIV is created. Optionally properties can be passed.
	 */
	function createEl(tag, prop) {
	  var el = document.createElement(tag || 'div'),
	      n;

	  for (n in prop) {
	    el[n] = prop[n];
	  }return el;
	}

	/**
	 * Appends children and returns the parent.
	 */
	function ins(parent /* child1, child2, ...*/) {
	  for (var i = 1, n = arguments.length; i < n; i++) {
	    parent.appendChild(arguments[i]);
	  }

	  return parent;
	}

	/**
	 * Creates an opacity keyframe animation rule and returns its name.
	 * Since most mobile Webkits have timing issues with animation-delay,
	 * we create separate rules for each line/segment.
	 */
	function addAnimation(alpha, trail, i, lines) {
	  var name = ['opacity', trail, ~ ~(alpha * 100), i, lines].join('-'),
	      start = 0.01 + i / lines * 100,
	      z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha),
	      prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase(),
	      pre = prefix && '-' + prefix + '-' || '';

	  if (!animations[name]) {
	    sheet.insertRule('\n@' + pre + 'keyframes ' + name + '{\n0%{opacity:' + z + '}\n' + start + '%{opacity:' + alpha + '}\n' + (start + 0.01) + '%{opacity:1}\n' + (start + trail) % 100 + '%{opacity:' + alpha + '}\n100%{opacity:' + z + '}\n}', sheet.cssRules.length);
	    animations[name] = 1;
	  }

	  return name;
	}

	/**
	 * Returns the line color from the given string or array.
	 */
	var getColor = function getColor(color, idx) {
	  return typeof color == 'string' ? color : color[idx % color.length];
	};

	/**
	 * Internal method that adjusts the opacity of a single line.
	 * Will be overwritten in VML fallback mode below.
	 */
	function opacity(el, i, val) {
	  if (i < el.childNodes.length) el.childNodes[i].style.opacity = val;
	}

	var Spinner = function Spinner(props) {
	  var _this = this;

	  _classCallCheck(this, Spinner);

	  this.spin = function (target) {
	    _this.stop();

	    var self = _this,
	        o = self.opts,
	        el = self.el = createEl(null, { className: o.className });

	    css(el, {
	      position: o.position,
	      width: 0,
	      zIndex: o.zIndex,
	      left: o.left,
	      top: o.top
	    });

	    if (target) {
	      target.insertBefore(el, target.firstChild || null);
	    }

	    el.setAttribute('role', 'progressbar');
	    self.lines(el, self.opts);

	    if (!useCssAnimations) {
	      // No CSS animation support, use setTimeout() instead
	      var i = 0,
	          start = (o.lines - 1) * (1 - o.direction) / 2,
	          alpha,
	          fps = o.fps,
	          f = fps / o.speed,
	          ostep = (1 - o.opacity) / (f * o.trail / 100),
	          astep = f / o.lines;(function anim() {
	        i++;
	        for (var j = 0; j < o.lines; j++) {
	          alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity);

	          self.opacity(el, j * o.direction + start, alpha, o);
	        }
	        self.timeout = self.el && setTimeout(anim, ~ ~(1000 / fps));
	      })();
	    }
	    return self;
	  };

	  this.stop = function () {
	    var el = _this.el;
	    if (el) {
	      clearTimeout(_this.timeout);
	      if (el.parentNode) el.parentNode.removeChild(el);
	      _this.el = undefined;
	    }
	    return _this;
	  };

	  this.lines = function (el, o) {
	    var i = 0,
	        start = (o.lines - 1) * (1 - o.direction) / 2,
	        seg;

	    function fill(color, shadow) {
	      return css(createEl(), { position: 'absolute',
	        width: o.scale * (o.length + o.width) + 'px',
	        height: o.scale * o.width + 'px',
	        background: color,
	        boxShadow: shadow,
	        transformOrigin: 'left',
	        transform: 'rotate(' + ~ ~(360 / o.lines * i + o.rotate) + 'deg) translate(' + o.scale * o.radius + 'px' + ',0)',
	        borderRadius: (o.corners * o.scale * o.width >> 1) + 'px'
	      });
	    }

	    for (; i < o.lines; i++) {
	      seg = css(createEl(), { position: 'absolute',
	        top: 1 + ~(o.scale * o.width / 2) + 'px',
	        transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
	        opacity: o.opacity,
	        animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
	      });
	      if (o.shadow) ins(seg, css(fill('#000', '0 0 4px #000'), { top: '2px' }));
	      ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')));
	    }
	    return el;
	  };

	  this.initVML = function () {

	    /* Utility function to create a VML tag */
	    function vml(tag, attr) {
	      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr);
	    }

	    // No CSS transforms but VML support, add a CSS rule for VML elements:
	    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)');

	    _this.lines = function (el, o) {
	      var r = o.scale * (o.length + o.width),
	          s = o.scale * 2 * r;

	      function grp() {
	        return css(vml('group', {
	          coordsize: s + ' ' + s,
	          coordorigin: -r + ' ' + -r
	        }), { width: s, height: s });
	      }

	      var margin = -(o.width + o.length) * o.scale * 2 + 'px',
	          g = css(grp(), { position: 'absolute', top: margin, left: margin }),
	          i;

	      function seg(i, dx, filter) {
	        ins(g, ins(css(grp(), { rotation: 360 / o.lines * i + 'deg', left: ~ ~dx }), ins(css(vml('roundrect', { arcsize: o.corners }), { width: r,
	          height: o.scale * o.width,
	          left: o.scale * o.radius,
	          top: -o.scale * o.width >> 1,
	          filter: filter
	        }), vml('fill', { color: getColor(o.color, i), opacity: o.opacity }), vml('stroke', { opacity: 0 }) // transparent stroke to fix color bleeding upon opacity change
	        )));
	      }

	      if (o.shadow) for (i = 1; i <= o.lines; i++) {
	        seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');
	      }

	      for (i = 1; i <= o.lines; i++) {
	        seg(i);
	      }return ins(el, g);
	    };

	    _this.opacity = function (el, i, val, o) {
	      var c = el.firstChild;
	      o = o.shadow && o.lines || 0;
	      if (c && i + o < c.childNodes.length) {
	        c = c.childNodes[i + o];c = c && c.firstChild;c = c && c.firstChild;
	        if (c) c.opacity = val;
	      }
	    };
	  };

	  this.opts = Object.assign({}, defaults, props);

	  if (typeof document !== 'undefined') {
	    sheet = function () {
	      var el = createEl('style', { type: 'text/css' });
	      ins(document.getElementsByTagName('head')[0], el);
	      return el.sheet || el.styleSheet;
	    }();

	    var probe = css(createEl('group'), { behavior: 'url(#default#VML)' });

	    if (!vendor(probe, 'transform') && probe.adj) this.initVML();else useCssAnimations = vendor(probe, 'animation');
	  }
	}

	/**
	 * Adds the spinner to the given target element. If this instance is already
	 * spinning, it is automatically removed from its previous target b calling
	 * stop() internally.
	 */


	/**
	 * Stops and removes the Spinner.
	 */


	/**
	 * Internal method that draws the individual lines. Will be overwritten
	 * in VML fallback mode below.
	 */
	;

	exports.default = Spinner;

/***/ },

/***/ 356:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.idleStatusAction = exports.activeStatusAction = exports.idleStatusDelay = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _visual = __webpack_require__(76);

	var _constants = __webpack_require__(167);

	var _reduxDevtoolsThemes = __webpack_require__(304);

	var themes = _interopRequireWildcard(_reduxDevtoolsThemes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var paletteMap = { background: ['base00', 'base01'],
	  content: ['base04', 'base02', 'base05'],
	  accent: ['base0D', 'base0E', 'base0C']
	};
	var invertColors = function invertColors(theme) {
	  return _extends({}, theme, { base00: theme.base07,
	    base01: theme.base06,
	    base02: theme.base05,
	    base03: theme.base04,
	    base04: theme.base03,
	    base05: theme.base02,
	    base06: theme.base01,
	    base07: theme.base00
	  });
	};

	var nonColors = ['author', 'scheme', 'base07', 'base06', 'base05', 'base04', 'base02', 'base01', 'base00'];
	var filterColors = function filterColors(scheme) {
	  return Object.keys(scheme).filter(function (x) {
	    return !nonColors.includes(x);
	  }).reduce(function (colors, key) {
	    return Object.assign(colors, _defineProperty({}, key, scheme[key]));
	  }, {});
	};

	var getRandomColor = function getRandomColor(colors) {
	  var paletteKeys = Object.keys(colors);
	  var selectedIndex = Math.floor(paletteKeys.length * Math.random());
	  return colors[paletteKeys[selectedIndex]];
	};
	//** TODO: NPM MODULE */
	var palettize = function palettize(theme) {
	  return function (invertTheme) {
	    var scheme = invertTheme ? invertColors(themes[theme]) : themes[theme];
	    var colors = filterColors(scheme);
	    var basePalette = Object.keys(paletteMap).reduce(function (palette, key) {
	      palette[key] = paletteMap[key].map(function (x) {
	        return scheme[x];
	      });
	      return palette;
	    }, {});
	    return _extends({}, basePalette, { bool: function bool(condition) {
	        return condition ? scheme['base0B'] : scheme['base08'];
	      },
	      get colors() {
	        return colors;
	      },
	      random: function random() {
	        return getRandomColor(colors);
	      },
	      get red() {
	        return scheme['base08'];
	      },
	      get green() {
	        return scheme['base0B'];
	      }
	    });
	  };
	};

	var solarized = palettize('solarized')(false);

	var idleStatusDelay = exports.idleStatusDelay = function idleStatusDelay(idleStatus) {
	  return function (dispatch, getState) {
	    switch (idleStatus) {
	      case _constants.IDLESTATUS_NOT_VERY_ACTIVE:
	        return 5000;
	      case _constants.IDLESTATUS_GONE_FOR_LIKE_A_SECOND:
	        return 4000;
	      case _constants.IDLESTATUS_LAZY_TYPER:
	        return 3000;
	      case _constants.IDLESTATUS_ARE_YOU_STILL_THERE:
	        return 2000;
	      case _constants.IDLESTATUS_GONE:
	        return 1000;
	      case _constants.IDLESTATUS_THEY_DONT_CARE_ABOUT_YOU:
	        return 800;
	      case _constants.IDLESTATUS_THEY_ARE_NEVER_COMING_BACK:
	        return 600;
	      case _constants.IDLESTATUS_STONE_AGE_GONE:
	        return 400;
	      case _constants.IDLESTATUS_EXTINCT:
	        return 300;
	      default:
	        return 3000;
	    }
	  };
	};

	var activeStatusAction = exports.activeStatusAction = function activeStatusAction(dispatch, getState) {
	  dispatch((0, _visual.setText)({ subtitle: 'ACTIVE' }));
	  setColor(solarized.background[0]);
	};

	var idleStatusAction = exports.idleStatusAction = function idleStatusAction(idleStatus) {
	  return function (dispatch, getState) {
	    dispatch((0, _visual.setText)({ subtitle: idleStatus.replace(/_/g, ' ') }));
	    switch (idleStatus) {
	      case _constants.IDLESTATUS_NOT_VERY_ACTIVE:
	        return setColor(solarized.random());
	      case _constants.IDLESTATUS_GONE_FOR_LIKE_A_SECOND:
	        return setColor(solarized.random());
	      case _constants.IDLESTATUS_LAZY_TYPER:
	        return setColor(solarized.random());
	      case _constants.IDLESTATUS_ARE_YOU_STILL_THERE:
	        return setColor(solarized.random());
	      case _constants.IDLESTATUS_GONE:
	        return setColor(solarized.random());
	      case _constants.IDLESTATUS_THEY_DONT_CARE_ABOUT_YOU:
	        return setColor(solarized.random());
	      case _constants.IDLESTATUS_THEY_ARE_NEVER_COMING_BACK:
	        return setColor(solarized.random());
	      case _constants.IDLESTATUS_STONE_AGE_GONE:
	        return setColor(solarized.random());
	      case _constants.IDLESTATUS_EXTINCT:
	        return setColor(solarized.red);
	    }
	  };
	};

	var setColor = function setColor(color) {
	  return document.body.style.backgroundColor = color;
	};

/***/ },

/***/ 357:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = errors;

	var _immutable = __webpack_require__(122);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _constants = __webpack_require__(60);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initialState = _immutable2.default.Map({ api: _immutable2.default.List(),
	  identity: _immutable2.default.List()
	});

	function errors() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];
	  var type = action.type;
	  var payload = action.payload;
	  var error = action.error;

	  // HANDLE NON ERRORS

	  if (!error) {
	    switch (type) {
	      case _constants.DISMISS_ERROR:
	        var category = payload.category;
	        var id = payload.id;

	        return state.deleteIn([category, id]);
	      case _constants.CLEAR_ERRORS:
	      case _constants.RECEIVE_AUTHORIZE_IDENTITY:
	      case _constants.RECEIVE_REFRESH_IDENTITY:
	      case _constants.RECEIVE_IMPERSONATE_IDENTITY:
	      case _constants.SET_IDENTITY:
	        return initialState;
	    }
	    return state;
	  }

	  var err = payload ? payload : new Error('Unknown Error');

	  // HANDLE ERRORS
	  switch (type) {
	    case _constants.AUTHORIZE_MIDDLEWARE:
	    case _constants.DISMISS_ERROR:
	    case _constants.RECEIVE_AUTHORIZE_IDENTITY:
	    case _constants.RECEIVE_REFRESH_IDENTITY:
	    case _constants.RECEIVE_IMPERSONATE_IDENTITY:
	    case _constants.FETCH_DATA:
	    case _constants.RECEIVE_DATA:
	    case _constants.KEYED_DATA:
	    case _constants.CLEAR_DATA:
	      return state.update('api', function (x) {
	        return x.unshift(err);
	      });
	    case _constants.FETCH_IDENTITY:
	    case _constants.SET_IDENTITY:
	    case _constants.FORGET_TOKENS:
	    case _constants.FORGET_FINGERPRINT:
	    case _constants.IDENTITY_INVALID:
	    case _constants.IDENTITY_EXPIRED:
	    case _constants.AUTHORIZE_MIDDLEWARE:
	      return state.update('identity', function (x) {
	        return x.unshift(err);
	      });
	  }
	  return state;
	}

/***/ },

/***/ 358:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _redux = __webpack_require__(99);

	var _visual = __webpack_require__(359);

	var _errors = __webpack_require__(357);

	var _errors2 = _interopRequireDefault(_errors);

	var _reduxIdleMonitor = __webpack_require__(168);

	var _reduxForm = __webpack_require__(159);

	var _constants = __webpack_require__(60);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var form = _reduxForm.reducer.plugin({ page: function page(state, action) {
	    // <------ 'login' is name of form given to reduxForm()
	    var type = action.type;
	    var payload = action.payload;
	    var error = action.error;

	    switch (type) {
	      case _constants.SET_TEXT:
	        var key = payload.key;
	        var text = payload.text;

	        if (!['title', 'subtitle'].includes(key)) return state;
	        return _extends({}, state, _defineProperty({}, key, { value: text }));
	      default:
	        return state;
	    }
	  }
	});

	var rootReducer = (0, _redux.combineReducers)({ visual: _visual.visual,
	  errors: _errors2.default,
	  idle: _reduxIdleMonitor.reducer,
	  form: form
	});
	exports.default = rootReducer;

/***/ },

/***/ 359:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.visual = visual;

	var _immutable = __webpack_require__(122);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _constants = __webpack_require__(60);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var REDUX_FORM_CHANGE = 'redux-form/CHANGE';

	var nextValue = function nextValue(current) {
	  var value = current.get('value');
	  var options = current.get('options');
	  var nextIndex = options.indexOf(value) + 1;
	  return nextIndex >= options.size ? options.first() : options.get(nextIndex);
	};

	//Object {type: "redux-form/CHANGE", field: "subtitle", value: "ACTIVEff", touch: false, form: "page"}
	var initialText = _immutable2.default.Map();
	function text() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialText : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	  var type = action.type;
	  var payload = action.payload;
	  var error = action.error;

	  if (error) return state;
	  switch (type) {
	    case _constants.SET_TEXT:
	      return state.merge(payload);
	    case REDUX_FORM_CHANGE:
	      var field = action.field;
	      var value = action.value;
	      var form = action.form;

	      if (form !== 'page') return state;
	      return state.set(field, value);
	  }
	  return state;
	}

	var initialVisibility = _immutable2.default.Map();
	function visibility() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialVisibility : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	  var type = action.type;
	  var payload = action.payload;
	  var error = action.error;

	  if (error || !payload) return state;
	  var componentID = payload.componentID;
	  var value = payload.value;
	  var options = payload.options;

	  switch (type) {
	    case _constants.TOGGLE_VISIBILITY:
	      var current = state.get(componentID);
	      if (current) {
	        var next = nextValue(current);
	        return state.setIn([componentID, 'value'], next);
	      }
	      return state.set(componentID, _immutable2.default.fromJS({ options: options, value: value }));
	    case _constants.SET_VISIBILITY:
	      if (state.has(componentID)) return state.setIn([componentID, 'value'], value);
	      return state.set(componentID, _immutable2.default.fromJS({ options: options, value: value }));
	  }
	  return state;
	}

	var initialExpanders = _immutable2.default.Map();
	function expanders() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialExpanders : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	  return function () {
	    var type = action.type;
	    var payload = action.payload;
	    var error = action.error;

	    if (error || !payload) return state;
	    var componentID = payload.componentID;
	    var value = payload.value;
	    var initialExpanders = payload.initialExpanders;

	    switch (type) {
	      case _constants.SET_EXPANDER:
	        return state.set(componentID, value);
	      case _constants.TOGGLE_EXPANDER:
	        return state.update(componentID, initialExpanders, function (x) {
	          return !x;
	        });
	    }
	    return state;
	  }();
	}

	var initialTooltip = _immutable2.default.Map();
	function tooltip() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialTooltip : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	  var type = action.type;
	  var payload = action.payload;
	  var error = action.error;

	  if (error || !payload) return state;
	  var componentID = payload.componentID;
	  var props = payload.props;

	  switch (type) {
	    case _constants.REGISTER_TOOLTIP:
	      state.set(componentID, props);
	    case _constants.DISPOSE_TOOLTIP:
	      state.remove(componentID);
	  }
	  return state;
	}

	var initialTheme = 'solarized-dark';
	function theme() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialTheme : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	  var type = action.type;
	  var payload = action.payload;
	  var error = action.error;

	  if (error || !payload) return state;
	  switch (type) {
	    case _constants.SET_THEME:
	      return payload.name;
	  }
	  return state;
	}

	var initialState = { text: text(), visibility: visibility(), theme: theme(), expanders: expanders(), tooltip: tooltip() };

	function visual() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];
	  var type = action.type;
	  var payload = action.payload;
	  var error = action.error;

	  switch (type) {
	    case _constants.SET_TEXT:
	    case REDUX_FORM_CHANGE:
	      return Object.assign({}, state, { text: text(state.text, action) });
	    case _constants.TOGGLE_VISIBILITY:
	    case _constants.SET_VISIBILITY:
	      return Object.assign({}, state, { visibility: visibility(state.visibility, action) });
	    case _constants.SET_THEME:
	      return Object.assign({}, state, { theme: theme(state.theme, action) });
	    case _constants.TOGGLE_EXPANDER:
	    case _constants.SET_EXPANDER:
	      return Object.assign({}, state, { expanders: expanders(state.expanders, action) });
	    case _constants.REGISTER_TOOLTIP:
	    case _constants.DISPOSE_TOOLTIP:
	      return Object.assign({}, state, { tooltip: tooltip(state.tooltip, action) });
	  }
	  return state;
	}

/***/ },

/***/ 360:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureStore;

	var _redux = __webpack_require__(99);

	var _reduxThunk = __webpack_require__(836);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(835);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reduxIdleMonitor = __webpack_require__(168);

	var _name = __webpack_require__(171);

	var _name2 = _interopRequireDefault(_name);

	var _config = __webpack_require__(74);

	var _visual = __webpack_require__(76);

	var _reducers = __webpack_require__(358);

	var _reducers2 = _interopRequireDefault(_reducers);

	var _DevTools = __webpack_require__(164);

	var _DevTools2 = _interopRequireDefault(_DevTools);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var loggerMiddleware = (0, _reduxLogger2.default)();

	var composeStore = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default, _reduxIdleMonitor.middleware, loggerMiddleware), _DevTools2.default.instrument())(_redux.createStore);

	function configureStore() {
	  var store = composeStore(_reducers2.default);
	  store.dispatch((0, _visual.setText)({ title: _config.appName,
	    subtitle: 'ACTIVE',
	    username: 'your.github.username',
	    organization: 'your.github.organization',
	    email: 'your.email@email.com',
	    full: 'Your Full Name',
	    packageName: _name2.default
	  }));
	  store.dispatch(_reduxIdleMonitor.actions.start());
	  if (false) module.hot.accept('../reducers', function () {
	    return store.replaceReducer(require('../reducers').default);
	  });
	  return store;
	}

/***/ },

/***/ 361:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	if (true) {
	  module.exports = __webpack_require__(360);
	} else {
	  module.exports = require('./configureStore.prod');
	}

/***/ },

/***/ 491:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	// imports


	// module
	exports.push([module.id, "body {\r\n  background-color:rgb(224,224,224);\r\n}\r\n#loading-container {\r\n   width:100%;\r\n   text-align:center;\r\n}\r\n#loading-text {\r\n  border:1px solid black;\r\n}\r\n", "", {"version":3,"sources":["/../src/app/styles/loading.css"],"names":[],"mappings":"AAAA;EACE,kCAAkC;CACnC;AACD;GACG,WAAW;GACX,kBAAkB;CACpB;AACD;EACE,uBAAuB;CACxB","file":"loading.css","sourcesContent":["body {\r\n  background-color:rgb(224,224,224);\r\n}\r\n#loading-container {\r\n   width:100%;\r\n   text-align:center;\r\n}\r\n#loading-text {\r\n  border:1px solid black;\r\n}\r\n"],"sourceRoot":"webpack://"}]);

	// exports


/***/ },

/***/ 835:
/***/ function(module, exports) {

	"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var repeat = function repeat(str, times) {
	  return new Array(times + 1).join(str);
	};
	var pad = function pad(num, maxLength) {
	  return repeat("0", maxLength - num.toString().length) + num;
	};
	var formatTime = function formatTime(time) {
	  return "@ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
	};

	// Use the new performance api to get better precision if available
	var timer = typeof performance !== "undefined" && typeof performance.now === "function" ? performance : Date;

	/**
	 * parse the level option of createLogger
	 *
	 * @property {string | function | object} level - console[level]
	 * @property {object} action
	 * @property {array} payload
	 * @property {string} type
	 */

	function getLogLevel(level, action, payload, type) {
	  switch (typeof level === "undefined" ? "undefined" : _typeof(level)) {
	    case "object":
	      return typeof level[type] === "function" ? level[type].apply(level, _toConsumableArray(payload)) : level[type];
	    case "function":
	      return level(action);
	    default:
	      return level;
	  }
	}

	/**
	 * Creates logger with followed options
	 *
	 * @namespace
	 * @property {object} options - options for logger
	 * @property {string | function | object} options.level - console[level]
	 * @property {boolean} options.duration - print duration of each action?
	 * @property {boolean} options.timestamp - print timestamp with each action?
	 * @property {object} options.colors - custom colors
	 * @property {object} options.logger - implementation of the `console` API
	 * @property {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
	 * @property {boolean} options.collapsed - is group collapsed?
	 * @property {boolean} options.predicate - condition which resolves logger behavior
	 * @property {function} options.stateTransformer - transform state before print
	 * @property {function} options.actionTransformer - transform action before print
	 * @property {function} options.errorTransformer - transform error before print
	 */

	function createLogger() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var _options$level = options.level;
	  var level = _options$level === undefined ? "log" : _options$level;
	  var _options$logger = options.logger;
	  var logger = _options$logger === undefined ? console : _options$logger;
	  var _options$logErrors = options.logErrors;
	  var logErrors = _options$logErrors === undefined ? true : _options$logErrors;
	  var collapsed = options.collapsed;
	  var predicate = options.predicate;
	  var _options$duration = options.duration;
	  var duration = _options$duration === undefined ? false : _options$duration;
	  var _options$timestamp = options.timestamp;
	  var timestamp = _options$timestamp === undefined ? true : _options$timestamp;
	  var transformer = options.transformer;
	  var _options$stateTransfo = options.stateTransformer;
	  var // deprecated
	  stateTransformer = _options$stateTransfo === undefined ? function (state) {
	    return state;
	  } : _options$stateTransfo;
	  var _options$actionTransf = options.actionTransformer;
	  var actionTransformer = _options$actionTransf === undefined ? function (actn) {
	    return actn;
	  } : _options$actionTransf;
	  var _options$errorTransfo = options.errorTransformer;
	  var errorTransformer = _options$errorTransfo === undefined ? function (error) {
	    return error;
	  } : _options$errorTransfo;
	  var _options$colors = options.colors;
	  var colors = _options$colors === undefined ? {
	    title: function title() {
	      return "#000000";
	    },
	    prevState: function prevState() {
	      return "#9E9E9E";
	    },
	    action: function action() {
	      return "#03A9F4";
	    },
	    nextState: function nextState() {
	      return "#4CAF50";
	    },
	    error: function error() {
	      return "#F20404";
	    }
	  } : _options$colors;

	  // exit if console undefined

	  if (typeof logger === "undefined") {
	    return function () {
	      return function (next) {
	        return function (action) {
	          return next(action);
	        };
	      };
	    };
	  }

	  if (transformer) {
	    console.error("Option 'transformer' is deprecated, use stateTransformer instead");
	  }

	  var logBuffer = [];
	  function printBuffer() {
	    logBuffer.forEach(function (logEntry, key) {
	      var started = logEntry.started;
	      var startedTime = logEntry.startedTime;
	      var action = logEntry.action;
	      var prevState = logEntry.prevState;
	      var error = logEntry.error;
	      var took = logEntry.took;
	      var nextState = logEntry.nextState;

	      var nextEntry = logBuffer[key + 1];
	      if (nextEntry) {
	        nextState = nextEntry.prevState;
	        took = nextEntry.started - started;
	      }
	      // message
	      var formattedAction = actionTransformer(action);
	      var isCollapsed = typeof collapsed === "function" ? collapsed(function () {
	        return nextState;
	      }, action) : collapsed;

	      var formattedTime = formatTime(startedTime);
	      var titleCSS = colors.title ? "color: " + colors.title(formattedAction) + ";" : null;
	      var title = "action " + (timestamp ? formattedTime : "") + " " + formattedAction.type + " " + (duration ? "(in " + took.toFixed(2) + " ms)" : "");

	      // render
	      try {
	        if (isCollapsed) {
	          if (colors.title) logger.groupCollapsed("%c " + title, titleCSS);else logger.groupCollapsed(title);
	        } else {
	          if (colors.title) logger.group("%c " + title, titleCSS);else logger.group(title);
	        }
	      } catch (e) {
	        logger.log(title);
	      }

	      var prevStateLevel = getLogLevel(level, formattedAction, [prevState], "prevState");
	      var actionLevel = getLogLevel(level, formattedAction, [formattedAction], "action");
	      var errorLevel = getLogLevel(level, formattedAction, [error, prevState], "error");
	      var nextStateLevel = getLogLevel(level, formattedAction, [nextState], "nextState");

	      if (prevStateLevel) {
	        if (colors.prevState) logger[prevStateLevel]("%c prev state", "color: " + colors.prevState(prevState) + "; font-weight: bold", prevState);else logger[prevStateLevel]("prev state", prevState);
	      }

	      if (actionLevel) {
	        if (colors.action) logger[actionLevel]("%c action", "color: " + colors.action(formattedAction) + "; font-weight: bold", formattedAction);else logger[actionLevel]("action", formattedAction);
	      }

	      if (error && errorLevel) {
	        if (colors.error) logger[errorLevel]("%c error", "color: " + colors.error(error, prevState) + "; font-weight: bold", error);else logger[errorLevel]("error", error);
	      }

	      if (nextStateLevel) {
	        if (colors.nextState) logger[nextStateLevel]("%c next state", "color: " + colors.nextState(nextState) + "; font-weight: bold", nextState);else logger[nextStateLevel]("next state", nextState);
	      }

	      try {
	        logger.groupEnd();
	      } catch (e) {
	        logger.log("—— log end ——");
	      }
	    });
	    logBuffer.length = 0;
	  }

	  return function (_ref) {
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        // exit early if predicate function returns false
	        if (typeof predicate === "function" && !predicate(getState, action)) {
	          return next(action);
	        }

	        var logEntry = {};
	        logBuffer.push(logEntry);

	        logEntry.started = timer.now();
	        logEntry.startedTime = new Date();
	        logEntry.prevState = stateTransformer(getState());
	        logEntry.action = action;

	        var returnedValue = undefined;
	        if (logErrors) {
	          try {
	            returnedValue = next(action);
	          } catch (e) {
	            logEntry.error = errorTransformer(e);
	          }
	        } else {
	          returnedValue = next(action);
	        }

	        logEntry.took = timer.now() - logEntry.started;
	        logEntry.nextState = stateTransformer(getState());

	        printBuffer();

	        if (logEntry.error) throw logEntry.error;
	        return returnedValue;
	      };
	    };
	  };
	}

	module.exports = createLogger;

/***/ },

/***/ 836:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = thunkMiddleware;
	function thunkMiddleware(_ref) {
	  var dispatch = _ref.dispatch;
	  var getState = _ref.getState;

	  return function (next) {
	    return function (action) {
	      if (typeof action === 'function') {
	        return action(dispatch, getState);
	      }

	      return next(action);
	    };
	  };
	}

/***/ },

/***/ 859:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(491);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(43)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/postcss-loader/index.js!./loading.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap!./../../../node_modules/postcss-loader/index.js!./loading.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }

});