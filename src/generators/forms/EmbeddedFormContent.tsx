import React, {useEffect, useState} from "react";
import {FormContent} from "./FormContent";
import {Model} from "../../resource-models/Model";
import {Errors} from "../errors/Errors";
import {Form} from "../../resource-models/formvalue/Form";
import {Record} from "../../resource-models/Record";
import {PropertyFieldConfiguration} from "../../resource-models/configurations/PropertyFieldConfiguration";

interface EmbeddedFormContentProps{
    model:Model,
    formContent?:  React.DetailedReactHTMLElement<any, any>,
    setParentFormValue: (values:any) => void,
    referencesMap: Map<string, any>
    refreshReferencesMap:()=>void
    formValue: Form,
    record: Record,
    errors: Errors,
    submitHandler: (e:any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    loading:boolean;
    refresh: ()=>void
}

export const EmbeddedFormContent: React.FC<EmbeddedFormContentProps> = ({model, refresh, setParentFormValue, formContent, referencesMap, refreshReferencesMap, formValue, partialSubmitHandler, submitHandler, errors, record, loading}) => {

    const [localFormValue, setLocalFormValue] = useState(new Form());

    useEffect(()=>{
        if(formValue!==undefined){
            setLocalFormValue(formValue);
        }
    },[formValue])

    const configuration = new PropertyFieldConfiguration({viewElement: formContent});

    return <FormContent loading={loading} refresh={refresh} record={record} referencesMap={referencesMap} configuration={configuration}  setFormValue={setParentFormValue} model={model} refreshReferencesMap={refreshReferencesMap}
                        formValue={localFormValue} errors={errors} partialSubmitHandler={partialSubmitHandler} submitHandler={submitHandler}  lockedFormValue={new Form()}/>
}
