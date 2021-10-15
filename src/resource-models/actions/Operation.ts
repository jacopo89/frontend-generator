import {Model} from "../Model";

type OperationType = "item" | "collection";
type Method = "POST" | "GET" | "PATCH" | "PUT";

export interface PropAction{
    model: Model;
    name: string;
    resourceName: string;
    method: Method;
    contentType: string;
    type: OperationType
}

/**
 * A resource represents
 */
export class Operation{
    model: Model;
    name: string;
    resourceName: string;
    method: Method;
    contentType: string;
    type: OperationType

    constructor({model, name, resourceName, method, contentType, type}:PropAction) {
        this.model = Model.createFromJson(model, resourceName)
        this.name = name;
        this.method = method;
        this.resourceName = resourceName;
        this.contentType = contentType;
        this.type = type
    }

    getModel():Model{
        return this.model;
    }

}
