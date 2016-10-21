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

	var _compression = __webpack_require__(1);

	var _compression2 = _interopRequireDefault(_compression);

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(4);

	var _reactRouter = __webpack_require__(5);

	var _bodyParser = __webpack_require__(6);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _dataWrapper = __webpack_require__(7);

	var _dataWrapper2 = _interopRequireDefault(_dataWrapper);

	var _config = __webpack_require__(8);

	var _config2 = _interopRequireDefault(_config);

	var _api = __webpack_require__(10);

	var _api2 = _interopRequireDefault(_api);

	var _routes = __webpack_require__(12);

	var _routes2 = _interopRequireDefault(_routes);

	var _requestUtil = __webpack_require__(29);

	var _requestUtil2 = _interopRequireDefault(_requestUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)(); /* eslint max-len: [2, 500, 4] */

	app.use((0, _compression2.default)());
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
	      (function () {
	        var location = 'playas_tijuana';
	        var apiUrl = _config2.default.get('api.url') + 'places?location=' + location;
	        _requestUtil2.default.get(apiUrl).then(function (results) {
	          var props = {
	            location: location,
	            places: results.entity
	          };
	          var content = (0, _server.renderToString)(_react2.default.createElement(
	            _dataWrapper2.default,
	            { data: props },
	            _react2.default.createElement(_reactRouter.RouterContext, renderProps)
	          ));
	          res.render('index', { content: content, props: props });
	        }).catch(function (err) {
	          console.log('err', err);
	          res.send('error');
	        });
	      })();
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
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(app, 'app', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/server/server.jsx');

	  __REACT_HOT_LOADER__.register(server, 'server', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/server/server.jsx');
	}();

	;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DataWrapper = function (_React$Component) {
	  _inherits(DataWrapper, _React$Component);

	  function DataWrapper() {
	    _classCallCheck(this, DataWrapper);

	    return _possibleConstructorReturn(this, (DataWrapper.__proto__ || Object.getPrototypeOf(DataWrapper)).apply(this, arguments));
	  }

	  _createClass(DataWrapper, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        data: this.props.data
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.props.children;
	    }
	  }]);

	  return DataWrapper;
	}(_react2.default.Component);

	var _default = DataWrapper;
	exports.default = _default;


	DataWrapper.propTypes = {
	  data: _react2.default.PropTypes.shape({}),
	  children: _react2.default.PropTypes.shape({})
	};

	DataWrapper.childContextTypes = {
	  data: _react2.default.PropTypes.object.isRequired
	};
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(DataWrapper, 'DataWrapper', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/server/dataWrapper.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/server/dataWrapper.js');
	}();

	;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var convict = __webpack_require__(9);

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
	    },
	    api: {
	      url: {
	          doc: 'API URL',
	          format: String,
	          default: 'http://127.0.0.1:3000/',
	          env: 'PLACES_API_URL'
	      },
	    }
	});

	config.validate();

	module.exports = config;


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("convict");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var express = __webpack_require__(2);
	/*eslint-disable */
	var router = express.Router();
	/*eslint-enable */
	var conf = __webpack_require__(8);
	var sendgrid = __webpack_require__(11)(conf.get('sendgrid'));

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

	var _default = router;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(router, 'router', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/server/helpers/api.js');

	  __REACT_HOT_LOADER__.register(sendgrid, 'sendgrid', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/server/helpers/api.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/server/helpers/api.js');
	}();

	;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("sendgrid");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	var _sitemap = __webpack_require__(13);

	var _sitemap2 = _interopRequireDefault(_sitemap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var items = _sitemap2.default.items;

	var routes = items.children.map(function (item, index) {
	  return _react2.default.createElement(_reactRouter.Route, { path: item.url, component: item.component, key: index });
	});

	var _default = _react2.default.createElement(
	  _reactRouter.Router,
	  { history: _reactRouter.browserHistory },
	  _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/', component: items.component },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: items.default }),
	    routes,
	    _react2.default.createElement(_reactRouter.Route, { path: 'directorio', component: items.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: 'directorio/playas-tijuana', component: items.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: 'directorio/playas-tijuana/:category', component: items.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: 'directorio/playas-tijuana/:category/:place', component: items.default })
	  )
	);

	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(items, 'items', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/config/routes/index.jsx');

	  __REACT_HOT_LOADER__.register(routes, 'routes', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/config/routes/index.jsx');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/config/routes/index.jsx');
	}();

	;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AppHandler = __webpack_require__(14);

	var _AppHandler2 = _interopRequireDefault(_AppHandler);

	var _home = __webpack_require__(23);

	var _home2 = _interopRequireDefault(_home);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _default = {
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
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/config/sitemap/index.js');
	}();

	;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _sitemap = __webpack_require__(13);

	var _sitemap2 = _interopRequireDefault(_sitemap);

	var _menu = __webpack_require__(15);

	var _menu2 = _interopRequireDefault(_menu);

	var _footer = __webpack_require__(18);

	var _footer2 = _interopRequireDefault(_footer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */


	var AppHandler = function (_React$Component) {
	  _inherits(AppHandler, _React$Component);

	  _createClass(AppHandler, null, [{
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
	  }]);

	  function AppHandler(props, context) {
	    _classCallCheck(this, AppHandler);

	    var _this = _possibleConstructorReturn(this, (AppHandler.__proto__ || Object.getPrototypeOf(AppHandler)).call(this, props, context));

	    _this.state = {
	      data: context.data ? context.data : window.data
	    };
	    return _this;
	  }

	  _createClass(AppHandler, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      AppHandler.googleAnalytics();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var children = _react2.default.Children.map(this.props.children, function (child) {
	        return _react2.default.cloneElement(child, { data: _this2.state.data });
	      });
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_menu2.default, { items: _sitemap2.default.items.children, icons: _sitemap2.default.icons }),
	        children,
	        _react2.default.createElement(_footer2.default, { items: _sitemap2.default.items.children, addresses: _sitemap2.default.addresses })
	      );
	    }
	  }]);

	  return AppHandler;
	}(_react2.default.Component);

	var _default = AppHandler;
	exports.default = _default;


	AppHandler.propTypes = {
	  children: _react2.default.PropTypes.shape({}),
	  location: _react2.default.PropTypes.shape({}),
	  context: _react2.default.PropTypes.shape({}),
	  data: _react2.default.PropTypes.shape({})
	};

	AppHandler.contextTypes = {
	  data: _react2.default.PropTypes.object
	};
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(AppHandler, 'AppHandler', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/components/AppHandler.jsx');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/components/AppHandler.jsx');
	}();

	;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = MainMenu;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	var _svg = __webpack_require__(16);

	var _svg2 = _interopRequireDefault(_svg);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var style = __webpack_require__(17); /* eslint max-len: [2, 500, 4] */

	function MainMenu() {
	  return _react2.default.createElement(
	    'div',
	    { className: style.header },
	    _react2.default.createElement(
	      'div',
	      { className: 'container-fluid' },
	      _react2.default.createElement(
	        'div',
	        { className: 'row' },
	        _react2.default.createElement(
	          'div',
	          { className: 'col-xs-12 col-sm-9' },
	          _react2.default.createElement(
	            'h1',
	            null,
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { to: '/', title: 'Directorio Playas de Tijuana' },
	              _react2.default.createElement(
	                'span',
	                { className: style.playami },
	                'Directorio Playas de Tijuana'
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'hidden-xs col-sm3 ' + style.sm },
	          _react2.default.createElement(
	            'a',
	            { href: 'https://plus.google.com/102083249909313249138', title: 'Directorio Playas de Tijuana - Google Plus', target: '_blank', rel: 'noopener noreferrer' },
	            _react2.default.createElement(_svg2.default, { network: 'googleplus', className: style.gmaps })
	          ),
	          '\xA0',
	          _react2.default.createElement(
	            'a',
	            { href: 'https://www.facebook.com/directorioplayastijuana/', title: 'Directorio Playas de Tijuana - Facebook', target: '_blank', rel: 'noopener noreferrer' },
	            _react2.default.createElement(_svg2.default, { network: 'facebook', className: style.facebook })
	          )
	        )
	      )
	    )
	  );
	}
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(MainMenu, 'MainMenu', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/components/layout/menu/menu1/index.jsx');
	}();

	;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */


	var SVG = function (_React$Component) {
	  _inherits(SVG, _React$Component);

	  function SVG() {
	    _classCallCheck(this, SVG);

	    return _possibleConstructorReturn(this, (SVG.__proto__ || Object.getPrototypeOf(SVG)).apply(this, arguments));
	  }

	  _createClass(SVG, [{
	    key: 'renderItems',
	    value: function renderItems(network, className) {
	      var size = {
	        small: {
	          width: 40,
	          height: 40
	        }
	      };
	      switch (network) {
	        case 'facebook':
	          /*eslint-disable */
	          return _react2.default.createElement(
	            'svg',
	            { xmlns: 'http://www.w3.org/2000/svg', width: size.small.width, height: size.small.width, viewBox: '0 0 30 30', className: className },
	            _react2.default.createElement('circle', { cx: '15', cy: '15', r: '15', fill: '#3a589d' }),
	            _react2.default.createElement('path', { d: 'M16.6 25.1v-9.2h3.2l0.5-3.6h-3.7v-2.3c0-1 0.3-1.7 1.9-1.7l2 0V5.1c-0.3 0-1.5-0.1-2.9-0.1 -2.9 0-4.8 1.7-4.8 4.7v2.6H9.5v3.6h3.2v9.2H16.6z', fill: '#fff' })
	          );
	          break;
	        case 'twitter':
	          return _react2.default.createElement(
	            'svg',
	            { xmlns: 'http://www.w3.org/2000/svg', width: '30', height: '30', viewBox: '0 0 30 30', className: className },
	            _react2.default.createElement('circle', { cx: '15', cy: '15', r: '15' }),
	            _react2.default.createElement('path', { d: 'M23.5 9.7c-0.6 0.3-1.3 0.5-2 0.5 0.7-0.4 1.3-1.1 1.5-1.9 -0.7 0.4-1.4 0.7-2.2 0.8 -0.6-0.7-1.5-1.1-2.5-1.1 -1.9 0-3.5 1.6-3.5 3.5 0 0.3 0 0.5 0.1 0.8 -2.9-0.1-5.5-1.5-7.2-3.6 -0.3 0.5-0.5 1.1-0.5 1.8 0 1.2 0.6 2.3 1.6 2.9 -0.6 0-1.1-0.2-1.6-0.4 0 0 0 0 0 0 0 1.7 1.2 3.1 2.8 3.4 -0.3 0.1-0.6 0.1-0.9 0.1 -0.2 0-0.4 0-0.7-0.1 0.4 1.4 1.7 2.4 3.3 2.4 -1.2 0.9-2.7 1.5-4.3 1.5 -0.3 0-0.6 0-0.8 0 1.5 1 3.4 1.6 5.3 1.6 6.4 0 9.9-5.3 9.9-9.9 0-0.1 0-0.3 0-0.4C22.4 11 23 10.4 23.5 9.7z' })
	          );
	          break;
	        case 'pinterest':
	          return _react2.default.createElement(
	            'svg',
	            { xmlns: 'http://www.w3.org/2000/svg', width: '30', height: '30', viewBox: '0 0 30 30', className: className },
	            _react2.default.createElement('circle', { className: this.props.background, cx: '15', cy: '15', r: '15' }),
	            _react2.default.createElement('path', { d: 'M14.4 18.1c-0.5 2.6-1.1 5.1-2.9 6.4 -0.6-4 0.8-6.9 1.5-10.1 -1.1-1.8 0.1-5.5 2.4-4.6 2.8 1.1-2.4 6.8 1.1 7.5 3.7 0.8 5.2-6.4 2.9-8.8 -3.3-3.4-9.7-0.1-8.9 4.8 0.2 1.2 1.4 1.5 0.5 3.2 -2.1-0.5-2.8-2.1-2.7-4.4 0.1-3.7 3.3-6.2 6.5-6.6 4-0.4 7.8 1.5 8.3 5.2 0.6 4.2-1.8 8.8-6.1 8.5C15.8 19.2 15.4 18.6 14.4 18.1' })
	          );
	          break;
	        case 'instagram':
	          return _react2.default.createElement(
	            'svg',
	            { xmlns: 'http://www.w3.org/2000/svg', width: '30', height: '30', viewBox: '0 0 30 30', className: className },
	            _react2.default.createElement('circle', { cx: '15', cy: '15', r: '15' }),
	            _react2.default.createElement('path', { d: 'M20.6 7H9.4c-1.3 0-2.4 0.9-2.4 2.1v11.8c0 1.2 1.1 2.1 2.4 2.1h11.3c1.3 0 2.4-0.9 2.4-2.1V9.1C23 7.9 22 7 20.6 7zM18.6 9.2c0-0.3 0.2-0.5 0.5-0.5h1.7c0.3 0 0.5 0.2 0.5 0.5v1.7c0 0.3-0.2 0.5-0.5 0.5h-1.7c-0.3 0-0.5-0.2-0.5-0.5V9.2zM17.7 11.7v0c0 0 0 0 0 0H17.7zM14.9 12c2 0 3.5 1.6 3.5 3.5 0 2-1.6 3.5-3.5 3.5 -2 0-3.5-1.6-3.5-3.5C11.4 13.6 13 12 14.9 12zM22 20.7c0 0.8-0.6 1.4-1.4 1.4H9.3c-0.8 0-1.4-0.6-1.4-1.4V13.3h2.9c-0.3 0.7-0.5 1.4-0.5 2.2 0 2.6 2.1 4.7 4.7 4.7 2.6 0 4.7-2.1 4.7-4.7 0-0.7-0.2-1.4-0.5-2h2.8V20.7z' })
	          );
	          break;
	        case 'google':
	          return _react2.default.createElement(
	            'svg',
	            { xmlns: 'http://www.w3.org/2000/svg', width: size.small.width, height: size.small.height, viewBox: '244.9 723.4 50 50' },
	            _react2.default.createElement('path', { d: 'M287.6 730.8c-9.8-9.8-25.6-9.8-35.4 0 -9.8 9.8-9.8 25.6 0 35.4 1.3 1.3 2.7 2.4 4.2 3.4l34.5-34.5C290 733.5 288.8 732.1 287.6 730.8z', fill: '#30A45A' }),
	            _react2.default.createElement('path', { d: 'M290.9 734.9l-34.5 34.5c1.5 1 3.1 1.8 4.7 2.4l32.2-32.2C292.7 738 291.9 736.4 290.9 734.9z', fill: '#FCDD00' }),
	            _react2.default.createElement('path', { d: 'M261.1 771.8c8.9 3.3 19.3 1.4 26.5-5.7l-10.4-10.4L261.1 771.8z', fill: '#5382C2' }),
	            _react2.default.createElement('path', { d: 'M293.3 739.6l-16.1 16.1 10.4 10.4C294.7 759 296.6 748.5 293.3 739.6z', fill: '#C2C1C1' }),
	            _react2.default.createElement('path', { d: 'M276.5 746.3c2.1 0 4.2-0.1 6.4 0.1 0.7 0.1 1 0.3 1.1 1 0.8 7.7-3.6 13.7-11.1 15.2 -7.6 1.5-15.7-4.1-16.8-11.8 -1.2-8.1 4.4-15.7 12.3-16.6 4-0.5 7.6 0.5 10.8 2.9 0.7 0.5 0.8 0.8 0.1 1.4 -0.9 0.8-1.8 1.8-2.7 2.6 -0.4 0.4-0.6 0.6-1.2 0.1 -3-2.3-6.9-2.3-10.1-0.2 -3 2-4.5 5.9-3.6 9.4 1 3.9 4 6.5 7.8 6.8 3.8 0.3 7.1-1.5 8.4-4.7 0.4-0.9 0.4-1.3-0.8-1.3 -2 0.1-3.9 0-5.9 0 -0.9 0-1.2-0.2-1.1-1.1 0.1-1 0-2.1-0.1-3.1 0-0.7 0.2-0.9 0.9-0.9C272.7 746.3 274.6 746.3 276.5 746.3z', fill: '#fff' }),
	            _react2.default.createElement('path', { d: 'M283.8 740.4c-0.2-0.3-0.3-0.6-0.4-1 -0.3-0.9-0.2-1.8 0.2-2.7 0.5-0.9 1.3-1.5 2.4-1.7 1.9-0.4 3.9 0.7 4.3 2.8 0.1 0.8 0 1.6-0.4 2.3 -0.3 0.5-0.6 1-1 1.5 0 0.1-0.1 0.1-0.1 0.2 -0.3 0.4-0.6 0.9-0.9 1.3 -0.5 0.9-0.8 1.8-0.9 2.7 0 0.2-0.1 0.3-0.2 0.4 -0.1-0.1-0.2-0.1-0.2-0.2 0 0 0-0.1 0-0.1 -0.2-1.5-0.8-2.7-1.7-3.9C284.5 741.4 284.1 740.9 283.8 740.4z', fill: '#D95138' })
	          );
	          break;
	        case 'googleplus':
	          return _react2.default.createElement(
	            'svg',
	            { xmlns: 'http://www.w3.org/2000/svg', width: size.small.width, height: size.small.height, viewBox: '0 0 50 50' },
	            _react2.default.createElement('circle', { cx: '25', cy: '25', r: '25', fill: '#DA5031' }),
	            _react2.default.createElement('path', { d: 'M23.6 27.9c-0.5-0.7-1-1.3-1.1-2.1 -0.2-0.8 0-1.6 0.3-2.3 -0.3 0-0.7 0-1 0 -2.2 0.1-4.1-0.5-5.7-2.1 -1.2-1.2-1.8-2.6-1.9-4.2 -0.3-2.6 0.8-4.6 2.6-6.4 1.5-1.4 3.4-2.1 5.4-2.4 2-0.2 4-0.2 6-0.2C30 8.2 31.8 8.2 33.5 8.2c0.1 0 0.2 0 0.3 0 0 0 0 0.1 0 0.1 -0.8 0.5-1.5 1-2.4 1.3 -0.9 0.3-1.8 0.4-2.7 0.1 0 0 0 0.1-0.1 0.1 0.1 0.1 0.1 0.2 0.2 0.3 0.7 0.6 1.3 1.3 1.7 2.1 1.5 2.5 1.4 6.4-1.3 8.7 -0.7 0.6-1.3 1.2-2 1.8 -0.9 0.8-0.8 2.2 0.1 3 1.2 1 2.4 2 3.5 3 2.6 2.3 2.7 6.2 0.8 8.7 -1.4 1.9-3.3 3.1-5.5 3.7 -1.8 0.5-3.6 0.7-5.5 0.7 -1.9-0.1-3.8-0.5-5.5-1.4 -1.4-0.7-2.5-1.8-2.9-3.3 -0.6-1.9-0.2-3.6 1-5.1 1-1.3 2.4-2.2 4-2.7 1.2-0.4 2.4-0.6 3.6-0.8C21.8 28.2 22.7 28.1 23.6 27.9zM23.5 39.8c1.5 0.1 2.8-0.1 4-0.8 2.8-1.4 3.3-5 1-7 -0.8-0.7-1.6-1.3-2.4-2 -0.5-0.4-1.1-0.7-1.8-0.7 -0.7 0-1.4 0.1-2.1 0.2 -1.3 0.1-2.6 0.5-3.8 1.1 -3 1.6-3.1 5-1.4 6.9 0.8 0.9 1.9 1.5 3.1 1.9C21.3 39.7 22.4 39.8 23.5 39.8zM18.2 14.3c0 1.3 0.1 2.3 0.5 3.3 0.5 1.4 1.2 2.6 2.3 3.6 2 1.7 4.7 1 6-0.7 0.5-0.7 0.7-1.5 0.7-2.4 0.1-1-0.1-2-0.4-3 -0.4-1.7-1.2-3.2-2.5-4.4 -2-1.8-5.1-1.2-6.2 1.2C18.2 12.8 18.2 13.6 18.2 14.3z', fill: '#fff' }),
	            _react2.default.createElement('path', { d: 'M33.2 24.5c0-0.7 0-1.4 0-2.1 1.1 0 2.2 0 3.3 0 0-0.1 0-0.2 0-0.3 0-0.9 0-1.8 0-2.6 0-0.4 0.1-0.4 0.4-0.4 0.4 0 0.8 0 1.2 0 0.3 0 0.4 0.1 0.4 0.4 0 1 0 1.9 0 2.9 1.1 0 2.2 0 3.3 0 0 0.7 0 1.4 0 2.1 -0.1 0-0.2 0-0.3 0 -0.9 0-1.7 0-2.6 0 -0.4 0-0.4 0-0.4 0.4 0 0.8 0 1.6 0 2.4 0 0.5-0.1 0.5-0.5 0.5 -0.4 0-0.7 0-1.1 0 -0.4 0-0.5-0.1-0.5-0.5 0-0.8 0-1.6 0-2.4 0-0.4-0.1-0.4-0.4-0.4 -0.9 0-1.8 0-2.8 0C33.3 24.5 33.3 24.5 33.2 24.5z', fill: '#fff' })
	          );
	          break;
	        case 'foursquare':
	          return _react2.default.createElement(
	            'svg',
	            { xmlns: 'http://www.w3.org/2000/svg', width: '50', height: '50', viewBox: '244.9 723.5 50 49.9' },
	            _react2.default.createElement('circle', { cx: '269.9', cy: '748.4', r: '25', fill: '#f64d78' }),
	            _react2.default.createElement('path', { d: 'M280.2 733.6c0 0-14.5 0-16.8 0s-3 1.8-3 2.9c0 1.1 0 26.8 0 26.8 0 1.2 0.7 1.7 1 1.9 0.4 0.2 1.4 0.3 2-0.4 0 0 7.9-9.2 8.1-9.4 0.2-0.2 0.2-0.2 0.4-0.2 0.4 0 3.5 0 5.1 0 2.2 0 2.5-1.5 2.7-2.5 0.2-0.8 2.3-11.6 3-15C283.3 735 282.6 733.6 280.2 733.6zM279.8 752.6c0.2-0.8 2.3-11.6 3-15M279.2 738.1l-0.7 3.7c-0.1 0.4-0.6 0.8-1 0.8 -0.5 0-6.8 0-6.8 0 -0.7 0-1.3 0.4-1.3 1.2v0.9c0 0.7 0.5 1.3 1.3 1.3 0 0 5.3 0 5.8 0 0.5 0 1 0.6 0.9 1.1 -0.1 0.6-0.6 3.3-0.7 3.6 -0.1 0.3-0.4 0.8-1 0.8 -0.5 0-4.5 0-4.5 0 -0.8 0-1.1 0.1-1.6 0.8 -0.6 0.7-5.5 6.7-5.5 6.7 0 0.1-0.1 0-0.1 0v-20.9c0-0.5 0.4-1 1-1 0 0 13 0 13.5 0C278.8 737.1 279.3 737.5 279.2 738.1z', fill: '#FFF' })
	          );
	          break;
	        case 'yelp':
	          return _react2.default.createElement(
	            'svg',
	            { xmlns: 'http://www.w3.org/2000/svg', width: '50', height: '50', viewBox: '244.9 723.5 50 49.9' },
	            _react2.default.createElement('circle', { cx: '269.9', cy: '748.4', r: '25', fill: '#bc341f' }),
	            _react2.default.createElement('path', { d: 'M264 741.2c-1.1-1.8-2.2-3.5-3.2-5.3 -0.6-1-0.4-1.6 0.6-2.2 1.7-0.9 3.5-1.3 5.4-1.7 0.3-0.1 0.7-0.1 1-0.1 1.2-0.1 1.7 0.4 1.7 1.6 0.2 3.2 0.4 6.4 0.7 9.6 -0.1 0.9 0.2 1.8 0.1 2.8 -0.1 1.1-0.4 1.5-1.3 1.7 -0.8 0.2-1.2-0.5-1.6-1 -1-1.6-2-3.2-3-4.8C264.2 741.6 264.1 741.4 264 741.2z', fill: '#fff' }),
	            _react2.default.createElement('path', { d: 'M276 743.2c0.4-0.3 0.7-0.8 1-1.1 0.5-0.6 1.1-0.7 1.8-0.2 0.4 0.3 0.8 0.7 1.1 1.1 0.6 0.9 1.3 1.8 1.7 2.7 0.2 0.4 0.4 0.9 0.5 1.4 0.1 0.7-0.1 1.2-0.8 1.4 -2.3 0.7-4.7 1.3-7 1.8 -0.8 0.2-1.2-0.1-1.6-0.7 -0.4-0.6-0.3-1.2 0.1-1.8C273.8 746.4 275 744.8 276 743.2z', fill: '#fff' }),
	            _react2.default.createElement('path', { d: 'M257.7 751.5c0-1.1 0.1-2.1 0.3-3.1 0.2-1.1 0.9-1.5 1.9-1.1 2.2 0.9 4.4 1.8 6.6 2.7 0.6 0.3 0.9 0.8 0.8 1.4 0 0.6-0.3 1.1-0.9 1.3 -2.3 0.7-4.5 1.5-6.8 2.2 -0.9 0.3-1.4 0-1.7-0.9 0-0.2-0.1-0.3-0.1-0.5C257.7 752.8 257.7 752.2 257.7 751.5z', fill: '#fff' }),
	            _react2.default.createElement('path', { d: 'M272.7 754.6c0-1 0.9-1.7 1.9-1.4 2.2 0.7 4.4 1.5 6.6 2.2 1 0.4 1.3 1 0.9 2 -0.8 1.7-1.9 3.2-3.4 4.4 -0.8 0.7-1.5 0.6-2.1-0.3 -1.3-2-2.5-4-3.7-6.1C272.8 755.2 272.7 754.9 272.7 754.6z', fill: '#fff' }),
	            _react2.default.createElement('path', { d: 'M270.1 759.7c0 1.2 0 2.4 0 3.6 0 1-0.5 1.5-1.5 1.4 -1.9-0.2-3.7-0.9-5.3-2 -0.8-0.6-0.9-1.2-0.3-1.9 1.5-1.9 3.1-3.7 4.6-5.6 0.4-0.5 1-0.6 1.6-0.4 0.6 0.2 0.9 0.6 0.9 1.3 0 1.2 0 2.5 0 3.7C270.1 759.7 270.1 759.7 270.1 759.7z', fill: '#fff' })
	          );
	          break;
	        default:
	          return _react2.default.createElement(
	            'svg',
	            { xmlns: 'http://www.w3.org/2000/svg', width: '30', height: '30', viewBox: '0 0 30 30', className: className },
	            _react2.default.createElement('circle', { cx: '15', cy: '15', r: '15' }),
	            _react2.default.createElement('path', { d: 'M16.6 25.1v-9.2h3.2l0.5-3.6h-3.7v-2.3c0-1 0.3-1.7 1.9-1.7l2 0V5.1c-0.3 0-1.5-0.1-2.9-0.1 -2.9 0-4.8 1.7-4.8 4.7v2.6H9.5v3.6h3.2v9.2H16.6z', fill: '#fff' })
	          );
	        /*eslint-enable */
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.renderItems(this.props.network, this.props.className);
	    }
	  }]);

	  return SVG;
	}(_react2.default.Component);

	var _default = SVG;
	exports.default = _default;

	SVG.propTypes = {
	  background: _react2.default.PropTypes.string,
	  network: _react2.default.PropTypes.string,
	  className: _react2.default.PropTypes.string
	};
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(SVG, 'SVG', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/components/svg/index.jsx');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/components/svg/index.jsx');
	}();

	;

/***/ },
/* 17 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"fCenter":"style__fCenter___cfX-h","vCenter":"style__vCenter___ZA14l","vCenterRel":"style__vCenterRel___1GkYt","hCenter":"style__hCenter___2Rj-i","inheritHeight":"style__inheritHeight___2LMcf","hideOverflow":"style__hideOverflow___3olA9","header":"style__header___3oysY","playami":"style__playami___1p20f","sm":"style__sm___1NvWS"};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Footer1;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _brand = __webpack_require__(19);

	var _brand2 = _interopRequireDefault(_brand);

	var _projects = __webpack_require__(21);

	var _projects2 = _interopRequireDefault(_projects);

	var _about = __webpack_require__(22);

	var _about2 = _interopRequireDefault(_about);

	var _svg = __webpack_require__(16);

	var _svg2 = _interopRequireDefault(_svg);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var style = __webpack_require__(20); /* eslint max-len: [2, 500, 4] */
	function Footer1() {
	  return _react2.default.createElement(
	    'div',
	    { className: style.footerWrapper, id: 'footer_section' },
	    _react2.default.createElement(
	      'div',
	      { className: style.mintWrapper },
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
	            _react2.default.createElement(_projects2.default, null)
	          )
	        )
	      )
	    ),
	    _react2.default.createElement(
	      'div',
	      { className: 'container-fluid' },
	      _react2.default.createElement(
	        'div',
	        { className: 'row' },
	        _react2.default.createElement(
	          'div',
	          { className: 'col-xs-12' },
	          _react2.default.createElement(_about2.default, null)
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'col-xs-12' },
	          _react2.default.createElement(
	            'div',
	            { className: 'row ' + style.smRow },
	            _react2.default.createElement(
	              'a',
	              { href: 'https://plus.google.com/102083249909313249138', title: 'Directorio Playas de Tijuana - Google Plus', target: '_blank', rel: 'noopener noreferrer' },
	              _react2.default.createElement(_svg2.default, { network: 'googleplus', className: style.gmaps })
	            ),
	            '\xA0',
	            _react2.default.createElement(
	              'a',
	              { href: 'https://www.facebook.com/directorioplayastijuana/', title: 'Directorio Playas de Tijuana - Facebook', target: '_blank', rel: 'noopener noreferrer' },
	              _react2.default.createElement(_svg2.default, { network: 'facebook', className: style.facebook })
	            )
	          )
	        )
	      )
	    )
	  );
	}
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(Footer1, 'Footer1', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/components/layout/footer/footer1/index.jsx');
	}();

	;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Brand;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint max-len: [2, 500, 4] */
	var style = __webpack_require__(20);

	function Brand() {
	  return _react2.default.createElement(
	    'div',
	    { className: 'row ' + style.brand },
	    _react2.default.createElement(
	      'a',
	      { className: style.logo, href: 'http://mintitmedia.com', title: 'Dise\xF1o y Desarrollo Web en Tijuana', target: '_blank', rel: 'noopener noreferrer' },
	      _react2.default.createElement('img', { src: '/images/logo-mint.png', alt: 'Dise\xF1o y Desarrollo Web en Tijuana' })
	    ),
	    _react2.default.createElement(
	      'p',
	      null,
	      _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/', title: 'Directorio de Playas de Tijuana' },
	        'Directorio Playas de Tijuana'
	      ),
	      ' es un producto desarrollado por\xA0',
	      _react2.default.createElement(
	        'a',
	        { href: 'http://mintitmedia.com', title: 'Dise\xF1o y desarrollo web en Tijuana', target: '_blank', rel: 'noopener noreferrer' },
	        'Mint IT Media'
	      ),
	      ', para la comunidad de Playas de Tijuana y el p\xFAblico en general.\xA0'
	    )
	  );
	}
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(Brand, 'Brand', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/components/layout/footer/footer1/brand.jsx');
	}();

	;

