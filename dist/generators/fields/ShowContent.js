import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { InputProps } from "../../resource-models/models/InputProps";
export const ShowContent = (props) => {
    const { model, refresh, formValue, lockedFormValue, setFormValue, showElement, formContent, referencesMap, refreshReferencesMap, partialSubmitHandler, submitHandler, errors, record, loading } = props;
    if (showElement) {
        return React.cloneElement(showElement, props);
    }
    return _jsx(Grid, Object.assign({ container: true, spacing: 2 }, { children: model === null || model === void 0 ? void 0 : model.properties.map((propertyModel, index) => {
            const props = new InputProps({ model: propertyModel, partialSubmitHandler, submitHandler, referencesMap, refreshReferencesMap, formValue, record: record === null || record === void 0 ? void 0 : record.getPropertyRecord(propertyModel.id), recordValue: record === null || record === void 0 ? void 0 : record.getPropertyRecord(propertyModel.id), lockedFormValue, setFormValue, errors, refresh, showLabel: true, loading: loading });
            const { xs, md, id } = propertyModel;
            return _jsx(Grid, Object.assign({ item: true, xs: xs, md: md }, { children: propertyModel.getOutputField(props) }), index);
        }) }), void 0);
};
