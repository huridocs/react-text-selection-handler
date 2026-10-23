const isTextNode = (node: Node): node is Text => node.nodeType === Node.TEXT_NODE;

// A double-click, a triple-click, or a drag that starts off a glyph puts the
// boundary on an element. The offset is then a child index, not a character
// index. Collect every text node the range covers, and read a character
// offset only when the boundary container is that text node.
const textNodesInRange = (range: Range) => {
  const iterator = document.createNodeIterator(range.commonAncestorContainer, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let current = iterator.nextNode();
  while (current) {
    if (isTextNode(current) && current.length > 0 && range.intersectsNode(current)) {
      nodes.push(current);
    }
    current = iterator.nextNode();
  }
  return nodes;
};

const clamp = (offset: number, length: number) => Math.min(Math.max(offset, 0), length);

const rectsForTextNode = (range: Range, node: Text) => {
  const start = clamp(range.startContainer === node ? range.startOffset : 0, node.length);
  const end = clamp(range.endContainer === node ? range.endOffset : node.length, node.length);
  if (start >= end) {
    return [];
  }
  const nodeRange = document.createRange();
  nodeRange.setStart(node, start);
  nodeRange.setEnd(node, end);
  return Array.from(nodeRange.getClientRects());
};

export const rangeToTextRects = (range: Range) =>
  textNodesInRange(range).reduce<DOMRect[]>(
    (rects, node) => [...rects, ...rectsForTextNode(range, node)],
    []
  );
