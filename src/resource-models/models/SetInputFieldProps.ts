import {
    EmbeddedMultipleInputProps,
    EmbeddedSingleInputProps,
    InputPropsInterface,
    SingleInputProps,
    SingleInputPropsInterface
} from "./InputProps";
import {Record} from "../Record";
import {FormValue} from "../formvalue/FormValue";
import {EmbeddedSingleModel} from "../propertyModels/EmbeddedSingleModel";
import {EmbeddedMultipleModel} from "../propertyModels/EmbeddedMultipleModel";
import {Errors} from "../../generators/errors/Errors";
import {PropertyModel} from "../PropertyModel";
import React from "react";

/**
 *  PARAMETER FOR SET INPUT FIELD - SINGLE
 */
interface SingleSetInputFieldPropsInterface extends SingleInputPropsInterface{
    hasError: boolean,
    errorMessage?: string
    value: any,
    propertyRecord: any
}

export class SingleSetInputFieldProps implements SingleInputPropsInterface{
    hasError:boolean
    errorMessage?: string
    value: any
    propertyRecord: any
    inputHandler: (vars:any)=>void
    errors: Errors;
    formValue: FormValue;
    label: string;
    lockedFormValue: FormValue;
    model: PropertyModel;
    partialSubmitHandler: (e:any) => Promise<any>
    submitHandler: (e:any) => Promise<any>
    record: Record | Map<number, Record> | undefined;
    referencesMap: Map<string, any>;
    refreshReferencesMap: ()=>void
    setFormValue: React.Dispatch<React.SetStateAction<FormValue>>

    constructor(props: SingleSetInputFieldPropsInterface) {
        const {hasError, errorMessage, value, inputHandler, errors, formValue, label, lockedFormValue, model, partialSubmitHandler, submitHandler, record, referencesMap, refreshReferencesMap, setFormValue, propertyRecord} = props;
        this.hasError = hasError;
        this.errorMessage = errorMessage;
        this.value = value;
        this.inputHandler = inputHandler
        this.errors = errors;
        this.formValue = formValue;
        this.label = label;
        this.lockedFormValue = lockedFormValue;
        this.model = model;
        this.partialSubmitHandler = partialSubmitHandler;
        this.submitHandler = submitHandler;
        this.referencesMap = referencesMap;
        this.refreshReferencesMap = refreshReferencesMap;
        this.record = record;
        this.setFormValue = setFormValue
        this.propertyRecord = propertyRecord;
    }
}




/**
 *  PARAMETER FOR SET INPUT FIELD - EMBEDDED SINGLE
 */
interface EmbeddedSingleSetInputFieldPropsInterface extends EmbeddedSingleInputPropsInterface{
    formValue: FormValue,
    record: Record | undefined,
    model: EmbeddedSingleModel
}


interface EmbeddedSingleInputPropsInterface extends InputPropsInterface{
    model:EmbeddedSingleModel
}

export class EmbeddedSingleSetInputFieldProps implements EmbeddedSingleInputPropsInterface{
    record: Record | undefined
    formValue: FormValue
    model: EmbeddedSingleModel
    errors: Errors;
    lockedFormValue: FormValue;
    partialSubmitHandler: (e:any) => Promise<any>
    submitHandler: (e:any) => Promise<any>
    referencesMap: Map<string, any>;
    refreshReferencesMap: ()=>void
    setFormValue: React.Dispatch<React.SetStateAction<FormValue>>
    refresh?: ()=>void

    constructor(props: EmbeddedSingleSetInputFieldPropsInterface) {
        const {formValue, model, errors,lockedFormValue, partialSubmitHandler, referencesMap, refreshReferencesMap, submitHandler, record, setFormValue, refresh} = props
        this.formValue = formValue;
        this.model = model;
        this.errors = errors;
        this.formValue = formValue;
        this.lockedFormValue = lockedFormValue;
        this.model = model;
        this.partialSubmitHandler = partialSubmitHandler;
        this.submitHandler = submitHandler;
        this.referencesMap = referencesMap;
        this.refreshReferencesMap = refreshReferencesMap;
        this.record = record;
        this.setFormValue = setFormValue
        this.refresh = refresh
    }

}


/**
 *  PARAMETER FOR SET INPUT FIELD - EMBEDDED MULTIPLE
 */

interface EmbeddedMultipleSetInputFieldPropsInterface extends InputPropsInterface{
    formValue: FormValue,
    record: Map<number, Record>
    model: EmbeddedMultipleModel
    errors: Errors;
    lockedFormValue: FormValue;
    partialSubmitHandler: (e:any) => Promise<any>
    submitHandler: (e:any) => Promise<any>
    referencesMap: Map<string, any>;
    refreshReferencesMap: ()=>void
    setFormValue: React.Dispatch<React.SetStateAction<FormValue>>
    refresh?: ()=>void
}

export class EmbeddedMultipleSetInputFieldProps implements EmbeddedMultipleSetInputFieldPropsInterface{
    formValue: FormValue
    record: Map<number, Record>
    model: EmbeddedMultipleModel
    errors: Errors;
    lockedFormValue: FormValue;
    partialSubmitHandler: (e:any) => Promise<any>
    submitHandler: (e:any) => Promise<any>
    referencesMap: Map<string, any>;
    refreshReferencesMap: ()=>void
    setFormValue: React.Dispatch<React.SetStateAction<FormValue>>
    refresh?: ()=>void
    inputElement: any

    constructor(props: EmbeddedMultipleSetInputFieldPropsInterface) {
        const {formValue, model, errors,lockedFormValue, partialSubmitHandler, referencesMap, refreshReferencesMap, submitHandler, record, setFormValue, refresh, inputElement} = props
        this.formValue = formValue;
        this.model = model;
        this.errors = errors;
        this.formValue = formValue;
        this.lockedFormValue = lockedFormValue;
        this.model = model;
        this.partialSubmitHandler = partialSubmitHandler;
        this.submitHandler = submitHandler;
        this.referencesMap = referencesMap;
        this.refreshReferencesMap = refreshReferencesMap;
        this.record = record;
        this.setFormValue = setFormValue
        this.refresh = refresh
        this.inputElement = inputElement;
    }
}