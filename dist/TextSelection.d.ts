export interface TextSelection {
    selectionRectangles: SelectionRectangle[];
    text?: string;
}
export interface SelectionRectangle {
    left: number;
    top: number;
    width: number;
    height: number;
    regionId?: string;
}
