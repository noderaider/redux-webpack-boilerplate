webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(919);

	var _performance = __webpack_require__(108);

	var _performance2 = _interopRequireDefault(_performance);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Spinner = __webpack_require__(396);

	var _Spinner2 = _interopRequireDefault(_Spinner);

	var _elements = __webpack_require__(174);

	var _elements2 = _interopRequireDefault(_elements);

	var _bunyan = __webpack_require__(122);

	var _globalStore = __webpack_require__(177);

	var _configureStore = __webpack_require__(421);

	var _configureStore2 = _interopRequireDefault(_configureStore);

	var _chai = __webpack_require__(12);

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

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.nextIdleStatusBlueprint = exports.publicBlueprints = exports.activityDetectionBlueprint = exports.activityBlueprint = exports.resetBlueprint = exports.stopBlueprint = exports.startBlueprint = undefined;

	var _chai = __webpack_require__(12);

	var _reduxBlueprint = __webpack_require__(379);

	var _constants = __webpack_require__(22);

	var startBlueprint = exports.startBlueprint = (0, _reduxBlueprint.createBlueprint)(_constants.START_BLUEPRINT);
	var stopBlueprint = exports.stopBlueprint = (0, _reduxBlueprint.createBlueprint)(_constants.STOP_BLUEPRINT);
	var resetBlueprint = exports.resetBlueprint = (0, _reduxBlueprint.createBlueprint)(_constants.RESET_BLUEPRINT);

	var activityBlueprint = exports.activityBlueprint = (0, _reduxBlueprint.createBlueprint)(_constants.ACTIVITY_BLUEPRINT, function (_ref) {
	  var x = _ref.x;
	  var y = _ref.y;
	  var type = _ref.type;
	  var isTransition = _ref.isTransition;
	  return { activeStatus: _constants.IDLESTATUS_ACTIVE, lastActive: +new Date(), lastEvent: { x: x, y: y, type: type }, isTransition: isTransition };
	});
	var activityDetectionBlueprint = exports.activityDetectionBlueprint = (0, _reduxBlueprint.createBlueprint)(_constants.ACTIVITY_DETECTION_BLUEPRINT, function (isDetectionRunning) {
	  return { isDetectionRunning: isDetectionRunning };
	});

	var publicBlueprints = exports.publicBlueprints = { start: startBlueprint, stop: stopBlueprint, reset: resetBlueprint };

	var nextIdleStatusBlueprint = exports.nextIdleStatusBlueprint = (0, _reduxBlueprint.createBlueprint)(_constants.NEXT_IDLE_STATUS_BLUEPRINT, function (nextIdleStatus) {
	  _chai.assert.ok(nextIdleStatus, 'nextIdleStatus must be defined');
	  return { nextIdleStatus: nextIdleStatus };
	});

/***/ },

/***/ 106:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createContext;

	var _chai = __webpack_require__(12);

	var _constants = __webpack_require__(22);

	var _defaults = __webpack_require__(386);

	var _context = __webpack_require__(382);

	var _context2 = _interopRequireDefault(_context);

	var _log = __webpack_require__(168);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	var noop = function noop() {};

	var validateContext = function validateContext(libContext, appContext) {
	  _chai.assert.ok(libContext, 'must pass opts to validate');
	  _chai.assert.ok(appContext, 'must pass opts to validate');

	  var libName = libContext.libName;
	  var appName = libContext.appName;
	  var activeEvents = appContext.activeEvents;
	  var thresholds = appContext.thresholds;

	  _chai.assert.ok(libName, 'libName must exist');
	  (0, _chai.assert)(typeof libName === 'string', 'libName option must be a string');
	  (0, _chai.assert)(libName.length > 0, 'libName option must not be empty');
	  _chai.assert.ok(appName, 'appName must exist');
	  (0, _chai.assert)(typeof appName === 'string', 'appName option must be a string');
	  (0, _chai.assert)(appName.length > 0, 'appName option must not be empty');
	  _chai.assert.ok(activeEvents, 'active events must exist');
	  _chai.assert.ok(thresholds, 'thresholds must exist');
	  _chai.assert.ok(thresholds.mouse, 'thresholds.mouse must exist');
	  (0, _chai.assert)(typeof thresholds.mouse === 'number', 'thresholds.mouse must be a number corresponding to pixels');
	  (0, _chai.assert)(typeof thresholds.phaseOffMS === 'number', 'thresholds.phaseOffMS must be a number corresponding to minimum milliseconds between updates to redux');
	  (0, _chai.assert)(typeof thresholds.phaseOnMS === 'number', 'thresholds.phaseOnMS must be a number corresponding to minimum milliseconds between updates to redux');
	};

	var configureInitialState = function configureInitialState(libContext) {
	  return function (appContext) {
	    return { idleStatus: _constants.IDLESTATUS_ACTIVE,
	      isRunning: false,
	      isDetectionRunning: false,
	      isIdle: false,
	      lastActive: +new Date(),
	      lastEvent: { x: -1, y: -1, type: null }
	    };
	  };
	};

	function createContext() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var appName = _ref.appName;
	  var IDLE_STATUSES = _ref.IDLE_STATUSES;
	  var idleStatusDelay = _ref.idleStatusDelay;
	  var activeStatusAction = _ref.activeStatusAction;
	  var idleStatusAction = _ref.idleStatusAction;
	  var _ref$activeEvents = _ref.activeEvents;
	  var activeEvents = _ref$activeEvents === undefined ? (0, _defaults.getActiveEvents)() : _ref$activeEvents;
	  var _ref$useFastStore = _ref.useFastStore;
	  var useFastStore = _ref$useFastStore === undefined ? (0, _defaults.getUseFastState)() : _ref$useFastStore;
	  var _ref$useLocalStore = _ref.useLocalStore;
	  var useLocalStore = _ref$useLocalStore === undefined ? (0, _defaults.getUseLocalState)() : _ref$useLocalStore;
	  var _ref$useWebRTCState = _ref.useWebRTCState;
	  var useWebRTCState = _ref$useWebRTCState === undefined ? (0, _defaults.getUseWebRTCState)() : _ref$useWebRTCState;
	  var _ref$useWebSocketsSta = _ref.useWebSocketsState;
	  var useWebSocketsState = _ref$useWebSocketsSta === undefined ? (0, _defaults.getUseWebSocketsState)() : _ref$useWebSocketsSta;
	  var _ref$thresholds = _ref.thresholds;
	  var thresholds = _ref$thresholds === undefined ? (0, _defaults.getThresholds)() : _ref$thresholds;
	  var _ref$level = _ref.level;
	  var level = _ref$level === undefined ? (0, _defaults.getLevel)() : _ref$level;

	  var libName = _constants.ROOT_STATE_KEY;
	  var libOpts = { libName: libName, validateContext: validateContext, configureAppContext: function configureAppContext(libContext) {
	      return function (appOpts) {
	        return appOpts;
	      };
	    }, configureInitialState: configureInitialState };
	  var appOpts = { appName: appName, IDLE_STATUSES: IDLE_STATUSES, idleStatusDelay: idleStatusDelay, activeStatusAction: activeStatusAction, idleStatusAction: idleStatusAction, activeEvents: activeEvents, useFastStore: useFastStore, useLocalStore: useLocalStore, useWebRTCState: useWebRTCState, useWebSocketsState: useWebSocketsState, thresholds: thresholds, level: level };
	  return (0, _context2.default)(libOpts)(appOpts);
	}

