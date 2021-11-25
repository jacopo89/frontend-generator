import { PropertyModelCore } from "../PropertyModelCore";
import React from "react";
import { SinglePropertyModel } from "./SinglePropertyModel";
import { InputOnChangeHandler } from "../PropertyModel";
import { SingleSetInputFieldProps } from "../models/SetInputFieldProps";
import { Resource } from "../Resource";
import { PropertyFieldConfiguration } from "../configurations/PropertyFieldConfiguration";
export declare class ReferenceModel extends SinglePropertyModel {
    resourceName: string;
    resource: Resource;
    getResource(): Resource;
    constructor(id: string, other: PropertyModelCore);
    setInputField(props: SingleSetInputFieldProps, configuration?: PropertyFieldConfiguration): React.ReactElement<any, any> | null;
    getInputOnChangeHandler({ formValue, setFormValue }: InputOnChangeHandler): (vars: any) => void;
    setOutputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null;
    getRecord(record: any): any;
    getFormValue(value: any): any;
    getJsonFormValue(value: Map<string, any> | number): any;
}
