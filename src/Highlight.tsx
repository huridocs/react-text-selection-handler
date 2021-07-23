import React, { CSSProperties, FunctionComponent, useContext } from 'react';
import { SelectionRegionContext } from './SelectionRegion';
import { TextSelection } from './TextSelection';

interface HighlightProps {
  textSelection: TextSelection;
  color?: string;
}

const Highlight: FunctionComponent<HighlightProps> = ({ textSelection, color }) => {
  const regionId = useContext(SelectionRegionContext);
  return (
    <>
      {textSelection.selectionRectangles
        .filter(rectangle =>
          rectangle.regionId && regionId ? rectangle.regionId === regionId : true
        )
        .map(selectionRectangle => {
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
          return (
            <div
              className="highlight-rectangle"
              style={style}
              key={[selectionRectangle.top, selectionRectangle.left].join('')}
            />
          );
        })}
    </>
  );
};

export { Highlight };