/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var noop = function noop() {};

	var createLogger = exports.createLogger = function createLogger(_ref) {
	  var libName = _ref.libName;
	  var level = _ref.level;

	  var _formatMessage = function _formatMessage(_ref2) {
	    var level = _ref2.level;
	    var message = _ref2.message;
	    var obj = _ref2.obj;

	    if (!message && typeof obj === 'string') {
	      message = obj;
	      obj = noop();
	    }
	    return _formatLog(obj ? level + ': \'' + message + '\' => ' + JSON.stringify(obj) : level + ': \'' + message + '\'');
	  };

	  var _formatLog = function _formatLog(message) {
	    return libName + ' | ' + message;
	  };

	  return  false ? { trace: function trace(obj, message) {
	      return level === 'trace' ? console.trace(_formatMessage({ level: 'trace', message: message, obj: obj })) : noop();
	    },
	    debug: function debug(obj, message) {
	      return ['trace', 'debug'].includes(level) ? console.log(_formatMessage({ level: 'debug', message: message, obj: obj })) : noop();
	    },
	    info: function info(obj, message) {
	      return ['trace', 'debug', 'info'].includes(level) ? console.info(_formatMessage({ level: 'info', message: message, obj: obj })) : noop();
	    },
	    warn: function warn(obj, message) {
	      return ['trace', 'debug', 'info', 'warn'].includes(level) ? console.warn(_formatMessage({ level: 'warn', message: message, obj: obj })) : noop();
	    },
	    error: function error(obj, message) {
	      return ['trace', 'debug', 'info', 'warn', 'error'].includes(level) ? console.error(_formatMessage({ level: 'error', message: message, obj: obj })) : noop();
	    }
	  } : { trace: noop, debug: noop, info: noop, warn: noop, error: noop };
	};

/***/ },

/***/ 169:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.configureStartDetection = undefined;

	var _chai = __webpack_require__(12);

	var _constants = __webpack_require__(22);

	var _blueprints = __webpack_require__(78);

	var STOP_TYPES = ['pointermove', 'MSPointerMove'];
	var FILTER_TYPES = ['mousemove'];

	/** Detects whether the activity should trigger a redux update */
	var _shouldActivityUpdate = function _shouldActivityUpdate(_ref) {
	  var log = _ref.log;
	  var thresholds = _ref.thresholds;
	  return function (stores) {
	    return function (_ref2) {
	      var type = _ref2.type;
	      var pageX = _ref2.pageX;
	      var pageY = _ref2.pageY;

	      if (STOP_TYPES.includes(type)) return false;
	      if (!FILTER_TYPES.includes(type)) return true;

	      var _stores$selectFirst = stores.selectFirst('lib');

	      var getState = _stores$selectFirst.getState;

	      /** If last event was not the same event type, trigger an update. */

	      var _getState = getState();

	      var lastActive = _getState.lastActive;
	      var lastEvent = _getState.lastEvent;

	      if (lastEvent.type !== type) return true;

	      /** If last mouse events coordinates were not within mouse threshold, trigger an update. */
	      var x = lastEvent.x;
	      var y = lastEvent.y;

	      if (pageX && pageY && x && y && Math.abs(pageX - x) < thresholds.mouse && Math.abs(pageY - y) < thresholds.mouse) return false;
	      return true;
	    };
	  };
	};

	var isRunning = function isRunning(stores) {
	  var state = stores.lib.getState();
	  return state.isDetectionRunning;
	};

	var configureStartDetection = exports.configureStartDetection = function configureStartDetection(_ref3) {
	  var log = _ref3.log;
	  var activeEvents = _ref3.activeEvents;
	  var thresholds = _ref3.thresholds;
	  var translateBlueprints = _ref3.translateBlueprints;
	  return function (stores) {
	    return function (dispatch, getState) {
	      var _translateBlueprints = translateBlueprints({ activity: _blueprints.activityBlueprint,
	        activityDetection: _blueprints.activityDetectionBlueprint
	      });

	      var activity = _translateBlueprints.activity;
	      var activityDetection = _translateBlueprints.activityDetection;

	      /** One of the event listeners triggered an activity occurrence event. This gets spammed */

	      var onActivity = function onActivity(e) {
	        if (!_shouldActivityUpdate({ log: log, thresholds: thresholds })(stores)(e)) return;

	        var _stores$lib$getState = stores.lib.getState();

	        var idleStatus = _stores$lib$getState.idleStatus;

	        var isTransition = idleStatus !== _constants.IDLESTATUS_ACTIVE;

	        var _stores$selectFirst2 = stores.selectFirst('lib');

	        var dispatch = _stores$selectFirst2.dispatch;

	        dispatch(activity({ x: e.pageX, y: e.pageY, type: e.type, isTransition: isTransition }));
	      };

	      log.warn('activity detection starting...');
	      if (_constants.IS_DEV) _chai.assert.ok(!isRunning(stores), 'activity detection is already running');
	      activeEvents.forEach(function (x) {
	        return document.addEventListener(x, onActivity);
	      });
	      dispatch(activityDetection(true));

	      /** RETURNS DISPATCHABLE DETECTION TERMINATOR */
	      return function (dispatch, getState) {
	        log.info('activity detection terminating...');
	        if (_constants.IS_DEV) (0, _chai.assert)(isRunning(stores), 'activity detection is not running');
	        activeEvents.forEach(function (x) {
	          return document.removeEventListener(x, onActivity);
	        });
	        dispatch(activityDetection(false));
	      };
	    };
	  };
	};

/***/ },

/***/ 170:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.configureStoreMultiplexer = undefined;

	var _chai = __webpack_require__(12);

	var _reduxMux = __webpack_require__(171);

	var _redux = __webpack_require__(76);

	var _constants = __webpack_require__(22);

	var _store = __webpack_require__(383);

	var configureStoreMultiplexer = exports.configureStoreMultiplexer = function configureStoreMultiplexer(_ref) {
	  var useFastStore = _ref.useFastStore;
	  var useLocalStore = _ref.useLocalStore;
	  return function (store) {
	    var libStore = (0, _reduxMux.bisectStore)(_constants.ROOT_STATE_KEY)(store);
	    var storesMapping = [['lib', libStore]];

	    var createInitialFastState = function createInitialFastState() {
	      return { lastActive: +new Date(), lastEvent: { x: -1, y: -1 } };
	    };
	    var createFastReducer = function createFastReducer() {
	      return (0, _store.createMergingReducer)(_constants.ACTIVITY);
	    };
	    if (useFastStore) storesMapping.push(['fast', (0, _redux.createStore)(createFastReducer(), createInitialFastState())]);

	    var createInitialLocalState = function createInitialLocalState() {
	      return { lastActive: +new Date() };
	    };
	    var createLocalReducer = function createLocalReducer() {
	      return (0, _store.configureReducer)(function (action) {
	        lastActive: action.payload.lastActive;
	      }, false)(_constants.ACTIVITY);
	    };
	    if (useLocalStore) storesMapping.push(['local', (0, _store.createLocalStore)(createLocalReducer(), createInitialLocalState())]);

	    return (0, _reduxMux.createStoreMultiplexer)(storesMapping);
	  };
	};

