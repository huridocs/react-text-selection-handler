import { FunctionComponent } from 'react';
import { TextSelection } from './TextSelection';
interface HighlightProps {
    highlight: TextSelection;
    color?: string;
    regionId?: string;
}
declare const Highlight: FunctionComponent<HighlightProps>;
export { Highlight };
