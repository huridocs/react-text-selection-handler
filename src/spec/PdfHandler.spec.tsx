import * as React from 'react'
import { PdfHandler } from '../PdfHandler'
import { shallow } from 'enzyme'


describe('PdfHandler', () => {
  it('should propagate the url to render', () => {
    const pdfHandlerWrapper = shallow(<PdfHandler url={'aURL'}/>)
    expect(pdfHandlerWrapper.find('Document').at(0).prop('file')).toEqual('aURL')
  })
})
