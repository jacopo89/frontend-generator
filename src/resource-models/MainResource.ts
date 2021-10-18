import {Operation} from "./actions/Operation";
import {OperationsList} from "./actions/OperationsList";


export interface PropMainResource{
    title: string;
    resourceName: string;
    operations: object[];
    filters: object[];
}

export class MainResource{
    operations: OperationsList;
    title: string;
    resourceName: string;
    filters: object[];

    constructor({title, resourceName,operations, filters}:PropMainResource) {

        this.title = title;
        console.log("title",title);
        this.resourceName = resourceName;
        this.operations = new OperationsList( operations.map((action:any) => new Operation(action)))
        this.filters = filters ?? []; //TODO change
        if(operations === undefined){
            debugger;
        }
    }
}
