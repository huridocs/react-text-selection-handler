import { FunctionComponent } from 'react';
import { TextSelection } from './TextSelection';
interface SelectionHandlerProps {
    onTextSelection?: (textSelection: TextSelection) => any;
    onTextDeselection?: () => any;
    elementTagsToAvoid?: string[];
}
declare const SelectionHandler: FunctionComponent<SelectionHandlerProps>;
export { SelectionHandler };
