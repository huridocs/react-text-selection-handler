"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Highlight = void 0;
var React = __importStar(require("react"));
var Highlight = function (_a) {
    var highlight = _a.highlight, regionId = _a.regionId, color = _a.color;
    return React.createElement(React.Fragment, null,
        " ",
        highlight.selectionRectangles
            .filter(function (rectangle) {
            return rectangle.regionId && regionId ? rectangle.regionId === regionId : true;
        }).map(function (selectionRectangle, index) {
            var style = {
                top: selectionRectangle.top,
                left: selectionRectangle.left,
                width: selectionRectangle.width,
                height: selectionRectangle.height,
                padding: 0,
                margin: 0,
                position: 'absolute',
                display: 'block',
                mixBlendMode: 'darken',
                opacity: 0.5,
                backgroundColor: color ? color : 'orange',
                zIndex: 1
            };
            return (React.createElement("div", { className: 'highlight-rectangle', key: index, style: style }));
        }));
};
exports.Highlight = Highlight;
