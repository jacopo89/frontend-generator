import { Operation } from "./Operation";
import { Model } from "../Model";
export declare class OperationsList {
    operations: Operation[];
    constructor(operations: Operation[]);
    findItemOperationByName(name: string): Operation;
    findCollectionOperationByName(name: string): Operation;
    findListOperationByName(name: string): Operation;
    getItemOperationModel(name: string): Model;
    getCollectionOperationModel(name: string): Model;
    getListOperationModel(name: string, subresource?: string | null): Model;
    getActionByName(name: string): Operation;
    getOperationModel(name: string): Model;
}
