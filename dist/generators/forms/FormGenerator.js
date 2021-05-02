import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { ValidatorForm } from "react-material-ui-form-validator";
import { FormContent } from "./FormContent";
import { goBack } from "connected-react-router";
import { useFormStyles } from "../../rendering/styles/formStyles";
import ButtonsHorizontalList from "../../rendering/components/buttons/ButtonsHorizontalList";
import { genericError } from "../../redux/actions/verbs/edit";
export const FormGenerator = ({ submitHandler, resourceName, resourceId, partialSubmitHandler, model, referencesMap, refreshReferencesMap, formValue, lockedFormValue, setFormValue, errors: inheritedErrors, text = "Salva", showButton = true }) => {
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
        console.log("formvalue", formValue);
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
    const onClickGoBackHandler = (e) => {
        onClickHandler(e);
        dispatch(goBack());
    };
    return _jsxs(ValidatorForm, Object.assign({ ref: ref, className: classes.form, onSubmit: validationSubmitHandler, onError: () => dispatch(genericError("Validation Error")) }, { children: [_jsx(FormContent, { model: model, resourceName: resourceName, resourceId: resourceId, referencesMap: referencesMap, refreshReferencesMap: refreshReferencesMap, setFormValue: setFormValue, formValue: formValue, lockedFormValue: lockedFormValue, errors: inheritedErrors, partialSubmitHandler: partialSubmitHandler, submitHandler: submitHandler }, void 0),
            showButton && _jsx("div", Object.assign({ style: { margin: "10px 0" } }, { children: _jsx(ButtonsHorizontalList, { children: _jsx(Button, Object.assign({ style: { float: "right" }, variant: "contained", color: "secondary", onClick: onClickHandler }, { children: text }), void 0) }, void 0) }), void 0)] }), void 0);
};
