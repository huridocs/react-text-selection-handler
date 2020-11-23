"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Highlight = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Highlight = ({
  highlight,
  regionId,
  color
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, " ", highlight.selectionRectangles.filter(rectangle => {
    return rectangle.regionId && regionId ? rectangle.regionId === regionId : true;
  }).map((selectionRectangle, index) => {
    const style = {
      top: selectionRectangle.top,
      left: selectionRectangle.left,
      width: selectionRectangle.width,
      height: selectionRectangle.height,
      padding: 0,
      margin: 0,
      position: 'absolute',
      display: 'block',
      mixBlendMode: 'darken',
      opacity: 0.5,
      backgroundColor: color ? color : 'orange'
    };
    return /*#__PURE__*/React.createElement("div", {
      className: 'highlight-rectangle',
      key: index,
      style: style
    });
  }));
};

exports.Highlight = Highlight;