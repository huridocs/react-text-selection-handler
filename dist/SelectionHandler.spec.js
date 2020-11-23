"use strict";

var _react = _interopRequireDefault(require("react"));

var _SelectionHandler = require("../SelectionHandler");

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SelectionHandler', () => {
  it('should allow children', () => {
    mockGetSelection('None', '', []);
    mockSelectionRegionRectangles([{
      x: 0,
      y: 0,
      height: 10,
      width: 10
    }]);
    const selectionHandlerWrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SelectionHandler.SelectionHandler, null, /*#__PURE__*/_react.default.createElement("h1", null, "Title")));
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
    (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SelectionHandler.SelectionHandler, {
      onTextSelection: callback
    }));
    expect(callback).not.toHaveBeenCalled();
  });
  it('should call deselect callback when a text has been deselected', () => {
    mockGetSelection('Caret', '', []);
    mockSelectionRegionRectangles([{
      x: 0,
      y: 0,
      height: 10,
      width: 10
    }]);
    const callback = jest.fn();
    const deselectCallback = jest.fn();
    const selectionHandlerWrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SelectionHandler.SelectionHandler, {
      onTextSelection: callback,
      onTextDeselection: deselectCallback
    }));
    selectionHandlerWrapper.simulate('mouseup');
    expect(callback).not.toHaveBeenCalled();
    expect(deselectCallback).toHaveBeenCalled();
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
    const selectionHandlerWrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SelectionHandler.SelectionHandler, {
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
    const selectionHandlerWrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SelectionHandler.SelectionHandler, {
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
    const selectionHandlerWrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_SelectionHandler.SelectionHandler, {
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
  jest.spyOn(_react.default, 'useRef').mockReturnValueOnce({
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