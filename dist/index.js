'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitProvider = InitProvider;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _initConnect = require('./initConnect');

var _initConnect2 = _interopRequireDefault(_initConnect);

var _initProvider = require('./initProvider');

var _initProvider2 = _interopRequireDefault(_initProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppContext = _react2.default.createContext({});

function InitProvider(initState, initActions) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var Provider = (0, _initProvider2.default)(AppContext, options)(initState, initActions);

  var connect = (0, _initConnect2.default)(AppContext, _initProvider.actionsMap);

  return {
    Provider: Provider,
    connect: connect
  };
}

exports.default = AppContext;