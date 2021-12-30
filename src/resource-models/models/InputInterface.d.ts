import { PropertyModel } from "../PropertyModel";
import { Form } from "../formvalue/Form";
import React from "react";
import { Errors } from "../../generators/errors/Errors";
export interface InputInterface {
    model: PropertyModel;
    record: any;
    formValue: Form | Map<number, Form>;
    setFormValue: React.Dispatch<React.SetStateAction<Form>>;
    lockedFormValue: Form;
    errors: Errors;
    refresh: () => void;
    submitHandler: (e: any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    referencesMap: Map<string, any>;
    refreshReferencesMap: () => void;
    showLabel?: boolean;
}
