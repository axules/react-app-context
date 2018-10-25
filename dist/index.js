'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _initConnect = require('./initConnect');

var _initConnect2 = _interopRequireDefault(_initConnect);

var _initProvider2 = require('./initProvider');

var _initProvider3 = _interopRequireDefault(_initProvider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init(initState) {
  var initActions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { debug: false };

  var Context = _react2.default.createContext({});

  var _initProvider = (0, _initProvider3.default)(Context, options)(initState, initActions),
      Provider = _initProvider.Provider,
      actionsMap = _initProvider.actionsMap;

  var connect = (0, _initConnect2.default)(Context, actionsMap);

  return {
    Provider: Provider,
    connect: connect,
    Context: Context
  };
}