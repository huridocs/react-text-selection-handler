export interface SelectionRectangle {
  left: number;
  top: number;
  width: number;
  height: number;
  regionId?: string;
}
export interface TextSelection {
  selectionRectangles: SelectionRectangle[];
  text?: string;
}

export const domRectToSelectionRectangle = (
  rectangle: DOMRect,
  region: Element
): SelectionRectangle => {
  const regionDomRect = region.getBoundingClientRect();
  const regionId = region.getAttribute('data-region-selector-id');
  return {
    top: rectangle.y - regionDomRect.y,
    left: rectangle.x - regionDomRect.x,
    width: rectangle.width,
    height: rectangle.height,
    ...(regionId ? { regionId } : {}),
  };
};
