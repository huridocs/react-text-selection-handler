export const textRectsOnly = (range: Range) => {
  const iterator = document.createNodeIterator(
    range.commonAncestorContainer,
    NodeFilter.SHOW_ALL, // pre-filter
    {
      // custom filter
      acceptNode() {
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  const nodes = [];
  while (iterator.nextNode()) {
    if (nodes.length === 0 && iterator.referenceNode !== range.startContainer) continue;

    if (iterator.referenceNode.nodeName !== '#text') continue;

    nodes.push(iterator.referenceNode);

    if (iterator.referenceNode === range.endContainer) break;
  }

  return nodes.reduce((rects, n, index) => {
    const myRange = document.createRange();
    myRange.selectNode(n);
    if (index === 0) {
      myRange.setStart(n, range.startOffset);
    }
    if (index === nodes.length - 1) {
      myRange.setEnd(n, range.endOffset);
    }
    return [...rects, ...myRange.getClientRects()];
  }, []);
};

export const coversArea = rectangle => {
  return region => {
    const regionRectangle = region.getBoundingClientRect();

    const horizontalMatch =
      regionRectangle.x <= rectangle.x && rectangle.x <= regionRectangle.x + regionRectangle.width;

    const verticalMatch =
      regionRectangle.y <= rectangle.y && rectangle.y <= regionRectangle.y + regionRectangle.height;

    return horizontalMatch && verticalMatch;
  };
};

export const relativeRectangleToRegion = (rectangle, region) => {
  const regionDomRect = region.getBoundingClientRect();
  return {
    top: rectangle.y - regionDomRect.y,
    left: rectangle.x - regionDomRect.x,
    width: rectangle.width,
    height: rectangle.height,
    regionId: region.getAttribute('data-region-selector-id'),
  };
};
