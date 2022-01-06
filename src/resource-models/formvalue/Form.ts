import _ from 'lodash';
import {Record} from "../Record";
import {Model} from "../Model";
import {REFERENCE} from "../../generators/forms/inputs/InputTypes";

export class Form extends Object{

    /**
     * Create a FormValue from a valid Record.
     * @param record
     * @param model
     */
    static createFromRecord(record:Record, model: Model): Form{
        const formValue = new Form();

        Object.entries(record).forEach(([key, value]) =>{

            try{
                const propertyModel = model.getProperty(key);
                if(propertyModel.type===REFERENCE){
                    // @ts-ignore
                    if( typeof value === "object"){
                        // @ts-ignore
                        formValue[key] =  propertyModel.getFormValue(value["id"]);
                    }else{
                        // @ts-ignore
                        formValue[key] =  propertyModel.getFormValue(value);
                    }
                }else{
                    // @ts-ignore
                    formValue[key] =  propertyModel.getFormValue(value);
                }

            }catch(error){

            }
        } )
        return formValue;
    }

    static createFromRecordNoModel(record:Record){
        const formValue = new Form();
        Object.keys(record).forEach(key => {
            // @ts-ignore
            const value = record[key];
            if (value instanceof Record) {
                // @ts-ignore
                formValue[key] = Form.createFromRecordNoModel(value);
            } else if (value instanceof Map) {
                const map = new Map();
                const nestedEntries = Array.from(value.entries());
                nestedEntries.forEach(([nestedKey, nestedValue], nestedIndex) => {
                    map.set(nestedKey, Form.createFromRecordNoModel(nestedValue))
                })
                // @ts-ignore
                formValue[key] = map;
            } else {
                // @ts-ignore
                formValue[key] = record[key];
            }
        })
        return formValue;
    }

    updateFormValue(name:string, value:any):Form{
        const split = _.split(name, ".");
        const current = split.shift();
            if (split.length!==0) {

                // @ts-ignore
                const currentFormValue = this.get(current);
                const result = currentFormValue.updateFormValue(split.join("."), value)
                const newFormValue = _.cloneDeep(this)
                // @ts-ignore
                newFormValue.set(current, result )
                return newFormValue;
            }else{
                const newFormValue = _.cloneDeep(this)
                // @ts-ignore
                newFormValue[current] = value;
                return newFormValue
            }


    }
    getPropertyFormValue(name:string): any{
        const split = _.split(name, ".");
        split.pop();
        const reducerModel = (accumulator:any, value:string):any |undefined => {
            if(accumulator instanceof Form) {
                // @ts-ignore
                const accumulatorElement :Form = accumulator[value];
                return accumulatorElement
            }else if(accumulator instanceof Map){
            }else
                return accumulator;
        }
        // @ts-ignore
        return split.reduce(reducerModel, this);
    }

    static toJson(formValue: any): object{
        const json = {}
        Object.entries(formValue).forEach(([key, value])=>{
            if(value instanceof Form){
                // @ts-ignore
                json[key] = Form.toJson(value)
            }else if(value instanceof Map){
                const nestedEntries = Array.from(value.values());
                // @ts-ignore
                json[key] = nestedEntries.map((nestedValue, nestedIndex) => Form.toJson(nestedValue))
            }else {
                // @ts-ignore
                json[key] = value;
            }
        })
        return json;

    }

    set(name:string, value:any):Form{
        Form.defineProperty(this, name, {
            value: value,
            writable: true,
            enumerable:true
        });

        return this;
    }

    has(name:string):boolean{
        return Form.keys(this).includes(name);
    }

}
