import { SinglePropertyModel } from "./SinglePropertyModel";
import React from "react";
import { InputOnChangeHandler, Option } from "../PropertyModel";
import { SingleSetInputFieldProps } from "../models/SetInputFieldProps";
export interface JsonEnumOption {
    id: number | string;
    label: string;
}
interface EnumMultipleInputFields extends SingleSetInputFieldProps {
    options: Option[];
}
export declare class EnumMultipleModel extends SinglePropertyModel {
    options: Option[];
    colorMap: any;
    constructor(id: string, others: any);
    setInputField(props: EnumMultipleInputFields): React.ReactElement<any, any> | null;
    getInputOnChangeHandler({ formValue, setFormValue }: InputOnChangeHandler): (vars: any) => void;
    setOutputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null;
    getRecord(jsonValue: any): any;
}
export {};
