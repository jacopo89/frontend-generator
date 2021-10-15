import {Operation} from "./Operation";

export class OperationsList{
    operations;
    constructor(operations: Operation[]) {
        this.operations = operations
    }

    getActionByName(name:string){
        return this.operations.find(operation => operation.name === name)
    }
}
