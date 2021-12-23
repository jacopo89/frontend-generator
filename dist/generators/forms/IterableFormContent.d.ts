import React, { DetailedReactHTMLElement } from "react";
import { Errors } from "../errors/Errors";
import { Model } from "../../resource-models/Model";
import { FormValue } from "../../resource-models/formvalue/FormValue";
import { Record } from "../../resource-models/Record";
interface IterableFormContentProps {
    model: Model;
    record: Map<number, Record>;
    recordValue: Map<number, Record>;
    resourceName: string;
    setParentFormValue: (values: any) => void;
    formContent?: React.DetailedReactHTMLElement<any, any>;
    referencesMap: Map<string, any>;
    refreshReferencesMap: () => void;
    formValueArray: Map<string, FormValue>;
    formValue: FormValue;
    errors: Errors;
    label: string;
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    loading: boolean;
    modifyOnlyLastElement?: boolean;
    modifyRule?: (formvalue: any) => boolean;
    inputElement?: DetailedReactHTMLElement<any, any>;
    refresh: () => void;
}
export declare const IterableFormContent: React.FC<IterableFormContentProps>;
export {};
