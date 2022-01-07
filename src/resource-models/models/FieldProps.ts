import {Record} from "../Record";
import {Form} from "../formvalue/Form";
import React from "react";
import {Errors} from "../../generators/errors/Errors";
import {Model} from "../Model";

interface Props{
    model: Model,
    record: Record,
    formValue: Form,
    setForm:  React.Dispatch<React.SetStateAction<Form>>,
    lockedFormValue: Form,
    errors: Errors,
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    referencesMap: Map<string, any>;
    refreshReferencesMap:()=>void;
    refresh: ()=>void;
}

export class FieldProps{
    model: Model
    record: Record
    formValue: Form
    setForm:  React.Dispatch<React.SetStateAction<Form>>
    lockedFormValue: Form
    errors: Errors
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    referencesMap: Map<string, any>;
    refreshReferencesMap:()=>void;
    refresh: ()=>void;

    constructor({model, record, formValue, setForm, lockedFormValue, errors, submitHandler, partialSubmitHandler, referencesMap, refreshReferencesMap, refresh}:Props) {
        this.model = model;
        this.record = record;
        this.formValue = formValue;
        this.setForm = setForm;
        this.lockedFormValue = lockedFormValue;
        this.errors = errors;
        this.submitHandler = submitHandler;
        this.partialSubmitHandler = partialSubmitHandler;
        this.referencesMap = referencesMap;
        this.refreshReferencesMap = refreshReferencesMap;
        this.refresh = refresh;
    }

}
