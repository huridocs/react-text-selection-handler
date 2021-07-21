import { coversArea, relativeRectangleToRegion, textRectsOnly } from './utils'
import { Highlight } from './Highlight'
import React, { FunctionComponent, useState } from 'react'
import { TextSelection } from './TextSelection'

interface AreaSelectionProps {
  onTextSelection: (textSelection: TextSelection) => any;
  onTextDeselection?: () => any;
}

const AreaSelection: FunctionComponent<AreaSelectionProps> = ({
                                                                onTextSelection,
                                                                onTextDeselection,
                                                                children
                                                              }) => {
  const ref = React.useRef(null)
  const [textSelection, setTextSelection] = useState<TextSelection>()

  let left: number;
  let top: number;
  let right: number;
  let bottom: number;

  const resetArea = () => {
    left = null;
    top = null;
    right = null;
    bottom = null;
  }

  const updateArea = (event) => {
    left = left? left: event.pageX;
    top = top? top: event.pageY;
    right = event.pageX
    bottom = event.pageY
  }

  const getRectangle = () =>
  {
    const left = Math.min(left, right)
    const top = Math.min(top, bottom)
    const right = Math.max(left, right)
    const bottom = Math.max(top, bottom)

    return { left, top, right, bottom }
  }

  const getTextSelection = () =>
  {
    const regionElements = Array.from(ref.current.querySelectorAll('div[data-region-selector-id]'))
    const regionRectangles = regionElements.map(region => region.getBoundingClientRect())
    const rectangle = getRectangle()
    const selectionRectangles = regionRectangles
      .filter(coversArea(rectangle))
      .map(regionRectangle => {
        return relativeRectangleToRegion(rectangle, regionRectangle)
      })

    // One SelectionRectangle per region
    return undefined;
  }

  const updateSelectionArea = (event) =>
  {
    updateArea(event)
    setTextSelection(getTextSelection())
  }

  const getSelectionArea = (event) => {
    updateArea(event)
    onTextSelection(getTextSelection())
    resetArea()
    setTextSelection(null)
  }

  return (
    <>
      <div role='none'
           ref={ref}
           onMouseUp={getSelectionArea}
           onMouseDown={updateSelectionArea}
           onMouseMove={updateSelectionArea}>
        {children}
      < /div>
      {textSelection &&
      <Highlight highlight={textSelection} color={'blue'} />}
    </>
  )
}

export { AreaSelection }