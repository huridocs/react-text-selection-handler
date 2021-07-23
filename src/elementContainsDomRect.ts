export const elementContainsDomRect = (rect: DOMRect) => (region: Element) => {
  const regionRect = region.getBoundingClientRect();
  const horizontalMatch = regionRect.x <= rect.x && rect.x <= regionRect.x + regionRect.width;
  const verticalMatch = regionRect.y <= rect.y && rect.y <= regionRect.y + regionRect.height;
  return horizontalMatch && verticalMatch;
};
