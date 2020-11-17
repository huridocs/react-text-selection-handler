import { FunctionComponent, RefObject, useEffect, useState } from 'react'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import * as React from 'react'
import { SelectionHandler } from './SelectionHandler'
import { SelectionRegion } from './SelectionRegion'
import { TextSelection } from './TextSelection'
import { Highlight } from './Highlight'

// import { pdfjs } from 'react-pdf'
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const browserRendering = typeof document !== 'undefined'

interface PdfHandlerProps {
  url: string,
  highlights?: TextSelection[],
  goToHighlight?: TextSelection,
  onTextSelection?: (textSelection: TextSelection) => any
}

const PdfHandler: FunctionComponent<PdfHandlerProps> = ({ url, highlights, goToHighlight, onTextSelection }) => {
  const [documentPageNumber, setDocumentPageNumber] = useState<number>(0)
  const gridRef: RefObject<FixedSizeList> = React.createRef()

  const showHighlights = (pageNumber: number) => {
    if (!highlights || !highlights[0]) {
      return
    }

    return highlights.map(highlight => {
      const pageRectangles = highlight.selectionRectangles.filter(rectangle => rectangle.pageNumber == pageNumber)
      if (pageRectangles.length === 0) {
        return
      }

      return <Highlight highlight={{ selectionRectangles: pageRectangles }} />
    })
  }

  function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll('.react-pdf__Page__textContent')
    textLayers.forEach(layer => {
      // @ts-ignore
      const { style } = layer
      style.top = '0'
      style.left = '0'
      style.transform = ''
    })
  }

  const PageHandler: FunctionComponent<ListChildComponentProps> = ({ index, style }) => {
    if (browserRendering) {
      const { Page } = require('react-pdf')
      return (
        <div style={style}>
          <SelectionRegion regionId={(index + 1).toString()}>
            <Page
              height={850}
              onLoadError={(error: any) => console.error(error)}
              pageNumber={index + 1}
              onLoadSuccess={removeTextLayerOffset}
              renderMode={'svg'}>
              {showHighlights(index + 1)}
            </Page>
          </SelectionRegion>
        </div>
      )
    }
  }

  useEffect(() => {
    if (!goToHighlight || !gridRef.current || !goToHighlight.selectionRectangles || !goToHighlight.selectionRectangles[0].pageNumber) {
      return
    }

    gridRef.current.scrollToItem(goToHighlight.selectionRectangles[0].pageNumber - 1)
  })

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setDocumentPageNumber(numPages)
  }

  if (browserRendering) {
    const { Document } = require('react-pdf')
    return browserRendering && (
      <SelectionHandler onTextSelection={onTextSelection}>
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <FixedSizeList
            height={850}
            itemCount={documentPageNumber}
            itemSize={850}
            width={640}
            ref={gridRef}
          >
            {PageHandler}
          </FixedSizeList>
        </Document>
      </SelectionHandler>
    )
  }
}

export { PdfHandler }
