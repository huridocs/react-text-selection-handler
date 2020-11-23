import * as React from 'react'
import { shallow } from 'enzyme'
import { Highlight } from '../Highlight'
import { SelectionRectangle } from '../TextSelection'

describe('Highlight', () => {
  it('should render a rectangle', () => {
    const highlight: SelectionRectangle = { top: 0, left: 0, width: 0, height: 0, regionId: "1" }
    const highlight2: SelectionRectangle = { top: 0, left: 0, width: 0, height: 0, regionId: "1" }
    const highligh3: SelectionRectangle = { top: 1, left: 1, width: 1, height: 1, regionId: "2" }
    const selectionHandlerWrapper = shallow(<Highlight highlight={{ selectionRectangles: [highlight, highlight2, highligh3] }} regionId="1"/>)
    expect(selectionHandlerWrapper.find('div').at(0).prop('style')).toEqual({
      ...defaultStyle,
      top: 0, left: 0, width: 0, height: 0,
      backgroundColor: 'orange',
      opacity: 0.5
    })
    expect(selectionHandlerWrapper.find('div').at(0).hasClass('highlight-rectangle')).toEqual(true);
    expect(selectionHandlerWrapper.find('div').length).toEqual(2);
  })

  it('should render two rectangles', () => {
    const highlights1: SelectionRectangle = { top: 1, left: 1, width: 1, height: 1 }
    const highlights2: SelectionRectangle = { top: 2, left: 2, width: 2, height: 2 }

    const selectionHandlerWrapper = shallow(<Highlight highlight={{ selectionRectangles: [highlights1, highlights2] }}
                                                       color={'red'} />)
    expect(selectionHandlerWrapper.find('div').at(0).prop('style')).toEqual({
      ...highlights1,
      ...defaultStyle,
      backgroundColor: 'red'
    })

    expect(selectionHandlerWrapper.find('div').at(1).prop('style')).toEqual({
      ...highlights2,
      ...defaultStyle,
      backgroundColor: 'red'
    })
  })
})


const defaultStyle = {
  padding: 0,
  margin: 0,
  position: 'absolute',
  display: 'block',
  mixBlendMode: 'darken',
  opacity: 0.5
}