/***/ },

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.selectState = exports.bisectStore = exports.createStoreMultiplexer = undefined;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	var _slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;_e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }return _arr;
	  }return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

	var _chai = __webpack_require__(12);

	/**
	 * Takes in an ordered mapping of names to stores and reduces to a redux store compatible interface that can dispatch and getState to all stores or specific ones.
	 * @example <caption>Creates a store multiplexer that can dispatch and getState on all stores at once.</caption>
	 * let stores = createStoreMultiplexer([['app', appStore], ['fast', fastStore], ['session', sessionStore], ['local', localStore]])
	 * stores.dispatch('SOME_ACTION')
	 * let { app, fast, session, local } = stores.getState()
	 * @example <caption>Each store can still be individually called with dispatched and getState</caption>
	 * stores.app.dispatch('ACTION_FOR_APP_STORE_ONLY')
	 * let appState = stores.app.getState()
	 * @param  {Array} storeMapping  The mapping of store names to store references.
	 * @return {Object}              An object that can dispatch and getState to all stores or each individually with some useful helpers.
	 */
	var createStoreMultiplexer = exports.createStoreMultiplexer = function createStoreMultiplexer(storeMapping) {
	  _chai.assert.ok(storeMapping, 'storeMapping is required');
	  (0, _chai.assert)(Array.isArray(storeMapping), 'storeMapping must be an array');
	  (0, _chai.assert)(storeMapping.every(function (x) {
	    return Array.isArray(x) && x.length === 2;
	  }), 'storeMapping must be an array of [<name>, <store>] arrays');

	  var storeMap = new Map(storeMapping);
	  var mapReduceStores = function mapReduceStores(operation) {
	    var result = {};
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = storeMap.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var _step$value = _slicedToArray(_step.value, 2);

	        var name = _step$value[0];
	        var store = _step$value[1];

	        result[name] = operation(store);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    return result;
	  };

	  var storesLiteral = storeMapping.reduce(function (prev, _ref) {
	    var _ref2 = _slicedToArray(_ref, 2);

	    var name = _ref2[0];
	    var store = _ref2[1];

	    prev[name] = store;
	    return prev;
	  }, {});

	  var dispatch = function dispatch(action) {
	    return mapReduceStores(function (store) {
	      return store.dispatch(action);
	    });
	  };
	  var getState = function getState() {
	    return mapReduceStores(function (store) {
	      return store.getState();
	    });
	  };
	  var selectFirst = function selectFirst() {
	    for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
	      names[_key] = arguments[_key];
	    }

	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = names[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var name = _step2.value;

	        if (storeMap.has(name)) return storeMap.get(name);
	      }
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	          _iterator2.return();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }

	    throw new Error('None of the requested stores exist in storeMapping | configured => ' + JSON.stringify(storeMapping.map(function (x) {
	      return x[0];
	    })) + ' requested => ' + JSON.stringify(names));
	  };
	  var select = function select() {
	    for (var _len2 = arguments.length, names = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      names[_key2] = arguments[_key2];
	    }

	    return names.filter(function (x) {
	      return storeMap.has(x);
	    }).map(function (x) {
	      return storeMap.get(x);
	    });
	  };
	  return _extends({}, storesLiteral, { dispatch: dispatch,
	    getState: getState,
	    selectFirst: selectFirst,
	    select: select
	  });
	};

	/**
	 * Returns object implementing redux store interface whose getState method selects a sub tree of the overall state.
	 * Useful for library components that embed state in a subnode of consumer apps redux state
	 * @param  {Object}    store      A store to bisect
	 * @param  {...String} selectKeys The selection path to use with getState
	 * @return {Object}               A sub store implementing redux store interface
	 */
	var bisectStore = exports.bisectStore = function bisectStore() {
	  for (var _len3 = arguments.length, selectKeys = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    selectKeys[_key3] = arguments[_key3];
	  }

	  return function (store) {
	    _chai.assert.ok(store, 'store must exist');
	    _chai.assert.ok(store.dispatch, 'store must define dispatch');
	    _chai.assert.ok(store.getState, 'store must define getState');
	    (0, _chai.assert)(selectKeys.length > 0, 'must define one or more keys to select on');

	    return { dispatch: function dispatch(action) {
	        return store.dispatch(action);
	      },
	      subscribe: function subscribe(listener) {
	        return store.subscribe(listener);
	      },
	      getState: function getState() {
	        return selectState(selectKeys, store.getState());
	      }
	    };
	  };
	};

	/** Selects a sub state from a state tree by path. */
	var selectState = exports.selectState = function selectState(selectKeys, state, defaultValue) {
	  (0, _chai.assert)(Array.isArray(selectKeys), 'selectKeys must be an array.');
	  (0, _chai.assert)(selectKeys.length > 0, 'must specify a selection path');
	  _chai.assert.ok(state, 'state is required');
	  var result = state;
	  var _iteratorNormalCompletion3 = true;
	  var _didIteratorError3 = false;
	  var _iteratorError3 = undefined;

	  try {
	    for (var _iterator3 = selectKeys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	      var selectKey = _step3.value;

	      result = state[selectKey];
	      if (!result) break;
	    }
	  } catch (err) {
	    _didIteratorError3 = true;
	    _iteratorError3 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion3 && _iterator3.return) {
	        _iterator3.return();
	      }
	    } finally {
	      if (_didIteratorError3) {
	        throw _iteratorError3;
	      }
	    }
	  }

	  return result || defaultValue;
	};

/***/ },

/***/ 175:
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

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.middleware = exports.actions = exports.reducer = undefined;

	var _reduxIdleMonitor = __webpack_require__(387);

	var _reduxIdleMonitor2 = _interopRequireDefault(_reduxIdleMonitor);

	var _name = __webpack_require__(179);

	var _name2 = _interopRequireDefault(_name);

	var _constants = __webpack_require__(175);

	var _actions = __webpack_require__(416);

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

/***/ 179:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = 'redux-webpack-boilerplate';

/***/ },

/***/ 378:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.translateBlueprintsWith = exports.translateBlueprintTypesWith = exports.createBlueprint = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _chai = __webpack_require__(12);

	var _reduxActions = __webpack_require__(75);

	/**
	 * Creates an action blueprint. Allows delayed assignment of action type which is useful for library designers requiring namespaced action types.
	 * @example <caption>Create an action blueprint then translate it to get its action creator at a later time.</caption>
	 * const createActionType = blueprintType => `SOME_REDUX_LIB_${blueprintType}`
	 * let blueprint = createBlueprint('MOUSE_EVENT', (x, y) => ({x, y}), eventType => ({ eventType }))
	 * let actionCreator = blueprint(createActionType)
	 * @param  {String}   blueprintType  The name of the action (will be constructed at later time to get action type.)
	 * @param  {Function} payloadCreator Function that accepts action args and returns a FSA action payload.
	 * @param  {Function} metaCreator    Function that accepts action args and returns a FSA meta payload.
	 * @return {Function}                An action blueprint function that accepts an action type creator function as param to return an action creator.
	 */
	var createBlueprint = exports.createBlueprint = function createBlueprint(blueprintType) {
	  var payloadCreator = arguments.length <= 1 || arguments[1] === undefined ? function (args) {
	    return args;
	  } : arguments[1];
	  var metaCreator = arguments.length <= 2 || arguments[2] === undefined ? function (args) {
	    return args;
	  } : arguments[2];
	  return function (translateBlueprintType) {
	    return (0, _reduxActions.createAction)(translateBlueprintType(blueprintType), function (args) {
	      return payloadCreator(args);
	    }, function (args) {
	      return metaCreator(args);
	    });
	  };
	};

	/**
	 * Creates a translator that turns blueprint types into action types.
	 * @param  {Function} translateBlueprintType  Function that accepts an action name and returns an action type.
	 * @return {blueprintTypeTranslator}          Function that accepts array or object of blueprint type values and returns action types.
	 */
	var translateBlueprintTypesWith = exports.translateBlueprintTypesWith = function translateBlueprintTypesWith(translateBlueprintType) {
	  return function (blueprintTypes) {
	    _chai.assert.ok(blueprintTypes, 'blueprint types are required');
	    if (Array.isArray(blueprintTypes)) return blueprintTypes.map(function (x) {
	      return translateBlueprintType(x);
	    });
	    (0, _chai.assert)((typeof blueprintTypes === 'undefined' ? 'undefined' : _typeof(blueprintTypes)) === 'object', 'blueprint types must be array or object');
	    return Object.keys(blueprintTypes).reduce(function (actionTypes, x) {
	      actionTypes[x] = translateBlueprintType(blueprintTypes[x]);
	      return actionTypes;
	    }, {});
	  };
	};

	/**
	 * Creates a translator that turns blueprints into redux-actions FSA actionCreators
	 * @example <caption>Creates a function that can translate an array or object literal with blueprint values to actions.</caption>
	 * const translateBlueprintType = blueprintType => `SOME_REDUX_LIB_${blueprintType}`
	 * const translateBlueprints = translateBlueprintsWith(translateBlueprintType)
	 * let startBlueprint = createBlueprint('START')
	 * let endBlueprint = createBlueprint('END')
	 * let { startAction, endAction } = translateBlueprints({ startAction: startBlueprint, endAction: endBlueprint })
	 * dispatch(startAction())
	 * @param  {Function} translateBlueprintType  Function that accepts an action name and returns an action type.
	 * @return {blueprintTranslator}              Function that accepts array or object of blueprint values and returns redux-actions FSA actionCreators.
	 */
	var translateBlueprintsWith = exports.translateBlueprintsWith = function translateBlueprintsWith(translateBlueprintType) {
	  return function (blueprints) {
	    _chai.assert.ok(blueprints, 'blueprints are required');
	    if (Array.isArray(blueprints)) return blueprints.map(function (x) {
	      return blueprint(translateBlueprintType);
	    });
	    (0, _chai.assert)((typeof blueprints === 'undefined' ? 'undefined' : _typeof(blueprints)) === 'object', 'blueprints must be array or object');
	    return Object.keys(blueprints).reduce(function (actionCreators, x) {
	      actionCreators[x] = blueprints[x](translateBlueprintType);
	      return actionCreators;
	    }, {});
	  };
	};

