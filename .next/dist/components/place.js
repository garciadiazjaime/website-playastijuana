'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLazyload = require('react-lazyload');

var _reactLazyload2 = _interopRequireDefault(_reactLazyload);

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/jgarciadiaz/Dev/sites/website-playastijuana/components/place.js';


var openGrpnPage = function openGrpnPage(url) {
  window.open(url, '_blank');
};

exports.default = function (_ref) {
  var place = _ref.place;
  return _react2.default.createElement(_Card.Card, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement(_Card.CardMedia, {
    overlay: _react2.default.createElement(_Card.CardTitle, { title: place.google.name, __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      }
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement(_reactLazyload2.default, { height: 200, once: true, __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, _react2.default.createElement('img', { src: place.google.photos.pop(), alt: place.google.name, __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }))), _react2.default.createElement(_Card.CardActions, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, _react2.default.createElement(_FlatButton2.default, { label: 'Leer m\xE1s', onClick: function onClick() {
      return openGrpnPage(place.google.url);
    }, __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  })), _react2.default.createElement('br', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGxhY2UuanMiXSwibmFtZXMiOlsiTGF6eUxvYWQiLCJDYXJkIiwiQ2FyZEFjdGlvbnMiLCJDYXJkTWVkaWEiLCJDYXJkVGl0bGUiLCJDYXJkVGV4dCIsIkZsYXRCdXR0b24iLCJvcGVuR3JwblBhZ2UiLCJ3aW5kb3ciLCJvcGVuIiwidXJsIiwicGxhY2UiLCJnb29nbGUiLCJuYW1lIiwicGhvdG9zIiwicG9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQVMsQUFBTSxBQUFhLEFBQVcsQUFBVzs7QUFDbEQsQUFBTzs7Ozs7Ozs7O0FBRVAsSUFBTSxlQUFlLFNBQWYsQUFBZSxrQkFBTyxBQUMxQjtTQUFBLEFBQU8sS0FBUCxBQUFZLEtBQVosQUFBaUIsQUFDbEI7QUFGRCxBQUlBOztrQkFBZSxnQkFBQTtNQUFBLEFBQUcsYUFBSCxBQUFHO3lCQUNoQixBQUFDOztnQkFBRDtrQkFBQSxBQUNFO0FBREY7QUFBQSxHQUFBLGtCQUNFLEFBQUM7NkJBQ1UsQUFBQyxpQ0FBVSxPQUFPLE1BQUEsQUFBTSxPQUF4QixBQUErQjtrQkFBL0I7b0JBRFgsQUFDVztBQUFBO0tBQUE7O2dCQURYO2tCQUFBLEFBR0U7QUFIRjtBQUNFLHFCQUVBLEFBQUMseUNBQVMsUUFBVixBQUFrQixLQUFLLE1BQXZCO2dCQUFBO2tCQUFBLEFBQ0U7QUFERjs0Q0FDTyxLQUFLLE1BQUEsQUFBTSxPQUFOLEFBQWEsT0FBdkIsQUFBVSxBQUFvQixPQUFPLEtBQUssTUFBQSxBQUFNLE9BQWhELEFBQXVEO2dCQUF2RDtrQkFMTixBQUNFLEFBR0UsQUFDRSxBQUdKO0FBSEk7d0JBR0osQUFBQzs7Z0JBQUQ7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0UsQUFBQyxzQ0FBVyxPQUFaLEFBQWtCLGVBQVcsU0FBUyxtQkFBQTthQUFNLGFBQWEsTUFBQSxBQUFNLE9BQXpCLEFBQU0sQUFBMEI7QUFBdEU7Z0JBQUE7a0JBVEosQUFRRSxBQUNFLEFBRUY7QUFGRTs7O2dCQUVGO2tCQVpXLEFBQ2IsQUFXRTtBQUFBO0FBQUE7QUFaSiIsImZpbGUiOiJwbGFjZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamdhcmNpYWRpYXovRGV2L3NpdGVzL3dlYnNpdGUtcGxheWFzdGlqdWFuYSJ9