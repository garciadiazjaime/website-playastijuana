/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(3);

	var _reactRouter = __webpack_require__(4);

	var _bodyParser = __webpack_require__(5);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _config = __webpack_require__(6);

	var _config2 = _interopRequireDefault(_config);

	var _api = __webpack_require__(8);

	var _api2 = _interopRequireDefault(_api);

	var _routes = __webpack_require__(10);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();

	app.set('views', './views');
	app.set('view engine', 'jade');

	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({
	  extended: false
	}));

	app.use(_express2.default.static('static'));

	app.use('/api/', _api2.default);

	app.get('/sitemap.xml', function (req, res) {
	  res.status(200).send('sitemap');
	});

	app.get('/*', function (req, res) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (error, redirectLocation, renderProps) {
	    if (error) {
	      res.status(500).send(error.message);
	    } else if (redirectLocation) {
	      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (renderProps) {
	      var content = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RoutingContext, renderProps));
	      res.render('main', { content: content });
	      // res.status(200).send(renderToString(<RoutingContext {...renderProps} />))
	    } else {
	        res.status(404).send('Not found');
	      }
	  });
	});

	app.set('ipaddress', _config2.default.get('ipaddress'));
	app.set('port', _config2.default.get('port'));

	var server = app.listen(app.get('port'), app.get('ipaddress'), function (err) {
	  if (err) {
	    console.log(err);
	  }

	  var host = server.address().address;
	  var port = server.address().port;
	  console.log('Example app listening at http://%s:%s', host, port);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var convict = __webpack_require__(7);

	var config = convict({
	    email: {
	      doc: 'default contact email',
	      format: String,
	      default: 'info@mintitmedia.com'
	    },
	    ipaddress: {
	        doc: 'IP the application runs on',
	        format: 'ipaddress',
	        default: '127.0.0.1',
	        env: 'OPENSHIFT_NODEJS_IP'
	    },
	    port: {
	        doc: 'Port the application listens on',
	        format: 'port',
	        default: '3030',
	        env: 'OPENSHIFT_NODEJS_PORT'
	    },
	    sendgrid: {
	        doc: 'Sendrid API KEY',
	        format: String,
	        default: '',
	        env: 'SENDGRID_API_KEY'
	    }
	});

	config.validate();

	module.exports = config;


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("convict");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var express = __webpack_require__(1);
	/*eslint-disable */
	var router = express.Router();
	/*eslint-enable */
	var conf = __webpack_require__(6);
	var sendgrid = __webpack_require__(9)(conf.get('sendgrid'));

	router.post('/send_email', function (req, res) {
	  var fromname = req.body.fromname;
	  var replyto = req.body.replyto;
	  var subject = req.body.subject;
	  var html = req.body.html;

	  var email = new sendgrid.Email({
	    to: conf.get('email'),
	    from: conf.get('email'),
	    fromname: fromname,
	    replyto: replyto,
	    subject: subject,
	    bcc: ['info@mintitmedia.com'],
	    html: html
	  });

	  sendgrid.send(email, function (err) {
	    var response = true;
	    if (err) {
	      console.error(err);
	      response = false;
	    }
	    res.send({
	      status: response
	    });
	  });
	});

	exports.default = router;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("sendgrid");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	var _createBrowserHistory = __webpack_require__(12);

	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

	var _sitemap = __webpack_require__(13);

	var _sitemap2 = _interopRequireDefault(_sitemap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var items = _sitemap2.default.items;

	var routes = items.children.map(function (item, index) {
	  return _react2.default.createElement(_reactRouter.Route, { path: item.url, component: item.component, key: index });
	});
	var history = process.env.TIER === 'FE' ? (0, _createBrowserHistory2.default)() : null;

	exports.default = _react2.default.createElement(
	  _reactRouter.Router,
	  { history: history },
	  _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/', component: items.component },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: items.default }),
	    routes,
	    _react2.default.createElement(_reactRouter.Route, { path: 'directorio/playas-tijuana', component: items.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: 'directorio/playas-tijuana/:category', component: items.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: 'directorio/playas-tijuana/:category/:place', component: items.default })
	  )
	);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AppHandler = __webpack_require__(14);

	var _AppHandler2 = _interopRequireDefault(_AppHandler);

	var _home = __webpack_require__(24);

	var _home2 = _interopRequireDefault(_home);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  items: {
	    component: _AppHandler2.default,
	    default: _home2.default,
	    children: [{
	      title: 'Inicio',
	      url: '/inicio',
	      component: _home2.default
	    }]
	  },
	  icons: [{
	    title: 'facebook',
	    url: 'https://www.facebook.com/'
	  }],
	  addresses: [{
	    title: 'Tijuana',
	    tel: '(664) 308-2240'
	  }]
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _sitemap = __webpack_require__(13);

	var _sitemap2 = _interopRequireDefault(_sitemap);

	var _menu = __webpack_require__(15);

	var _menu2 = _interopRequireDefault(_menu);

	var _footer = __webpack_require__(17);

	var _footer2 = _interopRequireDefault(_footer);

	var _scroll = __webpack_require__(22);

	var _scroll2 = _interopRequireDefault(_scroll);

	var _menu3 = __webpack_require__(23);

	var _menu4 = _interopRequireDefault(_menu3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */


	var AppHandler = function (_React$Component) {
	  _inherits(AppHandler, _React$Component);

	  function AppHandler() {
	    _classCallCheck(this, AppHandler);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(AppHandler).apply(this, arguments));
	  }

	  _createClass(AppHandler, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.scrollHandler(true);
	      // window.addEventListener('scroll', this.onScroll, false);
	      this.googleAnalytics();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.scrollHandler();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('scroll', this.onScroll, false);
	    }
	  }, {
	    key: 'onScroll',
	    value: function onScroll() {
	      var offset = window.pageYOffset;
	      if (offset > 186) {
	        $('#menu_wrapper').addClass('navbar-fixed-top');
	      } else {
	        $('#menu_wrapper').removeClass('navbar-fixed-top');
	      }
	    }
	  }, {
	    key: 'googleAnalytics',
	    value: function googleAnalytics() {
	      /*eslint-disable */
	      (function (i, s, o, g, r, a, m) {
	        i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
	          (i[r].q = i[r].q || []).push(arguments);
	        }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
	      })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
	      ga('create', 'UA-75576478-1', 'auto');
	      ga('send', 'pageview');
	      /*eslint-enable */
	    }
	  }, {
	    key: 'scrollHandler',
	    value: function scrollHandler(isFirstTime) {
	      var location = this.props.location;

	      (0, _scroll2.default)(location);
	      if (!isFirstTime) {
	        var bits = location.pathname.split('/');
	        (0, _menu4.default)(bits[1] || 'inicio');
	      }
	    }
	  }, {
	    key: 'clickHandler',
	    value: function clickHandler() {
	      if ($('.navbar-header button').is(':visible')) {
	        $('.navbar-header button').click();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_menu2.default, { items: _sitemap2.default.items.children, icons: _sitemap2.default.icons, onClick: this.clickHandler }),
	        this.props.children,
	        _react2.default.createElement(_footer2.default, { items: _sitemap2.default.items.children, addresses: _sitemap2.default.addresses })
	      );
	    }
	  }]);

	  return AppHandler;
	}(_react2.default.Component);

	exports.default = AppHandler;


	AppHandler.propTypes = {
	  children: _react2.default.PropTypes.object.isRequired,
	  location: _react2.default.PropTypes.any
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var style = __webpack_require__(16);

	var MainMenu = function (_React$Component) {
	  _inherits(MainMenu, _React$Component);

	  function MainMenu() {
	    _classCallCheck(this, MainMenu);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(MainMenu).apply(this, arguments));
	  }

	  _createClass(MainMenu, [{
	    key: 'render',
	    value: function render() {
	      /*eslint-disable */
	      return _react2.default.createElement(
	        'div',
	        { className: 'container-fluid' },
	        _react2.default.createElement(
	          'div',
	          { className: 'row ' + style.header },
	          _react2.default.createElement(
	            'div',
	            { className: 'col-xs-12' },
	            _react2.default.createElement(
	              'h1',
	              null,
	              _react2.default.createElement(
	                _reactRouter.Link,
	                { to: '/directorio/playas-tijuana', title: 'Directorio Playas de Tijuana' },
	                'Directorio',
	                _react2.default.createElement(
	                  'span',
	                  { className: style.playami },
	                  ' Playas de Tijuana'
	                )
	              )
	            )
	          )
	        )
	      );
	      /*eslint-enable */
	    }
	  }]);

	  return MainMenu;
	}(_react2.default.Component);

	exports.default = MainMenu;


	MainMenu.propTypes = {
	  items: _react2.default.PropTypes.array.isRequired,
	  icons: _react2.default.PropTypes.array,
	  location: _react2.default.PropTypes.any,
	  onClick: _react2.default.PropTypes.func.isRequired
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"fCenter":"style__fCenter___cfX-h","vCenter":"style__vCenter___ZA14l","vCenterRel":"style__vCenterRel___1GkYt","hCenter":"style__hCenter___2Rj-i","inheritHeight":"style__inheritHeight___2LMcf","hideOverflow":"style__hideOverflow___3olA9","header":"style__header___3oysY","playami":"style__playami___1p20f"};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _brand = __webpack_require__(18);

	var _brand2 = _interopRequireDefault(_brand);

	var _contact = __webpack_require__(20);

	var _contact2 = _interopRequireDefault(_contact);

	var _projects = __webpack_require__(21);

	var _projects2 = _interopRequireDefault(_projects);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var style = __webpack_require__(19);

	var Footer1 = function (_React$Component) {
	  _inherits(Footer1, _React$Component);

	  function Footer1() {
	    _classCallCheck(this, Footer1);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Footer1).apply(this, arguments));
	  }

	  _createClass(Footer1, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: style.footerWrapper },
	        _react2.default.createElement(
	          'div',
	          { className: 'container-fluid' },
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-xs-12 col-sm-5' },
	              _react2.default.createElement(_brand2.default, null)
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-xs-12 col-sm-7' },
	              _react2.default.createElement(_contact2.default, null),
	              _react2.default.createElement(_projects2.default, null)
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Footer1;
	}(_react2.default.Component);

	exports.default = Footer1;


	Footer1.propTypes = {
	  items: _react2.default.PropTypes.array.isRequired,
	  addresses: _react2.default.PropTypes.array
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */


	var style = __webpack_require__(19);

	var Brand = function (_React$Component) {
	  _inherits(Brand, _React$Component);

	  function Brand() {
	    _classCallCheck(this, Brand);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Brand).apply(this, arguments));
	  }

	  _createClass(Brand, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'row ' + style.brand },
	        _react2.default.createElement(
	          'a',
	          { className: style.logo, href: 'http://mintitmedia.com', title: 'Diseño y Desarrollo Web en Tijuana', target: '_blank' },
	          _react2.default.createElement('img', { src: '/images/logo-mint.png', alt: 'Diseño y Desarrollo Web en Tijuana' })
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/directorio/playas-tijuana', title: 'Directorio de Playas de Tijuana' },
	            _react2.default.createElement(
	              'span',
	              { className: style.yellow },
	              'Directorio'
	            ),
	            _react2.default.createElement(
	              'span',
	              { className: style.white },
	              ' Playas de Tijuana'
	            )
	          ),
	          ' es un producto desarrollado por ',
	          _react2.default.createElement(
	            'a',
	            { href: 'http://mintitmedia.com', title: 'Diseño y desarrollo web en Tijuana', target: '_blank' },
	            'Mint IT Media'
	          ),
	          ', para la comunidad de Playas de Tijuana y el público en general. ',
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/directorio/playas-tijuana', title: 'Directorio de Playas de Tijuana' },
	            'Directorio de Playas de Tijuana'
	          ),
	          ' es un servicio que publica de manera sencilla la información referente a restaurantes, negocios, escuelas ubicados en Playas de Tijuana. ',
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/directorio/playas-tijuana', title: 'Directorio de Playas de Tijuana' },
	            'Direcotrio Playas de Tijuana'
	          ),
	          ' no se hace responsable de la información aquí publicada.'
	        )
	      );
	    }
	  }]);

	  return Brand;
	}(_react2.default.Component);

	exports.default = Brand;

