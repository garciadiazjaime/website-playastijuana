'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

require('isomorphic-unfetch');

var _layout = require('../components/layout');

var _layout2 = _interopRequireDefault(_layout);

var _place = require('../components/place');

var _place2 = _interopRequireDefault(_place);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/jgarciadiaz/Dev/sites/website-playastijuana/pages/index.js?entry';


var apiURL = process.env.API_URL;

var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);

    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
  }

  (0, _createClass3.default)(_class, [{
    key: 'renderPlaces',
    value: function renderPlaces() {
      var places = this.props.places;

      if (places && places.length) {
        return places.map(function (place) {
          return _react2.default.createElement(_place2.default, { place: place, key: place.placeId, __source: {
              fileName: _jsxFileName,
              lineNumber: 22
            }
          });
        });
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }, this.renderPlaces());
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var res, places;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(apiURL + '/places');

              case 2:
                res = _context.sent;
                _context.next = 5;
                return res.json();

              case 5:
                places = _context.sent;
                return _context.abrupt('return', { places: places });

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps() {
        return _ref.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiTGluayIsIkhlYWQiLCJMYXlvdXQiLCJQbGFjZSIsImFwaVVSTCIsInByb2Nlc3MiLCJlbnYiLCJBUElfVVJMIiwicGxhY2VzIiwicHJvcHMiLCJsZW5ndGgiLCJtYXAiLCJwbGFjZSIsInBsYWNlSWQiLCJyZW5kZXJQbGFjZXMiLCJmZXRjaCIsInJlcyIsImpzb24iLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUDs7QUFFQSxBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFXOzs7Ozs7Ozs7QUFFbEIsSUFBTSxTQUFTLFFBQUEsQUFBUSxJQUF2QixBQUEyQjs7Ozs7Ozs7Ozs7OzttQ0FVVjtVQUFBLEFBQ0wsU0FBVyxLQUROLEFBQ1csTUFEWCxBQUNMLEFBQ1I7O1VBQUksVUFBVSxPQUFkLEFBQXFCLFFBQVEsQUFDM0I7c0JBQU8sQUFBTyxJQUFJLGlCQUFBO2lDQUFTLEFBQUMsaUNBQU0sT0FBUCxBQUFjLE9BQU8sS0FBSyxNQUExQixBQUFnQzt3QkFBaEM7MEJBQVQsQUFBUztBQUFBO1dBQUE7QUFBM0IsQUFBTyxBQUNSLFNBRFE7QUFFVDthQUFBLEFBQU8sQUFDUjs7Ozs2QkFFUSxBQUNQOzZCQUFRLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0w7QUFESztBQUFBLE9BQUEsT0FBUixBQUFRLEFBQ0wsQUFBSyxBQUVUOzs7Ozs7Ozs7Ozs7dUJBakJtQixNQUFBLEFBQVMsUzs7bUJBQXJCO0E7O3VCQUNlLElBQUEsQUFBSSxBOzttQkFBbkI7QTtpREFDQyxFQUFFLFFBQUYsQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUxrQixnQkFBTSxBIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ2FyY2lhZGlhei9EZXYvc2l0ZXMvd2Vic2l0ZS1wbGF5YXN0aWp1YW5hIn0=