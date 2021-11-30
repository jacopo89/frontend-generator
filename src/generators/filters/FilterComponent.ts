import {InputType} from "../../resource-models/PropertyModel";
import {ReactElement} from "react";
import {FilterType} from "./Filter";

interface FilterComponentInterface {
    type:FilterType
    name:string,
    isOrder?: boolean,
    component?: ReactElement<any, any>,
}

export class FilterComponent{
    type:FilterType
    name:string
    isOrder: boolean
    component?: ReactElement<any, any>

    constructor({type, name, component, isOrder = false}:FilterComponentInterface) {
        this.type = type
        this.name = name
        this.isOrder = isOrder
        this.component = component
    }
}
