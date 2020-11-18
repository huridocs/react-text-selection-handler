"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PdfHandler = exports.browserRendering = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import { FixedSizeList, ListChildComponentProps } from 'react-window'
// import { pdfjs } from 'react-pdf'
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
const browserRendering = typeof document !== 'undefined';
exports.browserRendering = browserRendering;

const PdfHandler = ({
  url,
  highlights,
  goToHighlight,
  onTextSelection
}) => {
  // const [documentPageNumber, setDocumentPageNumber] = useState<number>(0)
  // // const gridRef: RefObject<FixedSizeList> = React.createRef()
  //
  // const showHighlights = (pageNumber: number) => {
  //   if (!highlights || !highlights[0]) {
  //     return
  //   }
  //
  //   return highlights.map(highlight => {
  //     const pageRectangles = highlight.selectionRectangles.filter(rectangle => rectangle.pageNumber == pageNumber)
  //     if (pageRectangles.length === 0) {
  //       return
  //     }
  //
  //     return <Highlight highlight={{ selectionRectangles: pageRectangles }} />
  //   })
  // }
  //
  // function removeTextLayerOffset() {
  //   const textLayers = document.querySelectorAll('.react-pdf__Page__textContent')
  //   textLayers.forEach(layer => {
  //     // @ts-ignore
  //     const { style } = layer
  //     style.top = '0'
  //     style.left = '0'
  //     style.transform = ''
  //   })
  // }
  //
  // const PageHandler: FunctionComponent<ListChildComponentProps> = ({ index, style }) => {
  //   if (browserRendering) {
  //     const { Page } = require('react-pdf')
  //     return (
  //       <div style={style}>
  //         <SelectionRegion regionId={(index + 1).toString()}>
  //           <Page
  //             height={850}
  //             onLoadError={(error: any) => console.error(error)}
  //             pageNumber={index + 1}
  //             onLoadSuccess={removeTextLayerOffset}
  //             renderMode={'svg'}>
  //             {showHighlights(index + 1)}
  //           </Page>
  //         </SelectionRegion>
  //       </div>
  //     )
  //   }
  // }
  //
  // useEffect(() => {
  //   if (!goToHighlight || !gridRef.current || !goToHighlight.selectionRectangles || !goToHighlight.selectionRectangles[0].pageNumber) {
  //     return
  //   }
  //
  //   gridRef.current.scrollToItem(goToHighlight.selectionRectangles[0].pageNumber - 1)
  // })
  //
  // function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
  //   setDocumentPageNumber(numPages)
  // }
  //
  // if (browserRendering) {
  //   const { Document } = require('react-pdf')
  //   return browserRendering && (
  //     <SelectionHandler onTextSelection={onTextSelection}>
  //       <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
  //         <FixedSizeList
  //           height={850}
  //           itemCount={documentPageNumber}
  //           itemSize={850}
  //           width={640}
  //           ref={gridRef}
  //         >
  //           {PageHandler}
  //         </FixedSizeList>
  //       </Document>
  //     </SelectionHandler>
  //   )
  // }
  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

exports.PdfHandler = PdfHandler;