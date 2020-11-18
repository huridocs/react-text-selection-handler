"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectionHandler = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const SelectionHandler = ({
  onTextSelection,
  children
}) => {
  const ref = (0, React.useRef)(null);

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
      return;
    }

    const cleanRectanglesSelection = rectangles => {
      const cleanedRectangles = [];
      rectangles.map(rectangle => {
        const innerRectangles = rectangles.filter(rectangleFilter => rectangle.pageNumber === rectangleFilter.pageNumber && rectangle.top < rectangleFilter.top && rectangleFilter.top + rectangleFilter.height < rectangle.top + rectangle.height && rectangle.left < rectangleFilter.left && rectangleFilter.left + rectangleFilter.width < rectangle.left + rectangle.width);

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
        pageNumber: parseInt(regionElement.getAttribute('data-region-selector-id'))
      };
    });
    onTextSelection({
      text: selection.toString(),
      selectionRectangles: cleanRectanglesSelection(selectionRectangles)
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onMouseUp: getSelection
  }, children);
};

exports.SelectionHandler = SelectionHandler;