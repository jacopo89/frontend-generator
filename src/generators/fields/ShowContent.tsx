import React from "react";
import Grid from "@material-ui/core/Grid";
import {Model} from "../../resource-models/Model";
import {Record} from "../../resource-models/Record";
import {FormValue} from "../../resource-models/formvalue/FormValue";
import {Errors} from "../errors/Errors";
import {InputProps} from "../../resource-models/models/InputProps";

export interface ShowContent{
    showElement?:  React.DetailedReactHTMLElement<any, any>
    submitHandler: (e:any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    loading: boolean
    model: Model;
    record?: Record;
    referencesMap: any;
    refreshReferencesMap: () => void;
    formValue: FormValue;
    lockedFormValue:FormValue;
    errors: Errors;
    setFormValue: React.Dispatch<React.SetStateAction<FormValue>>;
    formContent?:React.DetailedReactHTMLElement<any, any>;
    refresh:()=>void
}

export const ShowContent: React.FC<ShowContent> = (props) => {
    const {model, refresh, formValue, lockedFormValue, setFormValue, showElement, formContent, referencesMap, refreshReferencesMap, partialSubmitHandler, submitHandler, errors, record, loading} = props
    if(showElement){
        return React.cloneElement(showElement, props);
    }

    return <Grid container spacing={2}>
        {model?.properties.map((propertyModel, index) => {
            const props = new InputProps({model:propertyModel,partialSubmitHandler, submitHandler, referencesMap ,refreshReferencesMap, formValue, record:record?.getPropertyRecord(propertyModel.id), recordValue:record?.getPropertyRecord(propertyModel.id), lockedFormValue, setFormValue, errors, refresh, showLabel:true, loading:loading})
            const {xs, md, id} = propertyModel;
            return <Grid key={index} item xs={xs} md={md}>
                {propertyModel.getOutputField(props)}
            </Grid>
        })
        }
    </Grid>

}
