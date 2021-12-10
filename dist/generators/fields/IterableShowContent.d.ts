import React, { DetailedReactHTMLElement } from "react";
import { Model } from "../../resource-models/Model";
import { Record } from "../../resource-models/Record";
import { FormValue } from "../../resource-models/formvalue/FormValue";
import { Errors } from "../errors/Errors";
export interface IterableShowContentProps {
    model: Model;
    record: Map<number, Record>;
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
    loading: boolean;
    inputElement?: DetailedReactHTMLElement<any, any>;
    refresh: () => void;
    showElement?: React.DetailedReactHTMLElement<any, any>;
}
export declare const IterableShowContent: React.FC<IterableShowContentProps>;