/***/ },

/***/ 379:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.translateBlueprintsWith = exports.translateBlueprintTypesWith = exports.createBlueprint = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _chai = __webpack_require__(12);

	var _reduxActions = __webpack_require__(75);

	/**
	 * Creates an action blueprint. Allows delayed assignment of action type which is useful for library designers requiring namespaced action types.
	 * @example <caption>Create an action blueprint then translate it to get its action creator at a later time.</caption>
	 * const createActionType = blueprintType => `SOME_REDUX_LIB_${blueprintType}`
	 * let blueprint = createBlueprint('MOUSE_EVENT', (x, y) => ({x, y}), eventType => ({ eventType }))
	 * let actionCreator = blueprint(createActionType)
	 * @param  {String}   blueprintType  The name of the action (will be constructed at later time to get action type.)
	 * @param  {Function} payloadCreator Function that accepts action args and returns a FSA action payload.
	 * @param  {Function} metaCreator    Function that accepts action args and returns a FSA meta payload.
	 * @return {Function}                An action blueprint function that accepts an action type creator function as param to return an action creator.
	 */
	var createBlueprint = exports.createBlueprint = function createBlueprint(blueprintType) {
	  var payloadCreator = arguments.length <= 1 || arguments[1] === undefined ? function (args) {
	    return args;
	  } : arguments[1];
	  var metaCreator = arguments.length <= 2 || arguments[2] === undefined ? function (args) {
	    return args;
	  } : arguments[2];
	  return function (translateBlueprintType) {
	    return (0, _reduxActions.createAction)(translateBlueprintType(blueprintType), function (args) {
	      return payloadCreator(args);
	    }, function (args) {
	      return metaCreator(args);
	    });
	  };
	};

	/**
	 * Creates a translator that turns blueprint types into action types.
	 * @param  {Function} translateBlueprintType  Function that accepts an action name and returns an action type.
	 * @return {blueprintTypeTranslator}          Function that accepts array or object of blueprint type values and returns action types.
	 */
	var translateBlueprintTypesWith = exports.translateBlueprintTypesWith = function translateBlueprintTypesWith(translateBlueprintType) {
	  return function (blueprintTypes) {
	    _chai.assert.ok(blueprintTypes, 'blueprint types are required');
	    if (Array.isArray(blueprintTypes)) return blueprintTypes.map(function (x) {
	      return translateBlueprintType(x);
	    });
	    (0, _chai.assert)((typeof blueprintTypes === 'undefined' ? 'undefined' : _typeof(blueprintTypes)) === 'object', 'blueprint types must be array or object');
	    return Object.keys(blueprintTypes).reduce(function (actionTypes, x) {
	      actionTypes[x] = translateBlueprintType(blueprintTypes[x]);
	      return actionTypes;
	    }, {});
	  };
	};

	/**
	 * Creates a translator that turns blueprints into redux-actions FSA actionCreators
	 * @example <caption>Creates a function that can translate an array or object literal with blueprint values to actions.</caption>
	 * const translateBlueprintType = blueprintType => `SOME_REDUX_LIB_${blueprintType}`
	 * const translateBlueprints = translateBlueprintsWith(translateBlueprintType)
	 * let startBlueprint = createBlueprint('START')
	 * let endBlueprint = createBlueprint('END')
	 * let { startAction, endAction } = translateBlueprints({ startAction: startBlueprint, endAction: endBlueprint })
	 * dispatch(startAction())
	 * @param  {Function} translateBlueprintType  Function that accepts an action name and returns an action type.
	 * @return {blueprintTranslator}              Function that accepts array or object of blueprint values and returns redux-actions FSA actionCreators.
	 */
	var translateBlueprintsWith = exports.translateBlueprintsWith = function translateBlueprintsWith(translateBlueprintType) {
	  return function (blueprints) {
	    _chai.assert.ok(blueprints, 'blueprints are required');
	    if (Array.isArray(blueprints)) return blueprints.map(function (x) {
	      return blueprint(translateBlueprintType);
	    });
	    (0, _chai.assert)((typeof blueprints === 'undefined' ? 'undefined' : _typeof(blueprints)) === 'object', 'blueprints must be array or object');
	    return Object.keys(blueprints).reduce(function (actionCreators, x) {
	      actionCreators[x] = blueprints[x](translateBlueprintType);
	      return actionCreators;
	    }, {});
	  };
	};

/***/ },

/***/ 382:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureContext;

	var _chai = __webpack_require__(12);

	var _validate = __webpack_require__(384);

	var _log = __webpack_require__(168);

	var _reduxBlueprint = __webpack_require__(378);

	/**
	 * @typedef {Object} LibOpts
	 * @property {string} libName the name of the library.
	 * @property {function(context: LibContext): AppValidator} createValidator
	 */

	/**
	 * @typedef {function(opts: AppOpts)} AppValidator
	 */

	/**
	 * @typedef {Object} AppOpts
	 * @property {string} appName the name of the application.
	 */

	/**
	 * @typedef {Object} LibContext
	 * @property {string} libName the name of the library.
	 * @property {string} appName the name of the application.
	 * @property {string} actionNames the names of the defined actions (ordered).
	 */

	/**
	 * @typedef {LibAction[]} LibActions
	 */

	/**
	 * @typedef {Array} LibAction
	 */

	/**
	 * @typedef {Object} LibContext
	 * @property {string[]} actionNames the names of all the actions (ordered).
	 */

	/**
	 * @typedef CreateContext
	 * @type {function(appOpts: AppOpts): AppContext }
	 */

	var noop = function noop() {};
	var cleanActionName = function cleanActionName(name) {
	  return name.toUpperCase().replace(/-+\s+/, '_');
	};

	/** Validates library creators options */
	var validateLibOpts = function validateLibOpts(libOptsRaw) {
	  _chai.assert.ok(libOptsRaw, 'libOpts definition is required');
	  var libName = libOptsRaw.libName;
	  var validateContext = libOptsRaw.validateContext;
	  var configureAppContext = libOptsRaw.configureAppContext;
	  var configureInitialState = libOptsRaw.configureInitialState;

	  (0, _chai.assert)(typeof libName === 'string', 'libName must be a string');
	  (0, _chai.assert)(libName.length > 0, 'libName must not be empty');

	  _chai.assert.ok(validateContext, 'validateContext must exist');
	  (0, _chai.assert)(typeof validateContext === 'function', 'validateContext must be a function');

	  _chai.assert.ok(configureAppContext, 'configureAppContext must exist');
	  (0, _chai.assert)(typeof configureAppContext === 'function', 'configureAppContext must be a function');

	  _chai.assert.ok(configureInitialState, 'configureInitialState must exist');
	  (0, _chai.assert)(typeof configureInitialState === 'function', 'configureInitialState must be a function');
	};

	/** Validates library consumers options */
	var validateAppOpts = function validateAppOpts(appOptsRaw) {
	  _chai.assert.ok(appOptsRaw, 'appOpts are required');
	  var appName = appOptsRaw.appName;

	  (0, _chai.assert)(typeof appName === 'string', 'appName opt must be a string');
	  (0, _chai.assert)(appName.length > 0, 'appName opt must not be empty');
	};
	var isDev = ("production") !== 'production';

	/*
	import configureContext from 'redux-addons/context'
	const context = configureContext(libOpts)(appOpts)
	const {  } = context
	 */
	function configureContext(libOpts) {
	  if (isDev) validateLibOpts(libOpts);
	  var libName = libOpts.libName;
	  var validateContext = libOpts.validateContext;
	  var configureAppContext = libOpts.configureAppContext;
	  var configureInitialState = libOpts.configureInitialState;

	  return function (appOpts) {
	    if (isDev) validateAppOpts(appOpts);
	    var appName = appOpts.appName;
	    var level = appOpts.level;

	    var translateBlueprintType = function translateBlueprintType(blueprintType) {
	      return cleanActionName(libName) + '_' + cleanActionName(appName) + '_' + cleanActionName(blueprintType);
	    };
	    var translateBlueprintTypes = (0, _reduxBlueprint.translateBlueprintTypesWith)(translateBlueprintType);
	    var translateBlueprints = (0, _reduxBlueprint.translateBlueprintsWith)(translateBlueprintType);

	    var libContext = { log: (0, _log.createLogger)({ libName: libName, level: level }),
	      libName: libName,
	      appName: appName,
	      translateBlueprintTypes: translateBlueprintTypes,
	      translateBlueprints: translateBlueprints
	    };

	    var appContext = configureAppContext(libContext)(appOpts);
	    if (isDev) validateContext(libContext, appContext);

	    return Object.assign(appContext, libContext, { get initialState() {
	        return configureInitialState(libContext)(appContext);
	      }
	    });
	  };
	}

