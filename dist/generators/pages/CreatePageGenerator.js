var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGetResourceModel } from "../../resource-models/modelsRegistry";
import { useCreate } from "../../redux/actions/verbs/create";
import { FormGenerator } from "../forms/FormGenerator";
import { UpdateListings } from "../../utils/referenceFieldUtils";
import { Error, Errors } from "../errors/Errors";
import { FormValue } from "../../resource-models/formvalue/FormValue";
export const Create = ({ propResourceName: resourceName, propCreatePage, lockedFormValue = new FormValue() }) => {
    const { operations } = useGetResourceModel(resourceName);
    const model = operations.getOperationModel("post");
    const createPageToUse = propCreatePage;
    const { listings: referencesMap, updateListings: refreshReferencesMap } = UpdateListings();
    const [formValue, setFormValue] = useState(lockedFormValue);
    const { create, errors: responseErrors, loading } = useCreate();
    const [errors, setErrors] = useState(new Errors([]));
    useEffect(() => {
        // @ts-ignore
        const { _error } = responseErrors, errorFields = __rest(responseErrors, ["_error"]);
        const newErrors = new Errors(Object.entries(errorFields).map(([field, value]) => new Error(field, value)));
        setErrors(newErrors);
    }, [responseErrors]);
    const [genericCreateRender, setGenericCreateRender] = useState(_jsx("div", {}, void 0));
    useEffect(() => { setGenericCreateRender(_jsx("div", {}, void 0)); }, [resourceName]);
    const submitHandler = () => create(resourceName, FormValue.toJson(formValue));
    useEffect(() => {
        const newFormGenerator = _jsx(FormGenerator, { submitHandler: submitHandler, loading: loading, partialSubmitHandler: submitHandler, model: model, referencesMap: referencesMap, refreshReferencesMap: refreshReferencesMap, formValue: formValue, lockedFormValue: lockedFormValue, setFormValue: setFormValue, errors: errors, formContent: createPageToUse, refresh: () => console.log("there is no refresh in creation") }, void 0);
        setGenericCreateRender(newFormGenerator);
    }, [model, referencesMap, formValue, resourceName, errors]);
    return genericCreateRender;
};
export const GenericCreate = ({ model, submitHandler, errors = new Errors([]), propCreatePage, lockedFormValue = new FormValue(), loading }) => {
    const createPageToUse = propCreatePage;
    const { listings: referencesMap, updateListings: refreshReferencesMap } = UpdateListings();
    const [formValue, setFormValue] = useState(lockedFormValue);
    const [genericCreateRender, setGenericCreateRender] = useState(_jsx("div", {}, void 0));
    useEffect(() => { setGenericCreateRender(_jsx("div", {}, void 0)); }, [model]);
    useEffect(() => {
        const newFormGenerator = _jsx(FormGenerator, { submitHandler: submitHandler, loading: loading, partialSubmitHandler: submitHandler, model: model, referencesMap: referencesMap, refreshReferencesMap: refreshReferencesMap, formValue: formValue, lockedFormValue: lockedFormValue, setFormValue: setFormValue, errors: errors, formContent: createPageToUse, refresh: () => console.log("there is no refresh in creation") }, void 0);
        setGenericCreateRender(newFormGenerator);
    }, [model, referencesMap, formValue, errors]);
    return genericCreateRender;
};
export const CreateResource = ({ propResourceName: resourceName, propCreatePage, lockedFormValue = new FormValue() }) => {
    const { operations } = useGetResourceModel(resourceName);
    const model = operations.getOperationModel("post");
    const createPageToUse = propCreatePage;
    const { create, errors: responseErrors, loading } = useCreate();
    const [errors, setErrors] = useState(new Errors([]));
    useEffect(() => {
        // @ts-ignore
        const { _error } = responseErrors, errorFields = __rest(responseErrors, ["_error"]);
        // @ts-ignore
        const newErrors = new Errors(Object.keys(errorFields).map((field) => new Error(field, errorFields[field])));
        setErrors(newErrors);
    }, [responseErrors]);
    const submitHandler = (formValue) => __awaiter(void 0, void 0, void 0, function* () { return create(resourceName, FormValue.toJson(formValue)); });
    return GenericCreate({ model: model, propCreatePage: createPageToUse, lockedFormValue, errors, submitHandler, loading });
};