/***/ },
/* 20 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"fCenter":"style__fCenter___24X-f","showFooterBtn":"style__showFooterBtn___32mks","vCenter":"style__vCenter___rkH6k","vCenterRel":"style__vCenterRel___W_SE5","hCenter":"style__hCenter___rq5W3","inheritHeight":"style__inheritHeight___IbmOF","hideOverflow":"style__hideOverflow___3nmjb","noScroll":"style__noScroll___1ZSBh","fixedFooter":"style__fixedFooter___VC2KX","removeFixed":"style__removeFixed___OyCQg","footerWrapper":"style__footerWrapper___zbtoF","mintWrapper":"style__mintWrapper___35owg","brand":"style__brand___1i--U","yellow":"style__yellow___RRjP0","white":"style__white___3N7gH","contact":"style__contact___2AMMK","facebook":"style__facebook___39dVV","projects":"style__projects___2bCs6","about":"style__about___vuj9k","smRow":"style__smRow___26FLl"};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Projects;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint max-len: [2, 500, 4] */
	var style = __webpack_require__(20);

	function Projects() {
	  return _react2.default.createElement(
	    'div',
	    { className: 'row ' + style.projects },
	    _react2.default.createElement(
	      'div',
	      { className: 'col-xs-12' },
	      _react2.default.createElement(
	        'p',
	        null,
	        'Proyectos hermanos de\xA0',
	        _react2.default.createElement(
	          _reactRouter.Link,
	          { to: '/', title: 'Directorio de Playas de Tijuana' },
	          'Directorio Playas de Tijuana'
	        )
	      )
	    ),
	    _react2.default.createElement(
	      'div',
	      { className: 'col-xs-4' },
	      _react2.default.createElement(
	        _reactRouter.Link,
	        { to: 'http://www.garitacenter.com', target: '_blank', title: 'Reporte de Garitas en Tijuana para San Ysidro y Otay' },
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
	        { to: 'http://www.misofertasdetrabajo.com', target: '_blank', title: 'Ofertas de Trabajo en Tijuana' },
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
	        { to: 'http://www.tucambionline.com', target: '_blank', title: 'Tipo de Cambio en Tijuana' },
	        _react2.default.createElement('img', { src: '/images/gp-logo.png', alt: 'Tipo de Cambio en Tijuana' }),
	        _react2.default.createElement(
	          'p',
	          null,
	          'Tu Cambio Online'
	        )
	      )
	    )
	  );
	}
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(Projects, 'Projects', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/components/layout/footer/footer1/projects.jsx');
	}();

	;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = About;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint max-len: [2, 500, 4] */
	var style = __webpack_require__(20);

	function About() {
	  return _react2.default.createElement(
	    'div',
	    { className: 'row ' + style.about },
	    _react2.default.createElement(
	      'h2',
	      null,
	      'Directorio Playas de Tijuana'
	    ),
	    _react2.default.createElement(
	      'p',
	      null,
	      'En\xA0',
	      _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/', title: 'Directorio Playas de Tijuana' },
	        'Directorio Playas de Tijuana'
	      ),
	      '\xA0 buscamos recopilar una gu\xEDa comprensiva de los negocios que operan en la comunidad de ',
	      _react2.default.createElement(
	        'strong',
	        null,
	        'Playas de Tijuana'
	      ),
	      '.\xA0',
	      _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/', title: 'Directorio Playas de Tijuana' },
	        'Directorio Playas de Tijuana'
	      ),
	      ' es un servicio que publica de manera sencilla la informaci\xF3n referente a\xA0',
	      _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/restaurantes', title: 'Directorio Playas de Tijuana' },
	        'restaurantes'
	      ),
	      ',\xA0',
	      _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/bares', title: 'Directorio Playas de Tijuana' },
	        'bares'
	      ),
	      ',\xA0',
	      _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/cafes', title: 'Directorio Playas de Tijuana' },
	        'caf\xE9s'
	      ),
	      '\xA0 ubicados en ',
	      _react2.default.createElement(
	        'strong',
	        null,
	        'Playas de Tijuana'
	      ),
	      '. La creaci\xF3n de este ',
	      _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/', title: 'Directorio Playas de Tijuana' },
	        'Directorio Playas de Tijuana'
	      ),
	      ' tiene el objetivo de ofrecer a su p\xFAblico un acceso eficaz a lo que ',
	      _react2.default.createElement(
	        'strong',
	        null,
	        'Playas de Tijuana'
	      ),
	      ' tiene que ofrecer y, de esta manera, promover el desarrollo econ\xF3mico de la Delegaci\xF3n ',
	      _react2.default.createElement(
	        'strong',
	        null,
	        'Playas de Tijuana'
	      ),
	      '.'
	    ),
	    _react2.default.createElement(
	      'p',
	      null,
	      _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/', title: 'Directorio Playas de Tijuana' },
	        'Directorio Playas de Tijuana'
	      ),
	      ' es un servicio que opera con base en la recopilaci\xF3n de informaci\xF3n que existe p\xFAblicamente disponible en Internet. La veracidad de dicha informaci\xF3n recae en los autores originales de tal. ',
	      _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/', title: 'Directorio de Playas de Tijuana' },
	        'Directorio Playas de Tijuana'
	      ),
	      ' no se hace responsable de la veracidad de dicha informaci\xF3n y, en caso de incongruencias invitamos al p\xFAblico a contactarnos para hacer las correcciones necesarias.'
	    )
	  );
	}
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(About, 'About', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/components/layout/footer/footer1/about.jsx');
	}();

	;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(24);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _cardElement = __webpack_require__(25);

	var _cardElement2 = _interopRequireDefault(_cardElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */

	var style = __webpack_require__(28);

	var HomeSection = function (_React$Component) {
	  _inherits(HomeSection, _React$Component);

	  _createClass(HomeSection, null, [{
	    key: 'renderCard',
	    value: function renderCard(data) {
	      if (_lodash2.default.isArray(data) && data.length) {
	        return data.map(function (item, index) {
	          return _react2.default.createElement(_cardElement2.default, { data: item, key: index });
	        });
	      }
	      return null;
	    }
	  }]);

	  function HomeSection(props) {
	    _classCallCheck(this, HomeSection);

	    var _this = _possibleConstructorReturn(this, (HomeSection.__proto__ || Object.getPrototypeOf(HomeSection)).call(this, props));

	    var data = _this.props.data;

	    var chunkSize = 12;
	    _this.state = {
	      data: data.places.slice(0, chunkSize),
	      allData: data.places,
	      chunkSize: chunkSize
	    };
	    _this.clickHandler = _this.clickHandler.bind(_this);
	    return _this;
	  }

	  _createClass(HomeSection, [{
	    key: 'clickHandler',
	    value: function clickHandler() {
	      var _state = this.state;
	      var data = _state.data;
	      var allData = _state.allData;
	      var chunkSize = _state.chunkSize;

	      var newData = [];
	      if (data.length < allData.length) {
	        newData.push.apply(data, allData.slice(data.length, data.length + chunkSize));
	        var newState = _lodash2.default.assign({}, this.state, {
	          data: data
	        });
	        this.setState(newState);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var data = this.state.data;

	      return _react2.default.createElement(
	        'div',
	        { className: 'container-fluid' },
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          HomeSection.renderCard(data)
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: style.showMore },
	          _react2.default.createElement(
	            'a',
	            { href: '', title: 'mostrar m\xE1s restaurantes', className: 'btn btn-default btn-lg', onClick: this.clickHandler },
	            'Mostar m\xE1s'
	          )
	        )
	      );
	    }
	  }]);

	  return HomeSection;
	}(_react2.default.Component);

	var _default = HomeSection;
	exports.default = _default;


	HomeSection.propTypes = {
	  data: _react2.default.PropTypes.shape({})
	};
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(HomeSection, 'HomeSection', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/components/sections/home/index.jsx');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/components/sections/home/index.jsx');
	}();

	;

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(24);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _string = __webpack_require__(26);

	var _socialMediaIcons = __webpack_require__(27);

	var _socialMediaIcons2 = _interopRequireDefault(_socialMediaIcons);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */

	var style = __webpack_require__(28);

	var CardElement = function (_React$Component) {
	  _inherits(CardElement, _React$Component);

	  _createClass(CardElement, null, [{
	    key: 'getImage',
	    value: function getImage(data) {
	      var loadingImage = 'http://nemanjakovacevic.net/wp-content/uploads/2013/07/placeholder.png';
	      if (_lodash2.default.isArray(data) && data.length) {
	        return data[0].url || loadingImage;
	      }
	      return loadingImage;
	    }
	  }, {
	    key: 'getDescription',
	    value: function getDescription(data) {
	      if (_lodash2.default.isArray(data) && data.length) {
	        return data[0].description;
	      }
	      return null;
	    }
	  }, {
	    key: 'getSocialMediaData',
	    value: function getSocialMediaData(data) {
	      return {
	        name: data.name,
	        gmaps: data.location,
	        facebook: data.facebook
	      };
	    }
	  }]);

	  function CardElement() {
	    _classCallCheck(this, CardElement);

	    var _this = _possibleConstructorReturn(this, (CardElement.__proto__ || Object.getPrototypeOf(CardElement)).call(this));

	    _this.componentDidMount = _this.componentDidMount.bind(_this);
	    _this.state = {
	      titleLength: 22,
	      descriptionLength: 166
	    };
	    return _this;
	  }

	  _createClass(CardElement, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (window.innerWidth > 767 && window.innerWidth < 1024) {
	        /*eslint-disable */
	        this.setState({
	          titleLength: 17
	        });
	        /*eslint-enable */
	      } else if (window.innerWidth < 768) {
	        /*eslint-disable */
	        this.setState({
	          titleLength: 500,
	          descriptionLength: 500
	        });
	        /*eslint-enable */
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var data = this.props.data;

	      var imageUrl = CardElement.getImage(data.metaImages);
	      var _state = this.state;
	      var titleLength = _state.titleLength;
	      var descriptionLength = _state.descriptionLength;

	      return _react2.default.createElement(
	        'div',
	        { className: 'col-xs-12 col-sm-4' },
	        _react2.default.createElement(
	          'div',
	          { className: style.card },
	          _react2.default.createElement('img', { src: imageUrl, alt: data.name }),
	          _react2.default.createElement(
	            'div',
	            { className: style.card.info },
	            _react2.default.createElement(
	              'h3',
	              null,
	              (0, _string.truncate)((0, _string.toTitleCase)(data.name), titleLength)
	            ),
	            _react2.default.createElement(
	              'p',
	              null,
	              (0, _string.truncate)(CardElement.getDescription(data.metaDescriptions), descriptionLength)
	            ),
	            _react2.default.createElement(_socialMediaIcons2.default, { data: CardElement.getSocialMediaData(data) })
	          )
	        )
	      );
	    }
	  }]);

	  return CardElement;
	}(_react2.default.Component);

	var _default = CardElement;
	exports.default = _default;


	CardElement.propTypes = {
	  data: _react2.default.PropTypes.shape({})
	};
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(CardElement, 'CardElement', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/components/sections/home/cardElement.jsx');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/components/sections/home/cardElement.jsx');
	}();

	;

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.minsToHrs = minsToHrs;
	exports.toTitleCase = toTitleCase;
	exports.timeSince = timeSince;
	exports.truncate = truncate;

	function printMinutes(data) {
	  if (data < 10) {
	    return '0' + data;
	  }
	  return data;
	}

	function minsToHrs(data) {
	  if (data) {
	    var hours = Math.floor(data / 60);
	    var minutes = data % 60;
	    return hours + ':' + printMinutes(minutes);
	  }
	  return data;
	}

	function toTitleCase(data) {
	  var response = data.replace(/_/g, ' ');
	  return response.replace(/\w\S*/g, function (txt) {
	    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  });
	}

	function timeSince(data) {
	  var seconds = Math.floor((new Date() - new Date(data)) / 1000);
	  var interval = Math.floor(seconds / 31536000);

	  if (interval >= 1) {
	    return interval + ' a\xF1o' + (interval > 1 ? 's' : '');
	  }
	  interval = Math.floor(seconds / 2592000);
	  if (interval >= 1) {
	    return interval + ' mes' + (interval > 1 ? 'es' : '');
	  }
	  interval = Math.floor(seconds / 86400);
	  if (interval >= 1) {
	    return interval + ' d\xEDa' + (interval > 1 ? 's' : '');
	  }
	  interval = Math.floor(seconds / 3600);
	  if (interval >= 1) {
	    return interval + ' hora' + (interval > 1 ? 's' : '');
	  }
	  interval = Math.floor(seconds / 60);
	  if (interval > 1) {
	    return interval + ' minutos';
	  }
	  return '1 minuto';
	}

	function truncate(string, limit) {
	  return string && string.length > limit ? string.substr(0, limit - 1) + ' ...' : string;
	}
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(printMinutes, 'printMinutes', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/utils/string/index.js');

	  __REACT_HOT_LOADER__.register(minsToHrs, 'minsToHrs', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/utils/string/index.js');

	  __REACT_HOT_LOADER__.register(toTitleCase, 'toTitleCase', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/utils/string/index.js');

	  __REACT_HOT_LOADER__.register(timeSince, 'timeSince', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/utils/string/index.js');

	  __REACT_HOT_LOADER__.register(truncate, 'truncate', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/utils/string/index.js');
	}();

	;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(24);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _svg = __webpack_require__(16);

	var _svg2 = _interopRequireDefault(_svg);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: [2, 500, 4] */


	var style = __webpack_require__(28);

	var SocialMediaIcons = function (_React$Component) {
	  _inherits(SocialMediaIcons, _React$Component);

	  _createClass(SocialMediaIcons, null, [{
	    key: 'openNewTab',
	    value: function openNewTab(url) {
	      window.open(url);
	    }
	  }]);

	  function SocialMediaIcons() {
	    _classCallCheck(this, SocialMediaIcons);

	    var _this = _possibleConstructorReturn(this, (SocialMediaIcons.__proto__ || Object.getPrototypeOf(SocialMediaIcons)).call(this));

	    _this.clickGMapsHandler = _this.clickGMapsHandler.bind(_this);
	    _this.clickFacebookHandler = _this.clickFacebookHandler.bind(_this);
	    return _this;
	  }

	  _createClass(SocialMediaIcons, [{
	    key: 'clickGMapsHandler',
	    value: function clickGMapsHandler(event) {
	      var gmaps = this.props.data.gmaps;

	      var gmapsUrl = 'https://www.google.com/maps/place//@' + gmaps.lat + ',' + gmaps.lng + ',18z';
	      SocialMediaIcons.openNewTab(gmapsUrl);
	      event.preventDefault();
	    }
	  }, {
	    key: 'clickFacebookHandler',
	    value: function clickFacebookHandler(event) {
	      var facebook = this.props.data.facebook;

	      var data = facebook.filter(function (item) {
	        return item.link;
	      }).pop();
	      SocialMediaIcons.openNewTab(data.link);
	      event.preventDefault();
	    }
	  }, {
	    key: 'renderGMaps',
	    value: function renderGMaps(data) {
	      return data ? _react2.default.createElement(
	        'li',
	        null,
	        _react2.default.createElement(
	          'a',
	          { href: 'https://www.google.com/maps/', title: data + ' en playas de tijuan', target: '_blank', onClick: this.clickGMapsHandler, rel: 'noopener noreferrer' },
	          _react2.default.createElement(_svg2.default, { network: 'google' })
	        )
	      ) : null;
	    }
	  }, {
	    key: 'renderFacebook',
	    value: function renderFacebook(data) {
	      return _lodash2.default.isArray(data) && data.length ? _react2.default.createElement(
	        'li',
	        null,
	        _react2.default.createElement(
	          'a',
	          { href: 'https://www.facebook.com/', title: data.name + ' en playas de tijuana', target: '_blank', onClick: this.clickFacebookHandler, rel: 'noopener noreferrer' },
	          _react2.default.createElement(_svg2.default, { network: 'facebook' })
	        )
	      ) : null;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var data = this.props.data;

	      return _react2.default.createElement(
	        'div',
	        { className: style.socialMediaIcons },
	        _react2.default.createElement(
	          'ul',
	          null,
	          this.renderGMaps(data.name),
	          this.renderFacebook(data.facebook)
	        )
	      );
	    }
	  }]);

	  return SocialMediaIcons;
	}(_react2.default.Component);

	var _default = SocialMediaIcons;
	exports.default = _default;


	SocialMediaIcons.propTypes = {
	  data: _react2.default.PropTypes.shape({
	    facebook: _react2.default.array,
	    gmaps: _react2.default.object
	  })
	};
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(SocialMediaIcons, 'SocialMediaIcons', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/components/sections/home/socialMediaIcons.jsx');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/components/sections/home/socialMediaIcons.jsx');
	}();

	;

/***/ },
/* 28 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"fCenter":"style__fCenter___qougA","vCenter":"style__vCenter___2pche","vCenterRel":"style__vCenterRel___WRKiA","hCenter":"style__hCenter___GVDHq","inheritHeight":"style__inheritHeight___3vMr3","hideOverflow":"style__hideOverflow___DySF5","card":"style__card___ZmnTp","showMore":"style__showMore___104t8","socialMediaIcons":"style__socialMediaIcons___3zABO"};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _rest = __webpack_require__(30);

	var _rest2 = _interopRequireDefault(_rest);

	var _mime = __webpack_require__(31);

	var _mime2 = _interopRequireDefault(_mime);

	var _errorCode = __webpack_require__(32);

	var _errorCode2 = _interopRequireDefault(_errorCode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var client = _rest2.default.wrap(_mime2.default, { mime: 'application/json' }).wrap(_errorCode2.default, { code: 300 });

	var RequestUtil = function () {
	  function RequestUtil() {
	    _classCallCheck(this, RequestUtil);
	  }

	  _createClass(RequestUtil, null, [{
	    key: 'get',
	    value: function get(url) {
	      return client({ path: url });
	    }

	    /*
	      Request method post
	      @param {string} string
	      @param {data} data
	      @returns {object}
	    */

	  }, {
	    key: 'post',
	    value: function post(url, data) {
	      return client({
	        method: 'POST',
	        path: url,
	        entity: data
	      });
	    }
	  }]);

	  return RequestUtil;
	}();

	var _default = RequestUtil;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(client, 'client', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/utils/requestUtil/index.js');

	  __REACT_HOT_LOADER__.register(RequestUtil, 'RequestUtil', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/utils/requestUtil/index.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/jgarciadiaz/Dev/sites/website-playastijuana/src/shared/utils/requestUtil/index.js');
	}();

	;

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("rest");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("rest/interceptor/mime");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("rest/interceptor/errorCode");

/***/ }
/******/ ]);