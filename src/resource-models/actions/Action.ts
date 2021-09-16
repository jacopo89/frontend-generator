import React from "react";
import {Model} from "../Model";

type OperationType = "item" | "collection";
type Verb = "POST" | "GET" | "PATCH" | "PUT";

export interface PropAction{
    model: Model;
    name: string;
    resourceName: string;
    verb: Verb;
    contentType: string;
    type: OperationType
}

/**
 * A resource represents
 */
export class Action{
    model: Model;
    name: string;
    resourceName: string;
    verb: Verb;
    contentType: string;
    type: OperationType

    constructor({model, name, resourceName, verb, contentType, type}:PropAction) {
        this.model = Model.createFromJson(model, resourceName)
        this.name = name;
        this.verb = verb;
        this.resourceName = resourceName;
        this.contentType = contentType;
        this.type = type
    }

    getModel():Model{
        return this.model;
    }

}
