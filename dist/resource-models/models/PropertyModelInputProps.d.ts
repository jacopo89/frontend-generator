import { Record } from "../Record";
import { FormValue } from "../formvalue/FormValue";
import React from "react";
import { Errors } from "../../generators/errors/Errors";
import { PropertyModel } from "../PropertyModel";
import { ModelInputInterface } from "../interface/ModelInputInterface";
export interface PropertyPropsInterface {
    model: PropertyModel;
    record: any;
    recordValue: Record | Map<number, Record> | undefined;
    formValue: FormValue | Map<number, FormValue>;
    setFormValue: React.Dispatch<React.SetStateAction<FormValue>>;
    lockedFormValue: FormValue;
    errors: Errors;
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    loading: boolean;
    referencesMap: Map<string, any>;
    refreshReferencesMap: () => void;
    showLabel?: boolean;
    refresh: () => void;
}
export declare class PropertyModelInputProps {
    model: PropertyModel;
    record: Record | Map<number, Record> | undefined;
    recordValue: Record | Map<number, Record> | undefined;
    formValue: FormValue | Map<number, FormValue>;
    setFormValue: React.Dispatch<React.SetStateAction<FormValue>>;
    lockedFormValue: FormValue;
    errors: Errors;
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    loading: boolean;
    referencesMap: Map<string, any>;
    refreshReferencesMap: () => void;
    refresh: () => void;
    showlabel?: boolean;
    constructor({ model, record, recordValue, formValue, setFormValue, lockedFormValue, errors, submitHandler, partialSubmitHandler, loading, referencesMap, refreshReferencesMap, showLabel, refresh }: PropertyPropsInterface);
    static createFromFieldProps(requestedName: string, props: ModelInputInterface): PropertyModelInputProps;
}
export interface PropertyModelInputInterface extends PropertyModelInputProps {
}
