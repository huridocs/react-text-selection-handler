import * as React from 'react'
import { CSSProperties, FunctionComponent } from 'react'
import { TextSelection } from './TextSelection'


interface HighlightProps {
  highlight: TextSelection,
  color?: string
}

const Highlight: FunctionComponent<HighlightProps> = ({ highlight, color }) => {
  return <> {highlight.selectionRectangles.map((selectionRectangle, index) => {
    const style: CSSProperties = {
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
      backgroundColor: color ? color : 'orange'
    }
    return (<div className={'highlight-rectangle'} key={index} style={style} />)
  })}
  </>
}


export { Highlight }
