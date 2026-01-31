import React, { FunctionComponent, useRef, useEffect } from 'react';
import { elementContainsDomRect } from './elementContainsDomRect.js';
import { rangeToTextRects } from './rangeToTextRects.js';
import { domRectToSelectionRectangle, TextSelection } from './TextSelection.js';
import { getSelectedText } from './getSelectedText.js';

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
  onDeselect = () => { },
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
    const text = getSelectedText();
    onSelect({ text, selectionRectangles });
  };

  useEffect(() => {
    const refElement = ref.current;

    if (!refElement) {
      return () => { };
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        event.preventDefault();
        const selection = window.getSelection();
        if (selection && selection.toString().trim()) {
          const text = getSelectedText();
          navigator.clipboard.writeText(text);
        }
      }
    };

    refElement.addEventListener('keydown', handleKeyDown);
    return () => {
      refElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref]);

  return (
    <div
      role="none"
      ref={ref}
      onMouseDown={e => {
        if (e.button !== 0) {
          return;
        }
        if (!e.shiftKey) {
          window.getSelection()?.removeAllRanges();
        }
      }}
      onMouseUp={e => {
        if (e.button !== 0) {
          return;
        }
        getSelection();
      }}
    >
      {children}
    </div>
  );
};

export { HandleTextSelection };
