import React from "react";
import { Model } from "../../resource-models/Model";
import { FormValue } from "../../resource-models/formvalue/FormValue";
import { Record } from "../../resource-models/Record";
import { Errors } from "../errors/Errors";
export interface Props {
    resourceId?: string;
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    loading: boolean;
    model: Model;
    referencesMap: Map<string, any>;
    refreshReferencesMap: () => void;
    formValue: FormValue;
    record?: Record;
    lockedFormValue: FormValue;
    setFormValue: React.Dispatch<React.SetStateAction<FormValue>>;
    text?: string;
    errors: Errors;
    showButton?: boolean;
    formContent?: any;
    refresh: () => void;
}
export declare const FormGenerator: React.FC<Props>;
