import React, {Dispatch, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {UpdateListings} from "../../utils/referenceFieldUtils";
import {FormGenerator} from "../forms/FormGenerator";
import {Error as CustomError, Errors} from "../errors/Errors";
import {Form} from "../../resource-models/formvalue/Form";
import {Record} from "../../resource-models/Record";
import {useGetResourceModel} from "../../resource-models/modelsRegistry";
import {useItemOperation} from "../../redux/actions/verbs/operation";

interface EditFormGeneratorProps {
    propResourceName: string,
    propId: number,
    propActionName: string;
    record: Record,
    setRecord:  Dispatch<SetStateAction<Record>>,
    propEditPage?: any,
    refresh: ()=>void
}

/**
 *
 * @param record
 * @param propId
 * @param propActionName
 * @param propResourceName
 * @param propEditPage
 * @param setRecord
 * @param refresh
 * @constructor
 *
 * This function returns a react component with the item action form. This component is not responsible for fetching previous data.
 */
export const ItemActionGenerator: React.FC<EditFormGeneratorProps> = ({ propId, propActionName, propResourceName, record, propEditPage, setRecord, refresh}) => {
    const {operations, resourceName} = useGetResourceModel(propResourceName);
    const operation = operations.findItemOperationByName(propActionName);
    const {model} = operations.findItemOperationByName(propActionName);

    const createEditPageToUse:any = propEditPage
    const initialValue = useRef(new Form());
    const [form, setForm] = useState<Form>(initialValue.current);
    const [errors, setErrors] = useState(new Errors([]));
    const {listings:referencesMap, updateListings:refreshReferencesMap} = UpdateListings();
    const {action, errors:responseErrors, loading} = useItemOperation(resourceName, operation);

    useEffect(()=>{
        // @ts-ignore
        const {_error, ...errorFields} = responseErrors;
        // @ts-ignore
        const newErrors: Errors =  new Errors(Object.keys(errorFields).map((field) => new CustomError(field,errorFields[field])))
        setErrors(newErrors)},[responseErrors])

    useEffect(()=>{ setGenericEditRender(<div/>)},[resourceName])
    useEffect(()=>{
        setForm(Form.createFromRecord(record, model))
    }, [record])

    const [genericEditRender, setGenericEditRender] = useState(<div/>)

    const submitHandler = async (form:Form)=> action(propId,Form.toJson(form)).then((response:any) => {
        const record = Record.createFromJson(response, model)
        setRecord(record)
        setForm(Form.createFromRecord(record, model))
        return response;
    })

    const editFormProps = useMemo(()=>{
        return {
            model: model,
            referencesMap:referencesMap,
            refreshReferencesMap: refreshReferencesMap,
            form: form,
            record:record,
            refresh:refresh,
            lockedFormValue: new Form(),
            loading:loading,
            setFormValue: setForm,
            submitHandler:()=>submitHandler(form),
            partialSubmitHandler:submitHandler,
            resourceName: resourceName,
            resourceId:propId.toString()
        }
    },[model,loading,referencesMap, form, record, resourceName, propId, refresh])


    useEffect(()=>{
        if(form!==initialValue.current){
            setGenericEditRender(
                <FormGenerator {...editFormProps} formContent={createEditPageToUse} errors={errors} text="Save"/>)
        }
    },[form, errors])


    return genericEditRender;
}
