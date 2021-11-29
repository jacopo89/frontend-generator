import React from "react";
import { SinglePropertyModel } from "./SinglePropertyModel";
import { Record } from "../Record";
import { Resource } from "../Resource";
import ReferenceMultipleInput from "../../generators/forms/inputs/ReferenceMultipleInput";
export class ReferenceMultipleModel extends SinglePropertyModel {
    constructor(id, other) {
        super(id, other);
        this.resourceName = other.resourceName;
        this.resource = (other.resource instanceof Resource) ? other.resource : new Resource(other.resource);
    }
    getResource() {
        return this.resource;
        throw new Error(`Accessing inexistent resource for ${this.resourceName}`);
    }
    setInputField(props, configuration) {
        var _a;
        const { inputHandler, value, formValue } = props;
        const dependencies = (_a = configuration === null || configuration === void 0 ? void 0 : configuration.dependencies) !== null && _a !== void 0 ? _a : [];
        // @ts-ignore
        const propsWithModel = Object.assign(Object.assign({}, props), { model: this, onChange: inputHandler, value: value !== null && value !== void 0 ? value : [], dependencies, formValue });
        return ReferenceMultipleInput(propsWithModel);
    }
    getInputOnChangeHandler({ formValue, setFormValue }) {
        return (vars) => {
            const [name, value] = vars; //TODO CHANGE
            setFormValue(formValue.updateFormValue(name, value));
        };
    }
    setOutputField(props) {
        return React.createElement("div");
        //return ReferenceMultipleShow(props); //TODO
    }
    getRecord(record) {
        if (record) {
            if (record instanceof Map) {
                return record;
            }
            else if (typeof record === "object") {
                /*console.log("it is an object")*/
                return Record.createFromJsonNoModel(record);
            }
            else if (typeof record === "number") {
                /*console.log("it is a number")*/
                return record;
            }
            else {
                /*console.log("it's something else")*/
                return parseInt(record.substring(record.lastIndexOf("/") + 1, record.length));
            }
        }
    }
    getFormValue(value) {
        return Array.from(value.values()).map(value => parseInt(value.split("/").slice(-1)[0]));
    }
    getJsonFormValue(value) {
        if (value instanceof Map) {
            return value.get("id");
        }
        else {
            return value;
        }
    }
}
