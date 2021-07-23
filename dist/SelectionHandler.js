"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionHandler = void 0;
var react_1 = __importDefault(require("react"));
var utils_1 = require("./utils");
var SelectionHandler = function (_a) {
    var onTextSelection = _a.onTextSelection, onTextDeselection = _a.onTextDeselection, children = _a.children;
    var ref = react_1.default.useRef(null);
    var getSelection = function () {
        if (!window
            .getSelection()
            .toString()
            .trim()) {
            if (onTextDeselection)
                onTextDeselection();
            return;
        }
        var regionElements = Array.from(ref.current.querySelectorAll('div[data-region-selector-id]'));
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        var selectionRectangles = utils_1.textRectsOnly(range).map(function (rectangle) {
            var region = regionElements.find(utils_1.coversArea(rectangle));
            return utils_1.relativeRectangleToRegion(rectangle, region);
        });
        onTextSelection({ text: selection.toString(), selectionRectangles: selectionRectangles });
    };
    return (react_1.default.createElement("div", { role: "none", ref: ref, onMouseUp: getSelection }, children));
};
exports.SelectionHandler = SelectionHandler;
//# sourceMappingURL=SelectionHandler.js.map