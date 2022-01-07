import React from "react";
import Grid from "@material-ui/core/Grid";
import {Model} from "../../resource-models/Model";
import {Record} from "../../resource-models/Record";
import {Form} from "../../resource-models/formvalue/Form";
import {Errors} from "../errors/Errors";

export interface ShowContent{
    showElement?:  React.DetailedReactHTMLElement<any, any>
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
    refresh:()=>void
}

export const ShowContent: React.FC<ShowContent> = (props) => {
    const {model, showElement} = props
    if(showElement){
        return React.cloneElement(showElement, props);
    }

    return <Grid container spacing={2}>
        {model?.properties.map((propertyModel, index) => {
            return <Grid key={index} item xs={12} md={6}>
                {model.getOutputField(propertyModel.id,props)}
            </Grid>
        })
        }
    </Grid>

}
