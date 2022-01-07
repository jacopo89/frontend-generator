import { Record } from "../Record";
import { Form } from "../formvalue/Form";
import React from "react";
import { Errors } from "../../generators/errors/Errors";
import { PropertyModel } from "../PropertyModel";
import { ModelInputInterface } from "../interface/ModelInputInterface";
export interface PropertyPropsInterface {
    model: PropertyModel;
    record: any;
    formValue: Form | Map<number, Form>;
    setForm: React.Dispatch<React.SetStateAction<Form>>;
    lockedFormValue: Form;
    errors: Errors;
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    referencesMap: Map<string, any>;
    refreshReferencesMap: () => void;
    showLabel?: boolean;
    refresh: () => void;
}
export declare class PropertyModelInputProps {
    model: PropertyModel;
    record: Record | Map<number, Record> | undefined;
    formValue: Form | Map<number, Form>;
    setForm: React.Dispatch<React.SetStateAction<Form>>;
    lockedFormValue: Form;
    errors: Errors;
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    referencesMap: Map<string, any>;
    refreshReferencesMap: () => void;
    refresh: () => void;
    showlabel?: boolean;
    constructor({ model, record, formValue, setForm, lockedFormValue, errors, submitHandler, partialSubmitHandler, referencesMap, refreshReferencesMap, showLabel, refresh }: PropertyPropsInterface);
    static createFromFieldProps(requestedName: string, props: ModelInputInterface): PropertyModelInputProps;
}
export interface PropertyModelInputInterface extends PropertyModelInputProps {
}
