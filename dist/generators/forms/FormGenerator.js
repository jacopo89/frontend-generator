import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { ValidatorForm } from "react-material-ui-form-validator";
import { FormContent } from "./FormContent";
import { useFormStyles } from "../../rendering/styles/formStyles";
import ButtonsHorizontalList from "../../rendering/components/buttons/ButtonsHorizontalList";
import { genericError } from "../../redux/actions/verbs/edit";
import { PropertyFieldConfiguration } from "../../resource-models/configurations/PropertyFieldConfiguration";
export const FormGenerator = (props) => {
    const { submitHandler, loading, refresh, formContent, partialSubmitHandler, model, referencesMap, refreshReferencesMap, formValue, record, lockedFormValue, setFormValue, errors, text = "Save", isEdit } = props;
    const classes = useFormStyles();
    const dispatch = useDispatch();
    const ref = useRef(null);
    // validation use effect
    useEffect(() => {
        ValidatorForm.addValidationRule('isUrl', (value) => {
            const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            return !!pattern.test(value);
        });
    }, [formValue]);
    const validationSubmitHandler = (e) => {
        submitHandler(e);
    };
    const onClickHandler = (e) => {
        if (ref !== null && ref.current !== null) {
            // @ts-ignore
            ref.current.submit(e);
        }
    };
    const configuration = new PropertyFieldConfiguration({ viewElement: formContent, isEdit: isEdit });
    return _jsxs(ValidatorForm, Object.assign({ ref: ref, className: classes.form, onSubmit: validationSubmitHandler, onError: () => dispatch(genericError("Validation Error")) }, { children: [_jsx(FormContent, { configuration: configuration, refresh: refresh, model: model, referencesMap: referencesMap, refreshReferencesMap: refreshReferencesMap, setFormValue: setFormValue, formValue: formValue, record: record, lockedFormValue: lockedFormValue, errors: errors, partialSubmitHandler: partialSubmitHandler, submitHandler: submitHandler, loading: loading }, void 0), !formContent && isEdit && _jsx("div", Object.assign({ style: { margin: "10px 0" } }, { children: _jsx(ButtonsHorizontalList, { children: _jsx(Button, Object.assign({ variant: "contained", color: "secondary", onClick: onClickHandler }, { children: text }), void 0) }, void 0) }), void 0)] }), void 0);
};