/***/ },

/***/ 383:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createActionMultiplexer = exports.createMergingReducer = exports.configureReducer = exports.createJSONLocalStore = exports.createLocalStore = exports.createJSONSessionStore = exports.createSessionStore = exports.configureLocalStore = exports.configureSessionStore = exports.configureBrowserStore = exports.configureBrowserStateAccessor = exports.configureLocalStateAccessor = exports.configureSessionStateAccessor = exports.createNoopStore = exports.toConstCase = undefined;

	var _slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;_e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }return _arr;
	  }return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	};

	var _chai = __webpack_require__(12);

	var _reduxActions = __webpack_require__(75);

	var noop = function noop() {};

	/** Formats a string as CONST_CASE */
	var toConstCase = exports.toConstCase = function toConstCase(value) {
	  return value.replace(/[- ]/, '_').toUpperCase();
	};

	/**
	 * Creates a store with all functions returning noop
	 * @return {Object}     Noop store object with noop dispatch, getState, subscribe, and replaceReducer functions.
	 */
	var createNoopStore = exports.createNoopStore = function createNoopStore() {
	  return { dispatch: noop, subscribe: noop, getState: noop, replaceReducer: noop };
	};

	var configureSessionStateAccessor = exports.configureSessionStateAccessor = function configureSessionStateAccessor(opts) {
	  return configureBrowserStateAccessor(sessionStorage, opts);
	};
	var configureLocalStateAccessor = exports.configureLocalStateAccessor = function configureLocalStateAccessor(opts) {
	  return configureBrowserStateAccessor(localStorage, opts);
	};

	/**
	 * Configures an accessor object with getState and setState functions for interacting with browser storage.
	 * @param  {Object}   browserStorage    The storage medium to use (sessionStorage / localStorage).
	 * @param  {String}   options.prefix    The prefix to use for state keys.
	 * @param  {Boolean}  options.useJSON   Enables serializing to a single JSON string and uses a single storage key.
	 * @param  {Function} options.formatKey The formatter to use for storage keys.
	 * @return {Function}                   Thunk taking initialState and returning initialized getState and setState functions.
	 */
	var configureBrowserStateAccessor = exports.configureBrowserStateAccessor = function configureBrowserStateAccessor(browserStorage) {
	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var _ref$prefix = _ref.prefix;
	  var prefix = _ref$prefix === undefined ? 'REDUX_BROWSER' : _ref$prefix;
	  var _ref$useJSON = _ref.useJSON;
	  var useJSON = _ref$useJSON === undefined ? false : _ref$useJSON;
	  var _ref$formatKey = _ref.formatKey;
	  var formatKey = _ref$formatKey === undefined ? function (prefix) {
	    var key = arguments.length <= 1 || arguments[1] === undefined ? 'STATE' : arguments[1];
	    return toConstCase(prefix) + '_' + toConstCase(key);
	  } : _ref$formatKey;

	  _chai.assert.ok(browserStorage, 'browserStorage is required (localStorage or sessionStorage)');
	  (0, _chai.assert)((typeof browserStorage === 'undefined' ? 'undefined' : _typeof(browserStorage)) === 'object', 'browserStorage must be an object');
	  (0, _chai.assert)(typeof browserStorage.setItem === 'function', 'browserStorage have same setter interface as localStorage / sessionStorage');
	  (0, _chai.assert)(typeof browserStorage.getItem === 'function', 'browserStorage have same getter interface as localStorage / sessionStorage');

	  var stateName = formatKey(prefix);

	  /** Will create the stateAccessor and initialize it with initialState */
	  return function (initialState) {
	    _chai.assert.ok(initialState, 'initialState is required.');
	    (0, _chai.assert)((typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState)) === 'object', 'initialState must be an object.');
	    var keyMap = useJSON ? noop() : new Map(Object.keys(initialState).map(function (x) {
	      return [x, formatKey(prefix, x)];
	    }));
	    var setState = useJSON ? function (newState) {
	      /** Serialize to a single JSON string and serialize that. */
	      browserStorage.setItem(stateName, JSON.stringify(newState));
	    } : function (newState) {
	      /** Set individual storage keys. */
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = keyMap.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _step$value = _slicedToArray(_step.value, 2);

	          var key = _step$value[0];
	          var storageKey = _step$value[1];

	          browserStorage.setItem(storageKey, newState[key]);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    };

	    var getState = useJSON ? function () {
	      var serializedState = browserStorage.getItem(stateName);
	      if (serializedState) return JSON.parse(serializedState);
	    } : function () {
	      var newState = {};
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = keyMap.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var _step2$value = _slicedToArray(_step2.value, 2);

	          var key = _step2$value[0];
	          var storageKey = _step2$value[1];

	          newState[key] = browserStorage.getItem(storageKey);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      return newState;
	    };
	    setState(initialState);
	    return { setState: setState, getState: getState };
	  };
	};

	/** Asserts that createBrowserStore options are valid. */
	var assertBrowserStore = function assertBrowserStore(reducer, initialState, createBrowserStateAccessor) {
	  _chai.assert.ok(reducer, 'reducer is required');
	  (0, _chai.assert)(typeof reducer === 'function', 'reducer must be a function');
	  _chai.assert.ok(initialState, 'initialState is required');
	  (0, _chai.assert)((typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState)) === 'object', 'initialState must be an object');
	  _chai.assert.ok(createBrowserStateAccessor, 'createBrowserStateAccessor is required');
	  (0, _chai.assert)(typeof createBrowserStateAccessor === 'function', 'createBrowserStateAccessor must be a function');
	};

	/**
	 * Works the same as createStore but uses browserStorage as persistence medium.
	 * @param  {!function}  localReducer - The reducer to create new state to be persisted.
	 * @param  {!Object}    initialState - Initial state to create in local storage (REQUIRED).
	 * @param  {String}     prefix - The local storage namespace to use.
	 * @return {Object}     Local store object with dispatch, getState, subscribe, and replaceReducer functions.
	 */
	var configureBrowserStore = exports.configureBrowserStore = function configureBrowserStore(createBrowserStateAccessor) {
	  return function (reducer, initialState) {
	    if (false) assertBrowserStore(reducer, initialState, createBrowserStateAccessor);

	    var _createBrowserStateAc = createBrowserStateAccessor(initialState);

	    var getState = _createBrowserStateAc.getState;
	    var setState = _createBrowserStateAc.setState;

	    var currentReducer = reducer;
	    var listeners = [];
	    var isDispatching = false;
	    var subscribe = function subscribe(listener) {
	      listeners.push(listener);
	      return function () {
	        var index = listeners.indexOf(listener);
	        listeners.splice(index, 1);
	      };
	    };
	    var dispatch = function dispatch(action) {
	      if (isDispatching) throw new Error('Browser reducers may not dispatch actions.');
	      try {
	        isDispatching = true;
	        setState(currentReducer(getState(), action));
	      } finally {
	        isDispatching = false;
	      }
	      listeners.slice().forEach(function (listener) {
	        return listener();
	      });
	      return action;
	    };
	    var replaceReducer = function replaceReducer(nextReducer) {
	      currentReducer = nextReducer;
	      dispatch({ type: '@@redux-browser/INIT' });
	    };
	    dispatch({ type: '@@redux-browser/INIT' });
	    return { dispatch: dispatch, subscribe: subscribe, getState: getState, replaceReducer: replaceReducer };
	  };
	};

	/** Configures a createSessionStore thunk that returns the same interface as redux createStore */
	var configureSessionStore = exports.configureSessionStore = function configureSessionStore(opts) {
	  var createSessionStateAccessor = configureSessionStateAccessor(opts);
	  return configureBrowserStore(createSessionStateAccessor);
	};

	/** Configures a createLocalStore thunk that returns the same interface as redux createStore */
	var configureLocalStore = exports.configureLocalStore = function configureLocalStore(opts) {
	  var createLocalStateAccessor = configureLocalStateAccessor(opts);
	  return configureBrowserStore(createLocalStateAccessor);
	};

	/**
	 * Creates sessionStorage interfacing component that implements redux store interface.
	 * Uses one sessionStorage key per state node. Only supports primitive state keys.
	 */
	var createSessionStore = exports.createSessionStore = function createSessionStore(reducer, initialState) {
	  return configureSessionStore({ useJSON: false })(reducer, initialState);
	};

	/**
	 * Creates sessionStorage interfacing component that implements redux store interface.
	 * Serializes / Deserializes state object to and from JSON. Supports nested structures.
	 */
	var createJSONSessionStore = exports.createJSONSessionStore = function createJSONSessionStore(reducer, initialState) {
	  return configureSessionStore({ useJSON: true })(reducer, initialState);
	};

	/**
	 * Creates localStorage interfacing component that implements redux store interface.
	 * Uses one localStorage key per state node. Only supports primitive state keys.
	 */
	var createLocalStore = exports.createLocalStore = function createLocalStore(reducer, initialState) {
	  return configureLocalStore({ useJSON: false })(reducer, initialState);
	};

	/**
	 * Creates localStorage interfacing component that implements redux store interface.
	 * Serializes / Deserializes state object to and from JSON. Supports nested structures.
	 */
	var createJSONLocalStore = exports.createJSONLocalStore = function createJSONLocalStore(reducer, initialState) {
	  return configureLocalStore({ useJSON: true })(reducer, initialState);
	};

	/**
	 * Configures a reducer that reduces action to a state, then optionally merges with previous state for subscribed action types.
	 * @param  {function} actionReducer Map the action to the object that will be merged to state.
	 * @param {bool}     mergeState    Defines whether the reducer results should be merged with the previous state.
	 * @return {Object}                 New state object.
	 */
	var configureReducer = exports.configureReducer = function configureReducer(actionReducer) {
	  var mergeState = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	  return function () {
	    for (var _len = arguments.length, subscribeTypes = Array(_len), _key = 0; _key < _len; _key++) {
	      subscribeTypes[_key] = arguments[_key];
	    }

	    return function (state, action) {
	      if (subscribeTypes.includes(action.type)) {
	        console.warn('autoconfigured reducer subscribe type match => ' + action.type + ' in ' + JSON.stringify(subscribeTypes));
	        return mergeState ? Object.assign({}, state, actionReducer(action)) : actionReducer(action);
	      }
	      return state;
	    };
	  };
	};

	/**
	 * Creates a reducer that merged payload with state for matching subscribe types.
	 * @param  {String[]} subscribeTypes   Action types to subscribe reducer to.
	 */
	var createMergingReducer = exports.createMergingReducer = configureReducer(function (action) {
	  return action.payload;
	}, true);

	//actionDefinitionMapping === [actionName, actionDefinition]
	// actionDefinition === { type, payloadCreactor, ?metaCreator }

	//payloadCreator === (actionArgs => payload)
	//metaCreator === (actionArgs => meta)
	//const action = createAction(ACTION_TYPE, payloadCreator, metaCreator)(actionArgs)

	var creatorOverride = function creatorOverride(props) {
	  return function (creator) {
	    return function (args) {
	      return Object.assign({}, creator(args), props);
	    };
	  };
	};

	var delayOverride = function delayOverride(delay) {
	  return overrideCreator({ delay: delay });
	};

	// TODO: MOVE THIS TO ACTIONS
	var createActionMultiplexer = exports.createActionMultiplexer = function createActionMultiplexer(actionMapping) {
	  _chai.assert.ok(actionMapping, 'actionMapping is required');
	  (0, _chai.assert)(Array.isArray(actionMapping), 'actionMapping must be an array');
	  (0, _chai.assert)(actionMapping.every(function (x) {
	    return Array.isArray(x) && x.length === 2;
	  }), 'actionMapping must be an array of [<name>, <store>] arrays');

	  var actionMap = new Map(actionMapping);

	  var translators = { delay: function delay(_delay) {
	      return function (args) {
	        return Object.assign({}, args, { delay: _delay });
	      };
	    }
	  };

	  var translateCreator = function translateCreator(creator) {
	    return function (translate) {
	      return function (args) {
	        return translate(typeof creator === 'function' ? creator(args) : creator, args);
	      };
	    };
	  };

	  var identityTranslator = function identityTranslator(identity) {
	    return identity;
	  };

	  var selectActionCreator = function selectActionCreator(actionName) {
	    var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var _ref2$translatePayloa = _ref2.translatePayload;
	    var translatePayload = _ref2$translatePayloa === undefined ? identityTranslator : _ref2$translatePayloa;
	    var _ref2$translateMeta = _ref2.translateMeta;
	    var translateMeta = _ref2$translateMeta === undefined ? identityTranslator : _ref2$translateMeta;

	    var actionDefinition = actionMap.get(actionName);
	    _chai.assert.ok(actionDefinition, 'action definition for actionName ' + actionName + ' must be configured in createActionMultiplexer');
	    var type = actionDefinition.type;
	    var payloadCreator = actionDefinition.payloadCreator;
	    var metaCreator = actionDefinition.metaCreator;

	    _chai.assert.ok(type, 'action type must be defined for actionName => ' + actionName);
	    (0, _chai.assert)(typeof type === 'string', 'action type must be string for actionName => ' + actionName);
	    return (0, _reduxActions.createAction)(type, translateCreator(payloadCreator)(translatePayload), translateCreator(metaCreator)(translateMeta));
	  };

	  var selectDelayedActionCreator = function selectDelayedActionCreator(actionName, delay) {
	    return selectActionCreator(actionName, { translateMeta: translators.delay(delay) });
	  };

	  var selectAction = function selectAction(actionName, args) {
	    return selectActionCreator(actionName)(args);
	  };

	  return { selectActionCreator: selectActionCreator, selectDelayedActionCreator: selectDelayedActionCreator, selectAction: selectAction };
	};

