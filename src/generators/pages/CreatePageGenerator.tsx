import React, {useEffect, useMemo, useState} from "react";
import {useLocation} from "react-router-dom";
import {useGetResourceModel} from "../../resource-models/modelsRegistry";
import {useCreate} from "../../redux/actions/verbs/create";
import {FormGeneratorPropsObject} from "../forms/FormGeneratorProps";
import {FormGenerator} from "../forms/FormGenerator";
import {UpdateListings} from "../../utils/referenceFieldUtils";
import {Error, Errors} from "../errors/Errors";
import {FormValue} from "../../resource-models/formvalue/FormValue";

interface Props{
    propResourceName:string,
    propCreatePage?:any,
    lockedFormValue?:FormValue,
    thenFunction?:any,
    catchFunction?:any
}


export const Create: React.FC<Props> = ({propResourceName:resourceName, propCreatePage, lockedFormValue=new FormValue(), thenFunction=()=>{}, catchFunction=()=>{}}) => {
    const {model, createPage} = useGetResourceModel(resourceName);
    const createPageToUse:any = useMemo(()=> propCreatePage ? propCreatePage: createPage,[createPage, propCreatePage])
    const {listings:referencesMap, updateListings:refreshReferencesMap} = UpdateListings();
    const [formValue, setFormValue] = useState<FormValue>(lockedFormValue);
    const {create, errors:responseErrors} = useCreate();
    const location = useLocation<object>();
    const [errors, setErrors] = useState(new Errors([]));

    useEffect(()=>{
        // @ts-ignore
        const {_error, ...errorFields} = responseErrors;
        // @ts-ignore
        const newErrors: Errors =  new Errors(Object.keys(errorFields).map((field) => new Error(field,errorFields[field])))
        setErrors(newErrors)},[responseErrors])

    /*const changeFromLocation = useCallback(()=>{

        if(resourceName===urlResourceName){ // Serve per evitare di propagare le modifiche su create innestati
            setFormValue({...formValue, ...location.state})
            if(location.state){
                Object.keys(location.state).forEach((key:string) => {
                    // @ts-ignore
                    model[key] = {...model[key], disabled: true}
                })
            }
        }

    },[location, model,formValue, urlResourceName])*/

    /*useEffect(()=>{
        changeFromLocation()
    },[referencesMap])*/


    const [genericCreateRender, setGenericCreateRender] = useState(<div/>)
    useEffect(()=>{ setGenericCreateRender(<div/>)},[resourceName])

    const submitHandler = async ()=>create(resourceName, formValue.toJson(model)).then(thenFunction).catch(catchFunction);

    const createFormProps = useMemo(()=> new FormGeneratorPropsObject({model: model, formContent:createPageToUse, referencesMap:referencesMap, refreshReferencesMap: refreshReferencesMap, formValue:formValue, setFormValue:setFormValue, submitHandler: submitHandler, partialSubmitHandler:submitHandler, resourceName:resourceName, errors:errors, lockedFormValue:lockedFormValue})
    ,[model, referencesMap, formValue, resourceName, errors, lockedFormValue])

    useEffect(()=>{
            setGenericCreateRender(<FormGenerator formContent={createPageToUse} {...createFormProps} errors={errors} />)
    }, [model, referencesMap, formValue, resourceName, errors, resourceName])


    return genericCreateRender;

}