import { PropertyModelCore } from "../PropertyModelCore";
import React from "react";
import { SinglePropertyModel } from "./SinglePropertyModel";
import { InputOnChangeHandler } from "../PropertyModel";
import { SingleSetInputFieldProps } from "../models/SetInputFieldProps";
import { Resource } from "../Resource";
import { PropertyFieldConfiguration } from "../configurations/PropertyFieldConfiguration";
interface ReferenceMultpleInputFieldProps extends SingleSetInputFieldProps {
    value: any[];
}
export declare class ReferenceMultipleModel extends SinglePropertyModel {
    resourceName: string;
    resource: Resource;
    getResource(): Resource;
    constructor(id: string, other: PropertyModelCore);
    setInputField(props: ReferenceMultpleInputFieldProps, configuration?: PropertyFieldConfiguration): React.ReactElement<any, any> | null;
    getInputOnChangeHandler({ formValue, setFormValue }: InputOnChangeHandler): (vars: any) => void;
    setOutputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null;
    getRecord(record: any): any;
    getFormValue(value: Map<number, string>): number[];
    getJsonFormValue(value: Map<string, any> | number): any;
}
export {};
