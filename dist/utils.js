"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relativeRectangleToRegion = exports.coversArea = exports.textRectsOnly = void 0;
var textRectsOnly = function (range) {
    console.log(range);
    var iterator = document.createNodeIterator(range.commonAncestorContainer, NodeFilter.SHOW_TEXT, // pre-filter
    {
        // custom filter
        acceptNode: function () {
            return NodeFilter.FILTER_ACCEPT;
        },
    });
    var nodes = [];
    while (iterator.nextNode()) {
        var isValidNode = !(nodes.length === 0 && iterator.referenceNode !== range.startContainer);
        if (isValidNode) {
            nodes.push(iterator.referenceNode);
        }
        if (iterator.referenceNode === range.endContainer)
            break;
    }
    return nodes.reduce(function (rects, n, index) {
        var myRange = document.createRange();
        myRange.selectNode(n);
        if (index === 0) {
            myRange.setStart(n, range.startOffset);
        }
        if (index === nodes.length - 1) {
            myRange.setEnd(n, range.endOffset);
        }
        return __spreadArray(__spreadArray([], rects), myRange.getClientRects());
    }, []);
};
exports.textRectsOnly = textRectsOnly;
var coversArea = function (rectangle) {
    return function (region) {
        var regionRectangle = region.getBoundingClientRect();
        var horizontalMatch = regionRectangle.x <= rectangle.x && rectangle.x <= regionRectangle.x + regionRectangle.width;
        var verticalMatch = regionRectangle.y <= rectangle.y && rectangle.y <= regionRectangle.y + regionRectangle.height;
        return horizontalMatch && verticalMatch;
    };
};
exports.coversArea = coversArea;
var relativeRectangleToRegion = function (rectangle, region) {
    var regionDomRect = region.getBoundingClientRect();
    return {
        top: rectangle.y - regionDomRect.y,
        left: rectangle.x - regionDomRect.x,
        width: rectangle.width,
        height: rectangle.height,
        regionId: region.getAttribute('data-region-selector-id'),
    };
};
exports.relativeRectangleToRegion = relativeRectangleToRegion;
//# sourceMappingURL=utils.js.map