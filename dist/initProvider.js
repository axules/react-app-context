'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _vm = require('vm');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function checkActions(actions) {
  Object.entries(actions).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        act = _ref2[1];

    if (typeof act !== 'function' && (typeof act === 'undefined' ? 'undefined' : _typeof(act)) !== 'object') {
      throw new Error('initProvider:"' + key + '" should be function or object, it is "' + (typeof act === 'undefined' ? 'undefined' : _typeof(act)) + '"');
    }

    Object.entries(act).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          fName = _ref4[0],
          func = _ref4[1];

      if (typeof func !== 'function') {
        throw new Error('initProvider:"' + key + '.' + fName + '" should be function, it is "' + (typeof func === 'undefined' ? 'undefined' : _typeof(func)) + '"');
      }
    });
  });
}

function hasActionRegistered(actions, fn, path) {
  if (actions.has(fn)) {
    throw new Error('initProvider exception: action "' + path + '" was registered');
  }
}

function initProvider(Context, _ref5) {
  var _ref5$debug = _ref5.debug,
      debug = _ref5$debug === undefined ? false : _ref5$debug;

  var debugLog = debug ? console.debug : function () {
    return null;
  };
  var actionsMap = new Map();

  return function (defaultState, actions) {
    checkActions(actions);

    var Provider = function (_PureComponent) {
      _inherits(Provider, _PureComponent);

      function Provider(props) {
        _classCallCheck(this, Provider);

        var _this = _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).call(this, props));

        _this.state = _extends({}, defaultState);

        _this.__dispatchAction = function (func, key) {
          return function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return _this.setState(function (state) {
              var result = func.call.apply(func, [_this.__dispatchEnv, key == null ? state : state[key]].concat(args));

              if (result instanceof Promise) {
                result.then(function (r) {
                  return _this.setState(key == null ? r : _defineProperty({}, key, r));
                });
                return null;
              }

              return key == null ? result : _defineProperty({}, key, result);
            });
          };
        };

        _this.__dispatchEnv = {
          dispatch: _this.__dispatchAction,
          actionsMap: actionsMap,
          call: function call(func) {
            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            var willCall = actionsMap.get(func);
            if (!willCall) throw new Error('Provider:call - action [' + func + '] wasn\'t registered');
            willCall.apply(undefined, args);
          },
          getState: function getState() {
            return _this.state;
          }
        };

        actionsMap.clear();
        Object.entries(actions).forEach(function (_ref8) {
          var _ref9 = _slicedToArray(_ref8, 2),
              key = _ref9[0],
              act = _ref9[1];

          var actType = typeof act === 'undefined' ? 'undefined' : _typeof(act);
          if (actType === 'object') {
            Object.entries(act).forEach(function (_ref10) {
              var _ref11 = _slicedToArray(_ref10, 2),
                  fName = _ref11[0],
                  fn = _ref11[1];

              hasActionRegistered(actionsMap, fn, key + '.' + fName);
              actionsMap.set(fn, _this.__dispatchAction(fn, key));
            });
          } else if (actType === 'function') {
            hasActionRegistered(actionsMap, act, key);
            actionsMap.set(act, _this.__dispatchAction(act, null));
          }
        });

        debugLog('ContextProvider:constructor');
        return _this;
      }

      _createClass(Provider, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
          debugLog('ContextProvider:componentDidUpdate', this.state);
          var componentDidUpdate = this.props.componentDidUpdate;

          componentDidUpdate && componentDidUpdate.apply(undefined, arguments);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(
            Context.Provider,
            { value: this.state },
            this.props.children
          );
        }
      }]);

      return Provider;
    }(_react.PureComponent);

    return {
      Provider: Provider,
      actionsMap: actionsMap
    };
  };
}

exports.default = initProvider;