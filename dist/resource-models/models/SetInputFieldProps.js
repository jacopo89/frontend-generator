export class SingleSetInputFieldProps {
    constructor(props) {
        const { hasError, errorMessage, value, inputHandler, errors, formValue, label, lockedFormValue, model, partialSubmitHandler, submitHandler, record, recordValue, referencesMap, refreshReferencesMap, setFormValue, propertyRecord, refresh, loading } = props;
        this.hasError = hasError;
        this.errorMessage = errorMessage;
        this.loading = loading;
        this.value = value;
        this.inputHandler = inputHandler;
        this.errors = errors;
        this.formValue = formValue;
        this.label = label;
        this.lockedFormValue = lockedFormValue;
        this.model = model;
        this.partialSubmitHandler = partialSubmitHandler;
        this.submitHandler = submitHandler;
        this.referencesMap = referencesMap;
        this.refreshReferencesMap = refreshReferencesMap;
        this.record = record;
        this.recordValue = recordValue;
        this.setFormValue = setFormValue;
        this.refresh = refresh;
        this.propertyRecord = propertyRecord;
    }
}
export class EmbeddedSingleSetInputFieldProps {
    constructor(props) {
        const { formValue, model, errors, lockedFormValue, partialSubmitHandler, referencesMap, refreshReferencesMap, submitHandler, loading, record, recordValue, setFormValue, refresh } = props;
        this.formValue = formValue;
        this.model = model;
        this.loading = loading;
        this.errors = errors;
        this.formValue = formValue;
        this.lockedFormValue = lockedFormValue;
        this.model = model;
        this.partialSubmitHandler = partialSubmitHandler;
        this.submitHandler = submitHandler;
        this.referencesMap = referencesMap;
        this.refreshReferencesMap = refreshReferencesMap;
        this.record = record;
        this.recordValue = recordValue;
        this.setFormValue = setFormValue;
        this.refresh = refresh;
    }
}
export class EmbeddedMultipleSetInputFieldProps {
    constructor(props) {
        const { formValue, model, errors, lockedFormValue, partialSubmitHandler, loading, referencesMap, refreshReferencesMap, submitHandler, record, recordValue, setFormValue, refresh, inputElement } = props;
        this.formValue = formValue;
        this.model = model;
        this.errors = errors;
        this.formValue = formValue;
        this.lockedFormValue = lockedFormValue;
        this.model = model;
        this.partialSubmitHandler = partialSubmitHandler;
        this.loading = loading;
        this.submitHandler = submitHandler;
        this.referencesMap = referencesMap;
        this.refreshReferencesMap = refreshReferencesMap;
        this.record = record;
        this.recordValue = recordValue;
        this.setFormValue = setFormValue;
        this.refresh = refresh;
        this.inputElement = inputElement;
    }
}
