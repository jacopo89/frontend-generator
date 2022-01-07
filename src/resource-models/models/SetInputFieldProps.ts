import {SingleInputPropsInterface} from "./InputProps";
import {Record} from "../Record";
import {Form} from "../formvalue/Form";
import {EmbeddedSingleModel} from "../propertyModels/EmbeddedSingleModel";
import {EmbeddedMultipleModel} from "../propertyModels/EmbeddedMultipleModel";
import {Errors} from "../../generators/errors/Errors";
import {PropertyModel} from "../PropertyModel";
import React from "react";
import {PropertyModelInputInterface} from "./PropertyModelInputProps";

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
    formValue: Form;
    form: Form;
    label: string;
    lockedFormValue: Form;
    model: PropertyModel;
    partialSubmitHandler: (e:any) => Promise<any>
    submitHandler: (e:any) => Promise<any>
    loading: boolean;
    record: Record | Map<number, Record> | undefined;
    recordValue: Record | Map<number, Record> | undefined;
    referencesMap: Map<string, any>;
    refreshReferencesMap: ()=>void
    refresh: () => void
    setForm: React.Dispatch<React.SetStateAction<Form>>

    constructor(props: SingleSetInputFieldPropsInterface) {
        const {hasError, form, errorMessage, value, inputHandler, errors, formValue, label, lockedFormValue, model, partialSubmitHandler, submitHandler, record, recordValue, referencesMap, refreshReferencesMap, setForm, propertyRecord, refresh, loading} = props;
        this.hasError = hasError;
        this.errorMessage = errorMessage;
        this.loading = loading;
        this.value = value;
        this.inputHandler = inputHandler
        this.errors = errors;
        this.formValue = formValue;
        this.form = form;
        this.label = label;
        this.lockedFormValue = lockedFormValue;
        this.model = model;
        this.partialSubmitHandler = partialSubmitHandler;
        this.submitHandler = submitHandler;
        this.referencesMap = referencesMap;
        this.refreshReferencesMap = refreshReferencesMap;
        this.record = record;
        this.recordValue = recordValue;
        this.setForm = setForm
        this.refresh = refresh
        this.propertyRecord = propertyRecord;
    }
}




/**
 *  PARAMETER FOR SET INPUT FIELD - EMBEDDED SINGLE
 */
interface EmbeddedSingleSetInputFieldPropsInterface extends EmbeddedSingleInputPropsInterface{
    formValue: Form,
    record: Record | undefined,
    model: EmbeddedSingleModel
}


interface EmbeddedSingleInputPropsInterface extends PropertyModelInputInterface{
    model:EmbeddedSingleModel
}

export class EmbeddedSingleSetInputFieldProps implements EmbeddedSingleInputPropsInterface{
    record: Record | undefined
    recordValue:Record | Map<number, Record> | undefined
    formValue: Form
    form:Form
    model: EmbeddedSingleModel
    errors: Errors;
    lockedFormValue: Form;
    partialSubmitHandler: (e:any) => Promise<any>
    submitHandler: (e:any) => Promise<any>
    loading: boolean
    referencesMap: Map<string, any>;
    refreshReferencesMap: ()=>void
    setForm: React.Dispatch<React.SetStateAction<Form>>
    refresh: ()=>void

    constructor(props: EmbeddedSingleSetInputFieldPropsInterface) {
        const {formValue, form, model, errors,lockedFormValue, partialSubmitHandler, referencesMap, refreshReferencesMap, submitHandler, loading, record, recordValue, setForm, refresh} = props
        this.formValue = formValue;
        this.model = model;
        this.loading = loading;
        this.errors = errors;
        this.formValue = formValue;
        this.form = form;
        this.lockedFormValue = lockedFormValue;
        this.model = model;
        this.partialSubmitHandler = partialSubmitHandler;
        this.submitHandler = submitHandler;
        this.referencesMap = referencesMap;
        this.refreshReferencesMap = refreshReferencesMap;
        this.record = record;
        this.recordValue = recordValue;
        this.setForm = setForm
        this.refresh = refresh
    }

}


/**
 *  PARAMETER FOR SET INPUT FIELD - EMBEDDED MULTIPLE
 */

interface EmbeddedMultipleSetInputFieldPropsInterface extends PropertyModelInputInterface{
    formValue: Form,
    form: Form,
    record: Map<number, Record>
    recordValue: Record | Map<number, Record> | undefined
    model: EmbeddedMultipleModel
    errors: Errors;
    lockedFormValue: Form;
    partialSubmitHandler: (e:any) => Promise<any>
    submitHandler: (e:any) => Promise<any>
    referencesMap: Map<string, any>;
    refreshReferencesMap: ()=>void
    setForm: React.Dispatch<React.SetStateAction<Form>>
    refresh: ()=>void
}

export class EmbeddedMultipleSetInputFieldProps implements EmbeddedMultipleSetInputFieldPropsInterface{
    formValue: Form
    form: Form
    record: Map<number, Record>
    recordValue: Record | Map<number, Record> | undefined
    model: EmbeddedMultipleModel
    errors: Errors;
    lockedFormValue: Form;
    partialSubmitHandler: (e:any) => Promise<any>
    loading: boolean
    submitHandler: (e:any) => Promise<any>
    referencesMap: Map<string, any>;
    refreshReferencesMap: ()=>void
    setForm: React.Dispatch<React.SetStateAction<Form>>
    refresh: ()=>void

    constructor(props: EmbeddedMultipleSetInputFieldPropsInterface) {
        const {formValue, model,form, errors,lockedFormValue, partialSubmitHandler, loading,referencesMap, refreshReferencesMap, submitHandler, record, recordValue, setForm, refresh} = props
        this.formValue = formValue;
        this.form = form;
        this.model = model;
        this.errors = errors;
        this.lockedFormValue = lockedFormValue;
        this.model = model;
        this.partialSubmitHandler = partialSubmitHandler;
        this.loading= loading;
        this.submitHandler = submitHandler;
        this.referencesMap = referencesMap;
        this.refreshReferencesMap = refreshReferencesMap;
        this.record = record;
        this.recordValue = recordValue;
        this.setForm = setForm
        this.refresh = refresh
    }
}
