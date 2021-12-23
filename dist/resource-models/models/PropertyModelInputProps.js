import _ from "lodash";
export class PropertyModelInputProps {
    constructor({ model, record, recordValue, formValue, setFormValue, lockedFormValue, errors, submitHandler, partialSubmitHandler, loading, referencesMap, refreshReferencesMap, showLabel = true, refresh }) {
        this.model = model;
        this.record = record;
        this.recordValue = recordValue;
        this.formValue = formValue;
        this.setFormValue = setFormValue;
        this.lockedFormValue = lockedFormValue;
        this.errors = errors;
        this.submitHandler = submitHandler;
        this.loading = loading;
        this.partialSubmitHandler = partialSubmitHandler;
        this.referencesMap = referencesMap;
        this.refreshReferencesMap = refreshReferencesMap;
        this.showlabel = showLabel;
        this.refresh = refresh;
    }
    static createFromFieldProps(requestedName, props) {
        const { formValue, record, setFormValue, model } = props;
        const localFormValue = (formvalue) => {
            const split = _.split(requestedName, ".");
            split.pop();
            const reqName = split.join(".");
            const newFormValue = split.length === 0 ? formvalue : formValue.updateFormValue(reqName, formvalue);
            setFormValue(newFormValue);
        };
        const propertyProps = new PropertyModelInputProps(Object.assign(Object.assign({}, props), { model: model.getProperty(requestedName), recordValue: record ? record.getPropertyRecord(requestedName) : undefined }));
        propertyProps.formValue = (formValue) ? formValue.getPropertyFormValue(requestedName) : undefined;
        propertyProps.record = record ? record.getPropertyRecord(requestedName) : undefined;
        propertyProps.setFormValue = localFormValue;
        return propertyProps;
    }
}
