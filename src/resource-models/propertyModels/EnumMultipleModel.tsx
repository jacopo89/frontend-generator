import {SinglePropertyModel} from "./SinglePropertyModel";
import ChipGenerator from "../../generators/fields/outputs/chips/chipGenerator";
import React from "react";
import {InputOnChangeHandler, Option} from "../PropertyModel";
import {Record} from "../Record";
import ButtonsHorizontalList from "../../rendering/components/buttons/ButtonsHorizontalList";
import {SingleSetInputFieldProps} from "../models/SetInputFieldProps";
import EnumMultipleInput from "../../generators/forms/inputs/EnumMultipleInput";

export interface JsonEnumOption{
    id:number|string,
    label:string
}

interface EnumMultipleInputFields extends SingleSetInputFieldProps{
    options: Option[];
}

export class EnumMultipleModel extends SinglePropertyModel{
    options: Option[];
    colorMap;

    constructor(id:string, others:any) {
        super(id, others);
        this.options = others.options;
        this.colorMap = others.colorMap;
    }
    setInputField(props: EnumMultipleInputFields): React.ReactElement<any, any> | null {
        const {formValue, setFormValue, value} = props;

        const propsWithModel = {...props, model:this, value:value ?? [], onChange:this.getInputOnChangeHandler({formValue, setFormValue})}
        return EnumMultipleInput(propsWithModel)
    }

    getInputOnChangeHandler({formValue, setFormValue}: InputOnChangeHandler): (vars: any) => void {
        return (vars:any) =>{
            const [name, value] = vars;
            setFormValue( formValue.set(name, value));
        }
    }

    setOutputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        const {record} = props;
        const newrecord: any = (record===undefined) ? []: (Array.isArray(record) ? record : Object.keys(record));
        return <ButtonsHorizontalList>
            {
                newrecord.map((singleRecord:any, index:number) =>{
                    return <ChipGenerator key={index} propertyModel={this} propertyRecord={singleRecord} colorMap={this.colorMap}/>
                })
            }
        </ButtonsHorizontalList>

    }

    getRecord(jsonValue: any): any {
        return Record.createFromJsonNoModel(jsonValue)
    }

}
