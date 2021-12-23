import React, {useEffect, useMemo, useRef, useState} from "react";
import {UpdateListings} from "../../utils/referenceFieldUtils";
import {FormGenerator} from "../forms/FormGenerator";
import {Error as CustomError, Errors} from "../errors/Errors";
import {FormValue} from "../../resource-models/formvalue/FormValue";
import {Record} from "../../resource-models/Record";
import {useGetResourceModel} from "../../resource-models/modelsRegistry";
import {useCollectionOperation} from "../../redux/actions/verbs/operation";

interface EditFormGeneratorProps {
    propResourceName: string,
    propActionName:string,
    propEditPage?: any,
    refresh: ()=>void
}

/**
 *
 * @param propResourceName
 * @param propEditPage
 * @constructor
 *
 * This function returns a react component with the edit form. This component is not responsible for fetching previous data.
 */
export const CollectionActionGenerator: React.FC<EditFormGeneratorProps> = ({ propActionName, propResourceName,  propEditPage, refresh}) => {
    const {operations, resourceName} = useGetResourceModel(propResourceName);
    const operation = operations.findCollectionOperationByName(propActionName);


    const model = operations.getCollectionOperationModel(propActionName);
    const createEditPageToUse:any = propEditPage;
    const initialValue = useRef(new FormValue());
    const [formValue, setFormValue] = useState<FormValue>(initialValue.current);
    const [errors, setErrors] = useState(new Errors([]));
    const {listings:referencesMap, updateListings:refreshReferencesMap} = UpdateListings();
    // @ts-ignore
    const {action, errors:responseErrors, loading} = useCollectionOperation(resourceName, operation);


    useEffect(()=>{
        // @ts-ignore
        const {_error, ...errorFields} = responseErrors;
        // @ts-ignore
        const newErrors: Errors =  new Errors(Object.keys(errorFields).map((field) => new CustomError(field,errorFields[field])))
        setErrors(newErrors)},[responseErrors])

    useEffect(()=>{ setGenericEditRender(<div/>)},[resourceName])

    const [genericEditRender, setGenericEditRender] = useState(<div/>)

    const submitHandler = async (formValue:FormValue)=> action(FormValue.toJson(formValue)).then((response:any) => {
        const record = Record.createFromJson(response, model)
        setFormValue(FormValue.createFromRecord(record, model))
        return response;
    })

    const editFormProps = useMemo(()=>{
        return {
            model: model,
            referencesMap:referencesMap,
            refreshReferencesMap: refreshReferencesMap,
            formValue: formValue,
            refresh:refresh,
            lockedFormValue: new FormValue(),
            loading:loading,
            setFormValue: setFormValue,
            submitHandler:()=>submitHandler(formValue),
            partialSubmitHandler:submitHandler,
            resourceName: resourceName,
        }
    },[model,loading,referencesMap, formValue, resourceName, refresh])


    useEffect(()=>{

            setGenericEditRender(
                <FormGenerator {...editFormProps} formContent={createEditPageToUse} errors={errors} text="Save"/>)

    },[formValue, errors])


    return genericEditRender;
}
