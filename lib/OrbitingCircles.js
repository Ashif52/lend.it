"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrbitingCircles = OrbitingCircles;
var _react = _interopRequireDefault(require("react"));
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function OrbitingCircles(_ref) {
  var className = _ref.className,
    children = _ref.children,
    reverse = _ref.reverse,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 20 : _ref$duration,
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? 10 : _ref$delay,
    _ref$radius = _ref.radius,
    radius = _ref$radius === void 0 ? 50 : _ref$radius,
    _ref$path = _ref.path,
    path = _ref$path === void 0 ? true : _ref$path,
    _ref$iconSize = _ref.iconSize,
    iconSize = _ref$iconSize === void 0 ? 30 : _ref$iconSize,
    _ref$speed = _ref.speed,
    speed = _ref$speed === void 0 ? 1 : _ref$speed;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, path && /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    className: "pointer-events-none absolute inset-0 size-full"
  }, /*#__PURE__*/_react["default"].createElement("circle", {
    className: "stroke-black/10 stroke-1 dark:stroke-white/10",
    cx: "50%",
    cy: "50%",
    r: radius,
    fill: "none"
  })), _react["default"].Children.map(children, function (child, index) {
    var angle = 360 / _react["default"].Children.count(children) * index;
    return /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        "--duration": duration / speed,
        "--radius": radius,
        "--angle": angle,
        "--icon-size": "".concat(iconSize, "px")
      },
      className: (0, _utils.cn)("absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full border bg-black/10 [animation-delay:calc(var(--duration)*var(--angle)*-1ms)] dark:bg-white/10", {
        "[animation-direction:reverse]": reverse
      }, className)
    }, child);
  }));
}