/***/ },

/***/ 384:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.validateOpts = undefined;

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	};

	var _chai = __webpack_require__(12);

	var validateOpts = exports.validateOpts = function validateOpts(opts) {
	  var actions = opts.actions;
	  var activeEvents = opts.activeEvents;
	  var useFastStore = opts.useFastStore;
	  var useLocalStore = opts.useLocalStore;
	  var thresholds = opts.thresholds;

	  _chai.assert.ok(actions, 'actions must exist');
	  (0, _chai.assert)(Array.isArray(actions), 'actions must be an array');
	  (0, _chai.assert)(actions.every(function (x) {
	    return Array.isArray(x);
	  }), 'actions must be an array of an array');
	  (0, _chai.assert)(actions.every(function (x) {
	    return x.length === 2;
	  }), 'every actions must have length 2');
	  (0, _chai.assert)(actions.every(function (x) {
	    return typeof x[0] === 'string';
	  }), 'every action must have first ordinal type string event name');
	  (0, _chai.assert)(actions.every(function (x) {
	    return _typeof(x[1]) === 'object';
	  }), 'every action must have second ordinal type object');
	  (0, _chai.assert)(actions.every(function (x) {
	    return typeof x[1].action !== 'undefined';
	  }), 'every action must have second ordinal action function defined');
	  (0, _chai.assert)(actions.every(function (x) {
	    var type = _typeof(x[1].timeoutMS);
	    return type === 'number' || type === 'function';
	  }), 'every action must have second ordinal timeoutMS number or function defined');
	  _chai.assert.ok(activeEvents, 'active events must exist');
	};

