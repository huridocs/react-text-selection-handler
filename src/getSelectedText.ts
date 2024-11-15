const isElementOnNextLine = (firstElement: HTMLElement, secondElement: HTMLElement) => {
  if (!firstElement || !secondElement) return false;
  const left1 = firstElement?.style?.left;
  const left2 = secondElement?.style?.left;
  return parseFloat(left1) > parseFloat(left2);
};

const prepareSelectedElements = (): HTMLElement[] => {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return [];

  const range = selection.getRangeAt(0);
  const selectedContent = range.cloneContents();
  const selectedElements = Array.from(selectedContent.querySelectorAll('*')).filter(
    element => !element.children.length
  ) as Array<HTMLElement>;
  const elements: HTMLElement[] = [];

  selectedElements.forEach((element, idx) => {
    const previousElement = selectedElements[idx - 1];
    if (previousElement) {
      if (isElementOnNextLine(previousElement, element)) {
        const spacer = document.createElement('span');
        spacer.innerText = ' ';
        elements.push(spacer);
      }
    }
    elements.push(element);
  });

  return elements;
};

export const getSelectedText = (): string => {
  const elementsSelected = prepareSelectedElements();
  if (elementsSelected.length <= 1) {
    const selection = window.getSelection();
    return (selection && selection.toString()) || '';
  }

  const selectedText = elementsSelected.reduce((acc, el) => {
    let newText = acc;
    newText += el.innerText;
    if (el.tagName === 'BR') {
      newText += '\n';
    }
    return newText;
  }, '');

  return selectedText;
};
