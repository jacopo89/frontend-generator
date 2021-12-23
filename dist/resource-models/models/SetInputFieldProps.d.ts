import { InputPropsInterface, SingleInputPropsInterface } from "./InputProps";
import { Record } from "../Record";
import { FormValue } from "../formvalue/FormValue";
import { EmbeddedSingleModel } from "../propertyModels/EmbeddedSingleModel";
import { EmbeddedMultipleModel } from "../propertyModels/EmbeddedMultipleModel";
import { Errors } from "../../generators/errors/Errors";
import { PropertyModel } from "../PropertyModel";
import React from "react";
/**
 *  PARAMETER FOR SET INPUT FIELD - SINGLE
 */
interface SingleSetInputFieldPropsInterface extends SingleInputPropsInterface {
    hasError: boolean;
    errorMessage?: string;
    value: any;
    propertyRecord: any;
}
export declare class SingleSetInputFieldProps implements SingleInputPropsInterface {
    hasError: boolean;
    errorMessage?: string;
    value: any;
    propertyRecord: any;
    inputHandler: (vars: any) => void;
    errors: Errors;
    formValue: FormValue;
    label: string;
    lockedFormValue: FormValue;
    model: PropertyModel;
    partialSubmitHandler: (e: any) => Promise<any>;
    submitHandler: (e: any) => Promise<any>;
    loading: boolean;
    record: Record | Map<number, Record> | undefined;
    recordValue: Record | Map<number, Record> | undefined;
    referencesMap: Map<string, any>;
    refreshReferencesMap: () => void;
    refresh: () => void;
    setFormValue: React.Dispatch<React.SetStateAction<FormValue>>;
    constructor(props: SingleSetInputFieldPropsInterface);
}
/**
 *  PARAMETER FOR SET INPUT FIELD - EMBEDDED SINGLE
 */
interface EmbeddedSingleSetInputFieldPropsInterface extends EmbeddedSingleInputPropsInterface {
    formValue: FormValue;
    record: Record | undefined;
    model: EmbeddedSingleModel;
}
interface EmbeddedSingleInputPropsInterface extends InputPropsInterface {
    model: EmbeddedSingleModel;
}
export declare class EmbeddedSingleSetInputFieldProps implements EmbeddedSingleInputPropsInterface {
    record: Record | undefined;
    recordValue: Record | Map<number, Record> | undefined;
    formValue: FormValue;
    model: EmbeddedSingleModel;
    errors: Errors;
    lockedFormValue: FormValue;
    partialSubmitHandler: (e: any) => Promise<any>;
    submitHandler: (e: any) => Promise<any>;
    loading: boolean;
    referencesMap: Map<string, any>;
    refreshReferencesMap: () => void;
    setFormValue: React.Dispatch<React.SetStateAction<FormValue>>;
    refresh: () => void;
    constructor(props: EmbeddedSingleSetInputFieldPropsInterface);
}
/**
 *  PARAMETER FOR SET INPUT FIELD - EMBEDDED MULTIPLE
 */
interface EmbeddedMultipleSetInputFieldPropsInterface extends InputPropsInterface {
    formValue: FormValue;
    record: Map<number, Record>;
    recordValue: Record | Map<number, Record> | undefined;
    model: EmbeddedMultipleModel;
    errors: Errors;
    lockedFormValue: FormValue;
    partialSubmitHandler: (e: any) => Promise<any>;
    submitHandler: (e: any) => Promise<any>;
    referencesMap: Map<string, any>;
    refreshReferencesMap: () => void;
    setFormValue: React.Dispatch<React.SetStateAction<FormValue>>;
    refresh: () => void;
}
export declare class EmbeddedMultipleSetInputFieldProps implements EmbeddedMultipleSetInputFieldPropsInterface {
    formValue: FormValue;
    record: Map<number, Record>;
    recordValue: Record | Map<number, Record> | undefined;
    model: EmbeddedMultipleModel;
    errors: Errors;
    lockedFormValue: FormValue;
    partialSubmitHandler: (e: any) => Promise<any>;
    loading: boolean;
    submitHandler: (e: any) => Promise<any>;
    referencesMap: Map<string, any>;
    refreshReferencesMap: () => void;
    setFormValue: React.Dispatch<React.SetStateAction<FormValue>>;
    refresh: () => void;
    inputElement: any;
    constructor(props: EmbeddedMultipleSetInputFieldPropsInterface);
}
export {};
