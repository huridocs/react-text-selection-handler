import React, { FunctionComponent } from 'react';

interface SelectionRegionProps {
  regionId?: string;
}

const SelectionRegion: FunctionComponent<SelectionRegionProps> = ({
  regionId = 'selectionRegion',
  children,
}) => <div data-region-selector-id={regionId}>{children}</div>;

export { SelectionRegion };
