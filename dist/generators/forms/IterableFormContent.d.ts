import React, { DetailedReactHTMLElement } from "react";
import { Errors } from "../errors/Errors";
import { Model } from "../../resource-models/Model";
import { FormValue } from "../../resource-models/formvalue/FormValue";
interface IterableFormContentProps {
    model: Model;
    resourceName: string;
    setParentFormValue: (values: any) => void;
    formContent?: React.DetailedReactHTMLElement<any, any>;
    referencesMap: Map<string, any>;
    refreshReferencesMap: () => void;
    formValueArray: Map<string, FormValue>;
    errors: Errors;
    label: string;
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    modifyOnlyLastElement?: boolean;
    modifyRule?: (formvalue: any) => boolean;
    inputElement?: DetailedReactHTMLElement<any, any>;
}
export declare const IterableFormContent: React.FC<IterableFormContentProps>;
export {};
