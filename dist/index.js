'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = init;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _initConnect = require('./initConnect');

var _initConnect2 = _interopRequireDefault(_initConnect);

var _initProvider2 = require('./initProvider');

var _initProvider3 = _interopRequireDefault(_initProvider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = { debug: false };

function init(initState) {
  var initActions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var Context = _react2.default.createContext({});

  var _initProvider = (0, _initProvider3.default)(Context, _extends({}, defaultOptions, options))(initState, initActions),
      Provider = _initProvider.Provider,
      actionsMap = _initProvider.actionsMap;

  var connect = (0, _initConnect2.default)(Context, actionsMap);

  return {
    Provider: Provider,
    connect: connect,
    Context: Context,
    ActionsMap: actionsMap
  };
}