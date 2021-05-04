import React, { FunctionComponent } from 'react';
import { TextSelection } from './TextSelection';
import { textRectsOnly, coversArea, relativeRectangleToRegion } from './utils';

interface SelectionHandlerProps {
  onTextSelection: (textSelection: TextSelection) => any;
  onTextDeselection?: () => any;
}

const SelectionHandler: FunctionComponent<SelectionHandlerProps> = ({
  onTextSelection,
  onTextDeselection,
  children,
}) => {
  const ref = React.useRef(null);

  const getSelection = () => {
    if (
      !window
        .getSelection()
        .toString()
        .trim()
    ) {
      if (onTextDeselection) onTextDeselection();
      return;
    }

    const regionElements = Array.from(ref.current.querySelectorAll('div[data-region-selector-id]'));

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    const selectionRectangles = textRectsOnly(range).map(rectangle => {
      const region = regionElements.find(coversArea(rectangle));
      return relativeRectangleToRegion(rectangle, region);
    });

    onTextSelection({ text: selection.toString(), selectionRectangles });
  };

  return (
    <div role="none" ref={ref} onMouseUp={getSelection}>
      {children}
    </div>
  );
};

export { SelectionHandler };
