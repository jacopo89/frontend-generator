import React, {DetailedReactHTMLElement} from "react";
import {Form} from "../formvalue/Form";
import {SinglePropertyModel} from "../propertyModels/SinglePropertyModel";
import _ from "lodash";
import {
    EmbeddedMultipleSetInputFieldProps,
    EmbeddedSingleSetInputFieldProps,
    SingleSetInputFieldProps
} from "./SetInputFieldProps";
import {Record} from "../Record";
import {EmbeddedMultipleModel} from "../propertyModels/EmbeddedMultipleModel";
import {Errors} from "../../generators/errors/Errors";
import {PropertyModelInputInterface, PropertyModelInputProps} from "./PropertyModelInputProps";
import {EmbeddedSingleModel} from "../propertyModels/EmbeddedSingleModel";

/**
 * INPUT PROPS
 */

export interface InputPropsInterface extends PropertyModelInputInterface{
    form?:React.DetailedReactHTMLElement<any, any>
    inputElement?: DetailedReactHTMLElement<any, any>
    refresh: () => void,
    showLabel?: boolean
}

export class InputProps extends PropertyModelInputProps{
    form?: React.DetailedReactHTMLElement<any, any>
    inputElement?: DetailedReactHTMLElement<any, any>
    refresh: () => void

    constructor(props:InputPropsInterface) {
        debugger;
        super(props);
        this.refresh = props.refresh;
    }
}

/**
 *  SINGLE INPUT PROPS
 */

export interface SingleInputPropsInterface extends InputPropsInterface{
    inputHandler: (vars:any) => void,
    value: any,
    label:string
    formValue: Form
}

export class SingleInputProps extends InputProps{
    formValue: Form;
    model: SinglePropertyModel;

    constructor(props:SingleInputPropsInterface) {
        console.log("constructing input props");
        super(props);
        const {formValue, model}= props
        this.formValue = formValue
        this.model = model;
    }

    handleForSet(){
        const formValue = this.formValue;
        const record = this.record;
        const setFormValue = this.setFormValue
        const {hasError, errorMessage} = this.model.manipulateErrors(this.errors ?? new Errors([]));
        const label = _.startCase(this.model.label)
        const inputHandler = this.model.getInputOnChangeHandler({formValue,setFormValue});
        // @ts-ignore
        const value = (formValue) ? formValue[this.model.id] : undefined;
        // @ts-ignore
        const propertyRecord = (record) ? record[this.model.id] : undefined;
        return new SingleSetInputFieldProps({...this, inputHandler, label, hasError, errorMessage, value, propertyRecord})
    }

}


/**
 * EMBEDDED SINGLE INPUT PROPS
 */
export interface EmbeddedSingleInputPropsInterface extends InputPropsInterface{
    formValue: Form,
    model: EmbeddedSingleModel;
}

export class EmbeddedSingleInputProps extends InputProps{
    formValue: Form;
    record: Record|undefined;
    model: EmbeddedSingleModel;

    constructor(props:EmbeddedSingleInputPropsInterface) {
        super(props);
        const {formValue, model}= props
        this.formValue = formValue
        this.model = model;
    }

    handleForSet(){
        const nestedErrors = this.model.manipulateErrors(this.errors);
        const label = _.startCase(this.model.label)
        return new EmbeddedSingleSetInputFieldProps({...this, label, errors:nestedErrors})
    }

}


/**
 * EMBEDDED MULTIPLE INPUT PROPS
 *
 * */

export interface EmbeddedMultipleInputPropsInterface extends InputPropsInterface{
    formValue: Form
    record: Map<number, Record>
    model: EmbeddedMultipleModel
}

export class EmbeddedMultipleInputProps extends InputProps{
    formValue: Form
    record: Map<number, Record>;
    model: EmbeddedMultipleModel;

    constructor(props:EmbeddedMultipleInputPropsInterface) {
        super(props);
        const {formValue, model, record, recordValue}= props
        this.formValue = formValue
        this.model = model;
        this.record = record
        this.recordValue= recordValue
    }

    handleForSet(){
        const nestedErrors = this.model.manipulateErrors(this.errors);
        const label = _.startCase(this.model.label)
        return new EmbeddedMultipleSetInputFieldProps({...this, errors:nestedErrors, label})
    }

}


