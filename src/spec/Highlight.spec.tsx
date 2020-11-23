import * as React from 'react'
import { shallow } from 'enzyme'
import { Highlight } from '../Highlight'
import { SelectionRectangle } from '../TextSelection'

describe('Highlight', () => {
  let highlight: SelectionRectangle;
  let highlight2: SelectionRectangle;
  let highlight3: SelectionRectangle;

  beforeEach(() => {
    highlight = { top: 0, left: 0, width: 0, height: 0, regionId: "1" }
    highlight2 = { top: 0, left: 0, width: 0, height: 0, regionId: "1" }
    highlight3 = { top: 1, left: 1, width: 1, height: 1, regionId: "2" }
  })
  it('should render a rectangle', () => {
    const selectionHandlerWrapper = shallow(<Highlight highlight={{ selectionRectangles: [highlight, highlight2, highlight3] }} regionId="1"/>)
    expect(selectionHandlerWrapper.find('div').at(0).prop('style')).toEqual({
      ...defaultStyle,
      top: 0, left: 0, width: 0, height: 0,
      backgroundColor: 'orange',
      opacity: 0.5
    })
    expect(selectionHandlerWrapper.find('div').at(0).hasClass('highlight-rectangle')).toEqual(true);
    expect(selectionHandlerWrapper.find('div').length).toEqual(2);
  })

  it('should render all highlights of regionId is not provided', () => {
    const selectionHandlerWrapper = shallow(<Highlight highlight={{ selectionRectangles: [highlight, highlight2, highlight3] }}/>)
    expect(selectionHandlerWrapper.find('div').length).toEqual(3);
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
