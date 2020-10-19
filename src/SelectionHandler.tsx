import * as React from 'react'
import { FunctionComponent, useRef } from 'react'
import { SelectionRectangle, TextSelection } from './TextSelection'


interface SelectionHandlerProps {
  onTextSelection?: (textSelection: TextSelection) => any
}

const SelectionHandler: FunctionComponent<SelectionHandlerProps> = ({ onTextSelection, children }) => {
  const ref = useRef(null)
  const getSelection = () => {
    const regionsNodeList = ref.current.querySelectorAll('div[data-region-selector-id]')
    const regionElements = Array.prototype.slice.call(regionsNodeList)
    const selection = window.getSelection()

    if (selection.type !== 'Range') {
      return
    }

    const cleanRectanglesSelection = (rectangles: SelectionRectangle[]) => {

      const cleanedRectangles: SelectionRectangle[] = []

      rectangles.map( (rectangle) => {
        const innerRectangles = rectangles.filter((rectangleFilter) => rectangle.pageNumber === rectangleFilter.pageNumber
          && rectangle.top < rectangleFilter.top
          && rectangleFilter.top + rectangleFilter.height < rectangle.top + rectangle.height
          && rectangle.left < rectangleFilter.left
          && rectangleFilter.left + rectangleFilter.width < rectangle.left + rectangle.width
        )

        if (innerRectangles.length === 0){
          cleanedRectangles.push(rectangle);
        }

      });

      return cleanedRectangles;
    }

    const selectionDomRectList = selection.getRangeAt(0).getClientRects()
    const selectionRectangles = Object.keys(selectionDomRectList).map((key: string) => {
        const selectionDomRect = selectionDomRectList[parseInt(key)]
        const regionElement = regionElements.find((x: HTMLDivElement) => {
          const regionDomRect = x.getBoundingClientRect()
          const horizontalMatch = regionDomRect.x <= selectionDomRect.x && selectionDomRect.x <= regionDomRect.x + regionDomRect.width
          const verticalMatch = regionDomRect.y <= selectionDomRect.y && selectionDomRect.y <= regionDomRect.y + regionDomRect.height
          return horizontalMatch && verticalMatch
        })
        const regionDomRect = regionElement.getBoundingClientRect()
        return {
          top: selectionDomRect.y - regionDomRect.y,
          left: selectionDomRect.x - regionDomRect.x,
          width: selectionDomRect.width,
          height: selectionDomRect.height,
          pageNumber: parseInt(regionElement.getAttribute('data-region-selector-id'))
        }
      }
    )

    onTextSelection({ text: selection.toString(), selectionRectangles: cleanRectanglesSelection(selectionRectangles) })
  }

  return (<div ref={ref} onMouseUp={getSelection}>{children}</div>)
}


export { SelectionHandler }
