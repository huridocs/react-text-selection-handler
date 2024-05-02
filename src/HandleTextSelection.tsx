import React, { FunctionComponent, useRef } from 'react';
import { elementContainsDomRect } from './elementContainsDomRect';
import { rangeToTextRects } from './rangeToTextRects';
import { domRectToSelectionRectangle, TextSelection } from './TextSelection';

interface SelectionHandlerProps {
  onSelect: (textSelection: TextSelection) => any;
  onDeselect?: () => any;
  children?: React.ReactNode;
}

const notNull = <T,>(value: T | null): value is T => value !== null;

const normalizedFirefoxRange = (selection: Selection) => {
  const finalRange = selection.getRangeAt(selection.rangeCount - 1);
  const firstRange = selection.getRangeAt(0);

  const range = document.createRange();
  range.setStart(firstRange.startContainer, firstRange.startOffset);
  range.setEnd(finalRange.endContainer, finalRange.endOffset);
  return range;
};

const HandleTextSelection: FunctionComponent<SelectionHandlerProps> = ({
  onSelect,
  onDeselect = () => {},
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const getSelection = () => {
    const selection = window.getSelection();
    if (!ref.current) {
      return;
    }
    if (!selection?.toString().trim()) {
      onDeselect();
      return;
    }

    const regionElements = Array.from(ref.current.querySelectorAll('div[data-region-selector-id]'));

    const range = normalizedFirefoxRange(selection);

    const selectionRectangles = rangeToTextRects(range)
      .map(rectangle => {
        const region = regionElements.find(elementContainsDomRect(rectangle));
        if (!region) {
          return null;
        }
        return domRectToSelectionRectangle(rectangle, region);
      })
      .filter(notNull);

    onSelect({ text: selection.toString(), selectionRectangles });
  };

  return (
    <div
      role="none"
      ref={ref}
      onMouseDown={e => {
        if (!e.shiftKey) {
          window.getSelection()?.removeAllRanges();
        }
      }}
      onMouseUp={getSelection}
    >
      {children}
    </div>
  );
};

export { HandleTextSelection };
