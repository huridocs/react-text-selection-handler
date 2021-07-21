import * as React from 'react';
import { CSSProperties, FunctionComponent } from 'react';
import { TextSelection } from './TextSelection';

interface HighlightProps {
  highlight: TextSelection;
  color?: string;
  regionId?: string;
}

const Highlight: FunctionComponent<HighlightProps> = ({ highlight, regionId, color }) => (
  <>
    {highlight.selectionRectangles
      .filter(rectangle =>
        rectangle.regionId && regionId ? rectangle.regionId === regionId : true
      )
      .map((selectionRectangle, index) => {
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
          backgroundColor: color || 'orange',
          zIndex: 1,
        };
        return <div className="highlight-rectangle" style={style} key={index} />;
      })}
  </>
);

export { Highlight };
