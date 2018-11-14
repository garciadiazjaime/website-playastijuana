'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _mainMenu = require('./mainMenu');

var _mainMenu2 = _interopRequireDefault(_mainMenu);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/jgarciadiaz/Dev/sites/website-playastijuana/components/layout.js';

exports.default = function (_ref) {
  var children = _ref.children,
      _ref$title = _ref.title,
      title = _ref$title === undefined ? 'Chicago Events' : _ref$title;
  return _react2.default.createElement(_MuiThemeProvider2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement('div', {
    className: 'jsx-2631910671',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement(_head2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement('title', {
    className: 'jsx-2631910671',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, title), _react2.default.createElement('meta', { charSet: 'utf-8', className: 'jsx-2631910671',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }), _react2.default.createElement('meta', { name: 'viewport', content: 'initial-scale=1.0, width=device-width', className: 'jsx-2631910671',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  })), _react2.default.createElement(_mainMenu2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }), children, _react2.default.createElement(_footer2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }), _react2.default.createElement(_style2.default, {
    styleId: '2631910671',
    css: 'body{margin:0 auto;max-width:720px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGF5b3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNCeUIsQUFHeUIsY0FDRSxnQkFDbEIiLCJmaWxlIjoiY29tcG9uZW50cy9sYXlvdXQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pnYXJjaWFkaWF6L0Rldi9zaXRlcy93ZWJzaXRlLXBsYXlhc3RpanVhbmEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgTXVpVGhlbWVQcm92aWRlciBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvTXVpVGhlbWVQcm92aWRlcic7XG5cbmltcG9ydCBNYWlubWVudSBmcm9tICcuL21haW5NZW51JztcbmltcG9ydCBGb290ZXIgZnJvbSAnLi9mb290ZXInO1xuXG5leHBvcnQgZGVmYXVsdCAoeyBjaGlsZHJlbiwgdGl0bGUgPSAnQ2hpY2FnbyBFdmVudHMnIH0pID0+IChcbiAgPE11aVRoZW1lUHJvdmlkZXI+XG4gICAgPGRpdj5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+eyB0aXRsZSB9PC90aXRsZT5cbiAgICAgICAgPG1ldGEgY2hhclNldD0ndXRmLTgnIC8+XG4gICAgICAgIDxtZXRhIG5hbWU9J3ZpZXdwb3J0JyBjb250ZW50PSdpbml0aWFsLXNjYWxlPTEuMCwgd2lkdGg9ZGV2aWNlLXdpZHRoJyAvPlxuICAgICAgPC9IZWFkPlxuXG4gICAgICA8TWFpbm1lbnUgLz5cblxuICAgICAgeyBjaGlsZHJlbiB9XG5cbiAgICAgIDxGb290ZXIgLz5cbiAgICAgIFxuICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgYm9keSB7XG4gICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgbWF4LXdpZHRoOiA3MjBweDtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgIDwvZGl2PlxuICA8L011aVRoZW1lUHJvdmlkZXI+XG4pXG4iXX0= */\n/*@ sourceURL=components/layout.js */'
  })));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGF5b3V0LmpzIl0sIm5hbWVzIjpbIkxpbmsiLCJIZWFkIiwiTXVpVGhlbWVQcm92aWRlciIsIk1haW5tZW51IiwiRm9vdGVyIiwiY2hpbGRyZW4iLCJ0aXRsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFFUCxBQUFPLEFBQWM7Ozs7QUFDckIsQUFBTyxBQUFZLEFBRW5COzs7Ozs7OztrQkFBZSxnQkFBQTtNQUFBLEFBQUcsZ0JBQUgsQUFBRzt3QkFBSCxBQUFhO01BQWIsQUFBYSxtQ0FBYixBQUFxQixtQkFBckI7eUJBQ2IsQUFBQzs7Z0JBQUQ7a0JBQUEsQUFDRTtBQURGO0FBQUEsR0FBQSxrQkFDRSxjQUFBO2VBQUE7O2dCQUFBO2tCQUFBLEFBQ0U7QUFERjtBQUFBLHFCQUNFLEFBQUM7O2dCQUFEO2tCQUFBLEFBQ0U7QUFERjtBQUFBLHFCQUNFLGNBQUE7ZUFBQTs7Z0JBQUE7a0JBQUEsQUFBUztBQUFUO0FBQUEsS0FERixBQUNFLEFBQ0EsZ0RBQU0sU0FBTixBQUFjLG9CQUFkOztnQkFBQTtrQkFGRixBQUVFLEFBQ0E7QUFEQTs4Q0FDTSxNQUFOLEFBQVcsWUFBVyxTQUF0QixBQUE4QixvREFBOUI7O2dCQUFBO2tCQUpKLEFBQ0UsQUFHRSxBQUdGO0FBSEU7dUJBR0YsQUFBQzs7Z0JBQUQ7a0JBUEYsQUFPRSxBQUVFO0FBRkY7QUFBQSxNQVBGLEFBV0UsMEJBQUEsQUFBQzs7Z0JBQUQ7a0JBWEYsQUFXRTtBQUFBO0FBQUE7YUFYRjtTQUZXLEFBQ2IsQUFDRTtBQUFBO0FBRkoiLCJmaWxlIjoibGF5b3V0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZ2FyY2lhZGlhei9EZXYvc2l0ZXMvd2Vic2l0ZS1wbGF5YXN0aWp1YW5hIn0=