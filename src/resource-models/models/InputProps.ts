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
import SetInputFieldInterface from "../interface/SetInputFieldInterface";


/**
 *  SINGLE INPUT PROPS
 */

export interface SingleInputPropsInterface extends SetInputFieldInterface{
    formValue: Form
}

export class SingleInputProps extends PropertyModelInputProps{
    formValue: Form;
    model: SinglePropertyModel;

    constructor(props:SingleInputPropsInterface) {
        super(props)

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
export interface EmbeddedSingleInputPropsInterface extends PropertyModelInputInterface{
    formValue: Form,
    model: EmbeddedSingleModel;
}

export class EmbeddedSingleInputProps extends PropertyModelInputProps{
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

export interface EmbeddedMultipleInputPropsInterface extends PropertyModelInputInterface{
    formValue: Form,
    record: Map<number, Record>
    model: EmbeddedMultipleModel
    showLabel: boolean
}

export class EmbeddedMultipleInputProps extends PropertyModelInputProps{
    formValue: Form
    record: Map<number, Record>;
    model: EmbeddedMultipleModel;

    constructor(props:EmbeddedMultipleInputPropsInterface) {
        super(props);
        const {formValue, model, record, recordValue,form}= props
        this.formValue = formValue
        this.form = form;
        this.model = model;
        this.record = record
        this.recordValue= recordValue
    }

    handleForSet(){
        const nestedErrors = this.model.manipulateErrors(this.errors);
        const label = _.startCase(this.model.label)
        // @ts-ignore
        return new EmbeddedMultipleSetInputFieldProps({...this, errors:nestedErrors, label})
    }

}


