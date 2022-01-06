import {SinglePropertyModel} from "./SinglePropertyModel";
import SingleFileInput from "../../generators/forms/inputs/SingleFileInput";
import React from "react";
import SingleFileShow from "../../generators/fields/outputs/SingleFileShow";
import {InputOnChangeHandler} from "../PropertyModel";
import {Record} from "../Record";
import {SingleSetInputFieldProps} from "../models/SetInputFieldProps";

export class SingleFileModel extends SinglePropertyModel{
    setInputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        const {formValue, inputHandler} = props;
        // @ts-ignore
        const propsWithModel = {...props, model:this,  file:formValue[this.id], onChange:inputHandler}
        // @ts-ignore
        return SingleFileInput(propsWithModel);

    }

    getInputOnChangeHandler({formValue, setFormValue}: InputOnChangeHandler): any {
        return (vars:any) => {
            const [name, value] = vars;
            setFormValue( formValue.set(name, value));
        }
    }

    setOutputField(props: any): React.ReactElement<any, any> | null {
        return SingleFileShow(props);
    }

    getRecord(jsonValue: any): any {
        return Record.createFromJsonNoModel(jsonValue)
    }
}
