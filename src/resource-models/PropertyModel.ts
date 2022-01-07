import React, {DetailedReactHTMLElement, ReactElement} from "react";
import {Errors} from "../generators/errors/Errors";
import {Form} from "./formvalue/Form";
import {Record} from "./Record";
import {PropertyFieldConfiguration} from "./configurations/PropertyFieldConfiguration";
import _ from "lodash";
import {PropertyModelInputInterface} from "./models/PropertyModelInputProps";

export type InputType ="id"| "boolean" | "reference" | "embedded_single" | "embedded_multiple" | "file_single" | "file_multiple" | "integer" | "date" | "float" | "enum" | "string" | "phone" | "money" | "array" |"textarea" | "enum_single"| "enum_multiple" | "reference_multiple";

export interface PropertyModel{
    id:string;
    type:InputType;
    label:string;
    modelResourceName: string;
    validators?: string[];
    errorMessages?: string[];
    resourceName:string;
    optionText:string;
    single?:boolean;
    form: React.DetailedReactHTMLElement<any, any>;
    options?: Option[];
    adornment?:string,
    showElement?:React.DetailedReactHTMLElement<any, any>;
    modifyOnlyLastElement?:boolean;
    editabilityRule?:()=>any,
    colorMap ?: object;
}

export type GridRange = boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
export type FieldType = "edit"| "show";
export type Option = {
    id: string;
    label:string;
}

interface PropertyModelOutputInterface {
    model: PropertyModel
    record: Record | Map<number, Record> | undefined
}

/**
 * @Property {id} - Name of the property
 */
export abstract class PropertyModel {
    id: string;
    type: InputType;
    label: string;
    validators?: string[];
    errorMessages?: string[];
    resourceName: string;
    optionText: string;
    form: React.DetailedReactHTMLElement<any, any>;
    colorMap ?: object;
    modelResourceName: string;

    constructor(id: string, rest: any) {
        const {type, label, validators = [], errorMessages = [], resourceName, optionText, form, colorMap, modelResourceName} = rest;
        this.id = id;
        this.type = type;
        this.label = _.startCase(label);
        this.validators = validators;
        this.errorMessages = errorMessages;
        this.resourceName = resourceName;
        this.optionText = optionText;
        this.form = form;
        this.colorMap = colorMap;
        this.modelResourceName = modelResourceName;
    }

    abstract manipulateErrors(errors:Errors):any;

    abstract setInputField(props: PropertyModelInputInterface, configuration?:PropertyFieldConfiguration): ReactElement<any, any> | null;

    abstract getInputField(props:PropertyModelInputInterface, configuration?:PropertyFieldConfiguration): ReactElement<any,any>|null;

    abstract getOutputField(props:PropertyModelOutputInterface, configuration?:PropertyFieldConfiguration): ReactElement<any, any> |null;

    abstract setOutputField(props:PropertyModelOutputInterface, configuration?:PropertyFieldConfiguration): ReactElement<any, any> |null;

    abstract getInputOnChangeHandler(props: InputOnChangeHandler): (vars:any) => void;

    abstract getRecord(jsonValue: any): any;

    abstract getFormValue(value: any):any;

    getPropertyField(props:PropertyModelInputInterface, isEdit: boolean = true ){
        return (isEdit) ? this.getInputField(props) : this.getOutputField(props)
    }

}

export interface InputOnChangeHandler{
    formValue:Form,
    setFormValue:  React.Dispatch<React.SetStateAction<Form>>,
}

