import React from "react";
import {Model} from "../../resource-models/Model";
import {Errors} from "../errors/Errors";
import {Form} from "../../resource-models/formvalue/Form";
import {Record} from "../../resource-models/Record";
import {PropertyFieldConfiguration} from "../../resource-models/configurations/PropertyFieldConfiguration";
import {Grid} from "@material-ui/core";
import {PropertyModel} from "../../resource-models/PropertyModel";

interface EmbeddedFormContentInterface{
    model:Model,
    formContent?:  React.DetailedReactHTMLElement<any, any>,
    setForm: (values:any) => void,
    referencesMap: Map<string, any>
    refreshReferencesMap:()=>void
    formValue: Form,
    form: Form,
    record: Record,
    errors: Errors,
    submitHandler: (e:any) => Promise<any>;
    partialSubmitHandler: (e: any) => Promise<any>;
    loading:boolean;
    refresh: ()=>void
}

export const EmbeddedFormContent: React.FC<EmbeddedFormContentInterface> = (props) => {

    const {model, formContent}=props;

    const configuration = new PropertyFieldConfiguration({viewElement: formContent});
    if(configuration.viewElement){
        return React.cloneElement(configuration.viewElement, props);
    }

    return <Grid container spacing={2}>
        {model.properties.map((propertyModel:PropertyModel, index:number) => {
                    const xs = 12; const md = 6;
                    return <Grid item xs={xs} md={md} key={index}>
                        {model.getInputField(propertyModel.id, {...props, lockedFormValue: new Form()})}
                    </Grid>
                }
            )}
    </Grid>
}
