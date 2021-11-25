/// <reference types="react" />
import TableItem from "./TableItem";
export default abstract class MainResourceConfiguration {
    table: TableItem[];
    protected constructor();
    protected addTableItem(id: string, label: string, viewElement?: React.DetailedReactHTMLElement<any, any>): TableItem[];
    protected abstract getResourceName(): string;
    protected toJson(): {
        [x: string]: {
            table: TableItem[];
        };
    };
}