/***/ },

/***/ 385:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createStartDetection = undefined;

	var _blueprints = __webpack_require__(78);

	var _detection = __webpack_require__(169);

	var _multiplexer = __webpack_require__(170);

	var _constants = __webpack_require__(22);

	var createStartDetection = exports.createStartDetection = function createStartDetection(context) {
	  return function (dispatch, getState) {
	    var log = context.log;

	    var stores = (0, _multiplexer.configureStoreMultiplexer)(context)({ dispatch: dispatch, getState: getState });
	    var startDetection = (0, _detection.configureStartDetection)(context)(stores);

	    var endDetection = dispatch(startDetection);
	    return function (dispatch, getState) {
	      log.debug('STOP DETECTION SIGNALED');
	      dispatch(endDetection);
	    };
	  };
	};

/***/ },

/***/ 386:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getTimeStamp = exports.getTimeStamp = function getTimeStamp() {
	  return new Date().toTimeString();
	};

	var getActiveEvents = exports.getActiveEvents = function getActiveEvents() {
	  return ['mousemove', 'keydown', 'wheel', 'DOMMouseScroll', 'mouseWheel', 'mousedown', 'touchstart', 'touchmove', 'MSPointerDown', 'MSPointerMove'];
	};

	var getUseFastState = exports.getUseFastState = function getUseFastState() {
	  return true;
	};
	var getUseLocalState = exports.getUseLocalState = function getUseLocalState() {
	  return true;
	};
	var getUseWebRTCState = exports.getUseWebRTCState = function getUseWebRTCState() {
	  return true;
	};
	var getUseWebSocketsState = exports.getUseWebSocketsState = function getUseWebSocketsState() {
	  return true;
	};

	var getThresholds = exports.getThresholds = function getThresholds() {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var _ref$mouse = _ref.mouse;
	  var mouse = _ref$mouse === undefined ? 20 : _ref$mouse;
	  var _ref$phaseOffMS = _ref.phaseOffMS;
	  var phaseOffMS = _ref$phaseOffMS === undefined ? 2000 : _ref$phaseOffMS;
	  var _ref$phaseOnMS = _ref.phaseOnMS;
	  var phaseOnMS = _ref$phaseOnMS === undefined ? 0 : _ref$phaseOnMS;
	  return { mouse: mouse, phaseOffMS: phaseOffMS, phaseOnMS: phaseOnMS };
	};

	var getLevel = exports.getLevel = function getLevel() {
	  return 'info';
	};

/***/ },

/***/ 387:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configure;

	var _context = __webpack_require__(106);

	var _context2 = _interopRequireDefault(_context);

	var _reducer = __webpack_require__(389);

	var _blueprints = __webpack_require__(78);

	var _middleware = __webpack_require__(388);

	var _multiplexer = __webpack_require__(170);

	var _detection = __webpack_require__(169);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function configure(appOpts) {
	  var context = (0, _context2.default)(appOpts);
	  var translateBlueprints = context.translateBlueprints;

	  var actions = translateBlueprints(_blueprints.publicBlueprints);
	  return { reducer: (0, _reducer.createReducer)(context),
	    middleware: (0, _middleware.createMiddleware)(context),
	    actions: actions
	  };
	}

/***/ },

/***/ 388:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createMiddleware = undefined;
	exports.default = configureMiddleware;

	var _chai = __webpack_require__(12);

	var _context = __webpack_require__(106);

	var _context2 = _interopRequireDefault(_context);

	var _constants = __webpack_require__(22);

	var _reduxMux = __webpack_require__(171);

	var _blueprints = __webpack_require__(78);

	var _actions = __webpack_require__(385);

	var _states = __webpack_require__(390);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	/** When context has already been created, it can be shared to middleware component. */
	var createMiddleware = exports.createMiddleware = function createMiddleware(context) {
	  var log = context.log;
	  var activeStatusAction = context.activeStatusAction;
	  var idleStatusAction = context.idleStatusAction;
	  var translateBlueprintTypes = context.translateBlueprintTypes;
	  var translateBlueprints = context.translateBlueprints;
	  var IDLE_STATUSES = context.IDLE_STATUSES;
	  var idleStatusDelay = context.idleStatusDelay;
	  var thresholds = context.thresholds;

	  var _translateBlueprints = translateBlueprints(_blueprints.publicBlueprints);

	  var start = _translateBlueprints.start;
	  var stop = _translateBlueprints.stop;
	  var reset = _translateBlueprints.reset;

	  var _translateBlueprints2 = translateBlueprints({ nextIdleStatusAction: _blueprints.nextIdleStatusBlueprint });

	  var nextIdleStatusAction = _translateBlueprints2.nextIdleStatusAction;

	  var startDetection = (0, _actions.createStartDetection)(context);

	  var _translateBlueprintTy = translateBlueprintTypes({ START: _constants.START_BLUEPRINT,
	    RESET: _constants.RESET_BLUEPRINT,
	    STOP: _constants.STOP_BLUEPRINT,
	    NEXT_IDLE_STATUS: _constants.NEXT_IDLE_STATUS_BLUEPRINT,
	    ACTIVITY: _constants.ACTIVITY_BLUEPRINT
	  });

	  var START = _translateBlueprintTy.START;
	  var RESET = _translateBlueprintTy.RESET;
	  var STOP = _translateBlueprintTy.STOP;
	  var NEXT_IDLE_STATUS = _translateBlueprintTy.NEXT_IDLE_STATUS;
	  var ACTIVITY = _translateBlueprintTy.ACTIVITY;

	  var idleStatuses = [_constants.IDLESTATUS_ACTIVE].concat(_toConsumableArray(IDLE_STATUSES));
	  var getNextIdleStatus = (0, _states.getNextIdleStatusIn)(idleStatuses);
	  var IDLESTATUS_FIRST = getNextIdleStatus(_constants.IDLESTATUS_ACTIVE);

	  var stopDetection = null;
	  var nextTimeoutID = null;
	  var startDetectionID = null;
	  return function (store) {
	    var idleStore = (0, _reduxMux.bisectStore)(_constants.ROOT_STATE_KEY)(store);

	    return function (next) {
	      return function (action) {
	        if (!action.type) return next(action);
	        var dispatch = store.dispatch;
	        var getState = store.getState;
	        var type = action.type;
	        var payload = action.payload;

	        var scheduleTransition = function scheduleTransition(idleStatus) {
	          clearTimeout(nextTimeoutID);
	          var delay = dispatch(idleStatusDelay(idleStatus));
	          _chai.assert.ok(delay, 'must return an idle status delay for idleStatus === \'' + idleStatus + '\'');
	          _chai.assert.ok(typeof delay === 'number', 'idle status delay must be a number type for idleStatus === \'' + idleStatus + '\'');

	          var lastActive = new Date().toTimeString();
	          var nextMessage = NEXT_IDLE_STATUS + ' action continuing after ' + delay + ' MS delay, lastActive: ' + new Date().toTimeString();
	          var nextCancelMessage = function nextCancelMessage(cancelledAt) {
	            return NEXT_IDLE_STATUS + ' action cancelled before ' + delay + ' MS delay by dispatcher, lastActive: ' + new Date().toTimeString() + ', cancelledAt: ' + cancelledAt;
	          };
	          var nextIdleStatus = getNextIdleStatus(idleStatus);
	          log.trace('Scheduling next idle status \'' + idleStatus + '\' in ' + delay + ' MS, then \'' + nextIdleStatus + '\'');
	          nextTimeoutID = setTimeout(function () {
	            log.trace(nextMessage);
	            next(action);
	            dispatch(idleStatusAction(idleStatus));
	            if (nextIdleStatus) {
	              dispatch(nextIdleStatusAction(nextIdleStatus));
	            } else {
	              log.info('No more actions to schedule');
	              // END OF THE LINE
	            }
	          }, delay);
	          return function cancel() {
	            clearTimeout(nextTimeoutID);
	            log.trace(nextCancelMessage(new Date().toTimeString()));
	          };
	        };

	        if (type === START) {
	          stopDetection = dispatch(startDetection);
	          var result = next(action);
	          dispatch(nextIdleStatusAction(IDLESTATUS_FIRST));
	          return result;
	        }

	        if (type === RESET) {
	          clearTimeout(nextTimeoutID);
	          if (stopDetection) stopDetection();
	          dispatch(start());
	        }

	        if (type === STOP) {
	          clearTimeout(nextTimeoutID);
	          clearTimeout(startDetectionID);
	          if (stopDetection) dispatch(stopDetection);
	        }

	        if (type === NEXT_IDLE_STATUS) {
	          return scheduleTransition(payload.nextIdleStatus);
	        }

	        if (type === ACTIVITY) {
	          if (stopDetection && thresholds.phaseOffMS) {
	            dispatch(stopDetection);
	            stopDetection = null;
	            startDetectionID = setTimeout(function () {
	              stopDetection = dispatch(startDetection);
	            }, thresholds.phaseOffMS);
	          }

	          var _result = next(action);
	          if (payload.isTransition) {
	            log.trace('Transition activity occurred, triggering user active action.');
	            dispatch(activeStatusAction);
	          }
	          dispatch(nextIdleStatusAction(IDLESTATUS_FIRST));
	          return _result;
	        }
	        return next(action);
	      };
	    };
	  };
	};

	/** Creates middleware from opts including validation in development */
	function configureMiddleware(opts) {
	  return createMiddleware((0, _context2.default)(opts));
	}

