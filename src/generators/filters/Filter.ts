import {InputType} from "../../resource-models/PropertyModel";

export type FilterType = InputType | "order";

interface FilterInterface {
    type:FilterType
    name:string,
}

export class Filter{
    type:FilterType
    name:string

    constructor({type, name}:FilterInterface) {
        this.type = type
        this.name = name
    }
}
