import React, { useState } from 'react';
import { Page } from './Page';
import { LoremIpsum } from './LoremIpsum';
import { BatmanLogo } from './BatmanLogo';
import { TextSelected } from './TextSelected';

import { Highlight, HandleTextSelection, SelectionRegion } from '../../../src';
import { TextSelection } from '../../../src/TextSelection';

export function App() {
  const [currentSelection, setSelection] = useState<TextSelection>({
    selectionRectangles: [],
    text: '',
  });
  return (
    <>
      <TextSelected>{currentSelection.text}</TextSelected>
      <div>
        <HandleTextSelection
          onSelect={selection => {
            setSelection(selection);
          }}
          onDeselect={() => {
            setSelection({ text: 'UNSELECTED', selectionRectangles: [] });
          }}
        >
          <div id="main-test" style={{ position: 'absolute' }}>
            <Page>
              <SelectionRegion regionId="1">
                <Highlight textSelection={currentSelection} />
                <LoremIpsum />
                <div
                  style={{
                    height: '30px',
                    width: '30px',
                    border: '1px solid red',
                  }}
                />
              </SelectionRegion>
            </Page>
            <Page>
              <SelectionRegion regionId="2">
                <BatmanLogo />
                <Highlight textSelection={currentSelection} />
                <LoremIpsum />
              </SelectionRegion>
            </Page>
            <Page>
              <SelectionRegion regionId="3">
                <Highlight textSelection={currentSelection} />
                <LoremIpsum />
              </SelectionRegion>
            </Page>
          </div>
          <div id="no-highlight-test" style={{ position: 'absolute', left: '550px' }}>
            <Page>
              <SelectionRegion regionId="4">
                <h1>Without highlights</h1>
                <LoremIpsum />
              </SelectionRegion>
            </Page>
          </div>
        </HandleTextSelection>
      </div>
    </>
  );
}
