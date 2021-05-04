import React, { useState } from 'react'
import { Page } from './Page'
import { LoremIpsum } from './LoremIpsum'
import { BatmanLogo } from './BatmanLogo'
import { TextSelected } from './TextSelected'

import { Highlight, SelectionHandler, SelectionRegion } from '../../../src/'

export function App() {
  const [selection, setSelection] = useState({
    selectionRectangles: [],
    text: ''
  })
  return (
    <>
      <TextSelected>{selection.text}</TextSelected>
      <div style={{ position: 'absolute' }}>
        <SelectionHandler
          onTextSelection={selection => {
            setSelection(selection)
          }}
          onTextDeselection={() => {
            setSelection({ text: 'UNSELECTED', selectionRectangles: [] })
          }}
        >
          <Page>
            <SelectionRegion regionId="1">
              <Highlight highlight={selection} regionId="1" />
              <LoremIpsum />
              <div
                style={{
                  height: '30px',
                  width: '30px',
                  border: '1px solid red'
                }}
              />
            </SelectionRegion>
          </Page>
          <Page>
            <SelectionRegion regionId="2">
              <BatmanLogo />
              <Highlight highlight={selection} regionId="2" />
              <LoremIpsum />
            </SelectionRegion>
          </Page>
          <Page>
            <SelectionRegion regionId="3">
              <Highlight highlight={selection} regionId="3" />
              <LoremIpsum />
            </SelectionRegion>
          </Page>
        </SelectionHandler>
      </div>
    </>
  )
}

export default App
