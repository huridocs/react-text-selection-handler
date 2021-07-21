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

  let areaLeft: number
  let areaTop: number
  let areaRight: number
  let areaBottom: number

  const resetArea = () => {
    setTextSelection(null)
    areaLeft = null
    areaTop = null
    areaRight = null
    areaBottom = null
  }

  const updateArea = (event) => {
    areaLeft = areaLeft ? areaLeft : event.pageX
    areaTop = areaTop ? areaTop : event.pageY
    areaRight = event.pageX
    areaBottom = event.pageY
  }

  const getRectangle = () => {
    const left = Math.min(areaLeft, right ? right : 0)
    const top = Math.min(areaTop, bottom ? bottom : 0)
    const right = Math.max(left, areaRight)
    const bottom = Math.max(top, areaBottom)

    return { x: left, y: top, width: right - left, height: bottom - top }
  }

  const intersectionRectangleToRegion = (rectangle, region) => {
    const regionDomRect = region.getBoundingClientRect()

    const left = Math.max(rectangle.x, regionDomRect.x)
    const top = Math.max(rectangle.y, regionDomRect.y)
    const right = Math.min(rectangle.y, regionDomRect.y)
    const bottom = Math.min(rectangle.y, regionDomRect.y)

    return {
      top: top,
      left: left,
      width: right - left,
      height: bottom - top,
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

  const updateSelectionArea = (event) => {
    updateArea(event)
    setTextSelection(getTextSelection())
  }

  const handleTextSelection = (event) => {
    updateArea(event)
    onTextSelection(getTextSelection(true))
    resetArea()
  }

  return (
    <>
      <div role='none'
           ref={ref}
           onMouseDown={updateSelectionArea}
           onMouseMove={updateSelectionArea}
           onMouseUp={handleTextSelection}
           onMouseLeave={resetArea}>
        {children}
      < /div>
      {textSelection &&
      <Highlight highlight={textSelection} color={'blue'} />}
    </>
  )
}

export { AreaSelection }