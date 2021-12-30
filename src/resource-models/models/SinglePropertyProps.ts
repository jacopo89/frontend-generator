import {Record} from "../Record";
import {Form} from "../formvalue/Form";
import React from "react";
import {Errors} from "../../generators/errors/Errors";
import {PropertyModel} from "../PropertyModel";

interface Props{
    model: PropertyModel,
    record: Record
    formValue: Form
    setFormValue:  React.Dispatch<React.SetStateAction<Form>>,
    lockedFormValue: Form,
    errors: Errors,
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    referencesMap: Map<string, any>;
    refreshReferencesMap:()=>void;
    showLabel?: boolean;
}

export class SinglePropertyProps{
    model: PropertyModel
    record: Record
    formValue: Form
    setFormValue:  React.Dispatch<React.SetStateAction<Form>>
    lockedFormValue: Form
    errors: Errors
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    referencesMap: Map<string, any>;
    refreshReferencesMap:()=>void;
    showlabel: boolean;

    constructor({model, record, formValue, setFormValue, lockedFormValue, errors, submitHandler, partialSubmitHandler, referencesMap, refreshReferencesMap, showLabel=true}:Props) {
        this.model = model;
        this.record = record;
        this.formValue = formValue;
        this.setFormValue = setFormValue;
        this.lockedFormValue = lockedFormValue;
        this.errors = errors;
        this.submitHandler = submitHandler;
        this.partialSubmitHandler = partialSubmitHandler;
        this.referencesMap = referencesMap;
        this.refreshReferencesMap = refreshReferencesMap;
        this.showlabel = showLabel;
    }
}
