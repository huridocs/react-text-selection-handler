import * as React from 'react'
import { SelectionRegion } from '../SelectionRegion'
import { shallow } from 'enzyme'


describe('SelectionRegion', () => {
  it('should create div with data-region-selector-id', () => {
    const selectionHandlerWrapper = shallow(<SelectionRegion regionId={'aRegionId'} />)
    expect(selectionHandlerWrapper.getElement()).toEqual(<div data-region-selector-id="aRegionId" />)
  })

  it('should allow children', () => {
    const selectionHandlerWrapper = shallow(<SelectionRegion><h1>Title</h1></SelectionRegion>)
    expect(selectionHandlerWrapper.text()).toEqual('Title')
  })
})

