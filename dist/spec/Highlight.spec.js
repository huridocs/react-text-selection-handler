"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var React = __importStar(require("react"));
var enzyme_1 = require("enzyme");
var Highlight_1 = require("../Highlight");
describe('Highlight', function () {
    var highlight;
    var highlight2;
    var highlight3;
    beforeEach(function () {
        highlight = { top: 0, left: 0, width: 0, height: 0, regionId: "1" };
        highlight2 = { top: 0, left: 0, width: 0, height: 0, regionId: "1" };
        highlight3 = { top: 1, left: 1, width: 1, height: 1, regionId: "2" };
    });
    it('should render a rectangle', function () {
        var selectionHandlerWrapper = enzyme_1.shallow(React.createElement(Highlight_1.Highlight, { highlight: { selectionRectangles: [highlight, highlight2, highlight3] }, regionId: "1" }));
        expect(selectionHandlerWrapper.find('div').at(0).prop('style')).toEqual(__assign(__assign({}, defaultStyle), { top: 0, left: 0, width: 0, height: 0, backgroundColor: 'orange', opacity: 0.5 }));
        expect(selectionHandlerWrapper.find('div').at(0).hasClass('highlight-rectangle')).toEqual(true);
        expect(selectionHandlerWrapper.find('div').length).toEqual(2);
    });
    it('should render all highlights of regionId is not provided', function () {
        var selectionHandlerWrapper = enzyme_1.shallow(React.createElement(Highlight_1.Highlight, { highlight: { selectionRectangles: [highlight, highlight2, highlight3] } }));
        expect(selectionHandlerWrapper.find('div').length).toEqual(3);
    });
    it('should render two rectangles', function () {
        var highlights1 = { top: 1, left: 1, width: 1, height: 1 };
        var highlights2 = { top: 2, left: 2, width: 2, height: 2 };
        var selectionHandlerWrapper = enzyme_1.shallow(React.createElement(Highlight_1.Highlight, { highlight: { selectionRectangles: [highlights1, highlights2] }, color: 'red' }));
        expect(selectionHandlerWrapper.find('div').at(0).prop('style')).toEqual(__assign(__assign(__assign({}, highlights1), defaultStyle), { backgroundColor: 'red' }));
        expect(selectionHandlerWrapper.find('div').at(1).prop('style')).toEqual(__assign(__assign(__assign({}, highlights2), defaultStyle), { backgroundColor: 'red' }));
    });
});
var defaultStyle = {
    padding: 0,
    margin: 0,
    position: 'absolute',
    display: 'block',
    mixBlendMode: 'darken',
    opacity: 0.5,
    zIndex: 1
};
//# sourceMappingURL=Highlight.spec.js.map