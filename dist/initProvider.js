'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionsMap = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var actionsMap = new Map();

function checkActions(actions) {
  Object.entries(actions).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        act = _ref2[1];

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

function initProvider(Context, _ref5) {
  var _ref5$debug = _ref5.debug,
      debug = _ref5$debug === undefined ? false : _ref5$debug;

  var debugLog = debug ? console.debug : function () {
    return null;
  };

  return function (defaultState, actions) {
    checkActions(actions);

    var Provider = function (_PureComponent) {
      _inherits(Provider, _PureComponent);

      function Provider(props) {
        _classCallCheck(this, Provider);

        var _this = _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).call(this, props));

        _this.state = _extends({}, defaultState);


        actionsMap.clear();
        Object.entries(actions).forEach(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
              key = _ref7[0],
              act = _ref7[1];

          Object.values(act).forEach(function (el) {
            var realF = function realF() {
              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              return _this.setState(function (state) {
                var result = el.apply(undefined, [state[key]].concat(args));

                if (result instanceof Promise) {
                  result.then(function (r) {
                    return _this.setState(_defineProperty({}, key, r));
                  });
                  return null;
                }

                return _defineProperty({}, key, result);
              });
            };

            actionsMap.set(el, realF);
          });
        });
        return _this;
      }

      _createClass(Provider, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
          debugLog('ContextProvider:componentDidUpdate', this.state);
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

    return Provider;
  };
}

exports.default = initProvider;
exports.actionsMap = actionsMap;