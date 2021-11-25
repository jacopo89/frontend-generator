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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { changeResourceBuffer } from "../../../redux/actions/app/actions";
import { ListingOption } from "../../../resource-models/listings/Listing";
import ReferenceInputModal from "./ReferenceInputModal/ReferenceInputModal";
import { CustomTextValidator } from "../formHelpers";
import _ from 'lodash';
const LISTING_OPTION_UNDEFINED = -1;
const LISTING_OPTION_NOT_PRESENT = -2;
class ReferenceInputOption {
    constructor(id, label, button) {
        this.id = id;
        this.label = label;
        this.button = button;
    }
    static createFromListingOption(listingOption) {
        return new ReferenceInputOption(listingOption.id, listingOption.label);
    }
    toMap() {
        return new Map().set('id', this.id).set('label', this.label);
    }
}
export default function ({ model, formValue, refreshReferencesMap, value: listOption, createNew = true, onChange, hasError, errorMessage, dependencies }) {
    const inheritedValue = useMemo(() => { return (listOption) ? (typeof listOption === "number" ? new ListingOption(listOption, "") : new ListingOption(listOption["id"], "")) : undefined; }, [listOption]);
    const { id, label, resourceName } = useMemo(() => { return model; }, [model]);
    const [open, setOpen] = React.useState(false);
    //useCounter(inheritedValue, `Inherited value ${id}`)
    const handleOpen = (e) => {
        e.stopPropagation();
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        refreshReferencesMap();
    };
    const [localOptions, setLocalOptions] = useState(createNew ? [new ReferenceInputOption(0, "", _jsx(Button, Object.assign({ style: { width: "100%" }, onClick: handleOpen }, { children: "Add a new one" }), void 0))] : []);
    const expectedIntialOptionsLocations = createNew ? 1 : 0;
    // @ts-ignore
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState("");
    // @ts-ignore
    const { listings, listingLoading } = useSelector(({ appReducer }) => appReducer);
    const map = new Map(dependencies.map((dependencyName) => { return [dependencyName, undefined]; }));
    const [dependenciesValues, setDependenciesValues] = useState(map);
    const isDisabled = dependencies.length === 0 ? false : Array.from(dependenciesValues.entries()).some(([id, value]) => value === undefined);
    const updateDependecies = useCallback(() => {
        let changes = 0;
        const newDependenciesValues = _.clone(dependenciesValues);
        dependencies.forEach((dependencyName) => {
            // @ts-ignore
            const formValueDependencyValue = formValue[dependencyName];
            // @ts-ignore
            if (dependenciesValues.get(dependencyName) !== formValueDependencyValue) {
                // @ts-ignore
                newDependenciesValues.set(dependencyName, formValue[dependencyName]);
                changes++;
            }
        });
        if (changes > 0) {
            setDependenciesValues(newDependenciesValues);
        }
    }, [formValue, dependenciesValues, dependenciesValues, dependencies]);
    useEffect(() => {
        if (!listingLoading) {
            updateDependecies();
        }
    }, [formValue, listingLoading]);
    const dispatch = useDispatch();
    useEffect(() => {
        if (resourceName) {
            dispatch(changeResourceBuffer(resourceName, dependenciesValues));
        }
    }, [dependenciesValues]);
    useEffect(() => {
        var _a, _b;
        if (!listingLoading && listings.size !== 0) {
            const options = (_b = (_a = listings.get(model.resourceName)) === null || _a === void 0 ? void 0 : _a.options) !== null && _b !== void 0 ? _b : [];
            const referenceOptions = options.map((option) => ReferenceInputOption.createFromListingOption(option));
            setLocalOptions((value) => (createNew) ? [new ReferenceInputOption(0, "", _jsx(Button, Object.assign({ style: { width: "100%" }, onClick: handleOpen }, { children: "Add a new one" }), void 0)), ...referenceOptions] : [...referenceOptions]);
        }
    }, [listings, listingLoading]);
    const refreshList = useCallback(() => {
        const valuePositionInOptions = getAutocompleteValuePosition(inheritedValue, localOptions);
        const localOptionsLengthCondition = localOptions.length !== expectedIntialOptionsLocations;
        const truePosition = (createNew) ? valuePositionInOptions : valuePositionInOptions - 1;
        const isPositionValid = valuePositionInOptions !== LISTING_OPTION_NOT_PRESENT && valuePositionInOptions !== LISTING_OPTION_UNDEFINED;
        if (isPositionValid && localOptionsLengthCondition) {
            setValue(localOptions[truePosition]);
        }
        else if (valuePositionInOptions === LISTING_OPTION_NOT_PRESENT) {
            onChange([id, undefined]);
            setInputValue("");
        }
    }, [localOptions, inheritedValue]);
    useEffect(() => {
        if (!listingLoading)
            refreshList();
    }, [listingLoading, inheritedValue]);
    useEffect(() => refreshList(), [localOptions]);
    const autocompleteOnChange = (item) => {
        onChange([id, item]);
    };
    return _jsxs(_Fragment, { children: [_jsx(Autocomplete, { value: value, disabled: isDisabled, inputValue: inputValue, disableClearable: true, options: localOptions, onInputChange: (event, newInputValue) => setInputValue(newInputValue), onChange: (event, newInputvalue) => autocompleteOnChange(newInputvalue), getOptionLabel: (option) => option.label, renderOption: (option) => (option.button) ? option.button : _jsx("div", { children: option.label }, void 0), style: { width: "100%" }, renderInput: (_a) => {
                    var params = __rest(_a, []);
                    return _jsx(CustomTextValidator, Object.assign({}, params, { error: hasError, errorMessage: errorMessage, id: model.id, name: model.id, variant: "outlined", value: value, label: label, style: { width: "100%" }, autoComplete: "nope" }), void 0);
                } }, void 0), _jsx(ReferenceInputModal, { open: open, handleClose: handleClose, resourceName: resourceName }, void 0)] }, void 0);
}
/**
 * @param {int} value
 * @param {array} options
 * @returns {int}
 */
export function getAutocompleteValuePosition(value, options) {
    if (value) {
        // @ts-ignore
        const correctOption = options.find((option) => option.id === value.id);
        return (correctOption) ? options.indexOf(correctOption) : LISTING_OPTION_NOT_PRESENT;
    }
    else {
        return LISTING_OPTION_UNDEFINED;
    }
}
