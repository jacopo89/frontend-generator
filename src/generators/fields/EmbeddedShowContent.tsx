import React, {DetailedReactHTMLElement} from "react";
import {Model} from "../../resource-models/Model";
import {ShowContent} from "./ShowContent";
import {Record} from "../../resource-models/Record";
import {Form} from "../../resource-models/formvalue/Form";
import {Errors} from "../errors/Errors";

interface EmbeddedShowContentProps{
    submitHandler: (e:any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    loading: boolean
    model: Model;
    record?: Record;
    referencesMap: any;
    refreshReferencesMap: () => void;
    formValue: Form;
    form: Form;
    lockedFormValue:Form;
    errors: Errors;
    setForm: React.Dispatch<React.SetStateAction<Form>>;
    formContent?:React.DetailedReactHTMLElement<any, any>;
    refresh:()=>void;
    showElement?: React.DetailedReactHTMLElement<any, any>
}
export const EmbeddedShowContent: React.FC<EmbeddedShowContentProps> = (props) => {
    return <ShowContent {...props}/>
}
