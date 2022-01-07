import React, {useEffect, useMemo, useState} from "react";
import {useGetResourceModel} from "../../resource-models/modelsRegistry";
import {useCreate} from "../../redux/actions/verbs/create";
import {FormGenerator} from "../forms/FormGenerator";
import {UpdateListings} from "../../utils/referenceFieldUtils";
import {Error, Errors} from "../errors/Errors";
import {Form} from "../../resource-models/formvalue/Form";
import {Model} from "../../resource-models/Model";

interface Props{
    propResourceName:string,
    propCreatePage?:any,
    lockedFormValue?:Form
}


interface GenericProps{
    model:Model,
    errors?: Errors,
    propCreatePage?:any,
    submitHandler: (formValue:Form)=>Promise<any>,
    loading: boolean,
    lockedFormValue?:Form
}

export const Create: React.FC<Props> = ({propResourceName:resourceName, propCreatePage, lockedFormValue=new Form()}) => {
    const {operations} = useGetResourceModel(resourceName);
    const model = operations.getOperationModel("post");
    const createPageToUse:any = propCreatePage
    const {listings:referencesMap, updateListings:refreshReferencesMap} = UpdateListings();
    const [form, setForm] = useState<Form>(lockedFormValue);
    const {create, errors:responseErrors, loading} = useCreate();
    const [errors, setErrors] = useState(new Errors([]));

    useEffect(()=>
        {
            // @ts-ignore
            const {_error, ...errorFields} = responseErrors;
            const newErrors: Errors =  new Errors(Object.entries(errorFields).map(([field, value]) => new Error(field,value)))
            setErrors(newErrors)
        },
        [responseErrors])

    const [genericCreateRender, setGenericCreateRender] = useState(<div/>)
    useEffect(()=>{ setGenericCreateRender(<div/>)},[resourceName])

    const submitHandler = ()=>create(resourceName, Form.toJson(form));

    useEffect(()=>{
        const newFormGenerator = <FormGenerator
            submitHandler={submitHandler}
            loading={loading}
            partialSubmitHandler={submitHandler}
            model={model}
            referencesMap={referencesMap}
            refreshReferencesMap={refreshReferencesMap}
            form={form}
            lockedFormValue={lockedFormValue}
            setForm={setForm}
            errors={errors}
            formContent={createPageToUse}
            refresh={()=>console.log("there is no refresh in creation")}>
        </FormGenerator>
        setGenericCreateRender(newFormGenerator);
    }, [model, loading, referencesMap, form, resourceName, errors])


    return genericCreateRender;

}

export const GenericCreate: React.FC<GenericProps> = ({model, submitHandler, errors = new Errors([]), propCreatePage, lockedFormValue=new Form(), loading}) => {
    const createPageToUse:any = propCreatePage
    const {listings:referencesMap, updateListings:refreshReferencesMap} = UpdateListings();
    const [form, setForm] = useState<Form>(lockedFormValue);
    const [genericCreateRender, setGenericCreateRender] = useState(<div/>)
    useEffect(()=>{ setGenericCreateRender(<div/>)},[model])

    useEffect(()=>{
        const newFormGenerator = <FormGenerator
            submitHandler={submitHandler}
            loading={loading}
            partialSubmitHandler={submitHandler}
            model={model}
            referencesMap={referencesMap}
            refreshReferencesMap={refreshReferencesMap}
            form={form}
            lockedFormValue={lockedFormValue}
            setForm={setForm}
            errors={errors}
            formContent={createPageToUse}
            refresh={()=>console.log("there is no refresh in creation")}>
        </FormGenerator>
        setGenericCreateRender(newFormGenerator);
    }, [model, referencesMap, form, errors])


    return genericCreateRender;

}

export const CreateResource: React.FC<Props> = ({propResourceName:resourceName, propCreatePage, lockedFormValue=new Form()}) => {
    const {operations} = useGetResourceModel(resourceName);
    const model = operations.getOperationModel("post")
    const createPageToUse:any = propCreatePage

    const {create, errors:responseErrors, loading} = useCreate();
    const [errors, setErrors] = useState(new Errors([]));

    useEffect(()=>{
        // @ts-ignore
        const {_error, ...errorFields} = responseErrors;
        // @ts-ignore
        const newErrors: Errors =  new Errors(Object.keys(errorFields).map((field) => new Error(field,errorFields[field])))
        setErrors(newErrors)},[responseErrors])

    const submitHandler = async (form:Form)=>create(resourceName, Form.toJson(form));

    return GenericCreate({model:model, propCreatePage:createPageToUse, lockedFormValue, errors, submitHandler, loading})
}
