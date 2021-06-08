import _ from 'lodash';
import {Record} from "../Record";
import {Model} from "../Model";

export class FormValue extends Object{

    /**
     * Create a FormValue from a valid Record.
     * @param record
     * @param model
     */
    static createFromRecord(record:Record, model: Model): FormValue{
        const formValue = new FormValue();

        Object.keys(record).forEach(key =>{

            try{
                const propertyModel = model.getProperty(key);
                // @ts-ignore
                formValue[key] =  propertyModel.getFormValue(record[key]);
            }catch(error){

            }
        } )
        return formValue;
    }

    static createFromRecordNoModel(record:Record){
        const formValue = new FormValue();
        Object.keys(record).forEach(key => {
            // @ts-ignore
            const value = record[key];
            if (value instanceof Record) {
                // @ts-ignore
                formValue[key] = FormValue.createFromRecordNoModel(value);
            } else if (value instanceof Map) {
                const map = new Map();
                const nestedEntries = Array.from(value.entries());
                nestedEntries.forEach(([nestedKey, nestedValue], nestedIndex) => {
                    map.set(nestedKey, FormValue.createFromRecordNoModel(nestedValue))
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

    updateFormValue(name:string, value:any):FormValue{
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
            if(accumulator instanceof FormValue) {
                // @ts-ignore
                const accumulatorElement :FormValue = accumulator[value];
                return accumulatorElement
            }else if(accumulator instanceof Map){
            }else
                return accumulator;
        }
        // @ts-ignore
        return split.reduce(reducerModel, this);
    }

    toJson(): object{
        const json = {}
        Object.entries(this).forEach(([key, value])=>{
            if(value instanceof FormValue){
                // @ts-ignore
                json[key] = value.toJson()
            }else if(value instanceof Map){
                const nestedEntries = Array.from(value.values());
                // @ts-ignore
                json[key] = nestedEntries.map((nestedValue, nestedIndex) => nestedValue.toJson())
            }else {
                // @ts-ignore
                json[key] = value;
            }
        })
        return json;

    }

    set(name:string, value:any):FormValue{
        FormValue.defineProperty(this, name, {
            value: value,
            writable: true,
            enumerable:true
        });

        return this;
    }

    has(name:string):boolean{
        return FormValue.keys(this).includes(name);
    }

}