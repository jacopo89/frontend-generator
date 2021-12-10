import React, { DetailedReactHTMLElement, ReactElement } from "react";
import { Errors } from "../generators/errors/Errors";
import { FormValue } from "./formvalue/FormValue";
import { Record } from "./Record";
import { PropertyFieldConfiguration } from "./configurations/PropertyFieldConfiguration";
import { PropertyModelInputInterface } from "./models/PropertyModelInputProps";
export declare type InputType = "id" | "boolean" | "reference" | "embedded_single" | "embedded_multiple" | "file_single" | "file_multiple" | "integer" | "date" | "float" | "enum" | "string" | "phone" | "money" | "array" | "textarea" | "enum_single" | "enum_multiple" | "reference_multiple";
export interface PropertyModel {
    id: string;
    type: InputType;
    label: string;
    modelResourceName: string;
    validators?: string[];
    errorMessages?: string[];
    resourceName: string;
    optionText: string;
    single?: boolean;
    form: React.DetailedReactHTMLElement<any, any>;
    options?: Option[];
    xs?: GridRange;
    md?: GridRange;
    adornment?: string;
    showElement?: React.DetailedReactHTMLElement<any, any>;
    modifyOnlyLastElement?: boolean;
    editabilityRule?: () => any;
    colorMap?: object;
}
export declare type GridRange = boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
export declare type FieldType = "edit" | "show";
export declare type Option = {
    id: string;
    label: string;
};
interface PropertyModelOutputInterface {
    model: PropertyModel;
    record: Record | Map<number, Record> | undefined;
}
/**
 * @Property {id} - Name of the property
 */
export declare abstract class PropertyModel {
    id: string;
    type: InputType;
    label: string;
    validators?: string[];
    errorMessages?: string[];
    resourceName: string;
    optionText: string;
    form: React.DetailedReactHTMLElement<any, any>;
    xs?: GridRange;
    md?: GridRange;
    colorMap?: object;
    modelResourceName: string;
    constructor(id: string, rest: any);
    abstract manipulateErrors(errors: Errors): any;
    abstract setInputField(props: PropertyModelInputInterface, configuration?: PropertyFieldConfiguration): ReactElement<any, any> | null;
    abstract getInputField(props: PropertyModelInputInterface, configuration?: PropertyFieldConfiguration): ReactElement<any, any> | null;
    abstract getOutputField(props: PropertyModelOutputInterface, configuration?: PropertyFieldConfiguration): ReactElement<any, any> | null;
    abstract setOutputField(props: PropertyModelOutputInterface, configuration?: PropertyFieldConfiguration): ReactElement<any, any> | null;
    abstract getInputOnChangeHandler(props: InputOnChangeHandler): (vars: any) => void;
    abstract getRecord(jsonValue: any): any;
    abstract getFormValue(value: any): any;
    getPropertyField(props: PropertyModelInputInterface, isEdit?: boolean): React.ReactElement<any, any> | null;
}
export interface InputOnChangeHandler {
    formValue: FormValue;
    setFormValue: React.Dispatch<React.SetStateAction<FormValue>>;
}
export interface InputFields {
    model: PropertyModel;
    formValue: FormValue | Map<number, FormValue>;
    record?: Record | Map<number, Record>;
    setFormValue: React.Dispatch<React.SetStateAction<FormValue>>;
    lockedFormValue: FormValue;
    errors: Errors;
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    referencesMap: Map<string, any>;
    form?: React.DetailedReactHTMLElement<any, any>;
    refreshReferencesMap: () => void;
    inputElement?: DetailedReactHTMLElement<any, any>;
    refresh?: () => void;
}
export {};
