const getLeafNodes = (node: Node): Node[] => {
  if (node.nodeType === Node.TEXT_NODE) {
    return [node];
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as Element;
    if (element.tagName === 'BR') {
      return [node];
    }
  }
  return Array.from(node.childNodes).reduce<Node[]>(
    (acc, child) => acc.concat(getLeafNodes(child)),
    []
  );
};

export const getRangeSelectedText = (range: Range, containerElement: HTMLElement): string => {
  const rangeContent: DocumentFragment = range.cloneContents();
  const elements = getLeafNodes(rangeContent)
    .filter(node =>
      containerElement.contains(
        range.commonAncestorContainer.contains(node) ? node : range.commonAncestorContainer
      )
    )
    .map((node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        if (element.tagName === 'BR') return '\n';
        return element.textContent?.trim() || '';
      }
      return node.textContent?.trim() || '';
    })
    .filter(Boolean);

  return elements.join(' ');
};
