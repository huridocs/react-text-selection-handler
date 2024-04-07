export const rangeToTextRects = (range: Range) => {
  const textNodeIterator = document.createNodeIterator(
    range.commonAncestorContainer,
    NodeFilter.SHOW_TEXT
  );

  const selection: Selection | null = window.getSelection();
  if (selection === null) return [];

  const extended = selection.focusNode?.childNodes?.length || 0 > 1;
  const extentNode = extended ? selection.anchorNode : selection.focusNode;

  const nodes = [];
  while (textNodeIterator.nextNode()) {
    const isValidNode = !(
      nodes.length === 0 && textNodeIterator.referenceNode !== range.startContainer
    );
    if (isValidNode) {
      nodes.push(textNodeIterator.referenceNode);
    }
    if (
      extentNode === textNodeIterator.referenceNode ||
      extentNode === textNodeIterator.referenceNode.parentElement
    )
      break;
  }

  return nodes.reduce<DOMRect[]>((rects, n, index) => {
    const myRange = document.createRange();
    myRange.selectNode(n);
    if (index === 0) {
      myRange.setStart(n, range.startOffset);
    }
    if (index === nodes.length - 1) {
      // @ts-ignore
      myRange.setEnd(n, !extended ? range.endOffset : n.length);
    }
    return [...rects, ...Array.from(myRange.getClientRects())];
  }, []);
};