/***/ },
/* 19 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"fCenter":"style__fCenter___24X-f","vCenter":"style__vCenter___rkH6k","vCenterRel":"style__vCenterRel___W_SE5","hCenter":"style__hCenter___rq5W3","inheritHeight":"style__inheritHeight___IbmOF","hideOverflow":"style__hideOverflow___3nmjb","footerWrapper":"style__footerWrapper___zbtoF","brand":"style__brand___1i--U","yellow":"style__yellow___RRjP0","white":"style__white___3N7gH","contact":"style__contact___2AMMK","facebook":"style__facebook___39dVV","projects":"style__projects___2bCs6"};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var style = __webpack_require__(19);

	var FooterTop = function (_React$Component) {
	  _inherits(FooterTop, _React$Component);

	  function FooterTop() {
	    _classCallCheck(this, FooterTop);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(FooterTop).apply(this, arguments));
	  }

	  _createClass(FooterTop, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'row ' + style.contact },
	        _react2.default.createElement(
	          'div',
	          { className: 'col-xs-10 col-xs-offset-1' },
	          _react2.default.createElement(
	            'p',
	            null,
	            'Si deseas salir en ',
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { to: '/directorio/playas-tijuana', title: 'Directorio de Playas de Tijuana' },
	              'Directorio de Playas de Tijuana'
	            ),
	            ', crear tu propio directorio o tienes alguna página o app en mente:'
	          ),
	          _react2.default.createElement(
	            'h2',
	            null,
	            'Contáctanos'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'col-xs-12 col-xs-offset-1 col-sm-5' },
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: 'http://mintitmedia.com', target: '_blank' },
	            'mintitmedia.com'
	          ),
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { className: style.facebook, target: '_blank', to: 'http://facebook.com/mintitmedia' },
	            '/mintitmedia'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'col-xs-12 col-sm-5' },
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: 'phone:6643082240' },
	            '(664)308-2240'
	          )
	        )
	      );
	    }
	  }]);

	  return FooterTop;
	}(_react2.default.Component);

	exports.default = FooterTop;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */


	var style = __webpack_require__(19);

	var Projects = function (_React$Component) {
	  _inherits(Projects, _React$Component);

	  function Projects() {
	    _classCallCheck(this, Projects);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Projects).apply(this, arguments));
	  }

	  _createClass(Projects, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'row ' + style.projects },
	        _react2.default.createElement(
	          'div',
	          { className: 'col-xs-12' },
	          _react2.default.createElement(
	            'p',
	            null,
	            'Projectos hermanos de ',
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { to: '/directorio/playas-tijuana', title: 'Directorio de Playas de Tijuana' },
	              'Directorio de Playas de Tijuana'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'col-xs-4' },
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: 'http://garitacenter.com', target: '_blank', title: 'Reporte de Garitas en Tijuana para San Ysidro y Otay' },
	            _react2.default.createElement('img', { src: '/images/gc-logo.png', alt: 'Reporte de Garitas en Tijuana para San Ysidro y Otay' }),
	            _react2.default.createElement(
	              'p',
	              null,
	              'Garita Center'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'col-xs-4' },
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: 'http://misofertasdetrabajo.com', target: '_blank', title: 'Ofertas de Trabajo en Tijuana' },
	            _react2.default.createElement('img', { src: '/images/modt-logo.png', alt: 'Ofertas de Trabajo en Tijuana' }),
	            _react2.default.createElement(
	              'p',
	              null,
	              'Mis ofertas de trabajo'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'col-xs-4' },
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: 'http://mintitmedia.com', target: '_blank', title: 'Eventos, conciertos, tokadas, música, ruido en Tijuana' },
	            _react2.default.createElement('img', { src: '/images/gp-logo.png', alt: 'Eventos, conciertos, tokadas, música, ruido en Tijuana' }),
	            _react2.default.createElement(
	              'p',
	              null,
	              'Gig playlist'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Projects;
	}(_react2.default.Component);

	exports.default = Projects;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* eslint max-len: [2, 600, 4] */
	var scropllInProgress = false;

	function getScrollTo(section, elementID) {
	  var topElements = ['inicio', 'nosotros', 'equipo', 'servicios', 'contacto'];
	  if (topElements.indexOf(elementID) !== -1 || section === 'contacto') {
	    return 0;
	  }
	  return $('#' + elementID).offset().top - 220;
	}

	exports.default = function (location) {
	  // todo: get topElements from sitemap and improve exceptions "elementID"
	  var bits = location.pathname.split('/');
	  var elementID = location.pathname ? bits.pop() || 'inicio' : 'inicio';
	  if ($('.menu_trigger').is(':visible') && bits.length === 1) {
	    elementID = 'inicio';
	  }
	  if (bits[1] === 'contacto') {
	    elementID = 'contacto';
	  }
	  if ($('#' + elementID).length && !scropllInProgress) {
	    scropllInProgress = true;
	    var scrollTo = getScrollTo(bits[1], elementID);
	    var srolltime = 100;
	    var rootTag = typeof document.body.scrollTop !== 'undefined' ? 'body' : 'html, body';
	    $(rootTag).animate({
	      scrollTop: scrollTo
	    }, srolltime, 'swing', function () {
	      scropllInProgress = false;
	    });
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (elementID) {
	  $('.navbar-nav li.active').removeClass('active');
	  $('.navbar-nav a#' + elementID).parent().addClass('active');
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(25);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _slug = __webpack_require__(26);

	var _slug2 = _interopRequireDefault(_slug);

	var _block = __webpack_require__(27);

	var _block2 = _interopRequireDefault(_block);

	var _block3 = __webpack_require__(30);

	var _block4 = _interopRequireDefault(_block3);

	var _categories = __webpack_require__(38);

	var _categories2 = _interopRequireDefault(_categories);

	var _places = __webpack_require__(39);

	var _places2 = _interopRequireDefault(_places);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */


	var HomeSection = function (_React$Component) {
	  _inherits(HomeSection, _React$Component);

	  function HomeSection() {
	    _classCallCheck(this, HomeSection);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(HomeSection).apply(this, arguments));
	  }

	  _createClass(HomeSection, [{
	    key: 'getCategoryId',
	    value: function getCategoryId(categories, category) {
	      if (_lodash2.default.isArray(categories) && categories.length && category) {
	        for (var i = 0, len = categories.length; i < len; i++) {
	          var slug = (0, _slug2.default)(categories[i].name);
	          if (slug === category) {
	            return categories[i].id;
	          }
	        }
	      }
	      return null;
	    }
	  }, {
	    key: 'getCarouselData',
	    value: function getCarouselData() {
	      return [{
	        image: '/images/demo.jpg',
	        title: 'AKI Sushi De Playas',
	        description: 'El mejor sushi en Playas de Tijuana',
	        category: 'comida',
	        url: '/directorio/playas-tijuana/comida/aki-sushi-de-playas'
	      }, {
	        image: '/images/demo.jpg',
	        title: 'Di Vino bar',
	        description: 'El mejor bar y restaurante en Playas de Tijuana',
	        category: 'bar',
	        url: '/directorio/playas-tijuana/bar/di-vino-bar'
	      }, {
	        image: '/images/demo.jpg',
	        title: 'Bar Matt',
	        description: 'El mejor bar en Playas de Tijuana',
	        category: 'bar',
	        url: '/directorio/playas-tijuana/bar/bar-matt'
	      }];
	    }
	  }, {
	    key: 'filterPlacesByCategoryId',
	    value: function filterPlacesByCategoryId(places, categoryId) {
	      if (categoryId) {
	        return places.filter(function (item) {
	          return _lodash2.default.isArray(item.categories) && item.categories.length && item.categories[0].id === categoryId;
	        });
	      }
	      return places;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props$params = this.props.params;
	      var category = _props$params.category;
	      var place = _props$params.place;

	      var categoryId = this.getCategoryId(_categories2.default, category);
	      var places = this.filterPlacesByCategoryId(_places2.default, categoryId);
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_block2.default, { data: this.getCarouselData() }),
	        _react2.default.createElement(_block4.default, { categories: _categories2.default, places: places, category: category, place: place })
	      );
	    }
	  }]);

	  return HomeSection;
	}(_react2.default.Component);

	exports.default = HomeSection;


	HomeSection.propTypes = {
	  params: _react2.default.PropTypes.any
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (str) {
	  var response = str.replace(/^\s+|\s+$/g, ''); // trim
	  response = response.toLowerCase();

	  // remove accents, swap ñ for n, etc
	  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
	  var to = 'aaaaeeeeiiiioooouuuunc------';
	  for (var i = 0, l = from.length; i < l; i++) {
	    response = response.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	  }

	  response = response.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
	  .replace(/\s+/g, '-') // collapse whitespace and replace by -
	  .replace(/-+/g, '-'); // collapse dashes

	  return response;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(25);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _reactRouter = __webpack_require__(4);

	var _carousel = __webpack_require__(28);

	var _carousel2 = _interopRequireDefault(_carousel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */


	var style = __webpack_require__(29);

	var Block1 = function (_React$Component) {
	  _inherits(Block1, _React$Component);

	  function Block1() {
	    _classCallCheck(this, Block1);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Block1).apply(this, arguments));
	  }

	  _createClass(Block1, [{
	    key: 'renderItems',
	    value: function renderItems(data) {
	      if (_lodash2.default.isArray(data) && data.length) {
	        return data.map(function (item, index) {
	          var className = index === 0 ? 'active' : '';
	          return _react2.default.createElement(
	            'div',
	            { className: 'item ' + className + ' ' + (style.item || ''), key: index },
	            _react2.default.createElement(
	              'div',
	              { className: style.imgContainer },
	              _react2.default.createElement('img', { itemProp: 'image', src: item.image || '/images/demo.jpg', alt: item.description }),
	              _react2.default.createElement(
	                'h3',
	                { itemProp: 'name' },
	                _react2.default.createElement(
	                  _reactRouter.Link,
	                  { to: item.url, title: item.title },
	                  item.title
	                )
	              ),
	              _react2.default.createElement(
	                'h4',
	                { itemProp: 'description' },
	                item.description
	              )
	            )
	          );
	        });
	      }
	      return null;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var data = this.props.data;

	      var carouselClasses = {
	        inner: style.inner,
	        controls: {
	          base: style.controls,
	          prev: style.prev,
	          next: style.next
	        }
	      };
	      return _react2.default.createElement(
	        'div',
	        { className: style.feature },
	        _react2.default.createElement(
	          'div',
	          { className: style.carouselContainer, itemScope: true, itemType: 'http://schema.org/LocalBusiness' },
	          _react2.default.createElement(
	            _carousel2.default,
	            { id: 'main-carousel', interval: 8000, indicators: false, classes: carouselClasses },
	            this.renderItems(data)
	          )
	        )
	      );
	    }
	  }]);

	  return Block1;
	}(_react2.default.Component);

	exports.default = Block1;


	Block1.propTypes = {
	  data: _react2.default.PropTypes.array.isRequired
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(25);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */


	var Carousel = function (_React$Component) {
	  _inherits(Carousel, _React$Component);

	  function Carousel() {
	    _classCallCheck(this, Carousel);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Carousel).apply(this, arguments));
	  }

	  _createClass(Carousel, [{
	    key: 'getIndicators',
	    value: function getIndicators(data, flag) {
	      // todo: implement based on bootsrap syntax
	      if (flag !== false && _lodash2.default.isArray(data) && data.length) {
	        return data.map(function (item, index) {
	          return _react2.default.createElement(
	            'div',
	            { key: index },
	            item
	          );
	        });
	      }
	      return null;
	    }
	  }, {
	    key: 'getControls',
	    value: function getControls(flag, id, classes) {
	      var base = classes.base;
	      var prev = classes.prev;
	      var next = classes.next;

	      if (flag !== false) {
	        return _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'a',
	            { className: 'left carousel-control ' + (base || '') + ' ' + (prev || ''), href: '#' + id, role: 'button', 'data-slide': 'prev' },
	            _react2.default.createElement(
	              'span',
	              { className: 'sr-only' },
	              'Previous'
	            )
	          ),
	          _react2.default.createElement(
	            'a',
	            { className: 'right carousel-control ' + (base || '') + ' ' + (next || ''), href: '#' + id, role: 'button', 'data-slide': 'next' },
	            _react2.default.createElement(
	              'span',
	              { className: 'sr-only' },
	              'Next'
	            )
	          )
	        );
	      }
	      return null;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var id = _props.id;
	      var interval = _props.interval;
	      var children = _props.children;
	      var indicators = _props.indicators;
	      var controls = _props.controls;
	      var classes = _props.classes;

	      return _react2.default.createElement(
	        'div',
	        { id: id, className: 'carousel slide container-fluid', 'data-ride': 'carousel', 'data-interval': interval || 5000 },
	        _react2.default.createElement(
	          'div',
	          { className: 'carousel-inner ' + (classes.inner || ''), role: 'listbox' },
	          this.getIndicators(children, indicators),
	          children,
	          this.getControls(controls, id, classes.controls)
	        )
	      );
	    }
	  }]);

	  return Carousel;
	}(_react2.default.Component);

	exports.default = Carousel;


	Carousel.propTypes = {
	  id: _react2.default.PropTypes.string.isRequired,
	  interval: _react2.default.PropTypes.number.isRequired,
	  children: _react2.default.PropTypes.any,
	  indicators: _react2.default.PropTypes.bool,
	  controls: _react2.default.PropTypes.bool,
	  classes: _react2.default.PropTypes.object
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"fCenter":"style__fCenter___1IAv0","vCenter":"style__vCenter___3op1c","prev":"style__prev___KokMH","next":"style__next___2VHzS","vCenterRel":"style__vCenterRel___3rmpk","hCenter":"style__hCenter___bN1_x","inheritHeight":"style__inheritHeight___3EV0T","hideOverflow":"style__hideOverflow___1jYcy","feature":"style__feature___3zFaz","carouselContainer":"style__carouselContainer___3tYAW","inner":"style__inner___m2WR-","item":"style__item___1hdp3","imgContainer":"style__imgContainer___1f347","controls":"style__controls___15CM-"};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _category = __webpack_require__(31);

	var _place = __webpack_require__(34);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */


	var style = __webpack_require__(37);

	var Block2 = function (_React$Component) {
	  _inherits(Block2, _React$Component);

	  function Block2() {
	    _classCallCheck(this, Block2);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Block2).apply(this, arguments));
	  }

	  _createClass(Block2, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var categories = _props.categories;
	      var places = _props.places;
	      var category = _props.category;


	      return _react2.default.createElement(
	        'div',
	        { className: 'container-fluid' },
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-3 col-xs-12 col-md-2 ' + style.categories },
	            _react2.default.createElement(_category.CategoryList, { data: categories, category: category })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'col-sm-9 col-xs-12 col-md-10' },
	            _react2.default.createElement(_place.PlaceList, { data: places, categories: categories })
	          )
	        )
	      );
	    }
	  }]);

	  return Block2;
	}(_react2.default.Component);

	exports.default = Block2;


	Block2.propTypes = {
	  categories: _react2.default.PropTypes.array.isRequired,
	  places: _react2.default.PropTypes.array.isRequired,
	  category: _react2.default.PropTypes.string,
	  place: _react2.default.PropTypes.string
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _categoryList = __webpack_require__(32);

	var _categoryList2 = _interopRequireDefault(_categoryList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports.CategoryList = _categoryList2.default;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	var _lodash = __webpack_require__(25);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _slug = __webpack_require__(26);

	var _slug2 = _interopRequireDefault(_slug);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */

	var style = __webpack_require__(33);

	var CategoryList = function (_React$Component) {
	  _inherits(CategoryList, _React$Component);

	  function CategoryList() {
	    _classCallCheck(this, CategoryList);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(CategoryList).apply(this, arguments));
	  }

	  _createClass(CategoryList, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // this helps to close menu on mobile.
	      $('#dropdown-categories').click(function () {
	        if ($('#dropdown-categories-container .navbar-header button').is(':visible')) {
	          $('#dropdown-categories-container .navbar-header button').click();
	        }
	      });
	    }
	  }, {
	    key: 'renderItems',
	    value: function renderItems(data, category) {
	      if (_lodash2.default.isArray(data)) {
	        return data.map(function (item, index) {
	          var slug = (0, _slug2.default)(item.name);
	          var activeClassName = slug === category ? 'active' : '';
	          return _react2.default.createElement(
	            'li',
	            { key: index },
	            _react2.default.createElement(
	              'h2',
	              { itemProp: 'description' },
	              _react2.default.createElement(
	                _reactRouter.Link,
	                { to: '/directorio/playas-tijuana/' + slug, title: 'Directorio Playas de Tijuana ' + item.name, className: style[activeClassName] },
	                item.name
	              )
	            )
	          );
	        });
	      }
	      return null;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var data = _props.data;
	      var category = _props.category;

	      var activeClassName = !category ? 'active' : '';
	      return _react2.default.createElement(
	        'nav',
	        { className: 'navbar ' + style.navbar },
	        _react2.default.createElement(
	          'div',
	          { className: 'row', id: 'dropdown-categories-container' },
	          _react2.default.createElement(
	            'div',
	            { className: 'navbar-header ' + style.navbar_header },
	            _react2.default.createElement(
	              'button',
	              { type: 'button', className: 'navbar-toggle collapsed ' + style.navbar_toggle, 'data-toggle': 'collapse', 'data-target': '#dropdown-categories', 'aria-expanded': 'false' },
	              _react2.default.createElement(
	                'span',
	                { className: 'sr-only' },
	                'Toggle navigation'
	              ),
	              _react2.default.createElement('span', { className: 'icon-bar ' + style.icon_bar }),
	              _react2.default.createElement('span', { className: 'icon-bar ' + style.icon_bar }),
	              _react2.default.createElement('span', { className: 'icon-bar ' + style.icon_bar })
	            ),
	            _react2.default.createElement(
	              'h2',
	              null,
	              category
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'collapse navbar-collapse ' + style.navbar_collapse, id: 'dropdown-categories' },
	            _react2.default.createElement(
	              'ul',
	              { className: 'nav navbar-nav', itemScope: true, itemType: 'http://schema.org/LocalBusiness' },
	              _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  'h2',
	                  { itemProp: 'description' },
	                  _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: '/directorio/playas-tijuana', title: 'Directorio Playas de Tijuana', className: style[activeClassName] },
	                    'Ver todos'
	                  )
	                )
	              ),
	              this.renderItems(data, category)
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return CategoryList;
	}(_react2.default.Component);

	exports.default = CategoryList;


	CategoryList.propTypes = {
	  data: _react2.default.PropTypes.array.isRequired,
	  category: _react2.default.PropTypes.string
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"fCenter":"style__fCenter___Awltf","vCenter":"style__vCenter___2LWX6","vCenterRel":"style__vCenterRel___29EI3","hCenter":"style__hCenter___2QtNO","inheritHeight":"style__inheritHeight___c3WLk","hideOverflow":"style__hideOverflow___3AF4T","navbar":"style__navbar___zSCbK","navbar_header":"style__navbar_header___M3Ixl","navbar_toggle":"style__navbar_toggle___VGUMC","icon_bar":"style__icon_bar___1ebr-","active":"style__active___2j7T0","navbar_collapse":"style__navbar_collapse___3dBpy"};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _placeList = __webpack_require__(35);

	var _placeList2 = _interopRequireDefault(_placeList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports.PlaceList = _placeList2.default;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	var _lodash = __webpack_require__(25);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _slug = __webpack_require__(26);

	var _slug2 = _interopRequireDefault(_slug);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */

	var style = __webpack_require__(36);

	var PlaceList = function (_React$Component) {
	  _inherits(PlaceList, _React$Component);

	  function PlaceList() {
	    _classCallCheck(this, PlaceList);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(PlaceList).apply(this, arguments));
	  }

	  _createClass(PlaceList, [{
	    key: 'getCategoryNames',
	    value: function getCategoryNames(categories) {
	      return categories.map(function (item) {
	        return item.name;
	      }).join(' ');
	    }
	  }, {
	    key: 'getTitle',
	    value: function getTitle(data, categorySlug) {
	      var placeSlug = (0, _slug2.default)(data.name);
	      return _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/directorio/playas-tijuana/' + categorySlug + '/' + placeSlug, title: data.name + ' - ' + categorySlug },
	        data.name
	      );
	    }
	  }, {
	    key: 'getImage',
	    value: function getImage(item, categoriesNames) {
	      var imgUrl = _lodash2.default.isArray(item.image_set) && item.image_set.length ? item.image_set[0].url.replace('www.dropbox.com', 'dl.dropboxusercontent.com') : '/images/placeholder.png';
	      return _react2.default.createElement('img', { src: imgUrl, alt: item.name + ' - ' + categoriesNames, itemProp: 'image' });
	    }
	  }, {
	    key: 'renderItems',
	    value: function renderItems(places) {
	      var _this2 = this;

	      if (_lodash2.default.isArray(places) && places.length) {
	        return places.slice(0, 63).map(function (item, index) {
	          var categoriesNames = _this2.getCategoryNames(item.categories);
	          var categorySlug = (0, _slug2.default)(categoriesNames);
	          var imageEl = _this2.getImage(item, categoriesNames);
	          return _react2.default.createElement(
	            'div',
	            { className: style.placeCard + ' ' + style[categoriesNames], key: index, itemScope: true, itemType: 'http://schema.org/LocalBusiness' },
	            imageEl,
	            _react2.default.createElement(
	              'div',
	              { className: style.legend + ' ' + style[categoriesNames] },
	              _react2.default.createElement(
	                'h2',
	                { key: index, itemProp: 'name' },
	                _this2.getTitle(item, categorySlug)
	              ),
	              _react2.default.createElement(
	                'h3',
	                null,
	                _react2.default.createElement(
	                  _reactRouter.Link,
	                  { to: '/directorio/playas-tijuana/' + categorySlug, title: 'Directorio Playas de Tijuana ' + categoriesNames, itemProp: 'description' },
	                  categoriesNames
	                )
	              )
	            )
	          );
	        });
	      }
	      return null;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var data = this.props.data;

	      return _react2.default.createElement(
	        'div',
	        { className: 'row ' + style.placeContainer },
	        this.renderItems(data)
	      );
	    }
	  }]);

	  return PlaceList;
	}(_react2.default.Component);

	exports.default = PlaceList;


	PlaceList.propTypes = {
	  data: _react2.default.PropTypes.array.isRequired,
	  categories: _react2.default.PropTypes.array.isRequired,
	  place: _react2.default.PropTypes.string
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"fCenter":"style__fCenter___1UVGi","placeCard":"style__placeCard___kUEUP","legend":"style__legend___2Xg5T","vCenter":"style__vCenter___1mU6D","vCenterRel":"style__vCenterRel___u9e_E","hCenter":"style__hCenter___1JvrY","inheritHeight":"style__inheritHeight___1GtAP","hideOverflow":"style__hideOverflow___z7o_0","placeContainer":"style__placeContainer___2pMS3","Autos":"style__Autos___2oWc5","Bar":"style__Bar___38S_t","Comida":"style__Comida___1sGs9","Tienda":"style__Tienda___7z_Yd","Belleza":"style__Belleza___Z_E2U","Salud":"style__Salud___3NTCm","Educacion":"style__Educacion___37EUL","Ejercicio":"style__Ejercicio___3UF1I","Ropa":"style__Ropa___1VvqX","Servicios":"style__Servicios___2MYSk","Entretenimiento":"style__Entretenimiento___2T1yU"};

/***/ },
/* 37 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"fCenter":"style__fCenter___ByilZ","vCenter":"style__vCenter___1v0oL","vCenterRel":"style__vCenterRel___r367-","hCenter":"style__hCenter___35AKo","inheritHeight":"style__inheritHeight___GkUeM","hideOverflow":"style__hideOverflow___30PJL","categories":"style__categories___1b9mU"};

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*eslint-disable */
	exports.default = [{
	  "id": 1,
	  "name": "Autos",
	  "slug": "autos"
	}, {
	  "id": 2,
	  "name": "Bar",
	  "slug": "bar"
	}, {
	  "id": 3,
	  "name": "Comida",
	  "slug": "comida"
	}, {
	  "id": 4,
	  "name": "Tienda",
	  "slug": "tienda"
	}, {
	  "id": 5,
	  "name": "Belleza",
	  "slug": "belleza"
	}, {
	  "id": 6,
	  "name": "Salud",
	  "slug": "salud"
	}, {
	  "id": 7,
	  "name": "Educación",
	  "slug": "educacion"
	}, {
	  "id": 8,
	  "name": "Ejercicio",
	  "slug": "ejercicio"
	}, {
	  "id": 9,
	  "name": "Ropa",
	  "slug": "ropa"
	}, {
	  "id": 10,
	  "name": "Servicios",
	  "slug": "servicios"
	}, {
	  "id": 11,
	  "name": "Entretenimiento",
	  "slug": "entretenimiento"
	}];
	/*eslint-enable */

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:true}); /*eslint-disable */exports.default=[{"id":2,"name":"7 Eleven","latitud":"32.5306814","longitude":"-117.122861","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":1,"url":"https://www.dropbox.com/s/a11564ff84g2jsv/7-eleven.jpeg?dl=0","type":"COVER","place":2}],"link_set":[{"id":3,"url":"https://www.google.com/maps/place/7+Eleven/@32.5306814,-117.122861,18z/data=!4m2!3m1!1s0x0000000000000000:0xc39576793ae1d620","type":"1","place":2},{"id":4,"url":"https://foursquare.com/v/7-eleven/4ea9113ae5fa276e76a0e11a","type":"4","place":2}]},{"id":3,"name":"ab el triunfo","latitud":"32.5219967","longitude":"-117.1122837","code":"","categories":[{"id":4,"name":"Tienda"}],"status":5,"image_set":[],"link_set":[{"id":5,"url":"https://www.google.com/maps/place/ab+el+triunfo/@32.5219967,-117.1122837,19z/data=!4m2!3m1!1s0x0000000000000000:0xbd9fce1dc14c4179","type":"1","place":3}]},{"id":4,"name":"REFACCIONARIAS DEL VALLE","latitud":"32.5190514","longitude":"-117.1161733","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":256,"url":"https://www.dropbox.com/s/jjjb6iestds907j/refaccionarias-del-valle.png?dl=0","type":"COVER","place":4}],"link_set":[{"id":6,"url":"https://www.google.com/maps/place/Accesorios+Playas+del+Valle/@32.5194275,-117.1198743,19z/data=!4m2!3m1!1s0x0000000000000000:0x2437d9ee3f5b8783","type":"1","place":4},{"id":24,"url":"http://refaccionariasdelvalle.com/en/sucursales-refaccionarias-del-valle/","type":"3","place":4}]},{"id":5,"name":"ACOMULADORES CHARGERS","latitud":"32.5130825","longitude":"-117.1198028","code":"","categories":[{"id":4,"name":"Tienda"}],"status":5,"image_set":[],"link_set":[{"id":7,"url":"https://www.google.com/maps/place/ACOMULADORES+CHARGERS/@32.5130825,-117.1198028,20z/data=!4m2!3m1!1s0x0000000000000000:0xc5f23e641ca328f7","type":"1","place":5}]},{"id":6,"name":"Acuario Fitness Center","latitud":"32.5319438","longitude":"-117.1166933","code":"","categories":[{"id":8,"name":"Ejercicio"}],"status":1,"image_set":[{"id":3,"url":"https://www.dropbox.com/s/ei5x5fntdxyhjmg/acuario-fitness.png?dl=0","type":"COVER","place":6}],"link_set":[{"id":8,"url":"https://www.google.com/maps/place/Acuario+Fitness+Center/@32.5319438,-117.1166933,19z/data=!4m2!3m1!1s0x0000000000000000:0x763859aa6f0d9320","type":"1","place":6},{"id":9,"url":"https://foursquare.com/v/acuario-fitness-center/4cfdb00234c1a093e1c4510e","type":"4","place":6},{"id":10,"url":"http://www.acuariofitness.com/acuario-fitness-center/","type":"3","place":6},{"id":11,"url":"https://www.facebook.com/acuariofitnesscenter","type":"2","place":6}]},{"id":7,"name":"AEROLIM AEROSERVICIOS Y LIMUSINAS HOLLYWOOD S.A. DE C.V","latitud":"32.5242502","longitude":"-117.112682","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":4,"url":"https://www.dropbox.com/s/wvevrlcyzhdeqy6/aerolim-aeroservicios-y-limusinas-hollywood-sa-de-cv.png?dl=0","type":"COVER","place":7}],"link_set":[{"id":12,"url":"https://www.google.com/maps/place/AEROLIM+AEROSERVICIOS+Y+LIMUSINAS+HOLLYWOOD+S.A.+DE+C.V./@32.5242502,-117.112682,19z/data=!4m2!3m1!1s0x0000000000000000:0x09441fc41b2cc60b","type":"1","place":7}]},{"id":8,"name":"Afinaciones Electronicas Playas","latitud":"32.5219267","longitude":"-117.1210145","code":"","categories":[{"id":1,"name":"Autos"}],"status":5,"image_set":[],"link_set":[{"id":13,"url":"https://www.google.com/maps/place/Afinaciones+Electr%C3%B3nicas/@32.5219267,-117.1210145,19z/data=!4m2!3m1!1s0x0000000000000000:0x042e65ecffa82b43","type":"1","place":8}]},{"id":9,"name":"AKI Sushi De Playas","latitud":"32.5270978","longitude":"-117.1171725","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":5,"url":"https://www.dropbox.com/s/fnriop5pif7o5fm/aki-sushi.gif?dl=0","type":"COVER","place":9}],"link_set":[{"id":14,"url":"https://www.google.com/maps/place/AKI+Sushi+De+Playas/@32.5270978,-117.1171725,20z/data=!4m2!3m1!1s0x0000000000000000:0x280c5a014399f75e","type":"1","place":9},{"id":15,"url":"https://foursquare.com/v/aki-sushi/4de2f904ae60e7f3abfd73d7","type":"4","place":9},{"id":16,"url":"https://www.facebook.com/AKI-SUSHI-DE-PLAYAS-104113173013664/","type":"2","place":9}]},{"id":10,"name":"Alfredo Huizar Franco Estetica del MAr","latitud":"32.5269692","longitude":"-117.123093","code":"","categories":[{"id":5,"name":"Belleza"}],"status":1,"image_set":[],"link_set":[{"id":17,"url":"https://www.google.com/maps/place/Alfredo+Huizar+Franco+Estetica+del+MAr/@32.5269692,-117.123093,19z/data=!4m2!3m1!1s0x0000000000000000:0x07777cb897335292","type":"1","place":10}]},{"id":11,"name":"All Peoples Church Tijuana","latitud":"32.5310031","longitude":"-117.116881","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":6,"url":"https://www.dropbox.com/s/dwhmya8zrbcj6gt/all-peoples-church.jpg?dl=0","type":"COVER","place":11}],"link_set":[{"id":18,"url":"https://www.google.com/maps/place/All+Peoples+Church+Tijuana/@32.5310031,-117.116881,19z/data=!4m2!3m1!1s0x0000000000000000:0x451acb6f63746bf1","type":"1","place":11},{"id":19,"url":"https://www.facebook.com/All-Peoples-Church-10982679994/","type":"2","place":11}]},{"id":12,"name":"All Star Designs","latitud":"32.5184646","longitude":"-117.1167549","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":7,"url":"https://www.dropbox.com/s/9fw1dsu9m0st8th/all-star-designs.png?dl=0","type":"COVER","place":12}],"link_set":[{"id":20,"url":"https://www.google.com/maps/place/All+Star+Designs/@32.5184646,-117.1167549,20z/data=!4m2!3m1!1s0x0000000000000000:0x245a48fab7260b21","type":"2","place":12}]},{"id":13,"name":"ALTERNATIVA-TIENDA DE ROPA Y NOVEDADES","latitud":"32.5258256","longitude":"-117.1214477","code":"","categories":[{"id":9,"name":"ropa"}],"status":5,"image_set":[],"link_set":[{"id":21,"url":"https://www.google.com/maps/place/ALTERNATIVA-TIENDA+DE+ROPA+Y+NOVEDADES/@32.5258256,-117.1214477,19z/data=!4m2!3m1!1s0x0000000000000000:0xcef30e5f15e66","type":"1","place":13}]},{"id":14,"name":"ANTOJITOS MEXICANOS DELICIAS","latitud":"32.5184646","longitude":"-117.1167549","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":8,"url":"https://www.dropbox.com/s/1zj65mw57o6uk6m/antojitos-mexicanos-delicias.png?dl=0","type":"COVER","place":14}],"link_set":[{"id":22,"url":"https://www.google.com/maps/place/ANTOJITOS+MEXICANOS+DELICIAS/@32.5184646,-117.1167549,20z/data=!4m2!3m1!1s0x0000000000000000:0x0bf74efc2578c047","type":"1","place":14}]},{"id":15,"name":"Antojitos Puros Sinaloa","latitud":"32.5113008","longitude":"-117.1199438","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":23,"url":"https://www.google.com/maps/place/Antojitos+Puros+Sinaloa/@32.5113008,-117.1199438,17z/data=!4m2!3m1!1s0x0000000000000000:0x549075886eafe227","type":"1","place":15}]},{"id":16,"name":"Argana Hookah Lounge","latitud":"32.5140007","longitude":"-117.1200679","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":9,"url":"https://www.dropbox.com/s/ocxq456s68cl6kw/argana-hookah-lounge.jpg?dl=0","type":"COVER","place":16}],"link_set":[{"id":25,"url":"https://www.google.com/maps/place/Argana+Hookah+Lounge/@32.5140007,-117.1200679,20z/data=!4m2!3m1!1s0x0000000000000000:0x9eea5b834fda8b74","type":"1","place":16},{"id":26,"url":"https://foursquare.com/v/argana-cafe--hookah-lounge/51f5c4cf498e19ec1aa52bed","type":"4","place":16},{"id":27,"url":"https://www.facebook.com/arganacafe/?rf=107632486002631","type":"2","place":16}]},{"id":17,"name":"Arquimex - home Plans in Mexico","latitud":"32.5310031","longitude":"-117.116881","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":10,"url":"https://www.dropbox.com/s/mz7mfzwcvrpc4jn/arquimex.jpg?dl=0","type":"COVER","place":17}],"link_set":[{"id":28,"url":"https://www.google.com/maps/place/Arquimex+-+home+Plans+in+Mexico/@32.5310031,-117.116881,19z/data=!4m2!3m1!1s0x0000000000000000:0x8c257cec9edd17c8","type":"1","place":17},{"id":29,"url":"http://www.tiendavirtual.ws/arquimexus/contenido.cfm?cont=MAIN","type":"3","place":17},{"id":30,"url":"https://www.facebook.com/arquimexplanos/?fref=ts","type":"2","place":17}]},{"id":18,"name":"Arte y DiseÃ±o en Papel","latitud":"32.5330439","longitude":"-117.1173692","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":31,"url":"https://www.google.com/maps/place/Arte+y+Dise%C3%B1o+en+Papel/@32.5330439,-117.1173692,19z/data=!4m2!3m1!1s0x0000000000000000:0x61fb37a873fd5421","type":"1","place":18}]},{"id":19,"name":"Astorino","latitud":"32.5330498","longitude":"-117.1145848","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":12,"url":"https://www.dropbox.com/s/r27dhjut32byq4i/astorino.jpg?dl=0","type":"COVER","place":19}],"link_set":[{"id":32,"url":"https://www.google.com/maps/place/Astorino/@32.5330498,-117.1145848,20z/data=!4m2!3m1!1s0x0000000000000000:0x2ada4a639e694e58","type":"1","place":19},{"id":33,"url":"http://cafeastorino.site-boosters.com/","type":"3","place":19},{"id":34,"url":"https://www.facebook.com/astoninomx/","type":"2","place":19}]},{"id":20,"name":"Auto ElÃ©ctrico Mando's","latitud":"32.5257055","longitude":"-117.1132059","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":16,"url":"https://www.dropbox.com/s/nw4z1gty4n1iiac/auto-electrico-mandos.png?dl=0","type":"COVER","place":20}],"link_set":[{"id":35,"url":"https://www.google.com/maps/place/Auto+El%C3%A9ctrico+Mando's/@32.5257055,-117.1132059,19z/data=!4m2!3m1!1s0x0000000000000000:0xb4dd4242610fbdfa","type":"1","place":20}]},{"id":21,"name":"AUTO PARTES y SERVICIO RANGEL","latitud":"32.5109389","longitude":"-117.1200993","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":13,"url":"https://www.dropbox.com/s/s0v4l7na93methc/auto-partes-y-servicio-rangel.png?dl=0","type":"COVER","place":21}],"link_set":[{"id":36,"url":"https://www.google.com/maps/place/AUTO+PARTES+y+SERVICIO+RANGEL/@32.5109389,-117.1200993,19z/data=!4m2!3m1!1s0x0000000000000000:0x4b54c049e2cafa19","type":"1","place":21}]},{"id":22,"name":"AUTO SERVICIO montoya","latitud":"32.522501","longitude":"-117.1161863","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":14,"url":"https://www.dropbox.com/s/kpn6s6z8ypqjrfv/auto-servicio-montoya.png?dl=0","type":"COVER","place":22}],"link_set":[{"id":37,"url":"https://www.google.com/maps/place/AUTO+SERVICIO+montoya/@32.522501,-117.1161863,19z/data=!4m2!3m1!1s0x0000000000000000:0xcbf999a1f033c0be","type":"1","place":22}]},{"id":23,"name":"AUTO TECH TUNE UP","latitud":"32.5225803","longitude":"-117.1208509","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":15,"url":"https://www.dropbox.com/s/ps0ptukijrepcw3/auto-tech-tune-up.png?dl=0","type":"COVER","place":23}],"link_set":[{"id":38,"url":"https://www.google.com/maps/place/AUTO+TECH+TUNE+UP/@32.5225803,-117.1208509,19z/data=!4m2!3m1!1s0x0000000000000000:0x843faa8d5c1f47e9","type":"1","place":23}]},{"id":24,"name":"Auto Cristales Villa Playas","latitud":"32.5165983","longitude":"-117.1160567","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":340,"url":"https://www.dropbox.com/s/qbms8za3cp3lub3/auto-cristales-villa.png?dl=0","type":"COVER","place":24}],"link_set":[{"id":39,"url":"https://www.google.com/maps/place/Autocristales+la+Villa-Playas/@32.5165983,-117.1160567,20z/data=!4m2!3m1!1s0x0000000000000000:0x0821fd819d467d01","type":"1","place":24}]},{"id":25,"name":"AUTOESTÃ‰REO MARCOPOLO","latitud":"32.5244167","longitude":"-117.1214678","code":"","categories":[{"id":1,"name":"Autos"}],"status":5,"image_set":[],"link_set":[{"id":40,"url":"https://www.google.com/maps/place/AUTOEST%C3%89REO+MARCOPOLO/@32.5244167,-117.1214678,19z/data=!4m2!3m1!1s0x0000000000000000:0xd972eca7dd43c9db","type":"1","place":25}]},{"id":26,"name":"Autoestereos beto","latitud":"32.528183","longitude":"-117.1121564","code":"","categories":[{"id":1,"name":"Autos"}],"status":5,"image_set":[],"link_set":[{"id":41,"url":"https://www.google.com/maps/place/Autoestereos+beto/@32.528183,-117.1121564,21z/data=!4m2!3m1!1s0x0000000000000000:0xdb9c8e60e0673c80","type":"1","place":26}]},{"id":27,"name":"AUTOMOTRIZ INTERNACIONAL II","latitud":"32.5236184","longitude":"-117.1190967","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":17,"url":"https://www.dropbox.com/s/d4ebpt6tso1172x/automotriz-internacional-ii.png?dl=0","type":"COVER","place":27}],"link_set":[{"id":42,"url":"https://www.google.com/maps/place/AUTOMOTRIZ+INTERNACIONAL+II/@32.5236184,-117.1190967,19z/data=!4m2!3m1!1s0x0000000000000000:0xc70807cb6eed512f","type":"1","place":27}]},{"id":28,"name":"AUTOPARTES J.R","latitud":"32.5325362","longitude":"-117.1188618","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":18,"url":"https://www.dropbox.com/s/e0o8pem5v3nj9zz/autopartes-jr.png?dl=0","type":"COVER","place":28}],"link_set":[{"id":43,"url":"https://www.google.com/maps/place/AUTOPARTES+J.R./@32.5325362,-117.1188618,19z/data=!4m2!3m1!1s0x0000000000000000:0xda7509e0bb798807","type":"1","place":28}]},{"id":29,"name":"AUTOPARTES PLAYAS","latitud":"32.5154799","longitude":"-117.1166441","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":341,"url":"https://www.dropbox.com/s/uesqn6wh0jeuyj0/auto-partes-playas.png?dl=0","type":"COVER","place":29}],"link_set":[{"id":44,"url":"https://www.google.com/maps/place/AUTOPARTES+PLAYAS/@32.5154799,-117.1166441,19z/data=!4m2!3m1!1s0x0000000000000000:0xa3ac199e7c1fddbf","type":"1","place":29}]},{"id":30,"name":"AUTOSERVICIO JOHNNY","latitud":"32.5330439","longitude":"-117.1173692","code":"","categories":[{"id":1,"name":"Autos"}],"status":5,"image_set":[],"link_set":[{"id":45,"url":"https://www.google.com/maps/place/AUTOSERVICIO+JOHNNY/@32.5330439,-117.1173692,19z/data=!4m2!3m1!1s0x0000000000000000:0x9fe09f106643a7da","type":"1","place":30}]},{"id":31,"name":"AUTOSERVICIO L.A","latitud":"32.5122513","longitude":"-117.1207","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":342,"url":"https://www.dropbox.com/s/bhgnpypwz1j0vdj/auto-servicio-la.png?dl=0","type":"COVER","place":31}],"link_set":[{"id":46,"url":"https://www.google.com/maps/place/AUTOSERVICIO+L.A./@32.5122513,-117.1207,20z/data=!4m2!3m1!1s0x0000000000000000:0x8edd3c948de391a0","type":"1","place":31}]},{"id":32,"name":"AutoZone Playas de Tijuana","latitud":"32.5272041","longitude":"-117.11767","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":19,"url":"https://www.dropbox.com/s/ax0uacrffyz8vxa/autozone.jpg?dl=0","type":"COVER","place":32}],"link_set":[{"id":47,"url":"https://www.google.com/maps/place/AutoZone+Playas+de+Tijuana/@32.5272041,-117.11767,20z/data=!4m2!3m1!1s0x0000000000000000:0x764b7f6341a83389","type":"1","place":32},{"id":48,"url":"http://www.autozone.com.mx/","type":"3","place":32}]},{"id":33,"name":"B COFFEE + TEA HOUSE","latitud":"32.522906","longitude":"-117.1190887","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":21,"url":"https://www.dropbox.com/s/fi7hhtfz2rkwgzs/b-coffee-tea-house.jpg?dl=0","type":"COVER","place":33}],"link_set":[{"id":49,"url":"https://www.google.com/maps/place/B+COFFEE+%2B+TEA+HOUSE/@32.522906,-117.1190887,18z/data=!4m2!3m1!1s0x0000000000000000:0xca010810e1b7e45d","type":"1","place":33},{"id":50,"url":"https://foursquare.com/v/b-coffee-and-tea-house/52c5d7cd498eff026675b14b","type":"4","place":33},{"id":51,"url":"https://www.facebook.com/bcthplayas/","type":"2","place":33}]},{"id":34,"name":"B-Store","latitud":"32.5292776","longitude":"-117.1182409","code":"","categories":[{"id":11,"name":"Entretenimiento"}],"status":1,"image_set":[{"id":20,"url":"https://www.dropbox.com/s/3qdlv8xumhhgqph/b-store.png?dl=0","type":"COVER","place":34}],"link_set":[{"id":52,"url":"https://www.google.com/maps/place/Blockbuster/@32.5292776,-117.1182409,19z/data=!4m2!3m1!1s0x0000000000000000:0xf4fc4ee2da84f815","type":"1","place":34},{"id":53,"url":"https://www.bstore.mx/","type":"3","place":34},{"id":54,"url":"https://www.facebook.com/bstoremexico/?fref=ts","type":"2","place":34}]},{"id":36,"name":"Balcova Restaurante","latitud":"32.5270978","longitude":"-117.1171725","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":23,"url":"https://www.dropbox.com/s/9rngo610zdnu86p/balcova-restaurante.jpg?dl=0","type":"COVER","place":36}],"link_set":[{"id":56,"url":"https://www.google.com/maps/place/Balcova+Restaurante/@32.5270978,-117.1171725,20z/data=!4m2!3m1!1s0x0000000000000000:0xefd7c515a867de80","type":"1","place":36},{"id":57,"url":"https://www.facebook.com/balcovarestaurante/","type":"2","place":36}]},{"id":37,"name":"Banamex","latitud":"32.5311497","longitude":"-117.1136742","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":343,"url":"https://www.dropbox.com/s/ena3y9agsd4jr77/banamex.jpg?dl=0","type":"COVER","place":37}],"link_set":[{"id":58,"url":"https://www.google.com/maps/place/Banamex/@32.5311497,-117.1136742,19z/data=!4m2!3m1!1s0x0000000000000000:0x4a49120d3f27d233","type":"1","place":37}]},{"id":38,"name":"BANORTE","latitud":"32.5270978","longitude":"-117.1171725","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":25,"url":"https://www.dropbox.com/s/o5d5ecfpzid693n/banamex.jpg?dl=0","type":"COVER","place":38}],"link_set":[{"id":59,"url":"https://www.google.com/maps/place/BANORTE/@32.5270978,-117.1171725,20z/data=!4m2!3m1!1s0x0000000000000000:0x5eee5ab85ad6f2bd","type":"1","place":38},{"id":60,"url":"https://www.banorte.com/wps/portal/gfb/Home/inicio/!ut/p/a1/hc7LDoIwEAXQb3HBlo7QIrprIOEZ8REjdGPAYMEAJYDg54vEna_Z3cm5mUEMhYhVcZ_zuMtFFRfPzLSTpcx1WzXAC0xPBepsyWGHNxY2yQiiEcCXofCvf0RsIoZFbbzwAQJsKUD1tYv3ZKmAo73AjxMuYrwQyfRuRKtE1TliTXpJm7SRb824zrqublcSSDAMg8yF4EUqn0Upl3cJPrUy0XYofMOoLkO4kqL36Wz2AGL43SI!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/","type":"3","place":38}]},{"id":39,"name":"BANORTE","latitud":"32.5116654","longitude":"-117.1207","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":24,"url":"https://www.dropbox.com/s/o5d5ecfpzid693n/banamex.jpg?dl=0","type":"COVER","place":39}],"link_set":[{"id":61,"url":"https://docs.google.com/spreadsheets/d/1JMOHlN55FgCrzDevVGBcQBoVwn-JtRtQBij6j_gFHPo/edit#gid=0","type":"1","place":39},{"id":62,"url":"https://www.banorte.com/wps/portal/gfb/Home/inicio/!ut/p/a1/hc7LDoIwEAXQb3HBlo7QIrprIOEZ8REjdGPAYMEAJYDg54vEna_Z3cm5mUEMhYhVcZ_zuMtFFRfPzLSTpcx1WzXAC0xPBepsyWGHNxY2yQiiEcCXofCvf0RsIoZFbbzwAQJsKUD1tYv3ZKmAo73AjxMuYrwQyfRuRKtE1TliTXpJm7SRb824zrqublcSSDAMg8yF4EUqn0Upl3cJPrUy0XYofMOoLkO4kqL36Wz2AGL43SI!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/","type":"3","place":39}]},{"id":40,"name":"Bazar Emma","latitud":"32.5242366","longitude":"-117.1166893","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":29,"url":"https://www.dropbox.com/s/i3707vxitt8uu9q/bazar-emma.jpg?dl=0","type":"COVER","place":40}],"link_set":[{"id":63,"url":"https://www.google.com/maps/place/Bazar+Emma/@32.5242366,-117.1166893,19z/data=!4m2!3m1!1s0x0000000000000000:0xb013f48202f90468","type":"1","place":40},{"id":64,"url":"https://www.facebook.com/Bazar-Emma-Muebles-Vintage-119426998150580/","type":"2","place":40}]},{"id":41,"name":"BBVA BANCOMER PASEO PLAYAS","latitud":"32.5329854","longitude":"-117.1145995","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":30,"url":"https://www.dropbox.com/s/d4dseuuaxeru4pg/bbva-bancomer.jpg?dl=0","type":"COVER","place":41}],"link_set":[{"id":65,"url":"https://docs.google.com/spreadsheets/d/1JMOHlN55FgCrzDevVGBcQBoVwn-JtRtQBij6j_gFHPo/edit#gid=0","type":"1","place":41}]},{"id":42,"name":"BEAVEN pasteleros","latitud":"32.5226548","longitude":"-117.1154621","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":31,"url":"https://www.dropbox.com/s/czv2qb9q29z2n6g/beaven-pasteleros.jpg?dl=0","type":"COVER","place":42}],"link_set":[{"id":66,"url":"https://www.google.com/maps/place/BEAVEN+pasteleros/@32.5226548,-117.1154621,19z/data=!4m2!3m1!1s0x0000000000000000:0x20b5eb0a3ed7654f","type":"1","place":42},{"id":67,"url":"https://foursquare.com/v/beaven-pasteleros/5179b446e4b0a948a86c1e64","type":"4","place":42},{"id":68,"url":"https://www.facebook.com/Beaven.Pasteles/","type":"2","place":42}]},{"id":43,"name":"BEVERLY Burgers","latitud":"32.5165983","longitude":"-117.1160567","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":34,"url":"https://www.dropbox.com/s/vcp054ng8cpmpo6/beverly-burgers.jpg?dl=0","type":"COVER","place":43}],"link_set":[{"id":69,"url":"https://www.google.com/maps/place/BEVERLY+Burgers/@32.5165983,-117.1160567,20z/data=!4m2!3m1!1s0x0000000000000000:0x0a5ee409089fb1b0","type":"1","place":43},{"id":70,"url":"https://foursquare.com/v/beverly-burgers/4cc3a5f61e596dcb8152cc67","type":"4","place":43},{"id":71,"url":"http://menu.mx/v2/Beverly_Burgers/Tijuana/Espanol/WCqAF3","type":"3","place":43},{"id":72,"url":"https://www.facebook.com/Beverly-Burgers-160531900690110/","type":"2","place":43}]},{"id":44,"name":"Bloom boutique","latitud":"32.5289042","longitude":"-117.1160372","code":"","categories":[{"id":5,"name":"Belleza"}],"status":1,"image_set":[{"id":35,"url":"https://www.dropbox.com/s/qmp7frazbz0t22n/bloom-boutique.jpg?dl=0","type":"COVER","place":44}],"link_set":[{"id":73,"url":"https://www.google.com/maps/place/BLOOm/@32.5289042,-117.1160372,20z/data=!4m2!3m1!1s0x0000000000000000:0x1d38cfa7e8b057cb","type":"1","place":44},{"id":74,"url":"https://www.facebook.com/Bloom-boutique-172140222831082/","type":"2","place":44}]},{"id":45,"name":"BODY SHOP OASIS","latitud":"32.5242366","longitude":"-117.1166893","code":"","categories":[{"id":4,"name":"Tienda"}],"status":5,"image_set":[],"link_set":[{"id":75,"url":"https://www.google.com/maps/place/BODY+SHOP+OASIS/@32.5242366,-117.1166893,19z/data=!4m2!3m1!1s0x0000000000000000:0x68d0a85d38016d35","type":"1","place":45}]},{"id":46,"name":"BOMBEROS ESTACIÃ“N 10","latitud":"32.5217638","longitude":"-117.1139681","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":36,"url":"https://www.dropbox.com/s/eirfg0kqx5mljl3/bomberos.jpg?dl=0","type":"COVER","place":46}],"link_set":[{"id":76,"url":"https://www.google.com/maps/place/BOMBEROS+ESTACI%C3%93N+10/@32.5217638,-117.1139681,19z/data=!4m2!3m1!1s0x0000000000000000:0x804eb25ed0e78312","type":"1","place":46}]},{"id":47,"name":"Book.com.mx","latitud":"32.5263659","longitude":"-117.1129081","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":37,"url":"https://www.dropbox.com/s/j3s86jz3yvj6nv1/book.com.jpg?dl=0","type":"COVER","place":47}],"link_set":[{"id":77,"url":"https://www.google.com/maps/place/Book.com.mx/@32.5263659,-117.1129081,18z/data=!4m2!3m1!1s0x0000000000000000:0xdf2db38a8674fe7c","type":"1","place":47},{"id":78,"url":"http://www.book.com.mx/inicio","type":"3","place":47}]},{"id":48,"name":"Chocolate Boutique","latitud":"32.5249097","longitude":"-117.1225353","code":"","categories":[{"id":5,"name":"Belleza"}],"status":1,"image_set":[{"id":65,"url":"https://www.dropbox.com/s/6fiwu3n952b0ola/chocolates-boutique.jpg?dl=0","type":"COVER","place":48}],"link_set":[{"id":79,"url":"https://www.google.com/maps/place/Boutique+Chocolate/@32.5249097,-117.1225353,18z/data=!4m2!3m1!1s0x0000000000000000:0xe8dc224b5614df75","type":"1","place":48},{"id":80,"url":"https://www.facebook.com/xocolatlbaja/?fref=ts","type":"2","place":48}]},{"id":49,"name":"Bridgestone - Llantera","latitud":"32.5257055","longitude":"-117.1132059","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":39,"url":"https://www.dropbox.com/s/2a0q8ks64evyl0s/bridgestone-firestone.jpeg?dl=0","type":"COVER","place":49}],"link_set":[{"id":81,"url":"https://www.google.com/maps/place/Bridgestone+-+Llantera/@32.5257055,-117.1132059,19z/data=!4m2!3m1!1s0x0000000000000000:0xd72c48add6d26fde","type":"1","place":49}]},{"id":50,"name":"BURROS JalapeÃ±o's","latitud":"32.5193862","longitude":"-117.1167402","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":82,"url":"https://www.google.com/maps/place/BURROS+Jalape%C3%B1o's/@32.5193862,-117.1167402,20z/data=!4m2!3m1!1s0x0000000000000000:0xe2ea75c8acac23d6","type":"1","place":50}]},{"id":51,"name":"Cabaceto espresso bar","latitud":"32.5261483","longitude":"-117.116698","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":40,"url":"https://www.dropbox.com/s/hx3foyy86szmu43/cabaceto-coffe.jpg?dl=0","type":"COVER","place":51}],"link_set":[{"id":83,"url":"https://www.google.com/maps/place/Cabaceto+espresso+bar/@32.5261483,-117.116698,19z/data=!4m2!3m1!1s0x0000000000000000:0xa553bfa2aeacf7d1","type":"1","place":51},{"id":84,"url":"https://www.facebook.com/Cabaceto-1567008736899923/","type":"2","place":51}]},{"id":52,"name":"Cablemas","latitud":"32.5308478","longitude":"-117.1141972","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":41,"url":"https://www.dropbox.com/s/ys98kekg8wcw9yc/cablemas.jpg?dl=0","type":"COVER","place":52}],"link_set":[{"id":85,"url":"https://www.google.com/maps/place/Cablemas/@32.5308478,-117.1141972,20z/data=!4m2!3m1!1s0x0000000000000000:0xe2a28fefd60d0be7","type":"1","place":52},{"id":86,"url":"http://www.cablemas.com.mx/Default_.aspx","type":"3","place":52}]},{"id":53,"name":"CafÃ© Aquamarino","latitud":"32.5237285","longitude":"-117.1235436","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":44,"url":"https://www.dropbox.com/s/448u0rc2lfwccg8/cafe-aquamarino.jpg?dl=0","type":"COVER","place":53}],"link_set":[{"id":87,"url":"https://www.google.com/maps/place/Caf%C3%A9+AquaMarino/@32.5237285,-117.1235436,19z/data=!4m2!3m1!1s0x0000000000000000:0x42836d079f5257fb","type":"1","place":53},{"id":88,"url":"https://foursquare.com/v/cafe-aquamarino/4c0d96e29cceef3b4c3c6ce2","type":"4","place":53},{"id":89,"url":"https://www.facebook.com/cafe.aquamarino/","type":"2","place":53}]},{"id":54,"name":"Cafe Latitud 32","latitud":"32.5286461","longitude":"-117.1226732","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":42,"url":"https://www.dropbox.com/s/9fe4xbgm7dfj6w3/cafe-latitud-32.jpg?dl=0","type":"COVER","place":54}],"link_set":[{"id":90,"url":"https://www.google.com/maps/place/Cafe+Latitud+32/@32.5286461,-117.1226732,18z/data=!4m2!3m1!1s0x0000000000000000:0x6b2566758f84c920","type":"1","place":54},{"id":91,"url":"https://foursquare.com/v/latitud-32/4c3cec3d7ea8952183632247","type":"4","place":54},{"id":92,"url":"https://www.facebook.com/pages/Latitud-32/180373255343584","type":"2","place":54}]},{"id":55,"name":"CafÃ© Zone","latitud":"32.5264382","longitude":"-117.1110145","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":43,"url":"https://www.dropbox.com/s/9aqp9znhk7l4m2z/cafe-zone.jpg?dl=0","type":"COVER","place":55}],"link_set":[{"id":93,"url":"https://www.google.com/maps/place/Caf%C3%A9+Zone/@32.5264382,-117.1110145,18z/data=!4m2!3m1!1s0x0000000000000000:0x05c4edbc2ad126f3","type":"1","place":55},{"id":94,"url":"https://foursquare.com/v/cafe-zone/4f0271170cd658d3b34a5428","type":"4","place":55}]},{"id":56,"name":"Cajero Automatico HSBC","latitud":"32.5249097","longitude":"-117.1225353","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":137,"url":"https://www.dropbox.com/s/d5709gnu9wmgrto/hsbc-cajero.jpg?dl=0","type":"COVER","place":56}],"link_set":[{"id":95,"url":"https://www.google.com/maps/place/Cajero+Automatico+HSBC/@32.5249097,-117.1225353,18z/data=!4m2!3m1!1s0x0000000000000000:0x76e73ea76248dc94","type":"1","place":56}]},{"id":57,"name":"Cajero Automatico Scotiabank","latitud":"32.5164638","longitude":"-117.1167675","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":45,"url":"https://www.dropbox.com/s/jse97zpza2trvao/cajero-scotiabank.jpg?dl=0","type":"COVER","place":57}],"link_set":[{"id":96,"url":"https://www.google.com/maps/place/Cajero+Automatico+Scotiabank/@32.5164638,-117.1167675,20z/data=!4m2!3m1!1s0x0000000000000000:0x4ab36dc390053d70","type":"1","place":57}]},{"id":58,"name":"Banorte Cajero","latitud":"32.5270978","longitude":"-117.1171725","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":26,"url":"https://www.dropbox.com/s/6u9beykyl3r8881/banorte-cajero.jpg?dl=0","type":"COVER","place":58}],"link_set":[{"id":97,"url":"https://www.google.com/maps/place/Cajero+Banorte/@32.5270978,-117.1171725,20z/data=!4m2!3m1!1s0x0000000000000000:0xb22af54ad6c82904","type":"1","place":58}]},{"id":59,"name":"Cajero HSBC","latitud":"32.522501","longitude":"-117.1161863","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":138,"url":"https://www.dropbox.com/s/d5709gnu9wmgrto/hsbc-cajero.jpg?dl=0","type":"COVER","place":59}],"link_set":[{"id":98,"url":"https://www.google.com/maps/place/Cajero+HSBC/@32.522501,-117.1161863,19z/data=!4m2!3m1!1s0x0000000000000000:0x554bfa5fc7c62c4f","type":"1","place":59}]},{"id":60,"name":"CAJEROS AUTOMATICOS BANORTE","latitud":"32.5325362","longitude":"-117.1188618","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":345,"url":"https://www.dropbox.com/s/13mlmf4nhgbyrl5/banorte.png?dl=0","type":"COVER","place":60}],"link_set":[{"id":99,"url":"https://www.google.com/maps/place/CAJEROS+AUTOMATICOS+BANORTE/@32.5325362,-117.1188618,19z/data=!4m2!3m1!1s0x0000000000000000:0xb333ccd1da44f3ba","type":"1","place":60}]},{"id":61,"name":"Cake Land Cake Shop","latitud":"32.5116231","longitude":"-117.1166178","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":100,"url":"https://www.google.com/maps/place/Cake+Land+Cake+Shop/@32.5116231,-117.1166178,19z/data=!4m2!3m1!1s0x0000000000000000:0xc5ef47d69f9427ea","type":"1","place":61}]},{"id":62,"name":"CAMARON LOCO","latitud":"32.5150411","longitude":"-117.1163624","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":47,"url":"https://www.dropbox.com/s/tdqo53hh53lcb06/camaron-loco.jpg?dl=0","type":"COVER","place":62}],"link_set":[{"id":101,"url":"https://www.google.com/maps/place/CAMARON+LOCO/@32.5150411,-117.1163624,19z/data=!4m2!3m1!1s0x0000000000000000:0xd3197da2461bde47","type":"1","place":62},{"id":102,"url":"https://www.facebook.com/camaronlokotijuanaclamatos","type":"2","place":62}]},{"id":63,"name":"Car Wash 911","latitud":"32.5264559","longitude":"-117.1163332","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":49,"url":"https://www.dropbox.com/s/of3skvxr6vuo1e4/car-wash-911.png?dl=0","type":"COVER","place":63}],"link_set":[{"id":103,"url":"https://www.google.com/maps/place/Car+Wash+911/@32.5264559,-117.1163332,19z/data=!3m1!4b1!4m2!3m1!1s0x0000000000000000:0x99849b780f18e91a","type":"1","place":63}]},{"id":64,"name":"CAR WASH Y DETALLADO BAJA 1000","latitud":"32.522501","longitude":"-117.1161863","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":50,"url":"https://www.dropbox.com/s/heqlsc4ltzgpsun/car-wash-y-detallado-baja-1000.png?dl=0","type":"COVER","place":64}],"link_set":[{"id":104,"url":"https://www.google.com/maps/place/CAR+WASH+Y+DETALLADO+BAJA+1000/@32.522501,-117.1161863,19z/data=!4m2!3m1!1s0x0000000000000000:0xad95399eab4415b2","type":"1","place":64}]},{"id":65,"name":"Carl's Jr.","latitud":"32.5311283","longitude":"-117.1148503","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":51,"url":"https://www.dropbox.com/s/mfnr10s008ts5ov/carls-jr.jpeg?dl=0","type":"COVER","place":65}],"link_set":[{"id":105,"url":"https://www.google.com/maps/place/Carl's+Jr./@32.5311283,-117.1148503,19z/data=!4m2!3m1!1s0x0000000000000000:0x0317bda7a03b4de6","type":"1","place":65},{"id":106,"url":"https://foursquare.com/v/carls-jr/4cca1c087965b60c13bc838a","type":"4","place":65},{"id":107,"url":"http://www.carlsjr.com.mx/","type":"3","place":65}]},{"id":66,"name":"CARNICERIA El Bif 28","latitud":"32.5242343","longitude":"-117.1169253","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":108,"url":"https://www.google.com/maps/place/CARNICERIA+El+Bif+28/@32.5242343,-117.1169253,19z/data=!4m2!3m1!1s0x0000000000000000:0x08d364d9262e807e","type":"1","place":66}]},{"id":67,"name":"CARNITAS EL MAGO","latitud":"32.5178219","longitude":"-117.1159963","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":52,"url":"https://www.dropbox.com/s/xfocr3030z99yze/carnitas-el-mago.png?dl=0","type":"COVER","place":67}],"link_set":[{"id":109,"url":"https://www.google.com/maps/place/CARNITAS+EL+MAGO/@32.5178219,-117.1159963,20z/data=!4m2!3m1!1s0x0000000000000000:0x01e9964dcd55050d","type":"1","place":67}]},{"id":68,"name":"CarrocerÃ­a y Pintura Acapulco","latitud":"32.513995","longitude":"-117.1207076","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":53,"url":"https://www.dropbox.com/s/1afixu7um43nq7g/carrocer%C3%ADa-y-pintura-acapulco.png?dl=0","type":"COVER","place":68}],"link_set":[{"id":110,"url":"https://www.google.com/maps/place/Carrocer%C3%ADa+y+Pintura+Acapulco/@32.513995,-117.1207076,20z/data=!4m2!3m1!1s0x0000000000000000:0x7636880fc0125562","type":"1","place":68}]},{"id":69,"name":"Casa de Don Juan","latitud":"32.5213906","longitude":"-117.1223688","code":"","categories":[],"status":1,"image_set":[],"link_set":[{"id":111,"url":"https://www.google.com/maps/place/Casa+de+Don+Juan/@32.5213906,-117.1223688,19z/data=!4m2!3m1!1s0x0000000000000000:0xed402df7f14ddd86","type":"1","place":69},{"id":112,"url":"https://foursquare.com/v/la-casa-de-don-juan/526ac0b6498eea0f5a3d3d78","type":"4","place":69},{"id":113,"url":"https://www.facebook.com/lacasadedonjuantijuana/","type":"2","place":69}]},{"id":70,"name":"CASA HOGAR LIRIO DE LOS VALLES TIJUANA","latitud":"32.5294141","longitude":"-117.117495","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":56,"url":"https://www.dropbox.com/s/lz4efuaxi57qflv/casa-hogar-lirio-de-los-valles.jpg?dl=0","type":"COVER","place":70}],"link_set":[{"id":114,"url":"https://www.google.com/maps/place/CASA+HOGAR+LIRIO+DE+LOS+VALLES+TIJUANA/@32.5294141,-117.117495,19z/data=!4m2!3m1!1s0x0000000000000000:0x463297a6d2db9a44","type":"1","place":70}]},{"id":71,"name":"Casino Caliente Playas","latitud":"32.531948","longitude":"-117.1129352","code":"","categories":[{"id":2,"name":"Bar"}],"status":1,"image_set":[{"id":57,"url":"https://www.dropbox.com/s/6izg478ml7awyul/casino-caliente.jpg?dl=0","type":"COVER","place":71}],"link_set":[{"id":115,"url":"https://www.google.com/maps/place/Casino+Caliente+Playas/@32.531948,-117.1129352,20z/data=!4m2!3m1!1s0x0000000000000000:0xa2c1a027ea0bc4ce","type":"1","place":71},{"id":116,"url":"https://foursquare.com/v/caliente-casino-playas/4d4f09ee122b54812b818b4f","type":"4","place":71},{"id":117,"url":"http://www.calientecasino.com.mx/index.php/sucursales","type":"3","place":71}]},{"id":72,"name":"CENADURIA De La Torre","latitud":"32.5242343","longitude":"-117.1169253","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":58,"url":"https://www.dropbox.com/s/l8iqeu8gmbx4aoj/cenaduria-de-la-torre.png?dl=0","type":"COVER","place":72}],"link_set":[{"id":118,"url":"https://www.google.com/maps/place/CENADURIA+De+La+Torre/@32.5242343,-117.1169253,19z/data=!4m2!3m1!1s0x0000000000000000:0x2f3ca39c68162792","type":"1","place":72},{"id":119,"url":"https://foursquare.com/v/cenaduria-de-la-torre/517b4379e4b0efc9f9ccc785","type":"4","place":72}]},{"id":73,"name":"Centro Automotriz Autotec","latitud":"32.5260809","longitude":"-117.1133024","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":346,"url":"https://www.dropbox.com/s/0b6l72h7yetc81p/centro-automotriz-autotec.jpg?dl=0","type":"COVER","place":73}],"link_set":[{"id":120,"url":"https://www.google.com/maps/place/Centro+Automotriz+Autotec/@32.5260809,-117.1133024,19z/data=!4m2!3m1!1s0x0000000000000000:0x5e3945625f093b80","type":"1","place":73},{"id":121,"url":"https://www.facebook.com/centroautotec/","type":"2","place":73}]},{"id":74,"name":"CENTRO CAMBIARO CORONADO, S.A. DE C.V","latitud":"32.5286567","longitude":"-117.1124729","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":59,"url":"https://www.dropbox.com/s/tkhmi4b8elhxq20/centro-cambiario-coronado.png?dl=0","type":"COVER","place":74}],"link_set":[{"id":122,"url":"https://www.google.com/maps/place/CENTRO+CAMBIARO+CORONADO,+S.A.+DE+C.V./@32.5286567,-117.1124729,21z/data=!4m2!3m1!1s0x0000000000000000:0xbee3469d1354d21e","type":"1","place":74}]},{"id":75,"name":"Comercial Mexicana Playas","latitud":"32.5326569","longitude":"-117.1131485","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":73,"url":"https://www.dropbox.com/s/8r8fvjlau7915p3/comercial-mexicana.png?dl=0","type":"COVER","place":75}],"link_set":[{"id":123,"url":"https://www.google.com/maps/place/Centro+Comercial+Playas/@32.5326569,-117.1131485,20z/data=!4m2!3m1!1s0x0000000000000000:0x6cbc0dc8e49f9fa2","type":"1","place":75}]},{"id":76,"name":"centro corporativo aelus","latitud":"32.5189322","longitude":"-117.1218055","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":124,"url":"https://www.google.com/maps/place/centro+corporativo+aelus/@32.5189322,-117.1218055,19z/data=!4m2!3m1!1s0x0000000000000000:0x3889e6a13eacd71e","type":"1","place":76}]},{"id":77,"name":"DGETI No.146 ","latitud":"32.5140309","longitude":"-117.1148476","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":86,"url":"https://www.dropbox.com/s/j8nw6iwgd0ydepi/dgeti-146.jpg?dl=0","type":"COVER","place":77}],"link_set":[{"id":125,"url":"https://www.google.com/maps/place/CENTRO+DE+BACHILLERATO+TECNOL%C3%93GICO+industrial+y+de+servicios+No.146+Jose+Vasconcelos/@32.5140309,-117.1148476,20z/data=!4m2!3m1!1s0x0000000000000000:0xad9b6a72c737d6dd","type":"1","place":77},{"id":126,"url":"http://www.cbtis146.edu.mx/","type":"3","place":77}]},{"id":78,"name":"Centro de Servicio LTH Playas, Baterias Atlas,Tijuana","latitud":"32.5168353","longitude":"-117.119685","code":"","categories":[{"id":1,"name":"Autos"}],"status":5,"image_set":[],"link_set":[{"id":127,"url":"https://www.google.com/maps/place/Centro+de+Servicio+LTH+Playas,+Baterias+Atlas,Tijuana/@32.5168353,-117.119685,19z/data=!4m2!3m1!1s0x0000000000000000:0xb1d8e29022d6e12b","type":"1","place":78}]},{"id":79,"name":"Centro Ã“ptico Playas","latitud":"32.5087324","longitude":"-117.1193295","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":128,"url":"https://www.google.com/maps/place/Centro+%C3%93ptico+Playas/@32.5087324,-117.1193295,20z/data=!4m2!3m1!1s0x0000000000000000:0x43135942958220c8","type":"1","place":79}]},{"id":80,"name":"Centro Pastoral Madre Teresa -Playas","latitud":"32.5243271","longitude":"-117.1168234","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":5,"image_set":[],"link_set":[{"id":129,"url":"https://www.google.com/maps/place/Centro+Pastoral+Madre+Teresa+-Playas/@32.5243271,-117.1168234,19z/data=!4m2!3m1!1s0x0000000000000000:0x466a8ccbcd74922e","type":"1","place":80}]},{"id":81,"name":"CervecerÃ­a Modelo Playa","latitud":"32.5090185","longitude":"-117.1210515","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":60,"url":"https://www.dropbox.com/s/hrj96gfnmr5e59j/cerveceria-modelo.jpg?dl=0","type":"COVER","place":81}],"link_set":[{"id":130,"url":"https://www.google.com/maps/place/Cervecer%C3%ADa+Modelo+Playa/@32.5090185,-117.1210515,19z/data=!4m2!3m1!1s0x0000000000000000:0xb98786946e8b6316","type":"1","place":81}]},{"id":82,"name":"CESPT","latitud":"32.5310031","longitude":"-117.116881","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":61,"url":"https://www.dropbox.com/s/4h9ubodlaiv3usf/cespt.jpg?dl=0","type":"COVER","place":82}],"link_set":[{"id":131,"url":"https://www.google.com/maps/place/CESPT/@32.5310031,-117.116881,19z/data=!4m2!3m1!1s0x0000000000000000:0x19d233396110aa4c","type":"1","place":82}]},{"id":83,"name":"CFE","latitud":"32.5289995","longitude":"-117.1186459","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":62,"url":"https://www.dropbox.com/s/8xqc97y6psso6ie/cfe.jpg?dl=0","type":"COVER","place":83}],"link_set":[{"id":132,"url":"https://www.google.com/maps/place/CFE/@32.5289995,-117.1186459,19z/data=!4m2!3m1!1s0x0000000000000000:0xb2419ea825b983ca","type":"1","place":83},{"id":133,"url":"http://www.cfe.gob.mx/paginas/home.aspx","type":"3","place":83}]},{"id":84,"name":"Chic Glamour Boutique","latitud":"32.5296764","longitude":"-117.1164892","code":"","categories":[{"id":5,"name":"Belleza"}],"status":1,"image_set":[{"id":63,"url":"https://www.dropbox.com/s/ws6wvw5uq84s4vl/chic-glamour-boutique.jpg?dl=0","type":"COVER","place":84}],"link_set":[{"id":134,"url":"https://www.google.com/maps/place/Chic+Glamour+Boutique/@32.5296764,-117.1164892,19z/data=!4m2!3m1!1s0x0000000000000000:0xc242de4e046962bc","type":"1","place":84}]},{"id":85,"name":"Chiltepinos Playas de Tijuana","latitud":"32.5310389","longitude":"-117.1140846","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":64,"url":"https://www.dropbox.com/s/cwb7a9jwu24wur4/chiltepinos.jpg?dl=0","type":"COVER","place":85}],"link_set":[{"id":135,"url":"https://www.google.com/maps/place/Chiltepinos+Playas+de+Tijuana/@32.5310389,-117.1140846,19z/data=!4m2!3m1!1s0x0000000000000000:0xbab76d5ed98b341a","type":"1","place":85},{"id":136,"url":"https://foursquare.com/explore?mode=url&near=Tijuana%2C%20BCN&nearGeoId=72057594041909545","type":"4","place":85},{"id":137,"url":"https://www.facebook.com/Chic-Glamour-Boutique-751032978251943/","type":"2","place":85}]},{"id":86,"name":"CIDH Universidad","latitud":"32.5272061","longitude":"-117.1191368","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":66,"url":"https://www.dropbox.com/s/ly9nati2pxcaryc/cidh.gif?dl=0","type":"COVER","place":86}],"link_set":[{"id":138,"url":"https://www.google.com/maps/place/CIDH+Universidad/@32.5272061,-117.1191368,19z/data=!4m2!3m1!1s0x0000000000000000:0x581d9c0bc5fae306","type":"1","place":86},{"id":139,"url":"http://www.cidhuniversidad.edu.mx/","type":"3","place":86},{"id":140,"url":"https://www.facebook.com/pages/Cidh-Universidad/211483702208435?fref=ts","type":"2","place":86}]},{"id":87,"name":"CinÃ©polis","latitud":"32.5311497","longitude":"-117.1136742","code":"","categories":[{"id":11,"name":"Entretenimiento"}],"status":1,"image_set":[{"id":67,"url":"https://www.dropbox.com/s/eyhf76xj17a1it8/cinepolis.jpeg?dl=0","type":"COVER","place":87}],"link_set":[{"id":141,"url":"https://www.google.com/maps/place/Cin%C3%A9polis/@32.5311497,-117.1136742,19z/data=!4m2!3m1!1s0x0000000000000000:0x5dfe6bdafa653bf0","type":"1","place":87},{"id":142,"url":"https://foursquare.com/v/cinepolis/4baae022f964a520938b3ae3","type":"4","place":87},{"id":143,"url":"http://www.cinepolis.com/cartelera/tijuana/cinepolis-playas","type":"3","place":87}]},{"id":88,"name":"Clamatos El Remedio","latitud":"32.526552","longitude":"-117.1170802","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":68,"url":"https://www.dropbox.com/s/79lv00auxc5o50c/clamatos-el-remedio.jpg?dl=0","type":"COVER","place":88}],"link_set":[{"id":144,"url":"https://www.google.com/maps/place/Clamatos+El+Remedio/@32.526552,-117.1170802,20z/data=!4m2!3m1!1s0x0000000000000000:0x4aba110dc2239d98","type":"1","place":88},{"id":145,"url":"https://foursquare.com/v/clamatos-el-remedio/5160a3efe4b027d844b1acc5","type":"4","place":88},{"id":146,"url":"https://www.facebook.com/Clamatos-el-remedio-playas-de-tj-177304858982737/?fref=ts","type":"2","place":88}]},{"id":89,"name":"Dr. Rivera ClÃ­nica Para Animales","latitud":"32.5242366","longitude":"-117.1166893","code":"","categories":[{"id":6,"name":"Salud"}],"status":1,"image_set":[{"id":94,"url":"https://www.dropbox.com/s/z2ks6kh8h3srm1t/dr-rivera.jpg?dl=0","type":"COVER","place":89}],"link_set":[{"id":147,"url":"https://www.google.com/maps/place/Cl%C3%ADnica+Para+Animales+Dr.+Rivera/@32.5242366,-117.1166893,19z/data=!4m2!3m1!1s0x0000000000000000:0x6c986cd9f627c6f4","type":"1","place":89},{"id":148,"url":"https://www.facebook.com/Clinica-Para-Animales-Dr-Rivera-174436549262230/","type":"2","place":89}]},{"id":90,"name":"Colegio El Arca","latitud":"32.5219267","longitude":"-117.1210145","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":71,"url":"https://www.dropbox.com/s/46gcrqtgntr68zh/colegio-el-arca.jpg?dl=0","type":"COVER","place":90}],"link_set":[{"id":149,"url":"https://www.google.com/maps/place/Colegio+El+Arca/@32.5219267,-117.1210145,19z/data=!4m2!3m1!1s0x0000000000000000:0x0069c69ce72d2101","type":"1","place":90},{"id":150,"url":"https://www.facebook.com/pages/Colegio-El-Arca/140549866015826","type":"2","place":90}]},{"id":91,"name":"colegio ingles","latitud":"32.5257055","longitude":"-117.1132059","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":347,"url":"https://www.dropbox.com/s/773ghcevd56ajt1/colegio-ingles.jpg?dl=0","type":"COVER","place":91}],"link_set":[{"id":151,"url":"https://www.google.com/maps/place/colegio+ingles/@32.5257055,-117.1132059,19z/data=!4m2!3m1!1s0x0000000000000000:0x210faf3fe828b1af","type":"1","place":91},{"id":152,"url":"http://www.colegioingles.com.mx/","type":"3","place":91},{"id":153,"url":"https://www.facebook.com/ColegioInglesKinder/?fref=ts","type":"2","place":91}]},{"id":92,"name":"Colegio Pierre Faure","latitud":"32.5272061","longitude":"-117.1191368","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":69,"url":"https://www.dropbox.com/s/juju8kkzdu5hqnh/colegio-pierre-faure.jpg?dl=0","type":"COVER","place":92}],"link_set":[{"id":154,"url":"https://www.google.com/maps/place/Colegio+Pierre+Faure/@32.5272061,-117.1191368,19z/data=!4m2!3m1!1s0x0000000000000000:0x6017b1a5764f1352","type":"1","place":92},{"id":155,"url":"http://www.pierrefauretijuana.edu.mx/","type":"3","place":92}]},{"id":93,"name":"Elementary School Colegio Playas ","latitud":"32.5325362","longitude":"-117.1188618","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":242,"url":"https://www.dropbox.com/s/t99bgk0g21wiwot/playas-elementary-school.jpg?dl=0","type":"COVER","place":93}],"link_set":[{"id":156,"url":"https://www.google.com/maps/place/Colegio+Playas+Elementary+School/@32.5325362,-117.1188618,19z/data=!4m2!3m1!1s0x0000000000000000:0x16135a8b1531c742","type":"1","place":93},{"id":157,"url":"https://www.facebook.com/Playas-Elementary-School-105278452836174/","type":"2","place":93}]},{"id":94,"name":"Colegio Tijuana","latitud":"32.5310031","longitude":"-117.116881","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":70,"url":"https://www.dropbox.com/s/x4sq4patm2ihds3/colegio-tijuana.jpg?dl=0","type":"COVER","place":94}],"link_set":[{"id":159,"url":"https://www.facebook.com/ColegioTijuana/","type":"2","place":94},{"id":158,"url":"https://www.google.com/maps/place/Colegio+Tijuana/@32.5310031,-117.116881,19z/data=!4m2!3m1!1s0x0000000000000000:0xf99c2eea4cbad085","type":"1","place":94}]},{"id":95,"name":"Comercializadora Moner","latitud":"32.5012282","longitude":"-117.120600","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":160,"url":"https://www.google.com/maps/place/Comercializadora+Moner/@32.5012282,-117.1206002,18z/data=!4m2!3m1!1s0x0000000000000000:0x60bca99a61093012","type":"1","place":95}]},{"id":96,"name":"Comidas Mexicanas","latitud":"32.5298643","longitude":"-117.1215475","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":74,"url":"https://www.dropbox.com/s/r0u0n6qx5wzxite/comidas-mexicanas.png?dl=0","type":"COVER","place":96}],"link_set":[{"id":161,"url":"https://www.google.com/maps/place/Comidas+Mexicanas/@32.5298643,-117.1215475,19z/data=!4m2!3m1!1s0x0000000000000000:0x07cdd350f2ae9ab6","type":"1","place":96}]},{"id":97,"name":"COMITE DEPORTIVO PLAYAS COSTA HERMOSA","latitud":"32.5138669","longitude":"-117.1179093","code":"","categories":[{"id":8,"name":"Ejercicio"}],"status":1,"image_set":[{"id":75,"url":"https://www.dropbox.com/s/4c6ggz7zogdu77i/comite-deportivo-playas-de-tijuana.png?dl=0","type":"COVER","place":97}],"link_set":[{"id":162,"url":"https://www.google.com/maps/place/COMITE+DEPORTIVO+PLAYAS+COSTA+HERMOSA/@32.5138669,-117.1179093,20z/data=!4m2!3m1!1s0x0000000000000000:0x2326c6837252e1bb","type":"1","place":97}]},{"id":98,"name":"Construrama","latitud":"32.513995","longitude":"-117.120707","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":76,"url":"https://www.dropbox.com/s/y6ape2hw2wdvrkz/construrama.png?dl=0","type":"COVER","place":98}],"link_set":[{"id":163,"url":"https://www.google.com/maps/place/Construrama/@32.513995,-117.1207076,20z/data=!4m2!3m1!1s0x0000000000000000:0x62a3e5bd5bec85c8","type":"1","place":98}]},{"id":99,"name":"Copyarte","latitud":"32.5257055","longitude":"-117.1132059","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":164,"url":"https://www.google.com/maps/place/Copyarte/@32.5257055,-117.1132059,19z/data=!4m2!3m1!1s0x0000000000000000:0x46edba6a31189cb8","type":"1","place":99}]},{"id":100,"name":"LibrerÃ­a Coronado","latitud":"32.5290643","longitude":"-117.1200904","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":348,"url":"https://www.dropbox.com/s/5v2x0vjlxcp3rdu/libreria-coronado.jpg?dl=0","type":"COVER","place":100}],"link_set":[{"id":165,"url":"https://www.google.com/maps/place/Coronado+Librer%C3%ADa/@32.5290643,-117.1200904,21z/data=!4m2!3m1!1s0x0000000000000000:0xde6be8862a13ab32","type":"1","place":100},{"id":166,"url":"http://www.cecut.gob.mx/sis/librerias/librocentro.php","type":"3","place":100}]},{"id":101,"name":"Correos de MÃ©xico / Playas de Tijuana, B.C","latitud":"32.5295693","longitude":"-117.121428","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":77,"url":"https://www.dropbox.com/s/k24s20wrv1bjiuc/correos-de-mexico.jpg?dl=0","type":"COVER","place":101}],"link_set":[{"id":167,"url":"https://www.google.com/maps/place/Correos+de+M%C3%A9xico/@32.5295693,-117.1214287,18z/data=!4m2!3m1!1s0x0000000000000000:0x12c3a58c6ddd2808","type":"1","place":101}]},{"id":102,"name":"Cortijo San JosÃ©","latitud":"32.5225644","longitude":"-117.113944","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":78,"url":"https://www.dropbox.com/s/lmyocfa19412jgj/cortijo-san-jose.jpg?dl=0","type":"COVER","place":102}],"link_set":[{"id":168,"url":"https://www.google.com/maps/place/Casa+de+la+Cultura+Playas/@32.5225644,-117.113944,19z/data=!4m2!3m1!1s0x0000000000000000:0xf292675470981de6","type":"1","place":102},{"id":169,"url":"https://foursquare.com/v/casa-de-la-cultura-playas/4dd18dfed16465f3f93ef28a","type":"4","place":102},{"id":170,"url":"http://www.descubretijuana.com/es/atractivos/arte-y-cultura/casa-de-la-cultura-cortijo-san-jose","type":"2","place":102}]},{"id":103,"name":"Las crepas cafe playas","latitud":"32.5290643","longitude":"-117.1200904","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":349,"url":"https://www.dropbox.com/s/olcodxr4bbb3deb/las-crepas-cafe-playas.jpg?dl=0","type":"COVER","place":103}],"link_set":[{"id":171,"url":"https://www.google.com/maps/place/Crepas+Francesas+Dennis/@32.5290643,-117.1200904,21z/data=!4m2!3m1!1s0x0000000000000000:0x85a377132894853e","type":"1","place":103},{"id":172,"url":"https://www.facebook.com/lecreperie/?rc=p","type":"2","place":103}]},{"id":104,"name":"D' Volada","latitud":"32.5269836","longitude":"-117.1183406","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":98,"url":"https://www.dropbox.com/s/td4jyhzuowv7gtk/dvolada.jpg?dl=0","type":"COVER","place":104}],"link_set":[{"id":173,"url":"https://www.google.com/maps/place/D'+Volada/@32.5269836,-117.1183406,19z/data=!4m2!3m1!1s0x0000000000000000:0x3ea48db542930c3b","type":"1","place":104},{"id":174,"url":"https://foursquare.com/v/dvolada-playas/4d0ae981b93b224b3c2549bf","type":"4","place":104},{"id":175,"url":"http://dvolada.com/","type":"3","place":104}]},{"id":105,"name":"Dairy QueenÂ®","latitud":"32.52961","longitude":"-117.1181443","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":79,"url":"https://www.dropbox.com/s/l39xejshj0rjgxy/dairy-queen.png?dl=0","type":"COVER","place":105}],"link_set":[{"id":176,"url":"https://www.google.com/maps/place/Dairy+Queen%C2%AE+Playas/@32.52961,-117.1181443,19z/data=!4m2!3m1!1s0x0000000000000000:0xef63f3358557170c","type":"1","place":105},{"id":177,"url":"https://foursquare.com/v/dairy-queen/51f08d94498e2af555964f9b","type":"4","place":105},{"id":178,"url":"http://dairyqueen.com.mx/","type":"3","place":105}]},{"id":106,"name":"DalÃ­ Suites","latitud":"32.5319438","longitude":"-117.1166933","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":80,"url":"https://www.dropbox.com/s/fs1yz47hh6frfgg/dali-suites.png?dl=0","type":"COVER","place":106}],"link_set":[{"id":179,"url":"https://www.google.com/maps/place/Dal%C3%AD+Suites/@32.5319438,-117.1166933,19z/data=!4m2!3m1!1s0x0000000000000000:0x6c2b28250257649b","type":"1","place":106}]},{"id":107,"name":"UDC","latitud":"32.5264382","longitude":"-117.1126399","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":84,"url":"https://www.dropbox.com/s/w2ql4rrwf8hh914/udc.jpg?dl=0","type":"COVER","place":107}],"link_set":[{"id":180,"url":"https://www.google.com/maps/place/De+Las+Californias+Univercidad/@32.5264382,-117.1126399,18z/data=!4m2!3m1!1s0x0000000000000000:0x5b39efab60bd3438","type":"1","place":107}]},{"id":108,"name":"Del Mar Inn Restaurant","latitud":"32.5330439","longitude":"-117.1173692","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":82,"url":"https://www.dropbox.com/s/c8vtu59mlg1ukvx/del-mar-restaurante.jpg?dl=0","type":"COVER","place":108}],"link_set":[{"id":181,"url":"https://www.google.com/maps/place/Del+Mar+Inn+Restaurant/@32.5330439,-117.1173692,19z/data=!4m2!3m1!1s0x0000000000000000:0x17c11fb71710aeee","type":"1","place":108},{"id":182,"url":"https://www.facebook.com/Del-Mar-Inn-restaurant-1105821602775100/","type":"2","place":108}]},{"id":109,"name":"DELEGACION MUNICIPAL PLAYAS DE TIJUANA","latitud":"32.5225644","longitude":"-117.113944","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":83,"url":"https://www.dropbox.com/s/wgbv5u5wf2h2oua/delegacion-de-playas.png?dl=0","type":"COVER","place":109}],"link_set":[{"id":183,"url":"https://www.google.com/maps/place/DELEGACION+MUNICIPAL+PLAYAS+DE+TIJUANA/@32.5225644,-117.113944,19z/data=!4m2!3m1!1s0x0000000000000000:0x86ece11feb4e6339","type":"1","place":109}]},{"id":110,"name":"Delifrutas PLAYAS","latitud":"32.5236184","longitude":"-117.1190967","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":85,"url":"https://www.dropbox.com/s/hvwkvt1y1sfjz06/delifrutas.jpg?dl=0","type":"COVER","place":110}],"link_set":[{"id":184,"url":"https://www.google.com/maps/place/Delifrutas+PLAYAS/@32.5236184,-117.1190967,19z/data=!4m2!3m1!1s0x0000000000000000:0x995a53d2a1b3fed2","type":"1","place":110},{"id":185,"url":"https://www.facebook.com/delifrutas.playas/","type":"2","place":110}]},{"id":111,"name":"DETALLADO AUTOMOTRIZ BARRAZA","latitud":"32.5175534","longitude":"-117.1168285","code":"","categories":[{"id":1,"name":"Autos"}],"status":5,"image_set":[],"link_set":[{"id":186,"url":"https://www.google.com/maps/place/DETALLADO+AUTOMOTRIZ+BARRAZA/@32.5175534,-117.1168285,20z/data=!4m2!3m1!1s0x0000000000000000:0x2c024f59dc161dde","type":"2","place":111}]},{"id":112,"name":"DHL Express","latitud":"32.5310389","longitude":"-117.1190967","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":87,"url":"https://www.dropbox.com/s/jz29h0foo4mlzkq/dhl.jpg?dl=0","type":"COVER","place":112}],"link_set":[{"id":187,"url":"https://www.google.com/maps/place/DHL+Express/@32.5310389,-117.1140846,19z/data=!4m2!3m1!1s0x0000000000000000:0x5d04de83c540f7b9","type":"1","place":112},{"id":188,"url":"https://foursquare.com/explore?mode=url&near=Tijuana%2C%20BCN&nearGeoId=72057594041909545","type":"4","place":112},{"id":189,"url":"http://www.dhl.com.mx/es.html","type":"3","place":112}]},{"id":113,"name":"di Vino bar","latitud":"32.522906","longitude":"-117.1190887","code":"","categories":[{"id":2,"name":"Bar"}],"status":1,"image_set":[{"id":91,"url":"https://www.dropbox.com/s/gwr8i6rcrggalzk/divino-restaurant-bar.jpg?dl=0","type":"COVER","place":113}],"link_set":[{"id":190,"url":"https://www.google.com/maps/place/di+Vino+bar+Restaurant/@32.522906,-117.1190887,18z/data=!4m2!3m1!1s0x0000000000000000:0x8c3aefd8fe3a0a4c","type":"1","place":113},{"id":191,"url":"https://foursquare.com/v/divino-bar/4d71b12dd976236afd2afb78","type":"4","place":113},{"id":192,"url":"https://www.facebook.com/DiVino-Restaurant-Bar-874928872528409/?fref=ts","type":"2","place":113}]},{"id":114,"name":"Dippin' Donuts","latitud":"32.5270978","longitude":"-117.1171725","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":89,"url":"https://www.dropbox.com/s/1rfco40oz9mdja1/dippin-donuts.jpg?dl=0","type":"COVER","place":114}],"link_set":[{"id":193,"url":"https://www.google.com/maps/place/Dippin'+Donuts/@32.5270978,-117.1171725,20z/data=!4m2!3m1!1s0x0000000000000000:0x22d674b9d06adbad","type":"1","place":114},{"id":194,"url":"https://foursquare.com/v/dippin-donuts/4fbebdd0e4b0d6b3519ba690","type":"4","place":114}]},{"id":115,"name":"Dish del Mar (Solo Contrataciones)","latitud":"32.5330498","longitude":"-117.1145848","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":90,"url":"https://www.dropbox.com/s/p23fdajnfb08sv6/dish.jpg?dl=0","type":"COVER","place":115}],"link_set":[{"id":195,"url":"https://www.google.com/maps/place/Dish+del+Mar+(Solo+Contrataciones)/@32.5330498,-117.1145848,20z/data=!4m2!3m1!1s0x0000000000000000:0x182337d28b1feb89","type":"1","place":115}]},{"id":116,"name":"DL coffee house","latitud":"32.5196251","longitude":"-117.112722","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":92,"url":"https://www.dropbox.com/s/u3efzfwws15dw60/dl-coffe-house.jpg?dl=0","type":"COVER","place":116}],"link_set":[{"id":196,"url":"https://www.google.com/maps/place/DL+coffee+house/@32.5196251,-117.112722,20z/data=!4m2!3m1!1s0x0000000000000000:0x63ab9bc87a338d26","type":"1","place":116},{"id":197,"url":"https://www.facebook.com/DL-Coffe-House-1531439493780304/?fref=ts","type":"2","place":116}]},{"id":117,"name":"Dolche Nails","latitud":"32.5237979","longitude":"-117.1174537","code":"","categories":[{"id":5,"name":"Belleza"}],"status":5,"image_set":[],"link_set":[{"id":198,"url":"https://www.google.com/maps/place/Dolche+Nails/@32.5237979,-117.1174537,19z/data=!4m2!3m1!1s0x0000000000000000:0x3891ec3af2f9b01f","type":"1","place":117}]},{"id":118,"name":"DOMINO'S PLAYAS BAJA CALIFORNIA","latitud":"32.5296063","longitude":"-117.1176613","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":93,"url":"https://www.dropbox.com/s/dtxdhkahlnq9f7h/dominos-pizza.png?dl=0","type":"COVER","place":118}],"link_set":[{"id":199,"url":"https://www.google.com/maps/place/DOMINO'S+PLAYAS+BAJA+CALIFORNIA/@32.5296063,-117.1176613,19z/data=!4m2!3m1!1s0x0000000000000000:0x4b1097c3627fcfe6","type":"1","place":118},{"id":200,"url":"https://foursquare.com/v/dominos-pizza/4d215f28b69c6dcbc6c97895","type":"4","place":118}]},{"id":119,"name":"Dreyers","latitud":"32.5238114","longitude":"-117.1125694","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":95,"url":"https://www.dropbox.com/s/z86na5ahw9yalz1/dreyers.jpg?dl=0","type":"COVER","place":119}],"link_set":[{"id":201,"url":"https://www.google.com/maps/place/Dreyers/@32.5238114,-117.1125694,19z/data=!4m2!3m1!1s0x0000000000000000:0x1192f15105e0e3c9","type":"1","place":119},{"id":202,"url":"https://www.facebook.com/DreyersTijuana/","type":"2","place":119}]},{"id":120,"name":"Dulceria Hanzel","latitud":"32.5087324","longitude":"-117.1193295","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":203,"url":"https://www.google.com/maps/place/Dulcer%C3%ADa+Hazel/@32.5087324,-117.1193295,20z/data=!4m2!3m1!1s0x0000000000000000:0x0f722ad51e7e30d7","type":"1","place":120}]},{"id":121,"name":"DUO DUO comida china","latitud":"32.5184646","longitude":"-117.1167549","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":96,"url":"https://www.dropbox.com/s/w4q1trxmdmevpaf/duo-duo-comida-china.png?dl=0","type":"COVER","place":121}],"link_set":[{"id":204,"url":"https://www.google.com/maps/place/DUO+DUO+comida+china/@32.5184646,-117.1167549,20z/data=!4m2!3m1!1s0x0000000000000000:0x3ceeeab232789ace","type":"1","place":121}]},{"id":122,"name":"Dvd Video Playas","latitud":"32.5238114","longitude":"-117.1125694","code":"","categories":[{"id":11,"name":"Entretenimiento"}],"status":1,"image_set":[{"id":97,"url":"https://www.dropbox.com/s/58dz2pqdd1labti/dvd-video-playas.png?dl=0","type":"COVER","place":122}],"link_set":[{"id":205,"url":"https://www.google.com/maps/place/Dvd+Video+Playas/@32.5238114,-117.1125694,19z/data=!4m2!3m1!1s0x0000000000000000:0x097607dcdc848ae9","type":"1","place":122},{"id":206,"url":"https://foursquare.com/v/dvd-video-playas/4cc3ba8e1e596dcbfaefcc67","type":"4","place":122}]},{"id":123,"name":"El Barco","latitud":"32.5321784","longitude":"-117.123199","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":102,"url":"https://www.dropbox.com/s/6hwxbvikp1p25mn/el-barco.png?dl=0","type":"COVER","place":123}],"link_set":[{"id":207,"url":"https://www.google.com/maps/place/El+Barco/@32.5321784,-117.123199,18z/data=!4m2!3m1!1s0x0000000000000000:0x90a6a517730a46d1","type":"1","place":123}]},{"id":124,"name":"El Bohemio Bar","latitud":"32.5121786","longitude":"-117.1198187","code":"","categories":[{"id":2,"name":"Bar"}],"status":5,"image_set":[],"link_set":[{"id":208,"url":"https://www.google.com.mx/maps/place/El+Bohemio+Bar/@32.5121786,-117.1198187,15z/data=!4m2!3m1!1s0x0:0xeb5fc6db6b45d58c","type":"1","place":124}]},{"id":125,"name":"CamarÃ³n Pozolero","latitud":"32.5335985","longitude":"-117.123386","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":48,"url":"https://www.dropbox.com/s/dp8de0ixalvxwo6/camaron-pozolero.jpg?dl=0","type":"COVER","place":125}],"link_set":[{"id":209,"url":"https://www.google.com/maps/place/El+Camar%C3%B3n+Pozolero/@32.5335985,-117.123386,19z/data=!4m2!3m1!1s0x0000000000000000:0x593c97c71d6f3f7d","type":"1","place":125},{"id":210,"url":"https://www.facebook.com/ElCamaronPozolero/","type":"2","place":125}]},{"id":126,"name":"EL CASCARON","latitud":"32.5244167","longitude":"-117.1214678","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":104,"url":"https://www.dropbox.com/s/zo6or1zlc9okvps/el-cascaron.jpg?dl=0","type":"COVER","place":126},{"id":103,"url":"https://www.dropbox.com/s/zo6or1zlc9okvps/el-cascaron.jpg?dl=0","type":"COVER","place":126}],"link_set":[{"id":212,"url":"https://www.facebook.com/El-Cascaron-560259710704086/timeline/","type":"2","place":126},{"id":211,"url":"https://www.google.com/maps/place/EL+CASCARON/@32.5244167,-117.1214678,19z/data=!4m2!3m1!1s0x0000000000000000:0x4047a90627a5f1a2","type":"1","place":126}]},{"id":127,"name":"El Girasol","latitud":"32.5335857","longitude":"-117.1168185","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":213,"url":"https://www.google.com/maps/place/El+Girasol/@32.5335857,-117.1168185,19z/data=!4m2!3m1!1s0x0000000000000000:0xab40c533fb693d08","type":"1","place":127}]},{"id":128,"name":"El Griego Restaurante","latitud":"32.5299617","longitude":"-117.1195579","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":214,"url":"https://www.google.com/maps/place/El+Griego+Restaurante/@32.5299617,-117.1195579,20z/data=!4m2!3m1!1s0x0000000000000000:0x1ffab556fb08561c","type":"1","place":128}]},{"id":129,"name":"El Laberinto","latitud":"32.5253692","longitude":"-117.1171553","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":100,"url":"https://www.dropbox.com/s/wv37icevisxzu8n/el-laberinto.png?dl=0","type":"COVER","place":129}],"link_set":[{"id":215,"url":"https://www.google.com/maps/place/El+Laberinto/@32.5253692,-117.1171553,20z/data=!4m2!3m1!1s0x0000000000000000:0x11a92b07c752a10b","type":"1","place":129}]},{"id":130,"name":"El Porton 1218","latitud":"32.5242502","longitude":"-117.112682","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":101,"url":"https://www.dropbox.com/s/6qeu1wc46el4u6a/el-porton.jpg?dl=0","type":"COVER","place":130}],"link_set":[{"id":216,"url":"https://www.google.com/maps/place/El+Porton+1218/@32.5242502,-117.112682,19z/data=!4m2!3m1!1s0x0000000000000000:0x9a31b05bebbfd443","type":"1","place":130}]},{"id":131,"name":"El Rinconcito","latitud":"32.5126098","longitude":"-117.1165104","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":350,"url":"https://www.dropbox.com/s/7e6qto76w8hphz2/el-rinconcito.png?dl=0","type":"COVER","place":131}],"link_set":[{"id":217,"url":"https://www.google.com/maps/place/El+Rinconcito/@32.5126098,-117.1165104,20z/data=!4m2!3m1!1s0x0000000000000000:0x63ba1a925fadd7ec","type":"1","place":131}]},{"id":132,"name":"El Triangulo Ferreteria","latitud":"32.5087109","longitude":"-117.121655","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":105,"url":"https://www.dropbox.com/s/j5yq1k31lvopab7/el-triangulo-ferreteria.png?dl=0","type":"COVER","place":132}],"link_set":[{"id":218,"url":"https://www.google.com/maps/place/El+Triangulo/@32.5087109,-117.121655,19z/data=!4m2!3m1!1s0x0000000000000000:0x2507c23eb52a2c33","type":"1","place":132}]},{"id":133,"name":"Yogurt Place","latitud":"32.5328302","longitude":"-117.1210746","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":337,"url":"https://www.dropbox.com/s/160u440eldmaif4/yogurt-place.png?dl=0","type":"COVER","place":133}],"link_set":[{"id":219,"url":"https://www.google.com/maps/place/El+Yogurt+Place/@32.5328302,-117.1210746,18z/data=!4m2!3m1!1s0x0000000000000000:0x87156c47f67ae2df","type":"1","place":133},{"id":220,"url":"https://foursquare.com/v/el-yogurt-place/4b8d6903f964a5200ffa32e3","type":"4","place":133},{"id":221,"url":"https://www.facebook.com/El-Yogurt-Place-123892124331754/?fref=ts","type":"2","place":133}]},{"id":134,"name":"ElÃ©ctrica Y Ferretera De Tijuana Las Playas, S. De R.L. De C.V","latitud":"32.5090185","longitude":"-117.1210515","code":"","categories":[{"id":4,"name":"Tienda"}],"status":5,"image_set":[],"link_set":[{"id":222,"url":"https://www.google.com/maps/place/El%C3%A9ctrica+Y+Ferretera+De+Tijuana+Las+Playas,+S.+De+R.L.+De+C.V./@32.5090185,-117.1210515,19z/data=!4m2!3m1!1s0x0000000000000000:0xb939a9ac360ead6f","type":"1","place":134}]},{"id":135,"name":"ELECTRODOMESTICOS OUTLET CENTER","latitud":"32.5192539","longitude":"-117.115969","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":106,"url":"https://www.dropbox.com/s/pg3xookmi0ybwkw/electrodomesticos-outlet-center.png?dl=0","type":"COVER","place":135}],"link_set":[{"id":223,"url":"https://www.google.com/maps/place/ELECTRODOMESTICOS+OUTLET+CENTER/@32.5192539,-117.115969,20z/data=!4m2!3m1!1s0x0000000000000000:0xb2e7dbdc699d0114","type":"1","place":135}]},{"id":136,"name":"Equipos Para Gimnasios MG Fitness Tijuana","latitud":"32.5154268","longitude":"-117.1199432","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":351,"url":"https://www.dropbox.com/s/37mzenys6gu9hij/equipos-para-gimnasios-mg-fitness-tijuana.png?dl=0","type":"COVER","place":136}],"link_set":[{"id":224,"url":"https://www.google.com/maps/place/Equipos+Para+Gimnasios+MG+Fitness+Tijuana/@32.5154268,-117.1199432,20z/data=!4m2!3m1!1s0x0000000000000000:0x01fb60512d666beb","type":"1","place":136}]},{"id":137,"name":"Ernesto & co","latitud":"32.5279913","longitude":"-117.11013","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":352,"url":"https://www.dropbox.com/s/f0k55cmgbgm6cjy/ernesto-%26-co.png?dl=0","type":"COVER","place":137}],"link_set":[{"id":225,"url":"https://www.google.com/maps/place/Ernesto+%26+co/@32.5279913,-117.11013,19z/data=!4m2!3m1!1s0x0000000000000000:0x7b1af1668a879f7b","type":"1","place":137}]},{"id":138,"name":"Escorza PÃºblicidad","latitud":"32.5101766","longitude":"-117.1185812","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":226,"url":"https://www.google.com/maps/place/Escorza+P%C3%BAblicidad/@32.5101766,-117.1185812,18z/data=!4m2!3m1!1s0x0000000000000000:0x847dcc4a93c0b978","type":"1","place":138}]},{"id":139,"name":"Escuela de Danza Pavlova","latitud":"32.5175449","longitude":"-117.1142448","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":107,"url":"https://www.dropbox.com/s/srss5syzao9qzt3/escuela-de-danza-pavlova.jpg?dl=0","type":"COVER","place":139}],"link_set":[{"id":227,"url":"https://www.google.com/maps/place/Escuela+de+Danza+Pavlova/@32.5175449,-117.1142448,20z/data=!4m2!3m1!1s0x0000000000000000:0x5dfccd7450532eee","type":"1","place":139},{"id":228,"url":"https://www.facebook.com/escuela-de-danza-pavlova-113509161995693/?fref=ts","type":"2","place":139}]},{"id":140,"name":"ESCUELA DE ENFERMERIA","latitud":"32.5225803","longitude":"-117.1208509","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":108,"url":"https://www.dropbox.com/s/94nzi0rfnkbvhe6/escuela-de-enfermeria.jpg?dl=0","type":"COVER","place":140}],"link_set":[{"id":229,"url":"https://www.google.com/maps/place/ESCUELA+DE+ENFERMERIA/@32.5225803,-117.1208509,19z/data=!4m2!3m1!1s0x0000000000000000:0x0947a916c8fd60c2","type":"1","place":140},{"id":230,"url":"http://www.imss.gob.mx/tramites/imss03005","type":"3","place":140}]},{"id":141,"name":"Escuela Superior de Artes Visuales","latitud":"32.530345","longitude":"-117.1176508","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":109,"url":"https://www.dropbox.com/s/5qfxqhfwvxe2fbe/escuela-superior-artes-visuales.png?dl=0","type":"COVER","place":141}],"link_set":[{"id":231,"url":"https://www.google.com/maps/place/Escuela+Superior+de+Artes+Visuales/@32.530345,-117.1176508,19z/data=!4m2!3m1!1s0x0000000000000000:0x37117b09a3acdf70","type":"1","place":141},{"id":232,"url":"http://www.esav.mx/esp/index.php","type":"3","place":141},{"id":233,"url":"https://www.facebook.com/ESCUELASUPERIORDEARTES","type":"2","place":141}]},{"id":142,"name":"Especialidades De Pechuga","latitud":"32.5217389","longitude":"-117.1153816","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":110,"url":"https://www.dropbox.com/s/m9w2zlzbfcbh8sf/especialidades-de-pollo.png?dl=0","type":"COVER","place":142}],"link_set":[{"id":234,"url":"https://www.google.com/maps/place/Especialidades+De+Pechuga/@32.5217389,-117.1153816,19z/data=!4m2!3m1!1s0x0000000000000000:0xb75d0f5f0ad4943d","type":"1","place":142},{"id":235,"url":"https://www.facebook.com/fernando.garcini.37?fref=ts","type":"2","place":142}]},{"id":143,"name":"ESTETICA UNISEX SUPER CORTES","latitud":"32.5242343","longitude":"-117.1169253","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":236,"url":"https://www.google.com/maps/place/ESTETICA+UNISEX+SUPER+CORTES/@32.5242343,-117.1169253,19z/data=!4m2!3m1!1s0x0000000000000000:0x653fe9b9cc0c8a81","type":"1","place":143}]},{"id":144,"name":"Extra Tiendas Playas De Tijuana","latitud":"32.5044902","longitude":"-117.121614","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":111,"url":"https://www.dropbox.com/s/tm4zx37rvndu88t/extra.png?dl=0","type":"COVER","place":144}],"link_set":[{"id":237,"url":"https://www.google.com/maps/place/Extra+Tiendas+Playas+De+Tijuana/@32.5044902,-117.121614,19z/data=!4m2!3m1!1s0x0000000000000000:0x3240f3d680fa6247","type":"1","place":144},{"id":238,"url":"https://foursquare.com/v/extra-costa-azul/4e6ab99618381ea1be098041","type":"4","place":144}]},{"id":145,"name":"farmacia benavides","latitud":"32.5279962","longitude":"-117.1159447","code":"","categories":[{"id":6,"name":"Salud"}],"status":1,"image_set":[],"link_set":[{"id":239,"url":"https://www.google.com/maps/place/farmacia+benavides/@32.5279962,-117.1159447,20z/data=!4m2!3m1!1s0x0000000000000000:0x36f5afc88598072f","type":"1","place":145},{"id":240,"url":"https://foursquare.com/v/farmacias-benavides/4d8d1df1fa943704173ce1c5","type":"4","place":145}]},{"id":146,"name":"Benavides","latitud":"32.5154799","longitude":"-117.1166441","code":"","categories":[{"id":6,"name":"Salud"}],"status":1,"image_set":[{"id":33,"url":"https://www.dropbox.com/s/duccdwgq7e4zuj6/benavides.png?dl=0","type":"COVER","place":146}],"link_set":[{"id":241,"url":"https://www.google.com/maps/place/Farmacia+benavides/@32.5154799,-117.1166441,19z/data=!4m2!3m1!1s0x0000000000000000:0xddd7cc1e5202dd8e","type":"1","place":146}]},{"id":147,"name":"Farmacia De Cristo","latitud":"32.5096609","longitude":"-117.116929","code":"","categories":[{"id":6,"name":"Salud"}],"status":5,"image_set":[],"link_set":[{"id":242,"url":"https://www.google.com/maps/place/Farmacia+De+Cristo/@32.5096609,-117.116929,18z/data=!4m2!3m1!1s0x0000000000000000:0x508fb60b78866648","type":"1","place":147}]},{"id":148,"name":"FARMACIA MONUMENTAL","latitud":"32.5313626","longitude":"-117.1190831","code":"","categories":[{"id":6,"name":"Salud"}],"status":1,"image_set":[{"id":112,"url":"https://www.dropbox.com/s/7narxtxwqkznux4/farmacia-monumental.jpg?dl=0","type":"COVER","place":148}],"link_set":[{"id":243,"url":"https://www.google.com/maps/place/FARMACIA+MONUMENTAL/@32.5313626,-117.1190831,19z/data=!4m2!3m1!1s0x0000000000000000:0x6d60dfc285dc1558","type":"1","place":148}]},{"id":149,"name":"Farmacias Del Ahorro","latitud":"32.5310197","longitude":"-117.1150649","code":"","categories":[{"id":6,"name":"Salud"}],"status":1,"image_set":[{"id":113,"url":"https://www.dropbox.com/s/x2fzdjafbeh3rb6/farmacias-del-ahorro.jpg?dl=0","type":"COVER","place":149}],"link_set":[{"id":244,"url":"https://www.google.com/maps/place/Farmacias+Del+Ahorro/@32.5310197,-117.1150649,19z/data=!4m2!3m1!1s0x0000000000000000:0xa9674285289fb4f2","type":"1","place":149}]},{"id":150,"name":"FARMACIAS FarmaCon","latitud":"32.5263659","longitude":"-117.1129081","code":"","categories":[{"id":6,"name":"Salud"}],"status":1,"image_set":[{"id":119,"url":"https://www.dropbox.com/s/pizsog1rl4o8c94/farmacon.jpg?dl=0","type":"COVER","place":150}],"link_set":[{"id":245,"url":"https://www.google.com/maps/place/FARMACIAS+FarmaCon/@32.5263659,-117.1129081,18z/data=!4m2!3m1!1s0x0000000000000000:0x4f608a3aadf02e07","type":"1","place":150},{"id":246,"url":"https://foursquare.com/v/farmacias-farmacon/4dd09979fa7664b7c6dcfc86","type":"4","place":150}]},{"id":151,"name":"Farmacias Modernas De Tijuana","latitud":"32.5237775","longitude":"-117.1198865","code":"","categories":[{"id":6,"name":"Salud"}],"status":1,"image_set":[{"id":114,"url":"https://www.dropbox.com/s/0lpjt0l9t8xjwmd/farmacias-moderna.jpg?dl=0","type":"COVER","place":151}],"link_set":[{"id":247,"url":"https://www.google.com/maps/place/Farmacias+Modernas+De+Tijuana/@32.5237775,-117.1198865,19z/data=!4m2!3m1!1s0x0000000000000000:0x3b132e9b3d99964e","type":"1","place":151}]},{"id":152,"name":"Farmacias Similares","latitud":"32.5330498","longitude":"-117.1145848","code":"","categories":[{"id":6,"name":"Salud"}],"status":1,"image_set":[{"id":115,"url":"https://www.dropbox.com/s/kgof256kro2kprf/farmacias-similares.jpg?dl=0","type":"COVER","place":152}],"link_set":[{"id":248,"url":"https://www.google.com/maps/place/Farmacias+Similares/@32.5330498,-117.1145848,20z/data=!4m2!3m1!1s0x0000000000000000:0x1a96f59fcfdb1e83","type":"1","place":152}]},{"id":153,"name":"FARMACIAS SIMILARES","latitud":"32.5286567","longitude":"-117.1124729","code":"","categories":[{"id":6,"name":"Salud"}],"status":1,"image_set":[{"id":118,"url":"https://www.dropbox.com/s/kgof256kro2kprf/farmacias-similares.jpg?dl=0","type":"COVER","place":153}],"link_set":[{"id":249,"url":"https://www.google.com/maps/place/FARMACIAS+SIMILARES/@32.5286567,-117.1124729,21z/data=!4m2!3m1!1s0x0000000000000000:0x5b99eaf029219ed5","type":"1","place":153}]},{"id":154,"name":"FARMACIAS SIMILARES","latitud":"32.5149484","longitude":"-117.1166173","code":"","categories":[{"id":6,"name":"Salud"}],"status":1,"image_set":[{"id":117,"url":"https://www.dropbox.com/s/kgof256kro2kprf/farmacias-similares.jpg?dl=0","type":"COVER","place":154}],"link_set":[{"id":250,"url":"https://www.google.com/maps/place/FARMACIAS+SIMILARES/@32.5149484,-117.1166173,19z/data=!4m2!3m1!1s0x0000000000000000:0x3b6d5319c75d58d7","type":"1","place":154}]},{"id":155,"name":"FARMACIAS SIMILARES","latitud":"32.5112081","longitude":"-117.1209979","code":"","categories":[{"id":6,"name":"Salud"}],"status":1,"image_set":[{"id":116,"url":"https://www.dropbox.com/s/kgof256kro2kprf/farmacias-similares.jpg?dl=0","type":"COVER","place":155}],"link_set":[{"id":251,"url":"https://www.google.com/maps/place/FARMACIAS+SIMILARES/@32.5112081,-117.1209979,20z/data=!4m2!3m1!1s0x0000000000000000:0x4b2c222cf9ee3d1f","type":"1","place":155}]},{"id":156,"name":"FedEx","latitud":"32.5149009","longitude":"-117.1174327","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":120,"url":"https://www.dropbox.com/s/7f160gkpcv89b4i/fedex.png?dl=0","type":"COVER","place":156}],"link_set":[{"id":252,"url":"https://www.google.com/maps/place/FedEx/@32.5149009,-117.1174327,19z/data=!4m2!3m1!1s0x0000000000000000:0xb1546fc7a1eac089","type":"1","place":156}]},{"id":157,"name":"FERRE DESCUENTOS","latitud":"32.5241938","longitude":"-117.119244","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":121,"url":"https://www.dropbox.com/s/kbug7ubjuq99wz9/ferre-descuentos.png?dl=0","type":"COVER","place":157}],"link_set":[{"id":253,"url":"https://www.google.com/maps/place/FERRE+DESCUENTOS/@32.5241938,-117.119244,19z/data=!4m2!3m1!1s0x0000000000000000:0xfae57a4dd8d5c404","type":"1","place":157}]},{"id":158,"name":"Fiestas y Regalos Bonnie","latitud":"32.522501","longitude":"-117.1161863","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":122,"url":"https://www.dropbox.com/s/zcmkql50fr0ykr2/fiestas-y-regalos-bonnie.png?dl=0","type":"COVER","place":158}],"link_set":[{"id":254,"url":"https://www.google.com/maps/place/Fiestas+y+Regalos+Bonnie/@32.522501,-117.1161863,19z/data=!4m2!3m1!1s0x0000000000000000:0x52fda59668d1a420","type":"1","place":158}]},{"id":159,"name":"FISH MART","latitud":"32.5284097","longitude":"-117.1184717","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":123,"url":"https://www.dropbox.com/s/ekevckrssjzyfdv/fish-mart.jpg?dl=0","type":"COVER","place":159}],"link_set":[{"id":255,"url":"https://www.google.com/maps/place/FISH+MART/@32.5284097,-117.1184717,18z/data=!4m2!3m1!1s0x0000000000000000:0x78643cca1032dbf5","type":"1","place":159},{"id":256,"url":"https://foursquare.com/explore?mode=url&near=Tijuana%2C%20BCN&nearGeoId=72057594041909545","type":"4","place":159}]},{"id":160,"name":"FITNESS CLUB MEXICO","latitud":"32.517179","longitude":"-117.1167601","code":"","categories":[{"id":8,"name":"Ejercicio"}],"status":5,"image_set":[],"link_set":[{"id":257,"url":"https://docs.google.com/spreadsheets/d/1JMOHlN55FgCrzDevVGBcQBoVwn-JtRtQBij6j_gFHPo/edit#gid=0","type":"1","place":160}]},{"id":161,"name":"Flauti PIZZA SPORTS","latitud":"32.5310031","longitude":"-117.116881","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":124,"url":"https://www.dropbox.com/s/apk94k6rjke0mby/flauti-pizza.jpg?dl=0","type":"COVER","place":161}],"link_set":[{"id":258,"url":"https://www.google.com/maps/place/Flauti+PIZZA+SPORTS/@32.5310031,-117.116881,19z/data=!4m2!3m1!1s0x0000000000000000:0xa3efca5703d06735","type":"1","place":161},{"id":259,"url":"https://www.facebook.com/Flauti-Pizza-108834409138705/","type":"2","place":161}]},{"id":162,"name":"FlorerÃ­a Rosita","latitud":"32.5155726","longitude":"-117.1197206","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":125,"url":"https://www.dropbox.com/s/v6uhn4wyf8kgggb/floreria-rosita.jpg?dl=0","type":"COVER","place":162}],"link_set":[{"id":260,"url":"https://www.google.com/maps/place/Florer%C3%ADa+Rosita/@32.5155726,-117.1197206,19z/data=!4m2!3m1!1s0x0000000000000000:0x1c7241ea61260c22","type":"1","place":162},{"id":261,"url":"https://www.facebook.com/diez.glez.3?ref=br_rs","type":"2","place":162}]},{"id":163,"name":"Food Village","latitud":"32.5282265","longitude":"-117.117836","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":126,"url":"https://www.dropbox.com/s/w2kpd2dno4owdq0/food-village.png?dl=0","type":"COVER","place":163}],"link_set":[{"id":262,"url":"https://www.google.com/maps/place/Food+Village/@32.5282265,-117.117836,19z/data=!4m2!3m1!1s0x0000000000000000:0x66289f1816a3aa0f","type":"1","place":163}]},{"id":164,"name":"FRENOS Y SUSPENSIONES TUBUTAMA","latitud":"32.5255599","longitude":"-117.1211124","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":127,"url":"https://www.dropbox.com/s/ovj69vqfn2h8wxo/frenos-y-suspenciones-tubutama.png?dl=0","type":"COVER","place":164}],"link_set":[{"id":263,"url":"https://www.google.com/maps/place/FRENOS+Y+SUSPENSIONES+TUBUTAMA/@32.5255599,-117.1211124,20z/data=!4m2!3m1!1s0x0000000000000000:0x064d34c57c3067dc","type":"1","place":164}]},{"id":165,"name":"Frontera Los EconÃ³micos.com","latitud":"32.5292776","longitude":"-117.1182409","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":128,"url":"https://www.dropbox.com/s/v4520w6vv4v0jrl/frontera-los-economicos.png?dl=0","type":"COVER","place":165}],"link_set":[{"id":264,"url":"https://www.google.com/maps/place/Frontera+Los+Econ%C3%B3micos.com/@32.5292776,-117.1182409,19z/data=!4m2!3m1!1s0x0000000000000000:0x2279ecaf44c36685","type":"1","place":165},{"id":265,"url":"http://www.frontera.info/loseconomicos/","type":"3","place":165}]},{"id":166,"name":"GASMART - PLAYAS","latitud":"32.5132883","longitude":"-117.1206705","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":129,"url":"https://www.dropbox.com/s/lq7bjpzgdlhnfoh/gasmart.jpg?dl=0","type":"COVER","place":166}],"link_set":[{"id":266,"url":"https://www.google.com/maps/place/GASMART+-+PLAYAS/@32.5132883,-117.1206705,20z/data=!4m2!3m1!1s0x0000000000000000:0x59604052d596df7a","type":"1","place":166}]},{"id":167,"name":"Gerardos PeluquerÃ­a Unisex","latitud":"32.5072169","longitude":"-117.1196344","code":"","categories":[{"id":11,"name":"Entretenimiento"}],"status":5,"image_set":[],"link_set":[{"id":267,"url":"https://www.google.com/maps/place/Gerardos+Peluquer%C3%ADa+Unisex/@32.5072169,-117.1196344,20z/data=!4m2!3m1!1s0x0000000000000000:0x122b21a2152f843b","type":"1","place":167}]},{"id":168,"name":"Giuseppis","latitud":"32.5326903","longitude":"-117.1149227","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":130,"url":"https://www.dropbox.com/s/hv3k1w2lh74tse2/giuseppes.png?dl=0","type":"COVER","place":168}],"link_set":[{"id":268,"url":"https://www.google.com/maps/place/Giuseppis/@32.5326903,-117.1149227,20z/data=!4m2!3m1!1s0x0000000000000000:0xdd3fc70ac8cf348b","type":"1","place":168},{"id":269,"url":"https://foursquare.com/v/giuseppis-playas-de-tijuana/4d6ad5d592f6b60cc5d899e0","type":"4","place":168}]},{"id":169,"name":"Gymboree","latitud":"32.5332587","longitude":"-117.1185198","code":"","categories":[{"id":8,"name":"Ejercicio"}],"status":1,"image_set":[{"id":131,"url":"https://www.dropbox.com/s/5u23w5d68eyei2o/gymboree.png?dl=0","type":"COVER","place":169}],"link_set":[{"id":270,"url":"https://www.google.com/maps/place/Gymboree/@32.5332587,-117.1185198,19z/data=!4m2!3m1!1s0x0000000000000000:0x1fc97cd9b0c448c7","type":"1","place":169},{"id":271,"url":"http://www.gymboree.com.mx/","type":"3","place":169},{"id":272,"url":"https://www.facebook.com/Gymboree-Playas-de-Tijuana-149616338430963/","type":"2","place":169}]},{"id":170,"name":"HaZ tu LoKo","latitud":"32.5149484","longitude":"-117.1166173","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":132,"url":"https://www.dropbox.com/s/gmkpp6jvx2t3ot3/haz-tu-loko.jpg?dl=0","type":"COVER","place":170}],"link_set":[{"id":273,"url":"https://www.google.com/maps/place/HaZ+tu+LoKo/@32.5149484,-117.1166173,19z/data=!4m2!3m1!1s0x0000000000000000:0x2e86a1f83313a360","type":"1","place":170},{"id":274,"url":"http://haztuloko.com/web/nuestra-lokura/","type":"3","place":170},{"id":275,"url":"https://www.facebook.com/haztuloko.tj/","type":"2","place":170}]},{"id":171,"name":"Hierbas Y Especies De MÃ©xico, S.A. De C.V","latitud":"32.5012282","longitude":"-117.1206002","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":353,"url":"https://www.dropbox.com/s/j56vkdtes4f3v1d/hierbas-y-especies-de-mexico.png?dl=0","type":"COVER","place":171}],"link_set":[{"id":276,"url":"https://www.google.com/maps/place/Hierbas+Y+Especies+De+M%C3%A9xico,+S.A.+De+C.V./@32.5012282,-117.1206002,18z/data=!4m2!3m1!1s0x0000000000000000:0x610efa09cd3925b6","type":"1","place":171},{"id":277,"url":"http://www.hemextij.com/","type":"3","place":171}]},{"id":172,"name":"Highland Prince Academy","latitud":"32.5191759","longitude":"-117.1094097","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":134,"url":"https://www.dropbox.com/s/t1swhdhfs6b1ci9/highland-prince-academy-high.jpg?dl=0","type":"COVER","place":172}],"link_set":[{"id":278,"url":"https://www.google.com/maps/place/Highland+Prince+Academy/@32.5191759,-117.1094097,19z/data=!4m2!3m1!1s0x0000000000000000:0x11788d927cdbfa4f","type":"1","place":172},{"id":279,"url":"https://www.facebook.com/Highland-Prince-Academy-High-251977408173714/","type":"2","place":172}]},{"id":173,"name":"Horno 320","latitud":"32.5237285","longitude":"-117.1235436","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":135,"url":"https://www.dropbox.com/s/sipgm8u0lov9bbo/horno-320.jpg?dl=0","type":"COVER","place":173}],"link_set":[{"id":280,"url":"https://www.google.com/maps/place/Horno+320/@32.5237285,-117.1235436,19z/data=!4m2!3m1!1s0x0000000000000000:0x548e010acdddef3b","type":"1","place":173},{"id":281,"url":"https://foursquare.com/v/horno-320/4f6beb97e4b04cb2925b82b5","type":"4","place":173},{"id":282,"url":"http://www.descubretijuana.com/en/attractions/horno-320","type":"3","place":173},{"id":283,"url":"https://www.facebook.com/Horno-320-232231733539871/","type":"2","place":173}]},{"id":174,"name":"Hot Dogs y Hamburguesas Carrito","latitud":"32.5224061","longitude":"-117.1120316","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":354,"url":"https://www.dropbox.com/s/ghq40u1ygqpzytb/hot-dogs-y-hamburguesas-carrito.png?dl=0","type":"COVER","place":174}],"link_set":[{"id":284,"url":"https://www.google.com/maps/place/Hot+Dogs+y+Hamburguesas+Carrito/@32.5224061,-117.1120316,19z/data=!4m2!3m1!1s0x0000000000000000:0x5083fc38cf98f345","type":"1","place":174}]},{"id":175,"name":"Hotel Playas De Tijuana","latitud":"32.5282318","longitude":"-117.122416","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":136,"url":"https://www.dropbox.com/s/amkewqlsra2cdom/hotel-playas-de-tijuana.png?dl=0","type":"COVER","place":175}],"link_set":[{"id":285,"url":"https://www.google.com/maps/place/Hotel+Playas+De+Tijuana/@32.5282318,-117.122416,18z/data=!4m2!3m1!1s0x0000000000000000:0x6f52dd61084dc769","type":"1","place":175}]},{"id":176,"name":"Iexplore A.C","latitud":"32.5246105","longitude":"-117.1235168","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":139,"url":"https://www.dropbox.com/s/z2xw30hllo6lyvv/i-explore.png?dl=0","type":"COVER","place":176}],"link_set":[{"id":286,"url":"https://www.google.com/maps/place/Iexplore+A.C./@32.5246105,-117.1235168,19z/data=!4m2!3m1!1s0x0000000000000000:0xda71d776e9050d2d","type":"1","place":176},{"id":287,"url":"https://www.facebook.com/IExploremx-Escuela-Primaria-Tijuana-503169829754700/","type":"2","place":176}]},{"id":177,"name":"Instituto de Gastronomia IGBC","latitud":"32.5264247","longitude":"-117.1117977","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":146,"url":"https://www.dropbox.com/s/4g5a0mh5c7tp65y/instituto-de-gastronomia-IGBC.jpg?dl=0","type":"COVER","place":177}],"link_set":[{"id":288,"url":"https://www.google.com/maps/place/IGBC+Escuela+de+Gastronomia/@32.5264247,-117.1117977,18z/data=!4m2!3m1!1s0x0000000000000000:0xc8194716ed10c61f","type":"1","place":177},{"id":289,"url":"http://www.gastronomiaigbc.com/","type":"3","place":177},{"id":290,"url":"https://www.facebook.com/InstitutoDeGastronomiaDeBajaCaliforniaLaCacho/","type":"2","place":177}]},{"id":178,"name":"Iglesia Bethel Playas","latitud":"32.5184578","longitude":"-117.1152006","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":355,"url":"https://www.dropbox.com/s/vvbb6hjf8067abp/iglesia-bethel-playas.png?dl=0","type":"COVER","place":178}],"link_set":[{"id":291,"url":"https://www.google.com/maps/place/Iglesia+Bethel+Playas/@32.5184578,-117.1152006,20z/data=!4m2!3m1!1s0x0000000000000000:0xf12ee6c56182692a","type":"1","place":178}]},{"id":179,"name":"Iglesia De Jesucristo De Los Santos De Los Ultimos Dias","latitud":"32.5139359","longitude":"-117.1189326","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":140,"url":"https://www.dropbox.com/s/4bvsirwseca7ok3/iglesia-de-Jesucristo-de-los-santos-de-los-ultimos-dias.png?dl=0","type":"COVER","place":179}],"link_set":[{"id":292,"url":"https://www.google.com/maps/place/Iglesia+De+Jesucristo+De+Los+Santos+De+Los+Ultimos+Dias/@32.5139359,-117.1189326,20z/data=!4m2!3m1!1s0x0000000000000000:0x804abb0612941a9c","type":"1","place":179},{"id":293,"url":"https://www.lds.org/locations?lang=spa","type":"3","place":179}]},{"id":180,"name":"Iglesia Metodista de MÃ©xico A.R.","latitud":"32.5196384","longitude":"-117.1174201","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":141,"url":"https://www.dropbox.com/s/g8ztvyramoqroyp/iglesia-metodista-de-mexico.jpg?dl=0","type":"COVER","place":180}],"link_set":[{"id":294,"url":"https://www.google.com/maps/place/Iglesia+Metodista+de+M%C3%A9xico+A.R.+Nuevo+Pacto/@32.5196384,-117.1174201,20z/data=!4m2!3m1!1s0x0000000000000000:0x0d98c3a0ea0e07ff","type":"1","place":180},{"id":295,"url":"http://www.iglesia-metodista.org.mx/","type":"3","place":180},{"id":296,"url":"https://www.facebook.com/Iglesia-Metodista-de-Mexico-AR-201393333204002/","type":"2","place":180}]},{"id":181,"name":"Iglesia Nuestra SeÃ±ora De La Salud Playas De Tijuana","latitud":"32.5103146","longitude":"-117.1193698","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":297,"url":"https://www.google.com/maps/place/Iglesia+Nuestra+Se%C3%B1ora+De+La+Salud+Playas+De+Tijuana/@32.5103146,-117.1193698,19z/data=!4m2!3m1!1s0x0000000000000000:0x8a08efd7a4f4744e","type":"1","place":181},{"id":298,"url":"https://www.facebook.com/Parroquia-Maria-Inmaculada-de-la-Salud-365216973493669/","type":"2","place":181}]},{"id":182,"name":"Iglesia Pentecostal Gethsemani","latitud":"32.5257096","longitude":"-117.1167409","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":142,"url":"https://www.dropbox.com/s/1g8648q0ollncus/iglesia-pentecostal-gethsemani.png?dl=0","type":"COVER","place":182}],"link_set":[{"id":299,"url":"https://www.google.com/maps/place/Iglesia+Pentecostal+Gethsemani/@32.5257096,-117.1167409,19z/data=!4m2!3m1!1s0x0000000000000000:0xb9579168eaae79c2","type":"1","place":182}]},{"id":183,"name":"IMAN Instituto Mexico Americano Noroeste","latitud":"32.5260266","longitude":"-117.1115027","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":143,"url":"https://www.dropbox.com/s/z7aexzjee9nxw3u/iman-secundaria-y-preparatoria.jpg?dl=0","type":"COVER","place":183}],"link_set":[{"id":300,"url":"https://www.google.com/maps/place/Miseli+Colegio+Preparatoria/@32.5260266,-117.1115027,18z/data=!4m2!3m1!1s0x0000000000000000:0x9ab6aedf9326fa91","type":"1","place":183},{"id":301,"url":"http://www.iman.edu.mx/","type":"3","place":183},{"id":302,"url":"https://www.facebook.com/IMAN-Secundaria-y-Preparatoria-108550375870714/","type":"2","place":183}]},{"id":184,"name":"Imprenta Elefante","latitud":"32.5287704","longitude":"-117.1126379","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":144,"url":"https://www.dropbox.com/s/3xjo5hkq3i3gtho/imprenta-elefante.jpg?dl=0","type":"COVER","place":184}],"link_set":[{"id":303,"url":"https://www.google.com/maps/place/Centro+de+Copiado+E+Imprenta+Digital+Elefante/@32.5287704,-117.1126379,21z/data=!4m2!3m1!1s0x0000000000000000:0x19125ca6bda0886e","type":"1","place":184},{"id":304,"url":"https://www.facebook.com/ImprentaElefante","type":"2","place":184}]},{"id":185,"name":"Impulsora De Recubrimientos Y Pisos","latitud":"32.522501","longitude":"-117.1161863","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":145,"url":"https://www.dropbox.com/s/wsbd608ddpzq2cp/impulsora-de-recubrimientosy-pisos.png?dl=0","type":"COVER","place":185}],"link_set":[{"id":305,"url":"https://www.google.com/maps/place/Impulsora+De+Recubrimientos+Y+Pisos/@32.522501,-117.1161863,19z/data=!4m2!3m1!1s0x0000000000000000:0x69699e61eba7f114","type":"1","place":185}]},{"id":186,"name":"Colegio InglÃ©s ","latitud":"32.5260266","longitude":"-117.1115027","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":72,"url":"https://www.dropbox.com/s/w61m1rtnp5qvm96/colegio-ingles.jpg?dl=0","type":"COVER","place":186}],"link_set":[{"id":306,"url":"https://www.google.com/maps/place/Ingl%C3%A9s+Colegio+Oficina+Privada/@32.5260266,-117.1115027,18z/data=!4m2!3m1!1s0x0000000000000000:0xdd7cee7243147ba8","type":"1","place":186}]},{"id":187,"name":"Instituto Estrella Del Mar Ac","latitud":"32.5261998","longitude":"-117.1193486","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":147,"url":"https://www.dropbox.com/s/a4mihayx3rxg7ef/instituto-estrella-del-mar.jpg?dl=0","type":"COVER","place":187}],"link_set":[{"id":307,"url":"https://www.google.com/maps/place/Instituto+Estrella+del+Mar+A.C./@32.5261998,-117.1193486,19z/data=!4m2!3m1!1s0x0000000000000000:0xd287fe82e1032091","type":"1","place":187},{"id":308,"url":"http://institutoestrelladelmar.blogspot.mx/","type":"3","place":187}]},{"id":188,"name":"Instituto Vanguardia","latitud":"32.5239518","longitude":"-117.1177259","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":148,"url":"https://www.dropbox.com/s/i3615japn3oyqqm/instituto-vanguardia.png?dl=0","type":"COVER","place":188}],"link_set":[{"id":309,"url":"https://www.google.com/maps/place/Instituto+Vanguardia/@32.5239518,-117.1177259,19z/data=!4m2!3m1!1s0x0000000000000000:0xdcd20a4bdcf5adb9","type":"1","place":188},{"id":310,"url":"http://www.mejoratuescuela.org/escuelas/index/02PES0177G","type":"3","place":188}]},{"id":189,"name":"Internet Controlado S.A. de C.V","latitud":"32.5241936","longitude":"-117.111349","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":311,"url":"https://www.google.com/maps/place/Internet+Controlado+S.A.+de+C.V./@32.5241936,-117.111349,18z/data=!4m2!3m1!1s0x0000000000000000:0xe3544690c5742823","type":"1","place":189}]},{"id":190,"name":"Izzi","latitud":"32.5292776","longitude":"-117.1182409","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":149,"url":"https://www.dropbox.com/s/lcr7f5e4dkv8yrb/izzi.png?dl=0","type":"COVER","place":190}],"link_set":[{"id":312,"url":"https://www.google.com/maps/place/Izzi/@32.5292776,-117.1182409,19z/data=!4m2!3m1!1s0x0000000000000000:0x32ba5c596391364a","type":"1","place":190},{"id":313,"url":"https://www.izzi.mx/home","type":"3","place":190}]},{"id":191,"name":"JAIROS AUTOMOTRIZ","latitud":"32.5261998","longitude":"-117.1193486","code":"","categories":[{"id":1,"name":"Autos"}],"status":5,"image_set":[],"link_set":[{"id":314,"url":"https://www.google.com/maps/place/JAIROS+AUTOMOTRIZ/@32.5261998,-117.1193486,19z/data=!4m2!3m1!1s0x0000000000000000:0xe2b1b3600d0943e9","type":"1","place":191}]},{"id":192,"name":"Jakie's Burgers","latitud":"32.5140007","longitude":"-117.1200679","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":150,"url":"https://www.dropbox.com/s/djrilq9iqit9rz5/jackies-burgers.jpg?dl=0","type":"COVER","place":192}],"link_set":[{"id":315,"url":"https://www.google.com/maps/place/Jakie's+Burgers/@32.5140007,-117.1200679,20z/data=!4m2!3m1!1s0x0000000000000000:0xce8c9a13847d612a","type":"1","place":192}]},{"id":193,"name":"Jericayas Don RaÃºl","latitud":"32.5056063","longitude":"-117.1222701","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":151,"url":"https://www.dropbox.com/s/7ifbwns68l44ks0/jericallas-don-raul.jpg?dl=0","type":"COVER","place":193}],"link_set":[{"id":316,"url":"https://www.google.com/maps/place/Jericayas+Don+Ra%C3%BAl/@32.5056063,-117.1222701,19z/data=!4m2!3m1!1s0x0000000000000000:0x10e1ee7c33f9811a","type":"1","place":193},{"id":317,"url":"https://www.facebook.com/jericallasdonraul","type":"2","place":193}]},{"id":194,"name":"JUGOS Y LICUADOS DEL MAR","latitud":"32.518874","longitude":"-117.116763","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":152,"url":"https://www.dropbox.com/s/mooermnz56g9e8w/jugos-y-licuados-del-mar.jpg?dl=0","type":"COVER","place":194}],"link_set":[{"id":319,"url":"https://www.facebook.com/JugosYLicuadosDelMar/?fref=ts","type":"2","place":194},{"id":318,"url":"https://www.google.com/maps/place/JUGOS+Y+LICUADOS+DEL+MAR/@32.518874,-117.116763,20z/data=!4m2!3m1!1s0x0000000000000000:0x2f55cea92c4240ba","type":"1","place":194}]},{"id":195,"name":"k-0 Sushi Bar","latitud":"32.530003","longitude":"-117.1227376","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":154,"url":"https://www.dropbox.com/s/smozpkehdzacv2d/k-o-sushi-bar.jpg?dl=0","type":"COVER","place":195}],"link_set":[{"id":320,"url":"https://www.google.com/maps/place/k-0+Sushi+Bar/@32.530003,-117.1227376,18z/data=!4m2!3m1!1s0x0000000000000000:0x2106326ba5497bcd","type":"1","place":195},{"id":321,"url":"https://www.facebook.com/K.0.SushiBar/?fref=ts","type":"2","place":195}]},{"id":196,"name":"Kave Alimentos S. de R.L. de C.V","latitud":"32.5022801","longitude":"-117.1199296","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":322,"url":"https://www.google.com/maps/place/Kave+Alimentos+S.+de+R.L.+de+C.V./@32.5022801,-117.1199296,19z/data=!4m2!3m1!1s0x0000000000000000:0xc6d8b4c9fc3b1927","type":"1","place":196}]},{"id":197,"name":"Kensington Language Centers","latitud":"32.5226186","longitude":"-117.1111947","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":155,"url":"https://www.dropbox.com/s/o0czvmaws179sop/kensington-language-centers.jpg?dl=0","type":"COVER","place":197}],"link_set":[{"id":323,"url":"https://www.google.com/maps/place/Kensington+Language+Centers/@32.5226186,-117.1111947,19z/data=!4m2!3m1!1s0x0000000000000000:0xbda8c1585b35c1ae","type":"1","place":197},{"id":324,"url":"https://www.facebook.com/kensingtonlc/","type":"2","place":197}]},{"id":198,"name":"KFC","latitud":"32.5322595","longitude":"-117.1144346","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":156,"url":"https://www.dropbox.com/s/8wz90h8bepn8jxu/kfc.png?dl=0","type":"COVER","place":198}],"link_set":[{"id":325,"url":"https://www.google.com/maps/place/KFC/@32.5322595,-117.1144346,20z/data=!4m2!3m1!1s0x0000000000000000:0x34b9728016d4b731","type":"1","place":198},{"id":326,"url":"https://foursquare.com/v/kfc/4f1f2c8ae4b0512edd5aefc0","type":"4","place":198},{"id":327,"url":"http://www.kfc.com.mx/","type":"3","place":198}]},{"id":199,"name":"Casa de Los Alambres El Gallo","latitud":"32.5197526","longitude":"-117.1168247","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":55,"url":"https://www.dropbox.com/s/zk7mt8z64v0uscw/casa-de-los-alambres-el-gallo.png?dl=0","type":"COVER","place":199}],"link_set":[{"id":328,"url":"https://www.google.com/maps/place/La+Casa+de+Los+Alambres+El+Gallo/@32.5197526,-117.1168247,20z/data=!4m2!3m1!1s0x0000000000000000:0x87ab00f5d56da40b","type":"1","place":199}]},{"id":200,"name":"La casa del bisquet","latitud":"32.524585","longitude":"-117.119413","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":157,"url":"https://www.dropbox.com/s/upah70mbfnk747z/la-casa-del-bisquet.jpg?dl=0","type":"COVER","place":200}],"link_set":[{"id":329,"url":"https://www.google.com/maps/place/La+casa+del+bisquet/@32.524585,-117.119413,19z/data=!4m2!3m1!1s0x0000000000000000:0x669940eabfc47c3c","type":"1","place":200},{"id":330,"url":"https://foursquare.com/v/la-casa-del-bisquet/52c0e03f498e37ca60028c3f","type":"4","place":200},{"id":331,"url":"https://www.facebook.com/lacasadelbisquet?rf=1430103377221451","type":"2","place":200}]},{"id":201,"name":"La Casa del Delineado, Paraiso Keren","latitud":"32.5339792","longitude":"-117.1177546","code":"","categories":[{"id":5,"name":"Belleza"}],"status":5,"image_set":[],"link_set":[{"id":332,"url":"https://www.google.com/maps/place/La+Casa+del+Delineado,+Paraiso+Keren/@32.5339792,-117.1177546,19z/data=!4m2!3m1!1s0x0000000000000000:0x095b4e1672aee8b3","type":"1","place":201}]},{"id":202,"name":"La Casa del Maestro Distribuidora","latitud":"32.5238159","longitude":"-117.1112229","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":333,"url":"https://www.google.com/maps/place/La+Casa+del+Maestro+Distribuidora/@32.5238159,-117.1112229,19z/data=!4m2!3m1!1s0x0000000000000000:0xe6d9e818b72f76b5","type":"1","place":202}]},{"id":203,"name":"La Cerve","latitud":"32.5321784","longitude":"-117.123199","code":"","categories":[{"id":2,"name":"Bar"}],"status":1,"image_set":[{"id":160,"url":"https://www.dropbox.com/s/g969ibh9r6qxb33/la-cerve-del-mar.jpg?dl=0","type":"COVER","place":203}],"link_set":[{"id":334,"url":"https://www.google.com/maps/place/La+Cerve/@32.5321784,-117.123199,18z/data=!4m2!3m1!1s0x0000000000000000:0x880de46041ccd1da","type":"1","place":203},{"id":335,"url":"https://foursquare.com/v/la-cerve-playas/54d5ab4b498e5cbf0a0ad150","type":"4","place":203},{"id":336,"url":"https://www.facebook.com/lacerveplayas/","type":"2","place":203}]},{"id":204,"name":"La Cerve","latitud":"32.5286461","longitude":"-117.1226732","code":"","categories":[{"id":2,"name":"Bar"}],"status":1,"image_set":[{"id":159,"url":"https://www.dropbox.com/s/g969ibh9r6qxb33/la-cerve-del-mar.jpg?dl=0","type":"COVER","place":204}],"link_set":[{"id":337,"url":"https://www.google.com/maps/place/La+Cerve/@32.5286461,-117.1226732,18z/data=!4m2!3m1!1s0x0000000000000000:0x4b665a7eec6e8784","type":"1","place":204},{"id":338,"url":"https://foursquare.com/v/la-cerve-playas/54d5ab4b498e5cbf0a0ad150","type":"4","place":204}]},{"id":205,"name":"La Cocina de DoÃ±a Chuy","latitud":"32.5310031","longitude":"-117.11688","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":339,"url":"https://www.google.com/maps/place/La+Cocina+de+Do%C3%B1a+Chuy/@32.5310031,-117.116881,19z/data=!4m2!3m1!1s0x0000000000000000:0xbfb25109a6cbcf4a","type":"1","place":205}]},{"id":206,"name":"La Cocina del Chef","latitud":"32.5260809","longitude":"-117.1133024","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":161,"url":"https://www.dropbox.com/s/ya99slzk8za7m89/la-cocina-del-chef.png?dl=0","type":"COVER","place":206}],"link_set":[{"id":340,"url":"https://www.google.com/maps/place/La+Cocina+del+Chef/@32.5260809,-117.1133024,19z/data=!4m2!3m1!1s0x0000000000000000:0x4fce0f0c65048fb0","type":"1","place":206}]},{"id":207,"name":"La Cosecha Granos y Semillas","latitud":"32.521956","longitude":"-117.116358","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":162,"url":"https://www.dropbox.com/s/3b27g5r8mwyg4so/la-cosecha-granos-y-semillas.jpg?dl=0","type":"COVER","place":207}],"link_set":[{"id":341,"url":"https://www.google.com/maps/place/La+Cosecha+Granos+y+Semillas/@32.521956,-117.116358,19z/data=!4m2!3m1!1s0x0000000000000000:0x671075738d580332","type":"1","place":207},{"id":342,"url":"https://www.facebook.com/La-Cosecha-Granos-y-Semillas-203369663069040/info/?tab=overview","type":"2","place":207}]},{"id":208,"name":"La Esquina","latitud":"32.5335985","longitude":"-117.12338","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":343,"url":"https://www.google.com/maps/place/La+Esquina/@32.5335985,-117.123386,19z/data=!4m2!3m1!1s0x0000000000000000:0x613af51e32274eeb","type":"1","place":208}]},{"id":209,"name":"La Michoacana No 1","latitud":"32.530003","longitude":"-117.1227376","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":165,"url":"https://www.dropbox.com/s/dhoy92aag4n5guw/la-michoacana-no-1.png?dl=0","type":"COVER","place":209}],"link_set":[{"id":344,"url":"https://www.google.com/maps/place/La+Michoacana+No+1/@32.530003,-117.1227376,18z/data=!4m2!3m1!1s0x0000000000000000:0x16ef45669e0abc42","type":"1","place":209}]},{"id":210,"name":"La Perla Bahia","latitud":"32.5188214","longitude":"-117.121030","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":166,"url":"https://www.dropbox.com/s/pmzwd8n943bfqh2/la-perla.png?dl=0","type":"COVER","place":210}],"link_set":[{"id":345,"url":"https://www.google.com/maps/place/La+Perla+Bahia/@32.5188214,-117.1210304,19z/data=!4m2!3m1!1s0x0000000000000000:0x28eb87b7e45cd167","type":"1","place":210}]},{"id":211,"name":"La playita Jugos y licuados","latitud":"32.5264066","longitude":"-117.1155367","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":167,"url":"https://www.dropbox.com/s/53i81tqwg50hw3z/la-playita-jugos-y-licuados.jpg?dl=0","type":"COVER","place":211}],"link_set":[{"id":346,"url":"https://www.google.com/maps/place/La+playita+Jugos+y+licuados/@32.5264066,-117.1155367,18z/data=!4m2!3m1!1s0x0000000000000000:0x7caa7ecbd0b72b68","type":"1","place":211},{"id":347,"url":"http://laplayita.com.mx/","type":"3","place":211},{"id":348,"url":"https://www.facebook.com/laplayitatj/?fref=ts","type":"2","place":211}]},{"id":212,"name":"La Posada Restaurante","latitud":"32.5221234","longitude":"-117.1191799","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":168,"url":"https://www.dropbox.com/s/xv5vf2z09gbnupk/la-posada-restaurante.jpg?dl=0","type":"COVER","place":212}],"link_set":[{"id":349,"url":"https://www.google.com/maps/place/La+Posada/@32.5221234,-117.1191799,18z/data=!4m2!3m1!1s0x0000000000000000:0xc6dfe9d9587f124c","type":"1","place":212},{"id":350,"url":"https://www.facebook.com/laposadarestaurante","type":"2","place":212}]},{"id":213,"name":"La Puntada TELAS Y REGALOS","latitud":"32.5242502","longitude":"-117.112682","code":"","categories":[{"id":4,"name":"Tienda"}],"status":5,"image_set":[],"link_set":[{"id":351,"url":"https://www.google.com/maps/place/La+Puntada+TELAS+Y+REGALOS/@32.5242502,-117.112682,19z/data=!4m2!3m1!1s0x0000000000000000:0x403a94994e5942fb","type":"1","place":213}]},{"id":214,"name":"LA ROSITA DE MICHOACAN","latitud":"32.5178219","longitude":"-117.1159963","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":169,"url":"https://www.dropbox.com/s/fs526ud4h7xp8c2/la-rosita-de-michoacan.png?dl=0","type":"COVER","place":214}],"link_set":[{"id":352,"url":"https://www.google.com/maps/place/LA+ROSITA+DE+MICHOACAN/@32.5178219,-117.1159963,20z/data=!4m2!3m1!1s0x0000000000000000:0x4af710d78b37333f","type":"1","place":214}]},{"id":215,"name":"LA TAPATIA","latitud":"32.5146295","longitude":"-117.1200049","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":170,"url":"https://www.dropbox.com/s/ftbcmwpwi819rfc/la-tapatia.jpg?dl=0","type":"COVER","place":215}],"link_set":[{"id":353,"url":"https://www.google.com/maps/place/LA+TAPATIA/@32.5146295,-117.1200049,20z/data=!4m2!3m1!1s0x0000000000000000:0xe2514ac0a9686a98","type":"1","place":215}]},{"id":216,"name":"La Tostadora de Playas de Tijuana","latitud":"32.5165294","longitude":"-117.112256","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":171,"url":"https://www.dropbox.com/s/pmofwffbv14umuc/la-tostadora-de-playas-de-tijuana.png?dl=0","type":"COVER","place":216}],"link_set":[{"id":354,"url":"https://www.google.com/maps/place/La+Tostadora+de+Playas+de+Tijuana/@32.5165294,-117.112256,19z/data=!4m2!3m1!1s0x0000000000000000:0x969783cabc9fadbf","type":"1","place":216},{"id":355,"url":"https://www.facebook.com/latostadoradeplayasdetijuana/","type":"2","place":216}]},{"id":217,"name":"Laboratorios KEM, S de R.L. de C.V","latitud":"32.5028298","longitude":"-117.1203158","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":172,"url":"https://www.dropbox.com/s/tt9mwm594ezsowh/laboratorios-kem.png?dl=0","type":"COVER","place":217}],"link_set":[{"id":356,"url":"https://www.google.com/maps/place/Laboratorios+Kem+S.+de+R.L.+de+C.V./@32.5028298,-117.1203158,18z/data=!4m2!3m1!1s0x0000000000000000:0x1b8b1bad3e3131fc","type":"1","place":217},{"id":357,"url":"http://mx.kompass.com/c/laboratorios-kem-s-de-r-l-de-c-v/mx017649/","type":"3","place":217},{"id":358,"url":"https://www.facebook.com/Laboratorios-KEM-131565156929677/?fref=ts","type":"2","place":217}]},{"id":218,"name":"Laihoos Bisquets","latitud":"32.5174838","longitude":"-117.1137929","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":173,"url":"https://www.dropbox.com/s/emc752njkx7h5lu/laihoos-bisquets.jpg?dl=0","type":"COVER","place":218}],"link_set":[{"id":359,"url":"https://www.google.com/maps/place/Laihoos+Bisquets/@32.5174838,-117.1137929,19z/data=!4m2!3m1!1s0x0000000000000000:0xe48a6b7d496e5fa1","type":"1","place":218},{"id":360,"url":"https://foursquare.com/v/laihoos-cafe/4ebebea5cc212562acb618cb","type":"4","place":218},{"id":361,"url":"https://www.facebook.com/Laihoos/","type":"2","place":218}]},{"id":219,"name":"Las AmÃ©ricas PrimarÃ­a Federal","latitud":"32.5225259","longitude":"-117.1104196","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":174,"url":"https://www.dropbox.com/s/sxnuyiksuxu30e0/las-americas-primaria.png?dl=0","type":"COVER","place":219}],"link_set":[{"id":362,"url":"https://www.google.com/maps/place/Las+Am%C3%A9ricas+Primar%C3%ADa+Federal/@32.5225259,-117.1104196,19z/data=!4m2!3m1!1s0x0000000000000000:0x482b84c22ff19dc5","type":"1","place":219}]},{"id":220,"name":"Las Crepas Cafe","latitud":"32.5242343","longitude":"-117.1169253","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":176,"url":"https://www.dropbox.com/s/40em6z4o9cs80iu/las-crepas-cafe.jpg?dl=0","type":"COVER","place":220},{"id":175,"url":"https://www.dropbox.com/s/wxybzelytb3bt4j/las-crepas-cafe-playas.jpg?dl=0","type":"COVER","place":220}],"link_set":[{"id":363,"url":"https://www.google.com/maps/place/Las+Crepas+Cafe/@32.5242343,-117.1169253,19z/data=!4m2!3m1!1s0x0000000000000000:0x7984ee5609fa9b65","type":"1","place":220},{"id":364,"url":"https://www.facebook.com/lecreperie/?rc=p","type":"2","place":220}]},{"id":221,"name":"Latina Farmacia Infonavit Rio","latitud":"32.5128857","longitude":"-117.1207832","code":"","categories":[{"id":6,"name":"Salud"}],"status":5,"image_set":[],"link_set":[{"id":365,"url":"https://www.google.com/maps/place/Latina+Farmacia+Infonavit+Rio/@32.5128857,-117.1207832,20z/data=!4m2!3m1!1s0x0000000000000000:0x7d30a6214c603e7c","type":"1","place":221}]},{"id":222,"name":"LavamÃ¡tica Agua Azul","latitud":"32.5299617","longitude":"-117.1195579","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":177,"url":"https://www.dropbox.com/s/sb873cgrrqzb8mr/lavamatica-agua-azul.png?dl=0","type":"COVER","place":222}],"link_set":[{"id":366,"url":"https://www.google.com/maps/place/Lavam%C3%A1tica+Agua+Azul/@32.5299617,-117.1195579,20z/data=!4m2!3m1!1s0x0000000000000000:0xb5ba34a63ef31bf3","type":"1","place":222}]},{"id":223,"name":"Le Petit Spa","latitud":"32.5257055","longitude":"-117.1132059","code":"","categories":[{"id":5,"name":"Belleza"}],"status":5,"image_set":[],"link_set":[{"id":367,"url":"https://www.google.com/maps/place/Le+Petit+Spa/@32.5257055,-117.1132059,19z/data=!4m2!3m1!1s0x0000000000000000:0x8e13ed8a5b1ebb17","type":"1","place":223},{"id":368,"url":"https://www.facebook.com/lepetiteplayas","type":"2","place":223}]},{"id":224,"name":"Le Petite Latte","latitud":"32.5308478","longitude":"-117.1141972","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":178,"url":"https://www.dropbox.com/s/kg57wb5koex4ope/le-petite-latte.jpg?dl=0","type":"COVER","place":224}],"link_set":[{"id":369,"url":"https://www.google.com/maps/place/Le+Petite+Latte/@32.5308478,-117.1141972,20z/data=!4m2!3m1!1s0x0000000000000000:0xa95698528c6efc8b","type":"1","place":224},{"id":370,"url":"https://www.facebook.com/LePetiteLatteTj/","type":"2","place":224}]},{"id":225,"name":"Licoreria Orendain","latitud":"32.513995","longitude":"-117.1207076","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":356,"url":"https://www.dropbox.com/s/hjksz0y7u9sd0uz/mini-market-orendain.png?dl=0","type":"COVER","place":225}],"link_set":[{"id":371,"url":"https://www.google.com/maps/place/Licoreria+Orendain/@32.513995,-117.1207076,20z/data=!4m2!3m1!1s0x0000000000000000:0xa776b8f55562e038","type":"1","place":225}]},{"id":226,"name":"LifeStyle Hostel","latitud":"32.5286461","longitude":"-117.1226732","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":357,"url":"https://www.dropbox.com/s/zcsgbzxby00cbds/life-style-hostel.png?dl=0","type":"COVER","place":226}],"link_set":[{"id":372,"url":"https://www.google.com/maps/place/LifeStyle+Hostel/@32.5286461,-117.1226732,18z/data=!4m2!3m1!1s0x0000000000000000:0xd575fc94e9f7ffaf","type":"1","place":226}]},{"id":227,"name":"Little Caesars Pizza","latitud":"32.5311497","longitude":"-117.1136742","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":179,"url":"https://www.dropbox.com/s/bn31dw5nxzwdk9d/little-caesars.jpg?dl=0","type":"COVER","place":227}],"link_set":[{"id":373,"url":"https://www.google.com/maps/place/Little+Caesars+Pizza/@32.5311497,-117.1136742,19z/data=!4m2!3m1!1s0x0000000000000000:0xc40d387b825ff5dc","type":"1","place":227},{"id":374,"url":"https://foursquare.com/explore?mode=url&near=Tijuana%2C%20BCN&nearGeoId=72057594041909545","type":"4","place":227},{"id":375,"url":"http://littlecaesars.com.mx/Localizador/Detalles/tabid/3003/s/Baja%20California/Default.aspx?id=NDEyMTAwMDY%3D","type":"2","place":227}]},{"id":228,"name":"LLANTERA GARCIA","latitud":"32.5236184","longitude":"-117.1190967","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":180,"url":"https://www.dropbox.com/s/388wz3fr4thn6oe/llantera-garcia.png?dl=0","type":"COVER","place":228}],"link_set":[{"id":376,"url":"https://www.google.com/maps/place/LLANTERA+GARCIA/@32.5236184,-117.1190967,19z/data=!4m2!3m1!1s0x0000000000000000:0xd62f9b75a9a5d9af","type":"1","place":228}]},{"id":229,"name":"Taller y Llantera Espinoza","latitud":"32.5127726","longitude":"-117.1200442","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":305,"url":"https://www.dropbox.com/s/1477jivnfnm6wbw/taller-espinoza.png?dl=0","type":"COVER","place":229}],"link_set":[{"id":377,"url":"https://www.google.com/maps/place/Llantera+y+Taller+Espiniza/@32.5127726,-117.1200442,20z/data=!4m2!3m1!1s0x0000000000000000:0x75ae282c0158c214","type":"1","place":229}]},{"id":230,"name":"Lopez Torres, Olivia","latitud":"32.5116654","longitude":"-117.1207","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":378,"url":"https://www.google.com/maps/place/Lopez+Torres,+Olivia/@32.5116654,-117.1207,20z/data=!4m2!3m1!1s0x0000000000000000:0x668c82c408bc72b0","type":"1","place":230}]},{"id":231,"name":"Lorimar Bienes Raices","latitud":"32.5279962","longitude":"-117.1159447","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":181,"url":"https://www.dropbox.com/s/5z8gu53dhfv1jif/lorimar-bienes-raices.jpg?dl=0","type":"COVER","place":231}],"link_set":[{"id":379,"url":"https://www.google.com/maps/place/Lorimar+Bienes+Raices/@32.5279962,-117.1159447,20z/data=!4m2!3m1!1s0x0000000000000000:0x80e5878d4a061bed","type":"1","place":231},{"id":380,"url":"http://lorimarbienesraices.com/","type":"3","place":231},{"id":381,"url":"https://www.facebook.com/lorimarbienesraices?fref=ts","type":"2","place":231}]},{"id":232,"name":"Los Alamos CARNICERIA","latitud":"32.5310031","longitude":"-117.116881","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":182,"url":"https://www.dropbox.com/s/du5hqpkwpjjozw0/los-alamos-carniceria.png?dl=0","type":"COVER","place":232}],"link_set":[{"id":382,"url":"https://www.google.com/maps/place/Los+Alamos+CARNICERIA/@32.5310031,-117.116881,19z/data=!4m2!3m1!1s0x0000000000000000:0x9f9eb2035fb9d543","type":"1","place":232}]},{"id":234,"name":"Los Famosos TAMALES de Tijuana","latitud":"32.5286567","longitude":"-117.1124729","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":184,"url":"https://www.dropbox.com/s/672ul4rv3dd0xon/los-famosos-tamales-de-tijuana.png?dl=0","type":"COVER","place":234}],"link_set":[{"id":384,"url":"https://www.google.com/maps/place/Los+Famosos+TAMALES+de+Tijuana/@32.5286567,-117.1124729,21z/data=!4m2!3m1!1s0x0000000000000000:0xc3287c47d3d96d50","type":"1","place":234}]},{"id":235,"name":"Casa Loveland","latitud":"32.5310197","longitude":"-117.1150649","code":"","categories":[{"id":5,"name":"Belleza"}],"status":1,"image_set":[{"id":54,"url":"https://www.dropbox.com/s/otnut3b6zp2ia8p/casa-loveland.jpg?dl=0","type":"COVER","place":235}],"link_set":[{"id":385,"url":"https://www.google.com/maps/place/Loveland+Boutique/@32.5310197,-117.1150649,19z/data=!4m2!3m1!1s0x0000000000000000:0x7739c87a5adf6aae","type":"1","place":235},{"id":386,"url":"http://www.tiendaloveland.com/","type":"3","place":235},{"id":387,"url":"https://www.facebook.com/CasaLoveland/","type":"2","place":235}]},{"id":236,"name":"LÃºmina Foto-CafÃ©","latitud":"32.5150411","longitude":"-117.1163624","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":185,"url":"https://www.dropbox.com/s/w1dybn5ietjotjs/lumina-foto-cafe.jpg?dl=0","type":"COVER","place":236}],"link_set":[{"id":388,"url":"https://www.google.com/maps/place/L%C3%BAmina+Foto-Caf%C3%A9/@32.5150411,-117.1163624,19z/data=!4m2!3m1!1s0x0000000000000000:0xd466b47a0117fcec","type":"1","place":236},{"id":389,"url":"https://foursquare.com/v/l%C3%BAmina-foto-caf%C3%A9/53532558498eea1b80c33db7","type":"4","place":236},{"id":390,"url":"https://www.facebook.com/luminafotocafe","type":"2","place":236}]},{"id":237,"name":"LunaSol Lounge y Restaurante Antojitos Colombianos","latitud":"32.530003","longitude":"-117.1227376","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":391,"url":"https://www.google.com/maps/place/LunaSol+Lounge+y+Restaurante+Antojitos+Colombianos/@32.530003,-117.1227376,18z/data=!4m2!3m1!1s0x0000000000000000:0x325a1814407ff055","type":"1","place":237},{"id":392,"url":"https://www.facebook.com/LunasolLounge","type":"2","place":237}]},{"id":238,"name":"Lung Mon Playas","latitud":"32.5306172","longitude":"-117.1149523","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":186,"url":"https://www.dropbox.com/s/ir69aunfrs3hihl/lung-mon-playas.jpg?dl=0","type":"COVER","place":238}],"link_set":[{"id":393,"url":"https://www.google.com/maps/place/Lung+Mon+Playas/@32.5306172,-117.1149523,19z/data=!4m2!3m1!1s0x0000000000000000:0xe71d3d9b76e9e946","type":"1","place":238},{"id":394,"url":"https://foursquare.com/v/restaurant-lung-mon/4d3217d1329e5481493ead1d","type":"4","place":238},{"id":395,"url":"https://www.facebook.com/Lung-Mon-Playas-257820504257432/","type":"2","place":238}]},{"id":239,"name":"MactopÃ­a","latitud":"32.5290643","longitude":"-117.1200904","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":187,"url":"https://www.dropbox.com/s/o8k9if0nyhrapdt/mactopia.jpg?dl=0","type":"COVER","place":239}],"link_set":[{"id":396,"url":"https://www.google.com/maps/place/Mactopia/@32.5290643,-117.1200904,21z/data=!4m2!3m1!1s0x0000000000000000:0x070999c6d448fbd8","type":"1","place":239},{"id":397,"url":"https://www.facebook.com/mactopiacentro/?ref=ts&fref=ts","type":"2","place":239}]},{"id":240,"name":"Mamamia Pizza","latitud":"32.5192539","longitude":"-117.115969","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":188,"url":"https://www.dropbox.com/s/9uxndzjm0gr6kw8/mamamia.png?dl=0","type":"COVER","place":240}],"link_set":[{"id":398,"url":"https://www.google.com/maps/place/Mamamia+Pizza/@32.5192539,-117.115969,20z/data=!4m2!3m1!1s0x0000000000000000:0x342cd82107ab2b1e","type":"1","place":240},{"id":399,"url":"http://www.mamamiapizza.com.mx/pages/mamamiapizza.php","type":"3","place":240}]},{"id":241,"name":"Mariscos El Faro","latitud":"32.5337699","longitude":"-117.1250188","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":189,"url":"https://www.dropbox.com/s/subesnf7l1ji1hu/mariscos-el-faro.jpg?dl=0","type":"COVER","place":241}],"link_set":[{"id":400,"url":"https://www.google.com.mx/maps/place/Mariscos+El+Faro/@32.5337699,-117.1250188,17z/data=!3m1!4b1!4m2!3m1!1s0x80d94ba1b71f894f:0xfd0da02ed895f8e0","type":"1","place":241},{"id":401,"url":"https://www.facebook.com/Mariscos-el-faro-372950992836669/","type":"2","place":241}]},{"id":242,"name":"Mariscos Rubios","latitud":"32.5194275","longitude":"-117.1198743","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":190,"url":"https://www.dropbox.com/s/v57tul5sewimj6k/mariscos-rubios.jpg?dl=0","type":"COVER","place":242}],"link_set":[{"id":402,"url":"https://www.google.com/maps/place/Mariscos+Rubios/@32.5194275,-117.1198743,19z/data=!4m2!3m1!1s0x0000000000000000:0x66747dd4961ed94a","type":"1","place":242},{"id":403,"url":"https://foursquare.com/v/mariscos-rubios/520c69b38bbdc2d417771c99","type":"4","place":242},{"id":404,"url":"https://www.facebook.com/MariscosRubios/","type":"2","place":242}]},{"id":243,"name":"Marks burgers","latitud":"32.5325362","longitude":"-117.1188618","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":191,"url":"https://www.dropbox.com/s/9eq8yrbx04xl8df/marks-burgers.jpg?dl=0","type":"COVER","place":243}],"link_set":[{"id":405,"url":"https://www.google.com/maps/place/Marks+burgers/@32.5325362,-117.1188618,19z/data=!4m2!3m1!1s0x0000000000000000:0x386d676ffe29fa95","type":"1","place":243},{"id":406,"url":"https://foursquare.com/v/marks-burgers--frappes/5189bb33498e328242f9cc8c","type":"4","place":243}]},{"id":244,"name":"Marsus Regalos y Detalles","latitud":"32.5087109","longitude":"-117.121655","code":"","categories":[{"id":4,"name":"Tienda"}],"status":5,"image_set":[],"link_set":[{"id":407,"url":"https://www.google.com/maps/place/Marsus+Regalos+y+Detalles/@32.5087109,-117.121655,19z/data=!4m2!3m1!1s0x0000000000000000:0x6e25fb8fc2f3c4c0","type":"1","place":244}]},{"id":245,"name":"Masjid Al-Islam Tijuana Beach","latitud":"32.5194275","longitude":"-117.1198743","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":358,"url":"https://www.dropbox.com/s/3z10q640akzu4a6/masjid-al-islam-tijuana.jpg?dl=0","type":"COVER","place":245}],"link_set":[{"id":408,"url":"https://www.google.com/maps/place/Masjid+Al-Islam+Tijuana+Beach/@32.5194275,-117.1198743,19z/data=!4m2!3m1!1s0x0000000000000000:0x92f3cf16dda921a9","type":"1","place":245}]},{"id":246,"name":"Materiales Educativos Internacionales Medi","latitud":"32.5197628","longitude":"-117.1137173","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":193,"url":"https://www.dropbox.com/s/d8qy7doj1mpz5oi/materiales-educaticos-medi.png?dl=0","type":"COVER","place":246}],"link_set":[{"id":409,"url":"https://www.google.com/maps/place/Medi+Educativos+S.A.+de+C.V./@32.5197628,-117.1137173,20z/data=!4m2!3m1!1s0x0000000000000000:0x4bb4ad20b8be2308","type":"1","place":246}]},{"id":247,"name":"MATERIALES ENSENADA","latitud":"32.5154799","longitude":"-117.1166441","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":194,"url":"https://www.dropbox.com/s/vgumssta480emhk/materiales-ensenada.png?dl=0","type":"COVER","place":247}],"link_set":[{"id":410,"url":"https://www.google.com/maps/place/MATERIALES+ENCENADA/@32.5154799,-117.1166441,19z/data=!4m2!3m1!1s0x0000000000000000:0x606b0405b40e93e7","type":"1","place":247}]},{"id":248,"name":"MENUDERIA Guadalajara","latitud":"32.5260809","longitude":"-117.1133024","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":195,"url":"https://www.dropbox.com/s/7peu1dv554y4exc/menuderia-guadalajara.jpg?dl=0","type":"COVER","place":248}],"link_set":[{"id":411,"url":"https://www.google.com/maps/place/MENUDERIA+Guadalajara/@32.5260809,-117.1133024,19z/data=!4m2!3m1!1s0x0000000000000000:0x7d98cdb6b7d88c0b","type":"1","place":248}]},{"id":249,"name":"MERCADOS EMILIA","latitud":"32.5177727","longitude":"-117.1168204","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":196,"url":"https://www.dropbox.com/s/7c0xte3srex1jdh/mercado-emilia.jpg?dl=0","type":"COVER","place":249}],"link_set":[{"id":412,"url":"https://www.google.com/maps/place/MERCADOS+EMILIA/@32.5177727,-117.1168204,20z/data=!4m2!3m1!1s0x0000000000000000:0xffca47acbe931218","type":"1","place":249}]},{"id":250,"name":"Mercedes Garage","latitud":"32.5330439","longitude":"-117.1173692","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[],"link_set":[{"id":413,"url":"https://www.google.com/maps/place/Mercedes+Garage/@32.5330439,-117.1173692,19z/data=!4m2!3m1!1s0x0000000000000000:0xd68342ea8fda0eed","type":"1","place":250}]},{"id":251,"name":"MG Fitness","latitud":"32.5154268","longitude":"-117.1199432","code":"","categories":[{"id":8,"name":"Ejercicio"}],"status":1,"image_set":[],"link_set":[{"id":414,"url":"https://www.google.com/maps/place/MG+Fitness/@32.5154268,-117.1199432,20z/data=!4m2!3m1!1s0x0000000000000000:0xecdb83cf7830c34d","type":"1","place":251}]},{"id":252,"name":"MINI MARKET DEL MAR","latitud":"32.5242343","longitude":"-117.1169253","code":"","categories":[{"id":4,"name":"Tienda"}],"status":5,"image_set":[],"link_set":[{"id":415,"url":"https://www.google.com/maps/place/MINI+MARKET+DEL+MAR/@32.5242343,-117.1169253,19z/data=!4m2!3m1!1s0x0000000000000000:0xff9882217c5d3102","type":"1","place":252}]},{"id":254,"name":"MINIMART PLAYAS","latitud":"32.5299617","longitude":"-117.1195579","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":197,"url":"https://www.dropbox.com/s/jcyjmpxe5w0jenw/minimart-playas.png?dl=0","type":"COVER","place":254}],"link_set":[{"id":417,"url":"https://www.google.com/maps/place/MINIMART+PLAYAS/@32.5299617,-117.1195579,20z/data=!4m2!3m1!1s0x0000000000000000:0x352673eb4529c9f9","type":"1","place":254}]},{"id":255,"name":"Mishiro Express","latitud":"32.5184555","longitude":"-117.1176387","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":418,"url":"https://www.google.com/maps/place/Mishiro+Express/@32.5184555,-117.1176387,20z/data=!4m2!3m1!1s0x0000000000000000:0x6eedaff93fb629a8","type":"1","place":255}]},{"id":256,"name":"Modelorama","latitud":"32.5125539","longitude":"-117.1198378","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":198,"url":"https://www.dropbox.com/s/069bj9e8arur2r5/modelorama.jpg?dl=0","type":"COVER","place":256}],"link_set":[{"id":419,"url":"https://www.google.com/maps/place/Modelorama/@32.5125539,-117.1198378,20z/data=!4m2!3m1!1s0x0000000000000000:0xbbe62769c6f7f154","type":"1","place":256}]},{"id":257,"name":"Modelorama Corona","latitud":"32.5127726","longitude":"-117.1200442","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":199,"url":"https://www.dropbox.com/s/069bj9e8arur2r5/modelorama.jpg?dl=0","type":"COVER","place":257}],"link_set":[{"id":420,"url":"https://www.google.com/maps/place/Modelorama+Corona/@32.5127726,-117.1200442,20z/data=!4m2!3m1!1s0x0000000000000000:0xa26f114d2361126e","type":"1","place":257}]},{"id":258,"name":"MOFLES Y RADIADORES NARANJO","latitud":"32.5084033","longitude":"-117.1161645","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":200,"url":"https://www.dropbox.com/s/fbvkr6sf0khu941/mofles-y-radiadores-narano.png?dl=0","type":"COVER","place":258}],"link_set":[{"id":421,"url":"https://www.google.com/maps/place/MOFLES+Y+RADIADORES+NARANJO/@32.5084033,-117.1161645,19z/data=!4m2!3m1!1s0x0000000000000000:0x013f8d0b8bad035a","type":"1","place":258},{"id":422,"url":"http://autopedia.mx/pages/directorio/28","type":"3","place":258}]},{"id":259,"name":"MOLINO COCINA A LA LEÃ‘A & CAVA","latitud":"32.5335411","longitude":"-117.1139598","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":201,"url":"https://www.dropbox.com/s/wff1vgm3fyqvhg2/molino-cocina-a-la-le%C3%B1a-%26-cava.jpg?dl=0","type":"COVER","place":259}],"link_set":[{"id":423,"url":"https://www.google.com/maps/place/MOLINO+COCINA+A+LA+LE%C3%91A+%26+CAVA/@32.5335411,-117.1139598,19z/data=!4m2!3m1!1s0x0000000000000000:0x7377fa01b99c2f8f","type":"1","place":259},{"id":424,"url":"https://foursquare.com/v/molino-cocina/4feb686ce4b0ad168d3d34bf","type":"4","place":259},{"id":425,"url":"https://www.facebook.com/MolinoCocina","type":"2","place":259}]},{"id":260,"name":"MONASTERIO NUESTRA SEÃ‘ORA DE LA SALUD","latitud":"32.5141721","longitude":"-117.1103158","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":202,"url":"https://www.dropbox.com/s/2mhgbyrq4rh5pmr/monasterio-nuestra-senora-de-la-salud.png?dl=0","type":"COVER","place":260}],"link_set":[{"id":426,"url":"https://www.google.com/maps/place/MONASTERIO+NUESTRA+SE%C3%91ORA+DE+LA+SALUD/@32.5141721,-117.1103158,20z/data=!4m2!3m1!1s0x0000000000000000:0x72cc89347548b580","type":"1","place":260}]},{"id":261,"name":"MONTE PIO DEL NOROESTE","latitud":"32.5292776","longitude":"-117.1182409","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":203,"url":"https://www.dropbox.com/s/8yjj4p59mliz1ia/monte-pio-del-noroeste.jpg?dl=0","type":"COVER","place":261}],"link_set":[{"id":427,"url":"https://www.google.com/maps/place/MONTE+PIO+DEL+NOROESTE/@32.5292776,-117.1182409,19z/data=!4m2!3m1!1s0x0000000000000000:0x8ab7355c707e1591","type":"1","place":261},{"id":428,"url":"http://www.montepioempenos.com/InformacionSucursal.aspx?ID_Suc=4","type":"3","place":261},{"id":429,"url":"https://www.facebook.com/MontePioEmpenos","type":"2","place":261}]},{"id":262,"name":"MOTEL CORTEZ","latitud":"32.5238422","longitude":"-117.1217333","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":204,"url":"https://www.dropbox.com/s/21ancta5t21rxvi/motel-cortez.png?dl=0","type":"COVER","place":262}],"link_set":[{"id":430,"url":"https://www.google.com/maps/place/MOTEL+CORTEZ/@32.5238422,-117.1217333,19z/data=!4m2!3m1!1s0x0000000000000000:0x74b107666f1c84b0","type":"1","place":262}]},{"id":263,"name":"Motel Playas Coronado","latitud":"32.530345","longitude":"-117.1176508","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":205,"url":"https://www.dropbox.com/s/8s7oz5dfeobsfot/motel-playas-de-tijuana.png?dl=0","type":"COVER","place":263}],"link_set":[{"id":431,"url":"https://www.google.com/maps/place/Motel+Playas+Coronado/@32.530345,-117.1176508,19z/data=!4m2!3m1!1s0x0000000000000000:0x44212bcba0fa063c","type":"1","place":263}]},{"id":264,"name":"Motorcar Parts De MÃ©xico, S.A. De C.V","latitud":"32.5337876","longitude":"-117.1172053","code":"","categories":[{"id":1,"name":"Autos"}],"status":5,"image_set":[],"link_set":[{"id":432,"url":"https://www.google.com/maps/place/Motorcar+Parts+De+M%C3%A9xico,+S.A.+De+C.V./@32.5337876,-117.1172053,19z/data=!4m2!3m1!1s0x0000000000000000:0x241f35e12cde4ac9","type":"1","place":264}]},{"id":265,"name":"MR. FRIES","latitud":"32.5150411","longitude":"-117.1163624","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":206,"url":"https://www.dropbox.com/s/49vmud6ccaf8wk9/Mr-fries-playas.jpg?dl=0","type":"COVER","place":265}],"link_set":[{"id":433,"url":"https://www.google.com/maps/place/MR.+FRIES/@32.5150411,-117.1163624,19z/data=!4m2!3m1!1s0x0000000000000000:0xb6b1e6bc76385748","type":"1","place":265},{"id":434,"url":"https://www.facebook.com/Mr-Fries-Playas-1400674273539915/","type":"2","place":265}]},{"id":266,"name":"Mr. WASHCAR Team","latitud":"32.5296764","longitude":"-117.1164892","code":"","categories":[{"id":1,"name":"Autos"}],"status":5,"image_set":[],"link_set":[{"id":435,"url":"https://www.google.com/maps/place/Mr.+WASHCAR+Team/@32.5296764,-117.1164892,19z/data=!4m2!3m1!1s0x0000000000000000:0x48adfa8dbb851e65","type":"1","place":266}]},{"id":267,"name":"MueblerÃ­a el Tigre","latitud":"32.5262508","longitude":"-117.122501","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":207,"url":"https://www.dropbox.com/s/wgknrqkujzzwqta/muebleria-el-tigre.png?dl=0","type":"COVER","place":267}],"link_set":[{"id":436,"url":"https://www.google.com/maps/place/Muebler%C3%ADa+el+Tigre/@32.5262508,-117.1225018,18z/data=!4m2!3m1!1s0x0000000000000000:0xa43a4b5c1e13d75e","type":"1","place":267}]},{"id":268,"name":"multicarnes","latitud":"32.5238114","longitude":"-117.1125694","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":208,"url":"https://www.dropbox.com/s/fhsmpq5ixrh2ymo/multicarnes.jpg?dl=0","type":"COVER","place":268}],"link_set":[{"id":437,"url":"https://www.google.com/maps/place/multicarnes/@32.5238114,-117.1125694,19z/data=!4m2!3m1!1s0x0000000000000000:0x90e668601adb16ca","type":"1","place":268},{"id":438,"url":"https://es.foursquare.com/v/multicarnes-playas/4d3370cdb6093704da6901e0","type":"4","place":268},{"id":439,"url":"https://www.facebook.com/MulticarnesQuadrum/?fref=ts","type":"2","place":268}]},{"id":269,"name":"MultimecÃ¡nica Castillo","latitud":"32.5131883","longitude":"-117.1198633","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":209,"url":"https://www.dropbox.com/s/q8fw4dljkaqytto/multimecanica-castillo.png?dl=0","type":"COVER","place":269}],"link_set":[{"id":440,"url":"https://www.google.com/maps/place/Multimec%C3%A1nica+Castillo/@32.5131883,-117.1198633,20z/data=!4m2!3m1!1s0x0000000000000000:0x5c062624be4e73e6","type":"1","place":269}]},{"id":270,"name":"Munchin Donuts","latitud":"32.5260809","longitude":"-117.1133024","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":210,"url":"https://www.dropbox.com/s/hg1negqrll78uzj/munchin-donuts.jpg?dl=0","type":"COVER","place":270}],"link_set":[{"id":441,"url":"https://www.google.com/maps/place/Munchin+Donuts/@32.5260809,-117.1133024,19z/data=!4m2!3m1!1s0x0000000000000000:0xa6978fd88f87dc57","type":"1","place":270},{"id":442,"url":"https://foursquare.com/v/munchin-donuts/55787b5f498e2970f3b309ed","type":"4","place":270}]},{"id":271,"name":"mundo mÃ¡gico","latitud":"32.5284097","longitude":"-117.1184717","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":211,"url":"https://www.dropbox.com/s/s8c885l52ivr0d6/mundo-magico.png?dl=0","type":"COVER","place":271}],"link_set":[{"id":443,"url":"https://www.google.com/maps/place/mundo+m%C3%A1gico/@32.5284097,-117.1184717,18z/data=!4m2!3m1!1s0x0000000000000000:0x9e421cbe1a1e03ec","type":"1","place":271}]},{"id":272,"name":"Nopal CafÃ© Playas","latitud":"32.5321784","longitude":"-117.123199","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":212,"url":"https://www.dropbox.com/s/nmgtw5tg0gbnj48/nopal-cafe-playas.jpg?dl=0","type":"COVER","place":272}],"link_set":[{"id":444,"url":"https://www.google.com/maps/place/Nopal+Caf%C3%A9+Playas/@32.5321784,-117.123199,18z/data=!4m2!3m1!1s0x0000000000000000:0x8e6ce1cca623d7e8","type":"1","place":272},{"id":445,"url":"https://foursquare.com/v/el-nopal-caf%C3%A9-playas/4eb1b61a6c25aecd46bcd40f","type":"4","place":272},{"id":446,"url":"https://www.facebook.com/cafenopal/?fref=ts","type":"2","place":272}]},{"id":273,"name":"Oasis Of Hope Hospital","latitud":"32.5313626","longitude":"-117.1190831","code":"","categories":[{"id":6,"name":"Salud"}],"status":1,"image_set":[{"id":213,"url":"https://www.dropbox.com/s/h88cdl6ku89mncb/oasis-of-hope-hospital.jpg?dl=0","type":"COVER","place":273}],"link_set":[{"id":447,"url":"https://www.google.com/maps/place/Oasis+Of+Hope+Hospital/@32.5313626,-117.1190831,19z/data=!4m2!3m1!1s0x0000000000000000:0xd97e2b667f113011","type":"1","place":273},{"id":448,"url":"http://www.oasisofhope.com/","type":"3","place":273},{"id":449,"url":"https://www.facebook.com/oasisofhopehospital/","type":"2","place":273}]},{"id":274,"name":"Office Depot","latitud":"32.5308478","longitude":"-117.1141972","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":214,"url":"https://www.dropbox.com/s/v4892cbu07trmym/office-depot.jpg?dl=0","type":"COVER","place":274}],"link_set":[{"id":450,"url":"https://www.google.com/maps/place/Office+Depot/@32.5308478,-117.1141972,20z/data=!4m2!3m1!1s0x0000000000000000:0x4915fc8fcecc1574","type":"1","place":274},{"id":451,"url":"https://foursquare.com/explore?mode=url&near=Tijuana%2C%20BCN&nearGeoId=72057594041909545","type":"4","place":274},{"id":452,"url":"https://www.officedepot.com.mx/","type":"3","place":274}]},{"id":275,"name":"OLYMPO","latitud":"32.5168635","longitude":"-117.1167212","code":"","categories":[{"id":8,"name":"Ejercicio"}],"status":1,"image_set":[{"id":215,"url":"https://www.dropbox.com/s/tnfyp71mhqr3g3u/olympo.jpg?dl=0","type":"COVER","place":275}],"link_set":[{"id":453,"url":"https://www.google.com/maps/place/OLYMPO/@32.5168635,-117.1167212,20z/data=!4m2!3m1!1s0x0000000000000000:0x419c8aebeb6c637b","type":"1","place":275},{"id":454,"url":"https://foursquare.com/v/olympo-raquetbol--spa/4e624b2a8877954de81ff17a","type":"4","place":275},{"id":455,"url":"https://www.facebook.com/Olympo-Spa-Racquetball-186183284736548/timeline/","type":"2","place":275}]},{"id":276,"name":"Origenes Cafe y Restaurante Colombiano","latitud":"32.5305586","longitude":"-117.1208502","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":216,"url":"https://www.dropbox.com/s/27iux2r6felnopd/origenes-cafe-restaurante-colombiano.jpg?dl=0","type":"COVER","place":276}],"link_set":[{"id":456,"url":"https://www.google.com/maps/place/Origenes+Cafe+y+Restaurante+Colombiano/@32.5305586,-117.1208502,19z/data=!4m2!3m1!1s0x0000000000000000:0x13c65805307a957d","type":"1","place":276},{"id":457,"url":"http://restauranteorigenes.com.mx/galleries/colombia/","type":"3","place":276},{"id":458,"url":"https://www.facebook.com/rinconcolombianoenplayasdetijuana","type":"2","place":276}]},{"id":277,"name":"Orozco Servicio Automotriz","latitud":"32.5173475","longitude":"-117.1168137","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":217,"url":"https://www.dropbox.com/s/b5ew59qzq3ubmn2/orozco-servicio-automotriz.png?dl=0","type":"COVER","place":277}],"link_set":[{"id":459,"url":"https://www.google.com/maps/place/Orozco+Servicio+Automotriz/@32.5173475,-117.1168137,20z/data=!4m2!3m1!1s0x0000000000000000:0x334ed60b50244144","type":"1","place":277}]},{"id":278,"name":"OXXO","latitud":"32.5313626","longitude":"-117.1190831","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":222,"url":"https://www.dropbox.com/s/41nv6ovxpuz4u29/oxxo.png?dl=0","type":"COVER","place":278}],"link_set":[{"id":460,"url":"https://www.google.com/maps/place/OXXO/@32.5313626,-117.1190831,19z/data=!4m2!3m1!1s0x0000000000000000:0x843cc43d8794a7bb","type":"1","place":278},{"id":461,"url":"https://foursquare.com/v/oxxo-monumental-playas-de-tijuana/4d0703ace350b60cdf789042","type":"4","place":278}]},{"id":279,"name":"oxxo","latitud":"32.5335857","longitude":"-117.1168185","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":218,"url":"https://www.dropbox.com/s/41nv6ovxpuz4u29/oxxo.png?dl=0","type":"COVER","place":279}],"link_set":[{"id":462,"url":"https://www.google.com/maps/place/oxxo/@32.5335857,-117.1168185,19z/data=!4m2!3m1!1s0x0000000000000000:0xdce8df35f7093519","type":"1","place":279}]},{"id":280,"name":"OXXO","latitud":"32.5326903","longitude":"-117.1149227","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":221,"url":"https://www.dropbox.com/s/41nv6ovxpuz4u29/oxxo.png?dl=0","type":"COVER","place":280}],"link_set":[{"id":463,"url":"https://www.google.com/maps/place/OXXO/@32.5326903,-117.1149227,20z/data=!4m2!3m1!1s0x0000000000000000:0x1735161a31075040","type":"1","place":280}]},{"id":281,"name":"OXXO","latitud":"32.5158689","longitude":"-117.1127897","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":220,"url":"https://www.dropbox.com/s/41nv6ovxpuz4u29/oxxo.png?dl=0","type":"COVER","place":281}],"link_set":[{"id":464,"url":"https://www.google.com/maps/place/OXXO/@32.5158689,-117.1127897,19z/data=!4m2!3m1!1s0x0000000000000000:0x431b383166a3a8ea","type":"1","place":281}]},{"id":282,"name":"Oxxo","latitud":"32.5116654","longitude":"-117.1207","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":219,"url":"https://www.dropbox.com/s/41nv6ovxpuz4u29/oxxo.png?dl=0","type":"COVER","place":282}],"link_set":[{"id":465,"url":"https://www.google.com/maps/place/Oxxo/@32.5116654,-117.1207,20z/data=!4m2!3m1!1s0x0000000000000000:0x7e4af67c5de057f4","type":"1","place":282}]},{"id":283,"name":"Oxxo Drive-Thru","latitud":"32.5251504","longitude":"-117.1195284","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":223,"url":"https://www.dropbox.com/s/41nv6ovxpuz4u29/oxxo.png?dl=0","type":"COVER","place":283}],"link_set":[{"id":466,"url":"https://www.google.com/maps/place/Oxxo+Drive-Thru/@32.5251504,-117.1195284,19z/data=!4m2!3m1!1s0x0000000000000000:0x5c5a0d6dcb120ccd","type":"1","place":283}]},{"id":284,"name":"Oxxo Mercado Paseo Playas","latitud":"32.5155726","longitude":"-117.1197206","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":224,"url":"https://www.dropbox.com/s/41nv6ovxpuz4u29/oxxo.png?dl=0","type":"COVER","place":284}],"link_set":[{"id":467,"url":"https://www.google.com/maps/place/Oxxo+Mercado+Paseo+Playas/@32.5155726,-117.1197206,19z/data=!4m2!3m1!1s0x0000000000000000:0xffb4313f1ef1697b","type":"1","place":284}]},{"id":285,"name":"Oxxo Mercado Picacho","latitud":"32.5260266","longitude":"-117.1115027","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":225,"url":"https://www.dropbox.com/s/41nv6ovxpuz4u29/oxxo.png?dl=0","type":"COVER","place":285}],"link_set":[{"id":468,"url":"https://www.google.com/maps/place/Oxxo+Mercado+Picacho/@32.5260266,-117.1115027,18z/data=!4m2!3m1!1s0x0000000000000000:0x883208f56a9ca172","type":"1","place":285}]},{"id":286,"name":"Oxxo Pedregal","latitud":"32.5197096","longitude":"-117.1122327","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":226,"url":"https://www.dropbox.com/s/41nv6ovxpuz4u29/oxxo.png?dl=0","type":"COVER","place":286}],"link_set":[{"id":469,"url":"https://www.google.com/maps/place/Oxxo+Pedregal/@32.5197096,-117.1122327,20z/data=!4m2!3m1!1s0x0000000000000000:0x63eff8a66ba3c46f","type":"1","place":286},{"id":470,"url":"https://foursquare.com/v/oxxo-playas-pedregal/4cd7a1ad3ec4b1f7298aba3f","type":"4","place":286}]},{"id":287,"name":"PanaderÃ­a Integral \"La Alegria\"","latitud":"32.5238273","longitude":"-117.1163889","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":227,"url":"https://www.dropbox.com/s/idq0168syvwhusz/panaderia-integral-la-alegria.png?dl=0","type":"COVER","place":287}],"link_set":[{"id":471,"url":"https://www.google.com/maps/place/Panader%C3%ADa+Integral+%22La+Alegria%22/@32.5238273,-117.1163889,19z/data=!4m2!3m1!1s0x0000000000000000:0x08f04ff35a4686cb","type":"1","place":287}]},{"id":288,"name":"PanaderÃ­a y Pasteleria Denisse","latitud":"32.5177727","longitude":"-117.1168204","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":229,"url":"https://www.dropbox.com/s/wli2rhl9jvn052b/panader%C3%ADa-y-pasteleria-denisse.png?dl=0","type":"COVER","place":288}],"link_set":[{"id":472,"url":"https://www.google.com/maps/place/Panader%C3%ADa+y+Pasteleria+Denisse/@32.5177727,-117.1168204,20z/data=!4m2!3m1!1s0x0000000000000000:0x2c00b826ef8559f6","type":"1","place":288}]},{"id":289,"name":"PAPELERÃA INTERNET VIDEOJUEGOS ANDROMEDA","latitud":"32.5150411","longitude":"-117.1163624","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":359,"url":"https://www.dropbox.com/s/v07aftelw05nuz0/internet-y-papeleria-andromeda.png?dl=0","type":"COVER","place":289}],"link_set":[{"id":473,"url":"https://www.google.com/maps/place/PAPELER%C3%8DA+INTERNET+VIDEOJUEGOS+ANDROMEDA/@32.5150411,-117.1163624,19z/data=!4m2!3m1!1s0x0000000000000000:0xc739f6975e08391a","type":"1","place":289}]},{"id":290,"name":"Para Perro Y Gatos Farmacia","latitud":"32.5076252","longitude":"-117.1211709","code":"","categories":[{"id":6,"name":"Salud"}],"status":5,"image_set":[],"link_set":[{"id":474,"url":"https://www.google.com/maps/place/Para+Perro+Y+Gatos+Farmacia/@32.5076252,-117.1211709,20z/data=!4m2!3m1!1s0x0000000000000000:0x66c32569329554b1","type":"1","place":290}]},{"id":291,"name":"Parabrisastj","latitud":"32.5165983","longitude":"-117.1160567","code":"","categories":[{"id":1,"name":"Autos"}],"status":5,"image_set":[],"link_set":[{"id":475,"url":"https://www.google.com/maps/place/Parabrisastj/@32.5165983,-117.1160567,20z/data=!4m2!3m1!1s0x0000000000000000:0xb2082b874ae5dd42","type":"1","place":291}]},{"id":292,"name":"Parroquia Santa MarÃ­a Estrella del Mar","latitud":"32.5271521","longitude":"-117.1152641","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":231,"url":"https://www.dropbox.com/s/0l17aptt3xzmhq5/parroquia-santa-maria-estrella-del-mar%20.jpg?dl=0","type":"COVER","place":292}],"link_set":[{"id":476,"url":"https://www.google.com/maps/place/Parroquia+Santa+Mar%C3%ADa+Estrella+del+Mar/@32.5271521,-117.1152641,20z/data=!4m2!3m1!1s0x0000000000000000:0x9c39a137fd013264","type":"1","place":292},{"id":477,"url":"https://www.facebook.com/Parroquia-Santa-Maria-Estrella-Del-Mar-2014-723994654358658/","type":"2","place":292}]},{"id":293,"name":"PastelerÃ­a y Cafeteria Garcini's","latitud":"32.5257096","longitude":"-117.1167409","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":232,"url":"https://www.dropbox.com/s/citoc03imnhpt67/pasteler%C3%ADa-y-cafeteria-garcinis.jpg?dl=0","type":"COVER","place":293}],"link_set":[{"id":478,"url":"https://www.google.com/maps/place/Pasteler%C3%ADa+y+Cafeteria+Garcini's/@32.5257096,-117.1167409,19z/data=!4m2!3m1!1s0x0000000000000000:0x3c9cda11f8d92bd3","type":"1","place":293},{"id":479,"url":"http://pasteleriaycafeteriagarcinis.mex.tl/","type":"3","place":293}]},{"id":294,"name":"JUST FOR MEN BARBERSHOP Peluqueria","latitud":"32.526391","longitude":"-117.1214557","code":"","categories":[{"id":5,"name":"Belleza"}],"status":1,"image_set":[{"id":153,"url":"https://www.dropbox.com/s/azeekte0e3ou5us/just-for-men-barbeshop.png?dl=0","type":"COVER","place":294}],"link_set":[{"id":480,"url":"https://www.google.com/maps/place/PELUQUERIA+JUST+FOR+MEN/@32.526391,-117.1214557,19z/data=!4m2!3m1!1s0x0000000000000000:0x0549e315bae62780","type":"1","place":294}]},{"id":295,"name":"Peluqueria y Estetica EbeyB","latitud":"32.5184646","longitude":"-117.1167549","code":"","categories":[{"id":5,"name":"Belleza"}],"status":1,"image_set":[{"id":99,"url":"https://www.dropbox.com/s/c80amwn6a2zh2p3/peluqueria-y-est%C3%A9tica-ebeyb.jpg?dl=0","type":"COVER","place":295}],"link_set":[{"id":481,"url":"https://www.google.com/maps/place/Peluqueria+y+Estetica+EbeyB/@32.5184646,-117.1167549,20z/data=!4m2!3m1!1s0x0000000000000000:0x236728808fbfcd9e","type":"1","place":295},{"id":482,"url":"https://www.facebook.com/EBEYB-Peluquer%C3%ADa-Y-Est%C3%A9tica-1718248398393667/","type":"2","place":295}]},{"id":296,"name":"PEMEX-2663","latitud":"32.5133245","longitude":"-117.1203419","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":233,"url":"https://www.dropbox.com/s/hr2cdju3x1239qk/pemex.png?dl=0","type":"COVER","place":296}],"link_set":[{"id":483,"url":"https://www.google.com/maps/place/PEMEX-2663/@32.5133245,-117.1203419,20z/data=!4m2!3m1!1s0x0000000000000000:0xce770157419430f3","type":"1","place":296}]},{"id":297,"name":"PEMEX-2753","latitud":"32.5295693","longitude":"-117.1214287","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":234,"url":"https://www.dropbox.com/s/hr2cdju3x1239qk/pemex.png?dl=0","type":"COVER","place":297}],"link_set":[{"id":484,"url":"https://www.google.com/maps/place/PEMEX-2753/@32.5295693,-117.1214287,18z/data=!4m2!3m1!1s0x0000000000000000:0x4693ae635ae90676","type":"1","place":297}]},{"id":298,"name":"PeriÃ³dico Frontera Playas","latitud":"32.5241936","longitude":"-117.111349","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":360,"url":"https://www.dropbox.com/s/vrrx7my49d5iyzl/frontera.gif?dl=0","type":"COVER","place":298}],"link_set":[{"id":485,"url":"https://www.google.com/maps/place/Peri%C3%B3dico+Frontera+Playas/@32.5241936,-117.111349,18z/data=!4m2!3m1!1s0x0000000000000000:0x8d5df4fcdce22bf3","type":"2","place":298}]},{"id":299,"name":"PET DEPOT","latitud":"32.5197526","longitude":"-117.1168247","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":235,"url":"https://www.dropbox.com/s/w91zed9lxzn0iao/pet-depot.jpg?dl=0","type":"COVER","place":299}],"link_set":[{"id":486,"url":"https://www.google.com/maps/place/PET+DEPOT/@32.5197526,-117.1168247,20z/data=!4m2!3m1!1s0x0000000000000000:0x64d592f8f0a3a852","type":"1","place":299}]},{"id":300,"name":"PETANQUERO","latitud":"32.5284097","longitude":"-117.1184717","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":236,"url":"https://www.dropbox.com/s/jesucv3k0zb093y/petanquero.png?dl=0","type":"COVER","place":300}],"link_set":[{"id":487,"url":"https://www.google.com/maps/place/PETANQUERO/@32.5284097,-117.1184717,18z/data=!4m2!3m1!1s0x0000000000000000:0xe857730b575e0c9a","type":"1","place":300},{"id":488,"url":"https://www.facebook.com/Petanquero-655425017882632/","type":"2","place":300}]},{"id":301,"name":"Peter Piper Pizza","latitud":"32.5306341","longitude":"-117.1141127","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":237,"url":"https://www.dropbox.com/s/57wvl0va9b978iu/peter-piper-pizza.png?dl=0","type":"COVER","place":301}],"link_set":[{"id":489,"url":"https://www.google.com/maps/place/Peter+Piper+Pizza/@32.5306341,-117.1141127,20z/data=!4m2!3m1!1s0x0000000000000000:0x02e36594f5143939","type":"1","place":301}]},{"id":302,"name":"Pharma Supply Distribuidora","latitud":"32.5118012","longitude":"-117.122470","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":490,"url":"https://www.google.com/maps/place/Pharma+Supply+Distribuidora/@32.5118012,-117.1224703,20z/data=!4m2!3m1!1s0x0000000000000000:0x01a7221e24b9babf","type":"1","place":302}]},{"id":303,"name":"Phillys and Papas","latitud":"32.5217886","longitude":"-117.1161944","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":361,"url":"https://www.dropbox.com/s/g6avac7qjraheia/phillys-%26-papas.png?dl=0","type":"COVER","place":303}],"link_set":[{"id":491,"url":"https://www.google.com/maps/place/Phillys+and+Papas/@32.5217886,-117.1161944,19z/data=!4m2!3m1!1s0x0000000000000000:0xb2154809d16b7759","type":"1","place":303},{"id":492,"url":"https://www.facebook.com/PhillisPapasJiimiis/?fref=ts","type":"2","place":303}]},{"id":304,"name":"PHUKET SPA","latitud":"32.5174148","longitude":"-117.1160339","code":"","categories":[{"id":5,"name":"Belleza"}],"status":1,"image_set":[{"id":238,"url":"https://www.dropbox.com/s/e4pprgrhx2wrun5/phuket-spa-%26-salon.jpg?dl=0","type":"COVER","place":304}],"link_set":[{"id":493,"url":"https://www.google.com/maps/place/PHUKET+SPA/@32.5174148,-117.1160339,20z/data=!4m2!3m1!1s0x0000000000000000:0x6f6f36fa57b720f4","type":"1","place":304}]},{"id":305,"name":"PIZZA & LOVE","latitud":"32.5278735","longitude":"-117.1167996","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":239,"url":"https://www.dropbox.com/s/hb650syvhrueg3r/pizza-%26-love-playas.jpg?dl=0","type":"COVER","place":305}],"link_set":[{"id":494,"url":"https://www.google.com/maps/place/PIZZA+%26+LOVE/@32.5278735,-117.1167996,20z/data=!4m2!3m1!1s0x0000000000000000:0xd550fe15675d71de","type":"1","place":305},{"id":495,"url":"https://www.facebook.com/pizzaandloveplayas/?fref=ts","type":"2","place":305}]},{"id":306,"name":"pizzas del pacifico","latitud":"32.5286461","longitude":"-117.1226732","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":240,"url":"https://www.dropbox.com/s/ezixswbw096m04r/pizzas-del-pacifico.jpg?dl=0","type":"COVER","place":306}],"link_set":[{"id":496,"url":"https://www.google.com/maps/place/pizzas+del+pacifico/@32.5286461,-117.1226732,18z/data=!4m2!3m1!1s0x0000000000000000:0x2917a4dd6999b89c","type":"1","place":306},{"id":497,"url":"https://foursquare.com/v/pizzas-del-pacifico/4be5c8772457a5932a00ac15","type":"4","place":306},{"id":498,"url":"https://www.facebook.com/pizzasdel.pacifico?fref=ts","type":"2","place":306}]},{"id":307,"name":"Plasma DiseÃ±o de Stands","latitud":"32.5084033","longitude":"-117.1161645","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":241,"url":"https://www.dropbox.com/s/h8edpw1eez0gg8r/plasma-dise%C3%B1o.png?dl=0","type":"COVER","place":307}],"link_set":[{"id":499,"url":"https://www.google.com/maps/place/Plasma+Dise%C3%B1o+de+Stands/@32.5084033,-117.1161645,19z/data=!4m2!3m1!1s0x0000000000000000:0x9a6ed6774213b7ad","type":"1","place":307},{"id":500,"url":"https://www.facebook.com/plasmadisegno/timeline","type":"2","place":307}]},{"id":308,"name":"Plasticos del Mar","latitud":"32.5260266","longitude":"-117.1115027","code":"","categories":[{"id":4,"name":"Tienda"}],"status":5,"image_set":[],"link_set":[{"id":501,"url":"https://www.google.com/maps/place/Plasticos+del+Mar./@32.5260266,-117.1115027,18z/data=!4m2!3m1!1s0x0000000000000000:0xf0d2e495b83b5e3f","type":"1","place":308}]},{"id":309,"name":"Playas Realty Bienes RaÃ­ces","latitud":"32.5310186","longitude":"-117.1129232","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":243,"url":"https://www.dropbox.com/s/0hrkdo0f9w1blw7/playas-realty-bienes-ra%C3%ADces.jpg?dl=0","type":"COVER","place":309}],"link_set":[{"id":502,"url":"https://www.google.com/maps/place/Playas+Realty+Bienes+Ra%C3%ADces/@32.5310186,-117.1129232,19z/data=!4m2!3m1!1s0x0000000000000000:0xd195f1f156a53604","type":"1","place":309},{"id":503,"url":"http://www.playasrealtymexico.com/","type":"3","place":309}]},{"id":310,"name":"Calimax","latitud":"32.5292776","longitude":"-117.1182409","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":46,"url":"https://www.dropbox.com/s/2mazytgk4ggre7e/calimax.png?dl=0","type":"COVER","place":310}],"link_set":[{"id":504,"url":"https://www.google.com/maps/place/Plaza+Calimax/@32.5292776,-117.1182409,19z/data=!4m2!3m1!1s0x0000000000000000:0xbf48edf1c16490dc","type":"1","place":310},{"id":505,"url":"https://foursquare.com/v/calimax/4cb257d7c5e6a1cd9cf4e4f6","type":"4","place":310}]},{"id":311,"name":"PLAZA ENSENADA","latitud":"32.5256417","longitude":"-117.1166658","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":245,"url":"https://www.dropbox.com/s/g3jl2jlgtsexhbs/plaza-ensenada.jpg?dl=0","type":"COVER","place":311}],"link_set":[{"id":506,"url":"https://www.google.com/maps/place/PLAZA+ENSENADA/@32.5256417,-117.1166658,19z/data=!4m2!3m1!1s0x0000000000000000:0x96ce0bc77efe7ed5","type":"1","place":311}]},{"id":312,"name":"Plaza Jardines","latitud":"32.5280478","longitude":"-117.1166371","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":247,"url":"https://www.dropbox.com/s/oujp9w8gve6cgdn/plaza-Jardines.jpg?dl=0","type":"COVER","place":312}],"link_set":[{"id":507,"url":"https://www.google.com/maps/place/Plaza+Jardines,+Paseo+Ensenada,+Playas,+Jardines+Playas+de+Tijuana,+Tijuana,+B.C.,+Mexico/@32.5280478,-117.1166371,20z/data=!4m2!3m1!1s0x80d94ba53eae732d:0x7df226031539d7f1","type":"1","place":312}]},{"id":313,"name":"Plaza Miramar","latitud":"32.5272041","longitude":"-117.11767","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":248,"url":"https://www.dropbox.com/s/fnj87ov280wx3n3/plaza-miramar.jpg?dl=0","type":"COVER","place":313}],"link_set":[{"id":508,"url":"https://www.google.com/maps/place/Plaza+Miramar/@32.5272041,-117.11767,20z/data=!4m2!3m1!1s0x0000000000000000:0xbca6d4f4ca01c7b7","type":"1","place":313},{"id":509,"url":"https://foursquare.com/v/plaza-miramar/4cf1c4a38333224b4c960c8e","type":"4","place":313}]},{"id":314,"name":"PLAZA PLAYAS EXPRESS","latitud":"32.5335857","longitude":"-117.1168185","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":246,"url":"https://www.dropbox.com/s/8ztslmgsd7pkif6/plaza-express.png?dl=0","type":"COVER","place":314}],"link_set":[{"id":510,"url":"https://www.google.com/maps/place/PLAZA+PLAYAS+EXPRESS/@32.5335857,-117.1168185,19z/data=!4m2!3m1!1s0x0000000000000000:0xb7b12a1fda9889d1","type":"1","place":314}]},{"id":315,"name":"Plaza Roberta","latitud":"32.5243271","longitude":"-117.1168234","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":249,"url":"https://www.dropbox.com/s/jzzv5419f0ynyio/plaza-roberta.jpg?dl=0","type":"COVER","place":315}],"link_set":[{"id":511,"url":"https://www.google.com/maps/place/Plaza+Roberta/@32.5243271,-117.1168234,19z/data=!4m2!3m1!1s0x0000000000000000:0x1dddc8fb86efcdfa","type":"1","place":315}]},{"id":316,"name":"Pollito Chicken","latitud":"32.5251504","longitude":"-117.1195284","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":250,"url":"https://www.dropbox.com/s/of9o1lhkowh6vef/pollito-chicken.jpg?dl=0","type":"COVER","place":316}],"link_set":[{"id":512,"url":"https://www.google.com/maps/place/Pollito+Chicken/@32.5251504,-117.1195284,19z/data=!4m2!3m1!1s0x0000000000000000:0xe1090295350eb433","type":"1","place":316}]},{"id":317,"name":"POLLOS ASADOS al CARBON PT","latitud":"32.5164864","longitude":"117.116058","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":251,"url":"https://www.dropbox.com/s/wtwvx42mazil0ok/pollos-asados-al-carbon.png?dl=0","type":"COVER","place":317}],"link_set":[{"id":513,"url":"https://www.google.com/maps/place/POLLOS+ASADOS+al+CARBON+PT/@32.5164864,-117.116058,20z/data=!4m2!3m1!1s0x0000000000000000:0x25323972ccd722ae","type":"1","place":317}]},{"id":318,"name":"Preparatoria Cobach","latitud":"32.5272061","longitude":"-117.1191368","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":362,"url":"https://www.dropbox.com/s/lp146me058vs1bk/cobach.png?dl=0","type":"COVER","place":318}],"link_set":[{"id":514,"url":"https://www.google.com/maps/place/Preparatoria+Cobach/@32.5272061,-117.1191368,19z/data=!4m2!3m1!1s0x0000000000000000:0x860bcd71ea8f25cd","type":"1","place":318}]},{"id":319,"name":"Promo Art","latitud":"32.5068361","longitude":"-117.1216436","code":"","categories":[{"id":4,"name":"Tienda"}],"status":5,"image_set":[],"link_set":[{"id":515,"url":"https://www.google.com/maps/place/Promo+Art/@32.5068361,-117.1216436,20z/data=!4m2!3m1!1s0x0000000000000000:0x500c33acead719af","type":"1","place":319}]},{"id":320,"name":"Provher, S.A. De C.V","latitud":"32.5154799","longitude":"-117.1166441","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":252,"url":"https://www.dropbox.com/s/31qsy49s01pn68y/provher-proveedor-del-herrero.jpg?dl=0","type":"COVER","place":320}],"link_set":[{"id":516,"url":"https://www.google.com/maps/place/Provher,+S.A.+De+C.V./@32.5154799,-117.1166441,19z/data=!4m2!3m1!1s0x0000000000000000:0x50103dabcfb2e545","type":"1","place":320},{"id":517,"url":"http://www.proveedordelherrero.com.mx/homecarga.html","type":"3","place":320},{"id":518,"url":"https://www.facebook.com/Provher/?fref=ts","type":"2","place":320}]},{"id":321,"name":"Puertas Playas De Tijuana","latitud":"32.5298905","longitude":"-117.1223943","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":519,"url":"https://www.google.com/maps/place/Puertas+Playas+De+Tijuana/@32.5298905,-117.1223943,18z/data=!4m2!3m1!1s0x0000000000000000:0xff6b5db20e95cdcf","type":"1","place":321}]},{"id":322,"name":"Quinta Ilusiones","latitud":"32.5262508","longitude":"-117.1225018","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":253,"url":"https://www.dropbox.com/s/hobjri9nowbzw02/quinta-ilusiones.png?dl=0","type":"COVER","place":322}],"link_set":[{"id":520,"url":"https://www.google.com/maps/place/Quinta+Ilusiones/@32.5262508,-117.1225018,18z/data=!4m2!3m1!1s0x0000000000000000:0x1ace45afdc536e4c","type":"1","place":322},{"id":521,"url":"http://quintailusiones.com/principal/","type":"3","place":322},{"id":522,"url":"https://www.facebook.com/Quinta-Ilusiones-177326612342264/","type":"2","place":322}]},{"id":323,"name":"R&R SEGUROS DE AUTO","latitud":"32.5150411","longitude":"-117.1163624","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":254,"url":"https://www.dropbox.com/s/tfoq9uk414l9wrm/r%26r-transmiciones-automaticas.png?dl=0","type":"COVER","place":323}],"link_set":[{"id":523,"url":"https://www.google.com/maps/place/R%26R+SEGUROS+DE+AUTO/@32.5150411,-117.1163624,19z/data=!4m2!3m1!1s0x0000000000000000:0x960cb1009b76a34a","type":"1","place":323}]},{"id":324,"name":"Refrigeracion Comercial Rankine","latitud":"32.5194586","longitude":"-117.112986","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":257,"url":"https://www.dropbox.com/s/egutj6jndrhjz9y/refrigeracion-comercial-rankine.jpg?dl=0","type":"COVER","place":324}],"link_set":[{"id":524,"url":"https://www.google.com/maps/place/Refrigeracion+Comercial+Rankine/@32.5194586,-117.1129864,20z/data=!4m2!3m1!1s0x0000000000000000:0x80b92f5f9b4927bf","type":"1","place":324},{"id":525,"url":"http://tijuana.directorioempresas.mx/empresas/refrigeracion-comercial_312","type":"3","place":324},{"id":526,"url":"https://www.facebook.com/refrigeracioncomercial.rankine?ref=br_rs","type":"2","place":324}]},{"id":325,"name":"RESTAURANT GRAN SABOR","latitud":"32.5282265","longitude":"-117.117836","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":527,"url":"https://www.google.com/maps/place/RESTAURANT+GRAN+SABOR/@32.5282265,-117.117836,19z/data=!4m2!3m1!1s0x0000000000000000:0x6ddd20ecbf7eba25","type":"1","place":325}]},{"id":326,"name":"Restaurant Ricardo's Suc. Playas","latitud":"32.5310389","longitude":"-117.1140846","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":258,"url":"https://www.dropbox.com/s/jv7zqqkwer2cf8l/restaurant-ricardos.jpg?dl=0","type":"COVER","place":326}],"link_set":[{"id":530,"url":"http://restaurantricardos.com/","type":"3","place":326},{"id":528,"url":"https://www.google.com/maps/place/Restaurant+Ricardo's+Suc.+Playas/@32.5310389,-117.1140846,19z/data=!4m2!3m1!1s0x0000000000000000:0xde6b7c0bac68b9d8","type":"1","place":326},{"id":529,"url":"https://foursquare.com/v/restaurant-ricardos/4e547a9da8093d27cca6ea49","type":"4","place":326},{"id":531,"url":"https://www.facebook.com/profile.php?id=100004486667655&fref=ts","type":"2","place":326}]},{"id":327,"name":"Restaurante El Charro","latitud":"32.5118102","longitude":"-117.1221591","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":532,"url":"https://www.google.com/maps/place/El+Charro/@32.5118102,-117.1221591,19z/data=!4m2!3m1!1s0x0000000000000000:0xd6945f477c383269","type":"1","place":327}]},{"id":328,"name":"Barbacoa El Corral","latitud":"32.5221234","longitude":"-117.1191799","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":28,"url":"https://www.dropbox.com/s/u0bcm0iy7i9eywe/barbacoa-el-corral.jpg?dl=0","type":"COVER","place":328}],"link_set":[{"id":533,"url":"https://www.google.com/maps/place/Restaurante+El+Corral/@32.5221234,-117.1191799,18z/data=!4m2!3m1!1s0x0000000000000000:0xfd47dd4dc98c5e8b","type":"1","place":328},{"id":534,"url":"https://www.facebook.com/barbacoaelcorral/","type":"2","place":328}]},{"id":329,"name":"Restaurante Mi Tierra","latitud":"32.5096112","longitude":"-117.1209255","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":363,"url":"https://www.dropbox.com/s/plhpfer85utar81/restaurante-y-cenaduria-mi-tierra.png?dl=0","type":"COVER","place":329}],"link_set":[{"id":535,"url":"https://www.google.com/maps/place/Restaurante+Mi+Tierra/@32.5096112,-117.1209255,19z/data=!4m2!3m1!1s0x0000000000000000:0x61d5c494f0f646eb","type":"1","place":329}]},{"id":330,"name":"Restaurante y CenadurÃ­a Mi Tierra","latitud":"32.522501","longitude":"-117.1161863","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":259,"url":"https://www.dropbox.com/s/k0jggdm92enl6wy/restaurante-y-cenaduria-mi-tierra.png?dl=0","type":"COVER","place":330}],"link_set":[{"id":536,"url":"https://www.google.com/maps/place/Restaurante+%22Mi+Tierra%22/@32.522501,-117.1161863,19z/data=!4m2!3m1!1s0x0000000000000000:0x555521c1bb4abe37","type":"1","place":330}]},{"id":331,"name":"REX Fumigaciones","latitud":"32.5261483","longitude":"-117.116698","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":260,"url":"https://www.dropbox.com/s/2d4qumm03t8mxhc/rex-fumigaciones.jpg?dl=0","type":"COVER","place":331}],"link_set":[{"id":537,"url":"https://www.google.com/maps/place/REX+Fumigaciones/@32.5261483,-117.116698,19z/data=!4m2!3m1!1s0x0000000000000000:0x25edd6cda43af37c","type":"1","place":331},{"id":538,"url":"http://www.rexfumigaciones.com/web/","type":"3","place":331},{"id":539,"url":"https://www.facebook.com/rex.fumigaciones.5","type":"2","place":331}]},{"id":332,"name":"Roccos","latitud":"32.5335985","longitude":"-117.123386","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":261,"url":"https://www.dropbox.com/s/1m9xorwgarv3u9y/roccos-restaurant.jpg?dl=0","type":"COVER","place":332}],"link_set":[{"id":540,"url":"https://www.google.com/maps/place/Roccos+by+Rabelos/@32.5335985,-117.123386,19z/data=!4m2!3m1!1s0x0000000000000000:0x0f4b94be65f63dd6","type":"1","place":332},{"id":541,"url":"https://foursquare.com/v/roccos/51a7e17ee4b0908630432db4","type":"4","place":332},{"id":542,"url":"https://www.facebook.com/RestauranteRoccos/","type":"2","place":332}]},{"id":333,"name":"RODIZAMATERIALES PARA FAB. DE MUEBLES","latitud":"32.5219267","longitude":"-117.1210145","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":262,"url":"https://www.dropbox.com/s/jtnjqnna93hcdml/rodizama-materiales-para-fab-de-muebles.png?dl=0","type":"COVER","place":333}],"link_set":[{"id":543,"url":"https://www.google.com/maps/place/RODIZAMATERIALES+PARA+FAB.+DE+MUEBLES/@32.5219267,-117.1210145,19z/data=!4m2!3m1!1s0x0000000000000000:0xf934b83685ba1efd","type":"1","place":333}]},{"id":334,"name":"Roma","latitud":"32.522501","longitude":"-117.1161863","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":263,"url":"https://www.dropbox.com/s/73oi5lqbwwv3jj5/roma.png?dl=0","type":"COVER","place":334}],"link_set":[{"id":544,"url":"https://www.google.com/maps/place/Roma/@32.522501,-117.1161863,19z/data=!4m2!3m1!1s0x0000000000000000:0x44b2ab247b413448","type":"1","place":334}]},{"id":335,"name":"Ross CafÃ© & Deli","latitud":"32.5284097","longitude":"-117.1184717","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":264,"url":"https://www.dropbox.com/s/aorn9c8j0kdsks6/ross-cafe.jpeg?dl=0","type":"COVER","place":335}],"link_set":[{"id":545,"url":"https://www.google.com/maps/place/Ross+Caf%C3%A9+%26+Deli/@32.5284097,-117.1184717,18z/data=!4m2!3m1!1s0x0000000000000000:0xfe33a876977ab5a2","type":"1","place":335},{"id":546,"url":"https://foursquare.com/v/ross-cafe--deli/4cf2cf618333224b5056128e","type":"4","place":335}]},{"id":336,"name":"Sabinos","latitud":"32.524266","longitude":"-117.1130549","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":266,"url":"https://www.dropbox.com/s/lwoxnlfqyb0lo7z/sabinos.jpg?dl=0","type":"COVER","place":336}],"link_set":[{"id":547,"url":"https://www.google.com/maps/place/Sabinos/@32.524266,-117.1130549,19z/data=!4m2!3m1!1s0x0000000000000000:0x6341e783f94d784b","type":"1","place":336}]},{"id":337,"name":"Sabor A Mexico & La Terraza Cafe","latitud":"32.5241936","longitude":"-117.111349","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":267,"url":"https://www.dropbox.com/s/ko1q55548jo7egn/sabor-a-mexico-%26-la-terraza-cafe.png?dl=0","type":"COVER","place":337}],"link_set":[{"id":548,"url":"https://www.google.com/maps/place/Sabor+a+Mexico+%26+La+Terraza+Cafe/@32.5241936,-117.111349,18z/data=!4m2!3m1!1s0x0000000000000000:0xe7a90f60d7e6d21c","type":"1","place":337}]},{"id":338,"name":"Art D'Blank","latitud":"32.522906","longitude":"-117.1190887","code":"","categories":[{"id":5,"name":"Belleza"}],"status":1,"image_set":[{"id":11,"url":"https://www.dropbox.com/s/ofd02pyn0xp5nyf/art-d-blank.jpg?dl=0","type":"COVER","place":338}],"link_set":[{"id":549,"url":"https://www.google.com/maps/place/Salon+Art+D'Blank/@32.522906,-117.1190887,18z/data=!4m2!3m1!1s0x0000000000000000:0x896f1ef1d9d59fbf","type":"1","place":338},{"id":550,"url":"https://www.facebook.com/artdblank","type":"2","place":338}]},{"id":339,"name":"SalÃ³n de Eventos Santa Isabel","latitud":"32.5310031","longitude":"-117.116881","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":268,"url":"https://www.dropbox.com/s/hpt6vpzsmsn9lds/salon-de-eventos-santa-isabel.jpg?dl=0","type":"COVER","place":339}],"link_set":[{"id":551,"url":"https://www.google.com/maps/place/Sal%C3%B3n+de+Eventos+Santa+Isabel/@32.5310031,-117.116881,19z/data=!4m2!3m1!1s0x0000000000000000:0x289385f6984570c2","type":"1","place":339},{"id":552,"url":"https://www.facebook.com/Salon-de-eventos-Santa-Isabel-860373424026145/","type":"2","place":339}]},{"id":340,"name":"SALÃ“N DEL REINO DE LOS TESTIGOS DE JEHOVA KINGDOM HALL","latitud":"32.5140399","longitude":"-117.1184873","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":269,"url":"https://www.dropbox.com/s/1ir9x0zd3x4zw2c/salon-del-reino-de-los-testigos-de-jehova-kingdom-hall-of-jehovahs-witnesses.png?dl=0","type":"COVER","place":340}],"link_set":[{"id":553,"url":"https://www.google.com/maps/place/SAL%C3%93N+DEL+REINO+DE+LOS+TESTIGOS+DE+JEHOVA+KINGDOM+HALL/@32.5140399,-117.1184873,20z/data=!4m2!3m1!1s0x0000000000000000:0x18a6026aac7a1c0b","type":"1","place":340}]},{"id":341,"name":"SalÃ³n Social Alfa","latitud":"32.5262508","longitude":"-117.1225018","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":270,"url":"https://www.dropbox.com/s/8dulgvpyqxudg5v/salon-social-alfa.jpg?dl=0","type":"COVER","place":341}],"link_set":[{"id":554,"url":"https://www.google.com/maps/place/Sal%C3%B3n+Social+Alfa/@32.5262508,-117.1225018,18z/data=!4m2!3m1!1s0x0000000000000000:0xa7acf06f2c59bfcb","type":"1","place":341},{"id":555,"url":"https://www.facebook.com/Salon-Social-Alfa-758125687572864/","type":"2","place":341}]},{"id":342,"name":"SalÃ³n Tradiciones","latitud":"32.5305586","longitude":"-117.1208502","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":271,"url":"https://www.dropbox.com/s/82s4lw3axs3rvuj/salon-tradiciones.jpg?dl=0","type":"COVER","place":342}],"link_set":[{"id":556,"url":"https://www.google.com/maps/place/Sal%C3%B3n+Tradiciones/@32.5305586,-117.1208502,19z/data=!4m2!3m1!1s0x0000000000000000:0x23b537e3a992955c","type":"1","place":342},{"id":557,"url":"https://www.facebook.com/Salon-Tradiciones-140260612809460/","type":"2","place":342}]},{"id":343,"name":"SalÃ³n Villa Bonita","latitud":"32.5283209","longitude":"-117.1122201","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":272,"url":"https://www.dropbox.com/s/p8w2r1t91ghyvmq/salon-villa-bonita.jpg?dl=0","type":"COVER","place":343}],"link_set":[{"id":558,"url":"https://www.google.com/maps/place/Sal%C3%B3n+Villa+Bonita/@32.5283209,-117.1122201,21z/data=!4m2!3m1!1s0x0000000000000000:0x16e5433acf2e5e78","type":"1","place":343},{"id":559,"url":"http://eventosvillabonita.com/paquetes.html","type":"3","place":343},{"id":560,"url":"https://www.facebook.com/eventosvillabonita/","type":"2","place":343}]},{"id":344,"name":"Salones y Patios El Sol","latitud":"32.5174572","longitude":"-117.1197575","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":273,"url":"https://www.dropbox.com/s/umk4rja0ijehvv4/salones-y-patios-el-sol.jpg?dl=0","type":"COVER","place":344}],"link_set":[{"id":561,"url":"https://www.google.com/maps/place/Salones+y+Patios+El+Sol/@32.5174572,-117.1197575,19z/data=!4m2!3m1!1s0x0000000000000000:0xe8d34d914915267a","type":"1","place":344},{"id":562,"url":"https://www.facebook.com/Salones-y-patios-del-sol-playas-d-tijuana-1427050897588287/","type":"2","place":344}]},{"id":345,"name":"Santander Playas de Tijuana","latitud":"32.5311497","longitude":"-117.1136742","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":364,"url":"https://www.dropbox.com/s/28k3y1wi2rhogss/santander.png?dl=0","type":"COVER","place":345}],"link_set":[{"id":563,"url":"https://www.google.com/maps/place/Santander+Playas+de+Tijuana/@32.5311497,-117.1136742,19z/data=!4m2!3m1!1s0x0000000000000000:0x4b36ee4d66a64afc","type":"1","place":345},{"id":564,"url":"http://www.ofertia.com.mx/tiendas/Tijuana/santander-paseo-ensenada-502-fracc-playas-de-tijuana/filial-184821181#brochure/view/page/1","type":"3","place":345}]},{"id":346,"name":"Santander Serfin Playas","latitud":"32.5310031","longitude":"-117.116881","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":365,"url":"https://www.dropbox.com/s/28k3y1wi2rhogss/santander.png?dl=0","type":"COVER","place":346}],"link_set":[{"id":565,"url":"https://www.google.com/maps/place/Santander+Serfin+Playas/@32.5310031,-117.116881,19z/data=!4m2!3m1!1s0x0000000000000000:0x3d3adab3ab5cd546","type":"1","place":346}]},{"id":347,"name":"Santi's Tortilleria","latitud":"32.5177727","longitude":"-117.1168204","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":566,"url":"https://www.google.com/maps/place/Santi's+Tortilleria/@32.5177727,-117.1168204,20z/data=!4m2!3m1!1s0x0000000000000000:0x2ecacd5747f17a93","type":"1","place":347}]},{"id":348,"name":"SASTRERIA ZUÃ‘IGA","latitud":"32.518874","longitude":"-117.116763","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":274,"url":"https://www.dropbox.com/s/8ugz5a3t4j7kmn3/sastreria-zuniga.png?dl=0","type":"COVER","place":348}],"link_set":[{"id":567,"url":"https://www.google.com/maps/place/SASTRERIA+ZU%C3%91IGA/@32.518874,-117.116763,20z/data=!4m2!3m1!1s0x0000000000000000:0x50298a4b4de2481d","type":"1","place":348}]},{"id":349,"name":"Secundaria 5 Ignacio Manuel Altamirano","latitud":"32.5260266","longitude":"-117.1115027","code":"","categories":[{"id":7,"name":"EducaciÃ³n"}],"status":1,"image_set":[{"id":275,"url":"https://www.dropbox.com/s/d9fgr3jxw2hqif2/secundaria-5-ignacio-manuel-altamirano-.jpg?dl=0","type":"COVER","place":349}],"link_set":[{"id":568,"url":"https://www.google.com/maps/place/Secundaria+5+Ignacio+Manuel+Altamirano/@32.5260266,-117.1115027,18z/data=!4m2!3m1!1s0x0000000000000000:0xb818bc25b68e99b8","type":"1","place":349},{"id":569,"url":"https://www.facebook.com/secundaria5","type":"2","place":349}]},{"id":350,"name":"Seguridad Privada y Alarmas Digitales","latitud":"32.5131164","longitude":"-117.1184429","code":"","categories":[{"id":4,"name":"Tienda"}],"status":5,"image_set":[],"link_set":[{"id":570,"url":"https://www.google.com/maps/place/Seguridad+Privada+y+Alarmas+Digitales/@32.5131164,-117.1184429,20z/data=!4m2!3m1!1s0x0000000000000000:0x8b3c99a5fc6a12c9","type":"1","place":350}]},{"id":351,"name":"Semilla Madre","latitud":"32.521956","longitude":"-117.116358","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":276,"url":"https://www.dropbox.com/s/ocmxe5w09rztmlv/semilla-madre-organica.jpg?dl=0","type":"COVER","place":351}],"link_set":[{"id":571,"url":"https://www.google.com/maps/place/Semilla+Madre/@32.521956,-117.116358,19z/data=!4m2!3m1!1s0x0000000000000000:0x41dcca1029785c24","type":"1","place":351},{"id":572,"url":"https://www.facebook.com/Semilla-Madre-Org%C3%A1nica-218755178169826/timeline/","type":"2","place":351}]},{"id":352,"name":"SERVICIO AUTOMOTRIZ BAJA","latitud":"32.51345","longitude":"-117.1199061","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":277,"url":"https://www.dropbox.com/s/72oifbp99ycu64d/servicio-automotriz-baja.png?dl=0","type":"COVER","place":352}],"link_set":[{"id":573,"url":"https://www.google.com/maps/place/SERVICIO+AUTOMOTRIZ+BAJA/@32.51345,-117.1199061,20z/data=!4m2!3m1!1s0x0000000000000000:0xa1e8e7271069150f","type":"1","place":352}]},{"id":353,"name":"SERVICIO DE TALLER MECÃNICO DEL VALLE","latitud":"32.5190526","longitude":"-117.1168327","code":"","categories":[{"id":1,"name":"Autos"}],"status":5,"image_set":[],"link_set":[{"id":574,"url":"https://www.google.com/maps/place/SERVICIO+DE+TALLER+MEC%C3%81NICO+DEL+VALLE/@32.5190526,-117.1168327,20z/data=!4m2!3m1!1s0x0000000000000000:0x0cf805ec9ce2ff32","type":"1","place":353}]},{"id":354,"name":"Hermanos Armenta Servicio EelÃ©ctrico Automotriz","latitud":"32.5122513","longitude":"-117.1207","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":133,"url":"https://www.dropbox.com/s/5g844qiad1qm9ss/hermanos-armenta.png?dl=0","type":"COVER","place":354}],"link_set":[{"id":575,"url":"https://www.google.com/maps/place/Servicio+Eel%C3%A9ctrico+Automotriz+Hermanos+Armenta/@32.5122513,-117.1207,20z/data=!4m2!3m1!1s0x0000000000000000:0xc68d3d59bdfcc94b","type":"1","place":354},{"id":576,"url":"https://www.facebook.com/Hermanos-Armenta-1069810716382331/?fref=ts","type":"2","place":354}]},{"id":355,"name":"SERVICIO ELECTRICO \"DEL MAR\" RADIADORES","latitud":"32.5122513","longitude":"-117.1207","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":278,"url":"https://www.dropbox.com/s/73o1gpocheohi3m/servicio-electrico-del-mar.jpg?dl=0","type":"COVER","place":355}],"link_set":[{"id":577,"url":"https://www.google.com/maps/place/SERVICIO+ELECTRICO+%22DEL+MAR%22+RADIADORES/@32.5122513,-117.1207,20z/data=!4m2!3m1!1s0x0000000000000000:0xaf2e7977760bbc49","type":"1","place":355}]},{"id":356,"name":"Servicio ElectrÃ³nico Automotriz","latitud":"32.519458","longitude":"-117.1197724","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":279,"url":"https://www.dropbox.com/s/ovwzupcm2386t09/servicio-electronico-automotriz.png?dl=0","type":"COVER","place":356}],"link_set":[{"id":578,"url":"https://www.google.com/maps/place/Servicio+Electr%C3%B3nico+Automotriz/@32.519458,-117.1197724,20z/data=!4m2!3m1!1s0x0000000000000000:0x5096d15bf73debba","type":"1","place":356}]},{"id":357,"name":"SHIGERUÂ´S SUSHI EXPRESS","latitud":"32.5184646","longitude":"-117.1167549","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":281,"url":"https://www.dropbox.com/s/u37doxxa6mdplps/shigerus-sushi-express.jpg?dl=0","type":"COVER","place":357}],"link_set":[{"id":579,"url":"https://www.google.com/maps/place/SHIGERU%C2%B4S+SUSHI+EXPRESS/@32.5184646,-117.1167549,20z/data=!4m2!3m1!1s0x0000000000000000:0xf50b748bc4a2d6f7","type":"1","place":357}]},{"id":358,"name":"SOCORRITO LAVADO Y DETALLADO","latitud":"32.5154799","longitude":"-117.1166441","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":282,"url":"https://www.dropbox.com/s/4raxf59arefmrme/socorrito-lavado-y-detallado.jpg?dl=0","type":"COVER","place":358}],"link_set":[{"id":580,"url":"https://www.google.com/maps/place/SOCORRITO+LAVADO+Y+DETALLADO/@32.5154799,-117.1166441,19z/data=!4m2!3m1!1s0x0000000000000000:0x7b57af1f344f7bf4","type":"1","place":358},{"id":582,"url":"https://www.facebook.com/Socorritocarwash/?rf=230477637079463","type":"2","place":358}]},{"id":359,"name":"Solutions EstÃ©tica","latitud":"32.5335857","longitude":"-117.1168185","code":"","categories":[{"id":5,"name":"Belleza"}],"status":5,"image_set":[],"link_set":[{"id":581,"url":"https://www.google.com/maps/place/Solutions+Est%C3%A9tica/@32.5335857,-117.1168185,19z/data=!4m2!3m1!1s0x0000000000000000:0xc66271f5b3f9eaba","type":"1","place":359}]},{"id":360,"name":"Sonora Steak Asadero","latitud":"32.5282265","longitude":"-117.117836","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":283,"url":"https://www.dropbox.com/s/u45awlnkvuweasa/sonora-steak-asadero.jpg?dl=0","type":"COVER","place":360}],"link_set":[{"id":583,"url":"https://www.google.com/maps/place/Sonora+Steak+Asadero/@32.5282265,-117.117836,19z/data=!4m2!3m1!1s0x0000000000000000:0x79af92326807af74","type":"1","place":360}]},{"id":361,"name":"SR. CARA DE PAPA","latitud":"32.5244167","longitude":"-117.1214678","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":284,"url":"https://www.dropbox.com/s/irz9szy0cnv1rg4/sr-cara-papa.jpg?dl=0","type":"COVER","place":361}],"link_set":[{"id":584,"url":"https://www.google.com/maps/place/SR.+CARA+DE+PAPA/@32.5244167,-117.1214678,19z/data=!4m2!3m1!1s0x0000000000000000:0xf699f3051bba3bd2","type":"1","place":361},{"id":585,"url":"http://www.srcaradepapa.com/","type":"3","place":361},{"id":586,"url":"https://www.facebook.com/SR-CARA-De-PAPA-Papas-Rellenas-305678766150439/?fref=ts","type":"2","place":361}]},{"id":362,"name":"Sr. Waffle","latitud":"32.5303211","longitude":"-117.1216012","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":285,"url":"https://www.dropbox.com/s/ijk55esv4fqpcyx/sr.waffle.jpg?dl=0","type":"COVER","place":362}],"link_set":[{"id":587,"url":"https://www.google.com/maps/place/Sr.+Waffle/@32.5303211,-117.1216012,19z/data=!4m2!3m1!1s0x0000000000000000:0xa8fa6fa05c35bbe0","type":"1","place":362},{"id":588,"url":"https://foursquare.com/v/sr-waffle/4fa41ef0e4b094b94558250f","type":"4","place":362},{"id":589,"url":"https://www.facebook.com/Sr-Waffle-265602833490751/","type":"2","place":362}]},{"id":363,"name":"Star Salads","latitud":"32.5310031","longitude":"-117.116881","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":286,"url":"https://www.dropbox.com/s/fkvcngs24yx12k7/star-salads.jpg?dl=0","type":"COVER","place":363}],"link_set":[{"id":590,"url":"https://www.google.com/maps/place/Star+Salads/@32.5310031,-117.116881,19z/data=!4m2!3m1!1s0x0000000000000000:0xc02a813cd0f99281","type":"1","place":363},{"id":591,"url":"https://www.facebook.com/Star-Salads-330748536958011/","type":"2","place":363}]},{"id":364,"name":"Starbucks Playas de tijuana","latitud":"32.5292776","longitude":"-117.1182409","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":287,"url":"https://www.dropbox.com/s/ju9ar86hhfxo741/starbucks.png?dl=0","type":"COVER","place":364}],"link_set":[{"id":592,"url":"https://www.google.com/maps/place/Starbucks+Playas+de+tijuana/@32.5292776,-117.1182409,19z/data=!4m2!3m1!1s0x0000000000000000:0x95e01959ab343c2f","type":"1","place":364},{"id":593,"url":"https://foursquare.com/v/starbucks/4cb24992b4b0a35d2f9e58ce","type":"4","place":364}]},{"id":365,"name":"Sub Agencia Corona Playas 3","latitud":"32.5294007","longitude":"-117.1204592","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":366,"url":"https://www.dropbox.com/s/o4rze9ma0ie91ug/corona.png?dl=0","type":"COVER","place":365}],"link_set":[{"id":594,"url":"https://www.google.com/maps/place/Sub+Agencia+Corona+Playas+3/@32.5294007,-117.1204592,21z/data=!4m2!3m1!1s0x0000000000000000:0x7821b0fd76a10be8","type":"1","place":365}]},{"id":366,"name":"SUITES LEON ROJO","latitud":"32.5132912","longitude":"-117.1204212","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":289,"url":"https://www.dropbox.com/s/ezbz7zu6fvs6ehp/suites-leon-rojo.jpg?dl=0","type":"COVER","place":366}],"link_set":[{"id":595,"url":"https://www.google.com/maps/place/SUITES+LEON+ROJO/@32.5132912,-117.1204212,20z/data=!4m2!3m1!1s0x0000000000000000:0x5a2cd35f4889e6cd","type":"1","place":366}]},{"id":367,"name":"Sukilo","latitud":"32.5284097","longitude":"-117.1184717","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":290,"url":"https://www.dropbox.com/s/2bd7cukjy7p2w3c/sukilo.jpg?dl=0","type":"COVER","place":367}],"link_set":[{"id":596,"url":"https://www.google.com/maps/place/Sukilo/@32.5284097,-117.1184717,18z/data=!4m2!3m1!1s0x0000000000000000:0x7ceb3310f70a2f4b","type":"1","place":367},{"id":597,"url":"https://www.facebook.com/people/SuKilo-Playas/100008507264841","type":"2","place":367}]},{"id":368,"name":"Sunny House","latitud":"32.5330597","longitude":"-117.1175784","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":291,"url":"https://www.dropbox.com/s/fh863i7ktrrveft/sunny-house.jpg?dl=0","type":"COVER","place":368}],"link_set":[{"id":598,"url":"https://www.google.com/maps/place/Sunny+House/@32.5330597,-117.1175784,19z/data=!4m2!3m1!1s0x0000000000000000:0xa0198f0f5dd004f5","type":"1","place":368},{"id":599,"url":"https://www.facebook.com/Sunnyhouse-826966907330595/","type":"2","place":368}]},{"id":369,"name":"Sunset Lounge Playas","latitud":"32.5286461","longitude":"-117.1226732","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":292,"url":"https://www.dropbox.com/s/09svbhywyevexpz/sunset-lounge-playas.png?dl=0","type":"COVER","place":369}],"link_set":[{"id":600,"url":"https://www.google.com/maps/place/Sunset+Lounge+Playas/@32.5286461,-117.1226732,18z/data=!4m2!3m1!1s0x0000000000000000:0x67390d7869cecebc","type":"1","place":369},{"id":601,"url":"https://foursquare.com/explore?mode=url&near=Tijuana%2C%20BCN&nearGeoId=72057594041909545","type":"4","place":369},{"id":602,"url":"https://www.facebook.com/sunsetlounge.playas","type":"2","place":369}]},{"id":370,"name":"Super Papeleria Playas","latitud":"32.5260809","longitude":"-117.1133024","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":293,"url":"https://www.dropbox.com/s/57y0mtj8s8o8z0o/super-papeleria-playas.png?dl=0","type":"COVER","place":370}],"link_set":[{"id":603,"url":"https://www.google.com/maps/place/Super+Papeleria+Playas/@32.5260809,-117.1133024,19z/data=!4m2!3m1!1s0x0000000000000000:0x163d75b80aa420e9","type":"1","place":370}]},{"id":371,"name":"Sushi Roll Playas","latitud":"32.5217389","longitude":"-117.1153816","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":280,"url":"https://www.dropbox.com/s/9zpophcz27hwq9w/sushi-roll-playas.jpg?dl=0","type":"COVER","place":371}],"link_set":[{"id":604,"url":"https://www.google.com/maps/place/Sushi+Roll+Playas/@32.5217389,-117.1153816,19z/data=!4m2!3m1!1s0x0000000000000000:0xb6871344ae52f001","type":"1","place":371},{"id":605,"url":"https://www.facebook.com/sushiroll.playas","type":"2","place":371}]},{"id":372,"name":"Sushimi - Playas","latitud":"32.5243271","longitude":"-117.1168234","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":294,"url":"https://www.dropbox.com/s/f1j1vhup5f6zs75/sushimi.jpg?dl=0","type":"COVER","place":372}],"link_set":[{"id":606,"url":"https://www.google.com/maps/place/Sushimi+-+Playas/@32.5243271,-117.1168234,19z/data=!4m2!3m1!1s0x0000000000000000:0x8da5eb4d7eae16d7","type":"1","place":372},{"id":607,"url":"https://foursquare.com/v/sushimi/4b7cc0aef964a5202ca42fe3","type":"4","place":372},{"id":608,"url":"http://sushimi.mx/","type":"3","place":372},{"id":609,"url":"https://www.facebook.com/SushimiMX/","type":"2","place":372}]},{"id":373,"name":"Sutileza Spa","latitud":"32.5237979","longitude":"-117.1174537","code":"","categories":[{"id":5,"name":"Belleza"}],"status":1,"image_set":[{"id":295,"url":"https://www.dropbox.com/s/8pwn61zvpmvolrw/sutileza-clinica-%26-spa.jpg?dl=0","type":"COVER","place":373}],"link_set":[{"id":610,"url":"https://www.google.com/maps/place/Sutileza+Spa/@32.5237979,-117.1174537,19z/data=!4m2!3m1!1s0x0000000000000000:0x41082aabd42af116","type":"1","place":373},{"id":611,"url":"https://www.facebook.com/Sutileza-Clinica-SPA-442640985746193/","type":"2","place":373}]},{"id":374,"name":"SYNTHIA FLORES","latitud":"32.5289995","longitude":"-117.1186459","code":"","categories":[{"id":4,"name":"Tienda"}],"status":5,"image_set":[],"link_set":[{"id":612,"url":"https://www.google.com/maps/place/SYNTHIA+FLORES/@32.5289995,-117.1186459,19z/data=!4m2!3m1!1s0x0000000000000000:0xf2878d60744ef0fa","type":"1","place":374},{"id":613,"url":"https://www.facebook.com/Synthia-Flores-Joyeria-de-Autor-y-Accesorios-253549961342658/","type":"2","place":374}]},{"id":375,"name":"TACONAZO","latitud":"32.5296764","longitude":"-117.1164892","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":296,"url":"https://www.dropbox.com/s/e2plbc6nn13a6ir/taconazo.png?dl=0","type":"COVER","place":375}],"link_set":[{"id":614,"url":"https://www.google.com/maps/place/TACONAZO/@32.5296764,-117.1164892,19z/data=!4m2!3m1!1s0x0000000000000000:0xef3a36fc8a91158c","type":"1","place":375},{"id":615,"url":"https://foursquare.com/v/el-taconazo/4cf21a177bf3b60cd101647f","type":"4","place":375},{"id":616,"url":"https://www.facebook.com/Taconazo-281092935321547/","type":"2","place":375}]},{"id":376,"name":"tacones LEJANOS","latitud":"32.5184646","longitude":"32.5184646","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":367,"url":"https://www.dropbox.com/s/yhe0lcgsafats26/tacones-lejanos.png?dl=0","type":"COVER","place":376}],"link_set":[{"id":617,"url":"https://www.google.com/maps/place/tacones+LEJANOS/@32.5184646,-117.1167549,20z/data=!4m2!3m1!1s0x0000000000000000:0x587d4478c779aae5","type":"1","place":376},{"id":618,"url":"https://www.facebook.com/taconeslejanoszapateria/info?tab=overview","type":"2","place":376}]},{"id":377,"name":"Tacos de Canasta La Tradicion","latitud":"32.5256854","longitude":"-117.1214477","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":298,"url":"https://www.dropbox.com/s/1yjweq4lalvxbnu/tacos-de-canasta-la-tradicion.jpg?dl=0","type":"COVER","place":377}],"link_set":[{"id":619,"url":"https://www.google.com/maps/place/Tacos+de+Canasta+La+Tradicion/@32.5256854,-117.1214477,19z/data=!4m2!3m1!1s0x0000000000000000:0x9803a0c20c35cffa","type":"1","place":377},{"id":620,"url":"https://www.facebook.com/Tacos-de-Canasta-la-Tradici%C3%B3n-429164103937242/","type":"2","place":377}]},{"id":378,"name":"Tacos El Poblano","latitud":"32.5129157","longitude":"-117.1197533","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":300,"url":"https://www.dropbox.com/s/1yipflw2d03bk24/tacos-el-poblano.jpg?dl=0","type":"COVER","place":378}],"link_set":[{"id":621,"url":"https://www.google.com/maps/place/Tacos+El+Poblano/@32.5129157,-117.1197533,20z/data=!4m2!3m1!1s0x0000000000000000:0x698dcd41ba17c1f0","type":"1","place":378},{"id":622,"url":"https://foursquare.com/v/tacos-el-poblano/4dd3180fd22d4d4d40872a97","type":"4","place":378},{"id":623,"url":"https://www.facebook.com/tacoselpoblano?fref=ts","type":"2","place":378}]},{"id":379,"name":"tacos la carreta rosa","latitud":"32.5091101","longitude":"-117.1173997","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":301,"url":"https://www.dropbox.com/s/m8g7tkvont1rzg7/tacos-la-carreta-rosa.jpg?dl=0","type":"COVER","place":379}],"link_set":[{"id":624,"url":"https://www.google.com/maps/place/tacos+la+carreta+rosa/@32.5091101,-117.1173997,20z/data=!4m2!3m1!1s0x0000000000000000:0x35525ca01520340c","type":"1","place":379},{"id":625,"url":"https://foursquare.com/v/tacos-la-carreta-rosa/539bd019498e79c674669b3f","type":"4","place":379},{"id":626,"url":"https://www.facebook.com/people/Tacos-La-Carreta-Rosa/100006125356227","type":"2","place":379}]},{"id":380,"name":"Tacos La Esquina","latitud":"32.5139947","longitude":"-117.1166876","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":627,"url":"https://www.google.com/maps/place/Tacos+La+Esquina/@32.5139947,-117.1166876,20z/data=!4m2!3m1!1s0x0000000000000000:0x0f82ca426bfb9912","type":"1","place":380},{"id":628,"url":"https://foursquare.com/v/tacos-la-esquina/5063f031e4b033de5a2c67a2","type":"4","place":380}]},{"id":381,"name":"TACOS Sonora","latitud":"32.5219267","longitude":"-117.1210145","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":303,"url":"https://www.dropbox.com/s/7p7fivg7s9e2lho/tacos-sonora.jpg?dl=0","type":"COVER","place":381}],"link_set":[{"id":629,"url":"https://www.google.com/maps/place/TACOS+Sonora/@32.5219267,-117.1210145,19z/data=!4m2!3m1!1s0x0000000000000000:0x2f755f34e2a66d3c","type":"1","place":381},{"id":630,"url":"https://foursquare.com/v/tacos-sonora/4cf9ebd3084f548165447809","type":"4","place":381},{"id":631,"url":"https://www.facebook.com/tacos.sonora.5?fref=ts","type":"2","place":381}]},{"id":382,"name":"TALLER BEYPA","latitud":"32.5284017","longitude":"-117.1122785","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":304,"url":"https://www.dropbox.com/s/bwspd7owxgbahlp/taller-beypa.png?dl=0","type":"COVER","place":382}],"link_set":[{"id":632,"url":"https://www.google.com/maps/place/TALLER+BEYPA/@32.5284017,-117.1122785,21z/data=!4m2!3m1!1s0x0000000000000000:0x1e57f940fb3e1333","type":"1","place":382}]},{"id":383,"name":"Taller MecÃ¡nico JavierÂ´s","latitud":"32.5103169","longitude":"-117.117202","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[],"link_set":[{"id":633,"url":"https://www.google.com/maps/place/Taller+Mec%C3%A1nico+Javier%C2%B4s/@32.5103169,-117.1172025,18z/data=!4m2!3m1!1s0x0000000000000000:0xfc212d692df24670","type":"1","place":383}]},{"id":384,"name":"TALLER OSCAR'S","latitud":"32.5173475","longitude":"-117.1168137","code":"","categories":[{"id":1,"name":"Autos"}],"status":5,"image_set":[],"link_set":[{"id":634,"url":"https://www.google.com/maps/place/TALLER+OSCAR'S/@32.5173475,-117.1168137,20z/data=!4m2!3m1!1s0x0000000000000000:0xd806fc2c65bdeefa","type":"1","place":384}]},{"id":385,"name":"Tamales la glorieta","latitud":"32.526552","longitude":"-117.1170802","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":368,"url":"https://www.dropbox.com/s/jqpjfo81vr8x064/tamales-la-glorieta.jpg?dl=0","type":"COVER","place":385}],"link_set":[{"id":635,"url":"https://www.google.com/maps/place/Tamales+la+glorieta/@32.526552,-117.1170802,20z/data=!4m2!3m1!1s0x0000000000000000:0x534c6d5fb154e77d","type":"1","place":385}]},{"id":386,"name":"Taqueria \"El Frances\"","latitud":"32.5128857","longitude":"-117.1207832","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":299,"url":"https://www.dropbox.com/s/a8u4semk8acufgw/tacos-el-frances.jpg?dl=0","type":"COVER","place":386}],"link_set":[{"id":637,"url":"https://foursquare.com/v/tacos-el-frances/4c997720db10b60cd4b48a6d","type":"4","place":386},{"id":636,"url":"https://www.google.com/maps/place/Taqueria+El+Frances/@32.5128857,-117.1207832,20z/data=!4m2!3m1!1s0x0000000000000000:0x9aa1a1a3d9bd37d1","type":"1","place":386}]},{"id":387,"name":"Tecniphone","latitud":"32.5112081","longitude":"-117.1209979","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":306,"url":"https://www.dropbox.com/s/i5r1zek38iwabze/techniphone.png?dl=0","type":"COVER","place":387}],"link_set":[{"id":638,"url":"https://www.google.com/maps/place/Tecniphone/@32.5112081,-117.1209979,20z/data=!4m2!3m1!1s0x0000000000000000:0x6936c36efef81a18","type":"1","place":387}]},{"id":388,"name":"Telcel Cac","latitud":"32.5310389","longitude":"-117.1140846","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":307,"url":"https://www.dropbox.com/s/8t83hon2o3fh9un/telcel.jpg?dl=0","type":"COVER","place":388}],"link_set":[{"id":639,"url":"https://www.google.com/maps/place/Telcel+Cac/@32.5310389,-117.1140846,19z/data=!4m2!3m1!1s0x0000000000000000:0x44a448139fc34444","type":"1","place":388},{"id":640,"url":"https://foursquare.com/v/centro-de-atenci%C3%B3n-a-clientes-telcel/4cf430a7cc61a35dda24249e","type":"4","place":388}]},{"id":389,"name":"TELECOMM TELEGRAFOS","latitud":"32.5196203","longitude":"-117.1167429","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":308,"url":"https://www.dropbox.com/s/g9c8ykroost2lod/telecomm.jpg?dl=0","type":"COVER","place":389}],"link_set":[{"id":641,"url":"https://www.google.com/maps/place/TELECOMM+TELEGRAFOS/@32.5196203,-117.1167429,20z/data=!4m2!3m1!1s0x0000000000000000:0x61cec0ee39a06747","type":"1","place":389}]},{"id":390,"name":"Templo EvangÃ©lico San Pablo","latitud":"32.530345","longitude":"-117.1176508","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":309,"url":"https://www.dropbox.com/s/j8hjkguxddwpiu7/templo-evangelico-san-pablo.jpg?dl=0","type":"COVER","place":390}],"link_set":[{"id":642,"url":"https://www.google.com/maps/place/Templo+Evangelico+San+Pablo/@32.530345,-117.1176508,19z/data=!4m2!3m1!1s0x0000000000000000:0x4f76954d9a7f804d","type":"1","place":390}]},{"id":391,"name":"Terraza Vallarta","latitud":"32.5335985","longitude":"-117.123386","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":310,"url":"https://www.dropbox.com/s/zjr87tzfi5bx0ou/terraza-vallarta.png?dl=0","type":"COVER","place":391}],"link_set":[{"id":643,"url":"https://www.google.com/maps/place/Terraza+Vallarta/@32.5335985,-117.123386,19z/data=!4m2!3m1!1s0x0000000000000000:0xd2c1cc84a2f17010","type":"1","place":391},{"id":644,"url":"http://hungryhiker-tj.com/menus/menuTerrazaV.html","type":"3","place":391}]},{"id":392,"name":"The artist BBQ Lounge","latitud":"32.5303112","longitude":"-117.1195447","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":311,"url":"https://www.dropbox.com/s/65pymjsh6jzjyl2/the-artist-bbq-lounge.jpg?dl=0","type":"COVER","place":392}],"link_set":[{"id":645,"url":"https://www.google.com/maps/place/The+artist+BBQ+Lounge/@32.5303112,-117.1195447,20z/data=!4m2!3m1!1s0x0000000000000000:0x826bb0a02fd0dc20","type":"1","place":392}]},{"id":393,"name":"The Green house","latitud":"32.5154799","longitude":"-117.1166441","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":312,"url":"https://www.dropbox.com/s/1004ia5wxbwxhau/the-greenhouse-tijuana.jpg?dl=0","type":"COVER","place":393}],"link_set":[{"id":646,"url":"https://www.google.com/maps/place/The+Green+house/@32.5154799,-117.1166441,19z/data=!4m2!3m1!1s0x0000000000000000:0x90d402ac7b5c3052","type":"1","place":393},{"id":647,"url":"https://www.facebook.com/thegreenhousetj/","type":"2","place":393}]},{"id":394,"name":"THE PET SHOP","latitud":"32.5133426","longitude":"-117.1122296","code":"","categories":[{"id":6,"name":"Salud"}],"status":1,"image_set":[{"id":313,"url":"https://www.dropbox.com/s/spd4400xepeq59j/the-pet-shop.jpg?dl=0","type":"COVER","place":394}],"link_set":[{"id":648,"url":"https://www.google.com/maps/place/THE+PET+SHOP/@32.5133426,-117.1122296,21z/data=!4m2!3m1!1s0x0000000000000000:0x71aa434b2df34c84","type":"3","place":394},{"id":649,"url":"https://www.facebook.com/The-Pet-Shop-744728412252462/?fref=ts","type":"2","place":394}]},{"id":395,"name":"Thrifty Playas","latitud":"32.5282318","longitude":"-117.122416","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":314,"url":"https://www.dropbox.com/s/bzqf95anhfjq2j4/thrifty.jpg?dl=0","type":"COVER","place":395}],"link_set":[{"id":650,"url":"https://www.google.com/maps/place/Thrifty+Playas/@32.5282318,-117.122416,18z/data=!4m2!3m1!1s0x0000000000000000:0x6ec0dd8875d076bf","type":"1","place":395},{"id":651,"url":"https://foursquare.com/v/thrifty-playas/4dbda7995da3ff58ec6863e3","type":"4","place":395},{"id":652,"url":"https://www.facebook.com/ThriftyPlayas/?fref=ts","type":"2","place":395}]},{"id":396,"name":"Tienda International Jeans","latitud":"32.5087324","longitude":"-117.1193295","code":"","categories":[{"id":4,"name":"Tienda"}],"status":5,"image_set":[],"link_set":[{"id":653,"url":"https://www.google.com/maps/place/Tienda+International+Jeans/@32.5087324,-117.1193295,20z/data=!4m2!3m1!1s0x0000000000000000:0x2b2763bd32242e00","type":"1","place":396}]},{"id":397,"name":"TELNOR PLAYAS","latitud":"32.5330498","longitude":"-117.1145848","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":344,"url":"https://www.dropbox.com/s/e03yrz91nasqz6e/telnor.png?dl=0","type":"COVER","place":397}],"link_set":[{"id":654,"url":"https://www.google.com/maps/place/TiendaTELNOR+PLAYAS/@32.5330498,-117.1145848,20z/data=!4m2!3m1!1s0x0000000000000000:0xa302931e0db93eba","type":"1","place":397},{"id":655,"url":"https://foursquare.com/v/telnor-playas/4cea02dfbaa6a1cdb5fd366c","type":"4","place":397}]},{"id":398,"name":"Tiny Toon","latitud":"32.5183063","longitude":"-117.11981","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":315,"url":"https://www.dropbox.com/s/azhkh07fmln4t9m/tiny-toon-stereo-playas.jpg?dl=0","type":"COVER","place":398}],"link_set":[{"id":656,"url":"https://www.google.com/maps/place/Tiny+Toon/@32.5183063,-117.119818,20z/data=!4m2!3m1!1s0x0000000000000000:0xc857060868b57dd6","type":"1","place":398},{"id":657,"url":"https://www.facebook.com/tinytoonstereoplayas","type":"2","place":398}]},{"id":399,"name":"Tito's","latitud":"32.5313069","longitude":"-117.1124082","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":316,"url":"https://www.dropbox.com/s/mr2x3yn8867v661/titos.gif?dl=0","type":"COVER","place":399}],"link_set":[{"id":658,"url":"https://www.google.com/maps/place/Tito's/@32.5313069,-117.1124082,20z/data=!4m2!3m1!1s0x0000000000000000:0xa23d0486f1e2b89a","type":"1","place":399},{"id":659,"url":"https://foursquare.com/v/titos/4b7cc5d8f964a520f6a42fe3","type":"4","place":399}]},{"id":400,"name":"Tm Davalos","latitud":"32.5122513","longitude":"-117.1207","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":660,"url":"https://www.google.com/maps/place/TM+D%C3%A1valos/@32.5122513,-117.1207,20z/data=!4m2!3m1!1s0x0000000000000000:0x768901269f8ddcfc","type":"1","place":400}]},{"id":401,"name":"Tooginos Playas","latitud":"32.5321784","longitude":"-117.123199","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":317,"url":"https://www.dropbox.com/s/t0h6eh7gt8g391g/tooginos.jpg?dl=0","type":"COVER","place":401}],"link_set":[{"id":661,"url":"https://www.google.com/maps/place/Tooginos+Playas/@32.5321784,-117.123199,18z/data=!4m2!3m1!1s0x0000000000000000:0x13eb5285b1963c1f","type":"1","place":401}]},{"id":402,"name":"Top Computers Venta Y Reparacion reparacion","latitud":"32.5298905","longitude":"-117.1223943","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":662,"url":"https://www.google.com/maps/place/Top+Computers+Venta+Y+Reparacion+reparacion/@32.5298905,-117.1223943,18z/data=!4m2!3m1!1s0x0000000000000000:0xc43509ee8064fc03","type":"1","place":402}]},{"id":403,"name":"Tortas Ahogadas en Tijuana \"El Jalisciense\"","latitud":"32.5238422","longitude":"-117.1217333","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":318,"url":"https://www.dropbox.com/s/z29a6acejoyqs55/tortas-ahogadas-el-jalisciense.jpg?dl=0","type":"COVER","place":403}],"link_set":[{"id":663,"url":"https://www.google.com/maps/place/Tortas+Ahogadas+en+Tijuana+%22El+Jalisciense%22/@32.5238422,-117.1217333,19z/data=!4m2!3m1!1s0x0000000000000000:0x48e15f4ab5f047b8","type":"1","place":403}]},{"id":404,"name":"Tortas Playas","latitud":"32.5070906","longitude":"-117.1215859","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":319,"url":"https://www.dropbox.com/s/y6umq5l7wy7jdyr/tortas-playas.png?dl=0","type":"COVER","place":404}],"link_set":[{"id":664,"url":"https://www.google.com/maps/place/Tortas+Playas/@32.5070906,-117.1215859,21z/data=!4m2!3m1!1s0x0000000000000000:0xdb8a30f3cb433778","type":"1","place":404}]},{"id":405,"name":"TORTILLAS DE HARINA MI ABUELITA","latitud":"32.5125539","longitude":"-117.1198378","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":320,"url":"https://www.dropbox.com/s/w990ihn1rtp2a9n/tortillas-de-harina-mi-abuelita.png?dl=0","type":"COVER","place":405}],"link_set":[{"id":665,"url":"https://www.google.com/maps/place/TORTILLAS+DE+HARINA+MI+ABUELITA/@32.5125539,-117.1198378,20z/data=!4m2!3m1!1s0x0000000000000000:0xa4fc6ecaea5948dd","type":"1","place":405}]},{"id":406,"name":"TortillerÃ­a Jenny Playas","latitud":"32.518874","longitude":"-117.116763","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":321,"url":"https://www.dropbox.com/s/xmaipa5oswraiwr/tortilleria-jenny-playas.jpg?dl=0","type":"COVER","place":406}],"link_set":[{"id":666,"url":"https://www.google.com/maps/place/Tortiller%C3%ADa+Jenny+Playas/@32.518874,-117.116763,20z/data=!4m2!3m1!1s0x0000000000000000:0x2d4120f1e18118b9","type":"1","place":406},{"id":667,"url":"http://tortilleriasjenny.com/","type":"3","place":406}]},{"id":407,"name":"TORTILLERIA Y MOLINO Mikky","latitud":"32.521956","longitude":"-117.116358","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":322,"url":"https://www.dropbox.com/s/vy6u43egg6am2ku/tortilleria-y-molino-mikky.jpg?dl=0","type":"COVER","place":407}],"link_set":[{"id":668,"url":"https://www.google.com/maps/place/TORTILLERIA+Y+MOLINO+Mikky/@32.521956,-117.116358,19z/data=!4m2!3m1!1s0x0000000000000000:0xd92176090ce1daf8","type":"1","place":407}]},{"id":408,"name":"Transmisiones R y R","latitud":"32.5188581","longitude":"-117.1159235","code":"","categories":[{"id":1,"name":"Autos"}],"status":5,"image_set":[],"link_set":[{"id":669,"url":"https://www.google.com/maps/place/Transmisiones+R+y+R/@32.5188581,-117.1159235,20z/data=!4m2!3m1!1s0x0000000000000000:0x0bc3b9e189b9db17","type":"1","place":408}]},{"id":409,"name":"TRANSMISIONES RIVAS","latitud":"32.5096609","longitude":"-117.116929","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":324,"url":"https://www.dropbox.com/s/8yvx6qn4p41h1py/transmisiones-automaticas-rivas.png?dl=0","type":"COVER","place":409}],"link_set":[{"id":670,"url":"https://www.google.com/maps/place/TRANSMISIONES+RIVAS/@32.5096609,-117.116929,18z/data=!4m2!3m1!1s0x0000000000000000:0xf0532db58fa77bd6","type":"1","place":409}]},{"id":410,"name":"Tuxedos Jess","latitud":"32.5310031","longitude":"-117.116881","code":"","categories":[{"id":9,"name":"ropa"}],"status":1,"image_set":[{"id":325,"url":"https://www.dropbox.com/s/sgjj5vgam7wurme/tuxedos-jess.png?dl=0","type":"COVER","place":410}],"link_set":[{"id":671,"url":"https://www.google.com/maps/place/Tuxedos+Jess/@32.5310031,-117.116881,19z/data=!4m2!3m1!1s0x0000000000000000:0xa491f213ca949317","type":"1","place":410}]},{"id":411,"name":"U.H PLAYAS DE TIJUANA","latitud":"32.5149484","longitude":"-117.1166173","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":672,"url":"https://www.google.com/maps/place/U.H+PLAYAS+DE+TIJUANA/@32.5149484,-117.1166173,19z/data=!4m2!3m1!1s0x0000000000000000:0x655ba31d88028177","type":"1","place":411}]},{"id":412,"name":"Ultrarti-K","latitud":"32.5292776","longitude":"-117.1182409","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":673,"url":"https://www.google.com/maps/place/Ultrarti-K/@32.5292776,-117.1182409,19z/data=!4m2!3m1!1s0x0000000000000000:0xe1d3eb7add981fdd","type":"1","place":412}]},{"id":413,"name":"UNIFORMES Y BORDADOS JAER","latitud":"32.518874","longitude":"-117.116763","code":"","categories":[{"id":9,"name":"ropa"}],"status":1,"image_set":[{"id":326,"url":"https://www.dropbox.com/s/4qjn2s2mct712f9/uniformes-jaer.png?dl=0","type":"COVER","place":413}],"link_set":[{"id":674,"url":"https://www.google.com/maps/place/UNIFORMES+Y+BORDADOS+JAER/@32.518874,-117.116763,20z/data=!4m2!3m1!1s0x0000000000000000:0x20ae480f02103aaa","type":"1","place":413},{"id":675,"url":"https://www.facebook.com/uniformesjaertj/","type":"2","place":413}]},{"id":414,"name":"Universo Mueblero","latitud":"32.5279704","longitude":"-117.1121477","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":327,"url":"https://www.dropbox.com/s/nnodj9uy8lyos4v/universo-mueblero.png?dl=0","type":"COVER","place":414}],"link_set":[{"id":676,"url":"https://www.google.com/maps/place/Universo+Mueblero/@32.5279704,-117.1121477,21z/data=!4m2!3m1!1s0x0000000000000000:0xef14db180de102c3","type":"1","place":414},{"id":677,"url":"https://www.facebook.com/Universo-Mueblero-Playas-1443207885994803/","type":"2","place":414}]},{"id":415,"name":"URBANO PIZZA ARTESANAL","latitud":"32.5264066","longitude":"-117.1155367","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":328,"url":"https://www.dropbox.com/s/l4qf4cfpf6ylda5/urbano-pizza-artesanal.jpg?dl=0","type":"COVER","place":415}],"link_set":[{"id":678,"url":"https://www.google.com/maps/place/URBANO+PIZZA+ARTESANAL/@32.5264066,-117.1155367,18z/data=!4m2!3m1!1s0x0000000000000000:0x327b430d57c0488a","type":"1","place":415},{"id":679,"url":"https://foursquare.com/v/urbano-pizza-artesanal/4f88f174e4b0ab5c877f5561","type":"4","place":415},{"id":680,"url":"https://www.facebook.com/Urbano.Pizza.Artesanal/?fref=ts","type":"2","place":415}]},{"id":416,"name":"Veterinaria Pet ClÃ­nica Playas","latitud":"32.5132912","longitude":"-117.121242","code":"","categories":[{"id":6,"name":"Salud"}],"status":1,"image_set":[{"id":369,"url":"https://www.dropbox.com/s/dv4u783bc6rczyq/veterinaria-pet-clinica-playas.png?dl=0","type":"COVER","place":416}],"link_set":[{"id":681,"url":"https://www.google.com/maps/place/Veterinaria+Pet+Cl%C3%ADnica+Playas/@32.5132912,-117.121242,18z/data=!4m2!3m1!1s0x0000000000000000:0x79c8fae809f9c218","type":"1","place":416}]},{"id":417,"name":"VILLA BONITA","latitud":"32.5330498","longitude":"-117.1145848","code":"","categories":[{"id":10,"name":"Servicios"}],"status":1,"image_set":[{"id":329,"url":"https://www.dropbox.com/s/873bx7rfcdh2zez/villa-bonita.jpg?dl=0","type":"COVER","place":417}],"link_set":[{"id":682,"url":"https://www.google.com/maps/place/VILLA+BONITA/@32.5330498,-117.1145848,20z/data=!4m2!3m1!1s0x0000000000000000:0x4f7cbcb17f5f05a4","type":"1","place":417}]},{"id":418,"name":"VIP Barber Shop","latitud":"32.522906","longitude":"-117.1190887","code":"","categories":[{"id":5,"name":"Belleza"}],"status":1,"image_set":[{"id":330,"url":"https://www.dropbox.com/s/ktjtf0dri8etmeo/vip-barber-shop.JPG?dl=0","type":"COVER","place":418}],"link_set":[{"id":683,"url":"https://www.google.com/maps/place/VIP+Barber+Shop/@32.522906,-117.1190887,18z/data=!4m2!3m1!1s0x0000000000000000:0x7680f1f782718f12","type":"1","place":418}]},{"id":419,"name":"Virtual Place Computadoras","latitud":"32.5165333","longitude":"-117.1167601","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":684,"url":"https://www.google.com/maps/place/Computadoras+Place+Virtual/@32.5165333,-117.1167601,20z/data=!4m2!3m1!1s0x0000000000000000:0xc70300f6da6dd44c","type":"1","place":419}]},{"id":420,"name":"Abarrotes Viva MÃ©xico","latitud":"32.5126403","longitude":"-117.1161765","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":2,"url":"https://www.dropbox.com/s/6h1lkj7fbgbltdz/abarrotes-viva-mexico.jpg?dl=0","type":"COVER","place":420}],"link_set":[{"id":685,"url":"https://www.google.com/maps/place/Viva+M%C3%A9xico+ABARROTES/@32.5126403,-117.1161765,20z/data=!4m2!3m1!1s0x0000000000000000:0x2a8c5642cc8aaec1","type":"1","place":420},{"id":686,"url":"https://www.facebook.com/abarrotesvivamexico/?ref=ts&fref=ts","type":"2","place":420}]},{"id":421,"name":"VIVERO DE PLAYAS","latitud":"32.5322482","longitude":"-117.1149643","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":331,"url":"https://www.dropbox.com/s/r2ytcj9uzc0fcuk/vivero-de-playas.jpg?dl=0","type":"COVER","place":421}],"link_set":[{"id":687,"url":"https://www.google.com/maps/place/VIVERO+DE+PLAYAS/@32.5322482,-117.1149643,20z/data=!4m2!3m1!1s0x0000000000000000:0x3721af71422b895f","type":"1","place":421}]},{"id":422,"name":"VR8 Transmissions","latitud":"32.522501","longitude":"-117.1161863","code":"","categories":[{"id":1,"name":"Autos"}],"status":1,"image_set":[{"id":332,"url":"https://www.dropbox.com/s/g8hllb30smyep0b/vr8-transmissions.png?dl=0","type":"COVER","place":422}],"link_set":[{"id":688,"url":"https://www.google.com/maps/place/VR8+Transmissions/@32.522501,-117.1161863,19z/data=!4m2!3m1!1s0x0000000000000000:0xbf5e38ab7a5855cb","type":"1","place":422}]},{"id":423,"name":"Waldo's Playas Tijuana (BC)","latitud":"32.5321894","longitude":"-117.1131538","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":333,"url":"https://www.dropbox.com/s/mts40z2oflyjzyn/waldos.gif?dl=0","type":"COVER","place":423}],"link_set":[{"id":689,"url":"https://www.google.com/maps/place/Waldo's+Playas+Tijuna+(BC)/@32.5321894,-117.1131538,20z/data=!4m2!3m1!1s0x0000000000000000:0x156f94693835348c","type":"1","place":423}]},{"id":424,"name":"Walmart Playas de Tijuana","latitud":"32.5281876","longitude":"-117.1188873","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":334,"url":"https://www.dropbox.com/s/vnvxyzikx2vwg72/walmart.png?dl=0","type":"COVER","place":424}],"link_set":[{"id":690,"url":"https://www.google.com/maps/place/Walmart+Playas+de+Tijuana/@32.5281876,-117.1188873,19z/data=!4m2!3m1!1s0x0000000000000000:0x5008fd80b6afae4d","type":"1","place":424},{"id":691,"url":"https://foursquare.com/v/walmart-playas-de-tijuana/52b33927498eb8a83dc648f2","type":"4","place":424},{"id":692,"url":"http://www.walmart.com.mx/#/tecnologia-y-hogar","type":"3","place":424}]},{"id":425,"name":"XTREME FOX","latitud":"32.5311497","longitude":"-117.1136742","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":336,"url":"https://www.dropbox.com/s/zkqhldhw6deef2o/xtreme-fox.jpg?dl=0","type":"COVER","place":425}],"link_set":[{"id":693,"url":"https://www.google.com/maps/place/XTREME+FOX/@32.5311497,-117.1136742,19z/data=!4m2!3m1!1s0x0000000000000000:0xfcd89230cdff8ccb","type":"1","place":425}]},{"id":426,"name":"Zoo Sports Bar","latitud":"32.5305586","longitude":"-117.1208502","code":"","categories":[{"id":2,"name":"Bar"}],"status":1,"image_set":[{"id":339,"url":"https://www.dropbox.com/s/a6931vkl0kco7oz/zoo-sports-bar.png?dl=0","type":"COVER","place":426}],"link_set":[{"id":694,"url":"https://www.google.com/maps/place/Zoo+Sports+Bar/@32.5305586,-117.1208502,19z/data=!4m2!3m1!1s0x0000000000000000:0x69daea745bb654ad","type":"1","place":426}]},{"id":427,"name":"Toyi-Sushi","latitud":"32.5314426","longitude":"-117.1151389","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":323,"url":"https://www.dropbox.com/s/omexh7a9fifl9x5/toyi-sushi.png?dl=0","type":"COVER","place":427}],"link_set":[{"id":695,"url":"https://www.google.com.mx/maps/place/Toyi-sushi+Playas/@32.5314426,-117.1151389,15z/data=!4m2!3m1!1s0x0:0x6be233971e825734","type":"1","place":427},{"id":696,"url":"https://foursquare.com/v/toyisushi/4d8286e83e916dcbefef83d2","type":"4","place":427},{"id":697,"url":"http://toyisushi.com/","type":"3","place":427},{"id":698,"url":"https://www.facebook.com/toyisushii","type":"2","place":427}]},{"id":428,"name":"Diente De Leon Cafe","latitud":"32.5293635","longitude":"-117.1256156","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":88,"url":"https://www.dropbox.com/s/mwh6v6g2xb2cbt7/diente-de-leon-cafe.jpg?dl=0","type":"COVER","place":428}],"link_set":[{"id":699,"url":"https://www.google.com.mx/maps/place/Diente+de+Leon/@32.5293635,-117.1256156,17z/data=!3m1!4b1!4m2!3m1!1s0x80d94ba6c0ad1c83:0x2b992795a04cf255","type":"1","place":428},{"id":700,"url":"https://foursquare.com/v/diente-de-leon/521158da11d21f2a02c3e376","type":"4","place":428},{"id":701,"url":"https://www.facebook.com/Diente-de-Le%C3%B3n-Caf%C3%A9-532420923488204/","type":"2","place":428}]},{"id":429,"name":"Bar Matt","latitud":"32.5238783","longitude":"-117.1201161","code":"","categories":[{"id":2,"name":"Bar"}],"status":1,"image_set":[{"id":27,"url":"https://www.dropbox.com/s/lewamvajymk54nb/bar-matt.png?dl=0","type":"COVER","place":429}],"link_set":[{"id":702,"url":"https://www.google.com.mx/maps/place/Matt+Bar/@32.5238783,-117.1201161,15z/data=!4m6!1m3!3m2!1s0x0:0xec4a5a44b3be6521!2sMatt+Bar!3m1!1s0x0:0xec4a5a44b3be6521","type":"1","place":429},{"id":703,"url":"https://foursquare.com/v/bar-matt/4d282e5977a2a1cd22f45fb7","type":"4","place":429},{"id":704,"url":"https://www.facebook.com/Matt-Bar-391673464221943/","type":"2","place":429}]},{"id":430,"name":"La casa del mole","latitud":"32.5232524","longitude":"-117.1147777","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":158,"url":"https://www.dropbox.com/s/ldtym4q1wunigcc/la-casa-del-mole.jpg?dl=0","type":"COVER","place":430}],"link_set":[{"id":705,"url":"https://www.google.com.mx/maps/place/Rinc%C3%B3n+Mexicano/@32.5232524,-117.1147777,17z/data=!3m1!4b1!4m2!3m1!1s0x80d94bb12234add5:0x672358cd628f75c8","type":"1","place":430},{"id":706,"url":"https://foursquare.com/v/la-casa-del-mole/4c9e55c354c8a1cd7fc78c4b","type":"4","place":430}]},{"id":432,"name":"Restaurant Ruedo","latitud":"32.5310114","longitude":"-117.1203488","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":265,"url":"https://www.dropbox.com/s/tnu13oc2ha03r94/ruedo-restaurante-asador.jpg?dl=0","type":"COVER","place":432}],"link_set":[{"id":710,"url":"https://foursquare.com/v/restaurant-ruedo/4d052398a2685481647cbbbd","type":"4","place":432},{"id":711,"url":"https://www.facebook.com/Ruedo-Restaurante-Asador-941907482512030/?rf=227504240677707","type":"2","place":432}]},{"id":433,"name":"Dax Playas","latitud":"32.5326102","longitude":"-117.1134394","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":81,"url":"https://www.dropbox.com/s/uo78wevreovxp49/dax.png?dl=0","type":"COVER","place":433}],"link_set":[{"id":712,"url":"https://foursquare.com/v/dax-playas/4ce6ff33fe90a35d8676390e","type":"4","place":433}]},{"id":434,"name":"Martinelli's New York Pizza","latitud":"32.5275753","longitude":"-117.1228723","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":192,"url":"https://www.dropbox.com/s/4p10v7tky5k4rig/martinellis-new-york-pizzeria.jpg?dl=0","type":"COVER","place":434}],"link_set":[{"id":713,"url":"https://foursquare.com/v/martinellis-new-york-pizza/4e2ba9dd8877b69d49e36d06","type":"4","place":434},{"id":714,"url":"https://www.facebook.com/Martinellis-New-York-Pizzeria-170348146313063/","type":"2","place":434}]},{"id":435,"name":"Tacos Polo","latitud":"32.5283481","longitude":"-117.1206309","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":302,"url":"https://www.dropbox.com/s/ra8j3oeslm6pg81/tacos-polo.jpg?dl=0","type":"COVER","place":435}],"link_set":[{"id":715,"url":"https://foursquare.com/v/tacos-polo/4ce38298bddcb1f738f77c89","type":"4","place":435}]},{"id":436,"name":"Plaza Coronado","latitud":"32.5308492","longitude":" -117.1143706","code":"","categories":[{"id":4,"name":"Tienda"}],"status":1,"image_set":[{"id":244,"url":"https://www.dropbox.com/s/wgmttmww1f4rga5/plaza-coronado.JPG?dl=0","type":"COVER","place":436}],"link_set":[{"id":716,"url":"https://foursquare.com/explore?mode=url&near=Tijuana%2C%20BCN&nearGeoId=72057594041909545","type":"4","place":436}]},{"id":437,"name":"Subway Playas","latitud":"32.5286059","longitude":"-117.1164251","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":288,"url":"https://www.dropbox.com/s/ffw33gv9fya01zd/subway.svg?dl=0","type":"COVER","place":437}],"link_set":[{"id":717,"url":"https://foursquare.com/explore?mode=url&near=Tijuana%2C%20BCN&nearGeoId=72057594041909545","type":"4","place":437},{"id":718,"url":"https://subwaymexico.com.mx/","type":"3","place":437}]},{"id":438,"name":"Tacos Aaron Playas","latitud":"32.5306774","longitude":"-117.1168248","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":297,"url":"https://www.dropbox.com/s/e5kw22usinsetwv/tacos-aaron.jpg?dl=0","type":"COVER","place":438}],"link_set":[{"id":719,"url":"https://foursquare.com/v/tacos-aaron-playas/4ca7555fa6e08cfa995f8394","type":"4","place":438},{"id":720,"url":"https://www.facebook.com/TACOS-AARON-421054420284/","type":"2","place":438}]},{"id":439,"name":"Koi Sushi","latitud":"32.5289609","longitude":" -117.1199844","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":370,"url":"https://www.dropbox.com/s/ymrniuanhk69oyx/koi-sushi.jpg?dl=0","type":"COVER","place":439}],"link_set":[{"id":721,"url":"https://foursquare.com/v/koi-sushi/546fd891498e78d5fafd7d31","type":"4","place":439}]},{"id":440,"name":"Washmobile Tortas","latitud":"32.5265344","longitude":"-117.1165566","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":335,"url":"https://www.dropbox.com/s/4yvlhl8cteizjjp/washmobile-tortas.jpg?dl=0","type":"COVER","place":440}],"link_set":[{"id":722,"url":"https://foursquare.com/v/tortas-washmobile-playas/4d55e5f8ba5b224b8f1d1414","type":"4","place":440},{"id":723,"url":"https://www.facebook.com/Tortas-Washmobile-Playas-238414556289134/","type":"2","place":440}]},{"id":441,"name":"Tacos de Mariscos estrella del mar","latitud":"32.5265344","longitude":"-117.1165566","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":724,"url":"https://foursquare.com/v/tacos-de-mariscos-estrella-del-mar/4d4f2255a0b0a09389e05483","type":"4","place":441},{"id":725,"url":"http://mariscostitos.com/","type":"3","place":441}]},{"id":442,"name":"Zhi CafÃ©","latitud":"32.5281214","longitude":"-117.1235625","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":338,"url":"https://www.dropbox.com/s/b7hsfm5xcf6l4ei/zhi-cafe.jpg?dl=0","type":"COVER","place":442}],"link_set":[{"id":726,"url":"https://foursquare.com/v/zhi-caf%C3%A9/4e10cff01838f8ad81561b29","type":"4","place":442},{"id":727,"url":"https://www.facebook.com/zhicafeplayas/","type":"2","place":442}]},{"id":443,"name":"Becerra Mariscos","latitud":"32.5290339","longitude":"-117.1231173","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":32,"url":"https://www.dropbox.com/s/m5ckz6b8uwo4eso/becerra-mariscos.JPG?dl=0","type":"COVER","place":443}],"link_set":[{"id":728,"url":"https://foursquare.com/explore?mode=url&near=Tijuana%2C%20BCN&nearGeoId=72057594041909545","type":"4","place":443}]},{"id":444,"name":"Pancake House","latitud":"32.5295619","longitude":"-117.1168637","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":230,"url":"https://www.dropbox.com/s/25qm5hbt0nl7e7c/pancake-house-playas.jpg?dl=0","type":"COVER","place":444}],"link_set":[{"id":729,"url":"https://foursquare.com/v/pancake-house/4d03cb1c9d33a1436badb678","type":"4","place":444}]},{"id":445,"name":"Malvet","latitud":"32.5236278","longitude":"-117.1203774","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":371,"url":"https://www.dropbox.com/s/q6wfw8g3esr25gk/malvet.jpg?dl=0","type":"COVER","place":445}],"link_set":[{"id":730,"url":"https://foursquare.com/v/malvet/548c98ff498ed1c276649cd7","type":"4","place":445}]},{"id":446,"name":"Raspados Playas","latitud":"32.5264999","longitude":"-117.1132132","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":255,"url":"https://www.dropbox.com/s/j88bnnk7n62kdf8/raspados-playas.jpg?dl=0","type":"COVER","place":446}],"link_set":[{"id":731,"url":"https://foursquare.com/v/raspados-playas/4fdcf658e4b019d60705ea54","type":"4","place":446},{"id":732,"url":"https://www.facebook.com/raspadosplayaslaspalmas/?rf=199532733409390","type":"2","place":446}]},{"id":447,"name":"Tacos La Choza","latitud":"32.5203078","longitude":"-117.1153429","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":372,"url":"https://www.dropbox.com/s/twtavccrxf2cgr5/la-choza-tacos.jpg?dl=0","type":"COVER","place":447}],"link_set":[{"id":733,"url":"https://foursquare.com/v/tacos-la-choza/4eb49eb9be7bfc2849f77c66","type":"4","place":447}]},{"id":448,"name":"Los Barriles - Nieve De Garrafa","latitud":"32.5200092","longitude":"-117.1149513","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":183,"url":"https://www.dropbox.com/s/8n0kgt8qu972ouo/los-barriles-nieve-de-garrafa.png?dl=0","type":"COVER","place":448}],"link_set":[{"id":734,"url":"https://foursquare.com/v/los-barriles--nieve-de-garrafa/4eaddce9b634339687eddc84","type":"4","place":448},{"id":735,"url":"https://www.facebook.com/nievelosbarriles/?fref=ts","type":"2","place":448}]},{"id":449,"name":"Huarachon","latitud":"32.5159653","longitude":"-117.1194306","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":373,"url":"https://www.dropbox.com/s/lqyifuu5zhnxyjo/el-huarachon.jpg?dl=0","type":"COVER","place":449}],"link_set":[{"id":736,"url":"https://foursquare.com/v/el-huarachon/4d45e688bbb1a1431f5a5772","type":"4","place":449}]},{"id":450,"name":"Mr Pollo","latitud":"32.5175937","longitude":"-117.1187225","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":374,"url":"https://www.dropbox.com/s/ljztypnekfeur8w/mr.pollo.jpg?dl=0","type":"COVER","place":450}],"link_set":[{"id":737,"url":"https://foursquare.com/v/mr-pollo/4e2b8f72ae605c533a39fd12","type":"4","place":450}]},{"id":451,"name":"Hunab ku","latitud":"32.518417","longitude":"-117.1171239","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":375,"url":"https://www.dropbox.com/s/560v0d6vahyup40/hanab-ku.jpg?dl=0","type":"COVER","place":451}],"link_set":[{"id":738,"url":"https://foursquare.com/v/hunabku/51b15622498eaadf2eea6696","type":"4","place":451},{"id":757,"url":"https://www.facebook.com/TacosHunabKu","type":"2","place":451}]},{"id":452,"name":"Tortas Cubanas Las Del Camioncito Rojo","latitud":"32.5121021","longitude":"-117.1159544","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":739,"url":"https://foursquare.com/v/tortas-cubanas-las-del-camioncito-rojo/4e4866a218a8f9804ce3e641","type":"4","place":452}]},{"id":453,"name":"M&m Enbulturas","latitud":"32.5102203","longitude":"-117.1164265","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":740,"url":"https://foursquare.com/v/mm-enbulturas/5109dce0e4b0f8bd9cbb9c14","type":"4","place":453}]},{"id":454,"name":"Panaderia Moreliana","latitud":"32.5096412","longitude":"-117.1162977","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":228,"url":"https://www.dropbox.com/s/adhr4hdnxsawn56/panaderia-la-moreliana-playas.jpg?dl=0","type":"COVER","place":454}],"link_set":[{"id":741,"url":"https://foursquare.com/v/panaderia-moreliana/52c9ff81498ef7cf881399b9","type":"4","place":454},{"id":742,"url":"https://www.facebook.com/panaderia.lamorelianaplayas?ref=br_rs","type":"2","place":454}]},{"id":455,"name":"Escuela Chivas Playas","latitud":"32.5202625","longitude":"-117.1146401","code":"","categories":[{"id":8,"name":"Ejercicio"}],"status":5,"image_set":[],"link_set":[{"id":743,"url":"https://foursquare.com/v/escuela-chivas-playas/518c27ee2fc69e6da6f9e830","type":"4","place":455}]},{"id":456,"name":"La Gruta Gym","latitud":"32.5063846","longitude":"-117.1217294","code":"","categories":[{"id":8,"name":"Ejercicio"}],"status":1,"image_set":[{"id":164,"url":"https://www.dropbox.com/s/6jxx3x1veow482t/la-gruta-gym-playas.jpg?dl=0","type":"COVER","place":456}],"link_set":[{"id":744,"url":"https://www.google.com.mx/maps/place/La+Gruta+Gym/@32.5063846,-117.1217294,15z/data=!4m2!3m1!1s0x0:0xefb4aa1692e22354","type":"1","place":456},{"id":745,"url":"https://foursquare.com/v/la-gruta-gym/50f7619df136629a2109a6f1","type":"4","place":456},{"id":746,"url":"https://www.facebook.com/lagruta.gymplayas","type":"2","place":456}]},{"id":457,"name":"Motel el Indio","latitud":"32.4994416","longitude":"-117.1220332","code":"","categories":[{"id":10,"name":"Servicios"}],"status":5,"image_set":[],"link_set":[{"id":747,"url":"https://foursquare.com/v/motel-el-indio/534057eb498e4109514aef0e","type":"4","place":457}]},{"id":458,"name":"Brevno Gymnastics","latitud":"32.5041029","longitude":"-117.1175852","code":"","categories":[{"id":8,"name":"Ejercicio"}],"status":1,"image_set":[{"id":38,"url":"https://www.dropbox.com/s/22tcjvlwludk4qy/brevno-gymnastics.jpg?dl=0","type":"COVER","place":458}],"link_set":[{"id":748,"url":"https://www.google.com.mx/maps/place/Brevno/@32.5041029,-117.1175852,15z/data=!4m2!3m1!1s0x0:0x86cb310f3ea151af","type":"1","place":458},{"id":749,"url":"https://foursquare.com/v/brevno-gymnastics/4e6af06ee4cdb37551ce9892","type":"4","place":458},{"id":750,"url":"https://www.facebook.com/Brevnogymnasticstijuana","type":"2","place":458}]},{"id":459,"name":"Botanas & Miscelanea Playas","latitud":"32.5118555","longitude":"-117.1185571","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":751,"url":"https://foursquare.com/v/botanas--miscelanea-playas/4dcefebf183899ddfae1bfb6","type":"4","place":459}]},{"id":460,"name":"Isabel Antojitos Mexicanos Cocina Movil","latitud":"32.5124707","longitude":"-117.1180528","code":"","categories":[{"id":3,"name":"Comida"}],"status":5,"image_set":[],"link_set":[{"id":752,"url":"https://foursquare.com/v/isabel-antojitos-mexicanos-cocina-movil/4d7db33bb25d6dcb0e79ab42","type":"4","place":460}]},{"id":461,"name":"La Creperia","latitud":"32.5254339","longitude":"-117.1229331","code":"","categories":[{"id":3,"name":"Comida"}],"status":1,"image_set":[{"id":163,"url":"https://www.dropbox.com/s/jcclwdjzmdwsi8l/la-creperia.jpg?dl=0","type":"COVER","place":461}],"link_set":[{"id":753,"url":"https://foursquare.com/v/la-creperia/528c329e11d2f3a3c67dcab9","type":"4","place":461},{"id":754,"url":"https://www.facebook.com/LACREPERIA.TJ","type":"2","place":461}]}]; /*eslint-enable */

/***/ }
/******/ ]);