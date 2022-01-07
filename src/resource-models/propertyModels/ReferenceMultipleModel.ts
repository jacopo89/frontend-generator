import {PropertyModelCore} from "../PropertyModelCore";
import React from "react";
import {SinglePropertyModel} from "./SinglePropertyModel";
import {InputOnChangeHandler} from "../PropertyModel";
import {Record} from "../Record";
import {SingleSetInputFieldProps} from "../models/SetInputFieldProps";
import {Resource} from "../Resource";
import {PropertyFieldConfiguration} from "../configurations/PropertyFieldConfiguration";
import ReferenceMultipleInput from "../../generators/forms/inputs/ReferenceMultipleInput";

interface ReferenceMultpleInputFieldProps extends SingleSetInputFieldProps{
    value: any[]
}


export class ReferenceMultipleModel extends SinglePropertyModel{
    resourceName:string;
    resource:Resource;

    getResource(): Resource {
        return this.resource;
        throw new Error(`Accessing inexistent resource for ${this.resourceName}`);
    }

    constructor(id:string, other:PropertyModelCore) {
        super(id, other);
        this.resourceName = other.resourceName;
        this.resource = (other.resource instanceof Resource) ? other.resource : new Resource(other.resource);
    }

    setInputField(props: ReferenceMultpleInputFieldProps, configuration?:PropertyFieldConfiguration): React.ReactElement<any, any> | null {
        const {inputHandler, value, formValue} = props;
        const dependencies = configuration?.dependencies ?? [];

        // @ts-ignore

        const propsWithModel = Object.assign(Object.assign({}, props), {model:this,onChange: inputHandler, value: value?? [], dependencies, formValue });
        return ReferenceMultipleInput(propsWithModel)
    }

    getInputOnChangeHandler({formValue, setForm}:InputOnChangeHandler){
        return (vars:any)=>{
            const [name, value] = vars; //TODO CHANGE
            setForm( formValue.set(name, value));
        }
    }

    setOutputField(props: SingleSetInputFieldProps): React.ReactElement<any, any> | null {
        return React.createElement("div")
        //return ReferenceMultipleShow(props); //TODO
    }

    getRecord(record: any): any{
        if(record){
            if(record instanceof Map){
                return record;
            }else if(typeof record === "object"){
                /*console.log("it is an object")*/
                return Record.createFromJsonNoModel(record);
            }else if(typeof record ==="number"){
                /*console.log("it is a number")*/
                return record;
            }
            else{
                /*console.log("it's something else")*/
                return parseInt(record.substring(record.lastIndexOf("/")+1, record.length))
            }
        }
    }

    getFormValue(value:Map<number,string>){
        return Array.from(value.values()).map(value => parseInt(value.split("/").slice(-1)[0]));
    }

    getJsonFormValue(value: Map<string, any>|number){
        if(value instanceof Map){
            return value.get("id");
        } else{
            return value;
        }
    }
}

