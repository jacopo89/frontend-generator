import {SinglePropertyModel} from "./SinglePropertyModel";
import {EnumInput, getAutocompleteValuePosition} from "../../generators/forms/inputs/EnumInput";
import {InputOnChangeHandler} from "../PropertyModel";
import {Record} from "../Record";
import ChipGenerator from "../../generators/fields/outputs/chips/chipGenerator";
import React from "react";
import {SingleSetInputFieldProps} from "../models/SetInputFieldProps";

interface EnumSingleInputFields extends SingleSetInputFieldProps{
    options:any,
}

export class EnumSingleModel extends SinglePropertyModel{
    colorMap;
    constructor(id:string, other:any) {
        super(id, other);
        this.options = other.options;
        this.colorMap = other.colorMap;

    }

    setInputField(props: EnumSingleInputFields): React.ReactElement<any, any> | null {
        const {formValue, setForm, errors, value} = props;
        const valuePositionInOptions = (value!==undefined) ? getAutocompleteValuePosition(value, this.options) : -1;
        const propsWithModel = {...props, model:this, inheritedValue:valuePositionInOptions, onChange:this.getInputOnChangeHandler({formValue, setForm})}
        return EnumInput(propsWithModel);
    }

    getInputOnChangeHandler({formValue, setForm}: InputOnChangeHandler): (vars: any) => void {
        return (vars:any) =>{
            const [name, value] = vars;
            setForm( formValue.set(name, value));
        }
    }

    setOutputField(props: SingleSetInputFieldProps) {
        const {value, record} = props
        return <ChipGenerator propertyModel={this} propertyRecord={record} colorMap={this.colorMap}/>
    }

    getRecord(jsonValue: any): any {
        return Record.createFromJsonNoModel(jsonValue)
    }
}
