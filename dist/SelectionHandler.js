"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionHandler = void 0;
var react_1 = __importDefault(require("react"));
var SelectionHandler = function (_a) {
    var onTextSelection = _a.onTextSelection, onTextDeselection = _a.onTextDeselection, elementTagsToAvoid = _a.elementTagsToAvoid, children = _a.children;
    var ref = react_1.default.useRef(null);
    var getSelection = function () {
        if (!ref || !ref.current || !onTextSelection) {
            return;
        }
        // @ts-ignore
        var regionsNodeList = ref.current.querySelectorAll('div[data-region-selector-id]');
        var regionElements = Array.prototype.slice.call(regionsNodeList);
        var selection = null;
        if (window) {
            selection = window.getSelection();
        }
        if (!selection || selection.type !== 'Range') {
            if (onTextDeselection)
                onTextDeselection();
            return;
        }
        var selectionDomRectList = selection.getRangeAt(0).getClientRects();
        var selectionDomRectListKeys = Object.keys(selectionDomRectList);
        if (elementTagsToAvoid) {
            selectionDomRectListKeys = selectionDomRectListKeys.filter(function (x) {
                var selectionDomRect = selectionDomRectList[parseInt(x)];
                var element = document.elementFromPoint(selectionDomRect.x, selectionDomRect.y);
                return elementTagsToAvoid.indexOf(element.tagName) === -1;
            });
        }
        var selectionRectangles = selectionDomRectListKeys.map(function (key) {
            var selectionDomRect = selectionDomRectList[parseInt(key)];
            var regionElement = regionElements.find(function (x) {
                var regionDomRect = x.getBoundingClientRect();
                var horizontalMatch = regionDomRect.x <= selectionDomRect.x && selectionDomRect.x <= regionDomRect.x + regionDomRect.width;
                var verticalMatch = regionDomRect.y <= selectionDomRect.y && selectionDomRect.y <= regionDomRect.y + regionDomRect.height;
                return horizontalMatch && verticalMatch;
            });
            var regionDomRect = regionElement.getBoundingClientRect();
            return {
                top: selectionDomRect.y - regionDomRect.y,
                left: selectionDomRect.x - regionDomRect.x,
                width: selectionDomRect.width,
                height: selectionDomRect.height,
                regionId: regionElement.getAttribute('data-region-selector-id')
            };
        });
        onTextSelection({ text: selection.toString(), selectionRectangles: selectionRectangles });
    };
    return (react_1.default.createElement("div", { ref: ref, onMouseUp: getSelection }, children));
};
exports.SelectionHandler = SelectionHandler;
//# sourceMappingURL=SelectionHandler.js.map