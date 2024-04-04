export const rangeToTextRects = (range: Range) => {
  const textNodeIterator = document.createNodeIterator(
    range.commonAncestorContainer,
    NodeFilter.SHOW_TEXT
  );

  const nodes = [];
  while (textNodeIterator.nextNode()) {
    const isValidNode = !(
      nodes.length === 0 && textNodeIterator.referenceNode !== range.startContainer
    );
    if (isValidNode) {
      nodes.push(textNodeIterator.referenceNode);
    }
    if (textNodeIterator.referenceNode === range.endContainer) break;
  }

  return nodes.reduce<DOMRect[]>((rects, n, index) => {
    const myRange = document.createRange();
    myRange.selectNode(n);
    if (index === 0) {
      myRange.setStart(n, range.startOffset);
    }
    if (index === nodes.length - 1) {
      // @ts-ignore
      myRange.setEnd(n, Math.min(range.startOffset, n.length - 1));
    }
    return [...rects, ...Array.from(myRange.getClientRects())];
  }, []);
};
