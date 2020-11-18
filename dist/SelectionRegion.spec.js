"use strict";

var React = _interopRequireWildcard(require("react"));

var _SelectionRegion = require("../SelectionRegion");

var _enzyme = require("enzyme");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('SelectionRegion', () => {
  it('should create div with data-region-selector-id', () => {
    const selectionHandlerWrapper = (0, _enzyme.shallow)( /*#__PURE__*/React.createElement(_SelectionRegion.SelectionRegion, {
      regionId: 'aRegionId'
    }));
    expect(selectionHandlerWrapper.getElement()).toEqual( /*#__PURE__*/React.createElement("div", {
      "data-region-selector-id": "aRegionId"
    }));
  });
  it('should allow children', () => {
    const selectionHandlerWrapper = (0, _enzyme.shallow)( /*#__PURE__*/React.createElement(_SelectionRegion.SelectionRegion, null, /*#__PURE__*/React.createElement("h1", null, "Title")));
    expect(selectionHandlerWrapper.text()).toEqual('Title');
  });
});