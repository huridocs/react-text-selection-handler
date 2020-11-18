"use strict";

var React = _interopRequireWildcard(require("react"));

var _SelectionHandler = require("../SelectionHandler");

var _enzyme = require("enzyme");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('SelectionHandler', () => {
  it('should allow children', () => {
    mockGetSelection('None', '', []);
    mockSelectionRegionRectangles([{
      x: 0,
      y: 0,
      height: 10,
      width: 10
    }]);
    const selectionHandlerWrapper = (0, _enzyme.shallow)( /*#__PURE__*/React.createElement(_SelectionHandler.SelectionHandler, null, /*#__PURE__*/React.createElement("h1", null, "Title")));
    expect(selectionHandlerWrapper.text()).toEqual('Title');
  });
  it('should not call callback when no mouse up', () => {
    mockGetSelection('Range', '', [{
      y: 0,
      x: 0,
      width: 0,
      height: 0
    }]);
    mockSelectionRegionRectangles([{
      x: 0,
      y: 0,
      height: 10,
      width: 10
    }]);
    const callback = jest.fn();
    (0, _enzyme.shallow)( /*#__PURE__*/React.createElement(_SelectionHandler.SelectionHandler, {
      onTextSelection: callback
    }));
    expect(callback).not.toHaveBeenCalled();
  });
  it('should not call callback when empty selection', () => {
    mockGetSelection('Caret', '', []);
    mockSelectionRegionRectangles([{
      x: 0,
      y: 0,
      height: 10,
      width: 10
    }]);
    const callback = jest.fn();
    const selectionHandlerWrapper = (0, _enzyme.shallow)( /*#__PURE__*/React.createElement(_SelectionHandler.SelectionHandler, {
      onTextSelection: callback
    }));
    selectionHandlerWrapper.simulate('mouseup');
    expect(callback).not.toHaveBeenCalled();
  });
  it('should return one selection rectangle', () => {
    mockGetSelection('Range', 'a text', [{
      y: 0,
      x: 0,
      width: 0,
      height: 0
    }]);
    mockSelectionRegionRectangles([{
      x: 0,
      y: 0,
      height: 10,
      width: 10
    }]);
    const callback = jest.fn();
    const selectionHandlerWrapper = (0, _enzyme.shallow)( /*#__PURE__*/React.createElement(_SelectionHandler.SelectionHandler, {
      onTextSelection: callback
    }));
    selectionHandlerWrapper.simulate('mouseup');
    expect(callback).toHaveBeenCalledWith({
      text: 'a text',
      selectionRectangles: [{
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        regionId: '1'
      }]
    });
  });
  it('should return absolute position relative to SelectionRegion', () => {
    mockGetSelection('Range', 'other text', [{
      x: 10,
      y: 10,
      width: 1,
      height: 1
    }]);
    mockSelectionRegionRectangles([{
      x: 10,
      y: 10,
      height: 10,
      width: 10
    }], ['other region']);
    const callback = jest.fn();
    const selectionHandlerWrapper = (0, _enzyme.shallow)( /*#__PURE__*/React.createElement(_SelectionHandler.SelectionHandler, {
      onTextSelection: callback
    }));
    selectionHandlerWrapper.simulate('mouseup');
    expect(callback).toHaveBeenCalledWith({
      text: 'other text',
      selectionRectangles: [{
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        regionId: 'other region'
      }]
    });
  });
  it('should return absolute position relative to two SelectionRegions', () => {
    mockGetSelection('Range', 'two rectangles selection', [{
      x: 5,
      y: 5,
      width: 1,
      height: 2
    }, {
      x: 15,
      y: 15,
      width: 3,
      height: 4
    }]);
    mockSelectionRegionRectangles([{
      x: 0,
      y: 0,
      height: 10,
      width: 10
    }, {
      x: 10,
      y: 10,
      height: 10,
      width: 10
    }], ['1', '2']);
    const callback = jest.fn();
    const selectionHandlerWrapper = (0, _enzyme.shallow)( /*#__PURE__*/React.createElement(_SelectionHandler.SelectionHandler, {
      onTextSelection: callback
    }));
    selectionHandlerWrapper.simulate('mouseup');
    expect(callback).toHaveBeenCalledWith({
      text: 'two rectangles selection',
      selectionRectangles: [{
        top: 5,
        left: 5,
        width: 1,
        height: 2,
        regionId: '1'
      }, {
        top: 5,
        left: 5,
        width: 3,
        height: 4,
        regionId: '2'
      }]
    });
  });
});

const mockGetSelection = (type, text, domRectListMock) => {
  const domRectList = domRectListMock.reduce((obj, item, currentIndex) => {
    obj[currentIndex] = item;
    return obj;
  }, {});

  window.getSelection = () => {
    const mockRange = {
      getClientRects: () => {
        return domRectList;
      }
    };
    const mockSelection = {
      getRangeAt(index) {
        return mockRange;
      },

      type: type,

      toString() {
        return text;
      }

    };
    return mockSelection;
  };
};

function mockSelectionRegionRectangles(domRectListMock, rectangleIds = ['1']) {
  const regionsDomRectList = domRectListMock.map(domRectListMock => {
    return domRectListMock;
  });
  jest.spyOn(React, 'useRef').mockReturnValueOnce({
    current: {
      querySelectorAll: () => {
        return regionsDomRectList.map((domRect, index) => {
          return {
            getAttribute: () => {
              return rectangleIds[index];
            },
            getBoundingClientRect: () => {
              return domRect;
            }
          };
        });
      }
    }
  });
}