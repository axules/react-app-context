'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.checkActions = checkActions;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function checkActions(actions) {
  Object.entries(actions).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        fName = _ref2[0],
        func = _ref2[1];

    if (typeof func !== 'function') {
      throw new Error('initConnect: "' + fName + '" should be function, it is "' + (typeof func === 'undefined' ? 'undefined' : _typeof(func)) + '"');
    }
  });
  return true;
}

function initConnect(Context, ContextActionsMap) {
  return function (getState) {
    var getActions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    checkActions(getActions || {});

    return function (WrappedComponent) {
      var ContextConnect = function (_PureComponent) {
        _inherits(ContextConnect, _PureComponent);

        function ContextConnect(props) {
          _classCallCheck(this, ContextConnect);

          var _this = _possibleConstructorReturn(this, (ContextConnect.__proto__ || Object.getPrototypeOf(ContextConnect)).call(this, props));

          _this.__contextActions = Object.entries(getActions || {}).reduce(function (R, _ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                key = _ref4[0],
                act = _ref4[1];

            var action = ContextActionsMap.get(act);
            if (action) R[key] = action;else console.error(key + ' is not initialized and can not be used!');

            return R;
          }, {});
          return _this;
        }

        _createClass(ContextConnect, [{
          key: 'render',
          value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
              Context.Consumer,
              null,
              function (state) {
                return _react2.default.createElement(WrappedComponent, _extends({}, _this2.props, typeof getState === 'function' ? getState(state, _this2.props) : null, _this2.__contextActions));
              }
            );
          }
        }]);

        return ContextConnect;
      }(_react.PureComponent);

      return ContextConnect;
    };
  };
}

exports.default = initConnect;