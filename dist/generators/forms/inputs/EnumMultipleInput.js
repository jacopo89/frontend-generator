var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CustomTextValidator } from "../formHelpers";
export default function ({ model, value: values, onChange, hasError, errorMessage }) {
    const { id, label, options } = useMemo(() => { return model; }, [model]);
    const [inputValue, setInputValue] = useState("");
    console.log("values", values);
    console.log("options", options);
    const autocompleteOnChange = (items) => {
        console.log("items", items);
        onChange([id, items.map(item => item.id)]);
    };
    return _jsx(_Fragment, { children: _jsx(Autocomplete, { multiple: true, value: getAutocompleteValuePosition(values, options), inputValue: inputValue, disableClearable: true, options: options, onInputChange: (event, newInputValue) => setInputValue(newInputValue), onChange: (event, newInputvalue) => autocompleteOnChange(newInputvalue), getOptionLabel: (option) => option.label, renderOption: (option) => _jsx("div", { children: option.label }, void 0), style: { width: "100%" }, renderInput: (_a) => {
                var params = __rest(_a, []);
                return _jsx(CustomTextValidator, Object.assign({}, params, { error: hasError, errorMessage: errorMessage, id: model.id, name: model.id, variant: "outlined", value: getAutocompleteValuePosition(values, options), label: label, style: { width: "100%" }, autoComplete: "nope" }), void 0);
            } }, void 0) }, void 0);
}
export function getAutocompleteValuePosition(values, options) {
    const indexes = values.map((selectedOption) => options.findIndex((option) => option.id === selectedOption));
    const selectedValues = indexes.map((indexValue) => options[indexValue]);
    return selectedValues;
}