/***/ },

/***/ 389:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createReducer = undefined;
	exports.default = configureReducer;

	var _context = __webpack_require__(106);

	var _context2 = _interopRequireDefault(_context);

	var _constants = __webpack_require__(22);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	/** When context has already been created, it can be shared to middleware component. */
	var createReducer = exports.createReducer = function createReducer(context) {
	  var initialState = context.initialState;
	  var translateBlueprintTypes = context.translateBlueprintTypes;

	  var _translateBlueprintTy = translateBlueprintTypes({ START: _constants.START_BLUEPRINT,
	    STOP: _constants.STOP_BLUEPRINT,
	    ACTIVITY: _constants.ACTIVITY_BLUEPRINT,
	    ACTIVITY_DETECTION: _constants.ACTIVITY_DETECTION_BLUEPRINT,
	    NEXT_IDLE_STATUS: _constants.NEXT_IDLE_STATUS_BLUEPRINT
	  });

	  var START = _translateBlueprintTy.START;
	  var STOP = _translateBlueprintTy.STOP;
	  var ACTIVITY = _translateBlueprintTy.ACTIVITY;
	  var ACTIVITY_DETECTION = _translateBlueprintTy.ACTIVITY_DETECTION;
	  var NEXT_IDLE_STATUS = _translateBlueprintTy.NEXT_IDLE_STATUS;

	  return function () {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var type = action.type;
	    var payload = action.payload;

	    switch (type) {
	      case START:
	        return Object.assign({}, state, selectStartPayload(payload));
	      case STOP:
	        return Object.assign({}, state, selectStopPayload(payload));
	      case ACTIVITY:
	        return Object.assign({}, state, selectActivityPayload(payload));
	      case ACTIVITY_DETECTION:
	        return Object.assign({}, state, selectActivityDetectionPayload(payload));
	      case NEXT_IDLE_STATUS:
	        return Object.assign({}, state, selectNextIdleStatusPayload(payload));
	      default:
	        return state;
	    }
	  };
	};

	var selectStartPayload = function selectStartPayload() {
	  return { isRunning: true };
	};
	var selectStopPayload = function selectStopPayload() {
	  return { isRunning: false };
	};
	var selectActivityPayload = function selectActivityPayload(_ref) {
	  var activeStatus = _ref.activeStatus;
	  var lastActive = _ref.lastActive;
	  var lastEvent = _ref.lastEvent;
	  var timeoutID = _ref.timeoutID;
	  return { idleStatus: activeStatus, lastActive: lastActive, lastEvent: lastEvent, timeoutID: timeoutID, isIdle: false };
	};
	var selectActivityDetectionPayload = function selectActivityDetectionPayload(_ref2) {
	  var isDetectionRunning = _ref2.isDetectionRunning;
	  return { isDetectionRunning: isDetectionRunning };
	};
	var selectNextIdleStatusPayload = function selectNextIdleStatusPayload(_ref3) {
	  var nextIdleStatus = _ref3.nextIdleStatus;
	  return { idleStatus: nextIdleStatus, isIdle: true };
	};

	/** Creates reducer from opts including validation in development */
	function configureReducer(opts) {
	  return createReducer((0, _context2.default)(opts));
	}

/***/ },

/***/ 390:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getNextIdleStatusIn = exports.getNextIdleStatusIn = function getNextIdleStatusIn(idleStatuses) {
	  return function (idleStatus) {
	    var nextIdleStatusIndex = idleStatuses.indexOf(idleStatus) + 1;
	    if (nextIdleStatusIndex < idleStatuses.length) return idleStatuses[nextIdleStatusIndex];
	  };
	};

/***/ },

/***/ 396:
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

/***/ 416:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.idleStatusAction = exports.activeStatusAction = exports.idleStatusDelay = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _visual = __webpack_require__(81);

	var _constants = __webpack_require__(175);

	var _reduxDevtoolsThemes = __webpack_require__(311);

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

/***/ 417:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = errors;

	var _immutable = __webpack_require__(126);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _constants = __webpack_require__(62);

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

/***/ 418:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _redux = __webpack_require__(76);

	var _visual = __webpack_require__(419);

	var _errors = __webpack_require__(417);

	var _errors2 = _interopRequireDefault(_errors);

	var _reduxIdleMonitor = __webpack_require__(176);

	var _reduxForm = __webpack_require__(163);

	var _constants = __webpack_require__(62);

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

/***/ 419:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.visual = visual;

	var _immutable = __webpack_require__(126);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _constants = __webpack_require__(62);

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

/***/ 420:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureStore;

	var _redux = __webpack_require__(76);

	var _reduxThunk = __webpack_require__(896);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(895);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reduxIdleMonitor = __webpack_require__(176);

	var _name = __webpack_require__(179);

	var _name2 = _interopRequireDefault(_name);

	var _config = __webpack_require__(79);

	var _visual = __webpack_require__(81);

	var _reducers = __webpack_require__(418);

	var _reducers2 = _interopRequireDefault(_reducers);

	var _DevTools = __webpack_require__(172);

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

/***/ 421:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	if (true) {
	  module.exports = __webpack_require__(420);
	} else {
	  module.exports = require('./configureStore.prod');
	}

/***/ },

/***/ 551:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "body {\r\n  background-color:rgb(224,224,224);\r\n}\r\n#loading-container {\r\n   width:100%;\r\n   text-align:center;\r\n}\r\n#loading-text {\r\n  border:1px solid black;\r\n}\r\n", "", {"version":3,"sources":["/../src/app/styles/loading.css"],"names":[],"mappings":"AAAA;EACE,kCAAkC;CACnC;AACD;GACG,WAAW;GACX,kBAAkB;CACpB;AACD;EACE,uBAAuB;CACxB","file":"loading.css","sourcesContent":["body {\r\n  background-color:rgb(224,224,224);\r\n}\r\n#loading-container {\r\n   width:100%;\r\n   text-align:center;\r\n}\r\n#loading-text {\r\n  border:1px solid black;\r\n}\r\n"],"sourceRoot":"webpack://"}]);

	// exports


/***/ },

/***/ 895:
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

/***/ 896:
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

/***/ 919:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(551);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(45)(content, {});
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