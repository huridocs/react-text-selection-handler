import * as React from 'react';
import { PdfHandler } from '../src/PdfHandler'
import { FunctionComponent, useState } from 'react'
import { TextSelection } from '../src/TextSelection'


const App: FunctionComponent = () => {
  const [page, setPage] = useState<number>(null);
  const [url, setURL] = useState<string>('http://localhost:3005/sample.pdf');
  const [highlight, setHighlight] = useState<TextSelection>(null);

  const goToHighlight: TextSelection = page ? {selectionRectangles: [{
    top: 0,
      left: 0,
      width: 10,
      height: 10,
      pageNumber: page
    }]} : null;

  return (
    <>
      <div style={{width: '750px', position:'absolute', top:'0', left:'0'}}>
      <PdfHandler url={url} onTextSelection={setHighlight}  highlights={[highlight]} goToHighlight={goToHighlight}/>
      </div>
      <ul style={{listStyleType:'none', width: '750px', position:'absolute', top:'0', left:'600px'}}>
        <li><button id={"goToPage1"} onClick={() => setPage(1)}>go to page 1</button></li>
        <li><button id={"goToPage10"} onClick={() => setPage(10)}>go to page 10</button></li>
        <li><button id={"goToTheEnd"} onClick={() => setPage(99999)}>go to the end</button></li>
        <li><button id={"renderOtherPdf"} onClick={() => setURL('http://localhost:3005/sample2.pdf')}>render other pdf</button></li>
      </ul>
    </>
  );
}

export default App;
