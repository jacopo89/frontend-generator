import {SinglePropertyModel} from "./SinglePropertyModel";
import MultipleFileShow from "../../generators/fields/outputs/MultipleFileShow";
import React from "react";
import {InputOnChangeHandler} from "../PropertyModel";
import {Record} from "../Record";
import {SingleSetInputFieldProps} from "../models/SetInputFieldProps";
import {ImagesGrid} from "../../generators/forms/inputs/Files/ImagesGrid";

export class MultipleImageModel extends SinglePropertyModel{
    setInputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        const {formValue, setForm, errors} = props;
        // @ts-ignore
        const propsWithModel = {...props, model:this, resourceId:formValue.id, modelResourceName: this.modelResourceName, onChange:this.getInputOnChangeHandler({formValue, setForm}), files:formValue[this.id]}

        // @ts-ignore
        return ImagesGrid(propsWithModel);
    }

    getInputOnChangeHandler({formValue, setForm}: InputOnChangeHandler): (vars:any)=>void {
        return (vars:any) => {
            const [name, value] = vars;
            setForm( formValue.set(name, value));
        }
    }

    setOutputField(props: any): React.ReactElement<any, any> | null {
        return MultipleFileShow({...props, record: props.record ?? new Map()});
    }

    getRecord(jsonValue: any): any {
        return Record.createFromJsonNoModel(jsonValue)
    }
}
