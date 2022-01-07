import React from "react";
import {Model} from "../../resource-models/Model";
import {Errors} from "../errors/Errors";
import {Form} from "../../resource-models/formvalue/Form";
import {Record} from "../../resource-models/Record";
import {PropertyFieldConfiguration} from "../../resource-models/configurations/PropertyFieldConfiguration";
import {Grid} from "@material-ui/core";
import {PropertyModel} from "../../resource-models/PropertyModel";
import {InputProps} from "../../resource-models/models/InputProps";

interface EmbeddedFormContentProps{
    model:Model,
    formContent?:  React.DetailedReactHTMLElement<any, any>,
    setFormValue: (values:any) => void,
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

export const EmbeddedFormContent: React.FC<EmbeddedFormContentProps> = (props) => {

    const {partialSubmitHandler,loading, form, submitHandler, model, formContent,referencesMap ,refreshReferencesMap, formValue, setFormValue, errors, record, refresh}=props;

    const configuration = new PropertyFieldConfiguration({viewElement: formContent});
    if(configuration.viewElement){
        return React.cloneElement(configuration.viewElement, props);
    }

    return <Grid container spacing={2}>
        {model.properties
            .map((propertyModel:PropertyModel, index:number) => {
                    const xs = 12; const md = 6;
                    const props = new InputProps({showLabel:true, model:propertyModel,partialSubmitHandler, submitHandler, loading, referencesMap ,refreshReferencesMap, formValue, record:record?.getPropertyRecord(propertyModel.id), recordValue:record?.getPropertyRecord(propertyModel.id), setFormValue, errors, refresh, form, lockedFormValue: new Form()})
                    return <Grid item xs={xs} md={md} key={index}>
                        {propertyModel.getPropertyField(props,configuration.isEdit)}
                    </Grid>
                }
            )}
    </Grid>
}
