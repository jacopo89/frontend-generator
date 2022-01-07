import {Model} from "../Model";
import {Record} from "../Record";
import {Form} from "../formvalue/Form";
import React from "react";
import {Errors} from "../../generators/errors/Errors";

export interface ModelInputInterface{
    model: Model,
    record?: Record,
    formValue: Form,
    form: Form,
    setFormValue:  React.Dispatch<React.SetStateAction<Form>>,
    lockedFormValue: Form,
    errors: Errors,
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    loading: boolean;
    referencesMap: Map<string, any>;
    refreshReferencesMap:()=>void;
    refresh: ()=>void;
}
