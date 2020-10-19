## How to use

Clone this repo to your local computer, then run:

- `yarn install & yarn build`

- To make this component available to other projects on your local computer, run `yarn link`.
- Then go to the project where you want to use this package and run `yarn link "react-pdf-handler"`.

Finally, to fix the multiple copies of React bug that shows up with linked React packages:

- navigate to the root of the `react-pdf-handler` package
- run `npm link "../path/to/your/project/node_modules/react"`
- run `npm link "../path/to/your/project/node_modules/react-dom"`

You can now import `PdfHandler` as a normal package installed from npm like so:

```
import PdfHandler from 'PdfHandler'
...
```

You can also import the type definitions if you're using TypeScript like so:

```
import PdfHandler, { IPdfHandlerProps } from 'PdfHandler'
...
```
