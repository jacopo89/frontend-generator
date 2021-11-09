import _ from 'lodash';
import { Record } from "../Record";
import { REFERENCE } from "../../generators/forms/inputs/InputTypes";
export class FormValue extends Object {
    /**
     * Create a FormValue from a valid Record.
     * @param record
     * @param model
     */
    static createFromRecord(record, model) {
        const formValue = new FormValue();
        Object.entries(record).forEach(([key, value]) => {
            try {
                const propertyModel = model.getProperty(key);
                //if(propertyModel.write){
                if (propertyModel.type === REFERENCE) {
                    // @ts-ignore
                    if (typeof value === "object") {
                        // @ts-ignore
                        formValue[key] = propertyModel.getFormValue(value["id"]);
                    }
                    else {
                        // @ts-ignore
                        formValue[key] = propertyModel.getFormValue(value);
                    }
                }
                else {
                    // @ts-ignore
                    formValue[key] = propertyModel.getFormValue(value);
                }
                //}
            }
            catch (error) {
            }
        });
        return formValue;
    }
    static createFromRecordNoModel(record) {
        const formValue = new FormValue();
        Object.keys(record).forEach(key => {
            // @ts-ignore
            const value = record[key];
            if (value instanceof Record) {
                // @ts-ignore
                formValue[key] = FormValue.createFromRecordNoModel(value);
            }
            else if (value instanceof Map) {
                const map = new Map();
                const nestedEntries = Array.from(value.entries());
                nestedEntries.forEach(([nestedKey, nestedValue], nestedIndex) => {
                    map.set(nestedKey, FormValue.createFromRecordNoModel(nestedValue));
                });
                // @ts-ignore
                formValue[key] = map;
            }
            else {
                // @ts-ignore
                formValue[key] = record[key];
            }
        });
        return formValue;
    }
    updateFormValue(name, value) {
        const split = _.split(name, ".");
        const current = split.shift();
        if (split.length !== 0) {
            // @ts-ignore
            const currentFormValue = this.get(current);
            const result = currentFormValue.updateFormValue(split.join("."), value);
            const newFormValue = _.cloneDeep(this);
            // @ts-ignore
            newFormValue.set(current, result);
            return newFormValue;
        }
        else {
            const newFormValue = _.cloneDeep(this);
            // @ts-ignore
            newFormValue[current] = value;
            return newFormValue;
        }
    }
    getPropertyFormValue(name) {
        const split = _.split(name, ".");
        split.pop();
        const reducerModel = (accumulator, value) => {
            if (accumulator instanceof FormValue) {
                // @ts-ignore
                const accumulatorElement = accumulator[value];
                return accumulatorElement;
            }
            else if (accumulator instanceof Map) {
            }
            else
                return accumulator;
        };
        // @ts-ignore
        return split.reduce(reducerModel, this);
    }
    static toJson(formValue) {
        const json = {};
        Object.entries(formValue).forEach(([key, value]) => {
            if (value instanceof FormValue) {
                // @ts-ignore
                json[key] = FormValue.toJson(value);
            }
            else if (value instanceof Map) {
                const nestedEntries = Array.from(value.values());
                // @ts-ignore
                json[key] = nestedEntries.map((nestedValue, nestedIndex) => FormValue.toJson(nestedValue));
            }
            else {
                // @ts-ignore
                json[key] = value;
            }
        });
        return json;
    }
    set(name, value) {
        FormValue.defineProperty(this, name, {
            value: value,
            writable: true,
            enumerable: true
        });
        return this;
    }
    has(name) {
        return FormValue.keys(this).includes(name);
    }
}
