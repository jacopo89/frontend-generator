import {Operation} from "./actions/Operation";
import {OperationsList} from "./actions/OperationsList";
import TableItem from "./configurations/TableItem";


export interface PropMainResource{
    title: string;
    resourceName: string;
    operations: object[];
    filters: object[];
    table: TableItem[]
}

export class MainResource{
    operations: OperationsList;
    title: string;
    resourceName: string;
    filters: object[];
    table: TableItem[]

    constructor({title, resourceName,operations, filters=[], table=[]}:PropMainResource) {

        this.title = title;
        this.resourceName = resourceName;
        this.operations = new OperationsList( operations.map((action:any) => new Operation(action)))
        this.filters = filters;
        this.table = table
        if(operations === undefined){
            debugger;
        }
    }
}
