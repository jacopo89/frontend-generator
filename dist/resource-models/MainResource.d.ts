import { OperationsList } from "./actions/OperationsList";
import TableItem from "../configuration/TableItem";
export interface PropMainResource {
    title: string;
    resourceName: string;
    operations: object[];
    filters: object[];
    table: TableItem[];
}
export declare class MainResource {
    operations: OperationsList;
    title: string;
    resourceName: string;
    filters: object[];
    table: TableItem[];
    constructor({ title, resourceName, operations, filters, table }: PropMainResource);
}
