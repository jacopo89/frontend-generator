import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { EmbeddedPropertyModel } from "./NestedPropertyModel";
import { IterableFormContent } from "../../generators/forms/IterableFormContent";
import { IterableShowContent } from "../../generators/fields/IterableShowContent";
import { Record } from "../Record";
import { FormValue } from "../formvalue/FormValue";
import { EmbeddedMultipleInputProps } from "../models/InputProps";
import { EmbeddedMultipleSetInputFieldProps } from "../models/SetInputFieldProps";
import { Typography } from "@material-ui/core";
import _ from "lodash";
import { EmbeddedSingleModel } from "./EmbeddedSingleModel";
import { PropertyModelCore } from "../PropertyModelCore";
import { EMBEDDED_SINGLE } from "../../generators/forms/inputs/InputTypes";
export class EmbeddedMultipleModel extends EmbeddedPropertyModel {
    setInputField(props, configuration) {
        const { formValue, inputElement, setFormValue, refreshReferencesMap, referencesMap, errors, partialSubmitHandler, submitHandler, loading, record, refresh } = props;
        const setParentFormValue = (values) => {
            setFormValue(formValue.updateFormValue(props.model.id, values));
        };
        const newErrors = this.manipulateErrors(errors);
        // @ts-ignore
        const formValueArray = (formValue) ? formValue[this.id] : [];
        // @ts-ignore
        const recordMap = (record) ? record : new Map();
        return IterableFormContent({
            model: this.getResource().getModel(),
            resourceName: this.resourceName,
            setParentFormValue: setParentFormValue,
            formContent: configuration === null || configuration === void 0 ? void 0 : configuration.viewElement,
            referencesMap: referencesMap,
            refreshReferencesMap: refreshReferencesMap,
            errors: newErrors,
            formValueArray: formValueArray,
            label: this.label,
            partialSubmitHandler: partialSubmitHandler,
            submitHandler: submitHandler,
            inputElement: configuration === null || configuration === void 0 ? void 0 : configuration.viewElement,
            record: recordMap,
            refresh: refresh,
            loading: loading
        });
    }
    getInputField(props, configuration) {
        const newProps = new EmbeddedMultipleInputProps(props);
        return this.setInputField(newProps.handleForSet(), configuration);
    }
    getInputOnChangeHandler({ formValue, setFormValue }) {
        return function (p1) {
        };
    }
    getOutputField(props, configuration) {
        const { showLabel } = props;
        const newProps = new EmbeddedMultipleSetInputFieldProps(props);
        return _jsxs(_Fragment, { children: [showLabel && _jsx(Typography, { children: _.startCase(this.label) }, void 0), this.setOutputField(newProps, configuration)] }, void 0);
    }
    setOutputField({ record, model, setFormValue, loading, formValue, errors, referencesMap, refreshReferencesMap, refresh, partialSubmitHandler, submitHandler }, configuration) {
        const setParentFormValue = (values) => { setFormValue(formValue.updateFormValue(model.id, values)); };
        const newErrors = this.manipulateErrors(errors);
        // @ts-ignore
        const formValueArray = (formValue) ? formValue[this.id] : [];
        // @ts-ignore
        const recordMap = (record) ? record : new Map();
        return _jsx(_Fragment, { children: IterableShowContent({
                model: this.getResource().getModel(),
                resourceName: this.resourceName,
                setParentFormValue: setParentFormValue,
                formContent: configuration === null || configuration === void 0 ? void 0 : configuration.viewElement,
                referencesMap: referencesMap,
                refreshReferencesMap: refreshReferencesMap,
                errors: newErrors,
                formValueArray: formValueArray,
                label: this.label,
                partialSubmitHandler: partialSubmitHandler,
                submitHandler: submitHandler,
                inputElement: configuration === null || configuration === void 0 ? void 0 : configuration.viewElement,
                showElement: configuration === null || configuration === void 0 ? void 0 : configuration.viewElement,
                record: recordMap,
                refresh: refresh,
                loading: loading
            }) }, void 0);
    }
    getRecord(jsonValue) {
        const map = new Map();
        jsonValue.forEach((element, index) => {
            if (typeof element === "object") {
                map.set(index, Record.createFromJson(element, this.getResource().getModel()));
            }
            else {
                map.set(index, element);
            }
        });
        return map;
    }
    getFormValue(value) {
        const map = new Map();
        const nestedEntries = Array.from(value.entries());
        nestedEntries.forEach(([nestedKey, nestedValue], nestedIndex) => {
            if (typeof nestedValue === "object") {
                map.set(nestedKey, FormValue.createFromRecord(nestedValue, this.getResource().getModel()));
            }
            else {
                map.set(nestedKey, nestedValue);
            }
        });
        return map;
    }
    getEmbeddedSingleModel(id) {
        return new EmbeddedSingleModel(id, new PropertyModelCore({
            type: EMBEDDED_SINGLE,
            resource: this.getResource(),
            label: this.label,
            resourceName: this.resourceName,
            optionText: this.optionText,
            form: this.form
        }));
    }
}
