"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionRegion = void 0;
var react_1 = __importDefault(require("react"));
var SelectionRegion = function (_a) {
    var _b = _a.regionId, regionId = _b === void 0 ? 'selectionRegion' : _b, children = _a.children;
    return react_1.default.createElement("div", { "data-region-selector-id": regionId }, children);
};
exports.SelectionRegion = SelectionRegion;
//# sourceMappingURL=SelectionRegion.js.map