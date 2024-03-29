import {Operation} from "./Operation";
import {Model} from "../Model";

export class OperationsList{
    operations;
    constructor(operations: Operation[]) {
        this.operations = operations
    }

    findItemOperationByName(name:string):Operation{
        const action = this.operations.find(operation => operation.name === name && operation.operationType==="item")
        if(action === undefined) throw new Error("Unexisting action")
        return action;
    }

    findCollectionOperationByName(name:string):Operation{
        const action = this.operations.find(operation => operation.name === name && operation.operationType==="collection")
        if(action === undefined) throw new Error("Unexisting action")
        return action;
    }

    findListOperationByName(name:string):Operation{
        const action = this.operations.find(operation => operation.name === name && operation.responseType==="collection")
        if(action === undefined) throw new Error("Unexisting action")
        return action;
    }

    getItemOperationModel(name:string):Model{
        const {model} = this.findItemOperationByName(name)
        return model;
    }

    getCollectionOperationModel(name:string):Model{
        const {model} = this.findCollectionOperationByName(name)
        return model;
    }

    getListOperationModel(name:string, subresource ?:string|null):Model{
        const {model} = this.findListOperationByName(name)
        if(subresource !== null){
            // @ts-ignore
            return model.getProperty(subresource).getResource().getModel(subresource);
        }
        else{
            return model;
        }
    }

    getActionByName(name:string):Operation{
        const action = this.operations.find(operation => operation.name === name)
        if(action === undefined) throw new Error("Unexisting action")
        return action;
    }

    getOperationModel(name:string):Model{
        const {model} = this.getActionByName(name)
        return model;
    }
}
