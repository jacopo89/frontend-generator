import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { Divider, List, ListItem } from "@material-ui/core";
import { Record } from "../../resource-models/Record";
import { FormValue } from "../../resource-models/formvalue/FormValue";
import { ShowContent } from "./ShowContent";
export const IterableShowContent = ({ model, record, resourceName, setParentFormValue, formContent, referencesMap, refreshReferencesMap, formValueArray, label, partialSubmitHandler, submitHandler, errors, inputElement, refresh, showElement, loading }) => {
    const recordsList = record;
    if (recordsList.size === 0) {
        return _jsx("div", { children: "No elements found" }, void 0);
    }
    if (showElement) {
        return _jsx(List, Object.assign({ style: { width: "100%" } }, { children: Array.from(recordsList.values()).map((singleRecord) => {
                return _jsxs(_Fragment, { children: [_jsx(ListItem, Object.assign({ alignItems: "center" }, { children: React.cloneElement(showElement, Object.assign(Object.assign({}, showElement === null || showElement === void 0 ? void 0 : showElement.props), { record: singleRecord, model: model })) }), void 0), _jsx(Divider, { component: "li" }, void 0)] }, void 0);
            }) }), void 0);
    }
    else {
        return _jsx(Grid, Object.assign({ container: true }, { children: Array.from(recordsList.values()).map((singleRecord) => _jsx(Grid, Object.assign({ item: true, xs: 12, md: 12 }, { children: _jsx(Grid, Object.assign({ container: true, spacing: 2 }, { children: model.properties.map((propertyModel, index) => {
                        var _a;
                        const { xs, md, id } = propertyModel;
                        // @ts-ignore
                        const formValue = formValueArray[index];
                        return _jsx(Grid, Object.assign({ item: true, xs: xs, md: md }, { children: _jsx(ShowContent, { setFormValue: setParentFormValue, refresh: refresh, record: (_a = record.get(index)) !== null && _a !== void 0 ? _a : new Record(), lockedFormValue: new FormValue(), formContent: inputElement, referencesMap: referencesMap, model: model, refreshReferencesMap: refreshReferencesMap, partialSubmitHandler: partialSubmitHandler, formValue: formValue, errors: errors, submitHandler: submitHandler, loading: loading }, index) }), void 0);
                    }) }), void 0) }), void 0)) }), void 0);
    }
    ;
};
