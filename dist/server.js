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

	// import routes from '../../build/routes';

	var app = (0, _express2.default)();

	app.set('views', './views');
	app.set('view engine', 'jade');

	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({
	  extended: false
	}));

	app.use(_express2.default.static('static'));

	app.use('/api/', _api2.default);

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
	    _react2.default.createElement(_reactRouter.Route, { path: 'directorio/:category', component: items.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: 'directorio/:category/:place', component: items.default })
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
	              'Directorio',
	              _react2.default.createElement(
	                'span',
	                { className: style.playami },
	                'Playami'
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

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
	          _reactRouter.Link,
	          { className: style.logo, to: '/inicio' },
	          _react2.default.createElement('img', { src: '/images/logo_mint.png', alt: 'Mint IT Media' })
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          'El equipo de Mint IT Media se enorgullese en poner el',
	          _react2.default.createElement(
	            'span',
	            { className: style.yellow },
	            ' Directorio'
	          ),
	          _react2.default.createElement(
	            'span',
	            { className: style.white },
	            'Playami '
	          ),
	          'a disposición de la comunidad de Playas de Tijuana.'
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
	            'Si deseas salir en este directorio, crear tu propio directorio o tienes alguna página o app en mente: '
	          ),
	          _react2.default.createElement(
	            'h2',
	            null,
	            'No dudes en contactarnos'
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
	            { to: 'mailto:mintitmedia.com' },
	            'info@mintitmedia.com'
	          ),
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

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
	            'Conoce otros proyectos de Mint IT Media'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'col-xs-4' },
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: 'http://garitacenter.com', target: '_blank' },
	            _react2.default.createElement('img', { src: '/images/gc_logo.png', alt: 'Garita Center' }),
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
	            { to: 'http://misofertasdetrabajo.com', target: '_blank' },
	            _react2.default.createElement('img', { src: '/images/modt_logo.png', alt: 'Mis ofertas de trabajo' }),
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
	            { to: 'http://gigplaylist.com', target: '_blank' },
	            _react2.default.createElement('img', { src: '/images/gp_logo.png', alt: 'Gig playlist' }),
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

	var _block3 = __webpack_require__(33);

	var _block4 = _interopRequireDefault(_block3);

	var _categories = __webpack_require__(43);

	var _categories2 = _interopRequireDefault(_categories);

	var _places = __webpack_require__(44);

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
	    key: 'filterPlacesByCategoryId',
	    value: function filterPlacesByCategoryId(places, categoryId) {
	      if (categoryId) {
	        return places.filter(function (item) {
	          return item.categories.indexOf(categoryId) !== -1;
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
	        { className: 'container' },
	        _react2.default.createElement(_block2.default, null),
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

	var _card = __webpack_require__(28);

	var _card2 = _interopRequireDefault(_card);

	var _cardMedia = __webpack_require__(29);

	var _cardMedia2 = _interopRequireDefault(_cardMedia);

	var _cardTitle = __webpack_require__(30);

	var _cardTitle2 = _interopRequireDefault(_cardTitle);

	var _cardText = __webpack_require__(31);

	var _cardText2 = _interopRequireDefault(_cardText);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */

	var style = __webpack_require__(32);

	var Block1 = function (_React$Component) {
	  _inherits(Block1, _React$Component);

	  function Block1() {
	    _classCallCheck(this, Block1);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Block1).apply(this, arguments));
	  }

	  _createClass(Block1, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: style.mainBanner2 },
	        _react2.default.createElement(
	          'div',
	          { id: 'carousel-main', className: 'carousel slide', 'data-ride': 'carousel', 'data-interval': 8000 },
	          _react2.default.createElement(
	            'div',
	            { className: 'carousel-inner', role: 'listbox' },
	            _react2.default.createElement(
	              'div',
	              { className: 'item active' },
	              _react2.default.createElement(
	                _card2.default,
	                null,
	                _react2.default.createElement(
	                  _cardMedia2.default,
	                  { overlay: _react2.default.createElement(_cardTitle2.default, { title: '1Overlay title' }) },
	                  _react2.default.createElement('img', { src: '/images/demo.jpg' })
	                ),
	                _react2.default.createElement(
	                  _cardText2.default,
	                  null,
	                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.'
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'item' },
	              _react2.default.createElement(
	                _card2.default,
	                null,
	                _react2.default.createElement(
	                  _cardMedia2.default,
	                  { overlay: _react2.default.createElement(_cardTitle2.default, { title: '2Overlay title' }) },
	                  _react2.default.createElement('img', { src: '/images/demo.jpg' })
	                ),
	                _react2.default.createElement(
	                  _cardText2.default,
	                  null,
	                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.'
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'item' },
	              _react2.default.createElement(
	                _card2.default,
	                { className: 'item' },
	                _react2.default.createElement(
	                  _cardMedia2.default,
	                  { overlay: _react2.default.createElement(_cardTitle2.default, { title: '3Overlay title' }) },
	                  _react2.default.createElement('img', { src: '/images/demo.jpg' })
	                ),
	                _react2.default.createElement(
	                  _cardText2.default,
	                  null,
	                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.'
	                )
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'a',
	            { className: 'left carousel-control ' + style.controls, href: '#carousel-main', role: 'button', 'data-slide': 'prev' },
	            _react2.default.createElement('span', { className: 'glyphicon glyphicon-chevron-left', 'aria-hidden': 'true' }),
	            _react2.default.createElement(
	              'span',
	              { className: 'sr-only' },
	              'Previous'
	            )
	          ),
	          _react2.default.createElement(
	            'a',
	            { className: 'right carousel-control ' + style.controls, href: '#carousel-main', role: 'button', 'data-slide': 'next' },
	            _react2.default.createElement('span', { className: 'glyphicon glyphicon-chevron-right', 'aria-hidden': 'true' }),
	            _react2.default.createElement(
	              'span',
	              { className: 'sr-only' },
	              'Next'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Block1;
	}(_react2.default.Component);

	exports.default = Block1;

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("material-ui/lib/card/card");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("material-ui/lib/card/card-media");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("material-ui/lib/card/card-title");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("material-ui/lib/card/card-text");

/***/ },
/* 32 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"controls":"style__controls___15CM-"};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _category = __webpack_require__(34);

	var _place = __webpack_require__(39);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */


	// const style = require('./style.scss');

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
	        { className: 'row' },
	        _react2.default.createElement(
	          'div',
	          { className: 'col-sm-2 col-xs-12' },
	          _react2.default.createElement(_category.CategoryList, { data: categories, category: category })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'col-sm-10 col-xs-12' },
	          _react2.default.createElement(_place.PlaceList, { data: places, categories: categories })
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _categoryList = __webpack_require__(35);

	var _categoryList2 = _interopRequireDefault(_categoryList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports.CategoryList = _categoryList2.default;

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

	var _list = __webpack_require__(36);

	var _list2 = _interopRequireDefault(_list);

	var _listItem = __webpack_require__(37);

	var _listItem2 = _interopRequireDefault(_listItem);

	var _lodash = __webpack_require__(25);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _slug = __webpack_require__(26);

	var _slug2 = _interopRequireDefault(_slug);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */

	var style = __webpack_require__(38);

	var CategoryList = function (_React$Component) {
	  _inherits(CategoryList, _React$Component);

	  function CategoryList() {
	    _classCallCheck(this, CategoryList);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(CategoryList).apply(this, arguments));
	  }

	  _createClass(CategoryList, [{
	    key: 'renderItems',
	    value: function renderItems(data, category) {
	      if (_lodash2.default.isArray(data)) {
	        return data.map(function (item, index) {
	          var slug = (0, _slug2.default)(item.name);
	          var activeClassName = slug === category ? 'active' : '';
	          return _react2.default.createElement(
	            _listItem2.default,
	            { key: index },
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { to: '/directorio/' + slug, title: item.name, className: style.item + ' ' + activeClassName },
	              item.name
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

	      var activeClassName = category ? '' : 'active';
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _list2.default,
	          null,
	          _react2.default.createElement(
	            _listItem2.default,
	            null,
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { to: '/', title: 'ver todos', className: style.item + ' ' + activeClassName },
	              'Ver todos'
	            )
	          ),
	          this.renderItems(data, category)
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
/* 36 */
/***/ function(module, exports) {

	module.exports = require("material-ui/lib/lists/list");

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = require("material-ui/lib/lists/list-item");

/***/ },
/* 38 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"itemWrapper":"style__itemWrapper___J-zp-","item":"style__item___3QLmn"};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _placeList = __webpack_require__(40);

	var _placeList2 = _interopRequireDefault(_placeList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports.PlaceList = _placeList2.default;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	var _lodash = __webpack_require__(25);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _gridTile = __webpack_require__(41);

	var _gridTile2 = _interopRequireDefault(_gridTile);

	var _slug = __webpack_require__(26);

	var _slug2 = _interopRequireDefault(_slug);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */

	var style = __webpack_require__(42);

	var PlaceList = function (_React$Component) {
	  _inherits(PlaceList, _React$Component);

	  function PlaceList() {
	    _classCallCheck(this, PlaceList);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(PlaceList).apply(this, arguments));
	  }

	  _createClass(PlaceList, [{
	    key: 'getCategoryNames',
	    value: function getCategoryNames(catetoryMap, categories) {
	      var response = [];
	      if (!_lodash2.default.isEmpty(catetoryMap) && _lodash2.default.isArray(categories) && categories.length) {
	        categories.map(function (item) {
	          if (catetoryMap[item]) {
	            response.push(catetoryMap[item]);
	          }
	        });
	      }
	      return response.join(' ');
	    }
	  }, {
	    key: 'getCategoryMap',
	    value: function getCategoryMap(data) {
	      var response = {};
	      if (_lodash2.default.isArray(data) && data.length) {
	        data.map(function (item) {
	          response[item.id] = item.name;
	        });
	      }
	      return response;
	    }
	  }, {
	    key: 'getTitle',
	    value: function getTitle(data, categoryName) {
	      var categorySlug = (0, _slug2.default)(categoryName);
	      var placeSlug = (0, _slug2.default)(data.name);
	      return _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/directorio/' + categorySlug + '/' + placeSlug, title: data.name },
	        data.name
	      );
	    }
	  }, {
	    key: 'renderItems',
	    value: function renderItems(places, categories) {
	      var _this2 = this;

	      if (_lodash2.default.isArray(places) && places.length) {
	        var _ret = function () {
	          var catetoryMap = _this2.getCategoryMap(categories);
	          return {
	            v: places.slice(0, 21).map(function (item, index) {
	              var categoriesNames = _this2.getCategoryNames(catetoryMap, item.categories);
	              return _react2.default.createElement(
	                'div',
	                { className: 'col-sm-4 col-xs-12', key: index },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'row' },
	                  _react2.default.createElement(
	                    _gridTile2.default,
	                    { key: index, title: _this2.getTitle(item, categoriesNames), subtitle: _react2.default.createElement(
	                        'span',
	                        null,
	                        categoriesNames
	                      ), className: style.placeCard },
	                    _react2.default.createElement('img', { src: '/images/placeholder.png' })
	                  )
	                )
	              );
	            })
	          };
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }
	      return null;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var data = _props.data;
	      var categories = _props.categories;

	      return _react2.default.createElement(
	        'div',
	        null,
	        this.renderItems(data, categories)
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
/* 41 */
/***/ function(module, exports) {

	module.exports = require("material-ui/lib/grid-list/grid-tile");

/***/ },
/* 42 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"placeCard":"style__placeCard___kUEUP"};

/***/ },
/* 43 */
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
/* 44 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*eslint-disable */
	exports.default = [{
	  "id": 1,
	  "name": "5 Hermanos",
	  "latitud": "32.5126267",
	  "longitude": "-117.1200228",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 2,
	  "name": "7 Eleven",
	  "latitud": "32.5306814",
	  "longitude": "-117.122861",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 3,
	  "name": "ab el triunfo",
	  "latitud": "32.5219967",
	  "longitude": "-117.1122837",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 4,
	  "name": "REFACCIONARIAS DEL VALLE",
	  "latitud": "32.5190514",
	  "longitude": "-117.1161733",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 5,
	  "name": "ACOMULADORES CHARGERS",
	  "latitud": "32.5130825",
	  "longitude": "-117.1198028",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 6,
	  "name": "Acuario Fitness Center",
	  "latitud": "32.5319438",
	  "longitude": "-117.1166933",
	  "code": "",
	  "categories": [8],
	  "status": 1
	}, {
	  "id": 7,
	  "name": "AEROLIM AEROSERVICIOS Y LIMUSINAS HOLLYWOOD S.A. DE C.V",
	  "latitud": "32.5242502",
	  "longitude": "-117.112682",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 8,
	  "name": "Afinaciones Electronicas Playas",
	  "latitud": "32.5219267",
	  "longitude": "-117.1210145",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 9,
	  "name": "AKI Sushi De Playas",
	  "latitud": "32.5270978",
	  "longitude": "-117.1171725",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 10,
	  "name": "Alfredo Huizar Franco Estetica del MAr",
	  "latitud": "32.5269692",
	  "longitude": "-117.123093",
	  "code": "",
	  "categories": [5],
	  "status": 1
	}, {
	  "id": 11,
	  "name": "All Peoples Church Tijuana",
	  "latitud": "32.5310031",
	  "longitude": "-117.116881",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 12,
	  "name": "All Star Designs",
	  "latitud": "32.5184646",
	  "longitude": "-117.1167549",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 13,
	  "name": "ALTERNATIVA-TIENDA DE ROPA Y NOVEDADES",
	  "latitud": "32.5258256",
	  "longitude": "-117.1214477",
	  "code": "",
	  "categories": [9],
	  "status": 1
	}, {
	  "id": 14,
	  "name": "ANTOJITOS MEXICANOS DELICIAS",
	  "latitud": "32.5184646",
	  "longitude": "-117.1167549",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 15,
	  "name": "Antojitos Puros Sinaloa",
	  "latitud": "32.5113008",
	  "longitude": "-117.1199438",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 16,
	  "name": "Argana Hookah Lounge",
	  "latitud": "32.5140007",
	  "longitude": "-117.1200679",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 17,
	  "name": "Arquimex - home Plans in Mexico",
	  "latitud": "32.5310031",
	  "longitude": "-117.116881",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 18,
	  "name": "Arte y Diseño en Papel",
	  "latitud": "32.5330439",
	  "longitude": "-117.1173692",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 19,
	  "name": "Astorino",
	  "latitud": "32.5330498",
	  "longitude": "-117.1145848",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 20,
	  "name": "Auto Eléctrico Mando's",
	  "latitud": "32.5257055",
	  "longitude": "-117.1132059",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 21,
	  "name": "AUTO PARTES y SERVICIO RANGEL",
	  "latitud": "32.5109389",
	  "longitude": "-117.1200993",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 22,
	  "name": "AUTO SERVICIO montoya",
	  "latitud": "32.522501",
	  "longitude": "-117.1161863",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 23,
	  "name": "AUTO TECH TUNE UP",
	  "latitud": "32.5225803",
	  "longitude": "-117.1208509",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 24,
	  "name": "Autocristales la Villa-Playas",
	  "latitud": "32.5165983",
	  "longitude": "-117.1160567",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 25,
	  "name": "AUTOESTÉREO MARCOPOLO",
	  "latitud": "32.5244167",
	  "longitude": "-117.1214678",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 26,
	  "name": "Autoestereos beto",
	  "latitud": "32.528183",
	  "longitude": "-117.1121564",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 27,
	  "name": "AUTOMOTRIZ INTERNACIONAL II",
	  "latitud": "32.5236184",
	  "longitude": "-117.1190967",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 28,
	  "name": "AUTOPARTES J.R",
	  "latitud": "32.5325362",
	  "longitude": "-117.1188618",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 29,
	  "name": "AUTOPARTES PLAYAS",
	  "latitud": "32.5154799",
	  "longitude": "-117.1166441",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 30,
	  "name": "AUTOSERVICIO JOHNNY",
	  "latitud": "32.5330439",
	  "longitude": "-117.1173692",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 31,
	  "name": "AUTOSERVICIO L.A",
	  "latitud": "32.5122513",
	  "longitude": "-117.1207",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 32,
	  "name": "AutoZone Playas de Tijuana",
	  "latitud": "32.5272041",
	  "longitude": "-117.11767",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 33,
	  "name": "B COFFEE + TEA HOUSE",
	  "latitud": "32.522906",
	  "longitude": "-117.1190887",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 34,
	  "name": "B-Store",
	  "latitud": "32.5292776",
	  "longitude": "-117.1182409",
	  "code": "",
	  "categories": [11],
	  "status": 1
	}, {
	  "id": 35,
	  "name": "Baja Pizza",
	  "latitud": "32.5196667",
	  "longitude": "-117.1160214",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 36,
	  "name": "Balcova Restaurante",
	  "latitud": "32.5270978",
	  "longitude": "-117.1171725",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 37,
	  "name": "Banamex",
	  "latitud": "32.5311497",
	  "longitude": "-117.1136742",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 38,
	  "name": "BANORTE",
	  "latitud": "32.5270978",
	  "longitude": "-117.1171725",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 39,
	  "name": "BANORTE",
	  "latitud": "32.5116654",
	  "longitude": "-117.1207",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 40,
	  "name": "Bazar Emma",
	  "latitud": "32.5242366",
	  "longitude": "-117.1166893",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 41,
	  "name": "BBVA BANCOMER PASEO PLAYAS",
	  "latitud": "32.5329854",
	  "longitude": "-117.1145995",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 42,
	  "name": "BEAVEN pasteleros",
	  "latitud": "32.5226548",
	  "longitude": "-117.1154621",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 43,
	  "name": "BEVERLY Burgers",
	  "latitud": "32.5165983",
	  "longitude": "-117.1160567",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 44,
	  "name": "BLOOm",
	  "latitud": "32.5289042",
	  "longitude": "-117.1160372",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 45,
	  "name": "BODY SHOP OASIS",
	  "latitud": "32.5242366",
	  "longitude": "-117.1166893",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 46,
	  "name": "BOMBEROS ESTACIÓN 10",
	  "latitud": "32.5217638",
	  "longitude": "-117.1139681",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 47,
	  "name": "Book.com.mx",
	  "latitud": "32.5263659",
	  "longitude": "-117.1129081",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 48,
	  "name": "Boutique Chocolate",
	  "latitud": "32.5249097",
	  "longitude": "-117.1225353",
	  "code": "",
	  "categories": [5],
	  "status": 1
	}, {
	  "id": 49,
	  "name": "Bridgestone - Llantera",
	  "latitud": "32.5257055",
	  "longitude": "-117.1132059",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 50,
	  "name": "BURROS Jalapeño's",
	  "latitud": "32.5193862",
	  "longitude": "-117.1167402",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 51,
	  "name": "Cabaceto espresso bar",
	  "latitud": "32.5261483",
	  "longitude": "-117.116698",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 52,
	  "name": "Cablemas",
	  "latitud": "32.5308478",
	  "longitude": "-117.1141972",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 53,
	  "name": "Café Aquamarino",
	  "latitud": "32.5237285",
	  "longitude": "-117.1235436",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 54,
	  "name": "Cafe Latitud 32",
	  "latitud": "32.5286461",
	  "longitude": "-117.1226732",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 55,
	  "name": "Café Zone",
	  "latitud": "32.5264382",
	  "longitude": "-117.1110145",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 56,
	  "name": "Cajero Automatico HSBC",
	  "latitud": "32.5249097",
	  "longitude": "-117.1225353",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 57,
	  "name": "Cajero Automatico Scotiabank",
	  "latitud": "32.5164638",
	  "longitude": "-117.1167675",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 58,
	  "name": "Cajero Banorte",
	  "latitud": "32.5270978",
	  "longitude": "-117.1171725",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 59,
	  "name": "Cajero HSBC",
	  "latitud": "32.522501",
	  "longitude": "-117.1161863",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 60,
	  "name": "CAJEROS AUTOMATICOS BANORTE",
	  "latitud": "32.5325362",
	  "longitude": "-117.1188618",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 61,
	  "name": "Cake Land Cake Shop",
	  "latitud": "32.5116231",
	  "longitude": "-117.1166178",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 62,
	  "name": "CAMARON LOCO",
	  "latitud": "32.5150411",
	  "longitude": "-117.1163624",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 63,
	  "name": "Car Wash 911",
	  "latitud": "32.5264559",
	  "longitude": "-117.1163332",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 64,
	  "name": "CAR WASH Y DETALLADO BAJA 1000",
	  "latitud": "32.522501",
	  "longitude": "-117.1161863",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 65,
	  "name": "Carl's Jr.",
	  "latitud": "32.5311283",
	  "longitude": "-117.1148503",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 66,
	  "name": "CARNICERIA El Bif 28",
	  "latitud": "32.5242343",
	  "longitude": "-117.1169253",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 67,
	  "name": "CARNITAS EL MAGO",
	  "latitud": "32.5178219",
	  "longitude": "-117.1159963",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 68,
	  "name": "Carrocería y Pintura Acapulco",
	  "latitud": "32.513995",
	  "longitude": "-117.1207076",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 69,
	  "name": "Casa de Don Juan",
	  "latitud": "32.5213906",
	  "longitude": "-117.1223688",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 70,
	  "name": "CASA HOGAR LIRIO DE LOS VALLES TIJUANA",
	  "latitud": "32.5294141",
	  "longitude": "-117.117495",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 71,
	  "name": "Casino Caliente Playas",
	  "latitud": "32.531948",
	  "longitude": "-117.1129352",
	  "code": "",
	  "categories": [2],
	  "status": 1
	}, {
	  "id": 72,
	  "name": "CENADURIA De La Torre",
	  "latitud": "32.5242343",
	  "longitude": "-117.1169253",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 73,
	  "name": "Centro Automotriz Autotec",
	  "latitud": "32.5260809",
	  "longitude": "-117.1133024",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 74,
	  "name": "CENTRO CAMBIARO CORONADO, S.A. DE C.V",
	  "latitud": "32.5286567",
	  "longitude": "-117.1124729",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 75,
	  "name": "Comercial Mexicana Playas",
	  "latitud": "32.5326569",
	  "longitude": "-117.1131485",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 76,
	  "name": "centro corporativo aelus",
	  "latitud": "32.5189322",
	  "longitude": "-117.1218055",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 77,
	  "name": "CENTRO DE BACHILLERATO TECNOLÓGICO industrial y de servicios No.146 ",
	  "latitud": "32.5140309",
	  "longitude": "-117.1148476",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 78,
	  "name": "Centro de Servicio LTH Playas, Baterias Atlas,Tijuana",
	  "latitud": "32.5168353",
	  "longitude": "-117.119685",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 79,
	  "name": "Centro Óptico Playas",
	  "latitud": "32.5087324",
	  "longitude": "-117.1193295",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 80,
	  "name": "Centro Pastoral Madre Teresa -Playas",
	  "latitud": "32.5243271",
	  "longitude": "-117.1168234",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 81,
	  "name": "Cervecería Modelo Playa",
	  "latitud": "32.5090185",
	  "longitude": "-117.1210515",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 82,
	  "name": "CESPT",
	  "latitud": "32.5310031",
	  "longitude": "-117.116881",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 83,
	  "name": "CFE",
	  "latitud": "32.5289995",
	  "longitude": "-117.1186459",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 84,
	  "name": "Chic Glamour Boutique",
	  "latitud": "32.5296764",
	  "longitude": "-117.1164892",
	  "code": "",
	  "categories": [5],
	  "status": 1
	}, {
	  "id": 85,
	  "name": "Chiltepinos Playas de Tijuana",
	  "latitud": "32.5310389",
	  "longitude": "-117.1140846",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 86,
	  "name": "CIDH Universidad",
	  "latitud": "32.5272061",
	  "longitude": "-117.1191368",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 87,
	  "name": "Cinépolis",
	  "latitud": "32.5311497",
	  "longitude": "-117.1136742",
	  "code": "",
	  "categories": [11],
	  "status": 1
	}, {
	  "id": 88,
	  "name": "Clamatos El Remedio",
	  "latitud": "32.526552",
	  "longitude": "-117.1170802",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 89,
	  "name": "Clínica Para Animales Dr. Rivera",
	  "latitud": "32.5242366",
	  "longitude": "-117.1166893",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 90,
	  "name": "Colegio El Arca",
	  "latitud": "32.5219267",
	  "longitude": "-117.1210145",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 91,
	  "name": "colegio ingles",
	  "latitud": "32.5257055",
	  "longitude": "-117.1132059",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 92,
	  "name": "Colegio Pierre Faure",
	  "latitud": "32.5272061",
	  "longitude": "-117.1191368",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 93,
	  "name": "Colegio Playas Elementary School",
	  "latitud": "32.5325362",
	  "longitude": "-117.1188618",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 94,
	  "name": "Colegio Tijuana",
	  "latitud": "32.5310031",
	  "longitude": "-117.116881",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 95,
	  "name": "Comercializadora Moner",
	  "latitud": "32.5012282",
	  "longitude": "-117.120600",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 96,
	  "name": "Comidas Mexicanas",
	  "latitud": "32.5298643",
	  "longitude": "-117.1215475",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 97,
	  "name": "COMITE DEPORTIVO PLAYAS COSTA HERMOSA",
	  "latitud": "32.5138669",
	  "longitude": "-117.1179093",
	  "code": "",
	  "categories": [8],
	  "status": 1
	}, {
	  "id": 98,
	  "name": "Construrama",
	  "latitud": "32.513995",
	  "longitude": "-117.120707",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 99,
	  "name": "Copyarte",
	  "latitud": "32.5257055",
	  "longitude": "-117.1132059",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 100,
	  "name": "Coronado Librería",
	  "latitud": "32.5290643",
	  "longitude": "-117.1200904",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 101,
	  "name": "Correos de México / Playas de Tijuana, B.C",
	  "latitud": "32.5295693",
	  "longitude": "-117.121428",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 102,
	  "name": "Cortijo San José",
	  "latitud": "32.5225644",
	  "longitude": "-117.113944",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 103,
	  "name": "Crepas Francesas Dennis",
	  "latitud": "32.5290643",
	  "longitude": "-117.1200904",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 104,
	  "name": "D' Volada",
	  "latitud": "32.5269836",
	  "longitude": "-117.1183406",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 105,
	  "name": "Dairy Queen®",
	  "latitud": "32.52961",
	  "longitude": "-117.1181443",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 106,
	  "name": "Dalí Suites",
	  "latitud": "32.5319438",
	  "longitude": "-117.1166933",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 107,
	  "name": "De Las Californias Universidad",
	  "latitud": "32.5264382",
	  "longitude": "-117.1126399",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 108,
	  "name": "Del Mar Inn Restaurant",
	  "latitud": "32.5330439",
	  "longitude": "-117.1173692",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 109,
	  "name": "DELEGACION MUNICIPAL PLAYAS DE TIJUANA",
	  "latitud": "32.5225644",
	  "longitude": "-117.113944",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 110,
	  "name": "Delifrutas PLAYAS",
	  "latitud": "32.5236184",
	  "longitude": "-117.1190967",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 111,
	  "name": "DETALLADO AUTOMOTRIZ BARRAZA",
	  "latitud": "32.5175534",
	  "longitude": "-117.1168285",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 112,
	  "name": "DHL Express",
	  "latitud": "32.5310389",
	  "longitude": "-117.1190967",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 113,
	  "name": "di Vino bar",
	  "latitud": "32.522906",
	  "longitude": "-117.1190887",
	  "code": "",
	  "categories": [2],
	  "status": 1
	}, {
	  "id": 114,
	  "name": "Dippin' Donuts",
	  "latitud": "32.5270978",
	  "longitude": "-117.1171725",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 115,
	  "name": "Dish del Mar (Solo Contrataciones)",
	  "latitud": "32.5330498",
	  "longitude": "-117.1145848",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 116,
	  "name": "DL coffee house",
	  "latitud": "32.5196251",
	  "longitude": "-117.112722",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 117,
	  "name": "Dolche Nails",
	  "latitud": "32.5237979",
	  "longitude": "-117.1174537",
	  "code": "",
	  "categories": [5],
	  "status": 1
	}, {
	  "id": 118,
	  "name": "DOMINO'S PLAYAS BAJA CALIFORNIA",
	  "latitud": "32.5296063",
	  "longitude": "-117.1176613",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 119,
	  "name": "Dreyers",
	  "latitud": "32.5238114",
	  "longitude": "-117.1125694",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 120,
	  "name": "Dulceria Hanzel",
	  "latitud": "32.5087324",
	  "longitude": "-117.1193295",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 121,
	  "name": "DUO DUO comida china",
	  "latitud": "32.5184646",
	  "longitude": "-117.1167549",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 122,
	  "name": "Dvd Video Playas",
	  "latitud": "32.5238114",
	  "longitude": "-117.1125694",
	  "code": "",
	  "categories": [11],
	  "status": 1
	}, {
	  "id": 123,
	  "name": "El Barco",
	  "latitud": "32.5321784",
	  "longitude": "-117.123199",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 124,
	  "name": "El Bohemio Bar",
	  "latitud": "32.5121786",
	  "longitude": "-117.1198187",
	  "code": "",
	  "categories": [2],
	  "status": 1
	}, {
	  "id": 125,
	  "name": "El Camarón Pozolero",
	  "latitud": "32.5335985",
	  "longitude": "-117.123386",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 126,
	  "name": "EL CASCARON",
	  "latitud": "32.5244167",
	  "longitude": "-117.1214678",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 127,
	  "name": "El Girasol",
	  "latitud": "32.5335857",
	  "longitude": "-117.1168185",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 128,
	  "name": "El Griego Restaurante",
	  "latitud": "32.5299617",
	  "longitude": "-117.1195579",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 129,
	  "name": "El Laberinto",
	  "latitud": "32.5253692",
	  "longitude": "-117.1171553",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 130,
	  "name": "El Porton 1218",
	  "latitud": "32.5242502",
	  "longitude": "-117.112682",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 131,
	  "name": "El Rinconcito",
	  "latitud": "32.5126098",
	  "longitude": "-117.1165104",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 132,
	  "name": "El Triangulo Ferreteria",
	  "latitud": "32.5087109",
	  "longitude": "-117.121655",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 133,
	  "name": "El Yogurt Place",
	  "latitud": "32.5328302",
	  "longitude": "-117.1210746",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 134,
	  "name": "Eléctrica Y Ferretera De Tijuana Las Playas, S. De R.L. De C.V",
	  "latitud": "32.5090185",
	  "longitude": "-117.1210515",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 135,
	  "name": "ELECTRODOMESTICOS OUTLET CENTER",
	  "latitud": "32.5192539",
	  "longitude": "-117.115969",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 136,
	  "name": "Equipos Para Gimnasios MG Fitness Tijuana",
	  "latitud": "32.5154268",
	  "longitude": "-117.1199432",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 137,
	  "name": "Ernesto & co",
	  "latitud": "32.5279913",
	  "longitude": "-117.11013",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 138,
	  "name": "Escorza Públicidad",
	  "latitud": "32.5101766",
	  "longitude": "-117.1185812",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 139,
	  "name": "Escuela de Danza Pavlova",
	  "latitud": "32.5175449",
	  "longitude": "-117.1142448",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 140,
	  "name": "ESCUELA DE ENFERMERIA",
	  "latitud": "32.5225803",
	  "longitude": "-117.1208509",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 141,
	  "name": "Escuela Superior de Artes Visuales",
	  "latitud": "32.530345",
	  "longitude": "-117.1176508",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 142,
	  "name": "Especialidades De Pechuga",
	  "latitud": "32.5217389",
	  "longitude": "-117.1153816",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 143,
	  "name": "ESTETICA UNISEX SUPER CORTES",
	  "latitud": "32.5242343",
	  "longitude": "-117.1169253",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 144,
	  "name": "Extra Tiendas Playas De Tijuana",
	  "latitud": "32.5044902",
	  "longitude": "-117.121614",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 145,
	  "name": "farmacia benavides",
	  "latitud": "32.5279962",
	  "longitude": "-117.1159447",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 146,
	  "name": "Farmacia benavides",
	  "latitud": "32.5154799",
	  "longitude": "-117.1166441",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 147,
	  "name": "Farmacia De Cristo",
	  "latitud": "32.5096609",
	  "longitude": "-117.116929",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 148,
	  "name": "FARMACIA MONUMENTAL",
	  "latitud": "32.5313626",
	  "longitude": "-117.1190831",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 149,
	  "name": "Farmacias Del Ahorro",
	  "latitud": "32.5310197",
	  "longitude": "-117.1150649",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 150,
	  "name": "FARMACIAS FarmaCon",
	  "latitud": "32.5263659",
	  "longitude": "-117.1129081",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 151,
	  "name": "Farmacias Modernas De Tijuana",
	  "latitud": "32.5237775",
	  "longitude": "-117.1198865",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 152,
	  "name": "Farmacias Similares",
	  "latitud": "32.5330498",
	  "longitude": "-117.1145848",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 153,
	  "name": "FARMACIAS SIMILARES",
	  "latitud": "32.5286567",
	  "longitude": "-117.1124729",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 154,
	  "name": "FARMACIAS SIMILARES",
	  "latitud": "32.5149484",
	  "longitude": "-117.1166173",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 155,
	  "name": "FARMACIAS SIMILARES",
	  "latitud": "32.5112081",
	  "longitude": "-117.1209979",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 156,
	  "name": "FedEx",
	  "latitud": "32.5149009",
	  "longitude": "-117.1174327",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 157,
	  "name": "FERRE DESCUENTOS",
	  "latitud": "32.5241938",
	  "longitude": "-117.119244",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 158,
	  "name": "Fiestas y Regalos Bonnie",
	  "latitud": "32.522501",
	  "longitude": "-117.1161863",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 159,
	  "name": "FISH MART",
	  "latitud": "32.5284097",
	  "longitude": "-117.1184717",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 160,
	  "name": "FITNESS CLUB MEXICO",
	  "latitud": "32.517179",
	  "longitude": "-117.1167601",
	  "code": "",
	  "categories": [8],
	  "status": 1
	}, {
	  "id": 161,
	  "name": "Flauti PIZZA SPORTS",
	  "latitud": "32.5310031",
	  "longitude": "-117.116881",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 162,
	  "name": "Florería Rosita",
	  "latitud": "32.5155726",
	  "longitude": "-117.1197206",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 163,
	  "name": "Food Village",
	  "latitud": "32.5282265",
	  "longitude": "-117.117836",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 164,
	  "name": "FRENOS Y SUSPENSIONES TUBUTAMA",
	  "latitud": "32.5255599",
	  "longitude": "-117.1211124",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 165,
	  "name": "Frontera Los Económicos.com",
	  "latitud": "32.5292776",
	  "longitude": "-117.1182409",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 166,
	  "name": "GASMART - PLAYAS",
	  "latitud": "32.5132883",
	  "longitude": "-117.1206705",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 167,
	  "name": "Gerardos Peluquería Unisex",
	  "latitud": "32.5072169",
	  "longitude": "-117.1196344",
	  "code": "",
	  "categories": [11],
	  "status": 1
	}, {
	  "id": 168,
	  "name": "Giuseppis",
	  "latitud": "32.5326903",
	  "longitude": "-117.1149227",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 169,
	  "name": "Gymboree",
	  "latitud": "32.5332587",
	  "longitude": "-117.1185198",
	  "code": "",
	  "categories": [8],
	  "status": 1
	}, {
	  "id": 170,
	  "name": "HaZ tu LoKo",
	  "latitud": "32.5149484",
	  "longitude": "-117.1166173",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 171,
	  "name": "Hierbas Y Especies De México, S.A. De C.V",
	  "latitud": "32.5012282",
	  "longitude": "-117.1206002",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 172,
	  "name": "Highland Prince Academy",
	  "latitud": "32.5191759",
	  "longitude": "-117.1094097",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 173,
	  "name": "Horno 320",
	  "latitud": "32.5237285",
	  "longitude": "-117.1235436",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 174,
	  "name": "Hot Dogs y Hamburguesas Carrito",
	  "latitud": "32.5224061",
	  "longitude": "-117.1120316",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 175,
	  "name": "Hotel Playas De Tijuana",
	  "latitud": "32.5282318",
	  "longitude": "-117.122416",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 176,
	  "name": "Iexplore A.C",
	  "latitud": "32.5246105",
	  "longitude": "-117.1235168",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 177,
	  "name": "IGBC Escuela de Gastronomia",
	  "latitud": "32.5264247",
	  "longitude": "-117.1117977",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 178,
	  "name": "Iglesia Bethel Playas",
	  "latitud": "32.5184578",
	  "longitude": "-117.1152006",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 179,
	  "name": "Iglesia De Jesucristo De Los Santos De Los Ultimos Dias",
	  "latitud": "32.5139359",
	  "longitude": "-117.1189326",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 180,
	  "name": "Iglesia Metodista de México A.R.",
	  "latitud": "32.5196384",
	  "longitude": "-117.1174201",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 181,
	  "name": "Iglesia Nuestra Señora De La Salud Playas De Tijuana",
	  "latitud": "32.5103146",
	  "longitude": "-117.1193698",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 182,
	  "name": "Iglesia Pentecostal Gethsemani",
	  "latitud": "32.5257096",
	  "longitude": "-117.1167409",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 183,
	  "name": "IMAN Instituto Mexico Americano Noroeste",
	  "latitud": "32.5260266",
	  "longitude": "-117.1115027",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 184,
	  "name": "Imprenta Elefante",
	  "latitud": "32.5287704",
	  "longitude": "-117.1126379",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 185,
	  "name": "Impulsora De Recubrimientos Y Pisos",
	  "latitud": "32.522501",
	  "longitude": "-117.1161863",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 186,
	  "name": "Inglés Colegio Oficina Privada",
	  "latitud": "32.5260266",
	  "longitude": "-117.1115027",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 187,
	  "name": "Instituto Estrella Del Mar Ac",
	  "latitud": "32.5261998",
	  "longitude": "-117.1193486",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 188,
	  "name": "Instituto Vanguardia",
	  "latitud": "32.5239518",
	  "longitude": "-117.1177259",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 189,
	  "name": "Internet Controlado S.A. de C.V",
	  "latitud": "32.5241936",
	  "longitude": "-117.111349",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 190,
	  "name": "Izzi",
	  "latitud": "32.5292776",
	  "longitude": "-117.1182409",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 191,
	  "name": "JAIROS AUTOMOTRIZ",
	  "latitud": "32.5261998",
	  "longitude": "-117.1193486",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 192,
	  "name": "Jakie's Burgers",
	  "latitud": "32.5140007",
	  "longitude": "-117.1200679",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 193,
	  "name": "Jericayas Don Raúl",
	  "latitud": "32.5056063",
	  "longitude": "-117.1222701",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 194,
	  "name": "JUGOS Y LICUADOS DEL MAR",
	  "latitud": "32.518874",
	  "longitude": "-117.116763",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 195,
	  "name": "k-0 Sushi Bar",
	  "latitud": "32.530003",
	  "longitude": "-117.1227376",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 196,
	  "name": "Kave Alimentos S. de R.L. de C.V",
	  "latitud": "32.5022801",
	  "longitude": "-117.1199296",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 197,
	  "name": "Kensington Language Centers",
	  "latitud": "32.5226186",
	  "longitude": "-117.1111947",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 198,
	  "name": "KFC",
	  "latitud": "32.5322595",
	  "longitude": "-117.1144346",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 199,
	  "name": "La Casa de Los Alambres El Gallo",
	  "latitud": "32.5197526",
	  "longitude": "-117.1168247",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 200,
	  "name": "La casa del bisquet",
	  "latitud": "32.524585",
	  "longitude": "-117.119413",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 201,
	  "name": "La Casa del Delineado, Paraiso Keren",
	  "latitud": "32.5339792",
	  "longitude": "-117.1177546",
	  "code": "",
	  "categories": [5],
	  "status": 1
	}, {
	  "id": 202,
	  "name": "La Casa del Maestro Distribuidora",
	  "latitud": "32.5238159",
	  "longitude": "-117.1112229",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 203,
	  "name": "La Cerve",
	  "latitud": "32.5321784",
	  "longitude": "-117.123199",
	  "code": "",
	  "categories": [2],
	  "status": 1
	}, {
	  "id": 204,
	  "name": "La Cerve",
	  "latitud": "32.5286461",
	  "longitude": "-117.1226732",
	  "code": "",
	  "categories": [2],
	  "status": 1
	}, {
	  "id": 205,
	  "name": "La Cocina de Doña Chuy",
	  "latitud": "32.5310031",
	  "longitude": "-117.11688",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 206,
	  "name": "La Cocina del Chef",
	  "latitud": "32.5260809",
	  "longitude": "-117.1133024",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 207,
	  "name": "La Cosecha Granos y Semillas",
	  "latitud": "32.521956",
	  "longitude": "-117.116358",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 208,
	  "name": "La Esquina",
	  "latitud": "32.5335985",
	  "longitude": "-117.12338",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 209,
	  "name": "La Michoacana No 1",
	  "latitud": "32.530003",
	  "longitude": "-117.1227376",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 210,
	  "name": "La Perla Bahia",
	  "latitud": "32.5188214",
	  "longitude": "-117.121030",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 211,
	  "name": "La playita Jugos y licuados",
	  "latitud": "32.5264066",
	  "longitude": "-117.1155367",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 212,
	  "name": "La Posada",
	  "latitud": "32.5221234",
	  "longitude": "-117.1191799",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 213,
	  "name": "La Puntada TELAS Y REGALOS",
	  "latitud": "32.5242502",
	  "longitude": "-117.112682",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 214,
	  "name": "LA ROSITA DE MICHOACAN",
	  "latitud": "32.5178219",
	  "longitude": "-117.1159963",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 215,
	  "name": "LA TAPATIA",
	  "latitud": "32.5146295",
	  "longitude": "-117.1200049",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 216,
	  "name": "La Tostadora de Playas de Tijuana",
	  "latitud": "32.5165294",
	  "longitude": "-117.112256",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 217,
	  "name": "Laboratorios KEM, S de R.L. de C.V",
	  "latitud": "32.5028298",
	  "longitude": "-117.1203158",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 218,
	  "name": "Laihoos Bisquets",
	  "latitud": "32.5174838",
	  "longitude": "-117.1137929",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 219,
	  "name": "Las Américas Primaría Federal",
	  "latitud": "32.5225259",
	  "longitude": "-117.1104196",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 220,
	  "name": "Las Crepas Cafe",
	  "latitud": "32.5242343",
	  "longitude": "-117.1169253",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 221,
	  "name": "Latina Farmacia Infonavit Rio",
	  "latitud": "32.5128857",
	  "longitude": "-117.1207832",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 222,
	  "name": "Lavamática Agua Azul",
	  "latitud": "32.5299617",
	  "longitude": "-117.1195579",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 223,
	  "name": "Le Petit Spa",
	  "latitud": "32.5257055",
	  "longitude": "-117.1132059",
	  "code": "",
	  "categories": [5],
	  "status": 1
	}, {
	  "id": 224,
	  "name": "Le Petite Latte",
	  "latitud": "32.5308478",
	  "longitude": "-117.1141972",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 225,
	  "name": "Licoreria Orendain",
	  "latitud": "32.513995",
	  "longitude": "-117.1207076",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 226,
	  "name": "LifeStyle Hostel",
	  "latitud": "32.5286461",
	  "longitude": "-117.1226732",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 227,
	  "name": "Little Caesars Pizza",
	  "latitud": "32.5311497",
	  "longitude": "-117.1136742",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 228,
	  "name": "LLANTERA GARCIA",
	  "latitud": "32.5236184",
	  "longitude": "-117.1190967",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 229,
	  "name": "Llantera y Taller Espiniza",
	  "latitud": "32.5127726",
	  "longitude": "-117.1200442",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 230,
	  "name": "Lopez Torres, Olivia",
	  "latitud": "32.5116654",
	  "longitude": "-117.1207",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 231,
	  "name": "Lorimar Bienes Raices",
	  "latitud": "32.5279962",
	  "longitude": "-117.1159447",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 232,
	  "name": "Los Alamos CARNICERIA",
	  "latitud": "32.5310031",
	  "longitude": "-117.116881",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 233,
	  "name": "Los Barriles",
	  "latitud": "32.5220035",
	  "longitude": "-117.1161863",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 234,
	  "name": "Los Famosos TAMALES de Tijuana",
	  "latitud": "32.5286567",
	  "longitude": "-117.1124729",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 235,
	  "name": "Loveland Boutique",
	  "latitud": "32.5310197",
	  "longitude": "-117.1150649",
	  "code": "",
	  "categories": [5],
	  "status": 1
	}, {
	  "id": 236,
	  "name": "Lúmina Foto-Café",
	  "latitud": "32.5150411",
	  "longitude": "-117.1163624",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 237,
	  "name": "LunaSol Lounge y Restaurante Antojitos Colombianos",
	  "latitud": "32.530003",
	  "longitude": "-117.1227376",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 238,
	  "name": "Lung Mon Playas",
	  "latitud": "32.5306172",
	  "longitude": "-117.1149523",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 239,
	  "name": "Mactopía",
	  "latitud": "32.5290643",
	  "longitude": "-117.1200904",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 240,
	  "name": "Mamamia Pizza",
	  "latitud": "32.5192539",
	  "longitude": "-117.115969",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 241,
	  "name": "Mariscos El Faro",
	  "latitud": "32.5337699",
	  "longitude": "-117.1250188",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 242,
	  "name": "Mariscos Rubios",
	  "latitud": "32.5194275",
	  "longitude": "-117.1198743",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 243,
	  "name": "Marks burgers",
	  "latitud": "32.5325362",
	  "longitude": "-117.1188618",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 244,
	  "name": "Marsus Regalos y Detalles",
	  "latitud": "32.5087109",
	  "longitude": "-117.121655",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 245,
	  "name": "Masjid Al-Islam Tijuana Beach",
	  "latitud": "32.5194275",
	  "longitude": "-117.1198743",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 246,
	  "name": "Materiales Educativos Internacionales Medi",
	  "latitud": "32.5197628",
	  "longitude": "-117.1137173",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 247,
	  "name": "MATERIALES ENSENADA",
	  "latitud": "32.5154799",
	  "longitude": "-117.1166441",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 248,
	  "name": "MENUDERIA Guadalajara",
	  "latitud": "32.5260809",
	  "longitude": "-117.1133024",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 249,
	  "name": "MERCADOS EMILIA",
	  "latitud": "32.5177727",
	  "longitude": "-117.1168204",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 250,
	  "name": "Mercedes Garage",
	  "latitud": "32.5330439",
	  "longitude": "-117.1173692",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 251,
	  "name": "MG Fitness",
	  "latitud": "32.5154268",
	  "longitude": "-117.1199432",
	  "code": "",
	  "categories": [8],
	  "status": 1
	}, {
	  "id": 252,
	  "name": "MINI MARKET DEL MAR",
	  "latitud": "32.5242343",
	  "longitude": "-117.1169253",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 253,
	  "name": "MINI MARKET ORENDAIN",
	  "latitud": "32.513995",
	  "longitude": "-117.1207076",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 254,
	  "name": "MINIMART PLAYAS",
	  "latitud": "32.5299617",
	  "longitude": "-117.1195579",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 255,
	  "name": "Mishiro Express",
	  "latitud": "32.5184555",
	  "longitude": "-117.1176387",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 256,
	  "name": "Modelorama",
	  "latitud": "32.5125539",
	  "longitude": "-117.1198378",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 257,
	  "name": "Modelorama Corona",
	  "latitud": "32.5127726",
	  "longitude": "-117.1200442",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 258,
	  "name": "MOFLES Y RADIADORES NARANJO",
	  "latitud": "32.5084033",
	  "longitude": "-117.1161645",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 259,
	  "name": "MOLINO COCINA A LA LEÑA & CAVA",
	  "latitud": "32.5335411",
	  "longitude": "-117.1139598",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 260,
	  "name": "MONASTERIO NUESTRA SEÑORA DE LA SALUD",
	  "latitud": "32.5141721",
	  "longitude": "-117.1103158",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 261,
	  "name": "MONTE PIO DEL NOROESTE",
	  "latitud": "32.5292776",
	  "longitude": "-117.1182409",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 262,
	  "name": "MOTEL CORTEZ",
	  "latitud": "32.5238422",
	  "longitude": "-117.1217333",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 263,
	  "name": "Motel Playas Coronado",
	  "latitud": "32.530345",
	  "longitude": "-117.1176508",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 264,
	  "name": "Motorcar Parts De México, S.A. De C.V",
	  "latitud": "32.5337876",
	  "longitude": "-117.1172053",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 265,
	  "name": "MR. FRIES",
	  "latitud": "32.5150411",
	  "longitude": "-117.1163624",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 266,
	  "name": "Mr. WASHCAR Team",
	  "latitud": "32.5296764",
	  "longitude": "-117.1164892",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 267,
	  "name": "Mueblería el Tigre",
	  "latitud": "32.5262508",
	  "longitude": "-117.122501",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 268,
	  "name": "multicarnes",
	  "latitud": "32.5238114",
	  "longitude": "-117.1125694",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 269,
	  "name": "Multimecánica Castillo",
	  "latitud": "32.5131883",
	  "longitude": "-117.1198633",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 270,
	  "name": "Munchin Donuts",
	  "latitud": "32.5260809",
	  "longitude": "-117.1133024",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 271,
	  "name": "mundo mágico",
	  "latitud": "32.5284097",
	  "longitude": "-117.1184717",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 272,
	  "name": "Nopal Café Playas",
	  "latitud": "32.5321784",
	  "longitude": "-117.123199",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 273,
	  "name": "Oasis Of Hope Hospital",
	  "latitud": "32.5313626",
	  "longitude": "-117.1190831",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 274,
	  "name": "Office Depot",
	  "latitud": "32.5308478",
	  "longitude": "-117.1141972",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 275,
	  "name": "OLYMPO",
	  "latitud": "32.5168635",
	  "longitude": "-117.1167212",
	  "code": "",
	  "categories": [8],
	  "status": 1
	}, {
	  "id": 276,
	  "name": "Origenes Cafe y Restaurante Colombiano",
	  "latitud": "32.5305586",
	  "longitude": "-117.1208502",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 277,
	  "name": "Orozco Servicio Automotriz",
	  "latitud": "32.5173475",
	  "longitude": "-117.1168137",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 278,
	  "name": "OXXO",
	  "latitud": "32.5313626",
	  "longitude": "-117.1190831",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 279,
	  "name": "oxxo",
	  "latitud": "32.5335857",
	  "longitude": "-117.1168185",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 280,
	  "name": "OXXO",
	  "latitud": "32.5326903",
	  "longitude": "-117.1149227",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 281,
	  "name": "OXXO",
	  "latitud": "32.5158689",
	  "longitude": "-117.1127897",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 282,
	  "name": "Oxxo",
	  "latitud": "32.5116654",
	  "longitude": "-117.1207",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 283,
	  "name": "Oxxo Drive-Thru",
	  "latitud": "32.5251504",
	  "longitude": "-117.1195284",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 284,
	  "name": "Oxxo Mercado Paseo Playas",
	  "latitud": "32.5155726",
	  "longitude": "-117.1197206",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 285,
	  "name": "Oxxo Mercado Picacho",
	  "latitud": "32.5260266",
	  "longitude": "-117.1115027",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 286,
	  "name": "Oxxo Pedregal",
	  "latitud": "32.5197096",
	  "longitude": "-117.1122327",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 287,
	  "name": "Panadería Integral \"La Alegria\"",
	  "latitud": "32.5238273",
	  "longitude": "-117.1163889",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 288,
	  "name": "Panadería y Pasteleria Denisse",
	  "latitud": "32.5177727",
	  "longitude": "-117.1168204",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 289,
	  "name": "PAPELERÍA INTERNET VIDEOJUEGOS ANDROMEDA",
	  "latitud": "32.5150411",
	  "longitude": "-117.1163624",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 290,
	  "name": "Para Perro Y Gatos Farmacia",
	  "latitud": "32.5076252",
	  "longitude": "-117.1211709",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 291,
	  "name": "Parabrisastj",
	  "latitud": "32.5165983",
	  "longitude": "-117.1160567",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 292,
	  "name": "Parroquia Santa María Estrella del Mar",
	  "latitud": "32.5271521",
	  "longitude": "-117.1152641",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 293,
	  "name": "Pastelería y Cafeteria Garcini's",
	  "latitud": "32.5257096",
	  "longitude": "-117.1167409",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 294,
	  "name": "PELUQUERIA JUST FOR MEN",
	  "latitud": "32.526391",
	  "longitude": "-117.1214557",
	  "code": "",
	  "categories": [5],
	  "status": 1
	}, {
	  "id": 295,
	  "name": "Peluqueria y Estetica EbeyB",
	  "latitud": "32.5184646",
	  "longitude": "-117.1167549",
	  "code": "",
	  "categories": [5],
	  "status": 1
	}, {
	  "id": 296,
	  "name": "PEMEX-2663",
	  "latitud": "32.5133245",
	  "longitude": "-117.1203419",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 297,
	  "name": "PEMEX-2753",
	  "latitud": "32.5295693",
	  "longitude": "-117.1214287",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 298,
	  "name": "Periódico Frontera Playas",
	  "latitud": "32.5241936",
	  "longitude": "-117.111349",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 299,
	  "name": "PET DEPOT",
	  "latitud": "32.5197526",
	  "longitude": "-117.1168247",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 300,
	  "name": "PETANQUERO",
	  "latitud": "32.5284097",
	  "longitude": "-117.1184717",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 301,
	  "name": "Peter Piper Pizza",
	  "latitud": "32.5306341",
	  "longitude": "-117.1141127",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 302,
	  "name": "Pharma Supply Distribuidora",
	  "latitud": "32.5118012",
	  "longitude": "-117.122470",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 303,
	  "name": "Phillys and Papas",
	  "latitud": "32.5217886",
	  "longitude": "-117.1161944",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 304,
	  "name": "PHUKET SPA",
	  "latitud": "32.5174148",
	  "longitude": "-117.1160339",
	  "code": "",
	  "categories": [5],
	  "status": 1
	}, {
	  "id": 305,
	  "name": "PIZZA & LOVE",
	  "latitud": "32.5278735",
	  "longitude": "-117.1167996",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 306,
	  "name": "pizzas del pacifico",
	  "latitud": "32.5286461",
	  "longitude": "-117.1226732",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 307,
	  "name": "Plasma Diseño de Stands",
	  "latitud": "32.5084033",
	  "longitude": "-117.1161645",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 308,
	  "name": "Plasticos del Mar",
	  "latitud": "32.5260266",
	  "longitude": "-117.1115027",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 309,
	  "name": "Playas Realty Bienes Raíces",
	  "latitud": "32.5310186",
	  "longitude": "-117.1129232",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 310,
	  "name": "Plaza Calimax",
	  "latitud": "32.5292776",
	  "longitude": "-117.1182409",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 311,
	  "name": "PLAZA ENSENADA",
	  "latitud": "32.5256417",
	  "longitude": "-117.1166658",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 312,
	  "name": "Plaza Jardines",
	  "latitud": "32.5280478",
	  "longitude": "-117.1166371",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 313,
	  "name": "Plaza Miramar",
	  "latitud": "32.5272041",
	  "longitude": "-117.11767",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 314,
	  "name": "PLAZA PLAYAS EXPRESS",
	  "latitud": "32.5335857",
	  "longitude": "-117.1168185",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 315,
	  "name": "Plaza Roberta",
	  "latitud": "32.5243271",
	  "longitude": "-117.1168234",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 316,
	  "name": "Pollito Chicken",
	  "latitud": "32.5251504",
	  "longitude": "-117.1195284",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 317,
	  "name": "POLLOS ASADOS al CARBON PT",
	  "latitud": "32.5164864",
	  "longitude": "117.116058",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 318,
	  "name": "Preparatoria Cobach",
	  "latitud": "32.5272061",
	  "longitude": "-117.1191368",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 319,
	  "name": "Promo Art",
	  "latitud": "32.5068361",
	  "longitude": "-117.1216436",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 320,
	  "name": "Provher, S.A. De C.V",
	  "latitud": "32.5154799",
	  "longitude": "-117.1166441",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 321,
	  "name": "Puertas Playas De Tijuana",
	  "latitud": "32.5298905",
	  "longitude": "-117.1223943",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 322,
	  "name": "Quinta Ilusiones",
	  "latitud": "32.5262508",
	  "longitude": "-117.1225018",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 323,
	  "name": "R&R SEGUROS DE AUTO",
	  "latitud": "32.5150411",
	  "longitude": "-117.1163624",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 324,
	  "name": "Refrigeracion Comercial Rankine",
	  "latitud": "32.5194586",
	  "longitude": "-117.112986",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 325,
	  "name": "RESTAURANT GRAN SABOR",
	  "latitud": "32.5282265",
	  "longitude": "-117.117836",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 326,
	  "name": "Restaurant Ricardo's Suc. Playas",
	  "latitud": "32.5310389",
	  "longitude": "-117.1140846",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 327,
	  "name": "Restaurante El Charro",
	  "latitud": "32.5118102",
	  "longitude": "-117.1221591",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 328,
	  "name": "Restaurante El Corral",
	  "latitud": "32.5221234",
	  "longitude": "-117.1191799",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 329,
	  "name": "Restaurante Mi Tierra",
	  "latitud": "32.5096112",
	  "longitude": "-117.1209255",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 330,
	  "name": "Restaurante y Cenaduría Mi Tierra",
	  "latitud": "32.522501",
	  "longitude": "-117.1161863",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 331,
	  "name": "REX Fumigaciones",
	  "latitud": "32.5261483",
	  "longitude": "-117.116698",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 332,
	  "name": "Roccos",
	  "latitud": "32.5335985",
	  "longitude": "-117.123386",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 333,
	  "name": "RODIZAMATERIALES PARA FAB. DE MUEBLES",
	  "latitud": "32.5219267",
	  "longitude": "-117.1210145",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 334,
	  "name": "Roma",
	  "latitud": "32.522501",
	  "longitude": "-117.1161863",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 335,
	  "name": "Ross Café & Deli",
	  "latitud": "32.5284097",
	  "longitude": "-117.1184717",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 336,
	  "name": "Sabinos",
	  "latitud": "32.524266",
	  "longitude": "-117.1130549",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 337,
	  "name": "Sabor A Mexico & La Terraza Cafe",
	  "latitud": "32.5241936",
	  "longitude": "-117.111349",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 338,
	  "name": "Salon Art D'Blank",
	  "latitud": "32.522906",
	  "longitude": "-117.1190887",
	  "code": "",
	  "categories": [5],
	  "status": 1
	}, {
	  "id": 339,
	  "name": "Salón de Eventos Santa Isabel",
	  "latitud": "32.5310031",
	  "longitude": "-117.116881",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 340,
	  "name": "SALÓN DEL REINO DE LOS TESTIGOS DE JEHOVA KINGDOM HALL",
	  "latitud": "32.5140399",
	  "longitude": "-117.1184873",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 341,
	  "name": "Salón Social Alfa",
	  "latitud": "32.5262508",
	  "longitude": "-117.1225018",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 342,
	  "name": "Salón Tradiciones",
	  "latitud": "32.5305586",
	  "longitude": "-117.1208502",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 343,
	  "name": "Salón Villa Bonita",
	  "latitud": "32.5283209",
	  "longitude": "-117.1122201",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 344,
	  "name": "Salones y Patios El Sol",
	  "latitud": "32.5174572",
	  "longitude": "-117.1197575",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 345,
	  "name": "Santander Playas de Tijuana",
	  "latitud": "32.5311497",
	  "longitude": "-117.1136742",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 346,
	  "name": "Santander Serfin Playas",
	  "latitud": "32.5310031",
	  "longitude": "-117.116881",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 347,
	  "name": "Santi's Tortilleria",
	  "latitud": "32.5177727",
	  "longitude": "-117.1168204",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 348,
	  "name": "SASTRERIA ZUÑIGA",
	  "latitud": "32.518874",
	  "longitude": "-117.116763",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 349,
	  "name": "Secundaria 5 Ignacio Manuel Altamirano",
	  "latitud": "32.5260266",
	  "longitude": "-117.1115027",
	  "code": "",
	  "categories": [7],
	  "status": 1
	}, {
	  "id": 350,
	  "name": "Seguridad Privada y Alarmas Digitales",
	  "latitud": "32.5131164",
	  "longitude": "-117.1184429",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 351,
	  "name": "Semilla Madre",
	  "latitud": "32.521956",
	  "longitude": "-117.116358",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 352,
	  "name": "SERVICIO AUTOMOTRIZ BAJA",
	  "latitud": "32.51345",
	  "longitude": "-117.1199061",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 353,
	  "name": "SERVICIO DE TALLER MECÁNICO DEL VALLE",
	  "latitud": "32.5190526",
	  "longitude": "-117.1168327",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 354,
	  "name": "Servicio Eeléctrico Automotriz Hermanos Armenta",
	  "latitud": "32.5122513",
	  "longitude": "-117.1207",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 355,
	  "name": "SERVICIO ELECTRICO \"DEL MAR\" RADIADORES",
	  "latitud": "32.5122513",
	  "longitude": "-117.1207",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 356,
	  "name": "Servicio Electrónico Automotriz",
	  "latitud": "32.519458",
	  "longitude": "-117.1197724",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 357,
	  "name": "SHIGERU´S SUSHI EXPRESS",
	  "latitud": "32.5184646",
	  "longitude": "-117.1167549",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 358,
	  "name": "SOCORRITO LAVADO Y DETALLADO",
	  "latitud": "32.5154799",
	  "longitude": "-117.1166441",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 359,
	  "name": "Solutions Estética",
	  "latitud": "32.5335857",
	  "longitude": "-117.1168185",
	  "code": "",
	  "categories": [5],
	  "status": 1
	}, {
	  "id": 360,
	  "name": "Sonora Steak Asadero",
	  "latitud": "32.5282265",
	  "longitude": "-117.117836",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 361,
	  "name": "SR. CARA DE PAPA",
	  "latitud": "32.5244167",
	  "longitude": "-117.1214678",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 362,
	  "name": "Sr. Waffle",
	  "latitud": "32.5303211",
	  "longitude": "-117.1216012",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 363,
	  "name": "Star Salads",
	  "latitud": "32.5310031",
	  "longitude": "-117.116881",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 364,
	  "name": "Starbucks Playas de tijuana",
	  "latitud": "32.5292776",
	  "longitude": "-117.1182409",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 365,
	  "name": "Sub Agencia Corona Playas 3",
	  "latitud": "32.5294007",
	  "longitude": "-117.1204592",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 366,
	  "name": "SUITES LEON ROJO",
	  "latitud": "32.5132912",
	  "longitude": "-117.1204212",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 367,
	  "name": "Sukilo",
	  "latitud": "32.5284097",
	  "longitude": "-117.1184717",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 368,
	  "name": "Sunny House",
	  "latitud": "32.5330597",
	  "longitude": "-117.1175784",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 369,
	  "name": "Sunset Lounge Playas",
	  "latitud": "32.5286461",
	  "longitude": "-117.1226732",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 370,
	  "name": "Super Papeleria Playas",
	  "latitud": "32.5260809",
	  "longitude": "-117.1133024",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 371,
	  "name": "Sushi Roll Playas",
	  "latitud": "32.5217389",
	  "longitude": "-117.1153816",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 372,
	  "name": "Sushimi - Playas",
	  "latitud": "32.5243271",
	  "longitude": "-117.1168234",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 373,
	  "name": "Sutileza Spa",
	  "latitud": "32.5237979",
	  "longitude": "-117.1174537",
	  "code": "",
	  "categories": [5],
	  "status": 1
	}, {
	  "id": 374,
	  "name": "SYNTHIA FLORES",
	  "latitud": "32.5289995",
	  "longitude": "-117.1186459",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 375,
	  "name": "TACONAZO",
	  "latitud": "32.5296764",
	  "longitude": "-117.1164892",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 376,
	  "name": "tacones LEJANOS",
	  "latitud": "32.5184646",
	  "longitude": "32.5184646",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 377,
	  "name": "Tacos de Canasta La Tradicion",
	  "latitud": "32.5256854",
	  "longitude": "-117.1214477",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 378,
	  "name": "Tacos El Poblano",
	  "latitud": "32.5129157",
	  "longitude": "-117.1197533",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 379,
	  "name": "tacos la carreta rosa",
	  "latitud": "32.5091101",
	  "longitude": "-117.1173997",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 380,
	  "name": "Tacos La Esquina",
	  "latitud": "32.5139947",
	  "longitude": "-117.1166876",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 381,
	  "name": "TACOS Sonora",
	  "latitud": "32.5219267",
	  "longitude": "-117.1210145",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 382,
	  "name": "TALLER BEYPA",
	  "latitud": "32.5284017",
	  "longitude": "-117.1122785",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 383,
	  "name": "Taller Mecánico Javier´s",
	  "latitud": "32.5103169",
	  "longitude": "-117.117202",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 384,
	  "name": "TALLER OSCAR'S",
	  "latitud": "32.5173475",
	  "longitude": "-117.1168137",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 385,
	  "name": "Tamales la glorieta",
	  "latitud": "32.526552",
	  "longitude": "-117.1170802",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 386,
	  "name": "Taqueria \"El Frances\"",
	  "latitud": "32.5128857",
	  "longitude": "-117.1207832",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 387,
	  "name": "Tecniphone",
	  "latitud": "32.5112081",
	  "longitude": "-117.1209979",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 388,
	  "name": "Telcel Cac",
	  "latitud": "32.5310389",
	  "longitude": "-117.1140846",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 389,
	  "name": "TELECOMM TELEGRAFOS",
	  "latitud": "32.5196203",
	  "longitude": "-117.1167429",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 390,
	  "name": "Templo Evangélico San Pablo",
	  "latitud": "32.530345",
	  "longitude": "-117.1176508",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 391,
	  "name": "Terraza Vallarta",
	  "latitud": "32.5335985",
	  "longitude": "-117.123386",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 392,
	  "name": "The artist BBQ Lounge",
	  "latitud": "32.5303112",
	  "longitude": "-117.1195447",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 393,
	  "name": "The Green house",
	  "latitud": "32.5154799",
	  "longitude": "-117.1166441",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 394,
	  "name": "THE PET SHOP",
	  "latitud": "32.5133426",
	  "longitude": "-117.1122296",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 395,
	  "name": "Thrifty Playas",
	  "latitud": "32.5282318",
	  "longitude": "-117.122416",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 396,
	  "name": "Tienda International Jeans",
	  "latitud": "32.5087324",
	  "longitude": "-117.1193295",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 397,
	  "name": "TiendaTELNOR PLAYAS",
	  "latitud": "32.5330498",
	  "longitude": "-117.1145848",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 398,
	  "name": "Tiny Toon",
	  "latitud": "32.5183063",
	  "longitude": "-117.11981",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 399,
	  "name": "Tito's",
	  "latitud": "32.5313069",
	  "longitude": "-117.1124082",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 400,
	  "name": "Tm Davalos",
	  "latitud": "32.5122513",
	  "longitude": "-117.1207",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 401,
	  "name": "Tooginos Playas",
	  "latitud": "32.5321784",
	  "longitude": "-117.123199",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 402,
	  "name": "Top Computers Venta Y Reparacion reparacion",
	  "latitud": "32.5298905",
	  "longitude": "-117.1223943",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 403,
	  "name": "Tortas Ahogadas en Tijuana \"El Jalisciense\"",
	  "latitud": "32.5238422",
	  "longitude": "-117.1217333",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 404,
	  "name": "Tortas Playas",
	  "latitud": "32.5070906",
	  "longitude": "-117.1215859",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 405,
	  "name": "TORTILLAS DE HARINA MI ABUELITA",
	  "latitud": "32.5125539",
	  "longitude": "-117.1198378",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 406,
	  "name": "Tortillería Jenny Playas",
	  "latitud": "32.518874",
	  "longitude": "-117.116763",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 407,
	  "name": "TORTILLERIA Y MOLINO Mikky",
	  "latitud": "32.521956",
	  "longitude": "-117.116358",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 408,
	  "name": "Transmisiones R y R",
	  "latitud": "32.5188581",
	  "longitude": "-117.1159235",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 409,
	  "name": "TRANSMISIONES RIVAS",
	  "latitud": "32.5096609",
	  "longitude": "-117.116929",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 410,
	  "name": "Tuxedos Jess",
	  "latitud": "32.5310031",
	  "longitude": "-117.116881",
	  "code": "",
	  "categories": [9],
	  "status": 1
	}, {
	  "id": 411,
	  "name": "U.H PLAYAS DE TIJUANA",
	  "latitud": "32.5149484",
	  "longitude": "-117.1166173",
	  "code": "",
	  "categories": [],
	  "status": 1
	}, {
	  "id": 412,
	  "name": "Ultrarti-K",
	  "latitud": "32.5292776",
	  "longitude": "-117.1182409",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 413,
	  "name": "UNIFORMES Y BORDADOS JAER",
	  "latitud": "32.518874",
	  "longitude": "-117.116763",
	  "code": "",
	  "categories": [9],
	  "status": 1
	}, {
	  "id": 414,
	  "name": "Universo Mueblero",
	  "latitud": "32.5279704",
	  "longitude": "-117.1121477",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 415,
	  "name": "URBANO PIZZA ARTESANAL",
	  "latitud": "32.5264066",
	  "longitude": "-117.1155367",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 416,
	  "name": "Veterinaria Pet Clínica Playas",
	  "latitud": "32.5132912",
	  "longitude": "-117.121242",
	  "code": "",
	  "categories": [6],
	  "status": 1
	}, {
	  "id": 417,
	  "name": "VILLA BONITA",
	  "latitud": "32.5330498",
	  "longitude": "-117.1145848",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 418,
	  "name": "VIP Barber Shop",
	  "latitud": "32.522906",
	  "longitude": "-117.1190887",
	  "code": "",
	  "categories": [5],
	  "status": 1
	}, {
	  "id": 419,
	  "name": "Virtual Place Computadoras",
	  "latitud": "32.5165333",
	  "longitude": "-117.1167601",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 420,
	  "name": "Viva México ABARROTES",
	  "latitud": "32.5126403",
	  "longitude": "-117.1161765",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 421,
	  "name": "VIVERO DE PLAYAS",
	  "latitud": "32.5322482",
	  "longitude": "-117.1149643",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 422,
	  "name": "VR8 Transmissions",
	  "latitud": "32.522501",
	  "longitude": "-117.1161863",
	  "code": "",
	  "categories": [1],
	  "status": 1
	}, {
	  "id": 423,
	  "name": "Waldo's Playas Tijuana (BC)",
	  "latitud": "32.5321894",
	  "longitude": "-117.1131538",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 424,
	  "name": "Walmart Playas de Tijuana",
	  "latitud": "32.5281876",
	  "longitude": "-117.1188873",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 425,
	  "name": "XTREME FOX",
	  "latitud": "32.5311497",
	  "longitude": "-117.1136742",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 426,
	  "name": "Zoo Sports Bar",
	  "latitud": "32.5305586",
	  "longitude": "-117.1208502",
	  "code": "",
	  "categories": [2],
	  "status": 1
	}, {
	  "id": 427,
	  "name": "Toyi-Sushi",
	  "latitud": "32.5314426",
	  "longitude": "-117.1151389",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 428,
	  "name": "Diente De Leon",
	  "latitud": "32.5293635",
	  "longitude": "-117.1256156",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 429,
	  "name": "Bar Matt",
	  "latitud": "32.5238783",
	  "longitude": "-117.1201161",
	  "code": "",
	  "categories": [2],
	  "status": 1
	}, {
	  "id": 430,
	  "name": "La casa del mole",
	  "latitud": "32.5232524",
	  "longitude": "-117.1147777",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 431,
	  "name": "Raspados Playas",
	  "latitud": "32.5264999",
	  "longitude": "-117.1132132",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 432,
	  "name": "Restaurant Ruedo",
	  "latitud": "32.5310114",
	  "longitude": "-117.1203488",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 433,
	  "name": "Dax Playas",
	  "latitud": "32.5326102",
	  "longitude": "-117.1134394",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 434,
	  "name": "Martinelli's New York Pizza",
	  "latitud": "32.5275753",
	  "longitude": "-117.1228723",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 435,
	  "name": "Tacos Polo",
	  "latitud": "32.5283481",
	  "longitude": "-117.1206309",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 436,
	  "name": "Plaza Coronado",
	  "latitud": "32.5308492",
	  "longitude": " -117.1143706",
	  "code": "",
	  "categories": [4],
	  "status": 1
	}, {
	  "id": 437,
	  "name": "Subway Playas",
	  "latitud": "32.5286059",
	  "longitude": "-117.1164251",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 438,
	  "name": "Tacos Aaron Playas",
	  "latitud": "32.5306774",
	  "longitude": "-117.1168248",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 439,
	  "name": "Koi Sushi",
	  "latitud": "32.5289609",
	  "longitude": " -117.1199844",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 440,
	  "name": "Tortas Washmobile Playas",
	  "latitud": "32.5265344",
	  "longitude": "-117.1165566",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 441,
	  "name": "Tacos de Mariscos estrella del mar",
	  "latitud": "32.5265344",
	  "longitude": "-117.1165566",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 442,
	  "name": "Zhi Café",
	  "latitud": "32.5281214",
	  "longitude": "-117.1235625",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 443,
	  "name": "Becerra Mariscos",
	  "latitud": "32.5290339",
	  "longitude": "-117.1231173",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 444,
	  "name": "Pancake House",
	  "latitud": "32.5295619",
	  "longitude": "-117.1168637",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 445,
	  "name": "Malvet",
	  "latitud": "32.5236278",
	  "longitude": "-117.1203774",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 446,
	  "name": "Raspados Playas",
	  "latitud": "32.5264999",
	  "longitude": "-117.1132132",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 447,
	  "name": "Tacos La Choza",
	  "latitud": "32.5203078",
	  "longitude": "-117.1153429",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 448,
	  "name": "Los Barriles - Nieve De Garrafa",
	  "latitud": "32.5200092",
	  "longitude": "-117.1149513",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 449,
	  "name": "Huarachon",
	  "latitud": "32.5159653",
	  "longitude": "-117.1194306",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 450,
	  "name": "Mr Pollo",
	  "latitud": "32.5175937",
	  "longitude": "-117.1187225",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 451,
	  "name": "Hunabku",
	  "latitud": "32.518417",
	  "longitude": "-117.1171239",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 452,
	  "name": "Tortas Cubanas Las Del Camioncito Rojo",
	  "latitud": "32.5121021",
	  "longitude": "-117.1159544",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 453,
	  "name": "M&m Enbulturas",
	  "latitud": "32.5102203",
	  "longitude": "-117.1164265",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 454,
	  "name": "Panaderia Moreliana",
	  "latitud": "32.5096412",
	  "longitude": "-117.1162977",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 455,
	  "name": "Escuela Chivas Playas",
	  "latitud": "32.5202625",
	  "longitude": "-117.1146401",
	  "code": "",
	  "categories": [8],
	  "status": 1
	}, {
	  "id": 456,
	  "name": "La Gruta Gym",
	  "latitud": "32.5063846",
	  "longitude": "-117.1217294",
	  "code": "",
	  "categories": [8],
	  "status": 1
	}, {
	  "id": 457,
	  "name": "Motel el Indio",
	  "latitud": "32.4994416",
	  "longitude": "-117.1220332",
	  "code": "",
	  "categories": [10],
	  "status": 1
	}, {
	  "id": 458,
	  "name": "Brevno Gymnastics",
	  "latitud": "32.5041029",
	  "longitude": "-117.1175852",
	  "code": "",
	  "categories": [8],
	  "status": 1
	}, {
	  "id": 459,
	  "name": "Botanas & Miscelanea Playas",
	  "latitud": "32.5118555",
	  "longitude": "-117.1185571",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 460,
	  "name": "Isabel Antojitos Mexicanos Cocina Movil",
	  "latitud": "32.5124707",
	  "longitude": "-117.1180528",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}, {
	  "id": 461,
	  "name": "La Creperia",
	  "latitud": "32.5254339",
	  "longitude": "-117.1229331",
	  "code": "",
	  "categories": [3],
	  "status": 1
	}];
	/*eslint-enable */

/***/ }
/******/ ]);