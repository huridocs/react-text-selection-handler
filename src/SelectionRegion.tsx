import * as React from 'react'
import { FunctionComponent } from 'react'

interface SelectionRegionProps {
  regionId?: string
}

const SelectionRegion: FunctionComponent<SelectionRegionProps> = ({ regionId = 'selectionRegion', children }) => {
  return <div data-region-selector-id={regionId}>{children}</div>
}

export { SelectionRegion }
