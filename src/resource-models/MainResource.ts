import {Operation} from "./actions/Operation";
import {OperationsList} from "./actions/OperationsList";
import TableItem from "./configurations/TableItem";
import {Filter} from "../generators/filters/Filter";


export interface PropMainResource{
    title: string;
    resourceName: string;
    operations: object[];
    filters: Filter[];
    table: TableItem[]
}

export class MainResource{
    operations: OperationsList;
    title: string;
    resourceName: string;
    filters: Filter[];
    table: TableItem[]

    constructor({title, resourceName,operations, filters=[], table=[]}:PropMainResource) {

        this.title = title;
        this.resourceName = resourceName;
        this.operations = new OperationsList( operations.map((action:any) => new Operation(action)))
        this.filters = filters;
        this.table = table
    }
}
