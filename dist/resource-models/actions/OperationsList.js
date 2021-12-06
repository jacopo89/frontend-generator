export class OperationsList {
    constructor(operations) {
        this.operations = operations;
    }
    findItemOperationByName(name) {
        const action = this.operations.find(operation => operation.name === name && operation.operationType === "item");
        if (action === undefined)
            throw new Error("Unexisting action");
        return action;
    }
    findCollectionOperationByName(name) {
        const action = this.operations.find(operation => operation.name === name && operation.operationType === "collection");
        if (action === undefined)
            throw new Error("Unexisting action");
        return action;
    }
    findListOperationByName(name) {
        const action = this.operations.find(operation => operation.name === name && operation.responseType === "collection");
        if (action === undefined)
            throw new Error("Unexisting action");
        return action;
    }
    getItemOperationModel(name) {
        const { model } = this.findItemOperationByName(name);
        return model;
    }
    getCollectionOperationModel(name) {
        const { model } = this.findCollectionOperationByName(name);
        return model;
    }
    getListOperationModel(name, subresource) {
        const { model } = this.findListOperationByName(name);
        if (subresource !== null) {
            // @ts-ignore
            return model.getProperty(subresource).getResource().getModel(subresource);
        }
        else {
            return model;
        }
    }
    getActionByName(name) {
        const action = this.operations.find(operation => operation.name === name);
        if (action === undefined)
            throw new Error("Unexisting action");
        return action;
    }
    getOperationModel(name) {
        const { model } = this.getActionByName(name);
        return model;
    }
}
