import { coversArea } from './utils'
import { Highlight } from './Highlight'
import React, { FunctionComponent, useState } from 'react'
import { TextSelection } from './TextSelection'

interface AreaSelectionProps {
  onTextSelection: (textSelection: TextSelection) => any;
}

const AreaSelection: FunctionComponent<AreaSelectionProps> = ({
                                                                onTextSelection,
                                                                children
                                                              }) => {
  const ref = React.useRef(null)
  const [textSelection, setTextSelection] = useState<TextSelection>()
  const [left, setLeft] = useState<number>()
  const [right, setRight] = useState<number>()
  const [top, setTop] = useState<number>()
  const [bottom, setBottom] = useState<number>()

  const resetArea = () => {
    setTextSelection(null)
    setLeft(null)
    setRight(null)
    setTop(null)
    setBottom(null)
  }

  const updateArea = (event) => {
    event.stopPropagation();
    setRight(event.clientX);
    setBottom(event.clientY);
  }

  const getRectangle = () => {
    const rectangleLeft = Math.min(left, right)
    const rectangleTop = Math.min(top, bottom)
    const rectangleRight = Math.max(left, right)
    const rectangleBottom = Math.max(top, bottom)

    return { x: rectangleLeft,
      y: rectangleTop,
      width: rectangleRight - rectangleLeft,
      height: rectangleBottom - rectangleTop }
  }

  const intersectionRectangleToRegion = (rectangle, region) => {
    const regionDomRect = region.getBoundingClientRect();

    const intersectionLeft = Math.max(rectangle.x, regionDomRect.x);
    const intersectionTop = Math.max(rectangle.y, regionDomRect.y);
    const intersectionRight = Math.min(rectangle.x + rectangle.width, regionDomRect.x+ regionDomRect.width);
    const intersectionBottom = Math.min(rectangle.y + rectangle.height, regionDomRect.y + regionDomRect.height);

    console.log(rectangle.x + rectangle.width, intersectionRight);

    return {
      top: intersectionTop,
      left: intersectionLeft,
      width: intersectionRight - intersectionLeft,
      height: intersectionBottom - intersectionTop,
      regionId: region.getAttribute('data-region-selector-id')
    }
  }

  const getSelectedTextFromRegion = (rectangle, region) => {
    let regionElements = Array.from(region.querySelectorAll('*'))
    let text = ''

    regionElements.forEach((node) => {
      node.childNodes.forEach((childNode) => {
        if (!childNode.textContent) {
          return;
        }
        if (childNode.nodeType !== 3) {
          return;
        }
        const nodeRectangle = childNode.getBoundingClientRect()

        if (nodeRectangle.x < rectangle.x) {
          return;
        }

        if (nodeRectangle.y < rectangle.y) {
          return;
        }

        if (nodeRectangle.x + nodeRectangle.width > rectangle.x + rectangle.width) {
          return;
        }

        if (nodeRectangle.y + nodeRectangle.height > rectangle.y + rectangle.height) {
          return;
        }

        text += node.textContent
      })
    })

    return text
  }

  const getTextSelection = (getText:boolean = false) => {
    const rectangle = getRectangle()
    const regionElements = Array.from(ref.current.querySelectorAll('div[data-region-selector-id]'))
    const regionElementsSelected = regionElements.filter(coversArea(rectangle))

    const selectionRectangles = regionElementsSelected
      .map(regionElements => {
        return intersectionRectangleToRegion(rectangle, regionElements)
      })

    if(!getText)
    {
      return  { text: '', selectionRectangles }
    }

    const texts = regionElementsSelected
      .map(regionElements => {
        return getSelectedTextFromRegion(rectangle, regionElements)
      })

    return { text: texts.join(' '), selectionRectangles }
  }

  const handleStartSelectionArea = (event) => {
    event.stopPropagation();
    setLeft(event.clientX);
    setTop(event.clientY);
    setRight(event.clientX);
    setBottom(event.clientY);
    setTextSelection(getTextSelection())
  }

  const handleUpdateArea = (event) => {
    event.stopPropagation();
    if (!textSelection){
      return;
    }
    updateArea(event)
    setTextSelection(getTextSelection())
  }

  const handleTextSelection = (event) => {
    updateArea(event)
    onTextSelection(getTextSelection(true))
    resetArea()
  }

  const styles = {
    userSelect: 'none'
  }

  return (
    <>
      <div role='none'
           ref={ref}
           onMouseDown={handleStartSelectionArea}
           onMouseMove={handleUpdateArea}
           onMouseUp={handleTextSelection}
           onMouseLeave={resetArea}
      style={styles}>
        {children}
      < /div>
      {textSelection &&
      <Highlight highlight={textSelection} />}
    </>
  )
}

export { AreaSelection }