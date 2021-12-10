import {SinglePropertyModel} from "./SinglePropertyModel";
import MultipleFileShow from "../../generators/fields/outputs/MultipleFileShow";
import React from "react";
import {InputOnChangeHandler} from "../PropertyModel";
import {Record} from "../Record";
import {SingleSetInputFieldProps} from "../models/SetInputFieldProps";
import {FilesList} from "../../generators/forms/inputs/Files/FilesList";

export class MultipleFileModel extends SinglePropertyModel{
    setInputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        const {formValue, setFormValue, errors} = props;
        // @ts-ignore
        const propsWithModel = {...props, model:this, resourceId:formValue.id, modelResourceName: this.modelResourceName, onChange:this.getInputOnChangeHandler({formValue, setFormValue}), files:formValue[this.id]}

        // @ts-ignore
        return FilesList(propsWithModel);
    }

    getInputOnChangeHandler({formValue, setFormValue}: InputOnChangeHandler): (vars:any)=>void {
        return (vars:any) => {
            const [name, value] = vars;
            setFormValue( formValue.updateFormValue(name, value));
        }
    }

    setOutputField(props: any): React.ReactElement<any, any> | null {
        return MultipleFileShow({...props, record: props.record ?? new Map()});
    }

    getRecord(jsonValue: any): any {
        return Record.createFromJsonNoModel(jsonValue)
    }
}
