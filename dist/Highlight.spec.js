"use strict";

var React = _interopRequireWildcard(require("react"));

var _enzyme = require("enzyme");

var _Highlight = require("../Highlight");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('Highlight', () => {
  let highlight;
  let highlight2;
  let highlight3;
  beforeEach(() => {
    highlight = {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      regionId: "1"
    };
    highlight2 = {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      regionId: "1"
    };
    highlight3 = {
      top: 1,
      left: 1,
      width: 1,
      height: 1,
      regionId: "2"
    };
  });
  it('should render a rectangle', () => {
    const selectionHandlerWrapper = (0, _enzyme.shallow)( /*#__PURE__*/React.createElement(_Highlight.Highlight, {
      highlight: {
        selectionRectangles: [highlight, highlight2, highlight3]
      },
      regionId: "1"
    }));
    expect(selectionHandlerWrapper.find('div').at(0).prop('style')).toEqual({ ...defaultStyle,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      backgroundColor: 'orange',
      opacity: 0.5
    });
    expect(selectionHandlerWrapper.find('div').at(0).hasClass('highlight-rectangle')).toEqual(true);
    expect(selectionHandlerWrapper.find('div').length).toEqual(2);
  });
  it('should render all highlights of regionId is not provided', () => {
    const selectionHandlerWrapper = (0, _enzyme.shallow)( /*#__PURE__*/React.createElement(_Highlight.Highlight, {
      highlight: {
        selectionRectangles: [highlight, highlight2, highlight3]
      }
    }));
    expect(selectionHandlerWrapper.find('div').length).toEqual(3);
  });
  it('should render two rectangles', () => {
    const highlights1 = {
      top: 1,
      left: 1,
      width: 1,
      height: 1
    };
    const highlights2 = {
      top: 2,
      left: 2,
      width: 2,
      height: 2
    };
    const selectionHandlerWrapper = (0, _enzyme.shallow)( /*#__PURE__*/React.createElement(_Highlight.Highlight, {
      highlight: {
        selectionRectangles: [highlights1, highlights2]
      },
      color: 'red'
    }));
    expect(selectionHandlerWrapper.find('div').at(0).prop('style')).toEqual({ ...highlights1,
      ...defaultStyle,
      backgroundColor: 'red'
    });
    expect(selectionHandlerWrapper.find('div').at(1).prop('style')).toEqual({ ...highlights2,
      ...defaultStyle,
      backgroundColor: 'red'
    });
  });
});
const defaultStyle = {
  padding: 0,
  margin: 0,
  position: 'absolute',
  display: 'block',
  mixBlendMode: 'darken',
  opacity: 0.5,
  zIndex: 1
};