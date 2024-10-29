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

const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const normalizeSpaces = (text: string) => {
  const pairedCharacters = {
    '(': ')',
    '[': ']',
    '{': '}',
    '"': '"',
    "'": "'",
  };

  let result = text;

  Object.entries(pairedCharacters).forEach(([openChar, closeChar]) => {
    const escapedOpen = escapeRegExp(openChar);
    const escapedClose = escapeRegExp(closeChar);
    const pattern = new RegExp(`${escapedOpen}\\s*(.*?)\\s*${escapedClose}`, 'g');
    result = result.replace(pattern, `${openChar}$1${closeChar}`);
  });

  const spaceAfterChars = escapeRegExp('$£€@#');
  const spaceBeforeChars = escapeRegExp(',.!?:;');

  result = result.replace(new RegExp(`([${spaceAfterChars}])\\s+`, 'g'), '$1');
  result = result.replace(new RegExp(`\\s+([${spaceBeforeChars}])`, 'g'), '$1');

  return result;
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

  return normalizeSpaces(elements.join(' '));
};
