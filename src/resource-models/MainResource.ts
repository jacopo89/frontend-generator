import {Operation} from "./actions/Operation";
import {OperationsList} from "./actions/OperationsList";


export interface PropMainResource{
    title: string;
    resourceName: string;
    operations: object[];
}

export class MainResource{
    operations: OperationsList;
    title: string;
    resourceName: string;

    constructor({title, resourceName,operations}:PropMainResource) {
        this.title = title;
        this.resourceName = resourceName;
        this.operations = new OperationsList( operations.map((action:any) => new Operation(action)))
    }
}
