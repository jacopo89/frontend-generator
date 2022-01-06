import {Record} from "../Record";
import {Form} from "../formvalue/Form";
import React from "react";
import {Errors} from "../../generators/errors/Errors";
import _ from "lodash";
import {PropertyModel} from "../PropertyModel";
import {ModelInputInterface} from "../interface/ModelInputInterface";

export interface PropertyPropsInterface{
    model: PropertyModel,
    record:any,
    recordValue: Record | Map<number, Record> | undefined
    formValue: Form | Map<number, Form>,
    form: Form,
    setFormValue:  React.Dispatch<React.SetStateAction<Form>>,
    lockedFormValue: Form,
    errors: Errors,
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    loading: boolean;
    referencesMap: Map<string, any>;
    refreshReferencesMap:()=>void;
    showLabel?: boolean;
    refresh:()=> void,
}

export class PropertyModelInputProps{
    model: PropertyModel
    record: Record | Map<number, Record> | undefined
    recordValue: Record | Map<number, Record> | undefined
    formValue: Form | Map<number, Form>
    form: Form
    setFormValue:  React.Dispatch<React.SetStateAction<Form>>
    lockedFormValue: Form
    errors: Errors
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    loading: boolean;
    referencesMap: Map<string, any>;
    refreshReferencesMap:()=>void;
    refresh:()=>void
    showlabel?: boolean;

    constructor({model, record, form, recordValue, formValue, setFormValue, lockedFormValue, errors, submitHandler, partialSubmitHandler,loading, referencesMap, refreshReferencesMap, showLabel=true, refresh}:PropertyPropsInterface) {
        this.model = model;
        this.record = record;
        this.form = form;
        this.recordValue = recordValue;
        this.formValue = formValue;
        this.setFormValue = setFormValue;
        this.lockedFormValue = lockedFormValue;
        this.errors = errors;
        this.submitHandler = submitHandler;
        this.loading = loading;
        this.partialSubmitHandler = partialSubmitHandler;
        this.referencesMap = referencesMap;
        this.refreshReferencesMap = refreshReferencesMap;
        this.showlabel = showLabel;
        this.refresh = refresh;
    }

    static createFromFieldProps(requestedName:string, props:ModelInputInterface): PropertyModelInputProps{
        const {formValue, record, setFormValue, model, form} = props
        const localFormValue = (formvalue:any)=>{
            const split = _.split(requestedName, ".");
            split.pop();
            const reqName = split.join(".");
            const newFormValue = split.length===0 ? formvalue : formValue.updateFormValue(reqName, formvalue);
            setFormValue(newFormValue)
        };

        const propertyProps = new PropertyModelInputProps({...props,form, model:model.getProperty(requestedName), recordValue: record ?  record.getPropertyRecord(requestedName) : undefined })
        propertyProps.formValue = (formValue) ? formValue.getPropertyFormValue(requestedName) : undefined;
        propertyProps.record = record ?  record.getPropertyRecord(requestedName) : undefined;
        propertyProps.setFormValue = localFormValue;

        return propertyProps;

    }
}

export interface PropertyModelInputInterface extends PropertyModelInputProps{}
