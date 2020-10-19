import * as React from 'react'
import { FunctionComponent} from 'react'
import { PdfHandler } from './PdfHandler'

interface AppProps{
  url: string
}

const App: FunctionComponent<AppProps> = ({url}) => {
  // return <h1>title</h1>
  return <PdfHandler url={url} />
}

export default App
