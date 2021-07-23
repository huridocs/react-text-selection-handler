import React, { FunctionComponent } from 'react';

export const SelectionRegionContext = React.createContext('');

interface SelectionRegionProps {
  regionId?: string;
}

const SelectionRegion: FunctionComponent<SelectionRegionProps> = ({
  regionId = 'selectionRegion',
  children,
}) => (
  <SelectionRegionContext.Provider value={regionId}>
    <div data-region-selector-id={regionId}>{children}</div>
  </SelectionRegionContext.Provider>
);

export { SelectionRegion };
