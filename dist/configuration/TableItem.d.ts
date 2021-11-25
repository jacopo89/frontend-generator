/// <reference types="react" />
export default class TableItem {
    id: string;
    label: string;
    viewElement?: React.DetailedReactHTMLElement<any, any>;
    constructor(id: string, label: string, viewElement?: React.DetailedReactHTMLElement<any, any>);
}
