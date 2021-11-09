import { OperationsList } from "./actions/OperationsList";
export interface PropMainResource {
    title: string;
    resourceName: string;
    operations: object[];
    filters: object[];
}
export declare class MainResource {
    operations: OperationsList;
    title: string;
    resourceName: string;
    filters: object[];
    constructor({ title, resourceName, operations, filters }: PropMainResource);
}
