"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectionHandler = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SelectionHandler = ({
  onTextSelection,
  onTextDeselection,
  children
}) => {
  const ref = _react.default.useRef(null);

  const getSelection = () => {
    if (!ref || !ref.current || !onTextSelection) {
      return;
    } // @ts-ignore


    const regionsNodeList = ref.current.querySelectorAll('div[data-region-selector-id]');
    const regionElements = Array.prototype.slice.call(regionsNodeList);
    let selection = null;

    if (window) {
      selection = window.getSelection();
    }

    if (!selection || selection.type !== 'Range') {
      if (onTextDeselection) onTextDeselection();
      return;
    }

    const cleanRectanglesSelection = rectangles => {
      const cleanedRectangles = [];
      rectangles.map(rectangle => {
        const innerRectangles = rectangles.filter(rectangleFilter => rectangle.regionId === rectangleFilter.regionId && rectangle.top < rectangleFilter.top && rectangleFilter.top + rectangleFilter.height < rectangle.top + rectangle.height && rectangle.left < rectangleFilter.left && rectangleFilter.left + rectangleFilter.width < rectangle.left + rectangle.width);

        if (innerRectangles.length === 0) {
          cleanedRectangles.push(rectangle);
        }
      });
      return cleanedRectangles;
    };

    const selectionDomRectList = selection.getRangeAt(0).getClientRects();
    const selectionRectangles = Object.keys(selectionDomRectList).map(key => {
      const selectionDomRect = selectionDomRectList[parseInt(key)];
      const regionElement = regionElements.find(x => {
        const regionDomRect = x.getBoundingClientRect();
        const horizontalMatch = regionDomRect.x <= selectionDomRect.x && selectionDomRect.x <= regionDomRect.x + regionDomRect.width;
        const verticalMatch = regionDomRect.y <= selectionDomRect.y && selectionDomRect.y <= regionDomRect.y + regionDomRect.height;
        return horizontalMatch && verticalMatch;
      });
      const regionDomRect = regionElement.getBoundingClientRect();
      return {
        top: selectionDomRect.y - regionDomRect.y,
        left: selectionDomRect.x - regionDomRect.x,
        width: selectionDomRect.width,
        height: selectionDomRect.height,
        regionId: regionElement.getAttribute('data-region-selector-id')
      };
    });
    onTextSelection({
      text: selection.toString(),
      selectionRectangles: cleanRectanglesSelection(selectionRectangles)
    });
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    onMouseUp: getSelection
  }, children);
};

exports.SelectionHandler = SelectionHandler;