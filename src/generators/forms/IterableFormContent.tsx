import React, {DetailedReactHTMLElement, useEffect, useRef, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {Divider, Typography} from "@material-ui/core";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";
import {useDelete} from "../../redux/actions/verbs/delete";
import CustomDeleteButton from "../../rendering/components/buttons/CustomDeleteButton";
import {FormContent} from "./FormContent";
import {Errors} from "../errors/Errors";
import {Model} from "../../resource-models/Model";
import {FormValue} from "../../resource-models/formvalue/FormValue";
import {Record} from "../../resource-models/Record";
import {PropertyFieldConfiguration} from "../../resource-models/configurations/PropertyFieldConfiguration";

interface IterableFormContentProps{
    model: Model,
    record: Map<number, Record>;
    recordValue: Map<number, Record>;
    resourceName: string,
    setParentFormValue: (values:any) => void,
    formContent?:  React.DetailedReactHTMLElement<any, any>
    referencesMap: Map<string, any>
    refreshReferencesMap:()=>void
    formValueArray: Map<string,FormValue>,
    formValue: FormValue,
    errors: Errors,
    label:string,
    submitHandler: (e:any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    loading:boolean,
    modifyOnlyLastElement?:boolean;
    modifyRule?: (formvalue:any)=> boolean,
    inputElement?: DetailedReactHTMLElement<any, any>,
    refresh: () => void

}

// @ts-ignore
const useStyles = makeStyles((theme) => ({
    embeddedTitle:{
        backgroundColor: theme.palette.secondary
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export const IterableFormContent: React.FC<IterableFormContentProps> = ({model, record, resourceName, setParentFormValue, formContent, referencesMap, refreshReferencesMap, formValueArray, label, partialSubmitHandler, loading, submitHandler, errors, modifyOnlyLastElement=false, modifyRule=(formvalue) => true, inputElement, refresh}) => {

    const {remove} = useDelete(resourceName);
    const creationTime = useRef(Date.now());
    //local map with formvalues: if is edit, I have values from db, otherwise it is a map with no elements.
    const [localFormValueMap, setLocalFormValueMap] = useState(new Map());

    useEffect(()=>{
        if(formValueArray!==undefined){
            setLocalFormValueMap(formValueArray);
        }
    },[formValueArray])

    const addForm = () => {
        const date = Date.now();
        const newMap = new Map(localFormValueMap).set(date, new FormValue() )
        setParentFormValue(newMap)
    }

    const deleteForm = (key:any)=>{
        localFormValueMap.delete(key);
        if(key < creationTime.current){
            remove(key);
        }
        setParentFormValue(new Map(localFormValueMap));
    }

    const localSetFormValue = (key:any) => {
        return (value:any) => {
            setParentFormValue(new Map(localFormValueMap.set(key, value)));
        }
    }

    const classes = useStyles();

    const entries = Array.from(localFormValueMap.entries());
    const hasNewEntry = entries.map(([key, formValue] )=> key).some((key)=> {
        return key > creationTime.current
    });

    // @ts-ignore
    const basicButton = <IconButton variant="contained" color="primary" onClick={addForm}><AddOutlinedIcon/></IconButton>
    const button = modifyOnlyLastElement ?  (!hasNewEntry && basicButton) : basicButton

    const forms = entries.map(([key, formValue], index) =>{
        const isEditable = modifyRule(formValue);
        const configuration = new PropertyFieldConfiguration({viewElement:inputElement})

        const formElement = <FormContent configuration={configuration} refresh={refresh} record={record.get(key) ?? new Record()} lockedFormValue={new FormValue()} referencesMap={referencesMap} setFormValue={localSetFormValue(key)} model={model}  refreshReferencesMap={refreshReferencesMap}  partialSubmitHandler={partialSubmitHandler} key={index} formValue={formValue} errors={errors} submitHandler={submitHandler} loading={loading}/>;
        const formFinal = modifyOnlyLastElement ? ((isEditable) ? formElement  : formElement ) : formElement;

        return <React.Fragment key={index}>
            <Grid item xs={1}>
                <Typography>{index+1}</Typography>
            </Grid>
            <Grid item xs={10}>{formFinal}</Grid>
            <Grid item xs={1}>
                {isEditable && <CustomDeleteButton icon={true} message={"Delete Item?"} onClick={() => deleteForm(key)}/>}
            </Grid>
            <Grid item xs={12} style={{marginTop: 15, marginBottom: 15}}>
                <Divider/>
            </Grid>
        </React.Fragment>;
    })

    // @ts-ignore
    const classEmbeddedTitle = classes.embeddedTitle

    return <Grid container>
        <Grid item xs={12} className={classEmbeddedTitle}>
            {label}
            {button}
        </Grid>
        {forms}
    </Grid>
}


